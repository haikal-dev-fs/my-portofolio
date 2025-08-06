import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin-session');
    
    // If no session and not accessing login API, redirect to login
    if (!adminSession && !request.nextUrl.pathname.includes('/api/auth')) {
      // Allow the admin page to load so it can show the login form
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
