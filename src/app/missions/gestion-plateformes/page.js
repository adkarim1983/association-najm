"use client";

import React from "react";
import CountUp from "react-countup";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

export default function GestionPlateformesPage() {
  const title = "Gestion et Administration des Plateformes d'Orientation";
  const introHtml =
    "L'Association Najm gère des plateformes d'orientation et d'emploi des jeunes dans les quartiers de Moulay Rachid depuis 2020, des espaces dédiés au soutien et à l'intégration économique des jeunes dans le cadre du Programme 3 de la troisième phase de l'Initiative Nationale pour le Développement Humain (INDH).<br/><br/>La plateforme d'orientation, grâce à son modèle de gestion développé par l'Association Najm, est devenue une référence dans l'intégration économique des jeunes, avec un engagement total envers l'esprit de l'INDH. Elle se distingue comme un espace dynamique qui rassemble diverses institutions, organismes et programmes dédiés aux jeunes.<br/><br/>L'Association Najm s'appuie sur une méthodologie de gouvernance efficace et transparente, basée sur des mécanismes de prise de décision clairs et fluides. L'association a élaboré un guide de procédures couvrant toutes les opérations de gestion, et elle vise à obtenir une certification de qualité pour ses processus administratifs et la reconnaissance en tant qu'association d'utilité publique.";

  const cards = [
    {
      title: "Espace d'Accueil",
      text:
        "C'est le premier point de contact avec les jeunes, dont la mission est de vérifier leur éligibilité et de leur présenter les différents programmes et services offerts par la plateforme.",
    },
    {
      title: "Espace d'Écoute",
      text:
        "Dédié à l'écoute des jeunes et à l'analyse de leurs besoins, cet espace vise à identifier leurs ambitions et à évaluer leurs compétences par un diagnostic individuel, permettant une meilleure compréhension de leurs attentes professionnelles et personnelles.",
    },
    {
      title: "Espace d'Orientation",
      text:
        "Après l'évaluation des compétences, les jeunes sont orientés vers le programme le plus adapté à leurs ambitions futures, soit vers un prestataire de services interne à la plateforme, soit vers une autre institution partenaire externe correspondant à leurs besoins.",
    },
  ];

  const statsTitle = "Statistiques Clés (au 30 avril 2025)";
  const stats = [
    "Jeunes accueillis sur la plateforme",
    "Jeunes orientés vers l'économie sociale et solidaire",
    "Jeunes orientés vers l'entrepreneuriat",
    "Jeunes orientés vers le renforcement de l'employabilité",
    "Jeunes orientés vers des programmes/partenaires externes",
    "Total jeunes bénéficiaires des services de la plateforme",
  ];
  const statsValues = [5580, 2872, 98, 610, 277, 4826];

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
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cards.map((c, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">{c.title}</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow p-8">
          <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">{statsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((label, idx) => (
              <div key={idx} className="bg-indigo-600 text-white rounded-lg p-6 text-center">
                <div className="text-4xl font-extrabold mb-1">
                  <CountUp end={parseInt(statsValues[idx], 10)} duration={2.2} enableScrollSpy scrollSpyOnce />
                </div>
                <div className="text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
