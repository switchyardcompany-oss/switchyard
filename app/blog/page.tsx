import './blog.css';
import { getAllBlogSlugs, getBlogData } from '@/lib/blog';
import BlogFilters from '@/components/BlogFilters';

export const dynamic = 'force-dynamic';

type BlogPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const queryValue = (await searchParams).q;
  const initialSearch = Array.isArray(queryValue) ? queryValue[0] ?? '' : queryValue ?? '';
  const slugs = await getAllBlogSlugs();

  const blogs = await Promise.all(
    slugs.map(async (slug) => {
      const data = await getBlogData(slug);
      return { slug, ...data };
    })
  );

  blogs.sort((a, b) => {
    const dateA = new Date(a.date || '2000-01-01');
    const dateB = new Date(b.date || '2000-01-01');
    return dateB.getTime() - dateA.getTime();
  });

  const categoryCount = new Set(blogs.map((blog) => blog.category).filter(Boolean)).size;

  return (
    <div className="blog-index-page">
      <section className="blog-hero">
        <div className="blog-hero-image" aria-hidden="true" />
        <div className="blog-hero-overlay" />

        <div className="blog-hero-content">
          <span className="hero-badge">Keentel Field Notes</span>
          <h1 className="hero-title">
            Construction Insights for
            <span className="hero-gradient-text">Smarter Projects</span>
          </h1>
          <p className="hero-subtitle">
            Practical guidance on construction planning, electrical systems, remodeling,
            restoration, safety, and successful project delivery.
          </p>

          <div className="blog-hero-action">
            <p>Build with better information and greater confidence.</p>
            <a href="/contact#contactformsection" className="hero-cta">
              Book a Consultation <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="blog-hero-stats" aria-label="Keentel blog statistics">
            <div><strong>{blogs.length}+</strong><span>Technical Articles</span></div>
            <div><strong>{categoryCount}</strong><span>Topic Categories</span></div>
            <div><strong>30+</strong><span>Years of Expertise</span></div>
          </div>
        </div>
      </section>

      <div className="blog-index-header" id="blog-grid">
        <h2>Keentel Blogs</h2>
        <p>Insights, guides, and technical publications from our construction team.</p>
      </div>

      <BlogFilters blogs={blogs} initialSearch={initialSearch} />
    </div>
  );
}
