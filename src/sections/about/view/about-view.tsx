import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { SeoHead, BreadcrumbSchema, ProfilePageSchema } from 'src/components/seo';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Education } from '../../home/education';
import { Languages } from '../../home/languages';
import { PersonalInterests } from '../../home/personal-interests';

// ----------------------------------------------------------------------

type SectionProps = {
  title: string;
  subtitle: string;
  bgcolor: string;
  children: React.ReactNode;
};

function Section({ title, subtitle, bgcolor, children }: SectionProps) {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor }}>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
          >
            {subtitle}
          </Typography>
        </Stack>
        {children}
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function AboutView() {
  const pageProgress = useScrollProgress();
  const { t, currentLang } = useTranslate();

  const cvUrl =
    currentLang.value === 'es'
      ? '/assets/cv/jazmin-rodriguez-cv-es.pdf'
      : '/assets/cv/jazmin-rodriguez-cv-en.pdf';

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
                `url(${CONFIG.images.projects})`,
              ],
            }),
            py: { xs: 15, md: 20 },
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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

      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
        <Container>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              {t('home.summaryTitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 900,
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'text.secondary',
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
                textAlign: { xs: 'left', md: 'center' },
              }}
            >
              {t('home.summaryText')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component="a" href={cvUrl} download variant="contained" size="large">
                {t('common.downloadCV')}
              </Button>
              <Button component={RouterLink} href={paths.contact} variant="outlined" size="large">
                {t('home.cta')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Section
        title={t('education.title')}
        subtitle={t('education.subtitle')}
        bgcolor="background.default"
      >
        <Education />
      </Section>

      <Section
        title={t('languages.title')}
        subtitle={t('languages.subtitle')}
        bgcolor="background.neutral"
      >
        <Languages />
      </Section>

      <Section
        title={t('personalInterests.title')}
        subtitle={t('personalInterests.subtitle')}
        bgcolor="background.default"
      >
        <PersonalInterests />
      </Section>
    </>
  );
}
