import type { Breakpoint } from '@mui/material/styles';
import type { FooterProps } from './footer';
import type { NavMainProps } from './nav/types';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTranslate } from 'src/locales';

import { AnimatedLogo } from 'src/components/logo';

import { Footer } from './footer';
import { NavSidebar } from './nav/sidebar';
import { getNavData } from '../nav-config-main';
import { LanguagePopover } from '../components/language-popover';
import { BottomNavMobile } from './nav/mobile/bottom-nav-mobile';
import { MainSection, HeaderSection, LayoutSection } from '../core';
import { ThemeToggleButton } from '../components/theme-toggle-button';

// ----------------------------------------------------------------------

const languagesData = [
  { value: 'en', label: 'English', countryCode: 'gb' },
  { value: 'es', label: 'Español', countryCode: 'ec' },
];

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavMainProps['data'];
    };
    main?: MainSectionProps;
    footer?: FooterProps;
  };
};

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: MainLayoutProps) {
  const { t } = useTranslate();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up(layoutQuery));

  const navData = slotProps?.nav?.data ?? getNavData(t);

  const renderHeader = () => {
    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {!isDesktop && (
            <Box
              component="img"
              src="/assets/home/foto.png"
              alt="Jazmin Rodriguez"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                objectFit: 'cover',
                border: (thm) => `2px solid ${thm.palette.primary.main}`,
                mr: 1,
                ml: -1,
              }}
            />
          )}

          {/** @slot Logo */}
          <AnimatedLogo disableAnimation />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          {/** @slot Language popover */}
          <LanguagePopover data={languagesData} />

          {/** @slot Theme toggle button */}
          <ThemeToggleButton />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={[
          (thm) => ({
            [thm.breakpoints.up(layoutQuery)]: {
              display: 'none', // Hide header on desktop when using sidebar
            },
          }),
          ...(slotProps?.header?.sx
            ? Array.isArray(slotProps.header.sx)
              ? slotProps.header.sx
              : [slotProps.header.sx]
            : []),
        ]}
      />
    );
  };

  const renderSidebar = () => (
    <NavSidebar
      data={navData}
      sx={(thm) => ({
        display: 'none',
        [thm.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
      })}
    />
  );

  const renderFooter = () => <Footer sx={slotProps?.footer?.sx} layoutQuery={layoutQuery} />;

  const renderMain = () => (
    <MainSection
      {...slotProps?.main}
      sx={[
        (thm) => ({
          [thm.breakpoints.down(layoutQuery)]: {
            pb: '90px', // Add padding for bottom navigation on mobile
          },
        }),
        ...(slotProps?.main?.sx
          ? Array.isArray(slotProps.main.sx)
            ? slotProps.main.sx
            : [slotProps.main.sx]
          : []),
      ]}
    >
      {children}
    </MainSection>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/** Sidebar for desktop */}
      {isDesktop && renderSidebar()}

      {/** Main content area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <LayoutSection
          /** **************************************
           * @Header (mobile only)
           *************************************** */
          headerSection={!isDesktop && renderHeader()}
          /** **************************************
           * @Footer
           *************************************** */
          footerSection={renderFooter()}
          /** **************************************
           * @Styles
           *************************************** */
          cssVars={cssVars}
          sx={sx}
        >
          {renderMain()}
        </LayoutSection>
      </Box>

      {/** Bottom Navigation for mobile */}
      {!isDesktop && <BottomNavMobile data={navData} />}
    </Box>
  );
}
