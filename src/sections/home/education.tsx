import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const education = [
  {
    degree: 'Master in Software Engineering',
    institution: 'Universidad Internacional de la Rioja (UNIR)',
    period: '2023 - 2024',
    location: 'Spain',
    icon: 'solar:diploma-bold-duotone',
    color: '#078DEE',
    description: 'Specialization in cloud architecture, DevOps, and agile methodologies',
  },
  {
    degree: 'Software Engineering',
    institution: 'Escuela Politécnica Nacional (EPN)',
    period: '2012 - 2019',
    location: 'Quito, Ecuador',
    icon: 'solar:book-bold-duotone',
    color: '#00AB55',
    description: 'Focus on software development, databases, and systems architecture',
  },
];

// ----------------------------------------------------------------------

export function Education() {
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      {education.map((edu, index) => (
        <Card
          key={index}
          sx={{
            p: 3,
            bgcolor: alpha(theme.palette.grey[900], 0.02),
            border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
            transition: 'all 0.3s',
            '&:hover': {
              bgcolor: alpha(edu.color, 0.04),
              border: `1px solid ${alpha(edu.color, 0.24)}`,
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <Stack spacing={2}>
            {/* Header */}
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(edu.color, 0.12),
                  flexShrink: 0,
                }}
              >
                <Iconify icon={edu.icon as any} width={32} sx={{ color: edu.color }} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {edu.degree}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  {edu.institution}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 1, color: 'text.secondary', flexWrap: 'wrap' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Iconify icon={'solar:calendar-bold-duotone' as any} width={18} />
                    <Typography variant="body2">{edu.period}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Iconify icon={'solar:map-point-bold-duotone' as any} width={18} />
                    <Typography variant="body2">{edu.location}</Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>

            {/* Description */}
            <Typography variant="body2" sx={{ color: 'text.secondary', pl: 9 }}>
              {edu.description}
            </Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
