import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { messages } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    console.log('Contact form submission started');
    
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

    console.log('Attempting to insert message into database...');
    
    // Check if messages table exists and create if needed
    try {
      // Test table existence with a simple query
      await db.select().from(messages).limit(1);
      console.log('Messages table exists');
    } catch (tableError) {
      console.log('Messages table might not exist, error:', tableError instanceof Error ? tableError.message : 'Unknown');
      // Re-throw the original error for now
      throw tableError;
    }
    
    // Insert message into database
    const newMessage = await db.insert(messages).values({
      name,
      email,
      subject,
      message,
    }).returning();

    console.log('Message inserted successfully:', newMessage[0]?.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: newMessage[0]
    });

  } catch (error) {
    console.error('Error saving contact message:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint is for admin to retrieve messages
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const allMessages = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db.select().from(messages);

    return NextResponse.json({
      success: true,
      data: allMessages,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        totalPages: Math.ceil(totalCount.length / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
