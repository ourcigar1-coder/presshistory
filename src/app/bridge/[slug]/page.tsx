import { notFound } from 'next/navigation'
import { ContentHeader } from '@/components/ContentHeader'
import { bridges } from '@/lib/content'
import { NodeTracker } from '@/components/NodeTracker'

export function generateStaticParams() { return Object.keys(bridges).map((slug) => ({ slug })) }

export default async function BridgePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const bridge = bridges[slug]
  if (!bridge) notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
      <NodeTracker id={bridge._id} type="bridge" title={bridge.title} slug={bridge.slug} />
      <ContentHeader eyebrow={`Bridge / ${bridge.domain}`} title={bridge.title} description={bridge.shortDescription} />
      <section className="py-14 lg:py-20"><p className="max-w-2xl font-display text-4xl font-semibold leading-tight">{bridge.introQuestion}</p></section>
      <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {bridge.steps.map((step, index) => <li key={step.title} className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center"><span className="text-sm font-bold text-[var(--coral)]">0{index + 1}</span><div><h2 className="font-display text-3xl font-semibold">{step.title}</h2><p className="mt-2 max-w-2xl leading-7 text-[var(--muted)]">{step.description}</p></div><span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{step.relationNature}</span></li>)}
      </ol>
    </main>
  )
}
