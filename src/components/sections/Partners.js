'use client';

import React, { useState, useRef, useEffect } from "react";
const image4 = "/images/image4.jpg";
const image6 = "/images/image6.png";
const image7 = "/images/image7.png";
const image8 = "/images/image8.png";
const image9 = "/images/image9.png";
const image10 = "/images/image10.png";
const image11 = "/images/image11.png";
const image12 = "/images/image12.png";
const ofppt = "/images/ofppt.png";
const logo2 = "/images/logo2.png";

const partners = [
  { id: 1, name: "", image: image4, link: "https://www.univh2c.ma/" },
  { id: 2, name: "", image: ofppt, link: "https://www.ofppt.ma/" },
  { id: 3, name: "", image: image6, link: "https://anapec.ma/home-page-o1/" },
  { id: 4, name: "", image: image7, link: "https://www.entraide.ma/" },
  { id: 5, name: "", image: image8, link: "https://www.amideast.org/morocco" },
  { id: 6, name: "", image: image9, link: "https://moulayrachid.casablancacity.ma/fr" },
  { id: 7, name: "", image: image10, link: "https://enactus-morocco.org/" },
  { id: 8, name: "", image: image11, link: "https://www.odco.gov.ma/" },
  { id: 9, name: "", image: image12, link: "https://carcs.ma/" },
];

export default function Partners() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Défilement automatique
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      if (!isPaused && scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        
        // Si on est à la fin, retour au début
        if (scrollLeft >= scrollWidth - clientWidth) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Sinon, continuer à défiler
          scrollContainerRef.current.scrollBy({
            left: 200,
            behavior: 'smooth'
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, mounted]);

  return (
    <section
      className="py-16 mx-5 px-2 sm:px-4 md:px-6 text-center rounded-lg"
      style={{
        backgroundImage: `url(${logo2})`,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundBlendMode: "lighten",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-2 sm:px-3 md:px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-5 text-blue-900 leading-tight">
          Nos Partenaires
        </h2>
        <p className="text-justify max-w-3xl mx-auto text-gray-700 text-lg">
          Nous collaborons avec des institutions de renom pour maximiser notre impact et créer des synergies durables dans nos domaines d'intervention.
        </p>
        <br />
        <br />
        
        <div className="relative">
          {/* Flèche gauche */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg border-2 border-[#1C398E]/20 hover:border-[#1C398E] hover:bg-[#1C398E]/5 transition-all duration-300 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            style={{ left: '-32px' }}
          >
            <svg
              className="w-6 h-6 mx-auto text-[#1C398E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flèche droite */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg border-2 border-[#1C398E]/20 hover:border-[#1C398E] hover:bg-[#1C398E]/5 transition-all duration-300 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            style={{ right: '-32px' }}
          >
            <svg
              className="w-6 h-6 mx-auto text-[#1C398E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Container scrollable */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <div className="flex gap-12 pb-4 px-4" style={{ minWidth: 'max-content' }}>
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-48 flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-gray-100"
                >
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full h-full items-center justify-center p-4"
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="max-h-full w-auto object-contain transition-transform duration-300"
                      />
                    </a>
                  ) : (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="max-h-full w-auto object-contain transition-transform duration-300"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
