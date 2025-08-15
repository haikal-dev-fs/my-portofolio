import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

// Default projects for seeding
const defaultProjects = [
  {
    id: '1',
    title: 'Fleet Management System',
    description: 'A comprehensive fleet management system for mining operations with real-time monitoring and reporting capabilities.',
    longDescription: 'A comprehensive fleet management system for mining operations with real-time monitoring and reporting capabilities.',
    imageUrl: '',
    technologies: JSON.stringify(['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Bootstrap']),
    liveUrl: '',
    githubUrl: '',
    category: 'Full Stack',
    featured: true,
    order: 0,
    createdAt: new Date('2024-12-01T00:00:00.000Z'),
    updatedAt: new Date('2024-12-01T00:00:00.000Z')
  },
  {
    id: '2',
    title: 'Company Website Migration',
    description: 'Successfully migrated PT Polytama Propindo website to modern platform with improved functionality.',
    longDescription: 'Successfully migrated PT Polytama Propindo website to modern platform, significantly improving functionality and user experience and Worked on enhancing the performance and user interface of several websites within the company',
    imageUrl: '',
    technologies: JSON.stringify(['Laravel', 'PHP', 'Bootstrap', 'PostgreSQL', 'JavaScript']),
    liveUrl: '',
    githubUrl: '',
    category: 'Web Development',
    featured: true,
    order: 1,
    createdAt: new Date('2023-09-01T00:00:00.000Z'),
    updatedAt: new Date('2024-02-01T00:00:00.000Z')
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Modern and responsive portfolio website built with Next.js and Tailwind CSS.',
    longDescription: 'Modern and responsive portfolio website built with Next.js and Tailwind CSS with advanced animations and optimized performance.',
    imageUrl: '',
    technologies: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'TypeScript']),
    liveUrl: '',
    githubUrl: '',
    category: 'Frontend',
    featured: true,
    order: 2,
    createdAt: new Date('2024-08-01T00:00:00.000Z'),
    updatedAt: new Date('2024-08-01T00:00:00.000Z')
  }
];

export async function GET() {
  try {
    // Cek jika database kosong, seed defaultProjects (hanya yang belum ada)
    const dbProjects = await db.select().from(projects);
    const dbIds = new Set(dbProjects.map(p => p.id));
    // Map defaultProjects to match DB schema (demoUrl not liveUrl)
    const toInsert = defaultProjects.filter(p => !dbIds.has(p.id)).map(p => ({
      ...p,
      demoUrl: p.liveUrl || '',
      liveUrl: undefined // remove liveUrl
    }));
    if (toInsert.length > 0) {
      await db.insert(projects).values(toInsert.map(({ liveUrl, ...rest }) => rest));
    }
    // Ambil data terbaru
    const allProjects = await db.select().from(projects);
    // Pastikan technologies dikembalikan sebagai array
    const processedProjects = allProjects.map(project => ({
      ...project,
      technologies: typeof project.technologies === 'string' ? JSON.parse(project.technologies) : project.technologies,
      imageUrl: project.imageUrl || '',
      demoUrl: project.demoUrl || ''
    }));
    return NextResponse.json({
      success: true,
      data: processedProjects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch projects',
      data: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const {
      title,
      description,
      longDescription,
      imageUrl,
      demoUrl,
      githubUrl,
      technologies,
      category,
      featured
    } = body;

    // Generate id
    const id = `project_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();
    const newProject = {
      id,
      title: title || '',
      description: description || '',
      longDescription: longDescription || description || '',
      imageUrl: imageUrl || '',
      demoUrl: demoUrl || '',
      githubUrl: githubUrl || '',
      technologies: JSON.stringify(Array.isArray(technologies) ? technologies : []),
      category: category || 'Other',
      featured: featured || false,
      order: 0,
      createdAt: now,
      updatedAt: now
    };
    await db.insert(projects).values(newProject);
    return NextResponse.json({
      success: true,
      data: { ...newProject, technologies: Array.isArray(technologies) ? technologies : [] },
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('POST projects error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create project' },
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
      id,
      title,
      description,
      longDescription,
      imageUrl,
      demoUrl,
      githubUrl,
      technologies,
      category,
      featured
    } = body;

    // Cari project di database
    const existing = await db.select().from(projects).where(eq(projects.id, id));
    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    // Pastikan technologies berupa array, jika string split, jika undefined jadi []
    let techArr = [];
    if (Array.isArray(technologies)) {
      techArr = technologies;
    } else if (typeof technologies === 'string') {
      try {
        techArr = JSON.parse(technologies);
      } catch {
        techArr = technologies.split(',').map(t => t.trim());
      }
    }

    const now = new Date();
    const updateData = {
      title: title ?? existing[0].title,
      description: description ?? existing[0].description,
      longDescription: longDescription ?? existing[0].longDescription ?? '',
      imageUrl: imageUrl ?? existing[0].imageUrl ?? '',
      demoUrl: demoUrl ?? existing[0].demoUrl ?? '',
      githubUrl: githubUrl ?? existing[0].githubUrl,
      technologies: JSON.stringify(techArr),
      category: category ?? existing[0].category ?? 'Other',
      featured: featured !== undefined ? featured : existing[0].featured ?? false,
      updatedAt: now
    };

    const updated = await db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
    if (!updated || updated.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to update project' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      data: { ...updated[0], technologies: techArr },
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('PUT projects error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update project', error: String(error) },
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
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Delete from database
    const deleted = await db.delete(projects).where(eq(projects.id, id)).returning();

    if (!deleted || deleted.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('DELETE projects error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
