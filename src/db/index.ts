import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '@/db/schema';

config({ path: '.env' });

export const db = drizzle({ connection: {
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
},
schema,
});
