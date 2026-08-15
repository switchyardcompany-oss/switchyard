import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["green-smart-remodeling"].title,
  description: seoMetadata["green-smart-remodeling"].description,
  alternates: {
    canonical: "/green-smart-remodeling",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
