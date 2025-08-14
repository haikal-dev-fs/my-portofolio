import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { messages } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Insert message into database
    const newMessage = await db.insert(messages).values({
      name,
      email,
      subject,
      message,
    }).returning();

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: newMessage[0]
    });

  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
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
