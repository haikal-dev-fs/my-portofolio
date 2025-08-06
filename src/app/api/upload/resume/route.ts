import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink, readdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('resume') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF, DOC, and DOCX are allowed.' }, { status: 400 });
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size too large. Maximum 5MB allowed.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Remove old resume files
    try {
      const files = await readdir(uploadsDir);
      const resumeFiles = files.filter(f => f.startsWith('resume.') || f.startsWith('cv.'));
      for (const oldFile of resumeFiles) {
        await unlink(join(uploadsDir, oldFile));
      }
    } catch (error) {
      // No old files to remove
    }

    // Generate filename with original extension
    const extension = file.name.split('.').pop();
    const filename = `resume.${extension}`;
    const filepath = join(uploadsDir, filename);

    // Write the file
    await writeFile(filepath, buffer);

    // Return the public URL
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      message: 'Resume uploaded successfully',
      url: fileUrl,
      filename: filename
    });

  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
  }
}
