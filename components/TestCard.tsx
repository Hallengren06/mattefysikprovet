import Link from 'next/link';

type TestCardProps = {
  id: string;
  name: string;
  category: string;
  duration: number;
};

export function TestCard({ id, name, category, duration }: TestCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">{category}</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{name}</h3>
      <p className="mt-1 text-sm text-slate-600">Tid: {duration} min</p>
      <Link href={`/tests/${id}`} className="mt-4 inline-flex text-sm font-semibold text-brand hover:text-blue-700">
        Starta prov
      </Link>
    </article>
  );
}
