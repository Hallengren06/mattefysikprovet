export default async function TestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold">Prov #{testId}</h1>
      <p className="mt-2 text-sm text-slate-600">Provvy med frågor och timer implementeras i nästa steg.</p>
    </div>
  );
}
