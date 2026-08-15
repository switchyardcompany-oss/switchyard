import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  HardHat,
  Home,
  Lightbulb,
  Wrench,
} from "lucide-react";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/Hero";
import { ServiceSchema } from "@/components/StructuredData";
import { seoMetadata } from "@/lib/phase3-metadata";

export const metadata = seoMetadata("services");
import "./services.css";

const SERVICES = [
  {
    title: "Pre-Construction",
    description: "Budgeting, feasibility, permitting, scheduling, and project planning that create a clear path before work begins.",
    href: "/services/pre-construction",
    image: "/images/services/about-our-pre-construction-services.webp",
    icon: ClipboardCheck,
  },
  {
    title: "Design-Build",
    description: "One accountable team coordinating design, engineering, procurement, and construction for a more efficient project.",
    href: "/services/design-build",
    image: "/images/services/comprehensive-design-build-services.webp",
    icon: Lightbulb,
  },
  {
    title: "General Construction",
    description: "Ground-up construction, additions, structural improvements, and complete project management from start to finish.",
    href: "/services/general-construction",
    image: "/images/services/commercial-construction.webp",
    icon: HardHat,
  },
  {
    title: "Commercial Remodeling",
    description: "Office renovations, tenant improvements, retail build-outs, hospitality upgrades, and commercial property improvements.",
    href: "/services/commercial-remodeling",
    image: "/images/services/commercial-remodeling.webp",
    icon: Building2,
  },
  {
    title: "Residential Remodeling",
    description: "Whole-home renovations, additions, kitchens, bathrooms, and custom improvements designed around how you live.",
    href: "/services/residential-remodeling",
    image: "/images/services/residential-remodeling.webp",
    icon: Home,
  },
  {
    title: "Electrical Contracting",
    description: "Licensed electrical construction, power distribution, installations, upgrades, and system coordination for Florida projects.",
    href: "/services/electrical-contracting",
    image: "/images/services/electrical-contracting.webp",
    icon: Lightbulb,
  },
  {
    title: "Emergency Restoration",
    description: "Fast response and dependable reconstruction after fire, water, storm, wind, or structural damage.",
    href: "/services/emergency-restoration",
    image: "/images/services/emergency-restoration.webp",
    icon: Wrench,
  },
];

const PROCESS = [
  ["01", "Understand", "We listen to your goals, site conditions, budget, schedule, and operational requirements."],
  ["02", "Plan", "Our team develops the scope, schedule, procurement plan, and communication process for the work ahead."],
  ["03", "Build", "Experienced professionals coordinate trades, quality, safety, and progress throughout construction."],
  ["04", "Deliver", "We complete inspections, closeout, and handover with a focus on lasting performance and satisfaction."],
] as const;

const MARKETS = [
  ["Commercial", "Offices, retail, restaurants, hospitality, and tenant improvement projects."],
  ["Industrial", "Warehouses, manufacturing, distribution, and operational facility improvements."],
  ["Institutional", "Healthcare, education, government, and community facilities."],
  ["Residential", "Large residential construction, remodeling, additions, and property upgrades."],
] as const;

