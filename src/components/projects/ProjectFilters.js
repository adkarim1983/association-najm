'use client';

import { useState } from 'react';

export default function ProjectFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
    location: ''
  });

  const categories = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'restauration', label: 'Restauration' },
    { value: 'marketing_digital', label: 'Marketing Digital' },
    { value: 'evenementiel', label: 'Événementiel' },
    { value: 'design', label: 'Design' },
    { value: 'audio_visuel', label: 'Audio Visuel' }
  ];

  const statuses = [
    { value: '', label: 'Tous les statuts' },
    { value: 'planned', label: 'Planifié' },
    { value: 'active', label: 'En cours' },
    { value: 'completed', label: 'Terminé' }
  ];

  const locations = [
    { value: '', label: 'Toutes les localisations' },
    { value: 'Annexe administrative de Sidi Othmane', label: 'Annexe administrative de Sidi Othmane' },
    { value: 'Zone industrielle Sidi Othmane', label: 'Zone industrielle Sidi Othmane' },
    { value: 'Annexe administrative du quartier Moulay Rachid', label: 'Annexe administrative du quartier Moulay Rachid' },
    { value: 'Annexe administrative du quartier Mabrouka', label: 'Annexe administrative du quartier Mabrouka' },
    { value: 'Annexe administrative du quartier Sadri', label: 'Annexe administrative du quartier Sadri' },
    { value: 'Hay El Rajae', label: 'Hay El Rajae' },
    { value: 'Zone industrielle Moulay Rachid', label: 'Zone industrielle Moulay Rachid' },
    { value: 'Annexe administrative El Harouiyine', label: 'Annexe administrative El Harouiyine' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', status: '', search: '', location: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Rechercher
          </label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Titre, description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            📍 Localisation
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {locations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
