
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Use DATABASE_URL from environment
const connectionString = process.env.DATABASE_URL || '';
if (!connectionString) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

// Create postgres-js client
const client = postgres(connectionString, { ssl: 'require' });

// Create drizzle instance
const db = drizzle(client, { schema });

export default db;
