import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enPagesMain from '../../public/locales/en/pages-main.json';
import frPagesMain from '../../public/locales/fr/pages-main.json';
import arPagesMain from '../../public/locales/ar/pages-main.json';
import enCommon from '../../public/locales/en/common.json';
import frCommon from '../../public/locales/fr/common.json';
import arCommon from '../../public/locales/ar/common.json';

const resources = {
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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // default language
    fallbackLng: 'fr',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Configure namespaces
    defaultNS: 'pages-main',
    ns: ['pages-main', 'common'],
  });

export default i18n;
