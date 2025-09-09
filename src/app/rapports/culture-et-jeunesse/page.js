"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

export default function RapportCultureEtJeunesse() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="py-16 px-6 bg-white text-gray-800 pt-24">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1C398E] mb-4">
              Culture et Jeunesse
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Initiatives et programmes dédiés au développement culturel et à l'épanouissement de la jeunesse
            </p>
          </div>

          {/* Bloc 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img src="/images/image31.jpg" alt="Événement culturel 1" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-[30px] font-bold text-[#1C398E] text-justify">
                Festival Culturel de la Jeunesse
              </h2>
              <p className="text-justify">
                L'Association Najm a organisé le premier Festival Culturel de la Jeunesse, un événement 
                majeur qui a rassemblé plus de 500 jeunes participants venus de différentes régions. 
                Cet événement a été conçu pour célébrer la diversité culturelle et promouvoir les talents 
                artistiques des jeunes.
              </p>
              <p className="text-justify">
                Le festival a proposé une programmation riche incluant des spectacles de danse traditionnelle, 
                des concerts de musique contemporaine, des expositions d'art plastique et des ateliers 
                d'écriture créative. Cette manifestation a permis aux jeunes de s'exprimer librement 
                et de partager leurs créations avec un large public.
              </p>
              <p className="text-justify">
                L'impact de cet événement s'est ressenti bien au-delà de sa durée, créant des liens 
                durables entre les participants et inspirant de nouveaux projets culturels dans leurs 
                communautés respectives.
              </p>
            </div>
          </div>

          {/* Bloc 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <img src="/images/image30.jpg" alt="Atelier jeunesse" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-[30px] font-bold text-[#1C398E] font-semibold">
                Ateliers de Développement Personnel
              </h2>
              <p className="text-justify">
                Dans le cadre de son programme "Jeunesse et Leadership", l'Association a mis en place 
                une série d'ateliers de développement personnel destinés aux jeunes âgés de 16 à 25 ans. 
                Ces ateliers couvrent des thématiques essentielles comme la confiance en soi, la 
                communication efficace et la gestion du stress.
              </p>
              <p className="text-justify">
                Animés par des experts en développement personnel et des coachs certifiés, ces ateliers 
                utilisent des méthodes pédagogiques innovantes combinant théorie et pratique. Les 
                participants bénéficient d'un accompagnement personnalisé et d'outils concrets pour 
                développer leur potentiel et réaliser leurs projets.
              </p>
            </div>
          </div>

          {/* Bloc 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img src="/images/image34.jpg" alt="Programme culturel" className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-[30px] font-semibold text-[#1C398E]">
                Programme "Culture et Citoyenneté"
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-justify">
                <li>
                  Organisation de débats citoyens sur les enjeux sociétaux contemporains, permettant 
                  aux jeunes d'exprimer leurs opinions et de développer leur esprit critique
                </li>
                <li>
                  Mise en place d'un concours de création artistique sur le thème "Ma vision du futur", 
                  encourageant l'expression créative et la réflexion prospective
                </li>
                <li>
                  Création d'un réseau de jeunes ambassadeurs culturels chargés de promouvoir les 
                  initiatives de l'association dans leurs établissements scolaires et universitaires
                </li>
              </ul>
              <p className="text-justify">
                Ce programme innovant a permis de sensibiliser plus de 300 jeunes aux valeurs de 
                citoyenneté active et de responsabilité sociale, tout en valorisant leur créativité 
                et leur engagement communautaire.
              </p>
            </div>
          </div>

          {/* Section statistiques */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-[28px] font-bold text-[#1C398E] text-center mb-8">
              Impact de nos Actions Culture et Jeunesse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">800+</div>
                <div className="text-gray-700 font-medium">Jeunes participants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">25</div>
                <div className="text-gray-700 font-medium">Événements organisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">12</div>
                <div className="text-gray-700 font-medium">Partenaires culturels</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">90%</div>
                <div className="text-gray-700 font-medium">Satisfaction participants</div>
              </div>
            </div>
          </div>

          {/* Section témoignages */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-[28px] font-bold text-[#1C398E] text-center mb-8">
              Témoignages
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 italic mb-4">
                  "Grâce aux ateliers de l'Association Najm, j'ai découvert ma passion pour le théâtre 
                  et développé ma confiance en moi. Aujourd'hui, je dirige ma propre troupe théâtrale."
                </p>
                <div className="font-semibold text-blue-800">- Sarah, 22 ans</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-gray-700 italic mb-4">
                  "Le festival culturel a été un tournant dans ma vie. J'y ai rencontré des jeunes 
                  partageant les mêmes valeurs et nous avons créé ensemble plusieurs projets sociaux."
                </p>
                <div className="font-semibold text-purple-800">- Ahmed, 24 ans</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
