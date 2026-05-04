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

// ----------------------------------------------------------------------

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// ----------------------------------------------------------------------

export function ContactForm({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  const ContactSchema = zod.object({
    name: zod.string().min(1, { message: 'Name is required' }),
    email: zod
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    subject: zod.string().min(1, { message: 'Subject is required' }),
    message: zod.string().min(10, { message: 'Message must be at least 10 characters' }),
  });

  const defaultValues: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
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
      await emailService.sendContactEmail(data);
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
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
