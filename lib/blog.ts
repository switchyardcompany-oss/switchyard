// src/lib/blog.ts
import fs from 'fs/promises';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content/blog');

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

function addInternalLinks<T extends { content?: string }>(data: T, slug: string): T {
  if (!data.content || data.content.includes('blog-internal-links')) return data;

  const links = internalLinksBySlug[slug] ?? [
    { href: '/services/pre-construction', label: 'Explore pre-construction planning' },
    { href: '/services/general-construction', label: 'Explore general construction services' },
    { href: '/contact#contactformsection', label: 'Schedule a project consultation' },
  ];

  const internalLinks = links
    .map(({ href, label }) => `<li><a href="${href}">${label}</a></li>`)
    .join('');

  return {
    ...data,
    content: `${data.content}<section class="blog-internal-links"><h2>Continue with Keentel</h2><p>Explore these related resources for your project:</p><ul>${internalLinks}</ul></section>`,
  } as T;
}

// ─── Check if we're on Vercel (has Blob token) ───
const hasBlobToken = process.env.BLOB_READ_WRITE_TOKEN;

export async function getBlogData(slug: string) {
  // ✅ If on Vercel → use Blob
  if (hasBlobToken) {
    try {
      const { head } = await import('@vercel/blob');
      const blobKey = `blog/${slug}.json`;
      const headResult = await head(blobKey);
      if (!headResult) return null;

      const url = new URL(headResult.url);
      url.searchParams.set('_t', Date.now().toString());

      const response = await fetch(url.toString(), {
        cache: 'no-store',
      });
      const content = await response.text();
      return addInternalLinks(JSON.parse(content), slug);
    } catch (error) {
      console.error('❌ Blob read failed:', error);
      return null;
    }
  }

  // ✅ If on localhost → read from filesystem
  try {
    const filePath = path.join(contentDir, `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return addInternalLinks(JSON.parse(content), slug);
  } catch {
    return null;
  }
}

export async function getAllBlogSlugs() {
  // ✅ If on Vercel → use Blob
  if (hasBlobToken) {
    try {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: 'blog/' });
      return blobs
        .filter((blob: any) => blob.pathname.endsWith('.json'))
        .map((blob: any) => blob.pathname.replace('blog/', '').replace('.json', ''));
    } catch {
      return fallbackSlugs();
    }
  }

  // ✅ If on localhost → read from filesystem
  try {
    const files = await fs.readdir(contentDir);
    return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));
  } catch {
    return fallbackSlugs();
  }
}

function fallbackSlugs() {
  return [
    'florida-building-permits-guide-2026',
    'general-contractor-cost-florida-2026',
    'tampa-general-contractor-guide-2026',
  ];
}
