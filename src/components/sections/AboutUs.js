'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from '../../hooks/useTranslation';

// Styles CSS pour les animations personnalisées
const teamAnimationStyles = `
  @keyframes fade-in-up {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes scale-x {
    from { 
      transform: scaleX(0); 
    }
    to { 
      transform: scaleX(1); 
    }
  }
  
  .animate-fade-in-up {
    opacity: 0;
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .animate-scale-x {
    transform: scaleX(0);
    animation: scale-x 0.6s ease-out forwards;
    animation-delay: 400ms;
  }
`;

// Remarque: Les images sont servies depuis public/images

/**
 * Organigramme Association Najm (FR) – React + Tailwind
 * Version sans images (titres uniquement)
 * - Cartes élégantes avec nom + fonction
 * - Connecteurs symétriques en CSS pur
 * - Responsive et professionnel
 */

const BRAND = {
  blue: "#1B7CC1",
  blueLight: "#E6F1FB",
};

const orgData = {
  president: {
    name: "Hassan Rezk",
    role: "Président de l'association",
  },
  level1: [
    { name: "Abd al‑Wahab Karoumi", role: "Trésorier", children: [
      { name: "Hajar El Raji", role: "Vice‑trésorière" },
    ]},
    { name: "Said Hamdoun", role: "Secrétaire général", children: [
      { name: "Chaimaa Meziane", role: "Vice‑secrétaire générale" },
    ]},
    { name: "Mohamed El Ghazouani", role: "Vice‑président chargé des SI & transformation numérique" },
    { name: "Moulay Youssef El Hafeïdi", role: "Vice‑président chargé des entreprises & entrepreneuriat social" },
    { name: "Sanaa El Filali", role: "Vice‑présidente chargée de l'innovation sociale & des partenariats" },
  ],
};

function Badge({ text, className = "", style = {} }) {
  return (
    <div
      className={`rounded-md px-3 py-1 text-center text-[13px] font-semibold leading-tight ${className}`}
      style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06) inset", ...style }}
    >
      {text}
    </div>
  );
}

function PersonCard({ name, role, delay = 0, isVisible = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative mx-auto w-[220px] select-none group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-lg transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
      
      {/* Floating animation */}
      <div className={`space-y-1 transition-transform duration-700 ${
        isHovered ? 'scale-105 -translate-y-2' : ''
      }`}>
        <Badge
          text={name}
          className={`bg-white text-zinc-900 border transition-all duration-500 ${
            isHovered 
              ? 'border-blue-400 shadow-lg shadow-blue-200/50 bg-gradient-to-r from-blue-50 to-indigo-50' 
              : 'border-[color:var(--brand-blue)] shadow-md'
          }`}
          style={{ ['--brand-blue']: BRAND.blue }}
        />
        <Badge
          text={role}
          className={`text-white transition-all duration-500 ${
            isHovered 
              ? 'shadow-lg shadow-blue-300/50 scale-102' 
              : 'shadow-md'
          }`}
          style={{ 
            backgroundColor: isHovered ? '#1E40AF' : BRAND.blue,
            background: isHovered ? 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)' : BRAND.blue
          }}
        />
      </div>
      
      {/* Pulse effect */}
      <div className={`absolute inset-0 rounded-xl bg-blue-400/20 transition-opacity duration-1000 ${
        isHovered ? 'animate-ping opacity-75' : 'opacity-0'
      }`}></div>
    </div>
  );
}

const HLine = ({ className = "", isAnimated = false, animationType = "" }) => (
  <div className={`pointer-events-none absolute left-0 right-0 mx-auto h-[2px] transition-all duration-1000 ${
    isAnimated ? 'bg-[color:var(--brand-blue)] scale-x-100' : 'bg-gray-300 scale-x-0'
  } ${className}`}
       style={{ 
         ['--brand-blue']: BRAND.blue,
         transformOrigin: 'center',
         transitionDelay: animationType === 'branch-lines' ? '400ms' : '0ms'
       }} />
);

const VLine = ({ className = "", isAnimated = false, animationType = "" }) => (
  <div className={`pointer-events-none absolute w-[2px] transition-all duration-800 ${
    isAnimated ? 'bg-[color:var(--brand-blue)] scale-y-100' : 'bg-gray-300 scale-y-0'
  } ${className}`}
       style={{ 
         ['--brand-blue']: BRAND.blue,
         transformOrigin: 'top',
         transitionDelay: animationType === 'main-line' ? '800ms' : animationType === 'sub-lines' ? '1200ms' : '1000ms'
       }} />
);

