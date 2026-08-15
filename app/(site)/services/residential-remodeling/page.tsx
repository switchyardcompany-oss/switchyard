import type { Metadata } from "next";
import { phase3Metadata, seoMetadata } from "@/lib/phase3-metadata";
import PageContent from "./PageContent";
import { ServiceSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  ...seoMetadata("services/residential-remodeling"),
};

export default function Page() { return <><ServiceSchema name="Residential Remodeling" description={phase3Metadata["services/residential-remodeling"].description} url="/services/residential-remodeling" /><PageContent /></>; }
