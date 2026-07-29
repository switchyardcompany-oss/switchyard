import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["service-areas/polk"].title,
  description: seoMetadata["service-areas/polk"].description,
  alternates: {
    canonical: "/service-areas/polk",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
