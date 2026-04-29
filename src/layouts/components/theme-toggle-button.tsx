import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';

import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

import { varTap, varHover, transitionTap } from 'src/components/animate';

// ----------------------------------------------------------------------

export function ThemeToggleButton({ sx, ...other }: IconButtonProps) {
  const { setMode, colorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Toggle theme"
        onClick={handleToggle}
        sx={[{ p: 0, width: 40, height: 40 }, ...(Array.isArray(sx) ? sx : [sx])]}
        {...other}
      >
        <SvgIcon>
          {isDark ? (
            // Sun icon for light mode
            <path
              fill="currentColor"
              d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8M11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z"
            />
          ) : (
            // Moon icon for dark mode
            <path
              fill="currentColor"
              d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26a5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1"
            />
          )}
        </SvgIcon>
      </IconButton>
    </Tooltip>
  );
}
