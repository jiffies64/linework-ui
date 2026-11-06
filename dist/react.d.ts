import type { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import type {
  LineworkApi,
  LwCalendarChangeDetail,
  LwCalendarElement,
  LwComboboxChangeDetail,
  LwComboboxElement,
  LwCommandElement,
  LwCommandSelectDetail,
  LwDrawerElement,
  LwDrawerEventDetail,
  LwMeterElement,
  LwPadElement,
  LwPadEventDetail,
  LwPadMenuDetail,
  LwPadPlayDetail,
  LwPadStopDetail,
  LwTabsChangeDetail,
  LwTabsElement,
} from './linework.js';

type Base<E extends HTMLElement> = Omit<HTMLAttributes<E>, 'onChange' | 'onSelect' | 'onPlay' | 'onClose' | 'onOpen'> & {
  children?: ReactNode;
};

type Component<P, E extends HTMLElement> = ForwardRefExoticComponent<P & RefAttributes<E>>;

export interface DrawerProps extends Base<LwDrawerElement> {
  open?: boolean;
  label?: string;
  width?: number | string;
  dismissible?: boolean;
  onOpen?: (event: CustomEvent<LwDrawerEventDetail | null>) => void;
  onClose?: (event: CustomEvent<LwDrawerEventDetail>) => void;
}

export interface TabsProps extends Base<LwTabsElement> {
  selected?: number;
  onChange?: (event: CustomEvent<LwTabsChangeDetail>) => void;
}

export interface PadProps extends Omit<Base<LwPadElement>, 'children'> {
  name?: string;
  keys?: string;
  length?: string;
  duration?: number;
  progress?: number;
  playing?: boolean;
  /** true adds the menu key; a string also opens the .lw-menu with that id. */
  menu?: boolean | string;
  onPress?: (event: CustomEvent<LwPadEventDetail>) => void;
  onPlay?: (event: CustomEvent<LwPadPlayDetail>) => void;
  onStop?: (event: CustomEvent<LwPadStopDetail>) => void;
  onEnd?: (event: CustomEvent<LwPadEventDetail>) => void;
  onMenu?: (event: CustomEvent<LwPadMenuDetail>) => void;
}

export interface MeterProps extends Omit<Base<LwMeterElement>, 'children'> {
  level?: number;
  bars?: number;
  live?: boolean;
  tone?: 'redline';
  label?: string;
}

export interface ComboboxProps extends Base<LwComboboxElement> {
  empty?: string;
  onChange?: (event: CustomEvent<LwComboboxChangeDetail>) => void;
}

export interface CommandProps extends Base<LwCommandElement> {
  label?: string;
  placeholder?: string;
  /** Key that opens the palette with Ctrl or Cmd, for example "k". */
  shortcut?: string;
  empty?: string;
  onSelect?: (event: CustomEvent<LwCommandSelectDetail>) => void;
}

export interface CalendarProps extends Omit<Base<LwCalendarElement>, 'children'> {
  /** YYYY-MM-DD */
  value?: string;
  min?: string;
  max?: string;
  locale?: string;
  onChange?: (event: CustomEvent<LwCalendarChangeDetail>) => void;
}

export declare const Drawer: Component<DrawerProps, LwDrawerElement>;
export declare const Tabs: Component<TabsProps, LwTabsElement>;
export declare const Pad: Component<PadProps, LwPadElement>;
export declare const Meter: Component<MeterProps, LwMeterElement>;
export declare const Combobox: Component<ComboboxProps, LwComboboxElement>;
export declare const Command: Component<CommandProps, LwCommandElement>;
export declare const Calendar: Component<CalendarProps, LwCalendarElement>;

export declare const Linework: LineworkApi;
export default Linework;
