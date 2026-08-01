// page.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import "./residential-remodeling.css";
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
  faKitchenSet, // using faUtensils as fallback for kitchen
  faBath, // using faBath for bathroom
} from "@fortawesome/free-solid-svg-icons";

export default function ResidentialRemodelingPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rrs-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".rrs-reveal");
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
            el.parentElement?.classList.remove("rrs-active");
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
        prevAnswer.parentElement?.classList.remove("rrs-active");
      }
    }

    if (prev === index) {
      answerEl.style.maxHeight = "0px";
      answerEl.parentElement?.classList.remove("rrs-active");
      faqOpenIndexRef.current = null;
    } else {
      answerEl.style.maxHeight = answerEl.scrollHeight + 20 + "px";
      answerEl.parentElement?.classList.add("rrs-active");
      faqOpenIndexRef.current = index;
    }
  };

  // ── Data ──

  const trustItems = [
    "Custom Home Renovations",
    "Kitchen & Bathroom Remodeling",
    "Home Additions",
    "Quality Craftsmanship",
    "Professional Project Management",
  ];

  // Even number of services (22) – removed "Final Finishes"
  const servicesList = [
    "Whole Home Renovations",
    "Home Additions",
    "Kitchen Remodeling",
    "Bathroom Remodeling",
    "Basement Finishing",
    "Interior Renovations",
    "Living Room Remodeling",
    "Bedroom Renovations",
    "Home Office Construction",
    "Laundry Room Upgrades",
    "Flooring Installation",
    "Interior Painting",
    "Drywall & Finishes",
    "Custom Cabinet Installation",
    "Lighting Upgrades",
    "Electrical Improvements",
    "Window & Door Replacement",
    "Exterior Improvements",
    "Outdoor Living Spaces",
    "Structural Modifications",
    "Accessibility Improvements",
  ];

  const projectTypes = [
    {
      icon: faHouse,
      title: "Whole Home Renovations",
      desc: "Complete interior and exterior transformations designed to modernize your home while improving functionality and value.",
      image: "/images/services/Whole%20Home%20Renovations.jpg",
    },
    {
      icon: faUtensils,
      title: "Kitchen Remodeling",
      desc: "Beautiful, practical kitchens designed for everyday living, entertaining, and long-term performance.",
      image: "/images/services/Kitchen%20Remodeling.jpg",
    },
    {
      icon: faBath,
      title: "Bathroom Remodeling",
      desc: "Modern bathrooms with upgraded layouts, finishes, fixtures, and improved comfort.",
      image: "/images/services/Bathroom%20Remodeling.jpg",
    },
    {
      icon: faMaximize,
      title: "Home Additions",
      desc: "Expand your living space with thoughtfully designed additions that blend seamlessly with your existing home.",
      image: "/images/services/Home%20Additions.jpg",
    },
    {
      icon: faBuilding,
      title: "Basement Finishing",
      desc: "Transform unfinished spaces into functional living areas, entertainment rooms, home gyms, or guest suites.",
      image: "/images/services/Basement%20Finishing.jpg",
    },
    {
      icon: faBuildingColumns,
      title: "Interior Renovations",
      desc: "Refresh and modernize individual rooms while improving comfort, efficiency, and overall home appeal.",
      image: "/images/services/Interior%20Renovations.jpg",
    },
  ];

  // Who We Serve – only 6 items (removed last two)
  const clientTypes = [
    { icon: faUsers, title: "Homeowners", desc: "Families and individuals looking to improve their homes." },
    { icon: faHouse, title: "Luxury Home Owners", desc: "High-end residential properties and custom renovations." },
    { icon: faUsers, title: "Growing Families", desc: "Families needing more space and functional upgrades." },
    { icon: faChartLine, title: "Property Investors", desc: "Real estate investors maximizing property value." },
    { icon: faBuilding, title: "Vacation Home Owners", desc: "Seasonal properties and second homes." },
  ];

  // Process – 4 steps (merged Consultation & Planning)
  const processSteps = [
    {
      step: "1",
      title: "Consultation & Planning",
      desc: "We discuss your ideas, lifestyle needs, project goals, budget, and timeline, then develop layouts and construction plans.",
      icon: faClipboardList,
    },
    {
      step: "2",
      title: "Project Preparation",
      desc: "Scheduling, permits, procurement, and construction logistics are coordinated before work begins.",
      icon: faCalendar,
    },
    {
      step: "3",
      title: "Construction",
      desc: "Our skilled professionals complete every phase of the remodel with quality workmanship, clear communication, and respect for your home.",
      icon: faHardHat,
    },
    {
      step: "4",
      title: "Final Walkthrough",
      desc: "We review every detail, complete final inspections, and ensure your newly remodeled home exceeds expectations.",
      icon: faCircleCheck,
    },
  ];

  const reasons = [
    { title: "Personalized Solutions", desc: "Every remodel is tailored to your lifestyle, goals, and budget." },
    { title: "Superior Craftsmanship", desc: "Quality workmanship that combines beauty, durability, and functionality." },
    { title: "Clear Communication", desc: "You'll stay informed throughout every stage of your project." },
    { title: "Organized Project Management", desc: "Professional coordination that keeps your renovation moving smoothly." },
    { title: "Respect for Your Home", desc: "Clean, organized job sites and careful attention to protecting your property." },
    { title: "Lasting Value", desc: "Remodeling solutions designed to improve both daily living and long-term property value." },
  ];

  const benefitsList = [
    "Increase home value",
    "Improve functionality",
    "Modernize outdated spaces",
    "Expand living areas",
    "Improve energy efficiency",
    "Enhance comfort",
    "Personalize your home",
    "Reduce future maintenance",
    "Improve resale potential",
    "Create a home that grows with your family",
  ];

  const faqData = [
    {
      q: "What types of remodeling projects do you complete?",
      a: "We provide whole home renovations, kitchen remodeling, bathroom remodeling, home additions, basement finishing, and complete interior renovations.",
    },
    {
      q: "Can I live in my home during construction?",
      a: "Depending on the scope of the project, many homeowners can remain in their homes while work is completed. We'll discuss the best approach during planning.",
    },
    {
      q: "Do you handle permits?",
      a: "Yes. We coordinate permitting requirements and help ensure the project complies with local building regulations.",
    },
    {
      q: "Can you remodel older homes?",
      a: "Absolutely. We specialize in updating existing homes while preserving their character and improving performance.",
    },
    {
      q: "How long does a remodeling project take?",
      a: "Project timelines vary depending on size and complexity. We'll provide a realistic schedule before construction begins.",
    },
    {
      q: "Do you manage the entire project?",
      a: "Yes. Keentel General Contractors manages planning, coordination, construction, quality control, and final project completion.",
    },
  ];

  return (
    <main className="rrs-about-page">

      {/* ── Hero Section ── */}
      <section className="rrs-hero-section">
        <video
          className="rrs-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="/Video/Transform%20Commercial%20Spaces%20with%20Confidence.mp4"
            type="video/mp4"
          />
        </video>
        <div className="rrs-hero-overlay"></div>
        <div className="rrs-hero-content">
          <div className="rrs-hero-badge rrs-reveal">
            WHOLE HOME RENOVATIONS • HOME ADDITIONS • KITCHENS • BATHROOMS
          </div>
          <h1 className="rrs-hero-title rrs-reveal rrs-reveal-delay-1">
            <span className="service-hero-title-line">Transform Your Home with</span>
            <span className="service-hero-title-line rrs-highlight">
              Quality Craftsmanship &amp; Thoughtful Design
            </span>
          </h1>
          <p className="rrs-hero-subtitle rrs-reveal rrs-reveal-delay-2">
            Your home should reflect your lifestyle, support your family's needs, and provide lasting comfort. Keentel General Contractors delivers professional residential remodeling services that combine quality craftsmanship, functional design, and experienced project management to create beautiful living spaces built around the way you live.
          </p>
          <p className="rrs-hero-subtitle rrs-hero-subtitle-small rrs-reveal rrs-reveal-delay-2">
            Whether you're renovating a single room or transforming your entire home, we help bring your vision to life with confidence.
          </p>
          <div className="service-hero-bottom-row">
            <div className="rrs-hero-cta-group rrs-reveal rrs-reveal-delay-3">
              <a href="#contactformsection" className="rrs-btn rrs-btn-primary">
                Book a Consultation <FontAwesomeIcon icon={faArrowRight} className="rrs-btn-arrow" />
              </a>
              <a href="tel:8133950000" className="rrs-btn rrs-btn-secondary">
                Call Us <FontAwesomeIcon icon={faArrowRight} className="rrs-btn-arrow" />
              </a>
            </div>
            <ServiceHeroCredentials />
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="rrs-trust-bar-wrapper">
        <div className="rrs-trust-bar">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <span key={idx} className="rrs-trust-item">
              <span className="rrs-trust-check">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {item}
              {idx % trustItems.length !== trustItems.length - 1 && <span className="rrs-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="rrs-section-light" id="rrs-about">
        <div className="rrs-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="rrs-container">
          <div className="rrs-about-grid">
            <div className="rrs-reveal">
              <span className="rrs-section-label">About Our Residential Remodeling Services</span>
              <h2 className="rrs-section-heading">Creating Homes That Work Better for Everyday Living</h2>
              <p className="rrs-section-body">
                Your home is one of your most valuable investments, and remodeling is an opportunity to improve both its functionality and long-term value.
              </p>
              <p className="rrs-section-body">
                At Keentel General Contractors, we provide complete residential remodeling services tailored to your goals, lifestyle, and budget. From concept and planning through construction and finishing, our team manages every phase with attention to detail, clear communication, and a commitment to quality.
              </p>
              <p className="rrs-section-body">
                Whether you're modernizing an older home, creating more living space, or upgrading key areas, we deliver remodeling solutions designed for lasting beauty and performance.
              </p>
            </div>
            <div className="rrs-about-visual rrs-reveal rrs-reveal-delay-2">
              <div className="rrs-about-bg-dot" style={{ top: "5%", left: "5%" }} />
              <div className="rrs-about-bg-dot rrs-dot-2" />
              <div className="rrs-about-floating-card">
                <div className="rrs-card-icon-large">
                  <FontAwesomeIcon icon={faHardHat} />
                </div>
                <h4>Residential Remodeling Experts</h4>
                <p>We transform homes with quality craftsmanship, thoughtful design, and professional project management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Remodel Your Home? (Dark) ── */}
      <WhyKeentel />

      <section className="rrs-section-dark" id="rrs-why-matters">
        <div className="rrs-decor-ring" style={{ width: 300, height: 300, top: -60, right: -80 }} />
        <div className="rrs-container">
          <span className="rrs-section-label rrs-reveal">Why Remodel Your Home?</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">Improve the Way You Live</h2>
          <p className="rrs-section-body rrs-reveal rrs-reveal-delay-1">
            Residential remodeling allows you to create spaces that better fit your family's needs without the expense and disruption of moving.
          </p>
          <p className="rrs-section-body rrs-reveal rrs-reveal-delay-1">
            Whether you're expanding your home, updating outdated interiors, improving functionality, or increasing property value, remodeling provides a practical way to make your home more comfortable, efficient, and enjoyable for years to come.
          </p>
          <div className="rrs-matters-grid">
            {["Increased Home Value", "Improved Functionality", "Enhanced Comfort", "Modern Living Spaces"].map((title, i) => (
              <div className={`rrs-matter-card rrs-reveal rrs-reveal-delay-${i + 2}`} key={i}>
                <span className="rrs-matter-number">0{i + 1}</span>
                <h4>{title}</h4>
                <p>Remodeling delivers lasting benefits for your family and your investment.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="rrs-section-light-alt" id="rrs-services">
        <div className="rrs-container">
          <div className="rrs-services-layout">
            <div className="rrs-services-left rrs-reveal">
              <span className="rrs-section-label">What's Included</span>
              <h2 className="rrs-section-heading">Complete Residential Remodeling Solutions</h2>
              <p className="rrs-section-body">
                Our services cover every aspect of your residential remodeling project, from design to final finishes, tailored to your family's needs.
              </p>
              <div className="rrs-services-image-wrapper">
                <img
                  src="/images/services/Interior%20Renovations.jpg"
                  alt="Residential Remodeling services"
                  className="rrs-services-image"
                />
              </div>
            </div>
            <div className="rrs-services-right rrs-reveal rrs-reveal-delay-2">
              <div className="rrs-services-grid">
                {servicesList.map((service, idx) => (
                  <div className="rrs-service-item" key={idx}>
                    <span className="rrs-service-dot" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Types ── */}
      <section className="rrs-section-dark" id="rrs-project-types">
        <div className="rrs-container">
          <span className="rrs-section-label rrs-reveal">Project Types</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">Remodeling Solutions for Every Home</h2>
          <div className="rrs-project-types-grid">
            {projectTypes.map((type, idx) => (
              <div className={`rrs-project-type-card rrs-reveal rrs-reveal-delay-${idx + 2}`} key={idx}>
                <div className="rrs-project-type-image">
                  <Image
                    src={type.image}
                    alt={`${type.title} residential remodeling project`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="rrs-project-type-photo"
                  />
                </div>
                <div className="rrs-project-type-content">
                  <h4>{type.title}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rrs-project-types-cta rrs-reveal">
            <a href="#contactformsection" className="rrs-btn rrs-btn-primary">
              Schedule Your Consultation <FontAwesomeIcon icon={faArrowRight} className="rrs-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Who We Serve (6 cards) ── */}
      <section className="rrs-section-light" id="rrs-who-we-serve">
        <div className="rrs-container">
          <span className="rrs-section-label rrs-reveal">Who We Serve</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">Residential Remodeling Designed Around Your Lifestyle</h2>
          <div className="rrs-clients-grid">
            {clientTypes.map((client, idx) => (
              <div className="rrs-client-card rrs-reveal rrs-reveal-delay-2" key={idx}>
                <div className="rrs-client-icon">
                  <FontAwesomeIcon icon={client.icon} />
                </div>
                <h4>{client.title}</h4>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
          <p className="rrs-section-body rrs-reveal" style={{ marginTop: 20 }}>
            Whether you're updating a single room or planning a complete home transformation, Keentel General Contractors delivers remodeling solutions that combine thoughtful planning with exceptional craftsmanship.
          </p>
        </div>
      </section>

      {/* ── Process (4 steps) ── */}
      <section className="rrs-section-dark" id="rrs-process">
        <div className="rrs-container">
          <span className="rrs-section-label rrs-reveal">Our Remodeling Process</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">A Seamless Experience from Concept to Completion</h2>
          <div className="rrs-process-horizontal">
            {processSteps.map((step, idx) => (
              <div className={`rrs-process-step rrs-reveal rrs-reveal-delay-${idx + 1}`} key={idx}>
                <div className="rrs-process-step-number">{step.step}</div>
                <div className="rrs-process-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Keentel ── */}
      <section className="rrs-section-light-alt" id="rrs-why-choose">
        <div className="rrs-container">
          <span className="rrs-section-label rrs-reveal">Why Choose Keentel General Contractors</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">Remodeling Built Around Quality, Comfort & Long-Term Value</h2>
          <div className="rrs-choose-grid">
            {reasons.map((reason, idx) => (
              <div className={`rrs-choose-card rrs-reveal rrs-reveal-delay-${idx + 2}`} key={idx}>
                <h4>{reason.title}</h4>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="rrs-section-dark" id="rrs-benefits">
        <div className="rrs-container">
          <span className="rrs-section-label rrs-reveal">Benefits of Residential Remodeling</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">Invest in the Home You Already Love</h2>
          <div className="rrs-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <div className="rrs-benefit-item rrs-reveal" key={idx}>
                <span className="rrs-benefit-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="rrs-section-light" id="rrs-faq" ref={faqSectionRef}>
        <div className="rrs-container rrs-faq-container">
          <span className="rrs-section-label rrs-reveal">Frequently Asked Questions</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">Residential Remodeling FAQs</h2>
          <div className="rrs-faq-list">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="rrs-faq-item rrs-reveal"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFaq(idx);
                }}
              >
                <div className="rrs-faq-question">
                  <span>{faq.q}</span>
                  <span className="rrs-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div
                  className="rrs-faq-answer"
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
      <section className="rrs-section-dark" id="rrs-contact">
        <div className="rrs-decor-orb" style={{ width: 280, height: 280, top: "15%", right: "-6%" }} />
        <div className="rrs-container">
          <span className="rrs-section-label rrs-reveal">Contact Section</span>
          <h2 className="rrs-section-heading rrs-reveal rrs-reveal-delay-1">Let's Build the Home You've Always Wanted</h2>
          <p className="rrs-section-body rrs-reveal rrs-reveal-delay-1">
            Whether you're planning a kitchen renovation, expanding your home, or transforming your entire living space, Keentel General Contractors is ready to help. Share your ideas with our team, and we'll create a remodeling solution designed around your goals.
          </p>
          <div className="rrs-contact-grid">
            <form className="rrs-contact-form rrs-reveal rrs-reveal-delay-2" ref={formRef} onSubmit={handleFormSubmit}>
              <div className="rrs-form-row">
                <input type="text" className="rrs-form-input" placeholder="Full Name *" required />
                <input type="text" className="rrs-form-input" placeholder="Email Address *" required />
              </div>
              <div className="rrs-form-row">
                <input type="tel" className="rrs-form-input" placeholder="Phone Number" />
                <input type="text" className="rrs-form-input" placeholder="Property Address" />
              </div>
              <div className="rrs-form-row">
                <select className="rrs-form-select">
                  <option value="">Remodeling Service Needed</option>
                  <option>Whole Home Renovation</option>
                  <option>Home Addition</option>
                  <option>Kitchen Remodeling</option>
                  <option>Bathroom Remodeling</option>
                  <option>Basement Finishing</option>
                  <option>Interior Renovation</option>
                  <option>Other</option>
                </select>
                <select className="rrs-form-select">
                  <option value="">Estimated Budget</option>
                  <option>Under $50K</option>
                  <option>$50K – $100K</option>
                  <option>$100K – $250K</option>
                  <option>$250K – $500K</option>
                  <option>$500K+</option>
                </select>
              </div>
              <div className="rrs-form-row">
                <select className="rrs-form-select">
                  <option value="">Desired Start Date</option>
                  <option>Immediately</option>
                  <option>0–3 Months</option>
                  <option>3–6 Months</option>
                  <option>6–12 Months</option>
                  <option>Undecided</option>
                </select>
              </div>
              <textarea className="rrs-form-textarea" placeholder="Tell Us About Your Project *" required></textarea>
              <button type="submit" className="rrs-btn-submit">
                {formStatus === "success" ? "✓ Sent Successfully!" : "Request a Remodeling Consultation →"}
              </button>
            </form>
            <div className="rrs-contact-info-side rrs-reveal rrs-reveal-delay-3">
              <div className="rrs-contact-info-card">
                <h5><FontAwesomeIcon icon={faPhone} /> Call Us</h5>
                <p>Speak directly with our remodeling team.</p>
              </div>
              <div className="rrs-contact-info-card">
                <h5><FontAwesomeIcon icon={faEnvelope} /> Email Us</h5>
                <p>Send us your project details and we'll respond within one business day.</p>
              </div>
              <div className="rrs-contact-info-card">
                <h5><FontAwesomeIcon icon={faLocationDot} /> Visit Our Office</h5>
                <p>Schedule an in-person consultation at our headquarters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="rrs-final-cta-section" id="rrs-final-cta">
        <div className="rrs-container rrs-reveal">
          <h2>
            Reimagine Your Home <span style={{ color: "#a6238f" }}>with Confidence</span>
          </h2>
          <div className="rrs-final-cta-buttons">
            <a href="#contactformsection" className="rrs-btn-filled-dark">Book a Consultation <FontAwesomeIcon icon={faArrowRight} /></a>
            <a href="tel:8133950000" className="rrs-btn-outline-dark">Call Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
