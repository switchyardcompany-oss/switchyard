'use client';

import React, { useEffect, useRef, useState } from 'react';
import ServiceHeroCredentials from '@/components/ServiceHeroCredentials';
import './service-areas.css';

/* ============================================================================
   ICONS — single-color line icons (blueprint-schematic style throughout)
   ============================================================================ */
type IconName =
  | 'shield' | 'users' | 'hammer' | 'message' | 'layers' | 'target'
  | 'building' | 'shop' | 'utensils' | 'bed' | 'cross' | 'factory'
  | 'box' | 'truck' | 'school' | 'landmark' | 'apartment' | 'home'
  | 'check' | 'chevronDown' | 'arrowRight' | 'phone' | 'mail' | 'mapPin'
  | 'clock' | 'doc' | 'sparkle' | 'facebook' | 'instagram' | 'linkedin';

function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };
  switch (name) {
    case 'shield':
      return <svg {...common}><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case 'users':
      return <svg {...common}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" /><circle cx="17" cy="9" r="2.6" /><path d="M15.5 20c.5-2.5 1.8-4 3.7-4.4" /></svg>;
    case 'hammer':
      return <svg {...common}><path d="M14.5 6.5l3 3-8 8-3-3z" /><path d="M12.5 4.5l4.5 4.5" strokeWidth="2.4" /><path d="M4 20l5-5" /></svg>;
    case 'message':
      return <svg {...common}><path d="M4 5h16v11H8l-4 4V5z" /><path d="M8 9h8M8 12h5" /></svg>;
    case 'layers':
      return <svg {...common}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 8l9 5 9-5" /></svg>;
    case 'target':
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></svg>;
    case 'building':
      return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h1M8 11h1M8 15h1M15 7h1M15 11h1M15 15h1M10 21v-4h4v4" /></svg>;
    case 'shop':
      return <svg {...common}><path d="M4 9l1-5h14l1 5" /><path d="M4 9h16v11H4z" /><path d="M9 20v-6h6v6" /></svg>;
    case 'utensils':
      return <svg {...common}><path d="M7 3v7a1 1 0 001 1h0a1 1 0 001-1V3M7 3v18M9 3v5M17 3c-1.5 0-2.5 2-2.5 5s1 5 2.5 5v10" /></svg>;
    case 'bed':
      return <svg {...common}><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6" /><path d="M3 18v3M21 18v3M3 12V7a1 1 0 011-1h5a1 1 0 011 1v3" /></svg>;
    case 'cross':
      return <svg {...common}><path d="M12 6v12M6 12h12" strokeWidth="2.2" /><circle cx="12" cy="12" r="9" /></svg>;
    case 'factory':
      return <svg {...common}><path d="M3 21V11l5 3v-3l5 3V8l6-4v17H3z" /><path d="M7 16h1M11 16h1M15 16h1" /></svg>;
    case 'box':
      return <svg {...common}><path d="M3.5 7.5L12 3l8.5 4.5L12 12 3.5 7.5z" /><path d="M3.5 7.5V17L12 21.5 20.5 17V7.5" /><path d="M12 12v9.5" /></svg>;
    case 'truck':
      return <svg {...common}><rect x="2" y="7" width="12" height="10" rx="1" /><path d="M14 10h4l3 3v4h-7z" /><circle cx="6.5" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>;
    case 'school':
      return <svg {...common}><path d="M12 4l9 4-9 4-9-4 9-4z" /><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" /><path d="M21 8v6" /></svg>;
    case 'landmark':
      return <svg {...common}><path d="M4 10h16M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18M12 3l9 4H3l9-4z" /></svg>;
    case 'apartment':
      return <svg {...common}><rect x="5" y="2.5" width="14" height="19" rx="1" /><path d="M9 6h1.2M13.8 6H15M9 9.5h1.2M13.8 9.5H15M9 13h1.2M13.8 13H15M10 21.5v-4h4v4" /></svg>;
    case 'home':
      return <svg {...common}><path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-6h4v6" /></svg>;
    case 'check':
      return <svg {...common}><path d="M4 12.5l5.5 5.5L20 6.5" strokeWidth="2.2" /></svg>;
    case 'chevronDown':
      return <svg {...common}><path d="M5 8.5l7 7 7-7" strokeWidth="2.2" /></svg>;
    case 'arrowRight':
      return <svg {...common}><path d="M4 12h16M13 5l7 7-7 7" strokeWidth="2.2" /></svg>;
    case 'phone':
      return <svg {...common}><path d="M6 3h3l2 5-2.5 1.7a12 12 0 006 6L16 13l5 2v3a2 2 0 01-2.2 2C10.5 19.5 4.5 13.5 4 5.2A2 2 0 016 3z" /></svg>;
    case 'mail':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6.5L12 13l8.5-6.5" /></svg>;
    case 'mapPin':
      return <svg {...common}><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></svg>;
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
    case 'doc':
      return <svg {...common}><path d="M7 3h7l5 5v13H7V3z" /><path d="M14 3v5h5M9.5 12h5M9.5 15.5h5" /></svg>;
    case 'sparkle':
      return <svg {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></svg>;
    case 'facebook':
      return <svg {...common}><path d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.7-1.5H17V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7H14z" fill="currentColor" stroke="none" /></svg>;
    case 'instagram':
      return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg>;
    case 'linkedin':
      return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><circle cx="8" cy="8.5" r="1" fill="currentColor" stroke="none" /><path d="M8 11v6M12 17v-3.5c0-1.5 1-2.5 2.3-2.5S16.5 12 16.5 13.5V17" /></svg>;
    default:
      return null;
  }
}

