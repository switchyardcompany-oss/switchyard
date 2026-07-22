// src/app/contact/page.tsx
"use client";

import "./contact.css";
import { useEffect } from "react";

export default function ContactPage() {
  useEffect(() => {
    // Scroll Reveal
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Hero content should be visible immediately
    document.querySelectorAll(".hero .reveal").forEach((el) =>
      el.classList.add("visible")
    );

    return () => observer.disconnect();
  }, []);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      formSource: "contact",
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      projectType: formData.get("projectType"),
      location: formData.get("location"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert(
          "Thank you for your message! Our team will respond within the same business day."
        );
        form.reset();
      } else {
        alert("Something went wrong — please try again or call us directly.");
      }
    } catch {
      alert("Something went wrong — please try again or call us directly.");
    }
  };

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="contact-hero">
  <div className="contact-hero__bg-pattern"></div>
  <div className="contact-hero__orb contact-hero__orb--1"></div>
  <div className="contact-hero__orb contact-hero__orb--2"></div>

  <div className="contact-hero__content">
    <p className="contact-hero__eyebrow reveal">Get in Touch</p>
    <h1 className="contact-hero__title reveal reveal-delay-1">
      Let's start <span className="highlight">building</span>.
    </h1>
    <p className="contact-hero__subtitle reveal reveal-delay-2">
      Whether you are planning a new build, a remodel, or need emergency
      support — our team is available 7 days a week. Get a free,
      no-obligation estimate for your project anywhere in Florida.
    </p>
  </div>
