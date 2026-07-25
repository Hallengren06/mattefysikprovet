import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'MAFY – Mattefysikprovet',
  description: 'Din väg till drömutbildningen. Öva på matematik- och fysikprovet med AI-analys och personliga studieplaner.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
