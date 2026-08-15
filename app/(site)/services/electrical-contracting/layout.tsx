import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["services/electrical-contracting"].title,
  description: seoMetadata["services/electrical-contracting"].description,
  alternates: {
    canonical: "/services/electrical-contracting",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
