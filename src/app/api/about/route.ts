import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/database';

export async function GET() {
  try {
    const about = await dbHelpers.getAbout();
    return NextResponse.json(about);
  } catch (error) {
    console.error('Error fetching about info:', error);
    return NextResponse.json({ error: 'Failed to fetch about info' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await dbHelpers.updateAbout(body);
    return NextResponse.json({ message: 'About info updated successfully' });
  } catch (error) {
    console.error('Error updating about info:', error);
    return NextResponse.json({ error: 'Failed to update about info' }, { status: 500 });
  }
}
