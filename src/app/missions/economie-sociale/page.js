"use client";

import React from "react";
import CountUp from "react-countup";

export default function EconomieSocialePage() {
  const title = "Axe de Soutien à l'Économie Sociale et Solidaire";
  const introHtml =
    "Depuis 2021, l'Association Najm est chargée de la mise en œuvre de l'axe « Soutien à l'Économie Sociale et Solidaire » au niveau de la préfecture de Moulay Rachid. Cet axe vise à accompagner et à renforcer les capacités des acteurs de l'économie sociale et solidaire, avec un accent particulier sur les coopératives soumises à la loi 112.12, ainsi que sur les divers acteurs économiques actifs dans ce domaine.<br/><br/>Grâce à cette initiative, l'Association Najm offre un soutien complet aux coopératives et aux entrepreneurs sociaux en leur proposant des formations administratives et de gestion, un renforcement des compétences techniques et artisanales, et des opportunités de financement. L'objectif est de renforcer leurs opportunités de développement, d'accroître leur compétitivité et de favoriser leur intégration économique pour un développement durable et inclusif.";

  const cards = [
    {
      title: "Rôle Clé de l'Association",
      text:
        "L'Association Najm joue un rôle central dans le soutien des porteurs de projets et des acteurs économiques de l'économie sociale et solidaire. Elle organise régulièrement des appels à propositions de projets, reçoit et étudie les dossiers des organismes candidats, et accompagne les entrepreneurs tout au long des étapes de préparation et de développement des demandes d'aide financière.",
    },
    {
      title: "Accompagnement Business Plan",
      text:
        "Dans le cadre de son engagement à soutenir le développement économique, l'Association Najm accompagne les porteurs de projets dans l'élaboration de leurs Business Plans. Elle leur fournit des outils et des conseils pour structurer leurs idées, améliorer leur modèle économique et préparer des présentations efficaces devant le Comité Provincial de Développement Économique (CPDE), qui évalue la faisabilité et la pertinence des projets.",
    },
    {
      title: "Suivi Post-Validation et Financement",
      text:
        "Après validation du projet par le CPDE, l'Association Najm continue d'apporter son soutien en accompagnant les porteurs de projets dans les démarches administratives nécessaires à l'obtention de l'aide financière. Elle s'assure du respect des conditions requises par les organismes subventionnés et les aide à préparer et à soumettre les documents nécessaires dans les délais impartis, garantissant ainsi une réception fluide et rapide des fonds.",
    },
    {
      title: "Suivi Post-Financement",
      text:
        "Le rôle de l'Association Najm ne se limite pas à l'octroi de financement, mais s'étend à un suivi minutieux après le financement, où elle continue de soutenir les porteurs de projets pendant la phase de mise en œuvre. Ce soutien comprend des conseils en gestion, marketing et développement commercial, contribuant à assurer la durabilité et la croissance des entreprises. L'objectif est d'accompagner ces projets vers le succès à long terme et de renforcer leur impact économique et social au sein de la communauté.",
    },
  ];

  const statsTitle = "L'Économie Sociale et Solidaire en Chiffres";
  const stats = [
    "Appels à propositions de projets organisés",
    "Projets soumis après les appels à projets",
    "Projets répondant aux critères initiaux",
    "Projets acceptés par le CPDH",
    "Projets financés et en cours",
  ];
  const statsValues = [10, 62, 48, 36, 27];

  const renewalText =
    "Sur la base de ces résultats également positifs, le Comité Provincial du Développement Humain a renouvelé sa confiance en l'Association Najm en signant un nouvel accord pour la mise en œuvre de l'axe « Soutien à l'Économie Sociale et Solidaire » dans les districts de Moulay Rachid pour l'année 2025.";

  return (
    <div className="min-h-screen bg-gray-50 py-20">
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
          {cards.map((c, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">{c.title}</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">{statsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((label, idx) => (
              <div key={idx} className="bg-indigo-600 text-white rounded-lg p-6 text-center">
                <div className="text-4xl font-extrabold mb-1">
                  <CountUp end={statsValues[idx]} duration={2.2} enableScrollSpy scrollSpyOnce />
                </div>
                <div className="text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal */}
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
          <p className="text-gray-800 text-justify">{renewalText}</p>
        </div>
      </div>
    </div>
  );
}
