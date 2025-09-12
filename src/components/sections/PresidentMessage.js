'use client';

import { useState, useRef, useEffect } from "react";
const presidentImg = "/images/image2.jpg";

export default function PresidentMessage() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let scrollAmount = 0;
    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current && !showFullMessage) {
        scrollAmount += 1;
        scrollRef.current.scrollLeft = scrollAmount;
        if (
          scrollAmount >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollAmount = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, showFullMessage, mounted]);

  const handleToggleMessage = () => {
    setIsPaused(!isPaused);
    setShowFullMessage(!showFullMessage);
  };

  return (
    <section className="mt-10 bg-gray-100 py-4 px-3 sm:px-6 md:px-14 mx-2 sm:mx-4 md:mx-7 mt-32 rounded-lg">
      <div
        className="flex flex-col gap-4 overflow-hidden cursor-pointer md:items-center md:flex-row"
        onMouseEnter={() => {
          setIsPaused(true);
          setShowFullMessage(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setShowFullMessage(false);
        }}
        onClick={handleToggleMessage}
      >
        <h2 className="text-base md:text-lg font-bold text-blue-800 whitespace-nowrap mx-2 sm:mx-4 md:mx-10 text-center md:text-left">
          Message du Président
        </h2>

        {!showFullMessage ? (
          <div ref={scrollRef} className="flex-1 overflow-hidden">
            <div className="inline-block whitespace-nowrap text-gray-700 text-[18px] min-w-max">
            Monsieur Hassan Rezk, Président de l’Association Najm, vous souhaite la bienvenue sur la plateforme officielle de l’association, dédiée à l’autonomisation économique et professionnelle des jeunes. Convaincue que la jeunesse est le moteur du changement, l’association mise sur la formation, l’accompagnement et le soutien continu pour renforcer leur participation à la vie économique et sociale.

Guidée par des valeurs de respect, transparence, égalité et collaboration, elle développe des programmes innovants et élargit ses partenariats afin de devenir une référence nationale et régionale, inspirant les jeunes à devenir les leaders de demain.
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md w-full mt-2">
            <img
              src={presidentImg}
              alt="Président"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-gray-700 text-xs sm:text-sm md:text-base text-justify leading-relaxed">
              Monsieur Hassan Rezk, Président de l’Association Najm, vous souhaite la bienvenue sur la plateforme officielle de l’association, dédiée à l’autonomisation économique et professionnelle des jeunes. Convaincue que la jeunesse est le moteur du changement, l’association mise sur la formation, l’accompagnement et le soutien continu pour renforcer leur participation à la vie économique et sociale.

Guidée par des valeurs de respect, transparence, égalité et collaboration, elle développe des programmes innovants et élargit ses partenariats afin de devenir une référence nationale et régionale, inspirant les jeunes à devenir les leaders de demain.
              </p>
              <div className="mt-3 sm:hidden">
                <button 
                  onClick={handleToggleMessage}
                  className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
