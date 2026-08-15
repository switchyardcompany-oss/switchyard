"use client";

import "./quality-assurance.css";
import { useEffect, useRef, useState } from "react";

export default function QualityAssurancePage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".qa-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".qa-faq-item");
        if (item) item.classList.add("qa-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".qa-faq-item");
        if (item) item.classList.remove("qa-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".qa-hero__slide");
    const dots = document.querySelectorAll(".qa-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("qa-active"));
      dots.forEach((d) => d.classList.remove("qa-active"));
      slides[index].classList.add("qa-active");
      dots[index].classList.add("qa-active");
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

    const revealElements = document.querySelectorAll(".qa-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("qa-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".qa-hero .qa-reveal").forEach((el) =>
      el.classList.add("qa-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What quality control inspections do you perform on a construction project?",
      a: "We perform internal QC inspections at every critical phase — foundation, pre-drywall, MEP rough-in, framing, and final. Each inspection is documented with written findings and photos before county inspections are scheduled.",
    },
    {
      q: "Are your job sites OSHA compliant?",
      a: "Yes. Every Keentel job site operates under a written site-specific safety plan that meets OSHA 29 CFR 1926 construction standards. Safety compliance is assessed daily, with weekly documented toolbox talks for all crew.",
    },
    {
      q: "What happens if a quality issue is found during construction?",
      a: "Our internal QC process exists specifically to find issues before the client or the county inspector does. When a deficiency is identified, it is logged, assigned to the responsible trade, corrected, and re-inspected — all before the next phase begins.",
    },
    {
      q: "Do you use third-party inspectors?",
      a: "For projects requiring special inspections under Florida Building Code — such as high-strength concrete, masonry, or structural steel — we coordinate licensed third-party special inspectors as part of our permit package.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and apply our quality assurance and safety control systems to projects across all 67 Florida counties.",
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
      {/* ═══════════ HERO ═══════════ */}
      <section className="qa-hero">
        <div className="qa-hero__slides">
          <div
            className="qa-hero__slide qa-active"
            style={{
              backgroundImage:
                "url('https://www.latestquality.com/wp-content/uploads/2018/03/quality-assurance-in-construction.jpg')",
            }}
          ></div>
          <div
            className="qa-hero__slide"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEYhGxeeY1gMxIQCvWk3-31kOWPc9O2E_Mf4NHmyQQp3xxTn6b3TGp5oEK&s=10')",
            }}
          ></div>
        </div>

        <div className="qa-hero__overlay"></div>

        <div className="qa-hero__content">
          <div className="qa-hero__text">
            <div className="qa-hero__breadcrumb">
              <span className="qa-breadcrumb__light">Build Services</span>
              <span className="qa-breadcrumb__slash">/</span>
              <span className="qa-breadcrumb__accent">
                Quality Assurance &amp; Safety Control
              </span>
            </div>

            <h1 className="qa-hero__title qa-reveal qa-reveal-delay-1">
              Quality Assurance &amp; Safety Control
            </h1>

            <p className="qa-hero__subtitle qa-reveal qa-reveal-delay-2">
              <strong>Built Into Every Phase of Every Project</strong>
              <br />
              We don't inspect quality at the end of a project — we build it in from
              day one. Every trade, every phase, and every inspection is managed to a
              documented quality and safety standard across all of Florida.
            </p>

            <div className="qa-hero__actions qa-reveal qa-reveal-delay-3">
              <a href="#" className="qa-hero__btn qa-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="qa-hero__btn qa-hero__btn--secondary">
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

            <div className="qa-hero__trust qa-reveal qa-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 200+ Florida clients for QA &amp; safety
              </span>
            </div>
          </div>
        </div>

        <div className="qa-hero__dots">
          <span className="qa-hero__dot qa-active"></span>
          <span className="qa-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="qa-intro">
        <div className="qa-intro__inner">
          <div
            className="qa-intro__image qa-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="qa-intro__text qa-reveal qa-reveal-delay-1">
            <h2>The Highest Standard on Every Job Site. Every Day.</h2>
            <p>
              At Keentel General Contractors, quality assurance and job site safety are
              not policies posted on a wall — they are active systems applied at every
              phase of every project we manage. Our QA/QC process begins before the
              first crew member steps on site and continues through final handover.
              Every trade scope is reviewed against documented quality standards, every
              phase is internally inspected before county inspections are scheduled,
              and every job site operates under a written safety plan that meets or
              exceeds OSHA requirements. We have seen firsthand how quality failures
              discovered late in a project cost clients time, money, and frustration.
              Our systems exist to find those issues before they become problems.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ BUILD SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="qa-scope">
        <div className="qa-section__inner">
          <div className="qa-scope__header">
            <p className="qa-section__label qa-reveal">
              Our Quality &amp; Safety Systems — Phase by Phase
            </p>
            <h2 className="qa-reveal">
              Quality assurance and safety control are applied at every stage of
              construction.
            </h2>
            <p className="qa-reveal qa-reveal-delay-1">
              Here is how our licensed team manages both disciplines across the full
              project lifecycle.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="qa-scope__grid">
            {/* Card 1: Pre-Construction Quality & Safety Planning */}
            <div className="qa-scope-card qa-reveal qa-reveal-delay-1">
              <div
                className="qa-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507238691740-34c1a851f1d0?w=600&h=400&fit=crop')",
                }}
              >
                <span className="qa-scope-card__number">1</span>
              </div>
              <div className="qa-scope-card__body">
                <h3 className="qa-scope-card__title">
                  Pre-Construction Quality &amp; Safety Planning
                </h3>
                <ul className="qa-scope-card__list">
                  <li>Written site-specific safety plan developed before mobilization</li>
                  <li>Quality control plan — trade-specific standards documented and distributed</li>
                  <li>Subcontractor and supplier qualification — quality and safety criteria verified</li>
                  <li>Material specification review — approved product lists established</li>
                  <li>OSHA compliance verification — PPE, fall protection, and hazard communication plans</li>
                  <li>Site hazard assessment — utility locates, soil conditions, and access risks documented</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Structural & Foundation Quality Control */}
            <div className="qa-scope-card qa-reveal qa-reveal-delay-2">
              <div
                className="qa-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop')",
                }}
              >
                <span className="qa-scope-card__number">2</span>
              </div>
              <div className="qa-scope-card__body">
                <h3 className="qa-scope-card__title">
                  Structural &amp; Foundation Quality Control
                </h3>
                <ul className="qa-scope-card__list">
                  <li>Rebar placement and spacing verified against structural drawings before pour</li>
                  <li>Concrete mix design and slump testing at point of delivery</li>
                  <li>Foundation formwork inspection before and after concrete placement</li>
                  <li>Anchor bolt placement and embedment verification</li>
                  <li>Post-pour cure monitoring for minimum 7-day period</li>
                  <li>Third-party special inspection coordination where required by code</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Framing, MEP Rough-In & Pre-Drywall Inspection */}
            <div className="qa-scope-card qa-reveal qa-reveal-delay-3">
              <div
                className="qa-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop')",
                }}
              >
                <span className="qa-scope-card__number">3</span>
              </div>
              <div className="qa-scope-card__body">
                <h3 className="qa-scope-card__title">
                  Framing, MEP Rough-In &amp; Pre-Drywall Inspection
                </h3>
                <ul className="qa-scope-card__list">
                  <li>Structural framing inspection — member sizing, spacing, and connection hardware</li>
                  <li>Hurricane strap and wind mitigation installation verification</li>
                  <li>Electrical rough-in review — panel sizing, circuit labeling, and conduit routing</li>
                  <li>Plumbing rough-in pressure test before wall closure</li>
                  <li>HVAC ductwork layout and equipment sizing verification</li>
                  <li>Fire blocking, draft stopping, and firestop installation inspection</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="qa-scope__grid qa-scope__grid--bottom">
            {/* Card 4: Ongoing Job Site Safety Management */}
            <div className="qa-scope-card qa-reveal qa-reveal-delay-4">
              <div
                className="qa-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop')",
                }}
              >
                <span className="qa-scope-card__number">4</span>
              </div>
              <div className="qa-scope-card__body">
                <h3 className="qa-scope-card__title">
                  Ongoing Job Site Safety Management
                </h3>
                <ul className="qa-scope-card__list">
                  <li>Weekly safety toolbox talks — documented and signed by all crew</li>
                  <li>Daily hazard assessment — conditions reviewed every morning before work begins</li>
                  <li>Fall protection compliance — guardrails, personal fall arrest, and covers verified</li>
                  <li>Electrical safety — temporary power GFCI protection and lockout/tagout compliance</li>
                  <li>Hot work permit system — welding, cutting, and grinding activities controlled</li>
                  <li>Incident reporting and near-miss documentation protocol active throughout</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Final Inspection & Close-Out Quality Review */}
            <div className="qa-scope-card qa-reveal qa-reveal-delay-5">
              <div
                className="qa-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="qa-scope-card__number">5</span>
              </div>
              <div className="qa-scope-card__body">
                <h3 className="qa-scope-card__title">
                  Final Inspection &amp; Close-Out Quality Review
                </h3>
                <ul className="qa-scope-card__list">
                  <li>Internal QC walkthrough across all trades before county final inspection</li>
                  <li>Deficiency log created and assigned to responsible trades for correction</li>
                  <li>All corrections verified and re-inspected before county inspection is scheduled</li>
                  <li>County final inspection — building, electrical, plumbing, and mechanical</li>
                  <li>Client walkthrough — every room and system reviewed and signed off</li>
                  <li>Written 5-year workmanship warranty issued at project close</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="qa-why-choose">
        <div className="qa-why-choose__wrapper">
          <div
            className="qa-why-choose__image-side qa-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="qa-why-choose__content-side">
            <p className="qa-why-choose__label qa-reveal">
              Why Our Quality &amp; Safety Standards Set Us Apart
            </p>
            <h2 className="qa-why-choose__heading qa-reveal qa-reveal-delay-1">
              Built In — Not Bolted On
            </h2>
            <ul className="qa-why-choose__list">
              <li className="qa-reveal qa-reveal-delay-1">
                <span className="qa-why-choose__icon">
                  <i className="fas fa-check-circle"></i>
                </span>
                <div className="qa-why-choose__item-text">
                  <strong>Built In — Not Bolted On</strong>
                  <span>
                    Quality and safety are embedded in our project planning from day
                    one — not added as afterthoughts during construction. Every phase
                    has documented standards before work begins.
                  </span>
                </div>
              </li>
              <li className="qa-reveal qa-reveal-delay-2">
                <span className="qa-why-choose__icon">
                  <i className="fas fa-clipboard-check"></i>
                </span>
                <div className="qa-why-choose__item-text">
                  <strong>Internal Inspections First</strong>
                  <span>
                    We conduct internal QC inspections at every critical phase before
                    scheduling county inspections. We find and fix issues before they
                    become county rejection items or client complaints.
                  </span>
                </div>
              </li>
              <li className="qa-reveal qa-reveal-delay-3">
                <span className="qa-why-choose__icon">
                  <i className="fas fa-hard-hat"></i>
                </span>
                <div className="qa-why-choose__item-text">
                  <strong>OSHA-Compliant Job Sites</strong>
                  <span>
                    Every Keentel job site operates under a written safety plan that
                    meets OSHA 29 CFR 1926 construction safety standards. Safety
                    compliance is verified daily — not weekly.
                  </span>
                </div>
              </li>
              <li className="qa-reveal qa-reveal-delay-4">
                <span className="qa-why-choose__icon">
                  <i className="fas fa-file-alt"></i>
                </span>
                <div className="qa-why-choose__item-text">
                  <strong>Documented at Every Stage</strong>
                  <span>
                    Every quality inspection and safety check is documented with
                    written records and photos. Our paper trail protects the client
                    legally and gives us a clear accountability record.
                  </span>
                </div>
              </li>
              <li className="qa-reveal qa-reveal-delay-5">
                <span className="qa-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="qa-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Our commitment to quality does not end at handover. Every project
                    is backed by a written 5-year workmanship warranty — the clearest
                    signal that we stand behind our work.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="qa-process">
        <div className="qa-section__inner">
          <p className="qa-section__label qa-reveal">
            How We Apply QA &amp; Safety Across Every Project
          </p>
          <div className="qa-process__steps">
            <div className="qa-process__step qa-reveal qa-reveal-delay-1">
              <div className="qa-process__step-number">1</div>
              <p className="qa-process__step-title">Planning</p>
              <p className="qa-process__step-desc">
                Site safety plan and QC standards documented
              </p>
            </div>
            <div className="qa-process__step qa-reveal qa-reveal-delay-2">
              <div className="qa-process__step-number">2</div>
              <p className="qa-process__step-title">Foundation</p>
              <p className="qa-process__step-desc">
                Structural inspections and material testing
              </p>
            </div>
            <div className="qa-process__step qa-reveal qa-reveal-delay-3">
              <div className="qa-process__step-number">3</div>
              <p className="qa-process__step-title">Rough-In</p>
              <p className="qa-process__step-desc">
                Pre-drywall QC and MEP pressure testing
              </p>
            </div>
            <div className="qa-process__step qa-reveal qa-reveal-delay-4">
              <div className="qa-process__step-number">4</div>
              <p className="qa-process__step-title">Active Site</p>
              <p className="qa-process__step-desc">
                Daily safety checks and weekly toolbox talks
              </p>
            </div>
            <div className="qa-process__step qa-reveal qa-reveal-delay-5">
              <div className="qa-process__step-number">5</div>
              <p className="qa-process__step-title">Final &amp; Warranty</p>
              <p className="qa-process__step-desc">
                Internal QC, county final, and warranty issued
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="qa-why-choose-us">
        <div className="qa-section__inner">
          <p className="qa-section__label qa-reveal">Why Choose Us</p>
          <h2 className="qa-section__title qa-reveal">
            Why Choose Keentel for Quality Assurance &amp; Safety Control?
          </h2>
          <p
            className="qa-section__text qa-reveal qa-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in maintaining quality and
            safety standards that protect our clients, our crew, and the integrity of
            every project we deliver. The following attributes set our QA/safety team
            apart:
          </p>
          <div className="qa-why-choose-us__grid">
            <div className="qa-why-choose-us__card qa-reveal qa-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                Our quality standards are built around your project's specific
                requirements — structural specifications, finish quality expectations,
                and code requirements are documented before construction begins.
              </p>
            </div>
            <div className="qa-why-choose-us__card qa-reveal qa-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have maintained consistent quality and safety records across
                residential, commercial, and industrial projects in all 67 Florida
                counties — with a strong track record of first-inspection approvals.
              </p>
            </div>
            <div className="qa-why-choose-us__card qa-reveal qa-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use digital inspection checklists, photo documentation, and
                deficiency tracking systems to manage quality control with accuracy
                and speed across active project sites.
              </p>
            </div>
            <div className="qa-why-choose-us__card qa-reveal qa-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every deficiency identified in our internal inspections is assigned,
                tracked, and re-inspected before the next phase begins. Nothing
                advances until it meets our documented quality standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="qa-faq-section">
        <div className="qa-section__inner">
          <p className="qa-section__label qa-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="qa-section__title qa-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Quality Assurance &amp; Safety
          </h2>
          <div className="qa-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="qa-faq-item qa-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="qa-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="qa-icon"></span>
                </button>
                <div className="qa-faq-item__answer-wrapper">
                  <div
                    className="qa-faq-item__answer"
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
      <section className="qa-cta-section">
        <div className="qa-section__inner">
          <h2 className="qa-cta-section__title qa-reveal">
            Build with a team that takes quality seriously.
          </h2>
          <p className="qa-cta-section__text qa-reveal qa-reveal-delay-1">
            Contact Keentel General Contractors today for a free consultation on your
            residential, commercial, or industrial project anywhere in Florida.
          </p>
          <a href="#" className="qa-cta-section__btn qa-reveal qa-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="qa-cta-section__contact qa-reveal qa-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="qa-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="qa-sep">|</span>
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