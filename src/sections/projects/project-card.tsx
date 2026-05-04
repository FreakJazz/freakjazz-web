import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string;
};

export function ProjectCard({
  title,
  description,
  technologies,
  image,
  githubUrl,
  demoUrl,
}: ProjectCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[20],
        },
      }}
    >
      {/* Project Image */}
      <CardMedia
        component="img"
        height="240"
        image={image}
        alt={title}
        sx={{
          objectFit: 'cover',
          bgcolor: 'grey.200',
        }}
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        {/* Title */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2, flexGrow: 1, lineHeight: 1.7 }}
        >
          {description}
        </Typography>

        {/* Technologies */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.16),
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<Iconify icon={'mdi:github' as any} />}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ flex: 1 }}
          >
            GitHub
          </Button>
          {demoUrl && (
            <Button
              variant="outlined"
              startIcon={<Iconify icon={'solar:link-bold-duotone' as any} />}
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ flex: 1 }}
            >
              Demo
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
