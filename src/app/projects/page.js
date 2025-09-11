'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProjectCard from '../../components/projects/ProjectCard';
import ProjectFilters from '../../components/projects/ProjectFilters';

// Dynamic import for map component to avoid SSR issues
const ProjectMap = dynamic(() => import('../../components/projects/ProjectMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
});

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
    location: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchProjects();
    }
  }, [mounted, filters, pagination.currentPage]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // Add pagination parameters
      queryParams.append('page', pagination.currentPage.toString());
      queryParams.append('limit', '20'); // Set to 20 projects per page
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.location) queryParams.append('location', filters.location);

      const response = await fetch(`/api/projects?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
        
        // Update pagination state with response data
        if (data.pagination) {
          setPagination({
            currentPage: data.pagination.currentPage,
            totalPages: data.pagination.totalPages,
            totalItems: data.pagination.totalItems,
            hasNext: data.pagination.hasNextPage,
            hasPrev: data.pagination.hasPrevPage
          });
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (pagination.hasNext) {
      handlePageChange(pagination.currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (pagination.hasPrev) {
      handlePageChange(pagination.currentPage - 1);
    }
  };

  const handleProjectSelect = (project) => {
    router.push(`/projects/${project._id}`);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="bg-blue-900 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Nos Projets
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Découvrez nos initiatives et réalisations qui créent un impact positif
              </p>
            </div>
          </div>
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-blue-900 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Projets
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez nos initiatives et réalisations qui créent un impact positif
            </p>
          </div>
        </div>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <ProjectFilters onFilterChange={handleFilterChange} />
            
            {/* View Mode Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 backdrop-blur-sm border border-gray-200 rounded-2xl p-2 flex shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gray-200 group-hover:bg-gray-300'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <span className="font-bold">Vue Grille</span>
                  {viewMode === 'grid' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </button>
                
                <button
                  onClick={() => setViewMode('map')}
                  className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    viewMode === 'map'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    viewMode === 'map' 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gray-200 group-hover:bg-gray-300'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <span className="font-bold">Vue Carte</span>
                  {viewMode === 'map' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-600 text-lg">
                          Aucun projet trouvé avec les critères sélectionnés.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-8">
                    {projects.length > 0 ? (
                      <>
                        <div className="mb-4 text-center">
                          <p className="text-gray-600">
                            📍 {projects.length} projet(s) avec adresses géolocalisées
                          </p>
                        </div>
                        <ProjectMap 
                          projects={projects} 
                          onProjectSelect={handleProjectSelect}
                        />
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                          Aucun projet trouvé avec les critères sélectionnés.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Pagination Controls */}
                {projects.length > 0 && pagination.totalPages > 1 && (
                  <div className="flex flex-col items-center mt-12 space-y-4">
                    {/* Pagination Info */}
                    <div className="text-sm text-gray-600">
                      Affichage de {((pagination.currentPage - 1) * 20) + 1} à{' '}
                      {Math.min(pagination.currentPage * 20, pagination.totalItems)} sur{' '}
                      {pagination.totalItems} projets
                    </div>
                    
                    {/* Pagination Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={goToPrevPage}
                        disabled={!pagination.hasPrev}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          pagination.hasPrev
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        ← Précédent
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {/* Page Numbers */}
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (pagination.currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (pagination.currentPage >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = pagination.currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                                pageNum === pagination.currentPage
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={goToNextPage}
                        disabled={!pagination.hasNext}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          pagination.hasNext
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Suivant →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
