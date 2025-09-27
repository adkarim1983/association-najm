"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { useTranslation } from "../../../hooks/useTranslation";

export default function RapportCultureEtJeunesse() {
  const { t } = useTranslation();

  // Get translated data
  const cultureData = t('reports.cultureAndYouth', { returnObjects: true }) || {};
  const header = cultureData.header || {};
  const festival = cultureData.festival || {};
  const workshops = cultureData.workshops || {};
  const citizenship = cultureData.citizenship || {};
  const stats = cultureData.stats || {};

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="py-16 px-6 bg-white text-gray-800 pt-24">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1C398E] mb-4">
              {header.title || "Culture et Jeunesse"}
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              {header.subtitle || "Initiatives et programmes dédiés au développement culturel et à l'épanouissement de la jeunesse"}
            </p>
          </div>

          {/* Bloc 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img src="/images/image31.jpg" alt={festival.imageAlt || "Événement culturel 1"} className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-[30px] font-bold text-[#1C398E] text-justify">
                {festival.title || "Festival Culturel de la Jeunesse"}
              </h2>
              {(festival.paragraphs || [
                "L'Association Najm a organisé le premier Festival Culturel de la Jeunesse, un événement majeur qui a rassemblé plus de 500 jeunes participants venus de différentes régions. Cet événement a été conçu pour célébrer la diversité culturelle et promouvoir les talents artistiques des jeunes.",
                "Le festival a proposé une programmation riche incluant des spectacles de danse traditionnelle, des concerts de musique contemporaine, des expositions d'art plastique et des ateliers d'écriture créative. Cette manifestation a permis aux jeunes de s'exprimer librement et de partager leurs créations avec un large public.",
                "L'impact de cet événement s'est ressenti bien au-delà de sa durée, créant des liens durables entre les participants et inspirant de nouveaux projets culturels dans leurs communautés respectives."
              ]).map((paragraph, index) => (
                <p key={index} className="text-justify">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Bloc 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <img src="/images/image30.jpg" alt={workshops.imageAlt || "Atelier jeunesse"} className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-[30px] font-bold text-[#1C398E] font-semibold">
                {workshops.title || "Ateliers de Développement Personnel"}
              </h2>
              {(workshops.paragraphs || [
                "Dans le cadre de son programme \"Jeunesse et Leadership\", l'Association a mis en place une série d'ateliers de développement personnel destinés aux jeunes âgés de 16 à 25 ans. Ces ateliers couvrent des thématiques essentielles comme la confiance en soi, la communication efficace et la gestion du stress.",
                "Animés par des experts en développement personnel et des coachs certifiés, ces ateliers utilisent des méthodes pédagogiques innovantes combinant théorie et pratique. Les participants bénéficient d'un accompagnement personnalisé et d'outils concrets pour développer leur potentiel et réaliser leurs projets."
              ]).map((paragraph, index) => (
                <p key={index} className="text-justify">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Bloc 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img src="/images/image34.jpg" alt={citizenship.imageAlt || "Programme culturel"} className="w-full md:w-1/2 rounded-lg shadow-lg" />
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-[30px] font-semibold text-[#1C398E]">
                {citizenship.title || "Programme \"Culture et Citoyenneté\""}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-justify">
                {(citizenship.activities || [
                  "Organisation de débats citoyens sur les enjeux sociétaux contemporains, permettant aux jeunes d'exprimer leurs opinions et de développer leur esprit critique",
                  "Mise en place d'un concours de création artistique sur le thème \"Ma vision du futur\", encourageant l'expression créative et la réflexion prospective",
                  "Création d'un réseau de jeunes ambassadeurs culturels chargés de promouvoir les initiatives de l'association dans leurs établissements scolaires et universitaires"
                ]).map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
              <p className="text-justify">
                {citizenship.impact || "Ce programme innovant a permis de sensibiliser plus de 300 jeunes aux valeurs de citoyenneté active et de responsabilité sociale, tout en valorisant leur créativité et leur engagement communautaire."}
              </p>
            </div>
          </div>

          {/* Section statistiques */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-[28px] font-bold text-[#1C398E] text-center mb-8">
              {stats.title || "Impact de nos Actions Culture et Jeunesse"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(stats.items || [
                { number: "800+", label: "Jeunes participants" },
                { number: "25", label: "Événements organisés" },
                { number: "12", label: "Partenaires culturels" },
                { number: "90%", label: "Satisfaction participants" }
              ]).map((stat, index) => {
                const colors = ["text-blue-600", "text-purple-600", "text-green-600", "text-orange-600"];
                return (
                  <div key={index} className="text-center">
                    <div className={`text-4xl font-bold ${colors[index]} mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-700 font-medium">{stat.label}</div>
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
