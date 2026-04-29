import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { varFade } from 'src/components/animate';

import { QuoteForm } from '../quote-form';

// ----------------------------------------------------------------------

export function QuoteView() {
  return (
    <Box
      component={m.div}
      variants={varFade('inUp', { distance: 24 })}
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container>
        <QuoteForm />
      </Container>
    </Box>
  );
}
