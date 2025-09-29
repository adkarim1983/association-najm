'use client';

import React, { useState, useEffect } from "react";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function ProgrammesPage() {
  const { t } = useTranslation();
  const [showTop, setShowTop] = useState(false);
  // Pour la modal d'image
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Get translated data
  const header = t('programs.header', { returnObjects: true }) || {};
  const cards = t('programs.cards', { returnObjects: true }) || [];
  const introduction = t('programs.introduction', { returnObjects: true }) || {};
  const webDevelopment = t('programs.webDevelopment', { returnObjects: true }) || {};
  const digitalMarketing = t('programs.digitalMarketing', { returnObjects: true }) || {};
  const visualDesign = t('programs.visualDesign', { returnObjects: true }) || {};
  const conclusion = t('programs.conclusion', { returnObjects: true }) || {};
  const images = t('programs.images', { returnObjects: true }) || {};
  const backToTop = t('programs.backToTop');

  const programImages = [
    { src: "/images/A.jpg", alt: images.webDev || "Formation développement web" },
    { src: "/images/B.jpg", alt: images.marketing || "Marketing digital" },
    { src: "/images/C.jpg", alt: images.design || "Design et création visuelle" },
    { src: "/images/D.jpg", alt: images.students || "Étudiants en formation" },
    { src: "/images/image1a.jpg", alt: images.workshop || "Atelier pratique" },
    // Marketing Digital images (mk1, mk2, mk3)
    { src: "/imageFormation/mk1.jpg", alt: images.marketingImage1 || "Marketing digital - Image 1" },
    { src: "/imageFormation/mk2.jpg", alt: images.marketingImage2 || "Marketing digital - Image 2" },
    { src: "/imageFormation/mk3.jpg", alt: images.marketingImage3 || "Marketing digital - Image 3" },
    // Design et Création Visuelle images (ds1, ds2)
    { src: "/imageFormation/ds1.jpg", alt: images.designImage1 || "Design et création visuelle - Image 1" },
    { src: "/imageFormation/ds2.jpg", alt: images.designImage2 || "Design et création visuelle - Image 2" }
  ];

  return (
  <div className="min-h-screen bg-gradient-to-tr from-[#1C398E] via-[#6C63FF] to-[#FBBF24] bg-fixed">
      <Navbar />
      <main className="pt-16">
        <div className="text-gray-800 font-sans">
          {/* Header */}
          <header className="relative flex flex-col items-center justify-center min-h-[700px] md:min-h-[800px] bg-gradient-to-br from-[#FBBF24]/10 via-[#6C63FF]/10 to-[#1C398E]/10 mb-0 overflow-hidden px-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#1C398E]/30 to-[#6C63FF]/30 rounded-full blur-2xl"></div>
              <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-[#FBBF24]/30 to-[#6C63FF]/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-[#6C63FF]/30 to-[#1C398E]/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-[#FBBF24]/30 to-[#1C398E]/30 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-4xl mb-12">
              <div className="inline-block mb-8 mt-10">
                <span className="bg-gradient-to-r from-[#1C398E] via-[#6C63FF] to-[#FBBF24] text-white px-6 py-2 rounded-full text-base font-semibold tracking-wide uppercase shadow-lg">
                  {header.badge}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-tight drop-shadow-2xl text-[#181F4B]">
                {header.title}
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-gray-900 max-w-3xl mx-auto leading-relaxed bg-white/70 rounded-2xl px-6 py-4 inline-block shadow-lg backdrop-blur-xl border border-white/40">
                {header.subtitle}
              </p>
            </div>

            {/* Enhanced Programs Card */}
            <div className="relative z-10 w-full max-w-6xl">
              <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-[#1C398E]/10 hover:shadow-3xl transition-all duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {cards.map((card, index) => {
                    const colorSchemes = [
                      { bg: 'from-yellow-50 to-orange-100', hoverBg: 'hover:from-yellow-100 hover:to-orange-200', mainColor: '#FFC32C', skillBg: 'yellow', transform: 'hover:rotate-1' },
                      { bg: 'from-purple-50 to-indigo-100', hoverBg: 'hover:from-purple-100 hover:to-indigo-200', mainColor: '#7149A0', skillBg: 'purple', transform: 'hover:-rotate-1' },
                      { bg: 'from-green-50 to-emerald-100', hoverBg: 'hover:from-green-100 hover:to-emerald-200', mainColor: '#73B363', skillBg: 'green', transform: 'hover:rotate-1' }
                    ];
                    const scheme = colorSchemes[index] || colorSchemes[0];
                    
                    return (
                      <div key={index} className={`group relative p-6 rounded-2xl bg-gradient-to-br ${scheme.bg} ${scheme.hoverBg} transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl ${scheme.transform}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500`} style={{ background: `linear-gradient(to bottom right, ${scheme.mainColor}20, ${scheme.mainColor}20)` }}></div>
                        <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:opacity-100 transition-all duration-500`} style={{ borderColor: `${scheme.mainColor}30` }}></div>
                        <div className="relative z-10">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl`} style={{ background: `linear-gradient(to bottom right, ${scheme.mainColor}, ${scheme.mainColor}cc)` }}>
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{card.icon}</span>
                          </div>
                          <h3 className="text-xl font-bold text-[#1C398E] mb-3 transition-colors duration-300" style={{ '--hover-color': scheme.mainColor }}>                        {card.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {card.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {card.skills?.map((skill, skillIndex) => (
                              <span key={skillIndex} className={`px-3 py-1 bg-${scheme.skillBg}-100 text-${scheme.skillBg}-800 text-xs font-medium rounded-full transition-all duration-300`} style={{ '--hover-bg': scheme.mainColor }}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>

              </div>
            </div>
          </header>

          {/* Introduction générale */}
          <section className="py-16 px-6 bg-white/80 mt-16 rounded-3xl shadow-2xl backdrop-blur-xl border-2 border-[#1C398E]/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-[32px] font-extrabold text-[#181F4B] mb-6 leading-tight relative">
                    {introduction.title}
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  {introduction.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[0].src)}>
                    <img
                      src={programImages[0].src}
                      alt={programImages[0].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[1].src)}>
                    <img
                      src={programImages[1].src}
                      alt={programImages[1].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
        {/* Modal d'affichage de l'image en grand */}
        {modalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setModalImage(null)}>
            <div className="relative max-w-3xl w-full flex justify-center">
              <img
                src={modalImage}
                alt="Agrandissement"
                className="rounded-2xl shadow-2xl max-h-[80vh] max-w-full border-4 border-white"
                onClick={e => e.stopPropagation()}
              />
              <button
                className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 text-gray-800 hover:bg-opacity-100 transition"
                onClick={() => setModalImage(null)}
                aria-label="Fermer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
              </div>
            </div>
          </section>

          {/* Formation en Développement Web */}
          <section className="py-16 px-6 bg-gradient-to-br from-[#FBBF24]/10 via-[#6C63FF]/10 to-[#1C398E]/10 rounded-3xl shadow-2xl backdrop-blur-xl border-2 border-[#6C63FF]/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-2">
                  <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                    {webDevelopment.title}
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  {webDevelopment.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="md:order-1 grid grid-cols-2 gap-6">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[2].src)}>
                    <img
                      src={programImages[2].src}
                      alt={programImages[2].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[3].src)}>
                    <img
                      src={programImages[3].src}
                      alt={programImages[3].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="col-span-2 relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[4].src)}>
                    <img
                      src={programImages[4].src}
                      alt={programImages[4].alt}
                      className="w-full h-40 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formation en Marketing Digital */}
          <section className="py-16 px-6 bg-white/80 rounded-3xl shadow-2xl backdrop-blur-xl border-2 border-[#FBBF24]/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                    {digitalMarketing.title}
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  {digitalMarketing.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[5].src)}>
                    <img
                      src={programImages[5].src}
                      alt={programImages[5].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[6].src)}>
                    <img
                      src={programImages[6].src}
                      alt={programImages[6].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="col-span-2 relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[7].src)}>
                    <img
                      src={programImages[7].src}
                      alt={programImages[7].alt}
                      className="w-full h-40 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formation en Design et Création Visuelle */}
          <section className="py-16 px-6 bg-gradient-to-br from-[#FBBF24]/10 via-[#6C63FF]/10 to-[#1C398E]/10 rounded-3xl shadow-2xl backdrop-blur-xl border-2 border-[#6C63FF]/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-2">
                  <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                    {visualDesign.title}
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  {visualDesign.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="md:order-1 grid grid-cols-2 gap-6">
                  <div className="col-span-2 relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[8].src)}>
                    <img
                      src={programImages[8].src}
                      alt={programImages[8].alt}
                      className="w-full h-40 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage(programImages[9].src)}>
                    <img
                      src={programImages[9].src}
                      alt={programImages[9].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={() => setModalImage('/imageFormation/ds3.jpg')}>
                    <img
                      src={"/imageFormation/ds3.jpg"}
                      alt={images.designImage3 || "Design et création visuelle - Image 3"}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-16 px-6 bg-gradient-to-r from-[#FBBF24]/10 via-[#6C63FF]/10 to-[#1C398E]/10 rounded-3xl shadow-2xl backdrop-blur-xl border-2 border-[#1C398E]/10">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#181F4B] mb-8 text-center leading-tight drop-shadow-xl">
                {conclusion.title}
                <span className="block w-32 h-1 bg-[#1C398E] mx-auto mt-4 rounded-full"></span>
              </h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-[20px] text-gray-700 leading-relaxed mb-8 text-justify">
                  {conclusion.text}
                </p>
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                  
                </div>
              </div>
            </div>
          </section>

          {/* Bouton retour en haut */}
          {showTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-10 right-10 z-50 bg-blue-700 text-white p-5 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              aria-label={backToTop}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
