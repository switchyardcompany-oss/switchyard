import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["electrical-structural-repairs"].title,
  description: seoMetadata["electrical-structural-repairs"].description,
  alternates: {
    canonical: "/electrical-structural-repairs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
