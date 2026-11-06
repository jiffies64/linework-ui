/*!
 * Linework behaviour: Web Components, icons, toasts, theming and copy.
 * Works as an ES module or a <script> global (window.Linework).
 */

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const BaseElement = isBrowser ? HTMLElement : class {};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);

/* Icons are decorative; pair them with text or an aria-label. */
const ICONS = {
  'arrow-right': '<path d="M4 12h15M14 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M6 18 18 6M8 6h10v10"/>',
  blocks:
    '<rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M9 21V9"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  clock:
    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  copy:
    '<rect x="9" y="9" width="11" height="11"/><path d="M15 5H5v10"/>',
  download:
    '<path d="M12 3v11M7.5 10.5 12 15l4.5-4.5M4 20h16"/>',
  external:
    '<path d="M14 4h6v6M20 4l-9 9M19 14v6H4V5h6"/>',
  file: '<path d="M6 2.5h7L19 8v13.5H6Z"/><path d="M12.5 2.5V8H19"/>',
  folder:
    '<path d="M3 6.5h6l2 3h10v10.5H3Z"/>',
  grid:
    '<rect x="3.5" y="3.5" width="7" height="7"/><rect x="13.5" y="3.5" width="7" height="7"/><rect x="3.5" y="13.5" width="7" height="7"/><rect x="13.5" y="13.5" width="7" height="7"/>',
  headphones:
    '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="4" y="14.5" width="3.5" height="6"/><rect x="16.5" y="14.5" width="3.5" height="6"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
  keyboard:
    '<rect x="2.5" y="6.5" width="19" height="11"/><path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M6 13.5h.01M9.5 13.5h.01M13 13.5h.01M16.5 13.5h.01M8 17h8"/>',
  link:
    '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l2-2a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-2 2a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  mic:
    '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/>',
  more: '<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  play: '<path d="M8 5.5 19 12 8 18.5Z" fill="currentColor" stroke="none"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.4 15.4 4.6 4.6"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/>',
  sheet:
    '<rect x="4" y="2.5" width="16" height="19"/><path d="M4 16h16M8.5 2.5v19"/>',
  stop: '<rect x="7" y="7" width="10" height="10" fill="currentColor" stroke="none"/>',
  theme:
    '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17A8.5 8.5 0 0 1 12 3.5Z" fill="currentColor" stroke="none"/>',
  trash:
    '<path d="M4 7h16M9 7V3.5h6V7M6.5 7l1 13h9l1-13"/><path d="M10 11v5M14 11v5"/>',
  volume:
    '<path d="M4 9.5h3.5L13 5v14l-5.5-4.5H4Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
  warning:
    '<path d="M12 3 22 20H2Z"/><path d="M12 9.5v4.5M12 17.5h.01"/>',
};

const ICON_NAMES = Object.keys(ICONS);

function icon(name, className = '') {
  const extra = className ? ` ${className}` : '';
  return `<svg class="lw-icon${extra}" aria-hidden="true" focusable="false"><use href="#lw-i-${name}"></use></svg>`;
}

function installIcons() {
  if (!isBrowser || document.getElementById('lw-icon-sprite')) return;
  const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sprite.setAttribute('id', 'lw-icon-sprite');
  sprite.setAttribute('class', 'lw-sprite');
  sprite.setAttribute('aria-hidden', 'true');
  sprite.setAttribute('focusable', 'false');
  sprite.innerHTML = ICON_NAMES.map(
    (name) =>
      `<symbol id="lw-i-${name}" viewBox="0 0 24 24">${ICONS[name]}</symbol>`
  ).join('');
  document.body.prepend(sprite);
}

const TOAST_TONE_WORDS = { success: 'Success', warning: 'Warning', blue: 'Info' };

class LwToastStack extends BaseElement {
  constructor() {
    super();
    this._count = 0;
  }

  connectedCallback() {
    this.classList.add('lw-toast-stack');
    this.setAttribute('aria-live', 'polite');
    this.setAttribute('aria-relevant', 'additions');
    this.setAttribute('aria-label', 'Notifications');
    if (typeof this.showPopover === 'function' && !this.hasAttribute('popover')) {
      this.setAttribute('popover', 'manual');
    }
  }

  _reveal() {
    if (typeof this.showPopover === 'function' && this.hasAttribute('popover')) {
      try {
        if (!this.matches(':popover-open')) this.showPopover();
      } catch {
        /* popover may not be available in very old engines; fixed fallback still works */
      }
    }
  }

  _conceal() {
    if (typeof this.hidePopover === 'function' && this.hasAttribute('popover')) {
      try {
        if (this.matches(':popover-open')) this.hidePopover();
      } catch {}
    }
  }

