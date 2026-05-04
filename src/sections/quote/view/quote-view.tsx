import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { varFade } from 'src/components/animate';

import { QuoteForm } from '../quote-form';
import { QuoteHero } from '../quote-hero';

// ----------------------------------------------------------------------

export function QuoteView() {
  return (
    <>
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
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <QuoteForm />
          </Box>
        </Box>
      </Container>
    </>
  );
}
