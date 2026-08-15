"use client";

import "./sustainable-solutions.css";
import { useEffect, useRef, useState } from "react";

export default function SustainableSolutionsPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".se-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".se-faq-item");
        if (item) item.classList.add("se-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".se-faq-item");
        if (item) item.classList.remove("se-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".se-hero__slide");
    const dots = document.querySelectorAll(".se-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("se-active"));
      dots.forEach((d) => d.classList.remove("se-active"));
      slides[index].classList.add("se-active");
      dots[index].classList.add("se-active");
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

    const revealElements = document.querySelectorAll(".se-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("se-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".se-hero .se-reveal").forEach((el) =>
      el.classList.add("se-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What sustainable construction options do you offer in Florida?",
      a: "We offer high-performance building envelopes, solar PV and battery storage installation, energy-efficient HVAC and lighting systems, smart building automation, sustainable material selection, and construction waste management — for residential, commercial, and industrial projects across Florida.",
    },
    {
      q: "Does energy-efficient construction cost more upfront?",
      a: "Some energy-efficient systems have a higher initial cost than standard alternatives. We provide a clear cost-benefit analysis for every system we specify — including estimated payback period from energy savings — so you can make an informed decision before committing.",
    },
    {
      q: "Can you add solar to an existing home or commercial building?",
      a: "Yes. We install rooftop solar PV systems on existing residential and commercial buildings across Florida — including structural assessment, permit management, utility interconnection, and battery storage integration.",
    },
    {
      q: "Do sustainable builds qualify for Florida tax credits or incentives?",
      a: "Several federal and state incentives apply to energy-efficient upgrades and solar installations in Florida — including the federal Investment Tax Credit (ITC) for solar. We advise clients on available incentives during the project planning phase.",
    },
    {
      q: "What areas of Florida do you serve for sustainable construction?",
      a: "We are headquartered in Tampa Bay and deliver sustainable and energy-efficient construction solutions across all 67 Florida counties.",
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
      <section className="se-hero">
        <div className="se-hero__slides">
          <div
            className="se-hero__slide se-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="se-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="se-hero__overlay"></div>

        <div className="se-hero__content">
          <div className="se-hero__text">
            <div className="se-hero__breadcrumb">
              <span className="se-breadcrumb__light">Build Services</span>
              <span className="se-breadcrumb__slash">/</span>
              <span className="se-breadcrumb__accent">
                Sustainable &amp; Energy-Efficient Solutions
              </span>
            </div>

            <h1 className="se-hero__title se-reveal se-reveal-delay-1">
              Sustainable &amp; Energy-Efficient Solutions
            </h1>

            <p className="se-hero__subtitle se-reveal se-reveal-delay-2">
              <strong>Smarter Buildings for Florida's Future</strong>
              <br />
              We integrate energy-efficient systems, sustainable materials, and
              smart-building technology into every project we deliver — reducing your
              operating costs and your environmental footprint across Florida.
            </p>

            <div className="se-hero__actions se-reveal se-reveal-delay-3">
              <a href="#" className="se-hero__btn se-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="se-hero__btn se-hero__btn--secondary">
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

            <div className="se-hero__trust se-reveal se-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 150+ Florida clients for sustainable
                construction
              </span>
            </div>
          </div>
        </div>

        <div className="se-hero__dots">
          <span className="se-hero__dot se-active"></span>
          <span className="se-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="se-intro">
        <div className="se-intro__inner">
          <div
            className="se-intro__image se-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="se-intro__text se-reveal se-reveal-delay-1">
            <h2>Built to Perform. Built to Last. Built for Florida's Climate.</h2>
            <p>
              At Keentel General Contractors, sustainable and energy-efficient
              construction is not a marketing add-on — it is how we build. Florida's
              climate, energy costs, and evolving building codes make energy-efficient
              design and construction a practical necessity, not just an
              environmental preference. We integrate high-performance building
              envelopes, energy-efficient MEP systems, solar-ready infrastructure, and
              sustainable material selections into every project we deliver —
              residential, commercial, and industrial. The result is a building that
              costs less to operate, performs better in Florida's heat and humidity,
              and holds its value longer than standard construction.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ BUILD SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="se-scope">
        <div className="se-section__inner">
          <div className="se-scope__header">
            <p className="se-section__label se-reveal">
              Our Sustainable Solutions — What We Deliver
            </p>
            <h2 className="se-reveal">
              We integrate sustainability and energy efficiency at every phase of
              construction — from the building envelope to the mechanical systems and
              smart-building infrastructure.
            </h2>
            <p className="se-reveal se-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="se-scope__grid">
            {/* Card 1: High-Performance Building Envelope */}
            <div className="se-scope-card se-reveal se-reveal-delay-1">
              <div
                className="se-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581092160562-40aa0e31b1cd?w=600&h=400&fit=crop')",
                }}
              >
                <span className="se-scope-card__number">1</span>
              </div>
              <div className="se-scope-card__body">
                <h3 className="se-scope-card__title">
                  High-Performance Building Envelope
                </h3>
                <ul className="se-scope-card__list">
                  <li>Spray foam, blown-in, and continuous insulation systems for Florida energy code compliance</li>
                  <li>High-performance window and door selection — impact-rated and low-e glass</li>
                  <li>Air sealing and vapor barrier installation to reduce infiltration and humidity</li>
                  <li>Roof assembly optimization — cool roofing, reflective coatings, and radiant barriers</li>
                  <li>Thermal bridge reduction at framing, penetrations, and transitions</li>
                  <li>Florida Building Code energy compliance — Florida-specific IECC requirements documented</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Solar-Ready & Solar Installation */}
            <div className="se-scope-card se-reveal se-reveal-delay-2">
              <div
                className="se-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop')",
                }}
              >
                <span className="se-scope-card__number">2</span>
              </div>
              <div className="se-scope-card__body">
                <h3 className="se-scope-card__title">
                  Solar-Ready &amp; Solar Installation
                </h3>
                <ul className="se-scope-card__list">
                  <li>Solar-ready conduit and electrical rough-in for future panel installation</li>
                  <li>Rooftop solar PV system design and installation coordination</li>
                  <li>Battery storage system integration — whole-home and commercial backup solutions</li>
                  <li>Net metering application coordination with Florida utility providers</li>
                  <li>EV charging infrastructure integrated with solar production systems</li>
                  <li>Structural reinforcement for solar panel load on existing and new roof assemblies</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Energy-Efficient MEP Systems */}
            <div className="se-scope-card se-reveal se-reveal-delay-3">
              <div
                className="se-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="se-scope-card__number">3</span>
              </div>
              <div className="se-scope-card__body">
                <h3 className="se-scope-card__title">
                  Energy-Efficient MEP Systems
                </h3>
                <ul className="se-scope-card__list">
                  <li>High-SEER HVAC system selection and installation — sized for Florida climate zones</li>
                  <li>Variable refrigerant flow (VRF) systems for commercial and multi-unit applications</li>
                  <li>Energy recovery ventilation (ERV) for indoor air quality and humidity control</li>
                  <li>LED lighting design — interior and exterior — with occupancy and daylight controls</li>
                  <li>High-efficiency water heating — heat pump, tankless, and solar thermal systems</li>
                  <li>Sub-metering installation for commercial and industrial energy monitoring</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="se-scope__grid se-scope__grid--bottom">
            {/* Card 4: Smart Building & Automation Integration */}
            <div className="se-scope-card se-reveal se-reveal-delay-4">
              <div
                className="se-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop')",
                }}
              >
                <span className="se-scope-card__number">4</span>
              </div>
              <div className="se-scope-card__body">
                <h3 className="se-scope-card__title">
                  Smart Building &amp; Automation Integration
                </h3>
                <ul className="se-scope-card__list">
                  <li>Smart thermostat and HVAC zoning control systems</li>
                  <li>Building automation system (BAS) integration for commercial and industrial facilities</li>
                  <li>Automated lighting control — occupancy sensors, daylight harvesting, and schedules</li>
                  <li>Smart irrigation and water-efficient landscape system integration</li>
                  <li>Remote monitoring and energy dashboard setup for real-time consumption tracking</li>
                  <li>Low-voltage pre-wire for future smart system expansion</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Sustainable Materials & Waste Management */}
            <div className="se-scope-card se-reveal se-reveal-delay-5">
              <div
                className="se-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="se-scope-card__number">5</span>
              </div>
              <div className="se-scope-card__body">
                <h3 className="se-scope-card__title">
                  Sustainable Materials &amp; Waste Management
                </h3>
                <ul className="se-scope-card__list">
                  <li>FSC-certified and sustainably sourced lumber and wood products</li>
                  <li>Recycled content and low-embodied carbon material selection</li>
                  <li>Low-VOC paints, adhesives, and finishes for indoor air quality</li>
                  <li>Construction waste diversion — sorting, recycling, and reuse on every project</li>
                  <li>Local and regional material sourcing to reduce transportation emissions</li>
                  <li>Florida-native landscaping integration for low-water, low-maintenance exteriors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="se-why-choose">
        <div className="se-why-choose__wrapper">
          <div
            className="se-why-choose__image-side se-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="se-why-choose__content-side">
            <p className="se-why-choose__label se-reveal">
              Why Clients Choose Keentel for Sustainable Construction
            </p>
            <h2 className="se-why-choose__heading se-reveal se-reveal-delay-1">
              Built smarter. Built for Florida. Built to save.
            </h2>
            <ul className="se-why-choose__list">
              <li className="se-reveal se-reveal-delay-1">
                <span className="se-why-choose__icon">
                  <i className="fas fa-cloud-sun"></i>
                </span>
                <div className="se-why-choose__item-text">
                  <strong>Florida Climate Expertise</strong>
                  <span>
                    We build for Florida's specific climate challenges — heat,
                    humidity, hurricane wind loads, and flood risk — integrating
                    sustainability with structural and code performance.
                  </span>
                </div>
              </li>
              <li className="se-reveal se-reveal-delay-2">
                <span className="se-why-choose__icon">
                  <i className="fas fa-people-arrows"></i>
                </span>
                <div className="se-why-choose__item-text">
                  <strong>Integrated Design-Build Approach</strong>
                  <span>
                    Our design and construction teams work together, which means
                    energy-efficient systems are planned from the first drawing — not
                    added as afterthoughts during construction.
                  </span>
                </div>
              </li>
              <li className="se-reveal se-reveal-delay-3">
                <span className="se-why-choose__icon">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <div className="se-why-choose__item-text">
                  <strong>Real Operating Cost Savings</strong>
                  <span>
                    Every sustainable solution we specify is selected for measurable
                    return — reduced utility bills, lower maintenance costs, and
                    higher property value over the life of the building.
                  </span>
                </div>
              </li>
              <li className="se-reveal se-reveal-delay-4">
                <span className="se-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="se-why-choose__item-text">
                  <strong>Code-Compliant from Day One</strong>
                  <span>
                    Florida energy code requirements are built into our construction
                    documents. We manage all energy compliance documentation and
                    inspections as part of our standard permit process.
                  </span>
                </div>
              </li>
              <li className="se-reveal se-reveal-delay-5">
                <span className="se-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="se-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    All sustainable systems and materials installed by our team are
                    covered by our written 5-year workmanship warranty — giving you
                    confidence in the performance of every system we deliver.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="se-process">
        <div className="se-section__inner">
          <p className="se-section__label se-reveal">
            How We Integrate Sustainability Into Every Build
          </p>
          <div className="se-process__steps">
            <div className="se-process__step se-reveal se-reveal-delay-1">
              <div className="se-process__step-number">1</div>
              <p className="se-process__step-title">Energy Assessment</p>
              <p className="se-process__step-desc">
                Site, climate, and code requirements reviewed
              </p>
            </div>
            <div className="se-process__step se-reveal se-reveal-delay-2">
              <div className="se-process__step-number">2</div>
              <p className="se-process__step-title">System Selection</p>
              <p className="se-process__step-desc">
                MEP, envelope, and solar systems specified
              </p>
            </div>
            <div className="se-process__step se-reveal se-reveal-delay-3">
              <div className="se-process__step-number">3</div>
              <p className="se-process__step-title">Integrated Build</p>
              <p className="se-process__step-desc">
                Sustainable systems installed alongside structure
              </p>
            </div>
            <div className="se-process__step se-reveal se-reveal-delay-4">
              <div className="se-process__step-number">4</div>
              <p className="se-process__step-title">Commissioning</p>
              <p className="se-process__step-desc">
                Systems tested, balanced, and verified
              </p>
            </div>
            <div className="se-process__step se-reveal se-reveal-delay-5">
              <div className="se-process__step-number">5</div>
              <p className="se-process__step-title">Handover &amp; Training</p>
              <p className="se-process__step-desc">
                Owner briefed on systems, warranty issued
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="se-why-choose-us">
        <div className="se-section__inner">
          <p className="se-section__label se-reveal">Why Choose Us</p>
          <h2 className="se-section__title se-reveal">
            Why Choose Keentel for Sustainable &amp; Energy-Efficient Solutions?
          </h2>
          <p
            className="se-section__text se-reveal se-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering sustainable
            construction that delivers measurable performance — not just certificates
            on a wall. The following attributes set our sustainable build team apart:
          </p>
          <div className="se-why-choose-us__grid">
            <div className="se-why-choose-us__card se-reveal se-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We assess your energy goals, budget, and building use before
                recommending any sustainable solution. Every system we specify has a
                clear performance rationale and realistic payback period.
              </p>
            </div>
            <div className="se-why-choose-us__card se-reveal se-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have delivered solar installations, high-performance envelopes,
                energy-efficient MEP systems, and smart-building integrations across
                residential, commercial, and industrial projects throughout Florida.
              </p>
            </div>
            <div className="se-why-choose-us__card se-reveal se-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We stay current with Florida Building Code energy updates, emerging
                sustainable materials, and new system technologies — ensuring every
                project benefits from the best available solutions.
              </p>
            </div>
            <div className="se-why-choose-us__card se-reveal se-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Sustainable systems only perform as designed when installed
                correctly. Our internal QC process verifies every energy-related
                installation against the specification before systems are commissioned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="se-faq-section">
        <div className="se-section__inner">
          <p className="se-section__label se-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="se-section__title se-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Sustainable &amp; Energy-Efficient Solutions
          </h2>
          <div className="se-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="se-faq-item se-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="se-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="se-icon"></span>
                </button>
                <div className="se-faq-item__answer-wrapper">
                  <div
                    className="se-faq-item__answer"
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
      <section className="se-cta-section">
        <div className="se-section__inner">
          <h2 className="se-cta-section__title se-reveal">
            Ready to build smarter?
          </h2>
          <p className="se-cta-section__text se-reveal se-reveal-delay-1">
            Contact Keentel General Contractors today for a free consultation on
            sustainable and energy-efficient solutions for your project anywhere in
            Florida.
          </p>
          <a href="#" className="se-cta-section__btn se-reveal se-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="se-cta-section__contact se-reveal se-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="se-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="se-sep">|</span>
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