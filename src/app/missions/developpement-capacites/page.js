"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import Image from "next/image";
import { useTranslation } from "../../../hooks/useTranslation";

// Component for animated counter
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef}>
      {count}{suffix}
    </span>
  );
};

export default function DeveloppementCapacitesPage() {
  const { t } = useTranslation();
  
  // Get translated data
  const title = t('missions.capacityBuilding.title');
  const subtitle = t('missions.capacityBuilding.subtitle');
  const intro = t('missions.capacityBuilding.intro');
  const approachTitle = t('missions.capacityBuilding.sections.approach.title');
  const technical = t('missions.capacityBuilding.sections.technical', { returnObjects: true }) || {};
  const transversal = t('missions.capacityBuilding.sections.transversal', { returnObjects: true }) || {};
  const academy = t('missions.capacityBuilding.sections.academy', { returnObjects: true }) || {};
  const employment = t('missions.capacityBuilding.sections.employment', { returnObjects: true }) || {};
  const objectives = t('missions.capacityBuilding.sections.objectives', { returnObjects: true }) || {};
  const statsLabels = t('missions.capacityBuilding.stats.labels', { returnObjects: true }) || [];
  const actionsTitle = t('missions.capacityBuilding.actions.title');
  const actionsItems = t('missions.capacityBuilding.actions.items', { returnObjects: true }) || [];
  
  // Map translated action items with static images
  const actionCards = actionsItems.map((action, index) => {
    const images = [
      {
        image: "/image%20ent/IMG_1080.JPG",
        extraImages: ["/image%20ent/256777.jpg", "/image%20ent/644.jpg"]
      },
      {
        image: "/image%20ent/854.jpg",
        extraImages: ["/image%20ent/WhatsApp%20Image%202023-10-16%20at%2018.58.02%20%282%29.jpeg", "/image%20ent/WhatsApp%20Image%202025-07-25%20%C3%A0%2010.58.01_c0e83b41.jpg"]
      },
      {
        image: "/image%20ent/WhatsApp%20Image%202025-07-25%20%C3%A0%2010.58.22_f8db51e5.jpg",
        extraImages: ["/image%20ent/WhatsApp%20Image%202025-07-25%20%C3%A0%2010.58.01_dc0c6378.jpg", "/image%20ent/IMG_1080.JPG"]
      }
    ];
    
    return {
      title: action.title || '',
      text: action.description || '',
      ...images[index] || { image: "", extraImages: [] }
    };
  });

  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section with Brand Colors */}
      <div className="relative bg-gradient-to-r from-[#1A7CC1] via-[#683E99] to-[#1A7CC1] py-24 pt-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <div className="w-32 h-1.5 bg-[#FBC222] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-t-4 border-[#1A7CC1]">
          <div className="prose max-w-none">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#683E99] mb-4">
                {approachTitle}
              </h2>
              <div className="w-20 h-1 bg-[#FBC222] mx-auto rounded-full"></div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-10 text-lg text-center max-w-4xl mx-auto">
              {intro}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-[#1A7CC1]/10 to-[#1A7CC1]/5 p-8 rounded-2xl border-l-4 border-[#1A7CC1] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#1A7CC1] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">💻</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A7CC1]">{technical.title}</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {technical.description}
                </p>
                <ul className="space-y-3">
                  {technical.skills?.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#1A7CC1] rounded-full mr-3"></span>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#683E99]/10 to-[#683E99]/5 p-8 rounded-2xl border-l-4 border-[#683E99] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#683E99] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#683E99]">{transversal.title}</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {transversal.description}
                </p>
                <ul className="space-y-3">
                  {transversal.skills?.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#683E99] rounded-full mr-3"></span>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#6DB962]/10 to-[#6DB962]/5 p-8 rounded-2xl mb-12 border-2 border-[#6DB962]/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#6DB962] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🎓</span>
                </div>
                <h3 className="text-3xl font-bold text-[#6DB962] mb-4">{academy.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                  {academy.description}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {academy.programs?.map((program, index) => {
                  const colors = ['[#6DB962]', '[#1A7CC1]', '[#683E99]'];
                  const color = colors[index] || '[#6DB962]';
                  return (
                    <div key={index} className={`text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-${color}`}>
                      <div className={`text-3xl font-bold text-${color} mb-3`}>{program.name}</div>
                      <p className="text-gray-600 font-medium">{program.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FBC222]/10 to-[#FBC222]/5 p-8 rounded-2xl mb-12 border-2 border-[#FBC222]/30">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FBC222] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🚀</span>
                </div>
                <h3 className="text-3xl font-bold text-[#FBC222] mb-4">{employment.title}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-bold text-[#FBC222] mb-4 text-xl flex items-center">
                    <span className="w-8 h-8 bg-[#FBC222] rounded-full flex items-center justify-center mr-3 text-white text-sm">📝</span>
                    {employment.preparation?.title}
                  </h4>
                  <ul className="space-y-3">
                    {employment.preparation?.items?.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-bold text-[#FBC222] mb-4 text-xl flex items-center">
                    <span className="w-8 h-8 bg-[#FBC222] rounded-full flex items-center justify-center mr-3 text-white text-sm">🤝</span>
                    {employment.networking?.title}
                  </h4>
                  <ul className="space-y-3">
                    {employment.networking?.items?.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#683E99]/10 to-[#683E99]/5 p-8 rounded-2xl border-2 border-[#683E99]/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#683E99] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🎯</span>
                </div>
                <h3 className="text-3xl font-bold text-[#683E99] mb-4">{objectives.title}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {objectives.goals?.slice(0, 3).map((goal, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                      <span className="text-gray-700 font-medium">{goal}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {objectives.goals?.slice(3).map((goal, index) => (
                    <div key={index + 3} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                      <span className="text-gray-700 font-medium">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics with Animations */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="group bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-[#1A7CC1] hover:shadow-2xl hover:-translate-y-2 hover:border-t-8 transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A7CC1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#1A7CC1] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg">
                <span className="text-white font-bold text-2xl group-hover:animate-pulse">👥</span>
              </div>
              <div className="text-4xl font-bold text-[#1A7CC1] mb-2 group-hover:text-5xl transition-all duration-500">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-[#1A7CC1] transition-colors duration-300">{statsLabels[0]}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A7CC1] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-[#6DB962] hover:shadow-2xl hover:-translate-y-2 hover:border-t-8 transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6DB962]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#6DB962] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg">
                <span className="text-white font-bold text-2xl group-hover:animate-pulse">📈</span>
              </div>
              <div className="text-4xl font-bold text-[#6DB962] mb-2 group-hover:text-5xl transition-all duration-500">
                <AnimatedCounter end={75} suffix="%" />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-[#6DB962] transition-colors duration-300">{statsLabels[1]}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#6DB962] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-[#FBC222] hover:shadow-2xl hover:-translate-y-2 hover:border-t-8 transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FBC222]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#FBC222] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg">
                <span className="text-white font-bold text-2xl group-hover:animate-pulse">📚</span>
              </div>
              <div className="text-4xl font-bold text-[#FBC222] mb-2 group-hover:text-5xl transition-all duration-500">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-[#FBC222] transition-colors duration-300">{statsLabels[2]}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FBC222] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-[#683E99] hover:shadow-2xl hover:-translate-y-2 hover:border-t-8 transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#683E99]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#683E99] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg">
                <span className="text-white font-bold text-2xl group-hover:animate-pulse">🏢</span>
              </div>
              <div className="text-4xl font-bold text-[#683E99] mb-2 group-hover:text-5xl transition-all duration-500">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-[#683E99] transition-colors duration-300">{statsLabels[3]}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#683E99] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
      
      {/* Section: Développement des capacités en action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16">
        <div className="text-center mb-6">
          <h2 className="text-[28px] font-extrabold text-[#1C398E]">{actionsTitle}</h2>
          <span className="block w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <div className="space-y-8">
            {actionCards.map((item, i) => (
              <div key={i} className="rounded-xl ring-1 ring-gray-200 overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch`}>
                  {/* Texte + vignettes */}
                  <div className={`p-6 md:p-8 bg-white flex flex-col justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-justify">{item.text}</p>
                    {item.extraImages && item.extraImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {item.extraImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onClick={() => setLightboxSrc(img)}
                            aria-label={`Agrandir l'image: ${item.title} (${idx + 1})`}
                          >
                            <Image
                              src={img}
                              alt={`${item.title} - visuel ${idx + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="(min-width: 1024px) 240px, 45vw"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Image principale */}
                  <div className={`relative min-h-[240px] lg:min-h-[320px] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="Agrandissement de l'image - Développement des capacités"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <button
              type="button"
              className="absolute top-3 right-3 rounded-full bg-white/90 text-gray-900 px-3 py-1 text-sm shadow hover:bg-white"
              onClick={() => setLightboxSrc(null)}
              aria-label="Fermer la visionneuse"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
