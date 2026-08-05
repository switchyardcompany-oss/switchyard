import type { Metadata } from "next";
import { phase3Metadata, seoMetadata } from "@/lib/phase3-metadata";
import PageContent from "./PageContent";
import { ServiceSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  ...seoMetadata("services/design-build"),
};

export default function Page() { return <><ServiceSchema name="Design-Build Construction" description={phase3Metadata["services/design-build"].description} url="/services/design-build" /><PageContent /></>; }
