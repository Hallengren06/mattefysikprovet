import Link from 'next/link';
import { TestResultSubmitForm } from '@/components/TestResultSubmitForm';

export default async function TestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/tests" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        ← Tillbaka till alla prov
      </Link>

      <div className="bg-mafy-card border border-mafy-border rounded-2xl p-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand/20 text-brand">Matematik</span>
        <h1 className="text-2xl font-bold text-white mt-3">Prov #{testId}</h1>
        <div className="flex gap-6 mt-2 text-sm text-gray-400">
          <span>⏱ 120 min</span>
          <span>❓ 75 frågor</span>
        </div>

        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
          Träna på ett riktigt prov under realistiska förhållanden. Du kan välja att köra med eller utan tidsgräns.
        </p>

        <div className="flex gap-3 mt-6">
          <button className="bg-brand hover:bg-brand/80 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Starta med tidsgräns ⏱
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-mafy-border text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Starta utan tidsgräns
          </button>
        </div>
      </div>

      <TestResultSubmitForm
        testId={testId}
        testName={`Prov ${testId}`}
        category="Matematik"
        totalQuestions={75}
      />

      <div className="bg-mafy-card border border-mafy-border rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-2">Ämnesområden</h2>
        <div className="flex flex-wrap gap-2">
          {['Algebra', 'Geometri', 'Trigonometri', 'Derivata', 'Integraler', 'Statistik'].map((s) => (
            <span key={s} className="text-xs bg-white/5 border border-mafy-border px-2.5 py-1 rounded-full text-gray-400">
              {s}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center">Provvy med frågor och timer implementeras i nästa steg.</p>
    </div>
  );
}
