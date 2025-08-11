import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(path.join(dataDir, 'portfolio.db'));
export const db = drizzle(sqlite, { schema });

// Auto-migrate on startup in development
if (process.env.NODE_ENV !== 'production') {
  try {
    migrate(db, { migrationsFolder: './lib/db/migrations' });
  } catch (error) {
    console.log('Migration error (might be normal on first run):', error);
  }
}

export default db;
