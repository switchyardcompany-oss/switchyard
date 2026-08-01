"use client";

import { useEffect, useRef } from "react";
import ContactSection from "@/components/ContactSection";

type WhyReason = { title: string; desc: string };

type WhyKeentelProps = {
  title?: string;
  highlight?: string;
  subtitle?: string;
  reasons?: WhyReason[];
  formTitle?: string;
  formSubtitle?: string;
};

const defaultReasons: WhyReason[] = [
  {
    title: "One Accountable Team",
    desc: "One trusted partner managing every stage of construction.",
  },
  {
    title: "Clear Communication",
    desc: "Regular updates, transparent timelines, and proactive problem-solving.",
  },
  {
    title: "Quality Workmanship",
    desc: "Attention to detail throughout every phase of construction.",
  },
  {
    title: "Safety First",
    desc: "Safe job sites, professional practices, and responsible project management.",
  },
  {
    title: "Reliable Scheduling",
    desc: "Efficient planning that keeps projects moving forward.",
  },
  {
    title: "Long-Term Relationships",
    desc: "Focused on delivering value beyond project completion.",
  },
];

export default function WhyKeentel({
  title = "Why Clients Choose Keentel:",
  highlight = "Better Project Delivery",
  subtitle = "Construction success depends on planning, communication, and accountability. That's why every project is managed with a structured process designed to reduce risk, improve efficiency, and deliver exceptional results.",
  reasons = defaultReasons,
  formTitle = "Let's Discuss Your Next Project",
  formSubtitle = "Share your project details and our construction team will follow up with the right next steps.",
}: WhyKeentelProps) {
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

  return (
    <section className="whyk2-section" ref={sectionRef}>
      <div className="whyk2-container">
        <div className="whyk2-split">
          <div className="whyk2-content">
            <div className="whyk2-header">
              <h2 className="whyk2-title">
                {title} <span className="whyk2-highlight">{highlight}</span>
              </h2>
              <p className="whyk2-subtitle">{subtitle}</p>
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
              <h2>{formTitle}</h2>
              <p>{formSubtitle}</p>
            </div>
            <ContactSection />
          </div>
        </div>
      </div>
    </section>
  );
}
