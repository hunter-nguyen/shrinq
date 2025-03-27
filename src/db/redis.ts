import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!),
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
  keepAlive: 30000,
});

export default redis;
