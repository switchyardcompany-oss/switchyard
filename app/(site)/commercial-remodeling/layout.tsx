import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["commercial-remodeling"].title,
  description: seoMetadata["commercial-remodeling"].description,
  alternates: {
    canonical: "/commercial-remodeling",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
