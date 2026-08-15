import Link from 'next/link'
import type { Publication } from '@/lib/publications'

type PublicationListingProps = {
  items: Publication[]
  title: string
  description: string
  hrefBase: string
  eyebrow: string
}

function formatDate(value?: string) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function PublicationListing({ items, title, description, hrefBase, eyebrow }: PublicationListingProps) {
  return (
    <div className="blog-index-page publication-index-page">
      <section className="blog-hero">
        <div className="blog-hero-image" aria-hidden="true" />
        <div className="blog-hero-overlay" />
        <div className="blog-hero-content">
          <span className="hero-badge">{eyebrow}</span>
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{description}</p>
          <div className="blog-hero-stats" aria-label={`${title} statistics`}>
            <div><strong>{items.length}</strong><span>Published Items</span></div>
            <div><strong>Sanity</strong><span>Managed Content</span></div>
          </div>
        </div>
      </section>

      <div className="blog-index-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {items.length === 0 ? (
        <div className="blog-no-results publication-empty-state"><p>No {title.toLowerCase()} are currently published.</p></div>
      ) : (
        <div className="blog-index-grid publication-grid">
          {items.map((item) => (
            <Link href={`${hrefBase}/${item.slug}`} key={item._id} className="blog-card">
              <div className="blog-card-image">
                {item.featuredImage ? <img src={item.featuredImage} alt={item.title} loading="lazy" /> : <div className="blog-card-image-placeholder"><span>□</span></div>}
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-date">{formatDate(item.publishedDate)}</span>
                  {item.category?.title && <span className="blog-card-category">{item.category.title}</span>}
                </div>
                <h2 className="blog-card-title">{item.title}</h2>
                <p className="blog-card-excerpt">{item.excerpt || ''}</p>
                <span className="blog-card-read-more">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
