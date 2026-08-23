import { notFound } from 'next/navigation'
import { ContentHeader } from '@/components/ContentHeader'
import { PathList } from '@/components/PathList'
import { entries } from '@/lib/content'
import { getEntry } from '@/lib/content-source'

export function generateStaticParams() {
  return Object.keys(entries).map((slug) => ({ slug }))
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = await getEntry(slug)

  if (!entry) notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
      <ContentHeader eyebrow={`Entry / ${entry.domain}`} title={entry.title} description={entry.shortDescription} />
      <section className="grid gap-12 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--coral)]">The opening question</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">{entry.introQuestion}</h2>
        </div>
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Choose a route</p>
          <PathList steps={entry.steps} />
        </div>
      </section>
    </main>
  )
}
