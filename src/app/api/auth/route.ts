import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'adminkal';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create a response with a simple token (in production, use proper JWT)
    const response = NextResponse.json(
      { success: true, message: 'Authentication successful' },
      { status: 200 }
    );

    // Set a simple auth cookie
    response.cookies.set('admin-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );

  response.cookies.delete('admin-auth');
  
  return response;
}
