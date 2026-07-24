"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function IndustriesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate the content for seamless looping
    const items = track.querySelectorAll(".indus-card");
    const cloneItems = Array.from(items).map((item) => item.cloneNode(true));
    cloneItems.forEach((clone) => track.appendChild(clone));

    // Pause animation on hover
    const carousel = track.closest(".indus-carousel");
    const pause = () => track.style.animationPlayState = "paused";
    const resume = () => track.style.animationPlayState = "running";
    carousel?.addEventListener("mouseenter", pause);
    carousel?.addEventListener("mouseleave", resume);

    return () => {
      carousel?.removeEventListener("mouseenter", pause);
      carousel?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const industries = [
    { name: "Commercial Offices", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
    { name: "Industrial & Manufacturing", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop" },
    { name: "Warehousing & Distribution", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" },
    { name: "Retail & Mixed-Use", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" },
    { name: "Restaurants & Hospitality", img: "/images/industries/restaurants-hospitality-v2.webp" },
    { name: "Healthcare", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop" },
    { name: "Education & Institutional", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop" },
    { name: "Multi-Family", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop" },
    { name: "Large Residential", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop" },
  ];

  return (
    <section className="indus-section">
      <div className="indus-container">
        <div className="indus-header">
          <span className="indus-eyebrow">INDUSTRIES WE SERVE</span>
          <h2 className="indus-title">Construction Experience Across Multiple Industries</h2>
          <p className="indus-subtitle">
            We understand the unique requirements of every sector and deliver solutions
            that support long-term operational success.
          </p>
        </div>

        <div className="indus-carousel">
          <div className="indus-track" ref={trackRef}>
            {industries.map((item, index) => (
              <div key={index} className="indus-card">
                <img src={item.img} alt={item.name} className="indus-card-img" />
                <div className="indus-card-overlay">
                  <h3 className="indus-card-title">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="indus-cta-wrapper">
          <Link href="/industries" className="indus-cta">
            Explore Industries
            <svg className="indus-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
