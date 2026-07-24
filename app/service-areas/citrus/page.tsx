"use client";

import "./citrus.css";
import { useEffect, useRef, useState } from "react";

export default function CitrusPage() {
  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ─── Effect to set max-height whenever openIndex changes ───
  useEffect(() => {
    const wrappers = document.querySelectorAll(".tampa-faq-answer-wrapper");
    wrappers.forEach((wrapper, i) => {
      const content = contentRefs.current[i];
      if (i === openIndex && content) {
        const height = content.scrollHeight;
        (wrapper as HTMLDivElement).style.maxHeight = height + "px";
        const item = wrapper.closest(".tampa-faq-item");
        if (item) item.classList.add("tampa-active");
      } else {
        (wrapper as HTMLDivElement).style.maxHeight = "0px";
        const item = wrapper.closest(".tampa-faq-item");
        if (item) item.classList.remove("tampa-active");
      }
    });
  }, [openIndex]);

  // ─── Scroll animations, counter, and FAQ initial setup ───
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".tampa-animate-on-scroll");
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("tampa-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));

    // Counter animation for 500+ stat
    const countUpTarget = document.querySelector(
      ".tampa-count-up-target"
    ) as HTMLElement | null;
    let countUpDone = false;

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countUpDone && countUpTarget) {
            countUpDone = true;
            const targetElement = countUpTarget;
            const target = parseInt(targetElement.getAttribute("data-count") || "500");
            const duration = 1800;
            const startTime = performance.now();
            const startVal = 0;

            function updateCounter(currentTime: number) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(startVal + (target - startVal) * eased);
              targetElement.textContent = current.toString();
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                targetElement.textContent = target.toString();
              }
            }
            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countUpTarget) {
      const statItem = countUpTarget.closest(".tampa-stat-item");
      if (statItem) {
        counterObserver.observe(statItem);
      }
    }

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  // ─── FAQ list data ───
  const faqs = [
    {
      q: "Q: Do you serve rural properties in Citrus County?",
      a: "Yes. We build on rural lots throughout Citrus County — including properties on well and septic systems. Site assessment, well and septic coordination, and rural driveway and access requirements are all managed as part of our pre-construction process.",
    },
    {
      q: "Q: How do you handle the Citrus County Building Department permit process?",
      a: "We manage all permit applications and inspections through the Citrus County Building Department on your behalf. We are familiar with the department's review process and inspection sequencing for residential, commercial, and electrical permits.",
    },
    {
      q: "Q: Do you respond to emergencies in rural Citrus County areas?",
      a: "Yes. Our 24/7 emergency response covers all of Citrus County — including rural areas. We confirm on-site arrival within 30 to 60 minutes across the county.",
    },
    {
      q: "Q: Can you build near the Crystal River or Homosassa waterfront?",
      a: "Yes. We are experienced in coastal and waterfront construction in Citrus County — including flood zone compliance, elevation requirements, and permit coordination for properties along the Nature Coast.",
    },
    {
      q: "Q: Is your estimate free for Citrus County projects?",
      a: "Yes. Our initial estimate is completely free with no obligation. We visit the site where needed and deliver a written fixed-price proposal before any contract is signed.",
    },
  ];

  return (
    <>
      {/* Top Label */}
      <div className="tampa-top-label">
        <span>General Contractor — Citrus County</span>
        <span className="tampa-divider-label">|</span>
        <span>Residential, Commercial &amp; Industrial Construction — Citrus County, Florida</span>
      </div>

      {/* ─── HERO — with background image, no label ─── */}
      <section
        className="tampa-hero"
        aria-labelledby="hero-heading"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="tampa-hero-overlay"></div>
        <div className="tampa-hero-inner">
          <h1 id="hero-heading" className="tampa-hero-heading tampa-animate-on-scroll tampa-fade-in-up">
            General Contractor in Citrus County, Florida
          </h1>
          <p className="tampa-hero-text tampa-animate-on-scroll tampa-fade-in-up" style={{ transitionDelay: "0.1s" }}>
            We deliver licensed general contracting services across Citrus County — from
            Inverness to Crystal River and every community in between. Citrus County's
            construction market has specific building environment characteristics that
            require a contractor with real experience in this region, not just a service
            area listing.
          </p>
          <p className="tampa-hero-text tampa-animate-on-scroll tampa-fade-in-up" style={{ transitionDelay: "0.15s" }}>
            We have worked on residential builds, commercial projects, and emergency
            restoration across Citrus County and we understand what it takes to deliver
            correctly here — from the Citrus County Building Department's permit process
            to the area's specific soil conditions and flood zone requirements along
            the Nature Coast.
          </p>
          <div className="tampa-hero-actions tampa-animate-on-scroll tampa-fade-in-up" style={{ transitionDelay: "0.2s" }}>
            <a href="/contact#contactformsection" className="tampa-hero-btn tampa-hero-btn--primary">
              Request Free Estimate
            </a>
            <a href="#services" className="tampa-hero-btn tampa-hero-btn--secondary">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="tampa-stats-bar" aria-label="Key statistics">
        <div className="tampa-stats-bar-inner">
          <div className="tampa-stat-item tampa-animate-on-scroll tampa-fade-in-up">
            <div className="tampa-stat-value">24/7</div>
            <div className="tampa-stat-label">Emergency Response</div>
          </div>
          <div
            className="tampa-stat-item tampa-animate-on-scroll tampa-fade-in-up"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="tampa-stat-value">A+</div>
            <div className="tampa-stat-label">BBB Rated</div>
          </div>
          <div
            className="tampa-stat-item tampa-animate-on-scroll tampa-fade-in-up"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="tampa-stat-value">
              <span className="tampa-count-up-target" data-count="500">
                500
              </span>
              +
            </div>
            <div className="tampa-stat-label">Projects Delivered</div>
          </div>
          <div
            className="tampa-stat-item tampa-animate-on-scroll tampa-fade-in-up"
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="tampa-stat-value">5-Yr</div>
            <div className="tampa-stat-label">Written Warranty</div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="tampa-section tampa-section-alt" id="services" aria-labelledby="services-heading">
        <div className="tampa-section-inner">
          <p className="tampa-section-label">SERVICES WE DELIVER IN CITRUS COUNTY</p>
          <h2
            id="services-heading"
            className="tampa-section-heading tampa-animate-on-scroll tampa-fade-in-up"
          >
            What We Build in Citrus County
          </h2>
          <p
            className="tampa-animate-on-scroll tampa-fade-in"
            style={{ color: "var(--color-text-light)", marginBottom: "20px", fontSize: "0.95rem" }}
          >
            We deliver the full scope of licensed general contracting services across
            Citrus County — the same team, the same licensed standard, and the same
            5-year warranty on every project.
          </p>
          <div className="tampa-services-grid">
            {/* Card 1: Residential Construction */}
            <div className="tampa-service-card tampa-animate-on-scroll tampa-fade-in-up">
              <div
                className="tampa-service-card__image"
                style={{
                  backgroundImage:
                    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdXvt0WG5yjHkXEtdyNQlTlgH3gl_ewmyY1H82s-y5eyKfbgDj_2NuWI&s=10')",
                }}
              >
                <span className="tampa-service-card__icon">
                  <i className="fa-solid fa-house"></i>
                </span>
              </div>
              <div className="tampa-service-card__body">
                <h3 className="tampa-service-title">Residential Construction</h3>
                <p className="tampa-service-desc">
                  Custom homes, additions, and new builds designed and built to Florida
                  Building Code.
                </p>
              </div>
            </div>

            {/* Card 2: Remodeling */}
            <div
              className="tampa-service-card tampa-animate-on-scroll tampa-fade-in-up"
              style={{ transitionDelay: "0.08s" }}
            >
              <div
                className="tampa-service-card__image"
                style={{
                  backgroundImage:
                    "url('https://sqftconstruction.pk/wp-content/uploads/2024/09/home-renovation-img-01.jpg')",
                }}
              >
                <span className="tampa-service-card__icon">
                  <i className="fa-solid fa-hammer"></i>
                </span>
              </div>
              <div className="tampa-service-card__body">
                <h3 className="tampa-service-title">Remodeling</h3>
                <p className="tampa-service-desc">
                  Kitchen, bathroom, whole-home, and commercial remodels — managed under
                  one contract.
                </p>
              </div>
            </div>

            {/* Card 3: Commercial Construction */}
            <div
              className="tampa-service-card tampa-animate-on-scroll tampa-fade-in-up"
              style={{ transitionDelay: "0.16s" }}
            >
              <div
                className="tampa-service-card__image"
                style={{
                  backgroundImage:
                    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRWsSQTRPQQ0LSnTsG8gYKBSlPgKgKSL-tEFG1NI9_o07ufHYM9OqxZB4&s=10')",
                }}
              >
                <span className="tampa-service-card__icon">
                  <i className="fa-solid fa-building"></i>
                </span>
              </div>
              <div className="tampa-service-card__body">
                <h3 className="tampa-service-title">Commercial Construction</h3>
                <p className="tampa-service-desc">
                  Office builds, tenant improvements, retail, and warehouse construction.
                </p>
              </div>
            </div>

            {/* Card 4: Electrical Services */}
            <div
              className="tampa-service-card tampa-animate-on-scroll tampa-fade-in-up"
              style={{ transitionDelay: "0.24s" }}
            >
              <div
                className="tampa-service-card__image"
                style={{
                  backgroundImage:
                    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DGdjxCOLVJll2AyKWG38VWni2fCSTkU4eEc0Tjzyrm_nxBjr_UWzXBap&s=10')",
                }}
              >
                <span className="tampa-service-card__icon">
                  <i className="fa-solid fa-bolt"></i>
                </span>
              </div>
              <div className="tampa-service-card__body">
                <h3 className="tampa-service-title">Electrical Services</h3>
                <p className="tampa-service-desc">
                  Residential, commercial, and industrial electrical — CFC-licensed,
                  always in-house.
                </p>
              </div>
            </div>

            {/* Card 5: Emergency 24/7 */}
            <div
              className="tampa-service-card tampa-animate-on-scroll tampa-fade-in-up"
              style={{ transitionDelay: "0.32s" }}
            >
              <div
                className="tampa-service-card__image"
                style={{
                  backgroundImage:
                    "url('https://www.brisbane.qld.gov.au/content/dam/brisbanecitycouncil/corpwebsite/Community-support-and-safety/images/gutter-clean-up_2-corpsite.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg')",
                }}
              >
                <span className="tampa-service-card__icon">
                  <i className="fa-solid fa-phone-volume"></i>
                </span>
              </div>
              <div className="tampa-service-card__body">
                <h3 className="tampa-service-title">Emergency 24/7</h3>
                <p className="tampa-service-desc">
                  Storm, flood, fire, and structural emergencies — on-site within 30 to
                  60 minutes.
                </p>
              </div>
            </div>

            {/* Card 6: Design Services */}
            <div
              className="tampa-service-card tampa-animate-on-scroll tampa-fade-in-up"
              style={{ transitionDelay: "0.4s" }}
            >
              <div
                className="tampa-service-card__image"
                style={{
                  backgroundImage:
                    "url('https://cdn-ikpnogb.nitrocdn.com/cdPGWyOaMJgCoqiEOEpUSTgMoqloHDjJ/assets/images/optimized/rev-4121016/www.tejjy.com/wp-content/uploads/2022/09/Construction-Management-1.jpg')",
                }}
              >
                <span className="tampa-service-card__icon">
                  <i className="fa-solid fa-pen-ruler"></i>
                </span>
              </div>
              <div className="tampa-service-card__body">
                <h3 className="tampa-service-title">Design Services</h3>
                <p className="tampa-service-desc">
                  Permit-ready architectural drawings, 3D visualization, and full
                  design-build scope.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCAL KNOWLEDGE — Split Layout ─── */}
      <section className="tampa-section" aria-labelledby="local-heading">
        <div className="tampa-section-inner tampa-local-split">
          <div className="tampa-local-text tampa-animate-on-scroll tampa-slide-in-left">
            <p className="tampa-section-label">LOCAL KNOWLEDGE</p>
            <h2 id="local-heading" className="tampa-section-heading">
              Why Local Knowledge Matters in Citrus County
            </h2>
            <p className="tampa-local-description">
              Citrus County's construction environment is shaped by its proximity to the
              Gulf, its rural and semi-rural lot conditions, and a building department
              that processes permits with its own specific requirements. We understand
              the county's well and septic coordination requirements for rural
              residential builds, the flood zone considerations along the Crystal River
              and Rainbow River corridors, and the local code enforcement standards that
              affect both residential renovations and commercial projects in Inverness,
              Crystal River, and Homosassa.
            </p>
          </div>
          <div className="tampa-local-cities tampa-animate-on-scroll tampa-slide-in-right">
            <h3 className="tampa-local-cities-heading">Cities &amp; Communities We Serve</h3>
            <ul className="tampa-cities-grid">
              <li>Inverness</li>
              <li>Crystal River</li>
              <li>Homosassa</li>
              <li>Lecanto</li>
              <li>Beverly Hills</li>
              <li>Floral City</li>
              <li>Hernando (Citrus)</li>
              <li>Citrus Springs</li>
              <li>Dunnellon (Citrus portion)</li>
              <li>Pine Ridge</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── WHY KEENTEL ─── */}
      <section className="tampa-section tampa-section-alt" aria-labelledby="why-heading">
        <div className="tampa-section-inner">
          <p className="tampa-section-label">WHY KEENTEL</p>
          <h2
            id="why-heading"
            className="tampa-section-heading tampa-animate-on-scroll tampa-fade-in-up"
          >
            Why Citrus County Clients Choose Keentel
          </h2>
          <div className="tampa-why-grid">
            <div className="tampa-why-card tampa-animate-on-scroll tampa-slide-in-left">
              <span className="tampa-why-card-accent"></span>
              <h3 className="tampa-why-card-title">Licensed &amp; Insured in Florida</h3>
              <p className="tampa-why-card-desc">
                We hold active CGC, CPC, and CFC licenses. Every crew member on your
                Citrus County project is fully covered — general liability and workers'
                compensation.
              </p>
            </div>
            <div
              className="tampa-why-card tampa-animate-on-scroll tampa-slide-in-right"
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="tampa-why-card-accent"></span>
              <h3 className="tampa-why-card-title">Permit-Managed on Every Project</h3>
              <p className="tampa-why-card-desc">
                We manage all permit submissions and county inspections through the
                Citrus County Building Department on your behalf. You never have to
                chase approvals.
              </p>
            </div>
            <div
              className="tampa-why-card tampa-animate-on-scroll tampa-slide-in-left"
              style={{ transitionDelay: "0.2s" }}
            >
              <span className="tampa-why-card-accent"></span>
              <h3 className="tampa-why-card-title">One Team — Full Accountability</h3>
              <p className="tampa-why-card-desc">
                Design, construction, electrical, and finishing are all managed by our
                in-house licensed team under one contract. One project manager. One
                point of contact. No gaps.
              </p>
            </div>
            <div
              className="tampa-why-card tampa-animate-on-scroll tampa-slide-in-right"
              style={{ transitionDelay: "0.3s" }}
            >
              <span className="tampa-why-card-accent"></span>
              <h3 className="tampa-why-card-title">5-Year Workmanship Warranty</h3>
              <p className="tampa-why-card-desc">
                Every project we complete in Citrus County is backed by our written
                5-year workmanship warranty. If something is not right, we return and
                fix it at no charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="tampa-section" aria-labelledby="faq-heading">
        <div className="tampa-section-inner">
          <p className="tampa-section-label">FAQ</p>
          <h2
            id="faq-heading"
            className="tampa-section-heading tampa-animate-on-scroll tampa-fade-in-up"
          >
            Frequently Asked Questions — Citrus County
          </h2>
          <div className="tampa-faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="tampa-faq-item tampa-animate-on-scroll tampa-fade-in-up"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <button
                  className="tampa-faq-question"
                  aria-expanded={openIndex === index}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.q}
                </button>
                <div className="tampa-faq-answer-wrapper">
                  <div
  className="tampa-faq-answer"
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

      {/* ─── FINAL CTA — Light Gradient ─── */}
      <section className="tampa-cta-light" aria-labelledby="cta-heading">
        <div className="tampa-cta-light-inner">
          <h2 id="cta-heading" className="tampa-cta-light-heading tampa-animate-on-scroll tampa-fade-in-up">
            Start Your Citrus County Project Today
          </h2>
          <p className="tampa-cta-light-text tampa-animate-on-scroll tampa-fade-in" style={{ transitionDelay: "0.1s" }}>
            Contact us for a free, no‑obligation estimate on your residential, commercial,
            or industrial project anywhere in Citrus County.
          </p>
          <div className="tampa-cta-light-actions">
            <a
              href="/contact#contactformsection"
              className="tampa-cta-light-btn tampa-animate-on-scroll tampa-scale-in"
              style={{ transitionDelay: "0.2s" }}
            >
              Request Free Estimate
            </a>
            <a
              href="tel:+18133950000"
              className="tampa-cta-light-phone tampa-animate-on-scroll tampa-scale-in"
              style={{ transitionDelay: "0.3s" }}
            >
              <i className="fa-solid fa-phone"></i> (813) 395-0000
            </a>
          </div>
          <p className="tampa-cta-light-sub tampa-animate-on-scroll tampa-fade-in" style={{ transitionDelay: "0.4s" }}>
            Available 7 days a week · 24/7 emergency line
          </p>
          <p className="tampa-cta-light-location tampa-animate-on-scroll tampa-fade-in" style={{ transitionDelay: "0.45s" }}>
            <i className="fa-solid fa-location-dot"></i> Serving all of Citrus County, Florida
          </p>
        </div>
      </section>
    </>
  );
}