'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';

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

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 tracking-wider">
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
          {/* Colonne de gauche - Informations détaillées */}
          <div className="space-y-8">
            {/* Section Description complète */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Description
              </h2>
              <TruncatedText text={project.description || "Description non disponible."} />
            </div>

            {/* Section Informations supplémentaires */}
            {(project.founder_info || project.presentation || project.support || project.products || project.partners) && (
              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Informations supplémentaires
                </h2>
                <div className="space-y-4">
                  {project.founder_info && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Informations sur le fondateur</h3>
                      <p className="text-gray-700">{project.founder_info}</p>
                    </div>
                  )}
                  {project.presentation && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Présentation</h3>
                      <p className="text-gray-700">{project.presentation}</p>
                    </div>
                  )}
                  {project.support && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
                      <p className="text-gray-700">{project.support}</p>
                    </div>
                  )}
                  {project.products && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Produits</h3>
                      <p className="text-gray-700">{project.products}</p>
                    </div>
                  )}
                  {project.partners && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Partenaires</h3>
                      <p className="text-gray-700">{project.partners}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Colonne de droite - Carte et Informations de contact */}
          <div className="space-y-8">
            {/* Carte */}
            {project.coordinates && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                  <span className="mr-2">🗺️</span>
                  Adresse sur la carte
                </h3>
                <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 relative z-0">
                  {typeof window !== 'undefined' && (
                    <MapContainer
                      center={[project.coordinates.lat, project.coordinates.lng]}
                      zoom={15}
                      scrollWheelZoom={false}
                      className="h-full w-full z-0"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[project.coordinates.lat, project.coordinates.lng]}>
                        <Popup maxWidth={380} className="custom-popup">
                          <div className="space-y-2 text-sm max-w-sm">
                            <div className="flex items-center space-x-2">
                              <img 
                                src={project.image || 'https://via.placeholder.com/400x300?text=Pas+d\'image'} 
                                alt={project.name}
                                className="w-14 h-14 object-cover rounded-lg shadow-sm"
                              />
                              <div className="flex-1">
                                <h3 className="text-blue-700 font-bold text-sm leading-tight">
                                  {project.name}
                                </h3>
                                <p className="text-gray-600 text-xs">
                                  {project.category}
                                </p>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 space-y-1">
                              <h4 className="font-semibold text-gray-800 text-xs mb-1 flex items-center">
                                <span className="mr-1">📋</span> Contact
                              </h4>
                              {project.contact?.phone && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-green-600 text-sm">📞</span>
                                  <span className="text-gray-700 text-xs">Téléphone:</span>
                                  <a href={`tel:${project.contact.phone}`} className="text-green-600 hover:text-green-800 text-xs font-medium">
                                    {project.contact.phone}
                                  </a>
                                </div>
                              )}
                              {project.contact?.email && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-blue-600 text-sm">📧</span>
                                  <span className="text-gray-700 text-xs">Email:</span>
                                  <a href={`mailto:${project.contact.email}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium break-all">
                                    {project.contact.email}
                                  </a>
                                </div>
                              )}
                              {project.address && (
                                <div className="flex items-start space-x-1">
                                  <span className="text-red-600 text-sm">📍</span>
                                  <span className="text-gray-700 text-xs">Adresse:</span>
                                  <p className="text-gray-700 text-xs leading-tight flex-1">{project.address}</p>
                                </div>
                              )}
                              {project.hours && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-purple-600 text-sm">🕒</span>
                                  <span className="text-gray-700 text-xs">Horaires:</span>
                                  <p className="text-gray-700 text-xs">{project.hours}</p>
                                </div>
                              )}
                              {project.contact?.website && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-indigo-600 text-sm">🌐</span>
                                  <span className="text-gray-700 text-xs">Site Web:</span>
                                  <a href={project.contact.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                                    {project.contact.website}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  )}
                </div>
              </div>
            )}

            {/* Informations de contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">📞</span>
                Informations de contact
              </h3>
              <div className="space-y-2 text-gray-800">
                <p><strong>Catégorie:</strong> {project.category}</p>
                <p><strong>Lieu:</strong> {project.location}</p>
                {project.address && <p><strong>Adresse:</strong> {project.address}</p>}
                {project.contact?.phone && <p><strong>Téléphone:</strong> {project.contact.phone}</p>}
                {project.contact?.email && <p><strong>Email:</strong> {project.contact.email}</p>}
                {project.contact?.website && (
                  <p><strong>Site Web:</strong> 
                    <a href={project.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                      {project.contact.website}
                    </a>
                  </p>
                )}
                {project.hours && <p><strong>Horaires:</strong> {project.hours}</p>}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-gray-500">
                    <span className="mr-1">👁️</span>
                    <span className="text-sm">{project.metadata?.views || 0} vues</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-1">❤️</span>
                    <span className="text-sm">{project.metadata?.likes || 0} j'aime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
