import type { Metadata } from "next";
import { phase3Metadata, seoMetadata } from "@/lib/phase3-metadata";
import PageContent from "./PageContent";
import { ServiceSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  ...seoMetadata("services/emergency-restoration"),
};

export default function Page() { return <><ServiceSchema name="Emergency Restoration" description={phase3Metadata["services/emergency-restoration"].description} url="/services/emergency-restoration" /><PageContent /></>; }
