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

export default function PolkPage() {
  return (
    <>
      <Hero
        badge="GENERAL CONTRACTOR — POLK COUNTY • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION — POLK COUNTY, FLORIDA"
        titleLine1="General Contractor in"
        titleLine2="Polk County, Florida"
        description={
          <>
            We deliver licensed general contracting services across Polk
            County — from Lakeland and Winter Haven to Bartow, Haines City,
            and Lake Wales. Polk County&apos;s construction market spans a wide
            range of project types — from residential subdivisions and rural
            custom homes to large-scale commercial and industrial facilities
            along the I-4 and US-27 corridors.
            <br />
            <span className="sec1-hero__desc-highlight">
              We have completed residential builds, commercial construction,
              industrial electrical work, and emergency restoration projects
              across Polk County. We understand the county&apos;s specific
              building standards, its lake-front construction requirements —
              relevant on hundreds of Polk County lakefront properties — and
              the commercial development environment along its major
              transportation corridors.
            </span>
          </>
        }
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "View Our Work", href: "#services" }}
      />

      <ServicesSection
        eyebrow="SERVICES WE DELIVER IN POLK COUNTY"
        title="What We Build in Polk County"
        subtitle="We deliver the full scope of licensed general contracting services across Polk County — the same team, the same licensed standard, and the same 5-year warranty on every project."
      />

      <LocalAreaSection
        stats={[
          { label: "Emergency Response", value: "24/7" },
          { label: "BBB Rated", value: "A+" },
          { label: "Projects Delivered", value: "", countTo: 500, suffix: "+" },
          { label: "Written Warranty", value: "5-Yr" },
        ]}
        heading="Why Local Knowledge Matters in Polk County"
        paragraphs={[
          "Polk County's construction environment is shaped by its size, its diversity of land use, and its position as one of Florida's most active logistics and distribution hubs. We understand the Polk County Building Department's permit requirements for both residential and commercial scopes, the lakefront construction setbacks and environmental permit requirements that apply to the county's extensive chain of lakes, the agricultural land conversion considerations for rural lot development, and the large-footprint industrial and warehouse construction standards along the I-4 and Polk Parkway corridors.",
        ]}
        cities={[
          "Lakeland",
          "Winter Haven",
          "Bartow",
          "Haines City",
          "Lake Wales",
          "Auburndale",
          "Davenport",
          "Dundee",
          "Eagle Lake",
          "Fort Meade",
          "Frostproof",
          "Lake Alfred",
          "Mulberry",
          "Polk City",
        ]}
      />

      <RecentWorkSection />
      <IndustriesCarousel />
      <ProcessSection />
      <ReviewCarousel />
      <ServiceAreaMap />

      <CTASection
        title="Start Your Polk County Project Today"
        subtext="Contact us for a free, no‑obligation estimate on your residential, commercial, or industrial project anywhere in Polk County."
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        perks={[
          "Florida licensed & fully insured (CGC1524228 • EC13014476)",
          "Available 7 days a week · 24/7 emergency line",
          "Serving all of Polk County, Florida",
        ]}
      />

      <WhyKeentel
        title="Why Polk County Clients Choose"
        highlight="Keentel"
        reasons={[
          {
            title: "Licensed & Insured in Florida",
            desc: "We hold active CGC, CPC, and CFC licenses. Every crew member on your Polk County project is fully covered — general liability and workers' compensation.",
          },
          {
            title: "Permit-Managed on Every Project",
            desc: "We manage all permit submissions and county inspections through the Polk County Building Department on your behalf. You never have to chase approvals.",
          },
          {
            title: "One Team — Full Accountability",
            desc: "Design, construction, electrical, and finishing are all managed by our in-house licensed team under one contract. One project manager. One point of contact. No gaps.",
          },
          {
            title: "5-Year Workmanship Warranty",
            desc: "Every project we complete in Polk County is backed by our written 5-year workmanship warranty. If something is not right, we return and fix it at no charge.",
          },
        ]}
      />

      <FAQSection
        eyebrow="FAQ"
        titleLines={["Frequently Asked Questions", "— Polk County"]}
        faqs={[
          {
            question: "Do you build on lakefront properties in Polk County?",
            answer:
              "Yes. We are experienced in lakefront construction across Polk County — including setback compliance, environmental permit coordination with the Southwest Florida Water Management District, and dock and seawall scope where applicable.",
          },
          {
            question: "Do you handle commercial and industrial projects in the Lakeland corridor?",
            answer:
              "Yes. We deliver commercial and industrial construction projects along the I-4, US-27, and Polk Parkway corridors — including warehouse, distribution, and logistics facility construction.",
          },
          {
            question: "How do you manage Polk County building permits?",
            answer:
              "We manage all permit applications, plan reviews, and inspections through the Polk County Building Department for every project we deliver in the county.",
          },
          {
            question: "Do you offer emergency response across Polk County?",
            answer:
              "Yes. Our 24/7 emergency response covers all of Polk County. We confirm on-site arrival within 30 to 60 minutes for storm, flood, fire, and structural emergencies.",
          },
          {
            question: "Is your estimate free for Polk County projects?",
            answer:
              "Yes. Our initial estimate is completely free with no obligation. We visit the site and deliver a written fixed-price proposal before any contract is signed.",
          },
        ]}
      />
    </>
  );
}
