"use client";

import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import Image from "next/image";
import { useTranslation } from "../../../hooks/useTranslation";

export default function EntrepreneuriatPage() {
  const { t } = useTranslation();
  
  // Get translated data
  const title = t('missions.entrepreneurship.title');
  const introHtml = t('missions.entrepreneurship.intro');
  const methodologyTitle = t('missions.entrepreneurship.methodology.title');
  const methodologyItems = t('missions.entrepreneurship.methodology.items', { returnObjects: true }) || [];
  const statsTitle = t('missions.entrepreneurship.stats.title');
  const statsLabels = t('missions.entrepreneurship.stats.labels', { returnObjects: true }) || [];
  const actionsTitle = t('missions.entrepreneurship.actions.title');
  const actionsItems = t('missions.entrepreneurship.actions.items', { returnObjects: true }) || [];
  
  const statsValues = ["261", "240", "161", "130%"];

  // Map translated action items with static images
  const actionCards = actionsItems.map((action, index) => {
    const images = [
      {
        image: "/photo%20axe%20ent/HTT05930.JPG",
        extraImages: ["/photo%20axe%20ent/HTT05949.JPG", "/photo%20axe%20ent/HTT05953.JPG"]
      },
      {
        image: "/photo%20axe%20ent/IMG_4274.JPG",
        extraImages: ["/photo%20axe%20ent/IMG_4275.JPG", "/photo%20axe%20ent/IMG_4276.JPG"]
      },
      {
        image: "/photo%20axe%20ent/IMG_8403.JPG",
        extraImages: ["/photo%20axe%20ent/IMG_8479.JPG", "/photo%20axe%20ent/IMG_8521.JPG"]
      }
    ];
    
    return {
      title: action.title || '',
      text: action.description || '',
      ...images[index] || { image: "", extraImages: [] }
    };
  });

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const open = (src) => {
    setModalSrc(src);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setModalSrc(null);
  };
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-100 py-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[30px] md:text-5xl font-extrabold text-[#1C398E] mb-4 leading-tight">
            {title}
          </h1>
          <span className="block w-32 h-1 bg-blue-700 mx-auto rounded-full"></span>
        </div>

        {/* Intro */}
        <div className="bg-white text-gray-700 shadow-lg rounded-2xl p-8 border border-gray-200 max-w-5xl mx-auto mb-12">
          <div
            className="text-base sm:text-lg leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
        </div>

        {/* Methodology & Pedagogy */}
        <div className="text-center mb-6">
          <h2 className="text-[28px] font-bold text-[#1C398E]">{methodologyTitle}</h2>
          <span className="block w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-14">
          {methodologyItems.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 hover:bg-[#1C398E] hover:text-white"
            >
              <div className="text-5xl text-blue-700 group-hover:text-white mb-4">
                {i === 0 ? "📊" : "🎓"}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[18px] text-justify leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-bold text-[#1C398E] mb-2">{statsTitle}</h2>
            <span className="block w-32 h-1 bg-blue-700 mx-auto rounded-full"></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {statsLabels.map((label, idx) => {
              const raw = statsValues[idx];
              const isPercent = typeof raw === "string" && raw.includes("%");
              const endVal = parseInt(String(raw).replace(/[^\d]/g, ""), 10) || 0;
              return (
                <div key={idx} className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                  <p className="text-6xl font-extrabold mb-2">
                    <CountUp end={endVal} duration={2.5} enableScrollSpy scrollSpyOnce />
                    {isPercent ? <span className="text-3xl">%</span> : null}
                  </p>
                  <p className="text-[18px] font-medium text-center">{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Entrepreneuriat en action - Cartes */}
        <div className="text-center mb-6">
          <h2 className="text-[28px] font-extrabold text-[#1C398E]">{actionsTitle}</h2>
          <span className="block w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></span>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 max-w-7xl mx-auto mb-12">
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
                            onClick={() => open(img)}
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

        {/* Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={close}
                className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full w-9 h-9 shadow flex items-center justify-center hover:bg-gray-100"
                aria-label="Close"
              >
                ✕
              </button>
              <img src={modalSrc || ""} alt="preview" className="w-full max-h-[80vh] object-contain rounded-lg" />
            </div>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
}
