"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

export default function RapportActivites2024() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-white py-20 pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-[36px] font-extrabold text-blue-900 mb-6 drop-shadow-md">
              Partenariat avec l'Irchad et la Faculté
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Un partenariat stratégique pour le développement et l'innovation dans l'enseignement supérieur
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-xl mb-12">
            <img 
              src="/images/image36.jpg" 
              alt="Signature du partenariat" 
              className="w-full h-96 object-cover" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-800 leading-relaxed">
            <div>
              <h3 className="text-[30px] font-bold text-[#1C398E] mb-4">
                Introduction au Partenariat
              </h3>
              <p className="text-justify">
                L'Association Najm a établi un partenariat stratégique avec l'Irchad et la Faculté dans le cadre 
                de ses activités de développement académique et professionnel. Cette collaboration vise à renforcer 
                les capacités des étudiants et à promouvoir l'excellence dans l'enseignement supérieur.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[30px] font-semibold text-[#1C398E]">
                  Objectifs du Partenariat
                </h4>
                <ul className="list-disc list-inside mt-3 space-y-2 text-justify">
                  <li>Développer des programmes de formation innovants</li>
                  <li>Faciliter l'échange d'expertise et de connaissances</li>
                  <li>Promouvoir la recherche collaborative</li>
                  <li>Renforcer l'employabilité des diplômés</li>
                  <li>Créer des opportunités de stage et d'emploi</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[30px] font-semibold text-[#1C398E]">
                  Perspectives d'Avenir
                </h4>
                <p className="text-justify">
                  Ce partenariat ouvre de nouvelles perspectives pour le développement de l'écosystème éducatif 
                  et professionnel. Il permettra de créer des synergies durables entre le monde académique et 
                  le secteur associatif, contribuant ainsi au développement socio-économique de la région.
                </p>
              </div>
            </div>
          </div>

          {/* Section supplémentaire avec statistiques */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-[28px] font-bold text-[#1C398E] text-center mb-8">
              Impact du Partenariat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-600">Étudiants bénéficiaires</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">25</div>
                <div className="text-gray-600">Programmes développés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-gray-600">Taux de satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
