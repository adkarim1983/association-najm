'use client';

import { useAuth as useAuthContext } from '../contexts/AuthContext';

// Re-export the useAuth hook for convenience
export const useAuth = useAuthContext;

// Additional auth-related hooks
export function useRequireAuth() {
  const auth = useAuthContext();
  
  if (!auth.isAuthenticated) {
    throw new Error('Authentication required');
  }
  
  return auth;
}

export function useRequireAdmin() {
  const auth = useAuthContext();
  
  if (!auth.isAuthenticated) {
    throw new Error('Authentication required');
  }
  
  if (!auth.isAdmin()) {
    throw new Error('Admin privileges required');
  }
  
  return auth;
}

export function useRequireModerator() {
  const auth = useAuthContext();
  
  if (!auth.isAuthenticated) {
    throw new Error('Authentication required');
  }
  
  if (!auth.isAdminOrModerator()) {
    throw new Error('Moderator or admin privileges required');
  }
  
  return auth;
}