/* ============================================================================
   DATA
   ============================================================================ */
const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Service Areas', href: '#areas' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Keentel', href: '#why' },
];

const TRUST_ITEMS = [
  'Statewide Florida Coverage',
  'Commercial & Residential',
  'Licensed & Insured',
  'Professional Project Management',
  'Fast & Reliable Service',
];

const SERVICES: { title: string; blurb: string; img: string; alt: string }[] = [
  {
    title: 'General Construction',
    blurb: 'Ground-up construction managed from permitting through the final punch list.',
    img: 'https://images.pexels.com/photos/5505125/pexels-photo-5505125.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Construction crane and scaffolding on a commercial building site',
  },
  {
    title: 'Design-Build',
    blurb: 'Design and construction under one contract for a single point of accountability.',
    img: 'https://images.pexels.com/photos/6894105/pexels-photo-6894105.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Architect desk with blueprints, laptop, and drafting tools',
  },
  {
    title: 'Pre-Construction',
    blurb: 'Budgeting, scheduling, and planning that sets every project up before ground breaks.',
    img: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Project team reviewing construction plans around a table',
  },
  {
    title: 'Commercial Remodeling',
    blurb: 'Renovations for offices, retail, and hospitality spaces built around your business hours.',
    img: 'https://images.pexels.com/photos/17642042/pexels-photo-17642042.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Modern commercial office building exterior',
  },
  {
    title: 'Residential Remodeling',
    blurb: 'Home renovations and additions completed with care for your household routine.',
    img: 'https://images.pexels.com/photos/36153946/pexels-photo-36153946.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Construction workers renovating an interior room',
  },
  {
    title: 'Industrial Construction',
    blurb: 'Warehouses, distribution centers, and manufacturing facilities built for heavy use.',
    img: 'https://images.pexels.com/photos/12069485/pexels-photo-12069485.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Forklift outside a large industrial warehouse',
  },
  {
    title: 'Electrical Contracting',
    blurb: 'Licensed electrical installation, upgrades, and maintenance for every project type.',
    img: 'https://images.pexels.com/photos/442160/pexels-photo-442160.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Electrician working on an electrical panel installation',
  },
  {
    title: 'Emergency Restoration',
    blurb: 'Rapid-response repair and restoration after storm, fire, or water damage.',
    img: 'https://images.pexels.com/photos/31763543/pexels-photo-31763543.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Stack of roofing tiles staged for a restoration project',
  },
];

type Region = {
  id: string;
  name: string;
  cities: string[];
  img: string;
  alt: string;
  mx: number;
  my: number;
};

