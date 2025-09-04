"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function GaleriePage() {
  // Static FR text from old translations
  const t = (k) =>
    ({
      "gallery.title": "Inauguration de Najm Académie pour les Métiers Digitaux",
      "gallery.section1_p1":
        "L'Association Najm a officiellement lancé trois formations professionnelles destinées aux jeunes : le développement web, le design graphique et le marketing digital. Cette initiative vise à offrir une réelle opportunité d'insertion professionnelle par l'acquisition de compétences recherchées sur le marché.",
      "gallery.section1_p2":
        "Ces programmes sont conçus pour répondre aux exigences du monde numérique actuel en mettant l'accent sur la pratique, la créativité et l'innovation.",
      "gallery.section2_p1":
        "Ces formations sont encadrées par des professionnels expérimentés qui adoptent une approche pédagogique basée sur les projets. Chaque participant bénéficie d'un accompagnement individualisé, de travaux pratiques et de projets concrets, individuels ou collectifs.",
      "gallery.section2_p2":
        "L'objectif est de permettre à chaque jeune de développer ses compétences techniques et sa créativité, ainsi que de renforcer sa confiance en lui dans un environnement dynamique et stimulant.",
      "gallery.program_title": "Contenu des programmes",
      "gallery.program_web": "Développement Web : HTML, CSS, JavaScript, React, création de sites responsives.",
      "gallery.program_design": "Design Graphique : Photoshop, Illustrator, InDesign, création de logos et supports visuels.",
      "gallery.program_marketing": "Marketing Digital : SEO, réseaux sociaux, e-mailing, publicité en ligne.",
      "gallery.training_title": "Déroulement des formations",
      "gallery.training_p1":
        "Les cours se déroulent dans un environnement dynamique et participatif, avec chaque semaine des ateliers pratiques, des sessions de feedback, des conférences inspirantes et des défis collectifs.",
      "gallery.training_p2":
        "L'accent est mis sur la participation des jeunes, le travail collaboratif et la réalisation de projets numériques qui répondent à des problématiques réelles.",
      "gallery.success_title": "Une première promotion réussie",
      "gallery.success_p":
        "Grâce à l'engagement des formateurs, des partenaires et des jeunes, cette première promotion a posé les jalons d'une véritable dynamique d'apprentissage et de transformation. Ce programme se veut un tremplin vers un avenir numérique prometteur pour nos jeunes.",
      "gallery.gallery_highlights": "Galerie générale des moments forts",
      "gallery.image_inauguration": "Inauguration",
      "gallery.image_presentation": "Présentation des formations",
      "gallery.image_training_content": "Contenu des formations",
      "gallery.image_course_progress": "Déroulement des cours",
      "gallery.image_end_of_training": "Fin de la formation",
      "gallery.image_share_exchange": "Partage et échange",
      "gallery.image_youth_discovering_digital": "Jeunes découvrant le numérique",
      "gallery.image_intensive_training": "Formation intensive",
      "gallery.image_group_work": "Travail de groupe",
      "gallery.image_pedagogical_team": "Équipe pédagogique",
      "gallery.image_final_projects": "Projets finaux",
      "gallery.image_certificates": "Remise des certificats",
      "gallery.image_digital_marketing_workshop": "Atelier marketing digital",
      "gallery.image_tech_trends_discussion": "Discussion sur les tendances tech",
    }[k]);

  // map old imports to public images
  const image = {
    image2a: "/images/image2a.jpg",
    image3a: "/images/image3a.jpg",
    image4a: "/images/image4a.jpg",
    image5a: "/images/image5a.jpg",
    image6a: "/images/image6a.jpg",
    image7a: "/images/image7a.jpg",
    md1: "/images/md1.jpg",
    p1: "/images/p1.jpg",
    p2: "/images/p2.jpg",
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  const galleryImages = useMemo(
    () => [
      { src: image.image3a, text: t("gallery.image_share_exchange") },
      { src: image.image5a, text: t("gallery.image_youth_discovering_digital") },
      { src: image.image6a, text: t("gallery.image_intensive_training") },
      { src: image.image7a, text: t("gallery.image_group_work") },
      { src: image.md1, text: t("gallery.image_pedagogical_team") },
      { src: image.p1, text: t("gallery.image_final_projects") },
      { src: image.p2, text: t("gallery.image_certificates") },
      { src: image.image2a, text: t("gallery.image_digital_marketing_workshop") },
      { src: image.image4a, text: t("gallery.image_tech_trends_discussion") },
    ],
    []
  );

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 3;
  };

  const totalSlides = Math.ceil(galleryImages.length / itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getItemsPerSlide();
      setItemsPerSlide(newItemsPerSlide);
      const newTotalSlides = Math.ceil(galleryImages.length / newItemsPerSlide);
      if (currentSlide >= newTotalSlides) setCurrentSlide(Math.max(0, newTotalSlides - 1));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide, galleryImages.length]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides);
  const goToSlide = (i) => setCurrentSlide(i);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="px-8 py-12 bg-white min-h-screen font-sans text-gray-800 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[40px] font-extrabold text-center text-[#1C398E] mb-16 relative pb-4 leading-tight">
          {t("gallery.title")}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-[#1C398E] rounded-full"></span>
        </h1>

        {/* First section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <p className="mb-6">{t("gallery.section1_p1")}</p>
            <p>{t("gallery.section1_p2")}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={image.image2a} alt="Inauguration" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_inauguration")}</p>
            </div>
          </div>
        </div>

        {/* Second section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group order-2 md:order-1">
            <img src={image.image4a} alt="Présentation" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_presentation")}</p>
            </div>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed text-justify order-1 md:order-2">
            <p className="mb-6">{t("gallery.section2_p1")}</p>
            <p>{t("gallery.section2_p2")}</p>
          </div>
        </div>

        {/* Third section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 text-center md:text-left leading-tight">{t("gallery.program_title")}</h2>
            <ul className="list-disc list-inside space-y-3 text-justify">
              <li>{t("gallery.program_web")}</li>
              <li>{t("gallery.program_design")}</li>
              <li>{t("gallery.program_marketing")}</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={image.md1} alt="Contenu des formations" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_training_content")}</p>
            </div>
          </div>
        </div>

        {/* Fourth section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group order-2 md:order-1">
            <img src={image.p1} alt="Déroulement des cours" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_course_progress")}</p>
            </div>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed text-justify order-1 md:order-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 text-center md:text-left leading-tight">{t("gallery.training_title")}</h2>
            <p className="mb-6">{t("gallery.training_p1")}</p>
            <p>{t("gallery.training_p2")}</p>
          </div>
        </div>

        {/* Fifth section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 text-center md:text-left leading-tight">{t("gallery.success_title")}</h2>
            <p>{t("gallery.success_p")}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={image.p2} alt="Fin de formation" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_end_of_training")}</p>
            </div>
          </div>
        </div>

        {/* Highlights carousel */}
        <h2 className="text-[40px] font-extrabold text-center text-[#1C398E] mt-24 mb-12 relative pb-4 leading-tight">
          {t("gallery.gallery_highlights")}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-[#1C398E] rounded-full"></span>
        </h2>

        <div className="relative max-w-7xl mx-auto mb-20">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {galleryImages
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((item, index) => {
                        const globalIndex = slideIndex * itemsPerSlide + index;
                        return (
                          <div key={globalIndex} className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                            <img src={item.src} alt={`galerie-${globalIndex}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute bottom-0 w-full bg-blue-700/80 text-white text-center py-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-sm px-2">{item.text}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"}`} />
            ))}
          </div>
        </div>
      </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Add CSS animations from association folder
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 1s ease forwards;
  }

  .animate-fade-up {
    animation: fade-up 1s ease forwards;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
