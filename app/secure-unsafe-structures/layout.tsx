import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["secure-unsafe-structures"].title,
  description: seoMetadata["secure-unsafe-structures"].description,
  alternates: {
    canonical: "/secure-unsafe-structures",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
