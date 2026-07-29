import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["service-areas/hernando"].title,
  description: seoMetadata["service-areas/hernando"].description,
  alternates: {
    canonical: "/service-areas/hernando",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
