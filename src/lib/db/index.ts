import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { profiles, projects, experiences } from './schema';
import { createId } from '@paralleldrive/cuid2';

let db: ReturnType<typeof drizzle>;

function initializeDatabase(sqlite: Database.Database) {
  const drizzleDb = drizzle(sqlite, { schema });
  
  // Create tables if they don't exist
  try {
    // Run migrations manually for production
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS profiles (
        id text PRIMARY KEY NOT NULL,
        name text NOT NULL,
        title text NOT NULL,
        bio text NOT NULL,
        email text NOT NULL,
        phone text,
        location text,
        linkedin_url text,
        github_url text,
        resume_url text,
        avatar_url text,
        skills text,
        created_at integer,
        updated_at integer
      );
    `);
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id text PRIMARY KEY NOT NULL,
        title text NOT NULL,
        description text NOT NULL,
        long_description text,
        image_url text,
        demo_url text,
        github_url text,
        technologies text,
        category text DEFAULT 'web' NOT NULL,
        featured integer DEFAULT 0,
        "order" integer DEFAULT 0,
        created_at integer,
        updated_at integer
      );
    `);
    
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS experiences (
        id text PRIMARY KEY NOT NULL,
        company text NOT NULL,
        position text NOT NULL,
        description text NOT NULL,
        start_date text NOT NULL,
        end_date text,
        location text,
        skills text,
        "order" integer DEFAULT 0,
        created_at integer,
        updated_at integer
      );
    `);
    
    console.log('Tables created successfully');
    
  } catch (error) {
    console.error('Database initialization error:', error);
  }
  
  return drizzleDb;
}

try {
  if (process.env.NODE_ENV === 'production') {
    // For Vercel production, use memory database with auto-initialization
    console.log('Using memory database for production');
    const sqlite = new Database(':memory:');
    db = initializeDatabase(sqlite);
  } else {
    // For development
    console.log('Using file database for development');
    const sqlite = new Database('./data/portfolio.db');
    db = drizzle(sqlite, { schema });
  }
} catch (error) {
  console.error('Database initialization error:', error);
  // Fallback to memory database with basic initialization
  try {
    const sqlite = new Database(':memory:');
    db = initializeDatabase(sqlite);
  } catch (fallbackError) {
    console.error('Fallback database initialization error:', fallbackError);
    const sqlite = new Database(':memory:');
    db = drizzle(sqlite, { schema });
  }
}

export default db;
