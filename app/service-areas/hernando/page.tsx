import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import LocalAreaSection from "@/components/LocalAreaSection";
import RecentWorkSection from "@/components/RecentWorkSection";
import IndustriesCarousel from "@/components/IndustriesCarousel";
import ProcessSection from "@/components/ProcessSection";
import ReviewCarousel from "@/components/ReviewCarousel";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import CTASection from "@/components/CTASection";
import WhyKeentel from "@/components/WhyKeentel";
import FAQSection from "@/components/FAQSection";

export default function HernandoPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — HERNANDO COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — HERNANDO COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Hernando County, Florida"
        description={
          <>
            We deliver licensed general contracting services across Hernando
            County — from Brooksville and Spring Hill to Weeki Wachee and
            every growing community in the region. Hernando County is one of
            Florida&apos;s fastest-growing construction markets and we have
            been active in it long enough to understand what drives both the
            opportunities and the challenges.
            <br />
            <span className="sec1-hero__desc-highlight">
              We always advise Hernando County clients that the county&apos;s
              rapid growth has created significant variation in permit
              processing timelines and inspection demand. Working with a
              contractor who manages that process actively — rather than
              leaving it to the client — makes a measurable difference in
              project delivery.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN HERNANDO COUNTY"
        title="What We Build in Hernando County"
        subtitle="We deliver the full scope of licensed general contracting services across Hernando County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Hernando County"
        paragraphs={[
          "Hernando County's construction environment is shaped by its rapid residential growth, its mix of established Brooksville neighborhoods and new Spring Hill developments, and a building department managing high permit volume. We understand the county's specific requirements for new residential construction on the area's predominant sandy soil conditions, the wetland setback requirements that affect many Hernando County lots, and the commercial construction standards in the Brooksville and Spring Hill commercial corridors.",
        ]}
        cities={[
          "Brooksville",
          "Spring Hill",
          "Weeki Wachee",
          "Ridge Manor",
          "Masaryktown",
          "Istachatta",
          "Nobleton",
          "Wiscon",
          "Aripeka",
          "Shady Hills",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Hernando County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Hernando County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Hernando County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Hernando County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Hernando County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Hernando County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Hernando County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Hernando County"]}
        faqs={[
          {
            question: "Do you manage permits through the Hernando County Building Department?",
            answer:
              "Yes. We manage all permit applications, plan reviews, and inspections through the Hernando County Building Department for every project we deliver in the county.",
          },
          {
            question: "Can you build in Spring Hill's newer residential developments?",
            answer:
              "Yes. We deliver new residential construction, additions, and remodeling projects throughout Spring Hill and across all Hernando County communities.",
          },
          {
            question: "How do you handle wetland setbacks on Hernando County lots?",
            answer:
              "We conduct a site assessment before finalizing any project plan on lots where wetland buffers may apply. We coordinate with the relevant county and state agencies and design the project footprint to respect all required setbacks.",
          },
          {
            question: "Do you respond to emergencies in Hernando County?",
            answer:
              "Yes. Our 24/7 emergency response covers all of Hernando County. We confirm on-site arrival within 30 to 60 minutes for storm, flood, and structural emergencies across the county.",
          },
          {
            question: "Is your estimate free for Hernando County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
