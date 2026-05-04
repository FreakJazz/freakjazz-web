import type { Theme, SxProps } from '@mui/material/styles';
import type { NavItemDataProps } from '../types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useRouter, usePathname } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type BottomNavMobileProps = {
  data: NavItemDataProps[];
  sx?: SxProps<Theme>;
};

export function BottomNavMobile({ data, sx }: BottomNavMobileProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentLang } = useTranslate();

  const cvUrl =
    currentLang.value === 'es'
      ? '/assets/cv/jazmin-rodriguez-cv-es.pdf'
      : '/assets/cv/jazmin-rodriguez-cv-en.pdf';

  const isActive = (path: string) => pathname === path;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Paper
      elevation={8}
      sx={[
        {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          borderRadius: 0,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          height: 70,
          alignItems: 'center',
          justifyContent: 'space-around',
          px: 1,
        }}
      >
        {/* First 2 nav items */}
        {data.slice(0, 2).map((item) => (
          <Box
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: isActive(item.path) ? 'primary.main' : 'text.secondary',
              transition: 'all 0.2s',
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <Box sx={{ fontSize: 24 }}>{item.icon}</Box>
            <Box
              sx={{
                fontSize: '0.65rem',
                fontWeight: isActive(item.path) ? 600 : 400,
                textAlign: 'center',
              }}
            >
              {item.title}
            </Box>
          </Box>
        ))}

        {/* CV Download Button - Highlighted in center */}
        <Button
          variant="contained"
          href={cvUrl}
          download
          sx={{
            minWidth: 56,
            height: 56,
            borderRadius: '50%',
            boxShadow: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.3,
            mx: 1,
            '&:hover': {
              boxShadow: 6,
              transform: 'scale(1.05)',
            },
          }}
        >
          <Iconify icon={'solar:download-bold-duotone' as any} width={24} />
          <Box sx={{ fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase' }}>CV</Box>
        </Button>

        {/* Last 2 nav items */}
        {data.slice(2, 4).map((item) => (
          <Box
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: isActive(item.path) ? 'primary.main' : 'text.secondary',
              transition: 'all 0.2s',
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <Box sx={{ fontSize: 24 }}>{item.icon}</Box>
            <Box
              sx={{
                fontSize: '0.65rem',
                fontWeight: isActive(item.path) ? 600 : 400,
                textAlign: 'center',
              }}
            >
              {item.title}
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
