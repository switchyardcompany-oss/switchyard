import '../blog/blog.css'
import '../publications.css'
import PublicationListing from '@/components/PublicationListing'
import { getPublications } from '@/lib/publications'

export const dynamic = 'force-dynamic'

export default async function WhitePapersPage() {
  const items = await getPublications('whitePaper')
  return <PublicationListing items={items} title="White Papers" description="Read technical publications and download detailed guidance for your next project." hrefBase="/white-papers" eyebrow="Technical Publications" />
}
