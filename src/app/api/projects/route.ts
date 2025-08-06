import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/database';

export async function GET() {
  try {
    const projects = await dbHelpers.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbHelpers.addProject(body);
    return NextResponse.json({ message: 'Project added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}
