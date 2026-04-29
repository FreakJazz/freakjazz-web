import type { LangCode } from './locales-config';

import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from 'src/components/snackbar';

import { setLangInStorage } from './i18n-provider';
import { allLangs, getCurrentLang } from './locales-config';

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const { t, i18n, ready } = useTranslation(ns);

  const currentLang = getCurrentLang(i18n.language as LangCode);

  const onChangeLang = useCallback(
    async (newLang: LangCode) => {
      try {
        await i18n.changeLanguage(newLang);
        setLangInStorage(newLang);

        // Update dayjs locale
        if (newLang === 'es') {
          const esLocale = await import('dayjs/locale/es');
          dayjs.locale(esLocale);
        } else {
          dayjs.locale('en');
        }

        toast.success('Language changed successfully!');
      } catch (error) {
        console.error('Error changing language:', error);
      }
    },
    [i18n]
  );

  return {
    t,
    i18n,
    ready,
    allLangs: Object.values(allLangs),
    currentLang,
    onChangeLang,
  };
}
