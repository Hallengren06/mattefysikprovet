export function PlaceholderPage({ title, description = 'Den här sidan är under utveckling.' }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="text-5xl mb-4">🔧</div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 mt-2 max-w-xs">{description}</p>
    </div>
  );
}
