"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type CTASectionProps = {
  title?: string;
  subtext?: string;
  primaryCta?: { label: string; href: string };
  perks?: string[];
};

export default function CTASection({
  title = "Your Project Deserves the Right Construction Partner",
  subtext = "At Keentel General Contractors, we combine strategic planning, skilled craftsmanship, and dependable project management to deliver construction solutions that create long-term value.\nLet's build your next project with confidence.\n",
  primaryCta = { label: "Book a Consultation", href: "/contact#contactformsection" },
  perks = ["Florida licensed & fully insured (CGC1524228 • EC13014476)"],
}: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const left = section.querySelector(".cta-left");
            const right = section.querySelector(".cta-right");
            left?.classList.add("cta-revealed");
            right?.classList.add("cta-revealed");
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
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-container">
        <div className="cta-left">
          <h2 className="cta-title">{title}</h2>
          <p className="cta-subtext">{subtext}</p>
        </div>

        <div className="cta-right">
          <div className="cta-card">
            <div className="cta-actions">
              <Link href={primaryCta.href} className="cta-btn">
                {primaryCta.label}
              </Link>
              <a href="tel:8133950000" className="cta-phone">
                Call Now
              </a>
            </div>
            <ul className="cta-perks">
              {perks.map((perk, index) => (
                <li className="cta-perk" key={index}>
                  <svg className="cta-perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
