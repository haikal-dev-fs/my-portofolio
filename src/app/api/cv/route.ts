import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';
import { profiles } from '../../../lib/db/schema';
import { eq } from 'drizzle-orm';

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

export async function POST(request: NextRequest) {
  // This endpoint is deprecated. Use Supabase Storage and /api/profile for upload/update resumeUrl.
  return NextResponse.json({
    success: false,
    message: 'Upload CV via Supabase Storage and update /api/profile instead.'
  }, { status: 400 });
}

export async function GET() {
  try {
    const profile = await db.select().from(profiles).limit(1);
    if (profile.length === 0 || !profile[0].resumeUrl) {
      return NextResponse.json(
        { success: false, message: 'CV not found' },
        { status: 404 }
      );
    }
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'public', profile[0].resumeUrl);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: 'CV file not found on server' },
        { status: 404 }
      );
    }
    const buffer = fs.readFileSync(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="CV-Muhammad-Haikal.pdf"',
        'Content-Length': buffer.length.toString()
      }
    });
  } catch (error) {
    console.error('Error downloading CV:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to download CV', error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const profile = await db.select().from(profiles).limit(1);
    
    if (profile.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Profile not found' },
        { status: 404 }
      );
    }

    // Remove CV from profile
    await db
      .update(profiles)
      .set({
        resumeUrl: null,
  updatedAt: new Date()
      })
      .where(eq(profiles.id, profile[0].id));

    return NextResponse.json({
      success: true,
      message: 'CV deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting CV:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete CV', error: String(error) },
      { status: 500 }
    );
  }
}