function OrgChartNajmFR() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLines, setAnimatedLines] = useState(new Set());
  const chartRef = useRef(null);
  
  const orgRoles = t('about.orgChart.roles', { returnObjects: true }) || [];
  
  // Map the translated data to the original structure
  const translatedOrgData = {
    president: {
      name: orgRoles[0]?.name || "Hassan Rezk",
      role: orgRoles[0]?.role || "Président de l'association",
    },
    level1: [
      { name: orgRoles[1]?.name || "Abd al‑Wahab Karoumi", role: orgRoles[1]?.role || "Trésorier", children: [
        { name: orgRoles[6]?.name || "Hajar El Raji", role: orgRoles[6]?.role || "Vice‑trésorière" },
      ]},
      { name: orgRoles[2]?.name || "Said Hamdoun", role: orgRoles[2]?.role || "Secrétaire général", children: [
        { name: orgRoles[7]?.name || "Chaimaa Meziane", role: orgRoles[7]?.role || "Vice‑secrétaire générale" },
      ]},
      { name: orgRoles[3]?.name || "Mohamed El Ghazouani", role: orgRoles[3]?.role || "Vice‑président chargé des SI & transformation numérique" },
      { name: orgRoles[4]?.name || "Moulay Youssef El Hafeïdi", role: orgRoles[4]?.role || "Vice‑président chargé des entreprises & entrepreneuriat social" },
      { name: orgRoles[5]?.name || "Sanaa El Filali", role: orgRoles[5]?.role || "Vice‑présidente chargée de l'innovation sociale & des partenariats" },
    ],
  };

  const { president, level1 } = translatedOrgData;

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate lines progressively
          setTimeout(() => {
            setAnimatedLines(new Set(['main-line']));
            setTimeout(() => {
              setAnimatedLines(new Set(['main-line', 'branch-lines']));
              setTimeout(() => {
                setAnimatedLines(new Set(['main-line', 'branch-lines', 'sub-lines']));
              }, 600);
            }, 400);
          }, 800);
        }
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={chartRef} className="relative mx-auto max-w-7xl px-4 py-10 md:py-16 overflow-hidden">
      {/* Titre animé */}
      <header className="mb-12 text-center">
        <h1 className={`text-2xl font-bold md:text-3xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ color: '#1E3A8A' }}>
          {t('about.orgChart.sectionTitle')}
        </h1>
        <div className={`w-24 h-1 mx-auto rounded-full mt-4 transition-all duration-1000 ${
          isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
        }`} 
        style={{ 
          backgroundColor: '#1E3A8A',
          transitionDelay: '300ms' 
        }}></div>
      </header>

      {/* Niveau 0 : Président avec animation */}
      <div className="relative flex items-center justify-center mb-8">
        <PersonCard 
          name={president.name} 
          role={president.role} 
          delay={600}
          isVisible={isVisible}
        />
        <VLine 
          className="left-1/2 top-full h-6 -translate-x-1/2" 
          isAnimated={animatedLines.has('main-line')}
          animationType="main-line"
        />
      </div>

      {/* Niveau 1 avec animations séquentielles */}
      <div className="relative mt-6">
        <HLine 
          className="top-0" 
          isAnimated={animatedLines.has('branch-lines')}
          animationType="branch-lines"
        />
        <div className="pointer-events-none absolute left-0 right-0 top-0 mx-auto grid grid-cols-1 gap-8 md:grid-cols-5">
          {level1.map((_, i) => (
            <div key={i} className="relative">
              <VLine 
                className="left-1/2 top-0 h-5 -translate-x-1/2" 
                isAnimated={animatedLines.has('branch-lines')}
                animationType="branch-lines"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 place-items-center gap-8 pt-5 md:grid-cols-5">
          {level1.map((p, i) => (
            <div key={i} className="relative">
              <PersonCard 
                name={p.name} 
                role={p.role} 
                delay={1000 + (i * 150)}
                isVisible={isVisible}
              />
              {p.children?.length ? (
                <VLine 
                  className="left-1/2 top-full h-6 -translate-x-1/2" 
                  isAnimated={animatedLines.has('sub-lines')}
                  animationType="sub-lines"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Niveau 2 avec animations décalées */}
      <div className="relative mt-8 grid grid-cols-1 gap-10 md:grid-cols-5">
        {level1.map((p, i) => (
          <div key={i} className="relative flex min-h-[100px] items-start justify-center">
            {p.children?.length ? (
              <div className="pt-5">
                {p.children.map((c, idx) => (
                  <div key={idx} className="relative">
                    <PersonCard 
                      name={c.name} 
                      role={c.role} 
                      delay={1800 + (i * 100) + (idx * 50)}
                      isVisible={isVisible}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <span className="invisible">placeholder</span>
            )}
          </div>
        ))}
      </div>

      {/* Arrière-plans animés */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] transition-all duration-2000 ${
          isVisible ? 'opacity-40 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ 
          background: `radial-gradient(circle at 50% 0%, ${BRAND.blueLight}, transparent 70%)`,
          transitionDelay: '500ms'
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[300px] transition-all duration-2000 ${
          isVisible ? 'opacity-40 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ 
          background: `radial-gradient(circle at 50% 100%, ${BRAND.blueLight}, transparent 70%)`,
          transitionDelay: '700ms'
        }}
      />
      
      {/* Particules flottantes */}
      {isVisible && (
        <>
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-40 right-16 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '4s' }}></div>
        </>
      )}
    </div>
  );
}

export default function AboutUs() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const teamSectionRef = useRef(null);
  const [teamVisible, setTeamVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  // Intersection Observer for team section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Get translated values data
  const valeursItems = t('about.values.items', { returnObjects: true }) || [];
  const valeursData = [
    { key: 'respect', image: '/images/respect.png' },
    { key: 'transparence', image: '/images/affichage.png' },
    { key: 'confiance', image: '/images/confiance.png' },
    { key: 'egalite', image: '/images/egalite.png' },
    { key: 'dignite', image: '/images/dignite.png' },
    { key: 'engagement', image: '/images/engagement.png' },
    { key: 'citoyennete', image: '/images/citoyennete.png' },
    { key: 'formation', image: '/images/citoyennete.png' },
  ].map((item, index) => ({
    ...item,
    titre: valeursItems[index]?.name || item.key,
    texte: valeursItems[index]?.desc || ''
  }));

  // Get translated team members data
  const teamMembers = t('about.team.members', { returnObjects: true }) || [];
  const membres = [
    { id: 'Hassan Rizk', image: '/images/hassan.jpg' },
    { id: 'amineMoutassim', image: '/images/amine 1.jpg' },
    { id: 'sanaeBouadel', image: '/images/sanae.jpg' },
    { id: 'khadijaKurdawi', image: '/images/khadija.jpg' },
    { id: 'zahraBalasi', image: '/images/zahira.jpg' },
    { id: 'sihamGhazali', image: '/images/siham.jpg' },
    { id: 'shaimaAttar', image: '/images/chaimae.jpg' },
    { id: 'ayoubLaghlali', image: '/images/ayoub.jpg' },
    { id: 'mohammadAminAbisorour', image: '/images/amine.jpg' },
    { id: 'hanaaDahman', image: '/images/hanae.jpg' },
    { id: 'yousraHashoum', image: '/images/yousra.jpg' },
    { id: 'Walid Daraa', image: '/images/walid.jpg' },
    { id: 'AnassELGHAMRAOUI', image: '/images/anass.jpg' },
  ].map((item, index) => ({
    ...item,
    nom: teamMembers[index]?.name || '',
    statut: teamMembers[index]?.role || '',
    telephone: teamMembers[index]?.phone || '',
    email: teamMembers[index]?.email || ''
  }));

  // Get translated FAQ data
  const faqItems = t('about.faq.items', { returnObjects: true }) || [];
  const faq = faqItems.map(item => ({
    q: item.q || '',
    r: item.a || ''
  }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: teamAnimationStyles }} />
      {/* Objectifs */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-16 text-center leading-tight max-w-4xl mx-auto">
          {t('about.objectives.sectionTitle')}
        </h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-12">
          <div className="md:w-1/2 text-gray-800 bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-[18px] leading-relaxed space-y-6 text-justify">
              {['p1', 'p2', 'p3', 'p4'].map((key) => (
                <p key={key} className="text-gray-700">
                  {t(`about.objectives.${key}`)}
                </p>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <Image 
              src="/images/image30.jpg" 
              alt="Objectif 1" 
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover hover:shadow-xl transition-shadow duration-300" 
            />
            <Image 
              src="/images/image32.jpg" 
              alt="Objectif 2" 
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover hover:shadow-xl transition-shadow duration-300" 
            />
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 mx-6 rounded-3xl relative overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tl from-purple-200/20 to-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-center text-4xl font-bold text-blue-900 mb-16 leading-tight">
            {t('about.values.sectionTitle')}
          </h2>
          
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center max-w-7xl mx-auto">
             {valeursData.map((valeur, index) => (
               <div key={index} className="group relative w-[260px] h-[320px] cursor-pointer">
                 {/* Bordure lumineuse animée */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
                 
                 {/* Carte principale */}
                 <div className="relative w-full h-full bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden transition-all duration-700 group-hover:scale-105">
                   
                   {/* Gradient de fond animé */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#1C398E]/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                   
                   {/* Contenu de la carte */}
                   <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                     
                     {/* Icône en haut */}
                     <div className="relative mb-4 group-hover:scale-110 transition-transform duration-500">
                       <div className="relative w-16 h-16 bg-gradient-to-br from-[#1C398E] to-indigo-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                         <Image
                           src={valeur.image}
                           alt={valeur.titre}
                           width={32}
                           height={32}
                           sizes="32px"
                           className="w-8 h-8 object-cover filter brightness-0 invert"
                         />
                         {/* Reflet glassmorphism */}
                         <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-2xl"></div>
                       </div>
                     </div>
                     
                     {/* Titre */}
                     <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#1C398E] to-indigo-700 bg-clip-text text-transparent tracking-wide leading-tight">
                       {valeur.titre}
                     </h3>
                     
                     {/* Ligne décorative */}
                     <div className="w-16 h-1 bg-gradient-to-r from-[#1C398E] to-indigo-500 rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                     
                     {/* Description sans animation */}
                     <div className="flex-1 flex items-start">
                       <p className="text-gray-700 text-sm leading-relaxed text-justify">
                         {valeur.texte}
                       </p>
                     </div>
                   </div>
                   
                   {/* Effet de brillance au survol */}
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Vision stratégique */}
      <section className="bg-white py-14 px-8">
        <div className="max-w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          <div className="md:col-span-3 flex flex-col pr-6">
            <h2 className="text-[26px] font-extrabold text-[#1C398E] mb-5 text-center md:text-left">
              {t('about.vision.sectionTitle')}
            </h2>
            <div className="text-[16px] leading-relaxed space-y-3 text-justify">
              <p className="mb-4">L'Association Najm pour l'inclusion économique des jeunes vise à :</p>
              <ul className="space-y-2 list-disc pl-4">
                {t('about.vision.bullets', { returnObjects: true })?.map((item, i) => (
                  <li key={i} className="text-[16px] leading-relaxed">{item}</li>
                )) || []}
              </ul>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4 pl-2">
            <Image 
              src="/images/image33.jpg" 
              alt="Vision 1" 
              width={600}
              height={200}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="rounded-xl shadow-lg object-cover w-full h-[200px]" 
            />
            <Image 
              src="/images/image34.jpg" 
              alt="Vision 2" 
              width={600}
              height={200}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="rounded-xl shadow-lg object-cover w-full h-[200px]" 
            />
          </div>
        </div>
      </section>

      {/* Organigramme */}
      <OrgChartNajmFR />

      {/* Équipe - cartes élégantes avec animations ultra-sophistiquées */}
      <section 
        ref={teamSectionRef}
        className="relative py-24 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #f1f5f9 40%, #e6fffa 60%, #fef7ff 80%, #f8fafc 100%)'
        }}
      >
        {/* Arrière-plan décoratif animé ultra-élégant */}
        <div className="absolute inset-0 opacity-40">
          <div className={`absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-cyan-300/20 rounded-full blur-2xl transition-all duration-3000 ${
            teamVisible ? 'scale-150 opacity-60' : 'scale-100 opacity-30'
          }`} style={{ animationDelay: '500ms' }}></div>
          <div className={`absolute bottom-32 right-16 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-300/20 rounded-full blur-3xl transition-all duration-3000 ${
            teamVisible ? 'scale-125 opacity-50' : 'scale-100 opacity-20'
          }`} style={{ animationDelay: '1000ms' }}></div>
          <div className={`absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-indigo-400/25 to-blue-300/25 rounded-full blur-xl transition-all duration-3000 ${
            teamVisible ? 'scale-110 opacity-40' : 'scale-100 opacity-20'
          }`} style={{ animationDelay: '1500ms' }}></div>
        </div>

        {/* Motif de points décoratifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,#1e3a8a_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Titre avec animation sophistiquée */}
          <div className="text-center mb-20">
            <div className="relative inline-block">
              <h2 className={`text-5xl font-bold transition-all duration-1500 ${
                teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                color: '#1E3A8A'
              }}>
                {t('about.team.sectionTitle')}
            </h2>
              
              {/* Effet de lueur sous le titre */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full transition-all duration-1000 ${
                teamVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
              style={{ 
                backgroundColor: '#1E3A8A',
                transitionDelay: '800ms'
              }}></div>
            </div>
            
            <p className={`text-gray-600 mt-8 text-xl leading-relaxed max-w-3xl mx-auto transition-all duration-1000 ${
              teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '400ms' }}>
              {t('about.team.tagline')}
            </p>
          </div>

          {/* Grille des cartes avec animations en cascade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {membres.map((membre, index) => (
              <div
                key={membre.id}
                className={`group relative transition-all duration-1000 ${
                  teamVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ 
                  transitionDelay: `${index * 120 + 600}ms`,
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Carte principale avec effet 3D */}
                <div className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-700 ${
                  hoveredCard === index 
                    ? 'shadow-2xl shadow-blue-500/25 scale-105 -translate-y-4' 
                    : 'shadow-xl shadow-gray-200/50'
                } ${hoveredCard === index ? 'rotate-y-5' : ''}`}
                style={{
                  background: hoveredCard === index 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0f2fe 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  transform: hoveredCard === index 
                    ? 'perspective(1000px) rotateY(5deg) rotateX(5deg)' 
                    : 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
                }}>
                  
                  {/* Effet de brillance sophistiqué */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-1000 ${
                    hoveredCard === index ? 'translate-x-full' : '-translate-x-full'
                  }`}></div>
                  
                  {/* Bordure animée */}
                  <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    hoveredCard === index 
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5' 
                      : 'bg-transparent p-0'
                  }`}>
                    <div className="w-full h-full bg-white rounded-3xl"></div>
                  </div>
                  
                  {/* Image avec effets avancés */}
                  <div className="relative h-80 overflow-hidden rounded-t-3xl">
                  <Image
                    src={membre.image}
                    alt={membre.nom}
                    width={400}
                    height={320}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredCard === index 
                          ? 'scale-110 brightness-110 contrast-110' 
                          : 'scale-100'
                      }`}
                    />
                    
                    {/* Overlay gradient dynamique */}
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      hoveredCard === index
                        ? 'bg-gradient-to-t from-blue-900/90 via-blue-600/50 to-transparent'
                        : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'
                    }`}></div>
                    
                    {/* Informations overlay */}
                    <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 ${
                      hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                    <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{membre.nom}</h3>
                      <p className="text-sm text-blue-100 mb-4 drop-shadow-md">{membre.statut}</p>
                      
                      {/* Boutons de contact ultra-élégants */}
                      <div className="space-y-2">
                        <div className="flex items-center bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2 text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105">
                          <svg className="w-4 h-4 mr-3 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                          <span className="font-medium" dir="ltr">{membre.telephone}</span>
                    </div>
                    
                        <div className="flex items-center bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2 text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105">
                          <svg className="w-4 h-4 mr-3 text-sky-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <span className="font-medium truncate">{membre.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                </div>
                
                {/* Ombre projetée sophistiquée */}
                <div className={`absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl transition-all duration-700 -z-10 ${
                  hoveredCard === index ? 'scale-110 opacity-60' : 'scale-100 opacity-0'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="mt-16 mb-6 border-t pt-10 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
          {t('about.faq.sectionTitle')}
        </h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <details key={i} className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                {item.q}
              </summary>
              <p className="mt-2 text-gray-600">{item.r}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
