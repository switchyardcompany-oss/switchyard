"use client";

import "./permit-compliance.css";
import { useEffect, useRef, useState } from "react";

export default function PermitSupportPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
      q: "Do you manage permits for all project types in Florida?",
      a: "Yes. We manage permit applications, inspections, and code compliance for residential, commercial, and industrial projects across all 67 Florida counties — including new construction, renovations, additions, and change-of-use projects.",
    },
    {
      q: "How long does the permit process take in Florida?",
      a: "Permit timelines vary by county and project type. Residential permits in most Florida counties process within 2 to 4 weeks. Commercial permits typically take 4 to 8 weeks. We provide a realistic timeline estimate at the start of every project based on the specific jurisdiction.",
    },
    {
      q: "What happens if the permit is rejected or requires corrections?",
      a: "We manage all reviewer comments and correction requests in-house. Our team addresses every item raised by the county reviewer and resubmits promptly — at no additional charge for standard correction cycles.",
    },
    {
      q: "Do you attend inspections on the client's behalf?",
      a: "Yes. Our team schedules and manages all required county inspections. We provide on-site representation during inspections and handle any correction items raised before the re-inspection.",
    },
    {
      q: "What areas of Florida do you serve for permit support?",
      a: "We are headquartered in Tampa Bay and manage permit submissions and code compliance for projects across all 67 Florida counties.",
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
      <section className="hero">
        <div className="hero__slides">
          <div
            className="hero__slide active"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=800&fit=crop')",
            }}
          ></div>
          <div
            className="hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop')",
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
                Permit &amp; Code Compliance Support
              </span>
            </div>

            <h1 className="hero__title reveal reveal-delay-1">
              Permit &amp; Code Compliance Support
            </h1>

            <p className="hero__subtitle reveal reveal-delay-2">
              <strong>Residential, Commercial &amp; Industrial Projects</strong>
              <br />
              We handle the full permit and code compliance process on your behalf — from
              application to final inspection — so your project stays on schedule and on
              the right side of Florida law.
            </p>

            <div className="hero__actions reveal reveal-delay-3">
              <a href="/contact#contactformsection" className="hero__btn hero__btn--primary">
                {envelopeSvg}
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 300+ Florida clients for permit &amp;
                compliance support
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
                "url('https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="intro__text reveal reveal-delay-1">
            <h2>Permits Done Right. No Delays. No Rejections.</h2>
            <p>
              At Keentel General Contractors, we manage the entire permit and code
              compliance process in-house — across all 67 Florida counties. Permit
              rejections, inspection failures, and code violations are among the most
              common causes of construction delays and budget overruns. Our team
              eliminates those risks by preparing documentation that meets local
              requirements from the first submission, coordinating directly with county
              building departments, and managing all inspection scheduling throughout
              the life of your project. You stay focused on your outcome. We handle the
              regulatory process.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERTISE ═══════════ */}
      <section className="section section--off-white" id="ourworksection">
        <div className="section__inner">
          <p className="section__label reveal">Our Permit &amp; Compliance Expertise</p>
          <div className="expertise-grid">
            {/* Card 1: Permit Application & Submission */}
            <div className="expertise-card reveal reveal-delay-1">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  1. Permit Application &amp; Submission
                </h3>
                <p className="expertise-card__desc">
                  Full permit package preparation and county submission across Florida.
                </p>
                <ul className="expertise-card__list">
                  <li>Residential building permit applications for new builds and renovations</li>
                  <li>Commercial permit packages including fire, zoning, and MEP permits</li>
                  <li>Industrial facility permits including environmental and operational approvals</li>
                  <li>Expedited permit submission for time-sensitive projects</li>
                  <li>Owner-builder permit support and documentation assistance</li>
                </ul>
              </div>
            </div>
            {/* Card 2: Florida Building Code Compliance */}
            <div className="expertise-card reveal reveal-delay-2">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  2. Florida Building Code Compliance
                </h3>
                <p className="expertise-card__desc">
                  Code review and compliance documentation built into every project from
                  day one.
                </p>
                <ul className="expertise-card__list">
                  <li>Florida Building Code 8th Edition compliance review</li>
                  <li>Energy code compliance — IECC and Florida-specific requirements</li>
                  <li>Accessibility and ADA compliance documentation</li>
                  <li>Hurricane and wind load compliance for all coastal and inland counties</li>
                  <li>Fire and life safety code coordination with local fire marshals</li>
                </ul>
              </div>
            </div>
            {/* Card 3: Inspection Coordination & Management */}
            <div className="expertise-card reveal reveal-delay-3">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  3. Inspection Coordination &amp; Management
                </h3>
                <p className="expertise-card__desc">
                  We schedule, manage, and support all required construction inspections.
                </p>
                <ul className="expertise-card__list">
                  <li>Foundation, framing, rough-in, and final inspection scheduling</li>
                  <li>On-site representation during county inspections</li>
                  <li>Inspection correction and re-inspection management</li>
                  <li>Certificate of Occupancy coordination and final sign-off</li>
                  <li>Inspection records maintained and delivered to the client</li>
                </ul>
              </div>
            </div>
            {/* Card 4: Zoning & Land Use Compliance */}
            <div className="expertise-card reveal reveal-delay-4">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  4. Zoning &amp; Land Use Compliance
                </h3>
                <p className="expertise-card__desc">
                  Navigating local zoning, setbacks, and land use requirements across
                  Florida counties.
                </p>
                <ul className="expertise-card__list">
                  <li>Zoning verification and land use compatibility review</li>
                  <li>Setback, height, and lot coverage compliance documentation</li>
                  <li>Variance and special exception application support</li>
                  <li>HOA and deed restriction review coordination</li>
                  <li>County-specific land use and development regulation navigation</li>
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
                "url('https://static.wixstatic.com/media/b4d914_50f56a63970247af9d242ba144a6a24b~mv2.jpeg/v1/fill/w_280,h_187,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b4d914_50f56a63970247af9d242ba144a6a24b~mv2.jpeg')",
            }}
          ></div>
          <div className="why-choose__content-side">
            <p className="why-choose__label reveal">Why Clients Trust Us with Their Permits</p>
            <h2 className="why-choose__heading reveal reveal-delay-1">
              Permit-ready. Inspection-ready. Build-ready.
            </h2>
            <ul className="why-choose__list">
              <li className="reveal reveal-delay-1">
                <span className="why-choose__icon">
                  <i className="fas fa-check-circle"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>First-Submission Accuracy</strong>
                  <span>
                    Our permit packages are reviewed internally before submission. We
                    consistently achieve high first-submission approval rates across
                    Florida counties.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-2">
                <span className="why-choose__icon">
                  <i className="fas fa-map-marked-alt"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Statewide County Knowledge</strong>
                  <span>
                    We have submitted permits across all 67 Florida counties. We
                    understand the specific requirements, timelines, and reviewer
                    expectations of each local jurisdiction.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-3">
                <span className="why-choose__icon">
                  <i className="fas fa-people-arrows"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>In-House Design-Build Advantage</strong>
                  <span>
                    Because our design and construction teams work together, our permit
                    documents are always aligned with actual construction scope — no
                    discrepancies between drawings and plans.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-4">
                <span className="why-choose__icon">
                  <i className="fas fa-bell"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Proactive Communication</strong>
                  <span>
                    We keep you informed at every step — submission confirmation,
                    review status, inspection scheduling, and approval notice. You never
                    have to chase an update.
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
                    Permit approval moves your project directly into construction with
                    our licensed team. No rebidding. No new contractors. No delays
                    between approval and groundbreaking.
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
          <p className="section__label reveal">How We Manage Every Permit</p>
          <div className="process__steps">
            <div className="process__step reveal reveal-delay-1">
              <div className="process__step-number">1</div>
              <p className="process__step-title">Scope &amp; Jurisdiction Review</p>
              <p className="process__step-desc">
                Confirming county requirements and project scope
              </p>
            </div>
            <div className="process__step reveal reveal-delay-2">
              <div className="process__step-number">2</div>
              <p className="process__step-title">Document Preparation</p>
              <p className="process__step-desc">
                Full permit package compiled and internally reviewed
              </p>
            </div>
            <div className="process__step reveal reveal-delay-3">
              <div className="process__step-number">3</div>
              <p className="process__step-title">Submission</p>
              <p className="process__step-desc">
                Permit submitted to the relevant county building department
              </p>
            </div>
            <div className="process__step reveal reveal-delay-4">
              <div className="process__step-number">4</div>
              <p className="process__step-title">Review &amp; Corrections</p>
              <p className="process__step-desc">
                We manage all reviewer comments and resubmissions
              </p>
            </div>
            <div className="process__step reveal reveal-delay-5">
              <div className="process__step-number">5</div>
              <p className="process__step-title">Approval &amp; Build</p>
              <p className="process__step-desc">
                Permit approved — construction begins with our licensed team
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
            Why Choose Keentel for Permit &amp; Code Compliance Support?
          </h2>
          <p
            className="section__text reveal reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in managing the permit and
            compliance process with the same precision we apply to construction. Some of
            the attributes that set our compliance team apart:
          </p>
          <div className="why-choose-us__grid">
            <div className="why-choose-us__card reveal reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We handle the regulatory process so you don't have to. Our team manages
                every submission, review, and inspection while keeping you informed at
                every stage without burdening you with the details.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have managed permit submissions and code compliance for residential,
                commercial, and industrial projects across all 67 Florida counties —
                with a consistent track record of on-time approvals.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use digital permit tracking, electronic submission platforms, and
                coordination tools to keep the permit process moving faster than
                traditional paper-based workflows.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every permit package we submit is checked against current county
                requirements before it leaves our office. Code changes, zoning updates,
                and jurisdiction-specific conditions are verified for every project.
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
            Common Questions About Permit &amp; Code Compliance
          </h2>
          <div className="faq-section__list">
            {faqs.map((faq, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="cta-section">
        <div className="section__inner">
          <h2 className="cta-section__title reveal">
            Need permit support for your project?
          </h2>
          <p className="cta-section__text reveal reveal-delay-1">
            Contact Keentel General Contractors today for a free consultation on permit
            and code compliance support for your project anywhere in Florida.
          </p>
          <a href="/contact#contactformsection" className="cta-section__btn reveal reveal-delay-2">
            {envelopeSvg}
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