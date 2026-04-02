import { Worker } from 'bullmq';
import connection from '../config/redis.js';
import { enrichItemWithAI } from '../services/ai.service.js';

export const itemWorker = new Worker('item-processing', async (job) => {
  const { itemId } = job.data;
  console.log(`[ItemWorker] Processing Enrichment for Item ${itemId}`);
  
  try {
    await enrichItemWithAI(itemId);
    console.log(`[ItemWorker] AI Processing Completed for Item ${itemId}`);
  } catch (err) {
    console.error(`[ItemWorker] Job ${job.id} Failed:`, err.message);
    throw err;
  }
}, { connection });

itemWorker.on('failed', (job, err) => {
  console.error(`[ItemWorker] Alert! Job ${job?.id} fatally failed with ${err.message}`);
});
