import { createClient } from 'next-sanity'

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6dzdb4x6'
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2026-08-14',
  useCdn: true,
})
