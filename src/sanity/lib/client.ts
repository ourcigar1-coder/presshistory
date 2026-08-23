import { createClient } from '@sanity/client'
import { sanityConfig } from '@/sanity/env'

export const client = createClient({
  ...sanityConfig,
  useCdn: true,
  perspective: 'published',
})
