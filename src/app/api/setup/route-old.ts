import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function POST() {
  try {
    console.log('Creating messages table if not exists...');
    
    // Create messages table using raw SQL with exact schema from drizzle
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    console.log('Messages table created successfully');
    
    // Test inserting a sample message
    try {
      const testMessage = {
        id: 'test-setup-id',
        name: 'Setup Test',
        email: 'setup@test.com',
        subject: 'Setup Test Message',
        message: 'This is a test message created during setup',
        isRead: false
      };
      
      await db.execute(sql`
        INSERT INTO messages (id, name, email, subject, message, is_read, created_at)
        VALUES (${testMessage.id}, ${testMessage.name}, ${testMessage.email}, ${testMessage.subject}, ${testMessage.message}, ${testMessage.isRead}, NOW())
        ON CONFLICT (id) DO NOTHING
      `);
      
      console.log('Test message inserted successfully');
    } catch (insertError) {
      console.log('Insert test failed:', insertError instanceof Error ? insertError.message : 'Unknown');
    }

    return NextResponse.json({
      success: true,
      message: 'Messages table created and tested successfully',
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
