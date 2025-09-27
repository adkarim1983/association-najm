"use client";

import React from "react";
import CountUp from "react-countup";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import Image from "next/image";
import { useTranslation } from "../../../hooks/useTranslation";

export default function EconomieSocialePage() {
  const { t } = useTranslation();
  
  // Get translated data
  const title = t('missions.socialEconomy.title');
  const introHtml = t('missions.socialEconomy.intro');
  const services = t('missions.socialEconomy.services', { returnObjects: true }) || [];
  const fieldWorkTitle = t('missions.socialEconomy.fieldWork.title');
  const fieldWorkDescription = t('missions.socialEconomy.fieldWork.description');
  const statsTitle = t('missions.socialEconomy.stats.title');
  const statsLabels = t('missions.socialEconomy.stats.labels', { returnObjects: true }) || [];
  const actionsTitle = t('missions.socialEconomy.actions.title');
  const actionsItems = t('missions.socialEconomy.actions.items', { returnObjects: true }) || [];
  const renewalText = t('missions.socialEconomy.renewal');

  const statsValues = [10, 62, 48, 36, 27];

  // Map translated action items with static images
  const actionCards = actionsItems.map((action, index) => {
    const images = [
      {
        image: "/photo%20axe%20ess/IMG_4416.JPG",
        extraImages: ["/photo%20axe%20ess/IMG_4393.JPG", "/photo%20axe%20ess/IMG_4399.JPG"]
      },
      {
        image: "/photo%20axe%20ess/IMG_2368.JPG",
        extraImages: ["/photo%20axe%20ess/IMG_2372.JPG", "/photo%20axe%20ess/IMG_2410.JPG"]
      },
      {
        image: "/photo%20axe%20ess/IMG_4434.JPG",
        extraImages: ["/photo%20axe%20ess/IMG_4428.JPG", "/photo%20axe%20ess/IMG_4401.JPG"]
      }
    ];
    
    return {
      title: action.title || '',
      text: action.description || '',
      ...images[index] || { image: "", extraImages: [] }
    };
  });

  const [lightboxSrc, setLightboxSrc] = React.useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-50 py-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-lg shadow p-8 mb-10">
          <p
            className="text-gray-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{fieldWorkTitle}</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              {fieldWorkDescription}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200">
            <Image
              src="/photo%20axe%20ess/IMG_4416.JPG"
              alt="Accompagnement sur le terrain des coopératives ESS"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">{statsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {statsLabels.map((label, idx) => (
              <div key={idx} className="bg-indigo-600 text-white rounded-lg p-6 text-center">
                <div className="text-4xl font-extrabold mb-1">
                  <CountUp end={statsValues[idx]} duration={2.2} enableScrollSpy scrollSpyOnce />
                </div>
                <div className="text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ESS en action - Cartes */}
        <div className="bg-white rounded-xl shadow p-8 mb-12">
          <h3 className="text-2xl font-bold text-indigo-800 mb-8 text-center">{actionsTitle}</h3>
          <div className="space-y-8">
            {actionCards.map((item, i) => (
              <div key={i} className="rounded-xl ring-1 ring-gray-200 overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch`}>
                  {/* Texte */}
                  <div className={`p-6 md:p-8 bg-white flex flex-col justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-700 leading-relaxed text-justify">{item.text}</p>
                    {item.extraImages && item.extraImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {item.extraImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  {/* Image */}
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

        {/* Renewal */}
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
          <p className="text-gray-800 text-justify">{renewalText}</p>
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
                alt="Agrandissement de l'image ESS"
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
      </div>
      </div>
      <Footer />
    </div>
  );
}
