import "dotenv/config";
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    schema: './src/db/schema.ts',
    out: './src/db/migrations'
})