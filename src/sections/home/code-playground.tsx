import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const codeExamples = [
  {
    labelKey: 'codePlayground.helloWorld',
    code: 'console.log("Hello, World!");',
    output: 'Hello, World!',
  },
  {
    labelKey: 'codePlayground.sumFunction',
    code: 'const sum = (a, b) => a + b;\nsum(5, 3);',
    output: '8',
  },
  {
    labelKey: 'codePlayground.arrayFilter',
    code: 'const numbers = [1, 2, 3, 4, 5];\nnumbers.filter(n => n > 2);',
    output: '[3, 4, 5]',
  },
  {
    labelKey: 'codePlayground.objectTransform',
    code: 'const user = { name: "Jazmin", role: "Architect" };\n`${user.name} is a ${user.role}`;',
    output: 'Jazmin is a Architect',
  },
];

// ----------------------------------------------------------------------

export function CodePlayground() {
  const theme = useTheme();
  const { t } = useTranslate();
  const [code, setCode] = useState(codeExamples[0].code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);

    // Simulate code execution
    setTimeout(() => {
      try {
        // Simple evaluation for demo purposes
        // In production, you'd use a proper sandbox
        const example = codeExamples.find((ex) => ex.code === code);
        if (example) {
          setOutput(example.output);
        } else {
          setOutput('Code executed successfully!');
        }
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
      setIsRunning(false);
    }, 800);
  };

  const handleExampleClick = (example: (typeof codeExamples)[0]) => {
    setCode(example.code);
    setOutput('');
  };

  return (
    <Card
      sx={{
        p: 4,
        bgcolor: alpha(theme.palette.grey[900], 0.04),
        backdropFilter: 'blur(8px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.16),
              }}
            >
              <Iconify
                icon={'solar:code-square-bold-duotone' as any}
                width={28}
                color="primary.main"
              />
            </Box>
            <Box>
              <Typography variant="h6">{t('codePlayground.title')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('codePlayground.subtitle')}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Code Examples */}
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {codeExamples.map((example, index) => (
            <Chip
              key={index}
              label={t(example.labelKey)}
              onClick={() => handleExampleClick(example)}
              variant={code === example.code ? 'filled' : 'outlined'}
              color={code === example.code ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>

        {/* Code Editor */}
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {t('codePlayground.codeEditor')}
          </Typography>
          <TextField
            multiline
            rows={6}
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('codePlayground.placeholder')}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                color: theme.palette.mode === 'dark' ? 'primary.light' : 'text.primary',
                '& textarea': {
                  color: theme.palette.mode === 'dark' ? 'primary.light' : 'text.primary',
                },
              },
            }}
          />
        </Box>

        {/* Run Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleRunCode}
          disabled={isRunning}
          startIcon={
            isRunning ? (
              <m.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Iconify icon={'solar:refresh-bold-duotone' as any} />
              </m.div>
            ) : (
              <Iconify icon={'solar:play-bold-duotone' as any} />
            )
          }
          sx={{
            py: 1.5,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {isRunning ? t('codePlayground.running') : t('codePlayground.runCode')}
        </Button>

        {/* Output Console */}
        {output && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('codePlayground.consoleOutput')}
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                  border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  color: 'success.main',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {output}
              </Box>
            </Box>
          </m.div>
        )}

        {/* Stats */}
        <Stack
          direction="row"
          spacing={3}
          sx={{ pt: 2, borderTop: `1px dashed ${alpha(theme.palette.grey[500], 0.2)}` }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify
              icon={'solar:check-circle-bold-duotone' as any}
              width={20}
              color="success.main"
            />
            <Typography variant="caption" color="text.secondary">
              {t('codePlayground.statSandbox')}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon={'solar:code-bold-duotone' as any} width={20} color="info.main" />
            <Typography variant="caption" color="text.secondary">
              {t('codePlayground.statLanguage')}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon={'solar:bolt-bold-duotone' as any} width={20} color="warning.main" />
            <Typography variant="caption" color="text.secondary">
              {t('codePlayground.statResults')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
