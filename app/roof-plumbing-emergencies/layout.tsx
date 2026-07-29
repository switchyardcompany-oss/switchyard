import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["roof-plumbing-emergencies"].title,
  description: seoMetadata["roof-plumbing-emergencies"].description,
  alternates: {
    canonical: "/roof-plumbing-emergencies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
