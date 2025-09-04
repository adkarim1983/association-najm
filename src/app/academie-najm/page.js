'use client';

import React, { useState, useEffect, useRef } from "react";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

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
  const [showTop, setShowTop] = useState(false);

  // Static French translations from association folder
  const t = (key) => {
    const translations = {
      "academieNajm.header.title": "Académie Najm pour les Métiers du Numérique",
      "academieNajm.header.subtitle": "Promotion sociale par la numérisation",
      "academieNajm.skillReinforcement.title": "Renforcement des Compétences Parallèles des Jeunes",
      "academieNajm.skillReinforcement.text": "L'Association Najm a élaboré une série de programmes de formation parallèles visant à renforcer les opportunités d'intégration professionnelle des jeunes. Ces formations sont des ateliers théoriques et pratiques destinés à doter les jeunes de compétences concrètes pour leur insertion professionnelle sur le marché du travail.",
      "academieNajm.support.title": "Accompagnement et coopératives numériques",
      "academieNajm.support.text": "L'Association Najm agit avec des entreprises et acteurs du secteur numérique pour connecter les jeunes aux opportunités d'emploi via des ateliers, stages, et formations spécifiques.",
      "academieNajm.support.programIncludes": "Le programme comprend également :",
      "academieNajm.support.imageText": "Accompagnement",
      "academieNajm.recognition.title": "Reconnaissance et ambition nationale",
      "academieNajm.recognition.text": "Dans le but de renforcer son impact, l'association œuvre à l'obtention du statut d'utilité publique pour élargir ses partenariats, ses financements et sa présence nationale.",
      "academieNajm.recognition.quote": "Fidèle à sa mission, l'Association Najm continue à s'adapter aux défis économiques et sociaux et s'engage pour un Maroc inclusif, numérique et durable.",
      "academieNajm.backToTop": "Retour en haut"
    };
    return translations[key] || key;
  };

  const sections = [
    {
      title: "Pour une transformation numérique inclusive au Maroc",
      text: "L'Association Najm pour l'inclusion économique croit que la transformation numérique représente à la fois un défi et une opportunité prometteuse pour le Maroc. La faible accessibilité aux technologies modernes, le manque de formations adaptées et l'élargissement de la fracture numérique constituent parmi les principaux obstacles qui freinent l'intégration des jeunes dans l'économie numérique. Pourtant, la numérisation offre de grandes possibilités pour stimuler l'entrepreneuriat, créer des opportunités d'emploi et dynamiser le tissu socio-économique, notamment au profit des jeunes non scolarisés, sans emploi et non bénéficiaires de formation, qui rencontrent de réelles difficultés d'insertion professionnelle. Consciente de cette réalité, l'Association Najm s'engage à accompagner les jeunes dans l'acquisition des compétences numériques, à poursuivre la numérisation des entreprises et à encourager l'innovation technologique. En concentrant ses efforts sur ces axes fondamentaux, l'association aspire à contribuer à la construction d'un modèle de développement plus inclusif.",
      alt: "Jeunes marocains utilisant des outils numériques",
      buttonText: "Découvrir nos programmes"
    },
    {
      title: "Une académie au service de l'avenir numérique du Maroc",
      text: "À travers cette Académie, l'Association Najm offre aux jeunes des opportunités d'insertion économique dans un secteur d'avenir : les métiers du numérique, parfaitement alignés avec le chantier royal de la transition digitale.",
      alt: "Académie Najm pour l'avenir numérique"
    },
    {
      title: "Vision stratégique de l'association",
      text: "Depuis sa création, l'Association Najm poursuit son développement pour renforcer l'insertion professionnelle et l'entrepreneuriat des jeunes.\n\nAvec une gouvernance rigoureuse, une équipe structurée et des outils de suivi performants, elle diversifie ses actions et adapte ses programmes aux mutations économiques et numériques. Elle place la formation continue, les partenariats et l'accompagnement post-formation au cœur de sa stratégie durable.",
      alt: "Vision stratégique de l'association Najm"
    }
  ];

  const skillReinforcementCards = [
    {
      title: "Développement des Compétences Personnelles",
      text: "Renforcement des compétences en communication, leadership et gestion du stress pour améliorer les opportunités d'emploi."
    },
    {
      title: "Techniques de Recherche d'Emploi",
      text: "Comment rédiger un CV, techniques de réussite des entretiens d'embauche, et comment développer son réseau professionnel."
    },
    {
      title: "Sensibilisation à l'Entrepreneuriat",
      text: "Concepts fondamentaux pour la création d'entreprises, la gestion de projets et l'innovation."
    },
    {
      title: "Sensibilisation à l'Importance de la Création de Coopératives",
      text: "Soutien à la création de coopératives soumises à la loi 112/12, et promotion du travail coopératif et solidaire."
    }
  ];

  const supportList = [
    "Des conseils en entrepreneuriat",
    "Un accompagnement dans la rédaction de business plans",
    "L'accès au financement",
    "La création de coopératives numériques, favorisant les échanges de compétences, l'accès à de nouveaux marchés, et la croissance collective durable"
  ];

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
                {t("academieNajm.header.title")}
              </h1>

              <p className="text-xl md:text-2xl font-light italic drop-shadow-sm opacity-90 text-white">
                {t("academieNajm.header.subtitle")}
              </p>
            </div>
          </header>

          {/* Sections */}
          <main className="max-w-7xl mx-auto px-6 py-8 space-y-4">
            {sections.map((section, idx) => {
              const imageMap = ["/images/num2.jpg", "/images/qsn.jpg", "/images/num1.jpg"];
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
                          src="/images/num1.jpg"
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
                        href="#programmes"
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
                  {t("academieNajm.skillReinforcement.title")}
                  <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
                </h2>

                <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
                  {t("academieNajm.skillReinforcement.text")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                  {skillReinforcementCards.map((card, index) => (
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
                    {t("academieNajm.support.title")}
                    <span className="absolute left-1/2 md:left-0 -bottom-3 w-20 h-1 bg-[#1C398E] rounded-full transform -translate-x-1/2 md:translate-x-0"></span>
                  </h2>

                  <p className="mb-8 text-[18px] text-gray-700 leading-relaxed text-justify">
                    {t("academieNajm.support.text")}
                  </p>
                  <div className="bg-white p-10 rounded-xl shadow-xl border border-gray-200">
                    <h3 className="text-[30px] font-semibold text-[#1C398E] mb-6 text-center md:text-left leading-tight">
                      {t("academieNajm.support.programIncludes")}
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                      {supportList.map((item, index) => (
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
                      alt={t("academieNajm.support.imageText")}
                      className="w-full h-full object-cover rounded-3xl opacity-90 transform scale-105 transition-transform duration-500 hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 rounded-3xl"></div>
                    <span className="absolute text-3xl font-bold text-white z-10 drop-shadow-lg">{t("academieNajm.support.imageText")}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Reconnaissance et ambition nationale */}
          <section className="py-4 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center text-gray-800">
              <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
                {t("academieNajm.recognition.title")}
                <span className="block w-32 h-1 bg-[#1C398E] mx-auto mt-4 rounded-full"></span>
              </h2>

              <div className="max-w-5xl mx-auto">
                <p className="text-[18px] text-gray-700 leading-relaxed mb-8 text-justify">
                  {t("academieNajm.recognition.text")}
                </p>
                <div className="bg-white p-10 rounded-2xl text-gray-800 shadow-xl border border-gray-200">
                  <p className="text-[18px] font-medium leading-relaxed opacity-95 text-gray-700 text-justify">
                    {t("academieNajm.recognition.quote")}
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
              aria-label={t("academieNajm.backToTop")}
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
