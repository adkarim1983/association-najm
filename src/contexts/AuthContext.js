'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth service functions
const authService = {
  async login(identifier, password) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store user data and tokens in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('najm_user', JSON.stringify(data.user));
      localStorage.setItem('najm_access_token', data.tokens.accessToken);
      localStorage.setItem('najm_refresh_token', data.tokens.refreshToken);
    }

    return data;
  },

  async register(userData) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Store user data and tokens in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('najm_user', JSON.stringify(data.user));
      localStorage.setItem('najm_access_token', data.tokens.accessToken);
      localStorage.setItem('najm_refresh_token', data.tokens.refreshToken);
    }

    return data;
  },

  async logout() {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('najm_refresh_token') : null;
    
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('najm_user');
      localStorage.removeItem('najm_access_token');
      localStorage.removeItem('najm_refresh_token');
    }
  },

  async refreshToken() {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('najm_refresh_token') : null;
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Token refresh failed');
    }

    // Update stored tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('najm_access_token', data.tokens.accessToken);
      localStorage.setItem('najm_user', JSON.stringify(data.user));
    }

    return data;
  }
};

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check if we're on the client side
        if (typeof window !== 'undefined') {
          // Check localStorage for user data
          const storedUser = localStorage.getItem('najm_user');
          const storedToken = localStorage.getItem('najm_access_token');
          
          if (storedUser && storedToken) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('najm_user');
          localStorage.removeItem('najm_access_token');
          localStorage.removeItem('najm_refresh_token');
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (identifier, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(identifier, password);
      setUser(response.user);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user is moderator
  const isModerator = () => {
    return hasRole('moderator');
  };

  // Check if user is admin or moderator
  const isAdminOrModerator = () => {
    return isAdmin() || isModerator();
  };

  // Context value
  const value = {
    // State
    user,
    isAuthenticated: !!user,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    refreshToken,
    clearError,

    // Utility functions
    hasRole,
    isAdmin,
    isModerator,
    isAdminOrModerator,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

export default AuthContext;
