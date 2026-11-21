import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProductCardProps = {
  title: string;
  description: string;
  url: string;
  domain: string;
  icon: string;
  tags: string[];
  cta: string;
  gradient: [string, string];
  image?: string; // optional screenshot, can be added later
};

export function ProductCard({
  title,
  description,
  url,
  domain,
  icon,
  tags,
  cta,
  gradient,
  image,
}: ProductCardProps) {
  const theme = useTheme();

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      sx={{
        height: '100%',
        perspective: 1000,
        transformStyle: 'preserve-3d',
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
        boxShadow: theme.shadows[8],
        '&:hover': { boxShadow: theme.shadows[24] },
      }}
    >
      {/* Browser-like preview */}
      <Box
        sx={{
          height: 240,
          position: 'relative',
          background: image
            ? `url(${image}) top center / cover no-repeat`
            : `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!image && (
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            right: 14,
            height: 28,
            borderRadius: 1,
            bgcolor: alpha('#fff', 0.2),
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            gap: 0.75,
          }}
        >
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }} />
          ))}
          <Typography variant="caption" sx={{ ml: 1.5, color: 'common.white', opacity: 0.9 }}>
            {domain}
          </Typography>
        </Box>
        )}

        {!image && <Iconify icon={icon as any} width={96} sx={{ color: 'common.white', opacity: 0.95 }} />}
      </Box>

      <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" component="h3" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1, lineHeight: 1.7 }}>
          {description}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" variant="soft" />
          ))}
        </Stack>
        <Button
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          size="large"
          endIcon={<Iconify icon={'solar:arrow-right-up-linear' as any} />}
        >
          {cta}
        </Button>
      </Stack>
    </Box>
  );
}
