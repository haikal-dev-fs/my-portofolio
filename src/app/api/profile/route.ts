import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';
import { profiles } from '../../../lib/db/schema';
import { eq } from 'drizzle-orm';

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

export async function GET() {
  try {
    const profileData = await db.select().from(profiles).limit(1);
    
    if (profileData.length === 0) {
      // Return default profile based on your AboutSection.tsx data
      return NextResponse.json({
        success: true,
        data: {
          name: "Muhammad Haikal",
          title: "Project Manager & Fullstack Engineer",
          bio: "Bridging the gap between technical excellence and project success. I bring both hands-on development skills and strategic project management expertise.",
          email: "haikal@example.com",
          phone: "+6285777123456",
          location: "Jakarta, Indonesia",
          linkedinUrl: "https://linkedin.com/in/haikal-dev",
          githubUrl: "https://github.com/haikal-dev-fs",
          resumeUrl: null, // Will be set when CV is uploaded
          skills: JSON.stringify({
            "Management": ["Agile/Scrum", "Team Leadership", "Risk Assessment"],
            "Frontend": ["React", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap CSS", "HTML"],
            "Backend": ["PHP", "Laravel", "Lumen", "Swagger", "Node.js", "Python", "PostgreSQL", "MongoDB", "MySQL"],
            "DevOps": ["CI/CD", "Git"]
          }),
          stats: JSON.stringify([
            { label: 'Projects Completed', value: '20+' },
            { label: 'Team Members Led', value: '10+' },
            { label: 'Years Experience', value: '3+' },
            { label: 'Technologies Mastered', value: '20+' }
          ])
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: profileData[0]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      name,
      title,
      bio,
      email,
      phone,
      location,
      linkedinUrl,
      githubUrl,
      resumeUrl,
      avatarUrl,
      skills
    } = body;

    // Check if profile exists
    const existingProfile = await db.select().from(profiles).limit(1);
    
    if (existingProfile.length === 0) {
      // Create new profile
      const newProfile = await db.insert(profiles).values({
        name,
        title,
        bio,
        email,
        phone,
        location,
        linkedinUrl,
        githubUrl,
        resumeUrl,
        avatarUrl,
        skills: JSON.stringify(skills),
        updatedAt: Date.now()
      }).returning();

      return NextResponse.json({
        success: true,
        data: newProfile[0],
        message: 'Profile created successfully'
      });
    } else {
      // Update existing profile
      const updatedProfile = await db
        .update(profiles)
        .set({
          name,
          title,
          bio,
          email,
          phone,
          location,
          linkedinUrl,
          githubUrl,
          resumeUrl,
          avatarUrl,
          skills: JSON.stringify(skills),
          updatedAt: Date.now()
        })
        .where(eq(profiles.id, existingProfile[0].id))
        .returning();

      return NextResponse.json({
        success: true,
        data: updatedProfile[0],
        message: 'Profile updated successfully'
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
