import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  topic: string;
  createdAt: string;
};

const DATA_DIR = join(process.cwd(), 'data');
const DATA_PATH = join(DATA_DIR, 'videos.json');

export function getVideos(): Video[] {
  try {
    if (!existsSync(DATA_PATH)) return [];
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8')) as Video[];
  } catch (err) {
    console.error('Failed to read videos data:', err);
    return [];
  }
}

export function addVideo(data: Omit<Video, 'id' | 'createdAt'>): Video {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  const videos = getVideos();
  const video: Video = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
  videos.push(video);
  writeFileSync(DATA_PATH, JSON.stringify(videos, null, 2));
  return video;
}

export function deleteVideo(id: string): void {
  const videos = getVideos().filter((v) => v.id !== id);
  writeFileSync(DATA_PATH, JSON.stringify(videos, null, 2));
}
