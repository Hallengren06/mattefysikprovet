'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const topLinks = [
  { label: 'Hem', href: '/dashboard' },
  { label: 'Prov', href: '/tests' },
  { label: 'Öva', href: '/ovning' },
  { label: 'Min utveckling', href: '/min-utveckling' },
  { label: 'AI Assistent', href: '/ai-assistent' },
  { label: 'Priser', href: '/priser' }
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="h-14 border-b border-mafy-border bg-mafy-bg/95 backdrop-blur flex items-center px-6 gap-6">
      {/* Nav links */}
      <nav className="flex items-center gap-1 flex-1">
        {topLinks.map((link) => {
          const active = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                active ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {active && <span className="block h-0.5 bg-brand mt-0.5 rounded-full" />}
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Dark mode icon (decorative) */}
        <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {/* Notification */}
        <button className="relative w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center text-xs font-bold text-white">
          JS
        </div>
      </div>
    </header>
  );
}
