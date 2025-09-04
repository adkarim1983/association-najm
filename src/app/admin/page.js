'use client';

import { useState, useEffect } from 'react';
import { useRequireAdmin } from '../../hooks/useAuth';
import Navbar from '../../components/layout/Navbar';
import AdminStats from '../../components/admin/AdminStats';
import RecentItems from '../../components/admin/RecentItems';

export default function AdminDashboard() {
  const { user, loading } = useRequireAdmin();
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      fetchDashboardData();
    }
  }, [user, loading]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16 flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // useRequireAdmin handles redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord administrateur
            </h1>
            <p className="text-gray-600 mt-2">
              Bienvenue, {user.name}. Voici un aperçu de l'activité de l'association.
            </p>
          </div>

          {dashboardData && (
            <>
              <AdminStats stats={dashboardData.stats} />
              <RecentItems 
                recentProjects={dashboardData.recentProjects}
                recentContacts={dashboardData.recentContacts}
                recentUsers={dashboardData.recentUsers}
              />
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <a
                  href="/admin/projects"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Gérer les projets
                </a>
                <a
                  href="/admin/contacts"
                  className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Voir les messages
                </a>
                <a
                  href="/admin/users"
                  className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Gérer les utilisateurs
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Système
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Version: 1.0.0</p>
                <p>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
                <p>Statut: Opérationnel</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Support
              </h3>
              <div className="space-y-3">
                <a
                  href="/contact"
                  className="block text-blue-600 hover:underline text-sm"
                >
                  Contacter le support
                </a>
                <a
                  href="/docs"
                  className="block text-blue-600 hover:underline text-sm"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
