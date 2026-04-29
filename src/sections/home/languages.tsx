import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const languages = [
  {
    name: 'Español',
    level: 'Native',
    percentage: 100,
    icon: 'circle-flags:es',
    color: '#F1BF00',
  },
  {
    name: 'English',
    level: 'Advanced',
    percentage: 70,
    icon: 'circle-flags:us',
    color: '#078DEE',
  },
  {
    name: 'Русский',
    level: 'Intermediate',
    percentage: 40,
    icon: 'circle-flags:ru',
    color: '#D52B1E',
  },
  {
    name: 'Deutsch',
    level: 'Basic',
    percentage: 10,
    icon: 'circle-flags:de',
    color: '#FFCE00',
  },
];

// ----------------------------------------------------------------------

export function Languages() {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {languages.map((language, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              p: 3,
              height: '100%',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: theme.shadows[12],
              },
            }}
          >
            <Stack spacing={2} alignItems="center">
              {/* Flag Icon */}
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  display: 'flex',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(language.color, 0.08),
                }}
              >
                <Iconify icon={language.icon as any} width={48} />
              </Box>

              {/* Language Name */}
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                {language.name}
              </Typography>

              {/* Level Badge */}
              <Typography
                variant="caption"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  color: language.color,
                  bgcolor: alpha(language.color, 0.12),
                  fontWeight: 600,
                }}
              >
                {language.level}
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={language.percentage}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.grey[500], 0.12),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: language.color,
                      borderRadius: 1,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  {language.percentage}%
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
