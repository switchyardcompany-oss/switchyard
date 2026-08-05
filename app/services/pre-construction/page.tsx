import type { Metadata } from "next";
import { phase3Metadata, seoMetadata } from "@/lib/phase3-metadata";
import PageContent from "./PageContent";
import { ServiceSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  ...seoMetadata("services/pre-construction"),
};

export default function Page() { return <><ServiceSchema name="Pre-Construction Planning" description={phase3Metadata["services/pre-construction"].description} url="/services/pre-construction" /><PageContent /></>; }
