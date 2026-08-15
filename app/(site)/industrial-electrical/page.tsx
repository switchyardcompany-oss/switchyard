"use client";

import "./industrial-electrical.css";
import { useEffect, useRef, useState } from "react";

export default function IndustrialElectricalPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".ie-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".ie-faq-item");
        if (item) item.classList.add("ie-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".ie-faq-item");
        if (item) item.classList.remove("ie-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".ie-hero__slide");
    const dots = document.querySelectorAll(".ie-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("ie-active"));
      dots.forEach((d) => d.classList.remove("ie-active"));
      slides[index].classList.add("ie-active");
      dots[index].classList.add("ie-active");
      current = index;
    }
    function nextSlide() {
      goToSlide((current + 1) % totalSlides);
    }
    let autoPlay = setInterval(nextSlide, intervalTime);
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearInterval(autoPlay);
        goToSlide(i);
        autoPlay = setInterval(nextSlide, intervalTime);
      });
    });

    const revealElements = document.querySelectorAll(".ie-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ie-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".ie-hero .ie-reveal").forEach((el) =>
      el.classList.add("ie-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What licensing do your industrial electricians hold?",
      a: "All industrial electrical work is performed by our CFC-licensed electricians. For medium-voltage systems, arc flash studies, and protective relay work, we engage licensed electrical engineers as part of the project scope.",
    },
    {
      q: "Do you perform arc flash hazard analysis?",
      a: "Yes. We perform IEEE 1584 arc flash hazard analysis for industrial facilities across Florida — including incident energy calculations, arc flash label generation, PPE category determination, and protective device coordination studies.",
    },
    {
      q: "Can you work during production shutdowns or nights and weekends?",
      a: "Yes. We plan industrial electrical work around your production schedule — including planned shutdown windows, after-hours energization, and weekend commissioning sequences coordinated with your operations team in advance.",
    },
    {
      q: "What does your industrial maintenance contract include?",
      a: "Our industrial maintenance contracts include scheduled thermographic scanning, connection torque verification, protective relay testing, emergency priority response, and NFPA 70B-compliant maintenance documentation after every visit.",
    },
    {
      q: "What areas of Florida do you serve for industrial electrical?",
      a: "We are headquartered in Tampa Bay and deliver industrial electrical services across all 67 Florida counties.",
    },
  ];

  // ─── Envelope SVG ───
  const envelopeSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="ie-hero">
        <div className="ie-hero__slides">
          <div
            className="ie-hero__slide ie-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="ie-hero__slide"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzWIoGgTLRDVS7ugiff4v2n3VzIhbUIccEw7wvFmNmk6B2oHQdzA-_Tk&s=10')",
            }}
          ></div>
        </div>

        <div className="ie-hero__overlay"></div>

        <div className="ie-hero__content">
          <div className="ie-hero__text">
            <div className="ie-hero__breadcrumb">
              <span className="ie-breadcrumb__light">Electrical Services</span>
              <span className="ie-breadcrumb__slash">/</span>
              <span className="ie-breadcrumb__accent">Industrial Electrical</span>
            </div>

            <h1 className="ie-hero__title ie-reveal ie-reveal-delay-1">
              Industrial Electrical Services
            </h1>

            <p className="ie-hero__subtitle ie-reveal ie-reveal-delay-2">
              <strong>
                High-Voltage Installation, Motor Controls &amp; 24/7 Support Across Florida
              </strong>
              <br />
              Our CFC-licensed industrial electricians self-perform high-voltage
              installation, motor control systems, compliance testing, and 24/7 support
              contracts — never outsourced, always permitted, across all Florida
              counties.
            </p>

            <div className="ie-hero__actions ie-reveal ie-reveal-delay-3">
              <a href="#" className="ie-hero__btn ie-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="ie-hero__btn ie-hero__btn--secondary">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                View Our Work
              </a>
            </div>

            <div className="ie-hero__trust ie-reveal ie-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 150+ Florida industrial facility managers
              </span>
            </div>
          </div>
        </div>

        <div className="ie-hero__dots">
          <span className="ie-hero__dot ie-active"></span>
          <span className="ie-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="ie-intro">
        <div className="ie-intro__inner">
          <div
            className="ie-intro__image ie-reveal"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzWIoGgTLRDVS7ugiff4v2n3VzIhbUIccEw7wvFmNmk6B2oHQdzA-_Tk&s=10')",
            }}
          ></div>
          <div className="ie-intro__text ie-reveal ie-reveal-delay-1">
            <h2>
              Industrial Electrical Systems Require Licensed Expertise — Not General
              Trade Electricians.
            </h2>
            <p>
              We prioritize a strategy that treats industrial electrical work as the
              specialized discipline it is. High-voltage distribution, motor control
              centers, arc flash hazard analysis, and industrial control systems
              operate at a level of complexity and risk that requires specific
              experience, specific tools, and specific licensing. Our industrial
              electrical team has delivered these systems across manufacturing
              facilities, distribution centers, water treatment plants, and heavy
              industrial sites in Florida for decades. Every industrial scope we accept
              is led by our CFC-licensed electricians, engineered where required,
              permitted through the appropriate authority, and documented to NFPA 70
              and OSHA standards before we consider a project closed.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="ie-scope">
        <div className="ie-section__inner">
          <div className="ie-scope__header">
            <p className="ie-section__label ie-reveal">
              What Our Industrial Electrical Scope Covers
            </p>
            <h2 className="ie-reveal">
              We self-perform the full scope of industrial electrical services — from
              high-voltage service installations to 24/7 maintenance contracts —
              licensed, engineered where required, and delivered across all Florida
              counties.
            </h2>
            <p className="ie-reveal ie-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="ie-scope__grid">
            {/* Card 1: High-Voltage Service Installation & Distribution */}
            <div className="ie-scope-card ie-reveal ie-reveal-delay-1">
              <div
                className="ie-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ie-scope-card__number">1</span>
              </div>
              <div className="ie-scope-card__body">
                <h3 className="ie-scope-card__title">
                  High-Voltage Service Installation &amp; Distribution
                </h3>
                <ul className="ie-scope-card__list">
                  <li>Primary service installation — medium voltage (4kV to 35kV) incoming service and transformer termination</li>
                  <li>Pad-mounted and unit substation installation and commissioning</li>
                  <li>Main switchgear and distribution switchboard installation — 480V and 600V systems</li>
                  <li>Bus duct and cable tray installation throughout industrial facilities</li>
                  <li>Medium-voltage cable pulling, splicing, and termination by qualified personnel</li>
                  <li>Utility coordination — pre-construction meetings, protective relay settings, and commissioning testing</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Motor Control Centers & Drives */}
            <div className="ie-scope-card ie-reveal ie-reveal-delay-2">
              <div
                className="ie-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ie-scope-card__number">2</span>
              </div>
              <div className="ie-scope-card__body">
                <h3 className="ie-scope-card__title">
                  Motor Control Centers &amp; Drives
                </h3>
                <ul className="ie-scope-card__list">
                  <li>Motor control center (MCC) installation — NEMA 1 and NEMA 12 enclosures for industrial environments</li>
                  <li>Variable frequency drive (VFD) installation for pump, fan, and compressor applications</li>
                  <li>Soft-starter installation for high-inertia load starting applications</li>
                  <li>Control transformer, contactor, and overload relay installation and wiring</li>
                  <li>PLC and industrial control panel integration — I/O wiring and field device termination</li>
                  <li>Motor circuit conductor sizing, installation, and protection device coordination</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Arc Flash Hazard Analysis & Compliance */}
            <div className="ie-scope-card ie-reveal ie-reveal-delay-3">
              <div
                className="ie-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ie-scope-card__number">3</span>
              </div>
              <div className="ie-scope-card__body">
                <h3 className="ie-scope-card__title">
                  Arc Flash Hazard Analysis &amp; Compliance
                </h3>
                <ul className="ie-scope-card__list">
                  <li>IEEE 1584 arc flash hazard analysis for all industrial distribution equipment</li>
                  <li>Incident energy level calculation at every panel, MCC, and switchgear location</li>
                  <li>Arc flash label generation and installation on all analyzed equipment</li>
                  <li>PPE category determination and recommendation for each energy level zone</li>
                  <li>Short-circuit and coordination study to optimize protective device settings</li>
                  <li>Written arc flash safety program development — integrated with existing OSHA LOTO program</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="ie-scope__grid ie-scope__grid--bottom">
            {/* Card 4: Compliance Testing & Electrical Commissioning */}
            <div className="ie-scope-card ie-reveal ie-reveal-delay-4">
              <div
                className="ie-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ie-scope-card__number">4</span>
              </div>
              <div className="ie-scope-card__body">
                <h3 className="ie-scope-card__title">
                  Compliance Testing &amp; Electrical Commissioning
                </h3>
                <ul className="ie-scope-card__list">
                  <li>Insulation resistance (megger) testing — cables, motors, and transformers before energization</li>
                  <li>High-potential (hi-pot) testing for medium-voltage cable acceptance</li>
                  <li>Protective relay testing and calibration — overcurrent, ground fault, and differential relays</li>
                  <li>Transformer turns ratio and excitation current testing</li>
                  <li>Power factor correction capacitor bank installation and verification</li>
                  <li>Commissioning report documentation — test results, settings, and as-built system data</li>
                </ul>
              </div>
            </div>

            {/* Card 5: 24/7 Industrial Electrical Maintenance Contracts */}
            <div className="ie-scope-card ie-reveal ie-reveal-delay-5">
              <div
                className="ie-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ie-scope-card__number">5</span>
              </div>
              <div className="ie-scope-card__body">
                <h3 className="ie-scope-card__title">
                  24/7 Industrial Electrical Maintenance Contracts
                </h3>
                <ul className="ie-scope-card__list">
                  <li>Scheduled preventive maintenance — thermographic scanning, connection torque checks, and cleaning</li>
                  <li>Predictive maintenance — vibration analysis coordination for motor-driven equipment</li>
                  <li>Emergency response — active fault, production outage, and equipment failure response on priority contract</li>
                  <li>Spare parts management — critical fuse, contactor, and drive component inventory coordination</li>
                  <li>NFPA 70B-compliant maintenance program documentation for all facility electrical equipment</li>
                  <li>Maintenance report delivery after every visit — findings, corrections made, and next-service recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="ie-why-choose">
        <div className="ie-why-choose__wrapper">
          <div
            className="ie-why-choose__image-side ie-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ie-why-choose__content-side">
            <p className="ie-why-choose__label ie-reveal">
              Why Industrial Facility Managers Choose Keentel
            </p>
            <h2 className="ie-why-choose__heading ie-reveal ie-reveal-delay-1">
              CFC-licensed. Production-aware. NFPA &amp; OSHA compliant.
            </h2>
            <ul className="ie-why-choose__list">
              <li className="ie-reveal ie-reveal-delay-1">
                <span className="ie-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="ie-why-choose__item-text">
                  <strong>CFC-Licensed Industrial Electricians</strong>
                  <span>
                    All industrial electrical scope is performed by our CFC-licensed
                    electricians with specific industrial experience. We do not assign
                    general commercial electricians to industrial high-voltage or
                    control system work.
                  </span>
                </div>
              </li>
              <li className="ie-reveal ie-reveal-delay-2">
                <span className="ie-why-choose__icon">
                  <i className="fas fa-drafting-compass"></i>
                </span>
                <div className="ie-why-choose__item-text">
                  <strong>Engineering Coordination</strong>
                  <span>
                    For medium-voltage systems, arc flash studies, and protective relay
                    coordination, we engage licensed electrical engineers as part of
                    the project scope — not as an afterthought when the county reviewer
                    requires it.
                  </span>
                </div>
              </li>
              <li className="ie-reveal ie-reveal-delay-3">
                <span className="ie-why-choose__icon">
                  <i className="fas fa-calendar-check"></i>
                </span>
                <div className="ie-why-choose__item-text">
                  <strong>Production-Aware Scheduling</strong>
                  <span>
                    We plan industrial electrical work around your production calendar.
                    Critical switchovers, shutdown windows, and energization sequences
                    are coordinated with your operations team before any work begins.
                  </span>
                </div>
              </li>
              <li className="ie-reveal ie-reveal-delay-4">
                <span className="ie-why-choose__icon">
                  <i className="fas fa-book"></i>
                </span>
                <div className="ie-why-choose__item-text">
                  <strong>NFPA &amp; OSHA Compliance</strong>
                  <span>
                    Every industrial electrical system we install and maintain is
                    documented to NFPA 70 (NEC), NFPA 70B (maintenance), NFPA 70E (arc
                    flash safety), and OSHA 29 CFR 1910 electrical safety standards.
                  </span>
                </div>
              </li>
              <li className="ie-reveal ie-reveal-delay-5">
                <span className="ie-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="ie-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All industrial electrical installation work is backed by our
                    written 5-year workmanship warranty — applied to all equipment and
                    conductors our team installs and terminates.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="ie-process">
        <div className="ie-section__inner">
          <p className="ie-section__label ie-reveal">
            How We Deliver Every Electrical Project
          </p>
          <div className="ie-process__steps">
            <div className="ie-process__step ie-reveal ie-reveal-delay-1">
              <div className="ie-process__step-number">1</div>
              <p className="ie-process__step-title">Scope &amp; Engineering</p>
              <p className="ie-process__step-desc">Load, voltage, and engineering requirements confirmed</p>
            </div>
            <div className="ie-process__step ie-reveal ie-reveal-delay-2">
              <div className="ie-process__step-number">2</div>
              <p className="ie-process__step-title">Permit Application</p>
              <p className="ie-process__step-desc">Industrial electrical permit submitted and managed</p>
            </div>
            <div className="ie-process__step ie-reveal ie-reveal-delay-3">
              <div className="ie-process__step-number">3</div>
              <p className="ie-process__step-title">Installation</p>
              <p className="ie-process__step-desc">Licensed in-house installation to schedule</p>
            </div>
            <div className="ie-process__step ie-reveal ie-reveal-delay-4">
              <div className="ie-process__step-number">4</div>
              <p className="ie-process__step-title">Testing &amp; Commissioning</p>
              <p className="ie-process__step-desc">Full system tested before energization</p>
            </div>
            <div className="ie-process__step ie-reveal ie-reveal-delay-5">
              <div className="ie-process__step-number">5</div>
              <p className="ie-process__step-title">Documentation</p>
              <p className="ie-process__step-desc">As-builts, test reports, arc flash labels, warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="ie-why-choose-us">
        <div className="ie-section__inner">
          <p className="ie-section__label ie-reveal">Why Choose Us</p>
          <h2 className="ie-section__title ie-reveal">
            Why Choose Keentel for Industrial Electrical Services?
          </h2>
          <p
            className="ie-section__text ie-reveal ie-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering industrial
            electrical systems that are engineered correctly, installed safely, and
            documented to the standard that industrial facility managers and their
            insurers require. The following attributes set our industrial electrical
            team apart:
          </p>
          <div className="ie-why-choose-us__grid">
            <div className="ie-why-choose-us__card ie-reveal ie-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We assess your facility's production requirements, maintenance history,
                and safety program before scoping any industrial electrical project. We
                identify reliability risks and code compliance gaps that affect both
                your operations and your OSHA exposure — and we prioritize them
                honestly.
              </p>
            </div>
            <div className="ie-why-choose-us__card ie-reveal ie-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have installed and maintained industrial electrical systems in
                manufacturing plants, distribution centers, food processing facilities,
                and utilities across all 67 Florida counties — in both greenfield and
                brownfield industrial environments.
              </p>
            </div>
            <div className="ie-why-choose-us__card ie-reveal ie-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We integrate power quality monitoring, predictive maintenance
                technology, and modern VFD and soft-starter solutions into industrial
                electrical scopes — reducing unplanned downtime and extending equipment
                life.
              </p>
            </div>
            <div className="ie-why-choose-us__card ie-reveal ie-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every industrial electrical installation is tested, documented, and
                verified against engineering specifications before energization. No
                industrial system we install is energized without a completed
                commissioning checklist signed by our licensed electrician.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="ie-faq-section">
        <div className="ie-section__inner">
          <p className="ie-section__label ie-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="ie-section__title ie-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Industrial Electrical Services
          </h2>
          <div className="ie-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="ie-faq-item ie-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="ie-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="ie-icon"></span>
                </button>
                <div className="ie-faq-item__answer-wrapper">
                  <div
                    className="ie-faq-item__answer"
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="ie-cta-section">
        <div className="ie-section__inner">
          <h2 className="ie-cta-section__title ie-reveal">
            Need licensed industrial electrical services?
          </h2>
          <p className="ie-cta-section__text ie-reveal ie-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your
            industrial electrical project anywhere in Florida.
          </p>
          <a href="#" className="ie-cta-section__btn ie-reveal ie-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="ie-cta-section__contact ie-reveal ie-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000{" "}
              <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>
                (24/7 Emergency Line)
              </span>
            </a>
            <span className="ie-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="ie-sep">|</span>
            <span>
              <i className="fas fa-map-marker-alt"></i> 400 North Ashley Drive, Suite
              2000, Tampa, FL 33602
            </span>
          </div>
        </div>
      </section>
    </>
  );
}