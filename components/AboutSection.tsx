"use client";

import { useEffect, useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-revealed");
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll(".about-animate");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* LEFT CONTENT */}
          <div className="about-content about-animate">
            <h2 className="about-title">
              About Keentel: Built on Trust. <br />
              <span style={{ color: "var(--color-magenta)" }}>Driven by Quality.</span>
            </h2>
            <p className="about-description">
              At Keentel General Contractors, we believe great construction starts
              with great planning. Every project is managed with a commitment to
              quality workmanship, clear communication, and dependable execution.
            </p>
            <p className="about-description">
              Whether you're developing a new commercial facility, expanding an
              industrial operation, renovating an existing property, or planning a
              large residential project, our team works alongside you from planning
              through final completion.
            </p>
            <a href="/about" className="about-cta">
              Learn More About Keentel General Contractors
              <svg
                className="about-cta-icon"
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
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="about-image about-animate">
            {/* Replace with your actual image */}
            <img
              src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/ea/d7/1f/ac/10/v1_E10/E1030PYN.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=c250d4c402cd9ba32da6476b26a185e6dad9601df8c0c1cf66d6249d69211c08"
              alt="Keentel General Contractors team at work"
              className="about-image__img"
            />
            <div className="about-image__overlay"></div>
            <div className="about-image__badge">
              <span className="about-image__badge-number">Licensed</span>
              <span className="about-image__badge-text">Contractor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
