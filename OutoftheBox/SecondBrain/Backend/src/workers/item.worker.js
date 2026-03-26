import { Worker } from 'bullmq';
import connection from '../config/redis.js';
import Item from '../models/item.model.js';
import { Mistral } from '@mistralai/mistralai';

export const itemWorker = new Worker('item-processing', async (job) => {
  const { itemId } = job.data;
  console.log(`[ItemWorker] Processing Enrichment for Item ${itemId}`);
  
  const item = await Item.findById(itemId);
  if (!item) throw new Error("Item not found during processing");

  item.status = 'processing';
  await item.save();

  try {
    console.log(`[ItemWorker] Commencing deep extraction and AI mapping for ${item.title}`);
    
    // --- STEP 1: DEEP TEXT EXTRACTION ---
    // Make sure we have enough raw text or description to analyze
    const textToAnalyze = item.rawText || item.description || item.title || "";

    // --- STEP 2: MISTRAL SUMMARIZATION & TAGGING ---
    if (textToAnalyze.length > 10 && process.env.MISTRAL_API_KEY) {
      console.log(`[ItemWorker] Sending context to Mistral for ${item.title}`);
      const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
      
      const completion = await client.chat.complete({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: "You are a semantic processing engine. Return a strictly valid JSON object containing exactly two keys: 'summary' (a concise 1-2 sentence overview) and 'tags' (an array of 3-5 high-level structural category strings). Do not use markdown blocks." },
          { role: "user", content: `Please analyze this content: ${textToAnalyze}` }
        ],
        temperature: 0.3,
        responseFormat: { type: "json_object" }
      });
      
      try {
        const aiResponse = JSON.parse(completion.choices[0].message.content.trim());
        item.aiSummary = aiResponse.summary;
        item.aiTags = aiResponse.tags;
      } catch (parseError) {
        console.warn("[ItemWorker] Failed to parse Mistral JSON output:", parseError);
      }
    } else {
      console.log(`[ItemWorker] Skipping Mistral enrichment (Insufficient text or Missing API Key).`);
    }

    // --- STEP 3: MISTRAL VECTOR EMBEDDINGS ---
    if (process.env.MISTRAL_API_KEY && (item.aiSummary || textToAnalyze.length > 5)) {
      console.log(`[ItemWorker] Generating Vector Embeddings for ${item.title}`);
      const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
      const contentToEmbed = item.aiSummary || textToAnalyze.substring(0, 1000); 
      
      try {
        const embeddingResponse = await client.embeddings.create({
          model: "mistral-embed",
          inputs: [contentToEmbed]
        });
        
        item.embedding = embeddingResponse.data[0].embedding;
        console.log(`[ItemWorker] Embedded successfully (Dims: ${item.embedding.length})`);
      } catch (embErr) {
        console.warn("[ItemWorker] Failed to generate embedding vector:", embErr);
      }
    }

    console.log(`[ItemWorker] AI Processing Completed for ${item.title}`);

    item.status = 'completed';
    await item.save();

  } catch (err) {
    item.status = 'failed';
    await item.save();
    console.error(`[ItemWorker] Job ${job.id} Failed:`, err.message);
    throw err;
  }
}, { connection });

itemWorker.on('failed', (job, err) => {
  console.error(`[ItemWorker] Alert! Job ${job?.id} fatally failed with ${err.message}`);
});
