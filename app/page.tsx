'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MafyLogo } from '@/components/MafyLogo';

function AtomGraphic() {
  return (
    <div className="relative w-72 h-72 opacity-90">
      <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="nucleus-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00c2ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4361ee" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Glow background */}
        <circle cx="150" cy="150" r="60" fill="url(#nucleus-glow)" />
        {/* Orbits */}
        <ellipse cx="150" cy="150" rx="120" ry="42" stroke="#4361ee" strokeWidth="1.5" opacity="0.8" />
        <ellipse cx="150" cy="150" rx="120" ry="42" stroke="#4361ee" strokeWidth="1.5" opacity="0.7" transform="rotate(60 150 150)" />
        <ellipse cx="150" cy="150" rx="120" ry="42" stroke="#00c2ff" strokeWidth="1.5" opacity="0.8" transform="rotate(120 150 150)" />
        {/* Nucleus */}
        <circle cx="150" cy="150" r="14" fill="#00c2ff" filter="url(#glow-filter)" />
        <circle cx="150" cy="150" r="8" fill="white" opacity="0.9" />
        {/* Electrons */}
        <circle cx="270" cy="150" r="6" fill="white" filter="url(#glow-filter)" />
        <circle cx="90" cy="186" r="6" fill="white" filter="url(#glow-filter)" />
        <circle cx="210" cy="88" r="6" fill="white" filter="url(#glow-filter)" />
        {/* Math formulas - decorative */}
        <text x="20" y="60" fill="rgba(255,255,255,0.25)" fontSize="14" fontStyle="italic">E = mc²</text>
        <text x="200" y="40" fill="rgba(255,255,255,0.2)" fontSize="12" fontStyle="italic">∫f(x)dx</text>
        <text x="10" y="200" fill="rgba(255,255,255,0.2)" fontSize="12" fontStyle="italic">∇·E = ρ/ε₀</text>
        <text x="210" y="270" fill="rgba(255,255,255,0.2)" fontSize="11" fontStyle="italic">F = ma</text>
      </svg>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

const features = [
  { icon: '⊙', title: 'Skräddarsytt för dig', desc: 'AI-driven analys som visar exakt vad du behöver förbättra.' },
  { icon: '📈', title: 'Öka ditt resultat', desc: 'Träna smartare med gamla prov, övningar och miniprov.' },
  { icon: '🧠', title: 'AI som coachar dig', desc: 'Få personliga tips, strategier och förklaringar på detaljnivå.' },
  { icon: '🏆', title: 'Nå dina mål', desc: 'Tusentals har redan tagit steget. Nu är det din tur att lyckas.' }
];

const universities = ['CHALMERS', 'GÖTEBORGS UNIVERSITET', 'KTH', 'Stockholms universitet'];

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        const payload = (await res.json()) as { message?: string };
        setMessage(payload.message ?? 'Felaktiga inloggningsuppgifter. Försök igen.');
      }
    } catch {
      setMessage('Något gick fel. Försök igen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mafy-bg flex flex-col">
      {/* Main content */}
      <div className="flex flex-1">
        {/* LEFT SIDE – Hero */}
        <div className="flex-1 relative overflow-hidden px-10 py-8 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <MafyLogo size={42} />
            <div>
              <div className="text-white font-bold text-xl leading-none tracking-widest">MAFY</div>
              <div className="text-[10px] text-accent tracking-widest leading-tight">MATTEFYSIKPROVET</div>
            </div>
          </div>

          {/* Hero + Atom */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1">
              <h1 className="text-5xl font-black leading-tight text-white">
                Din väg till{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">
                  drömutbildningen.
                </span>
              </h1>
              <p className="mt-4 text-gray-400 max-w-md leading-relaxed">
                Matematik- och fysikprovet kan öppna dörren till Sveriges mest eftertraktade utbildningar. Vi hjälper dig{' '}
                <span className="text-accent font-semibold">hela vägen</span> dit.
              </p>
            </div>
            <div className="hidden lg:block">
              <AtomGraphic />
            </div>
          </div>

          {/* Feature icons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {features.map((f) => (
              <div key={f.title}>
                <div className="text-2xl mb-2 text-accent">{f.icon}</div>
                <div className="text-sm font-semibold text-white">{f.title}</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Universities */}
          <div className="mt-10 pt-6 border-t border-mafy-border">
            <p className="text-xs text-gray-500 mb-3">Gäller för antagning till bland annat:</p>
            <div className="flex flex-wrap gap-6 items-center">
              {universities.map((u) => (
                <span key={u} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {u}
                </span>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="mt-8">
            <p className="text-gray-400 text-sm italic leading-relaxed">
              &ldquo;Det handlar inte om att vara bäst.
              <br />
              Det handlar om att vägra ge upp.&rdquo;
              <br />
              <span className="text-gray-500 not-italic">– Din framtid börjar med ett beslut idag.</span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE – Login card */}
        <div className="w-full max-w-md flex items-center justify-center p-8">
          <div className="w-full bg-mafy-card border border-mafy-border rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white text-center">Välkommen tillbaka!</h2>
            <p className="text-gray-400 text-sm text-center mt-2">
              Logga in och fortsätt din resa mot drömutbildningen.
            </p>

            <form onSubmit={handleLogin} className="mt-7 space-y-4">
              {/* Email */}
              <div>
              <label className="block text-sm text-gray-300 mb-1.5">E-post</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,12 2,6"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="namn@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a0b1c] border border-mafy-border rounded-lg pl-8 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Lösenord</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ditt lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0a0b1c] border border-mafy-border rounded-lg pl-8 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
                <div className="text-right mt-1.5">
                  <Link href="/forgot-password" className="text-xs text-brand hover:text-accent transition-colors">
                    Glömt lösenord?
                  </Link>
                </div>
              </div>

              {message && <p className="text-red-400 text-xs text-center">{message}</p>}

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand to-[#6b4de6] hover:opacity-90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
              >
                {loading ? 'Loggar in...' : 'Logga in'}
                {!loading && <span>→</span>}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-mafy-border" />
                <span className="text-xs text-gray-600">eller</span>
                <div className="flex-1 h-px bg-mafy-border" />
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={() => setMessage('Google-inloggning är inte konfigurerad ännu.')}
                className="w-full bg-mafy-card2 border border-mafy-border hover:border-white/20 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors"
              >
                <GoogleIcon />
                Logga in med Google
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Har du inget konto?{' '}
              <Link href="/register" className="text-brand hover:text-accent transition-colors font-medium">
                Skapa konto
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="border-t border-mafy-border bg-mafy-card/50">
        <div className="max-w-6xl mx-auto px-10 py-5 flex flex-col sm:flex-row items-center justify-around gap-4">
          {[
            { icon: '🛡️', title: '100% fokus på ditt mål', desc: 'Allt du behöver – samlat på ett ställe.' },
            { icon: '⭐', title: 'Beprövat och effektivt', desc: 'Bygger på data från tusentals provresultat.' },
            { icon: '🚀', title: 'Kom in på drömprogrammet', desc: 'Vi ger dig verktygen. Du tar dig dit.' }
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
