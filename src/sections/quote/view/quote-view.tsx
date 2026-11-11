import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';
import { SeoHead, ServiceSchema } from 'src/components/seo';

import { QuoteHero } from '../quote-hero';
import { QuoteFormDetailed } from '../quote-form-detailed';

// ----------------------------------------------------------------------

export function QuoteView() {
  const { currentLang } = useTranslate();

  return (
    <>
      <SeoHead
        url="https://freakjazz.com/quote"
        type="website"
        lang={currentLang.value as 'en' | 'es'}
        noindex={true}
        nofollow={true}
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
