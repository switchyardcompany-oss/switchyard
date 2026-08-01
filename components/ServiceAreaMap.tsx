"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function ServiceAreaMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contentRef.current?.classList.add("sec3-revealed");
            visualRef.current?.classList.add("sec3-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    const regions = section.querySelectorAll(".sec3-region");
    regions.forEach((region) => {
      const link = region.getAttribute("data-link");
      if (link) {
        region.addEventListener("click", () => {
          window.location.href = link;
        });
      }
      region.setAttribute("title", region.getAttribute("data-area") || "");
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="sec3-area" ref={sectionRef}>
      <div className="sec3-area__inner">
        <div className="sec3-area__content" ref={contentRef}>
          <h2 className="sec3-area__title">Our Service Areas: General Contracting Across<br />Tampa Bay &amp; Florida</h2>
          <p className="sec3-area__desc">
            Based in Tampa, Keentel General Contractors delivers licensed construction services throughout Tampa Bay and all 67 Florida counties. Our team supports commercial, industrial, institutional, multi-family, and large residential projects with coordinated planning, dependable project management, and consistent quality from pre-construction through closeout.
          </p>
          <p className="sec3-area__desc" style={{ display: "none" }} aria-hidden="true">
            <strong>Primary Base:</strong> Hillsborough · Pinellas · Pasco · Polk · Hernando · Manatee · Sarasota<br />
            <strong>Statewide:</strong> Miami-Dade · Broward · Palm Beach · Orange · Duval · Brevard · Lee · Collier · Alachua · Volusia · and all remaining Florida counties
          </p>
          <div className="sec3-area__actions">
            <a href="tel:8133950000" className="sec3-area__btn">
              <svg className="sec3-area__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us Now
            </a>
            
          </div>
        </div>

        <div className="sec3-area__visual" ref={visualRef}>
          <div className="sec3-area__map-wrapper">
            <div className="sec3-area__map-image">
              <img src="/assets/map3.png" alt="Tampa Bay aerial view" loading="lazy" />
            </div>

            <svg className="sec3-area__map-overlay" viewBox="0 0 640 520" preserveAspectRatio="xMidYMid meet">
              <polygon className="sec3-region" data-area="Citrus" data-link="/service-areas/citrus" points="70,50 210,45 210,85 140,100 85,90" />
              <polygon className="sec3-region" data-area="Hernando" data-link="/service-areas/hernando" points="210,45 260,65 260,110 230,120 210,85" />
              <polygon className="sec3-region" data-area="Pasco" data-link="/service-areas/pasco" points="210,85 260,110 290,150 250,185 200,155 190,120" />
              <polygon className="sec3-region" data-area="Pinellas" data-link="/service-areas/pinellas" points="100,230 190,210 200,240 190,320 110,300" />
              <polygon className="sec3-region" data-area="Hillsborough" data-link="/service-areas/hillsborough" points="190,120 250,185 290,150 340,180 370,240 350,300 290,320 250,280 200,235" />
              <circle className="sec3-region sec3-region--tampa" data-area="Tampa" data-link="/service-areas/tampa" cx="275" cy="240" r="22" />
              <polygon className="sec3-region" data-area="Polk" data-link="/service-areas/polk" points="340,180 430,160 460,210 450,270 410,300 370,240" />
              <polygon className="sec3-region" data-area="Manatee" data-link="/service-areas/manatee" points="290,320 350,300 370,350 340,400 290,400 250,350" />
              <polygon className="sec3-region" data-area="Sarasota" data-link="/service-areas/sarasota" points="250,350 290,400 320,440 280,470 220,450 200,410" />

              <text x="110" y="75" className="sec3-label">Citrus</text>
              <text x="235" y="85" className="sec3-label">Hernando</text>
              <text x="240" y="145" className="sec3-label">Pasco</text>
              <text x="135" y="280" className="sec3-label">Pinellas</text>
              <text x="275" y="245" className="sec3-label sec3-label--tampa">Tampa</text>
              <text x="315" y="215" className="sec3-label">Hillsborough</text>
              <text x="400" y="215" className="sec3-label">Polk</text>
              <text x="320" y="350" className="sec3-label">Manatee</text>
              <text x="270" y="435" className="sec3-label">Sarasota</text>
            </svg>

            <div className="sec3-area__badge-floating">
              <svg className="sec3-area__badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21c-2-4-6-6.5-6-10.5a6 6 0 1 1 12 0c0 4-4 6.5-6 10.5z" />
              </svg>
              <span>Service Areas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
