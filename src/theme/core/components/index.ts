import type { Theme, Components } from '@mui/material/styles';

import { card } from './card';
import { chip } from './chip';
import { form } from './form';
import { link } from './link';
import { list } from './list';
import { menu } from './menu';
import { tabs } from './tabs';
import { alert } from './alert';
import { badge } from './badge';
import { paper } from './paper';
import { radio } from './radio';
import { stack } from './stack';
import { table } from './table';
import { appBar } from './appbar';
import { avatar } from './avatar';
import { button } from './button';
import { dialog } from './dialog';
import { drawer } from './drawer';
import { rating } from './rating';
import { select } from './select';
import { slider } from './slider';
import { fab } from './button-fab';
import { popover } from './popover';
import { stepper } from './stepper';
import { switches } from './switch';
import { tooltip } from './tooltip';
import { svgIcon } from './svg-icon';
import { backdrop } from './backdrop';
import { checkbox } from './checkbox';
import { progress } from './progress';
import { skeleton } from './skeleton';
import { timeline } from './timeline';
import { accordion } from './accordion';
import { textField } from './text-field';
import { pagination } from './pagination';
import { iconButton } from './button-icon';
import { breadcrumbs } from './breadcrumbs';
import { buttonGroup } from './button-group';
import { autocomplete } from './autocomplete';
import { toggleButton } from './button-toggle';

// ----------------------------------------------------------------------

export const components: Components<Theme> = {
  ...card,
  ...link,
  ...tabs,
  ...chip,
  ...menu,
  ...list,
  ...stack,
  ...paper,
  ...table,
  ...alert,
  ...badge,
  ...dialog,
  ...appBar,
  ...avatar,
  ...drawer,
  ...stepper,
  ...tooltip,
  ...popover,
  ...svgIcon,
  ...skeleton,
  ...timeline,
  ...backdrop,
  ...progress,
  ...accordion,
  ...pagination,
  ...breadcrumbs,
  // ➤➤ Forms ➤➤
  ...form,
  ...radio,
  ...select,
  ...slider,
  ...rating,
  ...switches,
  ...checkbox,
  ...textField,
  ...autocomplete,
  // ➤➤ Buttons ➤➤
  ...fab,
  ...button,
  ...iconButton,
  ...buttonGroup,
  ...toggleButton,
};
