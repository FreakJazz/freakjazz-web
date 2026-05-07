import type { NavMainProps } from '../types';

import { useState } from 'react';
import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';
import { LanguagePopover } from 'src/layouts/components/language-popover';
import { ThemeToggleButton } from 'src/layouts/components/theme-toggle-button';

import { Iconify } from 'src/components/iconify';
import { AnimatedLogo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavList } from '../desktop/nav-desktop-list';

// ----------------------------------------------------------------------

const languagesData = [
  { value: 'en', label: 'English', countryCode: 'gb' },
  { value: 'es', label: 'Español', countryCode: 'ec' },
];

const NAV_WIDTH_FULL = 280;
const NAV_WIDTH_ICONS = 88;
const NAV_WIDTH_HIDDEN = 0;

type NavState = 0 | 1 | 2; // 0: hidden, 1: icons only, 2: full

const getDrawerWidth = (state: NavState) => {
  if (state === 0) return NAV_WIDTH_HIDDEN;
  if (state === 1) return NAV_WIDTH_ICONS;
  return NAV_WIDTH_FULL;
};

const StyledDrawer = styled(Drawer)<{ navState: NavState }>(({ theme, navState }) => ({
  width: getDrawerWidth(navState),
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: getDrawerWidth(navState),
    boxSizing: 'border-box',
    borderRight:
      navState === 0
        ? 'none'
        : `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
    backgroundColor: theme.vars.palette.background.default,
    transition: theme.transitions.create(['width', 'border'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    overflow: navState === 0 ? 'hidden' : 'visible',
  },
}));

// ----------------------------------------------------------------------

export type NavSidebarProps = NavMainProps & {
  open?: boolean;
  onClose?: () => void;
};

export function NavSidebar({ data, sx, ...other }: NavSidebarProps) {
  const theme = useTheme();
  const { t, currentLang } = useTranslate();
  const [navState, setNavState] = useState<NavState>(2); // Start with full sidebar

  const cvUrl =
    currentLang.value === 'es' ? import.meta.env.VITE_CV_URL_ES : import.meta.env.VITE_CV_URL_EN;

  const cycleNavState = () => {
    setNavState((prev) => ((prev + 1) % 3) as NavState);
  };

  const isHidden = navState === 0;
  const isIconsOnly = navState === 1;
  const isFull = navState === 2;

  return (
    <>
      {/* Floating toggle button when sidebar is hidden */}
      {isHidden && (
        <IconButton
          onClick={cycleNavState}
          sx={{
            position: 'fixed',
            left: 16,
            top: 16,
            zIndex: 1300,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[8],
            '&:hover': {
              bgcolor: 'background.neutral',
            },
          }}
        >
          <Iconify icon={'eva:menu-fill' as any} width={24} />
        </IconButton>
      )}

      <StyledDrawer variant="permanent" anchor="left" navState={navState} sx={sx} {...other}>
        <Scrollbar>
          <Stack sx={{ height: 1 }}>
            {/* Header with Logo, Avatar, and Toggle */}
            <Box
              sx={{
                p: isIconsOnly ? 1.5 : 3,
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                borderBottom: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 1,
                  gap: 1,
                }}
              >
                <AnimatedLogo
                  disableAnimation={isIconsOnly}
                  sx={{
                    width: isFull ? 'auto' : 0,
                    opacity: isFull ? 1 : 0,
                    transition: 'all 0.3s',
                  }}
                />

                <Tooltip title={isIconsOnly ? 'Expand' : isFull ? 'Collapse to icons' : 'Show'}>
                  <IconButton
                    onClick={cycleNavState}
                    sx={{
                      width: 36,
                      height: 36,
                      color: 'text.secondary',
                    }}
                  >
                    <Iconify
                      icon={
                        (isFull
                          ? 'eva:arrow-ios-back-fill'
                          : isIconsOnly
                            ? 'eva:arrow-ios-forward-fill'
                            : 'eva:arrow-ios-forward-fill') as any
                      }
                      width={20}
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              {isFull && (
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <Stack spacing={1} alignItems="center">
                    <Avatar
                      alt="Jazmin Rodriguez"
                      src="/assets/home/foto.png"
                      sx={{
                        width: 80,
                        height: 80,
                        border: `2px solid ${theme.vars.palette.primary.main}`,
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Jazmin Rodriguez
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('common.profileRole')}
                    </Typography>
                    <Typography variant="caption" color="primary.main" fontWeight={600}>
                      {t('common.hourlyRate')}
                    </Typography>

                    {/* Download CV Button */}
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Iconify icon={'solar:download-bold-duotone' as any} />}
                      href={cvUrl}
                      download
                      sx={{ mt: 1, width: '100%' }}
                    >
                      {t('common.downloadCV')}
                    </Button>
                  </Stack>
                </m.div>
              )}

              {isIconsOnly && (
                <Tooltip title="Jazmin Rodriguez">
                  <Avatar
                    alt="Jazmin Rodriguez"
                    src="/assets/home/foto.png"
                    sx={{
                      width: 48,
                      height: 48,
                      border: `2px solid ${theme.vars.palette.primary.main}`,
                    }}
                  />
                </Tooltip>
              )}
            </Box>

            {/* Navigation Items */}
            <Box sx={{ flex: 1, px: isIconsOnly ? 1 : 2, py: 3 }}>
              <Stack spacing={1}>
                {data.map((list) => (
                  <NavList key={list.title} data={list} iconsOnly={isIconsOnly} />
                ))}
              </Stack>
            </Box>

            {/* Footer with Theme, Language, GitHub, LinkedIn */}
            <Box
              sx={{
                p: isIconsOnly ? 1.5 : 2,
                borderTop: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
              }}
            >
              <Stack
                direction={isFull ? 'row' : 'column'}
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Tooltip title="Change theme">
                  <span>
                    <ThemeToggleButton sx={{ width: 40, height: 40 }} />
                  </span>
                </Tooltip>
                <Tooltip title="Change language">
                  <span>
                    <LanguagePopover data={languagesData} sx={{ width: 40, height: 40 }} />
                  </span>
                </Tooltip>
                <Tooltip title="GitHub">
                  <IconButton
                    component="a"
                    href="https://github.com/FreakJazz"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ width: 40, height: 40, color: 'text.primary' }}
                  >
                    <Iconify icon={'mdi:github' as any} width={24} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="LinkedIn">
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/jazmin-rodriguez-bermeo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ width: 40, height: 40, color: 'text.primary' }}
                  >
                    <Iconify icon={'mdi:linkedin' as any} width={24} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Stack>
        </Scrollbar>
      </StyledDrawer>
    </>
  );
}
