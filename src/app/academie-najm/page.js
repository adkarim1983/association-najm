'use client';

import React, { useState, useEffect, useRef } from "react";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTranslation } from '../../hooks/useTranslation';

// Composant pour animer les chiffres
function AnimatedNumber({ targetNumber, duration = 2000, suffix = "" }) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const increment = targetNumber / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCurrentNumber(targetNumber);
          clearInterval(timer);
        } else {
          setCurrentNumber(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetNumber, duration]);

  return (
    <span ref={ref}>
      {currentNumber}{suffix}
    </span>
  );
}

export default function AcademieNajmPage() {
  const { t } = useTranslation();
  const [showTop, setShowTop] = useState(false);
  
  // Get translated data
  const header = t('academy.header', { returnObjects: true }) || {};
  const sections = t('academy.sections', { returnObjects: true }) || [];
  const skillReinforcement = t('academy.skillReinforcement', { returnObjects: true }) || {};
  const support = t('academy.support', { returnObjects: true }) || {};
  const recognition = t('academy.recognition', { returnObjects: true }) || {};
  const backToTop = t('academy.backToTop');

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gray-50 text-gray-800 font-sans relative">
          {/* Header */}
          <header className="relative flex flex-col items-center justify-center h-64 sm:h-80 md:h-[450px] bg-white mb-0 shadow-md overflow-hidden px-4">
            <img
              src="/images/imagenum.jpg"
              alt={t("academieNajm.header.title")}
              className="absolute inset-0 w-full h-full object-cover opacity-100"
            />

            <div className="absolute inset-0 bg-blue-900/50" />
            <div className="relative z-10 text-center px-4 max-w-5xl">
              <h1 className="text-[40px] font-extrabold tracking-tight mb-6 drop-shadow-sm leading-tight text-white text-center">
                {header.title}
              </h1>

              <p className="text-xl md:text-2xl font-light italic drop-shadow-sm opacity-90 text-white">
                {header.subtitle}
              </p>
            </div>
          </header>

          {/* Sections */}
          <main className="max-w-7xl mx-auto px-6 py-8 space-y-4">
            {sections.map((section, idx) => {
              const imageMap = ["/images/image2.jpg", "/images/qsn.jpg", "/images/image1.jpg"];
              return (
                <section
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl shadow-xl text-gray-800 ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="md:w-1/2 w-full flex-shrink-0 space-y-4">
                    <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                      <img
                        src={imageMap[idx]}
                        alt={section.alt}
                        className="w-full h-80 object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent rounded-xl"></div>
                    </div>
                    {idx === 0 && (
                      <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                        <img
                          src="/images/image1.jpg"
                          alt="Transformation numérique - Image complémentaire"
                          className="w-full h-80 object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent rounded-xl"></div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 w-full flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                      {section.title}
                      <span className="absolute left-1/2 md:left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full transform -translate-x-1/2 md:translate-x-0"></span>
                    </h2>

                    <p className="text-[18px] text-gray-800 whitespace-pre-line leading-relaxed text-justify mb-6">
                      {section.text}
                    </p>

                    {section.buttonText && (
                      <a
                        href="/programmes"
                        className="inline-block self-start px-10 py-4 bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950 uppercase tracking-wide"
                      >
                        {section.buttonText}
                      </a>
                    )}
                  </div>
                </section>
              );
            })}

            {/* Section: Renforcement des Compétences Parallèles des Jeunes */}
            <section className="py-4 px-6 bg-gray-100 mt-4 text-gray-800 shadow-inner-xl">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
                  {skillReinforcement.title}
                  <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
                </h2>

                <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
                  {skillReinforcement.text}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                  {skillReinforcement.cards?.map((card, index) => (
                    <div key={index} className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                      <div className="text-5xl text-blue-700 mb-4">
                        {index === 0 ? "🧠" : index === 1 ? "🔍" : index === 2 ? "💡" : "👥"}
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#1C398E] text-center">{card.title}</h3>
                      <p className="text-[18px] text-center text-justify leading-relaxed text-gray-700">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* Section Accompagnement */}
          <section className="py-4 px-6 bg-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="text-gray-800">
                  <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-8 leading-tight relative text-center md:text-left">
                    {support.title}
                    <span className="absolute left-1/2 md:left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full transform -translate-x-1/2 md:translate-x-0"></span>
                  </h2>

                  <p className="mb-8 text-[18px] text-gray-700 leading-relaxed text-justify">
                    {support.text}
                  </p>
                  <div className="bg-white p-10 rounded-xl shadow-xl border border-gray-200">
                    <h3 className="text-[30px] font-semibold text-[#1C398E] mb-6 text-center md:text-left leading-tight">
                      {support.programIncludes}
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                      {support.list?.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-700 mr-4 text-3xl">&#10003;</span> 
                          <span className="text-[18px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-700/10 rounded-3xl transform rotate-3 scale-105"></div>
                  <div className="relative w-full h-96 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/image3.jpg" 
                      alt={support.imageText}
                      className="w-full h-full object-cover rounded-3xl opacity-90 transform scale-105 transition-transform duration-500 hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 rounded-3xl"></div>
                    <span className="absolute text-3xl font-bold text-white z-10 drop-shadow-lg">{support.imageText}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Reconnaissance et ambition nationale */}
          <section className="py-4 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center text-gray-800">
              <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
                {recognition.title}
                <span className="block w-32 h-1 bg-[#1C398E] mx-auto mt-4 rounded-full"></span>
              </h2>

              <div className="max-w-5xl mx-auto">
                <p className="text-[18px] text-gray-700 leading-relaxed mb-8 text-justify">
                  {recognition.text}
                </p>
                <div className="bg-white p-10 rounded-2xl text-gray-800 shadow-xl border border-gray-200">
                  <p className="text-[18px] font-medium leading-relaxed opacity-95 text-gray-700 text-justify">
                    {recognition.quote}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bouton retour en haut */}
          {showTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-10 right-10 z-50 bg-blue-700 text-white p-5 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 animate-fade-in-up"
              aria-label={backToTop}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