  show(options = {}) {
    const {
      title = '',
      message = '',
      tone = 'default',
      duration = 4200,
    } = typeof options === 'string' ? { message: options } : options;

    const toast = document.createElement('div');
    toast.className = 'lw-toast';
    if (tone && tone !== 'default') {
      const safeTone = String(tone).replace(/[^a-z]/gi, '');
      if (safeTone) toast.classList.add(`lw-toast--${safeTone}`);
    }

    const led = document.createElement('span');
    led.className = 'lw-toast__led';
    led.setAttribute('aria-hidden', 'true');

    const body = document.createElement('div');
    body.className = 'lw-toast__body';
    const toneWord = TOAST_TONE_WORDS[tone];
    if (toneWord) {
      const spoken = document.createElement('span');
      spoken.className = 'lw-vh';
      spoken.textContent = `${toneWord}: `;
      body.appendChild(spoken);
    }
    if (title) {
      const heading = document.createElement('div');
      heading.className = 'lw-toast__title';
      heading.textContent = title;
      body.appendChild(heading);
    }
    if (message) {
      const text = document.createElement('div');
      text.className = 'lw-toast__text';
      text.textContent = message;
      body.appendChild(text);
    }

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'lw-toast__close';
    close.setAttribute('aria-label', 'Dismiss notification');
    close.innerHTML = icon('close');

    toast.append(led, body, close);
    this.append(toast);
    this._count += 1;
    this._reveal();

    while (this.children.length > 4) {
      const oldest = this.firstElementChild;
      if (oldest) {
        oldest.remove();
        this._count = Math.max(0, this._count - 1);
      }
    }

    let done = false;
    let timer = null;
    let remaining = Math.max(1200, Number(duration) || 4200);
    let startedAt = performance.now();

    const dismiss = () => {
      if (done) return;
      done = true;
      if (timer) clearTimeout(timer);
      toast.classList.add('is-leaving');
      window.setTimeout(() => {
        toast.remove();
        this._count = Math.max(0, this._count - 1);
        if (this.children.length === 0) this._conceal();
      }, 220);
    };

    const startTimer = () => {
      if (done) return;
      startedAt = performance.now();
      timer = window.setTimeout(dismiss, remaining);
    };

    const pauseTimer = () => {
      if (done || !timer) return;
      clearTimeout(timer);
      timer = null;
      remaining -= performance.now() - startedAt;
      if (remaining < 400) remaining = 400;
    };

    close.addEventListener('click', dismiss);
    toast.addEventListener('mouseenter', pauseTimer);
    toast.addEventListener('mouseleave', startTimer);
    toast.addEventListener('focusin', pauseTimer);
    toast.addEventListener('focusout', (event) => {
      if (!toast.contains(event.relatedTarget)) startTimer();
    });

    startTimer();
    return toast;
  }
}

const openDrawers = new Set();

class LwDrawer extends BaseElement {
  static get observedAttributes() {
    return ['open', 'label', 'width'];
  }

  constructor() {
    super();
    this._dialog = null;
    this._opener = null;
    this._built = false;
    this._onClose = this._onClose.bind(this);
    this._onCancel = this._onCancel.bind(this);
  }

  connectedCallback() {
    if (this._built) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'lw-drawer';
    dialog.tabIndex = -1;

    this._applyLabel(dialog);

    while (this.firstChild) dialog.appendChild(this.firstChild);

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'lw-btn lw-btn--quiet lw-btn--icon lw-drawer__close';
    close.setAttribute('aria-label', 'Close panel');
    close.innerHTML = icon('close');
    close.addEventListener('click', () => this.close());
    dialog.appendChild(close);

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog && this.getAttribute('dismissible') !== 'false') {
        this.close();
        return;
      }
      const closer = event.target.closest?.('[data-lw-close]');
      if (closer && dialog.contains(closer)) this.close();
    });
    dialog.addEventListener('close', this._onClose);
    dialog.addEventListener('cancel', this._onCancel);

    this.appendChild(dialog);
    this._dialog = dialog;
    this._built = true;
    this._applyWidth();

    if (this.hasAttribute('open')) this._show();
  }

  disconnectedCallback() {
    openDrawers.delete(this);
    if (openDrawers.size === 0 && isBrowser) {
      document.documentElement.classList.remove('lw-scroll-lock');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._built || oldValue === newValue) return;
    if (name === 'open') {
      if (newValue === null) {
        if (this._dialog?.open) this._dialog.close();
      } else {
        this._show();
      }
    } else if (name === 'label' && this._dialog) {
      this._applyLabel(this._dialog);
    } else if (name === 'width') {
      this._applyWidth();
    }
  }

  _applyLabel(dialog) {
    const labelledBy = this.getAttribute('aria-labelledby');
    const label = this.getAttribute('label');
    if (labelledBy) dialog.setAttribute('aria-labelledby', labelledBy);
    if (label) dialog.setAttribute('aria-label', label);
    if (!labelledBy && !label) dialog.setAttribute('aria-label', 'Panel');
  }

  _applyWidth() {
    const width = this.getAttribute('width');
    if (!this._dialog) return;
    if (width) {
      this._dialog.style.setProperty(
        '--lw-sheet-width',
        /^\d+$/.test(width) ? `${width}px` : width
      );
    } else {
      this._dialog.style.removeProperty('--lw-sheet-width');
    }
  }

  _show() {
    if (!this._dialog || this._dialog.open || !this.isConnected) return;
    this._opener = document.activeElement;
    this._dialog.showModal();
    openDrawers.add(this);
    document.documentElement.classList.add('lw-scroll-lock');
    this.dispatchEvent(
      new CustomEvent('lw-open', { bubbles: true, detail: { drawer: this } })
    );
    requestAnimationFrame(() => {
      if (!this._dialog?.open) return;
      const auto = this._dialog.querySelector('[autofocus], [data-autofocus]');
      if (auto && typeof auto.focus === 'function') auto.focus();
      else this._dialog.focus();
    });
  }

  _onClose() {
    this.removeAttribute('open');
    openDrawers.delete(this);
    if (openDrawers.size === 0) {
      document.documentElement.classList.remove('lw-scroll-lock');
    }
    if (this._opener && typeof this._opener.focus === 'function') {
      try {
        this._opener.focus({ preventScroll: true });
      } catch {}
    }
    this.dispatchEvent(
      new CustomEvent('lw-close', { bubbles: true, detail: { drawer: this } })
    );
  }

  _onCancel(event) {
    if (this.getAttribute('dismissible') === 'false') event.preventDefault();
  }

  open() {
    if (!this._built) return;
    if (this.getAttribute('open') === null) this.setAttribute('open', '');
    else this._show();
  }

  close() {
    if (this._dialog?.open) this._dialog.close();
  }

  get isOpen() {
    return Boolean(this._dialog?.open);
  }

  get dialog() {
    return this._dialog;
  }
}

