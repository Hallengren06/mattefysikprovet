'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Video } from '@/lib/videos';

function extractYouTubeId(input: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return input;
}

function isValidYouTubeId(value: string) {
  return /^[A-Za-z0-9_-]{11}$/.test(value);
}

async function fetchVideosFromApi() {
  const res = await fetch('/api/videos');
  return (await res.json()) as Video[];
}

export default function AdminPageClient() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'videos' | 'tests'>('videos');
  const [previewError, setPreviewError] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: 'Matematik',
    topic: ''
  });

  useEffect(() => {
    let cancelled = false;

    async function loadVideos() {
      try {
        const data = await fetchVideosFromApi();
        if (!cancelled) {
          setVideos(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadVideos();

    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshVideos() {
    setLoading(true);
    try {
      const data = await fetchVideosFromApi();
      setVideos(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const youtubeId = extractYouTubeId(form.youtubeUrl);
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          youtubeId,
          category: form.category,
          topic: form.topic
        })
      });
      if (res.ok) {
        setMessage('✓ Videon lades till!');
        setForm({ title: '', description: '', youtubeUrl: '', category: 'Matematik', topic: '' });
        setPreviewError(false);
        await refreshVideos();
      } else {
        const err = (await res.json()) as { error?: string };
        setMessage(`Fel: ${err.error ?? 'Okänt fel'}`);
      }
    } catch {
      setMessage('Något gick fel. Försök igen.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Vill du ta bort den här videon?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
      setVideos((v) => v.filter((video) => video.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin – Innehållshantering</h1>
        <p className="text-gray-400 text-sm mt-1">Lägg till och hantera videoförklaringar och annat innehåll.</p>
      </div>

      <div className="flex gap-2 border-b border-mafy-border pb-0">
        {(['videos', 'tests'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              activeTab === tab
                ? 'border-brand text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab === 'videos' ? '▶ Videoförklaringar' : '📋 Prov'}
          </button>
        ))}
      </div>

      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="bg-mafy-card border border-mafy-border rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-4">Lägg till ny videoförklaring</h2>
            <form onSubmit={handleAddVideo} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Titel *</label>
                  <input
                    type="text"
                    placeholder="T.ex. Introduktion till derivata"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    required
                    className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">YouTube-länk eller video-ID *</label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=... eller rAof9Ld5sOg"
                    value={form.youtubeUrl}
                    required
                    onChange={(e) => { setForm((f) => ({ ...f, youtubeUrl: e.target.value })); setPreviewError(false); }}
                    className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Kategori *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                  >
                    <option value="Matematik">Matematik</option>
                    <option value="Fysik">Fysik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Ämnesområde</label>
                  <input
                    type="text"
                    placeholder="T.ex. Derivata, Integraler, Elektromagnetism"
                    value={form.topic}
                    onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                    className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Beskrivning</label>
                <textarea
                  placeholder="Kort beskrivning av vad videon handlar om..."
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors resize-none"
                />
              </div>

              {form.youtubeUrl && isValidYouTubeId(extractYouTubeId(form.youtubeUrl)) && !previewError && (
                <div className="rounded-xl overflow-hidden border border-mafy-border">
                  <img
                    src={`https://img.youtube.com/vi/${extractYouTubeId(form.youtubeUrl)}/hqdefault.jpg`}
                    alt="Förhandsvisning"
                    className="w-full max-w-xs aspect-video object-cover"
                    onError={() => setPreviewError(true)}
                  />
                  <p className="text-xs text-gray-500 px-3 py-2">Förhandsvisning av miniatyrbild</p>
                </div>
              )}

              {message && (
                <p className={`text-sm ${message.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="bg-brand hover:bg-brand/80 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
              >
                {saving ? 'Lägger till...' : '+ Lägg till video'}
              </button>
            </form>
          </div>

          <div className="bg-mafy-card border border-mafy-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">Befintliga videoförklaringar ({videos.length})</h2>
              <Link href="/videos" className="text-xs text-brand hover:text-accent transition-colors">
                Visa publik sida →
              </Link>
            </div>

            {loading ? (
              <p className="text-gray-500 text-sm">Laddar...</p>
            ) : videos.length === 0 ? (
              <p className="text-gray-500 text-sm">Inga videoförklaringar ännu.</p>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-center gap-4 bg-mafy-bg rounded-xl p-3 border border-mafy-border">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
                      alt={video.title}
                      className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          video.category === 'Matematik' ? 'bg-brand/20 text-brand' : 'bg-accent/20 text-accent'
                        }`}>
                          {video.category}
                        </span>
                        {video.topic && <span className="text-xs text-gray-500">{video.topic}</span>}
                      </div>
                      <p className="text-sm font-medium text-white mt-0.5 truncate">{video.title}</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        youtube.com/watch?v={video.youtubeId}
                      </a>
                    </div>
                    <button
                      onClick={() => handleDelete(video.id)}
                      disabled={deleting === video.id}
                      className="flex-shrink-0 text-xs text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deleting === video.id ? '...' : 'Ta bort'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'tests' && (
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-3">Prov-hantering</h2>
          <p className="text-gray-400 text-sm">
            Möjligheten att lägga till och hantera prov kommer i nästa steg.
          </p>
          <div className="mt-4 p-4 bg-mafy-bg border border-mafy-border rounded-xl">
            <p className="text-xs text-gray-500">
              Planerade funktioner: Ladda upp PDF-prov, skapa frågor manuellt, koppla rätta svar och videoförklaringar till specifika uppgifter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
