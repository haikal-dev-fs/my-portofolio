import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { messages } from '@/lib/db/schema';

export async function GET() {
  try {
    console.log('Health check started');
    
    // Check database connection
    console.log('Testing database connection...');
    await db.select().from(messages).limit(1);
    
    console.log('Database connection successful');
    
    return NextResponse.json({
      success: true,
      message: 'API and database are working correctly',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'configured' : 'missing'
      }
    });

  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'System check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
