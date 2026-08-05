"use client";

import "./architectural-drawings.css";
import { useEffect, useRef, useState } from "react";

export default function ArchitecturalDrawingsPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Store refs to the content div INSIDE the wrapper
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".faq-item");
        if (item) item.classList.add("active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".faq-item");
        if (item) item.classList.remove("active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".hero__slide");
    const dots = document.querySelectorAll(".hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));
      slides[index].classList.add("active");
      dots[index].classList.add("active");
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

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("visible"));

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What types of drawings do you produce?",
      a: "We produce architectural floor plans, elevations, site plans, structural engineering drawings, and MEP (mechanical, electrical, plumbing) coordination drawings for residential, commercial, and industrial projects across Florida.",
    },
    {
      q: "Are your drawings permit-ready?",
      a: "Yes. Every drawing set we deliver is reviewed against current Florida Building Code and local county requirements before submission. We manage the full permit application process on your behalf.",
    },
    {
      q: "Do you produce drawings for both new construction and renovations?",
      a: "Yes. We produce full drawing sets for new builds, additions, renovations, and change-of-use projects — residential, commercial, and industrial — across all 67 Florida counties.",
    },
    {
      q: "In what file formats do you deliver drawings?",
      a: "We deliver drawing sets in PDF format as standard. DWG and DXF files are available on request. BIM model files can be provided for larger commercial and industrial projects.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and produce architectural and engineering drawings for projects across all 67 Florida counties.",
    },
  ];

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero">
        <div className="hero__slides">
          <div
            className="hero__slide active"
            style={{
              backgroundImage:
                "url('https://flengineeringllc.com/wp-content/uploads/sites/2/2024/05/w0vYewxyR66u7OdeG0xFIA.png')",
            }}
          ></div>
          <div
            className="hero__slide"
            style={{
              backgroundImage:
                "url('https://lirp.cdn-website.com/5f51f017/dms3rep/multi/opt/LRP+Engineering+%2824%29-640w.jpg')",
            }}
          ></div>
        </div>

        <div className="hero__overlay"></div>

        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__breadcrumb">
              <span className="breadcrumb__light">Design Services</span>
              <span className="breadcrumb__slash">/</span>
              <span className="breadcrumb__accent">
                Architectural &amp; Engineering Drawings
              </span>
            </div>

            <h1 className="hero__title reveal reveal-delay-1">
              Architectural &amp; Engineering Drawings
            </h1>

            <p className="hero__subtitle reveal reveal-delay-2">
              <strong>Permit-Ready Plans for Every Project Type</strong>
              <br />
              Precise, code-compliant architectural and engineering drawings that move
              your project from concept to permit approval — without delays, without
              revisions.
            </p>

            <div className="hero__actions reveal reveal-delay-3">
              <a href="/contact#contactformsection" className="hero__btn hero__btn--primary">
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
                Schedule Free Consultation
              </a>
              <a href="#ourworksection" className="hero__btn hero__btn--secondary">
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

            <div className="hero__trust reveal reveal-delay-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 300+ Florida clients for permit-ready
                drawings
              </span>
            </div>
          </div>
        </div>

        <div className="hero__dots">
          <span className="hero__dot active"></span>
          <span className="hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="intro">
        <div className="intro__inner">
          <div
            className="intro__image reveal"
            style={{
              backgroundImage:
                "url('https://flengineeringllc.com/wp-content/uploads/sites/2/2024/05/w0vYewxyR66u7OdeG0xFIA.png')",
            }}
          ></div>
          <div className="intro__text reveal reveal-delay-1">
            <h2>Every Successful Build Starts with the Right Drawings.</h2>
            <p>
              At Keentel General Contractors, we produce architectural and engineering
              drawings that go beyond compliance — they are the foundation your entire
              project is built on. Every set of drawings we deliver is prepared by our
              licensed team, reviewed against Florida Building Code, and submitted with
              the permit package on your behalf. Whether you are breaking ground on a
              new home, fitting out a commercial space, or expanding an industrial
              facility, our drawings eliminate guesswork and give your project the
              technical clarity it needs to move forward without delays.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERTISE ═══════════ */}
      <section className="section section--off-white" id="ourworksection">
        <div className="section__inner">
          <p className="section__label reveal">Our Drawing &amp; Engineering Expertise</p>
          <div className="expertise-grid">
            {/* Card 1: Residential Architectural Drawings */}
            <div className="expertise-card reveal reveal-delay-1">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('/images/services/about-our-pre-construction-services.webp')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  1. Residential Architectural Drawings
                </h3>
                <p className="expertise-card__desc">
                  Permit-ready plans for new homes, additions, and renovation projects.
                </p>
                <ul className="expertise-card__list">
                  <li>Floor plans, elevations, and section drawings</li>
                  <li>Site plans with property boundaries and setbacks</li>
                  <li>Foundation, framing, and roof structure plans</li>
                  <li>Window and door schedules</li>
                  <li>Florida Building Code and energy compliance documentation</li>
                </ul>
              </div>
            </div>
            {/* Card 2: Commercial Architectural Drawings */}
            <div className="expertise-card reveal reveal-delay-2">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://production-next-images-cdn.thumbtack.com/i/302056992991584350/width/640.jpeg')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  2. Commercial Architectural Drawings
                </h3>
                <p className="expertise-card__desc">
                  Full drawing sets for office, retail, restaurant, and mixed-use
                  commercial projects.
                </p>
                <ul className="expertise-card__list">
                  <li>Architectural floor plans and reflected ceiling plans</li>
                  <li>Storefront, facade, and exterior elevation drawings</li>
                  <li>ADA compliance and egress planning documentation</li>
                  <li>Interior finish schedules and material specifications</li>
                  <li>Permit-ready sets coordinated with engineering disciplines</li>
                </ul>
              </div>
            </div>
            {/* Card 3: Structural Engineering Drawings */}
            <div className="expertise-card reveal reveal-delay-3">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://innodez.com/wp-content/uploads/2025/01/Structural_Drawing.jpg')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  3. Structural Engineering Drawings
                </h3>
                <p className="expertise-card__desc">
                  Licensed structural documentation for residential, commercial, and
                  industrial builds.
                </p>
                <ul className="expertise-card__list">
                  <li>Foundation design and soil bearing capacity plans</li>
                  <li>Structural framing plans — wood, steel, and concrete</li>
                  <li>Beam, column, and connection detail drawings</li>
                  <li>Load calculations and structural analysis reports</li>
                  <li>Hurricane and wind load compliance for Florida projects</li>
                </ul>
              </div>
            </div>
            {/* Card 4: Industrial & MEP Drawings */}
            <div className="expertise-card reveal reveal-delay-4">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://www.monarch-innovation.com/wp-content/uploads/2021/10/MEP-Drawing-Engineering.jpg')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  4. Industrial &amp; MEP Drawings
                </h3>
                <p className="expertise-card__desc">
                  Mechanical, electrical, and plumbing coordination drawings for
                  industrial and large commercial projects.
                </p>
                <ul className="expertise-card__list">
                  <li>Mechanical HVAC layout and equipment schedules</li>
                  <li>Electrical single-line diagrams and panel schedules</li>
                  <li>Plumbing riser diagrams and fixture plans</li>
                  <li>Industrial process and equipment layout drawings</li>
                  <li>Multi-discipline coordination and clash detection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="why-choose">
        <div className="why-choose__wrapper">
          <div
            className="why-choose__image-side reveal"
            style={{
              backgroundImage:
                "url('/images/services/about-our-pre-construction-services.webp')",
            }}
          ></div>
          <div className="why-choose__content-side">
            <p className="why-choose__label reveal">Why Clients Trust Our Drawing Team</p>
            <h2 className="why-choose__heading reveal reveal-delay-1">
              Technical precision. Permit-ready delivery.
            </h2>
            <ul className="why-choose__list">
              <li className="reveal reveal-delay-1">
                <span className="why-choose__icon">
                  <i className="fas fa-user-graduate"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Licensed In-House Team</strong>
                  <span>
                    Our architectural and engineering drawings are produced by our
                    licensed in-house professionals — not outsourced drafters.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-2">
                <span className="why-choose__icon">
                  <i className="fas fa-check-double"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Permit-Ready Every Time</strong>
                  <span>
                    Every drawing set we deliver is reviewed against current Florida
                    Building Code before submission. Fewer revisions. Faster approvals.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-3">
                <span className="why-choose__icon">
                  <i className="fas fa-layer-group"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Full Discipline Coordination</strong>
                  <span>
                    Architectural, structural, mechanical, electrical, and plumbing
                    disciplines are coordinated in-house — no conflicts between drawing
                    sets.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-4">
                <span className="why-choose__icon">
                  <i className="fas fa-laptop"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Technology-Driven Production</strong>
                  <span>
                    We produce drawings using current CAD and BIM tools, with digital
                    file delivery in all required formats including PDF, DWG, and DXF.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-5">
                <span className="why-choose__icon">
                  <i className="fas fa-arrow-right"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Seamless Transition to Build</strong>
                  <span>
                    As a licensed design-build contractor, your approved drawing set
                    moves directly to our construction team — no rebidding, no new
                    contractors.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="process">
        <div className="section__inner">
          <p className="section__label reveal">How We Produce Every Drawing Set</p>
          <div className="process__steps">
            <div className="process__step reveal reveal-delay-1">
              <div className="process__step-number">1</div>
              <p className="process__step-title">Project Brief</p>
              <p className="process__step-desc">
                Scope, site conditions, and code requirements confirmed
              </p>
            </div>
            <div className="process__step reveal reveal-delay-2">
              <div className="process__step-number">2</div>
              <p className="process__step-title">Schematic Design</p>
              <p className="process__step-desc">
                Initial layouts and concept drawings for client review
              </p>
            </div>
            <div className="process__step reveal reveal-delay-3">
              <div className="process__step-number">3</div>
              <p className="process__step-title">Construction Documents</p>
              <p className="process__step-desc">
                Full drawing set with all discipline coordination
              </p>
            </div>
            <div className="process__step reveal reveal-delay-4">
              <div className="process__step-number">4</div>
              <p className="process__step-title">Permit Submission</p>
              <p className="process__step-desc">
                We submit and manage the permit process on your behalf
              </p>
            </div>
            <div className="process__step reveal reveal-delay-5">
              <div className="process__step-number">5</div>
              <p className="process__step-title">Build Transition</p>
              <p className="process__step-desc">
                Approved drawings handed to our construction team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="why-choose-us">
        <div className="section__inner">
          <p className="section__label reveal">Why Choose Us</p>
          <h2 className="section__title reveal">
            Why Choose Keentel for Architectural &amp; Engineering Drawings?
          </h2>
          <p
            className="section__text reveal reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in producing architectural and
            engineering drawings that give your project a solid technical foundation.
            Some of the attributes that set our drawing team apart:
          </p>
          <div className="why-choose-us__grid">
            <div className="why-choose-us__card reveal reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We develop a complete understanding of your project scope, site
                constraints, and regulatory requirements before production begins. Your
                drawings reflect your project — not a standard template.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have produced architectural and engineering drawing sets for
                residential, commercial, and industrial projects across all 67 Florida
                counties — with a strong record of first-submission permit approvals.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We apply current BIM and CAD technology to every drawing set, producing
                coordinated, conflict-free documents that reduce costly field changes
                during construction.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every drawing set undergoes an internal quality review before submission.
                Code compliance, dimensional accuracy, and inter-discipline coordination
                are verified before the client sees a single sheet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="faq-section">
        <div className="section__inner">
          <p className="section__label reveal">Frequently Asked Questions</p>
          <h2 className="section__title reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Drawings &amp; Engineering
          </h2>
          <div className="faq-section__list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="faq-item reveal"
                  style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
                >
                  <button
                    className="faq-item__question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    <span className="icon"></span>
                  </button>
                  <div className="faq-item__answer-wrapper">
                    <div
                      className="faq-item__answer"
                      ref={(el) => {
                        contentRefs.current[index] = el;
                      }}
                    >
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="cta-section">
        <div className="section__inner">
          <h2 className="cta-section__title reveal">
            Ready to get your drawings started?
          </h2>
          <p className="cta-section__text reveal reveal-delay-1">
            Contact Keentel General Contractors today for a free consultation on your
            architectural and engineering drawing requirements anywhere in Florida.
          </p>
          <a href="/contact#contactformsection" className="cta-section__btn reveal reveal-delay-2">
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
            Schedule Free Consultation
          </a>
          <div className="cta-section__contact reveal reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="sep">|</span>
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