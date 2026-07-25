'use client';

import { useState } from 'react';
import Link from 'next/link';

type TestResultSubmitFormProps = {
  testId: string;
  testName: string;
  category: string;
  totalQuestions: number;
};

export function TestResultSubmitForm({ testId, testName, category, totalQuestions }: TestResultSubmitFormProps) {
  const [correctAnswers, setCorrectAnswers] = useState(Math.floor(totalQuestions * 0.6));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/tests/${testId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testName,
          category,
          totalQuestions,
          correctAnswers
        })
      });

      if (response.ok) {
        setMessage('✓ Resultatet sparades!');
      } else {
        const payload = (await response.json()) as { message?: string };
        setMessage(payload.message ?? 'Kunde inte spara resultatet.');
      }
    } catch {
      setMessage('Kunde inte spara resultatet.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-mafy-card border border-mafy-border rounded-2xl p-5">
      <h2 className="font-semibold text-white mb-2">Spara provresultat</h2>
      <p className="text-xs text-gray-400 mb-4">Fyll i hur många rätt du fick så sparas resultatet till din historik.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm text-gray-300">
          Antal rätt ({correctAnswers}/{totalQuestions})
          <input
            type="range"
            min={0}
            max={totalQuestions}
            step={1}
            value={correctAnswers}
            onChange={(event) => setCorrectAnswers(Number(event.target.value))}
            className="w-full mt-2"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-brand hover:bg-brand/80 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors disabled:opacity-60"
        >
          {loading ? 'Sparar...' : 'Spara resultat'}
        </button>
        {message && (
          <p className={`text-sm ${message.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
        )}
      </form>
      <Link href="/dashboard/results" className="inline-block mt-4 text-xs text-brand hover:text-accent transition-colors">
        Gå till resultathistorik →
      </Link>
    </div>
  );
}
