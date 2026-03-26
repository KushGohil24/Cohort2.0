import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import extractRoutes from "./routes/extract.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

// Initialize Queued Workers
import "./workers/item.worker.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/extract", extractRoutes);
app.use("/api/upload", uploadRoutes);

// Database connection & Server start
const PORT = process.env.PORT || 8000;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
