"use client";

import "./residential-electrical.css";
import { useEffect, useRef, useState } from "react";

export default function ResidentialElectricalPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".res-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".res-faq-item");
        if (item) item.classList.add("res-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".res-faq-item");
        if (item) item.classList.remove("res-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".res-hero__slide");
    const dots = document.querySelectorAll(".res-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("res-active"));
      dots.forEach((d) => d.classList.remove("res-active"));
      slides[index].classList.add("res-active");
      dots[index].classList.add("res-active");
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

    const revealElements = document.querySelectorAll(".res-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("res-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".res-hero .res-reveal").forEach((el) =>
      el.classList.add("res-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Do you pull permits for residential electrical work in Florida?",
      a: "Yes. All residential electrical work we perform — panel upgrades, rewires, EV chargers, generators, and new circuit installations — is permitted and inspected through the appropriate Florida county building department. We manage the full process on your behalf.",
    },
    {
      q: "How do I know if my panel needs to be upgraded?",
      a: "Signs that indicate a panel upgrade is needed include: breakers that trip frequently, a panel rated below 150A in a home with modern appliance loads, Federal Pacific or Zinsco brand panels, a panel with no room for additional circuits, or an inspection that flagged the panel as non-compliant. We assess your panel capacity as part of every estimate visit.",
    },
    {
      q: "Can you install an EV charger if my panel is already near capacity?",
      a: "Yes. We perform a load calculation before every EV charger installation. Where the existing panel cannot support the additional load, we include a panel upgrade or sub-panel installation in the project scope before the charger is installed.",
    },
    {
      q: "Is a permit required for generator installation in Florida?",
      a: "Yes. Standby generator and transfer switch installations require an electrical permit in Florida. We manage the permit application, utility notification, and county inspection for all generator installations.",
    },
    {
      q: "What areas of Florida do you serve for residential electrical?",
      a: "We are headquartered in Tampa Bay and deliver residential electrical services across all 67 Florida counties.",
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
      <section className="res-hero">
        <div className="res-hero__slides">
          <div
            className="res-hero__slide res-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="res-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="res-hero__overlay"></div>

        <div className="res-hero__content">
          <div className="res-hero__text">
            <div className="res-hero__breadcrumb">
              <span className="res-breadcrumb__light">Electrical Services</span>
              <span className="res-breadcrumb__slash">/</span>
              <span className="res-breadcrumb__accent">
                Residential Electrical
              </span>
            </div>

            <h1 className="res-hero__title res-reveal res-reveal-delay-1">
              Residential Electrical Services
            </h1>

            <p className="res-hero__subtitle res-reveal res-reveal-delay-2">
              <strong>
                Panel Upgrades, EV Chargers, Rewiring &amp; Smart Home Wiring Across
                Florida
              </strong>
              <br />
              Our CFC-licensed electricians self-perform every residential electrical
              scope — panel upgrades to full-home rewires — never outsourced, always
              permitted, and backed by a 5-year warranty across Florida.
            </p>

            <div className="res-hero__actions res-reveal res-reveal-delay-3">
              <a href="#" className="res-hero__btn res-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="res-hero__btn res-hero__btn--secondary">
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

            <div className="res-hero__trust res-reveal res-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 500+ Florida homeowners for residential
                electrical services
              </span>
            </div>
          </div>
        </div>

        <div className="res-hero__dots">
          <span className="res-hero__dot res-active"></span>
          <span className="res-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="res-intro">
        <div className="res-intro__inner">
          <div
            className="res-intro__image res-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="res-intro__text res-reveal res-reveal-delay-1">
            <h2>
              Licensed Residential Electrical Work Done Right — The First Time.
            </h2>
            <p>
              We always advise homeowners that residential electrical work is one of
              the highest-risk areas to cut corners on — both from a safety standpoint
              and a permit compliance standpoint. Unpermitted electrical work in
              Florida creates problems at every point of sale, every insurance renewal,
              and every future renovation. Every residential electrical scope we
              deliver is performed by our CFC-licensed electricians, permitted through
              the appropriate Florida county, inspected, and documented. From a single
              circuit addition to a complete whole-home rewire, we bring the same
              licensed discipline to every job regardless of size.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="res-scope">
        <div className="res-section__inner">
          <div className="res-scope__header">
            <p className="res-section__label res-reveal">
              What Our Residential Electrical Scope Covers
            </p>
            <h2 className="res-reveal">
              We self-perform the full scope of residential electrical services — from
              individual circuit work to whole-home systems — licensed, permitted, and
              inspected across all Florida counties.
            </h2>
            <p className="res-reveal res-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="res-scope__grid">
            {/* Card 1: Panel Upgrades & Service Entrance */}
            <div className="res-scope-card res-reveal res-reveal-delay-1">
              <div
                className="res-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop')",
                }}
              >
                <span className="res-scope-card__number">1</span>
              </div>
              <div className="res-scope-card__body">
                <h3 className="res-scope-card__title">
                  Panel Upgrades &amp; Service Entrance
                </h3>
                <ul className="res-scope-card__list">
                  <li>Main panel upgrade — 100A, 150A, and 200A service upgrades to meet current load requirements</li>
                  <li>Service entrance replacement — weatherhead, meter base, and service conductors</li>
                  <li>Sub-panel installation — detached garage, workshop, pool equipment, and ADU sub-panels</li>
                  <li>Tandem breaker removal and full-capacity panel replacement for code compliance</li>
                  <li>Panel replacement for Federal Pacific, Zinsco, and other recalled panel brands</li>
                  <li>Permit management and utility coordination for all service upgrade work</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Whole-Home Rewiring */}
            <div className="res-scope-card res-reveal res-reveal-delay-2">
              <div
                className="res-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="res-scope-card__number">2</span>
              </div>
              <div className="res-scope-card__body">
                <h3 className="res-scope-card__title">Whole-Home Rewiring</h3>
                <ul className="res-scope-card__list">
                  <li>Knob-and-tube and aluminum wiring removal and replacement with copper conductors</li>
                  <li>Selective rewire — targeted circuit replacement for kitchen, bathrooms, and high-load areas</li>
                  <li>Arc fault circuit interrupter (AFCI) installation throughout living areas per current NEC</li>
                  <li>Ground fault circuit interrupter (GFCI) installation in all required wet and outdoor locations</li>
                  <li>Dedicated circuit installation for major appliances — ranges, dryers, HVAC, and EV chargers</li>
                  <li>Permit management and county inspection for all rewire scope</li>
                </ul>
              </div>
            </div>

            {/* Card 3: EV Charger Installation */}
            <div className="res-scope-card res-reveal res-reveal-delay-3">
              <div
                className="res-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="res-scope-card__number">3</span>
              </div>
              <div className="res-scope-card__body">
                <h3 className="res-scope-card__title">EV Charger Installation</h3>
                <ul className="res-scope-card__list">
                  <li>Load calculation to verify panel capacity before charger installation</li>
                  <li>Level 2 EVSE (Electric Vehicle Supply Equipment) installation — 240V, 30A to 50A circuits</li>
                  <li>Panel breaker addition or sub-panel installation where required for charger load</li>
                  <li>Conduit routing from panel to garage or driveway charging location</li>
                  <li>Weatherproof outlet and dedicated circuit for portable charger use</li>
                  <li>Permit management and county inspection for all EV charger installations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="res-scope__grid res-scope__grid--bottom">
            {/* Card 4: Generator & Transfer Switch Installation */}
            <div className="res-scope-card res-reveal res-reveal-delay-4">
              <div
                className="res-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop')",
                }}
              >
                <span className="res-scope-card__number">4</span>
              </div>
              <div className="res-scope-card__body">
                <h3 className="res-scope-card__title">
                  Generator &amp; Transfer Switch Installation
                </h3>
                <ul className="res-scope-card__list">
                  <li>Standby generator load calculation and equipment sizing for whole-home or critical loads</li>
                  <li>Automatic transfer switch (ATS) installation and utility notification</li>
                  <li>Manual transfer switch installation for portable generator connection</li>
                  <li>Generator pad construction and fuel line coordination — natural gas and propane</li>
                  <li>Generator commissioning, load testing, and client system training</li>
                  <li>Permit management and county inspection for all generator and transfer switch installations</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Smart Home Wiring & Electrical Upgrades */}
            <div className="res-scope-card res-reveal res-reveal-delay-5">
              <div
                className="res-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop')",
                }}
              >
                <span className="res-scope-card__number">5</span>
              </div>
              <div className="res-scope-card__body">
                <h3 className="res-scope-card__title">
                  Smart Home Wiring &amp; Electrical Upgrades
                </h3>
                <ul className="res-scope-card__list">
                  <li>Smart thermostat wiring — C-wire installation and multi-zone control configuration</li>
                  <li>Low-voltage pre-wire — data, audio, security camera, and doorbell circuits</li>
                  <li>Dedicated circuits for home office, media room, and high-draw smart home hubs</li>
                  <li>Lighting control system wiring — dimmer, occupancy sensor, and scene control circuits</li>
                  <li>Whole-home surge protection device installation at main panel</li>
                  <li>USB outlet, arc fault breaker, and tamper-resistant receptacle upgrades throughout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="res-why-choose">
        <div className="res-why-choose__wrapper">
          <div
            className="res-why-choose__image-side res-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905251188-08e19f1a0e1c?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="res-why-choose__content-side">
            <p className="res-why-choose__label res-reveal">
              Why Homeowners Trust Keentel for Residential Electrical
            </p>
            <h2 className="res-why-choose__heading res-reveal res-reveal-delay-1">
              CFC-licensed. Permit-managed. Never outsourced.
            </h2>
            <ul className="res-why-choose__list">
              <li className="res-reveal res-reveal-delay-1">
                <span className="res-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="res-why-choose__item-text">
                  <strong>CFC-Licensed Electricians Only</strong>
                  <span>
                    Every residential electrical scope is performed by our
                    CFC-licensed electricians. We never use unlicensed labor on
                    residential electrical work — regardless of the scope size.
                  </span>
                </div>
              </li>
              <li className="res-reveal res-reveal-delay-2">
                <span className="res-why-choose__icon">
                  <i className="fas fa-clipboard-list"></i>
                </span>
                <div className="res-why-choose__item-text">
                  <strong>Permit-Managed on Every Job</strong>
                  <span>
                    All residential electrical work we deliver is permitted and
                    inspected through the appropriate Florida county. We manage the
                    full permit process on your behalf.
                  </span>
                </div>
              </li>
              <li className="res-reveal res-reveal-delay-3">
                <span className="res-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="res-why-choose__item-text">
                  <strong>No Subcontracting</strong>
                  <span>
                    We self-perform all residential electrical work in-house. Your
                    electrician answers to our project manager — not to a separate
                    company with different quality standards.
                  </span>
                </div>
              </li>
              <li className="res-reveal res-reveal-delay-4">
                <span className="res-why-choose__icon">
                  <i className="fas fa-building"></i>
                </span>
                <div className="res-why-choose__item-text">
                  <strong>Florida Code Expertise</strong>
                  <span>
                    We build to current NEC and Florida Building Code electrical
                    requirements — including AFCI, GFCI, tamper-resistant receptacles,
                    and load calculation standards for all service upgrades.
                  </span>
                </div>
              </li>
              <li className="res-reveal res-reveal-delay-5">
                <span className="res-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="res-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Every residential electrical project is backed by our written
                    5-year workmanship warranty. If something is not right within that
                    window, we return and correct it at no charge.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="res-process">
        <div className="res-section__inner">
          <p className="res-section__label res-reveal">
            How We Deliver Every Electrical Project
          </p>
          <div className="res-process__steps">
            <div className="res-process__step res-reveal res-reveal-delay-1">
              <div className="res-process__step-number">1</div>
              <p className="res-process__step-title">Site Assessment</p>
              <p className="res-process__step-desc">
                Panel capacity, load, and scope reviewed
              </p>
            </div>
            <div className="res-process__step res-reveal res-reveal-delay-2">
              <div className="res-process__step-number">2</div>
              <p className="res-process__step-title">Permit Application</p>
              <p className="res-process__step-desc">
                Electrical permit submitted and managed
              </p>
            </div>
            <div className="res-process__step res-reveal res-reveal-delay-3">
              <div className="res-process__step-number">3</div>
              <p className="res-process__step-title">Licensed Installation</p>
              <p className="res-process__step-desc">
                CFC electrician performs all scope in-house
              </p>
            </div>
            <div className="res-process__step res-reveal res-reveal-delay-4">
              <div className="res-process__step-number">4</div>
              <p className="res-process__step-title">County Inspection</p>
              <p className="res-process__step-desc">
                Electrical inspection scheduled and passed
              </p>
            </div>
            <div className="res-process__step res-reveal res-reveal-delay-5">
              <div className="res-process__step-number">5</div>
              <p className="res-process__step-title">Documentation</p>
              <p className="res-process__step-desc">
                Inspection record and warranty issued
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="res-why-choose-us">
        <div className="res-section__inner">
          <p className="res-section__label res-reveal">Why Choose Us</p>
          <h2 className="res-section__title res-reveal">
            Why Choose Keentel for Residential Electrical Services?
          </h2>
          <p
            className="res-section__text res-reveal res-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering residential
            electrical services that are licensed, permitted, and built to code on
            every project we touch. The following attributes set our residential
            electrical team apart:
          </p>
          <div className="res-why-choose-us__grid">
            <div className="res-why-choose-us__card res-reveal res-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We assess your full electrical system before recommending any scope —
                not just the immediate item you called about. We identify safety
                issues, code violations, and capacity limitations that affect your
                household, and we prioritize what matters most to your safety and
                budget.
              </p>
            </div>
            <div className="res-why-choose-us__card res-reveal res-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have delivered panel upgrades, rewires, EV charger installations,
                generator hookups, and smart home wiring across all 67 Florida counties
                — in homes of every age and construction type.
              </p>
            </div>
            <div className="res-why-choose-us__card res-reveal res-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We integrate smart home infrastructure, EV-ready circuits, and surge
                protection into every residential electrical project where applicable —
                future-proofing your home's electrical system for the next decade.
              </p>
            </div>
            <div className="res-why-choose-us__card res-reveal res-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every circuit we install is tested, labeled, and documented before we
                leave the site. Our inspection pass rate reflects the care we apply to
                every connection, every conduit, and every panel termination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="res-faq-section">
        <div className="res-section__inner">
          <p className="res-section__label res-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="res-section__title res-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Residential Electrical Services
          </h2>
          <div className="res-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="res-faq-item res-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="res-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="res-icon"></span>
                </button>
                <div className="res-faq-item__answer-wrapper">
                  <div
                    className="res-faq-item__answer"
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
      <section className="res-cta-section">
        <div className="res-section__inner">
          <h2 className="res-cta-section__title res-reveal">
            Need a licensed residential electrician?
          </h2>
          <p className="res-cta-section__text res-reveal res-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your
            residential electrical project anywhere in Florida.
          </p>
          <a href="#" className="res-cta-section__btn res-reveal res-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="res-cta-section__contact res-reveal res-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000{" "}
              <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>
                (24/7 Emergency Line)
              </span>
            </a>
            <span className="res-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="res-sep">|</span>
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