const FAQS = [
  {
    question: "What construction services does Keentel provide?",
    answer: "We provide pre-construction planning, design-build, general construction, commercial remodeling, residential remodeling, electrical contracting, and emergency restoration services.",
  },
  {
    question: "Can Keentel manage my entire project?",
    answer: "Yes. Our team can coordinate planning, estimating, permitting support, scheduling, trade coordination, construction, quality control, inspections, and project closeout.",
  },
  {
    question: "What types of projects do you handle?",
    answer: "We work with commercial, industrial, institutional, residential, multi-family, and public-sector clients across Florida, depending on the project scope and requirements.",
  },
  {
    question: "Do you offer design-build construction?",
    answer: "Yes. Design-build gives clients one accountable team for design coordination and construction, helping improve communication, cost visibility, and schedule control.",
  },
  {
    question: "Where does Keentel General Contractors serve?",
    answer: "Keentel serves projects throughout Florida, with active coverage across the Tampa Bay area and communities statewide. Contact us to discuss your project location.",
  },
  {
    question: "How do I start a construction project with Keentel?",
    answer: "Tell us about your project through our contact form or call our team directly. We will review your goals and recommend the right next step for planning and construction.",
  },
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <ServiceSchema name="Construction Services" description="Licensed general construction, design-build, remodeling, pre-construction, restoration, and electrical services across Florida." url="/services" />
      <Hero
        videoSrc="/Video/construction-services.mp4"
        badge="CONSTRUCTION • REMODELING • ELECTRICAL • RESTORATION"
        titleLine1="Built for the Work Ahead."
        titleLine2="Ready for Every Project."
        description={<>Keentel General Contractors delivers dependable construction, remodeling, electrical, and restoration services for commercial, industrial, institutional, and residential projects across Florida.<br /><span className="sec1-hero__desc-highlight">One accountable team focused on quality, safety, and lasting results.</span></>}
        primaryCta={{ label: "Start Your Project", href: "/contact#contactformsection" }}
        secondaryCta={{ label: "Call (813) 395-0000", href: "tel:8133950000", icon: "fa-phone" }}
      />

      <section className="services-section services-intro">
        <div className="services-shell services-intro__grid">
          <div className="services-intro__media">
            <Image src="/images/services/construction-workers-building-site.webp" alt="Keentel construction team working on a Florida building project" width={1000} height={700} loading="lazy" />
            <div className="services-intro__badge"><strong>67</strong><span>Florida counties<br />within reach</span></div>
          </div>
          <div className="services-intro__copy">
            <h2>A Better Way to Build Construction Services That Move Your Project Forward</h2>
            <p>
              Every successful project starts with the right plan and the right partner. Keentel
              General Contractors brings planning, construction, remodeling, electrical, and
              restoration capabilities together so your team can move from first conversation to
              final completion with confidence.
            </p>
            <p>
              Whether you are developing a commercial property, expanding an industrial facility,
              renovating a home, or responding to unexpected damage, our professionals coordinate
              the details that protect your schedule, budget, and long-term goals.
            </p>
            <Link href="/about" className="services-text-link">Meet Keentel General Contractors <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="services-section services-catalog" id="service-catalog">
        <div className="services-shell">
          <div className="services-catalog__header">
            <div className="services-heading">
              <span className="services-section-kicker">Our Capabilities</span>
              <h2>Complete Construction Services for Every Project Type</h2>
            </div>
            <div className="services-catalog__summary">
              <p>From early planning to final closeout, one accountable Keentel team coordinates the people, details, and decisions that keep your project moving.</p>
              <div className="services-catalog__proof">
                <span><strong>07</strong> integrated services</span>
                <span><strong>01</strong> accountable partner</span>
                <span><strong>67</strong> Florida counties</span>
              </div>
            </div>
          </div>
          <div className="services-cards">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <article className="services-card" key={service.title}>
                  <div className="services-card__media">
                    <Image src={service.image} alt={`${service.title} from Keentel General Contractors`} width={800} height={500} loading="lazy" />
                    <span className="services-card__icon"><Icon size={20} /></span>
                  </div>
                  <div className="services-card__body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link href={service.href}>Explore service <ArrowRight size={15} /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-section services-process">
        <div className="services-shell">
          <div className="services-heading services-heading--center">
            <h2>A Clear Path from First Conversation to Completion</h2>
            <p>Good construction is organized, visible, and accountable at every stage.</p>
          </div>
          <div className="services-process__grid">
            {PROCESS.map(([number, title, description]) => (
              <div className="services-process__step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section services-markets">
        <div className="services-shell">
          <div className="services-heading">
            <h2>Built Around Your Industry Across Florida’s Most Important Markets</h2>
            <p>Our teams adapt the construction process to the requirements of your facility, property, operation, and community.</p>
          </div>
          <div className="services-markets__grid">
            {MARKETS.map(([title, description], index) => (
              <div className="services-market" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href="/industries">View industries <ArrowRight size={15} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="Construction Service FAQs"
        titleLines={["Questions Before", "You Build?"]}
        subtitle="Get clear answers about our construction services, project types, process, and Florida service coverage."
        faqs={FAQS}
      />

    </main>
  );
}
