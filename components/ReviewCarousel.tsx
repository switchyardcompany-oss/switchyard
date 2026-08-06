"use client";

import { useEffect, useRef, useState } from "react";

export default function ReviewCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);
  const gap = 28;

  useEffect(() => {
    // Scroll reveal header
    const section = sectionRef.current;
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const header = section.querySelector(".review-header");
              if (header) header.classList.add("review-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(section);
    }

    // Carousel measurements
    const updateDimensions = () => {
      const firstCard = document.querySelector(".review-card") as HTMLElement | null;
      if (firstCard) {
        setCardWidth(firstCard.getBoundingClientRect().width);
      } else {
        setCardWidth(0);
      }
    };

    updateDimensions();
    const frame = window.requestAnimationFrame(updateDimensions);
    const resizeObserver = new ResizeObserver(updateDimensions);
    const container = trackRef.current?.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  const moveAmount = cardWidth + gap;

  const getVisibleCards = () => {
    const container = trackRef.current?.parentElement;
    if (!container || cardWidth <= 0) {
      return 1;
    }

    return Math.max(1, Math.floor(container.clientWidth / (cardWidth + gap)) || 1);
  };

  const getMaxIndex = () => {
    const totalCards = document.querySelectorAll(".review-card").length;
    const visibleCards = getVisibleCards();
    return Math.max(0, totalCards - visibleCards);
  };

  useEffect(() => {
    const maxIndex = getMaxIndex();
    setCanGoPrev(currentIndex > 0);
    setCanGoNext(currentIndex < maxIndex);

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardWidth, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((previousIndex) => Math.max(previousIndex - 1, 0));
  };

  const handleNext = () => {
    const maxIndex = getMaxIndex();
    setCurrentIndex((previousIndex) => Math.min(previousIndex + 1, maxIndex));
  };

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
    }
  }, [currentIndex, moveAmount]);

  // Reusable star SVG element
  const starSvg = (
    <svg className="review-star" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  // Reusable Google logo
  const googleLogo = (
    <div className="review-google-logo">
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <span className="review-google-text">Google</span>
    </div>
  );

  // Helper to create stars row
  const renderStars = () => (
    <div className="review-stars">
      {starSvg}
      {starSvg}
      {starSvg}
      {starSvg}
      {starSvg}
    </div>
  );

  return (
    <section className="review-section" ref={sectionRef}>
      <div className="review-container">
        <div className="review-header">
          <h2 className="review-title">What Our Construction Clients Say</h2>
        </div>

        <div className="review-carousel">
          <button
            className="review-arrow review-arrow--left"
            onClick={handlePrev}
            aria-label="Previous reviews"
            disabled={!canGoPrev}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="review-track-wrapper">
            <div className="review-track" ref={trackRef}>
              {/* Card 1 */}
              <div className="review-card">
                <div className="review-card-header">
                  {renderStars()}
                  {googleLogo}
                </div>
                <p className="review-text">"Keentel managed every trade so I didn't have to think about it. They finished two weeks early and the warranty paperwork was in my inbox the next morning."</p>
                <div className="review-author">
                  <span className="review-name">Marisol R.</span>
                  <span className="review-detail">South Tampa, FL • Whole-home remodel</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="review-card">
                <div className="review-card-header">
                  {renderStars()}
                  {googleLogo}
                </div>
                <p className="review-text">"We've used three contractors over ten years. Keentel is the only one we call now. Disciplined crew, honest budget, zero drama."</p>
                <div className="review-author">
                  <span className="review-name">James P.</span>
                  <span className="review-detail">St. Petersburg, FL • Commercial buildout</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="review-card">
                <div className="review-card-header">
                  {renderStars()}
                  {googleLogo}
                </div>
                <p className="review-text">"Tree through the roof at 2 a.m. They had a crew tarping by 3:15. Insurance documentation included. Felt like family showed up."</p>
                <div className="review-author">
                  <span className="review-name">Lena & Marcus D.</span>
                  <span className="review-detail">Brandon, FL • Emergency storm repair</span>
                </div>
              </div>

              {/* Card 4 (duplicate of 1 for carousel effect) */}
              <div className="review-card">
                <div className="review-card-header">
                  {renderStars()}
                  {googleLogo}
                </div>
                <p className="review-text">"Keentel managed every trade so I didn't have to think about it. They finished two weeks early and the warranty paperwork was in my inbox the next morning."</p>
                <div className="review-author">
                  <span className="review-name">Marisol R.</span>
                  <span className="review-detail">South Tampa, FL • Whole-home remodel</span>
                </div>
              </div>

              {/* Card 5 (duplicate of 2) */}
              <div className="review-card">
                <div className="review-card-header">
                  {renderStars()}
                  {googleLogo}
                </div>
                <p className="review-text">"We've used three contractors over ten years. Keentel is the only one we call now. Disciplined crew, honest budget, zero drama."</p>
                <div className="review-author">
                  <span className="review-name">James P.</span>
                  <span className="review-detail">St. Petersburg, FL • Commercial buildout</span>
                </div>
              </div>

              {/* Card 6 (duplicate of 3) */}
              <div className="review-card">
                <div className="review-card-header">
                  {renderStars()}
                  {googleLogo}
                </div>
                <p className="review-text">"Tree through the roof at 2 a.m. They had a crew tarping by 3:15. Insurance documentation included. Felt like family showed up."</p>
                <div className="review-author">
                  <span className="review-name">Lena & Marcus D.</span>
                  <span className="review-detail">Brandon, FL • Emergency storm repair</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="review-arrow review-arrow--right"
            onClick={handleNext}
            aria-label="Next reviews"
            disabled={!canGoNext}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
