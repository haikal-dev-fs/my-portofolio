import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const body = await request.json();
    const { id } = await context.params;
    const projectId = parseInt(id);
    await dbHelpers.updateProject(projectId, body);
    return NextResponse.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    await dbHelpers.deleteProject(projectId);
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