const REGIONS: Region[] = [
  {
    id: 'panhandle',
    name: 'Florida Panhandle',
    cities: ['Pensacola', 'Navarre', 'Milton', 'Crestview', 'Destin', 'Fort Walton Beach', 'Panama City', 'Panama City Beach', 'Marianna'],
    img: 'https://images.pexels.com/photos/20194834/pexels-photo-20194834.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Palm trees on a white sand Florida beach',
    mx: 78, my: 118,
  },
  {
    id: 'north',
    name: 'North Florida',
    cities: ['Jacksonville', 'Tallahassee', 'Gainesville', 'Lake City', 'St. Augustine', 'Fernandina Beach', 'Orange Park', 'Middleburg', 'Live Oak', 'Palatka'],
    img: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'St. Augustine Lighthouse and historic district',
    mx: 196, my: 132,
  },
  {
    id: 'central',
    name: 'Central Florida',
    cities: ['Orlando', 'Winter Park', 'Kissimmee', 'Sanford', 'Altamonte Springs', 'Apopka', 'Clermont', 'Winter Garden', 'Oviedo', 'Davenport', 'Lakeland', 'Winter Haven', 'Haines City', 'Bartow', 'Plant City'],
    img: 'https://www.bestwestern.com/content/dam/best-western/hero-image/destinations/united-states/florida/orlando-600x400.jpg',
    alt: 'Orlando Florida skyline with modern buildings',
    mx: 248, my: 216,
  },
  {
    id: 'tampa',
    name: 'Tampa Bay Area',
    cities: ['Tampa', 'St. Petersburg', 'Clearwater', 'Brandon', 'Riverview', 'Wesley Chapel', 'Lutz', 'Palm Harbor', 'Dunedin', 'Largo', 'New Port Richey', 'Spring Hill', 'Brooksville'],
    img: 'https://images.pexels.com/photos/14282410/pexels-photo-14282410.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Downtown Tampa Florida skyline',
    mx: 178, my: 252,
  },
  {
    id: 'eastcoast',
    name: 'East Coast Florida',
    cities: ['Melbourne', 'Palm Bay', 'Cocoa', 'Cocoa Beach', 'Titusville', 'Vero Beach', 'Fort Pierce', 'Port St. Lucie', 'Stuart', 'Sebastian'],
    img: 'https://images.pexels.com/photos/2581927/pexels-photo-2581927.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Cocoa Beach Pier over the Atlantic Ocean',
    mx: 302, my: 262,
  },
  {
    id: 'southwest',
    name: 'Southwest Florida',
    cities: ['Sarasota', 'Bradenton', 'Venice', 'North Port', 'Port Charlotte', 'Punta Gorda', 'Fort Myers', 'Cape Coral', 'Bonita Springs', 'Naples', 'Marco Island'],
    img: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Sarasota beach with white sand and turquoise water',
    mx: 187, my: 340,
  },
  {
    id: 'southeast',
    name: 'Southeast Florida',
    cities: ['Miami', 'Miami Beach', 'Coral Gables', 'Doral', 'Hialeah', 'Fort Lauderdale', 'Hollywood', 'Pembroke Pines', 'Miramar', 'Davie', 'Weston', 'Boca Raton', 'Delray Beach', 'Boynton Beach', 'West Palm Beach', 'Palm Beach Gardens', 'Jupiter'],
    img: 'https://images.pexels.com/photos/28426337/pexels-photo-28426337.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Miami Florida skyline framed by palm trees',
    mx: 284, my: 384,
  },
  {
    id: 'keys',
    name: 'South Florida & Florida Keys',
    cities: ['Homestead', 'Florida City', 'Key Largo', 'Islamorada', 'Marathon', 'Key West'],
    img: 'https://images.pexels.com/photos/2675891/pexels-photo-2675891.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Tropical house with palm trees in Key West, Florida',
    mx: 213, my: 438,
  },
];

