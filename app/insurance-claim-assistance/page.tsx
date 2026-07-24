"use client";

import "./insurance-claim-assistance.css";
import { useEffect, useRef, useState } from "react";

export default function InsuranceClaimAssistancePage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".ic-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".ic-faq-item");
        if (item) item.classList.add("ic-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".ic-faq-item");
        if (item) item.classList.remove("ic-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".ic-hero__slide");
    const dots = document.querySelectorAll(".ic-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("ic-active"));
      dots.forEach((d) => d.classList.remove("ic-active"));
      slides[index].classList.add("ic-active");
      dots[index].classList.add("ic-active");
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

    const revealElements = document.querySelectorAll(".ic-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ic-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".ic-hero .ic-reveal").forEach((el) =>
      el.classList.add("ic-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Do you work with all Florida insurance carriers?",
      a: "Yes. Our damage reports and repair scopes are produced in a format accepted by all major Florida residential and commercial insurance carriers. We have experience working with adjusters across a wide range of carriers and policy types.",
    },
    {
      q: "Should I contact my insurer before or after calling you?",
      a: "Contact your insurer to open a claim as soon as possible after the damage event. Then call us. We can begin our assessment while your claim is in the early stages — our documentation will be ready when the adjuster arrives.",
    },
    {
      q: "Can you help if my claim was already submitted without your documentation?",
      a: "Yes. If your claim has already been submitted and you believe the scope is incomplete or the settlement is insufficient, we can produce a supplemental damage assessment and repair scope to support a revised claim review.",
    },
    {
      q: "Do you assist with both residential and commercial property damage claims?",
      a: "Yes. We produce licensed insurance claim documentation and repair scopes for residential homes, commercial properties, and industrial facilities across all 67 Florida counties.",
    },
    {
      q: "What areas of Florida do you serve for insurance claim assistance?",
      a: "We are headquartered in Tampa Bay and provide insurance claim assistance across all 67 Florida counties.",
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
      <div className="ic-top-bar">
        <div className="ic-top-bar__inner">
          <div className="ic-top-bar__content">
            <i className="fas fa-exclamation-triangle ic-top-bar__icon"></i>
            <span className="ic-top-bar__label">EMERGENCY LINE:</span>
            <a href="tel:+18133950000" className="ic-top-bar__phone">
              (813) 395-0000
            </a>
            <span className="ic-top-bar__divider">|</span>
            <span className="ic-top-bar__availability">
              Available 24 Hours, 7 Days a Week, 365 Days a Year
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="ic-hero">
        <div className="ic-hero__slides">
          <div
            className="ic-hero__slide ic-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="ic-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="ic-hero__overlay"></div>

        <div className="ic-hero__content">
          <div className="ic-hero__text">
            <div className="ic-hero__breadcrumb">
              <span className="ic-breadcrumb__light">Emergency (24/7)</span>
              <span className="ic-breadcrumb__slash">/</span>
              <span className="ic-breadcrumb__accent">
                Insurance Claim Assistance
              </span>
            </div>

            <h1 className="ic-hero__title ic-reveal ic-reveal-delay-1">
              Insurance Claim Assistance
            </h1>

            <p className="ic-hero__subtitle ic-reveal ic-reveal-delay-2">
              <strong>Licensed Documentation &amp; Repair Scope for Property Damage Claims</strong>
              <br />
              A successful property damage claim depends on the quality of documentation
              submitted. We produce licensed, photo-supported, scope-detailed damage
              reports that give your adjuster everything needed to process your claim
              accurately and completely.
            </p>

            <div className="ic-hero__actions ic-reveal ic-reveal-delay-3">
              <a href="#" className="ic-hero__btn ic-hero__btn--primary">
                {envelopeSvg}
                Request Emergency Response
              </a>
              <a href="#" className="ic-hero__btn ic-hero__btn--secondary">
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

            <div className="ic-hero__trust ic-reveal ic-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 400+ Florida property owners for claim
                assistance
              </span>
            </div>
          </div>
        </div>

        <div className="ic-hero__dots">
          <span className="ic-hero__dot ic-active"></span>
          <span className="ic-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="ic-intro">
        <div className="ic-intro__inner">
          <div
            className="ic-intro__image ic-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ic-intro__text ic-reveal ic-reveal-delay-1">
            <h2>
              The Difference Between a Settled Claim and a Disputed One Is
              Documentation.
            </h2>
            <p>
              We have worked alongside insurance adjusters on property damage claims
              across Florida for over two decades. The most common reason a claim is
              underpaid or disputed is not the extent of the damage — it is the quality
              of documentation submitted to support it. A written damage report
              produced by a licensed general contractor carries significantly more
              weight with an adjuster than a homeowner's description or a handyman's
              estimate. We produce insurance-ready documentation on every emergency
              visit — written scope, photo evidence, repair cost breakdown, and permit
              requirements — and we communicate directly with your adjuster where
              needed to ensure no scope item is overlooked.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="ic-scope">
        <div className="ic-section__inner">
          <div className="ic-scope__header">
            <p className="ic-section__label ic-reveal">
              What Our Insurance Claim Assistance Covers
            </p>
            <h2 className="ic-reveal">
              Our insurance claim assistance covers licensed damage assessment, repair
              scope development, adjuster communication, supplement claims, and full
              restoration documentation — from the first visit through final project
              close.
            </h2>
            <p className="ic-reveal ic-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="ic-scope__grid">
            {/* Card 1: On-Site Damage Assessment & Documentation */}
            <div className="ic-scope-card ic-reveal ic-reveal-delay-1">
              <div
                className="ic-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ic-scope-card__number">1</span>
              </div>
              <div className="ic-scope-card__body">
                <h3 className="ic-scope-card__title">
                  On-Site Damage Assessment &amp; Documentation
                </h3>
                <ul className="ic-scope-card__list">
                  <li>Licensed contractor assessment of all damage within the affected property</li>
                  <li>Room-by-room documentation — every affected surface, system, and structural element</li>
                  <li>Photo evidence package — wide-angle, mid-range, and close-up documentation of all damage</li>
                  <li>Moisture mapping for water damage events — depth and spread documented</li>
                  <li>Structural element identification — load-bearing versus non-structural damage differentiation</li>
                  <li>Documentation timestamped and GPS-tagged for adjuster verification</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Licensed Repair Scope Development */}
            <div className="ic-scope-card ic-reveal ic-reveal-delay-2">
              <div
                className="ic-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ic-scope-card__number">2</span>
              </div>
              <div className="ic-scope-card__body">
                <h3 className="ic-scope-card__title">
                  Licensed Repair Scope Development
                </h3>
                <ul className="ic-scope-card__list">
                  <li>Line-item repair scope covering all affected trades — structural, electrical, plumbing, and finish</li>
                  <li>Material specifications aligned with Florida Building Code requirements for replacement</li>
                  <li>Permit requirements identified and included in scope documentation</li>
                  <li>Labor and material cost breakdown in adjuster-compatible format</li>
                  <li>Scope covers like-for-like replacement at current Florida market pricing</li>
                  <li>Supplemental scope available for damage identified during restoration</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Adjuster Communication & Scope Support */}
            <div className="ic-scope-card ic-reveal ic-reveal-delay-3">
              <div
                className="ic-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ic-scope-card__number">3</span>
              </div>
              <div className="ic-scope-card__body">
                <h3 className="ic-scope-card__title">
                  Adjuster Communication &amp; Scope Support
                </h3>
                <ul className="ic-scope-card__list">
                  <li>Written scope submitted directly to adjuster in required format</li>
                  <li>Follow-up communication with adjuster to address scope questions</li>
                  <li>Additional documentation provided for disputed or undervalued line items</li>
                  <li>Scope revision support for items added during the inspection or restoration process</li>
                  <li>Re-inspection coordination where adjuster requires on-site review</li>
                  <li>Clear written record maintained of all adjuster communications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="ic-scope__grid ic-scope__grid--bottom">
            {/* Card 4: Supplement Claims for Identified Hidden Damage */}
            <div className="ic-scope-card ic-reveal ic-reveal-delay-4">
              <div
                className="ic-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ic-scope-card__number">4</span>
              </div>
              <div className="ic-scope-card__body">
                <h3 className="ic-scope-card__title">
                  Supplement Claims for Identified Hidden Damage
                </h3>
                <ul className="ic-scope-card__list">
                  <li>Identification and documentation of damage not visible in initial assessment</li>
                  <li>Supplement claim scope development for additional items discovered during demolition</li>
                  <li>Photo and written evidence package for supplement submission</li>
                  <li>Communication with adjuster to support supplement scope approval</li>
                  <li>Updated repair cost breakdown reflecting full discovered scope</li>
                  <li>Supplement documentation maintained as part of project file</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Restoration Completion & Final Claim Documentation */}
            <div className="ic-scope-card ic-reveal ic-reveal-delay-5">
              <div
                className="ic-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ic-scope-card__number">5</span>
              </div>
              <div className="ic-scope-card__body">
                <h3 className="ic-scope-card__title">
                  Restoration Completion &amp; Final Claim Documentation
                </h3>
                <ul className="ic-scope-card__list">
                  <li>Before and after photo documentation for final claim file</li>
                  <li>Completion certificate confirming all repair scope items are finished</li>
                  <li>Final invoice aligned with approved claim scope</li>
                  <li>Permit close-out and certificate of completion where required</li>
                  <li>Written 5-year workmanship warranty issued for all restoration work</li>
                  <li>Full project file delivered to client for insurance record retention</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="ic-why-choose">
        <div className="ic-why-choose__wrapper">
          <div
            className="ic-why-choose__image-side ic-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ic-why-choose__content-side">
            <p className="ic-why-choose__label ic-reveal">
              Why a Licensed GC Makes the Difference on Your Insurance Claim
            </p>
            <h2 className="ic-why-choose__heading ic-reveal ic-reveal-delay-1">
              Licensed documentation. Complete scope. Adjuster-ready format.
            </h2>
            <ul className="ic-why-choose__list">
              <li className="ic-reveal ic-reveal-delay-1">
                <span className="ic-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="ic-why-choose__item-text">
                  <strong>Licensed Contractor Documentation</strong>
                  <span>
                    A damage report produced by a licensed Florida general contractor
                    carries more weight with an adjuster than a homeowner estimate or
                    an unlicensed repair quote. Our documentation is produced to
                    adjuster standards.
                  </span>
                </div>
              </li>
              <li className="ic-reveal ic-reveal-delay-2">
                <span className="ic-why-choose__icon">
                  <i className="fas fa-clipboard-list"></i>
                </span>
                <div className="ic-why-choose__item-text">
                  <strong>Complete Scope — Nothing Missed</strong>
                  <span>
                    We identify and document all damage — structural, mechanical,
                    electrical, plumbing, and finish — in a single licensed
                    assessment. Incomplete scope is the most common cause of underpaid
                    claims.
                  </span>
                </div>
              </li>
              <li className="ic-reveal ic-reveal-delay-3">
                <span className="ic-why-choose__icon">
                  <i className="fas fa-file-alt"></i>
                </span>
                <div className="ic-why-choose__item-text">
                  <strong>Adjuster-Ready Format</strong>
                  <span>
                    Our damage reports and repair scopes are formatted to align with
                    standard insurance adjuster review requirements — line-item
                    breakdown, photo evidence, permit requirements, and material
                    specifications included.
                  </span>
                </div>
              </li>
              <li className="ic-reveal ic-reveal-delay-4">
                <span className="ic-why-choose__icon">
                  <i className="fas fa-plus-circle"></i>
                </span>
                <div className="ic-why-choose__item-text">
                  <strong>Supplement Support</strong>
                  <span>
                    When hidden damage is found during restoration, we develop and
                    submit supplement documentation immediately. We protect every
                    additional repair dollar your claim is entitled to.
                  </span>
                </div>
              </li>
              <li className="ic-reveal ic-reveal-delay-5">
                <span className="ic-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="ic-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All restoration work we perform under your insurance claim is
                    backed by our written 5-year workmanship warranty.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="ic-process">
        <div className="ic-section__inner">
          <p className="ic-section__label ic-reveal">
            Our Insurance Claim Assistance Process
          </p>
          <div className="ic-process__steps">
            <div className="ic-process__step ic-reveal ic-reveal-delay-1">
              <div className="ic-process__step-number">1</div>
              <p className="ic-process__step-title">On-Site Assessment</p>
              <p className="ic-process__step-desc">
                Licensed damage documentation same visit
              </p>
            </div>
            <div className="ic-process__step ic-reveal ic-reveal-delay-2">
              <div className="ic-process__step-number">2</div>
              <p className="ic-process__step-title">Scope Development</p>
              <p className="ic-process__step-desc">
                Line-item repair cost in adjuster format
              </p>
            </div>
            <div className="ic-process__step ic-reveal ic-reveal-delay-3">
              <div className="ic-process__step-number">3</div>
              <p className="ic-process__step-title">Adjuster Submission</p>
              <p className="ic-process__step-desc">
                Report and scope submitted on your behalf
              </p>
            </div>
            <div className="ic-process__step ic-reveal ic-reveal-delay-4">
              <div className="ic-process__step-number">4</div>
              <p className="ic-process__step-title">Supplement Claims</p>
              <p className="ic-process__step-desc">
                Hidden damage documented and submitted
              </p>
            </div>
            <div className="ic-process__step ic-reveal ic-reveal-delay-5">
              <div className="ic-process__step-number">5</div>
              <p className="ic-process__step-title">Restoration &amp; Close</p>
              <p className="ic-process__step-desc">
                Full repair, final invoice, and warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="ic-why-choose-us">
        <div className="ic-section__inner">
          <p className="ic-section__label ic-reveal">Why Choose Us</p>
          <h2 className="ic-section__title ic-reveal">
            Why Choose Keentel for Insurance Claim Assistance?
          </h2>
          <p
            className="ic-section__text ic-reveal ic-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in producing insurance
            documentation that gives property owners the strongest possible foundation
            for a complete and accurate claim. The following attributes set our claim
            assistance team apart:
          </p>
          <div className="ic-why-choose-us__grid">
            <div className="ic-why-choose-us__card ic-reveal ic-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We explain the claim process clearly, advise you on what to expect at
                each stage, and keep you informed of every communication with your
                adjuster. You are never left navigating the process alone.
              </p>
            </div>
            <div className="ic-why-choose-us__card ic-reveal ic-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have produced insurance claim documentation and repair scopes for
                residential, commercial, and industrial property damage events across
                all 67 Florida counties — with a strong record of claim approval.
              </p>
            </div>
            <div className="ic-why-choose-us__card ic-reveal ic-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use moisture mapping, thermal imaging, and structural assessment
                tools to ensure every item of damage is identified and documented
                before the initial claim is submitted.
              </p>
            </div>
            <div className="ic-why-choose-us__card ic-reveal ic-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every claim package we produce is reviewed internally before
                submission. Line items, material specifications, permit requirements,
                and photo references are verified against our on-site documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="ic-faq-section">
        <div className="ic-section__inner">
          <p className="ic-section__label ic-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="ic-section__title ic-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Insurance Claim Assistance
          </h2>
          <div className="ic-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="ic-faq-item ic-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="ic-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="ic-icon"></span>
                </button>
                <div className="ic-faq-item__answer-wrapper">
                  <div
                    className="ic-faq-item__answer"
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
      <section className="ic-cta-section">
        <div className="ic-section__inner">
          {/* Emergency Banner */}
          <div className="ic-cta-section__emergency-banner">
            <i className="fas fa-exclamation-triangle"></i>
            <span>
              EMERGENCY LINE:{" "}
              <a href="tel:+18133950000">(813) 395-0000</a> — Available 24 Hours, 7
              Days a Week, 365 Days a Year
            </span>
          </div>

          <h2 className="ic-cta-section__title ic-reveal">
            Need insurance claim documentation for your property damage?
          </h2>
          <p className="ic-cta-section__text ic-reveal ic-reveal-delay-1">
            Contact Keentel General Contractors today. We produce licensed damage
            documentation and repair scopes for property damage claims anywhere in
            Florida.
          </p>
          <a href="#" className="ic-cta-section__btn ic-reveal ic-reveal-delay-2">
            {envelopeSvg}
            Request Emergency Response
          </a>
          <div className="ic-cta-section__contact ic-reveal ic-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="ic-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="ic-sep">|</span>
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