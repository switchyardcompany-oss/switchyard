"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <section className="sec10-footer">
      <div className="sec10-pre-footer">
        <div className="sec10-pre-footer__inner">
          <p className="sec10-pre-footer__text">
            Keentel General Contractors – Powering Tampa&apos;s Homes and Businesses with Expertise You Can Trust.
          </p>
        </div>
      </div>

      <div className="sec10-main-footer">
        <div className="sec10-main-footer__inner">
          {/* Column 1: Branding & Trust */}
          <div className="sec10-footer-col sec10-footer-col--brand">
            <div className="sec10-footer-logo">
              <img
                src="/assets/keentel-logo-footer.png"
                alt="Keentel General Contractors"
                className="sec10-footer-logo__img"
              />
            </div>
            <div className="sec10-footer-badge">
              <a
                href="https://www.bbb.org/us/fl/tampa/profile/electrical-engineer/keentel-engineering-0653-90446480#licensing"
                aria-label="View Keentel Engineering's BBB Accredited Business profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/footer-logo.webp"
                  alt="BBB Accredited Business A+"
                  className="sec10-footer-badge__img"
                />
              </a>
              <img
                src="/images/genral%20contratcter.png"
                alt="State of Florida Certified General Contractor"
                className="sec10-footer-contractor-badge__img"
                loading="lazy"
              />
            </div>
            <div className="sec10-footer-social">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/keentelec"
                className="sec10-footer-social__link"
                aria-label="Keentel General Contractors on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@keentelec"
                className="sec10-footer-social__link"
                aria-label="Keentel General Contractors on YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/keentel-general-contractors/"
                className="sec10-footer-social__link"
                aria-label="Keentel General Contractors on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="sec10-footer-col sec10-footer-col--company">
            <h3 className="sec10-footer-col__title">Company</h3>
            <ul className="sec10-footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/service-areas">Service Areas</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="sec10-footer-col sec10-footer-col--contact">
            <h3 className="sec10-footer-col__title">Get in Touch</h3>
            <ul className="sec10-footer-contact">
              <li className="sec10-footer-contact__item">
                <svg
                  className="sec10-footer-contact__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a href="tel:8133950000">813-395-0000</a>
              </li>
              <li className="sec10-footer-contact__item">
                <svg
                  className="sec10-footer-contact__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:contact@keentelgeneralcontractors.com">
                  contact@keentelgeneralcontractors.com
                </a>
              </li>
              <li className="sec10-footer-contact__item">
                <svg
                  className="sec10-footer-contact__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  400 North Ashley Drive,
                  <br />
                  Suite 2600, Tampa, FL 33602
                </span>
              </li>
              <li className="sec10-footer-contact__item license">
                <svg
                  className="sec10-footer-contact__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M12 3l7 3v5c0 4.6-2.9 8.5-7 10-4.1-1.5-7-5.4-7-10V6l7-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>
                  Florida Licenses:
                  <br />
                  CGC1524228 &bull; EC13014476
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="sec10-footer-col sec10-footer-col--services">
            <h3 className="sec10-footer-col__title">Services</h3>
            <ul className="sec10-footer-links">
              <li><Link href="/services/pre-construction">Pre-Construction</Link></li>
              <li><Link href="/services/design-build">Design-Build</Link></li>
              <li><Link href="/services/general-construction">General Construction</Link></li>
              <li><Link href="/services/commercial-remodeling">Commercial Remodeling</Link></li>
              <li><Link href="/services/residential-remodeling">Residential Remodeling</Link></li>
              <li><Link href="/services/electrical-contracting">Electrical Contracting</Link></li>
              <li><Link href="/services/emergency-restoration">Emergency Restoration</Link></li>
            </ul>
          </div>
        </div>

        <div className="sec10-bottom-bar">
          <div className="sec10-bottom-bar__inner">
            <p className="sec10-bottom-bar__copyright">
              &copy; 2026 Copyright Keentel General Contractors
            </p>
            <div className="sec10-bottom-bar__links">
              <a href="/terms">Term and Condition</a>
              <span className="sep">|</span>
              <a href="/privacy">Privacy Policy</a>
              <span className="sep">|</span>
              <a href="/legal">Legal Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
