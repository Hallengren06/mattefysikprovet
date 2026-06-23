import Link from 'next/link';
import { getVideos } from '@/lib/videos';

export default async function VideosPage() {
  const videos = getVideos();
  const categories = ['Alla', ...Array.from(new Set(videos.map((v) => v.category)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Videoförklaringar</h1>
          <p className="text-gray-400 text-sm mt-1">Tydliga genomgångar av alla viktiga moment.</p>
        </div>
        <Link
          href="/admin"
          className="flex items-center gap-2 bg-brand/10 hover:bg-brand/20 border border-brand/20 text-brand text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Lägg till video
        </Link>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <span
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              i === 0
                ? 'bg-brand text-white'
                : 'bg-mafy-card border border-mafy-border text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Videos grid */}
      {videos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">▶️</div>
          <h3 className="text-xl font-bold text-white">Inga videoförklaringar ännu</h3>
          <p className="text-gray-400 text-sm mt-2 mb-5">Lägg till den första videoförklaringen via admin-sidan.</p>
          <Link href="/admin" className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-brand/80 transition-colors">
            + Lägg till video
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <article key={video.id} className="bg-mafy-card border border-mafy-border rounded-2xl overflow-hidden hover:border-brand/40 transition-all group">
              {/* YouTube thumbnail */}
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand/90 flex items-center justify-center shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              </a>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    video.category === 'Matematik' ? 'bg-brand/20 text-brand' : 'bg-accent/20 text-accent'
                  }`}>
                    {video.category}
                  </span>
                  {video.topic && (
                    <span className="text-xs text-gray-500">{video.topic}</span>
                  )}
                </div>
                <h3 className="font-semibold text-white text-sm group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{video.description}</p>
                )}
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-brand hover:text-accent transition-colors"
                >
                  Se video ▶
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
