"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

export default function IncubationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-50 py-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Incubation
          </h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Programme d'Incubation pour Jeunes Entrepreneurs
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              L'Association Najm développe un programme d'incubation innovant destiné à accompagner les jeunes entrepreneurs
              dans la transformation de leurs idées en entreprises viables et durables. Notre incubateur offre un environnement
              propice à l'innovation et au développement entrepreneurial.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Espaces de travail</h3>
                <p className="text-gray-700 mb-4">
                  Mise à disposition d'espaces de travail collaboratifs équipés des dernières technologies pour favoriser
                  la créativité et la productivité.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Bureaux partagés et privés</li>
                  <li>Salles de réunion équipées</li>
                  <li>Laboratoires d'innovation</li>
                  <li>Espaces de networking</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Mentorat personnalisé</h3>
                <p className="text-gray-700 mb-4">
                  Accompagnement par des mentors expérimentés issus du monde entrepreneurial et des différents secteurs d'activité.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Mentors sectoriels spécialisés</li>
                  <li>Sessions de coaching individuel</li>
                  <li>Ateliers de développement</li>
                  <li>Réseau d'entrepreneurs</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Programmes de formation</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-1">Idéation</h4>
                  <p className="text-sm text-gray-600">Développement et validation d'idées</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-1">Prototypage</h4>
                  <p className="text-sm text-gray-600">Création de prototypes et tests</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-1">Lancement</h4>
                  <p className="text-sm text-gray-600">Mise sur le marché et croissance</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">Accès au financement</h3>
              <p className="text-gray-700 mb-4">
                Facilitation de l'accès aux différentes sources de financement pour soutenir le développement des startups incubées.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Sources de financement</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Fonds d'amorçage</li>
                    <li>Investisseurs privés</li>
                    <li>Subventions publiques</li>
                    <li>Crowdfunding</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Support financier</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Préparation de business plans</li>
                    <li>Pitch training</li>
                    <li>Mise en relation investisseurs</li>
                    <li>Suivi financier</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">30+</div>
            <div className="text-gray-600">Startups incubées</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
            <div className="text-gray-600">Taux de réussite</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">20+</div>
            <div className="text-gray-600">Mentors experts</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">12</div>
            <div className="text-gray-600">Mois d'incubation</div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
