import type { ReactNode } from "react";
import { seoMetadata } from "@/lib/phase3-metadata";

export const metadata = seoMetadata("faq");

const faqs = [
  ["Is Keentel General Contractors licensed in Florida?", "Yes. We hold Florida General Contractor license CGC1524228 and Electrical Contractor license EC13014476."],
  ["Are you insured?", "Yes. We carry comprehensive general liability and workers' compensation insurance on every project across Florida."],
  ["Do you work across all of Florida?", "Yes. We serve all 67 Florida counties for residential, commercial, and industrial projects."],
  ["What types of projects do you take on?", "We deliver residential, commercial, industrial, institutional, remodeling, electrical, and emergency restoration projects."],
  ["Do you handle design and construction together?", "Yes. We are a full design-build contractor managing design and construction under one contract."],
  ["Do you self-perform all trades or use subcontractors?", "We self-perform core trades and directly supervise vetted Florida-licensed specialty contractors."],
  ["How much does it cost to hire a general contractor?", "Project costs vary by scope, size, and materials. We provide detailed estimates before any contract is signed."],
  ["Is the estimate really free?", "Yes. Our initial project estimate is completely free with no obligation."],
  ["Do you offer financing?", "Yes. Flexible financing options may be available to qualified clients."],
  ["Who is my point of contact during a project?", "Every project is assigned a dedicated Keentel project manager from contract signing to final walkthrough."],
  ["How do you handle changes to the project scope?", "Every scope change is documented, priced, and approved in writing before work proceeds."],
  ["Do you manage permits?", "Yes. We manage required permits and county inspections across Florida on your behalf."],
  ["What warranty do you provide?", "Keentel projects are backed by a written workmanship warranty and applicable Florida requirements."],
  ["How do I make a warranty claim?", "Contact your project manager by phone or email to schedule a site visit."],
  ["How fast can you respond to an emergency?", "We confirm on-site arrival within 30 to 60 minutes across Florida, subject to conditions."],
  ["Is your emergency line active on weekends and holidays?", "Yes. Our emergency line operates 24 hours a day, 365 days a year."],
  ["Do you work with insurance companies for emergency claims?", "Yes. We provide damage documentation, photo reports, and repair estimates for insurance claims."],
];

export default function FaqLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</>;
}
