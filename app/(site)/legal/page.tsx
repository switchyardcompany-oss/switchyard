import styles from "../terms/TermsConditions.module.css";

const legalSections = [
  {
    title: "Legal Disclaimer",
    paragraphs: [
      "The information provided on this website and through chatbot responses is intended solely for educational and marketing purposes. It is not, and should not be construed as, professional advice, guidance, or a substitute for consultation with a licensed Professional Engineer or Electrical Contractor regarding electrical installation, electrical design engineering, or any related services.",
      "Under Florida law, we strongly advise that you consult with a licensed Professional Engineer or Electrical Contractor before making any decisions concerning your project.",
      "To facilitate a comprehensive discussion of your project, we invite you to schedule a meeting with us, either in person or via video conference. We are pleased to offer an initial consultation at no cost and with no obligation.",
    ],
  },
];

export default function LegalDisclaimerPage() {
  return (
    <main className={styles["ktc-page"]}>
      <section className={styles["ktc-hero"]}>
        <video autoPlay muted loop playsInline preload="metadata" className={styles["ktc-hero-video"]}>
          <source src="/Video/home-hero-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
          <source src="/Video/home-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles["ktc-hero-overlay"]} />
        <div className={styles["ktc-hero-content"]}>
          <h1 className={styles["ktc-hero-title"]}>Legal Disclaimer</h1>
          <a href="#legal-content" className={styles["ktc-hero-scroll"]} aria-label="Scroll to legal disclaimer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles["ktc-bounce-icon"]}>
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <section className={styles["ktc-terms-grid"]} id="legal-content">
        <div className={styles["ktc-container"]}>
          <div className={styles["ktc-cards-wrapper"]}>
            {legalSections.map((section, index) => (
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
