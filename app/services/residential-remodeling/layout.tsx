import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["services/residential-remodeling"].title,
  description: seoMetadata["services/residential-remodeling"].description,
  alternates: {
    canonical: "/services/residential-remodeling",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
