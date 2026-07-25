"use client";

import { useEffect, useRef } from "react";
import ContactSection from "@/components/ContactSection";

export default function WhyKeentel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = section.querySelector(".whyk2-header");
            const cards = section.querySelectorAll(".whyk2-card");

            if (header) header.classList.add("whyk2-revealed");
            cards.forEach((card, i) => {
              setTimeout(() => card.classList.add("whyk2-revealed"), 150 + i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      title: "One Accountable Team",
      desc: "One trusted partner managing every stage of construction.",
      icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    },
    {
      title: "Clear Communication",
      desc: "Regular updates, transparent timelines, and proactive problem-solving.",
      icon: "M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z",
    },
    {
      title: "Quality Workmanship",
      desc: "Attention to detail throughout every phase of construction.",
      icon: "M12 2l2.3 6.9h7.4l-6 4.4 2.3 6.9-6-4.4-6 4.4 2.3-6.9-6-4.4h7.4z",
    },
    {
      title: "Safety First",
      desc: "Safe job sites, professional practices, and responsible project management.",
      icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    },
    {
      title: "Reliable Scheduling",
      desc: "Efficient planning that keeps projects moving forward.",
      icon: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z",
    },
    {
      title: "Long-Term Relationships",
      desc: "Focused on delivering value beyond project completion.",
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    },
  ];

  return (
    <section className="whyk2-section" ref={sectionRef}>
      <div className="whyk2-container">
        <div className="whyk2-split">
          <div className="whyk2-content">
            <div className="whyk2-header">
              <span className="whyk2-eyebrow">WHY CHOOSE KEENTEL</span>
              <h2 className="whyk2-title">
                Built Around <span className="whyk2-highlight">Better Project Delivery</span>
              </h2>
              <p className="whyk2-subtitle">
                Construction success depends on planning, communication, and accountability.
                That&apos;s why every project is managed with a structured process designed to
                reduce risk, improve efficiency, and deliver exceptional results.
              </p>
            </div>

            <div className="whyk2-grid">
              {reasons.map((item, index) => (
                <div key={index} className="whyk2-card">
                  <div className="whyk2-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="whyk2-card-copy">
                    <h3 className="whyk2-card-title">{item.title}</h3>
                    <p className="whyk2-card-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="whyk2-form-panel" id="contactformsection">
            <div className="whyk2-form-intro">
              <span>Start a Conversation</span>
              <h2>Let&apos;s Discuss Your Next Project</h2>
              <p>Share your project details and our construction team will follow up with the right next steps.</p>
            </div>
            <ContactSection />
          </div>
        </div>
      </div>
    </section>
  );
}
