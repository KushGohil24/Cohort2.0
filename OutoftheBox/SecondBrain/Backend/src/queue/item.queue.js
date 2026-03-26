import { Queue } from 'bullmq';
import connection from '../config/redis.js';

export const itemQueue = new Queue('item-processing', { 
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true
  }
});
