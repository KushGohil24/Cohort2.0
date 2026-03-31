import express from "express";
import ImageKit from "imagekit";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "dummy_public_key",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy_private_key",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/dummy",
});

router.get("/auth", protectRoute, (req, res) => {
  try {
    const params = imagekit.getAuthenticationParameters();
    res.json({
      ...params,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY
    });
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    res.status(500).json({ message: "Failed to generate auth params" });
  }
});

export default router;
