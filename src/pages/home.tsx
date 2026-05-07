import { useTranslate } from 'src/locales';

import { AllSchemas, SeoHead } from 'src/components/seo';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t, currentLang } = useTranslate();

  return (
    <>
      <SeoHead
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords={t('seo.keywords')}
        type="profile"
        lang={currentLang.value as 'en' | 'es'}
      />
      <AllSchemas />

      <HomeView />
    </>
  );
}
