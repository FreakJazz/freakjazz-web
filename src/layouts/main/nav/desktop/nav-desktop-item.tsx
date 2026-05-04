import type { CSSObject } from '@mui/material/styles';
import type { NavItemProps } from '../types';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from 'src/components/iconify';
import { createNavItem, navItemStyles, navSectionClasses } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export function NavItem({
  title,
  path,
  icon,
  /********/
  open,
  active,
  /********/
  subItem,
  hasChild,
  className,
  externalLink,
  iconsOnly,
  ...other
}: NavItemProps) {
  const navItem = createNavItem({ path, hasChild, externalLink });

  const ownerState: StyledState = {
    open,
    active,
    variant: !subItem ? 'rootItem' : 'subItem',
    iconsOnly,
  };

  return (
    <ItemRoot
      disableRipple
      aria-label={title}
      {...ownerState}
      {...navItem.baseProps}
      className={mergeClasses([navSectionClasses.item.root, className], {
        [navSectionClasses.state.open]: open,
        [navSectionClasses.state.active]: active,
      })}
      {...other}
    >
      {icon && (
        <ItemIcon {...ownerState} className="nav-item-icon">
          {icon}
        </ItemIcon>
      )}
      <ItemTitle {...ownerState} className="nav-item-text">
        {' '}
        {title}
      </ItemTitle>

      {hasChild && <ItemArrow {...ownerState} icon="eva:arrow-ios-downward-fill" />}
    </ItemRoot>
  );
}

// ----------------------------------------------------------------------

type StyledState = Pick<NavItemProps, 'open' | 'active' | 'iconsOnly'> & {
  variant: 'rootItem' | 'subItem';
};

const shouldForwardProp = (prop: string) =>
  !['open', 'active', 'variant', 'sx', 'iconsOnly'].includes(prop);

/**
 * @slot root
 */
const ItemRoot = styled(ButtonBase, { shouldForwardProp })<StyledState>(({
  active,
  open,
  theme,
  iconsOnly,
}) => {
  const dotTransitions: Record<'in' | 'out', CSSObject> = {
    in: { opacity: 0, scale: 0 },
    out: { opacity: 1, scale: 1 },
  };

  const dotStyles: CSSObject = {
    ...dotTransitions.in,
    width: 6,
    height: 6,
    left: -12,
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: varAlpha(theme.vars.palette.text.disabledChannel, 0.64),
    transition: theme.transitions.create(['opacity', 'scale'], {
      duration: theme.transitions.duration.shorter,
    }),
    ...(active && { ...dotTransitions.out, backgroundColor: theme.vars.palette.primary.main }),
  };

  const rootItemStyles: CSSObject = {
    ...(open && { '&::before': { ...dotTransitions.out } }),
    ...(active && { color: theme.vars.palette.primary.main }),
  };

  const subItemStyles: CSSObject = {
    color: theme.vars.palette.text.secondary,
    '&:hover': { color: theme.vars.palette.text.primary },
    ...(active && { color: theme.vars.palette.text.primary }),
  };

  return {
    flexDirection: iconsOnly ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: iconsOnly ? theme.spacing(1.5, 1) : theme.spacing(1, 2),
    gap: iconsOnly ? theme.spacing(0.5) : theme.spacing(1),
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&::before': dotStyles,
    '&:hover::before': { ...dotTransitions.out },
    variants: [
      { props: { variant: 'rootItem' }, style: rootItemStyles },
      { props: { variant: 'subItem' }, style: subItemStyles },
    ],
  };
});

/**
 * @slot icon
 */
const ItemIcon = styled('span', { shouldForwardProp })<StyledState>(({ theme, iconsOnly }) => ({
  width: iconsOnly ? 32 : 24,
  height: iconsOnly ? 32 : 24,
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: iconsOnly ? 0 : theme.spacing(1.5),
  '& svg': {
    width: iconsOnly ? 28 : 22,
    height: iconsOnly ? 28 : 22,
  },
}));

/**
 * @slot title
 */
const ItemTitle = styled('span', { shouldForwardProp })<StyledState>(({ theme, iconsOnly }) => ({
  ...navItemStyles.title(theme),
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: iconsOnly ? theme.typography.pxToRem(10.5) : 'inherit',
  textAlign: iconsOnly ? 'center' : 'left',
  lineHeight: iconsOnly ? 1.2 : 'inherit',
  whiteSpace: iconsOnly ? 'nowrap' : 'inherit',
  variants: [
    { props: { variant: 'subItem' }, style: { fontSize: theme.typography.pxToRem(13) } },
    { props: { active: true }, style: { fontWeight: theme.typography.fontWeightSemiBold } },
  ],
}));

/**
 * @slot arrow
 */
const ItemArrow = styled(Iconify, { shouldForwardProp })<StyledState>(({ theme }) => ({
  ...navItemStyles.arrow(theme),
}));
