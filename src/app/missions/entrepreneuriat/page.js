"use client";

import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import Image from "next/image";

export default function EntrepreneuriatPage() {
  // Content extracted from old translations (hardcoded here to avoid i18n setup)
  const title = "Renforcement de l'Entrepreneuriat chez les Jeunes";
  const introHtml =
    "Grâce à la compétence de ses membres et à l'engagement constant de sa structure organisationnelle, l'Association Najm a contribué à l'appel à manifestation d'intérêt lancé par la préfecture de Moulay Rachid en novembre 2023, concernant la mise en œuvre de l'axe de soutien à l'entrepreneuriat des jeunes.<br/><br/>L'excellence du dossier de candidature présenté par l'Association a permis de gagner la confiance du comité de sélection et de Monsieur le Gouverneur, cette confiance s'est concrétisée par l'attribution de cette mission stratégique à l'Association Najm. L'Association a ainsi signé deux conventions de partenariat pour l'année 2024, sur le territoire de la préfecture de Moulay Rachid.<br/><br/>Ces deux conventions visent à former 200 jeunes en phase de pré-création d'entreprise et à accompagner 115 entrepreneurs en phase post-création au cours de l'année 2024.";

  const methodologyTitle = "Méthodologie et Approche Pédagogique";
  const methodologyCards = [
    {
      title: "Méthodologie de Travail",
      text:
        "L'association a adopté une méthodologie de travail basée sur l'organisation de cycles de formation pré-définis (chaque trimestre), entrecoupés d'un ensemble de mécanismes de suivi et d'évaluation continue. Ces cycles se concluent par des réunions périodiques du Comité Provincial du Développement Humain (CPDH), afin de permettre aux structures de gouvernance de l'INDH de suivre le niveau de réalisation et l'atteinte des objectifs fixés.",
    },
    {
      title: "Approche Pédagogique",
      text:
        "L'Association Najm adopte une approche pédagogique moderne axée sur l'andragogie, spécialement conçue pour répondre aux besoins d'apprentissage des adultes. Cette approche est renforcée par une formation appliquée et interactive basée sur le traitement de cas réels, selon le principe du \"Apprendre par la pratique\". Ce parcours est supervisé par une équipe pédagogique permanente, qui assure un accompagnement précis et une qualité de formation, grâce à une communication continue avec des experts et des professionnels, ce qui renforce l'efficacité de l'apprentissage et garantit l'obtention de résultats concrets.",
    },
  ];

  const statsTitle = "Résultats Clés (Année 2024)";
  const stats = [
    "Jeunes formés en phase de pré-création (131% de l'objectif)",
    "Projets acceptés par le CPDH",
    "Projets mis en œuvre (67% des projets acceptés)",
    "Dépassement des objectifs de dynamisation des entreprises",
  ];
  const statsValues = ["261", "240", "161", "130%"];

  // Cartes d'actions (images issues de public/photo axe ent)
  const actionCards = [
    {
      title: "Sensibilisation et ateliers pratiques",
      text:
        "Organisation d'ateliers thématiques et de séances pratiques pour renforcer les compétences entrepreneuriales (idéation, étude de marché, business model).",
      image: "/photo%20axe%20ent/HTT05930.JPG",
      extraImages: [
        "/photo%20axe%20ent/HTT05949.JPG",
        "/photo%20axe%20ent/HTT05953.JPG",
      ],
    },
    {
      title: "Accompagnement à la création d'entreprise",
      text:
        "Coaching personnalisé pour structurer le projet, formaliser le business plan et préparer les démarches de création et de financement.",
      image: "/photo%20axe%20ent/IMG_4274.JPG",
      extraImages: [
        "/photo%20axe%20ent/IMG_4275.JPG",
        "/photo%20axe%20ent/IMG_4276.JPG",
      ],
    },
    {
      title: "Suivi post-création et networking",
      text:
        "Appui au démarrage, mise en relation avec l'écosystème et animation de rencontres pour favoriser les synergies et les opportunités.",
      image: "/photo%20axe%20ent/IMG_8403.JPG",
      extraImages: [
        "/photo%20axe%20ent/IMG_8479.JPG",
        "/photo%20axe%20ent/IMG_8521.JPG",
      ],
    },
  ];

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
          {methodologyCards.map((c, i) => (
            <div
              key={i}
              className="group flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 hover:bg-[#1C398E] hover:text-white"
            >
              <div className="text-5xl text-blue-700 group-hover:text-white mb-4">
                {i === 0 ? "📊" : "🎓"}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{c.title}</h3>
              <p className="text-[18px] text-justify leading-relaxed">{c.text}</p>
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
            {stats.map((label, idx) => {
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
          <h2 className="text-[28px] font-extrabold text-[#1C398E]">Entrepreneuriat en action</h2>
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
