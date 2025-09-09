'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [missionsMenuOpen, setMissionsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setLanguageMenuOpen(false);
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
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/home" className="text-gray-700 hover:text-blue-600 font-medium">
            Accueil
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
            À propos
          </Link>
          
          {/* Missions Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
              Missions
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link href="/missions/gestion-plateformes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Gestion des Plateformes
                </Link>
                <Link href="/missions/economie-sociale" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Économie Sociale
                </Link>
                <Link href="/missions/entrepreneuriat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Entrepreneuriat
                </Link>
                <Link href="/missions/incubation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Incubation
                </Link>
                <Link href="/missions/developpement-capacites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Développement des Capacités
                </Link>
              </div>
            </div>
          </div>

          <Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium">
            Projets
          </Link>
          <Link href="/galerie" className="text-gray-700 hover:text-blue-600 font-medium">
            Galerie
          </Link>
          <Link href="/academie-najm" className="text-gray-700 hover:text-blue-600 font-medium">
            Académie Najm
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
            Contact
          </Link>

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
          ) : (
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Connexion
            </Link>
          )}
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
            <Link href="/home" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              Accueil
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              À propos
            </Link>
            
            {/* Mobile Missions Menu */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMissionsMenuOpen(!missionsMenuOpen)}
              >
                Missions
                <svg className={`w-4 h-4 transition-transform ${missionsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {missionsMenuOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link href="/missions/gestion-plateformes" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    Gestion des Plateformes
                  </Link>
                  <Link href="/missions/economie-sociale" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    Économie Sociale
                  </Link>
                  <Link href="/missions/entrepreneuriat" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    Entrepreneuriat
                  </Link>
                  <Link href="/missions/incubation" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    Incubation
                  </Link>
                  <Link href="/missions/developpement-capacites" className="block text-sm text-gray-600 hover:text-blue-600" onClick={closeMobileMenu}>
                    Développement des Capacités
                  </Link>
                </div>
              )}
            </div>

            <Link href="/projects" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              Projets
            </Link>
            <Link href="/galerie" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              Galerie
            </Link>
            <Link href="/academie-najm" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              Académie Najm
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={closeMobileMenu}>
              Contact
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
