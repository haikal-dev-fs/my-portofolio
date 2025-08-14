import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function POST() {
  try {
    console.log('Creating messages table if not exists...');
    
    // Create messages table using raw SQL
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY DEFAULT generate_random_uuid()::text,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    console.log('Messages table created successfully');

    return NextResponse.json({
      success: true,
      message: 'Messages table created successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating messages table:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create messages table',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
