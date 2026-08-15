import './blog.css';

import { getBlogData, getAllBlogSlugs } from '@/lib/blog';
import BlogFAQ from '@/components/BlogFAQ';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

const html = (value: string) => ({ __html: value });

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);
  if (!data) return notFound();

  return (
    <div className="blog-page">
      <div className="blog-container">
        <main className="blog-main">
          <article>
            <h1 className="blog-title" dangerouslySetInnerHTML={html(data.title)} />

            <div className="blog-meta">
              <time dangerouslySetInnerHTML={html(data.date)} />
              <span className="blog-meta-divider">|</span>
              <span dangerouslySetInnerHTML={html(data.category)} />
            </div>

            <div className="blog-subtitle" dangerouslySetInnerHTML={html(data.subtitle)} />

            <div className="blog-featured-image">
              <img src={data.featuredImage} alt={data.title} className="blog-featured-image__img" />
            </div>

            <div className="blog-content" dangerouslySetInnerHTML={html(data.content)} />

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
            <h3 className="blog-author-name" dangerouslySetInnerHTML={html(data.authorName || 'John Keentel')} />
            <p className="blog-author-title" dangerouslySetInnerHTML={html(data.authorTitle || 'Senior Engineer & General Contractor')} />
            <p className="blog-author-bio" dangerouslySetInnerHTML={html(data.authorBio || 'With over 20 years of experience...')} />
          </div>

          <div className="blog-sidebar-card blog-cta-card">
            <div className="blog-cta-image">
              <img
                src={data.ctaImage || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop'}
                alt="Discuss your project"
                className="blog-cta-image__img"
              />
            </div>
            <h3 dangerouslySetInnerHTML={html(data.ctaTitle || "Let's Discuss Your Project")} />
            <p dangerouslySetInnerHTML={html(data.ctaText || "Let's book a call...")} />
            <div className="blog-cta-buttons">
              <a
                className="blog-cta-btn blog-cta-primary"
                href={data.ctaButton1Link || '/contact#contactformsection'}
                dangerouslySetInnerHTML={html(data.ctaButton1Text || 'Schedule A Consultation')}
              />
              <a
                className="blog-cta-btn blog-cta-secondary"
                href={data.ctaButton2Link || '#'}
                dangerouslySetInnerHTML={html(data.ctaButton2Text || 'Download Company Profile Flyer')}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
