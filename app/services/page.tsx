import type { Metadata } from "next";
import ServicesSection from "@/components/ServicesSection";

export const metadata: Metadata = {
  title: "Construction Services | Keentel General Contractors",
  description:
    "Explore Keentel General Contractors’ complete construction, design-build, remodeling, electrical, and emergency restoration services.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesSection />
    </main>
  );
}
