import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["commercial-electrical"].title,
  description: seoMetadata["commercial-electrical"].description,
  alternates: {
    canonical: "/commercial-electrical",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
