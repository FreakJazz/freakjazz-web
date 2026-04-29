import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  color: string;
  period: string;
  company: string;
  achievements: string[];
};

export function ProjectCard({
  title,
  description,
  technologies,
  icon,
  color,
  period,
  company,
  achievements,
}: ProjectCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        height: '100%',
        bgcolor: alpha(theme.palette.grey[900], 0.02),
        border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        transition: 'all 0.3s',
        '&:hover': {
          bgcolor: alpha(color, 0.04),
          border: `1px solid ${alpha(color, 0.24)}`,
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[12],
        },
      }}
    >
      <Stack spacing={2.5}>
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
              bgcolor: alpha(color, 0.12),
              flexShrink: 0,
            }}
          >
            <Iconify icon={icon as any} width={32} sx={{ color }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {company}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {period}
            </Typography>
          </Box>
        </Stack>

        {/* Description */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>

        {/* Achievements */}
        {achievements.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Key Achievements:
            </Typography>
            <Stack spacing={1}>
              {achievements.map((achievement, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                  <Iconify
                    icon={'solar:check-circle-bold-duotone' as any}
                    width={20}
                    sx={{ color: 'success.main', flexShrink: 0, mt: 0.2 }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {achievement}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Technologies */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Technologies:
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: alpha(color, 0.08),
                  color,
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: alpha(color, 0.16),
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
