import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { ProjectCard } from '../project-card';

// ----------------------------------------------------------------------

// TODO: Replace with your actual GitHub projects
const projects = [
  {
    title: 'Project Name 1',
    company: 'Company Name',
    period: '2024 - Present',
    description:
      'Brief description of your project. What problem does it solve? What technologies did you use?',
    technologies: ['React', 'TypeScript', 'Node.js'],
    icon: 'solar:code-bold-duotone',
    color: '#078DEE',
    achievements: [
      'Key achievement or feature 1',
      'Key achievement or feature 2',
      'Key achievement or feature 3',
    ],
  },
  {
    title: 'Project Name 2',
    company: 'Company Name',
    period: '2023 - 2024',
    description:
      'Brief description of your project. What problem does it solve? What technologies did you use?',
    technologies: ['Python', 'Django', 'PostgreSQL'],
    icon: 'solar:programming-bold-duotone',
    color: '#00AB55',
    achievements: [
      'Key achievement or feature 1',
      'Key achievement or feature 2',
      'Key achievement or feature 3',
    ],
  },
  {
    title: 'Project Name 3',
    company: 'Company Name',
    period: '2022 - 2023',
    description:
      'Brief description of your project. What problem does it solve? What technologies did you use?',
    technologies: ['Angular', 'Java', 'Spring Boot'],
    icon: 'solar:widget-bold-duotone',
    color: '#FF9800',
    achievements: [
      'Key achievement or feature 1',
      'Key achievement or feature 2',
      'Key achievement or feature 3',
    ],
  },
];

// ----------------------------------------------------------------------

export function ProjectsView() {
  const theme = useTheme();
  const pageProgress = useScrollProgress();
  const { t } = useTranslate();

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
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.darker} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
        }}
      >
        <Container>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
              {t('projects.title')}
            </Typography>
            <Typography variant="h5" sx={{ maxWidth: 800, opacity: 0.9 }}>
              {t('projects.subtitle')}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Projects Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container>
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid key={index} size={{ xs: 12, md: 6 }}>
                <ProjectCard {...project} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
