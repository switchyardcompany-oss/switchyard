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

export default function CitrusPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — CITRUS COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — CITRUS COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Citrus County, Florida"
        description={
          <>
            We deliver licensed general contracting services across Citrus
            County — from Inverness to Crystal River and every community in
            between. Citrus County&apos;s construction market has specific
            building environment characteristics that require a contractor
            with real experience in this region, not just a service area
            listing.
            <br />
            <span className="sec1-hero__desc-highlight">
              We have worked on residential builds, commercial projects, and
              emergency restoration across Citrus County and we understand
              what it takes to deliver correctly here — from the Citrus
              County Building Department&apos;s permit process to the area&apos;s
              specific soil conditions and flood zone requirements along the
              Nature Coast.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN CITRUS COUNTY"
        title="What We Build in Citrus County"
        subtitle="We deliver the full scope of licensed general contracting services across Citrus County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Citrus County"
        paragraphs={[
          "Citrus County's construction environment is shaped by its proximity to the Gulf, its rural and semi-rural lot conditions, and a building department that processes permits with its own specific requirements. We understand the county's well and septic coordination requirements for rural residential builds, the flood zone considerations along the Crystal River and Rainbow River corridors, and the local code enforcement standards that affect both residential renovations and commercial projects in Inverness, Crystal River, and Homosassa.",
        ]}
        cities={[
          "Inverness",
          "Crystal River",
          "Homosassa",
          "Lecanto",
          "Beverly Hills",
          "Floral City",
          "Hernando (Citrus)",
          "Citrus Springs",
          "Dunnellon (Citrus portion)",
          "Pine Ridge",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Citrus County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Citrus County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Citrus County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Citrus County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Citrus County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Citrus County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Citrus County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Citrus County"]}
        faqs={[
          {
            question: "Do you serve rural properties in Citrus County?",
            answer:
              "Yes. We build on rural lots throughout Citrus County — including properties on well and septic systems. Site assessment, well and septic coordination, and rural driveway and access requirements are all managed as part of our pre-construction process.",
          },
          {
            question: "How do you handle the Citrus County Building Department permit process?",
            answer:
              "We manage all permit applications and inspections through the Citrus County Building Department on your behalf. We are familiar with the department's review process and inspection sequencing for residential, commercial, and electrical permits.",
          },
          {
            question: "Do you respond to emergencies in rural Citrus County areas?",
            answer:
              "Yes. Our 24/7 emergency response covers all of Citrus County — including rural areas. We confirm on-site arrival within 30 to 60 minutes across the county.",
          },
          {
            question: "Can you build near the Crystal River or Homosassa waterfront?",
            answer:
              "Yes. We are experienced in coastal and waterfront construction in Citrus County — including flood zone compliance, elevation requirements, and permit coordination for properties along the Nature Coast.",
          },
          {
            question: "Is your estimate free for Citrus County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site where needed and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
