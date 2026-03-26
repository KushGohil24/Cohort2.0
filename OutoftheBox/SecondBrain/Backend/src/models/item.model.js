import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema({
  text: String,
  color: { type: String, default: "#FFFF00" },
  createdAt: { type: Date, default: Date.now }
});

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true           // for fast user-specific queries
  },

  // ── What type of content ──────────────────────────
  type: {
    type: String,
    enum: ["article", "tweet", "youtube", "pdf", "image", "note"],
    required: true
  },

  // ── Source info ───────────────────────────────────
  url: {
    type: String,
    default: null          // null for manually typed notes
  },
  domain: {
    type: String,
    default: null          // "medium.com", "twitter.com" etc
  },

  // ── Extracted Content ─────────────────────────────
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null          // meta description or first 200 chars
  },
  rawText: {
    type: String,
    default: null          // full extracted text (for embeddings later)
  },
  thumbnail: {
    type: String,
    default: null          // og:image or youtube thumbnail
  },
  favicon: {
    type: String,
    default: null          // site favicon
  },

  // ── For YouTube specifically ──────────────────────
  videoId: {
    type: String,
    default: null
  },
  transcript: {
    type: String,
    default: null
  },
  duration: {
    type: String,
    default: null          // "12:34"
  },

  // ── For PDF/Image ─────────────────────────────────
  fileUrl: {
    type: String,
    default: null          // S3 / Cloudinary URL
  },
  fileSize: {
    type: Number,
    default: null          // in bytes
  },

  // ── AI fields (Phase 2) ───────
  tags: {
    type: [String],
    default: []
  },
  aiSummary: {
    type: String,
    default: null
  },
  aiTags: {
    type: [String],
    default: []
  },
  embedding: {
    type: [Number],
    default: []            // 1024-dim vector natively from mistral-embed
  },
  clusterId: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "completed"
  },

  // ── User actions ──────────────────────────────────
  highlights: [highlightSchema],
  isFavorite: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  collectionIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection"
  }],

  // ── Resurfacing ───────────────────────────────────
  lastSurfacedAt: {
    type: Date,
    default: null
  },
  viewCount: {
    type: Number,
    default: 0
  },
  lastViewedAt: {
    type: Date,
    default: null
  }

}, { timestamps: true });    // gives createdAt, updatedAt automatically

// text index for basic search in Step 1
itemSchema.index({ title: "text", description: "text", tags: "text" });

export default mongoose.model("Item", itemSchema);
