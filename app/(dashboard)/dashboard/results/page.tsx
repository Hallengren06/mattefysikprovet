'use client';

import { useEffect, useState } from 'react';

type ResultItem = {
  id: string;
  testId: string;
  testName: string;
  category: string;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
};

export default function ResultsPage() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadResults() {
      try {
        const response = await fetch('/api/user/results');
        if (!response.ok) {
          throw new Error('Kunde inte hämta resultat.');
        }

        const payload = (await response.json()) as { results: ResultItem[] };
        if (!cancelled) {
          setResults(payload.results);
        }
      } catch {
        if (!cancelled) {
          setError('Kunde inte hämta resultat.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadResults();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Resultathistorik</h1>
        <p className="text-gray-400 text-sm mt-1">Alla dina sparade provresultat från Firebase.</p>
      </div>

      {loading ? (
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-6 text-sm text-gray-400">Laddar resultat...</div>
      ) : error ? (
        <div className="bg-mafy-card border border-red-500/30 rounded-2xl p-6 text-sm text-red-300">{error}</div>
      ) : results.length === 0 ? (
        <div className="bg-mafy-card border border-mafy-border rounded-2xl p-6 text-sm text-gray-400">
          Du har inga sparade resultat ännu. Gå till ett prov och spara ditt resultat först.
        </div>
      ) : (
        <div className="bg-mafy-card border border-mafy-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="text-left px-4 py-3">Prov</th>
                <th className="text-left px-4 py-3">Kategori</th>
                <th className="text-left px-4 py-3">Resultat</th>
                <th className="text-left px-4 py-3">Poäng</th>
                <th className="text-left px-4 py-3">Datum</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="border-t border-mafy-border text-gray-200">
                  <td className="px-4 py-3">{result.testName}</td>
                  <td className="px-4 py-3">{result.category}</td>
                  <td className="px-4 py-3 font-semibold text-white">{result.percentage}%</td>
                  <td className="px-4 py-3">{result.correctAnswers}/{result.totalQuestions}</td>
                  <td className="px-4 py-3 text-gray-400">{new Date(result.createdAt).toLocaleDateString('sv-SE')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
