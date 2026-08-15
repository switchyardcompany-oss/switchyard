import '../../blog/blog.css'
import '../../publications.css'
import { notFound } from 'next/navigation'
import PublicationDetail from '@/components/PublicationDetail'
import { getPublication, getPublications } from '@/lib/publications'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const items = await getPublications('newsletter')
  return items.map((item) => ({ slug: item.slug }))
}

export default async function NewsletterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPublication('newsletter', slug)
  if (!item) return notFound()
  return <PublicationDetail item={item} typeLabel="Newsletters" listingHref="/newsletters" />
}
