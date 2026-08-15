import { seoMetadata } from "@/lib/phase3-metadata";

export const metadata = seoMetadata("service-areas/tampa");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
