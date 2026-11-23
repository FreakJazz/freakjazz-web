import type { TimelineKind, TimelineItem } from './timeline-data';

import { m, useScroll, useSpring } from 'framer-motion';
import { useRef, useState, useLayoutEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme, type Theme, type SxProps } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import { TIMELINES } from './timeline-data';

// ----------------------------------------------------------------------

const TABS: { key: TimelineKind; icon: string; labelKey: string }[] = [
  { key: 'experience', icon: 'solar:case-minimalistic-bold-duotone', labelKey: 'home.timelineExperience' },
  { key: 'education', icon: 'solar:diploma-bold-duotone', labelKey: 'home.timelineEducation' },
  { key: 'courses', icon: 'solar:medal-ribbons-star-bold-duotone', labelKey: 'home.timelineCourses' },
];

type Side = 'left' | 'right' | 'single';

type ItemProps = {
  item: TimelineItem;
  side: Side;
  lang: 'es' | 'en';
  innerRef?: (el: HTMLDivElement | null) => void;
  positionSx?: SxProps<Theme>;
};

const itemKey = (item: TimelineItem, lang: 'es' | 'en') =>
  `${typeof item.org === 'string' ? item.org : item.org[lang]}-${item.period.es}`;

// Desktop layout: cards alternate sides and are placed absolutely from their measured heights.
// Consecutive dots keep the same vertical distance (DOT_STEP) unless a card is so tall that the next
// card on the same side would overlap it, in which case the gap grows just enough to avoid that.
const DOT_STEP = 150;
const CARD_GAP = 28;

function computeTops(heights: number[]) {
  const tops: number[] = [];
  heights.forEach((h, i) => {
    if (i === 0) {
      tops.push(0);
    } else {
      const afterDot = tops[i - 1] + DOT_STEP;
      const afterSameSide = i >= 2 ? tops[i - 2] + heights[i - 2] + CARD_GAP : 0;
      tops.push(Math.max(afterDot, afterSameSide));
    }
  });
  return tops;
}

const DOT = 32;
const COLUMN_GAP = 48; // space between the two columns, the vertical line runs through its middle

function TimelineEntry({ item, side, lang, innerRef, positionSx }: ItemProps) {
  const theme = useTheme();

  // Distance from the card edge to the center of the vertical line
  const dotOffset = (COLUMN_GAP + DOT) / 2;

  return (
    <Box
      ref={innerRef}
      sx={[
        { position: 'relative', pl: side === 'single' ? '44px' : 0 },
        ...(Array.isArray(positionSx) ? positionSx : [positionSx]),
      ]}
    >
      {/* Dot sitting on the vertical line */}
      <Box
        component={m.div}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        sx={{
          position: 'absolute',
          top: 8,
          zIndex: 1,
          width: DOT,
          height: DOT,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'common.white',
          bgcolor: 'primary.main',
          boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.2)}`,
          ...(side === 'single' && { left: 0 }),
          ...(side === 'left' && { right: -dotOffset }),
          ...(side === 'right' && { left: -dotOffset }),
        }}
      >
        <Iconify icon={item.icon as any} width={18} />
      </Box>

      <Box
        component={m.div}
        initial={{ opacity: 0, x: side === 'single' ? 0 : side === 'left' ? -60 : 60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
          boxShadow: theme.shadows[4],
          textAlign: 'left',
          transition: 'box-shadow 0.3s, transform 0.3s',
          '&:hover': { boxShadow: theme.shadows[16], transform: 'translateY(-4px)' },
        }}
      >
        <Chip
          size="small"
          color="primary"
          variant="soft"
          label={item.period[lang]}
          sx={{ mb: 1.5, fontWeight: 600 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {item.title[lang]}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: item.points ? 1.5 : 0 }}>
          {typeof item.org === 'string' ? item.org : item.org[lang]}
        </Typography>

        {item.points && (
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            {item.points[lang].map((point) => (
              <Typography key={point} component="li" variant="body2" sx={{ mb: 0.75, lineHeight: 1.7 }}>
                {point}
              </Typography>
            ))}
          </Box>
        )}

        {item.tags && (
          <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 1.5 }}>
            {item.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function CareerTimeline() {
  const theme = useTheme();
  const { t, currentLang } = useTranslate();
  const lang = currentLang.value === 'en' ? 'en' : 'es';

  const [tab, setTab] = useState<TimelineKind>('experience');
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  const items = TIMELINES[tab];
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (!isDesktop) return undefined;

    const measure = () => {
      const next = items.map((_, i) => itemRefs.current[i]?.offsetHeight ?? 0);
      setHeights((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    itemRefs.current.slice(0, items.length).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items, isDesktop, lang]);

  const measured = heights.length === items.length ? heights : items.map(() => 0);
  const tops = computeTops(measured);
  const containerHeight = tops.reduce((max, top, i) => Math.max(max, top + measured[i]), 0);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, value: TimelineKind) => setTab(value)}
        variant="fullWidth"
        sx={{
          mb: 7,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
          boxShadow: theme.shadows[4],
          '& .MuiTabs-indicator': { height: 4, borderRadius: 2 },
        }}
      >
        {TABS.map((item) => (
          <Tab
            key={item.key}
            value={item.key}
            icon={<Iconify icon={item.icon as any} width={22} />}
            iconPosition="start"
            label={t(item.labelKey)}
            sx={{ minHeight: 64, fontSize: { xs: '0.8rem', sm: '1rem' }, fontWeight: 700 }}
          />
        ))}
      </Tabs>

      <Box key={tab} ref={trackRef} sx={{ position: 'relative' }}>
        {/* Vertical line: grey track + animated fill that grows while scrolling */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: { xs: 15, md: 'calc(50% - 2px)' },
            width: 4,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.grey[500], 0.2),
            overflow: 'hidden',
          }}
        >
          <Box
            component={m.div}
            style={{ scaleY }}
            sx={{
              width: 1,
              height: 1,
              transformOrigin: 'top',
              background: `linear-gradient(180deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
            }}
          />
        </Box>

        {isDesktop ? (
          <Box sx={{ position: 'relative', height: containerHeight }}>
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <TimelineEntry
                  key={itemKey(item, lang)}
                  item={item}
                  side={isLeft ? 'left' : 'right'}
                  lang={lang}
                  innerRef={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  positionSx={{
                    position: 'absolute',
                    top: tops[index] ?? 0,
                    width: `calc(50% - ${COLUMN_GAP / 2}px)`,
                    ...(isLeft ? { left: 0 } : { right: 0 }),
                  }}
                />
              );
            })}
          </Box>
        ) : (
          <Stack spacing={3}>
            {items.map((item) => (
              <TimelineEntry key={itemKey(item, lang)} item={item} side="single" lang={lang} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
