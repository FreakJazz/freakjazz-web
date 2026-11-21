import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Bilingual = { es: string; en: string };

/**
 * Levels follow the CEFR scale (Common European Framework of Reference):
 * A1 beginner · A2 elementary · B1 intermediate · B2 upper-intermediate · C1 advanced · C2 proficient · Native.
 */
const languages: {
  name: Bilingual;
  code: string;
  description: Bilingual;
  percentage: number;
  icon: string;
  color: string;
}[] = [
  {
    name: { es: 'Español', en: 'Spanish' },
    code: 'Native',
    description: { es: 'Lengua nativa', en: 'Native language' },
    percentage: 100,
    icon: 'circle-flags:es',
    color: '#F1BF00',
  },
  {
    name: { es: 'Inglés', en: 'English' },
    code: 'B2',
    description: { es: 'Intermedio alto', en: 'Upper-intermediate' },
    percentage: 70,
    icon: 'circle-flags:us',
    color: '#078DEE',
  },
  {
    name: { es: 'Ruso', en: 'Russian' },
    code: 'A2',
    description: { es: 'Elemental', en: 'Elementary' },
    percentage: 35,
    icon: 'circle-flags:ru',
    color: '#D52B1E',
  },
  {
    name: { es: 'Alemán', en: 'German' },
    code: 'A1',
    description: { es: 'Principiante', en: 'Beginner' },
    percentage: 15,
    icon: 'circle-flags:de',
    color: '#E6A800',
  },
];

// ----------------------------------------------------------------------

export function Languages() {
  const theme = useTheme();
  const { currentLang } = useTranslate();
  const lang = currentLang.value === 'en' ? 'en' : 'es';

  return (
    <Grid container spacing={3}>
      {languages.map((language) => (
        <Grid key={language.code + language.name.en} size={{ xs: 12, sm: 6, md: 3 }}>
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
                {language.name[lang]}
              </Typography>

              {/* Level badge (CEFR) */}
              <Typography
                variant="subtitle1"
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  color: language.color,
                  bgcolor: alpha(language.color, 0.14),
                  fontWeight: 800,
                  letterSpacing: 0.5,
                }}
              >
                {language.code === 'Native' ? (lang === 'es' ? 'Nativo' : 'Native') : language.code}
              </Typography>

              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {language.description[lang]}
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
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
