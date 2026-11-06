/** Types for the JavaScript API and custom elements. CSS is typed through class names. */

export type LineworkTheme = 'trace' | 'blueprint' | 'vellum';

export type ToastTone = 'default' | 'blue' | 'success' | 'warning';

export interface ToastOptions {
  title?: string;
  message?: string;
  tone?: ToastTone;
  /** Milliseconds before auto-dismiss. Default 4200. */
  duration?: number;
}

export interface ThemeOptions {
  /** Persist the choice to localStorage. Default true. */
  persist?: boolean;
}

export interface IconApi {
  readonly names: string[];
  install(): void;
  /** Returns SVG markup referencing the installed sprite. */
  markup(name: string, className?: string): string;
}

export interface LineworkApi {
  readonly version: string;
  readonly themes: LineworkTheme[];
  getTheme(): LineworkTheme;
  setTheme(name: LineworkTheme | string, options?: ThemeOptions): LineworkTheme;
  cycleTheme(): LineworkTheme;
  toast(options?: ToastOptions | string): HTMLElement | null;
  copy(text: string): Promise<boolean>;
  open(target: string | Element): Element | null;
  close(target: string | Element): Element | null;
  refresh(root?: Document | Element): void;
  formatDuration(seconds: number): string;
  readonly icons: IconApi;
}

export interface LwDrawerElement extends HTMLElement {
  open(): void;
  close(): void;
  readonly isOpen: boolean;
  readonly dialog: HTMLDialogElement | null;
}

export interface LwTabsElement extends HTMLElement {
  select(index: number, emit?: boolean): void;
  readonly selectedIndex: number;
}

export interface LwPadElement extends HTMLElement {
  play(seconds?: number): number;
  stop(reason?: string): void;
  toggle(): void;
  setProgress(progress: number, remainingSeconds?: number): void;
  playing: boolean;
  progress: number;
}

export interface LwMeterElement extends HTMLElement {
  level: number;
}

export interface LwToastStackElement extends HTMLElement {
  show(options?: ToastOptions | string): HTMLElement | null;
}

export interface LwDrawerEventDetail {
  drawer?: LwDrawerElement;
}

export interface LwTabsChangeDetail {
  index: number;
  tab: HTMLElement;
  panel: HTMLElement | undefined;
}

export interface LwPadEventDetail {
  pad: LwPadElement;
}

export interface LwPadMenuDetail extends LwPadEventDetail {
  anchor: HTMLElement;
}

export interface LwPadPlayDetail extends LwPadEventDetail {
  duration: number;
}

export interface LwPadStopDetail extends LwPadEventDetail {
  reason: string;
}

export declare const Linework: LineworkApi;
export default Linework;

declare global {
  interface Window {
    Linework: LineworkApi;
  }

  interface HTMLElementEventMap {
    'lw-open': CustomEvent<LwDrawerEventDetail | null>;
    'lw-close': CustomEvent<LwDrawerEventDetail>;
    'lw-change': CustomEvent<LwTabsChangeDetail>;
    'lw-press': CustomEvent<LwPadEventDetail>;
    'lw-menu': CustomEvent<LwPadMenuDetail>;
    'lw-play': CustomEvent<LwPadPlayDetail>;
    'lw-stop': CustomEvent<LwPadStopDetail>;
    'lw-end': CustomEvent<LwPadEventDetail>;
  }

  interface DocumentEventMap {
    'linework:theme': CustomEvent<{ theme: LineworkTheme }>;
    'linework:ready': CustomEvent<{ linework: LineworkApi }>;
  }

  interface HTMLElementTagNameMap {
    'lw-drawer': LwDrawerElement;
    'lw-tabs': LwTabsElement;
    'lw-pad': LwPadElement;
    'lw-meter': LwMeterElement;
    'lw-toast-stack': LwToastStackElement;
  }
}
