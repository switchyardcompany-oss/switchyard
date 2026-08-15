import '../blog/blog.css'
import '../publications.css'
import PublicationListing from '@/components/PublicationListing'
import { getPublications } from '@/lib/publications'

export const dynamic = 'force-dynamic'

export default async function CaseStudiesPage() {
  const items = await getPublications('caseStudy')
  return <PublicationListing items={items} title="Case Studies" description="Explore project outcomes, approaches, and lessons from work delivered by our team." hrefBase="/case-studies" eyebrow="Project Results" />
}
