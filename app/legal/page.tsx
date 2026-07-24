"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../terms/TermsConditions.module.css";

const legalSections = [
  {
    title: "Website Information",
    paragraphs: [
      "The information on this website, including chatbot responses, is provided solely for educational and marketing purposes. It is general information and should not be treated as professional advice for a specific project.",
    ],
  },
  {
    title: "No Professional Advice or Services",
    paragraphs: [
      "Website content is not a substitute for consultation with a licensed Professional Engineer or Electrical Contractor regarding electrical installation, electrical design engineering, construction, or related services.",
      "Before making decisions concerning your project, we strongly advise consulting with an appropriately licensed professional.",
    ],
  },
  {
    title: "Project Information and Consultation",
    paragraphs: [
      "Every project has unique site conditions, code requirements, schedules, and costs. Information presented on this website does not create a contractor-client relationship or constitute a project estimate, guarantee, or commitment.",
      "We invite you to schedule an in-person or video consultation so that your project can be reviewed in detail. An initial consultation is available at no cost and with no obligation.",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "This website may contain links to third-party websites or services that are not owned or controlled by Keentel General Contractors.",
      "We are not responsible for the content, availability, privacy practices, or terms of use of external websites.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All content, logos, graphics, text, images, videos, and other materials on this website are owned by or licensed to Keentel General Contractors and are protected by applicable intellectual property laws.",
      "Website materials may not be reproduced or distributed without prior written consent.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, Keentel General Contractors and its directors, officers, employees, and affiliates are not liable for damages arising from use of this website, its services, or its content.",
      "If you are dissatisfied with the website or its content, your sole remedy is to discontinue its use.",
    ],
  },
];

export default function LegalDisclaimerPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["ktc-reveal-visible"]);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(`.${styles["ktc-reveal"]}`);
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles["ktc-page"]}>
      <section className={styles["ktc-hero"]}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`${styles["ktc-hero-video"]} ${
            isVideoLoaded ? styles["ktc-hero-video-loaded"] : ""
          }`}
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="/assets/hero_bg.png"
        >
          <source src="/Video/home-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles["ktc-hero-overlay"]} />
        <div className={styles["ktc-hero-content"]}>
          <span className={styles["ktc-hero-badge"]}>
            <span className={styles["ktc-pulse-dot"]} />
            Last Updated: July 2026
          </span>
          <h1 className={styles["ktc-hero-title"]}>Legal Disclaimer</h1>
          <p className={styles["ktc-hero-subtitle"]}>
            Important information about the use of the Keentel General
            Contractors website and its content.
          </p>
          <a href="#legal-content" className={styles["ktc-hero-scroll"]}>
            <span>Scroll to learn more</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles["ktc-bounce-icon"]}>
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <section className={styles["ktc-terms-grid"]} id="legal-content">
        <div className={styles["ktc-container"]}>
          <div className={styles["ktc-intro-text"]}>
            <h2 className={styles["ktc-reveal"]}>Please Read Carefully</h2>
            <p className={styles["ktc-reveal"]}>
              This disclaimer explains the scope and limitations of the
              information provided through our website.
            </p>
          </div>

          <div className={styles["ktc-cards-wrapper"]}>
            {legalSections.map((section, index) => (
              <article
                key={section.title}
                className={`${styles["ktc-card"]} ${styles["ktc-reveal"]}`}
                style={{ transitionDelay: `${Math.min(index * 0.04, 0.24)}s` }}
              >
                <div className={styles["ktc-card-media"]} aria-hidden="true">
                  <span className={styles["ktc-card-icon"]}>{index + 1}</span>
                </div>
                <div className={styles["ktc-card-body"]}>
                  <h3>{section.title}</h3>
                  <div className={styles["ktc-card-copy"]}>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["ktc-contact"]}>
        <div className={`${styles["ktc-container"]} ${styles["ktc-reveal"]}`}>
          <h2>Contact</h2>
          <p>
            Questions regarding this Legal Disclaimer may be submitted through
            our Contact page.
          </p>
          <Link href="/contact" className={styles["ktc-btn"]}>
            <span>Contact Us</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
