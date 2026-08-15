"use client";

import "./additions-expansions.css";
import { useEffect, useRef, useState } from "react";

export default function AdditionsExpansionsPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".ae-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".ae-faq-item");
        if (item) item.classList.add("ae-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".ae-faq-item");
        if (item) item.classList.remove("ae-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".ae-hero__slide");
    const dots = document.querySelectorAll(".ae-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("ae-active"));
      dots.forEach((d) => d.classList.remove("ae-active"));
      slides[index].classList.add("ae-active");
      dots[index].classList.add("ae-active");
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

    const revealElements = document.querySelectorAll(".ae-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ae-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".ae-hero .ae-reveal").forEach((el) =>
      el.classList.add("ae-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Do I need a permit for a room addition in Florida?",
      a: "Yes. All room additions, second-story expansions, and garage conversions in Florida require building permits. We manage the full permit application, plan review, inspection, and certificate of completion process on your behalf.",
    },
    {
      q: "Can my existing structure support a second-story addition?",
      a: "That depends on the existing foundation and framing condition. We conduct a structural assessment of the existing building before designing any second-story addition. Where the existing structure requires reinforcement, we include that scope in the project plan.",
    },
    {
      q: "How long does a room addition typically take?",
      a: "A single-room addition typically takes 8 to 14 weeks from permit approval to final finish. Second-story additions and commercial expansions are scoped individually. We provide a fixed schedule before contract signing.",
    },
    {
      q: "Do you build additions on commercial properties?",
      a: "Yes. We deliver commercial building expansions and additions across Florida — including new wings, additional floors, and accessory structure additions — under our CGC license with full permit management.",
    },
    {
      q: "What areas of Florida do you serve for additions and expansions?",
      a: "We are headquartered in Tampa Bay and build additions and expansions across all 67 Florida counties.",
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
      <section className="ae-hero">
        <div className="ae-hero__slides">
          <div
            className="ae-hero__slide ae-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="ae-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="ae-hero__overlay"></div>

        <div className="ae-hero__content">
          <div className="ae-hero__text">
            <div className="ae-hero__breadcrumb">
              <span className="ae-breadcrumb__light">Remodeling Services</span>
              <span className="ae-breadcrumb__slash">/</span>
              <span className="ae-breadcrumb__accent">
                Additions &amp; Expansions
              </span>
            </div>

            <h1 className="ae-hero__title ae-reveal ae-reveal-delay-1">
              Additions &amp; Expansions
            </h1>

            <p className="ae-hero__subtitle ae-reveal ae-reveal-delay-2">
              <strong>
                Room Additions, Second Stories &amp; Commercial Expansions Across
                Florida
              </strong>
              <br />
              We design and build additions and expansions under one licensed contract
              — architectural drawings, permits, structural construction, MEP, and
              finishing — delivered on schedule across Florida.
            </p>

            <div className="ae-hero__actions ae-reveal ae-reveal-delay-3">
              <a href="#" className="ae-hero__btn ae-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="ae-hero__btn ae-hero__btn--secondary">
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

            <div className="ae-hero__trust ae-reveal ae-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 350+ Florida property owners for additions
                &amp; expansions
              </span>
            </div>
          </div>
        </div>

        <div className="ae-hero__dots">
          <span className="ae-hero__dot ae-active"></span>
          <span className="ae-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="ae-intro">
        <div className="ae-intro__inner">
          <div
            className="ae-intro__image ae-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ae-intro__text ae-reveal ae-reveal-delay-1">
            <h2>More Space. Built Right. Without Starting Over.</h2>
            <p>
              We prioritize a strategy that treats every addition as an extension of
              the existing structure — not a separate project bolted onto the side of
              your home or building. Poor additions are visible in three ways:
              mismatched exterior finishes, structural connections that were not
              engineered correctly, and MEP systems that were not properly integrated
              with the existing building. We design every addition to match and connect
              properly with what is already there — structurally, mechanically, and
              aesthetically. Every project is permitted, engineered where required, and
              built to Florida Building Code from the first day of construction.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="ae-scope">
        <div className="ae-section__inner">
          <div className="ae-scope__header">
            <p className="ae-section__label ae-reveal">
              What Our Additions &amp; Expansions Scope Covers
            </p>
            <h2 className="ae-reveal">
              We deliver residential and commercial additions of all types — managed
              from architectural drawings and permits through structural build and
              final finish under one licensed contract.
            </h2>
            <p className="ae-reveal ae-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="ae-scope__grid">
            {/* Card 1: Room Additions */}
            <div className="ae-scope-card ae-reveal ae-reveal-delay-1">
              <div
                className="ae-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ae-scope-card__number">1</span>
              </div>
              <div className="ae-scope-card__body">
                <h3 className="ae-scope-card__title">Room Additions</h3>
                <ul className="ae-scope-card__list">
                  <li>Foundation extension — slab, stem wall, or pier design to match existing structure</li>
                  <li>Structural framing — wood, block, or steel stud matching existing construction type</li>
                  <li>Roofline integration — new addition roof tied into existing roof system with proper flashing</li>
                  <li>Full MEP extension — electrical, plumbing, and HVAC extended from existing systems</li>
                  <li>Exterior finish matching — siding, stucco, or brick to match the existing home facade</li>
                  <li>Interior finish — flooring, drywall, trim, and paint to match the existing interior</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Second-Story Additions */}
            <div className="ae-scope-card ae-reveal ae-reveal-delay-2">
              <div
                className="ae-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ae-scope-card__number">2</span>
              </div>
              <div className="ae-scope-card__body">
                <h3 className="ae-scope-card__title">Second-Story Additions</h3>
                <ul className="ae-scope-card__list">
                  <li>Structural engineering assessment of existing first-floor capacity to support second story</li>
                  <li>Load-bearing wall reinforcement or beam installation where additional support is required</li>
                  <li>Full second-floor framing — floor system, exterior walls, and roof structure</li>
                  <li>Stair design and construction — connecting first and second floors per Florida Building Code</li>
                  <li>MEP extension — electrical panel upgrade, plumbing stack, and HVAC zoning for second floor</li>
                  <li>Exterior finish and roofline integration — matching existing home appearance from the street</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Garage Conversions & ADU Additions */}
            <div className="ae-scope-card ae-reveal ae-reveal-delay-3">
              <div
                className="ae-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ae-scope-card__number">3</span>
              </div>
              <div className="ae-scope-card__body">
                <h3 className="ae-scope-card__title">
                  Garage Conversions &amp; ADU Additions
                </h3>
                <ul className="ae-scope-card__list">
                  <li>Garage slab assessment and moisture barrier installation for habitable space conversion</li>
                  <li>Exterior wall insulation and interior framing for conditioned space requirements</li>
                  <li>Egress window installation per Florida Building Code occupancy requirements</li>
                  <li>Full MEP installation — split system HVAC, electrical circuits, and plumbing where required</li>
                  <li>Interior finish — drywall, flooring, trim, and paint throughout</li>
                  <li>Permit management — change of occupancy permit and inspection coordination</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="ae-scope__grid ae-scope__grid--bottom">
            {/* Card 4: Commercial Building Expansions */}
            <div className="ae-scope-card ae-reveal ae-reveal-delay-4">
              <div
                className="ae-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ae-scope-card__number">4</span>
              </div>
              <div className="ae-scope-card__body">
                <h3 className="ae-scope-card__title">Commercial Building Expansions</h3>
                <ul className="ae-scope-card__list">
                  <li>Structural tie-in engineering — connecting new addition to existing commercial structure</li>
                  <li>Foundation design for new addition load — slab, caissons, or spread footings</li>
                  <li>Building envelope extension — roof, exterior walls, glazing, and waterproofing</li>
                  <li>MEP expansion — electrical service capacity, plumbing system extension, and HVAC zoning</li>
                  <li>Fire suppression system extension and fire separation where required by occupancy</li>
                  <li>Certificate of Occupancy coordination for expanded commercial space</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Permit Management & Structural Engineering */}
            <div className="ae-scope-card ae-reveal ae-reveal-delay-5">
              <div
                className="ae-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ae-scope-card__number">5</span>
              </div>
              <div className="ae-scope-card__body">
                <h3 className="ae-scope-card__title">
                  Permit Management &amp; Structural Engineering
                </h3>
                <ul className="ae-scope-card__list">
                  <li>Architectural drawing set for addition — floor plan, elevations, and sections</li>
                  <li>Structural engineering for all addition types requiring engineered connections or second-story loads</li>
                  <li>Building permit application and county plan review management across all Florida counties</li>
                  <li>Florida Building Code energy compliance documentation for new conditioned space</li>
                  <li>County inspection coordination — foundation, framing, MEP rough-in, and final</li>
                  <li>HOA design review submission support where applicable for residential additions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="ae-why-choose">
        <div className="ae-why-choose__wrapper">
          <div
            className="ae-why-choose__image-side ae-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ae-why-choose__content-side">
            <p className="ae-why-choose__label ae-reveal">
              Why Clients Trust Keentel to Build Their Addition
            </p>
            <h2 className="ae-why-choose__heading ae-reveal ae-reveal-delay-1">
              Engineered to connect. Designed to match. Built to last.
            </h2>
            <ul className="ae-why-choose__list">
              <li className="ae-reveal ae-reveal-delay-1">
                <span className="ae-why-choose__icon">
                  <i className="fas fa-drafting-compass"></i>
                </span>
                <div className="ae-why-choose__item-text">
                  <strong>Engineered — Not Improvised</strong>
                  <span>
                    We assess existing structural conditions before designing any
                    addition. Every connection between new and existing construction is
                    designed correctly — not improvised on site.
                  </span>
                </div>
              </li>
              <li className="ae-reveal ae-reveal-delay-2">
                <span className="ae-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="ae-why-choose__item-text">
                  <strong>One Licensed Contractor</strong>
                  <span>
                    Architectural drawings, structural engineering coordination,
                    permits, construction, and finishing are all managed by our team
                    under one contract. No handoffs between designers and builders.
                  </span>
                </div>
              </li>
              <li className="ae-reveal ae-reveal-delay-3">
                <span className="ae-why-choose__icon">
                  <i className="fas fa-paint-roller"></i>
                </span>
                <div className="ae-why-choose__item-text">
                  <strong>Exterior Match Guarantee</strong>
                  <span>
                    We source matching materials for exterior finishes, roofing, and
                    trim. Your addition will match your existing structure — not look
                    like it was added as an afterthought.
                  </span>
                </div>
              </li>
              <li className="ae-reveal ae-reveal-delay-4">
                <span className="ae-why-choose__icon">
                  <i className="fas fa-building"></i>
                </span>
                <div className="ae-why-choose__item-text">
                  <strong>Florida Code Compliance</strong>
                  <span>
                    Every addition is built to Florida Building Code — including
                    hurricane wind load requirements, energy compliance for new
                    conditioned space, and egress standards for new habitable rooms.
                  </span>
                </div>
              </li>
              <li className="ae-reveal ae-reveal-delay-5">
                <span className="ae-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="ae-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Every addition project is covered by our written 5-year
                    workmanship warranty — applied to all structural, MEP, and finish
                    scope we deliver.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="ae-process">
        <div className="ae-section__inner">
          <p className="ae-section__label ae-reveal">
            How We Manage Every Addition
          </p>
          <div className="ae-process__steps">
            <div className="ae-process__step ae-reveal ae-reveal-delay-1">
              <div className="ae-process__step-number">1</div>
              <p className="ae-process__step-title">Site Assessment</p>
              <p className="ae-process__step-desc">
                Existing structure reviewed and addition designed
              </p>
            </div>
            <div className="ae-process__step ae-reveal ae-reveal-delay-2">
              <div className="ae-process__step-number">2</div>
              <p className="ae-process__step-title">Drawings &amp; Permits</p>
              <p className="ae-process__step-desc">
                Architectural set and permit package submitted
              </p>
            </div>
            <div className="ae-process__step ae-reveal ae-reveal-delay-3">
              <div className="ae-process__step-number">3</div>
              <p className="ae-process__step-title">Foundation &amp; Frame</p>
              <p className="ae-process__step-desc">
                New structure built and tied into existing
              </p>
            </div>
            <div className="ae-process__step ae-reveal ae-reveal-delay-4">
              <div className="ae-process__step-number">4</div>
              <p className="ae-process__step-title">MEP &amp; Enclosure</p>
              <p className="ae-process__step-desc">
                Systems extended and building enclosed
              </p>
            </div>
            <div className="ae-process__step ae-reveal ae-reveal-delay-5">
              <div className="ae-process__step-number">5</div>
              <p className="ae-process__step-title">Finish &amp; Warranty</p>
              <p className="ae-process__step-desc">
                Interior finished, inspected, and warranty issued
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="ae-why-choose-us">
        <div className="ae-section__inner">
          <p className="ae-section__label ae-reveal">Why Choose Us</p>
          <h2 className="ae-section__title ae-reveal">
            Why Choose Keentel for Additions &amp; Expansions?
          </h2>
          <p
            className="ae-section__text ae-reveal ae-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in building additions that
            integrate seamlessly with existing structures and deliver long-term
            performance. The following attributes set our additions team apart:
          </p>
          <div className="ae-why-choose-us__grid">
            <div className="ae-why-choose-us__card ae-reveal ae-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We listen to how you plan to use the new space before designing a
                single square foot. Every addition is planned around your functional
                goals, aesthetic preferences, and budget.
              </p>
            </div>
            <div className="ae-why-choose-us__card ae-reveal ae-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have designed and built room additions, second-story expansions,
                garage conversions, and commercial building expansions across all 67
                Florida counties — with a consistent record of structural integrity
                and code compliance.
              </p>
            </div>
            <div className="ae-why-choose-us__card ae-reveal ae-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We integrate energy-efficient insulation systems, smart-home-ready MEP
                infrastructure, and impact-resistant exterior materials into every
                addition we build — appropriate for Florida's climate and code
                requirements.
              </p>
            </div>
            <div className="ae-why-choose-us__card ae-reveal ae-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every addition connection — structural, mechanical, and aesthetic — is
                reviewed against the existing building before construction begins. We
                do not build additions that look or perform like afterthoughts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="ae-faq-section">
        <div className="ae-section__inner">
          <p className="ae-section__label ae-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="ae-section__title ae-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Additions &amp; Expansions
          </h2>
          <div className="ae-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="ae-faq-item ae-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="ae-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="ae-icon"></span>
                </button>
                <div className="ae-faq-item__answer-wrapper">
                  <div
                    className="ae-faq-item__answer"
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
      <section className="ae-cta-section">
        <div className="ae-section__inner">
          <h2 className="ae-cta-section__title ae-reveal">
            Ready to expand your space?
          </h2>
          <p className="ae-cta-section__text ae-reveal ae-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your
            addition or expansion project anywhere in Florida.
          </p>
          <a href="#" className="ae-cta-section__btn ae-reveal ae-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="ae-cta-section__contact ae-reveal ae-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="ae-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="ae-sep">|</span>
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