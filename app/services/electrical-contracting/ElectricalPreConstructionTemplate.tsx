"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import WhyKeentel from "@/components/WhyKeentel";
import ServiceHeroCredentials from "@/components/ServiceHeroCredentials";
import FAQSection from "@/components/FAQSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBuilding,
  faCheck,
  faClipboardList,
  faHardHat,
  faIndustry,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import type { ElectricalServicePage } from "./electrical-service-data";

const projectImages = [
  "/images/electrical-services/commercial-construction.webp",
  "/images/electrical-services/industrial-equipment-wiring.webp",
  "/images/electrical-services/commercial-lighting.webp",
  "/images/electrical-services/emergency-power.webp",
  "/images/electrical-services/project-office.webp",
  "/images/electrical-services/residential-inspections.webp",
];

const audiences = [
  { icon: faBuilding, title: "Property Owners", desc: "Residential and commercial property owners planning electrical work." },
  { icon: faUsers, title: "Developers", desc: "Project teams coordinating electrical infrastructure and construction." },
  { icon: faIndustry, title: "Facility Teams", desc: "Commercial and industrial teams responsible for building operations." },
  { icon: faHardHat, title: "General Contractors", desc: "Construction partners requiring coordinated electrical execution." },
  { icon: faClipboardList, title: "Property Managers", desc: "Managers planning maintenance, repairs, and facility upgrades." },
  { icon: faWrench, title: "Equipment Teams", desc: "Suppliers and operators coordinating power requirements." },
];

