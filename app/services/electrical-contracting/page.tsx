// page.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import "./electrical-contracting.css";
import "../service-hero.css";
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
  faPhone,
  faEnvelope,
  faLocationDot,
  faClipboardList,
  faDollarSign,
  faUsers,
  faClock,
  faRulerCombined,
  faShieldAlt,
  faHandshake,
  faChartLine,
  faWrench,
  faHardHat,
  faFileContract,
  faCalendar,
  faCircleCheck,
  faArrowRightLong,
  faHospital,
  faHotel,
  faLandmark,
  faStore,
  faUtensils,
  faStethoscope,
  faBolt,
  faLightbulb,
  faPlug,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

export default function ElectricalContractingPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ecs-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".ecs-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("success");
    setTimeout(() => {
      setFormStatus("idle");
      formRef.current?.reset();
    }, 3000);
  };

  // ── FAQ logic ──
  const faqSectionRef = useRef<HTMLElement>(null);
  const faqAnswerRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const faqOpenIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (faqSectionRef.current && !faqSectionRef.current.contains(e.target as Node)) {
        const current = faqOpenIndexRef.current;
        if (current !== null) {
          const el = faqAnswerRefs.current.get(current);
          if (el) {
            el.style.maxHeight = "0px";
            el.parentElement?.classList.remove("ecs-active");
          }
          faqOpenIndexRef.current = null;
        }
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const toggleFaq = (index: number) => {
    const prev = faqOpenIndexRef.current;
    const answerEl = faqAnswerRefs.current.get(index);
    if (!answerEl) return;

    if (prev !== null && prev !== index) {
      const prevAnswer = faqAnswerRefs.current.get(prev);
      if (prevAnswer) {
        prevAnswer.style.maxHeight = "0px";
        prevAnswer.parentElement?.classList.remove("ecs-active");
      }
    }

    if (prev === index) {
      answerEl.style.maxHeight = "0px";
      answerEl.parentElement?.classList.remove("ecs-active");
      faqOpenIndexRef.current = null;
    } else {
      answerEl.style.maxHeight = answerEl.scrollHeight + 20 + "px";
      answerEl.parentElement?.classList.add("ecs-active");
      faqOpenIndexRef.current = index;
    }
  };

  // ── Data ──

  const trustItems = [
    "Licensed & Insured",
    "Commercial & Industrial Expertise",
    "Code-Compliant Installations",
    "Safety-First Execution",
    "Reliable Project Delivery",
  ];

  // Services – 20 items (even)
  const servicesList = [
    "Electrical System Installation",
    "Power Distribution Systems",
    "Electrical Infrastructure Upgrades",
    "Commercial Electrical Construction",
    "Industrial Electrical Construction",
    "New Building Electrical Systems",
    "Building Expansions",
    "Tenant Improvement Electrical Work",
    "Interior & Exterior Lighting",
    "LED Lighting Upgrades",
    "Electrical Panel Installation & Upgrades",
    "Circuit Installation",
    "Dedicated Equipment Power",
    "Emergency Power Preparation",
    "Generator Connections",
    "Electrical Renovations",
    "Wiring & Cabling",
    "Equipment Installation",
    "Electrical Testing",
    "Final Commissioning",
  ];

  const projectTypes = [
    {
      icon: faBuilding,
      title: "Commercial Buildings",
      desc: "Electrical systems for offices, retail centers, mixed-use developments, and professional facilities.",
      image: "/images/services/Commercial%20Construction.jpg",
    },
    {
      icon: faIndustry,
      title: "Industrial Facilities",
      desc: "Power distribution, equipment connections, production areas, warehouses, and manufacturing environments.",
      image: "/images/services/construction-workers-building-site.jpg",
    },
    {
      icon: faHospital,
      title: "Healthcare & Institutional Buildings",
      desc: "Reliable electrical systems supporting healthcare facilities, schools, government buildings, and institutional projects.",
      image: "/images/services/Healthcare%20Facilities.jpg",
    },
    {
      icon: faBuildingColumns,
      title: "Tenant Improvements",
      desc: "Electrical modifications designed around changing business requirements and new tenant layouts.",
      image: "/images/services/Tenant%20Improvements.jpg",
    },
    {
      icon: faMaximize,
      title: "Building Expansions",
      desc: "Electrical infrastructure supporting facility growth and operational expansion.",
      image: "/images/services/Facility%20Expansions.jpg",
    },
    {
      icon: faHouse,
      title: "Large Residential Projects",
      desc: "Professional electrical installations for custom homes, additions, and high-end residential renovations.",
      image: "/images/services/Large%20Residential%20Projects.jpg",
    },
  ];

  // Who We Serve – 12 items (even)
  const clientTypes = [
    { icon: faBuilding, title: "Commercial Property Owners", desc: "Owners of office, retail, and mixed-use properties." },
    { icon: faChartLine, title: "Developers", desc: "Real estate development and investment firms." },
    { icon: faIndustry, title: "Industrial Companies", desc: "Manufacturing, logistics, and warehousing firms." },
    { icon: faWrench, title: "Manufacturing Facilities", desc: "Production and assembly operations." },
    { icon: faBuildingColumns, title: "Office Buildings", desc: "Corporate and professional office spaces." },
    { icon: faStore, title: "Retail Centers", desc: "Shopping centers, stores, and commercial retail spaces." },
    { icon: faHotel, title: "Hospitality Properties", desc: "Hotels, resorts, and lodging facilities." },
    { icon: faHospital, title: "Healthcare Organizations", desc: "Hospitals, clinics, and medical facilities." },
    { icon: faSchool, title: "Educational Institutions", desc: "Schools, universities, and training centers." },
    { icon: faLandmark, title: "Government Facilities", desc: "Public sector and municipal buildings." },
    { icon: faClipboardList, title: "Property Managers", desc: "Firms overseeing multi-tenant properties." },
    { icon: faHouse, title: "Large Residential Property Owners", desc: "Owners of custom homes and large residential properties." },
  ];

  // Process – 4 steps (merged Consultation & Assessment with Planning & Coordination)
  const processSteps = [
    {
      step: "1",
      title: "Consultation & Assessment",
      desc: "We review your project requirements, operational needs, and electrical objectives, then coordinate with other trades.",
      icon: faClipboardList,
    },
    {
      step: "2",
      title: "Installation",
      desc: "Our experienced electricians complete installations using quality materials, professional workmanship, and safe construction practices.",
      icon: faBolt,
    },
    {
      step: "3",
      title: "Testing & Verification",
      desc: "Electrical systems are inspected and tested to verify performance, safety, and code compliance before commissioning.",
      icon: faTools,
    },
    {
      step: "4",
      title: "Project Completion",
      desc: "We complete final inspections, documentation, and project handover, ensuring every system is ready for reliable operation.",
      icon: faCircleCheck,
    },
  ];

  const reasons = [
    { title: "Experienced Electrical Professionals", desc: "Skilled teams delivering quality workmanship across a wide range of projects." },
    { title: "Integrated Construction Coordination", desc: "Electrical work coordinated with all other construction activities for greater efficiency." },
    { title: "Safety-Focused Execution", desc: "Every installation follows safe work practices and applicable electrical standards." },
    { title: "Reliable Scheduling", desc: "Carefully planned electrical work that supports overall project timelines." },
    { title: "Quality Without Compromise", desc: "Attention to detail from installation through final testing and commissioning." },
    { title: "Long-Term Performance", desc: "Electrical systems designed to provide dependable operation for years to come." },
  ];

  const benefitsList = [
    "Improve building safety",
    "Support reliable operations",
    "Increase energy efficiency",
    "Reduce maintenance issues",
    "Improve electrical performance",
    "Ensure code compliance",
    "Simplify project coordination",
    "Support future facility expansion",
    "Protect long-term investments",
    "Deliver dependable building infrastructure",
  ];

  const faqData = [
    {
      q: "What types of electrical projects do you handle?",
      a: "We provide electrical contracting services for commercial, industrial, institutional, and large residential projects, including new construction, renovations, tenant improvements, and facility expansions.",
    },
    {
      q: "Do you provide electrical work for new construction?",
      a: "Yes. We install complete electrical systems for new buildings and major construction projects.",
    },
    {
      q: "Can you upgrade existing electrical systems?",
      a: "Absolutely. We perform electrical upgrades, panel replacements, lighting improvements, and infrastructure modernization.",
    },
    {
      q: "Do you coordinate electrical work with other trades?",
      a: "Yes. Our team works closely with architects, engineers, and other contractors to ensure efficient project delivery.",
    },
    {
      q: "Do you perform testing before project completion?",
      a: "Yes. Electrical systems are inspected and tested to verify proper operation and compliance before final handover.",
    },
    {
      q: "Can electrical services be combined with other construction services?",
      a: "Yes. Electrical contracting is fully integrated into our Design-Build, General Construction, Commercial Remodeling, and Emergency Restoration services.",
    },
  ];

  return (
    <main className="ecs-about-page">

      {/* ── Hero Section ── */}
      <section className="ecs-hero-section">
        <video
          className="ecs-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/Video/COMMERCIAL%20%20INDUSTRIAL%20INSTITUTIONAL%20%20POWER%20DISTRIBUTION.mp4"
            type="video/mp4"
          />
        </video>
        <div className="ecs-hero-overlay"></div>
        <div className="ecs-hero-content">
          <div className="ecs-hero-badge ecs-reveal">
            COMMERCIAL • INDUSTRIAL • INSTITUTIONAL • POWER DISTRIBUTION
          </div>
          <h1 className="ecs-hero-title ecs-reveal ecs-reveal-delay-1">
            <span className="service-hero-title-line">Reliable Electrical Solutions</span>
            <span className="service-hero-title-line ecs-highlight">
              Built for Performance &amp; Safety
            </span>
          </h1>
          <p className="ecs-hero-subtitle ecs-reveal ecs-reveal-delay-2">
            Electrical systems are the backbone of every modern building. Keentel General Contractors provides professional electrical contracting services for commercial, industrial, institutional, and large residential projects, delivering safe, efficient, and code-compliant electrical systems designed for long-term performance.
          </p>
         
          <div className="service-hero-bottom-row">
            <div className="ecs-hero-cta-group ecs-reveal ecs-reveal-delay-3">
              <a href="#contactformsection" className="ecs-btn ecs-btn-primary">
                Book a Consultation <FontAwesomeIcon icon={faArrowRight} className="ecs-btn-arrow" />
              </a>
              <a href="tel:8133950000" className="ecs-btn ecs-btn-secondary">
                Call Us <FontAwesomeIcon icon={faArrowRight} className="ecs-btn-arrow" />
              </a>
            </div>
            <ServiceHeroCredentials />
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="ecs-trust-bar-wrapper">
        <div className="ecs-trust-bar">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <span key={idx} className="ecs-trust-item">
              <span className="ecs-trust-check">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {item}
              {idx % trustItems.length !== trustItems.length - 1 && <span className="ecs-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="ecs-section-light" id="ecs-about">
        <div className="ecs-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="ecs-container">
          <div className="ecs-about-grid">
            <div className="ecs-reveal">
              <span className="ecs-section-label">About Our Electrical Contracting Services</span>
              <h2 className="ecs-section-heading">Powering Buildings with Confidence</h2>
              <p className="ecs-section-body">
                Reliable electrical systems are essential to the safety, performance, and efficiency of every facility. From power distribution and lighting to equipment installations and electrical upgrades, quality electrical work plays a critical role in the success of every construction project.
              </p>
              <p className="ecs-section-body">
                At Keentel General Contractors, we provide complete electrical contracting services that integrate seamlessly with new construction, renovations, tenant improvements, and facility expansions. Our team focuses on delivering safe installations, dependable performance, and professional project coordination while meeting applicable electrical codes and industry standards.
              </p>
              <p className="ecs-section-body">
                Whether working as part of a complete construction project or providing standalone electrical services, we deliver solutions designed for long-term reliability.
              </p>
            </div>
            <div className="ecs-about-visual ecs-reveal ecs-reveal-delay-2">
              <div className="ecs-about-bg-dot" style={{ top: "5%", left: "5%" }} />
              <div className="ecs-about-bg-dot ecs-dot-2" />
              <div className="ecs-about-floating-card">
                <div className="ecs-card-icon-large">
                  <FontAwesomeIcon icon={faBolt} />
                </div>
                <h4>Electrical Contracting Experts</h4>
                <p>We deliver safe, code-compliant electrical systems built for long-term performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Professional Electrical Contracting Matters (Dark) ── */}
      <WhyKeentel />

      <section className="ecs-section-dark" id="ecs-why-matters">
        <div className="ecs-decor-ring" style={{ width: 300, height: 300, top: -60, right: -80 }} />
        <div className="ecs-container">
          <span className="ecs-section-label ecs-reveal">Why Professional Electrical Contracting Matters</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">Safe Systems. Reliable Performance. Long-Term Value.</h2>
          <p className="ecs-section-body ecs-reveal ecs-reveal-delay-1">
            Electrical systems affect every aspect of a building's operation. Proper planning, quality installation, and code compliance help improve safety, reduce downtime, support operational efficiency, and protect your investment.
          </p>
          <p className="ecs-section-body ecs-reveal ecs-reveal-delay-1">
            At Keentel General Contractors, we approach every electrical project with careful planning, skilled workmanship, and strict attention to quality, ensuring systems are installed correctly and built to perform for years to come.
          </p>
          <div className="ecs-matters-grid">
            {["Improved Safety", "Reliable Performance", "Code Compliance", "Long-Term Value"].map((title, i) => (
              <div className={`ecs-matter-card ecs-reveal ecs-reveal-delay-${i + 2}`} key={i}>
                <span className="ecs-matter-number">0{i + 1}</span>
                <h4>{title}</h4>
                <p>Professional electrical contracting protects your investment and supports operational success.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="ecs-section-light-alt" id="ecs-services">
        <div className="ecs-container">
          <div className="ecs-services-layout">
            <div className="ecs-services-left ecs-reveal">
              <span className="ecs-section-label">What's Included</span>
              <h2 className="ecs-section-heading">Complete Electrical Contracting Solutions</h2>
              <p className="ecs-section-body">
                Our services cover every aspect of electrical contracting, from power distribution to final commissioning, tailored to your project's needs.
              </p>
              <div className="ecs-services-image-wrapper">
                <img
                  src="/images/services/Commercial%20Construction.jpg"
                  alt="Electrical Contracting services"
                  className="ecs-services-image"
                />
              </div>
            </div>
            <div className="ecs-services-right ecs-reveal ecs-reveal-delay-2">
              <div className="ecs-services-grid">
                {servicesList.map((service, idx) => (
                  <div className="ecs-service-item" key={idx}>
                    <span className="ecs-service-dot" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Types ── */}
      <section className="ecs-section-dark" id="ecs-project-types">
        <div className="ecs-container">
          <span className="ecs-section-label ecs-reveal">Project Types</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">Electrical Solutions for Every Facility</h2>
          <div className="ecs-project-types-grid">
            {projectTypes.map((type, idx) => (
              <div className={`ecs-project-type-card ecs-reveal ecs-reveal-delay-${idx + 2}`} key={idx}>
                <div className="ecs-project-type-image">
                  <Image
                    src={type.image}
                    alt={`${type.title} electrical contracting project`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="ecs-project-type-photo"
                  />
                </div>
                <div className="ecs-project-type-content">
                  <h4>{type.title}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ecs-project-types-cta ecs-reveal">
            <a href="#contactformsection" className="ecs-btn ecs-btn-primary">
              Schedule an Electrical Consultation <FontAwesomeIcon icon={faArrowRight} className="ecs-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Who We Serve (12 cards) ── */}
      <section className="ecs-section-light" id="ecs-who-we-serve">
        <div className="ecs-container">
          <span className="ecs-section-label ecs-reveal">Who We Serve</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">Electrical Contracting for Diverse Industries</h2>
          <div className="ecs-clients-grid">
            {clientTypes.map((client, idx) => (
              <div className="ecs-client-card ecs-reveal ecs-reveal-delay-2" key={idx}>
                <div className="ecs-client-icon">
                  <FontAwesomeIcon icon={client.icon} />
                </div>
                <h4>{client.title}</h4>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
          <p className="ecs-section-body ecs-reveal" style={{ marginTop: 20 }}>
            Whether you're planning new construction, expanding an existing facility, or upgrading aging electrical infrastructure, Keentel General Contractors delivers reliable electrical solutions built around your project's needs.
          </p>
        </div>
      </section>

      {/* ── Process (4 steps) ── */}
      <section className="ecs-section-dark" id="ecs-process">
        <div className="ecs-container">
          <span className="ecs-section-label ecs-reveal">Our Electrical Project Process</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">A Structured Approach to Reliable Electrical Construction</h2>
          <div className="ecs-process-horizontal">
            {processSteps.map((step, idx) => (
              <div className={`ecs-process-step ecs-reveal ecs-reveal-delay-${idx + 1}`} key={idx}>
                <div className="ecs-process-step-number">{step.step}</div>
                <div className="ecs-process-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Keentel ── */}
      <section className="ecs-section-light-alt" id="ecs-why-choose">
        <div className="ecs-container">
          <span className="ecs-section-label ecs-reveal">Why Choose Keentel General Contractors</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">Electrical Expertise You Can Depend On</h2>
          <div className="ecs-choose-grid">
            {reasons.map((reason, idx) => (
              <div className={`ecs-choose-card ecs-reveal ecs-reveal-delay-${idx + 2}`} key={idx}>
                <h4>{reason.title}</h4>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="ecs-section-dark" id="ecs-benefits">
        <div className="ecs-container">
          <span className="ecs-section-label ecs-reveal">Benefits of Professional Electrical Contracting</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">Reliable Electrical Systems Start with the Right Team</h2>
          <div className="ecs-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <div className="ecs-benefit-item ecs-reveal" key={idx}>
                <span className="ecs-benefit-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ecs-section-light" id="ecs-faq" ref={faqSectionRef}>
        <div className="ecs-container ecs-faq-container">
          <span className="ecs-section-label ecs-reveal">Frequently Asked Questions</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">Electrical Contracting FAQs</h2>
          <div className="ecs-faq-list">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="ecs-faq-item ecs-reveal"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFaq(idx);
                }}
              >
                <div className="ecs-faq-question">
                  <span>{faq.q}</span>
                  <span className="ecs-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div
                  className="ecs-faq-answer"
                  ref={(el) => {
                    if (el) faqAnswerRefs.current.set(idx, el);
                    else faqAnswerRefs.current.delete(idx);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="ecs-section-dark" id="ecs-contact">
        <div className="ecs-decor-orb" style={{ width: 280, height: 280, top: "15%", right: "-6%" }} />
        <div className="ecs-container">
          <span className="ecs-section-label ecs-reveal">Contact Section</span>
          <h2 className="ecs-section-heading ecs-reveal ecs-reveal-delay-1">Let's Power Your Next Project</h2>
          <p className="ecs-section-body ecs-reveal ecs-reveal-delay-1">
            Whether you're constructing a new facility, expanding operations, renovating a commercial property, or upgrading electrical infrastructure, Keentel General Contractors is ready to help. Our experienced team will work with you to design, coordinate, and install reliable electrical systems that support your project's success.
          </p>
          <div className="ecs-contact-grid">
            <form className="ecs-contact-form ecs-reveal ecs-reveal-delay-2" ref={formRef} onSubmit={handleFormSubmit}>
              <div className="ecs-form-row">
                <input type="text" className="ecs-form-input" placeholder="Full Name *" required />
                <input type="text" className="ecs-form-input" placeholder="Company" />
              </div>
              <div className="ecs-form-row">
                <input type="email" className="ecs-form-input" placeholder="Email Address *" required />
                <input type="tel" className="ecs-form-input" placeholder="Phone Number" />
              </div>
              <div className="ecs-form-row">
                <input type="text" className="ecs-form-input" placeholder="Project Location" />
                <select className="ecs-form-select">
                  <option value="">Project Type</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Institutional</option>
                  <option>Large Residential</option>
                  <option>Tenant Improvement</option>
                  <option>Building Expansion</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="ecs-form-row">
                <select className="ecs-form-select">
                  <option value="">Electrical Service Needed</option>
                  <option>New Installation</option>
                  <option>Electrical Upgrade</option>
                  <option>Lighting</option>
                  <option>Panel Upgrade</option>
                  <option>Equipment Power</option>
                  <option>Emergency Power</option>
                  <option>Other</option>
                </select>
                <select className="ecs-form-select">
                  <option value="">Estimated Budget</option>
                  <option>Under $500K</option>
                  <option>$500K – $2M</option>
                  <option>$2M – $10M</option>
                  <option>$10M – $50M</option>
                  <option>$50M+</option>
                </select>
              </div>
              <textarea className="ecs-form-textarea" placeholder="Project Details *" required></textarea>
              <button type="submit" className="ecs-btn-submit">
                {formStatus === "success" ? "✓ Sent Successfully!" : "Request an Electrical Consultation →"}
              </button>
            </form>
            <div className="ecs-contact-info-side ecs-reveal ecs-reveal-delay-3">
              <div className="ecs-contact-info-card">
                <h5><FontAwesomeIcon icon={faPhone} /> Call Us</h5>
                <p>Speak directly with our electrical team.</p>
              </div>
              <div className="ecs-contact-info-card">
                <h5><FontAwesomeIcon icon={faEnvelope} /> Email Us</h5>
                <p>Send us your project details and we'll respond within one business day.</p>
              </div>
              <div className="ecs-contact-info-card">
                <h5><FontAwesomeIcon icon={faLocationDot} /> Visit Our Office</h5>
                <p>Schedule an in-person consultation at our headquarters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="ecs-final-cta-section" id="ecs-final-cta">
        <div className="ecs-container ecs-reveal">
          <h2>
            Reliable Electrical Solutions <span style={{ color: "#a6238f" }}>Begin with the Right Partner</span>
          </h2>
          <div className="ecs-final-cta-buttons">
            <a href="#contactformsection" className="ecs-btn-filled-dark">Book a Consultation <FontAwesomeIcon icon={faArrowRight} /></a>
            <a href="tel:8133950000" className="ecs-btn-outline-dark">Call Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
