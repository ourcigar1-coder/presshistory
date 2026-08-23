'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!key || posthog.__loaded) return
    posthog.init(key, { api_host: host, capture_pageview: false, persistence: 'localStorage' })
  }, [])

  return children
}
