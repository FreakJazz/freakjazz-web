import type { Direction } from '@mui/material/styles';

import { useEffect } from 'react';

// ----------------------------------------------------------------------

type RtlProps = {
  direction: Direction;
  children: React.ReactNode;
};

export function Rtl({ children, direction }: RtlProps) {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return <>{children}</>;
}
