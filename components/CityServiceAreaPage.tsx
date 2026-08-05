import Link from "next/link";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import LocalAreaSection from "@/components/LocalAreaSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import { LocalBusinessSchema } from "@/components/StructuredData";

export type CityAreaConfig = {
  city: string;
  county: string;
  title: string;
  intro: React.ReactNode;
  servicesSubtitle: string;
  services: string[];
  localHeading: string;
  localParagraphs: string[];
  communities: string[];
  projects: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export default function CityServiceAreaPage({ config, url }: { config: CityAreaConfig; url: string }) {
  const description = `Licensed general contractors serving ${config.city}, Florida with construction, remodeling, electrical, and emergency restoration services.`;
  return (
    <>
      <LocalBusinessSchema city={config.city} description={description} url={url} />
      <Hero
        badge={`GENERAL CONTRACTOR — ${config.city.toUpperCase()} • RESIDENTIAL, COMMERCIAL & INDUSTRIAL CONSTRUCTION`}
        titleLine1="General Contractor in"
        titleLine2={`${config.city}, Florida`}
        description={config.intro}
        primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "Explore Local Services", href: "#local-services" }}
      />

      <section id="local-services" className="city-area-services">
        <div className="city-area-shell">
          <div className="city-area-heading">
            <span className="services-eyebrow">SERVICES FOR {config.city.toUpperCase()} PROJECTS</span>
            <h2>Construction Services Built Around {config.city}</h2>
            <p>{config.servicesSubtitle}</p>
          </div>
          <div className="city-area-grid">
            {config.services.map((service) => (
              <article className="city-area-card" key={service}><h3>{service}</h3><Link href={`/services/${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>Explore service <span aria-hidden="true">→</span></Link></article>
            ))}
          </div>
        </div>
      </section>

      <LocalAreaSection stats={[{ label: "Emergency Response", value: "24/7" }, { label: "Florida Licenses", value: "2" }, { label: "Written Warranty", value: "5-Yr" }, { label: "Local Coverage", value: "100%" }]} heading={config.localHeading} paragraphs={config.localParagraphs} cities={config.communities} />

      <section className="city-area-projects">
        <div className="city-area-shell">
          <div className="city-area-heading"><span className="services-eyebrow">LOCAL PROJECT EXPERIENCE</span><h2>Projects We Help Deliver in {config.city}</h2><p>Every project starts with a clear scope, local coordination, and one accountable construction partner.</p></div>
          <div className="city-area-grid">{config.projects.map((project) => <article className="city-area-card" key={project.title}><h3>{project.title}</h3><p>{project.text}</p></article>)}</div>
        </div>
      </section>

      <CTASection title={`Ready to start your ${config.city} project?`} subtext={`Talk with a licensed Keentel contractor about your ${config.city} project, timeline, and budget.`} primaryCta={{ label: "Request Free Estimate", href: "/contact#contactformsection" }} perks={[`Serving ${config.city} and nearby communities`, "Licensed and insured Florida contractor", "Free, no-obligation consultation"]} />
      <FAQSection eyebrow={`${config.city.toUpperCase()} CONSTRUCTION FAQS`} titleLines={["Questions About", `${config.city} Projects`]} faqs={config.faqs} />
    </>
  );
}
