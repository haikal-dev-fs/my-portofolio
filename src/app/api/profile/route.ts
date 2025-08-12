import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';
import { profiles } from '../../../lib/db/schema';
import { eq } from 'drizzle-orm';
import { Profile } from '../../../lib/db/schema';

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

// In-memory fallback storage for Vercel deployment issues
let memoryProfile: Profile | null = null;

export async function GET() {
  try {
    let profileData: Profile[] = [];
    
    // Try to get from database first
    try {
      profileData = await db.select().from(profiles).limit(1);
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // Check if we have memory profile as fallback
      if (memoryProfile) {
        return NextResponse.json({
          success: true,
          data: memoryProfile
        });
      }
      profileData = [];
    }
    
    if (profileData.length === 0) {
      // Return default profile - REMOVED stats property
      const defaultProfile: Partial<Profile> = {
        id: 'default',
        name: "Muhammad Haikal",
        title: "Project Manager & Fullstack Engineer",
        bio: "Bridging the gap between technical excellence and project success. I bring both hands-on development skills and strategic project management expertise.",
        email: "mhaikalas@gmail.com",
        phone: "+62 8231 8979 805",
        location: "Jakarta, Indonesia",
        linkedinUrl: "https://www.linkedin.com/in/haikal-alfandi-61836922a/",
        githubUrl: "https://github.com/haikal-dev-fs",
        resumeUrl: null,
        skills: JSON.stringify({
          "Management": ["Agile/Scrum", "Team Leadership", "Risk Assessment"],
          "Frontend": ["React", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap CSS", "HTML"],
          "Backend": ["PHP", "Laravel", "Lumen", "Swagger", "Node.js", "Python", "PostgreSQL", "MongoDB", "MySQL"],
          "DevOps": ["CI/CD", "Git"]
        }),
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      return NextResponse.json({
        success: true,
        data: defaultProfile
      });
    }

    return NextResponse.json({
      success: true,
      data: profileData[0]
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch profile', error: String(error) },
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
    console.log('Received profile update:', body);

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
    }: {
      name: string;
      title: string;
      bio: string;
      email: string;
      phone?: string;
      location?: string;
      linkedinUrl?: string;
      githubUrl?: string;
      resumeUrl?: string;
      avatarUrl?: string;
      skills?: string | string[];
    } = body;

    // Validate required fields
    if (!name || !title || !bio || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, title, bio, email' },
        { status: 400 }
      );
    }

    const profileData: Partial<Profile> = {
      name,
      title,
      bio,
      email,
      phone: phone || null,
      location: location || null,
      linkedinUrl: linkedinUrl || null,
      githubUrl: githubUrl || null,
      resumeUrl: resumeUrl || null,
      avatarUrl: avatarUrl || null,
      skills: typeof skills === 'string' ? skills : JSON.stringify(skills || {}),
      updatedAt: Date.now()
    };

    // Try database operations with fallback to memory storage
    try {
      console.log('Attempting database operation...');
      
      // Check if profile exists
      const existingProfile: Profile[] = await db.select().from(profiles).limit(1);
      
      if (existingProfile.length === 0) {
        // Create new profile
        console.log('Creating new profile in database...');
        const newProfile = await db.insert(profiles).values({
          ...profileData,
          createdAt: Date.now()
        } as any).returning();

        console.log('Profile created successfully:', newProfile[0]);
        return NextResponse.json({
          success: true,
          data: newProfile[0],
          message: 'Profile created successfully'
        });
      } else {
        // Update existing profile
        console.log('Updating existing profile in database...');
        const updatedProfile = await db
          .update(profiles)
          .set(profileData as any)
          .where(eq(profiles.id, existingProfile[0].id))
          .returning();

        if (updatedProfile.length === 0) {
          throw new Error('No profile was updated');
        }

        console.log('Profile updated successfully:', updatedProfile[0]);
        return NextResponse.json({
          success: true,
          data: updatedProfile[0],
          message: 'Profile updated successfully'
        });
      }
    } catch (dbError) {
      console.error('Database operation failed, using memory storage:', dbError);
      
      // Fallback to memory storage for Vercel deployment
      memoryProfile = {
        id: memoryProfile?.id || 'memory-1',
        ...profileData,
        createdAt: memoryProfile?.createdAt || Date.now()
      } as Profile;

      console.log('Profile stored in memory:', memoryProfile);
      return NextResponse.json({
        success: true,
        data: memoryProfile,
        message: 'Profile updated successfully (using temporary storage)'
      });
    }

  } catch (error) {
    console.error('Profile update error:', error);
    
    // Additional fallback - even if JSON parsing fails, try to save to memory
    try {
      const fallbackData: Partial<Profile> = {
        id: 'fallback-1',
        name: "Muhammad Haikal",
        title: "Project Manager & Fullstack Engineer",
        bio: "Profile update failed, using fallback data",
        email: "mhaikalas@gmail.com",
        updatedAt: Date.now(),
        createdAt: Date.now()
      };
      
      memoryProfile = fallbackData as Profile;
      
      return NextResponse.json({
        success: false,
        message: 'Profile update failed, but fallback data is available',
        data: fallbackData,
        error: String(error),
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (fallbackError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to update profile', 
          error: String(error),
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  }
}
