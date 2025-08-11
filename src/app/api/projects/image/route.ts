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
    const file = formData.get('image') as File;
    const projectId = formData.get('projectId') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { success: false, message: 'Project ID required' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Only JPEG, PNG, and WebP images are allowed' },
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Remove existing image for this project
    try {
      const { readdir } = await import('fs/promises');
      const files = await readdir(uploadsDir);
      for (const existingFile of files) {
        if (existingFile.startsWith(`${projectId}.`)) {
          await unlink(path.join(uploadsDir, existingFile));
        }
      }
    } catch (error) {
      console.log('No existing project images to remove');
    }

    // Get file extension
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${projectId}.${extension}`;
    const filepath = path.join(uploadsDir, filename);

    // Save file
    await writeFile(filepath, buffer);

    // Return the public URL
    const imageUrl = `/uploads/projects/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
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
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { success: false, message: 'Project ID required' },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
    
    // Remove all images for this project
    const { readdir } = await import('fs/promises');
    if (existsSync(uploadsDir)) {
      const files = await readdir(uploadsDir);
      for (const file of files) {
        if (file.startsWith(`${projectId}.`)) {
          await unlink(path.join(uploadsDir, file));
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Project image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
