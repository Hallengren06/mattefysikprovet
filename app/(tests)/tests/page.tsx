import Link from 'next/link';

const tests = [
  { id: '1', name: 'Matematikprov 2023', category: 'Matematik', duration: 120, questions: 75, year: 2023 },
  { id: '2', name: 'Fysikprov 2023', category: 'Fysik', duration: 120, questions: 60, year: 2023 },
  { id: '3', name: 'Matematikprov 2022', category: 'Matematik', duration: 120, questions: 75, year: 2022 },
  { id: '4', name: 'Fysikprov 2022', category: 'Fysik', duration: 120, questions: 60, year: 2022 },
  { id: '5', name: 'Matematikprov 2021', category: 'Matematik', duration: 120, questions: 75, year: 2021 },
  { id: '6', name: 'Fysikprov 2021', category: 'Fysik', duration: 120, questions: 60, year: 2021 },
];

const categories = ['Alla', 'Matematik', 'Fysik'];

export default function TestsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alla prov</h1>
          <p className="text-gray-400 text-sm mt-1">Träna på tidigare prov och förbättra ditt resultat.</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2">
        {categories.map((cat, i) => (
          <span
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              i === 0
                ? 'bg-brand text-white'
                : 'bg-mafy-card border border-mafy-border text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Tests grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <article
            key={test.id}
            className="bg-mafy-card border border-mafy-border rounded-2xl p-5 hover:border-brand/40 hover:bg-mafy-card2 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                test.category === 'Matematik'
                  ? 'bg-brand/20 text-brand'
                  : 'bg-accent/20 text-accent'
              }`}>
                {test.category}
              </span>
              <span className="text-xs text-gray-600">{test.year}</span>
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">{test.name}</h3>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span>⏱ {test.duration} min</span>
              <span>❓ {test.questions} frågor</span>
            </div>
            <Link
              href={`/tests/${test.id}`}
              className="mt-4 inline-flex items-center gap-2 bg-brand/10 hover:bg-brand text-brand hover:text-white border border-brand/20 hover:border-brand font-semibold text-sm px-4 py-2 rounded-lg transition-all"
            >
              Starta prov ▶
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

