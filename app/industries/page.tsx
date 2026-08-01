'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  ShoppingBag,
  UtensilsCrossed,
  Hotel,
  HeartPulse,
  Factory,
  Settings2,
  Warehouse,
  Building,
  GraduationCap,
  Landmark,
  Home as HomeIcon,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react';
import ServiceHeroCredentials from '@/components/ServiceHeroCredentials';
import './industries.css';

/* ==========================================================================
   Data
   ========================================================================== */

const TRUST_ITEMS = [
  'Commercial Construction',
  'Industrial Expertise',
  'Licensed & Insured',
  'Safety-First Approach',
  'End-to-End Project Delivery',
];

type Industry = {
  id: string;
  title: string;
  desc: string;
  image: string;
  icon: React.ElementType;
  services: string[];
};

const INDUSTRIES: Industry[] = [
  {
    id: 'commercial-offices',
    title: 'Commercial Offices',
    desc: 'Modern office environments designed to improve productivity, employee experience, and long-term business growth.',
    image: 'https://images.unsplash.com/photo-1778961419928-2968ddd57c05?w=1000&q=80&auto=format&fit=crop',
    icon: Building2,
    services: ['Office Construction', 'Office Renovations', 'Tenant Improvements', 'Interior Build-Outs', 'Workplace Expansions'],
  },
  {
    id: 'retail',
    title: 'Retail',
    desc: 'Construction solutions that create inviting retail environments designed to enhance customer experience and efficiency.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80&auto=format&fit=crop',
    icon: ShoppingBag,
    services: ['Retail Build-Outs', 'Store Renovations', 'Shopping Centers', 'Tenant Improvements', 'Commercial Remodeling'],
  },
  {
    id: 'restaurants',
    title: 'Restaurants',
    desc: 'Functional restaurant spaces built to support efficient operations, customer comfort, and lasting performance.',
    image: 'https://images.unsplash.com/photo-1753727471014-efe38840c7c7?w=1000&q=80&auto=format&fit=crop',
    icon: UtensilsCrossed,
    services: ['Restaurant Construction', 'Interior Renovations', 'Kitchen Build-Outs', 'Dining Area Remodeling', 'Facility Upgrades'],
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    desc: 'Construction and renovation services for hotels, resorts, and hospitality facilities where quality and guest experience matter.',
    image: 'https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?w=1000&q=80&auto=format&fit=crop',
    icon: Hotel,
    services: ['Hotel Renovations', 'Hospitality Remodeling', 'Guest Room Upgrades', 'Public Space Improvements', 'Facility Expansions'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    desc: 'Reliable construction solutions for medical facilities requiring careful planning, safety, and minimal disruption.',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1000&q=80&auto=format&fit=crop',
    icon: HeartPulse,
    services: ['Medical Offices', 'Healthcare Facilities', 'Clinics', 'Interior Renovations', 'Facility Improvements'],
  },
  {
    id: 'industrial',
    title: 'Industrial',
    desc: 'Construction services supporting industrial operations with durable, high-performance facilities built for productivity.',
    image: 'https://images.unsplash.com/photo-1669003153363-6d7ba8e20c7e?w=1000&q=80&auto=format&fit=crop',
    icon: Factory,
    services: ['Industrial Buildings', 'Plant Expansions', 'Equipment Foundations', 'Facility Improvements', 'Infrastructure Upgrades'],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    desc: 'Construction solutions that improve production efficiency, workflow, and long-term operational performance.',
    image: 'https://images.unsplash.com/photo-1547895749-888a559fc2a7?w=1000&q=80&auto=format&fit=crop',
    icon: Settings2,
    services: ['Manufacturing Facilities', 'Production Areas', 'Equipment Installations', 'Plant Expansions', 'Process Improvements'],
  },
  {
    id: 'warehouses',
    title: 'Warehouses',
    desc: 'Warehouses and distribution facilities designed for efficient logistics, storage, and future business growth.',
    image: 'https://images.unsplash.com/photo-1685483749753-0dab7e144794?w=1000&q=80&auto=format&fit=crop',
    icon: Warehouse,
    services: ['Distribution Centers', 'Storage Facilities', 'Warehouse Expansions', 'Logistics Buildings', 'Interior Improvements'],
  },
  {
    id: 'multi-family',
    title: 'Multi-Family',
    desc: 'Construction and renovation services for apartments, condominiums, and multi-family residential communities.',
    image: 'https://images.unsplash.com/photo-1759845565036-cbecbcfcb8e2?w=1000&q=80&auto=format&fit=crop',
    icon: Building,
    services: ['Apartment Buildings', 'Condominium Renovations', 'Common Area Improvements', 'Exterior Upgrades', 'Unit Renovations'],
  },
  {
    id: 'education',
    title: 'Education',
    desc: 'Construction projects that create safe, functional, and modern learning environments for students and educators.',
    image: 'https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=1000&q=80&auto=format&fit=crop',
    icon: GraduationCap,
    services: ['Schools', 'Universities', 'Campus Renovations', 'Classroom Improvements', 'Facility Expansions'],
  },
  {
    id: 'government',
    title: 'Government',
    desc: 'Reliable construction services for municipal, state, and public-sector facilities with a focus on compliance.',
    image: 'https://images.unsplash.com/photo-1618656172765-26774a4a38d2?w=1000&q=80&auto=format&fit=crop',
    icon: Landmark,
    services: ['Government Buildings', 'Municipal Facilities', 'Public Infrastructure', 'Administrative Offices', 'Facility Modernization'],
  },
  {
    id: 'residential-communities',
    title: 'Residential Communities',
    desc: 'Construction and renovation services that enhance neighborhoods, residential developments, and community living.',
    image: 'https://images.unsplash.com/photo-1637123433690-228bb002d9e9?w=1000&q=80&auto=format&fit=crop',
    icon: HomeIcon,
    services: ['Residential Developments', 'Community Amenities', 'Clubhouses', 'Outdoor Facilities', 'Property Improvements'],
  },
];

const APPROACH_STEPS = [
  { num: '01', title: 'Understand', desc: 'We evaluate your operational goals, project requirements, budget, and schedule.' },
  { num: '02', title: 'Plan', desc: 'Our team develops detailed construction strategies, timelines, and coordination plans.' },
  { num: '03', title: 'Build', desc: 'Experienced professionals deliver quality workmanship while maintaining safety and efficiency.' },
  { num: '04', title: 'Deliver', desc: 'Every project concludes with comprehensive inspections, quality assurance, and client satisfaction.' },
];

const WHY_ITEMS = [
  {
    title: 'Diverse Industry Experience',
    desc: 'Commercial, industrial, institutional, and residential expertise helps our team understand the operational demands behind every project.',
    image: '/images/services/Commercial Construction.jpg',
    alt: 'Large commercial construction project managed by an experienced contractor',
  },
  {
    title: 'Professional Project Management',
    desc: 'Disciplined planning, scheduling, trade coordination, and quality control keep complex construction projects moving forward.',
    image: '/images/services/One Team. One Vision. One Successful Project..jpg',
    alt: 'Construction project team reviewing plans and coordinating project delivery',
  },
  {
    title: 'Quality & Safety in Every Phase',
    desc: 'Careful workmanship and responsible site practices support durable results without compromising the people working around the project.',
    image: '/images/services/construction-workers-building-site.jpg',
    alt: 'Construction professionals working safely on an active building site',
  },
  {
    title: 'Built for Long-Term Value',
    desc: 'We focus on dependable facilities, transparent communication, and relationships that continue beyond project completion.',
    image: '/images/services/Facility Expansions.jpg',
    alt: 'Completed facility expansion designed for long-term operational value',
  },
];

const SUPPORT_TAGS = [
  'Commercial Businesses',
  'Developers',
  'Property Owners',
  'Industrial Companies',
  'Manufacturers',
  'Healthcare Providers',
  'Educational Institutions',
  'Government Agencies',
  'Hospitality Operators',
  'Retail Brands',
  'Multi-Family Developers',
  'Residential Communities',
];

/* ==========================================================================
   Reveal-on-scroll hook
   ========================================================================== */

function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.kgc-reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('kgc-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('kgc-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ==========================================================================
   Page
   ========================================================================== */

export default function IndustriesPage() {
  useScrollReveal();

  const [activeWhy, setActiveWhy] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="kgc-page">
      {/* ============================== HERO ============================== */}
      <section className="kgc-hero" ref={heroRef}>
        <div className="kgc-hero__media">
          <video
            className="kgc-hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://assets.mixkit.co/videos/25270/25270-720.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="kgc-hero__overlay" />
        <div className="kgc-hero__grid" />

        <div className="kgc-container">
          <div className="kgc-hero__content">
            <div className="kgc-hero__eyebrow">
              <span>Commercial</span>
              <span>Industrial</span>
              <span>Public</span>
              <span>Residential</span>
            </div>
            <h1 className="kgc-hero__title">
              <span>Construction Solutions for</span>
              <span><em>Every Industry</em></span>
            </h1>
            <p className="kgc-hero__subtitle">
              Every industry has unique construction challenges, operational requirements, and
              project goals. Keentel General Contractors delivers tailored construction,
              remodeling, and restoration solutions designed to meet the specific needs of
              commercial businesses, industrial facilities, public institutions, and residential
              developments.
            </p>
            <div className="service-hero-bottom-row">
              <div className="kgc-hero__ctas">
                <button className="kgc-btn kgc-btn--primary" onClick={() => scrollToId('kgc-contact')}>
                  Book a Consultation <ArrowRight size={17} />
                </button>
                <a className="kgc-btn kgc-btn--outline" href="tel:8133950000">
                  Call Us
                </a>
              </div>
              <ServiceHeroCredentials />
            </div>
          </div>
        </div>

        
      </section>

      {/* ============================ TRUST BAR ============================ */}
      <section className="kgc-trustbar">
        <div className="kgc-container">
          <div className="kgc-trustbar__inner">
            {TRUST_ITEMS.map((item, i) => (
              <div
                className="kgc-trustbar__item"
                key={item}
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <CheckCircle2 size={18} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== ABOUT ============================== */}
      <section className="kgc-section kgc-section--off-white">
        <div className="kgc-container">
          <div className="kgc-about__grid">
            <div className="kgc-about__media kgc-reveal">
              <div className="kgc-about__frame" />
              <img
                className="kgc-about__image"
                src="/images/industries/aerial-view-new-constructions-development-site-with-diverse-team-engineers-architects-discussing-real-estate-projects-heavy-machinery-construction-workers-are-working-area%20(1).jpg"
                alt="Aerial view of engineers and architects discussing an active construction development"
                loading="lazy"
              />
            </div>
            <div className="kgc-about__content kgc-reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="kgc-eyebrow">About Our Industries</div>
              <h2 className="kgc-section-title">Construction Experience Across Diverse Markets</h2>
              <p>
                Every industry requires a different approach to planning, scheduling, compliance,
                and construction execution. Our team understands how to adapt to the unique
                operational needs of each client while delivering projects that are efficient,
                durable, and built for long-term performance.
              </p>
              <p>
                At Keentel General Contractors, we partner with businesses, organizations,
                developers, and property owners across multiple industries, providing dependable
                construction services from concept through completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ INDUSTRIES ============================ */}
      <section className="kgc-section" id="kgc-industries">
        <div className="kgc-container">
          <div className="kgc-section-header kgc-section-header--center kgc-reveal">
            <div className="kgc-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              Industries We Serve
            </div>
            <h2 className="kgc-section-title">Tailored Construction Solutions for Every Sector</h2>
          </div>

          <div className="kgc-industries__grid">
            {INDUSTRIES.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <article
                  className="kgc-card kgc-reveal"
                  key={industry.id}
                  style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                >
                  <div className="kgc-card__image-wrap">
                    <img
                      className="kgc-card__image"
                      src={industry.image}
                      alt={industry.title}
                      loading="lazy"
                    />
                    <div className="kgc-card__image-overlay" />
                    <div className="kgc-card__ribbon">
                      <Icon size={20} />
                    </div>
                    <div className="kgc-card__image-title">{industry.title}</div>
                  </div>
                  <div className="kgc-card__body">
                    <div className="kgc-card__underline" />
                    <p className="kgc-card__desc">{industry.desc}</p>
                    <ul className="kgc-card__list">
                      {industry.services.slice(0, 3).map((s) => (
                        <li key={s}>
                          <CheckCircle2 size={14} />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <button className="kgc-card__cta" onClick={() => scrollToId('kgc-contact')}>
                      Learn More <ArrowRight size={15} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================= APPROACH ============================= */}
      <section className="kgc-section kgc-approach">
        <div className="kgc-container">
          <div className="kgc-section-header kgc-section-header--center kgc-reveal">
            <div className="kgc-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              Our Approach
            </div>
            <h2 className="kgc-section-title">One Trusted Partner Across Every Industry</h2>
            <p className="kgc-section-subtitle">
              No matter the market or project type, our process is built around collaboration,
              quality, and dependable execution.
            </p>
          </div>

          <div className="kgc-approach__grid">
            {APPROACH_STEPS.map((step, i) => (
              <div
                className="kgc-approach__step kgc-reveal"
                key={step.num}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="kgc-approach__number">{step.num}</div>
                <div className="kgc-approach__title">{step.title}</div>
                <p className="kgc-approach__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ WHY CHOOSE ============================ */}
      <section className="kgc-section kgc-section--light-gray kgc-why-section">
        <div className="kgc-container">
          <div className="kgc-section-header kgc-why-heading kgc-reveal">
            <div className="kgc-eyebrow">
              Why Choose Keentel General Contractors
            </div>
            <h2 className="kgc-section-title">Industry Experience You Can Rely On</h2>
            <p className="kgc-section-subtitle">
              Construction success comes from understanding the unique demands of every industry.
            </p>
          </div>

          <div className="kgc-why-accordion kgc-reveal" role="list" aria-label="Reasons to choose Keentel General Contractors">
            {WHY_ITEMS.map((item, i) => (
              <article
                key={item.title}
                className={`kgc-why-panel${activeWhy === i ? ' kgc-why-panel--active' : ''}`}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setActiveWhy(i)}
                onFocus={() => setActiveWhy(i)}
                onClick={() => setActiveWhy(i)}
                aria-label={`${item.title}. ${item.desc}`}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="kgc-why-panel__shade" aria-hidden="true" />
                <span className="kgc-why-panel__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="kgc-why-panel__copy">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== INDUSTRIES SUPPORT ========================== */}
      <section className="kgc-section kgc-support">
        <div className="kgc-container">
          <div className="kgc-section-header kgc-section-header--center kgc-reveal">
            <div className="kgc-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              Industries We Support
            </div>
            <h2 className="kgc-section-title">Built for Businesses, Organizations &amp; Communities</h2>
          </div>
        </div>

        <div className="kgc-support__marquee kgc-reveal">
          <div className="kgc-support__track">
            {[...SUPPORT_TAGS, ...SUPPORT_TAGS].map((tag, i) => (
              <span className="kgc-support__tag" key={`${tag}-${i}`}>
                <Sparkles size={15} />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="kgc-support__marquee kgc-reveal">
          <div className="kgc-support__track kgc-support__track--reverse">
            {[...SUPPORT_TAGS.slice().reverse(), ...SUPPORT_TAGS.slice().reverse()].map((tag, i) => (
              <span className="kgc-support__tag" key={`${tag}-r-${i}`}>
                <Sparkles size={15} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CONTACT ============================== */}
      <section className="kgc-section kgc-contact" id="kgc-contact">
        <div className="kgc-container">
          <div className="kgc-contact__grid">
            <div className="kgc-reveal">
              <div className="kgc-eyebrow" style={{ color: '#ff9de8' }}>
                Let&apos;s Build for Your Industry
              </div>
              <h2 className="kgc-contact__title">
                Tell Us About Your Project
              </h2>
              <p className="kgc-contact__desc">
                Whether you&apos;re planning a commercial office, manufacturing facility, healthcare
                renovation, retail expansion, or residential community project, Keentel General
                Contractors is ready to help.
              </p>
              <div className="kgc-contact__points">
                <div className="kgc-contact__point">
                  <Mail size={18} /> A dedicated team reviews every submission
                </div>
                <div className="kgc-contact__point">
                  <Phone size={18} /> We follow up to schedule your consultation
                </div>
                <div className="kgc-contact__point">
                  <MapPin size={18} /> Serving commercial, industrial &amp; public projects
                </div>
              </div>
            </div>

            <div className="kgc-reveal" style={{ transitionDelay: '0.1s' }}>
              <form className="kgc-form" onSubmit={handleSubmit}>
                <div className="kgc-form__grid">
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-name">Full Name</label>
                    <input className="kgc-form__input" id="kgc-name" name="name" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-company">Company / Organization</label>
                    <input className="kgc-form__input" id="kgc-company" name="company" type="text" placeholder="Company name" />
                  </div>
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-email">Email Address</label>
                    <input className="kgc-form__input" id="kgc-email" name="email" type="email" placeholder="jane@company.com" required />
                  </div>
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-phone">Phone Number</label>
                    <input className="kgc-form__input" id="kgc-phone" name="phone" type="tel" placeholder="(555) 000-0000" />
                  </div>
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-industry">Industry</label>
                    <select className="kgc-form__select" id="kgc-industry" name="industry" defaultValue="">
                      <option value="" disabled>Select an industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option value={ind.id} key={ind.id}>{ind.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-project-type">Project Type</label>
                    <input className="kgc-form__input" id="kgc-project-type" name="projectType" type="text" placeholder="New build, renovation..." />
                  </div>
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-location">Project Location</label>
                    <input className="kgc-form__input" id="kgc-location" name="location" type="text" placeholder="City, State" />
                  </div>
                  <div className="kgc-form__group">
                    <label className="kgc-form__label" htmlFor="kgc-budget">Estimated Budget</label>
                    <input className="kgc-form__input" id="kgc-budget" name="budget" type="text" placeholder="$100,000+" />
                  </div>
                  <div className="kgc-form__group kgc-form__group--full">
                    <label className="kgc-form__label" htmlFor="kgc-details">Tell Us About Your Project</label>
                    <textarea className="kgc-form__textarea" id="kgc-details" name="details" placeholder="Share your project goals, timeline, and requirements..." />
                  </div>
                </div>

                <button type="submit" className="kgc-btn kgc-btn--primary kgc-btn--block kgc-form__submit">
                  Request a Consultation <ArrowRight size={17} />
                </button>

                {submitted && (
                  <div className="kgc-form__success">
                    <CheckCircle2 size={20} />
                    Thanks — your request has been received. Our team will be in touch shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FINAL CTA ============================= */}
      <section className="kgc-final-cta">
        <span className="kgc-final-cta__ring" />
        <span className="kgc-final-cta__ring kgc-final-cta__ring--2" />
        <div className="kgc-container">
          <div className="kgc-final-cta__content kgc-reveal">
            <h2 className="kgc-final-cta__title">Every Industry Deserves the Right Construction Partner</h2>
            <p className="kgc-final-cta__desc">
              From commercial offices and industrial facilities to healthcare, education,
              hospitality, and residential communities, Keentel General Contractors delivers
              construction solutions built on quality, reliability, and long-term value. Let&apos;s
              build your next project with confidence.
            </p>
            <div className="kgc-final-cta__ctas">
              <button className="kgc-btn kgc-btn--navy" onClick={() => scrollToId('kgc-contact')}>
                Start Your Project <ArrowRight size={17} />
              </button>
              <button className="kgc-btn kgc-btn--outline" onClick={() => scrollToId('kgc-contact')}>
                Contact Keentel General Contractors
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
