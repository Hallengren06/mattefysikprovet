import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-mafy-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-white">MAFY</Link>
          <p className="text-gray-500 text-sm mt-1">Logga in på ditt konto</p>
        </div>
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-8">
          <p className="text-center text-gray-400 text-sm">
            Gå till{' '}
            <Link href="/" className="text-brand hover:text-accent transition-colors font-medium">
              startsidan
            </Link>{' '}
            för att logga in.
          </p>
        </div>
      </div>
    </div>
  );
}

