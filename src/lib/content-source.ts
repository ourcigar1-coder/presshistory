import { ENTRY_PAGE_QUERY, TECHNIQUE_PAGE_QUERY } from '@/sanity/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { hasSanityConfig } from '@/sanity/env'
import { entries, techniques, type EntryContent, type TechniqueContent } from '@/lib/content'
import type { ContentCard } from '@/lib/content'

const routeForType: Record<string, string> = {
  technique: 'techniques',
  artwork: 'works',
  story: 'stories',
  scienceConcept: 'science',
  bridge: 'bridge',
}

type SanityCard = {
  _id: string
  _type: string
  title: string
  slug: string
  shortDescription?: string
  domain?: string
}

type SanityEntry = SanityCard & {
  introQuestion?: string
  entryConnections?: SanityCard[]
}

type SanityTechnique = SanityCard & {
  family?: string
  process?: Array<{ step?: number; title?: string; description?: string }>
  relatedScience?: SanityCard[]
}

function cardHref(card: SanityCard) {
  return `/${routeForType[card._type] || `${card._type}s`}/${card.slug}`
}

function mapCard(card: SanityCard): ContentCard {
  return {
    _id: card._id,
    _type: card._type,
    title: card.title,
    slug: card.slug,
    shortDescription: card.shortDescription || '',
    domain: card.domain || '지식 노드',
  }
}

function mapEntry(entry: SanityEntry): EntryContent {
  return {
    ...entry,
    shortDescription: entry.shortDescription || '',
    domain: entry.domain || '탐험',
    introQuestion: entry.introQuestion || '이 지식은 다음 질문으로 어디까지 이어질까?',
    steps: (entry.entryConnections || []).map((connection) => ({
      title: connection.title,
      description: connection.shortDescription || '',
      href: cardHref(connection),
      label: connection.domain || '지식 노드',
    })),
  }
}

function mapTechnique(technique: SanityTechnique): TechniqueContent {
  return {
    ...technique,
    shortDescription: technique.shortDescription || '',
    domain: technique.domain || '기법',
    family: technique.family || 'Technique',
    process: (technique.process || []).map((step, index) => ({
      step: step.step || index + 1,
      title: step.title || `Process ${index + 1}`,
      description: step.description || '',
    })),
    relatedScience: (technique.relatedScience || []).map(mapCard),
  }
}

export async function getEntry(slug: string) {
  if (!hasSanityConfig) return entries[slug]

  try {
    const result = await sanityFetch({ query: ENTRY_PAGE_QUERY, params: { slug } })
    return result.data ? mapEntry(result.data as SanityEntry) : entries[slug]
  } catch {
    return entries[slug]
  }
}

export async function getTechnique(slug: string) {
  if (!hasSanityConfig) return techniques[slug]

  try {
    const result = await sanityFetch({ query: TECHNIQUE_PAGE_QUERY, params: { slug } })
    return result.data ? mapTechnique(result.data as SanityTechnique) : techniques[slug]
  } catch {
    return techniques[slug]
  }
}
