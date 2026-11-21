import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getWhatsAppUrl, WHATSAPP_DISPLAY } from 'src/utils/whatsapp';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

const EMAIL = 'jazzrb2307@gmail.com';

const SOCIALS = [
  { label: 'LinkedIn', icon: 'mdi:linkedin', href: 'https://www.linkedin.com/in/jazmin-rodriguez-bermeo/' },
  { label: 'GitHub', icon: 'mdi:github', href: 'https://github.com/FreakJazz' },
  { label: 'Medium', icon: 'mdi:medium', href: 'https://medium.com/@jazzrb2307' },
];

const PERKS = [
  { key: 'contact.perk1', icon: 'solar:code-square-bold-duotone' },
  { key: 'contact.perk2', icon: 'solar:atom-bold-duotone' },
  { key: 'contact.perk3', icon: 'solar:rocket-2-bold-duotone' },
];

export function ContactHero({ sx, ...other }: BoxProps) {
  const { t, currentLang } = useTranslate();

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(135deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.85)}, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.7)})`,
              `url(${CONFIG.images.contact})`,
            ],
          }),
          overflow: 'hidden',
          minHeight: { md: 620 },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          py: { xs: 12, md: 14 },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionContainer}>
        <Stack spacing={4} alignItems="center" textAlign="center" sx={{ color: 'common.white' }}>
          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Chip
              icon={<Iconify icon={'solar:letter-bold-duotone' as any} width={20} />}
              label={t('contact.title')}
              sx={{ color: 'common.white', bgcolor: 'rgba(255,255,255,0.16)', fontWeight: 600 }}
            />
          </m.div>

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Typography
              component="h1"
              variant="h1"
              sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 1.1, maxWidth: 900 }}
            >
              {t('home.ctaFinal')}
            </Typography>
          </m.div>

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Typography variant="h6" sx={{ maxWidth: 680, opacity: 0.9, fontWeight: 400 }}>
              {t('home.ctaFinalSubtitle')}
            </Typography>
          </m.div>

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.5}>
              {PERKS.map((perk) => (
                <Chip
                  key={perk.key}
                  icon={<Iconify icon={perk.icon as any} width={20} />}
                  label={t(perk.key)}
                  sx={{
                    color: 'common.white',
                    bgcolor: 'rgba(255,255,255,0.14)',
                    backdropFilter: 'blur(6px)',
                    '& .MuiChip-icon': { color: 'common.white' },
                  }}
                />
              ))}
            </Stack>
          </m.div>

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <Button
                href={`mailto:${EMAIL}`}
                variant="contained"
                size="large"
                startIcon={<Iconify icon={'solar:letter-bold-duotone' as any} />}
                sx={{
                  px: 4,
                  py: 1.75,
                  fontSize: '1.05rem',
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                {EMAIL}
              </Button>

              <Button
                href={getWhatsAppUrl(currentLang.value)}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                startIcon={<Iconify icon={'mdi:whatsapp' as any} width={24} />}
                sx={{
                  px: 4,
                  py: 1.75,
                  fontSize: '1.05rem',
                  color: 'common.white',
                  bgcolor: '#25D366',
                  '&:hover': { bgcolor: '#1EBE5A' },
                }}
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </Button>

              <Stack direction="row" spacing={1}>
                {SOCIALS.map((social) => (
                  <Button
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    variant="outlined"
                    sx={{
                      minWidth: 52,
                      height: 52,
                      color: 'common.white',
                      borderColor: 'rgba(255,255,255,0.6)',
                      '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.12)' },
                    }}
                  >
                    <Iconify icon={social.icon as any} width={26} />
                  </Button>
                ))}
              </Stack>
            </Stack>
          </m.div>

          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ opacity: 0.85 }}>
              <Iconify icon={'solar:map-point-bold-duotone' as any} width={20} />
              <Typography variant="body2">Quito, Ecuador</Typography>
            </Stack>
          </m.div>
        </Stack>
      </Container>
    </Box>
  );
}
