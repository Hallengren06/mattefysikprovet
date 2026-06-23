import Link from 'next/link';

function AtomGraphic() {
  return (
    <svg viewBox="0 0 240 240" className="w-44 h-44" fill="none">
      <defs>
        <radialGradient id="dash-nucleus" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00c2ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4361ee" stopOpacity="0" />
        </radialGradient>
        <filter id="dash-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="120" cy="120" r="50" fill="url(#dash-nucleus)" />
      <ellipse cx="120" cy="120" rx="100" ry="36" stroke="#4361ee" strokeWidth="1.2" opacity="0.8" />
      <ellipse cx="120" cy="120" rx="100" ry="36" stroke="#4361ee" strokeWidth="1.2" opacity="0.7" transform="rotate(60 120 120)" />
      <ellipse cx="120" cy="120" rx="100" ry="36" stroke="#00c2ff" strokeWidth="1.2" opacity="0.8" transform="rotate(120 120 120)" />
      <circle cx="120" cy="120" r="10" fill="#00c2ff" filter="url(#dash-glow)" />
      <circle cx="120" cy="120" r="6" fill="white" opacity="0.9" />
      <circle cx="220" cy="120" r="5" fill="white" filter="url(#dash-glow)" />
      <circle cx="70" cy="151" r="5" fill="white" filter="url(#dash-glow)" />
      <circle cx="170" cy="72" r="5" fill="white" filter="url(#dash-glow)" />
      <text x="130" y="30" fill="rgba(255,255,255,0.3)" fontSize="11" fontStyle="italic">E = mc²</text>
      <text x="20" y="70" fill="rgba(255,255,255,0.2)" fontSize="10" fontStyle="italic">∫f(x)dx</text>
      <text x="140" y="220" fill="rgba(255,255,255,0.2)" fontSize="10" fontStyle="italic">F = ma</text>
    </svg>
  );
}

const strengths = [
  { label: 'Algebra', pct: 75 },
  { label: 'Geometri', pct: 55 },
  { label: 'Trigonometri', pct: 45 },
  { label: 'Derivata', pct: 60 },
  { label: 'Integraler', pct: 35 },
];

const dailyGoals = [
  { label: 'Gör 20 övningsuppgifter', current: 12, total: 20, done: false },
  { label: 'Titta på 2 videolektioner', current: 2, total: 2, done: true },
  { label: 'Gör ett miniprov', current: 0, total: 1, done: false },
];

const popularFeatures = [
  { icon: '📋', title: 'Alla gamla prov', desc: 'Tillgång till alla tidigare Matematik- och fysikprov.', href: '/tests' },
  { icon: '✏️', title: 'Övningsuppgifter', desc: 'Tusentals uppgifter sorterade efter ämnesområde och nivå.', href: '/ovning' },
  { icon: '▶️', title: 'Videoförklaringar', desc: 'Tydliga genomgångar av alla viktiga moment.', href: '/videos' },
  { icon: '🎯', title: 'Miniprov', desc: 'Skapa egna miniprov och träna på dina svagheter.', href: '/miniprov' },
  { icon: '🧠', title: 'AI Analys', desc: 'Få detaljerad analys och personliga rekommendationer.', href: '/ai-analys' },
];

export default function DashboardPage() {
  return (
    <div className="flex gap-6 min-h-full">
      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Hero */}
        <div className="relative bg-mafy-card border border-mafy-border rounded-2xl p-8 overflow-hidden">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-black text-white leading-tight">
                Din väg till{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">
                  drömutbildningen
                </span>
              </h1>
              <p className="mt-3 text-gray-400 max-w-md text-sm leading-relaxed">
                Öva på gamla Matematik- och fysikprov, få AI-driven analys och personliga studieplaner som tar dig hela vägen in.
              </p>
              <div className="flex gap-3 mt-5">
                <Link
                  href="/tests"
                  className="flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Starta ett prov <span>▶</span>
                </Link>
                <Link
                  href="/ai-analys"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-mafy-border text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  AI Analys ✦
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  {['🧑', '👩', '👨', '🧑'].map((e, i) => (
                    <span key={i} className="w-7 h-7 rounded-full bg-mafy-card2 border border-mafy-border flex items-center justify-center text-xs">
                      {e}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-400">+12 543 andra tränar smartare</span>
              </div>
            </div>
            <div className="hidden xl:block">
              <AtomGraphic />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Senaste provresultat */}
          <div className="bg-mafy-card border border-mafy-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand">📋</span>
              <h3 className="font-semibold text-sm text-white">Senaste provresultat</h3>
            </div>
            <p className="text-xs font-bold text-white text-center">Matematikprov 2023</p>
            <p className="text-xs text-gray-500 text-center mb-4">24 maj 2024</p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#1a1b2e" strokeWidth="10" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#4361ee" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 32 * 0.2} ${2 * Math.PI * 32 * 0.8}`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">20%</span>
              </div>
              <div>
                <p className="text-2xl font-black text-[#ff4d4d]">15 <span className="text-sm font-normal text-gray-400">/ 75 rätt</span></p>
                <p className="text-xs text-gray-500 mt-1">Du behöver öva mer!</p>
              </div>
            </div>
            <Link href="/tests" className="block mt-4 text-center text-xs font-semibold text-white bg-brand/20 hover:bg-brand/30 rounded-lg py-2 transition-colors">
              Se vad du behöver plugga mer på →
            </Link>
          </div>

          {/* Styrkor & svagheter */}
          <div className="bg-mafy-card border border-mafy-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent">📊</span>
              <h3 className="font-semibold text-sm text-white">Styrkor &amp; svagheter</h3>
            </div>
            <div className="space-y-2">
              {strengths.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{s.label}</span>
                    <span className="text-gray-500">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">— Du · - - Genomsnitt</p>
          </div>

          {/* AI rekommendation */}
          <div className="bg-mafy-card border border-mafy-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-accent">🧠</span>
              <h3 className="font-semibold text-sm text-white">AI rekommendation</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">Din största förbättringspotential finns inom</p>
            <p className="text-xl font-black text-accent mt-1">Elektromagnetism</p>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Fokusera på detta område för att öka ditt totalresultat med ca 8–12 poäng.
            </p>
            <Link href="/studieplan" className="block mt-4 text-center text-xs font-semibold text-white bg-accent/10 hover:bg-accent/20 rounded-lg py-2 transition-colors border border-accent/20">
              Se din personliga studieplan →
            </Link>
          </div>
        </div>

        {/* Popular features */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Populära funktioner</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {popularFeatures.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="bg-mafy-card border border-mafy-border rounded-xl p-4 hover:border-brand/40 hover:bg-mafy-card2 transition-all group"
              >
                <div className="text-2xl mb-2">{f.icon}</div>
                <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">{f.title}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
                <span className="block mt-3 text-brand text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* University bar */}
        <div className="border-t border-mafy-border pt-5">
          <p className="text-xs text-gray-500 mb-3">Provet gäller för att komma in på</p>
          <div className="flex flex-wrap gap-6 items-center">
            {['CHALMERS', 'GÖTEBORGS UNIVERSITET', 'KTH', 'Stockholms universitet'].map((u) => (
              <span key={u} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{u}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Dagens mål */}
      <div className="hidden xl:flex flex-col w-72 gap-4">
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-white">Dagens mål</h3>
            <span className="text-xs text-gray-500">Streak 1 dag</span>
          </div>
          <div className="space-y-4">
            {dailyGoals.map((goal) => (
              <div key={goal.label}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${goal.done ? 'border-green-500 bg-green-500/20' : 'border-gray-600'}`}>
                    {goal.done && <span className="text-green-400 text-xs">✓</span>}
                  </div>
                  <span className="text-xs text-gray-300 flex-1">{goal.label}</span>
                  <span className={`text-xs font-bold ${goal.done ? 'text-green-400' : 'text-gray-400'}`}>
                    {goal.current}/{goal.total}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden ml-6">
                  <div
                    className={`h-full rounded-full progress-fill ${goal.done ? 'bg-green-500' : 'bg-brand'}`}
                    style={{ width: `${(goal.current / goal.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Streak */}
          <div className="mt-5 bg-gradient-to-r from-orange-500/20 to-yellow-500/10 border border-orange-500/20 rounded-xl p-3 flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <span className="text-xl font-black text-white">7</span>
              <span className="text-xs text-orange-300 ml-1 font-semibold">DAGARS STREAK</span>
            </div>
          </div>
        </div>

        {/* AI Assistent box */}
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-accent">🧠</span>
            <h3 className="font-semibold text-sm text-white">AI Assistent</h3>
            <span className="text-[9px] bg-accent/20 text-accent font-bold px-1.5 py-0.5 rounded-full">NYTT</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            Skicka en bild på en uppgift så förklarar AI:n steg för steg hur du löser den.
          </p>
          <Link
            href="/ai-assistent"
            className="block text-center text-xs font-semibold text-white bg-brand hover:bg-brand/80 rounded-lg py-2.5 transition-colors"
          >
            Ställ fråga ✦
          </Link>
        </div>
      </div>
    </div>
  );
}

