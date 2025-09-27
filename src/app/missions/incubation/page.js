"use client";

import React from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { useTranslation } from "../../../hooks/useTranslation";

export default function IncubationPage() {
  const { t } = useTranslation();
  
  // Get translated data
  const title = t('missions.incubation.title');
  const subtitle = t('missions.incubation.subtitle');
  const intro = t('missions.incubation.intro');
  const workspace = t('missions.incubation.sections.workspace', { returnObjects: true }) || {};
  const mentoring = t('missions.incubation.sections.mentoring', { returnObjects: true }) || {};
  const training = t('missions.incubation.sections.training', { returnObjects: true }) || {};
  const funding = t('missions.incubation.sections.funding', { returnObjects: true }) || {};
  const statsLabels = t('missions.incubation.stats.labels', { returnObjects: true }) || [];
  const statsValues = ["30+", "85%", "20+", "12"];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-50 py-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {subtitle}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              {intro}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">{workspace.title}</h3>
                <p className="text-gray-700 mb-4">
                  {workspace.description}
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {workspace.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">{mentoring.title}</h3>
                <p className="text-gray-700 mb-4">
                  {mentoring.description}
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {mentoring.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">{training.title}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {training.phases?.map((phase, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{phase.name}</h4>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">{funding.title}</h3>
              <p className="text-gray-700 mb-4">
                {funding.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{funding.sources?.title}</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {funding.sources?.items?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{funding.support?.title}</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {funding.support?.items?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          {statsLabels.map((label, index) => {
            const colors = ['purple', 'blue', 'green', 'yellow'];
            const color = colors[index] || 'gray';
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <div className={`text-3xl font-bold text-${color}-600 mb-2`}>{statsValues[index]}</div>
                <div className="text-gray-600">{label}</div>
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