let tabSequence = 0;

class LwTabs extends BaseElement {
  constructor() {
    super();
    this._tabs = [];
    this._panels = [];
    this._index = 0;
    this._initialised = false;
  }

  connectedCallback() {
    if (this._initialised) return;
    const tablist = this.querySelector('.lw-tablist');
    const tabs = Array.from(this.querySelectorAll('.lw-tab'));
    const panels = Array.from(this.querySelectorAll('.lw-tabpanel'));
    if (!tablist || tabs.length === 0) return;

    this._initialised = true;
    this._tabs = tabs;
    this._panels = panels;
    if (!this.id) this.id = `lw-tabs-${++tabSequence}`;

    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-orientation', 'horizontal');

    const selectedAttr = parseInt(this.getAttribute('selected') || '0', 10);
    let initial = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    if (initial < 0) initial = Number.isFinite(selectedAttr) ? selectedAttr : 0;
    initial = clamp(initial, 0, tabs.length - 1);

    tabs.forEach((tab, index) => {
      if (!tab.id) tab.id = `${this.id}-tab-${index}`;
      tab.setAttribute('role', 'tab');
      if (!tab.hasAttribute('type') && tab.tagName === 'BUTTON') tab.type = 'button';

      const panel = panels[index];
      if (panel) {
        if (!panel.id) panel.id = `${this.id}-panel-${index}`;
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tab.id);
        if (panel.tagName !== 'SECTION' && !panel.hasAttribute('tabindex')) {
          panel.tabIndex = 0;
        }
      }

      tab.addEventListener('click', () => this.select(index));
      tab.addEventListener('keydown', (event) => this._onKeydown(event, index));
    });

