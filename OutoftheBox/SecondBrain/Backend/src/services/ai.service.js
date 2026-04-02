import { Mistral } from '@mistralai/mistralai';
import Item from '../models/item.model.js';

/**
 * Performs AI enrichment on a specific item:
 * 1. AI Summarization (Mistral Small or Pixtral for images)
 * 2. AI Metadata/Tag generation
 * 3. Vector Embeddings (mistral-embed)
 */
export const enrichItemWithAI = async (itemId) => {
  const item = await Item.findById(itemId);
  if (!item) throw new Error("Item not found during AI enrichment");

  item.status = 'processing';
  await item.save();

  try {
    const MISTRAL_KEY = process.env.MISTRAL_API_KEY;
    if (!MISTRAL_KEY) {
      console.warn("[AI Service] Missing MISTRAL_API_KEY. Skipping enrichment.");
      item.status = 'completed';
      await item.save();
      return item;
    }

    const typeLabel = item.type ? `[Type: ${item.type.toUpperCase()}] ` : "";
    const textToAnalyze = typeLabel + (item.rawText || item.description || item.title || "");

    // --- STEP 1: MISTRAL SUMMARIZATION & TAGGING ---
    if (textToAnalyze.length > 5 || item.type === 'image') {
      const client = new Mistral({ apiKey: MISTRAL_KEY });
      const isImage = item.type === 'image' && (item.fileUrl || item.url);
      const model = isImage ? "pixtral-12b-2409" : "mistral-small-latest";
      
      let messages = [
        { role: "system", content: "You are a semantic processing engine. Return a strictly valid JSON object containing exactly two keys: 'summary' (a concise 1-sentence overview) and 'tags' (an array of 3-5 high-level structural category strings). Do not use markdown blocks." }
      ];

      if (isImage) {
        messages.push({
          role: "user",
          content: [
            { type: "text", text: `Analyze this image and provide a concise 1-sentence summary and 3-5 semantic tags. Title: ${item.title}` },
            { type: "image_url", imageUrl: item.fileUrl || item.url }
          ]
        });
      } else {
        messages.push({
          role: "user",
          content: `Please analyze this content and provide a concise 1-sentence summary and 3-5 semantic tags: ${textToAnalyze}`
        });
      }

      const completion = await client.chat.complete({
        model: model,
        messages: messages,
        temperature: 0.2,
        responseFormat: { type: "json_object" }
      });
      
      try {
        const aiResponse = JSON.parse(completion.choices[0].message.content.trim());
        item.aiSummary = aiResponse.summary;
        item.aiTags = aiResponse.tags;
      } catch (parseError) {
        console.warn("[AI Service] Failed to parse Mistral JSON output:", parseError);
      }
    }

    // --- STEP 2: MISTRAL VECTOR EMBEDDINGS ---
    if (item.aiSummary || textToAnalyze.length > 5) {
      const client = new Mistral({ apiKey: MISTRAL_KEY });
      const contentToEmbed = item.aiSummary || textToAnalyze.substring(0, 1000); 
      
      try {
        const embeddingResponse = await client.embeddings.create({
          model: "mistral-embed",
          inputs: [contentToEmbed]
        });
        item.embedding = embeddingResponse.data[0].embedding;
      } catch (embErr) {
        console.warn("[AI Service] Failed to generate embedding vector:", embErr);
      }
    }

    item.status = 'completed';
    await item.save();
    return item;

  } catch (err) {
    item.status = 'failed';
    await item.save();
    console.error(`[AI Service] Enrichment Failed for ${itemId}:`, err.message);
    throw err;
  }
};
