import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/database';

export async function GET() {
  try {
    const skills = await dbHelpers.getSkills();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}
