'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';
// Using emoji icons instead of react-icons

export default function ProjectCard({ project }) {
  const { t, lang } = useTranslation();

  // Get translated data
  const cardData = t('projects.card', { returnObjects: true }) || {};
  const statuses = cardData.statuses || {};
  const categories = cardData.categories || {};
  const locations = cardData.locations || {};

  const formatDate = (dateString) => {
    if (!dateString) return cardData.dateUnavailable || 'Date non disponible';
    
    // Use locale-specific formatting
    const locale = lang === 'ar' ? 'ar-MA' : lang === 'en' ? 'en-US' : 'fr-FR';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    return statuses[status] || statuses.default || 'Actif';
  };

  const getCategoryText = (category) => {
    return categories[category] || category;
  };

  const getLocationText = (location) => {
    return locations[location] || location;
  };

  // Get translated content based on current language
  const getTranslatedContent = (baseKey) => {
    const langSuffix = lang === 'fr' ? '' : `_${lang}`;
    return project[`${baseKey}${langSuffix}`] || project[baseKey] || '';
  };

  const projectName = getTranslatedContent('name');
  const projectDescription = getTranslatedContent('description');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-48">
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0].url || project.images[0]}
            alt={projectName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={projectName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">{cardData.noImageText || "Pas d'image"}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {projectName}
          </h3>
          <div className="flex-shrink-0 ml-2">
            <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {projectDescription}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-slate-600">
              <span className="font-medium">{cardData.categoryLabel || "Catégorie:"}</span> {getCategoryText(project.category)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-sm text-slate-600">
              <span className="font-medium">{cardData.locationLabel || "Localisation:"}</span> {getLocationText(project.location)}
            </span>
          </div>
          {project.address && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-slate-600">
                <span className="font-medium">{cardData.addressLabel || "Adresse:"}</span> {project.address.substring(0, 30)}...
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center" title={cardData.viewsLabel || "Vues"}>
              <span className="mr-1">👁️</span>
              <span>{project.metadata?.views || 0}</span>
            </div>
            <div className="flex items-center" title={cardData.likesLabel || "J'aime"}>
              <span className="mr-1">❤️</span>
              <span>{project.metadata?.likes || 0}</span>
            </div>
          </div>
          
          <Link
            href={`/projects/${project._id}`}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm group-hover:shadow-md"
          >
            <span>{cardData.viewMore || "Voir plus"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
