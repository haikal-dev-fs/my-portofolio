import { NextRequest, NextResponse } from 'next/server';

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

// Dummy data for projects
const defaultProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with admin panel and payment integration',
    longDescription: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment processing with Stripe, order tracking, and a complete admin dashboard.',
    imageUrl: null,
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/ecommerce',
    technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Stripe']),
    category: 'web',
    featured: true,
    order: 0,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '2',
    title: 'Project Management Tool',
    description: 'Collaborative project management application with real-time features',
    longDescription: 'A collaborative project management tool that enables teams to work together efficiently. Features include task management, real-time updates, file sharing, team communication, and comprehensive project analytics.',
    imageUrl: null,
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/projectmgmt',
    technologies: JSON.stringify(['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL']),
    category: 'web',
    featured: true,
    order: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    longDescription: 'A secure mobile banking application that provides users with complete banking services on their mobile devices. Features include account management, fund transfers, bill payments, transaction history, and biometric security.',
    imageUrl: null,
    demoUrl: 'https://demo.example.com',
    githubUrl: null,
    technologies: JSON.stringify(['React Native', 'Firebase', 'Biometrics API']),
    category: 'mobile',
    featured: false,
    order: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export async function GET() {
  try {
    // In a real application, this would fetch from database
    return NextResponse.json({
      success: true,
      data: defaultProjects
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
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

    const newProject = {
      id: Date.now().toString(), // Simple ID generation
      title,
      description,
      longDescription,
      imageUrl,
      demoUrl,
      githubUrl,
      technologies: JSON.stringify(technologies),
      category,
      featured: featured || false,
      order: defaultProjects.length,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    // In a real application, this would save to database
    defaultProjects.push(newProject);

    return NextResponse.json({
      success: true,
      data: newProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create project' },
      { status: 500 }
    );
  }
}
