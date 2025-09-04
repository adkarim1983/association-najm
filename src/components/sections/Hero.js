'use client';

import React, { useState, useEffect } from "react";
// Using public images
const imageB = "/images/B.jpg";
const imageC = "/images/C.jpg";
const imageD = "/images/D.jpg";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const images = [
    {
      src: imageB,
      title: "Association Najm",
      description: "Pour un avenir meilleur à travers l'éducation, la culture et la solidarité.",
    },
    {
      src: imageC,
      title: "Éducation et Engagement",
      description: "Rejoignez-nous pour construire un monde plus juste et plus humain.",
    },
    {
      src: imageD,
      title: "Solidarité Active",
      description: "Unissons nos forces pour un impact positif dans notre société.",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [mounted]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const { src, title, description } = images[currentIndex];

  return (
    <section className="relative mx-4 md:mx-8 lg:mx-12 xl:mx-16 my-8">
      {/* Conteneur principal avec effet de profondeur */}
      <div className="relative rounded-3xl md:rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] group">
        {/* Image avec effet parallaxe */}
        <div className="relative overflow-hidden">
          <img
            src={src}
            alt={title}
            className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] xl:h-[80vh] object-cover transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-110"
          />
          
          {/* Overlay gradient sophistiqué */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        {/* Boutons de navigation élégants */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full z-20 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg group/btn"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 mx-auto transition-transform duration-300 group-hover/btn:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full z-20 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg group/btn"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 mx-auto transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Contenu textuel avec design moderne */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-left">
          {/* Titre avec effet de brillance */}
          <div className="relative mb-2 md:mb-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
              <span className="text-3xl bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent drop-shadow-xl">
                {title}
              </span>
            </h2>
            {/* Ligne décorative */}
            <div className="w-12 md:w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 md:mt-3 shadow-lg"></div>
          </div>
          
          {/* Description avec style raffiné */}
          <div className="max-w-2xl">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed font-light backdrop-blur-sm">
              {description}
            </p>
          </div>
        </div>

        {/* Indicateurs de pagination modernisés */}
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-10 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative transition-all duration-500 ${
                index === currentIndex 
                  ? 'w-8 md:w-12 h-2 md:h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg' 
                  : 'w-2 md:w-3 h-2 md:h-3 bg-white/40 hover:bg-white/60 rounded-full'
              }`}
            >
              {index === currentIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Effet de particules décoratif */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-30">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="w-1 h-1 bg-white rounded-full absolute top-6 left-3 animate-pulse delay-300"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full absolute -top-2 left-8 animate-pulse delay-700"></div>
        </div>
      </div>
      
      {/* Effet d'ombre étendue */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-xl -z-10 opacity-60"></div>
    </section>
  );
}
