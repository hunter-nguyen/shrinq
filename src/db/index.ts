import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from "./schema"
import Database from "better-sqlite3"
import 'dotenv/config';
import path from 'path';

const dbPath = path.resolve('sqlite.db'); // Adjust the path as necessary

const sqlite = new Database(dbPath);

// Function to initialize the database
const initializeDatabase = () => {

    return drizzle(sqlite, {schema});

};

// Initialize the database
export const db = initializeDatabase();
