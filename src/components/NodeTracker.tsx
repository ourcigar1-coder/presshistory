'use client'

import { useEffect } from 'react'
import { trackNodeView } from '@/lib/tracking'

export function NodeTracker({ id, type, title, slug }: { id: string; type: 'technique' | 'entry'; title: string; slug: string }) {
  useEffect(() => {
    trackNodeView({ id, type, title, slug })
  }, [id, slug, title, type])

  return null
}
