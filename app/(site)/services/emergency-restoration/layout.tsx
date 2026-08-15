import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["services/emergency-restoration"].title,
  description: seoMetadata["services/emergency-restoration"].description,
  alternates: {
    canonical: "/services/emergency-restoration",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
