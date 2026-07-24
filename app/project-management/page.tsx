"use client";

import "./project-management.css";
import { useEffect, useRef, useState } from "react";

export default function ProjectManagementPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".pmgc-faq-item__answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".pmgc-faq-item");
        if (item) item.classList.add("pmgc-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".pmgc-faq-item");
        if (item) item.classList.remove("pmgc-active");
      }
    });
  }, [openIndex]);

  // ─── Hero Carousel & Scroll Reveal ───
  useEffect(() => {
    const slides = document.querySelectorAll(".pmgc-hero__slide");
    const dots = document.querySelectorAll(".pmgc-hero__dot");
    let current = 0;
    const totalSlides = slides.length;
    const intervalTime = 5500;

    function goToSlide(index: number) {
      slides.forEach((s) => s.classList.remove("pmgc-active"));
      dots.forEach((d) => d.classList.remove("pmgc-active"));
      slides[index].classList.add("pmgc-active");
      dots[index].classList.add("pmgc-active");
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

    const revealElements = document.querySelectorAll(".pmgc-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pmgc-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    document.querySelectorAll(".pmgc-hero .pmgc-reveal").forEach((el) =>
      el.classList.add("pmgc-visible")
    );

    return () => {
      clearInterval(autoPlay);
      observer.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "What does a general contractor project manager do on a construction project?",
      a: "Our project managers own the full construction process — schedule development, trade coordination, budget tracking, permit management, quality control, county inspection management, and final project closeout. They are your single point of contact from contract signing to certificate of occupancy.",
    },
    {
      q: "Do I need a general contractor or can I manage trades myself?",
      a: "Owner-managed construction can work for very small scopes. For any project involving multiple trades, permits, and a defined completion deadline, a licensed general contractor adds significant value through trade coordination, code compliance, accountability, and warranty protection that owner-managed projects cannot replicate.",
    },
    {
      q: "How do you handle changes to the project scope during construction?",
      a: "No scope change proceeds without a written change order signed by the client. We document the scope addition, price impact, and schedule impact before any additional work begins. Your contract value only changes with your written approval.",
    },
    {
      q: "How often will I receive project updates?",
      a: "Every client receives weekly schedule updates, milestone photo reports, and real-time budget tracking. Your project manager is reachable directly by phone and email throughout the project — not just at scheduled meetings.",
    },
    {
      q: "What areas of Florida do you serve for project management and general contracting?",
      a: "We are headquartered in Tampa Bay and manage residential, commercial, and industrial construction projects across all 67 Florida counties.",
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
      <section className="pmgc-hero">
        <div className="pmgc-hero__slides">
          <div
            className="pmgc-hero__slide pmgc-active"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIZ1KzldkvX7TeL-n966gEVnHmtP6mIpjjLxC2DjvATH_RvRbQ1wWNole&s=10')",
            }}
          ></div>
          <div
            className="pmgc-hero__slide"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop')",
            }}
          ></div>
        </div>

        <div className="pmgc-hero__overlay"></div>

        <div className="pmgc-hero__content">
          <div className="pmgc-hero__text">
            <div className="pmgc-hero__breadcrumb">
              <span className="pmgc-breadcrumb__light">Build Services</span>
              <span className="pmgc-breadcrumb__slash">/</span>
              <span className="pmgc-breadcrumb__accent">
                Project Management &amp; General Contracting
              </span>
            </div>

            <h1 className="pmgc-hero__title pmgc-reveal pmgc-reveal-delay-1">
              Project Management &amp; General Contracting
            </h1>

            <p className="pmgc-hero__subtitle pmgc-reveal pmgc-reveal-delay-2">
              <strong>One Team. Full Accountability. Every Project.</strong>
              <br />
              We manage every trade, every schedule, and every budget item under one
              licensed contract — so you always have one point of contact and zero
              gaps in accountability across your entire project.
            </p>

            <div className="pmgc-hero__actions pmgc-reveal pmgc-reveal-delay-3">
              <a href="#" className="pmgc-hero__btn pmgc-hero__btn--primary">
                {envelopeSvg}
                Request Free Estimate
              </a>
              <a href="#" className="pmgc-hero__btn pmgc-hero__btn--secondary">
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

            <div className="pmgc-hero__trust pmgc-reveal pmgc-reveal-delay-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Trusted</strong> by 250+ Florida clients for project
                management
              </span>
            </div>
          </div>
        </div>

        <div className="pmgc-hero__dots">
          <span className="pmgc-hero__dot pmgc-active"></span>
          <span className="pmgc-hero__dot"></span>
        </div>
      </section>

      {/* ═══════════ INTRODUCTION ═══════════ */}
      <section className="pmgc-intro">
        <div className="pmgc-intro__inner">
          <div
            className="pmgc-intro__image pmgc-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="pmgc-intro__text pmgc-reveal pmgc-reveal-delay-1">
            <h2>
              The Difference Between a Managed Project and a Chaotic One Is One
              Person.
            </h2>
            <p>
              At Keentel General Contractors, project management is not a service we
              add onto construction — it is the foundation everything else is built
              on. Every project we take on is assigned a dedicated licensed project
              manager who owns the schedule, the budget, the trade coordination, and
              the client relationship from contract signing through final handover. We
              self-perform across all major trades, which means our project managers
              are coordinating a team that answers directly to them — not a revolving
              door of subcontractors with competing priorities. The result is a
              project that runs on time, stays within budget, and closes without the
              surprises that come from fragmented accountability.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ BUILD SCOPE — 3+2 LAYOUT ═══════════ */}
      <section className="pmgc-scope">
        <div className="pmgc-section__inner">
          <div className="pmgc-scope__header">
            <p className="pmgc-section__label pmgc-reveal">
              How We Manage Every Project — Phase by Phase
            </p>
            <h2 className="pmgc-reveal">
              Our project management system follows a structured sequence of phases —
              each with defined deliverables, internal checkpoints, and client
              communication milestones.
            </h2>
            <p className="pmgc-reveal pmgc-reveal-delay-1">
              Here is what our licensed project management team delivers across every
              phase of your build.
            </p>
          </div>

          {/* Top Row: 3 Cards */}
          <div className="pmgc-scope__grid">
            {/* Card 1: Pre-Construction Planning & Mobilization */}
            <div className="pmgc-scope-card pmgc-reveal pmgc-reveal-delay-1">
              <div
                className="pmgc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507238691740-34c1a851f1d0?w=600&h=400&fit=crop')",
                }}
              >
                <span className="pmgc-scope-card__number">1</span>
              </div>
              <div className="pmgc-scope-card__body">
                <h3 className="pmgc-scope-card__title">
                  Pre-Construction Planning &amp; Mobilization
                </h3>
                <ul className="pmgc-scope-card__list">
                  <li>Scope definition, contract finalization, and fixed-price agreement</li>
                  <li>Permit application submission and county coordination</li>
                  <li>Construction schedule development — phase milestones and trade sequencing</li>
                  <li>Material procurement planning and lead time management</li>
                  <li>Subcontractor and supplier qualification where applicable</li>
                  <li>Site mobilization — temporary power, fencing, signage, and safety setup</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Trade Coordination & Schedule Management */}
            <div className="pmgc-scope-card pmgc-reveal pmgc-reveal-delay-2">
              <div
                className="pmgc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop')",
                }}
              >
                <span className="pmgc-scope-card__number">2</span>
              </div>
              <div className="pmgc-scope-card__body">
                <h3 className="pmgc-scope-card__title">
                  Trade Coordination &amp; Schedule Management
                </h3>
                <ul className="pmgc-scope-card__list">
                  <li>Daily trade coordination — sequencing structural, MEP, and finish trades</li>
                  <li>Two-week lookahead scheduling updated and distributed every week</li>
                  <li>Material delivery coordination to eliminate site delays</li>
                  <li>RFI management — requests for information answered within 24 hours</li>
                  <li>Submittal review and material approval tracking</li>
                  <li>Weather and site condition impact management</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Budget Control & Change Management */}
            <div className="pmgc-scope-card pmgc-reveal pmgc-reveal-delay-3">
              <div
                className="pmgc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop')",
                }}
              >
                <span className="pmgc-scope-card__number">3</span>
              </div>
              <div className="pmgc-scope-card__body">
                <h3 className="pmgc-scope-card__title">
                  Budget Control &amp; Change Management
                </h3>
                <ul className="pmgc-scope-card__list">
                  <li>Real-time budget tracking against approved contract value</li>
                  <li>Cost-to-complete reporting issued at each project milestone</li>
                  <li>Change order documentation — no work proceeds without written client approval</li>
                  <li>Value engineering recommendations where scope can be optimized</li>
                  <li>Subcontractor invoice review and payment processing</li>
                  <li>Owner cost reporting in clear, non-technical language</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="pmgc-scope__grid pmgc-scope__grid--bottom">
            {/* Card 4: Quality Control & Inspection Management */}
            <div className="pmgc-scope-card pmgc-reveal pmgc-reveal-delay-4">
              <div
                className="pmgc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop')",
                }}
              >
                <span className="pmgc-scope-card__number">4</span>
              </div>
              <div className="pmgc-scope-card__body">
                <h3 className="pmgc-scope-card__title">
                  Quality Control &amp; Inspection Management
                </h3>
                <ul className="pmgc-scope-card__list">
                  <li>Phase-by-phase internal QC inspections before county inspections</li>
                  <li>Deficiency logging and trade correction management</li>
                  <li>County inspection scheduling and on-site representation</li>
                  <li>Non-conforming work documentation and resolution tracking</li>
                  <li>Photo documentation of all critical construction phases</li>
                  <li>Owner progress reports with photos at each milestone</li>
                </ul>
              </div>
            </div>

            {/* Card 5: Project Closeout & Warranty Handover */}
            <div className="pmgc-scope-card pmgc-reveal pmgc-reveal-delay-5">
              <div
                className="pmgc-scope-card__image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop')",
                }}
              >
                <span className="pmgc-scope-card__number">5</span>
              </div>
              <div className="pmgc-scope-card__body">
                <h3 className="pmgc-scope-card__title">
                  Project Closeout &amp; Warranty Handover
                </h3>
                <ul className="pmgc-scope-card__list">
                  <li>Punch list development and trade completion tracking</li>
                  <li>Certificate of Occupancy coordination and delivery</li>
                  <li>As-built drawing compilation and delivery to client</li>
                  <li>Operations and maintenance manual delivery for installed systems</li>
                  <li>Final client walkthrough and written sign-off</li>
                  <li>5-year workmanship warranty issued and documented at close</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE (SPLIT) ═══════════ */}
      <section className="pmgc-why-choose">
        <div className="pmgc-why-choose__wrapper">
          <div
            className="pmgc-why-choose__image-side pmgc-reveal"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop')",
            }}
          ></div>
          <div className="pmgc-why-choose__content-side">
            <p className="pmgc-why-choose__label pmgc-reveal">
              Why Clients Trust Keentel to Manage Their Projects
            </p>
            <h2 className="pmgc-why-choose__heading pmgc-reveal pmgc-reveal-delay-1">
              One team. One point of contact. Full accountability.
            </h2>
            <ul className="pmgc-why-choose__list">
              <li className="pmgc-reveal pmgc-reveal-delay-1">
                <span className="pmgc-why-choose__icon">
                  <i className="fas fa-user-tie"></i>
                </span>
                <div className="pmgc-why-choose__item-text">
                  <strong>Single Point of Accountability</strong>
                  <span>
                    One licensed project manager owns your entire project —
                    schedule, budget, quality, and communication. You never have to
                    chase updates or navigate between contractors.
                  </span>
                </div>
              </li>
              <li className="pmgc-reveal pmgc-reveal-delay-2">
                <span className="pmgc-why-choose__icon">
                  <i className="fas fa-people-arrows"></i>
                </span>
                <div className="pmgc-why-choose__item-text">
                  <strong>In-House Trade Control</strong>
                  <span>
                    Because we self-perform across major trades, our project managers
                    coordinate a team that answers directly to them — not separate
                    companies with separate priorities.
                  </span>
                </div>
              </li>
              <li className="pmgc-reveal pmgc-reveal-delay-3">
                <span className="pmgc-why-choose__icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                <div className="pmgc-why-choose__item-text">
                  <strong>Transparent Reporting</strong>
                  <span>
                    We provide real-time budget tracking, weekly schedule updates, and
                    milestone photo reports. You always know exactly where your
                    project stands.
                  </span>
                </div>
              </li>
              <li className="pmgc-reveal pmgc-reveal-delay-4">
                <span className="pmgc-why-choose__icon">
                  <i className="fas fa-gavel"></i>
                </span>
                <div className="pmgc-why-choose__item-text">
                  <strong>Licensed &amp; Code-Compliant</strong>
                  <span>
                    Every project management decision is made through a licensed GC
                    lens — permits, inspections, code compliance, and documentation
                    are managed to Florida standards from day one.
                  </span>
                </div>
              </li>
              <li className="pmgc-reveal pmgc-reveal-delay-5">
                <span className="pmgc-why-choose__icon">
                  <i className="fas fa-shield-alt"></i>
                </span>
                <div className="pmgc-why-choose__item-text">
                  <strong>5-Year Workmanship Warranty</strong>
                  <span>
                    Our project management accountability does not end at handover.
                    Every project is backed by our written 5-year workmanship warranty
                    — we stand behind what we manage.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="pmgc-process">
        <div className="pmgc-section__inner">
          <p className="pmgc-section__label pmgc-reveal">
            Our Project Management Workflow
          </p>
          <div className="pmgc-process__steps">
            <div className="pmgc-process__step pmgc-reveal pmgc-reveal-delay-1">
              <div className="pmgc-process__step-number">1</div>
              <p className="pmgc-process__step-title">Contract &amp; Planning</p>
              <p className="pmgc-process__step-desc">
                Scope, schedule, budget, and permits confirmed
              </p>
            </div>
            <div className="pmgc-process__step pmgc-reveal pmgc-reveal-delay-2">
              <div className="pmgc-process__step-number">2</div>
              <p className="pmgc-process__step-title">Mobilization</p>
              <p className="pmgc-process__step-desc">
                Site setup, trade sequencing, and procurement
              </p>
            </div>
            <div className="pmgc-process__step pmgc-reveal pmgc-reveal-delay-3">
              <div className="pmgc-process__step-number">3</div>
              <p className="pmgc-process__step-title">Active Construction</p>
              <p className="pmgc-process__step-desc">
                Daily coordination, QC, and progress reporting
              </p>
            </div>
            <div className="pmgc-process__step pmgc-reveal pmgc-reveal-delay-4">
              <div className="pmgc-process__step-number">4</div>
              <p className="pmgc-process__step-title">Inspections</p>
              <p className="pmgc-process__step-desc">
                Internal and county inspections managed in-house
              </p>
            </div>
            <div className="pmgc-process__step pmgc-reveal pmgc-reveal-delay-5">
              <div className="pmgc-process__step-number">5</div>
              <p className="pmgc-process__step-title">Closeout &amp; Warranty</p>
              <p className="pmgc-process__step-desc">
                Punch list, CO, handover documents, and warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="pmgc-why-choose-us">
        <div className="pmgc-section__inner">
          <p className="pmgc-section__label pmgc-reveal">Why Choose Us</p>
          <h2 className="pmgc-section__title pmgc-reveal">
            Why Choose Keentel for Project Management &amp; General Contracting?
          </h2>
          <p
            className="pmgc-section__text pmgc-reveal pmgc-reveal-delay-1"
            style={{ maxWidth: "780px", marginBottom: "8px" }}
          >
            At Keentel General Contractors, we take pride in delivering project
            management that eliminates the risks that come from fragmented
            construction accountability. The following attributes set our project
            management team apart:
          </p>
          <div className="pmgc-why-choose-us__grid">
            <div className="pmgc-why-choose-us__card pmgc-reveal pmgc-reveal-delay-1">
              <h3>Client-Focused Work Approach</h3>
              <p>
                We structure every project management system around your timeline,
                your budget, and your communication preferences. Weekly reporting,
                milestone updates, and direct access to your project manager are
                standard on every project.
              </p>
            </div>
            <div className="pmgc-why-choose-us__card pmgc-reveal pmgc-reveal-delay-2">
              <h3>Proven Experience</h3>
              <p>
                We have managed residential, commercial, and industrial construction
                projects across all 67 Florida counties — with a consistent record of
                on-time, on-budget delivery and first-inspection approvals.
              </p>
            </div>
            <div className="pmgc-why-choose-us__card pmgc-reveal pmgc-reveal-delay-3">
              <h3>Quality with Innovation</h3>
              <p>
                We use digital project management tools for schedule tracking, budget
                reporting, RFI management, and photo documentation — giving you
                real-time visibility into your project without requiring site visits.
              </p>
            </div>
            <div className="pmgc-why-choose-us__card pmgc-reveal pmgc-reveal-delay-4">
              <h3>Attention to Detail</h3>
              <p>
                Every project management decision is documented. Every change is
                written. Every inspection is recorded. Our paper trail protects you
                legally and ensures nothing falls through the cracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — FIXED ═══════════ */}
      <section className="pmgc-faq-section">
        <div className="pmgc-section__inner">
          <p className="pmgc-section__label pmgc-reveal">
            Frequently Asked Questions
          </p>
          <h2 className="pmgc-section__title pmgc-reveal" style={{ marginBottom: "8px" }}>
            Common Questions About Project Management &amp; General Contracting
          </h2>
          <div className="pmgc-faq-section__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pmgc-faq-item pmgc-reveal"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <button
                  className="pmgc-faq-item__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="pmgc-icon"></span>
                </button>
                <div className="pmgc-faq-item__answer-wrapper">
                  <div
                    className="pmgc-faq-item__answer"
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
      <section className="pmgc-cta-section">
        <div className="pmgc-section__inner">
          <h2 className="pmgc-cta-section__title pmgc-reveal">
            Need a licensed GC to manage your project?
          </h2>
          <p className="pmgc-cta-section__text pmgc-reveal pmgc-reveal-delay-1">
            Contact Keentel General Contractors today for a free consultation on
            project management and general contracting for your project anywhere in
            Florida.
          </p>
          <a href="#" className="pmgc-cta-section__btn pmgc-reveal pmgc-reveal-delay-2">
            {envelopeSvg}
            Request Free Estimate
          </a>
          <div className="pmgc-cta-section__contact pmgc-reveal pmgc-reveal-delay-3">
            <a href="tel:+18133950000">
              <i className="fas fa-phone"></i> 813-395-0000
            </a>
            <span className="pmgc-sep">|</span>
            <a href="mailto:contact@keentelgeneralcontractors.com">
              <i className="fas fa-envelope"></i> contact@keentelgeneralcontractors.com
            </a>
            <span className="pmgc-sep">|</span>
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