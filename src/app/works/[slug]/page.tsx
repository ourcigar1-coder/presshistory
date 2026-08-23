import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentHeader } from '@/components/ContentHeader'
import { RelatedLinks } from '@/components/RelatedLinks'
import { artworks } from '@/lib/content'
import { NodeTracker } from '@/components/NodeTracker'

export function generateStaticParams() {
  return Object.keys(artworks).map((slug) => ({ slug }))
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artwork = artworks[slug]
  if (!artwork) notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
      <NodeTracker id={artwork._id} type="artwork" title={artwork.title} slug={artwork.slug} />
      <ContentHeader eyebrow={`Artwork / ${artwork.artist}`} title={artwork.title} description={artwork.shortDescription} />
      <section className="grid gap-8 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div className="artwork-plate" role="img" aria-label={`${artwork.title} 작품을 위한 추상 이미지`}>
          <span className="artwork-sun" />
          <span className="artwork-wave artwork-wave-one" />
          <span className="artwork-wave artwork-wave-two" />
          <span className="artwork-wave artwork-wave-three" />
        </div>
        <dl className="grid grid-cols-2 content-start gap-x-5 gap-y-8 border-t border-[var(--line)] pt-5 text-sm">
          <div><dt className="text-[var(--muted)]">Artist</dt><dd className="mt-1 font-semibold">{artwork.artist}</dd></div>
          <div><dt className="text-[var(--muted)]">Year</dt><dd className="mt-1 font-semibold">{artwork.year}</dd></div>
          <div className="col-span-2"><dt className="text-[var(--muted)]">Technique</dt><dd className="mt-1"><Link href={`/techniques/${artwork.technique.slug}`} className="font-semibold underline decoration-[var(--coral)] decoration-2 underline-offset-4">{artwork.technique.title}</Link></dd></div>
          <div className="col-span-2"><dt className="text-[var(--muted)]">Materials</dt><dd className="mt-1 font-semibold">{artwork.materials.join(' · ')}</dd></div>
        </dl>
      </section>
      <section className="border-t border-[var(--line)] py-12 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--coral)]">Why it matters</p>
        <p className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight">{artwork.whyItMatters}</p>
      </section>
      <section className="border-t border-[var(--line)] py-12">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Continue exploring</p>
        <RelatedLinks items={[artwork.technique]} />
      </section>
    </main>
  )
}
