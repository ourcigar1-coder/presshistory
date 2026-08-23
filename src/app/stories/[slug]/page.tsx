import { notFound } from 'next/navigation'
import { ContentHeader } from '@/components/ContentHeader'
import { RelatedLinks } from '@/components/RelatedLinks'
import { stories } from '@/lib/content'
import { NodeTracker } from '@/components/NodeTracker'

export function generateStaticParams() {
  return Object.keys(stories).map((slug) => ({ slug }))
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = stories[slug]
  if (!story) notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
      <NodeTracker id={story._id} type="story" title={story.title} slug={story.slug} />
      <ContentHeader eyebrow={`Story / ${story.domain}`} title={story.title} description={story.shortDescription} />
      <article className="grid gap-12 py-14 lg:grid-cols-[0.65fr_1.35fr] lg:py-20">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--coral)]">The question</p><h2 className="mt-4 font-display text-4xl font-semibold leading-tight">{story.question}</h2></div>
        <div><p className="border-l-4 border-[var(--coral)] pl-5 text-2xl font-semibold leading-10">{story.shortAnswer}</p><p className="mt-10 max-w-2xl text-lg leading-9 text-[var(--muted)]">{story.body}</p></div>
      </article>
      <section className="border-t border-[var(--line)] py-12"><p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Follow the connection</p><RelatedLinks items={story.related} /></section>
    </main>
  )
}
