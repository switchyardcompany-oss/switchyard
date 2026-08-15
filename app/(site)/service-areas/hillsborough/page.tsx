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

export default function HillsboroughPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — HILLSBOROUGH COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — HILLSBOROUGH COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Hillsborough County, Florida"
        description={
          <>
            Hillsborough County is our home base. We have delivered residential,
            commercial, and industrial construction projects across Tampa, Brandon,
            Riverview, Plant City, and every community in the county for over two
            decades. No other county on our service map has more of our completed
            projects — or more of our licensed team on the ground daily.
            <br />
            <span className="sec1-hero__desc-highlight">
              We have built a deep understanding of Hillsborough County&apos;s building
              department, its permit review process, its flood zone mapping, and the
              specific construction standards that apply to the county&apos;s coastal,
              urban, and rural zones. That knowledge benefits every client we work
              with in the county.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN HILLSBOROUGH COUNTY"
        title="What We Build in Hillsborough County"
        subtitle="We deliver the full scope of licensed general contracting services across Hillsborough County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Hillsborough County"
        paragraphs={[
          "Hillsborough County's construction environment is one of the most complex in Florida — high permit volume, extensive flood zone mapping across coastal and low-lying areas, and a building department that processes thousands of permits monthly. We understand the county's specific requirements for projects in FEMA Special Flood Hazard Areas, the coastal construction setback requirements for properties west of US-41, the HOA and deed restriction landscape in Brandon, Riverview, and Westchase, and the commercial zoning and site plan requirements for projects in Tampa's urban core and suburban corridors.",
        ]}
        cities={[
          "Tampa",
          "Brandon",
          "Riverview",
          "Plant City",
          "Valrico",
          "Apollo Beach",
          "Sun City Center",
          "Gibsonton",
          "Seffner",
          "Lithia",
          "Ruskin",
          "Wimauma",
          "Dover",
          "Lutz",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Hillsborough County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Hillsborough County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Hillsborough County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Hillsborough County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Hillsborough County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Hillsborough County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Hillsborough County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Hillsborough County"]}
        faqs={[
          {
            question: "Are you experienced with Hillsborough County's permit process?",
            answer:
              "Yes. We submit permits through the Hillsborough County Building Department daily. We understand the plan review timelines, inspection scheduling, and reviewer requirements specific to the county for residential, commercial, electrical, and mechanical permits.",
          },
          {
            question: "Do you build in flood zone areas of Hillsborough County?",
            answer:
              "Yes. We are experienced in flood zone construction across Hillsborough County — including elevation certificate coordination, FEMA flood zone compliance, and foundation design appropriate for Special Flood Hazard Areas.",
          },
          {
            question: "Can you handle both residential and commercial projects in Hillsborough County?",
            answer:
              "Yes. We deliver the full scope of general contracting — residential, commercial, and industrial — across all Hillsborough County communities. Our team is actively working across the county every week.",
          },
          {
            question: "How quickly can you respond to a Hillsborough County emergency?",
            answer:
              "As our home county, we maintain crews available for Hillsborough County emergency response at all times. We confirm on-site arrival within 30 minutes for most Hillsborough County locations.",
          },
          {
            question: "Is your estimate free for Hillsborough County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
