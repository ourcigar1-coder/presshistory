import Link from 'next/link'
import type { ContentCard } from '@/lib/content'

function hrefForCard(card: ContentCard) {
  if (card._type === 'artwork') return `/works/${card.slug}`
  if (card._type === 'scienceConcept') return `/science/${card.slug}`
  if (card._type === 'technique') return `/techniques/${card.slug}`
  if (card._type === 'story') return `/stories/${card.slug}`
  return `/${card._type}s/${card.slug}`
}

export function RelatedLinks({ items }: { items: ContentCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <Link key={item._id} href={hrefForCard(item)} className="border border-[var(--line)] p-5 transition-transform hover:-translate-y-1 hover:bg-[var(--paper-deep)]">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--coral)]">{item.domain}</span>
          <span className="mt-2 block font-display text-2xl font-semibold">{item.title}</span>
          <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">{item.shortDescription}</span>
        </Link>
      ))}
    </div>
  )
}
