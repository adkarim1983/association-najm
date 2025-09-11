'use client';

import { AuthProvider } from '../contexts/AuthContext';

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        {children}
      </div>
    </AuthProvider>
  );
}
