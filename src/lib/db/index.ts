import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

let db: ReturnType<typeof drizzle>;

try {
  if (process.env.NODE_ENV === 'production') {
    // For Vercel production, use memory database as fallback
    console.log('Using memory database for production');
    const sqlite = new Database(':memory:');
    db = drizzle(sqlite, { schema });
  } else {
    // For development
    console.log('Using file database for development');
    const sqlite = new Database('./data/portfolio.db');
    db = drizzle(sqlite, { schema });
  }
} catch (error) {
  console.error('Database initialization error:', error);
  // Fallback to memory database
  const sqlite = new Database(':memory:');
  db = drizzle(sqlite, { schema });
}

export default db;
