import type { Metadata } from "next";
import { phase3Metadata, seoMetadata } from "@/lib/phase3-metadata";
import PageContent from "./PageContent";
import { ServiceSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  ...seoMetadata("services/general-construction"),
};

export default function Page() { return <><ServiceSchema name="General Construction" description={phase3Metadata["services/general-construction"].description} url="/services/general-construction" /><PageContent /></>; }
