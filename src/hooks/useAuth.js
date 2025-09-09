'use client';

import { useAuth as useAuthContext } from '../contexts/AuthContext';

// Re-export the useAuth hook for convenience
export const useAuth = useAuthContext;

// Additional auth-related hooks
export function useRequireAuth() {
  const auth = useAuthContext();
  
  // Don't throw errors during loading
  if (auth.isLoading) {
    return { user: null, loading: true };
  }
  
  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return { user: null, loading: false };
  }
  
  return { user: auth.user, loading: false };
}

export function useRequireAdmin() {
  const auth = useAuthContext();
  
  // Don't throw errors during loading
  if (auth.isLoading) {
    return { user: null, loading: true };
  }
  
  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login?redirect=/admin';
    }
    return { user: null, loading: false };
  }
  
  // Redirect to home if not admin
  if (!auth.isAdmin()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/?error=access_denied';
    }
    return { user: null, loading: false };
  }
  
  return { user: auth.user, loading: false };
}

export function useRequireModerator() {
  const auth = useAuthContext();
  
  // Don't throw errors during loading
  if (auth.isLoading) {
    return { user: null, loading: true };
  }
  
  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return { user: null, loading: false };
  }
  
  // Redirect to home if not moderator or admin
  if (!auth.isAdminOrModerator()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/?error=access_denied';
    }
    return { user: null, loading: false };
  }
  
  return { user: auth.user, loading: false };
}
