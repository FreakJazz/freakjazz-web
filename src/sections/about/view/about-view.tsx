import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { getCvDownload } from 'src/utils/cv';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { SeoHead, BreadcrumbSchema, ProfilePageSchema } from 'src/components/seo';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Languages } from '../../home/languages';
import { PersonalInterests } from '../../home/personal-interests';

// ----------------------------------------------------------------------

type SectionProps = {
  title: string;
  subtitle?: string;
  bgcolor: string;
  children: React.ReactNode;
};

function Section({ title, subtitle, bgcolor, children }: SectionProps) {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
        {children}
      </Container>
    </Box>
  );
}

const PERKS = [
  { key: 'contact.perk1', icon: 'solar:code-square-bold-duotone' },
  { key: 'contact.perk2', icon: 'solar:atom-bold-duotone' },
  { key: 'contact.perk3', icon: 'solar:rocket-2-bold-duotone' },
];

const PHILOSOPHY = [
  { key: 'philosophy1', icon: 'solar:target-bold-duotone' },
  { key: 'philosophy2', icon: 'solar:shield-check-bold-duotone' },
  { key: 'philosophy3', icon: 'solar:users-group-rounded-bold-duotone' },
  { key: 'philosophy4', icon: 'solar:atom-bold-duotone' },
];

// ----------------------------------------------------------------------

export function AboutView() {
  const pageProgress = useScrollProgress();
  const { t, currentLang } = useTranslate();
  const cv = getCvDownload(currentLang.value);

  return (
    <>
      <SeoHead
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords={t('seo.keywords')}
        url="https://freakjazz.com/about"
        type="website"
        lang={currentLang.value as 'en' | 'es'}
      />

      <ProfilePageSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://freakjazz.com/' },
          { name: t('common.about'), url: 'https://freakjazz.com/about' },
        ]}
      />

      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(thm) => ({ position: 'fixed', zIndex: thm.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      <Box
        sx={[
          (thm) => ({
            ...thm.mixins.bgGradient({
              images: [
                `linear-gradient(135deg, ${varAlpha(thm.vars.palette.primary.darkerChannel, 0.5)}, ${varAlpha(thm.vars.palette.primary.mainChannel, 0.3)})`,
                `url(${CONFIG.images.about})`,
              ],
            }),
            py: { xs: 15, md: 20 },
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center 62%',
            color: 'white',
          }),
        ]}
      >
        <Container>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
              {t('about.title')}
            </Typography>
            <Typography variant="h5" sx={{ maxWidth: 800, opacity: 0.9 }}>
              {t('about.subtitle')}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Professional story */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              {t('about.storyTitle')}
            </Typography>
            {['story1', 'story2', 'story3'].map((key) => (
              <Typography
                key={key}
                variant="body1"
                sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'text.secondary', lineHeight: 1.9 }}
              >
                {t(`about.${key}`)}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Work philosophy */}
      <Section
        title={t('about.philosophyTitle')}
        subtitle={t('about.philosophySubtitle')}
        bgcolor="background.default"
      >
        <Grid container spacing={3}>
          {PHILOSOPHY.map((item) => (
            <Grid key={item.key} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Iconify
                    icon={item.icon as any}
                    width={56}
                    sx={{ color: 'primary.main', mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    {t(`about.${item.key}Title`)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t(`about.${item.key}Text`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        title={t('languages.title')}
        subtitle={t('languages.subtitle')}
        bgcolor="background.default"
      >
        <Languages />
      </Section>

      <Section
        title={t('about.personalityTitle')}
        subtitle={t('personalInterests.subtitle')}
        bgcolor="background.neutral"
      >
        <PersonalInterests />
      </Section>

      {/* Articles (Medium) */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box
            component={m.div}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
              p: { xs: 4, md: 8 },
              color: 'common.white',
              background: 'linear-gradient(135deg, #0b0b0b 0%, #1f1f1f 55%, #3a3a3a 100%)',
              boxShadow: (theme) => theme.shadows[24],
            }}
          >
            <Iconify
              icon={'mdi:medium' as any}
              sx={{
                position: 'absolute',
                right: { xs: -40, md: 40 },
                bottom: { xs: -40, md: -30 },
                width: { xs: 220, md: 340 },
                height: { xs: 220, md: 340 },
                opacity: 0.08,
              }}
            />

            <Stack spacing={3} sx={{ position: 'relative', maxWidth: 640 }}>
              <Chip
                icon={<Iconify icon={'mdi:medium' as any} width={20} />}
                label="Medium"
                sx={{
                  alignSelf: 'flex-start',
                  color: 'common.white',
                  bgcolor: 'rgba(255,255,255,0.14)',
                  '& .MuiChip-icon': { color: 'common.white' },
                }}
              />
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                {t('about.articlesTitle')}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.85, lineHeight: 1.7 }}>
                {t('about.articlesText')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Button
                  href="https://medium.com/@jazzrb2307"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  endIcon={<Iconify icon={'solar:arrow-right-up-linear' as any} />}
                  sx={{
                    px: 4,
                    bgcolor: 'common.white',
                    color: 'grey.900',
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                >
                  {t('about.articlesButton')}
                </Button>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {t('about.articlesSoon')}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Final call to action */}
      <Box sx={{ pb: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box
            component={m.div}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            sx={(theme) => ({
              borderRadius: 4,
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              color: 'common.white',
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 60%, ${theme.palette.secondary.main})`,
              boxShadow: theme.shadows[24],
            })}
          >
            <Stack spacing={3} alignItems="center">
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.25rem' } }}>
                {t('about.ctaTitle')}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: 640 }}>
                {t('about.ctaText')}
              </Typography>

              <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.5}>
                {PERKS.map((perk) => (
                  <Chip
                    key={perk.key}
                    icon={<Iconify icon={perk.icon as any} width={20} />}
                    label={t(perk.key)}
                    sx={{
                      color: 'common.white',
                      bgcolor: 'rgba(255,255,255,0.18)',
                      '& .MuiChip-icon': { color: 'common.white' },
                    }}
                  />
                ))}
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                <Button
                  component={RouterLink}
                  href={paths.contact}
                  variant="contained"
                  size="large"
                  startIcon={<Iconify icon={'solar:letter-bold-duotone' as any} />}
                  sx={{
                    px: 4,
                    py: 1.75,
                    fontSize: '1.05rem',
                    bgcolor: 'common.white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  {t('home.cta')}
                </Button>
                <Button
                  href={cv.url}
                  download={cv.filename}
                  variant="outlined"
                  size="large"
                  startIcon={<Iconify icon={'solar:download-bold-duotone' as any} />}
                  sx={{
                    px: 4,
                    py: 1.75,
                    fontSize: '1.05rem',
                    color: 'common.white',
                    borderColor: 'rgba(255,255,255,0.7)',
                    '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  {t('common.downloadCV')}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
