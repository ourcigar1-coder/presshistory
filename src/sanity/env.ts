const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const sanityConfig = {
  projectId: projectId || 'missing-project-id',
  dataset: dataset || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01',
}

export const hasSanityConfig = Boolean(projectId && dataset)
