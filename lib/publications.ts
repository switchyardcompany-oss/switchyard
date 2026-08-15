import { sanityClient, sanityImageUrl } from '@/lib/sanity'

export type PublicationType = 'caseStudy' | 'whitePaper' | 'newsletter'

export type Publication = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: string
  content?: unknown[]
  publishedDate?: string
  category?: { title?: string; slug?: string }
  pdfUrl?: string
}

type RawPublication = Omit<Publication, 'featuredImage'> & { featuredImage?: unknown }

const projection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  content,
  publishedDate,
  "category": category->{title, "slug": slug.current},
  "pdfUrl": pdfFile.asset->url
}`

export const caseStudyListQuery = `*[_type == "caseStudy" && defined(slug.current) && (!defined(publishedDate) || publishedDate <= now())] | order(publishedDate desc) ${projection}`
export const caseStudyDetailQuery = `*[_type == "caseStudy" && slug.current == $slug][0] ${projection}`
export const whitePaperListQuery = `*[_type == "whitePaper" && defined(slug.current) && (!defined(publishedDate) || publishedDate <= now())] | order(publishedDate desc) ${projection}`
export const whitePaperDetailQuery = `*[_type == "whitePaper" && slug.current == $slug][0] ${projection}`
export const newsletterListQuery = `*[_type == "newsletter" && defined(slug.current) && (!defined(publishedDate) || publishedDate <= now())] | order(publishedDate desc) ${projection}`
export const newsletterDetailQuery = `*[_type == "newsletter" && slug.current == $slug][0] ${projection}`

const listQueries: Record<PublicationType, string> = {
  caseStudy: caseStudyListQuery,
  whitePaper: whitePaperListQuery,
  newsletter: newsletterListQuery,
}

const detailQueries: Record<PublicationType, string> = {
  caseStudy: caseStudyDetailQuery,
  whitePaper: whitePaperDetailQuery,
  newsletter: newsletterDetailQuery,
}

function normalizePublication(publication: RawPublication): Publication {
  return {
    ...publication,
    featuredImage: sanityImageUrl(publication.featuredImage),
  }
}

export async function getPublications(type: PublicationType) {
  try {
    const data = await sanityClient.fetch<RawPublication[]>(listQueries[type])
    return Array.isArray(data) ? data.map(normalizePublication) : []
  } catch (error) {
    console.error(`Sanity ${type} list read failed:`, error)
    return []
  }
}

export async function getPublication(type: PublicationType, slug: string) {
  try {
    const data = await sanityClient.fetch<RawPublication | null>(detailQueries[type], { slug })
    return data ? normalizePublication(data) : null
  } catch (error) {
    console.error(`Sanity ${type} detail read failed:`, error)
    return null
  }
}
