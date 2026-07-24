"use client";

import "./commercial-construction.css";
import { useEffect, useRef, useState } from "react";

export default function CommercialConstructionPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".cc-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".cc-faq-item");
        if (item) item.classList.add("cc-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".cc-faq-item");
        if (item) item.classList.remove("cc-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".cc-hero__slide");
    const dots = document.querySelectorAll(".cc-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("cc-active"));
      dots.forEach((d) => d.classList.remove("cc-active"));
      slides[index].classList.add("cc-active");
      dots[index].classList.add("cc-active");
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

    const revealElements = document.querySelectorAll(".cc-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cc-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".cc-hero .cc-reveal").forEach((el) =>
      el.classList.add("cc-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What types of commercial projects do you build?",
      a: "We build tenant improvements, office buildings, warehouses, distribution centers, retail spaces, restaurants, medical offices, and hospitality facilities across all 67 Florida counties.",
    },
    {
      q: "Do you manage permits for commercial construction in Florida?",
      a: "Yes. We manage all commercial permit applications, plan reviews, county inspections, and certificate of occupancy coordination across Florida on your behalf.",
    },
    {
      q: "Can you build while our existing business is still operating nearby?",
      a: "Yes. We plan phased construction schedules for occupied or adjacent sites to minimize disruption to active business operations. Safety barriers, dust control, and noise management are built into our site management plan.",
    },
    {
      q: "How do you handle tenant improvement projects with existing landlord requirements?",
      a: "We review all landlord work letters, building standards, and existing MEP documentation before submitting our construction drawings. Our permit package is coordinated with base building systems to avoid conflicts during construction.",
    },
    {
      q: "What areas of Florida do you serve for commercial construction?",
      a: "We are headquartered in Tampa Bay and deliver commercial construction projects across all 67 Florida counties.",
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
      <section className="cc-hero">
        <div className="cc-hero__slides">
          <div
            className="cc-hero__slide cc-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="cc-hero__slide"
            style={{
              backgroundImage:
                "url('https://static.wixstatic.com/media/a11840dcab0443be94d2422e3cab3b77.jpg/v1/fill/w_640,h_396,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a11840dcab0443be94d2422e3cab3b77.jpg')",
            }}
          ></div>
        </div>

        <div className="cc-hero__overlay"></div>

        <div className="cc-hero__content">
          <div className="cc-hero__text">
            <div className="cc-hero__breadcrumb">
              <span className="cc-breadcrumb__light">Build Services</span>
              <span className="cc-breadcrumb__slash">/</span>
              <span className="cc-breadcrumb__accent">
                Commercial Construction
              </span>
            </div>

            <h1 className="cc-hero__title cc-reveal cc-reveal-delay-1">
              Commercial Construction
            </h1>

            <p className="cc-hero__subtitle cc-reveal cc-reveal-delay-2">
              <strong>
                Tenant Improvements, Office Buildings &amp; Warehouses Across Florida
              </strong>
              <br />
              We deliver commercial construction projects on time, on budget, and to
              Florida Building Code — managed by one licensed team from groundbreaking
              to certificate of occupancy.
            </p>

            <div className="cc-hero__actions cc-reveal cc-reveal-delay-3">
              <a href="/contact#contactformsection" className="cc-hero__btn cc-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#ourworksection" className="cc-hero__btn cc-hero__btn--secondary">
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

            <div className="cc-hero__trust cc-reveal cc-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 200+ Florida businesses for commercial
                construction
              </span>
            </div>
          </div>
        </div>

        <div className="cc-hero__dots">
          <span className="cc-hero__dot cc-active"></span>
          <span className="cc-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="cc-intro">
        <div className="cc-intro__inner">
          <div
            className="cc-intro__image cc-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="cc-intro__text cc-reveal cc-reveal-delay-1">
            <h2>Commercial Construction That Works Around Your Business.</h2>
            <p>
              At Keentel General Contractors, we understand that commercial
              construction is not just about putting up walls — it is about delivering
              a space that supports your operations, meets code on the first
              inspection, and stays within the budget your business planned around. We
              self-perform the full scope of commercial construction under one license
              and one contract — from site preparation and structural build through
              MEP installation, interior fit-out, and final occupancy. Our commercial
              clients include office tenants, retail operators, medical practices,
              hospitality businesses, and industrial facility owners across all 67
              Florida counties.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ BUILD SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="cc-scope" id="ourworksection">
        <div className="cc-section__inner">
          <div className="cc-scope__header">
            <p className="cc-section__label cc-reveal">
              What We Build — And How We Build It
            </p>
            <h2 className="cc-reveal">
              Every commercial construction project we deliver follows a clearly
              defined and fully managed sequence of phases — each inspected and signed
              off before the next begins.
            </h2>
            <p className="cc-reveal cc-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="cc-scope__grid">
            {/* Card 1: Tenant Improvements & Interior Fit-Outs */}
            <div className="cc-scope-card cc-reveal cc-reveal-delay-1">
              <div
                className="cc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cc-scope-card__number">1</span>
              </div>
              <div className="cc-scope-card__body">
                <h3 className="cc-scope-card__title">
                  Tenant Improvements &amp; Interior Fit-Outs
                </h3>
                <ul className="cc-scope-card__list">
                  <li>Demising wall framing and partition layout per approved plans</li>
                  <li>Full MEP rough-in — electrical, plumbing, and HVAC for tenant space</li>
                  <li>Suspended ceiling grid and tile installation</li>
                  <li>Flooring — polished concrete, LVP, carpet tile, and ceramic</li>
                  <li>ADA-compliant restrooms, kitchenettes, and accessible entries</li>
                  <li>Final paint, storefront glass, signage blocking, and fixture installation</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Office Building Construction */}
            <div className="cc-scope-card cc-reveal cc-reveal-delay-2">
              <div
                className="cc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cc-scope-card__number">2</span>
              </div>
              <div className="cc-scope-card__body">
                <h3 className="cc-scope-card__title">Office Building Construction</h3>
                <ul className="cc-scope-card__list">
                  <li>Site preparation, grading, and commercial foundation systems</li>
                  <li>Structural steel, tilt-up concrete, or masonry building envelope</li>
                  <li>Commercial roofing — TPO, modified bitumen, or standing seam metal</li>
                  <li>Curtain wall, storefront glazing, and exterior cladding systems</li>
                  <li>Full building MEP — electrical service, HVAC systems, and plumbing</li>
                  <li>Elevator, fire suppression, and life safety system coordination</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Warehouse & Distribution Center Construction */}
            <div className="cc-scope-card cc-reveal cc-reveal-delay-3">
              <div
                className="cc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cc-scope-card__number">3</span>
              </div>
              <div className="cc-scope-card__body">
                <h3 className="cc-scope-card__title">
                  Warehouse &amp; Distribution Center Construction
                </h3>
                <ul className="cc-scope-card__list">
                  <li>Tilt-up concrete panel or pre-engineered metal building systems</li>
                  <li>High-bay interior clear height framing and mezzanine construction</li>
                  <li>Loading dock construction — dock levelers, seals, and overhead doors</li>
                  <li>Industrial electrical — three-phase power, lighting, and racking circuits</li>
                  <li>Fire suppression system design and installation coordination</li>
                  <li>Site work — truck courts, parking, and stormwater management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="cc-scope__grid cc-scope__grid--bottom">
            {/* Card 4: Retail, Restaurant & Hospitality Construction */}
            <div className="cc-scope-card cc-reveal cc-reveal-delay-4">
              <div
                className="cc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cc-scope-card__number">4</span>
              </div>
              <div className="cc-scope-card__body">
                <h3 className="cc-scope-card__title">
                  Retail, Restaurant &amp; Hospitality Construction
                </h3>
                <ul className="cc-scope-card__list">
                  <li>Ground-up and shell space build-outs for retail and food service</li>
                  <li>Commercial kitchen construction — hood systems, grease traps, and gas lines</li>
                  <li>Front-of-house finish construction — flooring, millwork, and lighting</li>
                  <li>Walk-in cooler and freezer installation coordination</li>
                  <li>Health department and fire marshal compliant documentation</li>
                  <li>Outdoor dining, drive-through, and exterior canopy construction</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Final Inspection, CO & Handover */}
            <div className="cc-scope-card cc-reveal cc-reveal-delay-5">
              <div
                className="cc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="cc-scope-card__number">5</span>
              </div>
              <div className="cc-scope-card__body">
                <h3 className="cc-scope-card__title">
                  Final Inspection, CO &amp; Handover
                </h3>
                <ul className="cc-scope-card__list">
                  <li>Internal QA inspection across all trades before county final</li>
                  <li>Fire, building, electrical, plumbing, and mechanical final inspections</li>
                  <li>Certificate of Occupancy obtained and delivered to client</li>
                  <li>Client walkthrough and punch list resolution before final invoice</li>
                  <li>Written 5-year workmanship warranty issued at project close</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="cc-why-choose">
        <div className="cc-why-choose__wrapper">
          <div
            className="cc-why-choose__image-side cc-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="cc-why-choose__content-side">
            <p className="cc-why-choose__label cc-reveal">
              Why Commercial Clients Choose Keentel
            </p>
            <h2 className="cc-why-choose__heading cc-reveal cc-reveal-delay-1">
              Your business space. Our licensed commitment.
            </h2>
            <ul className="cc-why-choose__list">
              <li className="cc-reveal cc-reveal-delay-1">
                <span className="cc-why-choose__icon">
                  <i className="fas fa-users"></i>
                </span>
                <div className="cc-why-choose__item-text">
                  <strong>One Licensed Team</strong>
                  <span>
                    Every trade on your commercial project — structural, electrical,
                    plumbing, HVAC, and finish — is managed by our in-house licensed
                    team. No brokered labor. No accountability gaps.
                  </span>
                </div>
              </li>
              <li className="cc-reveal cc-reveal-delay-2">
                <span className="cc-why-choose__icon">
                  <i className="fas fa-file-invoice-dollar"></i>
                </span>
                <div className="cc-why-choose__item-text">
                  <strong>Fixed-Price Contracts</strong>
                  <span>
                    We deliver a fixed contract price before construction begins. No
                    scope change proceeds without your written approval. No surprise
                    invoices against your business budget.
                  </span>
                </div>
              </li>
              <li className="cc-reveal cc-reveal-delay-3">
                <span className="cc-why-choose__icon">
                  <i className="fas fa-calendar-check"></i>
                </span>
                <div className="cc-why-choose__item-text">
                  <strong>Business-Timeline Delivery</strong>
                  <span>
                    We understand that commercial delays have direct revenue
                    consequences. Our scheduling systems and trade coordination are
                    built to protect your opening date and your bottom line.
                  </span>
                </div>
              </li>
              <li className="cc-reveal cc-reveal-delay-4">
                <span className="cc-why-choose__icon">
                  <i className="fas fa-building"></i>
                </span>
                <div className="cc-why-choose__item-text">
                  <strong>Florida Code &amp; ADA Expertise</strong>
                  <span>
                    We build to Florida Building Code, ADA accessibility standards,
                    and local fire and zoning requirements — across all 67 Florida
                    counties — with a high record of first-inspection approvals.
                  </span>
                </div>
              </li>
              <li className="cc-reveal cc-reveal-delay-5">
                <span className="cc-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="cc-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Every commercial build is backed by our written 5-year workmanship
                    warranty. If something is not right within that window, we return
                    and correct it at no charge.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="cc-process">
        <div className="cc-section__inner">
          <p className="cc-section__label cc-reveal">
            How We Manage Every Commercial Build
          </p>
          <div className="cc-process__steps">
            <div className="cc-process__step cc-reveal cc-reveal-delay-1">
              <div className="cc-process__step-number">1</div>
              <p className="cc-process__step-title">Pre-Construction</p>
              <p className="cc-process__step-desc">
                Scope review, permits, schedule, and fixed-price contract
              </p>
            </div>
            <div className="cc-process__step cc-reveal cc-reveal-delay-2">
              <div className="cc-process__step-number">2</div>
              <p className="cc-process__step-title">Site &amp; Structure</p>
              <p className="cc-process__step-desc">
                Foundation, structural frame, and building envelope
              </p>
            </div>
            <div className="cc-process__step cc-reveal cc-reveal-delay-3">
              <div className="cc-process__step-number">3</div>
              <p className="cc-process__step-title">MEP Installation</p>
              <p className="cc-process__step-desc">
                Mechanical, electrical, plumbing, and fire systems
              </p>
            </div>
            <div className="cc-process__step cc-reveal cc-reveal-delay-4">
              <div className="cc-process__step-number">4</div>
              <p className="cc-process__step-title">Interior Fit-Out</p>
              <p className="cc-process__step-desc">
                Partitions, ceilings, flooring, and all finishes
              </p>
            </div>
            <div className="cc-process__step cc-reveal cc-reveal-delay-5">
              <div className="cc-process__step-number">5</div>
              <p className="cc-process__step-title">CO &amp; Handover</p>
              <p className="cc-process__step-desc">
                Final inspections, certificate of occupancy, and warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="cc-why-choose-us">
        <div className="cc-section__inner">
          <p className="cc-section__label cc-reveal">Why Choose Us</p>
          <h2 className="cc-section__title cc-reveal">
            Why Choose Keentel for Commercial Construction?
          </h2>
          <p
            className="cc-section__text cc-reveal cc-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering commercial
            construction that meets the highest standards of quality, compliance, and
            schedule performance. The following attributes set our commercial build
            team apart:
          </p>
          <div className="cc-why-choose-us__grid">
            <div className="cc-why-choose-us__card cc-reveal cc-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We develop a complete understanding of your business operations,
                opening timeline, and budget constraints before a single permit is
                filed. Your project is managed with your business goals at the center
                of every decision.
              </p>
            </div>
            <div className="cc-why-choose-us__card cc-reveal cc-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have delivered tenant improvements, office builds, warehouses, and
                hospitality projects across all 67 Florida counties — with a
                consistent record of on-time, on-budget delivery.
              </p>
            </div>
            <div className="cc-why-choose-us__card cc-reveal cc-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We incorporate energy-efficient building systems, smart building
                infrastructure, and modern construction methods into every commercial
                project we deliver.
              </p>
            </div>
            <div className="cc-why-choose-us__card cc-reveal cc-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every commercial build phase is internally inspected before the county
                inspection is scheduled. We proactively identify and resolve issues
                before they become inspection failures or business delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="cc-faq-section">
        <div className="cc-section__inner">
          <p className="cc-section__label cc-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="cc-section__title cc-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Commercial Construction
          </h2>
          <div className="cc-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="cc-faq-item cc-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="cc-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="cc-icon"></span>
                </button>
                <div className="cc-faq-item__answer-wrapper">
                  <div
                    className="cc-faq-item__answer"
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
      <section className="cc-cta-section">
        <div className="cc-section__inner">
          <h2 className="cc-cta-section__title cc-reveal">
            Ready to build your commercial space?
          </h2>
          <p className="cc-cta-section__text cc-reveal cc-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your
            commercial construction project anywhere in Florida.
          </p>
          <a href="/contact#contactformsection" className="cc-cta-section__btn cc-reveal cc-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="cc-cta-section__contact cc-reveal cc-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="cc-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="cc-sep">|</span>
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