'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MafyLogo } from './MafyLogo';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function AtomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23,7 16,12 23,17 23,7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}
function BrainIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.68A3 3 0 0 1 4.5 8.5a3 3 0 0 1 1.46-2.56A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.68A3 3 0 0 0 19.5 8.5a3 3 0 0 0-1.46-2.56A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function CrownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 20h20l-3-12-5 6-2-8-2 8-5-6z" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function SigmaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4H6l7 8-7 8h12" />
    </svg>
  );
}

const sections: NavSection[] = [
  {
    title: '',
    items: [{ label: 'Hem', href: '/dashboard', icon: <HomeIcon /> }]
  },
  {
    title: 'PROV',
    items: [
      { label: 'Alla prov', href: '/tests', icon: <ListIcon /> },
      { label: 'Matematik', href: '/tests?category=matematik', icon: <GridIcon /> },
      { label: 'Fysik', href: '/tests?category=fysik', icon: <AtomIcon /> },
      { label: 'Miniprov', href: '/miniprov', icon: <TargetIcon /> }
    ]
  },
  {
    title: 'ÖVA',
    items: [
      { label: 'Övningsuppgifter', href: '/ovning', icon: <BookIcon /> },
      { label: 'Ämnesområden', href: '/amnesomraden', icon: <GridIcon /> },
      { label: 'Formler & Teori', href: '/formler', icon: <SigmaIcon /> },
      { label: 'Videoförklaringar', href: '/videos', icon: <VideoIcon /> }
    ]
  },
  {
    title: 'AI & ANALYS',
    items: [
      { label: 'AI Analys', href: '/ai-analys', icon: <BrainIcon />, badge: 'NYTT' },
      { label: 'AI Assistent', href: '/ai-assistent', icon: <BrainIcon />, badge: 'NYTT' },
      { label: 'Min utveckling', href: '/min-utveckling', icon: <TrendIcon /> },
      { label: 'Studieplan', href: '/studieplan', icon: <CalendarIcon /> }
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    const path = href.split('?')[0];
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(path);
  }

  return (
    <aside className="flex flex-col h-full w-[220px] min-w-[220px] bg-mafy-sidebar border-r border-mafy-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-mafy-border">
        <MafyLogo size={36} />
        <div>
          <div className="text-white font-bold text-sm leading-none tracking-widest">MAFY</div>
          <div className="text-[10px] text-gray-500 tracking-widest leading-tight">MATTEFYSIKPROVET</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {sections.map((section) => (
          <div key={section.title} className="mb-3">
            {section.title && (
              <p className="text-[10px] font-semibold text-gray-500 px-3 mb-1.5 tracking-widest uppercase">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
                    active
                      ? 'bg-brand text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-gray-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[9px] bg-accent/20 text-accent font-semibold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Admin link */}
        <div className="mt-4 pt-4 border-t border-mafy-border">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === '/admin' ? 'bg-brand text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-gray-500"><SettingsIcon /></span>
            <span>Admin</span>
          </Link>
        </div>
      </nav>

      {/* Upgrade box */}
      <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-brand/30 to-accent/10 border border-brand/30">
        <div className="flex items-center gap-2 text-yellow-400 mb-1">
          <CrownIcon />
          <span className="text-sm font-bold text-white">Uppgradera till Premium</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">Få tillgång till alla funktioner</p>
        <Link
          href="/priser"
          className="block text-center text-xs font-semibold text-white bg-brand hover:bg-brand/80 rounded-lg py-1.5 transition-colors"
        >
          Uppgradera →
        </Link>
      </div>
    </aside>
  );
}
