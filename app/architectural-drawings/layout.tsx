import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["architectural-drawings"].title,
  description: seoMetadata["architectural-drawings"].description,
  alternates: {
    canonical: "/architectural-drawings",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
