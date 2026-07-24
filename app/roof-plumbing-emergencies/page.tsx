"use client";

import "./roof-plumbing-emergencies.css";
import { useEffect, useRef, useState } from "react";

export default function RoofPlumbingEmergenciesPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".rp-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".rp-faq-item");
        if (item) item.classList.add("rp-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".rp-faq-item");
        if (item) item.classList.remove("rp-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".rp-hero__slide");
    const dots = document.querySelectorAll(".rp-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("rp-active"));
      dots.forEach((d) => d.classList.remove("rp-active"));
      slides[index].classList.add("rp-active");
      dots[index].classList.add("rp-active");
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

    const revealElements = document.querySelectorAll(".rp-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rp-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".rp-hero .rp-reveal").forEach((el) =>
      el.classList.add("rp-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What should I do while waiting for your emergency crew to arrive?",
      a: "If it is a plumbing emergency, locate and close the nearest shut-off valve — either at the fixture, the zone valve, or the main building supply. If it is a roof leak, place collection containers under active drip points and move furniture and valuables away from the affected area.",
    },
    {
      q: "Can you repair the roof permanently — not just tarp it?",
      a: "Yes. Emergency tarping is the first response to stop active water intrusion. Our permanent roof repair scope — shingles, flashing, decking, and underlayment — is scoped on the same visit and scheduled as quickly as material and permit timelines allow.",
    },
    {
      q: "Is a plumbing permit required for emergency repairs in Florida?",
      a: "In most cases, supply line and drain line repairs require a permit in Florida. We manage all permit applications and county inspections as part of our standard repair process.",
    },
    {
      q: "Will my insurance cover roof and plumbing emergency repairs?",
      a: "Coverage depends on your policy and the cause of damage. We produce insurance-ready documentation on every emergency visit. We advise you to contact your insurer immediately and provide them with our written damage report.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and provide 24/7 roof and plumbing emergency response across all 67 Florida counties.",
    },
  ];

  // ─── Envelope SVG (reusable) ───
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
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M21 6l-9 7-9-7" />
    </svg>
  );

  return (
    <>
      {/* ═══════════ EMERGENCY TOP BAR — FULL WIDTH ═══════════ */}
      <div className="rp-top-bar">
        <div className="rp-top-bar__inner">
          <div className="rp-top-bar__content">
            <i className="fas fa-exclamation-triangle rp-top-bar__icon"></i>
            <span className="rp-top-bar__label">EMERGENCY LINE:</span>
            <a href="tel:+18133950000" className="rp-top-bar__phone">
              (813) 395-0000
            </a>
            <span className="rp-top-bar__divider">|</span>
            <span className="rp-top-bar__availability">
              Available 24 Hours, 7 Days a Week, 365 Days a Year
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="rp-hero">
        <div className="rp-hero__slides">
          <div
            className="rp-hero__slide rp-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="rp-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="rp-hero__overlay"></div>

        <div className="rp-hero__content">
          <div className="rp-hero__text">
            <div className="rp-hero__breadcrumb">
              <span className="rp-breadcrumb__light">Emergency (24/7)</span>
              <span className="rp-breadcrumb__slash">/</span>
              <span className="rp-breadcrumb__accent">
                Roof Leaks &amp; Plumbing Emergencies
              </span>
            </div>

            <h1 className="rp-hero__title rp-reveal rp-reveal-delay-1">
              Roof Leaks &amp; Plumbing Emergencies
            </h1>

            <p className="rp-hero__subtitle rp-reveal rp-reveal-delay-2">
              <strong>24/7 Licensed Response Across Florida</strong>
              <br />
              A roof leak or plumbing failure does not stop because it is after hours.
              Our licensed team responds to roof and plumbing emergencies across
              Florida within 30 to 60 minutes — stopping damage at the source before
              it spreads.
            </p>

            <div className="rp-hero__actions rp-reveal rp-reveal-delay-3">
              <a href="#" className="rp-hero__btn rp-hero__btn--primary">
                {envelopeSvg}
                Request Emergency Response
              </a>
              <a href="#" className="rp-hero__btn rp-hero__btn--secondary">
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

            <div className="rp-hero__trust rp-reveal rp-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 350+ Florida property owners for roof
                &amp; plumbing emergencies
              </span>
            </div>
          </div>
        </div>

        <div className="rp-hero__dots">
          <span className="rp-hero__dot rp-active"></span>
          <span className="rp-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="rp-intro">
        <div className="rp-intro__inner">
          <div
            className="rp-intro__image rp-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="rp-intro__text rp-reveal rp-reveal-delay-1">
            <h2>
              Every Minute an Active Leak Runs, the Damage Scope Grows.
            </h2>
            <p>
              We have seen the difference between a property owner who called
              immediately and one who waited until morning. A roof leak running
              through the night penetrates insulation, saturates drywall, and reaches
              structural framing before it is ever visible on a ceiling. A burst
              plumbing supply line can deposit thousands of gallons of water into a
              structure within hours. Our 24/7 roof and plumbing emergency response is
              built to stop that damage at the source — not clean it up after the
              fact. Our licensed team arrives within 30 to 60 minutes, isolates the
              water source, protects the affected area, and begins the licensed repair
              in the same visit wherever possible.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="rp-scope">
        <div className="rp-section__inner">
          <div className="rp-scope__header">
            <p className="rp-section__label rp-reveal">
              What Our Roof &amp; Plumbing Emergency Response Covers
            </p>
            <h2 className="rp-reveal">
              Our roof and plumbing emergency response covers source isolation,
              licensed repair, and full water damage documentation — managed under one
              licensed contract.
            </h2>
            <p className="rp-reveal rp-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="rp-scope__grid">
            {/* Card 1: Emergency Roof Tarping & Leak Containment */}
            <div className="rp-scope-card rp-reveal rp-reveal-delay-1">
              <div
                className="rp-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rp-scope-card__number">1</span>
              </div>
              <div className="rp-scope-card__body">
                <h3 className="rp-scope-card__title">
                  Emergency Roof Tarping &amp; Leak Containment
                </h3>
                <ul className="rp-scope-card__list">
                  <li>Emergency tarp installation over active leak areas — installed same visit</li>
                  <li>Leak source identification — roof surface, flashing, ridge, and penetration inspection</li>
                  <li>Interior leak containment — collection and protection of affected interior areas</li>
                  <li>Moisture mapping of affected ceiling and wall areas</li>
                  <li>Photo documentation of all roof damage and affected interior zones</li>
                  <li>Written scope of permanent repair issued at end of emergency visit</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Permanent Roof Repair */}
            <div className="rp-scope-card rp-reveal rp-reveal-delay-2">
              <div
                className="rp-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rp-scope-card__number">2</span>
              </div>
              <div className="rp-scope-card__body">
                <h3 className="rp-scope-card__title">Permanent Roof Repair</h3>
                <ul className="rp-scope-card__list">
                  <li>Shingle replacement — wind-lifted, impact-damaged, or deteriorated sections</li>
                  <li>Flashing repair and replacement — chimney, valley, skylight, and pipe boot</li>
                  <li>Ridge cap and hip installation after storm damage</li>
                  <li>Roof deck repair — decking replacement where water-damaged</li>
                  <li>Underlayment replacement beneath repaired sections</li>
                  <li>Florida Building Code-compliant repair with permit management where required</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Burst Pipe & Supply Line Emergency */}
            <div className="rp-scope-card rp-reveal rp-reveal-delay-3">
              <div
                className="rp-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rp-scope-card__number">3</span>
              </div>
              <div className="rp-scope-card__body">
                <h3 className="rp-scope-card__title">
                  Burst Pipe &amp; Supply Line Emergency
                </h3>
                <ul className="rp-scope-card__list">
                  <li>Main water supply isolation — immediate shut-off at meter or building service</li>
                  <li>Burst pipe location identification using pressure testing and visual assessment</li>
                  <li>Pipe repair or replacement — copper, CPVC, PEX, and galvanized systems</li>
                  <li>Water heater failure — isolation, drain, and emergency replacement</li>
                  <li>Expansion tank and pressure relief valve failure — emergency repair</li>
                  <li>Water supply restoration and pressure test before sign-off</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="rp-scope__grid rp-scope__grid--bottom">
            {/* Card 4: Drain, Sewer & Waste Line Emergency */}
            <div className="rp-scope-card rp-reveal rp-reveal-delay-4">
              <div
                className="rp-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rp-scope-card__number">4</span>
              </div>
              <div className="rp-scope-card__body">
                <h3 className="rp-scope-card__title">
                  Drain, Sewer &amp; Waste Line Emergency
                </h3>
                <ul className="rp-scope-card__list">
                  <li>Main sewer line backup — isolation and immediate clearance</li>
                  <li>Floor drain, toilet, and kitchen drain overflow response</li>
                  <li>Drain camera inspection to identify blockage source and pipe condition</li>
                  <li>Root intrusion, grease blockage, and pipe collapse response</li>
                  <li>Sewage cleanup coordination — waste removal and surface sanitization</li>
                  <li>Sewer line repair or replacement with permit management</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Water Damage Assessment & Documentation */}
            <div className="rp-scope-card rp-reveal rp-reveal-delay-5">
              <div
                className="rp-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rp-scope-card__number">5</span>
              </div>
              <div className="rp-scope-card__body">
                <h3 className="rp-scope-card__title">
                  Water Damage Assessment &amp; Documentation
                </h3>
                <ul className="rp-scope-card__list">
                  <li>Post-leak moisture mapping — identifying all water-affected structural elements</li>
                  <li>Structural drying setup — dehumidification and air movement for affected areas</li>
                  <li>Water damage documentation for insurance adjuster submission</li>
                  <li>Mold risk assessment and preventive treatment within 24 hours of water removal</li>
                  <li>Complete written damage and repair scope issued at end of emergency visit</li>
                  <li>Full interior restoration scope available under the same licensed contract</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="rp-why-choose">
        <div className="rp-why-choose__wrapper">
          <div
            className="rp-why-choose__image-side rp-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="rp-why-choose__content-side">
            <p className="rp-why-choose__label rp-reveal">
              Why Property Owners Trust Keentel for Roof &amp; Plumbing Emergencies
            </p>
            <h2 className="rp-why-choose__heading rp-reveal rp-reveal-delay-1">
              Source isolation first. Licensed repair. Full documentation.
            </h2>
            <ul className="rp-why-choose__list">
              <li className="rp-reveal rp-reveal-delay-1">
                <span className="rp-why-choose__icon">
                  <i className="fas fa-water"></i>
                </span>
                <div className="rp-why-choose__item-text">
                  <strong>Source Isolation First</strong>
                  <span>
                    We stop the water before we assess the damage. Every roof and
                    plumbing emergency response begins with immediate source isolation
                    — tarp installation or supply shut-off — within the first minutes
                    on site.
                  </span>
                </div>
              </li>
              <li className="rp-reveal rp-reveal-delay-2">
                <span className="rp-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="rp-why-choose__item-text">
                  <strong>Licensed Roofing &amp; Plumbing</strong>
                  <span>
                    All roof repairs are performed under our CGC license. All
                    plumbing emergency repairs are performed by our CPC-licensed
                    plumbers. No unlicensed repair crews on any emergency call.
                  </span>
                </div>
              </li>
              <li className="rp-reveal rp-reveal-delay-3">
                <span className="rp-why-choose__icon">
                  <i className="fas fa-file-alt"></i>
                </span>
                <div className="rp-why-choose__item-text">
                  <strong>Same-Visit Documentation</strong>
                  <span>
                    Every emergency visit produces a written damage report, photo
                    documentation, and permanent repair scope — formatted for
                    insurance review and permit submission.
                  </span>
                </div>
              </li>
              <li className="rp-reveal rp-reveal-delay-4">
                <span className="rp-why-choose__icon">
                  <i className="fas fa-file-contract"></i>
                </span>
                <div className="rp-why-choose__item-text">
                  <strong>Full Scope — One Contract</strong>
                  <span>
                    Emergency stabilization, licensed repair, and interior restoration
                    are managed under one contract. No coordination gaps between
                    separate roofing, plumbing, and restoration contractors.
                  </span>
                </div>
              </li>
              <li className="rp-reveal rp-reveal-delay-5">
                <span className="rp-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="rp-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All roof and plumbing repairs performed by our team are covered by
                    our written 5-year workmanship warranty.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="rp-process">
        <div className="rp-section__inner">
          <p className="rp-section__label rp-reveal">
            Our Emergency Response Process
          </p>
          <div className="rp-process__steps">
            <div className="rp-process__step rp-reveal rp-reveal-delay-1">
              <div className="rp-process__step-number">1</div>
              <p className="rp-process__step-title">You Call</p>
              <p className="rp-process__step-desc">
                Emergency line answered immediately — 24/7
              </p>
            </div>
            <div className="rp-process__step rp-reveal rp-reveal-delay-2">
              <div className="rp-process__step-number">2</div>
              <p className="rp-process__step-title">Dispatch</p>
              <p className="rp-process__step-desc">
                Licensed crew en route within 15 minutes
              </p>
            </div>
            <div className="rp-process__step rp-reveal rp-reveal-delay-3">
              <div className="rp-process__step-number">3</div>
              <p className="rp-process__step-title">Source Isolation</p>
              <p className="rp-process__step-desc">
                Tarp installed or supply shut off on arrival
              </p>
            </div>
            <div className="rp-process__step rp-reveal rp-reveal-delay-4">
              <div className="rp-process__step-number">4</div>
              <p className="rp-process__step-title">Assessment</p>
              <p className="rp-process__step-desc">
                Damage mapped and repair scope documented
              </p>
            </div>
            <div className="rp-process__step rp-reveal rp-reveal-delay-5">
              <div className="rp-process__step-number">5</div>
              <p className="rp-process__step-title">Licensed Repair</p>
              <p className="rp-process__step-desc">
                Permanent repair completed under one contract
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="rp-why-choose-us">
        <div className="rp-section__inner">
          <p className="rp-section__label rp-reveal">Why Choose Us</p>
          <h2 className="rp-section__title rp-reveal">
            Why Choose Keentel for Roof Leaks &amp; Plumbing Emergencies?
          </h2>
          <p
            className="rp-section__text rp-reveal rp-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in stopping damage at the
            source and delivering licensed, documented repairs that hold up — in the
            field and on an insurance claim. The following attributes set our emergency
            response team apart:
          </p>
          <div className="rp-why-choose-us__grid">
            <div className="rp-why-choose-us__card rp-reveal rp-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We explain what we found, what we are doing, and what the permanent
                repair will cost — before we begin. No surprises on the final invoice.
              </p>
            </div>
            <div className="rp-why-choose-us__card rp-reveal rp-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have responded to roof and plumbing emergencies across all 67
                Florida counties — in residential homes, commercial properties, and
                industrial facilities — with a consistent record of fast, licensed
                resolution.
              </p>
            </div>
            <div className="rp-why-choose-us__card rp-reveal rp-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use moisture mapping and thermal imaging to find water intrusion
                that is not visible to the eye — ensuring our repair scope addresses
                every affected area, not just the obvious ones.
              </p>
            </div>
            <div className="rp-why-choose-us__card rp-reveal rp-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every emergency repair is documented from source isolation through
                final repair sign-off. Our documentation protects your insurance claim
                and gives you a written record of every action taken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="rp-faq-section">
        <div className="rp-section__inner">
          <p className="rp-section__label rp-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="rp-section__title rp-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Roof Leaks &amp; Plumbing Emergencies
          </h2>
          <div className="rp-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rp-faq-item rp-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="rp-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="rp-icon"></span>
                </button>
                <div className="rp-faq-item__answer-wrapper">
                  <div
                    className="rp-faq-item__answer"
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
      <section className="rp-cta-section">
        <div className="rp-section__inner">
          {/* Emergency Banner */}
          <div className="rp-cta-section__emergency-banner">
            <i className="fas fa-exclamation-triangle"></i>
            <span>
              EMERGENCY LINE:{" "}
              <a href="tel:+18133950000">(813) 395-0000</a> — Available 24 Hours, 7
              Days a Week, 365 Days a Year
            </span>
          </div>

          <h2 className="rp-cta-section__title rp-reveal">
            Active roof leak or plumbing emergency right now?
          </h2>
          <p className="rp-cta-section__text rp-reveal rp-reveal-delay-1">
            Call our emergency line immediately. We dispatch within 15 minutes and are
            on-site across Florida within 30 to 60 minutes.
          </p>
          <a href="#" className="rp-cta-section__btn rp-reveal rp-reveal-delay-2">
            {envelopeSvg}
            Request Emergency Response
          </a>
          <div className="rp-cta-section__contact rp-reveal rp-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="rp-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="rp-sep">|</span>
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