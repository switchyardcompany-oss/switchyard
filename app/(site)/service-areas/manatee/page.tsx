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

export default function ManateePage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — MANATEE COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — MANATEE COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Manatee County, Florida"
        description={
          <>
            We deliver licensed general contracting services across Manatee
            County — from Bradenton and Anna Maria Island to Lakewood Ranch
            and Palmetto. Manatee County&apos;s construction market spans some
            of Florida&apos;s most desirable coastal properties alongside
            rapidly growing inland communities, and we have the experience
            to navigate both environments effectively.
            <br />
            <span className="sec1-hero__desc-highlight">
              We have completed residential builds, commercial projects, and
              emergency restoration work throughout Manatee County. We
              understand the county&apos;s specific building standards, its
              coastal construction requirements along the Gulf shoreline, and
              the high-growth development environment in the Lakewood Ranch
              corridor.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN MANATEE COUNTY"
        title="What We Build in Manatee County"
        subtitle="We deliver the full scope of licensed general contracting services across Manatee County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Manatee County"
        paragraphs={[
          "Manatee County's construction environment spans two distinct zones — the coastal properties along Anna Maria Island, Longboat Key's Manatee portion, and the Bradenton waterfront where coastal construction setbacks, wind-borne debris requirements, and elevation standards apply strictly — and the inland residential and commercial growth corridor around Lakewood Ranch and Parrish where new development volume is high. We understand both zones and the Manatee County Building Department's specific requirements for each.",
        ]}
        cities={[
          "Bradenton",
          "Lakewood Ranch",
          "Palmetto",
          "Ellenton",
          "Parrish",
          "Anna Maria",
          "Holmes Beach",
          "Bradenton Beach",
          "Cortez",
          "Myakka City",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Manatee County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Manatee County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Manatee County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Manatee County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Manatee County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Manatee County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Manatee County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Manatee County"]}
        faqs={[
          {
            question: "Do you build on Anna Maria Island and other coastal areas in Manatee County?",
            answer:
              "Yes. We are experienced in coastal construction across Manatee County — including Anna Maria Island, Bradenton Beach, and waterfront properties along the Manatee River — where coastal construction setbacks, flood zone compliance, and wind-borne debris standards apply.",
          },
          {
            question: "Do you work in the Lakewood Ranch area?",
            answer:
              "Yes. We deliver new residential construction, remodeling, and commercial projects in Lakewood Ranch and across the Manatee County growth corridor. We are familiar with Lakewood Ranch's community development standards and HOA requirements.",
          },
          {
            question: "How do you manage Manatee County building permits?",
            answer:
              "We manage all permit applications, plan reviews, and inspections through the Manatee County Building Department for every project we deliver in the county.",
          },
          {
            question: "Do you provide 24/7 emergency response in Manatee County?",
            answer:
              "Yes. Our emergency response covers all of Manatee County. We confirm on-site arrival within 30 to 60 minutes for storm, flood, fire, and structural emergencies.",
          },
          {
            question: "Is your estimate free for Manatee County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
