import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog";
import { getPublications } from "@/lib/publications";

const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://switchyard-puce.vercel.app").replace(/\/$/, "");

const staticRoutes = [
  "", "/about", "/contact", "/faq", "/projects", "/industries", "/privacy", "/terms", "/blog",
  "/case-studies", "/white-papers", "/newsletters",
  "/3d-modeling", "/ada-compliance", "/additions-expansions", "/architectural-drawings",
  "/commercial-construction", "/commercial-design", "/commercial-electrical", "/commercial-remodeling",
  "/electrical-structural-repairs", "/fire-storm-flood-restoration", "/green-smart-remodeling",
  "/industrial-electrical", "/insurance-claim-assistance", "/new-residential-construction",
  "/permit-compliance", "/project-management", "/quality-assurance", "/residential-design",
  "/residential-electrical", "/residential-remodeling", "/roof-plumbing-emergencies",
  "/secure-unsafe-structures", "/sustainable-solutions",
  "/service-areas", "/service-areas/citrus", "/service-areas/hernando", "/service-areas/hillsborough",
  "/service-areas/manatee", "/service-areas/pasco", "/service-areas/pinellas", "/service-areas/polk",
  "/service-areas/sarasota", "/service-areas/tampa",
  "/services/commercial-remodeling", "/services/design-build", "/services/electrical-contracting",
  "/services/electrical-contracting/residential-services",
  "/services/electrical-contracting/commercial-services",
  "/services/electrical-contracting/industrial-services",
  "/services/electrical-contracting/electrical-engineering-services",
  "/services/electrical-contracting/troubleshooting-repairs",
  "/services/electrical-contracting/projects-capabilities",
  "/services/emergency-restoration", "/services/general-construction", "/services/pre-construction",
  "/services/residential-remodeling", "/legal", "/services",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, caseStudies, whitePapers, newsletters] = await Promise.all([
    getAllBlogSlugs(),
    getPublications("caseStudy"),
    getPublications("whitePaper"),
    getPublications("newsletter"),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const contentSources: Array<{ url: string; lastModified?: string }> = [
    ...blogSlugs.map((slug) => ({ url: `${BASE_URL}/blog/${slug}`, priority: 0.6 })),
    ...caseStudies.map((item) => ({ url: `${BASE_URL}/case-studies/${item.slug}`, lastModified: item.publishedDate, priority: 0.6 })),
    ...whitePapers.map((item) => ({ url: `${BASE_URL}/white-papers/${item.slug}`, lastModified: item.publishedDate, priority: 0.6 })),
    ...newsletters.map((item) => ({ url: `${BASE_URL}/newsletters/${item.slug}`, lastModified: item.publishedDate, priority: 0.6 })),
  ];

  const contentEntries: MetadataRoute.Sitemap = contentSources.map((entry) => ({
    ...entry,
    changeFrequency: "monthly" as const,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),
  }));

  return [...staticEntries, ...contentEntries];
}
