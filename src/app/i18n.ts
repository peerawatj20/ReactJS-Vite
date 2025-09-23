import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import enCommon from '@/locales/en/common.json';
import enTranslation from '@/locales/en/translation.json';
import thCommon from '@/locales/th/common.json';
import thTranslation from '@/locales/th/translation.json';

i18n
  .use({
    type: 'postProcessor',
    name: 'returnKey',
    process: function (_value: any, key: any[]) {
      return key[0];
    },
  })
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'translation'],
    defaultNS: 'common',
    supportedLngs: ['en', 'th'],
    resources: {
      en: {
        common: enCommon,
        translation: enTranslation,
      },
      th: {
        common: thCommon,
        translation: thTranslation,
      },
    },
  });

export default i18n;
