import { NextRequest, NextResponse } from 'next/server';
import { getRequestSessionUser } from '@/lib/session';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await getRequestSessionUser(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  return NextResponse.json({ message: `Started test ${id}`, userId: user.uid }, { status: 200 });
}
