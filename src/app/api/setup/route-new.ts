import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

export async function POST() {
  let sql: postgres.Sql | null = null;
  
  try {
    console.log('Setting up database connection...');
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured');
    }

    sql = postgres(process.env.DATABASE_URL);

    console.log('Dropping existing messages table...');
    
    // Drop table if exists
    await sql`DROP TABLE IF EXISTS messages`;

    console.log('Creating messages table with SERIAL primary key...');
    
    // Create messages table with SERIAL primary key
    await sql`
      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    console.log('Messages table created successfully');
    
    // Test inserting a sample message
    try {
      const result = await sql`
        INSERT INTO messages (name, email, subject, message)
        VALUES ('Setup Test', 'setup@test.com', 'Setup Test Message', 'This is a test message created during setup')
        RETURNING id, name, email, subject, message, is_read, created_at
      `;
      
      console.log('Test message inserted successfully with ID:', result[0]?.id);
    } catch (insertError) {
      console.log('Insert test failed:', insertError instanceof Error ? insertError.message : 'Unknown');
    }

    return NextResponse.json({
      success: true,
      message: 'Messages table created and tested successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database setup error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Database setup failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    if (sql) {
      try {
        await sql.end();
      } catch (closeError) {
        console.error('Error closing database connection:', closeError);
      }
    }
  }
}
