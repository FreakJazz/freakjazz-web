import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useTranslate } from 'src/locales';
import { emailService } from 'src/services/email.service';

import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export type QuoteFormDetailedData = {
  // BLOQUE 1: Datos del cliente
  companyName: string;
  ruc?: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;

  // BLOQUE 2: Objetivo del proyecto
  projectGoals: string[];
  otherGoal?: string;

  // BLOQUE 3: Tipo de solución
  solutionType: string;

  // BLOQUE 4: Detalle de la solución
  webAppType?: string;
  mobileplatforms?: string[];
  systemType?: string;

  // BLOQUE 5: Funcionalidades
  features: string[];

  // BLOQUE 6: Roles del sistema
  hasRoles: string;
  roles?: string;

  // BLOQUE 7: Diseño y experiencia
  hasDesign: string;
  needsPrototype: string;
  visualStyle: string;

  // BLOQUE 8: Requerimientos técnicos
  needsCloud: string;
  securityLevel: string;
  needsIntegrations: string;
  integrations?: string;

  // BLOQUE 9: Tiempo y presupuesto
  timeline: string;
  budget: string;

  // BLOQUE 10: Soporte y continuidad
  needsSupport: string;

  // BLOQUE 11: Comentarios finales
  additionalComments?: string;
};

// ----------------------------------------------------------------------

