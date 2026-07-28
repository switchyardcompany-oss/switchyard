// page.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import "./design-build.css";
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
} from "@fortawesome/free-solid-svg-icons";

export default function DesignBuildPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll reveal using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dbs-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".dbs-reveal");
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

  // ── FAQ refs and logic (dynamic height) ──
  const faqSectionRef = useRef<HTMLElement>(null);
  const faqAnswerRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const faqOpenIndexRef = useRef<number | null>(null);

  // Close FAQ when clicking outside the section
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (faqSectionRef.current && !faqSectionRef.current.contains(e.target as Node)) {
        const current = faqOpenIndexRef.current;
        if (current !== null) {
          const el = faqAnswerRefs.current.get(current);
          if (el) {
            el.style.maxHeight = "0px";
            el.parentElement?.classList.remove("dbs-active");
          }
          faqOpenIndexRef.current = null;
        }
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  // Toggle FAQ – pure DOM, no React state
  const toggleFaq = (index: number) => {
    const prev = faqOpenIndexRef.current;
    const answerEl = faqAnswerRefs.current.get(index);
    if (!answerEl) return;

    // Close previously open
    if (prev !== null && prev !== index) {
      const prevAnswer = faqAnswerRefs.current.get(prev);
      if (prevAnswer) {
        prevAnswer.style.maxHeight = "0px";
        prevAnswer.parentElement?.classList.remove("dbs-active");
      }
    }

    // Toggle current
    if (prev === index) {
      answerEl.style.maxHeight = "0px";
      answerEl.parentElement?.classList.remove("dbs-active");
      faqOpenIndexRef.current = null;
    } else {
      answerEl.style.maxHeight = answerEl.scrollHeight + 20 + "px";
      answerEl.parentElement?.classList.add("dbs-active");
      faqOpenIndexRef.current = index;
    }
  };
  // ── End FAQ logic ──

  // Trust bar items
  const trustItems = [
    "Single Point of Accountability",
    "Faster Project Delivery",
    "Design & Construction Coordination",
    "Cost & Schedule Control",
    "Collaborative Project Management",
  ];

  // Services list (now 16 items – even number for two-column grid)
  const servicesList = [
    "Project Planning",
    "Concept Development",
    "Budget Planning",
    "Preliminary Cost Estimates",
    "Site Evaluation",
    "Design Coordination",
    "Architectural Coordination",
    "Engineering Coordination",
    "Value Engineering",
    "Constructability Reviews",
    "Schedule Development",
    "Procurement Planning",
    "Permit Coordination",
    "Construction Management",
    "Quality Control",
    "Safety Management",
    // "Final Project Closeout" removed to make even count
  ];

  const projectTypes = [
    {
      icon: faBuilding,
      title: "Commercial Construction",
      desc: "Office buildings, retail developments, mixed-use projects, and business facilities.",
      image: "/images/services/Commercial%20Construction.jpg",
    },
    {
      icon: faIndustry,
      title: "Industrial Facilities",
      desc: "Warehouses, manufacturing plants, production facilities, and logistics centers.",
      image: "/images/services/construction-workers-building-site.jpg",
    },
    {
      icon: faSchool,
      title: "Institutional Projects",
      desc: "Educational facilities, healthcare buildings, government projects, and public infrastructure.",
      image: "/images/services/Institutional%20Projects.jpg",
    },
    {
      icon: faMaximize,
      title: "Facility Expansions",
      desc: "Building additions and operational growth projects designed to minimize disruption.",
      image: "/images/services/Facility%20Expansions.jpg",
    },
    {
      icon: faBuildingColumns,
      title: "Tenant Improvements",
      desc: "Customized commercial interiors designed around operational needs.",
      image: "/images/services/construction-workers-building-site.jpg",
    },
    {
      icon: faHouse,
      title: "Large Residential Projects",
      desc: "Luxury homes, custom residences, and extensive residential developments.",
      image: "/images/services/Large%20Residential%20Projects.jpg",
    },
  ];

  // Client types – who we serve
  const clientTypes = [
    {
      icon: faBuilding,
      title: "Commercial Property Owners",
      desc: "Owners of office, retail, and mixed-use properties.",
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
      icon: faIndustry,
      title: "Industrial Companies",
      desc: "Manufacturing, logistics, and warehousing firms.",
    },
    {
      icon: faSchool,
      title: "Educational Institutions",
      desc: "Schools, universities, and training centers.",
    },
    {
      icon: faHospital,
      title: "Healthcare Organizations",
      desc: "Hospitals, clinics, and medical facilities.",
    },
    {
      icon: faHotel,
      title: "Hospitality Groups",
      desc: "Hotels, resorts, and hospitality businesses.",
    },
    {
      icon: faLandmark,
      title: "Government Agencies",
      desc: "Public sector projects and infrastructure.",
    },
    {
      icon: faClipboardList,
      title: "Property Managers",
      desc: "Management companies overseeing large portfolios.",
    },
  ];

  // Process steps – using the original four cards from the pre‑construction design
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

  const reasons = [
    { title: "Single Point of Responsibility", desc: "One experienced team managing every stage of the project." },
    { title: "Better Communication", desc: "Planning, design, and construction teams work together from the beginning." },
    { title: "Greater Cost Control", desc: "Early collaboration supports more accurate budgeting and fewer unexpected changes." },
    { title: "Faster Decision-Making", desc: "Integrated project management reduces delays and improves workflow." },
    { title: "Improved Quality", desc: "Construction decisions are made with both design intent and buildability in mind." },
    { title: "Long-Term Value", desc: "Projects are planned and delivered with performance, durability, and client goals at the forefront." },
  ];

  const benefitsList = [
    "Simplify project management",
    "Improve collaboration",
    "Reduce project risks",
    "Accelerate project delivery",
    "Minimize design conflicts",
    "Improve budget accuracy",
    "Streamline communication",
    "Increase construction efficiency",
    "Enhance overall project quality",
    "Deliver a smoother client experience",
  ];

  const faqData = [
    {
      q: "What is Design-Build?",
      a: "Design-Build is a project delivery method where planning, design coordination, and construction are managed by one integrated team under a single contract.",
    },
    {
      q: "How is Design-Build different from traditional construction?",
      a: "Instead of hiring separate designers and contractors, Design-Build creates one collaborative team responsible for the entire project.",
    },
    {
      q: "Does Design-Build save time?",
      a: "Yes. Early collaboration and coordinated decision-making often reduce delays and improve project schedules.",
    },
    {
      q: "Can you work with my architect?",
      a: "Absolutely. We collaborate with architects, engineers, consultants, and project stakeholders throughout the process.",
    },
    {
      q: "What types of projects are best for Design-Build?",
      a: "Commercial, industrial, institutional, tenant improvement, facility expansion, and large residential projects all benefit from the Design-Build approach.",
    },
    {
      q: "Can Keentel General Contractors manage construction after design?",
      a: "Yes. We manage every phase from planning and design coordination through construction and final project completion.",
    },
  ];

  return (
    <main className="dbs-about-page">

      {/* ── Hero Section ── */}
      <section className="dbs-hero-section">
        <video
          className="dbs-hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/services/One%20Team.%20One%20Vision.%20One%20Successful%20Project..jpg"
          aria-hidden="true"
        >
          <source
            src="/images/services/ONE%20TEAM%20%E2%80%A2%20ONE%20CONTRACT%20%E2%80%A2%20ONE%20SEAMLESS%20PROCESS.mp4"
            type="video/mp4"
          />
        </video>
        <div className="dbs-hero-overlay"></div>
        <div className="dbs-hero-content">
          <div className="dbs-hero-badge dbs-reveal">
            ONE TEAM • ONE CONTRACT • ONE SEAMLESS PROCESS
          </div>
          <h1 className="dbs-hero-title dbs-reveal dbs-reveal-delay-1">
            <span className="service-hero-title-line">Design, Planning &amp; Construction</span>
            <span className="service-hero-title-line dbs-highlight">
              Working Together from Day One
            </span>
          </h1>
          <p className="dbs-hero-subtitle dbs-reveal dbs-reveal-delay-2">
            Traditional construction separates design and construction into different teams, often leading to delays, miscommunication, and costly changes. Keentel General Contractors simplifies the process through integrated Design-Build services, bringing planning, design coordination, budgeting, and construction together under one experienced team.
          </p>
          <p className="dbs-hero-subtitle dbs-hero-subtitle-small dbs-reveal dbs-reveal-delay-2">
            The result is a more collaborative, efficient, and predictable project from concept to completion.
          </p>
          <div className="service-hero-bottom-row">
            <div className="dbs-hero-cta-group dbs-reveal dbs-reveal-delay-3">
              <a href="#contactformsection" className="dbs-btn dbs-btn-primary">
                Book a Consultation <FontAwesomeIcon icon={faArrowRight} className="dbs-btn-arrow" />
              </a>
              <a href="tel:8133950000" className="dbs-btn dbs-btn-secondary">
                Call Us <FontAwesomeIcon icon={faArrowRight} className="dbs-btn-arrow" />
              </a>
            </div>
            <ServiceHeroCredentials />
          </div>
        </div>
      </section>

      {/* ── Trust Bar (Marquee) ── */}
      <div className="dbs-trust-bar-wrapper">
        <div className="dbs-trust-bar">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <span key={idx} className="dbs-trust-item">
              <span className="dbs-trust-check">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {item}
              {idx % trustItems.length !== trustItems.length - 1 && <span className="dbs-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      {/* ── About Our Design-Build Services ── */}
      <section className="dbs-section-light" id="dbs-about">
        <div className="dbs-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="dbs-container">
          <div className="dbs-about-grid">
            <div className="dbs-reveal">
              <span className="dbs-section-label">About Our Design-Build Services</span>
              <h2 className="dbs-section-heading">One Team. One Vision. One Successful Project.</h2>
              <p className="dbs-section-body">
                At Keentel General Contractors, we believe construction works best when planning, design, and execution are aligned from the very beginning.
              </p>
              <p className="dbs-section-body">
                Our Design-Build approach eliminates the disconnect between designers, consultants, and contractors by creating one coordinated team focused on achieving your project goals.
              </p>
              <p className="dbs-section-body">
                From the first concept through final construction, every decision is made with efficiency, quality, and long-term value in mind.
              </p>
            </div>
            <div className="dbs-about-visual dbs-reveal dbs-reveal-delay-2">
              <img
                src="/images/services/One%20Team.%20One%20Vision.%20One%20Successful%20Project..jpg"
                alt="Design-build professionals coordinating one successful project"
                className="dbs-about-image"
                loading="lazy"
              />
              <div className="dbs-about-floating-card">
                <div className="dbs-card-icon-large">
                  <FontAwesomeIcon icon={faHardHat} />
                </div>
                <h4>Integrated Design-Build</h4>
                <p>Single-team accountability from concept to completion, ensuring seamless coordination and better results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Design-Build? (Dark) ── */}
      <WhyKeentel />

      <section className="dbs-section-dark" id="dbs-why-matters">
        <div className="dbs-decor-ring" style={{ width: 300, height: 300, top: -60, right: -80 }} />
        <div className="dbs-container">
          <span className="dbs-section-label dbs-reveal">Why Choose Design-Build?</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">A Smarter Way to Deliver Construction Projects</h2>
          <p className="dbs-section-body dbs-reveal dbs-reveal-delay-1">
            Traditional construction often requires owners to manage multiple contracts and coordinate several independent teams.
          </p>
          <p className="dbs-section-body dbs-reveal dbs-reveal-delay-1">
            With Design-Build, Keentel General Contractors becomes your single point of contact, improving collaboration, streamlining communication, and helping projects move forward with fewer delays and greater confidence.
          </p>
          <p className="dbs-section-body dbs-reveal dbs-reveal-delay-1">
            The result is a more efficient process, better coordination, and a smoother experience from planning through completion.
          </p>
          <div className="dbs-matters-grid">
            {["Single Point of Accountability", "Streamlined Communication", "Faster Decision-Making", "Reduced Project Risks"].map((title, i) => (
              <div className={`dbs-matter-card dbs-reveal dbs-reveal-delay-${i + 2}`} key={i}>
                <span className="dbs-matter-number">0{i + 1}</span>
                <h4>{title}</h4>
                <p>Integrated management eliminates fragmentation and improves project outcomes.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comprehensive Design-Build Services ── */}
      <section className="dbs-section-light-alt" id="dbs-services">
        <div className="dbs-container">
          <div className="dbs-services-layout">
            <div className="dbs-services-left dbs-reveal">
              <span className="dbs-section-label">What's Included</span>
              <h2 className="dbs-section-heading">Comprehensive Design-Build Services</h2>
              <p className="dbs-section-body">
                Our Design-Build solutions include a full range of services tailored to meet your operational, financial, and construction objectives.
              </p>
              <div className="dbs-services-image-wrapper">
                <img
                  src="/images/services/Comprehensive%20Design-Build%20Services.jpg"
                  alt="Comprehensive design-build services"
                  className="dbs-services-image"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="dbs-services-right dbs-reveal dbs-reveal-delay-2">
              <div className="dbs-services-grid">
                {servicesList.map((service, idx) => (
                  <div className="dbs-service-item" key={idx}>
                    <span className="dbs-service-dot" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Types (Dark, with images and CTA) ── */}
      <section className="dbs-section-dark" id="dbs-project-types">
        <div className="dbs-container">
          <span className="dbs-section-label dbs-reveal">Project Types</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">Design-Build Solutions for Complex Projects</h2>
          <div className="dbs-project-types-grid">
            {projectTypes.map((type, idx) => (
              <div className={`dbs-project-type-card dbs-reveal dbs-reveal-delay-${idx + 2}`} key={idx}>
                <div className="dbs-project-type-image" style={{ backgroundImage: `url(${type.image})` }} />
                <div className="dbs-project-type-content">
                  <h4>{type.title}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="dbs-project-types-cta dbs-reveal">
            <a href="#contactformsection" className="dbs-btn dbs-btn-primary">
              Start Your Design-Build Project <FontAwesomeIcon icon={faArrowRight} className="dbs-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Who We Serve ── */}
      <section className="dbs-section-light" id="dbs-who-we-serve">
        <div className="dbs-container">
          <span className="dbs-section-label dbs-reveal">Who We Serve</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">Built for Owners Who Want Simplicity</h2>
          <div className="dbs-clients-grid">
            {clientTypes.map((client, idx) => (
              <div className="dbs-client-card dbs-reveal dbs-reveal-delay-2" key={idx}>
                <div className="dbs-client-icon">
                  <FontAwesomeIcon icon={client.icon} />
                </div>
                <h4>{client.title}</h4>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
          <p className="dbs-section-body dbs-reveal" style={{ marginTop: 20 }}>
            Whether you're starting with an idea or ready to begin construction, Keentel General Contractors provides one experienced team to guide your project from concept through completion.
          </p>
        </div>
      </section>

      {/* ── Our Design-Build Process (Horizontal, 4 cards) ── */}
      <section className="dbs-section-dark" id="dbs-process">
        <div className="dbs-container">
          <span className="dbs-section-label dbs-reveal">Our Design-Build Process</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">A Collaborative Approach from Start to Finish</h2>
          <div className="dbs-process-horizontal">
            {processSteps.map((step, idx) => (
              <div className={`dbs-process-step dbs-reveal dbs-reveal-delay-${idx + 1}`} key={idx}>
                <div className="dbs-process-step-number">{step.step}</div>
                <div className="dbs-process-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Keentel General Contractors ── */}
      <section className="dbs-section-light-alt" id="dbs-why-choose">
        <div className="dbs-container">
          <span className="dbs-section-label dbs-reveal">Why Keentel General Contractors</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">Why Clients Choose Our Design-Build Approach</h2>
          <div className="dbs-choose-grid">
            {reasons.map((reason, idx) => (
              <div className={`dbs-choose-card dbs-reveal dbs-reveal-delay-${idx + 2}`} key={idx}>
                <h4>{reason.title}</h4>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits of Design-Build (Dark) ── */}
      <section className="dbs-section-dark" id="dbs-benefits">
        <div className="dbs-container">
          <span className="dbs-section-label dbs-reveal">Benefits of Design-Build</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">A Better Experience from Concept to Completion</h2>
          <div className="dbs-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <div className="dbs-benefit-item dbs-reveal" key={idx}>
                <span className="dbs-benefit-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="dbs-section-light" id="dbs-faq" ref={faqSectionRef}>
        <div className="dbs-container dbs-faq-container">
          <span className="dbs-section-label dbs-reveal">Frequently Asked Questions</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">Design-Build FAQs</h2>
          <div className="dbs-faq-list">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="dbs-faq-item dbs-reveal"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFaq(idx);
                }}
              >
                <div className="dbs-faq-question">
                  <span>{faq.q}</span>
                  <span className="dbs-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div
                  className="dbs-faq-answer"
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

      {/* ── Contact Section ── */}
      <section className="dbs-section-dark" id="dbs-contact">
        <div className="dbs-decor-orb" style={{ width: 280, height: 280, top: "15%", right: "-6%" }} />
        <div className="dbs-container">
          <span className="dbs-section-label dbs-reveal">Contact Section</span>
          <h2 className="dbs-section-heading dbs-reveal dbs-reveal-delay-1">Let's Build Smarter Together</h2>
          <p className="dbs-section-body dbs-reveal dbs-reveal-delay-1">
            Every successful Design-Build project starts with a conversation. Tell us about your project, and Keentel General Contractors will help develop the right strategy, coordinate the right team, and deliver the right results.
          </p>
          <div className="dbs-contact-grid">
            <form className="dbs-contact-form dbs-reveal dbs-reveal-delay-2" ref={formRef} onSubmit={handleFormSubmit}>
              <div className="dbs-form-row">
                <input type="text" className="dbs-form-input" placeholder="Full Name *" required />
                <input type="text" className="dbs-form-input" placeholder="Company" />
              </div>
              <div className="dbs-form-row">
                <input type="email" className="dbs-form-input" placeholder="Email Address *" required />
                <input type="tel" className="dbs-form-input" placeholder="Phone Number" />
              </div>
              <div className="dbs-form-row">
                <input type="text" className="dbs-form-input" placeholder="Project Location" />
                <select className="dbs-form-select">
                  <option value="">Project Type</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Institutional</option>
                  <option>Multi‑Family</option>
                  <option>Large Residential</option>
                  <option>Facility Expansion</option>
                  <option>Tenant Improvement</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="dbs-form-row">
                <select className="dbs-form-select">
                  <option value="">Estimated Budget</option>
                  <option>Under $500K</option>
                  <option>$500K – $2M</option>
                  <option>$2M – $10M</option>
                  <option>$10M – $50M</option>
                  <option>$50M+</option>
                </select>
                <select className="dbs-form-select">
                  <option value="">Expected Timeline</option>
                  <option>0–6 Months</option>
                  <option>6–12 Months</option>
                  <option>1–2 Years</option>
                  <option>2+ Years</option>
                </select>
              </div>
              <textarea className="dbs-form-textarea" placeholder="Tell Us About Your Project *" required></textarea>
              <button type="submit" className="dbs-btn-submit">
                {formStatus === "success" ? "✓ Sent Successfully!" : "Request a Design-Build Consultation →"}
              </button>
            </form>
            <div className="dbs-contact-info-side dbs-reveal dbs-reveal-delay-3">
              <div className="dbs-contact-info-card">
                <h5><FontAwesomeIcon icon={faPhone} /> Call Us</h5>
                <p>Speak directly with our Design-Build team.</p>
              </div>
              <div className="dbs-contact-info-card">
                <h5><FontAwesomeIcon icon={faEnvelope} /> Email Us</h5>
                <p>Send us your project details and we'll respond within one business day.</p>
              </div>
              <div className="dbs-contact-info-card">
                <h5><FontAwesomeIcon icon={faLocationDot} /> Visit Our Office</h5>
                <p>Schedule an in-person consultation at our headquarters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="dbs-final-cta-section" id="dbs-final-cta">
        <div className="dbs-container dbs-reveal">
          <h2>
            One Team. One Process.{" "}
            <span style={{ color: "#a6238f" }}>One Successful Outcome.</span>
          </h2>
          <div className="dbs-final-cta-buttons">
            <a href="#contactformsection" className="dbs-btn-filled-dark">Book a Consultation <FontAwesomeIcon icon={faArrowRight} /></a>
            <a href="tel:8133950000" className="dbs-btn-outline-dark">Call Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
