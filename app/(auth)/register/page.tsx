'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { GoogleIcon } from '@/components/GoogleIcon';
import { createServerSession, mapAuthError } from '@/lib/auth-client';
import { getFirebaseClientAuth, googleAuthProvider } from '@/lib/firebase-client';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const name = form.name.trim();
      const credential = await createUserWithEmailAndPassword(
        getFirebaseClientAuth(),
        form.email.trim().toLowerCase(),
        form.password
      );

      if (name) {
        await updateProfile(credential.user, { displayName: name });
      }

      await createServerSession(credential.user, name);
      setMessage('✓ Konto skapat! Omdirigerar...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1200);
    } catch (error) {
      setMessage(mapAuthError(error, 'Registreringen misslyckades. Försök igen.'));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleRegister() {
    setLoading(true);
    setMessage('');

    try {
      const credential = await signInWithPopup(getFirebaseClientAuth(), googleAuthProvider);
      await createServerSession(credential.user, credential.user.displayName ?? undefined);
      window.location.href = '/dashboard';
    } catch (error) {
      setMessage(mapAuthError(error, 'Google-inloggningen misslyckades. Försök igen.'));
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

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-mafy-border" />
              <span className="text-xs text-gray-600">eller</span>
              <div className="flex-1 h-px bg-mafy-border" />
            </div>

            <button
              type="button"
              onClick={() => void handleGoogleRegister()}
              disabled={loading}
              className="w-full bg-mafy-card2 border border-mafy-border hover:border-white/20 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-60"
            >
              <GoogleIcon />
              Fortsätt med Google
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Har du redan ett konto?{' '}
            <Link href="/login" className="text-brand hover:text-accent transition-colors font-medium">
              Logga in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
