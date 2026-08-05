import type { Metadata } from "next";
import { phase3Metadata, seoMetadata } from "@/lib/phase3-metadata";
import PageContent from "./PageContent";
import { ServiceSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  ...seoMetadata("services/commercial-remodeling"),
};

export default function Page() { return <><ServiceSchema name="Commercial Remodeling" description={phase3Metadata["services/commercial-remodeling"].description} url="/services/commercial-remodeling" /><PageContent /></>; }