export function QuoteFormDetailed() {
  const { t } = useTranslate();

  const QuoteSchema = zod.object({
    // BLOQUE 1
    companyName: zod.string().min(1, { message: 'Company name is required' }),
    ruc: zod.string().optional(),
    contactName: zod.string().min(1, { message: 'Contact name is required' }),
    email: zod
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    phone: zod.string().min(1, { message: 'Phone is required' }),
    location: zod.string().min(1, { message: 'Location is required' }),

    // BLOQUE 2
    projectGoals: zod.array(zod.string()).min(1, { message: 'Select at least one goal' }),
    otherGoal: zod.string().optional(),

    // BLOQUE 3
    solutionType: zod.string().min(1, { message: 'Solution type is required' }),

    // BLOQUE 4
    webAppType: zod.string().optional(),
    mobileplatforms: zod.array(zod.string()).optional(),
    systemType: zod.string().optional(),

    // BLOQUE 5
    features: zod.array(zod.string()).min(1, { message: 'Select at least one feature' }),

    // BLOQUE 6
    hasRoles: zod.string().min(1, { message: 'This field is required' }),
    roles: zod.string().optional(),

    // BLOQUE 7
    hasDesign: zod.string().min(1, { message: 'This field is required' }),
    needsPrototype: zod.string().min(1, { message: 'This field is required' }),
    visualStyle: zod.string().min(1, { message: 'Visual style is required' }),

    // BLOQUE 8
    needsCloud: zod.string().min(1, { message: 'This field is required' }),
    securityLevel: zod.string().min(1, { message: 'Security level is required' }),
    needsIntegrations: zod.string().min(1, { message: 'This field is required' }),
    integrations: zod.string().optional(),

    // BLOQUE 9
    timeline: zod.string().min(1, { message: 'Timeline is required' }),
    budget: zod.string().min(1, { message: 'Budget is required' }),

    // BLOQUE 10
    needsSupport: zod.string().min(1, { message: 'This field is required' }),

    // BLOQUE 11
    additionalComments: zod.string().optional(),
  });

  const defaultValues: QuoteFormDetailedData = {
    companyName: '',
    ruc: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    projectGoals: [],
    otherGoal: '',
    solutionType: '',
    webAppType: '',
    mobileplatforms: [],
    systemType: '',
    features: [],
    hasRoles: '',
    roles: '',
    hasDesign: '',
    needsPrototype: '',
    visualStyle: '',
    needsCloud: '',
    securityLevel: '',
    needsIntegrations: '',
    integrations: '',
    timeline: '',
    budget: '',
    needsSupport: '',
    additionalComments: '',
  };

  const methods = useForm<QuoteFormDetailedData>({
    resolver: zodResolver(QuoteSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const selectedSolutionType = watch('solutionType');

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

  // Options arrays
  const projectGoalOptions = [
    { value: 'automate', label: t('quote.goal_automate') },
    { value: 'reduce-time', label: t('quote.goal_reduceTime') },
    { value: 'control', label: t('quote.goal_control') },
    { value: 'ecommerce', label: t('quote.goal_ecommerce') },
    { value: 'communication', label: t('quote.goal_communication') },
    { value: 'integrate', label: t('quote.goal_integrate') },
    { value: 'other', label: t('quote.goal_other') },
  ];

  const featureOptions = [
    {
      category: t('quote.feature_category_users'),
      options: [
        { value: 'auth', label: t('quote.feature_auth') },
        { value: 'roles', label: t('quote.feature_roles') },
      ],
    },
    {
      category: t('quote.feature_category_operations'),
      options: [
        { value: 'products', label: t('quote.feature_products') },
        { value: 'inventory', label: t('quote.feature_inventory') },
        { value: 'sales', label: t('quote.feature_sales') },
        { value: 'billing', label: t('quote.feature_billing') },
        { value: 'payments', label: t('quote.feature_payments') },
      ],
    },
    {
      category: t('quote.feature_category_scheduling'),
      options: [
        { value: 'reservations', label: t('quote.feature_reservations') },
        { value: 'appointments', label: t('quote.feature_appointments') },
      ],
    },
    {
      category: t('quote.feature_category_communication'),
      options: [
        { value: 'notifications', label: t('quote.feature_notifications') },
        { value: 'chat', label: t('quote.feature_chat') },
        { value: 'email', label: t('quote.feature_email') },
      ],
    },
    {
      category: t('quote.feature_category_analysis'),
      options: [
        { value: 'reports', label: t('quote.feature_reports') },
        { value: 'analytics', label: t('quote.feature_analytics') },
      ],
    },
    {
      category: t('quote.feature_category_extras'),
      options: [
        { value: 'forms', label: t('quote.feature_forms') },
        { value: 'maps', label: t('quote.feature_maps') },
        { value: 'integrations', label: t('quote.feature_integrations') },
      ],
    },
  ];

  return (
    <Card sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {t('quote.detailedTitle') || 'Cotización de Proyecto'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('quote.detailedSubtitle') ||
              'Complete este formulario detallado para recibir una cotización precisa'}
          </Typography>
        </Box>

        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            {/* BLOQUE 1: Datos del Cliente */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block1Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={`${t('quote.companyName')} *`}
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="ruc"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label={t('quote.ruc')} />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="contactName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={`${t('quote.contactName')} *`}
                        error={!!errors.contactName}
                        helperText={errors.contactName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="email"
                        label={`${t('quote.email')} *`}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={`${t('quote.phone')} *`}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={`${t('quote.location')} *`}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* BLOQUE 2: Objetivo del Proyecto */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block2Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Controller
                name="projectGoals"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.projectGoals}>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                      {t('quote.projectGoalsLabel')} *
                    </Typography>
                    <Stack spacing={1}>
                      {projectGoalOptions.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          control={
                            <Checkbox
                              checked={field.value.includes(option.value)}
                              onChange={(e) => {
                                const newValue = e.target.checked
                                  ? [...field.value, option.value]
                                  : field.value.filter((v) => v !== option.value);
                                field.onChange(newValue);
                              }}
                            />
                          }
                          label={option.label}
                        />
                      ))}
                    </Stack>
                    {errors.projectGoals && (
                      <FormHelperText>{errors.projectGoals.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              {watch('projectGoals')?.includes('other') && (
                <Controller
                  name="otherGoal"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label={t('quote.otherGoal')} sx={{ mt: 2 }} />
                  )}
                />
              )}
            </Box>

            {/* BLOQUE 3: Tipo de Solución */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block3Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Controller
                name="solutionType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.solutionType}>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                      {t('quote.solutionTypeLabel')} *
                    </Typography>
                    <RadioGroup
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <FormControlLabel
                        value="web"
                        control={<Radio />}
                        label={t('quote.solution_web')}
                      />
                      <FormControlLabel
                        value="mobile"
                        control={<Radio />}
                        label={t('quote.solution_mobile')}
                      />
                      <FormControlLabel
                        value="desktop"
                        control={<Radio />}
                        label={t('quote.solution_desktop')}
                      />
                      <FormControlLabel
                        value="platform"
                        control={<Radio />}
                        label={t('quote.solution_platform')}
                      />
                      <FormControlLabel
                        value="unsure"
                        control={<Radio />}
                        label={t('quote.solution_unsure')}
                      />
                    </RadioGroup>
                    {errors.solutionType && (
                      <FormHelperText>{errors.solutionType.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            {/* BLOQUE 4: Detalle de la Solución (Condicional) */}
            {selectedSolutionType === 'web' && (
              <Box sx={{ pl: 4 }}>
                <Controller
                  name="webAppType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>{t('quote.webAppTypeLabel')}</InputLabel>
                      <Select {...field} label={t('quote.webAppTypeLabel')}>
                        <MenuItem value="admin">{t('quote.webApp_admin')}</MenuItem>
                        <MenuItem value="public">{t('quote.webApp_public')}</MenuItem>
                        <MenuItem value="client-portal">{t('quote.webApp_clientPortal')}</MenuItem>
                        <MenuItem value="ecommerce">{t('quote.webApp_ecommerce')}</MenuItem>
                        <MenuItem value="internal">{t('quote.webApp_internal')}</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            )}

            {selectedSolutionType === 'mobile' && (
              <Box sx={{ pl: 4 }}>
                <Controller
                  name="mobileplatforms"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                        {t('quote.mobilePlatformsLabel')}
                      </Typography>
                      <Stack spacing={1}>
                        {[
                          { value: 'android', label: t('quote.mobile_android') },
                          { value: 'ios', label: t('quote.mobile_ios') },
                          { value: 'both', label: t('quote.mobile_both') },
                          { value: 'pwa', label: t('quote.mobile_pwa') },
                        ].map((option) => (
                          <FormControlLabel
                            key={option.value}
                            control={
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onChange={(e) => {
                                  const currentValue = field.value || [];
                                  const newValue = e.target.checked
                                    ? [...currentValue, option.value]
                                    : currentValue.filter((v) => v !== option.value);
                                  field.onChange(newValue);
                                }}
                              />
                            }
                            label={option.label}
                          />
                        ))}
                      </Stack>
                    </FormControl>
                  )}
                />
              </Box>
            )}

            {selectedSolutionType === 'desktop' && (
              <Box sx={{ pl: 4 }}>
                <Controller
                  name="systemType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>{t('quote.systemTypeLabel')}</InputLabel>
                      <Select {...field} label={t('quote.systemTypeLabel')}>
                        <MenuItem value="desktop">{t('quote.system_desktop')}</MenuItem>
                        <MenuItem value="web-internal">{t('quote.system_webInternal')}</MenuItem>
                        <MenuItem value="hybrid">{t('quote.system_hybrid')}</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            )}

            {/* BLOQUE 5: Funcionalidades */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block5Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Controller
                name="features"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.features}>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                      {t('quote.featuresLabel')} *
                    </Typography>
                    {featureOptions.map((category) => (
                      <Box key={category.category} sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                          {category.category}
                        </Typography>
                        <Stack spacing={0.5}>
                          {category.options.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              control={
                                <Checkbox
                                  checked={field.value.includes(option.value)}
                                  onChange={(e) => {
                                    const newValue = e.target.checked
                                      ? [...field.value, option.value]
                                      : field.value.filter((v) => v !== option.value);
                                    field.onChange(newValue);
                                  }}
                                />
                              }
                              label={option.label}
                            />
                          ))}
                        </Stack>
                      </Box>
                    ))}
                    {errors.features && <FormHelperText>{errors.features.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Box>

            {/* BLOQUE 6: Roles del Sistema */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block6Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Controller
                name="hasRoles"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.hasRoles}>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                      {t('quote.hasRolesLabel')} *
                    </Typography>
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label={t('quote.hasRoles_yes')}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label={t('quote.hasRoles_no')}
                      />
                      <FormControlLabel
                        value="unsure"
                        control={<Radio />}
                        label={t('quote.hasRoles_unsure')}
                      />
                    </RadioGroup>
                    {errors.hasRoles && <FormHelperText>{errors.hasRoles.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              {watch('hasRoles') === 'yes' && (
                <Controller
                  name="roles"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={2}
                      label={t('quote.rolesLabel')}
                      sx={{ mt: 2 }}
                    />
                  )}
                />
              )}
            </Box>

            {/* BLOQUE 7: Diseño y Experiencia */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block7Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={3}>
                <Controller
                  name="hasDesign"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.hasDesign}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                        {t('quote.hasDesignLabel')} *
                      </Typography>
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="complete"
                          control={<Radio />}
                          label={t('quote.hasDesign_complete')}
                        />
                        <FormControlLabel
                          value="logo"
                          control={<Radio />}
                          label={t('quote.hasDesign_logo')}
                        />
                        <FormControlLabel
                          value="none"
                          control={<Radio />}
                          label={t('quote.hasDesign_none')}
                        />
                      </RadioGroup>
                      {errors.hasDesign && (
                        <FormHelperText>{errors.hasDesign.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="needsPrototype"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.needsPrototype}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                        {t('quote.needsPrototypeLabel')} *
                      </Typography>
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label={t('quote.needsPrototype_yes')}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label={t('quote.needsPrototype_no')}
                        />
                      </RadioGroup>
                      {errors.needsPrototype && (
                        <FormHelperText>{errors.needsPrototype.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="visualStyle"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.visualStyle}>
                      <InputLabel>{t('quote.visualStyleLabel')} *</InputLabel>
                      <Select {...field} label={`${t('quote.visualStyleLabel')} *`}>
                        <MenuItem value="minimalist">{t('quote.visualStyle_minimalist')}</MenuItem>
                        <MenuItem value="corporate">{t('quote.visualStyle_corporate')}</MenuItem>
                        <MenuItem value="modern">{t('quote.visualStyle_modern')}</MenuItem>
                        <MenuItem value="dynamic">{t('quote.visualStyle_dynamic')}</MenuItem>
                        <MenuItem value="no-preference">
                          {t('quote.visualStyle_noPreference')}
                        </MenuItem>
                      </Select>
                      {errors.visualStyle && (
                        <FormHelperText>{errors.visualStyle.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            </Box>

            {/* BLOQUE 8: Requerimientos Técnicos */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block8Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={3}>
                <Controller
                  name="needsCloud"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.needsCloud}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                        {t('quote.needsCloudLabel')} *
                      </Typography>
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label={t('quote.needsCloud_yes')}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label={t('quote.needsCloud_no')}
                        />
                        <FormControlLabel
                          value="unsure"
                          control={<Radio />}
                          label={t('quote.needsCloud_unsure')}
                        />
                      </RadioGroup>
                      {errors.needsCloud && (
                        <FormHelperText>{errors.needsCloud.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="securityLevel"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.securityLevel}>
                      <InputLabel>{t('quote.securityLevelLabel')} *</InputLabel>
                      <Select {...field} label={`${t('quote.securityLevelLabel')} *`}>
                        <MenuItem value="standard">{t('quote.securityLevel_standard')}</MenuItem>
                        <MenuItem value="high">{t('quote.securityLevel_high')}</MenuItem>
                      </Select>
                      {errors.securityLevel && (
                        <FormHelperText>{errors.securityLevel.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="needsIntegrations"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.needsIntegrations}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                        {t('quote.needsIntegrationsLabel')} *
                      </Typography>
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label={t('quote.needsIntegrations_yes')}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label={t('quote.needsIntegrations_no')}
                        />
                      </RadioGroup>
                      {errors.needsIntegrations && (
                        <FormHelperText>{errors.needsIntegrations.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                {watch('needsIntegrations') === 'yes' && (
                  <Controller
                    name="integrations"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={t('quote.integrationsLabel')}
                        placeholder={t('quote.integrationsPlaceholder')}
                      />
                    )}
                  />
                )}
              </Stack>
            </Box>

            {/* BLOQUE 9: Tiempo y Presupuesto */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block9Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="timeline"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.timeline}>
                        <InputLabel>{t('quote.timelineLabel')} *</InputLabel>
                        <Select {...field} label={`${t('quote.timelineLabel')} *`}>
                          <MenuItem value="less-1">{t('quote.timeline_less1')}</MenuItem>
                          <MenuItem value="1-3">{t('quote.timeline_1to3')}</MenuItem>
                          <MenuItem value="3-6">{t('quote.timeline_3to6')}</MenuItem>
                          <MenuItem value="6+">{t('quote.timeline_6plus')}</MenuItem>
                        </Select>
                        {errors.timeline && (
                          <FormHelperText>{errors.timeline.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="budget"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.budget}>
                        <InputLabel>{t('quote.budgetLabel')} *</InputLabel>
                        <Select {...field} label={`${t('quote.budgetLabel')} *`}>
                          <MenuItem value="less-1k">{t('quote.budget_less1k')}</MenuItem>
                          <MenuItem value="1k-3k">{t('quote.budget_1kto3k')}</MenuItem>
                          <MenuItem value="3k-5k">{t('quote.budget_3kto5k')}</MenuItem>
                          <MenuItem value="5k-10k">{t('quote.budget_5kto10k')}</MenuItem>
                          <MenuItem value="10k+">{t('quote.budget_10kplus')}</MenuItem>
                        </Select>
                        {errors.budget && <FormHelperText>{errors.budget.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* BLOQUE 10: Soporte y Continuidad */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block10Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Controller
                name="needsSupport"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.needsSupport}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                      {t('quote.needsSupportLabel')}
                    </Typography>
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="monthly"
                        control={<Radio />}
                        label={t('quote.needsSupport_monthly')}
                      />
                      <FormControlLabel
                        value="yearly"
                        control={<Radio />}
                        label={t('quote.needsSupport_yearly')}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label={t('quote.needsSupport_no')}
                      />
                    </RadioGroup>
                    {errors.needsSupport && (
                      <FormHelperText>{errors.needsSupport.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            {/* BLOQUE 11: Comentarios Finales */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                {t('quote.block11Title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Controller
                name="additionalComments"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={5}
                    label={t('quote.additionalCommentsLabel')}
                    error={!!errors.additionalComments}
                    helperText={errors.additionalComments?.message}
                  />
                )}
              />
            </Box>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 3 }}
            >
              {t('quote.submit') || 'Enviar Solicitud de Cotización'}
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
