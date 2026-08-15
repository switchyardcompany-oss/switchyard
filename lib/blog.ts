import { sanityClient, sanityImageUrl } from '@/lib/sanity';

type InternalLink = { href: string; label: string };

const internalLinksBySlug: Record<string, InternalLink[]> = {
  'commercial-construction-costs-florida': [
    { href: '/services/pre-construction', label: 'Explore our pre-construction planning process' },
    { href: '/blog/commercial-remodeling-when-to-renovate', label: 'Read when a commercial renovation makes sense' },
    { href: '/services/general-construction', label: 'See our general construction services' },
  ],
  'commercial-remodeling-when-to-renovate': [
    { href: '/services/commercial-remodeling', label: 'Explore commercial remodeling services' },
    { href: '/blog/signs-commercial-building-needs-remodeling', label: 'Review the signs your building needs remodeling' },
    { href: '/services/pre-construction', label: 'Start with pre-construction planning' },
  ],
  'complete-guide-commercial-construction-florida': [
    { href: '/services/general-construction', label: 'Explore general construction services' },
    { href: '/services/pre-construction', label: 'Learn about pre-construction planning' },
    { href: '/blog/commercial-construction-costs-florida', label: 'Read our Florida construction cost guide' },
  ],
  'design-build-vs-traditional-construction': [
    { href: '/services/design-build', label: 'See how our design-build process works' },
    { href: '/services/pre-construction', label: 'Review our pre-construction approach' },
    { href: '/blog/how-to-choose-right-general-contractor-florida', label: 'Learn how to choose the right contractor' },
  ],
  'how-to-choose-right-general-contractor-florida': [
    { href: '/services/general-construction', label: 'Explore our general construction services' },
    { href: '/services/pre-construction', label: 'Understand our pre-construction process' },
    { href: '/blog/commercial-construction-costs-florida', label: 'Read the Florida construction cost guide' },
  ],
  'pre-construction-planning': [
    { href: '/services/pre-construction', label: 'Explore pre-construction services' },
    { href: '/services/design-build', label: 'See our design-build services' },
    { href: '/contact#contactformsection', label: 'Schedule a project consultation' },
  ],
  'signs-commercial-building-needs-remodeling': [
    { href: '/services/commercial-remodeling', label: 'Explore commercial remodeling services' },
    { href: '/blog/commercial-remodeling-when-to-renovate', label: 'Learn when it is time to renovate' },
    { href: '/contact#contactformsection', label: 'Talk with our construction team' },
  ],
  'what-to-expect-during-a-commercial-construction-project': [
    { href: '/services/pre-construction', label: 'See how we plan projects before construction' },
    { href: '/services/general-construction', label: 'Explore general construction services' },
    { href: '/contact#contactformsection', label: 'Schedule a project consultation' },
  ],
};

function addInternalLinks<T extends { content?: string; featuredImage?: unknown; authorImage?: unknown; ctaImage?: unknown }>(data: T, slug: string): T {
  const normalized = {
    ...data,
    featuredImage: sanityImageUrl(data.featuredImage),
    authorImage: sanityImageUrl(data.authorImage),
    ctaImage: sanityImageUrl(data.ctaImage),
  };

  if (!normalized.content || normalized.content.includes('blog-internal-links')) return normalized as T;

  const links = internalLinksBySlug[slug] ?? [
    { href: '/services/pre-construction', label: 'Explore pre-construction planning' },
    { href: '/services/general-construction', label: 'Explore general construction services' },
    { href: '/contact#contactformsection', label: 'Schedule a project consultation' },
  ];

  const internalLinks = links
    .map(({ href, label }) => `<li><a href="${href}">${label}</a></li>`)
    .join('');

  return {
    ...normalized,
    content: `${normalized.content}<section class="blog-internal-links"><h2>Continue with Keentel</h2><p>Explore these related resources for your project:</p><ul>${internalLinks}</ul></section>`,
  } as T;
}

const BLOG_FIELDS = `{
  "slug": slug.current,
  title, date, category, subtitle, metaDescription, featuredImage, content, faqs,
  authorName, authorTitle, authorBio, authorImage, ctaTitle, ctaText, ctaImage,
  ctaButton1Text, ctaButton1Link, ctaButton2Text, ctaButton2Link
}`;

async function getSanityBlogData(slug: string) {
  try {
    const data = await sanityClient.fetch(`*[_type == "blogPost" && slug.current == $slug][0]${BLOG_FIELDS}`, { slug });
    return data ? addInternalLinks(data, slug) : null;
  } catch (error) {
    console.error('Sanity blog read failed:', error);
    return null;
  }
}

export async function getBlogData(slug: string) {
  return getSanityBlogData(slug);
}

export async function getAllBlogSlugs() {
  try {
    const sanitySlugs = await sanityClient.fetch<string[]>(`*[_type == "blogPost" && defined(slug.current)].slug.current`);
    return Array.isArray(sanitySlugs) ? sanitySlugs : [];
  } catch (error) {
    console.error('Sanity blog slug read failed:', error);
    return [];
  }
}
