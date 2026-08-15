import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["fire-storm-flood-restoration"].title,
  description: seoMetadata["fire-storm-flood-restoration"].description,
  alternates: {
    canonical: "/fire-storm-flood-restoration",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
