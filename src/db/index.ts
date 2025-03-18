import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from "./schema"
import Database from "better-sqlite3"
import 'dotenv/config';
import path from 'path';

// Construct the absolute path for the database
const dbPath = path.resolve(__dirname, '../../../../sqlite.db'); // Adjust the path as necessary

const sqlite = new Database(dbPath);

// Function to initialize the database
const initializeDatabase = () => {

    console.log("Database path:", dbPath);
    return drizzle(sqlite, {schema});
};

// Initialize the database
export const db = initializeDatabase();
