import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["new-residential-construction"].title,
  description: seoMetadata["new-residential-construction"].description,
  alternates: {
    canonical: "/new-residential-construction",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
