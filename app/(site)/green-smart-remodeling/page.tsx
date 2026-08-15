"use client";

import "./green-smart-remodeling.css";
import { useEffect, useRef, useState } from "react";

export default function GreenSmartRemodelingPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".gs-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".gs-faq-item");
        if (item) item.classList.add("gs-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".gs-faq-item");
        if (item) item.classList.remove("gs-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".gs-hero__slide");
    const dots = document.querySelectorAll(".gs-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("gs-active"));
      dots.forEach((d) => d.classList.remove("gs-active"));
      slides[index].classList.add("gs-active");
      dots[index].classList.add("gs-active");
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

    const revealElements = document.querySelectorAll(".gs-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gs-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".gs-hero .gs-reveal").forEach((el) =>
      el.classList.add("gs-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Is green remodeling significantly more expensive than standard renovation?",
      a: "Some energy-efficient systems have a higher initial cost than standard alternatives. We provide a clear cost-benefit analysis for every system we specify — including estimated payback period from energy savings — before you commit to any upgrade.",
    },
    {
      q: "Can you integrate solar into an existing remodeling project?",
      a: "Yes. We design solar-ready electrical rough-in and full solar PV installation as part of any remodeling scope — residential or commercial. We manage the structural assessment, permit, and utility interconnection as part of the project.",
    },
    {
      q: "Which smart home platform do you install?",
      a: "We install and integrate systems from all major platforms. We recommend the platform based on your preferences, existing devices, and the level of automation you want. We do not lock clients into a single ecosystem.",
    },
    {
      q: "Do green remodeling upgrades qualify for Florida tax incentives?",
      a: "Several federal and state incentives apply to energy-efficient upgrades and solar installations in Florida. We advise clients on available incentives during the project planning phase so they can be factored into the budget.",
    },
    {
      q: "What areas of Florida do you serve for green remodeling?",
      a: "We are headquartered in Tampa Bay and deliver green remodeling and smart home integration across all 67 Florida counties.",
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
      <section className="gs-hero">
        <div className="gs-hero__slides">
          <div
            className="gs-hero__slide gs-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="gs-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="gs-hero__overlay"></div>

        <div className="gs-hero__content">
          <div className="gs-hero__text">
            <div className="gs-hero__breadcrumb">
              <span className="gs-breadcrumb__light">Remodeling Services</span>
              <span className="gs-breadcrumb__slash">/</span>
              <span className="gs-breadcrumb__accent">
                Green Remodeling &amp; Smart Home Integration
              </span>
            </div>

            <h1 className="gs-hero__title gs-reveal gs-reveal-delay-1">
              Green Remodeling &amp; Smart Home Integration
            </h1>

            <p className="gs-hero__subtitle gs-reveal gs-reveal-delay-2">
              <strong>Energy-Efficient Upgrades Across Florida</strong>
              <br />
              We integrate energy-efficient systems, sustainable materials, and smart
              home technology into residential and commercial remodels across Florida —
              reducing operating costs and future-proofing your building from day one.
            </p>

            <div className="gs-hero__actions gs-reveal gs-reveal-delay-3">
              <a href="#" className="gs-hero__btn gs-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="gs-hero__btn gs-hero__btn--secondary">
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

            <div className="gs-hero__trust gs-reveal gs-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 250+ Florida property owners for green
                remodeling
              </span>
            </div>
          </div>
        </div>

        <div className="gs-hero__dots">
          <span className="gs-hero__dot gs-active"></span>
          <span className="gs-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="gs-intro">
        <div className="gs-intro__inner">
          <div
            className="gs-intro__image gs-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="gs-intro__text gs-reveal gs-reveal-delay-1">
            <h2>
              Remodel Smarter. Lower Your Energy Costs. Future-Proof Your Property.
            </h2>
            <p>
              We have seen firsthand how green remodeling and smart home integration —
              when planned correctly from the start — deliver measurable returns on
              every energy bill after completion. The challenge most property owners
              face is that these systems are too often treated as add-ons rather than
              integrated elements of the remodel plan. At Keentel General Contractors,
              we plan energy-efficient upgrades and smart home systems alongside the
              remodeling scope — not after it. This means the infrastructure is built
              in correctly from the beginning, rather than retrofitted around completed
              work at higher cost and lower performance.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="gs-scope">
        <div className="gs-section__inner">
          <div className="gs-scope__header">
            <p className="gs-section__label gs-reveal">
              What Our Green Remodeling &amp; Smart Home Scope Covers
            </p>
            <h2 className="gs-reveal">
              We deliver green remodeling and smart home integration as part of the
              full remodeling scope — planned, permitted, and installed by our licensed
              in-house team.
            </h2>
            <p className="gs-reveal gs-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="gs-scope__grid">
            {/* Card 1: High-Performance Building Envelope Upgrades */}
            <div className="gs-scope-card gs-reveal gs-reveal-delay-1">
              <div
                className="gs-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="gs-scope-card__number">1</span>
              </div>
              <div className="gs-scope-card__body">
                <h3 className="gs-scope-card__title">
                  High-Performance Building Envelope Upgrades
                </h3>
                <ul className="gs-scope-card__list">
                  <li>Spray foam, blown-in, and continuous insulation upgrades for energy code improvement</li>
                  <li>High-performance window replacement — impact-rated, low-e glass, and thermally broken frames</li>
                  <li>Exterior air sealing and vapor barrier installation to reduce infiltration</li>
                  <li>Cool roof coating or reflective roofing material installation</li>
                  <li>Attic insulation upgrade — blown-in cellulose or spray foam to current R-value requirements</li>
                  <li>Florida Building Code energy compliance documentation for all upgraded envelope components</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Solar PV & Battery Storage Integration */}
            <div className="gs-scope-card gs-reveal gs-reveal-delay-2">
              <div
                className="gs-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop')",
                }}
              >
                <span className="gs-scope-card__number">2</span>
              </div>
              <div className="gs-scope-card__body">
                <h3 className="gs-scope-card__title">
                  Solar PV &amp; Battery Storage Integration
                </h3>
                <ul className="gs-scope-card__list">
                  <li>Solar-ready conduit and electrical rough-in integrated into remodeling scope</li>
                  <li>Rooftop solar PV system design and installation coordination</li>
                  <li>Battery storage system integration — whole-home backup and peak-shaving applications</li>
                  <li>Net metering application coordination with Florida utility providers</li>
                  <li>EV charging infrastructure designed alongside solar production system</li>
                  <li>Structural roof assessment and reinforcement where required for panel load</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Energy-Efficient MEP Upgrades */}
            <div className="gs-scope-card gs-reveal gs-reveal-delay-3">
              <div
                className="gs-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="gs-scope-card__number">3</span>
              </div>
              <div className="gs-scope-card__body">
                <h3 className="gs-scope-card__title">
                  Energy-Efficient MEP Upgrades
                </h3>
                <ul className="gs-scope-card__list">
                  <li>High-SEER HVAC system replacement — sized to current Florida energy code requirements</li>
                  <li>Mini-split and variable refrigerant flow systems for zoned comfort without ductwork</li>
                  <li>Energy recovery ventilation installation for indoor air quality and humidity control</li>
                  <li>LED lighting retrofit — interior and exterior with dimming and occupancy controls</li>
                  <li>Heat pump water heater installation replacing conventional resistance systems</li>
                  <li>Sub-panel installation for EV charger, battery storage, and high-load appliance circuits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="gs-scope__grid gs-scope__grid--bottom">
            {/* Card 4: Smart Home System Integration */}
            <div className="gs-scope-card gs-reveal gs-reveal-delay-4">
              <div
                className="gs-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop')",
                }}
              >
                <span className="gs-scope-card__number">4</span>
              </div>
              <div className="gs-scope-card__body">
                <h3 className="gs-scope-card__title">
                  Smart Home System Integration
                </h3>
                <ul className="gs-scope-card__list">
                  <li>Smart thermostat installation — multi-zone control with remote access and scheduling</li>
                  <li>Automated lighting control — occupancy sensors, daylight harvesting, and scene programming</li>
                  <li>Smart home hub and device integration — voice control, app control, and automation routines</li>
                  <li>Video doorbell, smart lock, and security camera system installation</li>
                  <li>Whole-home audio and video distribution — in-wall speaker and display integration</li>
                  <li>Low-voltage pre-wire for future device expansion integrated into renovation rough-in</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Sustainable Material Selection & Waste Management */}
            <div className="gs-scope-card gs-reveal gs-reveal-delay-5">
              <div
                className="gs-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="gs-scope-card__number">5</span>
              </div>
              <div className="gs-scope-card__body">
                <h3 className="gs-scope-card__title">
                  Sustainable Material Selection &amp; Waste Management
                </h3>
                <ul className="gs-scope-card__list">
                  <li>FSC-certified and sustainably sourced lumber and wood products for renovation scope</li>
                  <li>Recycled content flooring — reclaimed wood, recycled tile, and cork installations</li>
                  <li>Low-VOC paints, adhesives, and finishes for improved indoor air quality</li>
                  <li>Construction waste diversion — sorting, recycling, and reuse throughout the project</li>
                  <li>Local and regional material sourcing to reduce transportation emissions where available</li>
                  <li>Florida-native landscaping coordination for exterior renovations with low-water planting plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="gs-why-choose">
        <div className="gs-why-choose__wrapper">
          <div
            className="gs-why-choose__image-side gs-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="gs-why-choose__content-side">
            <p className="gs-why-choose__label gs-reveal">
              Why Clients Choose Keentel for Green Remodeling
            </p>
            <h2 className="gs-why-choose__heading gs-reveal gs-reveal-delay-1">
              Planned from the start. Built to save.
            </h2>
            <ul className="gs-why-choose__list">
              <li className="gs-reveal gs-reveal-delay-1">
                <span className="gs-why-choose__icon">
                  <i className="fas fa-pencil-ruler"></i>
                </span>
                <div className="gs-why-choose__item-text">
                  <strong>Planned — Not Retrofitted</strong>
                  <span>
                    We integrate green and smart home systems into the remodeling plan
                    from the first design conversation — not added on after the walls
                    are closed. Planned integration outperforms retrofitting in both
                    performance and cost.
                  </span>
                </div>
              </li>
              <li className="gs-reveal gs-reveal-delay-2">
                <span className="gs-why-choose__icon">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <div className="gs-why-choose__item-text">
                  <strong>Real Operating Cost Reduction</strong>
                  <span>
                    Every system we specify is selected for measurable return — lower
                    energy bills, reduced maintenance costs, and higher property
                    value. We provide a clear cost-benefit analysis before
                    recommending any upgrade.
                  </span>
                </div>
              </li>
              <li className="gs-reveal gs-reveal-delay-3">
                <span className="gs-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="gs-why-choose__item-text">
                  <strong>Licensed In-House Installation</strong>
                  <span>
                    All electrical, plumbing, and MEP-related green system
                    installations are performed by our licensed in-house team — not
                    outsourced to separate specialty contractors with no connection to
                    your remodel.
                  </span>
                </div>
              </li>
              <li className="gs-reveal gs-reveal-delay-4">
                <span className="gs-why-choose__icon">
                  <i className="fas fa-cloud-sun"></i>
                </span>
                <div className="gs-why-choose__item-text">
                  <strong>Florida Climate Expertise</strong>
                  <span>
                    We design green upgrades for Florida's specific climate — heat
                    load, humidity, hurricane wind resistance, and flood zone
                    requirements are all factored into every system we specify and
                    install.
                  </span>
                </div>
              </li>
              <li className="gs-reveal gs-reveal-delay-5">
                <span className="gs-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="gs-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All green remodeling and smart home installations are covered by
                    our written 5-year workmanship warranty — applied to all systems
                    our team installs.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="gs-process">
        <div className="gs-section__inner">
          <p className="gs-section__label gs-reveal">
            How We Manage Every Green Remodel
          </p>
          <div className="gs-process__steps">
            <div className="gs-process__step gs-reveal gs-reveal-delay-1">
              <div className="gs-process__step-number">1</div>
              <p className="gs-process__step-title">Energy Assessment</p>
              <p className="gs-process__step-desc">
                Climate, code, and system goals reviewed
              </p>
            </div>
            <div className="gs-process__step gs-reveal gs-reveal-delay-2">
              <div className="gs-process__step-number">2</div>
              <p className="gs-process__step-title">System Selection</p>
              <p className="gs-process__step-desc">
                Green and smart systems specified with ROI
              </p>
            </div>
            <div className="gs-process__step gs-reveal gs-reveal-delay-3">
              <div className="gs-process__step-number">3</div>
              <p className="gs-process__step-title">Integrated Rough-In</p>
              <p className="gs-process__step-desc">
                All infrastructure installed during renovation
              </p>
            </div>
            <div className="gs-process__step gs-reveal gs-reveal-delay-4">
              <div className="gs-process__step-number">4</div>
              <p className="gs-process__step-title">System Installation</p>
              <p className="gs-process__step-desc">
                Equipment installed and systems commissioned
              </p>
            </div>
            <div className="gs-process__step gs-reveal gs-reveal-delay-5">
              <div className="gs-process__step-number">5</div>
              <p className="gs-process__step-title">Handover &amp; Training</p>
              <p className="gs-process__step-desc">
                Systems demonstrated, warranty issued
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="gs-why-choose-us">
        <div className="gs-section__inner">
          <p className="gs-section__label gs-reveal">Why Choose Us</p>
          <h2 className="gs-section__title gs-reveal">
            Why Choose Keentel for Green Remodeling &amp; Smart Home Integration?
          </h2>
          <p
            className="gs-section__text gs-reveal gs-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering green
            remodeling that produces real, measurable results — not just certificates
            on a wall. The following attributes set our sustainable remodeling team
            apart:
          </p>
          <div className="gs-why-choose-us__grid">
            <div className="gs-why-choose-us__card gs-reveal gs-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We assess your energy goals, technology preferences, and budget before
                recommending any green or smart home system. Every upgrade we specify
                has a clear performance rationale and an honest payback estimate.
              </p>
            </div>
            <div className="gs-why-choose-us__card gs-reveal gs-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have integrated solar systems, high-performance envelopes,
                energy-efficient MEP, and smart home technology into residential and
                commercial remodeling projects across all 67 Florida counties.
              </p>
            </div>
            <div className="gs-why-choose-us__card gs-reveal gs-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We stay current with Florida Building Code energy updates, emerging
                smart home platforms, and new sustainable materials — ensuring every
                project benefits from the most effective solutions available.
              </p>
            </div>
            <div className="gs-why-choose-us__card gs-reveal gs-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every green system we install is commissioned and tested before
                handover. Energy-related installations are verified against the
                specification and confirmed to be functioning correctly before the
                project is closed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="gs-faq-section">
        <div className="gs-section__inner">
          <p className="gs-section__label gs-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="gs-section__title gs-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Green Remodeling &amp; Smart Home Integration
          </h2>
          <div className="gs-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="gs-faq-item gs-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="gs-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="gs-icon"></span>
                </button>
                <div className="gs-faq-item__answer-wrapper">
                  <div
                    className="gs-faq-item__answer"
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
      <section className="gs-cta-section">
        <div className="gs-section__inner">
          <h2 className="gs-cta-section__title gs-reveal">
            Ready to remodel smarter?
          </h2>
          <p className="gs-cta-section__text gs-reveal gs-reveal-delay-1">
            Contact Keentel General Contractors today for a free consultation on green
            remodeling and smart home integration for your project anywhere in Florida.
          </p>
          <a href="#" className="gs-cta-section__btn gs-reveal gs-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="gs-cta-section__contact gs-reveal gs-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="gs-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="gs-sep">|</span>
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