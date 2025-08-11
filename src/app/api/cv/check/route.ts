import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'cv');
    
    if (!existsSync(uploadsDir)) {
      return NextResponse.json({
        success: false,
        message: 'CV not available'
      });
    }

    // Check for CV files
    const { readdir } = await import('fs/promises');
    const files = await readdir(uploadsDir);
    const cvFile = files.find(file => file.endsWith('.pdf'));
    
    if (cvFile) {
      return NextResponse.json({
        success: true,
        cvUrl: `/uploads/cv/${cvFile}`,
        filename: cvFile
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'CV not available'
      });
    }

  } catch (error) {
    console.error('Error checking CV:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check CV availability' },
      { status: 500 }
    );
  }
}
