import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["service-areas/hillsborough"].title,
  description: seoMetadata["service-areas/hillsborough"].description,
  alternates: {
    canonical: "/service-areas/hillsborough",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
