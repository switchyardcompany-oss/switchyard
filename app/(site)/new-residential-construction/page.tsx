"use client";

import "./new-residential-construction.css";
import { useEffect, useRef, useState } from "react";

export default function NewResidentialConstructionPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".nrc-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".nrc-faq-item");
        if (item) item.classList.add("nrc-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".nrc-faq-item");
        if (item) item.classList.remove("nrc-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".nrc-hero__slide");
    const dots = document.querySelectorAll(".nrc-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("nrc-active"));
      dots.forEach((d) => d.classList.remove("nrc-active"));
      slides[index].classList.add("nrc-active");
      dots[index].classList.add("nrc-active");
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

    const revealElements = document.querySelectorAll(".nrc-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("nrc-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".nrc-hero .nrc-reveal").forEach((el) =>
      el.classList.add("nrc-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "How long does new residential construction take in Florida?",
      a: "A standard custom single-family home typically takes 6 to 12 months from permit approval to certificate of occupancy, depending on size, complexity, and county permit processing timelines. We provide a fixed realistic schedule before contract signing.",
    },
    {
      q: "Do you manage all permits for new residential builds?",
      a: "Yes. We manage the full permit application, county review, inspection scheduling, and certificate of occupancy process across all Florida counties on your behalf.",
    },
    {
      q: "Can you build on my own lot?",
      a: "Yes. We build on owner-supplied lots across Florida. We conduct a site assessment to confirm soil conditions, setbacks, zoning, and utility availability before the build contract is finalized.",
    },
    {
      q: "What warranty do you provide on new home construction?",
      a: "All new residential builds are covered by our written 5-year workmanship warranty, plus Florida's statutory new construction warranty under Chapter 558, Florida Statutes — covering structural defects for 10 years.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and build new residential construction projects across all 67 Florida counties.",
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
      <section className="nrc-hero">
        <div className="nrc-hero__slides">
          <div
            className="nrc-hero__slide nrc-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="nrc-hero__slide"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWhg68eXzpfA8FBT5WaRsaXGmetP6g0DmuOTXhnFFPIQQAF2-_8vzX5TX&s=10')",
            }}
          ></div>
        </div>

        <div className="nrc-hero__overlay"></div>

        <div className="nrc-hero__content">
          <div className="nrc-hero__text">
            <div className="nrc-hero__breadcrumb">
              <span className="nrc-breadcrumb__light">Build Services</span>
              <span className="nrc-breadcrumb__slash">/</span>
              <span className="nrc-breadcrumb__accent">
                New Residential Construction
              </span>
            </div>

            <h1 className="nrc-hero__title nrc-reveal nrc-reveal-delay-1">
              New Residential Construction
            </h1>

            <p className="nrc-hero__subtitle nrc-reveal nrc-reveal-delay-2">
              <strong>
                Custom Homes, Multi-Family &amp; ADU Builds Across Florida
              </strong>
              <br />
              We build the home you envisioned — on your lot, to your specifications,
              and to Florida Building Code standards — managed by one licensed team
              from groundbreaking to certificate of occupancy.
            </p>

            <div className="nrc-hero__actions nrc-reveal nrc-reveal-delay-3">
              <a href="/contact#contactformsection" className="nrc-hero__btn nrc-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#ourworksection" className="nrc-hero__btn nrc-hero__btn--secondary">
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

            <div className="nrc-hero__trust nrc-reveal nrc-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 300+ Florida homeowners for new
                construction
              </span>
            </div>
          </div>
        </div>

        <div className="nrc-hero__dots">
          <span className="nrc-hero__dot nrc-active"></span>
          <span className="nrc-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="nrc-intro">
        <div className="nrc-intro__inner">
          <div
            className="nrc-intro__image nrc-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="nrc-intro__text nrc-reveal nrc-reveal-delay-1">
            <h2>Your New Home. Built Right. The First Time.</h2>
            <p>
              At Keentel General Contractors, new residential construction is one of
              our core strengths — and one of the most significant investments a
              homeowner will ever make. We manage the full construction process under
              one license and one contract — from site preparation and foundation
              through structural framing, MEP rough-in, insulation, drywall, all
              interior finishes, and final inspection. Every build is assigned a
              dedicated project manager who owns your timeline, budget, and quality
              standard throughout. We have built custom homes, multi-family
              residences, and accessory dwelling units across Florida, and we bring
              that same licensed commitment to every project regardless of size.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ BUILD SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="nrc-scope" id="ourworksection">
        <div className="nrc-section__inner">
          <div className="nrc-scope__header">
            <p className="nrc-section__label nrc-reveal">
              What We Build — And How We Build It
            </p>
            <h2 className="nrc-reveal">
              Every new residential construction project we deliver is broken into
              clearly defined phases — each managed, inspected, and signed off
              internally before moving to the next.
            </h2>
            <p className="nrc-reveal nrc-reveal-delay-1">
              Here is what our scope covers at every stage of your build.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="nrc-scope__grid">
            {/* Card 1: Site Preparation & Foundation */}
            <div className="nrc-scope-card nrc-reveal nrc-reveal-delay-1">
              <div
                className="nrc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop')",
                }}
              >
                <span className="nrc-scope-card__number">1</span>
              </div>
              <div className="nrc-scope-card__body">
                <h3 className="nrc-scope-card__title">
                  Site Preparation &amp; Foundation
                </h3>
                <ul className="nrc-scope-card__list">
                  <li>Site clearing, grading, and erosion control</li>
                  <li>Soil testing and bearing capacity verification</li>
                  <li>Concrete slab, stem wall, or pier foundation</li>
                  <li>Underground plumbing and electrical rough-in</li>
                  <li>Foundation inspection and engineer sign-off</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Structural Framing & Roofing */}
            <div className="nrc-scope-card nrc-reveal nrc-reveal-delay-2">
              <div
                className="nrc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop')",
                }}
              >
                <span className="nrc-scope-card__number">2</span>
              </div>
              <div className="nrc-scope-card__body">
                <h3 className="nrc-scope-card__title">
                  Structural Framing &amp; Roofing
                </h3>
                <ul className="nrc-scope-card__list">
                  <li>Wood frame, CBS, or steel stud structural systems</li>
                  <li>Hurricane strap and wind mitigation hardware</li>
                  <li>Roof truss installation and sheathing</li>
                  <li>Roofing — shingle, tile, or metal</li>
                  <li>Windows, exterior doors, and weather barrier</li>
                </ul>
              </div>
            </div>

            {/* Card 3: MEP Rough-In */}
            <div className="nrc-scope-card nrc-reveal nrc-reveal-delay-3">
              <div
                className="nrc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="nrc-scope-card__number">3</span>
              </div>
              <div className="nrc-scope-card__body">
                <h3 className="nrc-scope-card__title">MEP Rough-In</h3>
                <ul className="nrc-scope-card__list">
                  <li>Electrical — panels, circuits, outlets, and fixtures</li>
                  <li>Plumbing — supply, drain, waste, and vent systems</li>
                  <li>HVAC ductwork and equipment rough-in</li>
                  <li>Low-voltage pre-wire — data, audio, security</li>
                  <li>Pre-drywall inspection coordination</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="nrc-scope__grid nrc-scope__grid--bottom">
            {/* Card 4: Insulation, Drywall & Interior Finishes */}
            <div className="nrc-scope-card nrc-reveal nrc-reveal-delay-4">
              <div
                className="nrc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=400&fit=crop')",
                }}
              >
                <span className="nrc-scope-card__number">4</span>
              </div>
              <div className="nrc-scope-card__body">
                <h3 className="nrc-scope-card__title">
                  Insulation, Drywall &amp; Finishes
                </h3>
                <ul className="nrc-scope-card__list">
                  <li>Insulation — blown-in, batt, and spray foam</li>
                  <li>Drywall hang, tape, mud, and texture</li>
                  <li>Flooring — tile, hardwood, LVP, and carpet</li>
                  <li>Cabinetry, countertops, and fixture setting</li>
                  <li>Interior doors, trim, paint, and hardware</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Final Inspection, CO & Handover */}
            <div className="nrc-scope-card nrc-reveal nrc-reveal-delay-5">
              <div
                className="nrc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="nrc-scope-card__number">5</span>
              </div>
              <div className="nrc-scope-card__body">
                <h3 className="nrc-scope-card__title">
                  Final Inspection, CO &amp; Handover
                </h3>
                <ul className="nrc-scope-card__list">
                  <li>Internal QA inspection across all trades</li>
                  <li>County final inspection — all disciplines</li>
                  <li>Certificate of Occupancy obtained</li>
                  <li>Client walkthrough and punch list resolution</li>
                  <li>5-year workmanship warranty issued</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="nrc-why-choose">
        <div className="nrc-why-choose__wrapper">
          <div
            className="nrc-why-choose__image-side nrc-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="nrc-why-choose__content-side">
            <p className="nrc-why-choose__label nrc-reveal">
              Why Clients Trust Us to Build Their Home
            </p>
            <h2 className="nrc-why-choose__heading nrc-reveal nrc-reveal-delay-1">
              Your home. Our license. Your peace of mind.
            </h2>
            <ul className="nrc-why-choose__list">
              <li className="nrc-reveal nrc-reveal-delay-1">
                <span className="nrc-why-choose__icon">
                  <i className="fas fa-users"></i>
                </span>
                <div className="nrc-why-choose__item-text">
                  <strong>One Licensed Team</strong>
                  <span>
                    Every trade on your build — structural, electrical, plumbing, and
                    finish — is performed by our in-house licensed team. No brokered
                    labor. No unknown subcontractors on your site.
                  </span>
                </div>
              </li>
              <li className="nrc-reveal nrc-reveal-delay-2">
                <span className="nrc-why-choose__icon">
                  <i className="fas fa-file-invoice-dollar"></i>
                </span>
                <div className="nrc-why-choose__item-text">
                  <strong>Fixed-Price Contracts</strong>
                  <span>
                    We deliver a fixed contract price before groundbreaking. No scope
                    change proceeds without your written approval. No surprise invoices
                    at the end of the build.
                  </span>
                </div>
              </li>
              <li className="nrc-reveal nrc-reveal-delay-3">
                <span className="nrc-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="nrc-why-choose__item-text">
                  <strong>Dedicated Project Manager</strong>
                  <span>
                    Every residential build has a single project manager as your point
                    of contact from contract signing through certificate of occupancy.
                    You always know exactly who to call.
                  </span>
                </div>
              </li>
              <li className="nrc-reveal nrc-reveal-delay-4">
                <span className="nrc-why-choose__icon">
                  <i className="fas fa-building"></i>
                </span>
                <div className="nrc-why-choose__item-text">
                  <strong>Florida Code Expertise</strong>
                  <span>
                    We build to Florida Building Code — including hurricane wind load,
                    energy efficiency, and flood zone requirements — across all 67
                    Florida counties.
                  </span>
                </div>
              </li>
              <li className="nrc-reveal nrc-reveal-delay-5">
                <span className="nrc-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="nrc-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Every new residential build is backed by our written 5-year
                    workmanship warranty, plus Florida statutory new construction
                    warranty coverage under Chapter 558.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="nrc-process">
        <div className="nrc-section__inner">
          <p className="nrc-section__label nrc-reveal">
            How We Manage Every New Home Build
          </p>
          <div className="nrc-process__steps">
            <div className="nrc-process__step nrc-reveal nrc-reveal-delay-1">
              <div className="nrc-process__step-number">1</div>
              <p className="nrc-process__step-title">Pre-Construction</p>
              <p className="nrc-process__step-desc">
                Site review, permits, fixed-price contract signed
              </p>
            </div>
            <div className="nrc-process__step nrc-reveal nrc-reveal-delay-2">
              <div className="nrc-process__step-number">2</div>
              <p className="nrc-process__step-title">Site Preparation</p>
              <p className="nrc-process__step-desc">
                Clearing, grading, utilities, and foundation
              </p>
            </div>
            <div className="nrc-process__step nrc-reveal nrc-reveal-delay-3">
              <div className="nrc-process__step-number">3</div>
              <p className="nrc-process__step-title">Structural Build</p>
              <p className="nrc-process__step-desc">
                Framing, roofing, MEP rough-in, and enclosure
              </p>
            </div>
            <div className="nrc-process__step nrc-reveal nrc-reveal-delay-4">
              <div className="nrc-process__step-number">4</div>
              <p className="nrc-process__step-title">Interior Finish</p>
              <p className="nrc-process__step-desc">
                Insulation, drywall, cabinetry, flooring, and trim
              </p>
            </div>
            <div className="nrc-process__step nrc-reveal nrc-reveal-delay-5">
              <div className="nrc-process__step-number">5</div>
              <p className="nrc-process__step-title">Handover</p>
              <p className="nrc-process__step-desc">
                Final inspection, CO, walkthrough, and warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="nrc-why-choose-us">
        <div className="nrc-section__inner">
          <p className="nrc-section__label nrc-reveal">Why Choose Us</p>
          <h2 className="nrc-section__title nrc-reveal">
            Why Choose Keentel for New Residential Construction?
          </h2>
          <p
            className="nrc-section__text nrc-reveal nrc-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering new
            residential construction that meets the highest standards of quality,
            compliance, and client satisfaction. The following attributes set our
            build team apart:
          </p>
          <div className="nrc-why-choose-us__grid">
            <div className="nrc-why-choose-us__card nrc-reveal nrc-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We develop a complete understanding of your vision, budget, and
                timeline before a single permit is submitted. You are informed and in
                control at every phase of your build.
              </p>
            </div>
            <div className="nrc-why-choose-us__card nrc-reveal nrc-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have built custom homes, multi-family residences, and ADUs across
                all 67 Florida counties — with a consistent record of on-time,
                on-budget delivery and first-submission permit approvals.
              </p>
            </div>
            <div className="nrc-why-choose-us__card nrc-reveal nrc-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We incorporate energy-efficient construction practices,
                smart-home-ready infrastructure, and modern building systems into
                every new residential project we deliver.
              </p>
            </div>
            <div className="nrc-why-choose-us__card nrc-reveal nrc-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every phase of construction is internally inspected before the county
                inspection is scheduled. We identify and resolve issues before they
                become inspection failures or client complaints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="nrc-faq-section">
        <div className="nrc-section__inner">
          <p className="nrc-section__label nrc-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="nrc-section__title nrc-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About New Residential Construction
          </h2>
          <div className="nrc-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="nrc-faq-item nrc-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="nrc-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="nrc-icon"></span>
                </button>
                <div className="nrc-faq-item__answer-wrapper">
                  <div
                    className="nrc-faq-item__answer"
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
      <section className="nrc-cta-section">
        <div className="nrc-section__inner">
          <h2 className="nrc-cta-section__title nrc-reveal">
            Ready to build your new home?
          </h2>
          <p className="nrc-cta-section__text nrc-reveal nrc-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your new
            residential construction project anywhere in Florida.
          </p>
          <a href="/contact#contactformsection" className="nrc-cta-section__btn nrc-reveal nrc-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="nrc-cta-section__contact nrc-reveal nrc-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="nrc-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="nrc-sep">|</span>
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