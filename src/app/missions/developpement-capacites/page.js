"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

export default function DeveloppementCapacitesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-50 py-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Développement des capacités des jeunes
          </h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Développement des Capacités des Jeunes
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              L'Association Najm met en place des programmes complets de développement des capacités des jeunes,
              visant à renforcer leurs compétences techniques, personnelles et professionnelles pour favoriser
              leur insertion dans le marché du travail et leur épanouissement personnel.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">Formation technique</h3>
                <p className="text-gray-700 mb-4">
                  Programmes de formation dans les domaines techniques et numériques les plus demandés sur le marché.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Développement web et mobile</li>
                  <li>Design graphique et multimédia</li>
                  <li>Marketing digital</li>
                  <li>Comptabilité et gestion</li>
                  <li>Langues étrangères</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Compétences transversales</h3>
                <p className="text-gray-700 mb-4">
                  Développement des soft skills essentiels pour la réussite professionnelle et personnelle.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Communication et prise de parole</li>
                  <li>Leadership et travail d'équipe</li>
                  <li>Gestion du temps et des priorités</li>
                  <li>Résolution de problèmes</li>
                  <li>Pensée critique et créativité</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Académie Najm pour les Métiers du Numérique</h3>
              <p className="text-gray-700 mb-4">
                Programme phare "Promotion sociale par la numérisation" offrant des formations spécialisées
                dans les métiers du digital.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">Web Dev</div>
                  <p className="text-sm text-gray-600">Développement web complet</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Design</div>
                  <p className="text-sm text-gray-600">Design graphique professionnel</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">Marketing</div>
                  <p className="text-sm text-gray-600">Marketing digital avancé</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">Accompagnement à l'insertion professionnelle</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Préparation à l'emploi</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Rédaction de CV et lettres de motivation</li>
                    <li>Préparation aux entretiens d'embauche</li>
                    <li>Simulation d'entretiens</li>
                    <li>Techniques de recherche d'emploi</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Mise en relation</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Réseau d'entreprises partenaires</li>
                    <li>Forums de recrutement</li>
                    <li>Stages et opportunités</li>
                    <li>Suivi post-insertion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Objectifs du programme</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span><span className="text-gray-700">Réduire la fracture numérique</span></li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span><span className="text-gray-700">Améliorer l'employabilité des jeunes</span></li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span><span className="text-gray-700">Favoriser l'inclusion sociale</span></li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span><span className="text-gray-700">Développer l'esprit entrepreneurial</span></li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span><span className="text-gray-700">Renforcer la confiance en soi</span></li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2">✓</span><span className="text-gray-700">Promouvoir l'innovation locale</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Jeunes formés</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">75%</div>
            <div className="text-gray-600">Taux d'insertion</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Programmes disponibles</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Entreprises partenaires</div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
