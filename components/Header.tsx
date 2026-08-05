"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [suppressDesktopDropdown, setSuppressDesktopDropdown] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setSuppressDesktopDropdown(false);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
    if (!isMobileMenuOpen) {
      setOpenDropdown(null);
      setOpenSubmenu(null);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
    setOpenDropdown(null);
    setOpenSubmenu(null);
    setSuppressDesktopDropdown(true);
  };

  const toggleDropdown = (name: string) => {
    if (!isMobileMenuOpen) return;
    const nextDropdown = openDropdown === name ? null : name;
    setOpenDropdown(nextDropdown);
    if (!nextDropdown) setOpenSubmenu(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1120 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
      setOpenSubmenu(null);
      setSuppressDesktopDropdown(true);
      document.body.style.overflow = "";

      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header className="header" role="banner" ref={headerRef}>
      <div className="header__inner">
        <Link href="/" className="logo" onClick={closeMobileMenu}>
          <Image
            src="/images/header-logo.webp"
            alt="Keentel General Contractors"
            className="logo__img"
            width={1800}
            height={288}
            sizes="(max-width: 560px) 200px, 270px"
            priority
          />
        </Link>

        <button
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            aria-hidden="true"
          >
            <path
              d={isMobileMenuOpen ? "M5 5l14 14M19 5L5 19" : "M3 6h18M3 12h18M3 18h18"}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="header-right">
          <nav aria-label="Main navigation">
            <ul className={`nav ${isMobileMenuOpen ? "active" : ""}`} id="nav">
              <li><Link href="/" className="nav__link" onClick={closeMobileMenu}>Home</Link></li>
              <li><Link href="/about" className="nav__link" onClick={closeMobileMenu}>About Us</Link></li>

              {/* Services Dropdown - Updated */}
             
<li
  className={`nav-item-has-dropdown ${suppressDesktopDropdown ? "dropdown-suppressed" : ""}`}
  onMouseEnter={() => setSuppressDesktopDropdown(false)}
  onMouseLeave={() => setSuppressDesktopDropdown(false)}
>
  <Link
    href="/services"
    className={`nav__link dropdown-toggle ${openDropdown === "services" ? "rotate-chevron" : ""}`}
    onClick={(e) => {
      if (isMobileMenuOpen) {
        e.preventDefault();
        toggleDropdown("services");
      }
    }}
  >
    Services <span className="dropdown-chevron">⌵</span>
  </Link>
  <ul className={`dropdown-menu ${openDropdown === "services" ? "show-mobile" : ""}`}>
    <li><Link href="/services" className="dropdown-link dropdown-link--main" onClick={closeMobileMenu}>All Services</Link></li>
    <li><Link href="/services/pre-construction" className="dropdown-link" onClick={closeMobileMenu}>Pre-Construction</Link></li>
    <li><Link href="/services/design-build" className="dropdown-link" onClick={closeMobileMenu}>Design-Build</Link></li>
    <li><Link href="/services/general-construction" className="dropdown-link" onClick={closeMobileMenu}>General Construction</Link></li>
    <li><Link href="/services/commercial-remodeling" className="dropdown-link" onClick={closeMobileMenu}>Commercial Remodeling</Link></li>
    <li><Link href="/services/residential-remodeling" className="dropdown-link" onClick={closeMobileMenu}>Residential Remodeling</Link></li>
    <li className="dropdown-submenu-parent">
      <div className="dropdown-submenu-row">
        <Link href="/services/electrical-contracting" className="dropdown-link" onClick={closeMobileMenu}>
          Electrical Contracting
        </Link>
        <button
          type="button"
          className="dropdown-submenu-toggle"
          aria-label="Show Electrical Contracting services"
          aria-expanded={openSubmenu === "electrical"}
          onClick={() => setOpenSubmenu(openSubmenu === "electrical" ? null : "electrical")}
        >
          ›
        </button>
      </div>
      <ul className={`sub-dropdown-menu ${openSubmenu === "electrical" ? "show-mobile" : ""}`}>
        <li><Link href="/services/electrical-contracting/residential-services" onClick={closeMobileMenu}>Residential Services</Link></li>
        <li><Link href="/services/electrical-contracting/commercial-services" onClick={closeMobileMenu}>Commercial Services</Link></li>
        <li><Link href="/services/electrical-contracting/industrial-services" onClick={closeMobileMenu}>Industrial Services</Link></li>
        <li><Link href="/services/electrical-contracting/electrical-engineering-services" onClick={closeMobileMenu}>Electrical Engineering Services</Link></li>
        <li><Link href="/services/electrical-contracting/troubleshooting-repairs" onClick={closeMobileMenu}>24/7 Troubleshooting &amp; Repairs</Link></li>
      </ul>
    </li>
    <li><Link href="/services/emergency-restoration" className="dropdown-link" onClick={closeMobileMenu}>Emergency Restoration</Link></li>
  </ul>
</li>

<li><Link href="/projects" className="nav__link" onClick={closeMobileMenu}>Projects</Link></li>
<li><Link href="/industries" className="nav__link" onClick={closeMobileMenu}>Industries</Link></li>
<li><Link href="/service-areas" className="nav__link" onClick={closeMobileMenu}>Service Areas</Link></li>

              {/* Service Areas Dropdown */}
              {/* <li className="nav-item-has-dropdown">
                <a
                  href="#"
                  className={`nav__link dropdown-toggle ${openDropdown === "areas" ? "rotate-chevron" : ""}`}
                  onClick={(e) => { e.preventDefault(); toggleDropdown("areas"); }}
                >
                  Service Areas <span className="dropdown-chevron"></span>
                </a>
                <ul className={`dropdown-menu ${openDropdown === "areas" ? "show-mobile" : ""}`}>
                  <li><Link href="/service-areas/tampa" className="dropdown-link" onClick={closeMobileMenu}>Tampa</Link></li>
                  <li><Link href="/service-areas/citrus" className="dropdown-link" onClick={closeMobileMenu}>Citrus</Link></li>
                  <li><Link href="/service-areas/hernando" className="dropdown-link" onClick={closeMobileMenu}>Hernando</Link></li>
                  <li><Link href="/service-areas/hillsborough" className="dropdown-link" onClick={closeMobileMenu}>Hillsborough</Link></li>
                  <li><Link href="/service-areas/manatee" className="dropdown-link" onClick={closeMobileMenu}>Manatee</Link></li>
                  <li><Link href="/service-areas/pasco" className="dropdown-link" onClick={closeMobileMenu}>Pasco</Link></li>
                  <li><Link href="/service-areas/pinellas" className="dropdown-link" onClick={closeMobileMenu}>Pinellas</Link></li>
                  <li><Link href="/service-areas/polk" className="dropdown-link" onClick={closeMobileMenu}>Polk</Link></li>
                  <li><Link href="/service-areas/sarasota" className="dropdown-link" onClick={closeMobileMenu}>Sarasota</Link></li>
                </ul>
              </li> */}

              
              <li><Link href="/blog" className="nav__link" onClick={closeMobileMenu}>Blogs</Link></li>
              <li><Link href="/contact" className="nav__link" onClick={closeMobileMenu}>Contact</Link></li>
            </ul>
          </nav>
          <Link href="/contact#contactformsection" className="cta-button" onClick={closeMobileMenu}>Get a Quote</Link>
        </div>
        <div className={`nav-overlay ${isMobileMenuOpen ? "active" : ""}`} id="navOverlay" onClick={closeMobileMenu}></div>
      </div>
    </header>
  );
}
