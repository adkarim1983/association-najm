'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen">
          {children}
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}
