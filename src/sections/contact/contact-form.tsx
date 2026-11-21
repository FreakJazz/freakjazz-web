import type { BoxProps } from '@mui/material/Box';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslate } from 'src/locales';
import { emailService } from 'src/services/email.service';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { PhoneField, COUNTRY_CODES, DEFAULT_COUNTRY } from './phone-field';

// ----------------------------------------------------------------------

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  country: string;
  phone?: string;
};

// ----------------------------------------------------------------------

export function ContactForm({ sx, ...other }: BoxProps) {
  const { t, currentLang } = useTranslate();

  const ContactSchema = zod.object({
    name: zod.string().min(1, { message: t('contact.nameRequired') }),
    email: zod
      .string()
      .min(1, { message: t('contact.emailRequired') })
      .email({ message: t('contact.emailInvalid') }),
    subject: zod.string().min(1, { message: t('contact.subjectRequired') }),
    message: zod.string().min(10, { message: t('contact.messageMin') }),
    country: zod.string(),
    // Optional: when present it must have 6 to 12 digits
    phone: zod
      .string()
      .optional()
      .refine((value) => !value || /^\d{6,12}$/.test(value.replace(/[\s-]/g, '')), {
        message: t('contact.phoneInvalid'),
      }),
  });

  const defaultValues: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    country: DEFAULT_COUNTRY,
    phone: '',
  };

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { country, phone, ...rest } = data;
      const dial = COUNTRY_CODES.find((c) => c.iso === country)?.dial ?? '';
      const digits = (phone ?? '').replace(/[\s-]/g, '');

      await emailService.sendContactEmail({
        ...rest,
        phone: digits ? `${dial} ${digits}` : undefined,
        lang: currentLang.value === 'en' ? 'en' : 'es',
      });
      toast.success(t('contact.successDetail'));
      reset();
    } catch (error) {
      console.error(error);
      toast.error(t('contact.error'));
    }
  });

  return (
    <Box sx={sx} {...other}>
      <Typography variant="h3">{t('contact.subtitle')}</Typography>

      <Form methods={methods} onSubmit={onSubmit}>
        <Box
          sx={{
            my: 5,
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Field.Text name="name" label={t('contact.name')} />
          <Field.Text name="email" label={t('contact.email')} type="email" />
          <PhoneField countryName="country" phoneName="phone" />
          <Field.Text name="subject" label={t('contact.subject')} />
          <Field.Text name="message" label={t('contact.message')} multiline rows={4} />
        </Box>

        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {t('contact.send')}
        </LoadingButton>
      </Form>
    </Box>
  );
}
