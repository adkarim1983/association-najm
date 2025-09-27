'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [missionsMenuOpen, setMissionsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();
  const { lang, setLanguage } = useLanguage();
  const [navLabels, setNavLabels] = useState(null);

  // Load navbar translations from public/locales/{lang}/common.json
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch(`/locales/${lang}/common.json`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load locale');
        const data = await res.json();
        if (active) setNavLabels(data?.navbar || null);
      } catch (e) {
        console.warn('Navbar i18n load error:', e);
        if (active) setNavLabels(null);
      }
    };
    load();
    return () => { active = false; };
  }, [lang]);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMissionsMenuOpen(false);
  };

  // Effect to close mobile menu with various interactions
  useEffect(() => {
    const handleClickOutside = (event) => {
      const burgerButton = document.querySelector('[data-burger-button]');
      const isClickOnBurger = burgerButton && burgerButton.contains(event.target);
      
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          !isClickOnBurger) {
        closeMobileMenu();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      closeMobileMenu();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const LangSwitcher = () => {
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const langDropdownRef = useRef(null);
    
    const langs = [
      { 
        code: 'fr', 
        label: 'Français', 
        flag: 'https://flagcdn.com/w80/fr.png',
        country: 'France',
        nativeName: 'Français',
        color: '#6A3F9C'
      },
      { 
        code: 'en', 
        label: 'English', 
        flag: 'https://flagcdn.com/w80/us.png',
        country: 'United States', 
        nativeName: 'English',
        color: '#74BF6B'
      },
      { 
        code: 'ar', 
        label: 'العربية', 
        flag: 'https://flagcdn.com/w80/ma.png',
        country: 'Morocco',
        nativeName: 'العربية',
        color: '#FEC422'
      },
    ];

    const currentLang = langs.find(l => l.code === lang) || langs[0];

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
          setLangDropdownOpen(false);
        }
      };

      if (langDropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [langDropdownOpen]);

    return (
      <div className="hidden lg:flex items-center relative" ref={langDropdownRef}>
        <button
          onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          className="group flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-xl hover:from-white hover:to-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-expanded={langDropdownOpen}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-300 shadow-sm">
              <img 
                src={currentLang.flag} 
                alt={`${currentLang.country} flag`}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-slate-700 text-sm tracking-wide">
              {currentLang.code.toUpperCase()}
            </span>
          </div>
          <svg 
            className={`w-4 h-4 transition-all duration-300 text-slate-500 group-hover:text-slate-700 ${langDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {langDropdownOpen && (
          <div className="absolute top-full mt-3 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 backdrop-blur-sm">
            <div className="py-1">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setLangDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: lang === l.code ? `${l.color}15` : 'transparent',
                    borderLeftColor: lang === l.code ? l.color : 'transparent'
                  }}
                  className={`w-full flex items-center space-x-4 px-4 py-3 text-sm transition-all duration-200 group hover:bg-opacity-10 ${
                    lang === l.code 
                      ? 'border-l-4' 
                      : 'hover:border-l-4 hover:border-transparent'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${l.color}15`;
                    e.currentTarget.style.borderLeftColor = l.color;
                  }}
                  onMouseLeave={(e) => {
                    if (lang !== l.code) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderLeftColor = 'transparent';
                    }
                  }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-200 shadow-md group-hover:border-slate-300 group-hover:shadow-lg transition-all duration-200">
                      <img 
                        src={l.flag} 
                        alt={`${l.country} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {lang === l.code && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-semibold ${lang === l.code ? 'text-slate-700' : 'text-slate-700'}`}>
                      {l.nativeName}
                    </div>
                    <div className={`text-xs ${lang === l.code ? 'text-slate-600' : 'text-slate-500'}`}>
                      {l.country}
                    </div>
                  </div>
                  {lang === l.code && (
                    <div className="flex items-center">
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        Actuel
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto px-4 py-2 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/home">
          <Image
            src="/images/logo2.png"
            alt="Association Najm"
            width={120}
            height={60}
            className="h-18 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center ${lang === 'ar' ? 'space-x-6' : 'space-x-6'}`}>
          <Link href="/home" className={`text-gray-700 hover:text-blue-600 font-medium text-sm navbar-link ${lang === 'ar' ? 'px-1' : ''}`}>
            {navLabels?.home ?? 'Accueil'}
          </Link>
          <Link href="/about" className={`text-gray-700 hover:text-blue-600 font-medium text-sm navbar-link ${lang === 'ar' ? 'px-1' : ''}`}>
            {navLabels?.about ?? 'À propos'}
          </Link>
          
          {/* Missions Dropdown */}
          <div className={`relative group ${lang === 'ar' ? 'px-1' : ''}`}>
            <button className="text-gray-700 hover:text-blue-600 font-medium text-sm flex items-center">
              {navLabels?.missions ?? 'Missions'}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2 missions-dropdown">
                <Link 
                  href="/missions/gestion-plateformes" 
                  className="block px-4 py-2 text-sm text-gray-700 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1B7DC215';
                    e.target.style.borderLeft = '4px solid #1B7DC2';
                    e.target.style.color = '#1B7DC2';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderLeft = 'none';
                    e.target.style.color = '#374151';
                  }}
                >
                  {navLabels?.platforms ?? 'Gestion des Plateformes'}
                </Link>
                <Link 
                  href="/missions/economie-sociale" 
                  className="block px-4 py-2 text-sm text-gray-700 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#FEBD1715';
                    e.target.style.borderLeft = '4px solid #FEBD17';
                    e.target.style.color = '#FEBD17';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderLeft = 'none';
                    e.target.style.color = '#374151';
                  }}
                >
                  {navLabels?.socialEconomy ?? 'Économie Sociale'}
                </Link>
                <Link 
                  href="/missions/entrepreneuriat" 
                  className="block px-4 py-2 text-sm text-gray-700 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#7046A015';
                    e.target.style.borderLeft = '4px solid #7046A0';
                    e.target.style.color = '#7046A0';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderLeft = 'none';
                    e.target.style.color = '#374151';
                  }}
                >
                  {navLabels?.entrepreneurship ?? 'Entrepreneuriat'}
                </Link>
                <Link 
                  href="/missions/incubation" 
                  className="block px-4 py-2 text-sm text-gray-700 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#5AB54E15';
                    e.target.style.borderLeft = '4px solid #5AB54E';
                    e.target.style.color = '#5AB54E';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderLeft = 'none';
                    e.target.style.color = '#374151';
                  }}
                >
                  {navLabels?.incubation ?? 'Incubation'}
                </Link>
                <Link 
                  href="/missions/developpement-capacites" 
                  className="block px-4 py-2 text-sm text-gray-700 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#FEBD1715';
                    e.target.style.borderLeft = '4px solid #FEBD17';
                    e.target.style.color = '#FEBD17';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderLeft = 'none';
                    e.target.style.color = '#374151';
                  }}
                >
                  {navLabels?.capacity ?? 'Développement des Capacités'}
                </Link>
              </div>
            </div>
          </div>

          <Link href="/projects" className={`text-gray-700 hover:text-blue-600 font-medium text-sm navbar-link ${lang === 'ar' ? 'px-1' : ''}`}>
            {navLabels?.projects ?? 'Projets'}
          </Link>
          <Link href="/galerie" className={`text-gray-700 hover:text-blue-600 font-medium text-sm navbar-link ${lang === 'ar' ? 'px-1' : ''}`}>
            {navLabels?.gallery ?? 'Galerie'}
          </Link>
          <Link href="/academie-najm" className={`text-gray-700 hover:text-blue-600 font-medium text-sm navbar-link ${lang === 'ar' ? 'px-1' : ''}`}>
            {navLabels?.academy ?? 'Académie Najm'}
          </Link>
          <Link href="/contact" className={`text-gray-700 hover:text-blue-600 font-medium text-sm navbar-link ${lang === 'ar' ? 'px-1' : ''}`}>
            {navLabels?.contact ?? 'Contact'}
          </Link>

          {/* Language Switcher */}
          <LangSwitcher />

          {/* Auth Links */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Bonjour, {user?.firstName}</span>
              {user?.role === 'admin' && (
                <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Déconnexion
              </button>
            </div>
          ) : (<></>)}
        </nav>

        {/* Mobile menu button */}
        <button
          data-burger-button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden bg-white border-t shadow-lg">
          <nav className="px-4 py-4 space-y-4">
            {/* Mobile Language Switcher */}
            <div className="flex flex-col space-y-3">
              {[
                { 
                  code: 'fr', 
                  label: 'Français', 
                  flag: 'https://flagcdn.com/w80/fr.png',
                  country: 'France',
                  nativeName: 'Français',
                  color: '#6A3F9C'
                },
                { 
                  code: 'en', 
                  label: 'English', 
                  flag: 'https://flagcdn.com/w80/us.png',
                  country: 'United States', 
                  nativeName: 'English',
                  color: '#74BF6B'
                },
                { 
                  code: 'ar', 
                  label: 'العربية', 
                  flag: 'https://flagcdn.com/w80/ma.png',
                  country: 'Morocco',
                  nativeName: 'العربية',
                  color: '#FEC422'
                }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => { 
                    setLanguage(l.code); 
                    closeMobileMenu(); 
                  }}
                  style={{
                    backgroundColor: lang === l.code ? `${l.color}15` : 'white',
                    borderColor: lang === l.code ? l.color : '#e2e8f0'
                  }}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                    lang === l.code 
                      ? 'shadow-md' 
                      : 'hover:border-slate-300'
                  }`}
                  onMouseEnter={(e) => {
                    if (lang !== l.code) {
                      e.currentTarget.style.backgroundColor = `${l.color}10`;
                      e.currentTarget.style.borderColor = l.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (lang !== l.code) {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 shadow-md">
                      <img 
                        src={l.flag} 
                        alt={`${l.country} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {lang === l.code && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-bold text-base ${lang === l.code ? 'text-slate-700' : 'text-slate-700'}`}>
                      {l.nativeName}
                    </div>
                    <div className={`text-sm ${lang === l.code ? 'text-slate-600' : 'text-slate-500'}`}>
                      {l.country}
                    </div>
                  </div>
                  {lang === l.code && (
                    <div className="flex items-center">
                      <span className="text-xs font-semibold text-green-700 bg-green-200 px-3 py-1 rounded-full">
                        Actuel
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <Link href="/home" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              {navLabels?.home ?? 'Accueil'}
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              {navLabels?.about ?? 'À propos'}
            </Link>
            
            {/* Mobile Missions Menu */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMissionsMenuOpen(!missionsMenuOpen)}
              >
                {navLabels?.missions ?? 'Missions'}
                <svg className={`w-4 h-4 transition-transform ${missionsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {missionsMenuOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link href="/missions/gestion-plateformes" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    {navLabels?.platforms ?? 'Gestion des Plateformes'}
                  </Link>
                  <Link href="/missions/economie-sociale" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    {navLabels?.socialEconomy ?? 'Économie Sociale'}
                  </Link>
                  <Link href="/missions/entrepreneuriat" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    {navLabels?.entrepreneurship ?? 'Entrepreneuriat'}
                  </Link>
                  <Link href="/missions/incubation" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    {navLabels?.incubation ?? 'Incubation'}
                  </Link>
                  <Link href="/missions/developpement-capacites" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    {navLabels?.capacity ?? 'Développement des Capacités'}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/projects" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              {navLabels?.projects ?? 'Projets'}
            </Link>
            <Link href="/galerie" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              {navLabels?.gallery ?? 'Galerie'}
            </Link>
            <Link href="/academie-najm" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              {navLabels?.academy ?? 'Académie Najm'}
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              {navLabels?.contact ?? 'Contact'}
            </Link>

            {/* Mobile Auth Links */}
            {isAuthenticated ? (
              <div className="pt-4 border-t space-y-2">
                <div className="text-gray-600">Bonjour, {user?.firstName}</div>
                {user?.role === 'admin' && (
                  <Link href="/admin/dashboard" className="block text-blue-600 hover:text-blue-800 font-medium" onClick={closeMobileMenu}>
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block text-red-600 hover:text-red-800 font-medium text-left"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t">
                <Link href="/login" className="block text-blue-600 hover:text-blue-800 font-medium" onClick={closeMobileMenu}>
                  Connexion
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
