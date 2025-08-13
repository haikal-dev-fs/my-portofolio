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

    // Validate file size (max 3MB for base64 storage)
    if (file.size > 3 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size must be less than 3MB' },
        { status: 400 }
      );
    }

    // Convert PDF to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64String}`;

    // Get or create profile
    const existingProfile = await db.select().from(profiles).limit(1);
    
    if (existingProfile.length === 0) {
      // Create new profile with CV
      const newProfile = await db.insert(profiles).values({
        name: "Muhammad Haikal",
        title: "Project Manager & Fullstack Engineer",
        bio: "Bridging the gap between technical excellence and project success.",
        email: "haikal@example.com",
        phone: "+6285777123456",
        location: "Jakarta, Indonesia",
        linkedinUrl: "https://linkedin.com/in/haikal-dev",
        githubUrl: "https://github.com/haikal-dev-fs",
        resumeUrl: dataUrl,
        skills: JSON.stringify(["Agile/Scrum", "Team Leadership", "Risk Assessment", "React", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap CSS", "HTML", "PHP", "Laravel", "Lumen", "Swagger", "Node.js", "Python", "PostgreSQL", "MongoDB", "MySQL", "CI/CD", "Git"]),
        updatedAt: Date.now()
      }).returning();

      return NextResponse.json({
        success: true,
        message: 'CV uploaded successfully',
        data: newProfile[0]
      });
    } else {
      // Update existing profile with CV
      const updatedProfile = await db
        .update(profiles)
        .set({
          resumeUrl: dataUrl,
          updatedAt: Date.now()
        })
        .where(eq(profiles.id, existingProfile[0].id))
        .returning();

      return NextResponse.json({
        success: true,
        message: 'CV updated successfully',
        data: updatedProfile[0]
      });
    }

  } catch (error) {
    console.error('Error uploading CV:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload CV', error: String(error) },
      { status: 500 }
    );
  }
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

    // Extract base64 data from data URL
    const resumeUrl = profile[0].resumeUrl;
    if (!resumeUrl.startsWith('data:application/pdf;base64,')) {
      return NextResponse.json(
        { success: false, message: 'Invalid CV format' },
        { status: 400 }
      );
    }

    const base64Data = resumeUrl.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

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
        updatedAt: Date.now()
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
