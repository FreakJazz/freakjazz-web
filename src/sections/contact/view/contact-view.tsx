import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslate } from 'src/locales';

import { SeoHead } from 'src/components/seo';

import { ContactForm } from '../contact-form';
import { ContactHero } from '../contact-hero';

// ----------------------------------------------------------------------

export function ContactView() {
  const { t, currentLang } = useTranslate();

  return (
    <>
      <SeoHead
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        keywords={t('seo.keywords')}
        type="website"
        lang={currentLang.value as 'en' | 'es'}
      />
      <ContactHero />
      <Container component="section" sx={{ py: 10 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <ContactForm />
          </Box>
        </Box>
      </Container>
    </>
  );
}
