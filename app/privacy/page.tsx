"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./privacy-policy.module.css";

type PolicySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const policySections: PolicySection[] = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We may collect the following types of information when you interact with our website, chat services, or marketing materials:",
    ],
    bullets: [
      "Personal Information: This may include your name, email address, phone number, and any other contact details you voluntarily provide when scheduling consultations or engaging in our services.",
      "Usage Data: Information related to your interaction with our website, such as IP addresses, browser type, device information, and the pages you visit on our website.",
      "Cookies and Tracking Technologies: We may use cookies and similar tracking technologies to enhance user experience, analyze website usage, and deliver personalized content or ads.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: ["We use the information we collect for the following purposes:"],
    bullets: [
      "To provide and improve our services, including consultations and project discussions.",
      "To respond to your inquiries or requests made via the website, chat services, or through marketing materials.",
      "To communicate with you about updates, promotions, or other relevant information related to Keentel Engineering and Keentel Electrical Contractors.",
      "To analyze website usage and improve user experience.",
    ],
  },
  {
    title: "How We Share Your Information",
    paragraphs: [
      "We respect your privacy and do not share your personal information with third parties, except in the following circumstances:",
    ],
    bullets: [
      "Service Providers: We may share your information with trusted third-party service providers who assist in operating our website, conducting business operations, or providing marketing support.",
      "Legal Compliance: We may disclose your information if required to do so by law, regulation, or in response to legal requests.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "We take the security of your personal information seriously and employ reasonable technical and organizational measures to protect it from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Rights and Choices",
    paragraphs: ["You have the right to:"],
    bullets: [
      "Access: Request access to the personal information we hold about you.",
      "Correction: Request correction of any inaccurate or incomplete information.",
      "Deletion: Request the deletion of your personal information, subject to legal obligations.",
      "Opt-out of Marketing Communications: You may opt out of receiving marketing emails or communications from us by following the unsubscribe instructions provided in the communication.",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "Our website or marketing materials may contain links to third-party websites. This Privacy Policy applies only to Keentel General Contractors and our subsidiaries, and we are not responsible for the privacy practices or content of third-party websites. We encourage you to read the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    title: "Children’s Privacy",
    paragraphs: [
      "Our website and services are not directed to children under the age of 13, and we do not knowingly collect personal information from individuals under 13. If we learn that we have inadvertently collected such information, we will take steps to delete it as soon as possible.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "Keentel General Contractors reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your personal information.",
    ],
  },
  {
    title: "Contact Us",
    paragraphs: [
      "If you have any questions or concerns regarding this Privacy Policy or our privacy practices, please contact us:",
      "Keentel General Contractors",
      "Attn: Privacy Policy",
      "Phone: 813-395-0000",
      "Email 1: contact@keentelgeneralcontractors.com",
      "Email 2: BD@keentelengineering.com",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["kpp-reveal-visible"]);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(`.${styles["kpp-reveal"]}`);
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles["kpp-page"]}>
      <section className={styles["kpp-hero"]}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`${styles["kpp-hero-video"]} ${
            isVideoLoaded ? styles["kpp-hero-video-loaded"] : ""
          }`}
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/Video/home-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles["kpp-hero-overlay"]} />
        <div className={styles["kpp-hero-content"]}>
          <span className={styles["kpp-hero-badge"]}>
            <span className={styles["kpp-pulse-dot"]} />
            Last Updated: July 2026
          </span>
          <h1 className={styles["kpp-hero-title"]}>Privacy Policy</h1>
          <p className={styles["kpp-hero-subtitle"]}>
            Keentel General Contractors respects your privacy and is committed
            to protecting the personal information you share with us.
          </p>
          <a href="#privacy-content" className={styles["kpp-hero-scroll"]}>
            <span>Scroll to learn more</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles["kpp-bounce-icon"]}>
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <section className={styles["kpp-policy-grid"]} id="privacy-content">
        <div className={styles["kpp-container"]}>
          <div className={styles["kpp-intro-text"]}>
            <h2 className={styles["kpp-reveal"]}>How We Handle Your Information</h2>
            <p className={styles["kpp-reveal"]}>
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or contact
              us regarding our construction services.
            </p>
          </div>

          <div className={styles["kpp-cards-wrapper"]}>
            {policySections.map((section, index) => (
              <article
                key={section.title}
                className={`${styles["kpp-card"]} ${styles["kpp-reveal"]}`}
                style={{ transitionDelay: `${Math.min(index * 0.04, 0.24)}s` }}
              >
                <div className={styles["kpp-card-media"]} aria-hidden="true">
                  <span className={styles["kpp-card-icon"]}>{index + 1}</span>
                </div>
                <div className={styles["kpp-card-body"]}>
                  <h3>{section.title}</h3>
                  <div className={styles["kpp-card-copy"]}>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["kpp-contact"]}>
        <div className={`${styles["kpp-container"]} ${styles["kpp-reveal"]}`}>
          <h2>Contact</h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact
            Keentel General Contractors through our Contact page.
          </p>
          <Link href="/contact" className={styles["kpp-btn"]}>
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
