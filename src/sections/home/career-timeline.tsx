import type { TimelineKind, TimelineItem } from './timeline-data';

import { useRef, useState } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import { TIMELINES } from './timeline-data';

// ----------------------------------------------------------------------

const TABS: { key: TimelineKind; icon: string; labelKey: string }[] = [
  { key: 'experience', icon: 'solar:case-minimalistic-bold-duotone', labelKey: 'home.timelineExperience' },
  { key: 'education', icon: 'solar:diploma-bold-duotone', labelKey: 'home.timelineEducation' },
  { key: 'courses', icon: 'solar:medal-ribbons-star-bold-duotone', labelKey: 'home.timelineCourses' },
];

type ItemProps = {
  item: TimelineItem;
  index: number;
  lang: 'es' | 'en';
};

function TimelineEntry({ item, index, lang }: ItemProps) {
  const theme = useTheme();
  const isRight = index % 2 === 1;

  const card = (
    <Box
      component={m.div}
      initial={{ opacity: 0, x: isRight ? 60 : -60, y: 20 }}
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
        {item.org}
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
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '44px 1fr', md: '1fr 64px 1fr' },
        alignItems: 'start',
        mb: { xs: 4, md: 6 },
      }}
    >
      {/* Dot */}
      <Box
        sx={{
          gridColumn: { xs: 1, md: 2 },
          gridRow: 1,
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'center' },
          pt: 1,
        }}
      >
        <Box
          component={m.div}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'common.white',
            bgcolor: 'primary.main',
            boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.2)}`,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Iconify icon={item.icon as any} width={18} />
        </Box>
      </Box>

      {/* Card: single column on mobile, alternating sides on desktop */}
      <Box
        sx={{
          gridColumn: { xs: 2, md: isRight ? 3 : 1 },
          gridRow: 1,
          pl: { xs: 0, md: isRight ? 3 : 0 },
          pr: { xs: 0, md: isRight ? 0 : 3 },
        }}
      >
        {card}
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

  return (
    <Box>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={1.5} sx={{ mb: 7 }}>
        {TABS.map((item) => (
          <Chip
            key={item.key}
            clickable
            onClick={() => setTab(item.key)}
            color={tab === item.key ? 'primary' : 'default'}
            variant={tab === item.key ? 'filled' : 'outlined'}
            icon={<Iconify icon={item.icon as any} width={20} />}
            label={t(item.labelKey)}
            sx={{ px: 1, py: 2.5, fontSize: '0.95rem', fontWeight: 600 }}
          />
        ))}
      </Stack>

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

        {items.map((item, index) => (
          <TimelineEntry key={`${item.org}-${item.period.es}`} item={item} index={index} lang={lang} />
        ))}
      </Box>
    </Box>
  );
}
