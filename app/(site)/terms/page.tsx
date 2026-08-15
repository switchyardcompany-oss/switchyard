import styles from "./TermsConditions.module.css";

type LegalSection = { title: string; paragraphs: string[] };

const termsSections: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "These Terms and Conditions (\"Terms\") govern your use of the websites, chat services, and any marketing materials provided by KEENTEL LLC, operating under the trade names Keentel Engineering and Keentel Electrical Contractors (\"we,\" \"our,\" or \"us\"). By accessing or using our websites, services, or engaging with our marketing materials, you agree to comply with and be bound by these Terms.",
    ],
  },
  {
    title: "Use of Website and Services",
    paragraphs: [
      "By using this website, including any chatbot services, content, or marketing materials, you agree to abide by these Terms. You are granted a limited, non-exclusive, non-transferable license to access and use our website solely for lawful purposes.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All content, logos, graphics, text, images, videos, and other materials on the website are owned or licensed by KEENTEL LLC and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute any content without our prior written consent.",
    ],
  },
  {
    title: "No Professional Advice or Services",
    paragraphs: [
      "Legal Disclaimer: The information provided on this website and through chatbot responses is intended solely for educational and marketing purposes. It is not, and should not be construed as, professional advice, guidance, or a substitute for consultation with a licensed Professional Engineer or Electrical Contractor regarding electrical installation, electrical design engineering, or any related services. Under Florida law, we strongly advise that you consult with a licensed Professional Engineer or Electrical Contractor before making any decisions concerning your project.",
      "To facilitate a comprehensive discussion of your project, we invite you to schedule a meeting with us, either in person or via video conference. We are pleased to offer an initial consultation at no cost and with no obligation.",
    ],
  },
  {
    title: "User Obligations",
    paragraphs: [
      "You agree to use our website and services in compliance with all applicable laws, regulations, and guidelines. You are responsible for maintaining the confidentiality of any login credentials you may use to access certain services. You agree to promptly notify us if you become aware of any unauthorized use of your credentials.",
    ],
  },
  {
    title: "Privacy Policy",
    paragraphs: [
      "Your use of our website and services is also governed by our Privacy Policy, which can be reviewed at our website. By using our website, you consent to the collection and use of your information as described in the Privacy Policy.",
    ],
  },
  {
    title: "Links to Third-Party Websites",
    paragraphs: [
      "Our website may contain links to third-party websites or services that are not owned or controlled by KEENTEL LLC. We are not responsible for the content, privacy practices, or terms of use of these external sites. We encourage you to review the privacy policies and terms of use of any third-party websites you visit.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "In no event shall KEENTEL LLC, its directors, officers, employees, or affiliates be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the website, services, or any content provided, even if we have been advised of the possibility of such damages. Your sole remedy for dissatisfaction with the website or services is to stop using the website or services.",
    ],
  },
  {
    title: "Indemnification",
    paragraphs: [
      "You agree to indemnify, defend, and hold harmless KEENTEL LLC, its affiliates, officers, employees, and agents from and against any claims, actions, demands, liabilities, or damages, including reasonable attorney fees, arising out of your use of the website, violation of these Terms, or violation of any third-party rights.",
    ],
  },
  {
    title: "Modifications",
    paragraphs: [
      "We reserve the right to modify, suspend, or discontinue any aspect of our website, services, or marketing materials at any time without notice. We also reserve the right to update or change these Terms at any time. Any changes will be posted on this page with an updated effective date. Your continued use of the website after any changes constitutes your acceptance of the updated Terms.",
    ],
  },
  {
    title: "Governing Law and Dispute Resolution",
    paragraphs: [
      "These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be resolved through binding arbitration in Florida, and you agree to submit to the exclusive jurisdiction of such arbitration.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <main className={styles["ktc-page"]}>
      <section className={styles["ktc-hero"]}>
        <video autoPlay muted loop playsInline preload="metadata" className={styles["ktc-hero-video"]}>
          <source src="/Video/home-hero-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
          <source src="/Video/home-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles["ktc-hero-overlay"]} />
        <div className={styles["ktc-hero-content"]}>
          <h1 className={styles["ktc-hero-title"]}>Terms and Conditions for KEENTEL LLC</h1>
          <a href="#terms-content" className={styles["ktc-hero-scroll"]} aria-label="Scroll to terms and conditions">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles["ktc-bounce-icon"]}>
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <section className={styles["ktc-terms-grid"]} id="terms-content">
        <div className={styles["ktc-container"]}>
          <div className={styles["ktc-cards-wrapper"]}>
            {termsSections.map((section, index) => (
              <article key={section.title} className={styles["ktc-card"]}>
                <div className={styles["ktc-card-media"]} aria-hidden="true"><span className={styles["ktc-card-icon"]}>{String(index + 1).padStart(2, "0")}</span></div>
                <div className={styles["ktc-card-body"]}>
                  <h2>{section.title}</h2>
                  <div className={styles["ktc-card-copy"]}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
