"use client";

import "./commercial-electrical.css";
import { useEffect, useRef, useState } from "react";

export default function CommercialElectricalPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".ce-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".ce-faq-item");
        if (item) item.classList.add("ce-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".ce-faq-item");
        if (item) item.classList.remove("ce-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".ce-hero__slide");
    const dots = document.querySelectorAll(".ce-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("ce-active"));
      dots.forEach((d) => d.classList.remove("ce-active"));
      slides[index].classList.add("ce-active");
      dots[index].classList.add("ce-active");
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

    const revealElements = document.querySelectorAll(".ce-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ce-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".ce-hero .ce-reveal").forEach((el) =>
      el.classList.add("ce-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Do you manage permits for commercial electrical work in Florida?",
      a: "Yes. We manage all commercial electrical permit applications, plan reviews, and county inspections across all Florida counties. For complex commercial scopes, we coordinate licensed electrical engineering drawings as part of the permit package where required.",
    },
    {
      q: "Can you perform commercial electrical work during business hours without disrupting operations?",
      a: "Yes. We plan phased electrical work schedules for occupied commercial properties. Critical switchovers are scheduled during low-occupancy periods, and temporary power is maintained throughout wherever required to protect ongoing business operations.",
    },
    {
      q: "What is included in your commercial electrical maintenance contract?",
      a: "Our commercial maintenance contracts include scheduled panel inspections, infrared thermography scanning, lighting maintenance, and priority emergency response. Contract frequency and scope are customized to your facility's size, age, and operational requirements.",
    },
    {
      q: "Do you provide emergency commercial electrical response?",
      a: "Yes. Our 24/7 emergency electrical response covers active faults, outages, and equipment failures in commercial facilities across Florida. Our emergency line is answered immediately and crews are dispatched within 15 minutes.",
    },
    {
      q: "What areas of Florida do you serve for commercial electrical?",
      a: "We are headquartered in Tampa Bay and deliver commercial electrical services across all 67 Florida counties.",
    },
  ];

  // ─── Envelope SVG (used in hero and CTA buttons) ───
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="ce-hero">
        <div className="ce-hero__slides">
          <div
            className="ce-hero__slide ce-active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="ce-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="ce-hero__overlay"></div>

        <div className="ce-hero__content">
          <div className="ce-hero__text">
            <div className="ce-hero__breadcrumb">
              <span className="ce-breadcrumb__light">Electrical Services</span>
              <span className="ce-breadcrumb__slash">/</span>
              <span className="ce-breadcrumb__accent">Commercial Electrical</span>
            </div>

            <h1 className="ce-hero__title ce-reveal ce-reveal-delay-1">
              Commercial Electrical Services
            </h1>

            <p className="ce-hero__subtitle ce-reveal ce-reveal-delay-2">
              <strong>
                New Construction, Tenant Improvements &amp; LED Retrofits Across Florida
              </strong>
              <br />
              Our CFC-licensed commercial electricians self-perform the full scope of
              commercial electrical work — new construction to maintenance contracts —
              permitted, code-compliant, and delivered on your business timeline across
              Florida.
            </p>

            <div className="ce-hero__actions ce-reveal ce-reveal-delay-3">
              <a href="#" className="ce-hero__btn ce-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="ce-hero__btn ce-hero__btn--secondary">
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

            <div className="ce-hero__trust ce-reveal ce-reveal-delay-4">
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
                electrical services
              </span>
            </div>
          </div>
        </div>

        <div className="ce-hero__dots">
          <span className="ce-hero__dot ce-active"></span>
          <span className="ce-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="ce-intro">
        <div className="ce-intro__inner">
          <div
            className="ce-intro__image ce-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ce-intro__text ce-reveal ce-reveal-delay-1">
            <h2>
              Commercial Electrical Done Right — On Your Business Timeline, Not Ours.
            </h2>
            <p>
              We have seen firsthand how commercial electrical delays cascade into
              missed opening dates, lease penalty clauses, and revenue losses that far
              exceed the cost of the electrical scope itself. We plan every commercial
              electrical project around your business timeline — coordinating with your
              GC schedule, your tenant improvement milestone, and your operational
              requirements. We self-perform all commercial electrical scope through our
              CFC-licensed electricians, which means our project manager controls the
              schedule directly. No subcontractor availability delays. No coordination
              gaps between the electrical crew and the construction team.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="ce-scope">
        <div className="ce-section__inner">
          <div className="ce-scope__header">
            <p className="ce-section__label ce-reveal">
              What Our Commercial Electrical Scope Covers
            </p>
            <h2 className="ce-reveal">
              We self-perform the full scope of commercial electrical services — from
              ground-up new construction to ongoing maintenance contracts — licensed,
              permitted, and delivered across all Florida counties.
            </h2>
            <p className="ce-reveal ce-reveal-delay-1">
              Here is the full scope of what our licensed team delivers.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="ce-scope__grid">
            {/* Card 1: New Commercial Construction Electrical */}
            <div className="ce-scope-card ce-reveal ce-reveal-delay-1">
              <div
                className="ce-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ce-scope-card__number">1</span>
              </div>
              <div className="ce-scope-card__body">
                <h3 className="ce-scope-card__title">
                  New Commercial Construction Electrical
                </h3>
                <ul className="ce-scope-card__list">
                  <li>Electrical system design coordination — load calculations, panel sizing, and distribution layout</li>
                  <li>Primary electrical service installation — meter base, main distribution panel, and building distribution</li>
                  <li>Branch circuit rough-in — lighting, receptacle, data, and HVAC circuits throughout</li>
                  <li>Emergency lighting and exit sign circuit installation and testing</li>
                  <li>Fire alarm system rough-in coordination with fire alarm contractor</li>
                  <li>Florida Building Code and NEC commercial electrical compliance documentation</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Tenant Improvement & Build-Out Wiring */}
            <div className="ce-scope-card ce-reveal ce-reveal-delay-2">
              <div
                className="ce-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ce-scope-card__number">2</span>
              </div>
              <div className="ce-scope-card__body">
                <h3 className="ce-scope-card__title">
                  Tenant Improvement &amp; Build-Out Wiring
                </h3>
                <ul className="ce-scope-card__list">
                  <li>Electrical scope review against landlord work letter and base building capacity</li>
                  <li>Sub-panel installation and circuit distribution for tenant space</li>
                  <li>Lighting circuit installation — recessed, pendant, track, and specialty lighting</li>
                  <li>Receptacle layout per tenant equipment plan — dedicated circuits for server rooms and break rooms</li>
                  <li>Data and low-voltage rough-in — IT closet, workstation, and conference room circuits</li>
                  <li>Coordination with base building metering — sub-metering installation where required</li>
                </ul>
              </div>
            </div>

            {/* Card 3: LED Lighting Retrofit & Design */}
            <div className="ce-scope-card ce-reveal ce-reveal-delay-3">
              <div
                className="ce-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ce-scope-card__number">3</span>
              </div>
              <div className="ce-scope-card__body">
                <h3 className="ce-scope-card__title">
                  LED Lighting Retrofit &amp; Design
                </h3>
                <ul className="ce-scope-card__list">
                  <li>Existing lighting audit — fixture inventory, wattage, and control system assessment</li>
                  <li>LED fixture selection — efficacy, color temperature, and CRI appropriate for the space type</li>
                  <li>Dimming and occupancy control integration — 0-10V dimming, occupancy sensors, and daylight harvesting</li>
                  <li>Emergency lighting compliance — battery backup LED and exit sign replacement</li>
                  <li>Warehouse and industrial high-bay LED replacement — maintained foot-candle verification</li>
                  <li>Energy savings documentation for rebate applications where applicable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="ce-scope__grid ce-scope__grid--bottom">
            {/* Card 4: Commercial Panel Upgrades & Power Distribution */}
            <div className="ce-scope-card ce-reveal ce-reveal-delay-4">
              <div
                className="ce-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ce-scope-card__number">4</span>
              </div>
              <div className="ce-scope-card__body">
                <h3 className="ce-scope-card__title">
                  Commercial Panel Upgrades &amp; Power Distribution
                </h3>
                <ul className="ce-scope-card__list">
                  <li>Load growth assessment — identifying panel capacity versus current and projected demand</li>
                  <li>Main panel and switchgear upgrade — 400A, 800A, and 1200A commercial service replacements</li>
                  <li>Sub-panel installation for building additions, EV charging stations, and new tenant spaces</li>
                  <li>Three-phase power distribution for commercial kitchens, medical equipment, and AV systems</li>
                  <li>Power quality analysis — identifying harmonics, voltage sag, and load imbalance</li>
                  <li>Temporary power supply during active commercial construction and renovation phases</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Commercial Maintenance Contracts & 24/7 Support */}
            <div className="ce-scope-card ce-reveal ce-reveal-delay-5">
              <div
                className="ce-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop')",
                }}
              >
                <span className="ce-scope-card__number">5</span>
              </div>
              <div className="ce-scope-card__body">
                <h3 className="ce-scope-card__title">
                  Commercial Maintenance Contracts &amp; 24/7 Support
                </h3>
                <ul className="ce-scope-card__list">
                  <li>Scheduled preventive maintenance — annual inspection of all panels, disconnects, and distribution</li>
                  <li>Infrared thermography scanning — identifying hot spots in panels and connections before failures occur</li>
                  <li>Emergency electrical response — active fault, power outage, and circuit failure response</li>
                  <li>Lighting maintenance — group relamping, ballast replacement, and control system programming</li>
                  <li>Arc flash hazard assessment and labeling for commercial and industrial facilities</li>
                  <li>Service contract options — annual, quarterly, and on-call response agreements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="ce-why-choose">
        <div className="ce-why-choose__wrapper">
          <div
            className="ce-why-choose__image-side ce-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="ce-why-choose__content-side">
            <p className="ce-why-choose__label ce-reveal">
              Why Commercial Clients Choose Keentel for Electrical
            </p>
            <h2 className="ce-why-choose__heading ce-reveal ce-reveal-delay-1">
              CFC-licensed. Business-timeline priority. In-house advantage.
            </h2>
            <ul className="ce-why-choose__list">
              <li className="ce-reveal ce-reveal-delay-1">
                <span className="ce-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="ce-why-choose__item-text">
                  <strong>CFC-Licensed — Always In-House</strong>
                  <span>
                    Every commercial electrical scope is performed by our CFC-licensed
                    commercial electricians. We never subcontract electrical work to
                    unvetted third parties on any project we manage.
                  </span>
                </div>
              </li>
              <li className="ce-reveal ce-reveal-delay-2">
                <span className="ce-why-choose__icon">
                  <i className="fas fa-calendar-check"></i>
                </span>
                <div className="ce-why-choose__item-text">
                  <strong>Business-Timeline Priority</strong>
                  <span>
                    We plan commercial electrical work around your business calendar —
                    coordinating with your GC schedule, your tenant improvement
                    milestone, and your opening date. Electrical delays do not cascade
                    on our projects.
                  </span>
                </div>
              </li>
              <li className="ce-reveal ce-reveal-delay-3">
                <span className="ce-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="ce-why-choose__item-text">
                  <strong>Single GC Advantage</strong>
                  <span>
                    When Keentel is your GC and your electrician, the schedule
                    coordination is internal. Our electrical team answers to our
                    project manager — eliminating the most common source of commercial
                    electrical delays.
                  </span>
                </div>
              </li>
              <li className="ce-reveal ce-reveal-delay-4">
                <span className="ce-why-choose__icon">
                  <i className="fas fa-building"></i>
                </span>
                <div className="ce-why-choose__item-text">
                  <strong>Florida Code &amp; NEC Compliance</strong>
                  <span>
                    Every commercial electrical system we install is built to current
                    NEC and Florida Building Code commercial electrical requirements —
                    including emergency lighting, arc flash labeling, and load
                    calculation standards.
                  </span>
                </div>
              </li>
              <li className="ce-reveal ce-reveal-delay-5">
                <span className="ce-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="ce-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Every commercial electrical project is backed by our written 5-year
                    workmanship warranty — applied to all scope our CFC-licensed team
                    installs.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="ce-process">
        <div className="ce-section__inner">
          <p className="ce-section__label ce-reveal">
            How We Deliver Every Electrical Project
          </p>
          <div className="ce-process__steps">
            <div className="ce-process__step ce-reveal ce-reveal-delay-1">
              <div className="ce-process__step-number">1</div>
              <p className="ce-process__step-title">Load Assessment</p>
              <p className="ce-process__step-desc">Existing capacity and project load reviewed</p>
            </div>
            <div className="ce-process__step ce-reveal ce-reveal-delay-2">
              <div className="ce-process__step-number">2</div>
              <p className="ce-process__step-title">Permit Application</p>
              <p className="ce-process__step-desc">Commercial electrical permit submitted</p>
            </div>
            <div className="ce-process__step ce-reveal ce-reveal-delay-3">
              <div className="ce-process__step-number">3</div>
              <p className="ce-process__step-title">Rough-In</p>
              <p className="ce-process__step-desc">Licensed in-house installation to schedule</p>
            </div>
            <div className="ce-process__step ce-reveal ce-reveal-delay-4">
              <div className="ce-process__step-number">4</div>
              <p className="ce-process__step-title">County Inspection</p>
              <p className="ce-process__step-desc">Electrical inspection managed and passed</p>
            </div>
            <div className="ce-process__step ce-reveal ce-reveal-delay-5">
              <div className="ce-process__step-number">5</div>
              <p className="ce-process__step-title">Documentation</p>
              <p className="ce-process__step-desc">As-builts, inspection record, and warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="ce-why-choose-us">
        <div className="ce-section__inner">
          <p className="ce-section__label ce-reveal">Why Choose Us</p>
          <h2 className="ce-section__title ce-reveal">
            Why Choose Keentel for Commercial Electrical Services?
          </h2>
          <p
            className="ce-section__text ce-reveal ce-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering commercial
            electrical services that are licensed, schedule-driven, and code-compliant
            on every project we accept. The following attributes set our commercial
            electrical team apart:
          </p>
          <div className="ce-why-choose-us__grid">
            <div className="ce-why-choose-us__card ce-reveal ce-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We assess your business's electrical requirements — current load,
                future growth, and operational dependencies — before scoping any
                commercial electrical project. We prioritize systems that protect your
                revenue and your operations, not just your budget.
              </p>
            </div>
            <div className="ce-why-choose-us__card ce-reveal ce-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have delivered commercial electrical systems for offices, retail,
                restaurants, medical facilities, warehouses, and mixed-use developments
                across all 67 Florida counties — on schedules driven by business
                opening deadlines.
              </p>
            </div>
            <div className="ce-why-choose-us__card ce-reveal ce-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We integrate LED lighting with advanced controls, sub-metering for
                energy visibility, EV charging infrastructure, and power quality
                management into commercial electrical scopes where they deliver
                measurable operational value.
              </p>
            </div>
            <div className="ce-why-choose-us__card ce-reveal ce-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every commercial circuit is labeled, tested, and documented before the
                county inspection is scheduled. Our panel schedules, as-built drawings,
                and inspection records are delivered to the client at project close —
                not requested after the fact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="ce-faq-section">
        <div className="ce-section__inner">
          <p className="ce-section__label ce-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="ce-section__title ce-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Commercial Electrical Services
          </h2>
          <div className="ce-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="ce-faq-item ce-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="ce-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="ce-icon"></span>
                </button>
                <div className="ce-faq-item__answer-wrapper">
                  <div
                    className="ce-faq-item__answer"
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
      <section className="ce-cta-section">
        <div className="ce-section__inner">
          <h2 className="ce-cta-section__title ce-reveal">
            Need a licensed commercial electrician?
          </h2>
          <p className="ce-cta-section__text ce-reveal ce-reveal-delay-1">
            Contact Keentel General Contractors today for a free estimate on your
            commercial electrical project anywhere in Florida.
          </p>
          <a href="#" className="ce-cta-section__btn ce-reveal ce-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="ce-cta-section__contact ce-reveal ce-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000{" "}
              <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>
                (24/7 Emergency Line)
              </span>
            </a>
            <span className="ce-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="ce-sep">|</span>
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