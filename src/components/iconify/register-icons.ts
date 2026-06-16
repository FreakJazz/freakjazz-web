import type { IconifyJSON } from '@iconify/react';

import { addCollection } from '@iconify/react';
import mdiIcons from '@iconify/json/json/mdi.json';
import solarIcons from '@iconify/json/json/solar.json';
import deviconIcons from '@iconify/json/json/devicon.json';
import gameIconsIcons from '@iconify/json/json/game-icons.json';
import circleFlagsIcons from '@iconify/json/json/circle-flags.json';

import allIcons from './icon-sets';

// ----------------------------------------------------------------------

export const iconSets = Object.entries(allIcons).reduce((acc, [key, value]) => {
  const [prefix, iconName] = key.split(':');
  const existingPrefix = acc.find((item) => item.prefix === prefix);

  if (existingPrefix) {
    existingPrefix.icons[iconName] = value;
  } else {
    acc.push({
      prefix,
      icons: {
        [iconName]: value,
      },
    });
  }

  return acc;
}, [] as IconifyJSON[]);

export const allIconNames = Object.keys(allIcons) as IconifyName[];

export type IconifyName = keyof typeof allIcons;

// ----------------------------------------------------------------------

let areIconsRegistered = false;

export function registerIcons() {
  if (areIconsRegistered) {
    return;
  }

  // Register complete offline collections
  if (solarIcons) {
    addCollection(solarIcons as IconifyJSON);
  }
  if (mdiIcons) {
    addCollection(mdiIcons as IconifyJSON);
  }
  if (deviconIcons) {
    addCollection(deviconIcons as IconifyJSON);
  }
  if (circleFlagsIcons) {
    addCollection(circleFlagsIcons as IconifyJSON);
  }
  if (gameIconsIcons) {
    addCollection(gameIconsIcons as IconifyJSON);
  }

  // Register custom icon sets with proper sizing
  iconSets.forEach((iconSet) => {
    const iconSetConfig = {
      ...iconSet,
      width: (iconSet.prefix === 'carbon' && 32) || 24,
      height: (iconSet.prefix === 'carbon' && 32) || 24,
    };

    addCollection(iconSetConfig);
  });

  areIconsRegistered = true;
}
