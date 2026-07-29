import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["services/pre-construction"].title,
  description: seoMetadata["services/pre-construction"].description,
  alternates: {
    canonical: "/services/pre-construction",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
