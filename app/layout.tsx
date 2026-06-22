import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Mattefysikprovet',
  description: 'Öva till matematik- och fysikprovet med prov, analys och studiestöd.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
