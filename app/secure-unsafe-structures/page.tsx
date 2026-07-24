"use client";

import "./secure-unsafe-structures.css";
import { useEffect, useRef, useState } from "react";

export default function SecureUnsafeStructuresPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".su-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".su-faq-item");
        if (item) item.classList.add("su-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".su-faq-item");
        if (item) item.classList.remove("su-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".su-hero__slide");
    const dots = document.querySelectorAll(".su-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("su-active"));
      dots.forEach((d) => d.classList.remove("su-active"));
      slides[index].classList.add("su-active");
      dots[index].classList.add("su-active");
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

    const revealElements = document.querySelectorAll(".su-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("su-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".su-hero .su-reveal").forEach((el) =>
      el.classList.add("su-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What constitutes an unsafe structure in Florida?",
      a: "Any building where structural integrity is compromised to the point that it poses a risk of collapse, creates a fall hazard, or endangers public access — including storm damage, fire damage, foundation failure, and impact damage — is considered an unsafe structure under Florida Building Code.",
    },
    {
      q: "Are you required to notify local authorities when a structure is unsafe?",
      a: "In many cases, yes. Florida building departments and fire marshals have jurisdiction over unsafe structures. We coordinate with local authorities on your behalf and can represent you in initial code enforcement communications.",
    },
    {
      q: "Can you assess whether a structure needs to be demolished or can be repaired?",
      a: "Yes. Our licensed structural assessment identifies whether a building can be economically repaired or whether demolition is the appropriate course of action. For complex structural determinations, we coordinate a licensed structural engineer as part of our assessment process.",
    },
    {
      q: "Does your team handle both residential and commercial unsafe structures?",
      a: "Yes. We respond to unsafe structure situations in residential homes, apartment buildings, commercial properties, and industrial facilities across all 67 Florida counties.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and provide 24/7 unsafe structure response across all 67 Florida counties.",
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
      <div className="su-top-bar">
        <div className="su-top-bar__inner">
          <div className="su-top-bar__content">
            <i className="fas fa-exclamation-triangle su-top-bar__icon"></i>
            <span className="su-top-bar__label">EMERGENCY LINE:</span>
            <a href="tel:+18133950000" className="su-top-bar__phone">
              (813) 395-0000
            </a>
            <span className="su-top-bar__divider">|</span>
            <span className="su-top-bar__availability">
              Available 24 Hours, 7 Days a Week, 365 Days a Year
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="su-hero">
        <div className="su-hero__slides">
          <div
            className="su-hero__slide su-active"
            style={{
              backgroundImage:
                "url('https://media.licdn.com/dms/image/v2/D5612AQE_eHDAwpL-dg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1670939088640?e=2147483647&v=beta&t=KD0iabx4fJXG8ZUnjU6I17T6fC-YqWxcqpUIrP36KXo')",
            }}
          ></div>
          <div
            className="su-hero__slide"
            style={{
              backgroundImage:
                "url('https://cdn.prod.website-files.com/624428320eb24912385ae1e9/624428320eb2498dda5ae25a_GEBmboIRQCNeScSerksA.jpeg')",
            }}
          ></div>
        </div>

        <div className="su-hero__overlay"></div>

        <div className="su-hero__content">
          <div className="su-hero__text">
            <div className="su-hero__breadcrumb">
              <span className="su-breadcrumb__light">Emergency (24/7)</span>
              <span className="su-breadcrumb__slash">/</span>
              <span className="su-breadcrumb__accent">
                Securing Unsafe Structures
              </span>
            </div>

            <h1 className="su-hero__title su-reveal su-reveal-delay-1">
              Securing Unsafe Structures
            </h1>

            <p className="su-hero__subtitle su-reveal su-reveal-delay-2">
              <strong>24/7 Emergency Structural Response Across Florida</strong>
              <br />
              An unsafe or structurally compromised building requires immediate
              licensed response — not a next-day appointment. Our team arrives within
              30 to 60 minutes, assesses the risk, and implements emergency securing
              measures to protect occupants, neighbors, and your property.
            </p>

            <div className="su-hero__actions su-reveal su-reveal-delay-3">
              <a href="#" className="su-hero__btn su-hero__btn--primary">
                {envelopeSvg}
                Request Emergency Response
              </a>
              <a href="#" className="su-hero__btn su-hero__btn--secondary">
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

            <div className="su-hero__trust su-reveal su-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 300+ Florida property owners for unsafe
                structure response
              </span>
            </div>
          </div>
        </div>

        <div className="su-hero__dots">
          <span className="su-hero__dot su-active"></span>
          <span className="su-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="su-intro">
        <div className="su-intro__inner">
          <div
            className="su-intro__image su-reveal"
            style={{
              backgroundImage:
                "url('https://cdn.prod.website-files.com/624428320eb24912385ae1e9/624428320eb2498dda5ae25a_GEBmboIRQCNeScSerksA.jpeg')",
            }}
          ></div>
          <div className="su-intro__text su-reveal su-reveal-delay-1">
            <h2>
              When a Structure Is Unsafe, Every Hour Without Action Increases the
              Risk.
            </h2>
            <p>
              A structurally compromised building creates liability the moment the
              condition is known and left unaddressed. Whether the damage was caused by
              a storm, a vehicle impact, a foundation shift, or a fire, the standard of
              care requires immediate securing — physical measures that prevent public
              access, reduce collapse risk, and protect adjacent structures. We have
              secured residential, commercial, and industrial buildings across Florida
              for over two decades. Our licensed team arrives within 30 to 60 minutes,
              conducts a structural risk assessment, implements the appropriate
              emergency securing measures, and produces a written documentation package
              that protects you legally and supports your insurance claim.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="su-scope">
        <div className="su-section__inner">
          <div className="su-scope__header">
            <p className="su-section__label su-reveal">
              What Our Unsafe Structure Response Covers
            </p>
            <h2 className="su-reveal">
              Our unsafe structure response covers immediate risk assessment,
              emergency securing, utility isolation, and permanent repair planning —
              all managed under one licensed contract.
            </h2>
            <p className="su-reveal su-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="su-scope__grid">
            {/* Card 1: Structural Risk Assessment */}
            <div className="su-scope-card su-reveal su-reveal-delay-1">
              <div
                className="su-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="su-scope-card__number">1</span>
              </div>
              <div className="su-scope-card__body">
                <h3 className="su-scope-card__title">Structural Risk Assessment</h3>
                <ul className="su-scope-card__list">
                  <li>Visual and physical structural assessment on arrival</li>
                  <li>Identification of collapse risk zones — walls, ceilings, roofs, and floors</li>
                  <li>Load path analysis — identifying compromised load-bearing elements</li>
                  <li>Utility isolation recommendation — gas, electrical, and water</li>
                  <li>Risk zone perimeter establishment — safety boundary for public protection</li>
                  <li>Written structural assessment report issued same visit</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Emergency Shoring & Temporary Support */}
            <div className="su-scope-card su-reveal su-reveal-delay-2">
              <div
                className="su-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop')",
                }}
              >
                <span className="su-scope-card__number">2</span>
              </div>
              <div className="su-scope-card__body">
                <h3 className="su-scope-card__title">
                  Emergency Shoring &amp; Temporary Support
                </h3>
                <ul className="su-scope-card__list">
                  <li>Vertical shoring installation for compromised load-bearing walls</li>
                  <li>Horizontal bracing for leaning or displaced structural members</li>
                  <li>Ceiling and floor joist temporary support systems</li>
                  <li>Roof structure emergency shoring — preventing progressive collapse</li>
                  <li>Shoring inspection and load verification before site is reopened</li>
                  <li>Shoring maintained until permanent structural repair is completed</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Boarding, Fencing & Public Access Control */}
            <div className="su-scope-card su-reveal su-reveal-delay-3">
              <div
                className="su-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop')",
                }}
              >
                <span className="su-scope-card__number">3</span>
              </div>
              <div className="su-scope-card__body">
                <h3 className="su-scope-card__title">
                  Boarding, Fencing &amp; Public Access Control
                </h3>
                <ul className="su-scope-card__list">
                  <li>Plywood boarding of all open windows, doors, and wall breaches</li>
                  <li>Chain-link or panel fencing around the structure perimeter</li>
                  <li>Warning signage — Do Not Enter, Unsafe Structure, and hazard identification</li>
                  <li>Barricade installation at public access points adjacent to the structure</li>
                  <li>Site lighting for nighttime securing operations</li>
                  <li>Daily site checks maintained until permanent repair or demolition</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="su-scope__grid su-scope__grid--bottom">
            {/* Card 4: Utility Isolation & Hazard Mitigation */}
            <div className="su-scope-card su-reveal su-reveal-delay-4">
              <div
                className="su-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="su-scope-card__number">4</span>
              </div>
              <div className="su-scope-card__body">
                <h3 className="su-scope-card__title">
                  Utility Isolation &amp; Hazard Mitigation
                </h3>
                <ul className="su-scope-card__list">
                  <li>Electrical service isolation — coordination with utility provider where required</li>
                  <li>Natural gas service isolation and leak testing</li>
                  <li>Water supply isolation — main shut-off and drainage of pressurized systems</li>
                  <li>Hazardous material identification — asbestos, lead, and chemical storage flagging</li>
                  <li>Coordination with local authorities — fire marshal, building department, and code enforcement</li>
                  <li>Utility isolation documentation for insurance and legal purposes</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Documentation & Structural Repair Planning */}
            <div className="su-scope-card su-reveal su-reveal-delay-5">
              <div
                className="su-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="su-scope-card__number">5</span>
              </div>
              <div className="su-scope-card__body">
                <h3 className="su-scope-card__title">
                  Documentation &amp; Structural Repair Planning
                </h3>
                <ul className="su-scope-card__list">
                  <li>Comprehensive written structural assessment and securing scope report</li>
                  <li>Photo documentation package formatted for insurance adjuster review</li>
                  <li>Structural engineer referral coordination where required by Florida Building Code</li>
                  <li>Permanent repair scope developed from same-visit assessment</li>
                  <li>Permit application initiated for repair scope where required</li>
                  <li>Ongoing site monitoring until permanent repair is under contract</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="su-why-choose">
        <div className="su-why-choose__wrapper">
          <div
            className="su-why-choose__image-side su-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="su-why-choose__content-side">
            <p className="su-why-choose__label su-reveal">
              Why Property Owners and Managers Call Keentel to Secure Their Structures
            </p>
            <h2 className="su-why-choose__heading su-reveal su-reveal-delay-1">
              Licensed structural response. Immediate action. Legal protection.
            </h2>
            <ul className="su-why-choose__list">
              <li className="su-reveal su-reveal-delay-1">
                <span className="su-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="su-why-choose__item-text">
                  <strong>Licensed Structural Response</strong>
                  <span>
                    All structural emergency assessments and securing operations are
                    performed by our CGC-licensed construction team. We hold the
                    correct license for structural emergency work in Florida.
                  </span>
                </div>
              </li>
              <li className="su-reveal su-reveal-delay-2">
                <span className="su-why-choose__icon">
                  <i className="fas fa-clock"></i>
                </span>
                <div className="su-why-choose__item-text">
                  <strong>30–60 Minute On-Site Arrival</strong>
                  <span>
                    We confirm arrival time at the moment you call. Unsafe structure
                    situations are dispatched with the same urgency as any active
                    emergency — 24 hours a day across Florida.
                  </span>
                </div>
              </li>
              <li className="su-reveal su-reveal-delay-3">
                <span className="su-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="su-why-choose__item-text">
                  <strong>Legal Protection Through Speed</strong>
                  <span>
                    A documented, licensed response to an unsafe structure protects
                    you from liability the moment our team is on site. Our written
                    report establishes the timeline of action required by Florida law.
                  </span>
                </div>
              </li>
              <li className="su-reveal su-reveal-delay-4">
                <span className="su-why-choose__icon">
                  <i className="fas fa-file-contract"></i>
                </span>
                <div className="su-why-choose__item-text">
                  <strong>Full-Scope Capability</strong>
                  <span>
                    We assess, secure, and restore — all under one license and one
                    contract. The same team that secures the structure can manage the
                    permanent repair, eliminating coordination gaps.
                  </span>
                </div>
              </li>
              <li className="su-reveal su-reveal-delay-5">
                <span className="su-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="su-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All permanent structural repairs completed following emergency
                    securing are backed by our written 5-year workmanship warranty.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="su-process">
        <div className="su-section__inner">
          <p className="su-section__label su-reveal">
            Our Emergency Response Process
          </p>
          <div className="su-process__steps">
            <div className="su-process__step su-reveal su-reveal-delay-1">
              <div className="su-process__step-number">1</div>
              <p className="su-process__step-title">You Call</p>
              <p className="su-process__step-desc">
                Emergency line answered immediately — 24/7
              </p>
            </div>
            <div className="su-process__step su-reveal su-reveal-delay-2">
              <div className="su-process__step-number">2</div>
              <p className="su-process__step-title">Dispatch</p>
              <p className="su-process__step-desc">
                Licensed structural crew en route within 15 min
              </p>
            </div>
            <div className="su-process__step su-reveal su-reveal-delay-3">
              <div className="su-process__step-number">3</div>
              <p className="su-process__step-title">Assessment</p>
              <p className="su-process__step-desc">
                Structural risk assessed and documented on arrival
              </p>
            </div>
            <div className="su-process__step su-reveal su-reveal-delay-4">
              <div className="su-process__step-number">4</div>
              <p className="su-process__step-title">Securing</p>
              <p className="su-process__step-desc">
                Shoring, boarding, and fencing implemented
              </p>
            </div>
            <div className="su-process__step su-reveal su-reveal-delay-5">
              <div className="su-process__step-number">5</div>
              <p className="su-process__step-title">Repair Planning</p>
              <p className="su-process__step-desc">
                Permanent repair scope and permit initiated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="su-why-choose-us">
        <div className="su-section__inner">
          <p className="su-section__label su-reveal">Why Choose Us</p>
          <h2 className="su-section__title su-reveal">
            Why Choose Keentel for Securing Unsafe Structures?
          </h2>
          <p
            className="su-section__text su-reveal su-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in responding to unsafe
            structure situations with the speed, license, and documentation that
            protect property owners legally and structurally. The following attributes
            set our structural emergency team apart:
          </p>
          <div className="su-why-choose-us__grid">
            <div className="su-why-choose-us__card su-reveal su-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We explain the structural risk clearly, document every action we take,
                and keep you informed throughout the securing process. You always know
                what we found, what we did, and what comes next.
              </p>
            </div>
            <div className="su-why-choose-us__card su-reveal su-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have assessed and secured compromised residential, commercial, and
                industrial structures across all 67 Florida counties — after storms,
                vehicle impacts, fires, and foundation events.
              </p>
            </div>
            <div className="su-why-choose-us__card su-reveal su-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use structural analysis tools and engineering coordination to assess
                risk accurately — ensuring our shoring and securing systems are
                correctly sized for the load conditions present.
              </p>
            </div>
            <div className="su-why-choose-us__card su-reveal su-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every unsafe structure response produces a written assessment, utility
                isolation record, securing scope, and photo documentation package —
                protecting you legally and supporting your insurance claim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="su-faq-section">
        <div className="su-section__inner">
          <p className="su-section__label su-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="su-section__title su-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Securing Unsafe Structures
          </h2>
          <div className="su-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="su-faq-item su-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="su-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="su-icon"></span>
                </button>
                <div className="su-faq-item__answer-wrapper">
                  <div
                    className="su-faq-item__answer"
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
      <section className="su-cta-section">
        <div className="su-section__inner">
          {/* Emergency Banner */}
          <div className="su-cta-section__emergency-banner">
            <i className="fas fa-exclamation-triangle"></i>
            <span>
              EMERGENCY LINE:{" "}
              <a href="tel:+18133950000">(813) 395-0000</a> — Available 24 Hours, 7
              Days a Week, 365 Days a Year
            </span>
          </div>

          <h2 className="su-cta-section__title su-reveal">
            Dealing with an unsafe or compromised structure right now?
          </h2>
          <p className="su-cta-section__text su-reveal su-reveal-delay-1">
            Call our emergency line immediately. Our licensed structural team is
            dispatched within 15 minutes and on-site across Florida within 30 to 60
            minutes.
          </p>
          <a href="#" className="su-cta-section__btn su-reveal su-reveal-delay-2">
            {envelopeSvg}
            Request Emergency Response
          </a>
          <div className="su-cta-section__contact su-reveal su-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="su-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="su-sep">|</span>
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