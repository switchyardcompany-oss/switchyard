"use client";

import "./commercial-remodeling.css";
import { useEffect, useRef, useState } from "react";

export default function CommercialRemodelingPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".cr-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".cr-faq-item");
        if (item) item.classList.add("cr-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".cr-faq-item");
        if (item) item.classList.remove("cr-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".cr-hero__slide");
    const dots = document.querySelectorAll(".cr-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("cr-active"));
      dots.forEach((d) => d.classList.remove("cr-active"));
      slides[index].classList.add("cr-active");
      dots[index].classList.add("cr-active");
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

    const revealElements = document.querySelectorAll(".cr-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cr-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".cr-hero .cr-reveal").forEach((el) =>
      el.classList.add("cr-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Can you remodel our space while the business is still operating?",
      a: "Yes. We plan phased remodeling schedules for occupied commercial properties. Work is sequenced to protect active business areas, with after-hours and weekend scheduling available where your operation requires it.",
    },
    {
      q: "Do you manage permits for commercial remodeling in Florida?",
      a: "Yes. We manage all commercial permit applications, plan reviews, county inspections, and certificate of occupancy coordination across all Florida counties.",
    },
    {
      q: "How do you handle tenant improvement projects with landlord requirements?",
      a: "We review all landlord work letters, building standards, and base building MEP documentation before submitting our construction drawings. Our permit package is coordinated with the base building systems to avoid conflicts.",
    },
    {
      q: "What warranty covers commercial remodeling work?",
      a: "All commercial remodeling projects are backed by our written 5-year workmanship warranty. If any defect is identified within that period related to our scope of work, we return and correct it at no charge.",
    },
    {
      q: "What areas of Florida do you serve for commercial remodeling?",
      a: "We are headquartered in Tampa Bay and deliver commercial remodeling projects across all 67 Florida counties.",
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
      <section className="cr-hero">
        <div className="cr-hero__slides">
          <div
            className="cr-hero__slide cr-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="cr-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="cr-hero__overlay"></div>

        <div className="cr-hero__content">
          <div className="cr-hero__text">
            <div className="cr-hero__breadcrumb">
              <span className="cr-breadcrumb__light">Remodeling Services</span>
              <span className="cr-breadcrumb__slash">/</span>
              <span className="cr-breadcrumb__accent">
                Commercial Remodeling
              </span>
            </div>

            <h1 className="cr-hero__title cr-reveal cr-reveal-delay-1">
              Commercial Remodeling
            </h1>

            <p className="cr-hero__subtitle cr-reveal cr-reveal-delay-2">
              <strong>
                Office Renovations, Retail Build-Outs &amp; Restaurant Redesigns Across
                Florida
              </strong>
              <br />
              We manage commercial remodeling projects on your business timeline —
              design, permits, demolition, MEP, and finish — under one licensed
              contract. One team. Full accountability. No disruption to your revenue.
            </p>

            <div className="cr-hero__actions cr-reveal cr-reveal-delay-3">
              <a href="#" className="cr-hero__btn cr-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="cr-hero__btn cr-hero__btn--secondary">
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

            <div className="cr-hero__trust cr-reveal cr-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 300+ Florida businesses for commercial
                remodeling
              </span>
            </div>
          </div>
        </div>

        <div className="cr-hero__dots">
          <span className="cr-hero__dot cr-active"></span>
          <span className="cr-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="cr-intro">
        <div className="cr-intro__inner">
          <div
            className="cr-intro__image cr-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="cr-intro__text cr-reveal cr-reveal-delay-1">
            <h2>
              Commercial Remodeling That Works Around Your Business.
            </h2>
            <p>
              We always advise commercial clients that the single biggest cost of a
              poorly managed remodel is not the contractor invoice — it is the lost
              revenue caused by delays and disruption. At Keentel General Contractors,
              we plan every commercial remodeling project around your business timeline
              and operational requirements. We self-perform across all major trades
              under one license, which means our project manager controls the schedule
              — not a network of separate subcontractors with competing priorities.
              Whether you are renovating an office suite, building out a retail space,
              or redesigning a restaurant, we deliver on scope, on budget, and with
              minimal disruption to your operations.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="cr-scope">
        <div className="cr-section__inner">
          <div className="cr-scope__header">
            <p className="cr-section__label cr-reveal">
              What Our Commercial Remodeling Scope Covers
            </p>
            <h2 className="cr-reveal">
              We deliver the full scope of commercial remodeling — from single-suite
              renovations to full-floor fit-outs — managed phase by phase under one
              licensed contract.
            </h2>
            <p className="cr-reveal cr-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="cr-scope__grid">
            {/* Card 1: Office Renovations */}
            <div className="cr-scope-card cr-reveal cr-reveal-delay-1">
              <div
                className="cr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cr-scope-card__number">1</span>
              </div>
              <div className="cr-scope-card__body">
                <h3 className="cr-scope-card__title">Office Renovations</h3>
                <ul className="cr-scope-card__list">
                  <li>Demising wall reconfiguration — open-plan conversions and private office additions</li>
                  <li>Partition systems — full-height drywall, glass fronts, and modular panel systems</li>
                  <li>Suspended ceiling replacement — grid, tile, and custom plank ceiling systems</li>
                  <li>Flooring — carpet tile, LVP, polished concrete, and ceramic throughout</li>
                  <li>Electrical upgrades — panel capacity, circuit additions, and data infrastructure</li>
                  <li>Lighting redesign — LED recessed, pendant, and task lighting with occupancy controls</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Retail Build-Outs */}
            <div className="cr-scope-card cr-reveal cr-reveal-delay-2">
              <div
                className="cr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cr-scope-card__number">2</span>
              </div>
              <div className="cr-scope-card__body">
                <h3 className="cr-scope-card__title">Retail Build-Outs</h3>
                <ul className="cr-scope-card__list">
                  <li>Shell space build-out — framing, MEP rough-in, drywall, and ceiling system</li>
                  <li>Storefront glazing and signage blocking installation</li>
                  <li>Checkout counter, display wall, and custom millwork fabrication coordination</li>
                  <li>Flooring — polished concrete, tile, and LVP appropriate for high-traffic retail</li>
                  <li>Retail lighting — accent, product, and ambient lighting per brand standards</li>
                  <li>ADA-compliant restroom, fitting room, and accessible entry construction</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Restaurant Redesigns */}
            <div className="cr-scope-card cr-reveal cr-reveal-delay-3">
              <div
                className="cr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cr-scope-card__number">3</span>
              </div>
              <div className="cr-scope-card__body">
                <h3 className="cr-scope-card__title">Restaurant Redesigns</h3>
                <ul className="cr-scope-card__list">
                  <li>Front-of-house renovation — seating layout, flooring, wall finishes, and lighting</li>
                  <li>Bar demolition and rebuild — millwork, back bar, and plumbing rough-in</li>
                  <li>Commercial kitchen reconfiguration — equipment layout, hood systems, and gas lines</li>
                  <li>Walk-in cooler and freezer relocation and reinstallation</li>
                  <li>Health department and fire marshal compliance documentation</li>
                  <li>Outdoor dining and patio area renovation where applicable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="cr-scope__grid cr-scope__grid--bottom">
            {/* Card 4: Medical & Professional Office Remodeling */}
            <div className="cr-scope-card cr-reveal cr-reveal-delay-4">
              <div
                className="cr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cr-scope-card__number">4</span>
              </div>
              <div className="cr-scope-card__body">
                <h3 className="cr-scope-card__title">
                  Medical &amp; Professional Office Remodeling
                </h3>
                <ul className="cr-scope-card__list">
                  <li>Reception, waiting area, and check-in counter renovation</li>
                  <li>Exam room, procedure room, and consultation space build-out</li>
                  <li>Medical gas, specialty electrical, and plumbing requirements for clinical spaces</li>
                  <li>HIPAA-compliant privacy partition and soundproofing installation</li>
                  <li>ADA-compliant restroom and accessible path of travel compliance</li>
                  <li>Infection control construction protocol compliance during active medical facilities</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Permit Management & Code Compliance */}
            <div className="cr-scope-card cr-reveal cr-reveal-delay-5">
              <div
                className="cr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cr-scope-card__number">5</span>
              </div>
              <div className="cr-scope-card__body">
                <h3 className="cr-scope-card__title">
                  Permit Management &amp; Code Compliance
                </h3>
                <ul className="cr-scope-card__list">
                  <li>Commercial building permit application and plan review management</li>
                  <li>Fire, zoning, and MEP permit coordination across all Florida counties</li>
                  <li>ADA accessibility compliance documentation for all altered areas</li>
                  <li>Florida Building Code energy compliance for commercial remodeling scope</li>
                  <li>County inspection scheduling — rough-in, above-ceiling, and final inspections</li>
                  <li>Certificate of Occupancy coordination and delivery at project close</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="cr-why-choose">
        <div className="cr-why-choose__wrapper">
          <div
            className="cr-why-choose__image-side cr-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="cr-why-choose__content-side">
            <p className="cr-why-choose__label cr-reveal">
              Why Commercial Clients Choose Keentel
            </p>
            <h2 className="cr-why-choose__heading cr-reveal cr-reveal-delay-1">
              Business-timeline delivery. One licensed contractor. Full accountability.
            </h2>
            <ul className="cr-why-choose__list">
              <li className="cr-reveal cr-reveal-delay-1">
                <span className="cr-why-choose__icon">
                  <i className="fas fa-calendar-check"></i>
                </span>
                <div className="cr-why-choose__item-text">
                  <strong>Business-Timeline Delivery</strong>
                  <span>
                    We plan commercial remodels around your operating hours and
                    revenue calendar. Phased scheduling, after-hours work where
                    required, and daily progress reporting keep your business protected
                    throughout.
                  </span>
                </div>
              </li>
              <li className="cr-reveal cr-reveal-delay-2">
                <span className="cr-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="cr-why-choose__item-text">
                  <strong>One Licensed Contractor</strong>
                  <span>
                    Every trade on your commercial remodel is managed by our in-house
                    licensed team. No subcontractor handoffs, no split invoices, and no
                    accountability gaps between trades.
                  </span>
                </div>
              </li>
              <li className="cr-reveal cr-reveal-delay-3">
                <span className="cr-why-choose__icon">
                  <i className="fas fa-file-invoice-dollar"></i>
                </span>
                <div className="cr-why-choose__item-text">
                  <strong>Fixed-Price Contracts</strong>
                  <span>
                    We deliver a written fixed-price contract before demolition
                    begins. No scope change proceeds without your written approval.
                    Your project budget is protected from the first meeting.
                  </span>
                </div>
              </li>
              <li className="cr-reveal cr-reveal-delay-4">
                <span className="cr-why-choose__icon">
                  <i className="fas fa-universal-access"></i>
                </span>
                <div className="cr-why-choose__item-text">
                  <strong>Code &amp; ADA Expertise</strong>
                  <span>
                    We build every commercial remodel to Florida Building Code and ADA
                    accessibility standards — including all altered areas required by
                    law to meet current compliance requirements.
                  </span>
                </div>
              </li>
              <li className="cr-reveal cr-reveal-delay-5">
                <span className="cr-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="cr-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Every commercial remodel is backed by our written 5-year
                    workmanship warranty. If something is not right within that window,
                    we return and correct it at no charge.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="cr-process">
        <div className="cr-section__inner">
          <p className="cr-section__label cr-reveal">
            How We Manage Every Remodel
          </p>
          <div className="cr-process__steps">
            <div className="cr-process__step cr-reveal cr-reveal-delay-1">
              <div className="cr-process__step-number">1</div>
              <p className="cr-process__step-title">Brief &amp; Budget</p>
              <p className="cr-process__step-desc">
                Business needs, timeline, and fixed pricing confirmed
              </p>
            </div>
            <div className="cr-process__step cr-reveal cr-reveal-delay-2">
              <div className="cr-process__step-number">2</div>
              <p className="cr-process__step-title">Design &amp; Permits</p>
              <p className="cr-process__step-desc">
                Plans, material selections, and permits managed
              </p>
            </div>
            <div className="cr-process__step cr-reveal cr-reveal-delay-3">
              <div className="cr-process__step-number">3</div>
              <p className="cr-process__step-title">Demolition</p>
              <p className="cr-process__step-desc">
                Phased demo minimizing business disruption
              </p>
            </div>
            <div className="cr-process__step cr-reveal cr-reveal-delay-4">
              <div className="cr-process__step-number">4</div>
              <p className="cr-process__step-title">MEP &amp; Build</p>
              <p className="cr-process__step-desc">
                All trades coordinated under one schedule
              </p>
            </div>
            <div className="cr-process__step cr-reveal cr-reveal-delay-5">
              <div className="cr-process__step-number">5</div>
              <p className="cr-process__step-title">Finish &amp; CO</p>
              <p className="cr-process__step-desc">
                Punch list, certificate of occupancy, warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="cr-why-choose-us">
        <div className="cr-section__inner">
          <p className="cr-section__label cr-reveal">Why Choose Us</p>
          <h2 className="cr-section__title cr-reveal">
            Why Choose Keentel for Commercial Remodeling?
          </h2>
          <p
            className="cr-section__text cr-reveal cr-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering commercial
            remodeling that protects your business timeline and produces spaces that
            perform from day one. The following attributes set our commercial
            remodeling team apart:
          </p>
          <div className="cr-why-choose-us__grid">
            <div className="cr-why-choose-us__card cr-reveal cr-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We develop a complete understanding of your business operations,
                customer flow, and brand standards before planning the remodel. Every
                decision is made with your business performance in mind.
              </p>
            </div>
            <div className="cr-why-choose-us__card cr-reveal cr-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have completed office renovations, retail build-outs, restaurant
                redesigns, and medical office remodels across all 67 Florida counties
                — with a consistent record of on-time delivery and first-inspection
                approvals.
              </p>
            </div>
            <div className="cr-why-choose-us__card cr-reveal cr-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We integrate energy-efficient lighting, smart building controls, and
                modern material selections into every commercial remodel we deliver —
                reducing your operating costs from day one.
              </p>
            </div>
            <div className="cr-why-choose-us__card cr-reveal cr-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every commercial remodel phase is internally inspected before the
                county inspection is scheduled. We find and resolve issues before they
                become inspection failures or business delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="cr-faq-section">
        <div className="cr-section__inner">
          <p className="cr-section__label cr-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="cr-section__title cr-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Commercial Remodeling
          </h2>
          <div className="cr-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="cr-faq-item cr-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="cr-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="cr-icon"></span>
                </button>
                <div className="cr-faq-item__answer-wrapper">
                  <div
                    className="cr-faq-item__answer"
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
      <section className="cr-cta-section">
        <div className="cr-section__inner">
          <h2 className="cr-cta-section__title cr-reveal">
            Ready to renovate your commercial space?
          </h2>
          <p className="cr-cta-section__text cr-reveal cr-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your
            commercial remodeling project anywhere in Florida.
          </p>
          <a href="#" className="cr-cta-section__btn cr-reveal cr-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="cr-cta-section__contact cr-reveal cr-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="cr-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="cr-sep">|</span>
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