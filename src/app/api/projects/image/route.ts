import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { projects } from '../../../../lib/db/schema';
import { eq } from 'drizzle-orm';

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

    // Validate file size (max 2MB for base64 storage)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size must be less than 2MB' },
        { status: 400 }
      );
    }

    // Simpan file ke public/uploads/projects/
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // Nama file unik pakai projectId + ekstensi
    const ext = file.type.split('/')[1] || 'png';
    const fileName = `${projectId}.${ext}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/projects/${fileName}`;

    // Update project dengan path file
    const updatedProject = await db
      .update(projects)
      .set({ 
        imageUrl: publicUrl,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning();

    if (updatedProject.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: publicUrl
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload image', error: String(error) },
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

    // Remove image from project (set imageUrl to null)
    const updatedProject = await db
      .update(projects)
      .set({ 
        imageUrl: null,
  updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning();

    if (updatedProject.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete image', error: String(error) },
      { status: 500 }
    );
  }
}
