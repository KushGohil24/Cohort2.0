import { extractFromUrl } from "../utils/extractor.js";
import { Mistral } from "@mistralai/mistralai";

export const extractContent = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const previewData = await extractFromUrl(url);
    
    // Generate AI tags for the preview
    if (process.env.MISTRAL_API_KEY) {
      try {
        const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
        const chatResponse = await client.chat.complete({
          model: "mistral-small-latest",
          messages: [
            {
              role: "user",
              content: `Generate exactly 5 short, single-word semantic tags for this content based on its title and description. 
              Output as a valid JSON array of strings only.
              Title: ${previewData.title}
              Description: ${previewData.description || previewData.rawText?.substring(0, 500)}`
            }
          ],
          responseFormat: { type: "json_object" }
        });

        const resultJson = JSON.parse(chatResponse.choices[0].message.content);
        // Sometimes the AI returns { "tags": [...] } or just an array. Handle both.
        previewData.aiTags = Array.isArray(resultJson) ? resultJson : (resultJson.tags || []);
      } catch (aiErr) {
        console.warn("AI Tagging during preview failed", aiErr.message);
        previewData.aiTags = [];
      }
    }

    res.json(previewData);
  } catch (error) {
    console.error("Extraction Error:", error);
    res.status(500).json({ message: "Failed to extract content from URL" });
  }
};
