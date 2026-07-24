"use client";

import "./faq.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

const faqData = [
  // ── Licensing & Credentials ──
  { id: 1, category: 'licensing', question: 'Is Keentel General Contractors licensed in Florida?',
    answer: 'Yes. We hold active Florida CGC (General Contractor), CPC (Certified Plumbing Contractor), and CFC (Certified Electrical Contractor) licenses. All work is performed by our licensed in-house team.' },
  { id: 2, category: 'licensing', question: 'Are you insured?',
    answer: 'Yes. We carry comprehensive general liability and workers\' compensation insurance on every project across Florida. Your property and investment are fully protected from day one.' },
  { id: 3, category: 'licensing', question: 'Do you work across all of Florida?',
    answer: 'Yes. We are headquartered in Tampa Bay and serve all 67 Florida counties for residential, commercial, and industrial projects — with the same licensed team and the same delivery standard.' },

  // ── Services ──
  { id: 4, category: 'services', question: 'What types of projects do you take on?',
    answer: 'We deliver residential design and construction, commercial builds, industrial projects, full remodeling, electrical services, and 24/7 emergency response — all under one license and one contract.' },
  { id: 5, category: 'services', question: 'Do you handle design and construction together?',
    answer: 'Yes. We are a full design-build contractor. Design and construction are handled by the same licensed team under one contract — eliminating coordination gaps and budget surprises between phases.' },
  { id: 6, category: 'services', question: 'Do you self-perform all trades or use subcontractors?',
    answer: 'We self-perform the core trades — including electrical, which is completed by our own licensed electricians. For specialty trades, we use a vetted network of Florida-licensed contractors under our direct supervision and warranty.' },

  // ── Pricing & Estimates ──
  { id: 7, category: 'pricing', question: 'How much does it cost to hire a general contractor?',
    answer: 'Project costs vary by scope, size, and materials. We provide detailed, line-itemized free estimates for every project before any contract is signed. No hidden fees, no surprise invoices.' },
  { id: 8, category: 'pricing', question: 'Is the estimate really free?',
    answer: 'Yes. Our initial project estimate is completely free with no obligation. We visit the site where needed, assess the scope, and deliver a written estimate with a fixed contract price.' },
  { id: 9, category: 'pricing', question: 'Do you offer financing?',
    answer: 'Yes. We offer flexible financing options to qualified clients. Contact us directly to discuss what financing structure best fits your project and budget.' },

  // ── Project Management ──
  { id: 10, category: 'management', question: 'Who is my point of contact during a project?',
    answer: 'Every project is assigned a dedicated Keentel project manager — your single point of contact from contract signing to final walkthrough. You will always know exactly who to call.' },
  { id: 11, category: 'management', question: 'How do you handle changes to the project scope?',
    answer: 'We do not process any scope change or additional cost without your written approval. Every change is documented, priced, and signed off before work proceeds.' },
  { id: 12, category: 'management', question: 'Do you manage permits?',
    answer: 'Yes. We manage all required permits and county inspections across Florida on your behalf as part of every project we take on.' },

  // ── Warranty ──
  { id: 13, category: 'warranty', question: 'What warranty do you provide?',
    answer: 'All Keentel projects are backed by a written 5-year workmanship warranty. New construction also complies with Florida statutory construction warranty requirements under Chapter 558, Florida Statutes.' },
  { id: 14, category: 'warranty', question: 'How do I make a warranty claim?',
    answer: 'Contact your project manager directly by phone or email. We schedule a site visit within 48 hours and resolve all covered defects at no charge — no questions, no invoices.' },

  // ── Emergency Services ──
  { id: 15, category: 'emergency', question: 'How fast can you respond to an emergency?',
    answer: 'We confirm on-site arrival within 30 to 60 minutes across Florida. Response time is confirmed at the time of the call — not estimated.' },
  { id: 16, category: 'emergency', question: 'Is your emergency line active on weekends and holidays?',
    answer: 'Yes. Our emergency line operates 24 hours a day, 365 days a year. There are no blackout dates.' },
  { id: 17, category: 'emergency', question: 'Do you work with insurance companies for emergency claims?',
    answer: 'Yes. We provide full damage documentation, photo reports, and repair estimates formatted for insurance claim submission on every emergency visit.' }
];

