import Link from 'next/link'
import type { Publication } from '@/lib/publications'
import PortableContent from '@/components/PortableContent'

type PublicationDetailProps = {
  item: Publication
  typeLabel: string
  listingHref: string
}

export default function PublicationDetail({ item, typeLabel, listingHref }: PublicationDetailProps) {
  return (
    <div className="blog-page publication-detail-page">
      <div className="blog-container">
        <main className="blog-main">
          <article>
            <Link className="publication-back-link" href={listingHref}>← Back to {typeLabel}</Link>
            <span className="hero-badge publication-eyebrow">{typeLabel}</span>
            <h1 className="blog-title">{item.title}</h1>
            <div className="blog-meta">
              {item.publishedDate && <time dateTime={item.publishedDate}>{new Date(item.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>}
              {item.category?.title && <><span className="blog-meta-divider">|</span><span>{item.category.title}</span></>}
            </div>
            {item.featuredImage && <img className="publication-featured-image" src={item.featuredImage} alt={item.title} />}
            {item.excerpt && <p className="blog-subtitle">{item.excerpt}</p>}
            {item.pdfUrl && <a className="hero-cta publication-download" href={item.pdfUrl} target="_blank" rel="noreferrer" download>Download PDF</a>}
            <PortableContent value={item.content} />
          </article>
        </main>
      </div>
    </div>
  )
}
