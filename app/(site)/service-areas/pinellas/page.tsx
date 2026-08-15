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

export default function PinellasPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — PINELLAS COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — PINELLAS COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Pinellas County, Florida"
        description={
          <>
            We deliver licensed general contracting services across Pinellas
            County — from St. Petersburg and Clearwater to Dunedin, Tarpon
            Springs, and every barrier island community along Florida&apos;s Gulf
            Coast. Pinellas County presents some of the most complex
            construction environments in Florida, and we have the experience
            to navigate them correctly.
            <br />
            <span className="sec1-hero__desc-highlight">
              We always advise Pinellas County clients — particularly those on
              barrier islands and coastal waterfront properties — that the
              regulatory requirements here are more layered than almost
              anywhere else in the state. Flood zones, coastal construction
              setbacks, wind-borne debris zone requirements, and CCCL
              restrictions all interact on the same parcel. Getting it right
              requires a contractor who deals with these requirements daily.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN PINELLAS COUNTY"
        title="What We Build in Pinellas County"
        subtitle="We deliver the full scope of licensed general contracting services across Pinellas County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Pinellas County"
        paragraphs={[
          "Pinellas County's construction environment is defined by its peninsular geography. Nearly every property in the county is within a designated flood zone, a wind-borne debris zone, or a coastal construction setback area — or all three simultaneously. We understand the Coastal Construction Control Line (CCCL) requirements administered by the Florida DEP, the FEMA flood zone mapping across the county's extensive waterfront, the specific building standards for barrier island construction in communities like Clearwater Beach, St. Pete Beach, and Treasure Island, and the Pinellas County Building Department's permit review process for properties in these regulated zones.",
        ]}
        cities={[
          "St. Petersburg",
          "Clearwater",
          "Dunedin",
          "Tarpon Springs",
          "Safety Harbor",
          "Largo",
          "Pinellas Park",
          "Clearwater Beach",
          "St. Pete Beach",
          "Treasure Island",
          "Madeira Beach",
          "Indian Rocks Beach",
          "Palm Harbor",
          "Oldsmar",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Pinellas County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Pinellas County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Pinellas County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Pinellas County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Pinellas County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Pinellas County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Pinellas County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Pinellas County"]}
        faqs={[
          {
            question: "Are you experienced with Pinellas County's coastal construction requirements?",
            answer:
              "Yes. We are experienced in coastal construction across Pinellas County — including CCCL compliance, FEMA flood zone construction, wind-borne debris zone standards, and barrier island building requirements in communities from Clearwater Beach to Treasure Island.",
          },
          {
            question: "Can you work on barrier island properties in Pinellas County?",
            answer:
              "Yes. We have delivered residential and commercial construction projects on barrier island properties throughout Pinellas County. We understand the specific permit, elevation, and material requirements that apply to barrier island construction in Florida.",
          },
          {
            question: "Do you manage Pinellas County building permits?",
            answer:
              "Yes. We manage all permit applications, plan reviews, and county inspections through the Pinellas County Building Department for every project we deliver in the county.",
          },
          {
            question: "Do you respond to emergencies across all of Pinellas County?",
            answer:
              "Yes. Our 24/7 emergency response covers all of Pinellas County — including barrier island communities. We confirm on-site arrival within 30 to 60 minutes.",
          },
          {
            question: "Is your estimate free for Pinellas County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
