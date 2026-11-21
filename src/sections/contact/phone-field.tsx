import { Controller, useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/** ISO country code + international dial code. Names are localized with Intl.DisplayNames. */
export const COUNTRY_CODES: { iso: string; dial: string }[] = [
  { iso: 'EC', dial: '+593' },
  { iso: 'CO', dial: '+57' },
  { iso: 'PE', dial: '+51' },
  { iso: 'MX', dial: '+52' },
  { iso: 'AR', dial: '+54' },
  { iso: 'CL', dial: '+56' },
  { iso: 'BO', dial: '+591' },
  { iso: 'VE', dial: '+58' },
  { iso: 'UY', dial: '+598' },
  { iso: 'PY', dial: '+595' },
  { iso: 'BR', dial: '+55' },
  { iso: 'PA', dial: '+507' },
  { iso: 'CR', dial: '+506' },
  { iso: 'GT', dial: '+502' },
  { iso: 'SV', dial: '+503' },
  { iso: 'HN', dial: '+504' },
  { iso: 'NI', dial: '+505' },
  { iso: 'DO', dial: '+1' },
  { iso: 'CU', dial: '+53' },
  { iso: 'US', dial: '+1' },
  { iso: 'CA', dial: '+1' },
  { iso: 'ES', dial: '+34' },
  { iso: 'FR', dial: '+33' },
  { iso: 'DE', dial: '+49' },
  { iso: 'IT', dial: '+39' },
  { iso: 'PT', dial: '+351' },
  { iso: 'GB', dial: '+44' },
  { iso: 'NL', dial: '+31' },
  { iso: 'CH', dial: '+41' },
  { iso: 'IE', dial: '+353' },
  { iso: 'RU', dial: '+7' },
  { iso: 'CN', dial: '+86' },
  { iso: 'JP', dial: '+81' },
  { iso: 'IN', dial: '+91' },
  { iso: 'AU', dial: '+61' },
];

export const DEFAULT_COUNTRY = 'EC';

type PhoneFieldProps = {
  /** Form field holding the ISO country code (e.g. "EC") */
  countryName: string;
  /** Form field holding the national number (digits only, optional) */
  phoneName: string;
};

export function PhoneField({ countryName, phoneName }: PhoneFieldProps) {
  const { t, currentLang } = useTranslate();
  const { control } = useFormContext();

  const displayNames = new Intl.DisplayNames([currentLang.value], { type: 'region' });

  return (
    <Stack direction="row" spacing={2}>
      <Controller
        name={countryName}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label={t('contact.country')}
            sx={{ width: { xs: 150, sm: 190 }, flexShrink: 0 }}
            slotProps={{
              select: {
                // Only flag + dial code once selected; the full list shows country names
                renderValue: (value) => {
                  const country = COUNTRY_CODES.find((c) => c.iso === value);
                  return (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon={`circle-flags:${String(value).toLowerCase()}` as any} width={20} />
                      <span>{country?.dial}</span>
                    </Stack>
                  );
                },
              },
            }}
          >
            {COUNTRY_CODES.map((country) => (
              <MenuItem key={country.iso} value={country.iso}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Iconify icon={`circle-flags:${country.iso.toLowerCase()}` as any} width={22} />
                  <span>
                    {displayNames.of(country.iso)} ({country.dial})
                  </span>
                </Stack>
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name={phoneName}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            type="tel"
            label={t('contact.phone')}
            placeholder="987654321"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ htmlInput: { inputMode: 'tel' } }}
            onChange={(event) => field.onChange(event.target.value.replace(/[^\d\s-]/g, ''))}
          />
        )}
      />
    </Stack>
  );
}
