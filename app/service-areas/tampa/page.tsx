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

export default function TampaPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — TAMPA COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — TAMPA, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Tampa, Florida"
        description={
          <>
            We are headquartered in Tampa and have delivered residential,
            commercial, and industrial construction projects throughout the
            city for over two decades. Tampa&apos;s construction market moves
            fast — permitting timelines, code enforcement, and local
            subcontractor availability all require a contractor who knows
            the territory. We do.
            <br />
            <span className="sec1-hero__desc-highlight">
              Whether you are building a custom home in South Tampa, fitting
              out a commercial space in downtown, managing an industrial
              expansion near the Port of Tampa, or dealing with a storm
              emergency overnight — our licensed team is the one call that
              covers every scope.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN TAMPA COUNTY"
        title="What We Build in Tampa County"
        subtitle="We deliver the full scope of licensed general contracting services across Tampa County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 158, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Tampa"
        paragraphs={[
          "Tampa's construction environment has specific requirements that out‑of‑area contractors consistently underestimate. Flood zone designations across Tampa's coastal and low‑lying neighborhoods affect foundation design, elevation requirements, and insurance documentation. Hillsborough County's building department has its own permit review timelines, reviewer preferences, and inspection sequencing — and we navigate it daily.",
          "We also understand Tampa's neighborhood‑specific HOA requirements, historic district overlay restrictions in areas like Ybor City, and the coastal construction standards that apply to waterfront and near‑water properties.",
        ]}
        cities={[
          "Tampa",
          "South Tampa",
          "Ybor City",
          "Westchase",
          "Carrollwood",
          "New Tampa",
          "Temple Terrace",
          "Town 'N' Country",
          "Seminole Heights",
          "Hyde Park",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Ready to start your Tampa project?"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Tampa County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Tampa County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Tampa County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Tampa County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Tampa County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Tampa County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Tampa County"]}
        faqs={[
          {
            question: "Do you work in all Tampa neighborhoods?",
            answer:
              "Yes. We deliver residential, commercial, and industrial construction projects across all Tampa neighborhoods — including South Tampa, Westchase, New Tampa, Carrollwood, and downtown Tampa.",
          },
          {
            question: "How do you handle Tampa's flood zone requirements?",
            answer:
              "We assess flood zone designations as part of every pre-construction review. Foundation design, elevation certificates, and FEMA compliance documentation are managed by our team on every Tampa project where flood zone requirements apply.",
          },
          {
            question: "Do you manage Hillsborough County building permits for Tampa projects?",
            answer:
              "Yes. We manage all permit applications, plan reviews, and inspections through the Hillsborough County Building Department for every project we deliver in Tampa.",
          },
          {
            question: "How quickly can you respond to a Tampa construction emergency?",
            answer:
              "Our emergency crews are stationed in Tampa. We confirm on-site arrival within 30 to 60 minutes for storm, flood, fire, and structural emergencies across Tampa.",
          },
          {
            question: "Is your estimate really free?",
            answer:
              "Yes. Our initial project estimate is completely free with no obligation. We visit the site where needed and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
