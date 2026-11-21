import type { TechItem } from './tech-data';

import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import { TECH_CATEGORIES } from './tech-data';

// ----------------------------------------------------------------------

type Body = { x: number; y: number; vx: number; vy: number };

const luminance = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

type FloatingTechProps = {
  items: TechItem[];
  size: number;
  height: number;
};

/** Large icons that float around and bounce off the edges of the container. */
function FloatingTech({ items, size, height }: FloatingTechProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cell = size + 28; // icon + name

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    // Every icon is independent: flies straight, bounces on the edges and can pass over the others.
    const bodies: (Body | null)[] = items.map(() => null);
    let frame = 0;
    let last = performance.now();
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3); // normalized to 60fps
      last = now;
      const w = container.clientWidth;

      if (w > 0) {
        bodies.forEach((body, i) => {
          let b = body;
          if (!b) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 0.8;
            b = {
              x: Math.random() * Math.max(w - size, 1),
              y: Math.random() * Math.max(height - cell, 1),
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
            };
            bodies[i] = b;
          }

          if (!reduceMotion) {
            b.x += b.vx * dt;
            b.y += b.vy * dt;
          }

          if (b.x <= 0) {
            b.x = 0;
            b.vx = Math.abs(b.vx);
          } else if (b.x >= w - size) {
            b.x = w - size;
            b.vx = -Math.abs(b.vx);
          }
          if (b.y <= 0) {
            b.y = 0;
            b.vy = Math.abs(b.vy);
          } else if (b.y >= height - cell) {
            b.y = height - cell;
            b.vy = -Math.abs(b.vy);
          }

          const el = itemRefs.current[i];
          if (el) {
            el.style.visibility = 'visible';
            el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
          }
        });
      }

      if (!reduceMotion && visible) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Pause the animation while the card is off-screen (saves CPU/GPU, keeps the page smooth)
    const observer = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible && !reduceMotion) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
      visible = nowVisible;
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [items, size, height, cell, reduceMotion]);

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: 1, height, overflow: 'hidden' }}>
      {items.map((tech, i) => {
        // Near-black brands are shown in white on dark backgrounds
        const isDarkBrand = luminance(tech.color) < 0.25;
        const display = isDark && isDarkBrand ? '#FFFFFF' : tech.color;

        return (
          <Box
            key={tech.name}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[i] = el;
            }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: size,
              textAlign: 'center',
              willChange: 'transform',
              visibility: 'hidden',
              '&:hover': { zIndex: 5 },
              '&:hover > .tile': { transform: 'scale(1.12)', borderColor: display },
            }}
          >
            <Box
              className="tile"
              sx={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '24%',
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: alpha(display, isDark ? 0.1 : 0.08),
                boxShadow: `0 10px 30px ${alpha(display, 0.18)}`,
                transition: 'transform .2s, border-color .2s',
              }}
            >
              {tech.icon ? (
                <Iconify
                  icon={tech.icon as any}
                  width={size * 0.55}
                  sx={{
                    color: display,
                    ...(isDark && isDarkBrand && { filter: 'brightness(0) invert(1)' }),
                  }}
                />
              ) : (
                <Typography
                  sx={{ color: display, fontWeight: 800, fontSize: size * 0.28, letterSpacing: -0.5 }}
                >
                  {tech.monogram}
                </Typography>
              )}
            </Box>
            <Typography
              variant="caption"
              noWrap
              sx={{ display: 'block', mt: 0.5, fontWeight: 600, color: 'text.secondary' }}
            >
              {tech.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

// ----------------------------------------------------------------------

export function TechStack() {
  const theme = useTheme();
  const { t } = useTranslate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = TECH_CATEGORIES[selectedIndex];
  const size = isSmallScreen ? 64 : 84;
  // Taller area when a group has many items, so the floating icons have room to move
  const count = selected.items.length;
  const height = isSmallScreen
    ? Math.min(420 + Math.max(count - 12, 0) * 26, 900)
    : Math.min(460 + Math.max(count - 12, 0) * 16, 760);

  return (
    <>
      <Grid container spacing={2}>
        {TECH_CATEGORIES.map((category, index) => (
          <Grid key={category.key} size={{ xs: 6, sm: 4, md: 3 }}>
            <Button
              fullWidth
              variant={index === selectedIndex ? 'contained' : 'outlined'}
              onClick={() => setSelectedIndex(index)}
              sx={{ height: 64, fontWeight: 700 }}
            >
              {t(category.labelKey)}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 5, p: { xs: 1, md: 2 }, borderRadius: 4, overflow: 'hidden' }}>
        <FloatingTech
          key={`${selected.key}-${size}-${height}`}
          items={selected.items}
          size={size}
          height={height}
        />
      </Card>
    </>
  );
}
