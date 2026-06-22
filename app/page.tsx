import Link from 'next/link';

const universities = ['Chalmers', 'KTH', 'Göteborgs universitet', 'Stockholms universitet'];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-brand">Matematik- och fysikprovet</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Din kompletta plattform för att klara provet</h1>
          <p className="mt-4 text-lg text-slate-600">
            Träna på tidigare prov, följ din utveckling och få smart analys av vilka områden du behöver förbättra.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Skapa konto
            </Link>
            <Link href="/tests" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Se övningsprov
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Varför mattefysikprovet?</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Tidsatta och otidsatta testlägen</li>
            <li>• AI-drivna rekommendationer för nästa steg</li>
            <li>• Videoförklaringar och riktad träning</li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900">Fördelar</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold">AI-analys</h3>
              <p className="mt-2 text-sm text-slate-600">Få tydlig feedback på mönster, misstag och fokusområden.</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold">Videolektioner</h3>
              <p className="mt-2 text-sm text-slate-600">Lär dig med korta genomgångar för varje område.</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold">Övningsprov</h3>
              <p className="mt-2 text-sm text-slate-600">Träna med realistiska provmiljöer och följ resultat över tid.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900">Program och universitet</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {universities.map((university) => (
              <div key={university} className="rounded-lg border border-slate-200 bg-white p-4 text-center text-sm font-medium text-slate-700">
                {university}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/register" className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-sky-600">
              Kom igång idag
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
