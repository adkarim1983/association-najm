"use client";

import React from "react";
import CountUp from "react-countup";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { useTranslation } from "../../../hooks/useTranslation";

export default function GestionPlateformesPage() {
  const { t } = useTranslation();
  
  // Get translated data
  const title = t('missions.platformManagement.title');
  const introHtml = t('missions.platformManagement.intro');
  const spaces = t('missions.platformManagement.spaces', { returnObjects: true }) || [];
  const statsTitle = t('missions.platformManagement.stats.title');
  const statsLabels = t('missions.platformManagement.stats.labels', { returnObjects: true }) || [];
  
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
          {spaces.map((space, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">{space.title}</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{space.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow p-8">
          <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">{statsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsLabels.map((label, idx) => (
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
