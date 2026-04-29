import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function PersonalInterests() {
  const { t } = useTranslate();

  const interests = [
    {
      icon: 'solar:atom-bold-duotone',
      titleKey: 'personalInterests.research',
      descriptionKey: 'personalInterests.researchDesc',
      color: '#078DEE',
    },
    {
      icon: 'game-icons:chess-queen',
      titleKey: 'personalInterests.chess',
      descriptionKey: 'personalInterests.chessDesc',
      color: '#7635DC',
    },
    {
      icon: 'solar:leaf-bold-duotone',
      titleKey: 'personalInterests.nature',
      descriptionKey: 'personalInterests.natureDesc',
      color: '#00AB55',
    },
    {
      icon: 'mdi:guitar-acoustic',
      titleKey: 'personalInterests.guitar',
      descriptionKey: 'personalInterests.guitarDesc',
      color: '#FF6B6B',
    },
    {
      icon: 'solar:cup-hot-bold-duotone',
      titleKey: 'personalInterests.coffee',
      descriptionKey: 'personalInterests.coffeeDesc',
      color: '#8B4513',
    },
  ];

  return (
    <Grid container spacing={3}>
      {interests.map((interest, index) => (
        <Grid
          key={index}
          size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 280,
              perspective: '1000px',
              '&:hover .flip-card-inner': {
                transform: 'rotateY(180deg)',
              },
            }}
          >
            <Box
              className="flip-card-inner"
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front Side */}
              <Card
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  p: 3,
                  textAlign: 'center',
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      display: 'flex',
                      borderRadius: '16px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(interest.color, 0.12),
                    }}
                  >
                    <Iconify
                      icon={interest.icon as any}
                      width={40}
                      sx={{ color: interest.color }}
                    />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {t(interest.titleKey)}
                  </Typography>
                </Stack>
              </Card>

              {/* Back Side */}
              <Card
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  p: 2.5,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(interest.color, 0.08),
                  border: `2px solid ${alpha(interest.color, 0.24)}`,
                }}
              >
                <Stack spacing={1.5} alignItems="center" textAlign="center">
                  <Iconify icon={interest.icon as any} width={32} sx={{ color: interest.color }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: interest.color,
                    }}
                  >
                    {t(interest.titleKey)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.7rem',
                      lineHeight: 1.4,
                      color: 'text.secondary',
                    }}
                  >
                    {t(interest.descriptionKey)}
                  </Typography>
                </Stack>
              </Card>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
