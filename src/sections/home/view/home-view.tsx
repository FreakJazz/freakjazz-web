import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Education } from '../education';
import { Languages } from '../languages';
import { Frameworks } from '../frameworks';
import { PersonalInterests } from '../personal-interests';
import { ProgrammingLanguages } from '../programming-languages';

// ----------------------------------------------------------------------

export function HomeView() {
  const theme = useTheme();
  const pageProgress = useScrollProgress();
  const { t } = useTranslate();

  const strengths = [
    {
      icon: 'solar:widget-3-bold-duotone',
      title: t('home.strength1Title'),
      description: t('home.strength1Text'),
    },
    {
      icon: 'solar:code-square-bold-duotone',
      title: t('home.strength2Title'),
      description: t('home.strength2Text'),
    },
    {
      icon: 'solar:cloud-bold-duotone',
      title: t('home.strength3Title'),
      description: t('home.strength3Text'),
    },
    {
      icon: 'solar:atom-bold-duotone',
      title: t('home.strength4Title'),
      description: t('home.strength4Text'),
    },
    {
      icon: 'solar:users-group-rounded-bold-duotone',
      title: t('home.strength5Title'),
      description: t('home.strength5Text'),
    },
  ];

  const technologies = {
    frontend: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Material-UI'],
    backend: ['.NET Core', 'Node.js', 'Python', 'Java', 'Microservices'],
    cloud: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
    database: ['PostgreSQL', 'MongoDB', 'SQL Server', 'Redis', 'DynamoDB'],
  };

  const companies = [
    { name: 'Government Sector', icon: 'solar:city-bold-duotone', color: 'primary' },
    { name: 'Financial Services', icon: 'solar:wallet-bold-duotone', color: 'success' },
    { name: 'Logistics', icon: 'solar:delivery-bold-duotone', color: 'warning' },
    { name: 'E-Commerce', icon: 'solar:cart-large-4-bold-duotone', color: 'info' },
  ];

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(thm) => ({ position: 'fixed', zIndex: thm.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 15, md: 20 },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.darker} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
        }}
      >
        <Container>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' } }}>
              {t('home.welcome')}
            </Typography>
            <Typography variant="h3" sx={{ opacity: 0.9 }}>
              {t('home.subtitle')}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 720, opacity: 0.85 }}>
              {t('home.description')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button
                component={RouterLink}
                href={paths.contact}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                {t('home.cta')}
              </Button>
              <Button
                component={RouterLink}
                href={paths.projects}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                {t('home.ctaProjects')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Personal Interests Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}
            >
              {t('personalInterests.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
            >
              {t('personalInterests.subtitle')}
            </Typography>
          </Stack>
          <PersonalInterests />
        </Container>
      </Box>

      {/* Education Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.neutral',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}
            >
              {t('education.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
            >
              {t('education.subtitle')}
            </Typography>
          </Stack>
          <Education />
        </Container>
      </Box>

      {/* Languages Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}
            >
              {t('languages.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
            >
              {t('languages.subtitle')}
            </Typography>
          </Stack>
          <Languages />
        </Container>
      </Box>

      {/* Professional Summary Section */}
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
              }}
            >
              {t('home.summaryText')}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Key Strengths Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
        <Container>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center', mb: 6 }}
          >
            {t('home.strengthsTitle')}
          </Typography>
          <Grid container spacing={3}>
            {strengths.map((strength, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[10],
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      <Iconify
                        icon={strength.icon as any}
                        width={64}
                        sx={{ color: 'primary.main' }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {strength.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {strength.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Technologies Section */}
      <Box id="technologies" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center', mb: 6 }}
          >
            {t('home.technologiesTitle')}
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify
                      icon={'solar:monitor-bold-duotone' as any}
                      width={32}
                      sx={{ color: 'primary.main' }}
                    />
                    <Typography variant="h5">{t('home.techFrontend')}</Typography>
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {technologies.frontend.map((tech) => (
                      <Chip key={tech} label={tech} color="primary" variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify
                      icon={'solar:server-bold-duotone' as any}
                      width={32}
                      sx={{ color: 'success.main' }}
                    />
                    <Typography variant="h5">{t('home.techBackend')}</Typography>
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {technologies.backend.map((tech) => (
                      <Chip key={tech} label={tech} color="success" variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify
                      icon={'solar:cloud-bold-duotone' as any}
                      width={32}
                      sx={{ color: 'info.main' }}
                    />
                    <Typography variant="h5">{t('home.techCloud')}</Typography>
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {technologies.cloud.map((tech) => (
                      <Chip key={tech} label={tech} color="info" variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify
                      icon={'solar:database-bold-duotone' as any}
                      width={32}
                      sx={{ color: 'warning.main' }}
                    />
                    <Typography variant="h5">{t('home.techDatabase')}</Typography>
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {technologies.database.map((tech) => (
                      <Chip key={tech} label={tech} color="warning" variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Interactive Code Playground Section */}
      {/* <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}
            >
              {t('snakeGame.sectionTitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
            >
              {t('snakeGame.sectionSubtitle')}
            </Typography>
          </Stack>
          <SnakeGame />
        </Container>
      </Box> */}

      {/* Programming Languages Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.neutral',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}
            >
              {t('programmingLanguages.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
            >
              {t('programmingLanguages.subtitle')}
            </Typography>
          </Stack>
          <ProgrammingLanguages />
        </Container>
      </Box>

      {/* Frameworks & Tools Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}
            >
              {t('frameworks.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }}
            >
              {t('frameworks.subtitle')}
            </Typography>
          </Stack>
          <Frameworks />
        </Container>
      </Box>

      {/* Trust Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
        }}
      >
        <Container>
          <Stack spacing={6} alignItems="center">
            <Stack spacing={2} textAlign="center">
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                {t('home.trustTitle')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600 }}>
                {t('home.trustSubtitle')}
              </Typography>
            </Stack>
            <Grid container spacing={3} sx={{ maxWidth: 900 }}>
              {companies.map((company, index) => (
                <Grid key={index} size={{ xs: 6, sm: 3 }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 3,
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Iconify
                      icon={company.icon as any}
                      width={48}
                      sx={{ color: `${company.color}.main`, mb: 2 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {company.name}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.darker} 100%)`,
          color: 'white',
        }}
      >
        <Container>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
              {t('home.ctaFinal')}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600 }}>
              Let&apos;s discuss how I can help transform your ideas into robust, scalable solutions
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                href={paths.contact}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                {t('home.ctaFinalButton')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
