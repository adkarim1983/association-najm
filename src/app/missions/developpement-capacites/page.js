"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section with Brand Colors */}
      <div className="relative bg-gradient-to-r from-[#1A7CC1] via-[#683E99] to-[#1A7CC1] py-24 pt-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Développement des capacités des jeunes
            </h1>
            <div className="w-32 h-1.5 bg-[#FBC222] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Programmes complets de formation et d'accompagnement pour renforcer les compétences 
              des jeunes et favoriser leur insertion professionnelle
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
                Notre Approche de Développement
              </h2>
              <div className="w-20 h-1 bg-[#FBC222] mx-auto rounded-full"></div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-10 text-lg text-center max-w-4xl mx-auto">
              L'Association Najm met en place des programmes complets de développement des capacités des jeunes,
              visant à renforcer leurs compétences techniques, personnelles et professionnelles pour favoriser
              leur insertion dans le marché du travail et leur épanouissement personnel.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-[#1A7CC1]/10 to-[#1A7CC1]/5 p-8 rounded-2xl border-l-4 border-[#1A7CC1] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#1A7CC1] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">💻</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A7CC1]">Formation technique</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Programmes de formation dans les domaines techniques et numériques les plus demandés sur le marché.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#1A7CC1] rounded-full mr-3"></span><span className="text-gray-700">Développement web et mobile</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#1A7CC1] rounded-full mr-3"></span><span className="text-gray-700">Design graphique et multimédia</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#1A7CC1] rounded-full mr-3"></span><span className="text-gray-700">Marketing digital</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#1A7CC1] rounded-full mr-3"></span><span className="text-gray-700">Comptabilité et gestion</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#1A7CC1] rounded-full mr-3"></span><span className="text-gray-700">Langues étrangères</span></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#683E99]/10 to-[#683E99]/5 p-8 rounded-2xl border-l-4 border-[#683E99] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#683E99] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#683E99]">Compétences transversales</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Développement des soft skills essentiels pour la réussite professionnelle et personnelle.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#683E99] rounded-full mr-3"></span><span className="text-gray-700">Communication et prise de parole</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#683E99] rounded-full mr-3"></span><span className="text-gray-700">Leadership et travail d'équipe</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#683E99] rounded-full mr-3"></span><span className="text-gray-700">Gestion du temps et des priorités</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#683E99] rounded-full mr-3"></span><span className="text-gray-700">Résolution de problèmes</span></li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#683E99] rounded-full mr-3"></span><span className="text-gray-700">Pensée critique et créativité</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#6DB962]/10 to-[#6DB962]/5 p-8 rounded-2xl mb-12 border-2 border-[#6DB962]/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#6DB962] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🎓</span>
                </div>
                <h3 className="text-3xl font-bold text-[#6DB962] mb-4">Académie Najm pour les Métiers du Numérique</h3>
                <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                  Programme phare "Promotion sociale par la numérisation" offrant des formations spécialisées
                  dans les métiers du digital.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#6DB962]">
                  <div className="text-3xl font-bold text-[#6DB962] mb-3">Web Dev</div>
                  <p className="text-gray-600 font-medium">Développement web complet</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#1A7CC1]">
                  <div className="text-3xl font-bold text-[#1A7CC1] mb-3">Design</div>
                  <p className="text-gray-600 font-medium">Design graphique professionnel</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#683E99]">
                  <div className="text-3xl font-bold text-[#683E99] mb-3">Marketing</div>
                  <p className="text-gray-600 font-medium">Marketing digital avancé</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FBC222]/10 to-[#FBC222]/5 p-8 rounded-2xl mb-12 border-2 border-[#FBC222]/30">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FBC222] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🚀</span>
                </div>
                <h3 className="text-3xl font-bold text-[#FBC222] mb-4">Accompagnement à l'insertion professionnelle</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-bold text-[#FBC222] mb-4 text-xl flex items-center">
                    <span className="w-8 h-8 bg-[#FBC222] rounded-full flex items-center justify-center mr-3 text-white text-sm">📝</span>
                    Préparation à l'emploi
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Rédaction de CV et lettres de motivation</span></li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Préparation aux entretiens d'embauche</span></li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Simulation d'entretiens</span></li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Techniques de recherche d'emploi</span></li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-bold text-[#FBC222] mb-4 text-xl flex items-center">
                    <span className="w-8 h-8 bg-[#FBC222] rounded-full flex items-center justify-center mr-3 text-white text-sm">🤝</span>
                    Mise en relation
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Réseau d'entreprises partenaires</span></li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Forums de recrutement</span></li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Stages et opportunités</span></li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#FBC222] rounded-full mr-3"></span><span className="text-gray-700">Suivi post-insertion</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#683E99]/10 to-[#683E99]/5 p-8 rounded-2xl border-2 border-[#683E99]/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#683E99] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🎯</span>
                </div>
                <h3 className="text-3xl font-bold text-[#683E99] mb-4">Objectifs du programme</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                    <span className="text-gray-700 font-medium">Réduire la fracture numérique</span>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                    <span className="text-gray-700 font-medium">Améliorer l'employabilité des jeunes</span>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                    <span className="text-gray-700 font-medium">Favoriser l'inclusion sociale</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                    <span className="text-gray-700 font-medium">Développer l'esprit entrepreneurial</span>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                    <span className="text-gray-700 font-medium">Renforcer la confiance en soi</span>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="w-8 h-8 bg-[#683E99] rounded-full flex items-center justify-center mr-4 text-white font-bold">✓</span>
                    <span className="text-gray-700 font-medium">Promouvoir l'innovation locale</span>
                  </div>
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
              <div className="text-gray-600 font-medium group-hover:text-[#1A7CC1] transition-colors duration-300">Jeunes formés</div>
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
              <div className="text-gray-600 font-medium group-hover:text-[#6DB962] transition-colors duration-300">Taux d'insertion</div>
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
              <div className="text-gray-600 font-medium group-hover:text-[#FBC222] transition-colors duration-300">Programmes disponibles</div>
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
              <div className="text-gray-600 font-medium group-hover:text-[#683E99] transition-colors duration-300">Entreprises partenaires</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#683E99] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
