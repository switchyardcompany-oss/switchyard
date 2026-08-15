"use client";

import "./fire-storm-flood-restoration.css";
import { useEffect, useRef, useState } from "react";

export default function FireStormFloodRestorationPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".em-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".em-faq-item");
        if (item) item.classList.add("em-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".em-faq-item");
        if (item) item.classList.remove("em-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".em-hero__slide");
    const dots = document.querySelectorAll(".em-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("em-active"));
      dots.forEach((d) => d.classList.remove("em-active"));
      slides[index].classList.add("em-active");
      dots[index].classList.add("em-active");
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

    const revealElements = document.querySelectorAll(".em-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("em-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".em-hero .em-reveal").forEach((el) =>
      el.classList.add("em-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "How quickly can you respond to fire, storm, or flood damage?",
      a: "We confirm on-site arrival within 30 to 60 minutes across our Florida service area. Our emergency line is answered immediately — 24 hours a day, 365 days a year.",
    },
    {
      q: "Do you work directly with insurance companies?",
      a: "Yes. We produce insurance-ready damage documentation on the first visit and communicate directly with insurance adjusters on your behalf where needed. Our reports are formatted to align with standard adjuster review requirements.",
    },
    {
      q: "Can you handle the full restoration — not just emergency stabilization?",
      a: "Yes. We manage the full scope — from emergency stabilization through complete structural and finish restoration — under one licensed contract. No handoffs, no gaps in accountability.",
    },
    {
      q: "What if mold is discovered during restoration?",
      a: "We apply mold prevention treatment within 24 hours of water removal on every flood response. If active mold is identified during restoration, we coordinate licensed mold remediation as part of the overall restoration scope.",
    },
    {
      q: "What areas of Florida do you serve for emergency response?",
      a: "We are headquartered in Tampa Bay and provide 24/7 emergency response across all 67 Florida counties.",
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
      <div className="em-top-bar">
        <div className="em-top-bar__inner">
          <div className="em-top-bar__content">
            <i className="fas fa-exclamation-triangle em-top-bar__icon"></i>
            <span className="em-top-bar__label">EMERGENCY LINE:</span>
            <a href="tel:+18133950000" className="em-top-bar__phone">
              (813) 395-0000
            </a>
            <span className="em-top-bar__divider">|</span>
            <span className="em-top-bar__availability">
              Available 24 Hours, 7 Days a Week, 365 Days a Year
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="em-hero">
        <div className="em-hero__slides">
          <div
            className="em-hero__slide em-active"
            style={{
              backgroundImage:
                "url('https://ironriverco.com/wp-content/uploads/water-fire-damage-restoration.jpg')",
            }}
          ></div>
          <div
            className="em-hero__slide"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYaAMreiROpB531PhFUYcjbZyzhdoyhi2x-CWEN2c7P0PRDPRk4ZkQSzs&s=10')",
            }}
          ></div>
        </div>

        <div className="em-hero__overlay"></div>

        <div className="em-hero__content">
          <div className="em-hero__text">
            <div className="em-hero__breadcrumb">
              <span className="em-breadcrumb__light">Emergency (24/7)</span>
              <span className="em-breadcrumb__slash">/</span>
              <span className="em-breadcrumb__accent">
                Fire, Storm &amp; Flood Damage Restoration
              </span>
            </div>

            <h1 className="em-hero__title em-reveal em-reveal-delay-1">
              Fire, Storm &amp; Flood Damage Restoration
            </h1>

            <p className="em-hero__subtitle em-reveal em-reveal-delay-2">
              <strong>24/7 Emergency Response Across Florida</strong>
              <br />
              When fire, storm, or flood damage strikes, the decisions made in the
              first hours determine the cost and timeline of your recovery. Our
              licensed team is on-site across Florida within 30 to 60 minutes — ready
              to stabilize, document, and restore.
            </p>

            <div className="em-hero__actions em-reveal em-reveal-delay-3">
              <a href="#" className="em-hero__btn em-hero__btn--primary">
                {envelopeSvg}
                Request Emergency Response
              </a>
              <a href="#" className="em-hero__btn em-hero__btn--secondary">
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

            <div className="em-hero__trust em-reveal em-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 500+ Florida property owners for
                emergency restoration
              </span>
            </div>
          </div>
        </div>

        <div className="em-hero__dots">
          <span className="em-hero__dot em-active"></span>
          <span className="em-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="em-intro">
        <div className="em-intro__inner">
          <div
            className="em-intro__image em-reveal"
            style={{
              backgroundImage:
                "url('https://ironriverco.com/wp-content/uploads/water-fire-damage-restoration.jpg')",
            }}
          ></div>
          <div className="em-intro__text em-reveal em-reveal-delay-1">
            <h2>The First 24 Hours Determine Your Recovery.</h2>
            <p>
              We have responded to fire, storm, and flood damage events across Florida
              for over two decades. The single most common mistake property owners make
              is waiting — for the storm to fully pass, for business hours, for a
              second opinion. Every hour of delay after a flood event increases water
              penetration depth. Every hour after a fire event allows smoke and soot to
              permanently bond to surfaces. We built our 24/7 emergency division
              specifically to eliminate that delay. Our licensed team arrives within 30
              to 60 minutes, begins stabilization immediately, and delivers a
              documented assessment and restoration plan before we leave the first
              visit.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="em-scope">
        <div className="em-section__inner">
          <div className="em-scope__header">
            <p className="em-section__label em-reveal">
              What Our Restoration Response Covers
            </p>
            <h2 className="em-reveal">
              Our fire, storm, and flood damage restoration scope covers every phase
              from immediate stabilization through full structural and finish
              restoration — managed under one licensed contract.
            </h2>
            <p className="em-reveal em-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="em-scope__grid">
            {/* Card 1: Emergency Stabilization & Site Securing */}
            <div className="em-scope-card em-reveal em-reveal-delay-1">
              <div
                className="em-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop')",
                }}
              >
                <span className="em-scope-card__number">1</span>
              </div>
              <div className="em-scope-card__body">
                <h3 className="em-scope-card__title">
                  Emergency Stabilization &amp; Site Securing
                </h3>
                <ul className="em-scope-card__list">
                  <li>Emergency roof tarping to prevent further water intrusion</li>
                  <li>Window and door boarding for structure security</li>
                  <li>Temporary shoring for structurally compromised walls or ceilings</li>
                  <li>Utility isolation — electrical, gas, and water shut-off where hazardous</li>
                  <li>Perimeter fencing and safety signage for public protection</li>
                  <li>Same-visit written site assessment and photo documentation</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Fire & Smoke Damage Assessment & Restoration */}
            <div className="em-scope-card em-reveal em-reveal-delay-2">
              <div
                className="em-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop')",
                }}
              >
                <span className="em-scope-card__number">2</span>
              </div>
              <div className="em-scope-card__body">
                <h3 className="em-scope-card__title">
                  Fire &amp; Smoke Damage Assessment &amp; Restoration
                </h3>
                <ul className="em-scope-card__list">
                  <li>Structural assessment — identifying fire-compromised framing and load-bearing elements</li>
                  <li>Smoke and soot mapping — documenting affected areas for insurance purposes</li>
                  <li>Char removal and structural drying before rebuild begins</li>
                  <li>Odor treatment and air quality remediation coordination</li>
                  <li>Damaged drywall, insulation, and finish removal</li>
                  <li>Full structural and finish restoration to pre-loss condition</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Storm Damage Repair & Roof Restoration */}
            <div className="em-scope-card em-reveal em-reveal-delay-3">
              <div
                className="em-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop')",
                }}
              >
                <span className="em-scope-card__number">3</span>
              </div>
              <div className="em-scope-card__body">
                <h3 className="em-scope-card__title">
                  Storm Damage Repair &amp; Roof Restoration
                </h3>
                <ul className="em-scope-card__list">
                  <li>Roof inspection — shingle loss, underlayment damage, and decking assessment</li>
                  <li>Fascia, soffit, and gutter damage documentation and repair</li>
                  <li>Exterior wall penetration repair — impact damage, displaced cladding</li>
                  <li>Hurricane strap and wind mitigation reinstatement where required</li>
                  <li>Impact-resistant window and door replacement where code requires</li>
                  <li>Full exterior restoration with permit management and county inspection</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="em-scope__grid em-scope__grid--bottom">
            {/* Card 4: Flood & Water Damage Restoration */}
            <div className="em-scope-card em-reveal em-reveal-delay-4">
              <div
                className="em-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="em-scope-card__number">4</span>
              </div>
              <div className="em-scope-card__body">
                <h3 className="em-scope-card__title">
                  Flood &amp; Water Damage Restoration
                </h3>
                <ul className="em-scope-card__list">
                  <li>Standing water extraction and moisture mapping</li>
                  <li>Structural drying — dehumidification and air movement for minimum 72-hour cycle</li>
                  <li>Mold prevention treatment applied within 24 hours of water removal</li>
                  <li>Water-damaged flooring, drywall, and insulation removal and disposal</li>
                  <li>Subfloor and framing drying and treatment before rebuild</li>
                  <li>Full interior restoration — flooring, drywall, painting, and cabinetry</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Insurance Documentation & Claim Support */}
            <div className="em-scope-card em-reveal em-reveal-delay-5">
              <div
                className="em-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="em-scope-card__number">5</span>
              </div>
              <div className="em-scope-card__body">
                <h3 className="em-scope-card__title">
                  Insurance Documentation &amp; Claim Support
                </h3>
                <ul className="em-scope-card__list">
                  <li>Comprehensive written damage report issued on first visit</li>
                  <li>Photographic documentation formatted for insurance adjuster submission</li>
                  <li>Scope of work estimate aligned with insurance claim requirements</li>
                  <li>Direct communication with insurance adjusters on your behalf where needed</li>
                  <li>Supplement documentation for scope changes identified during restoration</li>
                  <li>Final restoration sign-off and warranty documentation at project close</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="em-why-choose">
        <div className="em-why-choose__wrapper">
          <div
            className="em-why-choose__image-side em-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="em-why-choose__content-side">
            <p className="em-why-choose__label em-reveal">
              Why Property Owners Call Keentel First
            </p>
            <h2 className="em-why-choose__heading em-reveal em-reveal-delay-1">
              30–60 minute response. Licensed restoration. Insurance-ready
              documentation.
            </h2>
            <ul className="em-why-choose__list">
              <li className="em-reveal em-reveal-delay-1">
                <span className="em-why-choose__icon">
                  <i className="fas fa-clock"></i>
                </span>
                <div className="em-why-choose__item-text">
                  <strong>30–60 Minute On-Site Response</strong>
                  <span>
                    We confirm arrival time at the moment you call — not an estimated
                    window. Our emergency crews are stationed across Florida for rapid
                    deployment.
                  </span>
                </div>
              </li>
              <li className="em-reveal em-reveal-delay-2">
                <span className="em-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="em-why-choose__item-text">
                  <strong>Licensed Restoration Contractor</strong>
                  <span>
                    We hold active Florida CGC, CPC, and CFC licenses. Every
                    restoration scope — structural, electrical, and plumbing — is
                    performed by our licensed in-house team.
                  </span>
                </div>
              </li>
              <li className="em-reveal em-reveal-delay-3">
                <span className="em-why-choose__icon">
                  <i className="fas fa-file-alt"></i>
                </span>
                <div className="em-why-choose__item-text">
                  <strong>Insurance-Ready Documentation</strong>
                  <span>
                    Every emergency visit produces a written damage report and photo
                    package formatted for insurance adjuster review. We document
                    everything from the first moment on site.
                  </span>
                </div>
              </li>
              <li className="em-reveal em-reveal-delay-4">
                <span className="em-why-choose__icon">
                  <i className="fas fa-file-contract"></i>
                </span>
                <div className="em-why-choose__item-text">
                  <strong>Single Contract — Full Scope</strong>
                  <span>
                    Stabilization, restoration, and full rebuild are managed under one
                    contract. No handoffs between emergency crews and restoration
                    contractors.
                  </span>
                </div>
              </li>
              <li className="em-reveal em-reveal-delay-5">
                <span className="em-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="em-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All restoration work is covered by our written 5-year workmanship
                    warranty — giving you confidence in the quality of every repair we
                    deliver.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="em-process">
        <div className="em-section__inner">
          <p className="em-section__label em-reveal">
            Our Emergency Response Process
          </p>
          <div className="em-process__steps">
            <div className="em-process__step em-reveal em-reveal-delay-1">
              <div className="em-process__step-number">1</div>
              <p className="em-process__step-title">You Call</p>
              <p className="em-process__step-desc">
                Emergency line answered immediately — 24/7
              </p>
            </div>
            <div className="em-process__step em-reveal em-reveal-delay-2">
              <div className="em-process__step-number">2</div>
              <p className="em-process__step-title">Dispatch</p>
              <p className="em-process__step-desc">
                Crew en route within 15 minutes of your call
              </p>
            </div>
            <div className="em-process__step em-reveal em-reveal-delay-3">
              <div className="em-process__step-number">3</div>
              <p className="em-process__step-title">On-Site</p>
              <p className="em-process__step-desc">
                Arrive within 30–60 min — stabilization begins
              </p>
            </div>
            <div className="em-process__step em-reveal em-reveal-delay-4">
              <div className="em-process__step-number">4</div>
              <p className="em-process__step-title">Assessment</p>
              <p className="em-process__step-desc">
                Written report and insurance docs same visit
              </p>
            </div>
            <div className="em-process__step em-reveal em-reveal-delay-5">
              <div className="em-process__step-number">5</div>
              <p className="em-process__step-title">Restoration</p>
              <p className="em-process__step-desc">
                Full licensed restoration under one contract
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="em-why-choose-us">
        <div className="em-section__inner">
          <p className="em-section__label em-reveal">Why Choose Us</p>
          <h2 className="em-section__title em-reveal">
            Why Choose Keentel for Fire, Storm &amp; Flood Restoration?
          </h2>
          <p
            className="em-section__text em-reveal em-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering emergency
            restoration that protects your property, your timeline, and your insurance
            claim from the moment we arrive. The following attributes set our emergency
            team apart:
          </p>
          <div className="em-why-choose-us__grid">
            <div className="em-why-choose-us__card em-reveal em-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We understand that property damage is a stressful experience. Our team
                focuses on clear communication, transparent documentation, and fast
                action — so you always know what is happening and what comes next.
              </p>
            </div>
            <div className="em-why-choose-us__card em-reveal em-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have responded to fire, storm, and flood events across all 67
                Florida counties. Our team knows Florida's specific weather patterns,
                flood zones, and building code requirements for post-disaster
                restoration.
              </p>
            </div>
            <div className="em-why-choose-us__card em-reveal em-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use moisture mapping technology, thermal imaging, and structural
                assessment tools to identify damage that is not always visible —
                ensuring complete restoration, not just surface-level repair.
              </p>
            </div>
            <div className="em-why-choose-us__card em-reveal em-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every damage assessment we produce is thorough, photo-documented, and
                written in language that insurance adjusters accept. We leave no item
                undocumented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="em-faq-section">
        <div className="em-section__inner">
          <p className="em-section__label em-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="em-section__title em-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Emergency Restoration
          </h2>
          <div className="em-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="em-faq-item em-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="em-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="em-icon"></span>
                </button>
                <div className="em-faq-item__answer-wrapper">
                  <div
                    className="em-faq-item__answer"
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
      <section className="em-cta-section">
        <div className="em-section__inner">
          {/* Emergency Banner */}
          <div className="em-cta-section__emergency-banner">
            <i className="fas fa-exclamation-triangle"></i>
            <span>
              EMERGENCY LINE:{" "}
              <a href="tel:+18133950000">(813) 395-0000</a> — Available 24 Hours, 7
              Days a Week, 365 Days a Year
            </span>
          </div>

          <h2 className="em-cta-section__title em-reveal">
            Dealing with fire, storm, or flood damage right now?
          </h2>
          <p className="em-cta-section__text em-reveal em-reveal-delay-1">
            Call our emergency line immediately. We dispatch within 15 minutes and
            arrive on-site across Florida within 30 to 60 minutes.
          </p>
          <a href="#" className="em-cta-section__btn em-reveal em-reveal-delay-2">
            {envelopeSvg}
            Request Emergency Response
          </a>
          <div className="em-cta-section__contact em-reveal em-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="em-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="em-sep">|</span>
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