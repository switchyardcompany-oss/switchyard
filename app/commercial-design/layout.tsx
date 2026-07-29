import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["commercial-design"].title,
  description: seoMetadata["commercial-design"].description,
  alternates: {
    canonical: "/commercial-design",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
