// page.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import "./general-construction.css";
import "../service-hero.css";
import WhyKeentel from "@/components/WhyKeentel";

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
  faStore, // for retail
} from "@fortawesome/free-solid-svg-icons";

export default function GeneralConstructionPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gcs-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".gcs-reveal");
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
            el.parentElement?.classList.remove("gcs-active");
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
        prevAnswer.parentElement?.classList.remove("gcs-active");
      }
    }

    if (prev === index) {
      answerEl.style.maxHeight = "0px";
      answerEl.parentElement?.classList.remove("gcs-active");
      faqOpenIndexRef.current = null;
    } else {
      answerEl.style.maxHeight = answerEl.scrollHeight + 20 + "px";
      answerEl.parentElement?.classList.add("gcs-active");
      faqOpenIndexRef.current = index;
    }
  };

  // ── Data ──

  const trustItems = [
    "Licensed & Insured",
    "Experienced Project Management",
    "Commercial & Industrial Expertise",
    "Safety-First Construction",
    "Quality-Driven Results",
  ];

  const servicesList = [
    "Ground-Up Construction",
    "Building Expansions",
    "Commercial Construction",
    "Industrial Construction",
    "Office Buildings",
    "Tenant Improvements",
    "Facility Renovations",
    "Structural Modifications",
    "Interior Build-Outs",
    "Exterior Improvements",
    "Construction Management",
    "Project Scheduling",
    "Procurement Coordination",
    "Trade Management",
    "Quality Assurance",
    "Safety Management",
    "Final Inspections",
    "Project Closeout",
  ];

  const projectTypes = [
    {
      icon: faBuilding,
      title: "Commercial Buildings",
      desc: "Professional offices, retail developments, mixed-use properties, restaurants, and hospitality spaces.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/38/7f/c9/07/ca/v1_E10/E10AQCWB.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=0c948850b392c0ae2a54badb9913435d46fd281ebfc73bd19b935409b593367e",
    },
    {
      icon: faIndustry,
      title: "Industrial Facilities",
      desc: "Warehouses, manufacturing plants, logistics centers, distribution facilities, and operational infrastructure.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/1a/da/d1/88/c0/v1_E10/E10CXB3Q.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=f444a31362c6942bb657dfee8c6d3150c8173a962660b5401a735b9ac69aafa8",
    },
    {
      icon: faSchool,
      title: "Institutional Projects",
      desc: "Educational facilities, healthcare buildings, government properties, and community developments.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/1da902e5-8bb7-4bc2-883f-e253ca487511/a1a5d319-de7c-4538-a255-42a41016f7fa.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=67e91452b6cb3cbf1373feb59b41849d9a27c86d06e45946b0a69adb60daa953",
    },
    {
      icon: faMaximize,
      title: "Facility Expansions",
      desc: "Building additions and operational expansions that increase capacity while minimizing disruption.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/9a/c3/7a/15/0e/v1_E10/E109TMD4.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3a023dd7818f768211c3022ff35b0b7c46c2b59718bf3860d72efc4496042f44",
    },
    {
      icon: faBuildingColumns,
      title: "Tenant Improvements",
      desc: "Customized interior spaces designed to meet operational requirements, branding objectives, and future growth.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/be/9f/e9/9c/df/v1_E10/E10BW9BS.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=edca7417d1de50a85d3ffc00879c90929aab910d11f397c23b8a79a30d0fa15b",
    },
    {
      icon: faHouse,
      title: "Large Residential Construction",
      desc: "Luxury homes, custom residences, additions, and major residential renovations.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/12/b7/a7/70/3d/v1_E11/E117XMXQ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=82d802a8dd695cb8f143f605732dd6cf900e171af8f4c5aefc07c96e30932185",
    },
  ];

  const clientTypes = [
    { icon: faBuilding, title: "Commercial Property Owners", desc: "Owners of office, retail, and mixed-use properties." },
    { icon: faChartLine, title: "Real Estate Developers", desc: "Development firms and investors." },
    { icon: faUsers, title: "Business Owners", desc: "Companies planning new facilities or expansions." },
    { icon: faIndustry, title: "Industrial Companies", desc: "Manufacturing, logistics, and warehousing firms." },
    { icon: faWrench, title: "Manufacturing Facilities", desc: "Production and assembly operations." },
    { icon: faClipboardList, title: "Property Management Companies", desc: "Firms overseeing large portfolios." },
    { icon: faSchool, title: "Educational Institutions", desc: "Schools, universities, and training centers." },
    { icon: faHospital, title: "Healthcare Organizations", desc: "Hospitals, clinics, and medical facilities." },
    { icon: faStore, title: "Retail Businesses", desc: "Stores, showrooms, and commercial retail spaces." },
    { icon: faHotel, title: "Hospitality Groups", desc: "Hotels, resorts, and hospitality businesses." },
    { icon: faLandmark, title: "Government Agencies", desc: "Public sector projects and infrastructure." },
    { icon: faBuildingColumns, title: "Multi-Family Developers", desc: "Apartment and condominium developers." },
  ];

  // Process steps – 4 cards
  const processSteps = [
    {
      step: "1",
      title: "Discovery & Planning",
      desc: "We begin by understanding your goals, budget, schedule, and project requirements.",
      icon: faClipboardList,
    },
    {
      step: "2",
      title: "Pre-Construction",
      desc: "Budgets, schedules, logistics, procurement planning, and project coordination are established before construction begins.",
      icon: faDollarSign,
    },
    {
      step: "3",
      title: "Construction Management",
      desc: "Our team coordinates subcontractors, materials, quality control, safety, and daily operations to keep your project moving efficiently.",
      icon: faHardHat,
    },
    {
      step: "4",
      title: "Project Completion",
      desc: "We complete final inspections, closeout documentation, commissioning support, and project handover with attention to every detail.",
      icon: faCircleCheck,
    },
  ];

  const reasons = [
    { title: "Experienced Project Leadership", desc: "Professional management throughout every phase of construction." },
    { title: "Quality Craftsmanship", desc: "Construction completed with attention to detail, durability, and long-term performance." },
    { title: "Transparent Communication", desc: "Clear updates, collaborative planning, and proactive decision-making." },
    { title: "Safety Without Compromise", desc: "A strong commitment to safe job sites, responsible practices, and industry standards." },
    { title: "Reliable Scheduling", desc: "Well-organized project planning that helps reduce delays and improve efficiency." },
    { title: "Client-Focused Solutions", desc: "Construction strategies tailored to your operational goals, project requirements, and long-term objectives." },
  ];

  const benefitsList = [
    "Improve project coordination",
    "Maintain budget control",
    "Reduce construction risks",
    "Streamline communication",
    "Improve scheduling",
    "Increase construction quality",
    "Simplify contractor management",
    "Support long-term facility performance",
    "Deliver projects more efficiently",
    "Protect long-term investments",
  ];

  const faqData = [
    {
      q: "What types of projects do you manage?",
      a: "We provide General Construction services for commercial, industrial, institutional, mixed-use, and large residential projects.",
    },
    {
      q: "Do you manage the entire construction process?",
      a: "Yes. We oversee planning, scheduling, subcontractor coordination, construction management, quality control, and project closeout.",
    },
    {
      q: "Can you handle occupied facility renovations?",
      a: "Absolutely. We develop phased construction plans that help minimize disruption while maintaining safety and operational continuity.",
    },
    {
      q: "Do you provide project management?",
      a: "Yes. Every project is supported by experienced project management focused on communication, coordination, and quality.",
    },
    {
      q: "How do you maintain construction quality?",
      a: "We implement quality assurance procedures, site supervision, inspections, and continuous project monitoring throughout construction.",
    },
    {
      q: "Can General Construction services include electrical work?",
      a: "Yes. Our integrated Electrical Contracting services can be included as part of your construction project when required.",
    },
  ];

  return (
    <main className="gcs-about-page">

      {/* ── Hero Section ── */}
      <section className="gcs-hero-section">
        <div className="gcs-hero-image"></div>
        <div className="gcs-hero-overlay"></div>
        <div className="gcs-hero-content">
          <div className="gcs-hero-badge gcs-reveal">
            <span className="gcs-hero-badge-dot" />
            COMMERCIAL • INDUSTRIAL • INSTITUTIONAL • LARGE RESIDENTIAL
          </div>
          <h1 className="gcs-hero-title gcs-reveal gcs-reveal-delay-1">
            Building Projects with <span className="gcs-highlight">Precision, Quality & Accountability</span>
          </h1>
          <p className="gcs-hero-subtitle gcs-reveal gcs-reveal-delay-2">
            Every successful project depends on more than skilled construction—it requires careful planning, experienced leadership, and seamless coordination. Keentel General Contractors delivers comprehensive general construction services that transform concepts into high-quality, lasting spaces built around your goals, schedule, and budget.
          </p>
          <p className="gcs-hero-subtitle gcs-hero-subtitle-small gcs-reveal gcs-reveal-delay-2">
            Whether you're developing a new facility, expanding an existing property, or modernizing your infrastructure, we provide one trusted team to manage every stage of construction.
          </p>
          <div className="gcs-hero-cta-group gcs-reveal gcs-reveal-delay-3">
            <a href="#contactformsection" className="gcs-btn gcs-btn-primary">
              Schedule a Consultation <FontAwesomeIcon icon={faArrowRight} className="gcs-btn-arrow" />
            </a>
            <a href="#contactformsection" className="gcs-btn gcs-btn-secondary">
              View Our Projects <FontAwesomeIcon icon={faArrowRight} className="gcs-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="gcs-trust-bar-wrapper">
        <div className="gcs-trust-bar">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <span key={idx} className="gcs-trust-item">
              <span className="gcs-trust-check">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {item}
              {idx % trustItems.length !== trustItems.length - 1 && <span className="gcs-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="gcs-section-light" id="gcs-about">
        <div className="gcs-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="gcs-container">
          <div className="gcs-about-grid">
            <div className="gcs-reveal">
              <span className="gcs-section-label">About Our General Construction Services</span>
              <h2 className="gcs-section-heading">Construction Built Around Your Vision</h2>
              <p className="gcs-section-body">
                Construction is one of the most important investments a business or property owner can make. It demands careful planning, skilled craftsmanship, and experienced project management to ensure every detail is executed correctly.
              </p>
              <p className="gcs-section-body">
                At Keentel General Contractors, we deliver complete general construction solutions for commercial, industrial, institutional, and large residential projects. From pre-construction planning to final project closeout, our team manages every aspect of the construction process with professionalism, transparency, and accountability.
              </p>
              <p className="gcs-section-body">
                Our goal is simple—to deliver projects that meet your expectations today while creating long-term value for the future.
              </p>
            </div>
            <div className="gcs-about-visual gcs-reveal gcs-reveal-delay-2">
              <div className="gcs-about-bg-dot" style={{ top: "5%", left: "5%" }} />
              <div className="gcs-about-bg-dot gcs-dot-2" />
              <div className="gcs-about-floating-card">
                <div className="gcs-card-icon-large">
                  <FontAwesomeIcon icon={faHardHat} />
                </div>
                <h4>Complete General Construction</h4>
                <p>From planning to completion, we deliver quality, safety, and accountability on every project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose General Construction (Dark) ── */}
      <WhyKeentel />

      <section className="gcs-section-dark" id="gcs-why-matters">
        <div className="gcs-decor-ring" style={{ width: 300, height: 300, top: -60, right: -80 }} />
        <div className="gcs-container">
          <span className="gcs-section-label gcs-reveal">Why General Construction</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">A Complete Approach to Building</h2>
          <p className="gcs-section-body gcs-reveal gcs-reveal-delay-1">
            Our general construction services provide a single point of accountability, eliminating the complexity of managing multiple vendors.
          </p>
          <p className="gcs-section-body gcs-reveal gcs-reveal-delay-1">
            We handle everything from planning and procurement to construction management and final handover, ensuring consistency, quality, and on-time delivery.
          </p>
          <div className="gcs-matters-grid">
            {["Single Point of Accountability", "Proactive Project Management", "Quality & Safety Focus", "Efficient Scheduling"].map((title, i) => (
              <div className={`gcs-matter-card gcs-reveal gcs-reveal-delay-${i + 2}`} key={i}>
                <span className="gcs-matter-number">0{i + 1}</span>
                <h4>{title}</h4>
                <p>Our integrated approach reduces complexity and delivers better project outcomes.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="gcs-section-light-alt" id="gcs-services">
        <div className="gcs-container">
          <div className="gcs-services-layout">
            <div className="gcs-services-left gcs-reveal">
              <span className="gcs-section-label">What's Included</span>
              <h2 className="gcs-section-heading">Complete Construction Services from Start to Finish</h2>
              <p className="gcs-section-body">
                Our General Construction capabilities cover every aspect of your project, ensuring quality, efficiency, and successful delivery.
              </p>
              <div className="gcs-services-image-wrapper">
                <img
                  src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/ed/6b/a7/6e/48/v1_E11/E118CG4S.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=60127bdca6734a11de17a7023704ddd421e2cc6594733ed849a27600523f5d28"
                  alt="General construction services"
                  className="gcs-services-image"
                />
              </div>
            </div>
            <div className="gcs-services-right gcs-reveal gcs-reveal-delay-2">
              <div className="gcs-services-grid">
                {servicesList.map((service, idx) => (
                  <div className="gcs-service-item" key={idx}>
                    <span className="gcs-service-dot" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Types ── */}
      <section className="gcs-section-dark" id="gcs-project-types">
        <div className="gcs-container">
          <span className="gcs-section-label gcs-reveal">Project Types</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">Construction Solutions for Every Stage of Growth</h2>
          <div className="gcs-project-types-grid">
            {projectTypes.map((type, idx) => (
              <div className={`gcs-project-type-card gcs-reveal gcs-reveal-delay-${idx + 2}`} key={idx}>
                <div className="gcs-project-type-image" style={{ backgroundImage: `url(${type.image})` }} />
                <div className="gcs-project-type-content">
                  <div className="gcs-project-type-icon">
                    <FontAwesomeIcon icon={type.icon} />
                  </div>
                  <h4>{type.title}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="gcs-project-types-cta gcs-reveal">
            <a href="#contactformsection" className="gcs-btn gcs-btn-primary">
              Discuss Your Project <FontAwesomeIcon icon={faArrowRight} className="gcs-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Who We Serve ── */}
      <section className="gcs-section-light" id="gcs-who-we-serve">
        <div className="gcs-container">
          <span className="gcs-section-label gcs-reveal">Who We Serve</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">Built for Projects That Demand Professional Leadership</h2>
          <div className="gcs-clients-grid">
            {clientTypes.map((client, idx) => (
              <div className="gcs-client-card gcs-reveal gcs-reveal-delay-2" key={idx}>
                <div className="gcs-client-icon">
                  <FontAwesomeIcon icon={client.icon} />
                </div>
                <h4>{client.title}</h4>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
          <p className="gcs-section-body gcs-reveal" style={{ marginTop: 20 }}>
            Whether you're planning a single facility or a multi-phase development, Keentel General Contractors provides the leadership and construction expertise needed to deliver successful results.
          </p>
        </div>
      </section>

      {/* ── Process (4 cards) ── */}
      <section className="gcs-section-dark" id="gcs-process">
        <div className="gcs-container">
          <span className="gcs-section-label gcs-reveal">Our Construction Process</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">A Proven Process Built Around Successful Project Delivery</h2>
          <div className="gcs-process-horizontal">
            {processSteps.map((step, idx) => (
              <div className={`gcs-process-step gcs-reveal gcs-reveal-delay-${idx + 1}`} key={idx}>
                <div className="gcs-process-step-icon">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <div className="gcs-process-step-number">{step.step}</div>
                <div className="gcs-process-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Keentel ── */}
      <section className="gcs-section-light-alt" id="gcs-why-choose">
        <div className="gcs-container">
          <span className="gcs-section-label gcs-reveal">Why Choose Keentel General Contractors</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">More Than a Contractor—A Trusted Construction Partner</h2>
          <div className="gcs-choose-grid">
            {reasons.map((reason, idx) => (
              <div className={`gcs-choose-card gcs-reveal gcs-reveal-delay-${idx + 2}`} key={idx}>
                <h4>{reason.title}</h4>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="gcs-section-dark" id="gcs-benefits">
        <div className="gcs-container">
          <span className="gcs-section-label gcs-reveal">Benefits of Professional General Construction</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">Building Smarter Creates Better Results</h2>
          <div className="gcs-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <div className="gcs-benefit-item gcs-reveal" key={idx}>
                <span className="gcs-benefit-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="gcs-section-light" id="gcs-faq" ref={faqSectionRef}>
        <div className="gcs-container gcs-faq-container">
          <span className="gcs-section-label gcs-reveal">Frequently Asked Questions</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">General Construction FAQs</h2>
          <div className="gcs-faq-list">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="gcs-faq-item gcs-reveal"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFaq(idx);
                }}
              >
                <div className="gcs-faq-question">
                  <span>{faq.q}</span>
                  <span className="gcs-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div
                  className="gcs-faq-answer"
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
      <section className="gcs-section-dark" id="gcs-contact">
        <div className="gcs-decor-orb" style={{ width: 280, height: 280, top: "15%", right: "-6%" }} />
        <div className="gcs-container">
          <span className="gcs-section-label gcs-reveal">Contact Section</span>
          <h2 className="gcs-section-heading gcs-reveal gcs-reveal-delay-1">Let's Build Your Next Project</h2>
          <p className="gcs-section-body gcs-reveal gcs-reveal-delay-1">
            Whether you're planning a new commercial facility, expanding an industrial operation, renovating an existing property, or preparing for a major development, Keentel General Contractors is ready to help. Our team will work closely with you to develop the right strategy and deliver construction solutions that support your long-term goals.
          </p>
          <div className="gcs-contact-grid">
            <form className="gcs-contact-form gcs-reveal gcs-reveal-delay-2" ref={formRef} onSubmit={handleFormSubmit}>
              <div className="gcs-form-row">
                <input type="text" className="gcs-form-input" placeholder="Full Name *" required />
                <input type="text" className="gcs-form-input" placeholder="Company Name" />
              </div>
              <div className="gcs-form-row">
                <input type="email" className="gcs-form-input" placeholder="Email Address *" required />
                <input type="tel" className="gcs-form-input" placeholder="Phone Number" />
              </div>
              <div className="gcs-form-row">
                <input type="text" className="gcs-form-input" placeholder="Project Location" />
                <select className="gcs-form-select">
                  <option value="">Project Type</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Institutional</option>
                  <option>Multi-Family</option>
                  <option>Large Residential</option>
                  <option>Facility Expansion</option>
                  <option>Tenant Improvement</option>
                  <option>Renovation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="gcs-form-row">
                <select className="gcs-form-select">
                  <option value="">Estimated Budget</option>
                  <option>Under $500K</option>
                  <option>$500K – $2M</option>
                  <option>$2M – $10M</option>
                  <option>$10M – $50M</option>
                  <option>$50M+</option>
                </select>
                <select className="gcs-form-select">
                  <option value="">Expected Timeline</option>
                  <option>0–6 Months</option>
                  <option>6–12 Months</option>
                  <option>1–2 Years</option>
                  <option>2+ Years</option>
                </select>
              </div>
              <textarea className="gcs-form-textarea" placeholder="Tell Us About Your Project *" required></textarea>
              <button type="submit" className="gcs-btn-submit">
                {formStatus === "success" ? "✓ Sent Successfully!" : "Request a Consultation →"}
              </button>
            </form>
            <div className="gcs-contact-info-side gcs-reveal gcs-reveal-delay-3">
              <div className="gcs-contact-info-card">
                <h5><FontAwesomeIcon icon={faPhone} /> Call Us</h5>
                <p>Speak directly with our construction team.</p>
              </div>
              <div className="gcs-contact-info-card">
                <h5><FontAwesomeIcon icon={faEnvelope} /> Email Us</h5>
                <p>Send us your project details and we'll respond within one business day.</p>
              </div>
              <div className="gcs-contact-info-card">
                <h5><FontAwesomeIcon icon={faLocationDot} /> Visit Our Office</h5>
                <p>Schedule an in-person consultation at our headquarters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="gcs-final-cta-section" id="gcs-final-cta">
        <div className="gcs-container gcs-reveal">
          <h2>
            Build with a Partner <span style={{ color: "#a6238f" }}>Committed to Excellence</span>
          </h2>
          <p>
            Every successful project starts with the right construction team. At Keentel General Contractors, we combine planning, project management, skilled craftsmanship, and dependable execution to deliver construction solutions that stand the test of time.
          </p>
          <p className="gcs-final-cta-bold">Let's build your next project with confidence.</p>
          <div className="gcs-final-cta-buttons">
            <a href="#contactformsection" className="gcs-btn-filled-dark">Start Your Project <FontAwesomeIcon icon={faArrowRight} /></a>
            <a href="#contactformsection" className="gcs-btn-outline-dark">Contact Keentel General Contractors</a>
          </div>
        </div>
      </section>
    </main>
  );
}
