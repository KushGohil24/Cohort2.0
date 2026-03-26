import express from "express";
import { extractContent } from "../controllers/extract.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Optionally protect this, or leave open if previewing doesn't require auth
router.post("/", protectRoute, extractContent);

export default router;
