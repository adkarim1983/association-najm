'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useMemo } from 'react';

// Import translation files
import enPagesMain from '../../public/locales/en/pages-main.json';
import frPagesMain from '../../public/locales/fr/pages-main.json';
import arPagesMain from '../../public/locales/ar/pages-main.json';
import enCommon from '../../public/locales/en/common.json';
import frCommon from '../../public/locales/fr/common.json';
import arCommon from '../../public/locales/ar/common.json';

const translations = {
  en: {
    'pages-main': enPagesMain,
    common: enCommon,
  },
  fr: {
    'pages-main': frPagesMain,
    common: frCommon,
  },
  ar: {
    'pages-main': arPagesMain,
    common: arCommon,
  },
};

export function useTranslation(namespace = 'pages-main') {
  const { lang } = useLanguage();

  const t = useMemo(() => {
    return (key, options = {}) => {
      const keys = key.split('.');
      let value = translations[lang]?.[namespace];
      
      // Navigate through the keys
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }
      
      // If not found, try fallback to French
      if (value === undefined) {
        value = translations['fr']?.[namespace];
        for (const k of keys) {
          if (value && typeof value === 'object') {
            value = value[k];
          } else {
            value = undefined;
            break;
          }
        }
      }
      
      // Return appropriate value
      if (value === undefined) {
        return key; // Return key if translation not found
      }
      
      // Handle returnObjects option
      if (options.returnObjects && (Array.isArray(value) || typeof value === 'object')) {
        return value;
      }
      
      if (typeof value === 'string') {
        // Simple interpolation for variables like {{variable}}
        if (options.variables) {
          return value.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
            return options.variables[varName] || match;
          });
        }
        return value;
      }
      
      // Return array or object if requested
      if (Array.isArray(value) || typeof value === 'object') {
        return value;
      }
      
      return key; // Return key if translation not found
    };
  }, [lang, namespace]);

  return { t, lang };
}
