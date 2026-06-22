import { TestCard } from '@/components/TestCard';

const tests = [
  { id: '1', name: 'Matematikprov 2023', category: 'Matematik', duration: 120 },
  { id: '2', name: 'Fysikprov 2023', category: 'Fysik', duration: 120 }
];

export default function TestsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Alla prov</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tests.map((test) => (
          <TestCard key={test.id} {...test} />
        ))}
      </div>
    </div>
  );
}
