"use client";

import { useEffect, useRef } from "react";

type Stat = {
  label: string;
  value: string;
  countTo?: number;
  suffix?: string;
};

type LocalAreaSectionProps = {
  stats: Stat[];
  heading: string;
  paragraphs: string[];
  cities: string[];
};

export default function LocalAreaSection({
  stats,
  heading,
  paragraphs,
  cities,
}: LocalAreaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.querySelectorAll(".la-stat").forEach((el, i) => {
              setTimeout(() => el.classList.add("la-revealed"), i * 100);
            });
            section.querySelector(".la-text")?.classList.add("la-revealed");
            section.querySelector(".la-cities")?.classList.add("la-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const targets = section.querySelectorAll(".la-count-target");
          targets.forEach((targetEl) => {
            const el = targetEl as HTMLElement;
            const target = parseInt(el.getAttribute("data-count") || "0", 10);
            const duration = 1800;
            const startTime = performance.now();

            const update = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(target * eased).toString();
              if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
          });
          countObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    countObserver.observe(section);

    return () => {
      observer.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return (
    <section className="la-section" ref={sectionRef}>
      <div className="la-container">
        <div className="la-stats">
          {stats.map((stat, index) => (
            <div className="la-stat" key={index}>
              <div className="la-stat-value">
                {stat.countTo ? (
                  <span className="la-count-target" data-count={stat.countTo}>
                    0
                  </span>
                ) : (
                  stat.value
                )}
                {stat.suffix}
              </div>
              <div className="la-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="la-split">
          <div className="la-text">
            <span className="la-eyebrow">LOCAL KNOWLEDGE</span>
            <h2 className="la-heading">{heading}</h2>
            {paragraphs.map((p, index) => (
              <p className="la-paragraph" key={index}>
                {p}
              </p>
            ))}
          </div>
          <div className="la-cities">
            <h3 className="la-cities-heading">Cities &amp; Communities We Serve</h3>
            <ul className="la-cities-grid">
              {cities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
