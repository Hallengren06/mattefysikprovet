'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleIcon } from '@/components/GoogleIcon';
import { createServerSession, mapAuthError } from '@/lib/auth-client';
import { normalizeEmail } from '@/lib/auth-utils';
import { getFirebaseClientAuth, googleAuthProvider } from '@/lib/firebase-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const credential = await signInWithEmailAndPassword(
        getFirebaseClientAuth(),
        normalizeEmail(email),
        password
      );

      await createServerSession(credential.user);
      window.location.href = '/dashboard';
    } catch (error) {
      setMessage(mapAuthError(error, 'Inloggningen misslyckades. Försök igen.'));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setMessage('');

    try {
      const credential = await signInWithPopup(getFirebaseClientAuth(), googleAuthProvider);
      await createServerSession(credential.user);
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
          <p className="text-gray-500 text-sm mt-1">Logga in på ditt konto</p>
        </div>
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white text-center mb-6">Logga in</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">E-post</label>
              <input
                type="email"
                placeholder="namn@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Lösenord</label>
              <input
                type="password"
                placeholder="Ditt lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-mafy-bg border border-mafy-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
              />
            </div>

            {message && <p className="text-sm text-center text-red-400">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand to-[#6b4de6] text-white font-semibold py-3 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Loggar in...' : 'Logga in'}
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-mafy-border" />
              <span className="text-xs text-gray-600">eller</span>
              <div className="flex-1 h-px bg-mafy-border" />
            </div>

            <button
              type="button"
              onClick={() => void handleGoogleLogin()}
              disabled={loading}
              aria-label="Fortsätt med Google"
              className="w-full bg-mafy-card2 border border-mafy-border hover:border-white/20 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-60"
            >
              <GoogleIcon />
              Fortsätt med Google
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Har du inget konto?{' '}
            <Link href="/register" className="text-brand hover:text-accent transition-colors font-medium">
              Skapa konto
            </Link>
          </p>
          <p className="text-center text-xs text-gray-500 mt-3">
            Du kan också logga in direkt på{' '}
            <Link href="/" className="text-brand hover:text-accent transition-colors font-medium">
              startsidan
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
