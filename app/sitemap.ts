import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://keentelgeneralcontractors.com";

const staticRoutes = [
  "", "/about", "/contact", "/faq", "/projects", "/industries", "/privacy", "/terms", "/blog",
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
  "/services/emergency-restoration", "/services/general-construction", "/services/pre-construction",
  "/services/residential-remodeling",
  "/legal",
  "/services",
];

function getBlogSlugs(): string[] {
  try {
    const dir = path.join(process.cwd(), "content/blog");
    return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
