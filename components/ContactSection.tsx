"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitLead } from "@/lib/lead-client";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const result = await submitLead({
      formSource: "contact-section",
      fullName: data.get("fullName"), email: data.get("email"), phone: data.get("phone"),
      projectType: data.get("projectType"), location: data.get("projectLocation"),
      budget: data.get("budget"), message: data.get("details"),
    });
    if (result.ok) { form.reset(); setStatus("success"); }
    else setStatus("error");
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const left = section.querySelector(".contact-left");
            const right = section.querySelector(".contact-right");
            left?.classList.add("contact-revealed");
            right?.classList.add("contact-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-grid">
          {/* LEFT CONTENT */}
          <div className="contact-left">
            <span className="contact-eyebrow">CONTACT SECTION</span>
            <h2 className="contact-title">START YOUR PROJECT</h2>
            <p className="contact-subtitle">Let's Build Something Great Together</p>
            <p className="contact-desc">
              Whether you're planning a new construction project, expanding an
              existing facility, or renovating a commercial property, Keentel
              General Contractors is ready to help.
            </p>
            <p className="contact-desc">
              Tell us about your project, and our team will provide the guidance,
              planning, and construction expertise you need to move forward with
              confidence.
            </p>
          </div>

          {/* RIGHT FORM – all 8 fields */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" placeholder="John Doe" required />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="john@example.com" required />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" pattern="[0-9()+.\-\s]{10,}" placeholder="(813) 555-0000" required />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="projectType">Project Type</label>
                    <select id="projectType" name="projectType" required>
                    <option value="">Select Type</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="institutional">Institutional</option>
                    <option value="multi-family">Multi‑Family</option>
                    <option value="residential">Large Residential</option>
                    <option value="renovation">Renovation</option>
                    <option value="emergency">Emergency Restoration</option>
                  </select>
                </div>
                <div className="contact-form-group">
                  <label htmlFor="projectLocation">Project Location</label>
                  <input type="text" id="projectLocation" name="projectLocation" placeholder="City, State" />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="budget">Estimated Budget</label>
                    <select id="budget" name="budget">
                    <option value="">Select Budget</option>
                    <option value="under50k">Under $50,000</option>
                    <option value="50k-100k">$50k – $100k</option>
                    <option value="100k-250k">$100k – $250k</option>
                    <option value="250k-500k">$250k – $500k</option>
                    <option value="500k-1m">$500k – $1M</option>
                    <option value="over1m">Over $1M</option>
                  </select>
                </div>
                <div className="contact-form-group">
                  {/* Placeholder for alignment – you could add another field if needed */}
                </div>
              </div>
              <div className="contact-form-group contact-form-group--full">
                <label htmlFor="details">Project Details</label>
                <textarea
                  id="details"
                  name="details"
                  rows={3}
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button type="submit" className="contact-btn">
                Request a Consultation
                <svg
                  className="contact-btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              {status === "success" && <p role="status">Thank you. Your inquiry has been received.</p>}
              {status === "error" && <p role="alert">Please check the required fields or try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