const COUNTIES = [
  'Alachua', 'Baker', 'Bay', 'Bradford', 'Brevard', 'Broward', 'Calhoun', 'Charlotte', 'Citrus',
  'Clay', 'Collier', 'Columbia', 'DeSoto', 'Dixie', 'Duval', 'Escambia', 'Flagler', 'Franklin',
  'Gadsden', 'Gilchrist', 'Glades', 'Gulf', 'Hamilton', 'Hardee', 'Hendry', 'Hernando', 'Highlands',
  'Hillsborough', 'Holmes', 'Indian River', 'Jackson', 'Jefferson', 'Lafayette', 'Lake', 'Lee', 'Leon',
  'Levy', 'Liberty', 'Madison', 'Manatee', 'Marion', 'Martin', 'Miami-Dade', 'Monroe', 'Nassau',
  'Okaloosa', 'Okeechobee', 'Orange', 'Osceola', 'Palm Beach', 'Pasco', 'Pinellas', 'Polk', 'Putnam',
  'Santa Rosa', 'Sarasota', 'Seminole', 'St. Johns', 'St. Lucie', 'Sumter', 'Suwannee', 'Taylor',
  'Union', 'Volusia', 'Wakulla', 'Walton', 'Washington',
];

const INDUSTRIES: { name: string; img: string; alt: string }[] = [
  { name: 'Commercial Offices', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_C4GVc9VhVRIULoVYnNt0LJl6230SyyRuLgILzRpIdER40_4m7Jn2Ys&s=10', alt: 'Modern office building interior' },
  { name: 'Retail Centers', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRoJxofjB29wby10QpD2VW7AkDZv1SYmUBLOeh-cv7Q&s=10', alt: 'Shopping mall interior' },
  { name: 'Restaurants', img: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Restaurant interior with tables' },
  { name: 'Hospitality', img: 'https://images.pexels.com/photos/2609220/pexels-photo-2609220.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Hotel lobby' },
  { name: 'Healthcare', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CNW_706EazVqdnrc0NkoCdXFtV4eGBnGGxGoPTTDIQ&s=10', alt: 'Hospital corridor' },
  { name: 'Industrial Facilities', img: 'https://images.pexels.com/photos/2827374/pexels-photo-2827374.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Industrial factory exterior' },
  { name: 'Manufacturing Plants', img: 'https://images.pexels.com/photos/4315100/pexels-photo-4315100.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Manufacturing assembly line' },
  { name: 'Warehouses', img: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Warehouse interior with racks' },
  { name: 'Distribution Centers', img: 'https://images.pexels.com/photos/5822922/pexels-photo-5822922.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Trucks at distribution center' },
  { name: 'Educational Facilities', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHi0hpDGe-UePzxw6Lli7K9ONwRa_eVJV8gWsUapq3PQ&s=10', alt: 'School building exterior' },
  { name: 'Government Buildings', img: 'https://images.pexels.com/photos/994606/pexels-photo-994606.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Government courthouse' },
  { name: 'Multi-Family Communities', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Apartment complex' },
  { name: 'Residential Developments', img: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Residential neighborhood' },
];

const WHY_US: { title: string; blurb: string; img: string; alt: string }[] = [
  {
    title: 'Statewide Florida Coverage',
    blurb: 'One licensed construction partner serving projects across all 67 Florida counties.',
    img: '/images/services/Commercial Construction.jpg',
    alt: 'Large commercial construction project in progress',
  },
  {
    title: 'Experienced Project Team',
    blurb: 'Professional project managers and skilled construction specialists guide every phase.',
    img: '/images/services/construction-workers-building-site.jpg',
    alt: 'Construction professionals coordinating work on site',
  },
  {
    title: 'Quality Craftsmanship',
    blurb: 'Disciplined execution and careful quality control create durable, dependable results.',
    img: '/images/services/Facility Expansions.jpg',
    alt: 'Construction team completing a major facility expansion',
  },
  {
    title: 'Clear, Reliable Communication',
    blurb: 'Straightforward updates keep owners informed from consultation through completion.',
    img: '/images/services/One Team. One Vision. One Successful Project..jpg',
    alt: 'Project team reviewing construction plans together',
  },
];

const FL_OUTLINE_PATH =
  'M32 140 L66 112 L118 96 L168 90 L204 110 L228 96 L258 101 L288 149 L308 208 L318 268 L309 328 L290 377 L271 418 L251 439 L226 454 L201 460 L182 449 L189 424 L172 432 L163 409 L158 360 L163 309 L157 259 L146 209 L136 169 L107 163 L78 158 L50 154 Z';

/* ============================================================================
   REVEAL WRAPPER
   ============================================================================ */
function Reveal({
  children,
  className = '',
  delay,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={`ktl-reveal${delay ? ` ktl-reveal--${delay}` : ''}${inView ? ' ktl-in-view' : ''} ${className}`}
    >
      {children}
    </Comp>
  );
}

/* ============================================================================
   MAIN PAGE
   ============================================================================ */
export default function ServiceAreasPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string>('southeast');
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [activeWhy, setActiveWhy] = useState(0);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleRegion = (id: string) => {
    setExpandedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeRegionData = REGIONS.find((r) => r.id === activeRegion) ?? REGIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="ktl-page">
      {/* ============================== NAV ============================== */}
      <header className={`ktl-nav${navScrolled ? ' ktl-nav--scrolled' : ''}`}>
        <div className="ktl-container ktl-nav-inner">
          <a href="#top" className="ktl-logo">
            <span className="ktl-logo-mark">KEENTEL</span>
            <span className="ktl-logo-sub">General Contractors</span>
          </a>
          <nav className="ktl-nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <div className="ktl-nav-cta">
            <span className="ktl-nav-phone">
              <Icon name="phone" className="ktl-inline-icon" /> (813) 395-0000
            </span>
            <a href="#contact" className="ktl-btn ktl-btn--primary ktl-btn--sm">
              Get a Quote <Icon name="arrowRight" />
            </a>
            <button
              className={`ktl-nav-toggle${navOpen ? ' ktl-nav-toggle--open' : ''}`}
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="ktl-container" style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setNavOpen(false)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: navScrolled ? 'var(--color-navy)' : 'var(--color-white)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ============================== HERO ============================== */}
      <section id="top" className="ktl-hero">
        <div className="ktl-hero-media">
          <video
            className="ktl-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.pexels.com/photos/5505125/pexels-photo-5505125.jpeg?auto=compress&cs=tinysrgb&w=1600"
          >
            <source src="/Video/service-areas.mp4" type="video/mp4" />
          </video>
          <div className="ktl-hero-overlay" />
          <div className="ktl-blueprint-grid ktl-blueprint-grid--light" />
        </div>

        <div className="ktl-container ktl-hero-inner">
          <h1>
            <span><b>Construction Services Across</b></span>
            <span><b>the State of Florida</b></span>
          </h1>
          <p className="ktl-hero-sub">
            Wherever your project is located in Florida, Keentel General Contractors is ready to
            deliver dependable construction, remodeling, electrical contracting, and restoration
            services — for commercial, industrial, and residential clients statewide.
          </p>
          <div className="service-hero-bottom-row">
            <div className="ktl-hero-actions">
              <a href="#contact" className="ktl-btn ktl-btn--primary">
                Book a Consultation <Icon name="arrowRight" />
              </a>
              <a href="tel:8133950000" className="ktl-btn ktl-btn--outline">
                Call Us
              </a>
            </div>
            <ServiceHeroCredentials />
          </div>
          <div className="ktl-hero-coords">
            <span className="ktl-dot-live" />
            27.6648° N, 81.5158° W — Statewide Florida Service Area
          </div>
        </div>
      </section>

      {/* ============================== TRUST MARQUEE ============================== */}
      <div className="ktl-marquee-band">
        <div className="ktl-marquee-track">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <span className="ktl-marquee-item" key={i}>
              <Icon name="check" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ============================== ABOUT ============================== */}
      <section className="ktl-section">
        <div className="ktl-container ktl-about">
          <Reveal className="ktl-about-media">
            <div className="ktl-about-img-wrap ktl-corner-frame ktl-always-on">
              <span className="ktl-corner-bl" /><span className="ktl-corner-br" />
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Construction and project management team collaborating"
                loading="lazy"
              />
            </div>
            <div className="ktl-about-badge">
              <span className="ktl-about-badge-icon"><Icon name="shield" /></span>
              <div>
                <strong>Licensed &amp; Insured</strong>
                <span>Statewide Florida projects</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="ktl-about-copy" delay={2}>
            <span className="ktl-eyebrow">Local Expertise. Statewide Reach.</span>
            <h2>A Trusted Construction Partner in Every Florida Community</h2>
            <p>
              At Keentel General Contractors, we proudly serve clients throughout Florida with
              comprehensive construction solutions tailored to local communities and project
              requirements.
            </p>
            <p>
              Whether you&rsquo;re planning new construction, renovating an existing property,
              expanding your business, or restoring a damaged building, our experienced team
              delivers the same commitment to quality, communication, and professionalism on
              every project — from major metropolitan areas to growing communities.
            </p>
            <ul className="ktl-about-list">
              <li><Icon name="check" /> General &amp; Design-Build Construction</li>
              <li><Icon name="check" /> Commercial &amp; Residential Remodeling</li>
              <li><Icon name="check" /> Industrial &amp; Electrical Contracting</li>
              <li><Icon name="check" /> Emergency Restoration Services</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============================== SERVICE AREAS / CITIES ============================== */}
      <section id="areas" className="ktl-section ktl-coverage-section">
        <div className="ktl-container">
          <div className="ktl-coverage-intro">
            <Reveal className="ktl-section-head" as="div">
              <span className="ktl-eyebrow">Florida Cities We Serve</span>
              <h2>Coverage in Every Corner of the Sunshine State</h2>
              <p>
                From the Panhandle to the Keys, our teams travel across Florida&rsquo;s regions for
                projects of every size. Select a region to explore the communities we serve.
              </p>
            </Reveal>
            <Reveal className="ktl-coverage-summary" delay={2} as="div">
              <div><strong>67</strong><span>Florida counties</span></div>
              <div><strong>{REGIONS.length}</strong><span>Service regions</span></div>
              <div><strong>1</strong><span>Accountable team</span></div>
            </Reveal>
          </div>

          <div className="ktl-grid-regions">
            {REGIONS.map((region, i) => {
              const isOpen = expandedRegions.has(region.id);
              const preview = region.cities.slice(0, 4);
              return (
                <Reveal key={region.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <div className="ktl-region-card">
                    <div className={`ktl-region-visual${region.img ? '' : ' ktl-region-visual--gradient'}`}>
                      {region.img && <img src={region.img} alt={region.alt} loading="lazy" />}
                      <span className="ktl-region-index">{String(i + 1).padStart(2, '0')}</span>
                      <div className="ktl-region-title">
                        <span className="ktl-region-visual-icon"><Icon name="mapPin" /></span>
                        <span className="ktl-region-name">{region.name}</span>
                      </div>
                    </div>
                    <div className="ktl-region-body">
                      <span className="ktl-region-count">{region.cities.length} communities in this region</span>
                      <div className="ktl-region-pills">
                        {preview.map((c) => (
                          <span className="ktl-region-pill" key={c}>{c}</span>
                        ))}
                      </div>
                      <button
                        className={`ktl-region-toggle${isOpen ? ' ktl-region-toggle--open' : ''}`}
                        onClick={() => toggleRegion(region.id)}
                        aria-expanded={isOpen}
                      >
                        {isOpen ? 'Hide full list' : 'View all cities'} <Icon name="chevronDown" />
                      </button>
                      <div className={`ktl-region-full-list${isOpen ? ' ktl-region-full-list--open' : ''}`}>
                        {region.cities.map((c) => <span key={c}>{c}</span>)}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </section>

      {/* ============================== SERVICES ============================== */}
      <section id="services" className="ktl-section ktl-section--off">
        <div className="ktl-container">
          <Reveal className="ktl-section-head ktl-section-head--center" as="div">
            <span className="ktl-eyebrow" style={{ justifyContent: 'center' }}>What We Build</span>
            <h2>Construction Services Available</h2>
            <p>
              Available for commercial, industrial, institutional, and residential projects
              throughout Florida — from first sketch to final walkthrough.
            </p>
          </Reveal>

          <div className="ktl-grid-services">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <article className="ktl-service-card">
                  <div className="ktl-service-media">
                    <span className="ktl-service-num">{String(i + 1).padStart(2, '0')}</span>
                    <img src={service.img} alt={service.alt} loading="lazy" />
                  </div>
                  <div className="ktl-service-body">
                    <h3>{service.title}</h3>
                    <p>{service.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== WHY CHOOSE US ============================== */}
      <section id="why" className="ktl-section ktl-why-section">
        <div className="ktl-container">
          <Reveal className="ktl-section-head ktl-why-heading" as="div">
            <span className="ktl-eyebrow">Why Choose Keentel</span>
            <h2>A Trusted Construction Partner Across Florida</h2>
            <p>Experience, accountability, and statewide capability for projects that need to move forward with confidence.</p>
          </Reveal>
          <div className="ktl-why-accordion" role="list" aria-label="Reasons to choose Keentel">
            {WHY_US.map((item, i) => (
              <article
                key={item.title}
                className={`ktl-why-panel${activeWhy === i ? ' ktl-why-panel--active' : ''}`}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setActiveWhy(i)}
                onFocus={() => setActiveWhy(i)}
                onClick={() => setActiveWhy(i)}
                aria-label={`${item.title}. ${item.blurb}`}
              >
                <img src={item.img} alt={item.alt} loading="lazy" />
                <span className="ktl-why-panel-shade" aria-hidden="true" />
                <span className="ktl-why-panel-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="ktl-why-panel-copy">
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== SERVICE AREA MAP (signature) ============================== */}
      <section className="ktl-section ktl-map-section">
        <div className="ktl-blueprint-grid ktl-blueprint-grid--light" style={{ opacity: 0.6 }} />
        <div className="ktl-container" style={{ position: 'relative' }}>
          <Reveal className="ktl-map-section-head" as="div">
            <span className="ktl-eyebrow ktl-eyebrow--light">Serving the Entire State of Florida</span>
            <h2>An Interactive Look at Our Florida Service Area</h2>
            <p>
              Select a marker to see the region and communities we serve there — then request
              service in your area with one click.
            </p>
          </Reveal>

          <div className="ktl-map-layout">
            <Reveal className="ktl-map-svg-wrap" as="div">
              <div className="ktl-map-card">
              <div className="ktl-map-card-head">
                <span>Florida Coverage Network</span>
                <strong>{REGIONS.length} Active Regions</strong>
              </div>
              <svg className="ktl-map-svg" viewBox="0 0 340 480" role="img" aria-label="Interactive Florida construction service area map">
                <path className="ktl-fl-outline" d={FL_OUTLINE_PATH} />
                <path className="ktl-map-scan" d={FL_OUTLINE_PATH} />
                {REGIONS.map((region) => (
                  <g
                    key={region.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`View service locations in ${region.name}`}
                    className={`ktl-marker${activeRegion === region.id ? ' ktl-marker--active' : ''}`}
                    onClick={() => setActiveRegion(region.id)}
                    onMouseEnter={() => setActiveRegion(region.id)}
                    onFocus={() => setActiveRegion(region.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveRegion(region.id);
                      }
                    }}
                  >
                    <circle className="ktl-marker-ring" cx={region.mx} cy={region.my} r="5" />
                    <circle className="ktl-marker-dot" cx={region.mx} cy={region.my} r={activeRegion === region.id ? 6 : 4.5} />
                    <text className="ktl-marker-label" x={region.mx + 10} y={region.my + 3}>
                      {region.name.replace('Florida', '').replace('Area', '').trim()}
                    </text>
                  </g>
                ))}
              </svg>
              </div>
            </Reveal>

            <Reveal className="ktl-map-copy" delay={2} as="div">
              <div className="ktl-map-feature">
                <div className="ktl-map-feature-image">
                  <img src={activeRegionData.img} alt={activeRegionData.alt} />
                </div>
                <div className="ktl-map-region-nav" role="tablist" aria-label="Select a Florida service region">
                  {REGIONS.map((region) => (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeRegion === region.id}
                      className={activeRegion === region.id ? 'is-active' : ''}
                      onClick={() => setActiveRegion(region.id)}
                      key={region.id}
                    >
                      {region.name.replace('Florida', '').replace('Area', '').trim()}
                    </button>
                  ))}
                </div>
                <div className="ktl-map-feature-caption">
                  <div>
                    <span>Selected service region</span>
                    <h3>{activeRegionData.name}</h3>
                  </div>
                  <strong>{activeRegionData.cities.length} cities</strong>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== CONTACT ============================== */}
      <section id="contact" className="ktl-section ktl-contact-section">
        <div className="ktl-container">
          <Reveal className="ktl-section-head ktl-section-head--center" as="div">
            <span className="ktl-eyebrow" style={{ justifyContent: 'center' }}>Get In Touch</span>
            <h2>Looking for a Contractor Near You?</h2>
            <p>
              Whether you&rsquo;re planning a commercial development, remodeling your home,
              expanding an industrial facility, or recovering after unexpected property damage,
              Keentel General Contractors is ready to help anywhere in Florida.
            </p>
          </Reveal>

          <Reveal as="div">
            <div className="ktl-contact-layout">
              <div className="ktl-contact-side">
                <div className="ktl-contact-side-img">
                  <img
                    src="https://images.pexels.com/photos/6894105/pexels-photo-6894105.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt=""
                  />
                </div>
                <div className="ktl-contact-side-content">
                  <h3>Let&rsquo;s Talk About Your Project</h3>
                  <p>Our team responds quickly and will help scope your project, timeline, and budget — anywhere in Florida.</p>
                  <div className="ktl-contact-points">
                    <div className="ktl-contact-point">
                      <span className="ktl-contact-point-icon"><Icon name="phone" /></span>
                      <div><strong>Call Us</strong><span>(813) 395-0000</span></div>
                    </div>
                    <div className="ktl-contact-point">
                      <span className="ktl-contact-point-icon"><Icon name="mail" /></span>
                      <div><strong>Email Us</strong><span>projects@keentelgc.com</span></div>
                    </div>
                    <div className="ktl-contact-point">
                      <span className="ktl-contact-point-icon"><Icon name="clock" /></span>
                      <div><strong>Response Time</strong><span>Within one business day</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ktl-contact-form-wrap">
                {submitted ? (
                  <div className="ktl-form-success">
                    <Icon name="check" />
                    <div>
                      <strong>Request received</strong>
                      <span>Thanks for reaching out — a Keentel project manager will follow up shortly.</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="ktl-form-row">
                      <div className="ktl-field">
                        <label htmlFor="fullName">Full Name</label>
                        <input id="fullName" type="text" required placeholder="Jane Rivera" />
                      </div>
                      <div className="ktl-field">
                        <label htmlFor="company">Company (Optional)</label>
                        <input id="company" type="text" placeholder="Rivera Retail Group" />
                      </div>
                    </div>
                    <div className="ktl-form-row">
                      <div className="ktl-field">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" required placeholder="jane@email.com" />
                      </div>
                      <div className="ktl-field">
                        <label htmlFor="phoneNum">Phone Number</label>
                        <input id="phoneNum" type="tel" required placeholder="(813) 555-1234" />
                      </div>
                    </div>
                    <div className="ktl-form-row">
                      <div className="ktl-field">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" placeholder="e.g. Tampa" />
                      </div>
                      <div className="ktl-field">
                        <label htmlFor="county">County</label>
                        <select id="county" defaultValue="">
                          <option value="" disabled>Select a county</option>
                          {COUNTIES.map((c) => <option key={c} value={c}>{c} County</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="ktl-form-row">
                      <div className="ktl-field">
                        <label htmlFor="serviceNeeded">Service Needed</label>
                        <select id="serviceNeeded" defaultValue="">
                          <option value="" disabled>Select a service</option>
                          {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                      <div className="ktl-field">
                        <label htmlFor="projectType">Project Type</label>
                        <select id="projectType" defaultValue="">
                          <option value="" disabled>Select project type</option>
                          <option>Commercial</option>
                          <option>Industrial</option>
                          <option>Residential</option>
                          <option>Institutional</option>
                        </select>
                      </div>
                    </div>
                    <div className="ktl-field">
                      <label htmlFor="details">Project Details</label>
                      <textarea id="details" placeholder="Tell us a bit about your project, timeline, and location..." />
                    </div>
                    <button type="submit" className="ktl-btn ktl-btn--primary ktl-btn--block">
                      Request a Free Consultation <Icon name="arrowRight" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
