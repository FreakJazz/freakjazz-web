import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

import { useTranslate } from 'src/locales';
import { emailService } from 'src/services/email.service';

import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export type QuoteFormData = {
  projectType: string;
  technologies: string[];
  timeline: string;
  budget: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  requirements?: string;
};

// ----------------------------------------------------------------------

export function QuoteForm() {
  const { t } = useTranslate();

  const QuoteSchema = zod.object({
    projectType: zod.string().min(1, { message: 'Project type is required' }),
    technologies: zod.array(zod.string()).min(1, { message: 'Select at least one technology' }),
    timeline: zod.string().min(1, { message: 'Timeline is required' }),
    budget: zod.string().min(1, { message: 'Budget range is required' }),
    description: zod.string().min(20, { message: 'Description must be at least 20 characters' }),
    name: zod.string().min(1, { message: 'Name is required' }),
    email: zod
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    phone: zod.string().min(1, { message: 'Phone is required' }),
    company: zod.string().optional(),
    requirements: zod.string().optional(),
  });

  const defaultValues: QuoteFormData = {
    projectType: '',
    technologies: [],
    timeline: '',
    budget: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: '',
  };

  const methods = useForm<QuoteFormData>({
    resolver: zodResolver(QuoteSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await emailService.sendQuoteEmail(data);
      toast.success(t('quote.success'));
      reset();
    } catch (error) {
      console.error(error);
      toast.error(t('quote.error'));
    }
  });

  const technologyOptions = [
    { value: 'react', label: t('quote.techReact') },
    { value: 'nodejs', label: t('quote.techNode') },
    { value: 'python', label: t('quote.techPython') },
    { value: 'dotnet', label: t('quote.techDotNet') },
    { value: 'mobile', label: t('quote.techMobile') },
    { value: 'database', label: t('quote.techDatabase') },
    { value: 'cloud', label: t('quote.techCloud') },
    { value: 'ai', label: t('quote.techAI') },
  ];

  return (
    <Card sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {t('quote.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('quote.subtitle')}
          </Typography>
        </Box>

        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            {/* Project Type */}
            <Controller
              name="projectType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.projectType}>
                  <InputLabel>{t('quote.projectType')}</InputLabel>
                  <Select {...field} label={t('quote.projectType')}>
                    <MenuItem value="complex">{t('quote.complexSystem')}</MenuItem>
                    <MenuItem value="simple">{t('quote.simpleWebsite')}</MenuItem>
                  </Select>
                  {errors.projectType && (
                    <FormHelperText>{errors.projectType.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* Technologies */}
            <Controller
              name="technologies"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.technologies}>
                  <InputLabel>{t('quote.technologies')}</InputLabel>
                  <Select
                    {...field}
                    multiple
                    label={t('quote.technologies')}
                    input={<OutlinedInput label={t('quote.technologies')} />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip
                            key={value}
                            label={
                              technologyOptions.find((opt) => opt.value === value)?.label || value
                            }
                            size="small"
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {technologyOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.technologies && (
                    <FormHelperText>{errors.technologies.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* Timeline */}
            <Controller
              name="timeline"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.timeline}>
                  <InputLabel>{t('quote.timeline')}</InputLabel>
                  <Select {...field} label={t('quote.timeline')}>
                    <MenuItem value="1-3">{t('quote.timeline1')}</MenuItem>
                    <MenuItem value="3-6">{t('quote.timeline2')}</MenuItem>
                    <MenuItem value="6-12">{t('quote.timeline3')}</MenuItem>
                    <MenuItem value="12+">{t('quote.timeline4')}</MenuItem>
                  </Select>
                  {errors.timeline && <FormHelperText>{errors.timeline.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Budget */}
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.budget}>
                  <InputLabel>{t('quote.budget')}</InputLabel>
                  <Select {...field} label={t('quote.budget')}>
                    <MenuItem value="5-15">{t('quote.budget1')}</MenuItem>
                    <MenuItem value="15-30">{t('quote.budget2')}</MenuItem>
                    <MenuItem value="30-50">{t('quote.budget3')}</MenuItem>
                    <MenuItem value="50+">{t('quote.budget4')}</MenuItem>
                  </Select>
                  {errors.budget && <FormHelperText>{errors.budget.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label={t('quote.description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* Contact Information */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Contact Information
            </Typography>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('quote.name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  label={t('quote.email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('quote.phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="company"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label={t('quote.company')} />}
            />

            {/* Additional Requirements */}
            <Controller
              name="requirements"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label={t('quote.requirements')}
                />
              )}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {t('quote.submit')}
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
