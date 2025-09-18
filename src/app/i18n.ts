import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import enTranslation from '@/locales/en/translation.json';
import thTranslation from '@/locales/th/translation.json';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslation,
    },
    th: {
      translation: thTranslation,
    },
  },
});

export default i18n;
