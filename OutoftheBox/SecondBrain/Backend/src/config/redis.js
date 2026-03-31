import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    if (times > 3) return null; // Stop aggressively retrying after 3 attempts so the server doesn't crash
    return Math.min(times * 100, 2000);
  }
});

connection.on('connect', () => {
  console.log('✅ Redis connected');
});

connection.on('error', (err) => {
  console.warn('⚠️ Redis connection error: Semantic AI features (BullMQ) will be disabled until Redis is active.');
});

export default connection;
