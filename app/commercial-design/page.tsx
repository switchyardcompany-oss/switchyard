"use client";

import "./commercial-design.css";
import { useEffect, useRef, useState } from "react";

export default function CommercialDesignPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqWrappers = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    faqWrappers.current.forEach((wrapper, i) => {
      if (!wrapper) return;
      if (i === openIndex) {
        wrapper.style.maxHeight = wrapper.scrollHeight + 4 + "px";
        const item = wrapper.closest(".faq-item");
        if (item) item.classList.add("active");
      } else {
        wrapper.style.maxHeight = "0px";
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
      q: "What commercial spaces do you design?",
      a: "We design offices, retail stores, restaurants, hospitality venues, warehouses, manufacturing facilities, and mixed-use commercial spaces — all delivered as permit-ready documentation by our Florida-licensed team.",
    },
    {
      q: "Do you manage permits for commercial projects?",
      a: "Yes. We manage all commercial permit submissions, inspections, and county approvals across Florida, coordinating directly with local building departments and inspectors on your behalf.",
    },
    {
      q: "Can you design to ADA and Florida Building Code standards?",
      a: "Yes. ADA compliance, Florida Building Code requirements, and local zoning standards are built into every commercial design we produce — from the first concept draft through final permit documentation.",
    },
    {
      q: "Do you handle both design and construction?",
      a: "Yes. We are a full design-build contractor. Commercial design and construction are handled under one contract — one licensed team from first brief to certificate of occupancy.",
    },
    {
      q: "What areas of Florida do you serve for commercial design?",
      a: "We are headquartered in Tampa Bay and serve all 67 Florida counties for commercial design and construction services.",
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
                "url('https://media.licdn.com/dms/image/v2/C4E1BAQHPZh8L9_WMDQ/company-background_10000/company-background_10000/0/1585334069460/commercial_design_services_cover?e=2147483647&v=beta&t=8Oxbmg0xwXN24s814Qoo9dGlS7LE_c3iZpegK4nYJa4')",
            }}
          ></div>
          <div
            className="hero__slide"
            style={{
              backgroundImage:
                "url('https://www.itascatampa.com/wp-content/uploads/2020/06/CDS-5.jpg')",
            }}
          ></div>
        </div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__breadcrumb">
              <span className="breadcrumb__light">Design Services</span>
              <span className="breadcrumb__slash">/</span>
              <span className="breadcrumb__accent">Commercial Design</span>
            </div>
            <h1 className="hero__title reveal reveal-delay-1">Commercial Design Services</h1>
            <p className="hero__subtitle reveal reveal-delay-2">
              <strong>
                Office Layouts, Retail Spaces, Restaurant Designs &amp; Industrial Planning
              </strong>
              <br />
              Delivering functional, code-compliant commercial spaces that reflect your brand,
              support your operations, and are built to perform from day one.
            </p>
            <div className="hero__actions reveal reveal-delay-3">
              <a href="/contact#contactformsection" className="hero__btn hero__btn--primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
  <rect x="3" y="6" width="18" height="14" rx="2" />
  <path d="M21 6l-9 7-9-7" />
</svg>
                Schedule Free Consultation
              </a>
              <a href="#ourworksection" className="hero__btn hero__btn--secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <strong>Trusted</strong> by 200+ Florida businesses &amp; commercial property owners
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
                "url('https://images.prismic.io/ie-office-website/dabdb802f51a13dc456693855bbe41139e053fee_allsteel_1.jpg?auto=compress,format')",
            }}
          ></div>
          <div className="intro__text reveal reveal-delay-1">
            <h2>Commercial Spaces Built Around How Your Business Works.</h2>
            <p>
              At Keentel General Contractors, we understand that a well-designed commercial space
              is more than aesthetics — it is a direct driver of your business performance. Our
              commercial design services bring together architectural expertise, operational
              planning, and technical precision to create spaces that work as hard as your team.
              Whether you are fitting out a new office, designing a retail storefront, planning a
              restaurant layout, or developing an industrial facility, we design with your business
              goals at the center of every decision.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERTISE ═══════════ */}
      <section className="section section--off-white" id="ourworksection">
        <div className="section__inner">
          <p className="section__label reveal">Our Commercial Design Expertise</p>
          <div className="expertise-grid">
            <div className="expertise-card reveal reveal-delay-1">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://d2t9fahskrqkcw.cloudfront.net/wp-content/uploads/2025/09/09213004/thousandandone-lobbylifestyle.jpeg')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">1. Office Layout &amp; Design</h3>
                <p className="expertise-card__desc">Workspaces designed to maximize productivity, collaboration, and employee wellbeing.</p>
                <ul className="expertise-card__list">
                  <li>Open-plan and private office configurations</li>
                  <li>Ergonomic space planning and circulation design</li>
                  <li>Meeting room, lounge, and breakout area layouts</li>
                  <li>Branding integration into interior design</li>
                  <li>Smart building and technology infrastructure planning</li>
                </ul>
              </div>
            </div>
            <div className="expertise-card reveal reveal-delay-2">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://static1.gensler.com/uploads/hero_element/12855/thumb_desktop/thumbs/VisitTampaBay_4%20(with%20people)_1542058732_1024x576.jpg')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">2. Retail Space Design</h3>
                <p className="expertise-card__desc">Retail environments that drive foot traffic, guide the customer journey, and convert browsers into buyers.</p>
                <ul className="expertise-card__list">
                  <li>Customer flow and merchandising layout planning</li>
                  <li>Storefront and signage design coordination</li>
                  <li>Fitting room, checkout, and back-of-house planning</li>
                  <li>Lighting design for product and brand presentation</li>
                  <li>Code-compliant designs with permit-ready documentation</li>
                </ul>
              </div>
            </div>
            <div className="expertise-card reveal reveal-delay-3">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://www.southernliving.com/thmb/Uo6RfFH1Wx0qTvLl2LPaVmBtkO8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ash-Hero-0ecba78abab148f7a24c3c9e92eecd37.jpg')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">3. Restaurant &amp; Hospitality Design</h3>
                <p className="expertise-card__desc">Dining environments designed for guest experience, kitchen efficiency, and health code compliance.</p>
                <ul className="expertise-card__list">
                  <li>Front-of-house seating layouts and flow planning</li>
                  <li>Commercial kitchen design and equipment coordination</li>
                  <li>Bar, service station, and POS placement</li>
                  <li>Acoustic planning for ambient noise management</li>
                  <li>Health department and fire code compliant documentation</li>
                </ul>
              </div>
            </div>
            <div className="expertise-card reveal reveal-delay-4">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://carvermostardi.com/wp-content/uploads/2019/02/tampa_florida_industrial_photography_016.jpg')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">4. Industrial Facility Planning</h3>
                <p className="expertise-card__desc">Industrial spaces designed for operational efficiency, safety compliance, and long-term scalability.</p>
                <ul className="expertise-card__list">
                  <li>Floor plan optimization for workflow and logistics</li>
                  <li>Loading dock, racking, and equipment layout planning</li>
                  <li>OSHA and Florida safety code compliance integration</li>
                  <li>Electrical and mechanical coordination for heavy equipment</li>
                  <li>Expansion-ready designs built to accommodate future growth</li>
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
                "url('https://media.licdn.com/dms/image/v2/D4E22AQFWn5dADvilBg/feedshare-shrink_800/B4EZ0LzsMGHgAc-/0/1774019593766?e=2147483647&v=beta&t=kcfWTTBnGvjhKjKVpLJxIWRaB49vG4BToSYDBsZyk4U')",
            }}
          ></div>
          <div className="why-choose__content-side">
            <p className="why-choose__label reveal">Why Clients Trust Our Commercial Design Team</p>
            <h2 className="why-choose__heading reveal reveal-delay-1">Designed around your business, built to perform</h2>
            <ul className="why-choose__list">
              <li className="reveal reveal-delay-1">
                <span className="why-choose__icon"><i className="fas fa-building"></i></span>
                <div className="why-choose__item-text">
                  <strong>Business-First Approach</strong>
                  <span>We design around your operations, your workflow, and your brand — not a generic commercial template.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-2">
                <span className="why-choose__icon"><i className="fas fa-file-contract"></i></span>
                <div className="why-choose__item-text">
                  <strong>Full-Service Expertise</strong>
                  <span>From permit drawings to construction, we manage every phase in-house. One team, one contract, zero gaps.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-3">
                <span className="why-choose__icon"><i className="fas fa-clipboard-check"></i></span>
                <div className="why-choose__item-text">
                  <strong>Code &amp; Compliance Built In</strong>
                  <span>Every commercial design we deliver is built to Florida Building Code, ADA requirements, and local zoning standards from the first draft.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-4">
                <span className="why-choose__icon"><i className="fas fa-cube"></i></span>
                <div className="why-choose__item-text">
                  <strong>Technology-Driven</strong>
                  <span>3D commercial modeling, digital walkthroughs, and BIM-ready documentation for complex multi-trade coordination.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-5">
                <span className="why-choose__icon"><i className="fas fa-arrow-right"></i></span>
                <div className="why-choose__item-text">
                  <strong>Seamless Transition to Build</strong>
                  <span>As a licensed design-build contractor, your approved commercial design moves directly into construction — no rebidding, no new contractors.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="process">
        <div className="section__inner">
          <p className="section__label reveal">How We Deliver Every Commercial Design</p>
          <div className="process__steps">
            <div className="process__step reveal reveal-delay-1">
              <div className="process__step-number">1</div>
              <p className="process__step-title">Consultation &amp; Brief</p>
              <p className="process__step-desc">Understanding your business needs, brand, and budget</p>
            </div>
            <div className="process__step reveal reveal-delay-2">
              <div className="process__step-number">2</div>
              <p className="process__step-title">Concept Design</p>
              <p className="process__step-desc">Layouts, sketches, and preliminary 3D models</p>
            </div>
            <div className="process__step reveal reveal-delay-3">
              <div className="process__step-number">3</div>
              <p className="process__step-title">Detailed Design</p>
              <p className="process__step-desc">Finalizing plans, specifications, and compliance docs</p>
            </div>
            <div className="process__step reveal reveal-delay-4">
              <div className="process__step-number">4</div>
              <p className="process__step-title">Approval &amp; Permits</p>
              <p className="process__step-desc">Coordinating all Florida commercial permits and approvals</p>
            </div>
            <div className="process__step reveal reveal-delay-5">
              <div className="process__step-number">5</div>
              <p className="process__step-title">Build Transition</p>
              <p className="process__step-desc">Our licensed construction team delivers the approved design</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="why-choose-us">
        <div className="section__inner">
          <p className="section__label reveal">Why Choose Us</p>
          <h2 className="section__title reveal">Why Choose Keentel for Commercial Design?</h2>
          <p className="section__text reveal reveal-delay-1" style={{ maxWidth: "780px", marginBottom: "8px" }}>
            At Keentel General Contractors, we take pride in delivering commercial design services
            that go beyond floor plans. Some of the attributes that set our commercial design team apart:
          </p>
          <div className="why-choose-us__grid">
            <div className="why-choose-us__card reveal reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>We develop a thorough understanding of your business model, operational requirements, and brand identity before a single design decision is made.</p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>We have designed and built commercial spaces across Florida — offices, retail, restaurants, and industrial facilities — with complete understanding of Florida's commercial building requirements.</p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>We integrate smart building systems, energy-efficient design, and future-ready infrastructure into every commercial project we deliver.</p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>From ADA compliance to fire egress planning, every regulatory and functional detail is reviewed, coordinated, and documented before permits are submitted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — CORRECTED ═══════════ */}
      <section className="faq-section">
        <div className="section__inner">
          <p className="section__label reveal">Frequently Asked Questions</p>
          <h2 className="section__title reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Commercial Design
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
                  <div
                    className="faq-item__answer-wrapper"
                    ref={(el) => {
                      faqWrappers.current[index] = el;
                    }}
                  >
                    <div className="faq-item__answer">{faq.a}</div>
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
          <h2 className="cta-section__title reveal">Ready to design your commercial space?</h2>
          <p className="cta-section__text reveal reveal-delay-1">
            Contact Keentel General Contractors today to schedule your free commercial design
            consultation anywhere in Florida.
          </p>
          <a href="/contact#contactformsection" className="cta-section__btn reveal reveal-delay-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Schedule Free Consultation
          </a>
          <div className="cta-section__contact reveal reveal-delay-3">
            <a href="tel:+18133950000"><i className="fas fa-phone"></i> 813-395-0000</a>
            <span className="sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com"><i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com</a>
            <span className="sep">|</span>
            <span><i className="fas fa-map-marker-alt"></i> 400 North Ashley Drive, Suite 2000, Tampa, FL 33602</span>
          </div>
        </div>
      </section>
    </>
  );
}