'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage('✓ Konto skapat! Omdirigerar...');
        setTimeout(() => (window.location.href = '/dashboard'), 1500);
      } else {
        const payload = (await res.json()) as { message?: string };
        setMessage(payload.message ?? 'Något gick fel. Försök igen.');
      }
    } catch {
      setMessage('Något gick fel. Försök igen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mafy-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-white">MAFY</Link>
          <p className="text-gray-500 text-sm mt-1">Skapa ditt konto och börja träna idag</p>
        </div>
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white text-center mb-6">Skapa konto</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Namn</label>
              <input
                type="text"
                placeholder="Ditt namn"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">E-post</label>
              <input
                type="email"
                placeholder="namn@gmail.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Lösenord</label>
              <input
                type="password"
                placeholder="Välj ett säkert lösenord"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
                className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
              />
            </div>

            {message && (
              <p className={`text-sm text-center ${message.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand to-[#6b4de6] text-white font-semibold py-3 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Skapar konto...' : 'Skapa konto'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Har du redan ett konto?{' '}
            <Link href="/" className="text-brand hover:text-accent transition-colors font-medium">
              Logga in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
