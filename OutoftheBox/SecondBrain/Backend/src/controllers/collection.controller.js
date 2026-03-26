import Collection from "../models/collection.model.js";
import Item from "../models/item.model.js";

export const createCollection = async (req, res) => {
  try {
    const { name, description, color, icon } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const collection = await Collection.create({
      userId: req.user.id,
      name,
      description,
      color,
      icon
    });

    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const collection = await Collection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    
    // Optional: Removing this collection ID from items
    await Item.updateMany(
      { collectionIds: req.params.id },
      { $pull: { collectionIds: req.params.id } }
    );
    
    res.json({ message: "Collection removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addItemToCollection = async (req, res) => {
  try {
    const { itemId } = req.body;
    
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }
    
    const collection = await Collection.findOne({ _id: req.params.id, userId: req.user.id });
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    
    const item = await Item.findOneAndUpdate(
      { _id: itemId, userId: req.user.id },
      { $addToSet: { collectionIds: collection._id } },
      { new: true }
    );
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Update count (simplistic approach, ideally use aggregation)
    const count = await Item.countDocuments({ collectionIds: collection._id });
    collection.itemCount = count;
    await collection.save();
    
    res.json({ message: "Item added to collection", collection, item });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
