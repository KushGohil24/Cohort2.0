import { extractFromUrl } from "../utils/extractor.js";

export const extractContent = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const previewData = await extractFromUrl(url);
    res.json(previewData);
  } catch (error) {
    console.error("Extraction Error:", error);
    res.status(500).json({ message: "Failed to extract content from URL" });
  }
};
