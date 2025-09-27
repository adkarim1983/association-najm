'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import NewProjectModalSteps from '../../components/dashboard/NewProjectModalSteps';
import EditProjectModalSteps from '../../components/dashboard/EditProjectModalSteps';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalViews: 0,
    totalLikes: 0
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchDashboardData();
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
        
        // Calculate stats
        const totalProjects = data.projects?.length || 0;
        const activeProjects = data.projects?.filter(p => p.status === 'active').length || 0;
        const totalViews = data.projects?.reduce((sum, p) => sum + (p.metadata?.views || 0), 0) || 0;
        const totalLikes = data.projects?.reduce((sum, p) => sum + (p.metadata?.likes || 0), 0) || 0;
        
        setStats({ totalProjects, activeProjects, totalViews, totalLikes });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleProjectCreated = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
    setStats(prev => ({
      ...prev,
      totalProjects: prev.totalProjects + 1,
      activeProjects: newProject.status === 'active' ? prev.activeProjects + 1 : prev.activeProjects
    }));
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p));
    setShowEditModal(false);
    setEditingProject(null);
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le projet "${projectName}" ? Cette action est irréversible.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/projects?id=${projectId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression');
      }

      setProjects(prev => prev.filter(p => p._id !== projectId));
      setStats(prev => ({
        ...prev,
        totalProjects: prev.totalProjects - 1,
        activeProjects: prev.activeProjects - 1
      }));
    } catch (error) {
      alert(`Erreur: ${error.message}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Elegant Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              {/* Modern Logo Icon */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Elegant Title Section */}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Dashboard Administrateur
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-blue-200 font-medium">Association Najm • Gestion Avancée</p>
                </div>
              </div>
            </div>
            
            {/* User Profile & Actions */}
            <div className="flex items-center space-x-6">
              {/* User Info Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{user.firstName} {user.lastName}</p>
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">{user.role}</p>
                  </div>
                </div>
              </div>
              
              {/* Elegant Logout Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                <button
                  onClick={handleLogout}
                  className="relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-bold">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sophisticated Navigation */}
      <nav className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 py-4">
            {[
              { 
                id: 'overview', 
                label: 'Vue d\'ensemble', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                id: 'projects', 
                label: 'Projets', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                color: 'from-purple-500 to-pink-500'
              },
              { 
                id: 'articles', 
                label: 'Articles', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                color: 'from-green-500 to-emerald-500'
              },
              { 
                id: 'media', 
                label: 'Médias', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'from-amber-500 to-orange-500'
              },
              { 
                id: 'settings', 
                label: 'Paramètres', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((tab) => (
              <div key={tab.id} className="relative group">
                {activeTab === tab.id && (
                  <div className={`absolute -inset-1 bg-gradient-to-r ${tab.color} rounded-2xl blur opacity-75 animate-pulse`}></div>
                )}
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-xl`
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
                  }`}
                >
                  <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {tab.icon}
                  </div>
                  <span className="whitespace-nowrap">{tab.label}</span>
                  
                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Elegant Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: 'Total Projets', 
                  value: stats.totalProjects, 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ),
                  gradient: 'from-blue-500 via-blue-600 to-cyan-600',
                  bgPattern: 'from-blue-500/20 to-cyan-500/20'
                },
                { 
                  title: 'Projets Actifs', 
                  value: stats.activeProjects, 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: 'from-emerald-500 via-green-600 to-teal-600',
                  bgPattern: 'from-emerald-500/20 to-teal-500/20'
                },
                { 
                  title: 'Total Vues', 
                  value: stats.totalViews, 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ),
                  gradient: 'from-purple-500 via-violet-600 to-indigo-600',
                  bgPattern: 'from-purple-500/20 to-indigo-500/20'
                },
                { 
                  title: 'Total Likes', 
                  value: stats.totalLikes, 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  gradient: 'from-rose-500 via-pink-600 to-red-600',
                  bgPattern: 'from-rose-500/20 to-red-500/20'
                }
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  {/* Floating Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 animate-pulse`}></div>
                  
                  {/* Main Card */}
                  <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 group-hover:shadow-3xl">
                    {/* Animated Background Pattern */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgPattern} rounded-3xl opacity-50`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                          <div className="text-white">
                            {stat.icon}
                          </div>
                        </div>
                        
                        {/* Floating Decorative Element */}
                        <div className="absolute top-2 right-2 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-white/80 font-medium text-sm uppercase tracking-wider">{stat.title}</p>
                        <div className="flex items-baseline space-x-2">
                          <p className="text-4xl font-black text-white">{stat.value}</p>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Interactive Elements */}
                      <div className="mt-6 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between text-white/60 text-xs">
                          <span>Mis à jour</span>
                          <span className="flex items-center space-x-1">
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                            <span>En temps réel</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Projects - Elegant */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                
                {/* Header Section */}
                <div className="relative p-8 bg-gradient-to-r from-white/10 to-white/5 border-b border-white/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)]"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white">Projets Récents</h2>
                        <p className="text-white/60 font-medium">Dernières activités</p>
                      </div>
                    </div>
                    <div className="text-white/40">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-ping"></div>
                      </div>
                      <p className="text-white/60 mt-4 font-medium">Chargement des projets...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {projects.slice(0, 5).map((project, index) => (
                        <div key={project._id} className="relative group/item">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur opacity-0 group-hover/item:opacity-100 transition duration-500"></div>
                          <div className="relative flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl backdrop-blur-sm">
                            
                            {/* Project Info */}
                            <div className="flex items-center space-x-6">
                              {/* Project Avatar */}
                              <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-3">
                                  <span className="text-white font-black text-xl">{project.name ? project.name.charAt(0).toUpperCase() : '?'}</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white/20 animate-pulse"></div>
                              </div>
                              
                              {/* Project Details */}
                              <div className="space-y-1">
                                <h3 className="font-bold text-white text-lg">{project.name || 'Nom non défini'}</h3>
                                <p className="text-white/60 font-medium">{project.category || 'Catégorie non définie'}</p>
                                <div className="flex items-center space-x-2 text-xs text-white/50">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>Ajouté récemment</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-4">
                              {/* Status Badge */}
                              <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                                project.status === 'active' 
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                  : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                              }`}>
                                {project.status}
                              </div>
                              
                              {/* Edit Button */}
                              <button 
                                onClick={() => handleEditProject(project)}
                                className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
                              >
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Modifier</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {projects.length === 0 && (
                        <div className="text-center py-16">
                          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-white/20">
                            <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Aucun projet trouvé</h3>
                          <p className="text-white/60">Commencez par créer votre premier projet</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-10">
            {/* Header Section */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20"></div>
              <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white">Gestion des Projets</h2>
                      <p className="text-white/60 font-medium mt-1">Gérez tous vos projets en un seul endroit</p>
                    </div>
                  </div>
                  
                  {/* New Project Button - Spectacular */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                    <button 
                      onClick={() => setShowNewProjectModal(true)}
                      className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 flex items-center space-x-3 font-bold text-lg">
                      <div className="relative">
                        <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
                      </div>
                      <span>Nouveau Projet</span>
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={project._id} className="relative group">
                  {/* Floating Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
                  
                  {/* Project Card */}
                  <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-1 group-hover:shadow-3xl">
                    
                    {/* Card Header */}
                    <div className="relative p-6 bg-gradient-to-r from-white/10 to-white/5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
                      <div className="relative z-10 flex items-start justify-between">
                        
                        {/* Project Avatar */}
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <span className="text-white font-black text-2xl">{project.name ? project.name.charAt(0).toUpperCase() : '?'}</span>
                          </div>
                          
                          {/* Status Indicator */}
                          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center ${
                            project.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                          }`}>
                            {project.status === 'active' ? (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        
                        {/* Views Counter */}
                        <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-2 backdrop-blur-sm">
                          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-white/80 font-bold text-sm">{project.metadata?.views || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      {/* Project Info */}
                      <div>
                        <h3 className="text-xl font-black text-white mb-2 line-clamp-2">{project.name || 'Nom non défini'}</h3>
                        <p className="text-white/60 font-medium text-sm mb-3">{project.location || 'Localisation non définie'}</p>
                        
                        {/* Category Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                          {project.category || 'Non définie'}
                        </div>
                      </div>
                      
                      {/* Project Description Preview */}
                      {project.description && (
                        <p className="text-white/50 text-sm line-clamp-3">
                          {project.description.length > 100 
                            ? `${project.description.substring(0, 100)}...` 
                            : project.description
                          }
                        </p>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4">
                        {/* Edit Button */}
                        <button 
                          onClick={() => handleEditProject(project)}
                          className="flex-1 group/btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Modifier</span>
                        </button>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDeleteProject(project._id, project.name)}
                          className="group/btn bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>
                </div>
              ))}
              
              {/* Empty State */}
              {projects.length === 0 && (
                <div className="col-span-full">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-3xl blur opacity-20"></div>
                    <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border-2 border-dashed border-white/20 p-16 text-center">
                      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Aucun projet trouvé</h3>
                      <p className="text-white/60 mb-8 max-w-md mx-auto">Commencez par créer votre premier projet et donnez vie à vos idées.</p>
                      <button 
                        onClick={() => setShowNewProjectModal(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                      >
                        Créer un projet
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-20"></div>
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-16 text-center">
              <div className="relative group mb-8">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Gestion des Articles</h3>
              <p className="text-white/60 mb-10 text-lg max-w-2xl mx-auto">Cette fonctionnalité révolutionnaire est en cours de développement et sera bientôt disponible pour enrichir votre plateforme.</p>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <button className="relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  🚀 Bientôt disponible
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-20"></div>
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-16 text-center">
              <div className="relative group mb-8">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Gestion des Médias</h3>
              <p className="text-white/60 mb-10 text-lg max-w-2xl mx-auto">Un système de gestion multimédia avancé pour organiser et optimiser tous vos contenus visuels.</p>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <button className="relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  📸 Bientôt disponible
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20"></div>
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-16 text-center">
              <div className="relative group mb-8">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Paramètres Avancés</h3>
              <p className="text-white/60 mb-10 text-lg max-w-2xl mx-auto">Un centre de contrôle complet pour personnaliser et optimiser votre expérience administrative.</p>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <button className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  ⚙️ Bientôt disponible
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* New Project Modal */}
        <NewProjectModalSteps 
          isOpen={showNewProjectModal} 
          onClose={() => setShowNewProjectModal(false)}
          onProjectCreated={handleProjectCreated}
        />

      {/* Edit Project Modal */}
      <EditProjectModalSteps
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProject(null);
        }}
        onProjectUpdated={handleProjectUpdated}
        project={editingProject}
      />
    </div>
  );
}
