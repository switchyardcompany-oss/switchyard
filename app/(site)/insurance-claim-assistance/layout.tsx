import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["insurance-claim-assistance"].title,
  description: seoMetadata["insurance-claim-assistance"].description,
  alternates: {
    canonical: "/insurance-claim-assistance",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
