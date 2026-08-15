import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["industrial-electrical"].title,
  description: seoMetadata["industrial-electrical"].description,
  alternates: {
    canonical: "/industrial-electrical",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
