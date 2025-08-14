import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { profiles } from '../../../../lib/db/schema';

export async function GET(request: NextRequest) {
  try {
    const profile = await db.select().from(profiles).limit(1);
    
    if (profile.length === 0 || !profile[0].resumeUrl) {
      return NextResponse.json({
        success: true,
        data: {
          cvExists: false,
          url: null
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        cvExists: true,
        url: profile[0].resumeUrl, // Return direct URL from database
        filename: 'CV-Muhammad-Haikal.pdf'
      }
    });

  } catch (error) {
    console.error('Error checking CV:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to check CV availability',
      data: {
        cvExists: false,
        url: null
      }
    }, { status: 500 });
  }
}
