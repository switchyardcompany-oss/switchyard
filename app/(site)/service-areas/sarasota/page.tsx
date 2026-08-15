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

export default function SarasotaPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — SARASOTA COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — SARASOTA COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Sarasota County, Florida"
        description={
          <>
            We deliver licensed general contracting services across Sarasota
            County — from the city of Sarasota and Venice to Osprey, North
            Port, and the barrier island communities of Siesta Key and
            Longboat Key. Sarasota County demands a higher standard of
            construction quality than most Florida markets, and we deliver
            to that standard on every project.
            <br />
            <span className="sec1-hero__desc-highlight">
              We have completed residential builds, commercial fit-outs,
              remodeling projects, and emergency restoration work throughout
              Sarasota County. We understand the county&apos;s specific
              regulatory environment, its architectural design standards in
              historic districts, and the coastal construction requirements
              that apply across the county&apos;s extensive Gulf shoreline.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN SARASOTA COUNTY"
        title="What We Build in Sarasota County"
        subtitle="We deliver the full scope of licensed general contracting services across Sarasota County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Sarasota County"
        paragraphs={[
          "Sarasota County's construction environment is shaped by its discerning residential market, its active historic preservation program in downtown Sarasota, and some of Florida's most strictly enforced coastal construction standards on its barrier islands. We understand the Sarasota County Building Department's permit process and review standards, the CCCL and setback requirements along Siesta Key, Longboat Key's Sarasota portion, and Venice Beach, the historic district design review requirements in downtown Sarasota and Osprey, and the high finish quality expectations that Sarasota County's residential market consistently demands.",
        ]}
        cities={[
          "Sarasota",
          "Venice",
          "North Port",
          "Osprey",
          "Nokomis",
          "Englewood (Sarasota portion)",
          "Siesta Key",
          "Longboat Key (Sarasota portion)",
          "Casey Key",
          "Laurel",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Sarasota County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Sarasota County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Sarasota County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Sarasota County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Sarasota County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Sarasota County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Sarasota County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Sarasota County"]}
        faqs={[
          {
            question: "Are you experienced with Sarasota County's coastal construction requirements?",
            answer:
              "Yes. We are experienced in coastal construction across Sarasota County — including CCCL compliance, FEMA flood zone construction, barrier island building standards on Siesta Key and Longboat Key, and the coastal setback requirements enforced by the Florida DEP.",
          },
          {
            question: "Can you work within Sarasota's historic districts?",
            answer:
              "Yes. We have delivered residential and commercial construction projects within Sarasota's historic overlay districts. We are familiar with the design review requirements, material standards, and approval process applicable to historic district construction.",
          },
          {
            question: "How do you manage Sarasota County building permits?",
            answer:
              "We manage all permit applications, plan reviews, and county inspections through the Sarasota County Building Department for every project we deliver in the county.",
          },
          {
            question: "Do you offer emergency response in Sarasota County?",
            answer:
              "Yes. Our 24/7 emergency response covers all of Sarasota County. We confirm on-site arrival within 30 to 60 minutes for storm, flood, fire, and structural emergencies.",
          },
          {
            question: "Is your estimate free for Sarasota County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
