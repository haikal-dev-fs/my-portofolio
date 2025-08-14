import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let sql: any = null;
  
  try {
    const { id } = await params;
    const { isRead } = await request.json();

    // Initialize postgres connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return NextResponse.json(
        { success: false, message: 'Database configuration error' },
        { status: 500 }
      );
    }

    sql = postgres(connectionString, { ssl: 'require' });

    const updatedMessage = await sql`
      UPDATE messages 
      SET is_read = ${isRead}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updatedMessage.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMessage[0]
    });

  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update message' },
      { status: 500 }
    );
  } finally {
    if (sql) {
      try {
        await sql.end();
      } catch (closeError) {
        console.error('Error closing database connection:', closeError);
      }
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let sql: any = null;
  
  try {
    const { id } = await params;

    // Initialize postgres connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return NextResponse.json(
        { success: false, message: 'Database configuration error' },
        { status: 500 }
      );
    }

    sql = postgres(connectionString, { ssl: 'require' });

    const deletedMessage = await sql`
      DELETE FROM messages 
      WHERE id = ${id}
      RETURNING *
    `;

    if (deletedMessage.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete message' },
      { status: 500 }
    );
  } finally {
    if (sql) {
      try {
        await sql.end();
      } catch (closeError) {
        console.error('Error closing database connection:', closeError);
      }
    }
  }
}
