import type { Theme } from '@mui/material/styles';
import type { Localization } from '@mui/material/locale';

import resourcesToBackend from 'i18next-resources-to-backend';

// MUI Core Locales
import { enUS as enUSCore, esES as esESCore } from '@mui/material/locale';

// ----------------------------------------------------------------------

export type LangValue = {
  label: string;
  value: string;
  systemValue: Localization;
  icon: string;
  countryCode: string;
  numberFormat: { code: string; currency: string };
};

export type LangCode = 'en' | 'es';

export const fallbackLng = 'en';
export const languages: LangCode[] = ['en', 'es'];
export const defaultNS = 'common';

export const langStorage = {
  key: 'i18nextLng',
  defaultValue: fallbackLng,
};

// ----------------------------------------------------------------------

export const allLangs: Record<string, LangValue> = {
  en: {
    label: 'English',
    value: 'en',
    systemValue: enUSCore,
    icon: 'flagpack:gb-nir',
    countryCode: 'GB',
    numberFormat: { code: 'en-US', currency: 'USD' },
  },
  es: {
    label: 'Español',
    value: 'es',
    systemValue: esESCore,
    icon: 'flagpack:ec',
    countryCode: 'EC',
    numberFormat: { code: 'es-EC', currency: 'USD' },
  },
};

// ----------------------------------------------------------------------

/**
 * MUI Locale
 * [1] https://mui.com/material-ui/customization/theming/#locale-text
 */
export function getLocaleConfig(lang: LangCode): Theme['components'] {
  // Return empty object since we're not using MUI X components
  return {};
}

/**
 * Get current language
 */
export function getCurrentLang(lang: LangCode): LangValue {
  return allLangs[lang] || allLangs[fallbackLng];
}

/**
 * i18next options
 */
export const i18nOptions = {
  resources: undefined,
  lng: undefined,
  fallbackLng,
  ns: defaultNS,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
};

/**
 * i18next resource loader
 */
export const i18nResourceLoader = resourcesToBackend(
  (language: string, namespace: string) => import(`./langs/${language}.json`)
);

/**
 * Storage config for language detector
 */
export const storageConfig = {
  lookupLocalStorage: langStorage.key,
};

/**
 * Get format by lang
 */
export function getFormatByLang(lang: LangCode): {
  code: string;
  currency: string;
} {
  return {
    code: getCurrentLang(lang).numberFormat.code,
    currency: getCurrentLang(lang).numberFormat.currency,
  };
}

/**
 * Format number locale
 */
export function formatNumberLocale(inputValue: string | number = 0) {
  const lang = localStorage.getItem(langStorage.key) || fallbackLng;
  const { code, currency } = getFormatByLang(lang as LangCode);

  const number = typeof inputValue === 'string' ? parseFloat(inputValue) : inputValue;

  const fm = new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return fm.format(number);
}
