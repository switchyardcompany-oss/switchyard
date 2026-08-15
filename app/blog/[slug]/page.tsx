import './blog.css';

import { getBlogData, getAllBlogSlugs, getInternalLinks } from '@/lib/blog';
import BlogFAQ from '@/components/BlogFAQ';
import PortableContent from '@/components/PortableContent';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);
  if (!data) return notFound();

  const internalLinks = data.content?.length ? getInternalLinks(slug) : [];

  return (
    <div className="blog-page">
      <div className="blog-container">
        <main className="blog-main">
          <article>
            <h1 className="blog-title">{data.title}</h1>

            <div className="blog-meta">
              <time>{data.date}</time>
              <span className="blog-meta-divider">|</span>
              <span>{data.category}</span>
            </div>

            <div className="blog-subtitle">{data.subtitle}</div>

            <div className="blog-featured-image">
              <img src={data.featuredImage} alt={data.title} className="blog-featured-image__img" />
            </div>

            <PortableContent value={data.content} className="blog-content" />

            {internalLinks.length > 0 && (
              <section className="blog-internal-links">
                <h2>Continue with Keentel</h2>
                <p>Explore these related resources for your project:</p>
                <ul>
                  {internalLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {data.faqs && data.faqs.length > 0 && (
              <>
                <h2 className="blog-faq-heading">FAQs</h2>
                <BlogFAQ faqs={data.faqs} />
              </>
            )}
          </article>
        </main>

        <aside className="blog-sidebar">
          <div className="blog-sidebar-card">
            <div className="blog-author-avatar">
              <img
                src={data.authorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
                alt="Author"
                className="blog-author-avatar__img"
              />
            </div>
            <h3 className="blog-author-name">{data.authorName || 'John Keentel'}</h3>
            <p className="blog-author-title">{data.authorTitle || 'Senior Engineer & General Contractor'}</p>
            <p className="blog-author-bio">{data.authorBio || 'With over 20 years of experience...'}</p>
          </div>

          <div className="blog-sidebar-card blog-cta-card">
            <div className="blog-cta-image">
              <img
                src={data.ctaImage || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop'}
                alt="Discuss your project"
                className="blog-cta-image__img"
              />
            </div>
            <h3>{data.ctaTitle || "Let's Discuss Your Project"}</h3>
            <p>{data.ctaText || "Let's book a call..."}</p>
            <div className="blog-cta-buttons">
              <a
                className="blog-cta-btn blog-cta-primary"
                href={data.ctaButton1Link || '/contact#contactformsection'}
              >
                {data.ctaButton1Text || 'Schedule A Consultation'}
              </a>
              <a
                className="blog-cta-btn blog-cta-secondary"
                href={data.ctaButton2Link || '#'}
              >
                {data.ctaButton2Text || 'Download Company Profile Flyer'}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
