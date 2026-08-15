import '../blog/blog.css'
import '../publications.css'
import PublicationListing from '@/components/PublicationListing'
import { getPublications } from '@/lib/publications'

export const dynamic = 'force-dynamic'

export default async function NewslettersPage() {
  const items = await getPublications('newsletter')
  return <PublicationListing items={items} title="Newsletters" description="Browse the latest updates, insights, and announcements from our team." hrefBase="/newsletters" eyebrow="Company Updates" />
}
