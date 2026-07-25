// page.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import "./emergency-restoration.css";
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
  faStore,
  faUtensils,
  faStethoscope,
  faFire,
  faWater,
  faCloudRain,
  faWind,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

export default function EmergencyRestorationPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ers-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".ers-reveal");
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
            el.parentElement?.classList.remove("ers-active");
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
        prevAnswer.parentElement?.classList.remove("ers-active");
      }
    }

    if (prev === index) {
      answerEl.style.maxHeight = "0px";
      answerEl.parentElement?.classList.remove("ers-active");
      faqOpenIndexRef.current = null;
    } else {
      answerEl.style.maxHeight = answerEl.scrollHeight + 20 + "px";
      answerEl.parentElement?.classList.add("ers-active");
      faqOpenIndexRef.current = index;
    }
  };

  // ── Data ──

  const trustItems = [
    "Rapid Emergency Response",
    "Complete Property Restoration",
    "Insurance Claim Support",
    "Licensed & Insured",
    "Quality Reconstruction",
  ];

  // Services – 20 items (even)
  const servicesList = [
    "Emergency Property Assessment",
    "Site Stabilization",
    "Temporary Protection",
    "Fire Damage Restoration",
    "Water Damage Restoration",
    "Storm Damage Restoration",
    "Wind Damage Repairs",
    "Structural Damage Repairs",
    "Interior Reconstruction",
    "Exterior Reconstruction",
    "Roof Repairs",
    "Wall & Ceiling Restoration",
    "Flooring Replacement",
    "Electrical Repairs",
    "Mechanical Coordination",
    "Demolition & Debris Removal",
    "Insurance Claim Assistance",
    "Project Management",
    "Final Reconstruction",
    "Quality Inspections",
  ];

  const projectTypes = [
    {
      icon: faFire,
      title: "Fire Damage",
      desc: "Repairing structural damage, rebuilding affected spaces, and restoring your property after fire-related incidents.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/38/7f/c9/07/ca/v1_E10/E10AQCWB.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=0c948850b392c0ae2a54badb9913435d46fd281ebfc73bd19b935409b593367e",
    },
    {
      icon: faWater,
      title: "Water Damage",
      desc: "Restoring properties affected by plumbing failures, flooding, leaks, and water intrusion.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/1a/da/d1/88/c0/v1_E10/E10CXB3Q.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=f444a31362c6942bb657dfee8c6d3150c8173a962660b5401a735b9ac69aafa8",
    },
    {
      icon: faCloudRain,
      title: "Storm Damage",
      desc: "Repairing damage caused by high winds, heavy rain, hail, fallen trees, and severe weather events.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/1da902e5-8bb7-4bc2-883f-e253ca487511/a1a5d319-de7c-4538-a255-42a41016f7fa.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=67e91452b6cb3cbf1373feb59b41849d9a27c86d06e45946b0a69adb60daa953",
    },
    {
      icon: faBuilding,
      title: "Structural Damage",
      desc: "Restoring buildings affected by impact damage, structural movement, or compromised building components.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/be/9f/e9/9c/df/v1_E10/E10BW9BS.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=edca7417d1de50a85d3ffc00879c90929aab910d11f397c23b8a79a30d0fa15b",
    },
    {
      icon: faBuildingColumns,
      title: "Commercial Property Damage",
      desc: "Helping businesses recover quickly while minimizing operational downtime.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/9a/c3/7a/15/0e/v1_E10/E109TMD4.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3a023dd7818f768211c3022ff35b0b7c46c2b59718bf3860d72efc4496042f44",
    },
    {
      icon: faHouse,
      title: "Residential Property Damage",
      desc: "Restoring homes with careful attention to quality, safety, and long-term durability.",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/12/b7/a7/70/3d/v1_E11/E117XMXQ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=82d802a8dd695cb8f143f605732dd6cf900e171af8f4c5aefc07c96e30932185",
    },
  ];

  // Who We Serve – removed last two (Educational Facilities, Healthcare Buildings) → 10 items
  const clientTypes = [
    { icon: faUsers, title: "Homeowners", desc: "Families and individuals recovering from property damage." },
    { icon: faBuilding, title: "Commercial Property Owners", desc: "Owners of office, retail, and mixed-use properties." },
    { icon: faUsers, title: "Business Owners", desc: "Companies needing rapid restoration to resume operations." },
    { icon: faClipboardList, title: "Property Managers", desc: "Managers of multi-tenant and residential properties." },
    { icon: faBuildingColumns, title: "Multi-Family Properties", desc: "Apartment complexes and condominium buildings." },
    { icon: faIndustry, title: "Industrial Facilities", desc: "Warehouses, plants, and operational facilities." },
    { icon: faBuilding, title: "Office Buildings", desc: "Corporate and professional office spaces." },
    { icon: faStore, title: "Retail Centers", desc: "Shopping centers, stores, and commercial retail spaces." },
    { icon: faUtensils, title: "Restaurants", desc: "Dining establishments and food service facilities." },
    { icon: faHotel, title: "Hospitality Properties", desc: "Hotels, resorts, and lodging facilities." },
  ];

  // Process – 4 steps (merged Emergency Response & Assessment)
  const processSteps = [
    {
      step: "1",
      title: "Emergency Response & Assessment",
      desc: "We quickly assess the situation, secure the property, evaluate structural conditions, and develop an immediate action plan.",
      icon: faClipboardList,
    },
    {
      step: "2",
      title: "Stabilization",
      desc: "Temporary protection measures help prevent additional damage while restoration planning is completed.",
      icon: faShieldAlt,
    },
    {
      step: "3",
      title: "Restoration & Reconstruction",
      desc: "Damaged materials are repaired or replaced, and reconstruction begins using quality workmanship and professional project management.",
      icon: faHardHat,
    },
    {
      step: "4",
      title: "Final Inspection",
      desc: "We complete detailed inspections to ensure your property is safe, functional, and fully restored.",
      icon: faCircleCheck,
    },
  ];

  const reasons = [
    { title: "Rapid Response", desc: "Fast action to help reduce additional property damage." },
    { title: "Complete Restoration", desc: "From emergency stabilization to final reconstruction, we manage the entire process." },
    { title: "Experienced Project Management", desc: "Organized planning and professional coordination throughout every stage." },
    { title: "Insurance Claim Support", desc: "We work alongside property owners to help simplify the restoration process." },
    { title: "Quality Reconstruction", desc: "Every repair is completed with attention to craftsmanship, durability, and long-term performance." },
    { title: "Clear Communication", desc: "You'll receive consistent updates and reliable guidance throughout the project." },
  ];

  const benefitsList = [
    "Reduce additional property damage",
    "Improve safety",
    "Accelerate recovery",
    "Restore property value",
    "Simplify project coordination",
    "Improve reconstruction quality",
    "Support insurance documentation",
    "Reduce business downtime",
    "Restore homes more efficiently",
    "Provide long-term peace of mind",
  ];

  const faqData = [
    {
      q: "What types of emergencies do you respond to?",
      a: "We provide restoration services for fire, water, storm, wind, structural, and accidental property damage.",
    },
    {
      q: "How quickly should restoration begin?",
      a: "As soon as possible. Immediate action helps reduce additional damage and supports a faster recovery.",
    },
    {
      q: "Can you rebuild damaged areas?",
      a: "Yes. We provide complete reconstruction services after stabilization and damage assessment.",
    },
    {
      q: "Do you work with insurance claims?",
      a: "Yes. We assist property owners by providing documentation and coordinating with insurance providers throughout the restoration process.",
    },
    {
      q: "Do you provide commercial restoration?",
      a: "Absolutely. We restore commercial, industrial, institutional, and residential properties.",
    },
    {
      q: "Can you manage the entire restoration project?",
      a: "Yes. Keentel General Contractors oversees assessment, stabilization, reconstruction, quality control, and final project completion.",
    },
  ];

  return (
    <main className="ers-about-page">

      {/* ── Hero Section ── */}
      <section className="ers-hero-section">
        <div className="ers-hero-image"></div>
        <div className="ers-hero-overlay"></div>
        <div className="ers-hero-content">
          <div className="ers-hero-badge ers-reveal">
            <span className="ers-hero-badge-dot" />
            FIRE • WATER • STORM • STRUCTURAL DAMAGE • EMERGENCY REPAIRS
          </div>
          <h1 className="ers-hero-title ers-reveal ers-reveal-delay-1">
            Fast Response. Reliable Restoration. <span className="ers-highlight">Complete Recovery.</span>
          </h1>
          <p className="ers-hero-subtitle ers-reveal ers-reveal-delay-2">
            When disaster strikes, every minute matters. Keentel General Contractors provides professional emergency restoration services to help homeowners, businesses, and property owners recover quickly after fire, water, storm, structural, or accidental damage.
          </p>
          <p className="ers-hero-subtitle ers-hero-subtitle-small ers-reveal ers-reveal-delay-2">
            Our team responds with urgency, develops a clear recovery plan, and manages every stage of the restoration process—from emergency stabilization through final reconstruction.
          </p>
          <div className="ers-hero-cta-group ers-reveal ers-reveal-delay-3">
            <a href="#contactformsection" className="ers-btn ers-btn-primary">
              Request Emergency Assistance <FontAwesomeIcon icon={faArrowRight} className="ers-btn-arrow" />
            </a>
            <a href="#contactformsection" className="ers-btn ers-btn-secondary">
              Speak With Our Team <FontAwesomeIcon icon={faArrowRight} className="ers-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="ers-trust-bar-wrapper">
        <div className="ers-trust-bar">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <span key={idx} className="ers-trust-item">
              <span className="ers-trust-check">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {item}
              {idx % trustItems.length !== trustItems.length - 1 && <span className="ers-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="ers-section-light" id="ers-about">
        <div className="ers-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="ers-container">
          <div className="ers-about-grid">
            <div className="ers-reveal">
              <span className="ers-section-label">About Our Emergency Restoration Services</span>
              <h2 className="ers-section-heading">Restoring More Than Buildings—Restoring Peace of Mind</h2>
              <p className="ers-section-body">
                Unexpected property damage can disrupt your home, business, and daily operations. Recovering quickly requires more than repairs—it requires experienced professionals who can coordinate emergency response, restoration, reconstruction, and project management under one roof.
              </p>
              <p className="ers-section-body">
                At Keentel General Contractors, we provide complete emergency restoration services designed to stabilize damaged properties, minimize further loss, and restore buildings safely and efficiently. Whether the damage is caused by fire, water, severe weather, or structural failure, our team works quickly to return your property to a safe, functional, and fully restored condition.
              </p>
            </div>
            <div className="ers-about-visual ers-reveal ers-reveal-delay-2">
              <div className="ers-about-bg-dot" style={{ top: "5%", left: "5%" }} />
              <div className="ers-about-bg-dot ers-dot-2" />
              <div className="ers-about-floating-card">
                <div className="ers-card-icon-large">
                  <FontAwesomeIcon icon={faHardHat} />
                </div>
                <h4>Emergency Restoration Experts</h4>
                <p>We respond quickly, restore thoroughly, and help you recover with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── When to Call Us (Dark) ── */}
      <WhyKeentel />

      <section className="ers-section-dark" id="ers-why-matters">
        <div className="ers-decor-ring" style={{ width: 300, height: 300, top: -60, right: -80 }} />
        <div className="ers-container">
          <span className="ers-section-label ers-reveal">When to Call Us</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">Immediate Action Can Reduce Long-Term Damage</h2>
          <p className="ers-section-body ers-reveal ers-reveal-delay-1">
            Emergency restoration should begin as soon as possible after property damage occurs. Prompt response helps protect the property from further damage, improve safety, reduce restoration costs, and speed up recovery.
          </p>
          <p className="ers-section-body ers-reveal ers-reveal-delay-1">
            The sooner restoration begins, the greater the opportunity to protect your investment and restore operations faster.
          </p>
          <div className="ers-matters-grid">
            {["Protect from Further Damage", "Improve Safety", "Reduce Restoration Costs", "Speed Up Recovery"].map((title, i) => (
              <div className={`ers-matter-card ers-reveal ers-reveal-delay-${i + 2}`} key={i}>
                <span className="ers-matter-number">0{i + 1}</span>
                <h4>{title}</h4>
                <p>Early action minimizes loss and accelerates the path to recovery.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="ers-section-light-alt" id="ers-services">
        <div className="ers-container">
          <div className="ers-services-layout">
            <div className="ers-services-left ers-reveal">
              <span className="ers-section-label">What's Included</span>
              <h2 className="ers-section-heading">Complete Emergency Restoration Services</h2>
              <p className="ers-section-body">
                From emergency response to complete rebuilding, we manage the entire restoration process with professionalism and speed.
              </p>
              <div className="ers-services-image-wrapper">
                <img
                  src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/ed/6b/a7/6e/48/v1_E11/E118CG4S.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=60127bdca6734a11de17a7023704ddd421e2cc6594733ed849a27600523f5d28"
                  alt="Emergency Restoration services"
                  className="ers-services-image"
                />
              </div>
            </div>
            <div className="ers-services-right ers-reveal ers-reveal-delay-2">
              <div className="ers-services-grid">
                {servicesList.map((service, idx) => (
                  <div className="ers-service-item" key={idx}>
                    <span className="ers-service-dot" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Types of Damage We Restore ── */}
      <section className="ers-section-dark" id="ers-project-types">
        <div className="ers-container">
          <span className="ers-section-label ers-reveal">Types of Damage We Restore</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">Professional Restoration for Every Emergency</h2>
          <div className="ers-project-types-grid">
            {projectTypes.map((type, idx) => (
              <div className={`ers-project-type-card ers-reveal ers-reveal-delay-${idx + 2}`} key={idx}>
                <div className="ers-project-type-image" style={{ backgroundImage: `url(${type.image})` }} />
                <div className="ers-project-type-content">
                  <div className="ers-project-type-icon">
                    <FontAwesomeIcon icon={type.icon} />
                  </div>
                  <h4>{type.title}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ers-project-types-cta ers-reveal">
            <a href="#contactformsection" className="ers-btn ers-btn-primary">
              Request Emergency Assistance <FontAwesomeIcon icon={faArrowRight} className="ers-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Who We Serve (10 cards) ── */}
      <section className="ers-section-light" id="ers-who-we-serve">
        <div className="ers-container">
          <span className="ers-section-label ers-reveal">Who We Serve</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">Restoration Solutions for Homes & Businesses</h2>
          <div className="ers-clients-grid">
            {clientTypes.map((client, idx) => (
              <div className="ers-client-card ers-reveal ers-reveal-delay-2" key={idx}>
                <div className="ers-client-icon">
                  <FontAwesomeIcon icon={client.icon} />
                </div>
                <h4>{client.title}</h4>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
          <p className="ers-section-body ers-reveal" style={{ marginTop: 20 }}>
            No matter the size or complexity of the damage, Keentel General Contractors provides dependable restoration solutions tailored to your property's needs.
          </p>
        </div>
      </section>

      {/* ── Process (4 steps) ── */}
      <section className="ers-section-dark" id="ers-process">
        <div className="ers-container">
          <span className="ers-section-label ers-reveal">Our Restoration Process</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">A Clear Path from Emergency to Recovery</h2>
          <div className="ers-process-horizontal">
            {processSteps.map((step, idx) => (
              <div className={`ers-process-step ers-reveal ers-reveal-delay-${idx + 1}`} key={idx}>
                <div className="ers-process-step-icon">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <div className="ers-process-step-number">{step.step}</div>
                <div className="ers-process-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Keentel ── */}
      <section className="ers-section-light-alt" id="ers-why-choose">
        <div className="ers-container">
          <span className="ers-section-label ers-reveal">Why Choose Keentel General Contractors</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">Trusted When It Matters Most</h2>
          <div className="ers-choose-grid">
            {reasons.map((reason, idx) => (
              <div className={`ers-choose-card ers-reveal ers-reveal-delay-${idx + 2}`} key={idx}>
                <h4>{reason.title}</h4>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="ers-section-dark" id="ers-benefits">
        <div className="ers-container">
          <span className="ers-section-label ers-reveal">Benefits of Professional Restoration</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">Recover Faster with the Right Team</h2>
          <div className="ers-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <div className="ers-benefit-item ers-reveal" key={idx}>
                <span className="ers-benefit-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ers-section-light" id="ers-faq" ref={faqSectionRef}>
        <div className="ers-container ers-faq-container">
          <span className="ers-section-label ers-reveal">Frequently Asked Questions</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">Emergency Restoration FAQs</h2>
          <div className="ers-faq-list">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="ers-faq-item ers-reveal"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFaq(idx);
                }}
              >
                <div className="ers-faq-question">
                  <span>{faq.q}</span>
                  <span className="ers-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div
                  className="ers-faq-answer"
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
      <section className="ers-section-dark" id="ers-contact">
        <div className="ers-decor-orb" style={{ width: 280, height: 280, top: "15%", right: "-6%" }} />
        <div className="ers-container">
          <span className="ers-section-label ers-reveal">Contact Section</span>
          <h2 className="ers-section-heading ers-reveal ers-reveal-delay-1">We're Ready When You Need Us</h2>
          <p className="ers-section-body ers-reveal ers-reveal-delay-1">
            If your property has been affected by fire, water, storm, or structural damage, don't wait to begin the recovery process. Contact Keentel General Contractors today, and our team will help you assess the damage, develop a restoration plan, and restore your property with confidence.
          </p>
          <div className="ers-contact-grid">
            <form className="ers-contact-form ers-reveal ers-reveal-delay-2" ref={formRef} onSubmit={handleFormSubmit}>
              <div className="ers-form-row">
                <input type="text" className="ers-form-input" placeholder="Full Name *" required />
                <input type="text" className="ers-form-input" placeholder="Company (Optional)" />
              </div>
              <div className="ers-form-row">
                <input type="email" className="ers-form-input" placeholder="Email Address *" required />
                <input type="tel" className="ers-form-input" placeholder="Phone Number" />
              </div>
              <div className="ers-form-row">
                <input type="text" className="ers-form-input" placeholder="Property Address" />
                <select className="ers-form-select">
                  <option value="">Type of Damage</option>
                  <option>Fire Damage</option>
                  <option>Water Damage</option>
                  <option>Storm Damage</option>
                  <option>Wind Damage</option>
                  <option>Structural Damage</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="ers-form-row">
                <select className="ers-form-select">
                  <option value="">Is This an Emergency?</option>
                  <option>Yes – Immediate Response Needed</option>
                  <option>No – Planning for Restoration</option>
                  <option>Unsure</option>
                </select>
              </div>
              <textarea className="ers-form-textarea" placeholder="Tell Us About the Damage *" required></textarea>
              <button type="submit" className="ers-btn-submit">
                {formStatus === "success" ? "✓ Sent Successfully!" : "Request Emergency Restoration →"}
              </button>
            </form>
            <div className="ers-contact-info-side ers-reveal ers-reveal-delay-3">
              <div className="ers-contact-info-card">
                <h5><FontAwesomeIcon icon={faPhone} /> Call Us</h5>
                <p>Speak directly with our emergency response team.</p>
              </div>
              <div className="ers-contact-info-card">
                <h5><FontAwesomeIcon icon={faEnvelope} /> Email Us</h5>
                <p>Send us your property details and we'll respond immediately.</p>
              </div>
              <div className="ers-contact-info-card">
                <h5><FontAwesomeIcon icon={faLocationDot} /> Visit Our Office</h5>
                <p>Schedule an in-person consultation at our headquarters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="ers-final-cta-section" id="ers-final-cta">
        <div className="ers-container ers-reveal">
          <h2>
            Restore Your Property <span style={{ color: "#a6238f" }}>with Confidence</span>
          </h2>
          <p>
            Property damage can be overwhelming, but you don't have to face the recovery process alone. At Keentel General Contractors, we provide responsive emergency restoration, professional project management, and quality reconstruction to help you recover quickly and move forward with confidence.
          </p>
          <p className="ers-final-cta-bold">Let's restore your property together.</p>
          <div className="ers-final-cta-buttons">
            <a href="#contactformsection" className="ers-btn-filled-dark">Get Emergency Help <FontAwesomeIcon icon={faArrowRight} /></a>
            <a href="#contactformsection" className="ers-btn-outline-dark">Contact Keentel General Contractors</a>
          </div>
        </div>
      </section>
    </main>
  );
}
