"use client";

import "./3d-modeling.css";
import { useEffect, useRef, useState } from "react";

export default function ThreeDModelingPage() {
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
      q: "What is 3D modeling and project visualization?",
      a: "3D modeling and project visualization is the process of creating photorealistic digital representations of your construction project — including exterior renders, interior renders, and interactive walkthroughs — so you can see and approve every design detail before construction begins.",
    },
    {
      q: "Can I request changes after seeing the first render?",
      a: "Yes. Our visualization process includes a client review and revision stage. We present the initial renders, collect your feedback, and update the model accordingly before final delivery.",
    },
    {
      q: "Do you produce 3D visualizations for commercial and industrial projects?",
      a: "Yes. We produce full building information models and photorealistic renders for commercial, industrial, and mixed-use projects of all scales across Florida.",
    },
    {
      q: "In what formats do you deliver visualizations?",
      a: "We deliver still renders in high-resolution JPEG and PNG formats. Interactive walkthroughs are delivered as shareable web links or VR-compatible files. BIM models are delivered in standard formats on request.",
    },
    {
      q: "What areas of Florida do you serve?",
      a: "We are headquartered in Tampa Bay and provide 3D modeling and visualization services for projects across all 67 Florida counties.",
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
                "url('https://archicgi.com/wp-content/uploads/2021/08/3d-rendering-for-real-estate-property-rear-view.jpg')",
            }}
          ></div>
          <div
            className="hero__slide"
            style={{
              backgroundImage:
                "url('https://3d-ace.com/wp-content/uploads/3D-Architectural-Visualization-Affects-Construction.jpg')",
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
                3D Modeling &amp; Project Visualization
              </span>
            </div>

            <h1 className="hero__title reveal reveal-delay-1">
              3D Modeling &amp; Project Visualization
            </h1>

            <p className="hero__subtitle reveal reveal-delay-2">
              <strong>See Your Project Before We Build It</strong>
              <br />
              Photorealistic 3D models, virtual walkthroughs, and detailed
              visualizations that give you complete confidence in your design before a
              single crew member steps on site.
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
                <strong>Trusted</strong> by 200+ Florida clients for 3D visualization
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
                "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="intro__text reveal reveal-delay-1">
            <h2>Approve Every Detail Before Construction Begins.</h2>
            <p>
              At Keentel General Contractors, we believe no client should have to guess
              what their finished project will look like. Our 3D modeling and project
              visualization services transform your design documents into photorealistic
              renders and interactive walkthroughs — giving you the clarity to make
              confident decisions on materials, finishes, layouts, and spatial flow
              before construction begins. Whether you are reviewing a custom home
              design, a commercial fit-out, or an industrial expansion, our
              visualization tools eliminate costly mid-construction changes and keep
              your project on budget.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERTISE ═══════════ */}
      <section className="section section--off-white" id="ourworksection">
        <div className="section__inner">
          <p className="section__label reveal">Our Visualization Expertise</p>
          <div className="expertise-grid">
            {/* Card 1: Photorealistic 3D Rendering */}
            <div className="expertise-card reveal reveal-delay-1">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">1. Photorealistic 3D Rendering</h3>
                <p className="expertise-card__desc">
                  High-quality still renders that show your project exactly as it will
                  look when complete.
                </p>
                <ul className="expertise-card__list">
                  <li>Exterior renders showing materials, colors, and landscaping</li>
                  <li>Interior renders for kitchens, bathrooms, living spaces, and offices</li>
                  <li>Lighting simulation — natural and artificial light scenarios</li>
                  <li>Material and finish alternatives shown side by side</li>
                  <li>Print-ready and web-ready render delivery</li>
                </ul>
              </div>
            </div>
            {/* Card 2: Virtual 3D Walkthrough */}
            <div className="expertise-card reveal reveal-delay-2">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">2. Virtual 3D Walkthrough</h3>
                <p className="expertise-card__desc">
                  An immersive, interactive experience of your project before
                  groundbreaking.
                </p>
                <ul className="expertise-card__list">
                  <li>Room-by-room interactive navigation of the full design</li>
                  <li>First-person perspective walkthroughs for client review</li>
                  <li>Shareable links for remote client and stakeholder review</li>
                  <li>Design change simulation within the walkthrough environment</li>
                  <li>Compatible with VR headsets for full immersive presentation</li>
                </ul>
              </div>
            </div>
            {/* Card 3: Commercial & Industrial 3D Modeling */}
            <div className="expertise-card reveal reveal-delay-3">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  3. Commercial &amp; Industrial 3D Modeling
                </h3>
                <p className="expertise-card__desc">
                  Accurate 3D models for complex commercial and industrial scopes.
                </p>
                <ul className="expertise-card__list">
                  <li>Full building information models (BIM) for commercial projects</li>
                  <li>Multi-floor and multi-building complex modeling</li>
                  <li>Equipment and machinery placement visualization</li>
                  <li>Structural and MEP system coordination models</li>
                  <li>Site context modeling including surrounding environment</li>
                </ul>
              </div>
            </div>
            {/* Card 4: Design Revision & Comparison Visualization */}
            <div className="expertise-card reveal reveal-delay-4">
              <div
                className="expertise-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop')",
                }}
              ></div>
              <div className="expertise-card__body">
                <h3 className="expertise-card__title">
                  4. Design Revision &amp; Comparison Visualization
                </h3>
                <p className="expertise-card__desc">
                  See multiple design options clearly before committing to one.
                </p>
                <ul className="expertise-card__list">
                  <li>Side-by-side visualization of design alternatives</li>
                  <li>Before-and-after renders for renovation and remodeling projects</li>
                  <li>Material, color, and finish swap visualization</li>
                  <li>Layout and furniture arrangement comparison</li>
                  <li>Iterative design review with fast render turnaround</li>
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
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="why-choose__content-side">
            <p className="why-choose__label reveal">
              Why Clients Trust Our Visualization Team
            </p>
            <h2 className="why-choose__heading reveal reveal-delay-1">
              See it before you build it. Approve it before we start.
            </h2>
            <ul className="why-choose__list">
              <li className="reveal reveal-delay-1">
                <span className="why-choose__icon">
                  <i className="fas fa-eye"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Eliminate Guesswork</strong>
                  <span>
                    Our visualizations show you the exact outcome of every design
                    decision — materials, lighting, layouts, and finishes — before
                    construction begins.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-2">
                <span className="why-choose__icon">
                  <i className="fas fa-wallet"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Reduce Costly Change Orders</strong>
                  <span>
                    Design changes identified during the visualization phase cost a
                    fraction of what they cost once construction is underway. Our
                    clients save time and budget.
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
                    Our visualization team works directly alongside our architects and
                    engineers — every model reflects the actual construction documents,
                    not an approximation.
                  </span>
                </div>
              </li>
              <li className="reveal reveal-delay-4">
                <span className="why-choose__icon">
                  <i className="fas fa-clock"></i>
                </span>
                <div className="why-choose__item-text">
                  <strong>Fast Turnaround</strong>
                  <span>
                    We deliver initial renders within agreed timelines and revisions
                    quickly — keeping your project schedule on track from design
                    through to permit submission.
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
                    The same team that visualizes your project builds it. No
                    translation loss between design intent and construction execution.
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
          <p className="section__label reveal">How We Deliver Every Visualization</p>
          <div className="process__steps">
            <div className="process__step reveal reveal-delay-1">
              <div className="process__step-number">1</div>
              <p className="process__step-title">Design Brief</p>
              <p className="process__step-desc">
                Scope, style preferences, and reference materials confirmed
              </p>
            </div>
            <div className="process__step reveal reveal-delay-2">
              <div className="process__step-number">2</div>
              <p className="process__step-title">Base Model Build</p>
              <p className="process__step-desc">
                3D model constructed from approved design documents
              </p>
            </div>
            <div className="process__step reveal reveal-delay-3">
              <div className="process__step-number">3</div>
              <p className="process__step-title">Lighting &amp; Materials</p>
              <p className="process__step-desc">
                Finishes, fixtures, and lighting scenarios applied
              </p>
            </div>
            <div className="process__step reveal reveal-delay-4">
              <div className="process__step-number">4</div>
              <p className="process__step-title">Client Review</p>
              <p className="process__step-desc">
                Renders and walkthrough shared for approval and feedback
              </p>
            </div>
            <div className="process__step reveal reveal-delay-5">
              <div className="process__step-number">5</div>
              <p className="process__step-title">Final Delivery</p>
              <p className="process__step-desc">
                Approved visualization files delivered and build begins
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
            Why Choose Keentel for 3D Modeling &amp; Visualization?
          </h2>
          <p
            className="section__text reveal reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering visualization
            services that give our clients full confidence before construction begins.
            Some of the attributes that set our visualization team apart:
          </p>
          <div className="why-choose-us__grid">
            <div className="why-choose-us__card reveal reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We develop a thorough understanding of your design goals, material
                preferences, and decision timeline before modeling begins. Every
                visualization is built to answer your specific questions.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have produced 3D models and visualizations for residential,
                commercial, and industrial projects across Florida — from single-room
                renders to full multi-building campus models.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use current rendering and BIM software to produce photorealistic
                visualizations that accurately represent how your finished project will
                look and function.
              </p>
            </div>
            <div className="why-choose-us__card reveal reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every render and model is checked against the approved design documents
                before delivery. Material specifications, dimensions, and spatial
                relationships are verified at every stage.
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
            Common Questions About 3D Modeling &amp; Visualization
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
            Want to see your project before we build it?
          </h2>
          <p className="cta-section__text reveal reveal-delay-1">
            Contact Keentel General Contractors today to discuss 3D modeling and
            visualization for your project anywhere in Florida.
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