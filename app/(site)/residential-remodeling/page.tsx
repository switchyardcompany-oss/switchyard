"use client";

import "./residential-remodeling.css";
import { useEffect, useRef, useState } from "react";

export default function ResidentialRemodelingPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".rr-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".rr-faq-item");
        if (item) item.classList.add("rr-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".rr-faq-item");
        if (item) item.classList.remove("rr-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".rr-hero__slide");
    const dots = document.querySelectorAll(".rr-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("rr-active"));
      dots.forEach((d) => d.classList.remove("rr-active"));
      slides[index].classList.add("rr-active");
      dots[index].classList.add("rr-active");
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

    const revealElements = document.querySelectorAll(".rr-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rr-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".rr-hero .rr-reveal").forEach((el) =>
      el.classList.add("rr-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Do you manage permits for residential remodels in Florida?",
      a: "Yes. We manage all required permits, inspections, and certificate of completion processes across all Florida counties for every remodeling project we take on.",
    },
    {
      q: "Can you remodel while I am still living in the home?",
      a: "Yes. We plan phased construction schedules that minimize disruption to occupied areas. Your project manager communicates daily activity to you in advance throughout the remodel.",
    },
    {
      q: "How long does a kitchen or bathroom remodel take?",
      a: "A standard kitchen remodel runs 4 to 8 weeks from demolition to final finish. Bathroom remodels typically take 2 to 4 weeks. Whole-home projects are scoped individually. We provide a fixed schedule before any work begins.",
    },
    {
      q: "What warranty covers the remodeling work?",
      a: "All residential remodeling projects are covered by our written 5-year workmanship warranty. If any defect is identified within that period related to our scope of work, we return and correct it at no charge.",
    },
    {
      q: "What areas of Florida do you serve for residential remodeling?",
      a: "We are headquartered in Tampa Bay and serve all 67 Florida counties for residential remodeling services.",
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
      <section className="rr-hero">
        <div className="rr-hero__slides">
          <div
            className="rr-hero__slide rr-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="rr-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="rr-hero__overlay"></div>

        <div className="rr-hero__content">
          <div className="rr-hero__text">
            <div className="rr-hero__breadcrumb">
              <span className="rr-breadcrumb__light">Remodeling Services</span>
              <span className="rr-breadcrumb__slash">/</span>
              <span className="rr-breadcrumb__accent">
                Residential Remodeling
              </span>
            </div>

            <h1 className="rr-hero__title rr-reveal rr-reveal-delay-1">
              Residential Remodeling
            </h1>

            <p className="rr-hero__subtitle rr-reveal rr-reveal-delay-2">
              <strong>
                Kitchens, Bathrooms, Basements &amp; Whole-Home Upgrades Across Florida
              </strong>
              <br />
              We manage every phase of your residential remodel — design, permits,
              demolition, construction, and finishing — under one licensed contract.
              One team. No subcontractor gaps. Backed by a 5-year warranty.
            </p>

            <div className="rr-hero__actions rr-reveal rr-reveal-delay-3">
              <a href="#" className="rr-hero__btn rr-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="rr-hero__btn rr-hero__btn--secondary">
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

            <div className="rr-hero__trust rr-reveal rr-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 400+ Florida homeowners for remodeling
                projects
              </span>
            </div>
          </div>
        </div>

        <div className="rr-hero__dots">
          <span className="rr-hero__dot rr-active"></span>
          <span className="rr-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="rr-intro">
        <div className="rr-intro__inner">
          <div
            className="rr-intro__image rr-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="rr-intro__text rr-reveal rr-reveal-delay-1">
            <h2>
              A Remodel Managed by One Licensed Team — From Demolition to Final
              Finish.
            </h2>
            <p>
              We have seen firsthand how residential remodels go wrong when
              responsibility is split between a designer, a general contractor, and
              separate trade subcontractors who have never worked together. Every
              coordination gap becomes a delay. Every delay becomes a cost. At Keentel
              General Contractors, we manage the full remodeling scope under one
              license and one contract — structural modifications, electrical,
              plumbing, cabinetry, flooring, tiling, and finishing. Your dedicated
              project manager coordinates every trade and holds every timeline, so you
              are never left chasing progress updates from multiple contractors.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="rr-scope">
        <div className="rr-section__inner">
          <div className="rr-scope__header">
            <p className="rr-section__label rr-reveal">
              What Our Residential Remodeling Scope Covers
            </p>
            <h2 className="rr-reveal">
              We deliver the full scope of residential remodeling — from single-room
              renovations to complete whole-home upgrades — managed phase by phase
              under one licensed contract.
            </h2>
            <p className="rr-reveal rr-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="rr-scope__grid">
            {/* Card 1: Kitchen Remodeling */}
            <div className="rr-scope-card rr-reveal rr-reveal-delay-1">
              <div
                className="rr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rr-scope-card__number">1</span>
              </div>
              <div className="rr-scope-card__body">
                <h3 className="rr-scope-card__title">Kitchen Remodeling</h3>
                <ul className="rr-scope-card__list">
                  <li>Full layout reconfiguration — wall removal, island additions, and peninsula design</li>
                  <li>Custom cabinetry — design, fabrication coordination, and installation</li>
                  <li>Stone, quartz, and solid-surface countertop installation</li>
                  <li>Appliance integration — built-in, under-counter, and full-size appliances</li>
                  <li>Backsplash tile, under-cabinet lighting, and finish hardware</li>
                  <li>Electrical and plumbing upgrades to support modern kitchen loads</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Bathroom Remodeling */}
            <div className="rr-scope-card rr-reveal rr-reveal-delay-2">
              <div
                className="rr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rr-scope-card__number">2</span>
              </div>
              <div className="rr-scope-card__body">
                <h3 className="rr-scope-card__title">Bathroom Remodeling</h3>
                <ul className="rr-scope-card__list">
                  <li>Shower expansion and conversion — walk-in, curbless, and steam shower builds</li>
                  <li>Freestanding tub installation and surround tile work</li>
                  <li>Vanity replacement — custom and semi-custom cabinetry with vessel and undermount sinks</li>
                  <li>Radiant floor heating installation beneath tile and stone floors</li>
                  <li>Frameless glass enclosure and shower door installation</li>
                  <li>Full plumbing and electrical rough-in for new fixture layouts</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Basement Finishing & Conversion */}
            <div className="rr-scope-card rr-reveal rr-reveal-delay-3">
              <div
                className="rr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rr-scope-card__number">3</span>
              </div>
              <div className="rr-scope-card__body">
                <h3 className="rr-scope-card__title">
                  Basement Finishing &amp; Conversion
                </h3>
                <ul className="rr-scope-card__list">
                  <li>Basement framing — stud wall layout, egress windows, and ceiling system</li>
                  <li>Full MEP rough-in — electrical, plumbing, and HVAC extension into finished space</li>
                  <li>Drywall, insulation, and moisture barrier installation for below-grade environments</li>
                  <li>Flooring — LVP, carpet, tile, and epoxy finishes appropriate for basement conditions</li>
                  <li>Wet bar, home theater, and home office built-in installations</li>
                  <li>Permit management for egress compliance and occupancy classification changes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="rr-scope__grid rr-scope__grid--bottom">
            {/* Card 4: Whole-Home Upgrades & Renovations */}
            <div className="rr-scope-card rr-reveal rr-reveal-delay-4">
              <div
                className="rr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rr-scope-card__number">4</span>
              </div>
              <div className="rr-scope-card__body">
                <h3 className="rr-scope-card__title">
                  Whole-Home Upgrades &amp; Renovations
                </h3>
                <ul className="rr-scope-card__list">
                  <li>Open-plan conversions — load-bearing wall removal with engineered beam installation</li>
                  <li>Full-home flooring replacement — hardwood, LVP, tile, and carpet</li>
                  <li>Interior door, casing, and baseboard replacement throughout</li>
                  <li>Whole-home painting — walls, ceilings, trim, and cabinetry</li>
                  <li>Electrical panel upgrade and full-home rewire where required</li>
                  <li>Popcorn ceiling removal, smooth finish application, and crown molding installation</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Permit Management & Code Compliance */}
            <div className="rr-scope-card rr-reveal rr-reveal-delay-5">
              <div
                className="rr-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop')",
                }}
              >
                <span className="rr-scope-card__number">5</span>
              </div>
              <div className="rr-scope-card__body">
                <h3 className="rr-scope-card__title">
                  Permit Management &amp; Code Compliance
                </h3>
                <ul className="rr-scope-card__list">
                  <li>Building permit application for all structural modifications and system changes</li>
                  <li>Electrical, plumbing, and mechanical permit management where required</li>
                  <li>Florida Building Code compliance review for all remodeling scope</li>
                  <li>County inspection coordination — rough-in, framing, and final inspections</li>
                  <li>HOA design review submission support where applicable</li>
                  <li>Certificate of completion obtained and delivered to client at project close</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="rr-why-choose">
        <div className="rr-why-choose__wrapper">
          <div
            className="rr-why-choose__image-side rr-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="rr-why-choose__content-side">
            <p className="rr-why-choose__label rr-reveal">
              Why Clients Trust Keentel for Their Home Remodel
            </p>
            <h2 className="rr-why-choose__heading rr-reveal rr-reveal-delay-1">
              One contractor. One contract. One point of accountability.
            </h2>
            <ul className="rr-why-choose__list">
              <li className="rr-reveal rr-reveal-delay-1">
                <span className="rr-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="rr-why-choose__item-text">
                  <strong>One Licensed Contractor</strong>
                  <span>
                    Every trade on your remodel — structural, electrical, plumbing,
                    and finish — is managed by our in-house licensed team. No
                    subcontractor handoffs, no split accountability, no communication
                    gaps.
                  </span>
                </div>
              </li>
              <li className="rr-reveal rr-reveal-delay-2">
                <span className="rr-why-choose__icon">
                  <i className="fas fa-file-invoice-dollar"></i>
                </span>
                <div className="rr-why-choose__item-text">
                  <strong>Fixed-Price Contracts</strong>
                  <span>
                    We deliver a written fixed-price contract before demolition
                    begins. No scope change proceeds without your written approval.
                    Your budget is protected from day one.
                  </span>
                </div>
              </li>
              <li className="rr-reveal rr-reveal-delay-3">
                <span className="rr-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="rr-why-choose__item-text">
                  <strong>Dedicated Project Manager</strong>
                  <span>
                    Your remodel is assigned a single project manager who coordinates
                    every trade and is your direct point of contact throughout. You
                    always know who is responsible.
                  </span>
                </div>
              </li>
              <li className="rr-reveal rr-reveal-delay-4">
                <span className="rr-why-choose__icon">
                  <i className="fas fa-building"></i>
                </span>
                <div className="rr-why-choose__item-text">
                  <strong>Florida Code Expertise</strong>
                  <span>
                    Every remodel we deliver is permitted and inspected to Florida
                    Building Code standards. We manage the permit process on your
                    behalf across all Florida counties.
                  </span>
                </div>
              </li>
              <li className="rr-reveal rr-reveal-delay-5">
                <span className="rr-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="rr-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Every residential remodel is backed by our written 5-year
                    workmanship warranty. If something is not right, we return and
                    correct it at no charge.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="rr-process">
        <div className="rr-section__inner">
          <p className="rr-section__label rr-reveal">
            How We Manage Every Remodel
          </p>
          <div className="rr-process__steps">
            <div className="rr-process__step rr-reveal rr-reveal-delay-1">
              <div className="rr-process__step-number">1</div>
              <p className="rr-process__step-title">Scope &amp; Budget Review</p>
              <p className="rr-process__step-desc">
                Goals, constraints, and fixed pricing confirmed
              </p>
            </div>
            <div className="rr-process__step rr-reveal rr-reveal-delay-2">
              <div className="rr-process__step-number">2</div>
              <p className="rr-process__step-title">Design &amp; Selection</p>
              <p className="rr-process__step-desc">
                Materials, finishes, and layouts approved
              </p>
            </div>
            <div className="rr-process__step rr-reveal rr-reveal-delay-3">
              <div className="rr-process__step-number">3</div>
              <p className="rr-process__step-title">Permit Acquisition</p>
              <p className="rr-process__step-desc">
                All Florida permits handled in-house
              </p>
            </div>
            <div className="rr-process__step rr-reveal rr-reveal-delay-4">
              <div className="rr-process__step-number">4</div>
              <p className="rr-process__step-title">Demolition &amp; Build</p>
              <p className="rr-process__step-desc">
                Phased, coordinated execution on schedule
              </p>
            </div>
            <div className="rr-process__step rr-reveal rr-reveal-delay-5">
              <div className="rr-process__step-number">5</div>
              <p className="rr-process__step-title">Finish &amp; Warranty</p>
              <p className="rr-process__step-desc">
                Punch list, walkthrough, and 5-year warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="rr-why-choose-us">
        <div className="rr-section__inner">
          <p className="rr-section__label rr-reveal">Why Choose Us</p>
          <h2 className="rr-section__title rr-reveal">
            Why Choose Keentel for Residential Remodeling?
          </h2>
          <p
            className="rr-section__text rr-reveal rr-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering residential
            remodels that are built to last, managed with precision, and backed by a
            written warranty. The following attributes set our remodeling team apart:
          </p>
          <div className="rr-why-choose-us__grid">
            <div className="rr-why-choose-us__card rr-reveal rr-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We develop a thorough understanding of how you use your home before
                planning the remodel. Every design decision is made with your
                lifestyle, budget, and long-term use in mind.
              </p>
            </div>
            <div className="rr-why-choose-us__card rr-reveal rr-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have completed kitchen, bathroom, basement, and whole-home remodels
                across all 67 Florida counties — with a consistent record of on-time,
                on-budget delivery and first-inspection permit approvals.
              </p>
            </div>
            <div className="rr-why-choose-us__card rr-reveal rr-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We integrate smart-home-ready electrical, energy-efficient lighting,
                and modern material selections into every residential remodel we
                deliver.
              </p>
            </div>
            <div className="rr-why-choose-us__card rr-reveal rr-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                We do not consider a remodel finished until the punch list is clear,
                you have completed the walkthrough, and every item is resolved in
                writing before the final invoice is submitted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="rr-faq-section">
        <div className="rr-section__inner">
          <p className="rr-section__label rr-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="rr-section__title rr-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Residential Remodeling
          </h2>
          <div className="rr-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rr-faq-item rr-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="rr-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="rr-icon"></span>
                </button>
                <div className="rr-faq-item__answer-wrapper">
                  <div
                    className="rr-faq-item__answer"
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
      <section className="rr-cta-section">
        <div className="rr-section__inner">
          <h2 className="rr-cta-section__title rr-reveal">
            Ready to transform your home?
          </h2>
          <p className="rr-cta-section__text rr-reveal rr-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your
            residential remodeling project anywhere in Florida.
          </p>
          <a href="#" className="rr-cta-section__btn rr-reveal rr-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="rr-cta-section__contact rr-reveal rr-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="rr-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="rr-sep">|</span>
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