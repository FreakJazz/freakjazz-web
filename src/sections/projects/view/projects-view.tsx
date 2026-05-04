import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { ProjectCard } from '../project-card';

// ----------------------------------------------------------------------

// TODO: Replace with your actual GitHub projects
const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory management, payment gateway integration, and advanced analytics. Built with microservices architecture for scalability.',
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Redis', 'Docker'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    githubUrl: 'https://github.com/FreakJazz',
    demoUrl: 'https://example.com',
  },
  {
    title: 'Task Management System',
    description:
      'Collaborative project management tool with Kanban boards, real-time updates, team chat, and advanced reporting. Supports agile methodologies and sprint planning.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    githubUrl: 'https://github.com/FreakJazz',
  },
  {
    title: 'Healthcare Management',
    description:
      'Hospital management system with patient records, appointment scheduling, telemedicine integration, and electronic prescriptions. HIPAA compliant with end-to-end encryption.',
    technologies: ['Angular', 'Python', 'Django', 'PostgreSQL', 'Azure'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    githubUrl: 'https://github.com/FreakJazz',
  },
  {
    title: 'Financial Analytics Dashboard',
    description:
      'Real-time financial analytics platform with interactive charts, predictive analytics using machine learning, and automated reporting for investment decisions.',
    technologies: ['React', 'Python', 'FastAPI', 'TensorFlow', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    githubUrl: 'https://github.com/FreakJazz',
    demoUrl: 'https://example.com',
  },
];

// ----------------------------------------------------------------------

export function ProjectsView() {
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
            position: 'relative',
          }),
        ]}
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
