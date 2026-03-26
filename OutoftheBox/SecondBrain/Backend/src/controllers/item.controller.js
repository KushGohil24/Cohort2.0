import Item from "../models/item.model.js";
import { extractFromUrl } from "../utils/extractor.js";
import { itemQueue } from "../queue/item.queue.js";
import { Mistral } from "@mistralai/mistralai";
import mongoose from "mongoose";

export const createItem = async (req, res) => {
  try {
    const { url, type, title, description, tags, collectionIds, fileUrl } = req.body;
    
    let itemData = {
      userId: req.user.id,
      type: type || "note",
      title: title || "Untitled Note",
      description,
      tags: tags || [],
      collectionIds: collectionIds || []
    };

    if (url) {
      const extracted = await extractFromUrl(url);
      itemData = { ...itemData, ...extracted, title: title || extracted.title };
    } else if (fileUrl) {
      itemData.fileUrl = fileUrl;
    }

    const item = await Item.create({ ...itemData, status: "pending" });
    
    // Enqueue the async worker to perform AI summarization and vector semantic embeddings
    try {
      await itemQueue.add("process-ai", { itemId: item._id }, { jobId: `ai-${item._id}` });
    } catch (qErr) {
      console.warn("Queue push failed, item created without background job", qErr.message);
    }
    
    res.status(201).json(item);
  } catch (error) {
    console.error("Create Item Error:", error);
    res.status(500).json({ message: "Failed to create item" });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id }).sort({ createdAt: -1 });
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
    const item = await Item.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
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
          { $match: { user: new mongoose.Types.ObjectId(req.user.id) } } // User field is named `user` not `userId` on the schema relation usually, but let's check
        ]);
      } catch (vecErr) {
        console.warn("Vector search failed or index missing. Falling back to text search", vecErr.message);
      }
    }
    
    // Fallback to basic text search if vector fails or is empty
    if (items.length === 0) {
      items = await Item.find({
        user: req.user.id,
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
    const { type, tag, collectionId } = req.query;
    let query = { userId: req.user.id };
    
    if (type) query.type = type;
    if (tag) query.tags = tag;
    if (collectionId) query.collectionIds = collectionId;
    
    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getGraphData = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).select('title type tags favicon');
    
    const nodes = items.map(i => ({ 
      id: i._id.toString(), 
      name: i.title, 
      group: i.type, 
      tags: i.tags || []
    }));
    
    const links = [];
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const sharedTags = nodes[i].tags.filter(t => nodes[j].tags.includes(t));
        if (sharedTags.length > 0) {
          links.push({
            source: nodes[i].id,
            target: nodes[j].id,
            strength: sharedTags.length
          });
        }
      }
    }
    
    res.json({ nodes, links });
  } catch (error) {
    console.error("Graph Data Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
