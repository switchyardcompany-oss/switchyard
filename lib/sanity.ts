import { createClient } from 'next-sanity'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6dzdb4x6'
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2026-08-14',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format')
}

export function sanityImageUrl(source: unknown): string | undefined {
  if (!source) return undefined
  if (typeof source === 'string') return source

  try {
    return urlFor(source as SanityImageSource).url()
  } catch {
    return undefined
  }
}
