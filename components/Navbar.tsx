import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-brand">
          mattefysikprovet
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Hem
          </Link>
          <Link href="/login" className="text-slate-600 hover:text-slate-900">
            Logga in
          </Link>
          <Link href="/register" className="rounded-md bg-brand px-3 py-2 text-white hover:bg-blue-700">
            Registrera
          </Link>
        </nav>
      </div>
    </header>
  );
}
