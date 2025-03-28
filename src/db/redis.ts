import { Redis } from '@upstash/redis';
import { config } from 'dotenv';

config({ path: '.env' });

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

export default redis;
