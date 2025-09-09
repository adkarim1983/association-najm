'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import './animations.css';

// Dynamic import for map component to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const projectImages = [
    { src: '/images/p1.jpg', alt: 'Projet en action 1' },
    { src: '/images/p2.jpg', alt: 'Équipe du projet' },
    { src: '/images/image1a.jpg', alt: 'Résultats du projet' },
    { src: '/images/image2a.jpg', alt: 'Bénéficiaires du projet' },
    { src: '/images/image3a.jpg', alt: 'Impact communautaire' }
  ];

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  // Fermer le modal avec la touche Échap et navigation avec flèches
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      } else if (e.key === 'ArrowLeft' && isModalOpen) {
        navigateToPreviousImage();
      } else if (e.key === 'ArrowRight' && isModalOpen) {
        navigateToNextImage();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, activeImageIndex]);

  // Fonctions de navigation
  const navigateToPreviousImage = () => {
    const newIndex = activeImageIndex > 0 ? activeImageIndex - 1 : projectImages.length - 1;
    setActiveImageIndex(newIndex);
    setSelectedImage(projectImages[newIndex]);
  };

  const navigateToNextImage = () => {
    const newIndex = activeImageIndex < projectImages.length - 1 ? activeImageIndex + 1 : 0;
    setActiveImageIndex(newIndex);
    setSelectedImage(projectImages[newIndex]);
  };

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects?limit=1000`);
      
      if (response.ok) {
        const data = await response.json();
        const foundProject = data.projects.find(p => p._id === params.id);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError('Projet non trouvé');
        }
      } else {
        setError('Erreur lors du chargement des projets');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Erreur lors du chargement du projet');
    } finally {
      setLoading(false);
    }
  };

  // Composant pour le texte tronqué
  function TruncatedText({ text }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="text-gray-800 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg">
        <p className={`${isExpanded ? '' : 'line-clamp-3'}`}>
          {text}
        </p>
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 font-medium mt-2 hover:underline"
          >
            Lire plus
          </button>
        )}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-blue-600 font-medium mt-2 hover:underline"
          >
            Lire moins
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-slate-600">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error || "Projet non trouvé"}</h2>
          <Link href="/projects" className="text-blue-600 hover:underline">
            Retour à la liste des projets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Titre avec image du projet */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Image du projet */}
              <div className="flex-shrink-0">
                <img
                  src={project.image || project.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=Pas+d\'image'}
                  alt={project.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-xl ring-4 ring-blue-200"
                />
              </div>
              
              {/* Titre et informations */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 tracking-wider animate-title-glow">
                  {project.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    📍 {project.location}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {project.status === 'active' ? 'En cours' : project.status === 'completed' ? 'Terminé' : 'Planifié'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                  {project.description?.substring(0, 150)}...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal en deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne principale - Informations détaillées selon la nouvelle structure */}
          <div className="space-y-8">
            {/* Section 1: Informations sur la porteuse du projet */}
            {project.founder_info && (
              <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg mr-4" style={{backgroundColor: '#683D99'}}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 animate-title-glow">
                    Informations sur la porteuse du projet
                  </h2>
                </div>
                <TruncatedText text={project.founder_info} />
              </div>
            )}

            {/* Section 2: Présentation du projet */}
            {project.presentation && (
              <div className="animate-fade-in-up" style={{animationDelay: '0.7s'}}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg mr-4" style={{backgroundColor: '#1B7DC2'}}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 animate-title-glow">
                    Présentation du projet
                  </h2>
                </div>
                <TruncatedText text={project.presentation} />
              </div>
            )}

            {/* Section 3: Partie prenante (soutien institutionnel) */}
            {project.support && (
              <div className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg mr-4" style={{backgroundColor: '#5EB654'}}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 animate-title-glow">
                    Partie prenante (soutien institutionnel)
                  </h2>
                </div>
                <TruncatedText text={project.support} />
              </div>
            )}

            {/* Section 4: Produits et services proposés */}
            {project.products && (
              <div className="animate-fade-in-up" style={{animationDelay: '0.9s'}}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg mr-4" style={{backgroundColor: '#FAC516'}}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 animate-title-glow">
                    Produits et services proposés
                  </h2>
                </div>
                <TruncatedText text={project.products} />
              </div>
            )}

            {/* Section 5: Partenaires */}
            {project.partners && (
              <div className="animate-fade-in-up" style={{animationDelay: '1.0s'}}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg mr-4" style={{backgroundColor: '#1B7DC2'}}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 animate-title-glow">
                    Partenaires
                  </h2>
                </div>
                <TruncatedText text={project.partners} />
              </div>
            )}


            {/* Fallback: Description générale si les sections structurées ne sont pas disponibles */}
            {!project.founder_info && !project.presentation && !project.support && !project.products && !project.partners && (
              <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg mr-4" style={{backgroundColor: '#683D99'}}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 animate-title-glow">
                    Description du projet
                  </h2>
                </div>
                <TruncatedText text={project.description || "Description non disponible."} />
              </div>
            )}

            {/* Galerie d'images élégante dans la colonne de gauche */}
            <div className="animate-fade-in-up mt-8" style={{animationDelay: '1.1s'}}>
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg mr-4" style={{backgroundColor: '#FF6B6B'}}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 animate-title-glow">
                  Galerie du projet
                </h2>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Image principale en haut */}
                <div className="relative group">
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={projectImages[activeImageIndex].src}
                      alt={projectImages[activeImageIndex].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      onClick={() => {
                        setSelectedImage(projectImages[activeImageIndex]);
                        setIsModalOpen(true);
                      }}
                    />
                    
                    {/* Overlay avec informations */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-bold text-lg mb-1">
                          {projectImages[activeImageIndex].alt}
                        </h4>
                        <p className="text-white/90 text-sm">
                          Image {activeImageIndex + 1} sur {projectImages.length}
                        </p>
                      </div>
                    </div>
                    
                    {/* Bouton d'agrandissement */}
                    <button
                      onClick={() => {
                        setSelectedImage(projectImages[activeImageIndex]);
                        setIsModalOpen(true);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    
                    {/* Navigation arrows */}
                    {projectImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImageIndex(activeImageIndex > 0 ? activeImageIndex - 1 : projectImages.length - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setActiveImageIndex(activeImageIndex < projectImages.length - 1 ? activeImageIndex + 1 : 0)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Miniatures en bas */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {projectImages.map((image, index) => (
                      <div 
                        key={index}
                        className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 flex-shrink-0 ${
                          activeImageIndex === index 
                            ? 'ring-3 ring-blue-500 shadow-lg scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-16 h-12 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                          loading="lazy"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(image);
                            setIsModalOpen(true);
                          }}
                        />
                        
                        {/* Overlay pour image active */}
                        {activeImageIndex === index && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        {/* Numéro de l'image */}
                        <div className="absolute top-1 left-1 w-4 h-4 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Informations */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">{projectImages.length} images</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-sm font-medium">Cliquer pour agrandir</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Carte et Informations de contact */}
          <div className="space-y-8">
            {/* Carte */}
            {project.coordinates && (
              <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-white/20 relative group animate-fade-in-up" style={{animationDelay: '1.3s'}}>
                {/* Decorative elements */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-400/20 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-purple-400/20 rounded-full blur-sm animate-pulse delay-500"></div>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text animate-title-glow">
                    Localisation sur la carte
                  </h3>
                </div>
                
                <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 backdrop-blur-sm bg-gradient-to-br from-blue-50/20 to-purple-50/20 group">
                  {/* Map status indicator */}
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/30">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-gray-700">Position exacte</span>
                    </div>
                  </div>
                  
                  {typeof window !== 'undefined' && (
                    <MapContainer
                      center={[project.coordinates.lat, project.coordinates.lng]}
                      zoom={15}
                      scrollWheelZoom={false}
                      className="h-full w-full z-0 rounded-3xl"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[project.coordinates.lat, project.coordinates.lng]}>
                        <Popup maxWidth={300} className="custom-popup">
                          <div className="p-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/30">
                            {/* Compact project header */}
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                                <img 
                                  src={project.image || project.images?.[0]?.url || 'https://via.placeholder.com/40x40?text=📋'} 
                                  alt={project.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm text-blue-900 leading-tight truncate mb-1">
                                  {project.name}
                                </h3>
                                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                  {project.category}
                                </span>
                              </div>
                            </div>
                            
                            {/* Compact project details */}
                            <div className="space-y-2 text-xs">
                              <div className="flex items-start space-x-2">
                                <span className="text-blue-600 text-sm flex-shrink-0">📍</span>
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-gray-800">Lieu:</span>
                                  <p className="text-gray-700 truncate">{project.location}</p>
                                  {project.address && (
                                    <p className="text-gray-600 text-xs line-clamp-2 leading-tight mt-0.5">{project.address}</p>
                                  )}
                                </div>
                              </div>
                              
                              {/* Compact contact */}
                              {project.contact?.phone && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-green-600 text-sm">📱</span>
                                  <a href={`tel:${project.contact.phone}`} className="text-green-700 hover:text-green-800 font-medium text-xs truncate">
                                    {project.contact.phone}
                                  </a>
                                </div>
                              )}
                              
                              {project.contact?.email && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-blue-600 text-sm">📧</span>
                                  <a href={`mailto:${project.contact.email}`} className="text-blue-700 hover:text-blue-800 font-medium text-xs truncate">
                                    {project.contact.email}
                                  </a>
                                </div>
                              )}
                              
                              {project.hours && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-purple-600 text-sm">🕒</span>
                                  <p className="text-gray-700 text-xs truncate">{project.hours}</p>
                                </div>
                              )}
                            </div>
                            
                            {/* Action button */}
                            <div className="mt-3 pt-2 border-t border-gray-200">
                              <Link
                                href={`/projects/${project._id}`}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md flex items-center justify-center space-x-1"
                              >
                                <span>Voir les détails</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  )}
                  
                  {/* Overlay gradient for enhanced visual appeal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
                </div>
              </div>
            )}

            {/* Informations de contact */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 animate-title-glow">
                  Contact & Infos
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <span className="text-blue-600 mr-3">🏷️</span>
                  <div>
                    <span className="text-sm text-gray-600">Catégorie</span>
                    <p className="font-semibold text-gray-800">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <span className="text-amber-600 mr-3">📍</span>
                  <div>
                    <span className="text-sm text-gray-600">Lieu</span>
                    <p className="font-semibold text-gray-800">{project.location}</p>
                  </div>
                </div>
                {project.address && (
                  <div className="flex items-start p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <span className="text-green-600 mr-3 mt-1">🏠</span>
                    <div>
                      <span className="text-sm text-gray-600">Adresse</span>
                      <p className="font-semibold text-gray-800">{project.address}</p>
                    </div>
                  </div>
                )}
                {project.contact?.phone && (
                  <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-purple-600 mr-3">📞</span>
                    <div>
                      <span className="text-sm text-gray-600">Téléphone</span>
                      <a href={`tel:${project.contact.phone}`} className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                        {project.contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                {project.contact?.email && (
                  <div className="flex items-center p-3 bg-gradient-to-r from-rose-50 to-red-50 rounded-lg">
                    <span className="text-rose-600 mr-3">📧</span>
                    <div>
                      <span className="text-sm text-gray-600">Email</span>
                      <a href={`mailto:${project.contact.email}`} className="font-semibold text-rose-600 hover:text-rose-700 transition-colors break-all">
                        {project.contact.email}
                      </a>
                    </div>
                  </div>
                )}
                {project.contact?.website && (
                  <div className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
                    <span className="text-indigo-600 mr-3">🌐</span>
                    <div>
                      <span className="text-sm text-gray-600">Site Web</span>
                      <a href={project.contact.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                        Visiter le site
                      </a>
                    </div>
                  </div>
                )}
                {project.hours && (
                  <div className="flex items-center p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                    <span className="text-teal-600 mr-3">🕒</span>
                    <div>
                      <span className="text-sm text-gray-600">Horaires</span>
                      <p className="font-semibold text-gray-800">{project.hours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Modal pour l'affichage des images */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            {/* Bouton de fermeture */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Flèche gauche */}
            {projectImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToPreviousImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Flèche droite */}
            {projectImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToNextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image agrandie */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Indicateur de position */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                {projectImages.findIndex(img => img.src === selectedImage.src) + 1} / {projectImages.length}
              </div>
              
              {/* Légende de l'image */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedImage.alt}</h3>
                <p className="text-gray-600">Projet: {project?.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
