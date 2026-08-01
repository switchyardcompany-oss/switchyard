"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import ServiceHeroCredentials from "@/components/ServiceHeroCredentials";
import "./contact.css";

const contactDetails = [
  {
    label: "Call our team",
    value: "813-395-0000",
    href: "tel:+18133950000",
    icon: "phone",
  },
  {
    label: "Email us",
    value: "contact@keentelgeneralcontractors.com",
    href: "mailto:contact@keentelgeneralcontractors.com",
    icon: "mail",
  },
  {
    label: "Tampa office",
    value: "400 North Ashley Drive, Suite 2600, Tampa, FL 33602",
    href: "https://maps.google.com/?q=400+North+Ashley+Drive+Suite+2600+Tampa+FL+33602",
    icon: "pin",
  },
];

const faqs = [
  {
    question: "What information should I include with my inquiry?",
    answer:
      "Share the project type, location, current stage, desired timeline, and a short description of the work. Our team will help clarify anything else during the initial conversation.",
  },
  {
    question: "Do you work throughout Florida?",
    answer:
      "Yes. Keentel General Contractors supports construction projects across all 67 Florida counties, with a primary base in Tampa Bay.",
  },
  {
    question: "Can electrical contracting be included in my project?",
    answer:
      "Yes. Electrical contracting can be coordinated as part of an integrated construction project or discussed as a standalone service.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "A member of our team will review your project information, contact you to discuss the scope, and outline the appropriate next steps.",
  },
];

function ContactIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formSource: "contact",
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          projectType: formData.get("projectType"),
          location: formData.get("location"),
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) throw new Error("Submission failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="kcontact">
      <section className="kcontact-hero">
        <video
          className="kcontact-hero__media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/Video/contact.mp4" type="video/mp4" />
        </video>
        <div className="kcontact-hero__overlay" />

        <div className="kcontact-shell kcontact-hero__inner">
          <div className="kcontact-hero__copy">
            <p className="kcontact-eyebrow">Contact Keentel General Contractors</p>
            <h1>
              Let&apos;s Build Your
              <span> Next Project.</span>
            </h1>
            <p className="kcontact-hero__intro">
              Tell us what you are planning. Our licensed construction team
              will help define the scope, answer your questions, and identify
              the right next steps.
            </p>
            <div className="kcontact-hero__actions">
              <a className="kcontact-button kcontact-button--primary" href="#contactformsection">
                Book a Consultation <span aria-hidden="true">→</span>
              </a>
              <a className="kcontact-button kcontact-button--ghost" href="tel:+18133950000">
                Call Us
              </a>
            </div>
          </div>

          <ServiceHeroCredentials />
        </div>
      </section>

      <section className="kcontact-quick" aria-label="Contact information">
        <div className="kcontact-shell kcontact-quick__grid">
          {contactDetails.map((detail) => {
            const content = (
              <>
                <span className="kcontact-quick__icon">
                  <ContactIcon name={detail.icon} />
                </span>
                <span className="kcontact-quick__copy">
                  <strong>{detail.label}</strong>
                  <span>{detail.value}</span>
                </span>
              </>
            );

            return detail.href ? (
              <a
                key={detail.label}
                className="kcontact-quick__item"
                href={detail.href}
                target={detail.icon === "pin" ? "_blank" : undefined}
                rel={detail.icon === "pin" ? "noopener noreferrer" : undefined}
              >
                {content}
              </a>
            ) : (
              <div key={detail.label} className="kcontact-quick__item">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="kcontact-form-section" id="contactformsection">
        <div className="kcontact-shell kcontact-form-layout">
          <div className="kcontact-form-intro">
            <p className="kcontact-eyebrow">Start a Conversation</p>
            <h2>Tell Us About Your Project</h2>
            <p>
              From early planning to active construction, the right
              conversation creates clarity. Share the essential details and
              our team will follow up with focused, practical next steps.
            </p>

            <div className="kcontact-form-intro__image" aria-hidden="true" />

            <div className="kcontact-form-intro__actions">
              <a href="tel:+18133950000" className="kcontact-intro-button kcontact-intro-button--call">
                Call Us
              </a>
              <a href="#project-inquiry" className="kcontact-intro-button kcontact-intro-button--schedule">
                Schedule a Consultation <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="kcontact-form-card" id="project-inquiry">
            <div className="kcontact-form-card__heading">
              <span>Project Inquiry</span>
              <h3>Request a Consultation</h3>
              <p>Fields marked with an asterisk are required.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="kcontact-form-grid">
                <label>
                  First Name *
                  <input name="firstName" type="text" autoComplete="given-name" required />
                </label>
                <label>
                  Last Name *
                  <input name="lastName" type="text" autoComplete="family-name" required />
                </label>
                <label>
                  Email Address *
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  Phone Number *
                  <input name="phone" type="tel" autoComplete="tel" required />
                </label>
                <label>
                  Project Type *
                  <select name="projectType" defaultValue="" required>
                    <option value="" disabled>Select project type</option>
                    <option>Pre-Construction</option>
                    <option>Design-Build</option>
                    <option>General Construction</option>
                    <option>Commercial Remodeling</option>
                    <option>Residential Remodeling</option>
                    <option>Electrical Contracting</option>
                    <option>Emergency Restoration</option>
                  </select>
                </label>
                <label>
                  Project Location *
                  <input name="location" type="text" placeholder="City, Florida" required />
                </label>
                <label className="kcontact-form-grid__full">
                  Project Details *
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell us about the project scope, goals, and timeline."
                    required
                  />
                </label>
              </div>

              <button
                className="kcontact-submit"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Request a Consultation"}
                {status !== "sending" && <span aria-hidden="true">→</span>}
              </button>

              <div className="kcontact-form-status" aria-live="polite">
                {status === "success" && (
                  <p className="kcontact-form-status--success">
                    Thank you. Your project inquiry has been received.
                  </p>
                )}
                {status === "error" && (
                  <p className="kcontact-form-status--error">
                    We could not send your inquiry. Please try again or call
                    813-395-0000.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="kcontact-process">
        <div className="kcontact-shell">
          <div className="kcontact-heading">
            <p className="kcontact-eyebrow">What Happens Next</p>
            <h2>A Clear Start for Your Project</h2>
            <p>
              A focused three-step process keeps the first conversation useful
              and gives your project a clear direction.
            </p>
          </div>
          <div className="kcontact-process__grid">
            {[
              ["01", "Share the Details", "Tell us what you are building, where it is located, and what success looks like."],
              ["02", "Speak With Our Team", "We review the scope, discuss priorities, and identify the services your project needs."],
              ["03", "Define the Next Steps", "You receive a clear path forward based on your project stage, goals, and requirements."],
            ].map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kcontact-support">
        <div className="kcontact-shell">
          <div className="kcontact-support__heading">
            <div>
              <p className="kcontact-eyebrow">Construction Support Across Florida</p>
              <h2>Wherever the Project Starts, We Help You Move Forward.</h2>
            </div>
            <p>
              Explore our statewide construction coverage or connect with our
              restoration team when property damage requires a coordinated
              response.
            </p>
          </div>

          <div className="kcontact-support__grid">
            <article className="kcontact-support__card">
              <div className="kcontact-support__media kcontact-support__media--areas">
                <span>Serving all 67 Florida counties</span>
              </div>
              <div className="kcontact-support__body">
                <p className="kcontact-eyebrow">Florida Construction Service Areas</p>
                <h3>Professional Construction Services Across Florida</h3>
                <p>
                  Find the Florida regions and communities served by Keentel
                  General Contractors for commercial, residential, industrial,
                  and institutional projects.
                </p>
                <Link href="/service-areas">
                  Explore Florida Service Areas <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            <article className="kcontact-support__card">
              <div className="kcontact-support__media kcontact-support__media--emergency">
                <span>Fire • Water • Storm • Structural</span>
              </div>
              <div className="kcontact-support__body">
                <p className="kcontact-eyebrow">Emergency Restoration Services</p>
                <h3>Restore Your Property with a Clear Recovery Plan</h3>
                <p>
                  Get professional support for fire, water, storm, and
                  structural damage—from initial assessment through
                  reconstruction.
                </p>
                <Link href="/services/emergency-restoration">
                  View Emergency Restoration Services <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="kcontact-faq">
        <div className="kcontact-shell">
          <div className="kcontact-faq__heading">
            <div>
              <p className="kcontact-eyebrow">Construction Consultation FAQs</p>
              <h2>Plan Your First Conversation with Confidence</h2>
            </div>
            <p>
              Find answers about project inquiries, statewide coverage,
              electrical contracting, and what happens after you contact our
              construction team.
            </p>
          </div>
          <div className="kcontact-faq__list">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{faq.question}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="kcontact-faq__footer">
            <span>Still have a question?</span>
            <a href="tel:+18133950000">Call our construction team →</a>
          </div>
        </div>
      </section>

    </div>
  );
}
