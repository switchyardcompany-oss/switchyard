"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type ServicesSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function ServicesSection({
  eyebrow = "OUR SERVICES",
  title = "Complete Construction Solutions",
  subtitle = "Keentel General Contractors provides integrated construction services tailored to the unique needs of every project.",
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = section.querySelector(".sec2-header");
            if (header) header.classList.add("sec2-revealed");

            const cards = section.querySelectorAll(".sec2-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("sec2-revealed");
              }, i * 100);
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

  const services = [
    {
      title: "Pre-Construction",
      desc: "Strategic planning, budgeting, scheduling, feasibility reviews, and project planning to build with confidence from day one.",
      icon: "fa-clipboard-list",
      link: "/services/pre-construction",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/9a/c3/7a/15/0e/v1_E10/E109TMD4.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=3a023dd7818f768211c3022ff35b0b7c46c2b59718bf3860d72efc4496042f44",
    },
    {
      title: "Design-Build",
      desc: "A streamlined approach that combines planning, design, and construction under one experienced team for greater efficiency.",
      icon: "fa-pen-ruler",
      link: "/services/design-build",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/bb/d8/da/e9/18/v1_E10/E1075OG6.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=6994e33f704cbaa86866c5615837f447f6ebd9a7cac8a1e0281e3681ac19eee8",
    },
    {
      title: "General Construction",
      desc: "Ground-up construction, building additions, structural improvements, and complete project management from start to finish.",
      icon: "fa-hard-hat",
      link: "/services/general-construction",
      image: "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/12/b7/a7/70/3d/v1_E11/E117XMXQ.jpg?w=800&cf_fit=scale-down&q=85&format=auto&s=20003b9edc31e36d74968f93d6ef0b1e95c10dff80ac15c20849588fae7420b8",
    },
    {
      title: "Commercial Remodeling",
      desc: "Office remodels, tenant improvements, retail spaces, hospitality projects, and commercial property upgrades.",
      icon: "fa-building",
      link: "/services/commercial-remodeling",
      image: "/images/services/commercial-remodeling.webp",
    },
    {
      title: "Residential Remodeling",
      desc: "Whole‑home renovations, kitchen and bath remodels, additions, and custom residential upgrades.",
      icon: "fa-house-chimney",
      link: "/services/residential-remodeling",
      image: "/images/services/residential-remodeling.webp",
    },
    {
      title: "Electrical Contracting",
      desc: "Professional electrical construction and power distribution solutions integrated into commercial and industrial projects.",
      icon: "fa-bolt",
      link: "/services/electrical-contracting",
      image: "/images/services/electrical-contracting.webp",
    },
  ];

  return (
    <section className="sec2-services" id="services" ref={sectionRef}>
      <div className="sec2-container">
        <div className="sec2-header">
          <span className="sec2-eyebrow">{eyebrow}</span>
          <h2 className="sec2-title">{title}</h2>
          <p className="sec2-subtitle">{subtitle}</p>
        </div>

        <div className="sec2-grid">
          {services.map((service, index) => (
            <div key={index} className="sec2-card">
              <div className="sec2-card-image">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />
                <div className="sec2-card-icon">
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
              </div>
              <div className="sec2-card-body">
                <h3 className="sec2-card-title">{service.title}</h3>
                <p className="sec2-card-desc">{service.desc}</p>
                <Link href={service.link} className="sec2-card-link">
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
