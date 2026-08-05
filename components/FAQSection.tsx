"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqs?: FAQItem[];
  eyebrow?: string;
  titleLines?: [string, string];
  subtitle?: string;
  showAllLink?: boolean;
};

export const defaultFaqs: FAQItem[] = [
  { question: "What types of projects do you specialize in?", answer: "Commercial, industrial, institutional, multi-family, and large residential construction projects." },
  { question: "Do you provide design-build services?", answer: "Yes. We manage planning, design coordination, and construction through one integrated team." },
  { question: "Can you manage the entire construction project?", answer: "Absolutely. We oversee planning, scheduling, coordination, construction, quality control, and project closeout." },
  { question: "Do you perform commercial renovations?", answer: "Yes. We complete office renovations, retail build-outs, tenant improvements, hospitality projects, and facility upgrades." },
  { question: "Do you offer emergency restoration services?", answer: "Yes. We provide restoration and reconstruction following fire, storm, water, and structural damage." },
  { question: "Can electrical services be included in my project?", answer: "Yes. Electrical contracting is available as part of our integrated construction services or as a standalone solution." },
  { question: "What areas do you serve?", answer: "We serve all 67 counties in Florida, with a primary base in Tampa Bay and surrounding regions." },
  { question: "How do you handle project budgeting?", answer: "We provide transparent estimates, track costs throughout the project, and work to keep your budget on target without compromising quality." },
  { question: "Do you offer warranties on your work?", answer: "Yes. We stand behind our work with comprehensive warranties and a commitment to client satisfaction." },
  { question: "How long does a typical project take?", answer: "Timelines vary based on scope and complexity. We'll provide a detailed schedule during the planning phase and keep you updated at every stage." },
];

export default function FAQSection({
  faqs = defaultFaqs,
  eyebrow,
  titleLines = ["Construction Questions,", "Answered."],
  subtitle = "Clear answers to the questions clients ask most often before starting a construction project.",
  showAllLink = true,
}: FAQSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const openIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = section.querySelector(".faq-header");
            const items = section.querySelectorAll(".faq-item");
            if (header) header.classList.add("faq-revealed");
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add("faq-revealed"), 150 + i * 100);
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

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        const current = openIndexRef.current;
        if (current !== null) {
          const el = answerRefs.current.get(current);
          if (el) {
            el.style.maxHeight = "0px";
            el.parentElement?.classList.remove("faq-open");
          }
          openIndexRef.current = null;
        }
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const toggle = (index: number) => {
    const prev = openIndexRef.current;
    const answerEl = answerRefs.current.get(index);
    if (!answerEl) return;

    if (prev !== null && prev !== index) {
      const prevAnswer = answerRefs.current.get(prev);
      if (prevAnswer) {
        prevAnswer.style.maxHeight = "0px";
        prevAnswer.parentElement?.classList.remove("faq-open");
      }
    }

    if (prev === index) {
      answerEl.style.maxHeight = "0px";
      answerEl.parentElement?.classList.remove("faq-open");
      openIndexRef.current = null;
    } else {
      answerEl.style.maxHeight = answerEl.scrollHeight + 20 + "px";
      answerEl.parentElement?.classList.add("faq-open");
      openIndexRef.current = index;
    }
  };

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="faq-container">
        <div className="faq-layout">
          <aside className="faq-header">
            {eyebrow && <span className="faq-eyebrow">{eyebrow}</span>}
            <h2 className="faq-title">
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </h2>
            <p className="faq-subtitle">{subtitle}</p>
            <div className="faq-cta-wrapper">
              <Link href="/contact#contactformsection" className="faq-cta">
                Ask Us Directly
                <svg className="faq-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </aside>

          <div className="faq-content">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  data-faq-index={index}
                  className="faq-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggle(index);
                  }}
                >
                  <div className="faq-question">
                    <span className="faq-question-copy">
                      <strong className="faq-number">{String(index + 1).padStart(2, "0")}</strong>
                      <span>{faq.question}</span>
                    </span>
                    <span className="faq-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </div>
                  <div
                    className="faq-answer"
                    ref={(el) => {
                      if (el) answerRefs.current.set(index, el);
                      else answerRefs.current.delete(index);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {showAllLink && (
              <div className="faq-all-link">
                <Link href="/faq">View All FAQs</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
