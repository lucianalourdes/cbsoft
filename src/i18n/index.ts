import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptCommon from './locales/pt/common.json';
import enCommon from './locales/en/common.json';

export const SUPPORTED_LANGS = ['pt', 'en'] as const;
export const LANG_STORAGE_KEY = 'cbsoft-lang';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { common: ptCommon },
      en: { common: enCommon },
    },
    fallbackLng: 'pt',
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    load: 'languageOnly',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANG_STORAGE_KEY,
      caches: ['localStorage'],
    },
  });

/** Keep <html lang> in sync with the active language (pt-BR / en). */
function syncHtmlLang(lng: string) {
  document.documentElement.lang = lng.startsWith('en') ? 'en' : 'pt-BR';
}
syncHtmlLang(i18n.language || 'pt');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
