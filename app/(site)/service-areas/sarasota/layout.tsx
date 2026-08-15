import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["service-areas/sarasota"].title,
  description: seoMetadata["service-areas/sarasota"].description,
  alternates: {
    canonical: "/service-areas/sarasota",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
