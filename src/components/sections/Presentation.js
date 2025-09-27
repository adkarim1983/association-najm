'use client';

import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
const qsn2 = "/images/imgs/qsn2.jpg";
const qsn = "/images/imgs/qsn.jpg";

export default function Presentation() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-white m-[25px] rounded-xl overflow-hidden shadow-xl py-12 px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

        {/* Image gauche */}
        <div className="w-full">
          <img
            src={qsn2}
            alt="Image gauche"
            className="rounded-xl shadow-md object-cover w-full h-full"
          />
        </div>

        {/* Texte centré verticalement */}
        <div className="flex items-center justify-center text-center h-full px-2 sm:px-3 md:px-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-4 text-center leading-tight">
              {t('home.aboutTeaser.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {t('home.aboutTeaser.text')}
            </p>
          </div>
        </div>

        {/* Image droite */}
        <div className="w-full">
          <img
            src={qsn}
            alt="Image droite"
            className="rounded-xl shadow-md object-cover w-full h-full"
          />
        </div>

      </div>
    </section>
  );
}
