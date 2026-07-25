import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} mattefysikprovet</p>
        <div className="flex gap-4">
          <Link href="/tests" className="hover:text-slate-900">
            Övningsprov
          </Link>
          <Link href="/dashboard" className="hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-slate-900">
            Konto
          </Link>
        </div>
      </div>
    </footer>
  );
}
