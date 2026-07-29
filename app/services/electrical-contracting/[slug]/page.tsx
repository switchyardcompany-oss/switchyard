import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ElectricalPreConstructionTemplate from "../ElectricalPreConstructionTemplate";
import { electricalServicePageBySlug, electricalServicePages } from "../electrical-service-data";
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
  return { title: `${page.eyebrow} | Keentel General Contractors`, description: page.intro };
}

export default async function ElectricalServiceRoute({ params }: PageProps) {
  const page = electricalServicePageBySlug[(await params).slug];
  if (!page) notFound();
  return <ElectricalPreConstructionTemplate page={page} />;
}
