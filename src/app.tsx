import 'src/global.css';

import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { usePathname } from 'src/routes/hooks';

import { I18nProvider } from 'src/locales';
import { themeConfig, ThemeProvider } from 'src/theme';
import { loadGoogleTagManager } from 'src/lib/google-tag-manager';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const AuthProvider = JwtAuthProvider;

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  // Initialize Google Tag Manager on mount
  useEffect(() => {
    loadGoogleTagManager();
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <I18nProvider>
          <SettingsProvider defaultSettings={defaultSettings}>
            <ThemeProvider
              modeStorageKey={themeConfig.modeStorageKey}
              defaultMode={themeConfig.defaultMode}
            >
              <MotionLazy>
                <Snackbar />
                <ProgressBar />
                <SettingsDrawer defaultSettings={defaultSettings} />
                {children}
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </I18nProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
