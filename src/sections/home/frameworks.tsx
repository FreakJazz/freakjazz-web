import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const frameworks = {
  frontend: [
    { name: 'React', icon: 'devicon:react', color: '#61DAFB' },
    { name: 'Next.js', icon: 'devicon:nextjs', color: '#000000' },
    { name: 'Angular', icon: 'devicon:angular', color: '#DD0031' },
    { name: 'React Native', icon: 'devicon:react', color: '#61DAFB' },
    { name: 'Material-UI', icon: 'devicon:materialui', color: '#0081CB' },
    { name: 'TypeScript', icon: 'devicon:typescript', color: '#3178C6' },
  ],
  backend: [
    { name: '.NET Core', icon: 'devicon:dotnetcore', color: '#512BD4' },
    { name: 'Django', icon: 'devicon:django', color: '#092E20' },
    { name: 'FastAPI', icon: 'devicon:fastapi', color: '#009688' },
    { name: 'Flask', icon: 'devicon:flask', color: '#000000' },
    { name: 'Node.js', icon: 'devicon:nodejs', color: '#339933' },
    { name: 'Spring Boot', icon: 'devicon:spring', color: '#6DB33F' },
  ],
  cloud: [
    { name: 'AWS', icon: 'devicon:amazonwebservices-wordmark', color: '#FF9900' },
    { name: 'Azure', icon: 'devicon:azure', color: '#0078D4' },
    { name: 'Docker', icon: 'devicon:docker', color: '#2496ED' },
    { name: 'Kubernetes', icon: 'devicon:kubernetes', color: '#326CE5' },
    { name: 'Firebase', icon: 'devicon:firebase', color: '#FFCA28' },
    { name: 'GitHub Actions', icon: 'devicon:githubactions', color: '#2088FF' },
  ],
  database: [
    { name: 'PostgreSQL', icon: 'devicon:postgresql', color: '#4169E1' },
    { name: 'MongoDB', icon: 'devicon:mongodb', color: '#47A248' },
    { name: 'SQL Server', icon: 'devicon:microsoftsqlserver', color: '#CC2927' },
    { name: 'Oracle', icon: 'devicon:oracle', color: '#F80000' },
    { name: 'Redis', icon: 'devicon:redis', color: '#DC382D' },
  ],
  tools: [
    { name: 'Git', icon: 'devicon:git', color: '#F05032' },
    { name: 'VS Code', icon: 'devicon:vscode', color: '#007ACC' },
    { name: 'Jira', icon: 'devicon:jira', color: '#0052CC' },
    { name: 'SonarQube', icon: 'devicon:sonarqube', color: '#4E9BCD' },
    { name: 'Figma', icon: 'devicon:figma', color: '#F24E1E' },
  ],
};

// ----------------------------------------------------------------------

export function Frameworks() {
  const theme = useTheme();
  const { t } = useTranslate();

  const renderSection = (title: string, items: typeof frameworks.frontend, colorScheme: string) => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
            <Card
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.grey[900], 0.02),
                border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
                transition: 'all 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: alpha(item.color, 0.08),
                  border: `1px solid ${alpha(item.color, 0.4)}`,
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(item.color, 0.12),
                  mb: 1.5,
                }}
              >
                <Iconify icon={item.icon as any} width={40} />
              </Box>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                {item.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Stack spacing={6}>
      {renderSection(t('frameworks.frontend'), frameworks.frontend, theme.palette.primary.main)}
      {renderSection(t('frameworks.backend'), frameworks.backend, theme.palette.success.main)}
      {renderSection(t('frameworks.cloudDevOps'), frameworks.cloud, theme.palette.info.main)}
      {renderSection(t('frameworks.databases'), frameworks.database, theme.palette.warning.main)}
      {renderSection(t('frameworks.tools'), frameworks.tools, theme.palette.error.main)}
    </Stack>
  );
}
