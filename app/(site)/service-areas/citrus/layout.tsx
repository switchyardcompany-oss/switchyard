import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["service-areas/citrus"].title,
  description: seoMetadata["service-areas/citrus"].description,
  alternates: {
    canonical: "/service-areas/citrus",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
