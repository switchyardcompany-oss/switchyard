"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    if (videoRef.current) {
      videoRef.current.play().catch(() => setVideoError(true));
    }
    return () => clearTimeout(timer);
  }, []);


  const videoSrc = "/Video/home-hero.mp4";

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="sec1-hero">
        {/* Video wrapper – always rendered, no fallback image */}
        <div className="sec1-hero__video-wrapper">
          <video
            ref={videoRef}
            className="sec1-hero__video"
            autoPlay
            loop
            muted
            playsInline
            // Poster is optional – you can remove it if you don't want any image
            poster="/assets/hero_bg.png"
            onError={() => setVideoError(true)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Gradient overlay on top of video */}
          <div className="sec1-hero__overlay sec1-hero__overlay--gradient" />
        </div>

        {/* If video fails, we only show the gradient overlay (no background image) */}
        {videoError && <div className="sec1-hero__overlay"></div>}

        <div className="sec1-hero__inner">
          <div
            className={`sec1-hero__content ${isLoaded ? "sec1-hero__content--visible" : ""}`}
          >
            <span className="sec1-hero__badge">
              GENERAL CONTRACTING • DESIGN-BUILD • PROJECT MANAGEMENT
            </span>
            <h1 className="sec1-hero__title">
              <span className="sec1-hero__title-line">Building Projects That</span>
              <span className="sec1-hero__title-line" style={{ color: "#a6238f" }}>
                Stand the Test of Time
              </span>
            </h1>
            <p className="sec1-hero__desc">
              Keentel General Contractors delivers commercial, industrial,
              institutional, and large-scale residential construction with the
              planning, coordination, and expertise required for successful
              project delivery.
              <br />
              <span className="sec1-hero__desc-highlight">
                From concept to completion, we provide one accountable team
                focused on quality, safety, efficiency, and lasting results.
              </span>
            </p>
            <div className="sec1-hero__bottom-row">
              <div className="sec1-hero__buttons">
                <a
                  href="/contact#contactformsection"
                  className="btn btn--primary"
                >
                  Request a Consultation
                </a>
                <Link href="/services" className="btn btn--secondary">
                  <i className="fa-solid fa-building"></i>&nbsp; Explore Our Services
                </Link>
              </div>
              <aside
                className={`sec1-hero__credentials ${isLoaded ? "sec1-hero__credentials--visible" : ""}`}
                aria-label="Professional credentials and affiliations"
              >
                <div className="sec1-hero__credentials-row">
                  <a
                    href="https://www.bbb.org/us/fl/tampa/profile/electrical-engineer/keentel-engineering-0653-90446480#licensing"
                    className="sec1-hero__credential"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Keentel's BBB Accredited Business profile"
                  >
                    <img src="/images/footer-logo.webp" alt="BBB Accredited Business A+" />
                  </a>
                  <div className="sec1-hero__credential">
                    <img
                      src="/images/genral%20contratcter.png"
                      alt="State of Florida Certified General Contractor"
                    />
                  </div>
                  <a
                    href="https://fleng.org/"
                    className="sec1-hero__credential sec1-hero__credential--fes"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit the Florida Engineering Society website"
                  >
                    <img src="/images/fes-logo.png" alt="Florida Engineering Society" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <TrustMarquee />
    </>
  );
}

// ---------- TrustMarquee component ----------
function TrustMarquee() {
  const items = [
    "Licensed & Insured",
    "Design-Build Expertise",
    "Multi-Trade Coordination",
    "Safety-First Approach",
    "Quality Construction",
  ];

  return (
    <section className="trust-marquee">
      <div className="trust-marquee__track">
        <div className="trust-marquee__content">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className="trust-marquee__group"
              aria-hidden={groupIndex === 1 ? "true" : undefined}
            >
              {[...items, ...items].map((item, itemIndex) => (
                <span key={`${item}-${itemIndex}`} className="trust-marquee__item">
                  <svg
                    className="trust-marquee__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
