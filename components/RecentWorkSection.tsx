"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function RecentWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = section.querySelector(".recent-header");
            const cards = section.querySelectorAll(".recent-card");

            if (header && !header.classList.contains("recent-revealed")) {
              header.classList.add("recent-revealed");
            }
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("recent-revealed");
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="recent-section" ref={sectionRef}>
      <div className="recent-container">
        <div className="recent-header">
          <div className="recent-header-left">
            <h2 className="recent-title">
              Featured Construction Projects Built to <span style={{ color: "#a6238f" }}>Last</span>.
            </h2>
          </div>
          <Link href="/projects" className="recent-view-all">
            View All Projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="recent-grid">
          {/* Project 1 */}
          <div className="recent-card">
            <div className="recent-card-image">
              <img src="/images/recent-work/homeward-bound.jpeg" alt="Multi-family housing development under construction" loading="lazy" />
              <div className="recent-card-overlay">
                <span className="recent-card-category">Multi-Family</span>
                <h3 className="recent-card-title">Housing Development</h3>
              </div>
            </div>
          </div>
          {/* Project 2 */}
          <div className="recent-card">
            <div className="recent-card-image">
              <img src="/images/recent-work/jonathans-place.jpeg" alt="Completed multi-family apartment building" loading="lazy" />
              <div className="recent-card-overlay">
                <span className="recent-card-category">Multi-Family</span>
                <h3 className="recent-card-title">Apartment Community</h3>
              </div>
            </div>
          </div>
          {/* Project 3 */}
          <div className="recent-card">
            <div className="recent-card-image">
              <img src="/images/recent-work/multifamily-community.jpeg" alt="Multi-family housing foundation construction" loading="lazy" />
              <div className="recent-card-overlay">
                <span className="recent-card-category">Multi-Family</span>
                <h3 className="recent-card-title">Community Expansion</h3>
              </div>
            </div>
          </div>
          {/* Project 4 */}
          <div className="recent-card">
            <div className="recent-card-image">
              <img src="https://www.belvanconstruction.com/wp-content/themes/belvan-construction/img/inner-commercial-services/Retail%20Store-1.png" alt="Commercial renovation" loading="lazy" />
              <div className="recent-card-overlay">
                <span className="recent-card-category">Renovation</span>
                <h3 className="recent-card-title">Retail Storefront</h3>
              </div>
            </div>
          </div>
          {/* Project 5 */}
          <div className="recent-card">
            <div className="recent-card-image">
              <img src="/images/recent-work/multifamily-aerial.jpeg" alt="Completed multi-family residential community" loading="lazy" />
              <div className="recent-card-overlay">
                <span className="recent-card-category">Multi-Family</span>
                <h3 className="recent-card-title">Residential Community</h3>
              </div>
            </div>
          </div>
          {/* Project 6 */}
          <div className="recent-card">
            <div className="recent-card-image">
              <img src="https://cdn.prod.website-files.com/67b63dcbadb8f1376005d51f/68111103651e4854a9fba6e3_m50%20storm%20damage.jpg" alt="Emergency restoration" loading="lazy" />
              <div className="recent-card-overlay">
                <span className="recent-card-category">Emergency</span>
                <h3 className="recent-card-title">Storm Recovery</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
