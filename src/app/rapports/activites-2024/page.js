"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { useTranslation } from "../../../hooks/useTranslation";

export default function RapportActivites2024() {
  const { t } = useTranslation();

  // Get translated data
  const reportData = t('reports.activities2024', { returnObjects: true }) || {};
  const header = reportData.header || {};
  const introduction = reportData.introduction || {};
  const objectives = reportData.objectives || {};
  const future = reportData.future || {};
  const impact = reportData.impact || {};

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-white py-20 pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-[36px] font-extrabold text-blue-900 mb-6 drop-shadow-md">
              {header.title || "Partenariat avec l'Irchad et la Faculté"}
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {header.subtitle || "Un partenariat stratégique pour le développement et l'innovation dans l'enseignement supérieur"}
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-xl mb-12">
            <img 
              src="/images/image36.jpg" 
              alt={header.imageAlt || "Signature du partenariat"}
              className="w-full h-96 object-cover" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-800 leading-relaxed">
            <div>
              <h3 className="text-[30px] font-bold text-[#1C398E] mb-4">
                {introduction.title || "Introduction au Partenariat"}
              </h3>
              <p className="text-justify">
                {introduction.text || "L'Association Najm a établi un partenariat stratégique avec l'Irchad et la Faculté dans le cadre de ses activités de développement académique et professionnel. Cette collaboration vise à renforcer les capacités des étudiants et à promouvoir l'excellence dans l'enseignement supérieur."}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[30px] font-semibold text-[#1C398E]">
                  {objectives.title || "Objectifs du Partenariat"}
                </h4>
                <ul className="list-disc list-inside mt-3 space-y-2 text-justify">
                  {(objectives.items || [
                    "Développer des programmes de formation innovants",
                    "Faciliter l'échange d'expertise et de connaissances",
                    "Promouvoir la recherche collaborative",
                    "Renforcer l'employabilité des diplômés",
                    "Créer des opportunités de stage et d'emploi"
                  ]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[30px] font-semibold text-[#1C398E]">
                  {future.title || "Perspectives d'Avenir"}
                </h4>
                <p className="text-justify">
                  {future.text || "Ce partenariat ouvre de nouvelles perspectives pour le développement de l'écosystème éducatif et professionnel. Il permettra de créer des synergies durables entre le monde académique et le secteur associatif, contribuant ainsi au développement socio-économique de la région."}
                </p>
              </div>
            </div>
          </div>

          {/* Section supplémentaire avec statistiques */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-[28px] font-bold text-[#1C398E] text-center mb-8">
              {impact.title || "Impact du Partenariat"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(impact.stats || [
                { number: "150+", label: "Étudiants bénéficiaires" },
                { number: "25", label: "Programmes développés" },
                { number: "85%", label: "Taux de satisfaction" }
              ]).map((stat, index) => {
                const colors = ["text-blue-600", "text-green-600", "text-purple-600"];
                return (
                  <div key={index} className="text-center">
                    <div className={`text-4xl font-bold ${colors[index]} mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
