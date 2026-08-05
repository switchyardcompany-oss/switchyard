import type { Metadata } from "next";

export const siteUrl = "https://keentelgeneralcontractors.com";

export const phase3Metadata: Record<string, { title: string; description: string }> = {
  about: { title: "About Keentel Contractors", description: "Learn how Keentel General Contractors delivers licensed, accountable construction across Tampa Bay and Florida, from planning and design through closeout." },
  contact: { title: "Contact Contractors Tampa FL", description: "Request a free construction estimate from Keentel General Contractors in Tampa and across Florida. Call 813-395-0000 for licensed project guidance today." },
  projects: { title: "Construction Projects Tampa Florida", description: "Explore Keentel General Contractors projects across Tampa and Florida, including commercial, industrial, institutional, remodeling, and electrical work." },
  industries: { title: "Industries Served Tampa Florida", description: "Keentel General Contractors supports healthcare, education, industrial, commercial, residential, and public-sector clients across Tampa Bay and Florida." },
  "service-areas": { title: "Service Areas Tampa Florida", description: "Keentel General Contractors serves Tampa Bay and all Florida counties with licensed commercial, industrial, residential, remodeling, and emergency construction." },
  "service-areas/tampa": { title: "General Contractor Tampa FL", description: "Licensed Tampa general contractor for commercial, industrial, residential, remodeling, and emergency construction. Call Keentel for a free estimate today." },
  "service-areas/st-petersburg": { title: "Contractor St. Petersburg FL", description: "Licensed St. Petersburg contractor for waterfront, commercial, residential, remodeling, and emergency projects. Request a free Keentel estimate today." },
  "service-areas/brandon": { title: "Contractor Brandon FL", description: "Licensed Brandon contractor for residential growth, commercial improvements, remodeling, and emergency restoration. Call Keentel for a free estimate today." },
  "service-areas/clearwater": { title: "Contractor Clearwater FL", description: "Licensed Clearwater contractor for coastal, commercial, residential, remodeling, and emergency construction. Contact Keentel for a consultation today." },
  faq: { title: "Construction FAQs Tampa Florida", description: "Get answers about construction timelines, permits, licensing, estimates, emergency restoration, and working with Keentel General Contractors across Florida." },
  blog: { title: "Construction Blog Tampa Florida", description: "Read practical construction insights from Keentel General Contractors on design-build, remodeling, project planning, electrical work, and Florida building." },
  services: { title: "Construction Services Tampa FL", description: "Explore licensed general construction, design-build, remodeling, pre-construction, restoration, and electrical services from Keentel across Florida." },
  "services/commercial-remodeling": { title: "Commercial Remodeling Tampa FL", description: "Licensed commercial remodeling for Tampa and Florida businesses, including office buildouts, retail renovations, tenant improvements, and facility upgrades." },
  "services/design-build": { title: "Design-Build Contractors Tampa FL", description: "Plan and build with one accountable Tampa construction team. Keentel coordinates design, engineering, permitting, and construction across Florida." },
  "services/electrical-contracting": { title: "Electrical Contractors Tampa FL", description: "Licensed electrical contractors serving Tampa and Florida with residential, commercial, and industrial wiring, upgrades, installations, and repairs." },
  "services/emergency-restoration": { title: "Emergency Restoration Tampa FL", description: "24/7 emergency restoration in Tampa and across Florida for fire, storm, flood, water, and structural damage. Call Keentel for fast licensed response." },
  "services/general-construction": { title: "General Contractors Tampa FL", description: "Licensed general contractors serving Tampa and all Florida counties with commercial, industrial, multi-family, and residential construction services." },
  "services/pre-construction": { title: "Pre-Construction Planning Tampa FL", description: "Reduce project risk with Tampa pre-construction planning, budgeting, permitting, scheduling, and constructability support from a licensed Florida team." },
  "services/residential-remodeling": { title: "Residential Remodeling Tampa FL", description: "Transform your Tampa home with licensed residential remodeling, additions, renovations, and whole-home improvements from an insured Florida contractor." },
};

export function seoMetadata(path: string): Metadata {
  const entry = phase3Metadata[path];
  if (!entry) return {};
  const url = `${siteUrl}/${path}`;
  const resolvedTitle = path.startsWith("services/") || path.startsWith("service-areas/") ? `${entry.title} | Keentel General Contractors` : entry.title;
  return { title: resolvedTitle, description: entry.description, alternates: { canonical: `/${path}` }, openGraph: { title: resolvedTitle, description: entry.description, url, siteName: "Keentel General Contractors", type: "website" } };
}
