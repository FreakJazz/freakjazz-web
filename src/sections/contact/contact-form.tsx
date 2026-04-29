import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export function ContactForm({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  return (
    <Box sx={sx} {...other}>
      <Typography variant="h3">{t('contact.subtitle')}</Typography>
      <Box
        sx={{
          my: 5,
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField fullWidth label={t('contact.name')} />
        <TextField fullWidth label={t('contact.email')} />
        <TextField fullWidth label={t('contact.subject')} />
        <TextField fullWidth label={t('contact.message')} multiline rows={4} />
      </Box>

      <Button size="large" variant="contained">
        {t('contact.send')}
      </Button>
    </Box>
  );
}
