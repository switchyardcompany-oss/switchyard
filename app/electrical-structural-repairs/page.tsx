"use client";

import "./electrical-structural-repairs.css";
import { useEffect, useRef, useState } from "react";

export default function ElectricalStructuralRepairsPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".es-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".es-faq-item");
        if (item) item.classList.add("es-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".es-faq-item");
        if (item) item.classList.remove("es-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".es-hero__slide");
    const dots = document.querySelectorAll(".es-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("es-active"));
      dots.forEach((d) => d.classList.remove("es-active"));
      slides[index].classList.add("es-active");
      dots[index].classList.add("es-active");
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

    const revealElements = document.querySelectorAll(".es-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("es-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".es-hero .es-reveal").forEach((el) =>
      el.classList.add("es-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What qualifies as an electrical emergency?",
      a: "Any situation involving a tripped main breaker that will not reset, burning smell from a panel or outlet, visible sparking, loss of power to critical systems, storm damage to electrical service, or generator failure on an occupied property.",
    },
    {
      q: "What qualifies as a structural emergency?",
      a: "Foundation cracking, load-bearing wall failure, ceiling system collapse risk, post-storm structural member damage, or any condition where the structural integrity of the building is immediately compromised.",
    },
    {
      q: "Are your electricians licensed in Florida?",
      a: "Yes. All electrical emergency repairs are performed by our CFC-licensed electricians. We hold active Florida CFC and CGC licenses for all repair work we perform.",
    },
    {
      q: "Do you pull permits for emergency repairs?",
      a: "Yes. Where Florida Building Code requires a permit for the scope of repair, we manage the permit application and county inspection as part of the repair process.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and provide 24/7 electrical and structural emergency response across all 67 Florida counties.",
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
      <div className="es-top-bar">
        <div className="es-top-bar__inner">
          <div className="es-top-bar__content">
            <i className="fas fa-exclamation-triangle es-top-bar__icon"></i>
            <span className="es-top-bar__label">EMERGENCY LINE:</span>
            <a href="tel:+18133950000" className="es-top-bar__phone">
              (813) 395-0000
            </a>
            <span className="es-top-bar__divider">|</span>
            <span className="es-top-bar__availability">
              Available 24 Hours, 7 Days a Week, 365 Days a Year
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="es-hero">
        <div className="es-hero__slides">
          <div
            className="es-hero__slide es-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="es-hero__slide"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQawyhdrDUTvntKNxY5GQfwDYipi_AtxUbsTTJKzjeVbqscaNwo5jc8q1Id&s=10')",
            }}
          ></div>
        </div>

        <div className="es-hero__overlay"></div>

        <div className="es-hero__content">
          <div className="es-hero__text">
            <div className="es-hero__breadcrumb">
              <span className="es-breadcrumb__light">Emergency (24/7)</span>
              <span className="es-breadcrumb__slash">/</span>
              <span className="es-breadcrumb__accent">
                Electrical &amp; Structural Emergency Repairs
              </span>
            </div>

            <h1 className="es-hero__title es-reveal es-reveal-delay-1">
              Electrical &amp; Structural Emergency Repairs
            </h1>

            <p className="es-hero__subtitle es-reveal es-reveal-delay-2">
              <strong>Licensed 24/7 Response Across Florida</strong>
              <br />
              Electrical faults and structural failures are not situations to wait out.
              Our licensed electrical and structural team is deployed across Florida 24
              hours a day — arriving on-site within 30 to 60 minutes to assess,
              isolate, and repair.
            </p>

            <div className="es-hero__actions es-reveal es-reveal-delay-3">
              <a href="#" className="es-hero__btn es-hero__btn--primary">
                {envelopeSvg}
                Request Emergency Response
              </a>
              <a href="#" className="es-hero__btn es-hero__btn--secondary">
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

            <div className="es-hero__trust es-reveal es-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 400+ Florida property owners for
                electrical &amp; structural emergencies
              </span>
            </div>
          </div>
        </div>

        <div className="es-hero__dots">
          <span className="es-hero__dot es-active"></span>
          <span className="es-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="es-intro">
        <div className="es-intro__inner">
          <div
            className="es-intro__image es-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="es-intro__text es-reveal es-reveal-delay-1">
            <h2>
              Electrical and Structural Emergencies Require a Licensed Response — Not
              a General Repair Crew.
            </h2>
            <p>
              We have built our emergency electrical and structural division around a
              single principle — when a property has an active electrical fault or a
              compromised structural element, the response team on site must hold the
              correct license to assess, isolate, and repair it safely. We self-perform
              all electrical emergency work through our CFC-licensed electricians and
              all structural emergency repairs through our CGC-licensed construction
              team. There is no subcontracting on an active emergency. Our team arrives
              within 30 to 60 minutes, identifies the root cause, isolates the hazard,
              and begins the licensed repair — all in the same visit.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="es-scope">
        <div className="es-section__inner">
          <div className="es-scope__header">
            <p className="es-section__label es-reveal">
              What Our Emergency Repair Response Covers
            </p>
            <h2 className="es-reveal">
              Our electrical and structural emergency repair scope covers immediate
              hazard isolation through licensed repair and permit close-out — managed
              under one contract.
            </h2>
            <p className="es-reveal es-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="es-scope__grid">
            {/* Card 1: Electrical Fault & Power Failure Response */}
            <div className="es-scope-card es-reveal es-reveal-delay-1">
              <div
                className="es-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop')",
                }}
              >
                <span className="es-scope-card__number">1</span>
              </div>
              <div className="es-scope-card__body">
                <h3 className="es-scope-card__title">
                  Electrical Fault &amp; Power Failure Response
                </h3>
                <ul className="es-scope-card__list">
                  <li>Main panel failure — assessment, isolation, and emergency service restoration</li>
                  <li>Circuit fault identification — tracing overloads, shorts, and arc fault conditions</li>
                  <li>Burned or damaged wiring identification, isolation, and replacement</li>
                  <li>GFCI and AFCI breaker failure — emergency replacement and circuit testing</li>
                  <li>Meter base and service entrance damage from storm or impact</li>
                  <li>Temporary power supply arrangement for occupied properties during repair</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Generator & Transfer Switch Emergency */}
            <div className="es-scope-card es-reveal es-reveal-delay-2">
              <div
                className="es-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop')",
                }}
              >
                <span className="es-scope-card__number">2</span>
              </div>
              <div className="es-scope-card__body">
                <h3 className="es-scope-card__title">
                  Generator &amp; Transfer Switch Emergency
                </h3>
                <ul className="es-scope-card__list">
                  <li>Standby generator failure — fault diagnosis and emergency repair</li>
                  <li>Transfer switch malfunction — isolation and replacement</li>
                  <li>Manual transfer to generator power for occupied residential and commercial properties</li>
                  <li>Fuel system inspection — propane, natural gas, and diesel supply issues</li>
                  <li>Generator load testing and output verification after repair</li>
                  <li>Utility reconnection coordination after generator dependency period</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Structural Wall, Ceiling & Floor Failure */}
            <div className="es-scope-card es-reveal es-reveal-delay-3">
              <div
                className="es-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop')",
                }}
              >
                <span className="es-scope-card__number">3</span>
              </div>
              <div className="es-scope-card__body">
                <h3 className="es-scope-card__title">
                  Structural Wall, Ceiling &amp; Floor Failure
                </h3>
                <ul className="es-scope-card__list">
                  <li>Load-bearing wall crack assessment — structural engineer coordination where required</li>
                  <li>Emergency shoring installation for compromised walls and ceiling systems</li>
                  <li>Post-storm structural member damage assessment and temporary support</li>
                  <li>Foundation movement assessment — slab, stem wall, and pier systems</li>
                  <li>Roof structure failure — emergency shoring and load redistribution</li>
                  <li>Structural repair scope documentation for insurance and permit purposes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="es-scope__grid es-scope__grid--bottom">
            {/* Card 4: Storm-Driven Combined Electrical & Structural Damage */}
            <div className="es-scope-card es-reveal es-reveal-delay-4">
              <div
                className="es-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop')",
                }}
              >
                <span className="es-scope-card__number">4</span>
              </div>
              <div className="es-scope-card__body">
                <h3 className="es-scope-card__title">
                  Storm-Driven Combined Electrical &amp; Structural Damage
                </h3>
                <ul className="es-scope-card__list">
                  <li>Combined electrical and structural assessment after hurricane or severe weather</li>
                  <li>Electrical hazard isolation before structural access is permitted</li>
                  <li>Structural stabilization to allow safe electrical repair access</li>
                  <li>Roof structure emergency shoring coordinated with electrical isolation</li>
                  <li>Damage documentation covering both electrical and structural scope for insurance</li>
                  <li>Coordinated repair — structural and electrical work sequenced under one plan</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Post-Repair Inspection & Documentation */}
            <div className="es-scope-card es-reveal es-reveal-delay-5">
              <div
                className="es-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="es-scope-card__number">5</span>
              </div>
              <div className="es-scope-card__body">
                <h3 className="es-scope-card__title">
                  Post-Repair Inspection &amp; Documentation
                </h3>
                <ul className="es-scope-card__list">
                  <li>Post-repair electrical system testing — load testing, circuit verification, and GFCI function</li>
                  <li>Structural repair inspection — visual and physical assessment of all repaired elements</li>
                  <li>County permit and inspection coordination where required by Florida Building Code</li>
                  <li>Insurance documentation — written scope, photo evidence, and repair cost breakdown</li>
                  <li>Client walkthrough and system demonstration before sign-off</li>
                  <li>Written warranty documentation issued at repair close</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="es-why-choose">
        <div className="es-why-choose__wrapper">
          <div
            className="es-why-choose__image-side es-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905251188-08e19f1a0e1c?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="es-why-choose__content-side">
            <p className="es-why-choose__label es-reveal">
              Why Clients Trust Our Emergency Repair Team
            </p>
            <h2 className="es-why-choose__heading es-reveal es-reveal-delay-1">
              Licensed response. Root-cause repair. One contract.
            </h2>
            <ul className="es-why-choose__list">
              <li className="es-reveal es-reveal-delay-1">
                <span className="es-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="es-why-choose__item-text">
                  <strong>CFC &amp; CGC Licensed In-House</strong>
                  <span>
                    All electrical emergency repairs are performed by our
                    CFC-licensed electricians. All structural repairs are performed by
                    our CGC-licensed construction team. No unlicensed labor on any
                    emergency response.
                  </span>
                </div>
              </li>
              <li className="es-reveal es-reveal-delay-2">
                <span className="es-why-choose__icon">
                  <i className="fas fa-clock"></i>
                </span>
                <div className="es-why-choose__item-text">
                  <strong>30–60 Minute On-Site Response</strong>
                  <span>
                    We confirm arrival time at the moment you call. Our crews are
                    stationed across Florida for rapid deployment on electrical and
                    structural emergencies.
                  </span>
                </div>
              </li>
              <li className="es-reveal es-reveal-delay-3">
                <span className="es-why-choose__icon">
                  <i className="fas fa-search"></i>
                </span>
                <div className="es-why-choose__item-text">
                  <strong>Root Cause — Not Just Symptom</strong>
                  <span>
                    We identify and repair the root cause of every electrical fault
                    and structural failure — not just the visible damage. Treating
                    symptoms without addressing the cause leads to repeat failures.
                  </span>
                </div>
              </li>
              <li className="es-reveal es-reveal-delay-4">
                <span className="es-why-choose__icon">
                  <i className="fas fa-file-contract"></i>
                </span>
                <div className="es-why-choose__item-text">
                  <strong>Single Scope — Full Repair</strong>
                  <span>
                    We manage electrical and structural repairs under one contract. No
                    separate electricians and structural contractors with competing
                    priorities on the same active emergency.
                  </span>
                </div>
              </li>
              <li className="es-reveal es-reveal-delay-5">
                <span className="es-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="es-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All emergency electrical and structural repairs are covered by our
                    written 5-year workmanship warranty.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="es-process">
        <div className="es-section__inner">
          <p className="es-section__label es-reveal">
            Our Emergency Response Process
          </p>
          <div className="es-process__steps">
            <div className="es-process__step es-reveal es-reveal-delay-1">
              <div className="es-process__step-number">1</div>
              <p className="es-process__step-title">You Call</p>
              <p className="es-process__step-desc">
                Emergency line answered immediately — 24/7
              </p>
            </div>
            <div className="es-process__step es-reveal es-reveal-delay-2">
              <div className="es-process__step-number">2</div>
              <p className="es-process__step-title">Dispatch</p>
              <p className="es-process__step-desc">
                Licensed crew en route within 15 minutes
              </p>
            </div>
            <div className="es-process__step es-reveal es-reveal-delay-3">
              <div className="es-process__step-number">3</div>
              <p className="es-process__step-title">Hazard Isolation</p>
              <p className="es-process__step-desc">
                Electrical or structural hazard isolated on arrival
              </p>
            </div>
            <div className="es-process__step es-reveal es-reveal-delay-4">
              <div className="es-process__step-number">4</div>
              <p className="es-process__step-title">Licensed Repair</p>
              <p className="es-process__step-desc">
                Root cause identified and repair completed
              </p>
            </div>
            <div className="es-process__step es-reveal es-reveal-delay-5">
              <div className="es-process__step-number">5</div>
              <p className="es-process__step-title">Documentation</p>
              <p className="es-process__step-desc">
                Permit, inspection, and warranty issued
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="es-why-choose-us">
        <div className="es-section__inner">
          <p className="es-section__label es-reveal">Why Choose Us</p>
          <h2 className="es-section__title es-reveal">
            Why Choose Keentel for Electrical &amp; Structural Emergency Repairs?
          </h2>
          <p
            className="es-section__text es-reveal es-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering emergency
            electrical and structural repairs that are licensed, documented, and backed
            by a written warranty. The following attributes set our emergency repair
            team apart:
          </p>
          <div className="es-why-choose-us__grid">
            <div className="es-why-choose-us__card es-reveal es-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We isolate the hazard first — then explain clearly what we found, what
                we are doing, and why. You are never left guessing during an active
                electrical or structural emergency on your property.
              </p>
            </div>
            <div className="es-why-choose-us__card es-reveal es-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have responded to electrical faults and structural emergencies
                across all 67 Florida counties — in residential, commercial, and
                industrial properties — with a consistent record of safe, licensed
                resolution.
              </p>
            </div>
            <div className="es-why-choose-us__card es-reveal es-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use thermal imaging and circuit analysis tools to identify
                electrical faults that are not visible to the eye — ensuring root
                causes are found and corrected, not just reset.
              </p>
            </div>
            <div className="es-why-choose-us__card es-reveal es-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every emergency repair is documented with written scope, photos, and
                permit information where required. Our records protect you legally and
                give insurance adjusters the documentation they need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="es-faq-section">
        <div className="es-section__inner">
          <p className="es-section__label es-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="es-section__title es-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Electrical &amp; Structural Emergency Repairs
          </h2>
          <div className="es-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="es-faq-item es-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="es-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="es-icon"></span>
                </button>
                <div className="es-faq-item__answer-wrapper">
                  <div
                    className="es-faq-item__answer"
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
      <section className="es-cta-section">
        <div className="es-section__inner">
          {/* Emergency Banner */}
          <div className="es-cta-section__emergency-banner">
            <i className="fas fa-exclamation-triangle"></i>
            <span>
              EMERGENCY LINE:{" "}
              <a href="tel:+18133950000">(813) 395-0000</a> — Available 24 Hours, 7
              Days a Week, 365 Days a Year
            </span>
          </div>

          <h2 className="es-cta-section__title es-reveal">
            Electrical fault or structural failure right now?
          </h2>
          <p className="es-cta-section__text es-reveal es-reveal-delay-1">
            Do not wait. Call our emergency line immediately — our licensed team is
            dispatched within 15 minutes across Florida.
          </p>
          <a href="#" className="es-cta-section__btn es-reveal es-reveal-delay-2">
            {envelopeSvg}
            Request Emergency Response
          </a>
          <div className="es-cta-section__contact es-reveal es-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="es-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="es-sep">|</span>
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