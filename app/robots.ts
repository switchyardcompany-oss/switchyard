import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/test-editor", "/api/"],
    },
    sitemap: "https://keentelgeneralcontractors.com/sitemap.xml",
  };
}
