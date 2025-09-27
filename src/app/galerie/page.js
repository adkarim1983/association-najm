"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function GaleriePage() {
  const { t } = useTranslation();
  
  // Get translated data
  const title = t('gallery.title');
  const section1 = t('gallery.sections.section1', { returnObjects: true }) || {};
  const section2 = t('gallery.sections.section2', { returnObjects: true }) || {};
  const programs = t('gallery.sections.programs', { returnObjects: true }) || {};
  const training = t('gallery.sections.training', { returnObjects: true }) || {};
  const success = t('gallery.sections.success', { returnObjects: true }) || {};
  const highlights = t('gallery.highlights', { returnObjects: true }) || {};
  const images = t('gallery.images', { returnObjects: true }) || {};

  // map old imports to public images
  const image = {
    image2a: "/images/image2a.jpg",
    image3a: "/images/image3a.jpg",
    image4a: "/images/image4a.jpg",
    image5a: "/images/image5a.jpg",
    image6a: "/images/image6a.jpg",
    image7a: "/images/image7a.jpg",
    md1: "/images/md1.jpg",
    p1: "/images/p1.jpg",
    p2: "/images/p2.jpg",
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  const galleryImages = useMemo(
    () => [
      { src: image.image3a, text: images.share_exchange },
      { src: image.image5a, text: images.youth_discovering_digital },
      { src: image.image6a, text: images.intensive_training },
      { src: image.image7a, text: images.group_work },
      { src: image.md1, text: images.pedagogical_team },
      { src: image.p1, text: images.final_projects },
      { src: image.p2, text: images.certificates },
      { src: image.image2a, text: images.digital_marketing_workshop },
      { src: image.image4a, text: images.tech_trends_discussion },
    ],
    [images]
  );

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 3;
  };

  const totalSlides = Math.ceil(galleryImages.length / itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getItemsPerSlide();
      setItemsPerSlide(newItemsPerSlide);
      const newTotalSlides = Math.ceil(galleryImages.length / newItemsPerSlide);
      if (currentSlide >= newTotalSlides) setCurrentSlide(Math.max(0, newTotalSlides - 1));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide, galleryImages.length]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides);
  const goToSlide = (i) => setCurrentSlide(i);

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease forwards;
        }
        .animate-fade-up {
          animation: fade-up 1s ease forwards;
        }
      `}</style>
      <Navbar />
      <main className="pt-16">
        <div className="px-8 py-12 bg-white min-h-screen font-sans text-gray-800 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[40px] font-extrabold text-center text-[#1C398E] mb-16 relative pb-4 leading-tight">
          {title}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-[#1C398E] rounded-full"></span>
        </h1>

        {/* First section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <p className="mb-6">{section1.p1}</p>
            <p>{section1.p2}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={image.image2a} alt="Inauguration" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{images.inauguration}</p>
            </div>
          </div>
        </div>

        {/* Second section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group order-2 md:order-1">
            <img src={image.image4a} alt="Présentation" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{images.presentation}</p>
            </div>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed text-justify order-1 md:order-2">
            <p className="mb-6">{section2.p1}</p>
            <p>{section2.p2}</p>
          </div>
        </div>

        {/* Third section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 text-center md:text-left leading-tight">{programs.title}</h2>
            <ul className="list-disc list-inside space-y-3 text-justify">
              <li>{programs.web}</li>
              <li>{programs.design}</li>
              <li>{programs.marketing}</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={image.md1} alt="Contenu des formations" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{images.training_content}</p>
            </div>
          </div>
        </div>

        {/* Fourth section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group order-2 md:order-1">
            <img src={image.p1} alt="Déroulement des cours" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{images.course_progress}</p>
            </div>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed text-justify order-1 md:order-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 text-center md:text-left leading-tight">{training.title}</h2>
            <p className="mb-6">{training.p1}</p>
            <p>{training.p2}</p>
          </div>
        </div>

        {/* Fifth section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 text-center md:text-left leading-tight">{success.title}</h2>
            <p>{success.description}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={image.p2} alt="Fin de formation" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{images.end_of_training}</p>
            </div>
          </div>
        </div>

        {/* Highlights carousel */}
        <h2 className="text-[40px] font-extrabold text-center text-[#1C398E] mt-24 mb-12 relative pb-4 leading-tight">
          {highlights.title}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-[#1C398E] rounded-full"></span>
        </h2>

        <div className="relative max-w-7xl mx-auto mb-20">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {galleryImages
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((item, index) => {
                        const globalIndex = slideIndex * itemsPerSlide + index;
                        return (
                          <div key={globalIndex} className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                            <img src={item.src} alt={`galerie-${globalIndex}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute bottom-0 w-full bg-blue-700/80 text-white text-center py-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-sm px-2">{item.text}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"}`} />
            ))}
          </div>
        </div>
      </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

