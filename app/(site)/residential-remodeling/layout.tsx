import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["residential-remodeling"].title,
  description: seoMetadata["residential-remodeling"].description,
  alternates: {
    canonical: "/residential-remodeling",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
