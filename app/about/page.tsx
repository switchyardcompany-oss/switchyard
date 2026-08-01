'use client';

import { useEffect, useRef, useState } from 'react';
import ServicesSection from '@/components/ServicesSection';
import IndustriesCarousel from '@/components/IndustriesCarousel';
import WhyKeentel from '@/components/WhyKeentel';
import ServiceHeroCredentials from '@/components/ServiceHeroCredentials';
import './about.css';

export default function AboutPage() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // IntersectionObserver for section reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setRevealed((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const currentSections = sectionsRef.current.filter(Boolean) as HTMLElement[];
    currentSections.forEach((el) => observer.observe(el));

    return () => {
      currentSections.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Stats number animation
  useEffect(() => {
    if (revealed.has('about-stats') && !statsAnimated) {
      setStatsAnimated(true);
      const numbers = document.querySelectorAll('.about-stats-number');
      numbers.forEach((num) => {
        const target = parseInt(num.getAttribute('data-target') || '0', 10);
        const suffix = num.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();

        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          num.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };
        requestAnimationFrame(update);
      });
    }
  }, [revealed, statsAnimated]);

  const isRevealed = (id: string) => revealed.has(id);

  // Helper to generate staggered delays for text elements
  const getDelay = (index: number) => `${0.1 + index * 0.08}s`;

  return (
    <div className="about-page">
      {/* ==================== HERO ==================== */}
      <section
        id="about-hero"
        ref={(el) => { sectionsRef.current[0] = el; }}
        className={`about-hero ${isRevealed('about-hero') ? 'about-reveal' : ''}`}
      >
        <div className="about-hero-media" aria-hidden="true">
          <video
            className="about-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/Video/about-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="about-hero-overlay" />
        <div className="about-hero-inner">
          <div className="about-hero-content">
            <p className="about-hero-eyebrow animate-text" style={{ animationDelay: getDelay(0) }}>
              <span className="about-hero-eyebrow-dot" aria-hidden="true" />
              KEENTEL GENERAL CONTRACTORS
            </p>
            <h1 className="about-hero-title animate-text" style={{ animationDelay: getDelay(1) }}>
              <span className="about-hero-title-line">
                Building with <span className="about-hero-highlight">Purpose</span>.
              </span>
              <span className="about-hero-title-line">
                Delivering with <span className="about-hero-highlight">Confidence</span>.
              </span>
            </h1>
            <p className="about-hero-text animate-text" style={{ animationDelay: getDelay(2) }}>
              We partner with developers, businesses, property owners, and institutions to deliver
              commercial, industrial, and large-scale residential construction projects that are built
              to perform today and create value for years to come.
            </p>
            <div className="service-hero-bottom-row">
              <div className="about-hero-buttons animate-text" style={{ animationDelay: getDelay(3) }}>
                <a href="/contact#contactformsection" className="about-hero-cta">
                  Book a Consultation
                </a>
                <a href="tel:8133950000" className="about-hero-cta about-hero-cta--secondary">
                  Call Us
                </a>
              </div>
              <ServiceHeroCredentials />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHO WE ARE ==================== */}
      <section
        id="about-who"
        ref={(el) => { sectionsRef.current[1] = el; }}
        className={`about-who ${isRevealed('about-who') ? 'about-reveal' : ''}`}
      >
        <div className="about-who-container">
          <div className="about-who-image-wrap">
            <img
              src="/images/home/Construction%20Partner.jpg"
              alt="Construction professional reviewing project plans on site"
            />
            <div className="about-who-badge">
              <span>Licensed Contractor</span>
            </div>
          </div>
          <div className="about-who-text">
            <span className="about-who-section-tag animate-text" style={{ animationDelay: getDelay(0) }}>Who We Are</span>
            <h2 className="about-who-heading animate-text" style={{ animationDelay: getDelay(1) }}>A Trusted Construction Partner</h2>
            <p className="about-who-large animate-text" style={{ animationDelay: getDelay(2) }}>
              Keentel General Contractors is a full-service construction company providing professional
              project planning, construction management, design-build services, commercial renovations,
              industrial construction, electrical contracting, and emergency restoration.
            </p>
            <p className="about-who-sub animate-text" style={{ animationDelay: getDelay(3) }}>
              We bring together experienced project management, coordinated trade execution, and a
              commitment to quality, allowing clients to work with one trusted construction partner
              from concept through completion.
            </p>
            <p className="about-who-sub animate-text" style={{ animationDelay: getDelay(4) }}>
              At Keentel General Contractors, we believe every successful project begins with thoughtful
              planning, disciplined execution, and complete accountability. Whether it's new construction,
              a complex renovation, a design-build project, or a facility expansion, our focus remains the
              same—deliver quality work, maintain clear communication, and keep every project moving forward.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== STATS STRIP ==================== */}
      <section
        id="about-stats"
        ref={(el) => { sectionsRef.current[2] = el; }}
        className={`about-stats ${isRevealed('about-stats') ? 'about-reveal' : ''}`}
      >
        <div className="about-stats-inner">
          <div className="about-stats-grid">
            <div className="about-stats-card">
              <div className="about-stats-number-wrapper">
                <span className="about-stats-number" data-target="500" data-suffix="+">0</span>
              </div>
              <p className="about-stats-label">Projects Completed</p>
            </div>
            <div className="about-stats-card">
              <div className="about-stats-number-wrapper">
                <span className="about-stats-number" data-target="30" data-suffix="+">0</span>
              </div>
              <p className="about-stats-label">Years of Industry Experience</p>
            </div>
            <div className="about-stats-card">
              <div className="about-stats-number-wrapper">
                <span className="about-stats-number" data-target="10" data-suffix="+">0</span>
              </div>
              <p className="about-stats-label">Construction Services</p>
            </div>
            <div className="about-stats-card">
              <div className="about-stats-number-wrapper">
                <span className="about-stats-number" data-target="100" data-suffix="%">0</span>
              </div>
              <p className="about-stats-label">Commitment to Quality &amp; Safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OUR SERVICES ==================== */}
      <ServicesSection />

      {/* ==================== VALUES (What We Stand For) ==================== */}
      <section
        id="about-values"
        ref={(el) => { sectionsRef.current[4] = el; }}
        className={`about-values ${isRevealed('about-values') ? 'about-reveal' : ''}`}
      >
        <div className="about-values-layout">
          <div className="about-values-intro">
            <span className="about-values-tag animate-text" style={{ animationDelay: getDelay(0) }}>
              What We Stand For
            </span>
            <h2 className="about-values-title animate-text" style={{ animationDelay: getDelay(1) }}>
              Our <span>Core Principles</span>
            </h2>
            <p className="about-values-summary animate-text" style={{ animationDelay: getDelay(2) }}>
              The standards that guide how we plan, communicate, and deliver every construction project.
            </p>
            <div className="about-values-note animate-text" style={{ animationDelay: getDelay(3) }}>
              <strong>Why It Matters</strong>
              <p>
                Strong construction results come from consistent standards, clear ownership,
                safe practices, and trusted partnerships at every stage.
              </p>
            </div>
          </div>

          <div className="about-values-grid">
            <article className="about-value-card animate-text" style={{ animationDelay: getDelay(2) }}>
              <div className="about-value-card-top"><span>Q</span><small>01</small></div>
              <h3>Quality</h3>
              <p>Every project is delivered with attention to workmanship, performance, and long-term durability.</p>
            </article>
            <article className="about-value-card animate-text" style={{ animationDelay: getDelay(3) }}>
              <div className="about-value-card-top"><span>A</span><small>02</small></div>
              <h3>Accountability</h3>
              <p>We take ownership of planning, coordination, communication, and execution from beginning to end.</p>
            </article>
            <article className="about-value-card animate-text" style={{ animationDelay: getDelay(4) }}>
              <div className="about-value-card-top"><span>S</span><small>03</small></div>
              <h3>Safety</h3>
              <p>Protecting people, property, and the job site remains a priority throughout every phase of construction.</p>
            </article>
            <article className="about-value-card animate-text" style={{ animationDelay: getDelay(5) }}>
              <div className="about-value-card-top"><span>C</span><small>04</small></div>
              <h3>Collaboration</h3>
              <p>Successful projects are built through strong partnerships with owners, consultants, subcontractors, and stakeholders.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== INDUSTRIES WE SERVE ==================== */}
      <IndustriesCarousel />

      {/* ==================== WHY CHOOSE KEENTEL + PROJECT FORM ==================== */}
      <WhyKeentel />

      {/* ==================== FINAL CTA ==================== */}
      <section
        id="about-cta"
        ref={(el) => { sectionsRef.current[8] = el; }}
        className={`about-cta ${isRevealed('about-cta') ? 'about-reveal' : ''}`}
      >
        <div className="about-cta-content">
          <div className="about-cta-copy">
            <span className="about-cta-eyebrow animate-text" style={{ animationDelay: getDelay(0) }}>
              Your Construction Partner
            </span>
            <h2 className="about-cta-title animate-text" style={{ animationDelay: getDelay(1) }}>
              Let&apos;s Build Something <span>That Lasts</span>
            </h2>
            <p className="about-cta-text animate-text" style={{ animationDelay: getDelay(2) }}>
              The right contractor does more than complete construction—they provide leadership,
              solve problems, coordinate people, and protect the success of the entire project.
            </p>
            <div className="about-cta-trust animate-text" style={{ animationDelay: getDelay(3) }}>
              <span>Licensed &amp; Insured</span>
              <span>One Accountable Team</span>
              <span>Built for Long-Term Value</span>
            </div>
          </div>
          <div className="about-cta-actions animate-text" style={{ animationDelay: getDelay(4) }}>
            <a href="/contact#contactformsection" className="about-cta-btn">
              <span>Book a Consultation</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="tel:8133950000" className="about-cta-btn about-cta-btn--call">
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