const categories = [
  { id: "all", label: "All", count: faqData.length },
  { id: "licensing", label: "Licensing & Credentials", count: faqData.filter(f => f.category === "licensing").length },
  { id: "services", label: "Services", count: faqData.filter(f => f.category === "services").length },
  { id: "pricing", label: "Pricing & Estimates", count: faqData.filter(f => f.category === "pricing").length },
  { id: "management", label: "Project Management", count: faqData.filter(f => f.category === "management").length },
  { id: "warranty", label: "Warranty", count: faqData.filter(f => f.category === "warranty").length },
  { id: "emergency", label: "Emergency Services", count: faqData.filter(f => f.category === "emergency").length }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const resetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setOpenItems(new Set());
  };

  useEffect(() => {
    const section = document.querySelector(".keentel-faq-section");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer.replace(/<[^>]*>/g, '')
              }
            }))
          })
        }}
      />

      <section className="keentel-faq-hero">
        <div className="keentel-faq-hero__inner">
          <p className="keentel-faq-hero__overline">Help Center</p>
          <h1 className="keentel-faq-hero__title">Frequently Asked Questions</h1>
          <p className="keentel-faq-hero__subtitle">Everything you need to know about working with Keentel General Contractors — from first contact to project handover and beyond.</p>
          <div className="keentel-faq-hero__search-wrap">
            <svg className="keentel-faq-hero__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="keentel-faq-hero__search"
              placeholder="Search questions & answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <button
              className={`keentel-faq-hero__search-clear ${searchQuery ? "visible" : ""}`}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="keentel-faq-section">
        <div className="keentel-faq-section__header">
          <div className="keentel-category-pills">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`keentel-category-pill ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
                <span className="keentel-category-pill__count">{cat.count}</span>
              </button>
            ))}
          </div>
          <span className="keentel-faq-section__results">
            Showing <strong>{filteredFaqs.length}</strong> of {faqData.length} FAQs
          </span>
        </div>

        <div className="keentel-faq-list">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className={`keentel-faq-item ${openItems.has(faq.id) ? "active" : ""}`}>
              <button className="keentel-faq-item__question" onClick={() => toggleItem(faq.id)}>
                <span>{faq.question}</span>
                <span className="keentel-faq-item__icon"></span>
              </button>
              <div className="keentel-faq-item__answer-wrapper" style={{ maxHeight: openItems.has(faq.id) ? "1000px" : "0" }}>
                <div className="keentel-faq-item__answer" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>
          ))}
        </div>

        <div className={`keentel-no-results ${filteredFaqs.length === 0 ? "visible" : ""}`}>
          <div className="keentel-no-results__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <p className="keentel-no-results__title">No matching FAQs found</p>
          <p className="keentel-no-results__text">Try adjusting your search or filter to find what you're looking for.</p>
          <button className="keentel-no-results__reset" onClick={resetFilters}>Clear All Filters</button>
        </div>
      </section>

      <section className="keentel-cta-section">
        <div className="keentel-cta-section__inner">
          <h2 className="keentel-cta-section__title">Still have a question?</h2>
          <p className="keentel-cta-section__text">Our team is available 7 days a week. Call us or request a free estimate and we will get back to you the same business day.</p>
          <div className="keentel-cta-section__buttons">
            <Link href="/contact#contactformsection" className="keentel-btn keentel-btn--primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Contact Us
            </Link>
            <a href="tel:+18133950000" className="keentel-btn keentel-btn--outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (813) 395-0000
            </a>
          </div>
        </div>
      </section>
    </>
  );
}