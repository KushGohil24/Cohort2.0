import Item from "../models/item.model.js";
import { extractFromUrl } from "../utils/extractor.js";
import { itemQueue } from "../queue/item.queue.js";
import { enrichItemWithAI } from "../services/ai.service.js";
import { Mistral } from "@mistralai/mistralai";
import mongoose from "mongoose";
import Collection from "../models/collection.model.js";

export const createItem = async (req, res) => {
  try {
    const { url, type, title, description, tags, collectionIds, fileUrl } = req.body;
    
    let sanitizedCollectionIds = [];
    if (Array.isArray(collectionIds)) {
      sanitizedCollectionIds = collectionIds.filter(id => mongoose.Types.ObjectId.isValid(id));
    } else if (typeof collectionIds === 'string' && mongoose.Types.ObjectId.isValid(collectionIds)) {
      sanitizedCollectionIds = [collectionIds];
    }
    
    let itemData = {
      userId: req.user.id,
      type: type || "note",
      title: title || "Untitled Note",
      description,
      tags: tags || [],
      collectionIds: sanitizedCollectionIds
    };

    if (url) {
      const extracted = await extractFromUrl(url);
      itemData = { ...itemData, ...extracted, title: title || extracted.title };
    } else if (fileUrl) {
      itemData.fileUrl = fileUrl;
    }

    const item = await Item.create({ ...itemData, status: "pending" });
    
    // Update collection counts if item was added to collections
    if (sanitizedCollectionIds && sanitizedCollectionIds.length > 0) {
      try {
        for (const cid of sanitizedCollectionIds) {
          const count = await Item.countDocuments({ collectionIds: cid });
          await Collection.findByIdAndUpdate(cid, { itemCount: count });
        }
      } catch (collErr) {
        console.warn("Collection count update failed", collErr.message);
      }
    }

    // Enqueue worker or process sync based on environment
    if (process.env.VERCEL || process.env.SYNC_AI === 'true') {
      console.log(`[Sync] Direct enrichment for ${item._id}`);
      try {
        await enrichItemWithAI(item._id);
        const enrichedItem = await Item.findById(item._id);
        return res.status(201).json(enrichedItem || item);
      } catch (e) {
        console.error("Sync AI enrichment failed", e);
        return res.status(201).json(item);
      }
    } else {
      try {
        await itemQueue.add("process-ai", { itemId: item._id }, { jobId: `ai-${item._id}` });
      } catch (qErr) {
        console.warn("Queue failed, trying sync fallback", qErr.message);
        try { 
          await enrichItemWithAI(item._id); 
          const enrichedItem = await Item.findById(item._id);
          return res.status(201).json(enrichedItem || item);
        } catch (e) {}
      }
      return res.status(201).json(item);
    }
  } catch (error) {
    console.error("Create Item Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to create item" });
    }
  }
};

export const getItems = async (req, res) => {
  try {
    const { isArchived } = req.query;
    const query = { 
      userId: req.user.id,
      isArchived: isArchived === 'true' 
    };
    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    item.viewCount += 1;
    item.lastViewedAt = Date.now();
    await item.save();
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const collectionIds = item.collectionIds || [];
    await Item.findByIdAndDelete(item._id);

    // Update collection counts after deletion
    if (collectionIds.length > 0) {
      for (const cid of collectionIds) {
        const count = await Item.countDocuments({ collectionIds: cid });
        await Collection.findByIdAndUpdate(cid, { itemCount: count });
      }
    }

    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const searchItems = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    
    let items = [];
    
    // Attempt Semantic Vector Search First
    if (process.env.MISTRAL_API_KEY) {
      try {
        const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
        const qEmbed = await client.embeddings.create({
          model: "mistral-embed",
          inputs: [q]
        });
        const vector = qEmbed.data[0].embedding;

        items = await Item.aggregate([
          {
            $vectorSearch: {
              index: "vector_index", // User MUST create this index in Atlas Search UI
              path: "embedding",
              queryVector: vector,
              numCandidates: 100,
              limit: 20
            }
          },
          { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } }
        ]);
      } catch (vecErr) {
        console.warn("Vector search failed or index missing. Falling back to text search", vecErr.message);
      }
    }
    
    // Fallback to basic text search if vector fails or is empty
    if (items.length === 0) {
      items = await Item.find({
        userId: req.user.id,
        $text: { $search: q }
      }).limit(20);
    }
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const filterItems = async (req, res) => {
  try {
    const { type, tag, collectionId, isArchived } = req.query;
    let query = { userId: req.user.id };
    
    // Default to NOT showing archived items unless specifically requested
    query.isArchived = isArchived === 'true';
    
    if (type) query.type = type;
    if (tag) query.tags = tag;
    if (collectionId) query.collectionIds = collectionId;
    
    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Cosine Similarity Utility
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    mA += vecA[i] * vecA[i];
    mB += vecB[i] * vecB[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  if (mA === 0 || mB === 0) return 0;
  return dotProduct / (mA * mB);
};

export const getGraphData = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id }).select('title type tags aiTags embedding');
    
    const nodes = [];
    const links = [];
    const tagsMap = new Map(); // track tag nodes

    // 1. Create Item Nodes
    items.forEach(i => {
      nodes.push({ 
        id: i._id.toString(), 
        name: i.title || "Untitled", 
        type: i.type, 
        group: 'item',
        val: 2 // base node size
      });

      // 2. Map Tags (Manual + AI)
      const allTags = [...(i.tags || []), ...(i.aiTags || [])];
      allTags.forEach(tag => {
        if (!tagsMap.has(tag)) {
          tagsMap.set(tag, { id: `tag-${tag}`, name: `#${tag}`, group: 'tag', val: 4 });
          nodes.push(tagsMap.get(tag));
        }
        // Link Item to Tag
        links.push({ source: i._id.toString(), target: `tag-${tag}`, type: 'tag-link', strength: 0.5 });
      });
    });

    // 3. Semantic Similarity Links (cross-linking items)
    for (let i = 0; i < items.length; i++) {
      if (!items[i].embedding || items[i].embedding.length === 0) continue;
      
      let similarities = [];
      for (let j = i + 1; j < items.length; j++) {
        if (!items[j].embedding || items[j].embedding.length === 0) continue;
        
        const score = cosineSimilarity(items[i].embedding, items[j].embedding);
        if (score > 0.85) { // High threshold
          similarities.push({ target: items[j]._id.toString(), score });
        }
      }

      similarities.sort((a, b) => b.score - a.score).slice(0, 2).forEach(s => {
        links.push({ source: items[i]._id.toString(), target: s.target, type: 'semantic-link', strength: s.score });
      });
    }
    
    res.json({ nodes, links });
  } catch (error) {
    console.error("Graph Data Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRelatedItems = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item || !item.embedding || item.embedding.length === 0) {
      return res.json([]); 
    }

    // Atlas Vector Search for similarity
    const related = await Item.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: item.embedding,
          numCandidates: 50,
          limit: 6
        }
      },
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(req.user.id),
          _id: { $ne: item._id } // Exclude current item
        } 
      }
    ]);

    res.json(related);
  } catch (error) {
    console.error("Related Items Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
