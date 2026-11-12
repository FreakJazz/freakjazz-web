import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function getNavData(t: (key: string) => string): NavMainProps['data'] {
  return [
    {
      title: t('common.home'),
      path: '/',
      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
    },
    {
      title: t('common.projects'),
      path: paths.projects,
      icon: <Iconify width={22} icon={'solar:folder-with-files-bold-duotone' as any} />,
    },
    {
      title: t('common.about'),
      path: paths.about,
      icon: <Iconify width={22} icon={'solar:user-id-bold-duotone' as any} />,
    },
    {
      title: t('common.contact'),
      path: paths.contact,
      icon: <Iconify width={22} icon={'solar:letter-bold-duotone' as any} />,
    },
  ];
}
