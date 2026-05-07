import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';
import { SeoHead, ServiceSchema } from 'src/components/seo';

import { QuoteFormDetailed } from '../quote-form-detailed';
import { QuoteHero } from '../quote-hero';

// ----------------------------------------------------------------------

export function QuoteView() {
  const { t, currentLang } = useTranslate();

  return (
    <>
      <SeoHead
        title={t('seo.quote.title')}
        description={t('seo.quote.description')}
        keywords={t('seo.keywords')}
        type="website"
        lang={currentLang.value as 'en' | 'es'}
      />
      <ServiceSchema />
      <QuoteHero />
      <Container component="section" sx={{ py: 10 }}>
        <Box
          component={m.div}
          variants={varFade('inUp', { distance: 24 })}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <QuoteFormDetailed />
          </Box>
        </Box>
      </Container>
    </>
  );
}
