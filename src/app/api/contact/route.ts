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
    sql = postgres(connectionString, { 
      ssl: 'require',
      max: 1, // Limit to 1 connection
      idle_timeout: 20,
      connect_timeout: 10
    });
    
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
        error: error instanceof Error ? error.message : 'Unknown error',
        details: {
          name: error instanceof Error ? error.name : 'Unknown',
          code: (error as any)?.code,
          severity: (error as any)?.severity
        }
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
    console.log('GET /api/contact - Starting request');
    
    // Initialize postgres connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      console.error('DATABASE_URL not found in environment');
      return NextResponse.json(
        { success: false, message: 'Database configuration error' },
        { status: 500 }
      );
    }

    console.log('Creating postgres connection...');
    sql = postgres(connectionString, { 
      ssl: 'require',
      max: 1, // Limit to 1 connection
      idle_timeout: 20,
      connect_timeout: 10
    });
    
    // Ensure table exists first
    console.log('Ensuring messages table exists...');
    try {
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
      console.log('Messages table ready');
    } catch (tableError) {
      console.error('Error creating table:', tableError);
      throw tableError;
    }
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    console.log(`Fetching messages - page: ${page}, limit: ${limit}, offset: ${offset}`);

    // Get messages with pagination
    const allMessages = await sql`
      SELECT * FROM messages 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    console.log(`Found ${allMessages.length} messages`);

    // Get total count
    const countResult = await sql`SELECT COUNT(*) as total FROM messages`;
    const total = parseInt(countResult[0]?.total || '0');
    
    console.log(`Total messages in database: ${total}`);

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
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      severity: (error as any)?.severity
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch messages',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    // Close connection
    if (sql) {
      try {
        console.log('Closing database connection...');
        await sql.end();
        console.log('Database connection closed');
      } catch (closeError) {
        console.error('Error closing database connection:', closeError);
      }
    }
  }
}
