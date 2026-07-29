// page.tsx
"use client";

import { useEffect } from "react";
import "./pre-construction.css";
import "../service-hero.css";
import "../project-capabilities.css";
import WhyKeentel from "@/components/WhyKeentel";
import ServiceHeroCredentials from "@/components/ServiceHeroCredentials";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faIndustry,
  faSchool,
  faBuildingColumns,
  faHouse,
  faMaximize,
  faCheck,
  faArrowRight,
  faClipboardList,
  faDollarSign,
  faUsers,
  faRulerCombined,
  faHandshake,
  faChartLine,
  faWrench,
  faHardHat,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

export default function PreConstructionPage() {
  // Scroll reveal using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pc-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".pc-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Trust bar items
  const trustItems = [
    "Early Project Planning",
    "Budget & Cost Guidance",
    "Design Coordination",
    "Risk Reduction",
    "Construction Expertise",
  ];

  // Services list (shortened for balanced layout)
  const servicesList = [
    "Project Consultation",
    "Site Evaluation",
    "Budget Development",
    "Preliminary Cost Estimates",
    "Value Engineering",
    "Design Coordination",
    "Constructability Reviews",
    "Scheduling & Milestone Planning",
    "Procurement Planning",
    "Material Selection Guidance",
    "Risk Assessment",
    "Scope Development",
    "Bid Package Support",
    "Permit Planning",
    "Utility Coordination",
    "Project Phasing Strategies",
  ];

  const projectTypes = [
    {
      icon: faBuilding,
      title: "Commercial Developments",
      desc: "Office buildings, retail centers, mixed‑use developments, and business facilities.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/38/7f/c9/07/ca/v1_E10/E10AQCWB.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=0c948850b392c0ae2a54badb9913435d46fd281ebfc73bd19b935409b593367e",
    },
    {
      icon: faIndustry,
      title: "Industrial Projects",
      desc: "Manufacturing plants, warehouses, logistics centers, and operational facilities.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/1a/da/d1/88/c0/v1_E10/E10CXB3Q.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=f444a31362c6942bb657dfee8c6d3150c8173a962660b5401a735b9ac69aafa8",
    },
    {
      icon: faSchool,
      title: "Institutional Buildings",
      desc: "Schools, healthcare facilities, municipal buildings, and public infrastructure.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/1da902e5-8bb7-4bc2-883f-e253ca487511/a1a5d319-de7c-4538-a255-42a41016f7fa.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=67e91452b6cb3cbf1373feb59b41849d9a27c86d06e45946b0a69adb60daa953",
    },
    {
      icon: faBuildingColumns,
      title: "Multi‑Family Developments",
      desc: "Apartment communities, condominium projects, and residential developments.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/be/9f/e9/9c/df/v1_E10/E10BW9BS.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=edca7417d1de50a85d3ffc00879c90929aab910d11f397c23b8a79a30d0fa15b",
    },
    {
      icon: faHouse,
      title: "Large Residential Projects",
      desc: "Luxury homes, custom residences, additions, and complete property transformations.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/12/b7/a7/70/3d/v1_E11/E117XMXQ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=82d802a8dd695cb8f143f605732dd6cf900e171af8f4c5aefc07c96e30932185",
    },
    {
      icon: faMaximize,
      title: "Facility Expansions",
      desc: "Projects that increase capacity while minimizing operational disruption.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/9a/c3/7a/15/0e/v1_E10/E109TMD4.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3a023dd7818f768211c3022ff35b0b7c46c2b59718bf3860d72efc4496042f44",
    },
  ];

  // Client types – redesigned with icons and descriptions
  const clientTypes = [
    {
      icon: faBuilding,
      title: "Commercial Property Owners",
      desc: "Office, retail, and mixed‑use property owners.",
    },
    {
      icon: faChartLine,
      title: "Developers",
      desc: "Real estate development firms and investors.",
    },
    {
      icon: faUsers,
      title: "Business Owners",
      desc: "Companies planning new facilities or expansions.",
    },
    {
      icon: faHandshake,
      title: "Investors",
      desc: "Financial institutions and private equity groups.",
    },
    {
      icon: faRulerCombined,
      title: "Architects",
      desc: "Design professionals seeking construction input.",
    },
    {
      icon: faWrench,
      title: "Engineers",
      desc: "Structural, MEP, and civil engineering firms.",
    },
    {
      icon: faHardHat,
      title: "Facility Managers",
      desc: "Operational teams planning upgrades or expansions.",
    },
    {
      icon: faClipboardList,
      title: "Property Managers",
      desc: "Management companies overseeing large portfolios.",
    },
    {
      icon: faIndustry,
      title: "Industrial Companies",
      desc: "Manufacturing, logistics, and warehousing firms.",
    },
    {
      icon: faSchool,
      title: "Educational Institutions",
      desc: "Schools, universities, and training centers.",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Project Discovery & Evaluation",
      desc: "We begin by understanding your goals, vision, timeline, and budget, while also evaluating site conditions and project constraints.",
      icon: faClipboardList,
    },
    {
      step: "2",
      title: "Budget & Feasibility",
      desc: "We develop realistic budgets, cost expectations, and feasibility recommendations to ensure your project is financially viable.",
      icon: faDollarSign,
    },
    {
      step: "3",
      title: "Design Coordination",
      desc: "We collaborate with architects and engineers to improve constructability and resolve design conflicts before they become costly issues.",
      icon: faRulerCombined,
    },
    {
      step: "4",
      title: "Planning, Scheduling & Readiness",
      desc: "Detailed schedules, procurement strategies, and construction sequencing are developed, ensuring your project is ready for efficient execution.",
      icon: faCalendar,
    },
  ];

  return (
    <main className="pc-about-page">

      {/* ── Hero Section ── */}
      <section className="pc-hero-section">
        <div className="pc-hero-image" aria-hidden="true">
          <video
            className="pc-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source
              src="/Video/Successful%20Project%20Begins%20Before%20Construction%20Starts.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="pc-hero-overlay"></div>
        <div className="pc-hero-content">
          <div className="pc-hero-badge pc-reveal">
            PLANNING • BUDGETING • DESIGN COORDINATION • PROJECT FEASIBILITY
          </div>
          <h1 className="pc-hero-title pc-reveal pc-reveal-delay-1">
            <span className="service-hero-title-line">Every Successful Project Begins</span>
            <span className="service-hero-title-line">
              <span className="pc-highlight">Before Construction</span> Starts
            </span>
          </h1>
          <p className="pc-hero-subtitle pc-reveal pc-reveal-delay-2">
            The most successful construction projects are built on careful planning—not assumptions. Keentel General Contractors provides comprehensive pre‑construction services that help owners, developers, and businesses make informed decisions before breaking ground.
          </p>
          <div className="service-hero-bottom-row">
            <div className="pc-hero-cta-group pc-reveal pc-reveal-delay-3">
              <a href="#contactformsection" className="pc-btn pc-btn-primary">
                Book a Consultation <FontAwesomeIcon icon={faArrowRight} className="pc-btn-arrow" />
              </a>
              <a href="tel:8133950000" className="pc-btn pc-btn-secondary">
                Call Us <FontAwesomeIcon icon={faArrowRight} className="pc-btn-arrow" />
              </a>
            </div>
            <ServiceHeroCredentials />
          </div>
        </div>
      </section>

      {/* ── Trust Bar (Marquee) ── */}
      <div className="pc-trust-bar-wrapper">
        <div className="pc-trust-bar">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <span key={idx} className="pc-trust-item">
              <span className="pc-trust-check">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {item}
              {idx % trustItems.length !== trustItems.length - 1 && <span className="pc-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      {/* ── About Our Pre‑Construction Services ── */}
      <section className="pc-section-light" id="pc-about">
        <div className="pc-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="pc-container">
          <div className="pc-about-grid">
            <div className="pc-reveal">
              <span className="pc-section-label">About Our Pre‑Construction Services</span>
              <h2 className="pc-section-heading">Build Smarter Before You Build</h2>
              <p className="pc-section-body">
                Every construction project begins with important decisions. Poor planning can lead to delays, budget overruns, design conflicts, and costly changes during construction.
              </p>
              <p className="pc-section-body">
                At Keentel General Contractors, our pre‑construction services are designed to eliminate uncertainty before work begins. We collaborate with owners, architects, engineers, consultants, and stakeholders to develop practical construction strategies that improve efficiency and support better project outcomes.
              </p>
              <p className="pc-section-body">
                By investing time in planning, clients gain greater confidence, better cost control, and a smoother construction experience from start to finish.
              </p>
            </div>
            <div className="pc-about-visual pc-reveal pc-reveal-delay-2">
              <img
                className="pc-about-image"
                src="/images/services/About%20Our%20Pre%E2%80%91Construction%20Services.jpg"
                alt="Construction professionals reviewing pre-construction plans"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Keentel + Project Form (shared with homepage) ── */}
      <WhyKeentel />

      {/* ── Why Pre‑Construction Matters ── */}
      <section className="pc-section-dark pc-matters-section" id="pc-why-matters">
        <div className="pc-container">
          <div className="pc-matters-header">
            <span className="pc-section-label pc-reveal">Why Pre‑Construction Matters</span>
            <h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">
              Better Planning Leads to <span>Better Projects</span>
            </h2>
            <p className="pc-section-body pc-reveal pc-reveal-delay-1">
              Pre‑construction allows critical decisions to be made before work begins.
              Instead of solving problems during construction, we focus on preventing them.
            </p>
          </div>
          <div className="pc-matters-timeline">
            {["Reduce Unexpected Costs", "Improve Scheduling", "Coordinate Design Teams", "Identify Project Risks"].map((title, i) => (
              <div className={`pc-matter-step pc-reveal pc-reveal-delay-${i + 2}`} key={i}>
                <article className="pc-matter-card">
                  <span className="pc-matter-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>Early planning ensures clarity, collaboration, and proactive risk management.</p>
                </article>
                <span className="pc-matter-marker" aria-hidden="true">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comprehensive Planning Services (redesigned) ── */}
      <section className="pc-section-light-alt pc-planning-section" id="pc-services">
        <div className="pc-container">
          <div className="pc-services-layout">
            <div className="pc-services-left pc-reveal">
              <span className="pc-section-label">What&apos;s Included</span>
              <h2 className="pc-section-heading">
                Comprehensive <span>Planning Services</span>
              </h2>
              <p className="pc-section-body">
                We tailor every service to the goals and complexity of your project, ensuring a thorough approach from concept to construction.
              </p>
              <div className="pc-services-image-wrapper">
                <img
                  src="/images/services/About%20Our%20Pre%E2%80%91Construction%20Services.jpg"
                  alt="Planning services"
                  className="pc-services-image"
                />
                <div className="pc-services-image-overlay">
                  <strong>16</strong>
                  <span>Coordinated Planning Services</span>
                </div>
              </div>
            </div>
            <div className="pc-services-right pc-reveal pc-reveal-delay-2">
              <div className="pc-services-right-header">
                <span>Complete Project Roadmap</span>
                <p>Every critical detail reviewed before construction begins.</p>
              </div>
              <div className="pc-services-grid">
                {servicesList.map((service, idx) => (
                  <div className="pc-service-item" key={idx}>
                    <span className="pc-service-index">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="pc-service-name">{service}</span>
                    <span className="pc-service-check" aria-hidden="true">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Types (Dark, with images and CTA) ── */}
      <section className="pc-section-dark" id="pc-project-types">
        <div className="pc-container">
          <span className="pc-section-label pc-reveal">Project Types</span>
          <h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">Supporting Projects of Every Size</h2>
          <div className="pc-project-types-grid">
            {projectTypes.map((type, idx) => (
              <div className={`pc-project-type-card pc-reveal pc-reveal-delay-${idx + 2}`} key={idx}>
                <div className="pc-project-type-image" style={{ backgroundImage: `url(${type.image})` }} />
                <div className="pc-project-type-content">
                  <h4>{type.title}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pc-project-types-cta pc-reveal">
            <a href="#contactformsection" className="pc-btn pc-btn-primary">
              Let&apos;s Discuss Your Project <FontAwesomeIcon icon={faArrowRight} className="pc-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Who We Work With (redesigned) ── */}
      <section className="pc-section-light" id="pc-who-we-work-with">
        <div className="pc-container">
          <div className="pc-audience-header">
            <div>
              <span className="pc-section-label pc-reveal">Who We Work With</span>
              <h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">Built for Owners, Developers &amp; Project Teams</h2>
            </div>
            <p className="pc-section-body pc-reveal">
              Whether you&apos;re starting with a concept or preparing for construction, Keentel General Contractors provides the expertise needed to move your project forward with confidence.
            </p>
          </div>
          <div className="pc-clients-grid">
            {clientTypes.map((client, idx) => (
              <div className="pc-client-card pc-reveal pc-reveal-delay-2" key={idx}>
                <div className="pc-client-card-top">
                  <span className="pc-client-number">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="pc-client-icon">
                    <FontAwesomeIcon icon={client.icon} />
                  </div>
                </div>
                <h4>{client.title}</h4>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Pre‑Construction Process ── */}
      <section className="pc-section-dark" id="pc-process">
        <div className="pc-container">
          <div className="pc-process-header">
            <span className="pc-section-label pc-reveal">Our Pre‑Construction Process</span>
            <h2 className="pc-section-heading pc-reveal pc-reveal-delay-1">A Structured Approach to Better Construction</h2>
          </div>
          <div className="pc-process-timeline">
            {processSteps.map((step, idx) => (
              <div className={`pc-process-step pc-reveal pc-reveal-delay-${idx + 1}`} key={idx}>
                <div className="pc-process-step-marker">
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="pc-process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA (theme matching) ── */}
      <section className="pc-final-cta-section" id="pc-final-cta">
        <div className="pc-container pc-reveal">
          <h2>
            Every Great Project Starts With a <span>Great Plan</span>
          </h2>
          <div className="pc-final-cta-buttons">
            <a href="#contactformsection" className="pc-btn-filled-dark">Book a Consultation <FontAwesomeIcon icon={faArrowRight} /></a>
            <a href="tel:8133950000" className="pc-btn-outline-dark">Call Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
