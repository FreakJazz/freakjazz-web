import type { BoxProps } from '@mui/material/Box';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { styled, keyframes } from '@mui/material/styles';

// ----------------------------------------------------------------------

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const StyledLogo = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  letterSpacing: '-0.5px',

  '& .logo-text': {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },

  '& .logo-bracket': {
    color: theme.palette.text.secondary,
    fontWeight: 700,
  },

  '& .logo-slash': {
    color: theme.palette.primary.light,
    marginLeft: '2px',
  },

  '& .cursor': {
    display: 'inline-block',
    width: '2px',
    height: '1.2em',
    backgroundColor: theme.palette.primary.main,
    marginLeft: '2px',
    animation: `${blink} 1s infinite`,
    verticalAlign: 'middle',
  },
}));

// ----------------------------------------------------------------------

const text = '<freakjazz />';

export type AnimatedLogoProps = BoxProps & {
  disableAnimation?: boolean;
};

export function AnimatedLogo({ disableAnimation = false, sx, ...other }: AnimatedLogoProps) {
  const [displayed, setDisplayed] = useState(disableAnimation ? text : '');
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(disableAnimation);

  useEffect(() => {
    if (disableAnimation) {
      setDisplayed(text);
      setIsComplete(true);
      return undefined;
    }

    if (index < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayed((prev) => prev + text[index]);
          setIndex(index + 1);
        },
        index === 0 ? 500 : 80
      ); // Delay initial, then type fast

      return () => clearTimeout(timeout);
    }

    if (index === text.length && !isComplete) {
      setIsComplete(true);
    }

    return undefined;
  }, [index, disableAnimation, isComplete]);

  const renderText = () => {
    // Parse the displayed text to add styling
    const openBracket = displayed.includes('<') ? '<' : '';
    const closeBracket = displayed.includes('>') ? '>' : '';
    const slash = displayed.includes('/') ? '/' : '';

    // Extract text between brackets
    let content = displayed;
    if (openBracket) {
      content = content.substring(1);
    }
    if (closeBracket && content.endsWith('>')) {
      content = content.substring(0, content.length - 1);
    }
    if (slash && content.includes('/')) {
      content = content.replace('/', '');
    }

    return (
      <>
        {openBracket && <span className="logo-bracket">{openBracket}</span>}
        {content}
        {slash && <span className="logo-slash">{slash}</span>}
        {closeBracket && <span className="logo-bracket">{closeBracket}</span>}
      </>
    );
  };

  return (
    <StyledLogo sx={sx} {...other}>
      <Box component="span" className="logo-text">
        {renderText()}
      </Box>
      <Box component="span" className="cursor" />
    </StyledLogo>
  );
}
