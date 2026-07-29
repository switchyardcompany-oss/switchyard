import type { Metadata } from "next";
import { seoMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: seoMetadata["quality-assurance"].title,
  description: seoMetadata["quality-assurance"].description,
  alternates: {
    canonical: "/quality-assurance",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
