import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

export async function POST(request: NextRequest) {
  let sql: any = null;
  
  try {
    console.log('Contact form submission started');
    
    // Initialize postgres connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      console.error('DATABASE_URL not found');
      return NextResponse.json(
        { success: false, message: 'Database configuration error' },
        { status: 500 }
      );
    }

    console.log('Initializing database connection...');
    sql = postgres(connectionString, { ssl: 'require' });
    
    const body = await request.json();
    console.log('Request body received:', { 
      name: body.name ? 'present' : 'missing',
      email: body.email ? 'present' : 'missing',
      subject: body.subject ? 'present' : 'missing',
      message: body.message ? 'present' : 'missing'
    });
    
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: missing required fields');
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: invalid email format');
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    console.log('Creating messages table if not exists...');
    
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    console.log('Attempting to insert message into database...');
    
    // Insert message
    const result = await sql`
      INSERT INTO messages (name, email, subject, message, is_read, created_at)
      VALUES (${name}, ${email}, ${subject}, ${message}, false, NOW())
      RETURNING id, name, email, subject, message, is_read, created_at
    `;

    console.log('Message inserted successfully:', result[0]?.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: result[0]
    });

  } catch (error) {
    console.error('Error saving contact message:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      detail: (error as any)?.detail
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: 500 }
    );
  } finally {
    // Close connection
    if (sql) {
      try {
        await sql.end();
      } catch (closeError) {
        console.error('Error closing database connection:', closeError);
      }
    }
  }
}

export async function GET(request: NextRequest) {
  let sql: any = null;
  
  try {
    // Initialize postgres connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return NextResponse.json(
        { success: false, message: 'Database configuration error' },
        { status: 500 }
      );
    }

    sql = postgres(connectionString, { ssl: 'require' });
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get messages with pagination
    const allMessages = await sql`
      SELECT * FROM messages 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    // Get total count
    const countResult = await sql`SELECT COUNT(*) as total FROM messages`;
    const total = parseInt(countResult[0]?.total || '0');

    return NextResponse.json({
      success: true,
      data: allMessages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    );
  } finally {
    // Close connection
    if (sql) {
      try {
        await sql.end();
      } catch (closeError) {
        console.error('Error closing database connection:', closeError);
      }
    }
  }
}
