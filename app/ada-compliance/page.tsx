"use client";

import "./ada-compliance.css";
import { useEffect, useRef, useState } from "react";

export default function AdaCompliancePage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".ada-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".ada-faq-item");
        if (item) item.classList.add("ada-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".ada-faq-item");
        if (item) item.classList.remove("ada-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".ada-hero__slide");
    const dots = document.querySelectorAll(".ada-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("ada-active"));
      dots.forEach((d) => d.classList.remove("ada-active"));
      slides[index].classList.add("ada-active");
      dots[index].classList.add("ada-active");
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

    const revealElements = document.querySelectorAll(".ada-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ada-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".ada-hero .ada-reveal").forEach((el) =>
      el.classList.add("ada-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What Florida properties are required to be ADA compliant?",
      a: "All commercial facilities and places of public accommodation in Florida are required to comply with the ADA Standards for Accessible Design and the Florida Accessibility Code. This includes offices, retail spaces, restaurants, medical facilities, hotels, and multi-tenant commercial buildings.",
    },
    {
      q: "When is a property required to make ADA upgrades?",
      a: "ADA upgrades are required when alterations are made to a commercial space — including tenant improvements, renovations, and additions. The path of travel to the altered area must be made accessible to the maximum extent feasible as part of the project scope.",
    },
    {
      q: "Do you provide an assessment before starting the upgrade work?",
      a: "Yes. Every ADA compliance engagement begins with a licensed contractor assessment of existing conditions. We identify all non-compliant elements, prioritize corrections by legal exposure, and provide a written assessment and construction scope before any work begins.",
    },
    {
      q: "Can unpermitted ADA work still protect us legally?",
      a: "No. Unpermitted accessibility construction does not provide legal protection in the event of a formal complaint or DOJ investigation. All ADA compliance work we deliver is permitted and inspected through the appropriate Florida county building department.",
    },
    {
      q: "What areas of Florida do you serve for ADA compliance upgrades?",
      a: "We are headquartered in Tampa Bay and deliver ADA compliance assessment and construction across all 67 Florida counties.",
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
      <section className="ada-hero">
        <div className="ada-hero__slides">
          <div
            className="ada-hero__slide ada-active"
            style={{
              backgroundImage:
                "url('https://cdn.prod.website-files.com/6772de6ead59527c2747498a/689383052143352b86616d14_ADA%20Compliance%20benefits.webp')",
            }}
          ></div>
          <div
            className="ada-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="ada-hero__overlay"></div>

        <div className="ada-hero__content">
          <div className="ada-hero__text">
            <div className="ada-hero__breadcrumb">
              <span className="ada-breadcrumb__light">Remodeling Services</span>
              <span className="ada-breadcrumb__slash">/</span>
              <span className="ada-breadcrumb__accent">
                ADA Compliance Upgrades
              </span>
            </div>

            <h1 className="ada-hero__title ada-reveal ada-reveal-delay-1">
              ADA Compliance Upgrades
            </h1>

            <p className="ada-hero__subtitle ada-reveal ada-reveal-delay-2">
              <strong>Licensed Accessibility Construction Across Florida</strong>
              <br />
              We assess, design, permit, and build ADA compliance upgrades for
              commercial properties across Florida — from accessible restrooms and
              parking to path-of-travel corrections and ramp construction. Full
              documentation included.
            </p>

            <div className="ada-hero__actions ada-reveal ada-reveal-delay-3">
              <a href="#" className="ada-hero__btn ada-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="ada-hero__btn ada-hero__btn--secondary">
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

            <div className="ada-hero__trust ada-reveal ada-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 200+ Florida commercial property owners
                for ADA compliance
              </span>
            </div>
          </div>
        </div>

        <div className="ada-hero__dots">
          <span className="ada-hero__dot ada-active"></span>
          <span className="ada-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="ada-intro">
        <div className="ada-intro__inner">
          <div
            className="ada-intro__image ada-reveal"
            style={{
              backgroundImage:
                "url('https://cdn.prod.website-files.com/6772de6ead59527c2747498a/689383052143352b86616d14_ADA%20Compliance%20benefits.webp')",
            }}
          ></div>
          <div className="ada-intro__text ada-reveal ada-reveal-delay-1">
            <h2>
              ADA Compliance Is a Legal Requirement — And a Liability Without a
              Licensed Contractor.
            </h2>
            <p>
              We have seen firsthand how ADA compliance issues are discovered at the
              worst possible times — during a tenant improvement permit review, after a
              formal complaint, or during a building sale transaction. When the trigger
              is a complaint or a legal action, the cost of non-compliance includes far
              more than the construction required to fix it. At Keentel General
              Contractors, we treat ADA compliance as a construction discipline with
              specific technical requirements — not a checklist to rush through. We
              assess the existing conditions, identify all non-compliant elements,
              design the corrections to current ADA Standards for Accessible Design,
              and build them under our CGC license with full permit management and
              written documentation.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="ada-scope">
        <div className="ada-section__inner">
          <div className="ada-scope__header">
            <p className="ada-section__label ada-reveal">
              What Our ADA Compliance Upgrade Scope Covers
            </p>
            <h2 className="ada-reveal">
              We deliver the full scope of ADA compliance construction — from
              accessible restrooms and paths of travel to parking, signage, and service
              counter modifications — managed under one licensed contract with full
              documentation.
            </h2>
            <p className="ada-reveal ada-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="ada-scope__grid">
            {/* Card 1: Accessible Restroom Construction */}
            <div className="ada-scope-card ada-reveal ada-reveal-delay-1">
              <div
                className="ada-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ada-scope-card__number">1</span>
              </div>
              <div className="ada-scope-card__body">
                <h3 className="ada-scope-card__title">
                  Accessible Restroom Construction
                </h3>
                <ul className="ada-scope-card__list">
                  <li>Restroom reconfiguration to meet minimum 60-inch turning radius requirement</li>
                  <li>Accessible water closet height — 17 to 19 inches to top of seat</li>
                  <li>Grab bar installation — rear wall and side wall, NAAMM-compliant anchoring</li>
                  <li>Lavatory height and knee clearance — ADA-compliant wall-hung or vanity installation</li>
                  <li>Accessible faucet controls — lever-handle or sensor-activated fixtures</li>
                  <li>Door width minimum 36 inches clear — hardware change to lever or push-pull where required</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Path of Travel & Accessible Route Corrections */}
            <div className="ada-scope-card ada-reveal ada-reveal-delay-2">
              <div
                className="ada-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ada-scope-card__number">2</span>
              </div>
              <div className="ada-scope-card__body">
                <h3 className="ada-scope-card__title">
                  Path of Travel &amp; Accessible Route Corrections
                </h3>
                <ul className="ada-scope-card__list">
                  <li>Path of travel assessment from accessible parking to all primary entrances and amenities</li>
                  <li>Threshold removal and transition repairs for changes in level exceeding 1/2 inch</li>
                  <li>Flooring surface correction — removing high-pile carpet and unstable surfaces on accessible routes</li>
                  <li>Cross-slope correction on exterior paths — maximum 2 percent cross-slope per ADA Standards</li>
                  <li>Tactile warning surface installation at curb ramps and hazardous vehicle areas</li>
                  <li>Clear width verification and obstruction removal throughout accessible route</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Accessible Ramp & Entrance Construction */}
            <div className="ada-scope-card ada-reveal ada-reveal-delay-3">
              <div
                className="ada-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ada-scope-card__number">3</span>
              </div>
              <div className="ada-scope-card__body">
                <h3 className="ada-scope-card__title">
                  Accessible Ramp &amp; Entrance Construction
                </h3>
                <ul className="ada-scope-card__list">
                  <li>Ramp design — maximum 1:12 slope ratio, minimum 36-inch clear width, and level landing at top and bottom</li>
                  <li>Handrail installation — graspable rail at 34 to 38 inches, returns and extensions per code</li>
                  <li>Curb ramp construction at parking areas — compliant slope, detectable warning surfaces, and drainage</li>
                  <li>Entrance door replacement — minimum 32-inch clear opening, compliant hardware, and closing speed</li>
                  <li>Vestibule reconfiguration where interior accessible route requires minimum maneuvering clearance</li>
                  <li>Permit management and county inspection for all accessible entrance construction</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="ada-scope__grid ada-scope__grid--bottom">
            {/* Card 4: Accessible Parking Construction */}
            <div className="ada-scope-card ada-reveal ada-reveal-delay-4">
              <div
                className="ada-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ada-scope-card__number">4</span>
              </div>
              <div className="ada-scope-card__body">
                <h3 className="ada-scope-card__title">
                  Accessible Parking Construction
                </h3>
                <ul className="ada-scope-card__list">
                  <li>Accessible space count verification — minimum 1 in 25 spaces per ADA Standards</li>
                  <li>Standard and van-accessible space construction — minimum dimensions and access aisle widths</li>
                  <li>Surface slope correction — maximum 2 percent slope in all directions per ADA Standards</li>
                  <li>Detectable warning surface installation at curb cuts adjacent to accessible spaces</li>
                  <li>Signage installation — ISA symbol, van-accessible designation, and height per Florida standards</li>
                  <li>Permit management and stripe painting to current Florida DOT accessible parking standards</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Service Counter, Signage & Amenity Compliance */}
            <div className="ada-scope-card ada-reveal ada-reveal-delay-5">
              <div
                className="ada-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ada-scope-card__number">5</span>
              </div>
              <div className="ada-scope-card__body">
                <h3 className="ada-scope-card__title">
                  Service Counter, Signage &amp; Amenity Compliance
                </h3>
                <ul className="ada-scope-card__list">
                  <li>Service counter height — section lowered to maximum 36 inches for accessible transaction surface</li>
                  <li>Reach range corrections — controls, outlets, and dispensers repositioned within accessible reach zones</li>
                  <li>Signage compliance — raised characters, Braille, and mounting height per ADA Standards</li>
                  <li>Drinking fountain height and knee clearance — accessible fountain installation where required</li>
                  <li>Elevator control panel and call button height verification and correction</li>
                  <li>Written ADA compliance documentation package — assessment, construction scope, and completion record</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="ada-why-choose">
        <div className="ada-why-choose__wrapper">
          <div
            className="ada-why-choose__image-side ada-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ada-why-choose__content-side">
            <p className="ada-why-choose__label ada-reveal">
              Why Commercial Property Owners Trust Keentel for ADA Compliance
            </p>
            <h2 className="ada-why-choose__heading ada-reveal ada-reveal-delay-1">
              Licensed construction — not consulting. Full documentation.
              Permit-managed.
            </h2>
            <ul className="ada-why-choose__list">
              <li className="ada-reveal ada-reveal-delay-1">
                <span className="ada-why-choose__icon">
                  <i className="fas fa-hard-hat"></i>
                </span>
                <div className="ada-why-choose__item-text">
                  <strong>Licensed Construction — Not Consulting</strong>
                  <span>
                    We do not provide compliance reports and leave you to find a
                    contractor. We assess the conditions, design the corrections, manage
                    the permits, and build the upgrades — all under one CGC license.
                  </span>
                </div>
              </li>
              <li className="ada-reveal ada-reveal-delay-2">
                <span className="ada-why-choose__icon">
                  <i className="fas fa-book"></i>
                </span>
                <div className="ada-why-choose__item-text">
                  <strong>Current ADA Standards Knowledge</strong>
                  <span>
                    We build to the current ADA Standards for Accessible Design and the
                    Florida Accessibility Code — which have specific requirements that
                    differ from the federal standard in certain conditions. We know
                    both.
                  </span>
                </div>
              </li>
              <li className="ada-reveal ada-reveal-delay-3">
                <span className="ada-why-choose__icon">
                  <i className="fas fa-file-alt"></i>
                </span>
                <div className="ada-why-choose__item-text">
                  <strong>Written Documentation Package</strong>
                  <span>
                    Every ADA compliance project we complete includes a written
                    documentation package — assessment findings, construction scope
                    completed, permit records, and inspection sign-offs. This package
                    protects you in any future complaint or audit.
                  </span>
                </div>
              </li>
              <li className="ada-reveal ada-reveal-delay-4">
                <span className="ada-why-choose__icon">
                  <i className="fas fa-clipboard-list"></i>
                </span>
                <div className="ada-why-choose__item-text">
                  <strong>Permit-Managed Construction</strong>
                  <span>
                    All ADA compliance construction is permitted and inspected through
                    the appropriate Florida county building department. Unpermitted
                    accessibility work does not provide legal protection.
                  </span>
                </div>
              </li>
              <li className="ada-reveal ada-reveal-delay-5">
                <span className="ada-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="ada-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All ADA compliance construction is backed by our written 5-year
                    workmanship warranty — applied to all scope our licensed team
                    delivers.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="ada-process">
        <div className="ada-section__inner">
          <p className="ada-section__label ada-reveal">
            How We Manage Every ADA Compliance Project
          </p>
          <div className="ada-process__steps">
            <div className="ada-process__step ada-reveal ada-reveal-delay-1">
              <div className="ada-process__step-number">1</div>
              <p className="ada-process__step-title">Conditions Assessment</p>
              <p className="ada-process__step-desc">
                Existing non-compliant elements identified
              </p>
            </div>
            <div className="ada-process__step ada-reveal ada-reveal-delay-2">
              <div className="ada-process__step-number">2</div>
              <p className="ada-process__step-title">Correction Design</p>
              <p className="ada-process__step-desc">
                ADA-compliant scope designed and documented
              </p>
            </div>
            <div className="ada-process__step ada-reveal ada-reveal-delay-3">
              <div className="ada-process__step-number">3</div>
              <p className="ada-process__step-title">Permit Submission</p>
              <p className="ada-process__step-desc">
                Permit package submitted and managed
              </p>
            </div>
            <div className="ada-process__step ada-reveal ada-reveal-delay-4">
              <div className="ada-process__step-number">4</div>
              <p className="ada-process__step-title">Licensed Construction</p>
              <p className="ada-process__step-desc">
                All corrections built by our in-house team
              </p>
            </div>
            <div className="ada-process__step ada-reveal ada-reveal-delay-5">
              <div className="ada-process__step-number">5</div>
              <p className="ada-process__step-title">Documentation &amp; Warranty</p>
              <p className="ada-process__step-desc">
                Written compliance record and warranty issued
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="ada-why-choose-us">
        <div className="ada-section__inner">
          <p className="ada-section__label ada-reveal">Why Choose Us</p>
          <h2 className="ada-section__title ada-reveal">
            Why Choose Keentel for ADA Compliance Upgrades?
          </h2>
          <p
            className="ada-section__text ada-reveal ada-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering ADA compliance
            construction that protects commercial property owners legally and provides
            genuinely accessible environments. The following attributes set our
            compliance team apart:
          </p>
          <div className="ada-why-choose-us__grid">
            <div className="ada-why-choose-us__card ada-reveal ada-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We explain every non-compliant condition we find in plain language,
                provide a prioritized correction plan based on legal exposure and cost,
                and build all corrections under one contract — without unnecessary
                scope expansion.
              </p>
            </div>
            <div className="ada-why-choose-us__card ada-reveal ada-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have designed and built ADA compliance upgrades for offices, retail
                properties, restaurants, medical facilities, and multi-tenant
                commercial buildings across all 67 Florida counties.
              </p>
            </div>
            <div className="ada-why-choose-us__card ada-reveal ada-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use measurement tools and digital documentation to assess existing
                conditions accurately — ensuring our correction scope is complete and
                defensible, not based on visual estimates.
              </p>
            </div>
            <div className="ada-why-choose-us__card ada-reveal ada-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                ADA compliance has specific dimensional requirements that cannot be
                approximated. Every element we build is measured against current ADA
                Standards and the Florida Accessibility Code before the county
                inspection is scheduled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="ada-faq-section">
        <div className="ada-section__inner">
          <p className="ada-section__label ada-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="ada-section__title ada-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About ADA Compliance Upgrades
          </h2>
          <div className="ada-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="ada-faq-item ada-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="ada-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="ada-icon"></span>
                </button>
                <div className="ada-faq-item__answer-wrapper">
                  <div
                    className="ada-faq-item__answer"
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
      <section className="ada-cta-section">
        <div className="ada-section__inner">
          <h2 className="ada-cta-section__title ada-reveal">
            Need ADA compliance upgrades for your property?
          </h2>
          <p className="ada-cta-section__text ada-reveal ada-reveal-delay-1">
            Contact Keentel General Contractors today for a free assessment and
            estimate on ADA compliance construction for your commercial property
            anywhere in Florida.
          </p>
          <a href="#" className="ada-cta-section__btn ada-reveal ada-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="ada-cta-section__contact ada-reveal ada-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="ada-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="ada-sep">|</span>
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