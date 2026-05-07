import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { AnimatedLogo } from 'src/components/logo';

// ----------------------------------------------------------------------

const FooterRoot = styled('footer')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.vars.palette.background.default,
}));

export type FooterProps = React.ComponentProps<typeof FooterRoot>;

export function Footer({
  sx,
  layoutQuery = 'md',
  ...other
}: FooterProps & { layoutQuery?: Breakpoint }) {
  const { t } = useTranslate();

  const LINKS = [
    {
      headline: t('footer.freakjazz'),
      children: [
        { name: t('footer.home'), href: paths.home },
        { name: t('common.projects'), href: paths.projects },
        { name: t('footer.contactUs'), href: paths.contact },
        { name: t('footer.github'), href: 'https://github.com/FreakJazz', external: true },
      ],
    },
    {
      headline: t('footer.contact'),
      children: [{ name: t('footer.email'), href: `mailto:${t('footer.email')}` }],
    },
  ];

  return (
    <FooterRoot sx={sx} {...other}>
      <Divider />

      <Container
        sx={(theme) => ({
          pb: 5,
          pt: 10,
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        })}
      >
        <AnimatedLogo />

        <Grid
          container
          sx={[
            (theme) => ({
              mt: 3,
              justifyContent: 'center',
              [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
            }),
          ]}
        >
          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              })}
            >
              {t('footer.description')}
            </Typography>

            <Box
              sx={(theme) => ({
                mt: 3,
                mb: 5,
                display: 'flex',
                justifyContent: 'center',
                [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: 'flex-start' },
              })}
            >
              <IconButton
                component="a"
                href="https://github.com/FreakJazz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Iconify icon={'mdi:github' as any} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/jazmin-rodriguez-bermeo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Iconify icon={'mdi:linkedin' as any} />
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 6 }}>
            <Box
              sx={(theme) => ({
                gap: 5,
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
              })}
            >
              {LINKS.map((list) => (
                <Box
                  key={list.headline}
                  sx={(theme) => ({
                    gap: 2,
                    width: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
                  })}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={link.external ? 'a' : RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                      {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10, mb: { xs: 8, md: 0 } }}>
          {t('footer.allRights')}
        </Typography>
      </Container>
    </FooterRoot>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx, ...other }: FooterProps) {
  const { t } = useTranslate();

  return (
    <FooterRoot
      sx={[
        {
          py: 5,
          textAlign: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <AnimatedLogo />
        <Box sx={{ mt: 1, mb: { xs: 8, md: 0 }, typography: 'caption', color: 'text.secondary' }}>
          {t('footer.allRights')}
        </Box>
      </Container>
    </FooterRoot>
  );
}
