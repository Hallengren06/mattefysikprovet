import { NextResponse } from 'next/server';

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return NextResponse.json({ message: `Started test ${id}` }, { status: 200 });
}