    this.select(initial, false);
  }

  _onKeydown(event, index) {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const enabled = this._tabs.filter((tab) => !tab.disabled);
    if (enabled.length === 0) return;
    const current = this._tabs[index];
    let position = enabled.indexOf(current);

    if (event.key === 'Home') position = 0;
    else if (event.key === 'End') position = enabled.length - 1;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      position = (position + 1) % enabled.length;
    } else {
      position = (position - 1 + enabled.length) % enabled.length;
    }

    const next = enabled[position];
    const nextIndex = this._tabs.indexOf(next);
    next.focus();
    this.select(nextIndex);
  }

  select(index, emit = true) {
    if (!this._initialised) return;
    const next = clamp(Number(index) || 0, 0, this._tabs.length - 1);
    this._index = next;

    this._tabs.forEach((tab, position) => {
      const selected = position === next;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    this._panels.forEach((panel, position) => {
      if (position === next) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });

    this.setAttribute('selected', String(next));

    if (emit) {
      this.dispatchEvent(
        new CustomEvent('lw-change', {
          bubbles: true,
          detail: { index: next, tab: this._tabs[next], panel: this._panels[next] },
        })
      );
    }
  }

  get selectedIndex() {
    return this._index;
  }
}

const DIMENSION_MARKUP = `
  <span class="lw-dimension__cap" aria-hidden="true"></span>
  <span class="lw-dimension__rule" aria-hidden="true"></span>
  <span class="lw-dimension__label"></span>
  <span class="lw-dimension__rule" aria-hidden="true"></span>
  <span class="lw-dimension__cap lw-dimension__cap--end" aria-hidden="true"></span>
`;

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '';
  if (seconds < 10) return `${seconds.toFixed(1)} s`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, '0')}`;
}

function parseDuration(value) {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!text) return null;
  const clock = text.match(/^(\d+):(\d{2})$/);
  if (clock) return Number(clock[1]) * 60 + Number(clock[2]);
  const number = parseFloat(text);
  return Number.isFinite(number) ? number : null;
}

class LwPad extends BaseElement {
  static get observedAttributes() {
    return ['name', 'keys', 'length', 'duration', 'progress', 'playing', 'menu'];
  }

  constructor() {
    super();
    this._built = false;
    this._simRaf = null;
    this._surface = null;
    this._titleEl = null;
    this._keysEl = null;
    this._labelEl = null;
    this._dimensionEl = null;
    this._moreBtn = null;
    this._progress = 0;
    this._onFrame = this._onFrame.bind(this);
  }

  connectedCallback() {
    if (!this._built) this._build();
    this.classList.add('lw-pad', 'lw-reveal-host');
  }

  disconnectedCallback() {
    if (this._simRaf) cancelAnimationFrame(this._simRaf);
    this._simRaf = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._built || oldValue === newValue) return;
    if (name === 'name' || name === 'keys') this._syncText();
    else if (name === 'menu') this._syncMenu();
    else if (name === 'playing') {
      if (this._surface) {
        this._surface.setAttribute('aria-pressed', String(newValue !== null));
      }
      if (newValue === null && this._simRaf) {
        cancelAnimationFrame(this._simRaf);
        this._simRaf = null;
      }
    } else if (name === 'progress') {
      if (this._simRaf) {
        cancelAnimationFrame(this._simRaf);
        this._simRaf = null;
      }
      this._applyProgress(parseFloat(newValue), null);
    } else if (name === 'length' || name === 'duration') {
      if (!this.hasAttribute('playing') && this._progress === 0) this._applyProgress(0, null);
    }
  }

  _build() {
    const name = this.getAttribute('name') || this.getAttribute('label') || 'Untitled';
    const keys = this.getAttribute('keys') || '';
    const hasMenu = this.hasAttribute('menu');
    const initial = this._initialLabel();

    this.innerHTML = `
      <button type="button" class="lw-pad__surface" aria-pressed="false">
        <span class="lw-pad__hatch" aria-hidden="true"></span>
        <span class="lw-pad__layout">
          <span class="lw-pad__title" aria-hidden="true"></span>
          <span class="lw-keycap lw-pad__keys" aria-hidden="true"></span>
          <span class="lw-pad__spacer" aria-hidden="true"></span>
          <span class="lw-dimension lw-pad__dimension" role="img">
            ${DIMENSION_MARKUP}
          </span>
        </span>
      </button>
      ${
        hasMenu
          ? `<button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm lw-btn--reveal lw-pad__more" aria-label="More options">${icon('more')}</button>`
          : ''
      }
    `;

    this._surface = this.querySelector('.lw-pad__surface');
    this._titleEl = this.querySelector('.lw-pad__title');
    this._keysEl = this.querySelector('.lw-pad__keys');
    this._labelEl = this.querySelector('.lw-dimension__label');
    this._dimensionEl = this.querySelector('.lw-pad__dimension');
    this._moreBtn = this.querySelector('.lw-pad__more');
    this._built = true;

    this._titleEl.textContent = name;
    this._keysEl.textContent = keys;
    this._keysEl.hidden = !keys;
    this._labelEl.textContent = initial;
    this._updateAria();

    this._surface.addEventListener('click', () => {
      const press = new CustomEvent('lw-press', {
        bubbles: true,
        cancelable: true,
        detail: { pad: this },
      });
      if (!this.dispatchEvent(press)) return;
      if (this.hasAttribute('playing')) this.stop();
      else this.play();
    });

    if (this._moreBtn) {
      this._moreBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const proceed = this.dispatchEvent(
          new CustomEvent('lw-menu', {
            bubbles: true,
            cancelable: true,
            detail: { pad: this, anchor: this._moreBtn },
          })
        );
        const menu = proceed ? resolveElement(this.getAttribute('menu')) : null;
        if (menu) toggleMenu(this._moreBtn, menu);
      });
    }

    const progress = parseFloat(this.getAttribute('progress') || '0');
    this._applyProgress(Number.isFinite(progress) ? progress : 0, null);
    if (this.hasAttribute('playing')) {
      this._surface.setAttribute('aria-pressed', 'true');
    }
  }

  _syncText() {
    if (!this._built) return;
    const name = this.getAttribute('name') || this.getAttribute('label') || 'Untitled';
    const keys = this.getAttribute('keys') || '';
    this._titleEl.textContent = name;
    if (this._keysEl) {
      this._keysEl.textContent = keys;
      this._keysEl.hidden = !keys;
    }
    if (this._moreBtn) {
      this._moreBtn.setAttribute('aria-label', `More options for ${name}`);
    }
    this._updateAria();
  }

  _syncMenu() {
    if (!this._built) return;
    const hasMenu = this.hasAttribute('menu');
    if (hasMenu && !this._moreBtn) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className =
        'lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm lw-btn--reveal lw-pad__more';
      button.innerHTML = icon('more');
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        this.dispatchEvent(
          new CustomEvent('lw-menu', {
            bubbles: true,
            cancelable: true,
            detail: { pad: this, anchor: button },
          })
        );
      });
      this.appendChild(button);
      this._moreBtn = button;
      this._syncText();
    } else if (!hasMenu && this._moreBtn) {
      this._moreBtn.remove();
      this._moreBtn = null;
    }
  }

  _updateAria() {
    if (!this._surface) return;
    const name = this.getAttribute('name') || this.getAttribute('label') || 'Untitled';
    const keys = this.getAttribute('keys');
    this._surface.setAttribute(
      'aria-label',
      keys ? `${name}, key legend ${keys}` : name
    );
    if (this._moreBtn) {
      this._moreBtn.setAttribute('aria-label', `More options for ${name}`);
    }
  }

  _durationSeconds() {
    const explicit = parseFloat(this.getAttribute('duration'));
    if (Number.isFinite(explicit) && explicit > 0) return explicit;
    return parseDuration(this.getAttribute('length'));
  }

  _initialLabel() {
    const length = this.getAttribute('length');
    if (length) return length;
    const duration = this._durationSeconds();
    return duration ? formatDuration(duration) : '—';
  }

  _setLabel(text) {
    if (!this._labelEl) return;
    this._labelEl.textContent = text;
    if (this._dimensionEl) {
      this._dimensionEl.setAttribute('aria-label', `Length ${text}`);
    }
  }

  _applyProgress(value, remainingSeconds) {
    const progress = clamp(Number(value) || 0, 0, 1);
    this._progress = progress;
    this.style.setProperty('--lw-pad-progress', progress.toFixed(4));

    const duration = this._durationSeconds();
    if (remainingSeconds !== null && remainingSeconds !== undefined) {
      this._setLabel(formatDuration(Math.max(0, remainingSeconds)));
    } else if (progress > 0 && duration) {
      this._setLabel(formatDuration(Math.max(0, duration * (1 - progress))));
    } else if (progress === 0) {
      this._setLabel(this._initialLabel());
    }
  }

  _onFrame(now) {
    if (!this._simRaf) return;
    const elapsed = (now - this._startedAt) / 1000;
    const duration = this._simDuration;
    const progress = clamp(elapsed / duration, 0, 1);
    this._applyProgress(progress, Math.max(0, duration - elapsed));

    if (progress >= 1) {
      this._simRaf = null;
      this.stop('end');
      this.dispatchEvent(
        new CustomEvent('lw-end', { bubbles: true, detail: { pad: this } })
      );
      return;
    }
    this._simRaf = requestAnimationFrame(this._onFrame);
  }

  play(seconds) {
    if (!this._built) return 0;
    const duration =
      Number(seconds) > 0 ? Number(seconds) : this._durationSeconds() || 3;
    if (this._simRaf) cancelAnimationFrame(this._simRaf);
    this._simDuration = duration;
    this._startedAt = performance.now();
    this.setAttribute('playing', '');
    this._surface.setAttribute('aria-pressed', 'true');
    this._applyProgress(0, duration);
    this.dispatchEvent(
      new CustomEvent('lw-play', {
        bubbles: true,
        detail: { pad: this, duration },
      })
    );
    this._simRaf = requestAnimationFrame(this._onFrame);
    return duration;
  }

  stop(reason = 'manual') {
    if (!this._built) return;
    if (this._simRaf) cancelAnimationFrame(this._simRaf);
    this._simRaf = null;
    const wasPlaying = this.hasAttribute('playing');
    if (wasPlaying) this.removeAttribute('playing');
    this._surface.setAttribute('aria-pressed', 'false');
    this._applyProgress(0, null);
    if (wasPlaying) {
      this.dispatchEvent(
        new CustomEvent('lw-stop', {
          bubbles: true,
          detail: { pad: this, reason },
        })
      );
    }
  }

  toggle() {
    if (this.hasAttribute('playing')) this.stop();
    else this.play();
  }

  /** Drive the pad from real playback: progress 0..1, optional seconds left. */
  setProgress(progress, remainingSeconds) {
    if (!this._built) return;
    if (this._simRaf) {
      cancelAnimationFrame(this._simRaf);
      this._simRaf = null;
    }
    this._applyProgress(progress, remainingSeconds);
  }

  get playing() {
    return this.hasAttribute('playing');
  }

  set playing(value) {
    if (value) this.setAttribute('playing', '');
    else this.removeAttribute('playing');
  }

  get progress() {
    return this._progress;
  }

  set progress(value) {
    this._applyProgress(value, null);
  }
}

const METER_HEIGHTS = [10, 15, 21, 12, 17, 23, 11, 19, 14, 22, 9, 16, 13, 20, 12, 18, 10, 16];

class LwMeter extends BaseElement {
  static get observedAttributes() {
    return ['level', 'bars', 'live', 'tone', 'label'];
  }

  constructor() {
    super();
    this._built = false;
    this._level = 0;
    this._timer = null;
  }

  connectedCallback() {
    this._build();
    this.classList.add('lw-meter');
    this.classList.toggle('lw-meter--redline', this.getAttribute('tone') === 'redline');
    const initial = parseFloat(this.getAttribute('level'));
    if (!Number.isNaN(initial)) this._level = clamp(initial, 0, 1);
    this._sync();
    this._syncLive();
  }

  disconnectedCallback() {
    this._stopLive();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._built || oldValue === newValue) return;
    if (name === 'bars') {
      this._build();
      this._sync();
    } else if (name === 'level') {
      this.level = parseFloat(newValue || '0');
    } else if (name === 'live') {
      this._syncLive();
    } else if (name === 'tone') {
      this.classList.toggle('lw-meter--redline', newValue === 'redline');
    } else if (name === 'label') {
      this._applyLabel();
    }
  }

  _build() {
    const count = clamp(parseInt(this.getAttribute('bars') || '16', 10) || 16, 3, 40);
    this.innerHTML = '';
    this.setAttribute('role', 'meter');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '100');
    this.setAttribute('aria-valuenow', '0');
    for (let index = 0; index < count; index += 1) {
      const bar = document.createElement('span');
      bar.className = 'lw-meter__bar';
      bar.setAttribute('aria-hidden', 'true');
      bar.style.setProperty(
        '--lw-bar-height',
        `${METER_HEIGHTS[index % METER_HEIGHTS.length]}px`
      );
      this.appendChild(bar);
    }
    this._built = true;
    this._applyLabel();
  }

  _applyLabel() {
    const label = this.getAttribute('label') || 'Level';
    this.setAttribute('aria-label', label);
  }

  _sync() {
    if (!this._built) return;
    const bars = this.querySelectorAll('.lw-meter__bar');
    const threshold = this._level * bars.length;
    bars.forEach((bar, index) => {
      bar.classList.toggle('is-lit', index < threshold);
    });
    this.setAttribute('aria-valuenow', String(Math.round(this._level * 100)));
  }

  _syncLive() {
    if (this.hasAttribute('live')) this._startLive();
    else this._stopLive();
  }

  _startLive() {
    if (this._timer || !isBrowser) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      this.level = 0.62;
      return;
    }
    let value = 0.5;
    this._timer = window.setInterval(() => {
      const target = 0.18 + Math.random() * 0.8;
      value = value * 0.55 + target * 0.45;
      this.level = clamp(value, 0, 1);
    }, 110);
  }

  _stopLive() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = null;
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = clamp(Number(value) || 0, 0, 1);
    this._sync();
  }
}

async function copyText(text) {
  if (!isBrowser) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '-1000px';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  } catch {
    return false;
  }
}

const THEMES = ['trace', 'blueprint', 'vellum'];

function getTheme() {
  if (!isBrowser) return 'trace';
  return document.documentElement.getAttribute('data-theme') || 'trace';
}

function setTheme(name, options = {}) {
  if (!isBrowser) return 'trace';
  const theme = THEMES.includes(name) ? name : 'trace';
  document.documentElement.setAttribute('data-theme', theme);
  if (options.persist !== false) {
    try {
      localStorage.setItem('linework-theme', theme);
    } catch {
      /* storage can be unavailable in private contexts */
    }
  }
  document.querySelectorAll('[data-lw-theme-current]').forEach((node) => {
    node.textContent = theme;
  });
  document.dispatchEvent(
    new CustomEvent('linework:theme', { detail: { theme } })
  );
  return theme;
}

function cycleTheme() {
  const current = getTheme();
  const index = THEMES.indexOf(current);
  return setTheme(THEMES[(index + 1) % THEMES.length]);
}

function resolveElement(target) {
  if (!isBrowser) return null;
  if (target instanceof Element) return target;
  if (typeof target !== 'string' || !target) return null;
  if (target.startsWith('#') || target.startsWith('.')) {
    return document.querySelector(target);
  }
  return document.getElementById(target);
}

function openTarget(target) {
  const element = resolveElement(target);
  if (!element) return null;
  if (element.tagName === 'LW-DRAWER' && typeof element.open === 'function') {
    element.open();
  } else if (element instanceof HTMLDialogElement) {
    if (!element.open) element.showModal();
  } else if (element.tagName === 'LW-DRAWER') {
    element.setAttribute('open', '');
  } else {
    element.dispatchEvent(new CustomEvent('lw-open', { bubbles: true }));
  }
  return element;
}

function closeTarget(target) {
  const element = resolveElement(target);
  if (!element) return null;
  if (element.tagName === 'LW-DRAWER' && typeof element.close === 'function') {
    element.close();
  } else if (element instanceof HTMLDialogElement) {
    element.close();
  }
  return element;
}

function paintRange(range) {
  const min = Number(range.min || 0);
  const max = Number(range.max || 100);
  const value = Number(range.value || 0);
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  range.style.setProperty('--lw-range-fill', `${clamp(percent, 0, 100)}%`);
}

function paintRanges(root = document) {
  if (!isBrowser) return;
  root.querySelectorAll?.('.lw-range').forEach(paintRange);
}

function copySpec(trigger) {
  const targetSelector = trigger.getAttribute('data-lw-copy-target');
  if (targetSelector) {
    const source = document.querySelector(targetSelector);
    if (source) {
      if (
        source instanceof HTMLInputElement ||
        source instanceof HTMLTextAreaElement
      ) {
        return source.value;
      }
      return source.textContent.trim();
    }
  }
  return trigger.getAttribute('data-lw-copy') || '';
}

function flashCopyLabel(trigger) {
  const label = trigger.querySelector('[data-lw-copy-label], .lw-copy-label');
  if (!label) return false;
  if (!label.dataset.lwLabel) label.dataset.lwLabel = label.textContent;
  window.clearTimeout(label._lwFlash);
  label.textContent = 'Copied';
  label._lwFlash = window.setTimeout(() => {
    label.textContent = label.dataset.lwLabel;
  }, 1600);
  return true;
}

function announce(message) {
  if (!isBrowser) return;
  let region = document.querySelector('[data-lw-announcer]');
  if (!region) {
    region = document.createElement('div');
    region.className = 'lw-vh';
    region.setAttribute('role', 'status');
    region.setAttribute('data-lw-announcer', '');
    document.body.appendChild(region);
  }
  region.textContent = '';
  window.setTimeout(() => {
    region.textContent = message;
  }, 50);
}

async function handleCopy(trigger) {
  const text = copySpec(trigger);
  if (!text) return;
  const copied = await copyText(text);
  if (!copied) {
    toast({ title: 'Could not copy', tone: 'warning' });
    return;
  }
  const flashed = flashCopyLabel(trigger);
  if (flashed) announce('Copied');
  else if (!trigger.hasAttribute('data-lw-silent')) {
    toast({ title: 'Copied', message: 'Copied to clipboard.' });
  }
}

function menuFor(trigger) {
  const spec = trigger.getAttribute('data-lw-menu');
  if (spec) return resolveElement(spec);
  const next = trigger.nextElementSibling;
  return next && next.classList.contains('lw-menu') ? next : null;
}

function positionMenu(menu, trigger) {
  const rect = trigger.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.inset = 'auto';
  menu.style.margin = '0';
  menu.style.minWidth = `${Math.max(196, Math.round(rect.width))}px`;

  const menuRect = menu.getBoundingClientRect();
  const margin = 12;
  let left = Math.max(margin, rect.right - menuRect.width);
  left = Math.min(left, window.innerWidth - menuRect.width - margin);
  let top = rect.bottom + 6;
  if (top + menuRect.height > window.innerHeight - margin) {
    top = Math.max(margin, rect.top - menuRect.height - 6);
  }
  menu.style.left = `${Math.round(left)}px`;
  menu.style.top = `${Math.round(top)}px`;
}

function closeMenu(menu) {
  if (!menu) return;
  try {
    if (typeof menu.hidePopover === 'function' && menu.matches(':popover-open')) {
      menu.hidePopover();
    }
  } catch {}
}

function openMenu(trigger, menu, focusFirst = true) {
  if (!menu) return;
  if (!menu.hasAttribute('popover')) menu.setAttribute('popover', 'auto');
  if (!menu.id) {
    menu.id = `lw-menu-${Math.random().toString(36).slice(2, 8)}`;
  }
  if (!menu.hasAttribute('role')) menu.setAttribute('role', 'menu');
  menu.querySelectorAll('.lw-menu__item').forEach((item) => {
    if (!item.hasAttribute('role')) item.setAttribute('role', 'menuitem');
  });

  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.setAttribute('aria-controls', menu.id);
  trigger.setAttribute('aria-expanded', 'false');

  if (!menu._lwMenuWired) {
    menu._lwMenuWired = true;
    menu.addEventListener('toggle', (event) => {
      const open = event.newState === 'open';
      menu._lwTrigger?.setAttribute('aria-expanded', String(open));
      if (open) positionMenu(menu, menu._lwTrigger);
    });
    menu.addEventListener('click', (event) => {
      if (event.target.closest('.lw-menu__item')) {
        closeMenu(menu);
        menu._lwTrigger?.focus({ preventScroll: true });
      }
    });
    menu.addEventListener('keydown', (event) => {
      const items = Array.from(menu.querySelectorAll('.lw-menu__item:not([disabled])'));
      const index = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        items[(index + 1 + items.length) % items.length]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        items[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        items[items.length - 1]?.focus();
      } else if (event.key === 'Tab') {
        closeMenu(menu);
      }
    });
  }

  menu._lwTrigger = trigger;

  try {
    menu.showPopover();
    trigger.setAttribute('aria-expanded', 'true');
    positionMenu(menu, trigger);
    if (focusFirst) {
      menu.querySelector('.lw-menu__item:not([disabled])')?.focus({ preventScroll: true });
    }
  } catch {
    /* Browsers without popover still get a readable, dismissible menu. */
    menu.hidden = false;
    menu.style.position = 'fixed';
    trigger.setAttribute('aria-expanded', 'true');
    positionMenu(menu, trigger);
  }
}

function toggleMenu(trigger, menu) {
  if (!menu) return;
  const open = menu.matches(':popover-open') || (!menu.hidden && menu.hasAttribute('popover') === false);
  if (open) closeMenu(menu);
  else openMenu(trigger, menu);
}

function toast(options = {}) {
  if (!isBrowser) return null;
  let stack = document.querySelector('lw-toast-stack');
  if (!stack) {
    stack = document.createElement('lw-toast-stack');
    document.body.appendChild(stack);
  }
  return stack.show(options);
}

function refresh(root = document) {
  if (!isBrowser) return;
  paintRanges(root);
  document.querySelectorAll('[data-lw-theme-current]').forEach((node) => {
    node.textContent = getTheme();
  });
}

const Linework = {
  version: '1.0.0',
  themes: [...THEMES],
  getTheme,
  setTheme,
  cycleTheme,
  toast,
  copy: copyText,
  open: openTarget,
  close: closeTarget,
  refresh,
  formatDuration,
  icons: {
    names: [...ICON_NAMES],
    install: installIcons,
    markup: icon,
  },
};

function onDocumentClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const themeTrigger = target.closest('[data-lw-theme]');
  if (themeTrigger && !themeTrigger.hasAttribute('disabled')) {
    const value = themeTrigger.getAttribute('data-lw-theme');
    if (value === 'cycle') cycleTheme();
    else if (value) setTheme(value);
  }

  const opener = target.closest('[data-lw-open]');
  if (opener) {
    if (opener.tagName === 'A') event.preventDefault();
    openTarget(opener.getAttribute('data-lw-open'));
  }

  const closer = target.closest('[data-lw-close]');
  if (closer) {
    if (closer.tagName === 'A') event.preventDefault();
    const dialog = closer.closest('dialog');
    if (dialog) dialog.close();
    else {
      const drawer = closer.closest('lw-drawer');
      if (drawer && typeof drawer.close === 'function') drawer.close();
    }
  }

  const copyTrigger = target.closest('[data-lw-copy], [data-lw-copy-target]');
  if (copyTrigger) {
    handleCopy(copyTrigger);
  }

  const menuTrigger = target.closest('[data-lw-menu]');
  if (menuTrigger && !menuTrigger.hasAttribute('disabled')) {
    event.preventDefault();
    const menu = menuFor(menuTrigger);
    if (menuTrigger._lwMenuWasOpen) {
      menuTrigger._lwMenuWasOpen = false;
      closeMenu(menu);
    } else {
      toggleMenu(menuTrigger, menu);
    }
  }

  const segment = target.closest('.lw-segments__item[aria-pressed]');
  if (segment && !segment.disabled) {
    segment
      .closest('.lw-segments')
      ?.querySelectorAll('.lw-segments__item[aria-pressed]')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === segment)));
  }
}

function onDocumentPointerDown(event) {
  const trigger = event.target instanceof Element ? event.target.closest('[data-lw-menu]') : null;
  if (trigger) trigger._lwMenuWasOpen = Boolean(menuFor(trigger)?.matches(':popover-open'));
}

function onDocumentScroll(event) {
  document.querySelectorAll('.lw-menu:popover-open').forEach((menu) => {
    if (event.target instanceof Node && menu.contains(event.target)) return;
    closeMenu(menu);
  });
}

function onDocumentInput(event) {
  const range = event.target.closest?.('.lw-range');
  if (range) paintRange(range);
}

function syncLed(input) {
  const state = input.closest('.lw-led')?.querySelector('.lw-led__state');
  if (state) state.textContent = input.checked ? 'On' : 'Off';
}

function onDocumentChange(event) {
  const led = event.target.closest?.('.lw-led__input');
  if (led) syncLed(led);
}

let delegatesInstalled = false;

function installDelegates() {
  if (!isBrowser || delegatesInstalled) return;
  delegatesInstalled = true;
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('pointerdown', onDocumentPointerDown, true);
  document.addEventListener('scroll', onDocumentScroll, { capture: true, passive: true });
  document.addEventListener('input', onDocumentInput);
  document.addEventListener('change', onDocumentChange);
}

function syncAllLeds() {
  if (!isBrowser) return;
  document.querySelectorAll('.lw-led__input').forEach(syncLed);
}

function syncMenuTriggers() {
  if (!isBrowser) return;
  document.querySelectorAll('[data-lw-menu]').forEach((trigger) => {
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    const menu = menuFor(trigger);
    if (menu?.id) trigger.setAttribute('aria-controls', menu.id);
  });
}

function registerElements() {
  if (!isBrowser || !window.customElements) return;
  const registry = window.customElements;
  if (!registry.get('lw-drawer')) registry.define('lw-drawer', LwDrawer);
  if (!registry.get('lw-tabs')) registry.define('lw-tabs', LwTabs);
  if (!registry.get('lw-pad')) registry.define('lw-pad', LwPad);
  if (!registry.get('lw-meter')) registry.define('lw-meter', LwMeter);
  if (!registry.get('lw-toast-stack')) {
    registry.define('lw-toast-stack', LwToastStack);
  }
}

function boot() {
  if (!isBrowser) return;
  installIcons();
  installDelegates();
  paintRanges();
  syncAllLeds();
  syncMenuTriggers();
  document.documentElement.classList.add('lw-js');
  refresh();
  queueMicrotask(() => {
    document.dispatchEvent(
      new CustomEvent('linework:ready', { detail: { linework: Linework } })
    );
  });
}

registerElements();

if (isBrowser) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}

export { Linework };
export default Linework;
