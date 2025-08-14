import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Simple contact form submission started');
    
    const body = await request.json();
    const { name, email, subject, message } = body;

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

    // For now, just log the message (in production, you could send email via service like Resend/SendGrid)
    console.log('Contact Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Timestamp:', new Date().toISOString());

    // Simulate saving (replace with actual database/email service)
    const messageData = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'received'
    };

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: messageData
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again.'
      },
      { status: 500 }
    );
  }
}
