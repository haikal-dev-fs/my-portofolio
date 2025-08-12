import { NextRequest, NextResponse } from 'next/server';

// Simplified version without database for now
export async function GET() {
  try {
    // Return simple 404 response instead of trying to access database
    return NextResponse.json(
      { 
        success: false, 
        message: 'CV not available at the moment',
        cvUrl: null 
      },
      { status: 404 }
    );
  } catch (error) {
    console.error('CV API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        cvUrl: null 
      },
      { status: 500 }
    );
  }
}

// Disable other methods for now
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: false, message: 'Method not available' },
    { status: 404 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { success: false, message: 'Method not available' },
    { status: 404 }
  );
}
