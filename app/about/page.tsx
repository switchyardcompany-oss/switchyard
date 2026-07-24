'use client';

import React, { useEffect, useRef, useState } from 'react';
import './about.css';

// Industry icons (inline SVG, Font Awesome style)
const industryIcons: Record<string, React.ReactNode> = {
  'Commercial Offices': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="10" />
      <line x1="15" y1="6" x2="15" y2="10" />
      <line x1="9" y1="14" x2="9" y2="18" />
      <line x1="15" y1="14" x2="15" y2="18" />
    </svg>
  ),
  'Industrial & Manufacturing': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" />
      <path d="M5 20V8l5-4 4 4 5-4v12" />
      <rect x="8" y="10" width="3" height="6" rx="1" />
      <rect x="13" y="10" width="3" height="6" rx="1" />
    </svg>
  ),
  'Warehousing & Distribution': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'Retail & Mixed-Use': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  'Restaurants & Hospitality': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  'Healthcare': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  'Educational & Institutional': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-7 10 7-10 7z" />
      <path d="M6 12v6a4 4 0 008 0v-6" />
    </svg>
  ),
  'Multi-Family Developments': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="8" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  'Large Residential Projects': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'Manufacturing': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" />
      <path d="M5 20V8l5-4 4 4 5-4v12" />
      <rect x="8" y="10" width="3" height="6" rx="1" />
      <rect x="13" y="10" width="3" height="6" rx="1" />
    </svg>
  ),
  'Warehouses': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'Government': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
};

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

  // 12 industries total (original 9 + 3 new)
  const industriesList = [
    'Commercial Offices', 'Industrial & Manufacturing', 'Warehousing & Distribution',
    'Retail & Mixed-Use', 'Restaurants & Hospitality', 'Healthcare',
    'Educational & Institutional', 'Multi-Family Developments', 'Large Residential Projects',
    'Manufacturing', 'Warehouses', 'Government'
  ];

  // Services for "What We Build"
  const servicesList = [
    'Commercial Construction',
    'Industrial Construction',
    'Design-Build Projects',
    'Tenant Improvements',
    'Commercial Renovations',
    'Facility Expansions',
    'Multi-Family Developments',
    'Large Residential Projects',
    'Electrical Contracting',
    'Emergency Restoration'
  ];

  // Helper to generate staggered delays for text elements
  const getDelay = (index: number) => `${0.1 + index * 0.08}s`;

  return (
    <div className="about-page">
      {/* ==================== HERO ==================== */}
      <section
        id="about-hero"
        ref={(el) => { sectionsRef.current[0] = el; }}
        className={`about-hero ${isRevealed('about-hero') ? 'about-reveal' : ''}`}
        style={{ backgroundImage: 'url(https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/31/e6/5e/a0/99/v1_E10/E10AODH5.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=691a14be367a59479a92ca106664d048c36c1cac68848bc51abfe0a241646e08)' }}
      >
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <p className="about-hero-eyebrow animate-text" style={{ animationDelay: getDelay(0) }}>KEENTEL GENERAL CONTRACTORS</p>
          <h1 className="about-hero-title animate-text" style={{ animationDelay: getDelay(1) }}>
            Building with <span className="about-hero-highlight">Purpose</span>.<br />
            Delivering with <span className="about-hero-highlight">Confidence</span>.
          </h1>
          <p className="about-hero-text animate-text" style={{ animationDelay: getDelay(2) }}>
            We partner with developers, businesses, property owners, and institutions to deliver
            commercial, industrial, and large-scale residential construction projects that are built
            to perform today and create value for years to come.
          </p>
          <div className="about-hero-buttons animate-text" style={{ animationDelay: getDelay(3) }}>
            <a href="/contact" className="about-hero-cta">
              <span>Book a Consultation</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/services" className="about-hero-cta about-hero-cta--secondary">
              <span>Explore Our Services</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
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
              src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/84/c9/13/0b/9b/v1_E10/E101J44K.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=0cb8c743abc07f205dd48e96db18cb92b78e72898154f01fe0d17fa706c5e333"
              alt="Keentel team"
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

      {/* ==================== WHAT WE BUILD ==================== */}
<section
  id="about-build"
  ref={(el) => { sectionsRef.current[3] = el; }}
  className={`about-build ${isRevealed('about-build') ? 'about-reveal' : ''}`}
>
  <div className="about-build-container">
    <div className="about-build-grid-2col">
      {/* LEFT: text */}
      <div className="about-build-left">
        <span className="about-build-tag animate-text" style={{ animationDelay: getDelay(0) }}>
          What We Build
        </span>
        <h2 className="about-build-heading animate-text" style={{ animationDelay: getDelay(1) }}>
          Our Construction Services
        </h2>
        <p className="about-build-sub animate-text" style={{ animationDelay: getDelay(2) }}>
          Our team delivers construction solutions across a wide range of project types,
          each supported by the same commitment to quality, safety, and professional
          project delivery.
        </p>
        <a href="/services" className="about-build-cta animate-text" style={{ animationDelay: getDelay(3) }}>
          Explore All Services
          <span aria-hidden="true">→</span>
        </a>
      </div>
      {/* RIGHT: service list */}
      <div className="about-build-right">
        <ul className="about-build-list">
          {servicesList.map((service, idx) => (
            <li key={idx} className="about-build-item animate-text" style={{ animationDelay: getDelay(3 + idx * 0.06) }}>
              <span className="about-build-item-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="about-build-item-content">
                <span className="about-build-item-number">{String(idx + 1).padStart(2, '0')}</span>
                <span className="about-build-item-name">{service}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* ==================== VALUES (What We Stand For) ==================== */}
      <section
        id="about-values"
        ref={(el) => { sectionsRef.current[4] = el; }}
        className={`about-values ${isRevealed('about-values') ? 'about-reveal' : ''}`}
      >
        <div className="about-values-header">
          <span className="about-values-tag animate-text" style={{ animationDelay: getDelay(0) }}>What We Stand For</span>
          <h2 className="about-values-title animate-text" style={{ animationDelay: getDelay(1) }}>Our Core Principles</h2>
        </div>
        <div className="about-values-grid">
          <div className="about-value-card animate-text" style={{ animationDelay: getDelay(2) }}>
            <div className="about-value-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
            </div>
            <h4>Quality</h4>
            <p>Every project is delivered with attention to workmanship, performance, and long-term durability.</p>
          </div>
          <div className="about-value-card animate-text" style={{ animationDelay: getDelay(3) }}>
            <div className="about-value-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h4>Accountability</h4>
            <p>We take ownership of planning, coordination, communication, and execution from beginning to end.</p>
          </div>
          <div className="about-value-card animate-text" style={{ animationDelay: getDelay(4) }}>
            <div className="about-value-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4>Safety</h4>
            <p>Protecting people, property, and the job site remains a priority throughout every phase of construction.</p>
          </div>
          <div className="about-value-card animate-text" style={{ animationDelay: getDelay(5) }}>
            <div className="about-value-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <h4>Collaboration</h4>
            <p>Successful projects are built through strong partnerships with owners, consultants, subcontractors, and stakeholders.</p>
          </div>
        </div>
      </section>

      {/* ==================== INDUSTRIES MARQUEE ==================== */}
      <section
        id="about-industries"
        ref={(el) => { sectionsRef.current[5] = el; }}
        className={`about-industries ${isRevealed('about-industries') ? 'about-reveal' : ''}`}
      >
        <h3 className="about-industries-heading animate-text" style={{ animationDelay: getDelay(0) }}>Industries We Serve</h3>
        <div className="about-industries-track-wrap">
          <div className="about-industries-track">
            {[...industriesList, ...industriesList].map((item, i) => (
              <div key={i} className="about-industry-card">
                <span className="about-industry-icon">{industryIcons[item]}</span>
                <span className="about-industry-label">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-industries-cta animate-text" style={{ animationDelay: getDelay(1) }}>
          <a href="/industries" className="about-industries-link">View All Industries →</a>
        </div>
      </section>

      {/* ==================== WHY CHOOSE KEENTEL ==================== */}
      <section
        id="about-why"
        ref={(el) => { sectionsRef.current[6] = el; }}
        className={`about-why ${isRevealed('about-why') ? 'about-reveal' : ''}`}
      >
        <div className="about-why-grid">
          <div className="about-why-image">
            <img
              src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/5b/57/50/43/03/v1_E10/E109U4EQ.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=016af40a5802c7eeccdd6dde78d8d26e8efb9afdd3f7a1f106b6e1ce99989e7b"
              alt="Project planning"
            />
          </div>
          <div className="about-why-points">
            <span className="about-why-tag animate-text" style={{ animationDelay: getDelay(0) }}>Why Choose Keentel</span>
            <h3 className="about-why-title animate-text" style={{ animationDelay: getDelay(1) }}>Leadership That Builds Confidence</h3>
            <ul className="about-why-list">
              <li className="animate-text" style={{ animationDelay: getDelay(2) }}>
                <span className="about-why-check" />
                Strategic Project Planning
              </li>
              <li className="animate-text" style={{ animationDelay: getDelay(3) }}>
                <span className="about-why-check" />
                Transparent Communication
              </li>
              <li className="animate-text" style={{ animationDelay: getDelay(4) }}>
                <span className="about-why-check" />
                Multi-Trade Coordination
              </li>
              <li className="animate-text" style={{ animationDelay: getDelay(5) }}>
                <span className="about-why-check" />
                Safety-First Execution
              </li>
              <li className="animate-text" style={{ animationDelay: getDelay(6) }}>
                <span className="about-why-check" />
                Reliable Scheduling
              </li>
              <li className="animate-text" style={{ animationDelay: getDelay(7) }}>
                <span className="about-why-check" />
                Quality Workmanship
              </li>
              <li className="animate-text" style={{ animationDelay: getDelay(8) }}>
                <span className="about-why-check" />
                Long-Term Client Relationships
              </li>
            </ul>
            <p className="about-why-outro animate-text" style={{ animationDelay: getDelay(9) }}>
              From the first conversation to final project turnover, we remain focused on delivering
              construction solutions with professionalism, integrity, and accountability.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT FORM ==================== */}
      <section
        id="about-contact"
        ref={(el) => { sectionsRef.current[7] = el; }}
        className={`about-contact ${isRevealed('about-contact') ? 'about-reveal' : ''}`}
      >
        <div className="about-contact-container">
          <div className="about-contact-grid">
            <div className="about-contact-left">
              <span className="about-contact-eyebrow animate-text" style={{ animationDelay: getDelay(0) }}>Get in Touch</span>
              <h2 className="about-contact-title animate-text" style={{ animationDelay: getDelay(1) }}>Start Your Project</h2>
              <p className="about-contact-desc animate-text" style={{ animationDelay: getDelay(2) }}>
                Tell us about your project, and our team will provide the guidance, planning, and construction
                expertise you need to move forward with confidence.
              </p>
              <p className="about-contact-desc animate-text" style={{ animationDelay: getDelay(3) }}>
                Whether you're planning a new development, expanding an existing facility, or transforming a
                property through renovation, Keentel General Contractors is ready to help.
              </p>
            </div>
            <div className="about-contact-right animate-text" style={{ animationDelay: getDelay(4) }}>
              <form className="about-contact-form">
                <div className="about-contact-row">
                  <div className="about-contact-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="John Doe" />
                  </div>
                  <div className="about-contact-group">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" placeholder="Your Company" />
                  </div>
                </div>
                <div className="about-contact-row">
                  <div className="about-contact-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="john@example.com" />
                  </div>
                  <div className="about-contact-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" placeholder="(813) 555-0000" />
                  </div>
                </div>
                <div className="about-contact-row">
                  <div className="about-contact-group">
                    <label htmlFor="projectType">Project Type</label>
                    <select id="projectType">
                      <option value="">Select Type</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="institutional">Institutional</option>
                      <option value="multi-family">Multi‑Family</option>
                      <option value="residential">Large Residential</option>
                      <option value="renovation">Renovation</option>
                      <option value="emergency">Emergency Restoration</option>
                    </select>
                  </div>
                  <div className="about-contact-group">
                    <label htmlFor="projectLocation">Project Location</label>
                    <input type="text" id="projectLocation" placeholder="City, State" />
                  </div>
                </div>
                <div className="about-contact-row">
                  <div className="about-contact-group">
                    <label htmlFor="budget">Estimated Budget</label>
                    <select id="budget">
                      <option value="">Select Budget</option>
                      <option value="under50k">Under $50,000</option>
                      <option value="50k-100k">$50k – $100k</option>
                      <option value="100k-250k">$100k – $250k</option>
                      <option value="250k-500k">$250k – $500k</option>
                      <option value="500k-1m">$500k – $1M</option>
                      <option value="over1m">Over $1M</option>
                    </select>
                  </div>
                  <div className="about-contact-group">
                    {/* Placeholder for alignment */}
                  </div>
                </div>
                <div className="about-contact-group about-contact-group--full">
                  <label htmlFor="details">Project Details</label>
                  <textarea id="details" rows={3} placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="about-contact-btn">
                  Request a Consultation
                  <svg className="about-contact-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section
        id="about-cta"
        ref={(el) => { sectionsRef.current[8] = el; }}
        className={`about-cta ${isRevealed('about-cta') ? 'about-reveal' : ''}`}
      >
        <div className="about-cta-content">
          <h2 className="about-cta-title animate-text" style={{ animationDelay: getDelay(0) }}>Let&apos;s Build Something That Lasts</h2>
          <p className="about-cta-text animate-text" style={{ animationDelay: getDelay(1) }}>
            The right contractor does more than complete construction—they provide leadership,
            solve problems, coordinate people, and protect the success of the entire project.
          </p>
          <a href="/contact" className="about-cta-btn animate-text" style={{ animationDelay: getDelay(2) }}>
            <span>Discuss Your Project</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
