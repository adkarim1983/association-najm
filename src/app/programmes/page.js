'use client';

import React, { useState, useEffect } from "react";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function ProgrammesPage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const programImages = [
    { src: "/assets/A.jpg", alt: "Formation développement web" },
    { src: "/assets/B.jpg", alt: "Marketing digital" },
    { src: "/assets/C.jpg", alt: "Design et création visuelle" },
    { src: "/assets/D.jpg", alt: "Étudiants en formation" },
    { src: "/assets/image1a.jpg", alt: "Atelier pratique" },
    // Marketing Digital images (mk1, mk2, mk3)
    { src: "/imageFormation/mk1.jpg", alt: "Marketing digital - Image 1" },
    { src: "/imageFormation/mk2.jpg", alt: "Marketing digital - Image 2" },
    { src: "/imageFormation/mk3.jpg", alt: "Marketing digital - Image 3" },
    // Design et Création Visuelle images (ds1, ds2)
    { src: "/imageFormation/ds1.jpg", alt: "Design et création visuelle - Image 1" },
    { src: "/imageFormation/ds2.jpg", alt: "Design et création visuelle - Image 2" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        
        <div className="bg-gray-50 text-gray-800 font-sans">
          {/* Header */}
          <header className="relative flex flex-col items-center justify-center min-h-[800px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mb-0 overflow-hidden px-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
              <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-400 rounded-full blur-xl"></div>
              <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-pink-400 rounded-full blur-xl"></div>
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-6xl mb-12">
              <div className="inline-block mb-6 mt-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase">
                  Formation Numérique
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#1C398E] via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nos Programmes de Formation
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-[#1C398E] bg-clip-text text-transparent">
                  Numérique
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Pour une transformation numérique inclusive au Maroc
              </p>
            </div>

            {/* Enhanced Programs Card */}
            <div className="relative z-10 w-full max-w-6xl">
              <div className="bg-white/80 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Développement Web */}
                  <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-100 hover:from-yellow-100 hover:to-orange-200 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:rotate-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFC32C]/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FFC32C]/30 transition-all duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FFC32C] to-orange-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">💻</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1C398E] mb-3 group-hover:text-[#FFC32C] transition-colors duration-300">
                        Développement Web
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        Technologies modernes et frameworks pour créer des applications web innovantes
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">HTML/CSS</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">JavaScript</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">React</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">Node.js</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">MongoDB</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">Git</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">Bootstrap</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full hover:bg-[#FFC32C] hover:text-white transition-all duration-300">API REST</span>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Digital */}
                  <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-100 hover:from-purple-100 hover:to-indigo-200 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:-rotate-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7149A0]/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#7149A0]/30 transition-all duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#7149A0] to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📢</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1C398E] mb-3 group-hover:text-[#7149A0] transition-colors duration-300">
                        Marketing Digital
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        Stratégies de communication digitale et gestion des réseaux sociaux
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">SEO</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">Social Media</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">Google Analytics</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">Facebook Ads</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">Google Ads</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">Email Marketing</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">Content Marketing</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full hover:bg-[#7149A0] hover:text-white transition-all duration-300">Canva</span>
                      </div>
                    </div>
                  </div>

                  {/* Design Visuel */}
                  <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:rotate-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#73B363]/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#73B363]/30 transition-all duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#73B363] to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎨</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1C398E] mb-3 group-hover:text-[#73B363] transition-colors duration-300">
                        Design Visuel
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        Créativité et innovation visuelle pour des designs modernes et impactants
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">Photoshop</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">Illustrator</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">Figma</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">UI/UX Design</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">InDesign</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">After Effects</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">Branding</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-[#73B363] hover:text-white transition-all duration-300">Typography</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </header>

          {/* Introduction générale */}
          <section className="py-12 px-6 bg-white mt-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                    ✨ Introduction générale
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    L'Association Najm inaugure aujourd'hui un ambitieux programme de formations digitales, fruit de son engagement continu en faveur de l'autonomisation économique et sociale de la jeunesse.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    Consciente de l'importance croissante du numérique dans tous les secteurs d'activité, l'association a conçu un parcours de formation structuré autour de trois axes complémentaires : le Développement Web, le Marketing Digital et le Design et la Création Visuelle.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify">
                    Ces formations visent non seulement à transmettre des compétences techniques et pratiques, mais également à stimuler la créativité, l'esprit entrepreneurial et l'innovation chez les jeunes. À travers ce projet, l'Association Najm souhaite ouvrir de nouvelles perspectives professionnelles, encourager la compétitivité et contribuer activement à l'inclusion digitale.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[0].src}
                      alt={programImages[0].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[1].src}
                      alt={programImages[1].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formation en Développement Web */}
          <section className="py-12 px-6 bg-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-2">
                  <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                    💻 Formation en Développement Web
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    La formation en Développement Web constitue un pilier central du programme. Elle a pour objectif de donner aux participants les outils et les connaissances nécessaires pour concevoir et développer des sites web modernes, dynamiques et sécurisés.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    Les apprenants seront initiés aux langages de programmation (HTML, CSS, JavaScript) ainsi qu'aux frameworks et bibliothèques les plus utilisés dans l'industrie. Ils découvriront également les principes de la conception responsive, les bonnes pratiques en matière d'accessibilité et l'intégration d'outils collaboratifs.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify">
                    Cette formation offrira aux jeunes la possibilité de se préparer à divers métiers du digital : développeur front-end, intégrateur web, ou encore créateur de solutions numériques pour les entreprises locales. En encourageant l'innovation et la pratique, elle ouvre la voie à l'entrepreneuriat et à la création de start-ups technologiques.
                  </p>
                </div>
                <div className="md:order-1 grid grid-cols-2 gap-6">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[2].src}
                      alt={programImages[2].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[3].src}
                      alt={programImages[3].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="col-span-2 relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
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
          <section className="py-12 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                    📢 Formation en Marketing Digital
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    Dans un monde où la visibilité en ligne est devenue essentielle, la formation en Marketing Digital propose aux jeunes de maîtriser les stratégies modernes de communication et de promotion.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    Au programme : gestion des réseaux sociaux, création de contenus engageants, référencement naturel (SEO), campagnes publicitaires en ligne (Google Ads, Facebook Ads), e-mail marketing, et analyse des performances via des outils spécialisés.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    Cette formation permettra aux participants de développer une compréhension approfondie des comportements des consommateurs et d'apprendre à concevoir des campagnes efficaces.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify">
                    Elle s'adresse à ceux qui souhaitent devenir community managers, responsables marketing digital, consultants en communication ou encore lancer leur propre projet entrepreneurial. En donnant les clés du commerce moderne, cette formation prépare la jeunesse à jouer un rôle actif dans le développement économique local et national.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[5].src}
                      alt={programImages[5].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[6].src}
                      alt={programImages[6].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="col-span-2 relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
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
          <section className="py-12 px-6 bg-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:order-2">
                  <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-6 leading-tight relative">
                    🎨 Formation en Design et Création Visuelle
                    <span className="absolute left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full"></span>
                  </h2>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    La formation en Design et Création Visuelle est dédiée à l'expression artistique et à l'innovation visuelle. Elle vise à développer les compétences nécessaires pour créer des visuels modernes, attrayants et adaptés au monde digital.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    Les apprenants seront initiés aux bases du design graphique, à la typographie, aux couleurs, ainsi qu'à l'utilisation d'outils professionnels tels que Photoshop, Illustrator ou Figma.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify mb-6">
                    Une attention particulière sera accordée au design UI/UX, indispensable pour concevoir des interfaces utilisateur intuitives et agréables, ainsi qu'à la création de supports visuels variés : logos, affiches, bannières publicitaires et contenus pour les réseaux sociaux.
                  </p>
                  <p className="text-[18px] text-gray-700 leading-relaxed text-justify">
                    Cette formation offre aux jeunes la possibilité de devenir graphistes, web designers ou créateurs de contenus visuels indépendants, tout en renforçant leur sens de la créativité et leur capacité à répondre aux besoins du marché.
                  </p>
                </div>
                <div className="md:order-1 grid grid-cols-2 gap-6">
                  <div className="col-span-2 relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[8].src}
                      alt={programImages[8].alt}
                      className="w-full h-40 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={programImages[9].src}
                      alt={programImages[9].alt}
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/imageFormation/ds3.jpg"
                      alt="Design et création visuelle - Image 3"
                      className="w-full h-56 object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-12 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-[32px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
                🌟 Conclusion
                <span className="block w-32 h-1 bg-[#1C398E] mx-auto mt-4 rounded-full"></span>
              </h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-[20px] text-gray-700 leading-relaxed mb-8 text-justify">
                  À travers ces trois formations, l'Association Najm confirme son rôle de catalyseur de talents et de compétences dans le domaine digital. L'objectif est clair : offrir aux jeunes les moyens de bâtir un avenir professionnel solide, de participer activement à la transformation numérique et de devenir des acteurs du changement dans leur communauté.
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
              aria-label="Retour en haut"
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
