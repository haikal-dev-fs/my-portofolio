import { NextRequest, NextResponse } from 'next/server';

// Interface untuk type safety
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  category?: string;
  featured?: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

// Dummy data for projects - FIX: Make structure consistent
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Fleet Management System',
    description: 'A comprehensive fleet management system for mining operations with real-time monitoring and reporting capabilities.',
    longDescription: 'A comprehensive fleet management system for mining operations with real-time monitoring and reporting capabilities.',
    imageUrl: '',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Bootstrap'],
    liveUrl: '', // Required field
    githubUrl: '',
    category: 'Full Stack',
    featured: true,
    order: 0,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Company Website Migration',
    description: 'Successfully migrated PT Polytama Propindo website to modern platform with improved functionality.',
    longDescription: 'Successfully migrated PT Polytama Propindo website to modern platform, significantly improving functionality and user experience and Worked on enhancing the performance and user interface of several websites within the company',
    imageUrl: '',
    technologies: ['Laravel', 'PHP', 'Bootstrap', 'PostgreSQL', 'JavaScript'],
    liveUrl: '',
    githubUrl: '',
    category: 'Web Development',
    featured: true,
    order: 1,
    createdAt: '2023-09-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Modern and responsive portfolio website built with Next.js and Tailwind CSS.',
    longDescription: 'Modern and responsive portfolio website built with Next.js and Tailwind CSS with advanced animations and optimized performance.',
    imageUrl: '',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    liveUrl: '',
    githubUrl: '',
    category: 'Frontend',
    featured: true,
    order: 2,
    createdAt: '2024-08-01T00:00:00.000Z',
    updatedAt: '2024-08-01T00:00:00.000Z'
  }
];

export async function GET() {
  try {
    // FIX: Always return array and ensure technologies is array
    const processedProjects = defaultProjects.map(project => ({
      ...project,
      technologies: Array.isArray(project.technologies) 
        ? project.technologies 
        : (typeof project.technologies === 'string' 
           ? JSON.parse(project.technologies) 
           : [])
    }));

    return NextResponse.json({
      success: true,
      data: Array.isArray(processedProjects) ? processedProjects : []
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch projects',
      data: [] // Always provide empty array as fallback
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
      liveUrl,
      githubUrl,
      technologies,
      category,
      featured
    } = body;

    // FIX: Create project with consistent structure that matches interface
    const newProject: Project = {
      id: `project_${Math.random().toString(36).substr(2, 9)}`,
      title: title || '',
      description: description || '',
      longDescription: longDescription || description || '',
      imageUrl: imageUrl || '',
      liveUrl: liveUrl || '', // Required field - must be present
      githubUrl: githubUrl || '',
      technologies: Array.isArray(technologies) ? technologies : [],
      category: category || 'Other',
      featured: featured || false,
      order: defaultProjects.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real application, this would save to database
    defaultProjects.push(newProject);

    return NextResponse.json({
      success: true,
      data: newProject,
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
      liveUrl,
      githubUrl,
      technologies,
      category,
      featured
    } = body;

    const projectIndex = defaultProjects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    // FIX: Update project with consistent structure that matches interface
    const updatedProject: Project = {
      ...defaultProjects[projectIndex],
      title: title || defaultProjects[projectIndex].title,
      description: description || defaultProjects[projectIndex].description,
      longDescription: longDescription || defaultProjects[projectIndex].longDescription || '',
      imageUrl: imageUrl || defaultProjects[projectIndex].imageUrl || '',
      liveUrl: liveUrl || defaultProjects[projectIndex].liveUrl, // Required field
      githubUrl: githubUrl || defaultProjects[projectIndex].githubUrl,
      technologies: Array.isArray(technologies) ? technologies : defaultProjects[projectIndex].technologies,
      category: category || defaultProjects[projectIndex].category || 'Other',
      featured: featured !== undefined ? featured : defaultProjects[projectIndex].featured || false,
      updatedAt: new Date().toISOString()
    };

    defaultProjects[projectIndex] = updatedProject;

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('PUT projects error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update project' },
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

    const projectIndex = defaultProjects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    defaultProjects.splice(projectIndex, 1);

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
