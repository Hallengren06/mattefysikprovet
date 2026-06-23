import { NextRequest, NextResponse } from 'next/server';
import { getVideos, addVideo, deleteVideo } from '@/lib/videos';

export function GET() {
  const videos = getVideos();
  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, youtubeId, category, topic } = body as {
    title: string;
    description: string;
    youtubeId: string;
    category: string;
    topic: string;
  };

  if (!title || !youtubeId || !category) {
    return NextResponse.json({ error: 'title, youtubeId och category krävs' }, { status: 400 });
  }

  const video = addVideo({ title, description: description ?? '', youtubeId, category, topic: topic ?? '' });
  return NextResponse.json(video, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id saknas' }, { status: 400 });
  deleteVideo(id);
  return NextResponse.json({ success: true });
}
