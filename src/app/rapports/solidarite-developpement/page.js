"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { useTranslation } from "../../../hooks/useTranslation";

export default function RapportSolidariteDeveloppement() {
  const { t } = useTranslation();

  // Get translated data
  const solidarityData = t('reports.solidarityDevelopment', { returnObjects: true }) || {};
  const header = solidarityData.header || {};
  const introduction = solidarityData.introduction || {};
  const strategicAxes = solidarityData.strategicAxes || {};
  const impact = solidarityData.impact || {};
  const stats = solidarityData.stats || {};

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-6 px-6 min-h-screen pt-24">
        <h1 className="text-4xl font-bold text-center text-[#1C398E] mb-6">
          {header.title || "Partenariat Irchad et Faculté - Solidarité et Développement"}
        </h1>

        <div className="flex justify-center mb-5">
          <img
            src="/images/image36.jpg"
            alt={header.imageAlt || "Partenariat Irchad et Faculté"}
            className="rounded-xl shadow-2xl w-full max-w-5xl object-cover"
          />
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            {introduction.text || "Dans le cadre de son engagement pour la solidarité et le développement social, l'Association Najm a établi un partenariat stratégique avec l'Irchad et la Faculté. Cette collaboration vise à renforcer les liens entre l'enseignement supérieur et les initiatives de développement communautaire, créant ainsi un pont entre la théorie académique et la pratique sociale sur le terrain."}
          </p>
        </div>

        <h2 className="text-[30px] font-semibold text-center text-[#1C398E] mb-6">
          {strategicAxes.title || "Axes Stratégiques du Partenariat"}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
          {(strategicAxes.items || [
            {
              title: "Formation et Sensibilisation",
              description: "Organisation de programmes de formation destinés aux étudiants et aux professionnels sur les enjeux de la solidarité sociale et du développement durable. Ces formations incluent des ateliers pratiques, des séminaires et des conférences avec des experts du domaine."
            },
            {
              title: "Projets Communautaires",
              description: "Mise en œuvre de projets concrets au service des communautés locales, impliquant directement les étudiants dans des actions de terrain. Ces projets permettent une application pratique des connaissances théoriques et renforcent l'engagement citoyen."
            },
            {
              title: "Recherche Appliquée",
              description: "Développement de programmes de recherche appliquée sur les problématiques sociales locales, avec la participation active des étudiants et des enseignants-chercheurs. Ces recherches contribuent à l'élaboration de solutions innovantes et adaptées aux besoins du terrain."
            },
            {
              title: "Réseau de Solidarité",
              description: "Construction d'un réseau solide entre les différents acteurs du développement social, facilitant les échanges d'expériences et la mutualisation des ressources. Ce réseau favorise la création de synergies durables entre les institutions partenaires."
            }
          ]).map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-justify">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            {impact.title || "Impact et Perspectives"}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            {impact.text || "Ce partenariat représente un modèle innovant de collaboration entre le secteur académique et associatif. Il contribue significativement au renforcement des capacités des futurs diplômés tout en répondant aux besoins réels des communautés. Les perspectives d'extension de cette collaboration incluent l'élargissement du réseau de partenaires et le développement de nouveaux programmes d'intervention sociale."}
          </p>
        </div>

        {/* Section statistiques */}
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-[28px] font-bold text-[#1C398E] text-center mb-8">
            {stats.title || "Résultats et Impact"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(stats.items || [
              { number: "200+", label: "Bénéficiaires directs" },
              { number: "15", label: "Projets réalisés" },
              { number: "8", label: "Partenaires impliqués" },
              { number: "95%", label: "Taux de réussite" }
            ]).map((stat, index) => {
              const colors = ["text-blue-600", "text-green-600", "text-purple-600", "text-orange-600"];
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                  <div className={`text-3xl font-bold ${colors[index]} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
