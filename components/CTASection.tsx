"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function CTASection() {
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
          <p className="cta-eyebrow">Your next project starts with a conversation.</p>
          <h2 className="cta-title">Your Project Deserves the Right Construction Partner</h2>
          <p className="cta-subtext">At Keentel General Contractors, we combine strategic planning, skilled craftsmanship, and dependable project management to deliver construction solutions that create long-term value.
Let's build your next project with confidence.
</p>
        </div>

        <div className="cta-right">
          <div className="cta-card">
            <a href="tel:8133950000" className="cta-phone">
              
               Contact Us Now

            </a>
            <Link href="/contact#contactformsection" className="cta-btn">Schedule a Consultation</Link>
            <ul className="cta-perks">
              <li className="cta-perk">
                <svg className="cta-perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Free, no-obligation quote
              </li>
              <li className="cta-perk">
                <svg className="cta-perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Florida licensed &amp; fully insured (CGC1524228 &bull; EC13014476)
              </li>
              <li className="cta-perk">
                <svg className="cta-perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
                Available 7 days a week
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