export default function ElectricalPreConstructionTemplate({
  page,
  isHub = false,
}: {
  page: ElectricalServicePage;
  isHub?: boolean;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("pc-visible")),
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".pc-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const trustItems = isHub
    ? ["Residential Expertise", "Commercial Capabilities", "Industrial Systems", "Electrical Planning", "Responsive Repairs"]
    : ["Clear Project Planning", "Code-Conscious Work", "Coordinated Installation", "Professional Testing", "Reliable Communication"];
  const services = page.services.slice(0, 16);
  const projectTypes = page.services.slice(0, 6).map((service, index) => ({
    ...service,
    image: projectImages[index],
  }));
  const matterItems = page.services.slice(0, 4);

  return (
    <main className="pc-about-page">
      <section className="pc-hero-section">
        <div className="pc-hero-image" aria-hidden="true">
          {page.heroVideo ? (
            <video
              className="electrical-pc-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
                {page.heroVideo?.startsWith("/") && (
                  <source
                    src={page.heroVideo.replace(/\.mp4$/, "-mobile.mp4")}
                    media="(max-width: 768px)"
                    type="video/mp4"
                  />
                )}
              <source src={page.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <div className="electrical-pc-hero-photo" style={{ backgroundImage: `url(${page.heroImage})` }} />
          )}
        </div>
        <div className="pc-hero-overlay" />
        <div className="pc-hero-content">
          <div className="pc-hero-badge pc-reveal">{page.eyebrow}</div>
          <h1 className="pc-hero-title pc-reveal pc-reveal-delay-1">
            <span className="service-hero-title-line">{page.title}</span>
            <span className="service-hero-title-line"><span className="pc-highlight">{page.accent}</span></span>
          </h1>
          <p className="pc-hero-subtitle pc-reveal pc-reveal-delay-2">{page.intro}</p>
          <div className="service-hero-bottom-row">
            <div className="pc-hero-cta-group pc-reveal pc-reveal-delay-3">
              <a href="#contactformsection" className="pc-btn pc-btn-primary">Book a Consultation <FontAwesomeIcon icon={faArrowRight} className="pc-btn-arrow" /></a>
              <a href="tel:8133950000" className="pc-btn pc-btn-secondary">Call Us <FontAwesomeIcon icon={faArrowRight} className="pc-btn-arrow" /></a>
            </div>
            <ServiceHeroCredentials />
          </div>
        </div>
      </section>

      <div className="pc-trust-bar-wrapper">
        <div className="pc-trust-bar">
          {[...trustItems, ...trustItems].map((item, index) => (
            <span key={`${item}-${index}`} className="pc-trust-item">
              <span className="pc-trust-check"><FontAwesomeIcon icon={faCheck} /></span>
              {item}
              {index % trustItems.length !== trustItems.length - 1 && <span className="pc-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      <section className="pc-section-light" id="pc-about">
        <div className="pc-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="pc-container">
          <div className="pc-about-grid">
            <div className="pc-reveal">
              <span className="pc-section-label">About Our Electrical Contracting Services</span>
              <h2 className="pc-section-heading">{isHub ? "Electrical Expertise for Every Project Type" : "Plan the Work. Power the Project."}</h2>
              <p className="pc-section-body">{page.overview}</p>
              <p className="pc-section-body">Every scope begins with the property, equipment, operating requirements, and desired outcome. That information guides coordination, installation, testing, and turnover.</p>
              <p className="pc-section-body">Florida Licenses: CGC1524228 • EC13014476</p>
            </div>
            <div className="pc-about-visual pc-reveal pc-reveal-delay-2">
              <Image className="pc-about-image" src={page.featureImage} alt={`Professional ${page.eyebrow.toLowerCase()}`} width={1000} height={700} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <WhyKeentel />

      <section className="pc-section-dark pc-matters-section" id="pc-why-matters">
        <div className="pc-container">
          <div className="pc-matters-header">
            <span className="pc-section-label pc-reveal">Why Professional Electrical Planning Matters</span>
            <h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">Clear Electrical Planning Supports <span>Better Outcomes</span></h2>
            <p className="pc-section-body pc-reveal pc-reveal-delay-1">Early evaluation helps define requirements, coordinate the right solution, and reduce avoidable issues during installation.</p>
          </div>
          <div className="pc-matters-timeline">
            {matterItems.map((service, index) => (
              <div className={`pc-matter-step pc-reveal pc-reveal-delay-${index + 2}`} key={service.title}>
                <article className="pc-matter-card">
                  <span className="pc-matter-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
                <span className="pc-matter-marker" aria-hidden="true">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`pc-section-light-alt pc-planning-section electrical-capabilities-section${isHub ? " electrical-capabilities-section--hub" : ""}`}
        id="pc-services"
      >
        <div className="pc-container">
          <div className="electrical-capabilities-header pc-reveal">
            <span className="pc-section-label">What&apos;s Included</span>
            <h2 className="pc-section-heading">Complete <span>Electrical Capabilities</span></h2>
            <p className="pc-section-body">Services are coordinated around site conditions, system requirements, project goals, and the approved scope.</p>
          </div>
          <div className="pc-services-layout">
            <div className="pc-services-left pc-reveal">
              <div className="pc-services-image-wrapper">
                  <Image src={page.featureImage} alt="Electrical contracting services" className="pc-services-image" width={1000} height={700} loading="lazy" />
              </div>
            </div>
            <div className="pc-services-right pc-reveal pc-reveal-delay-2">
              <div className="pc-services-right-header"><span>Complete Electrical Scope</span><p>Key requirements reviewed before work begins.</p></div>
              <div className="pc-services-grid">
                {services.map((service, index) => (
                  <div className="pc-service-item" key={service.title}>
                    <span className="pc-service-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="pc-service-name">{service.title}</span>
                    <span className="pc-service-check" aria-hidden="true">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section-dark" id="pc-project-types">
        <div className="pc-container">
          <span className="pc-section-label pc-reveal">{isHub ? "Electrical Service Categories" : "Project Capabilities"}</span>
          <h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">{isHub ? "Electrical Solutions Across Every Sector" : "Supporting Projects of Every Size"}</h2>
          <div className="pc-project-types-grid">
            {projectTypes.map((type, index) => (
              <div className={`pc-project-type-card pc-reveal pc-reveal-delay-${index + 2}`} key={type.title}>
                <div className="pc-project-type-image">
                  <Image src={type.image} alt={`${type.title} electrical project`} width={800} height={500} loading="lazy" />
                </div>
                <div className="pc-project-type-content"><h4>{type.title}</h4><p>{type.description}</p></div>
              </div>
            ))}
          </div>
          <div className="pc-project-types-cta pc-reveal"><a href="#contactformsection" className="pc-btn pc-btn-primary">Let&apos;s Discuss Your Project <FontAwesomeIcon icon={faArrowRight} className="pc-btn-arrow" /></a></div>
        </div>
      </section>

      <section className="pc-section-light electrical-audience-section" id="pc-who-we-work-with">
        <div className="pc-container">
          <div className="pc-audience-header">
            <div><span className="pc-section-label pc-reveal">Who We Work With</span><h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">Built for Owners, Facilities &amp; Project Teams</h2></div>
            <p className="pc-section-body pc-reveal">Electrical work is coordinated with the people responsible for the property, equipment, construction, and ongoing operation.</p>
          </div>
          <div className="pc-clients-grid">
            {audiences.map((client, index) => (
              <div className="pc-client-card pc-reveal pc-reveal-delay-2" key={client.title}>
                <div className="pc-client-card-top"><span className="pc-client-number">{String(index + 1).padStart(2, "0")}</span><div className="pc-client-icon"><FontAwesomeIcon icon={client.icon} /></div></div>
                <div className="pc-client-copy"><h4>{client.title}</h4><p>{client.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pc-section-dark electrical-pc-process" id="pc-process" style={{ "--electrical-process-image": `url(${page.heroImage})` } as React.CSSProperties}>
        <div className="pc-container">
          <div className="pc-process-header"><span className="pc-section-label pc-reveal">Our Electrical Contracting Process</span><h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">A Structured Approach from Planning to Turnover</h2></div>
          <div className="pc-process-timeline">
            {page.process.map((step, index) => (
              <div className={`pc-process-step pc-reveal pc-reveal-delay-${index + 1}`} key={step.title}>
                <div className="pc-process-step-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="pc-process-step-content"><h3>{step.title}</h3><p>{step.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={page.faqs}
        eyebrow="Electrical Service FAQs"
        titleLines={["Answers,", "before you start."]}
        subtitle="Clear, service-specific answers drawn from Keentel Electrical Contractors information."
        showAllLink={false}
      />

      <section className="pc-final-cta-section electrical-final-cta" id="pc-final-cta">
        <div className="pc-container pc-reveal">
          <h2>Ready to Plan Your <span>Electrical Project?</span></h2>
          <div className="pc-final-cta-buttons">
            <Link href="/contact#contactformsection" className="pc-btn-filled-dark">Book a Consultation <FontAwesomeIcon icon={faArrowRight} /></Link>
            <a href="tel:8133950000" className="pc-btn-outline-dark">Call Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
