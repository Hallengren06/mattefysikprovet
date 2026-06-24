'use client';

import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    async function logout() {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    }

    void logout();
  }, []);

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Utloggning</h1>
      <p className="mt-2 text-sm text-slate-600">Loggar ut...</p>
    </div>
  );
}
