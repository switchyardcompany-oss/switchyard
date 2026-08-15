// page.tsx – Commercial Remodeling
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import "./commercial-remodeling.css";
import "../service-hero.css";
import "../project-capabilities.css";
import WhyKeentel from "@/components/WhyKeentel";
import ServiceHeroCredentials from "@/components/ServiceHeroCredentials";
import { submitLead } from "@/lib/lead-client";

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
} from "@fortawesome/free-solid-svg-icons";

export default function CommercialRemodelingPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("crs-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".crs-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFormStatus("sending");
    const result = await submitLead({ formSource: "commercial-remodeling", fullName: data.get("fullName"), company: data.get("company"), email: data.get("email"), phone: data.get("phone"), location: data.get("location"), projectType: data.get("projectType"), message: data.get("details") });
    if (result.ok) { setFormStatus("success"); formRef.current?.reset(); }
    else setFormStatus("error");
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
            el.parentElement?.classList.remove("crs-active");
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
        prevAnswer.parentElement?.classList.remove("crs-active");
      }
    }

    if (prev === index) {
      answerEl.style.maxHeight = "0px";
      answerEl.parentElement?.classList.remove("crs-active");
      faqOpenIndexRef.current = null;
    } else {
      answerEl.style.maxHeight = answerEl.scrollHeight + 20 + "px";
      answerEl.parentElement?.classList.add("crs-active");
      faqOpenIndexRef.current = index;
    }
  };

  // ── Data ──

  const trustItems = [
    "Office Renovations",
    "Tenant Improvements",
    "Occupied Space Remodeling",
    "Professional Project Management",
    "Minimal Business Disruption",
  ];

  // Even number of services (22) – removed "Final Finishes"
  const servicesList = [
    "Office Renovations",
    "Tenant Improvements",
    "Retail Remodeling",
    "Restaurant Renovations",
    "Hospitality Renovations",
    "Healthcare Facility Upgrades",
    "Educational Facility Improvements",
    "Interior Demolition",
    "Space Reconfiguration",
    "Conference Rooms",
    "Reception Areas",
    "Break Rooms",
    "Restroom Renovations",
    "Flooring Installation",
    "Ceiling Systems",
    "Drywall & Finishes",
    "Painting",
    "Lighting Upgrades",
    "Electrical Improvements",
    "Mechanical Coordination",
    "Accessibility Improvements",
    "Exterior Enhancements",
  ];

  const projectTypes = [
    {
      icon: faBuilding,
      title: "Office Renovations",
      desc: "Create productive workspaces that improve collaboration, employee experience, and operational efficiency.",
      image: "/images/services/office-renovations.webp",
    },
    {
      icon: faBuildingColumns,
      title: "Tenant Improvements",
      desc: "Customize leased commercial spaces to meet business requirements and branding goals.",
      image: "/images/services/tenant-improvements.webp",
    },
    {
      icon: faStore,
      title: "Retail Spaces",
      desc: "Modernize retail environments to improve customer experience and support business growth.",
      image: "/images/services/retail-spaces.webp",
    },
    {
      icon: faUtensils,
      title: "Restaurants & Hospitality",
      desc: "Renovations designed to improve functionality, aesthetics, and guest experience.",
      image: "/images/services/restaurants-hospitality.jpg",
    },
    {
      icon: faStethoscope,
      title: "Healthcare Facilities",
      desc: "Interior improvements completed with careful planning to support ongoing operations.",
      image: "/images/services/healthcare-facilities.webp",
    },
    {
      icon: faSchool,
      title: "Educational & Institutional Buildings",
      desc: "Facility upgrades designed around safety, functionality, and long-term durability.",
      image: "/images/services/educational-institutional-buildings.jpg",
    },
  ];

  // Who We Serve – only 10 items (removed last two)
  const clientTypes = [
    { icon: faBuilding, title: "Commercial Property Owners", desc: "Owners of office, retail, and mixed-use properties." },
    { icon: faBuildingColumns, title: "Office Buildings", desc: "Corporate offices and professional workspaces." },
    { icon: faStore, title: "Retail Centers", desc: "Shopping centers, stores, and commercial retail spaces." },
    { icon: faUtensils, title: "Restaurants", desc: "Dining establishments and food service facilities." },
    { icon: faHotel, title: "Hotels", desc: "Hospitality properties and lodging facilities." },
    { icon: faStethoscope, title: "Medical Offices", desc: "Clinics and medical office buildings." },
    { icon: faHospital, title: "Healthcare Facilities", desc: "Hospitals and specialized care centers." },
    { icon: faSchool, title: "Educational Institutions", desc: "Schools, universities, and training centers." },
    { icon: faIndustry, title: "Industrial Offices", desc: "Administrative spaces within industrial facilities." },
    { icon: faClipboardList, title: "Property Management Companies", desc: "Firms overseeing multi-tenant properties." },
  ];

  // Process – 4 steps (combined Consultation & Project Planning)
  const processSteps = [
    {
      step: "1",
      title: "Consultation & Planning",
      desc: "We learn about your business, goals, operational needs, timeline, and budget, then develop a remodeling strategy.",
      icon: faClipboardList,
    },
    {
      step: "2",
      title: "Design & Coordination",
      desc: "We coordinate layouts, finishes, materials, and project logistics before construction begins.",
      icon: faRulerCombined,
    },
    {
      step: "3",
      title: "Construction",
      desc: "Our experienced team completes demolition, renovations, installations, and finishing work while maintaining quality and safety.",
      icon: faHardHat,
    },
    {
      step: "4",
      title: "Final Walkthrough",
      desc: "We complete inspections, address final details, and ensure your remodeled space is ready for occupancy.",
      icon: faCircleCheck,
    },
  ];

  const reasons = [
    { title: "Business-Focused Planning", desc: "Construction strategies designed around your operational requirements." },
    { title: "Minimal Downtime", desc: "Scheduling and project coordination that helps reduce disruptions." },
    { title: "Skilled Craftsmanship", desc: "High-quality workmanship from demolition through final finishes." },
    { title: "Transparent Communication", desc: "Regular project updates and proactive coordination." },
    { title: "Quality Materials", desc: "Durable construction solutions selected for long-term performance." },
    { title: "Complete Project Management", desc: "One experienced team managing every stage of the renovation." },
  ];

  const benefitsList = [
    "Modernize outdated facilities",
    "Improve workplace productivity",
    "Enhance customer experience",
    "Increase property value",
    "Support business growth",
    "Improve operational efficiency",
    "Refresh your brand image",
    "Optimize space utilization",
    "Extend building life",
    "Reduce future maintenance costs",
  ];

  const faqData = [
    {
      q: "What types of commercial properties do you remodel?",
      a: "We remodel offices, retail spaces, restaurants, healthcare facilities, educational buildings, hospitality properties, and other commercial facilities.",
    },
    {
      q: "Can renovations be completed while my business remains open?",
      a: "In many cases, yes. We develop phased construction plans that help minimize disruption and maintain safe operations whenever possible.",
    },
    {
      q: "Do you handle tenant improvements?",
      a: "Yes. We provide complete tenant improvement services for leased commercial spaces.",
    },
    {
      q: "Can you modernize older commercial buildings?",
      a: "Absolutely. We renovate aging facilities while improving functionality, appearance, and long-term performance.",
    },
    {
      q: "Do you coordinate electrical and mechanical upgrades?",
      a: "Yes. We coordinate all required building systems as part of the remodeling process.",
    },
    {
      q: "Can you manage the entire project?",
      a: "Yes. Keentel General Contractors oversees planning, scheduling, construction, quality control, and final project completion.",
    },
  ];

  return (
    <main className="crs-about-page">
      {/* Hero */}
      <section className="crs-hero-section">
        <video
          className="crs-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          >
            <source src="/Video/transform-commercial-spaces-with-confidence-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
            <source
            src="/Video/transform-commercial-spaces-with-confidence.mp4"
            type="video/mp4"
          />
        </video>
        <div className="crs-hero-overlay"></div>
        <div className="crs-hero-content">
          <div className="crs-hero-badge crs-reveal">
            OFFICE RENOVATIONS • TENANT IMPROVEMENTS • RETAIL • HOSPITALITY
          </div>
          <h1 className="crs-hero-title crs-reveal crs-reveal-delay-1">
            <span className="service-hero-title-line">Transform Commercial Spaces</span>
            <span className="service-hero-title-line crs-highlight">with Confidence</span>
          </h1>
          <p className="crs-hero-subtitle crs-reveal crs-reveal-delay-2">
            A successful remodel is more than updating a space—it's about creating an environment that supports your business, reflects your brand, and prepares your property for future growth. Keentel General Contractors delivers professional commercial remodeling services with careful planning, skilled craftsmanship, and minimal disruption to your daily operations.
          </p>
          <p className="crs-hero-subtitle crs-hero-subtitle-small crs-reveal crs-reveal-delay-2">
            Whether you're modernizing an office, renovating a retail space, or reconfiguring a commercial facility, we help bring your vision to life with quality and precision.
          </p>
          <div className="service-hero-bottom-row">
            <div className="crs-hero-cta-group crs-reveal crs-reveal-delay-3">
              <a href="#contactformsection" className="crs-btn crs-btn-primary">
                Book a Consultation <FontAwesomeIcon icon={faArrowRight} className="crs-btn-arrow" />
              </a>
              <a href="tel:8133950000" className="crs-btn crs-btn-secondary">
                Call Us <FontAwesomeIcon icon={faArrowRight} className="crs-btn-arrow" />
              </a>
            </div>
            <ServiceHeroCredentials />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="crs-trust-bar-wrapper">
        <div className="crs-trust-bar">
          {[...trustItems, ...trustItems].map((item, idx) => (
            <span key={idx} className="crs-trust-item">
              <span className="crs-trust-check"><FontAwesomeIcon icon={faCheck} /></span>
              {item}
              {idx % trustItems.length !== trustItems.length - 1 && <span className="crs-trust-divider" />}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="crs-section-light" id="crs-about">
        <div className="crs-decor-orb" style={{ width: 250, height: 250, top: "10%", right: "-5%" }} />
        <div className="crs-container">
          <div className="crs-about-grid">
            <div className="crs-reveal">
              <span className="crs-section-label">About Our Commercial Remodeling Services</span>
              <h2 className="crs-section-heading">Modern Spaces Designed for Business Success</h2>
              <p className="crs-section-body">
                Commercial spaces should evolve with your business. Whether you're expanding, rebranding, improving functionality, or upgrading aging facilities, a well-planned remodel can enhance productivity, customer experience, and long-term property value.
              </p>
              <p className="crs-section-body">
                At Keentel General Contractors, we provide comprehensive commercial remodeling services tailored to your operational goals. Our team manages every phase of the project—from planning and demolition to construction and final finishes—while keeping communication clear and your project moving efficiently.
              </p>
              <p className="crs-section-body">
                We focus on creating spaces that are functional, modern, and built to support your business for years to come.
              </p>
            </div>
            <div className="crs-about-visual crs-reveal crs-reveal-delay-2">
              <div className="crs-about-bg-dot" style={{ top: "5%", left: "5%" }} />
              <div className="crs-about-bg-dot crs-dot-2" />
              <div className="crs-about-floating-card">
                <div className="crs-card-icon-large"><FontAwesomeIcon icon={faHardHat} /></div>
                <h4>Commercial Remodeling Experts</h4>
                <p>We transform commercial spaces with minimal disruption and maximum quality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Remodel */}
      <WhyKeentel />

      <section className="crs-section-dark" id="crs-why-matters">
        <div className="crs-decor-ring" style={{ width: 300, height: 300, top: -60, right: -80 }} />
        <div className="crs-container">
          <span className="crs-section-label crs-reveal">Why Remodel?</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">Improve Performance Without Starting Over</h2>
          <p className="crs-section-body crs-reveal crs-reveal-delay-1">
            Commercial remodeling offers an opportunity to modernize existing spaces without the cost of new construction.
          </p>
          <p className="crs-section-body crs-reveal crs-reveal-delay-1">
            Whether you're improving workflow, increasing capacity, updating outdated finishes, or preparing a property for new tenants, remodeling allows you to maximize the value of your existing investment while minimizing downtime.
          </p>
          <div className="crs-matters-grid">
            {["Cost-Effective Upgrades", "Increased Property Value", "Improved Functionality", "Enhanced Brand Image"].map((title, i) => (
              <div className={`crs-matter-card crs-reveal crs-reveal-delay-${i + 2}`} key={i}>
                <span className="crs-matter-number">0{i + 1}</span>
                <h4>{title}</h4>
                <p>Remodeling delivers significant returns with less investment than new construction.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="crs-section-light-alt" id="crs-services">
        <div className="crs-container">
          <div className="crs-services-layout">
            <div className="crs-services-left crs-reveal">
              <span className="crs-section-label">What's Included</span>
              <h2 className="crs-section-heading">Complete Commercial Remodeling Solutions</h2>
              <p className="crs-section-body">
                Our services cover every aspect of your remodeling project, from demolition to final finishes, tailored to your business needs.
              </p>
              <div className="crs-services-image-wrapper">
                <Image
                  src="/images/services/doctors-nurse-discussing-report.webp"
                  alt="Commercial Remodeling services"
                  width={900}
                  height={600}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="crs-services-image"
                />
              </div>
            </div>
            <div className="crs-services-right crs-reveal crs-reveal-delay-2">
              <div className="crs-services-grid">
                {servicesList.map((service, idx) => (
                  <div className="crs-service-item" key={idx}>
                    <span className="crs-service-dot" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="crs-section-dark" id="crs-project-types">
        <div className="crs-container">
          <span className="crs-section-label crs-reveal">Project Types</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">Remodeling Solutions for Every Business</h2>
          <div className="crs-project-types-grid">
            {projectTypes.map((type, idx) => (
              <div className={`crs-project-type-card crs-reveal crs-reveal-delay-${idx + 2}`} key={idx}>
                <div className="crs-project-type-image">
                  <Image
                    src={type.image}
                    alt={`${type.title} commercial remodeling project`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="crs-project-type-photo"
                  />
                </div>
                <div className="crs-project-type-content">
                  <h4>{type.title}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="crs-project-types-cta crs-reveal">
            <a href="#contactformsection" className="crs-btn crs-btn-primary">
              Request a Remodeling Consultation <FontAwesomeIcon icon={faArrowRight} className="crs-btn-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* Who We Serve (10 cards) */}
      <section className="crs-section-light" id="crs-who-we-serve">
        <div className="crs-container">
          <span className="crs-section-label crs-reveal">Who We Serve</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">Remodeling Solutions for Growing Businesses</h2>
          <div className="crs-clients-grid">
            {clientTypes.map((client, idx) => (
              <div className="crs-client-card crs-reveal crs-reveal-delay-2" key={idx}>
                <div className="crs-client-icon"><FontAwesomeIcon icon={client.icon} /></div>
                <h4>{client.title}</h4>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
          <p className="crs-section-body crs-reveal" style={{ marginTop: 20 }}>
            Whether you're remodeling a single office or renovating an entire commercial facility, Keentel General Contractors delivers solutions designed around your business needs.
          </p>
        </div>
      </section>

      {/* Process (4 steps) */}
      <section className="crs-section-dark" id="crs-process">
        <div className="crs-container">
          <span className="crs-section-label crs-reveal">Our Remodeling Process</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">A Structured Approach to Successful Renovations</h2>
          <div className="crs-process-horizontal">
            {processSteps.map((step, idx) => (
              <div className={`crs-process-step crs-reveal crs-reveal-delay-${idx + 1}`} key={idx}>
                <div className="crs-process-step-number">{step.step}</div>
                <div className="crs-process-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Keentel */}
      <section className="crs-section-light-alt" id="crs-why-choose">
        <div className="crs-container">
          <span className="crs-section-label crs-reveal">Why Choose Keentel General Contractors</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">Remodeling Built Around Your Business</h2>
          <div className="crs-choose-grid">
            {reasons.map((reason, idx) => (
              <div className={`crs-choose-card crs-reveal crs-reveal-delay-${idx + 2}`} key={idx}>
                <h4>{reason.title}</h4>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="crs-section-dark" id="crs-benefits">
        <div className="crs-container">
          <span className="crs-section-label crs-reveal">Benefits of Commercial Remodeling</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">Investing in Your Existing Property</h2>
          <div className="crs-benefits-list">
            {benefitsList.map((benefit, idx) => (
              <div className="crs-benefit-item crs-reveal" key={idx}>
                <span className="crs-benefit-icon"><FontAwesomeIcon icon={faCircleCheck} /></span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="crs-section-light" id="crs-faq" ref={faqSectionRef}>
        <div className="crs-container crs-faq-container">
          <span className="crs-section-label crs-reveal">Frequently Asked Questions</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">Commercial Remodeling FAQs</h2>
          <div className="crs-faq-list">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="crs-faq-item crs-reveal"
                onClick={(e) => { e.stopPropagation(); toggleFaq(idx); }}
              >
                <div className="crs-faq-question">
                  <span>{faq.q}</span>
                  <span className="crs-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
                <div
                  className="crs-faq-answer"
                  ref={(el) => { if (el) faqAnswerRefs.current.set(idx, el); else faqAnswerRefs.current.delete(idx); }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="crs-section-dark" id="crs-contact">
        <div className="crs-decor-orb" style={{ width: 280, height: 280, top: "15%", right: "-6%" }} />
        <div className="crs-container">
          <span className="crs-section-label crs-reveal">Contact Section</span>
          <h2 className="crs-section-heading crs-reveal crs-reveal-delay-1">Let's Transform Your Commercial Property</h2>
          <p className="crs-section-body crs-reveal crs-reveal-delay-1">
            Whether you're renovating an office, upgrading a retail location, modernizing a healthcare facility, or preparing a commercial space for new tenants, Keentel General Contractors is ready to help. Tell us about your remodeling project, and we'll develop a solution tailored to your goals.
          </p>
          <div className="crs-contact-grid">
            <form className="crs-contact-form crs-reveal crs-reveal-delay-2" ref={formRef} onSubmit={handleFormSubmit}>
              <div className="crs-form-row">
                <input type="text" name="fullName" className="crs-form-input" placeholder="Full Name *" required />
                <input type="text" className="crs-form-input" placeholder="Company" />
              </div>
              <div className="crs-form-row">
                <input type="email" name="email" className="crs-form-input" placeholder="Email Address *" required />
                <input type="tel" name="phone" pattern="[0-9()+.\-\s]{10,}" className="crs-form-input" placeholder="Phone Number" required />
              </div>
              <div className="crs-form-row">
                <input type="text" name="location" className="crs-form-input" placeholder="Property Location" />
                <select name="projectType" className="crs-form-select" required>
                  <option value="">Property Type</option>
                  <option>Office</option>
                  <option>Retail</option>
                  <option>Restaurant</option>
                  <option>Hospitality</option>
                  <option>Healthcare</option>
                  <option>Educational</option>
                  <option>Industrial</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="crs-form-row">
                <select className="crs-form-select">
                  <option value="">Estimated Budget</option>
                  <option>Under $500K</option>
                  <option>$500K – $2M</option>
                  <option>$2M – $10M</option>
                  <option>$10M – $50M</option>
                  <option>$50M+</option>
                </select>
                <select className="crs-form-select">
                  <option value="">Expected Timeline</option>
                  <option>0–6 Months</option>
                  <option>6–12 Months</option>
                  <option>1–2 Years</option>
                  <option>2+ Years</option>
                </select>
              </div>
              <textarea name="details" className="crs-form-textarea" placeholder="Tell Us About Your Remodeling Project *" required></textarea>
              <button type="submit" className="crs-btn-submit">
                {formStatus === "success" ? "✓ Sent Successfully!" : "Request a Consultation →"}
              </button>
            </form>
            <div className="crs-contact-info-side crs-reveal crs-reveal-delay-3">
              <div className="crs-contact-info-card">
                <h5><FontAwesomeIcon icon={faPhone} /> Call Us</h5>
                <p>Speak directly with our remodeling team.</p>
              </div>
              <div className="crs-contact-info-card">
                <h5><FontAwesomeIcon icon={faEnvelope} /> Email Us</h5>
                <p>Send us your project details and we'll respond within one business day.</p>
              </div>
              <div className="crs-contact-info-card">
                <h5><FontAwesomeIcon icon={faLocationDot} /> Visit Our Office</h5>
                <p>Schedule an in-person consultation at our headquarters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="crs-final-cta-section" id="crs-final-cta">
        <div className="crs-container crs-reveal">
          <h2>
            Transform Your Space. <span style={{ color: "#a6238f" }}>Strengthen Your Business.</span>
          </h2>
          <div className="crs-final-cta-buttons">
            <a href="#contactformsection" className="crs-btn-filled-dark">Book a Consultation <FontAwesomeIcon icon={faArrowRight} /></a>
            <a href="tel:8133950000" className="crs-btn-outline-dark">Call Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
