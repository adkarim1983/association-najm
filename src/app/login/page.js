'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Arrière-plan dégradé sophistiqué */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      
      {/* Motifs géométriques animés */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Logo en arrière-plan transparent */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="opacity-5 transform scale-150">
          <Image
            src="/images/logo2.png"
            alt="Logo Najm"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          
          {/* En-tête élégant */}
          <div className="text-center mb-6">
            <div className="mb-6">
              <Image
                src="/images/logo2.png"
                alt="Logo Association Najm"
                width={160}
                height={160}
                className="mx-auto drop-shadow-2xl"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Espace Administrateur
            </h1>
            <p className="text-base text-blue-200 font-medium">
              Association Najm
            </p>
            <div className="mt-3 w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Carte de connexion ultra-élégante */}
          <div className="relative">
            {/* Bordure lumineuse animée */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
            
            {/* Formulaire principal */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
              
              {/* Titre du formulaire */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Connexion sécurisée
                </h2>
                <p className="text-slate-500 mt-2">Accédez à votre espace de gestion</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Champ Email */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Adresse email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <div className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 placeholder-slate-400 font-medium"
                        placeholder="admin@najm.ma"
                      />
                    </div>
                  </div>
                  
                  {/* Champ Mot de passe */}
                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <div className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 placeholder-slate-400 font-medium"
                        placeholder="••••••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Message d'erreur élégant */}
                {error && (
                  <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/60 rounded-2xl p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3 text-sm text-red-700 font-medium">{error}</div>
                    </div>
                  </div>
                )}

                {/* Bouton de connexion spectaculaire */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        <span className="text-lg">Connexion en cours...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-lg font-bold">Accéder au Dashboard</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Particules flottantes décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300/30 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-300/30 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
      </div>
    </div>
  );
}
