import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String, required: true },
  description: { type: String, default: null },
  color: { type: String, default: "#6366f1" },  // for UI
  icon: { type: String, default: "📁" },
  itemCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Collection", collectionSchema);
