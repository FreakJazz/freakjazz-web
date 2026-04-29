import type { LangCode } from './locales-config';

import i18next from 'i18next';
import { getStorage } from 'minimal-shared/utils';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { i18nOptions, storageConfig, i18nResourceLoader } from './locales-config';

// ----------------------------------------------------------------------

/**
 * [1] useTranslation, Trans, Translation is exported by 'react-i18next'
 */

const detection = {
  order: ['localStorage'],
  lookupLocalStorage: storageConfig.lookupLocalStorage,
  caches: ['localStorage'],
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(i18nResourceLoader)
  .init({ ...i18nOptions, detection });

// ----------------------------------------------------------------------

export type I18nProviderProps = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  return <Provider i18n={i18next}>{children}</Provider>;
}

// ----------------------------------------------------------------------

/**
 * Set language in storage
 */
export function setLangInStorage(lang: LangCode) {
  if (storageConfig.lookupLocalStorage) {
    const langInStorage = getStorage(storageConfig.lookupLocalStorage);

    if (!langInStorage || langInStorage !== lang) {
      localStorage.setItem(storageConfig.lookupLocalStorage, lang);
    }
  }
}
