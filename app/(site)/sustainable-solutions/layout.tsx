import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["sustainable-solutions"].title,
  description: seoMetadata["sustainable-solutions"].description,
  alternates: {
    canonical: "/sustainable-solutions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
