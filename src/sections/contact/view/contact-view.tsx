import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ContactForm } from '../contact-form';
import { ContactHero } from '../contact-hero';

// ----------------------------------------------------------------------

export function ContactView() {
  return (
    <>
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
