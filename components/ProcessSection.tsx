"use client";

import { useEffect, useRef } from "react";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = section.querySelector(".proc-header");
            const steps = section.querySelectorAll(".proc-step");

            if (header) header.classList.add("proc-revealed");
            steps.forEach((step, i) => {
              setTimeout(() => step.classList.add("proc-revealed"), 150 + i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { number: "01", title: "Discover", desc: "Understand your goals, budget, and project requirements." },
    { number: "02", title: "Plan", desc: "Develop schedules, budgets, and construction strategies." },
    { number: "03", title: "Coordinate", desc: "Manage trades, materials, permits, and logistics." },
    { number: "04", title: "Build", desc: "Execute construction with quality, safety, and precision." },
    { number: "05", title: "Deliver", desc: "Complete inspections, closeout, and project handover." },
  ];

  return (
    <section className="proc-section" ref={sectionRef}>
      <div className="proc-container">
        <div className="proc-header">
          <h2 className="proc-title">Our Construction Process</h2>
          <p className="proc-subtitle">A Proven Process From Start to Finish</p>
        </div>

        <div className="proc-steps">
          {steps.map((step, index) => (
            <div key={index} className="proc-step">
              <div className="proc-step-circle">
                <span className="proc-step-number">{step.number}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="proc-step-line" aria-hidden="true"></div>
              )}
              <div className="proc-step-content">
                <h3 className="proc-step-title">{step.title}</h3>
                <p className="proc-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
