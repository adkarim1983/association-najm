'use client';

import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function ProjectFilters({ onFilterChange }) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
    location: ''
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Get translated data
  const filtersData = t('projects.filters', { returnObjects: true }) || {};
  const categoryData = filtersData.category || {};
  const statusData = filtersData.status || {};
  const locationData = filtersData.location || {};
  const searchData = filtersData.search || {};

  const categories = [
    { value: '', label: categoryData.all || 'Toutes les catégories', icon: '📋' },
    { value: 'restauration', label: categoryData.restauration || 'Restauration', icon: '🍽️' },
    { value: 'marketing_digital', label: categoryData.marketing_digital || 'Marketing Digital', icon: '📱' },
    { value: 'evenementiel', label: categoryData.evenementiel || 'Événementiel', icon: '🎉' },
    { value: 'design', label: categoryData.design || 'Design', icon: '🎨' },
    { value: 'audio_visuel', label: categoryData.audio_visuel || 'Audio Visuel', icon: '🎬' }
  ];

  const statuses = [
    { value: '', label: statusData.all || 'Tous les statuts', icon: '📊' },
    { value: 'planned', label: statusData.planned || 'Planifié', icon: '📅' },
    { value: 'active', label: statusData.active || 'En cours', icon: '⚡' },
    { value: 'completed', label: statusData.completed || 'Terminé', icon: '✅' }
  ];

  const locations = [
    { value: '', label: locationData.all || 'Toutes les localisations', icon: '🌍' },
    { value: 'Annexe administrative de Sidi Othmane', label: locationData.sidiOthmaneAdmin || 'Sidi Othmane Admin', icon: '🏢' },
    { value: 'Zone industrielle Sidi Othmane', label: locationData.sidiOthmaneIndustrial || 'Sidi Othmane Industriel', icon: '🏭' },
    { value: 'Annexe administrative du quartier Moulay Rachid', label: locationData.moulayRachidAdmin || 'Moulay Rachid Admin', icon: '🏢' },
    { value: 'Zone industrielle Moulay Rachid', label: locationData.moulayRachidIndustrial || 'Moulay Rachid Industriel', icon: '🏭' },
    { value: 'Annexe administrative du quartier Sadri', label: locationData.sadriAdmin || 'Sadri Admin', icon: '🏢' },
    { value: 'Annexe administrative du quartier Mabrouka', label: locationData.mabroukaAdmin || 'Mabrouka Admin', icon: '🏢' },
    { value: 'Hay El Rajae', label: locationData.hayElRajae || 'Hay El Rajae', icon: '🏘️' },
    { value: 'Annexe administrative El Harouiyine', label: locationData.elHarouiyineAdmin || 'El Harouiyine Admin', icon: '🏢' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Count active filters
    const activeCount = Object.values(newFilters).filter(val => val !== '').length;
    setActiveFiltersCount(activeCount);
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', status: '', search: '', location: '' };
    setFilters(clearedFilters);
    setActiveFiltersCount(0);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border border-white/20 shadow-xl rounded-3xl p-8 mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {filtersData.title || "Filtres de Recherche"}
            </h2>
            <p className="text-gray-600 text-sm">
              {activeFiltersCount > 0 ? `${activeFiltersCount} ${filtersData.filtersActive || "filtre(s) actif(s)"}` : filtersData.noFiltersActive || 'Aucun filtre appliqué'}
            </p>
          </div>
        </div>
        
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="font-medium">{filtersData.clearAll || "Effacer tout"}</span>
          </button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Search Filter */}
        <div className="xl:col-span-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
            <span className="text-lg">🔍</span>
            <span>{searchData.label || "Recherche globale"}</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder={searchData.placeholder || "Rechercher par titre, description, localisation..."}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 placeholder-gray-400"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {filters.search && (
              <button
                onClick={() => handleFilterChange('search', '')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
            <span className="text-lg">🏷️</span>
            <span>{categoryData.label || "Catégorie"}</span>
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full pl-4 pr-10 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 appearance-none cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
            <span className="text-lg">📍</span>
            <span>{locationData.label || "Localisation"}</span>
          </label>
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full pl-4 pr-10 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 appearance-none cursor-pointer"
            >
              {locations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.icon} {location.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-semibold text-gray-700">{filtersData.activeFiltersLabel || "Filtres actifs:"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <span>🔍 "{filters.search}"</span>
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center hover:bg-blue-300 transition-colors"
                >
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                <span>{categories.find(c => c.value === filters.category)?.icon} {categories.find(c => c.value === filters.category)?.label}</span>
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className="w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center hover:bg-purple-300 transition-colors"
                >
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <span>{locations.find(l => l.value === filters.location)?.icon} {locations.find(l => l.value === filters.location)?.label}</span>
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center hover:bg-green-300 transition-colors"
                >
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
