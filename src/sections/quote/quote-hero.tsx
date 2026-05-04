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

export function QuoteHero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)})`,
              `url(${CONFIG.images.quote})`,
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
            {t('quote.title')}
          </Typography>

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Typography
              variant="h5"
              sx={{
                mt: 3,
                color: 'common.white',
                opacity: 0.9,
              }}
            >
              {t('quote.subtitle')}
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
