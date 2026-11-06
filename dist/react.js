'use client';
/*! Linework UI v1.0.0 | MIT | drafting-table design system */
import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  version,
} from 'react';
import { createPortal } from 'react-dom';
import Linework from './linework.js';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/* React 19 assigns props to same-named element properties; React 18 writes them as attributes. */
const propsAreProperties = Number(version.split('.')[0]) >= 19;

/* Listeners are attached once; the latest handler is read through a ref on every event. */
function useElementEvents(ref, handlers) {
  const latest = useRef(handlers);
  latest.current = handlers;
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const listeners = Object.keys(latest.current).map((name) => {
      const listener = (event) => {
        if (event.target === node) latest.current[name]?.(event);
      };
      node.addEventListener(name, listener);
      return [name, listener];
    });
    return () => listeners.forEach(([name, listener]) => node.removeEventListener(name, listener));
  }, [ref]);
}

/* Custom elements read booleans from attribute presence, so false must drop the attribute. */
function flag(value) {
  return value ? '' : undefined;
}

/* React 18 writes className literally on custom elements; the class attribute works in 18 and 19. */
function host({ className, ...rest }) {
  return className === undefined ? rest : { ...rest, class: className };
}

function useForwardedElement(ref) {
  const inner = useRef(null);
  useImperativeHandle(ref, () => inner.current, []);
  return inner;
}

export const Drawer = forwardRef(function Drawer(
  { open, label, width, dismissible, onOpen, onClose, children, ...rest },
  ref
) {
  const inner = useForwardedElement(ref);
  const [dialog, setDialog] = useState(null);
  useIsomorphicLayoutEffect(() => {
    setDialog(inner.current?.dialog ?? null);
  }, []);
  useElementEvents(inner, { 'lw-open': onOpen, 'lw-close': onClose });
  /* open() is a method on the element, so the prop is never passed through; a modal needs JS to show anyway. */
  useIsomorphicLayoutEffect(() => {
    const node = inner.current;
    if (!node || open === undefined) return;
    if (open) node.setAttribute('open', '');
    else node.removeAttribute('open');
  }, [open]);
  return createElement(
    'lw-drawer',
    {
      ...host(rest),
      ref: inner,
      label,
      width: width === undefined ? undefined : String(width),
      dismissible: dismissible === false ? 'false' : undefined,
    },
    dialog ? createPortal(children, dialog) : null
  );
});

export const Tabs = forwardRef(function Tabs({ selected, onChange, children, ...rest }, ref) {
  const inner = useForwardedElement(ref);
  useElementEvents(inner, { 'lw-change': onChange });
  useEffect(() => {
    if (selected !== undefined && inner.current?.selectedIndex !== selected) {
      inner.current?.select(selected, false);
    }
  }, [selected]);
  return createElement(
    'lw-tabs',
    { ...host(rest), ref: inner, selected: selected === undefined ? undefined : String(selected) },
    children
  );
});

export const Pad = forwardRef(function Pad(
  { name, keys, length, duration, progress, playing, menu, onPress, onPlay, onStop, onEnd, onMenu, ...rest },
  ref
) {
  const inner = useForwardedElement(ref);
  useElementEvents(inner, {
    'lw-press': onPress,
    'lw-play': onPlay,
    'lw-stop': onStop,
    'lw-end': onEnd,
    'lw-menu': onMenu,
  });
  return createElement('lw-pad', {
    ...host(rest),
    ref: inner,
    progress: progress === undefined || propsAreProperties ? progress : String(progress),
    playing: propsAreProperties ? playing : flag(playing),
    name,
    keys,
    length,
    duration: duration === undefined ? undefined : String(duration),
    menu: menu === true ? '' : menu || undefined,
  });
});

export const Meter = forwardRef(function Meter({ level, bars, live, tone, label, ...rest }, ref) {
  const inner = useForwardedElement(ref);
  return createElement('lw-meter', {
    ...host(rest),
    ref: inner,
    level: level === undefined ? undefined : String(level),
    bars: bars === undefined ? undefined : String(bars),
    live: flag(live),
    tone,
    label,
  });
});

export const Combobox = forwardRef(function Combobox({ empty, onChange, children, ...rest }, ref) {
  const inner = useForwardedElement(ref);
  useElementEvents(inner, { 'lw-change': onChange });
  return createElement('lw-combobox', { ...host(rest), ref: inner, empty }, children);
});

export const Command = forwardRef(function Command(
  { label, placeholder, shortcut, empty, onSelect, children, ...rest },
  ref
) {
  const inner = useForwardedElement(ref);
  useElementEvents(inner, { 'lw-select': onSelect });
  return createElement(
    'lw-command',
    { ...host(rest), ref: inner, label, placeholder, shortcut, empty },
    children
  );
});

export const Calendar = forwardRef(function Calendar(
  { value, min, max, locale, onChange, ...rest },
  ref
) {
  const inner = useForwardedElement(ref);
  useElementEvents(inner, { 'lw-change': onChange });
  return createElement('lw-calendar', { ...host(rest), ref: inner, value, min, max, locale });
});

export { Linework };
export default Linework;
