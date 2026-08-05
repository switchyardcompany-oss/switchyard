"use client";

import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  services: "Services",
  "service-areas": "Service Areas",
  "commercial-remodeling": "Commercial Remodeling",
  "design-build": "Design-Build",
  "emergency-restoration": "Emergency Restoration",
  "general-construction": "General Construction",
  "pre-construction": "Pre-Construction",
  "residential-remodeling": "Residential Remodeling",
  "electrical-contracting": "Electrical Contracting",
};

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;
  const segments = pathname.split("/").filter(Boolean);
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://keentelgeneralcontractors.com/" },
    ...segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: labels[segment] || decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
      item: `https://keentelgeneralcontractors.com/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement }),
    }} />
  );
}
