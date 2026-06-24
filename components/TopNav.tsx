'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { SessionUser } from '@/lib/session';

const topLinks = [
  { label: 'Hem', href: '/dashboard' },
  { label: 'Prov', href: '/tests' },
  { label: 'Öva', href: '/ovning' },
  { label: 'Min utveckling', href: '/min-utveckling' },
  { label: 'AI Assistent', href: '/ai-assistent' },
  { label: 'Priser', href: '/priser' }
];

function getInitials(nameOrEmail: string) {
  const clean = nameOrEmail.trim();

  if (!clean) return 'AN';

  const parts = clean.includes('@') ? clean.split('@')[0].split(/[._-]/) : clean.split(' ');
  const filtered = parts.filter(Boolean);

  if (filtered.length === 0) return 'AN';
  if (filtered.length === 1) return filtered[0].slice(0, 2).toUpperCase();

  return `${filtered[0][0] ?? ''}${filtered[1][0] ?? ''}`.toUpperCase();
}

export function TopNav({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }

  return (
    <header className="h-14 border-b border-mafy-border bg-mafy-bg/95 backdrop-blur flex items-center px-6 gap-6">
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

      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-xs text-gray-300 hover:text-white transition-colors disabled:opacity-60"
        >
          {loggingOut ? 'Loggar ut...' : 'Logga ut'}
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center text-xs font-bold text-white">
          {getInitials(user.name || user.email)}
        </div>
      </div>
    </header>
  );
}
