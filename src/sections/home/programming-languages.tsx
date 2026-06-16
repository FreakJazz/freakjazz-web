import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type SkillLevel = 'Junior' | 'Middle' | 'Senior';

const languages = [
  {
    name: 'C#',
    level: 'Senior' as SkillLevel,
    percentage: 95,
    icon: 'devicon:csharp',
    color: '#239120',
  },
  {
    name: 'Go',
    level: 'Middle' as SkillLevel,
    percentage: 75,
    icon: 'devicon:go',
    color: '#00ADD8',
  },
  {
    name: 'Python',
    level: 'Senior' as SkillLevel,
    percentage: 90,
    icon: 'devicon:python',
    color: '#3776AB',
  },
  {
    name: 'JavaScript',
    level: 'Senior' as SkillLevel,
    percentage: 95,
    icon: 'devicon:javascript',
    color: '#F7DF1E',
  },
  {
    name: 'TypeScript',
    level: 'Senior' as SkillLevel,
    percentage: 90,
    icon: 'devicon:typescript',
    color: '#3178C6',
  },
  {
    name: 'Java',
    level: 'Middle' as SkillLevel,
    percentage: 75,
    icon: 'devicon:java',
    color: '#007396',
  },
  {
    name: 'SQL',
    level: 'Senior' as SkillLevel,
    percentage: 90,
    icon: 'devicon:postgresql',
    color: '#4169E1',
  },
  {
    name: 'PL/SQL',
    level: 'Senior' as SkillLevel,
    percentage: 85,
    icon: 'devicon:oracle',
    color: '#F80000',
  },
];

// ----------------------------------------------------------------------

export function ProgrammingLanguages() {
  const theme = useTheme();

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'Senior':
        return theme.palette.success.main;
      case 'Middle':
        return theme.palette.info.main;
      case 'Junior':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Stack spacing={3}>
      {languages.map((lang, index) => (
        <Card
          key={index}
          sx={{
            p: 3,
            bgcolor: alpha(theme.palette.grey[900], 0.02),
            border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
            transition: 'all 0.3s',
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <Stack spacing={2}>
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(lang.color, 0.1),
                  }}
                >
                  <Iconify icon={lang.icon as any} width={32} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {lang.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: getLevelColor(lang.level),
                      fontWeight: 600,
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.5,
                      bgcolor: alpha(getLevelColor(lang.level), 0.12),
                    }}
                  >
                    {lang.level}
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                {lang.percentage}%
              </Typography>
            </Stack>

            {/* Progress Bar */}
            <LinearProgress
              variant="determinate"
              value={lang.percentage}
              sx={{
                height: 8,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.grey[500], 0.12),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1,
                  bgcolor: lang.color,
                },
              }}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
