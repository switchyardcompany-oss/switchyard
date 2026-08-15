import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ElectricalPreConstructionTemplate from "../ElectricalPreConstructionTemplate";
import { electricalServicePageBySlug, electricalServicePages } from "../electrical-service-data";
import { ServiceSchema } from "@/components/StructuredData";
import { siteUrl } from "@/lib/phase3-metadata";
import "../../pre-construction/pre-construction.css";
import "../../service-hero.css";
import "../electrical-pre-construction-overrides.css";
import "../../project-capabilities.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return electricalServicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = electricalServicePageBySlug[(await params).slug];
  if (!page) return {};
  const path = `/services/electrical-contracting/${page.slug}`;
  const titleNames: Record<string, string> = {
    "residential-services": "Residential Electrical Tampa FL",
    "commercial-services": "Commercial Electrical Tampa FL",
    "industrial-services": "Industrial Electrical Tampa FL",
    "electrical-engineering-services": "Electrical Engineering Tampa FL",
    "troubleshooting-repairs": "Electrical Repairs Tampa FL",
    "projects-capabilities": "Electrical Projects Tampa FL",
  };
  const title = `${titleNames[page.slug] || "Electrical Services Tampa FL"} | Keentel General Contractors`;
  const label = page.eyebrow.toLowerCase().replace(/\s+services?$/i, "");
  const description = `Licensed electrical contractors serving Tampa Bay and Florida with ${label} work. Call 813-395-0000 for a project consultation today.`;
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: `${siteUrl}${path}`, siteName: "Keentel General Contractors", type: "website" } };
}

export default async function ElectricalServiceRoute({ params }: PageProps) {
  const page = electricalServicePageBySlug[(await params).slug];
  if (!page) notFound();
  return <><ServiceSchema name={page.eyebrow} description={page.intro} url={`/services/electrical-contracting/${page.slug}`} /><ElectricalPreConstructionTemplate page={page} /></>;
}
