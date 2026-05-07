import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function ContactHero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)})`,
              `url(${CONFIG.images.contact})`,
            ],
          }),
          overflow: 'hidden',
          height: { md: 560 },
          position: 'relative',
          py: { xs: 10, md: 0 },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              color: 'common.white',
            }}
          >
            {t('contact.title')}
          </Typography>

          <Box
            component="ul"
            sx={{
              mt: 5,
              display: 'flex',
              color: 'common.white',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {CONTACTS.map((contact) => (
              <Box key={contact.label} component="li">
                <m.div variants={varFade('inUp', { distance: 24 })}>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    {contact.label}
                  </Typography>
                </m.div>

                <m.div variants={varFade('inUp', { distance: 24 })}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {contact.value}
                  </Typography>
                </m.div>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    label: 'Location',
    value: 'Quito, Ecuador',
  },
  {
    label: 'Email',
    value: 'jazzrb2307@gmail.com',
  },
];
