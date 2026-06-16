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

// Real GitHub projects
const projects = [
  {
    title: 'Backbone - Clean Architecture & CQRS',
    description:
      'Shared core library for Python and Go microservices. Provides infrastructure, specifications, repositories, event handling, logging with structured JSON, and standardized error codes. Includes dynamic filters, pagination, and response contracts for consistent API design.',
    technologies: ['Python', 'Go', 'FastAPI', 'Flask', 'SQLAlchemy', 'Kafka', 'RabbitMQ'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    githubUrl: 'https://github.com/FreakJazz/backbone',
  },
  {
    title: 'Chatbot Web - Flask + Gemini AI',
    description:
      'Interactive web chatbot powered by Google Gemini AI. Built with Flask and Bootstrap 5, featuring real-time chat simulation, SQLite message persistence, conversation history management, and environment-based API configuration.',
    technologies: ['Python', 'Flask', 'Google Gemini AI', 'SQLite', 'Bootstrap 5', 'HTML/CSS'],
    image:
      'https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2F4mk79h8zzvig307amaav.png',
    githubUrl: 'https://github.com/FreakJazz/chatbot-flask',
  },
  {
    title: 'React Template - Next.js & MUI',
    description:
      'Professional React template built with Next.js framework and Material-UI library. Includes Vite configuration for optimized development, TypeScript support, and reusable components for rapid application development.',
    technologies: ['React', 'Next.js', 'TypeScript', 'MUI', 'Vite'],
    image:
      'https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/68da31df35a45866e0463fde_best-react-component-libraries-cover.webp',
    githubUrl: 'https://github.com/FreakJazz/React_template',
  },
  {
    title: 'Valve Opening Control - Arduino IoT',
    description:
      'Embedded IoT system for automatic valve control using Arduino and stepper motor. Features LCD display for real-time valve opening percentage, potentiometer calibration, gear-based mechanical design, and flow monitoring via oscilloscope.',
    technologies: ['Arduino', 'C++', 'Embedded Systems', 'IoT', 'Electronics'],
    image: 'https://github.com/FreakJazz/Valve-Opening-Control/raw/master/images/Result6.jpg',
    githubUrl: 'https://github.com/FreakJazz/Valve-Opening-Control',
  },
  {
    title: 'Pandas Data Processing Interface',
    description:
      'Web-based interface for advanced data manipulation and analysis using Pandas. Enables users to perform complex data transformations, filtering, and aggregations through an intuitive web UI.',
    technologies: ['Python', 'Pandas', 'Flask', 'HTML/CSS', 'Data Analysis'],
    image: 'https://liora.io/app/uploads/sites/9/2026/02/pandas-library-python-data-science.jpg',
    githubUrl: 'https://github.com/FreakJazz/Pandas-web-interface',
  },
  {
    title: 'PyQt Pandas Interface',
    description:
      'Desktop application for Pandas data manipulation using PyQt framework. Provides rich GUI for data processing, visualization, and export with professional desktop interface capabilities.',
    technologies: ['Python', 'PyQt', 'Pandas', 'GUI', 'Data Analysis'],
    image:
      'https://github.com/FreakJazz/PyQt-Interface-with-PANDAS-.csv-files/raw/master/Images/interface.PNG',
    githubUrl: 'https://github.com/FreakJazz/PANDAS-PyQt-Interface',
  },
  {
    title: 'Neuron Diseases Analysis - ACAT',
    description:
      'Medical research application for analyzing neuron diseases using AI and machine learning. Processes clinical data to identify patterns and support diagnostic decision-making.',
    technologies: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science', 'NumPy'],
    image:
      'https://github.com/FreakJazz/COMMUNICATION-PROTOTYPE-FOR-PEOPLE-WITH-ENGINE-NEURON-DISEASES-ACAT-/raw/master/images/result2.PNG',
    githubUrl: 'https://github.com/FreakJazz/NEURON-DISEASES-ACAT-',
  },
  {
    title: 'Automatic Pet Food Dispenser',
    description:
      'IoT-based automated pet food dispenser with scheduled feeding, portion control, and remote monitoring. Built with embedded systems and mobile connectivity for pet care automation.',
    technologies: ['Arduino', 'IoT', 'Python', 'Electronics', 'Embedded Systems'],
    image: 'https://github.com/FreakJazz/Automatic-Pet-Food-Dispenser/raw/master/images/pet1.jpg',
    githubUrl: 'https://github.com/FreakJazz/Automatic-Pet-Food-Dispenser',
  },
  {
    title: 'ESP32 MQTT IoT Interface',
    description:
      'IoT connectivity solution using ESP32 microcontroller with MQTT protocol. Includes Python interface with Tkinter GUI for monitoring and controlling IoT devices in real-time.',
    technologies: ['ESP32', 'MQTT', 'Python', 'Tkinter', 'IoT', 'C++'],
    image:
      'https://github.com/FreakJazz/ESP32-connection-with-MQTT-python-interface-tkinter/raw/master/images/Interface.JPG',
    githubUrl: 'https://github.com/FreakJazz/ESP32-connection-with-MQTT-python-interface-tkinter',
  },
  {
    title: 'Electrodes Data Application',
    description:
      'Specialized application for processing and analyzing electrode data. Includes signal processing, data visualization, and medical/scientific data management capabilities.',
    technologies: ['Python', 'Signal Processing', 'Data Visualization', 'NumPy', 'SciPy'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    githubUrl: 'https://github.com/FreakJazz/electrodes_app',
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
