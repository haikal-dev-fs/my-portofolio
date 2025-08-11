import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('cv') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type (only PDF)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Remove old CV files
    const cvDir = path.join(uploadsDir, 'cv');
    if (!existsSync(cvDir)) {
      await mkdir(cvDir, { recursive: true });
    }

    // Remove existing CV files
    try {
      const { readdir } = await import('fs/promises');
      const files = await readdir(cvDir);
      for (const file of files) {
        if (file.endsWith('.pdf')) {
          await unlink(path.join(cvDir, file));
        }
      }
    } catch (error) {
      console.log('No existing CV files to remove');
    }

    // Generate consistent filename
    const filename = 'cv.pdf';
    const filepath = path.join(cvDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return public URL
    const publicUrl = `/uploads/cv/${filename}`;

    return NextResponse.json({
      success: true,
      data: {
        filename,
        url: publicUrl,
        size: file.size,
        uploadedAt: new Date().toISOString()
      },
      message: 'CV uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading CV:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload CV' },
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
    const cvDir = path.join(process.cwd(), 'public', 'uploads', 'cv');
    
    // Remove all CV files
    const { readdir } = await import('fs/promises');
    if (existsSync(cvDir)) {
      const files = await readdir(cvDir);
      for (const file of files) {
        if (file.endsWith('.pdf')) {
          await unlink(path.join(cvDir, file));
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'CV deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting CV:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete CV' },
      { status: 500 }
    );
  }
}
