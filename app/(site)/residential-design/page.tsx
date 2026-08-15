"use client";

import "./residential-design.css";
import { useEffect, useRef, useState } from "react";

export default function ResidentialDesignPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Store refs to the content div INSIDE the wrapper (not the wrapper itself)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    // Get all wrapper elements
    const wrappers = document.querySelectorAll(".faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        // Open: set max-height to the content's scrollHeight
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".faq-item");
        if (item) item.classList.add("active");
      } else {
        // Close
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
    const intervalTime = 3500;

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
      q: "What does residential design services include?",
      a: "Our residential design services cover custom home design, renovation planning, interior space planning, and landscaping coordination — all delivered as permit-ready documentation by our in-house Florida-licensed team.",
    },
    {
      q: "Do you handle permits and approvals?",
      a: "Yes. We manage full permit submission and county approval processes across Florida, coordinating directly with local municipalities and inspectors on your behalf.",
    },
    {
      q: "Can I see the design before construction starts?",
      a: "Every project includes 3D renderings and digital walkthroughs so you can visualize and approve the full design before construction begins.",
    },
    {
      q: "Do you design and build, or design only?",
      a: "We are a full design-build contractor. Design and construction are handled under one contract — one team, one point of contact, from first sketch to final inspection.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and serve all 67 Florida counties for residential design and construction services.",
    },
  ];

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero">
        <div className="hero__slides">
          <div
            className="hero__slide active"
            style={{ backgroundImage: "url('https://highlandarchstudio.com/wp-content/uploads/2025/12/Expert-and-Best-Residential-Design-Firm-in-Pakistan.jpeg')" }}
          ></div>
          <div
            className="hero__slide"
            style={{ backgroundImage: "url('/images/services/construction-workers-building-site.webp')" }}
          ></div>
        </div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__breadcrumb">
              <span className="breadcrumb__light">Design Services</span>
              <span className="breadcrumb__slash">/</span>
              <span className="breadcrumb__accent">Residential Design</span>
            </div>
            <h1 className="hero__title reveal reveal-delay-1">Residential Design Services</h1>
            <p className="hero__subtitle reveal reveal-delay-2">
              <strong>Custom homes, renovations, interiors &amp; landscaping integration</strong>{" "}
              <br />
              Bringing creativity, functionality, and technical expertise together to create homes
              that perfectly balance style and comfort.
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
                <strong>Trusted</strong> by 500+ Florida homeowners &amp; businesses
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
            style={{ backgroundImage: "url('/images/services/commercial-construction.webp')" }}
          ></div>
          <div className="intro__text reveal reveal-delay-1">
            <h2>Every Home Should Be as Unique as the People Who Live in It.</h2>
            <p>
              At Keentel General Contractors, we believe that every home should be as unique as the
              people who live in it. Our residential design services bring together creativity,
              functionality, and technical expertise to transform your space into a home that
              perfectly balances style and comfort. Whether you're building a new custom home,
              remodeling your existing space, or refreshing your interiors and landscaping, our
              team ensures that every detail is designed with precision and purpose.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERTISE ═══════════ */}
      <section className="section section--off-white" id="ourworksection">
        <div className="section__inner">
          <p className="section__label reveal">Our Residential Design Expertise</p>
          <div className="expertise-grid">
            <div className="expertise-card reveal reveal-delay-1">
              <div
                className="expertise-card__image"
                style={{ backgroundImage: "url('/images/services/interior-renovations.webp')" }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">1. Custom Home Design</h3>
                <p className="expertise-card__desc">Tailored architectural concepts that reflect your lifestyle and vision.</p>
                <ul className="expertise-card__list">
                  <li>Tailored architectural concepts to suit your preferences</li>
                  <li>Integration of modern, traditional, or transitional styles</li>
                  <li>Functional layouts that maximize space and natural light</li>
                  <li>Energy-efficient and sustainable design solutions</li>
                  <li>3D renderings and visualization so you can walk through before construction begins</li>
                </ul>
              </div>
            </div>
            <div className="expertise-card reveal reveal-delay-2">
              <div
                className="expertise-card__image"
                style={{ backgroundImage: "url('/images/services/construction-workers-building-site.webp')" }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">2. Renovation &amp; Remodeling Design</h3>
                <p className="expertise-card__desc">Breathe new life into your home with smart, strategic redesigns.</p>
                <ul className="expertise-card__list">
                  <li>Kitchen and bathroom redesigns for modern living</li>
                  <li>Basement and attic conversions into functional spaces</li>
                  <li>Whole-home renovation plans</li>
                  <li>Open-floor plan transformations</li>
                  <li>Code-compliant designs with permit-ready documentation</li>
                </ul>
              </div>
            </div>
            <div className="expertise-card reveal reveal-delay-3">
              <div
                className="expertise-card__image"
                style={{ backgroundImage: "url('/images/services/office-renovations.webp')" }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">3. Interior Design &amp; Space Planning</h3>
                <p className="expertise-card__desc">We design interiors that go beyond aesthetics — they enhance the way you live.</p>
                <ul className="expertise-card__list">
                  <li>Custom layouts for maximum comfort and efficiency</li>
                  <li>Material, finish, and fixture selections tailored to your taste</li>
                  <li>Lighting, color, and furnishing concepts</li>
                  <li>Smart home and technology integration</li>
                  <li>Design packages for single rooms or entire homes</li>
                </ul>
              </div>
            </div>
            <div className="expertise-card reveal reveal-delay-4">
              <div
                className="expertise-card__image"
                style={{ backgroundImage: "url('/images/services/large-residential-projects.webp')" }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">4. Landscaping &amp; Outdoor Living Integration</h3>
                <p className="expertise-card__desc">Your outdoor space is an extension of your home.</p>
                <ul className="expertise-card__list">
                  <li>Landscape design that blends with architecture</li>
                  <li>Outdoor kitchens, patios, and entertainment areas</li>
                  <li>Sustainable plant selection and water-efficient layouts</li>
                  <li>Poolside and deck design</li>
                  <li>Driveways, walkways, and exterior lighting plans</li>
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
            style={{ backgroundImage: "url('https://philkeandesigns.com/wp-content/uploads/2015/08/modern-florida-homes.png')" }}
          ></div>
          <div className="why-choose__content-side">
            <p className="why-choose__label reveal">Why Clients Choose Our Design Team</p>
            <h2 className="why-choose__heading reveal reveal-delay-1">Designed around your life, built to last</h2>
            <ul className="why-choose__list">
              <li className="reveal reveal-delay-1">
                <span className="why-choose__icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M12 2L2 22h20L12 2z"/><circle cx="12" cy="15" r="3"/></svg>
                </span>
                <div className="why-choose__item-text">
                  <strong>Personalized Approach</strong>
                  <span>We listen, understand, and design based on your lifestyle and goals — not a template or a package.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-2">
                <span className="why-choose__icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="4"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                </span>
                <div className="why-choose__item-text">
                  <strong>Full-Service Expertise</strong>
                  <span>From architectural drawings to final finishes, we cover every design phase in-house across Florida.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-3">
                <span className="why-choose__icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M5 20v-2a7 7 0 0 1 14 0v2"/></svg>
                </span>
                <div className="why-choose__item-text">
                  <strong>Experienced Team</strong>
                  <span>Decades of residential design and construction experience — delivered by the same licensed team that builds it.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-4">
                <span className="why-choose__icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/></svg>
                </span>
                <div className="why-choose__item-text">
                  <strong>Technology-Driven</strong>
                  <span>3D modeling, digital visualization, and Florida Building Code compliance built into every deliverable.</span>
                </div>
              </li>
              <li className="reveal reveal-delay-5">
                <span className="why-choose__icon">
                  <svg viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                <div className="why-choose__item-text">
                  <strong>Seamless Transition to Build</strong>
                  <span>As a licensed design-build contractor, we take your project from approved concept to completed construction with no handoff gaps.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="process">
        <div className="section__inner">
          <p className="section__label reveal">How We Work</p>
          <div className="process__steps">
            <div className="process__step reveal reveal-delay-1">
              <div className="process__step-number">1</div>
              <p className="process__step-title">Consultation &amp; Vision Planning</p>
              <p className="process__step-desc">Understanding your goals, style, and budget</p>
            </div>
            <div className="process__step reveal reveal-delay-2">
              <div className="process__step-number">2</div>
              <p className="process__step-title">Concept Design</p>
              <p className="process__step-desc">Drafting layouts, sketches, and preliminary 3D models</p>
            </div>
            <div className="process__step reveal reveal-delay-3">
              <div className="process__step-number">3</div>
              <p className="process__step-title">Detailed Design</p>
              <p className="process__step-desc">Finalizing plans, materials, finishes, and compliance docs</p>
            </div>
            <div className="process__step reveal reveal-delay-4">
              <div className="process__step-number">4</div>
              <p className="process__step-title">Approval &amp; Permits</p>
              <p className="process__step-desc">Handling city approvals and all Florida code requirements</p>
            </div>
            <div className="process__step reveal reveal-delay-5">
              <div className="process__step-number">5</div>
              <p className="process__step-title">Build Transition</p>
              <p className="process__step-desc">Our construction team brings the approved design to life</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="why-choose-us">
        <div className="section__inner">
          <p className="section__label reveal">Why Choose Us</p>
          <h2 className="section__title reveal">Why Choose Keentel for Residential Design?</h2>
          <p className="section__text reveal reveal-delay-1" style={{ maxWidth: "780px", marginBottom: "8px" }}>
            At Keentel General Contractors, we take pride in delivering residential design services
            that go beyond aesthetics. Some of the attributes that set our design team apart:
          </p>
          <div className="why-choose-us__grid">
            <div className="why-choose-us__card reveal reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>Every design decision is made with your vision and outcome in mind. We develop a thorough understanding of your lifestyle, preferences, and budget before a single line is drawn.</p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>We have designed and built residential projects across Florida — from custom new builds in Tampa Bay to full interior renovations statewide — with complete understanding of Florida building requirements.</p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>We apply 3D modeling, sustainable design practices, and smart-home-ready planning to every residential project we deliver.</p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>From ceiling heights to electrical outlet placement, every design detail is reviewed, coordinated with our construction team, and fully documented before permits are submitted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="faq-section">
        <div className="section__inner">
          <p className="section__label reveal">Frequently Asked Questions</p>
          <h2 className="section__title reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Residential Design
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
                    {/* This is the content div we measure */}
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
          <h2 className="cta-section__title reveal">Ready to design your dream home?</h2>
          <p className="cta-section__text reveal reveal-delay-1">
            Contact Keentel General Contractors today to schedule your free design consultation and
            let's bring your vision to reality.
          </p>
          <a href="/contact#contactformsection" className="cta-section__btn reveal reveal-delay-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Schedule Free Consultation
          </a>
          <div className="cta-section__contact reveal reveal-delay-3">
            <a href="tel:+18133950000">📞 813-395-0000</a>
            <span className="sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">📧 contact@keentelgeneralcontractors.com</a>
            <span className="sep">|</span>
            <span>📍 400 North Ashley Drive, Suite 2000, Tampa, FL 33602</span>
          </div>
        </div>
      </section>
    </>
  );
}