</section>

      {/* ═══════════════ CONTACT DETAILS — PREMIUM ═══════════════ */}
      <section className="section section--white">
        <div className="section__inner">
          <div className="contact-details-premium">
            <div className="contact-details-premium__header">
              <p className="section__label reveal">Connect With Us</p>
              <h2 className="section__title reveal">
                We're here to help — reach out anytime
              </h2>
              <p className="section__text reveal reveal-delay-1">
                Our team is available 7 days a week to discuss your project,
                answer your questions, and provide a free estimate.
              </p>
            </div>

            <div className="contact-details-premium__grid">
              {/* Phone */}
              <div className="contact-detail-premium reveal reveal-delay-1">
                <div className="contact-detail-premium__icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-detail-premium__content">
                  <span className="contact-detail-premium__label">Call Us</span>
                  <a href="tel:+18133900000" className="contact-detail-premium__value">
                    (813) 390-0000
                  </a>
                  <span className="contact-detail-premium__sub">Mon–Sun, 7am–7pm</span>
                </div>
              </div>

              {/* Email */}
              <div className="contact-detail-premium reveal reveal-delay-2">
                <div className="contact-detail-premium__icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-detail-premium__content">
                  <span className="contact-detail-premium__label">Email Us</span>
                  <a
                    href="mailto:contact@keentelgeneralcontractors.com"
                    className="contact-detail-premium__value"
                  >
                    contact@keentelgeneralcontractors.com
                  </a>
                  <span className="contact-detail-premium__sub">
                    We reply within 4 hours
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="contact-detail-premium reveal reveal-delay-3">
                <div className="contact-detail-premium__icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-detail-premium__content">
                  <span className="contact-detail-premium__label">Visit Us</span>
                  <span className="contact-detail-premium__value">
                    400 North Ashley Drive, Suite 100
                  </span>
                  <span className="contact-detail-premium__sub">
                    Tampa, FL 33602
                  </span>
                </div>
              </div>

              {/* Emergency */}
              <div className="contact-detail-premium contact-detail-premium--emergency reveal reveal-delay-4">
                <div className="contact-detail-premium__icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="contact-detail-premium__content">
                  <span className="contact-detail-premium__label">24/7 Emergency</span>
                  <a href="tel:+18133900000" className="contact-detail-premium__value">
                    (813) 390-0000
                  </a>
                  <span className="contact-detail-premium__sub">
                    Always available — 365 days a year
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT FORM + INFO SPLIT ═══════════════ */}
      <section className="section section--off-white" id="contactformsection">
        <div className="section__inner">
          <div style={{ marginBottom: "32px" }}>
            <p className="section__label reveal">Request a Free Estimate</p>
            <h2 className="section__title reveal">
              Fill in the form and our team will respond within the same business day.
            </h2>
          </div>

          <div className="form-split">
            {/* Form */}
            <div className="form-split__form reveal reveal-delay-1">
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="(813) 555-1234"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="projectType">
                      Project Type <span className="required">*</span>
                    </label>
                    <select id="projectType" name="projectType" className="form-select" required>
                      <option value="">Select a project type…</option>
                      <option value="new-construction">New Construction</option>
                      <option value="remodeling">Remodeling</option>
                      <option value="electrical">Electrical</option>
                      <option value="design-services">Design Services</option>
                      <option value="emergency">Emergency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="location">
                      Project Location / County
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-input"
                      placeholder="Hillsborough County, FL"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Message / Project Description <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us about your project, timeline, and any specific requirements…"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="form-submit">
                  <i className="fas fa-paper-plane"></i>
                  Send My Request
                </button>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="form-split__info reveal reveal-delay-2">
              <h3>Why reach out?</h3>
              <p>
                Our team is ready to discuss your project, answer your questions,
                and provide a free, no-obligation estimate.
              </p>

              <div className="form-split__info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Same-day response</strong>
                  <br />
                  We reply within hours
                </div>
              </div>
              <div className="form-split__info-item">
                <i className="fas fa-file-invoice"></i>
                <div>
                  <strong>Free estimate</strong>
                  <br />
                  No obligation, fixed-price proposal
                </div>
              </div>
              <div className="form-split__info-item">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <strong>Licensed &amp; insured</strong>
                  <br />
                  CGC · CPC · CFC — fully protected
                </div>
              </div>

              <span className="emergency-badge">
                <i className="fas fa-exclamation-triangle"></i> 24/7 Emergency
                Line Always Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS AFTER CONTACT ═══════════════ */}
      <section className="section section--white">
        <div className="section__inner">
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <p className="section__label reveal">What Happens After You Reach Out</p>
            <h2 className="section__title reveal">
              From first contact to project start
            </h2>
          </div>

          <div className="process-grid">
            <div className="process-step reveal reveal-delay-1">
              <div className="process-step__number">1</div>
              <div className="process-step__title">You Contact Us</div>
              <div className="process-step__desc">Call, email, or submit the form</div>
              <span className="process-step__arrow">
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
            <div className="process-step reveal reveal-delay-2">
              <div className="process-step__number">2</div>
              <div className="process-step__title">Same-Day Response</div>
              <div className="process-step__desc">Our team replies within hours</div>
              <span className="process-step__arrow">
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
            <div className="process-step reveal reveal-delay-3">
              <div className="process-step__number">3</div>
              <div className="process-step__title">Free Site Estimate</div>
              <div className="process-step__desc">We visit and assess your project</div>
              <span className="process-step__arrow">
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
            <div className="process-step reveal reveal-delay-4">
              <div className="process-step__number">4</div>
              <div className="process-step__title">Written Proposal</div>
              <div className="process-step__desc">Fixed price, clear scope, no surprises</div>
              <span className="process-step__arrow">
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
            <div className="process-step reveal reveal-delay-5">
              <div className="process-step__number">5</div>
              <div className="process-step__title">Project Start</div>
              <div className="process-step__desc">
                Signed contract, licensed team mobilized
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE KEENTEL ═══════════════ */}
      <section className="section section--off-white">
        <div className="section__inner">
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <p className="section__label reveal">Why Choose Keentel General Contractors</p>
            <h2 className="section__title reveal">
              Licensed, insured, and ready to build
            </h2>
          </div>

          <div className="why-grid">
            <div className="why-card reveal reveal-delay-1">
              <div className="why-card__icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="why-card__title">Licensed &amp; Insured</div>
              <div className="why-card__desc">
                Florida CGC, CPC &amp; CFC licensed. Fully insured on every
                project — your investment is protected from the first call.
              </div>
            </div>
            <div className="why-card reveal reveal-delay-2">
              <div className="why-card__icon">
                <i className="fas fa-file-invoice"></i>
              </div>
              <div className="why-card__title">Free Estimate</div>
              <div className="why-card__desc">
                No obligation, no pressure. We assess your scope, visit the site
                where needed, and deliver a written fixed-price proposal.
              </div>
            </div>
            <div className="why-card reveal reveal-delay-3">
              <div className="why-card__icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="why-card__title">Available 7 Days</div>
              <div className="why-card__desc">
                Our team takes calls Monday through Sunday. For emergencies, our
                dispatch line is active 24 hours a day, 365 days a year.
              </div>
            </div>
            <div className="why-card reveal reveal-delay-4">
              <div className="why-card__icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <div className="why-card__title">Statewide Coverage</div>
              <div className="why-card__desc">
                Headquartered in Tampa Bay, we serve all 67 Florida counties for
                residential, commercial, and industrial projects.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ EMERGENCY CTA ═══════════════ */}
      <section className="section section--white">
        <div className="section__inner">
          <div className="emergency-cta reveal">
            <span className="emergency-cta__badge">
              <i className="fas fa-exclamation-triangle"></i> 24/7 Emergency
              Response
            </span>
            <h2>Facing an emergency right now?</h2>
            <p>
              Don't wait for a callback. Call our emergency line directly — we
              dispatch within 15 minutes and arrive on-site across Florida within
              30 to 60 minutes.
            </p>

            <a href="tel:+18133900000" className="phone-large">
              <i className="fas fa-phone"></i>
              (813) 390-0000
            </a>

            <div className="tags">
              <span>Storm</span>
              <span>Flood</span>
              <span>Fire</span>
              <span>Structural Failure</span>
              <span>Electrical Emergency</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ OFFICE LOCATIONS ═══════════════ */}
      <section className="section section--off-white">
        <div className="section__inner">
          <div style={{ marginBottom: "12px" }}>
            <p className="section__label reveal">Our Offices</p>
            <h2 className="section__title reveal">
              Serving Florida from Tampa Bay
            </h2>
          </div>

          <div className="locations-grid">
            <div className="location-card reveal reveal-delay-1">
              <h3>
                <i
                  className="fas fa-building"
                  style={{ color: "var(--color-magenta)", marginRight: "8px" }}
                ></i>
                Tampa Bay — Main Office
              </h3>
              <div className="sub">Headquarters</div>
              <p>
                400 North Ashley Drive, Suite 100
                <br />
                Tampa, FL 33602
              </p>
              <a href="tel:+18133900000" className="phone-link">
                <i className="fas fa-phone"></i> (813) 390-0000
              </a>
            </div>
            <div className="location-card reveal reveal-delay-2">
              <h3>
                <i
                  className="fas fa-map-signs"
                  style={{ color: "var(--color-magenta)", marginRight: "8px" }}
                ></i>
                Service Territory
              </h3>
              <div className="sub">Statewide Coverage</div>
              <p>
                All 67 Florida counties — residential, commercial, and industrial
                construction services available statewide.
              </p>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Hillsborough · Pinellas · Pasco · Polk · Hernando · Manatee ·
                Sarasota · and all remaining Florida counties
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="section section--white">
        <div className="section__inner">
          <div className="final-cta reveal">
            <div className="final-cta__badge">
              <i className="fas fa-phone-volume"></i>
              Call Us Today
            </div>

            <h2 className="final-cta__title">
              Your next project starts with one call.
            </h2>

            <div className="final-cta__actions">
              <a href="tel:+18133900000" className="final-cta__phone">
                <i className="fas fa-phone"></i>
                (813) 390-0000
              </a>
              <a href="#contactformsection" className="final-cta__btn">
                Request Free Estimate <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="final-cta__perks">
              <span>
                <i className="fas fa-check-circle"></i> Free estimate
              </span>
              <span>
                <i className="fas fa-shield-alt"></i> Licensed &amp; insured
              </span>
              <span>
                <i className="fas fa-clock"></i> Available 7 days a week
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}