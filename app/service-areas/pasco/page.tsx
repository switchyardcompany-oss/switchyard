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

export default function PascoPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — PASCO COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — PASCO COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Pasco County, Florida"
        description={
          <>
            We deliver licensed general contracting services across Pasco
            County — from Wesley Chapel and Land O&apos;Lakes in the south to
            New Port Richey and Dade City in the north. Pasco County is one
            of Florida&apos;s most actively growing construction markets and we
            have been working across the county long enough to understand
            both its opportunities and its specific construction
            requirements.
            <br />
            <span className="sec1-hero__desc-highlight">
              We prioritize a strategy of staying ahead of Pasco County&apos;s
              permit processing demands — submitting complete,
              code-compliant permit packages from the first submission to
              avoid review delays that are common in high-volume county
              building departments.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN PASCO COUNTY"
        title="What We Build in Pasco County"
        subtitle="We deliver the full scope of licensed general contracting services across Pasco County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Pasco County"
        paragraphs={[
          "Pasco County's construction environment reflects two distinct growth patterns — the high-density residential development in Wesley Chapel, Land O'Lakes, and Zephyrhills where master-planned communities dominate the landscape, and the more rural and coastal character of the New Port Richey, Hudson, and Gulf of Mexico Drive corridor where coastal construction standards, flood zone compliance, and well and septic coordination apply. We understand both zones and the Pasco County Building Department's specific review requirements for each.",
        ]}
        cities={[
          "Wesley Chapel",
          "Land O'Lakes",
          "New Port Richey",
          "Port Richey",
          "Zephyrhills",
          "Dade City",
          "Hudson",
          "Spring Hill (Pasco portion)",
          "Lutz (Pasco portion)",
          "Odessa (Pasco portion)",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Pasco County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Pasco County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Pasco County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Pasco County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Pasco County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Pasco County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Pasco County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Pasco County"]}
        faqs={[
          {
            question: "Do you build in Wesley Chapel's master-planned communities?",
            answer:
              "Yes. We deliver new residential construction, additions, and remodeling projects in Wesley Chapel and across Pasco County's master-planned communities. We are familiar with HOA design review requirements and community architectural standards.",
          },
          {
            question: "Can you build on coastal properties in Hudson or New Port Richey?",
            answer:
              "Yes. We are experienced in coastal construction in Pasco County — including flood zone compliance, elevation requirements, and coastal construction setback standards for properties along the Gulf of Mexico.",
          },
          {
            question: "How do you manage Pasco County building permits?",
            answer:
              "We manage all permit applications, plan reviews, and inspections through the Pasco County Building Department on your behalf. We are experienced with the department's review process for residential, commercial, and electrical permits.",
          },
          {
            question: "Do you offer emergency response in Pasco County?",
            answer:
              "Yes. Our 24/7 emergency response covers all of Pasco County — north and south. We confirm on-site arrival within 30 to 60 minutes for storm, flood, and structural emergencies.",
          },
          {
            question: "Is your estimate free for Pasco County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
