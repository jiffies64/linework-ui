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
  'chevron-left': '<path d="m15 6-6 6 6 6"/>',
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
  minus: '<path d="M5 12h14"/>',
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
    this.setAttribute('progress', String(clamp(Number(value) || 0, 0, 1)));
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

let pickerSequence = 0;
const nextId = (prefix) => `${prefix}-${++pickerSequence}`;

function optionLabel(option) {
  if (option.dataset.label) return option.dataset.label;
  const label = option.querySelector('.lw-option__label');
  return (label || option).textContent.trim();
}

class LwCombobox extends BaseElement {
  connectedCallback() {
    if (this._built) return;
    const input = this.querySelector('input');
    const list = this.querySelector('.lw-listbox');
    if (!input || !list) return;
    this._built = true;
    this._input = input;
    this._list = list;
    this._active = null;
    this.classList.add('lw-combobox');

    if (!list.id) list.id = nextId('lw-listbox');
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', list.id);
    input.setAttribute('autocomplete', 'off');

    this._empty = document.createElement('li');
    this._empty.className = 'lw-listbox__empty';
    this._empty.setAttribute('role', 'presentation');
    this._empty.textContent = this.getAttribute('empty') || 'No matches';
    this._empty.hidden = true;
    list.appendChild(this._empty);

    this._status = document.createElement('span');
    this._status.className = 'lw-vh';
    this._status.setAttribute('role', 'status');
    this.appendChild(this._status);

    input.addEventListener('input', () => {
      const selected = this._options().find((item) => item.getAttribute('aria-selected') === 'true');
      if (selected && optionLabel(selected) !== input.value) selected.setAttribute('aria-selected', 'false');
      this._filter();
      this._show();
    });
    input.addEventListener('click', () => {
      if (!this._list.hidden) return;
      this._filter();
      this._show();
    });
    input.addEventListener('keydown', (event) => this._onKeydown(event));
    input.addEventListener('blur', () => this._hide());
    list.addEventListener('mousedown', (event) => event.preventDefault());
    list.addEventListener('click', (event) => {
      const option = event.target.closest('.lw-option');
      if (option) this._choose(option);
    });
  }

  _options() {
    const options = Array.from(this._list.querySelectorAll('li:not(.lw-listbox__empty)'));
    options.forEach((option) => {
      if (option.getAttribute('role') === 'option') return;
      option.classList.add('lw-option');
      option.setAttribute('role', 'option');
      if (!option.id) option.id = nextId('lw-option');
      if (!option.hasAttribute('aria-selected')) option.setAttribute('aria-selected', 'false');
    });
    return options;
  }

  _filter() {
    if (this._empty.parentNode !== this._list) this._list.appendChild(this._empty);
    const query = this._input.value.trim().toLowerCase();
    let shown = 0;
    this._options().forEach((option) => {
      const match = !query || optionLabel(option).toLowerCase().includes(query);
      option.hidden = !match;
      if (match) shown += 1;
    });
    this._empty.hidden = shown > 0;
    this._status.textContent = shown > 0 ? `${shown} ${shown === 1 ? 'result' : 'results'}` : this._empty.textContent;
    this._setActive(null);
  }

  _show() {
    this._list.hidden = false;
    this._input.setAttribute('aria-expanded', 'true');
  }

  _hide() {
    this._list.hidden = true;
    this._input.setAttribute('aria-expanded', 'false');
    this._status.textContent = '';
    this._setActive(null);
  }

  _setActive(option) {
    this._options().forEach((item) => item.classList.toggle('is-active', item === option));
    if (option) {
      this._input.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({ block: 'nearest' });
    } else {
      this._input.removeAttribute('aria-activedescendant');
    }
    this._active = option;
  }

  _onKeydown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (this._list.hidden) {
        this._filter();
        this._show();
      }
      const items = this._options().filter((option) => !option.hidden);
      if (items.length === 0) return;
      const index = items.indexOf(this._active);
      let next;
      if (event.key === 'ArrowDown') next = items[(index + 1) % items.length];
      else next = index <= 0 ? items[items.length - 1] : items[index - 1];
      this._setActive(next);
    } else if (event.key === 'Enter' && this._active && !this._list.hidden) {
      event.preventDefault();
      this._choose(this._active);
    } else if (event.key === 'Escape') {
      if (!this._list.hidden) {
        event.preventDefault();
        this._hide();
      } else if (this._input.value) {
        event.preventDefault();
        this._input.value = '';
      }
    }
  }

  _choose(option) {
    this._options().forEach((item) => item.setAttribute('aria-selected', String(item === option)));
    const label = optionLabel(option);
    this._input.value = label;
    this._hide();
    this.dispatchEvent(
      new CustomEvent('lw-change', {
        bubbles: true,
        detail: { value: option.dataset.value || label, option },
      })
    );
  }

  get value() {
    const option = this._built
      ? this._options().find((item) => item.getAttribute('aria-selected') === 'true')
      : null;
    return option ? option.dataset.value || optionLabel(option) : '';
  }
}

class LwCommand extends BaseElement {
  constructor() {
    super();
    this._onShortcut = this._onShortcut.bind(this);
  }

  connectedCallback() {
    document.addEventListener('keydown', this._onShortcut);
    if (this._built) return;
    this._built = true;
    this.classList.add('lw-command');

    const dialog = document.createElement('dialog');
    dialog.className = 'lw-dialog lw-command__dialog';
    dialog.setAttribute('aria-label', this.getAttribute('label') || 'Command palette');

    const listId = nextId('lw-command-list');
    const search = document.createElement('div');
    search.className = 'lw-command__search';
    search.innerHTML = `<label class="lw-search">${icon('search')}<input class="lw-input" type="text" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="${listId}" autocomplete="off" spellcheck="false"></label>`;
    const input = search.querySelector('input');
    input.setAttribute('aria-label', 'Search commands');
    input.placeholder = this.getAttribute('placeholder') || 'Type a command';

    const list = document.createElement('ul');
    list.className = 'lw-command__list';
    list.id = listId;
    list.setAttribute('role', 'listbox');

    const empty = document.createElement('li');
    empty.className = 'lw-listbox__empty';
    empty.setAttribute('role', 'presentation');
    empty.textContent = this.getAttribute('empty') || 'No matching commands';
    empty.hidden = true;

    const foot = document.createElement('div');
    foot.className = 'lw-command__foot';
    foot.setAttribute('aria-hidden', 'true');
    foot.innerHTML = '<span>↑ ↓ move</span><span>Enter run</span><span>Esc close</span>';

    dialog.append(search, list, foot);
    this.append(dialog);

    this._dialog = dialog;
    this._input = input;
    this._list = list;
    this._empty = empty;
    this._active = null;
    this._buildOptions();
    new MutationObserver(() => this._buildOptions()).observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['data-group', 'data-shortcut', 'disabled', 'aria-disabled'],
    });

    input.addEventListener('input', () => this._filter());
    input.addEventListener('keydown', (event) => this._onKeydown(event));
    list.addEventListener('mousedown', (event) => event.preventDefault());
    list.addEventListener('click', (event) => {
      const option = event.target.closest('.lw-option');
      if (option) this._run(option);
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) this.close();
    });
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._onShortcut);
  }

  _items() {
    return Array.from(this.querySelectorAll(':scope > .lw-command__item'));
  }

  _buildOptions() {
    const disabled = (item) => item.disabled || item.getAttribute('aria-disabled') === 'true';
    const signature = this._items()
      .map((item) => [item.dataset.group, item.textContent.trim(), item.dataset.shortcut, disabled(item)].join('|'))
      .join(' / ');
    if (signature === this._signature) return;
    this._signature = signature;

    const groups = new Map();
    this._items().forEach((item) => {
      const name = item.dataset.group || '';
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(item);
    });
    const nodes = [];
    groups.forEach((members, name) => {
      let section = null;
      let options = nodes;
      if (name) {
        const heading = document.createElement('div');
        heading.className = 'lw-command__group';
        heading.id = nextId('lw-command-group');
        heading.textContent = name;
        const body = document.createElement('ul');
        body.setAttribute('role', 'presentation');
        section = document.createElement('li');
        section.className = 'lw-command__section';
        section.setAttribute('role', 'group');
        section.setAttribute('aria-labelledby', heading.id);
        section.append(heading, body);
        nodes.push(section);
        options = { push: (option) => body.appendChild(option) };
      }
      members.forEach((item) => {
        const option = document.createElement('li');
        option.className = 'lw-option';
        option.id = nextId('lw-command-option');
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        if (disabled(item)) option.setAttribute('aria-disabled', 'true');
        const label = document.createElement('span');
        label.className = 'lw-option__label';
        label.textContent = item.textContent.trim();
        option.appendChild(label);
        if (item.dataset.shortcut) {
          const meta = document.createElement('span');
          meta.className = 'lw-option__meta';
          meta.setAttribute('aria-hidden', 'true');
          meta.textContent = item.dataset.shortcut;
          option.appendChild(meta);
          option.setAttribute('aria-keyshortcuts', item.dataset.shortcut);
        }
        option._lwItem = item;
        option._lwSection = section;
        options.push(option);
      });
    });
    this._list.replaceChildren(...nodes, this._empty);
    if (this.isOpen) this._filter();
  }

  _onShortcut(event) {
    const key = this.getAttribute('shortcut');
    if (
      !key ||
      !(event.ctrlKey || event.metaKey) ||
      event.shiftKey ||
      event.altKey ||
      event.repeat ||
      event.key.toLowerCase() !== key.toLowerCase() ||
      event.target?.isContentEditable
    ) {
      return;
    }
    const otherModal = Array.from(document.querySelectorAll('dialog[open]')).some(
      (dialog) => dialog !== this._dialog && dialog.matches(':modal')
    );
    if (otherModal) return;
    event.preventDefault();
    if (this.isOpen) this.close();
    else this.open();
  }

  _options() {
    return Array.from(this._list.querySelectorAll('.lw-option'));
  }

  _filter() {
    const query = this._input.value.trim().toLowerCase();
    const visibleSections = new Set();
    let first = null;
    this._options().forEach((option) => {
      const match = !query || optionLabel(option).toLowerCase().includes(query);
      option.hidden = !match;
      if (match) {
        if (!first && option.getAttribute('aria-disabled') !== 'true') first = option;
        if (option._lwSection) visibleSections.add(option._lwSection);
      }
    });
    this._list.querySelectorAll('.lw-command__section').forEach((section) => {
      section.hidden = !visibleSections.has(section);
    });
    this._empty.hidden = Boolean(first);
    this._setActive(first);
  }

  _setActive(option) {
    this._options().forEach((item) => {
      const active = item === option;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    if (option) {
      this._input.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({ block: 'nearest' });
    } else {
      this._input.removeAttribute('aria-activedescendant');
    }
    this._active = option;
  }

  _onKeydown(event) {
    const items = this._options().filter(
      (option) => !option.hidden && option.getAttribute('aria-disabled') !== 'true'
    );
    const index = items.indexOf(this._active);
    if (event.key === 'ArrowDown' && items.length) {
      event.preventDefault();
      this._setActive(items[(index + 1) % items.length]);
    } else if (event.key === 'ArrowUp' && items.length) {
      event.preventDefault();
      this._setActive(index <= 0 ? items[items.length - 1] : items[index - 1]);
    } else if (event.key === 'Home' && items.length) {
      event.preventDefault();
      this._setActive(items[0]);
    } else if (event.key === 'End' && items.length) {
      event.preventDefault();
      this._setActive(items[items.length - 1]);
    } else if (event.key === 'Enter' && this._active) {
      event.preventDefault();
      this._run(this._active);
    }
  }

  _run(option) {
    if (option.getAttribute('aria-disabled') === 'true') return;
    const item = option._lwItem;
    this.close();
    const proceed = this.dispatchEvent(
      new CustomEvent('lw-select', { bubbles: true, cancelable: true, detail: { item } })
    );
    if (proceed) item.click();
  }

  open() {
    if (!this._built || this._dialog.open) return;
    this._dialog.showModal();
    this._input.value = '';
    this._filter();
    this._input.focus();
  }

  close() {
    if (this._built && this._dialog.open) this._dialog.close();
  }

  get isOpen() {
    return Boolean(this._dialog?.open);
  }
}

const pad2 = (value) => String(value).padStart(2, '0');
const isoDate = (date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

function parseIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]) ? date : null;
}

function firstWeekday(locale) {
  try {
    const info = new Intl.Locale(locale || navigator.language);
    const week = info.getWeekInfo?.() ?? info.weekInfo;
    if (week?.firstDay) return week.firstDay % 7;
  } catch {
    return 1;
  }
  return 1;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date, months) {
  const next = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const last = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(date.getDate(), last));
  return next;
}

class LwCalendar extends BaseElement {
  static get observedAttributes() {
    return ['value', 'min', 'max'];
  }

  connectedCallback() {
    if (this._built) return;
    this._built = true;
    this.classList.add('lw-calendar');
    const titleId = nextId('lw-calendar-title');

    const head = document.createElement('div');
    head.className = 'lw-calendar__head';
    head.innerHTML = `
      <button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" data-step="-1" aria-label="Previous month">${icon('chevron-left')}</button>
      <div class="lw-calendar__title" id="${titleId}" aria-live="polite"></div>
      <button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" data-step="1" aria-label="Next month">${icon('chevron-right')}</button>`;

    const table = document.createElement('table');
    table.className = 'lw-calendar__grid';
    table.setAttribute('aria-labelledby', titleId);

    this.replaceChildren(head, table);
    this._title = head.querySelector('.lw-calendar__title');
    this._table = table;

    head.addEventListener('click', (event) => {
      const step = event.target.closest('[data-step]');
      if (!step) return;
      this._moveFocus(addMonths(this._focus, Number(step.dataset.step)), false);
      if (step.disabled) head.querySelector('[data-step]:not(:disabled)')?.focus();
    });
    table.addEventListener('click', (event) => {
      const day = event.target.closest('.lw-calendar__day');
      if (day && !day.disabled) this._select(parseIsoDate(day.dataset.date));
    });
    table.addEventListener('keydown', (event) => this._onKeydown(event));

    const today = new Date();
    this._focus = this._clampDate(parseIsoDate(this.getAttribute('value')) || today);
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._built || oldValue === newValue) return;
    const date = name === 'value' ? parseIsoDate(newValue) : null;
    this._focus = this._clampDate(date || this._focus);
    this._render();
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(value) {
    if (value) this.setAttribute('value', value);
    else this.removeAttribute('value');
  }

  _locale() {
    return this.getAttribute('locale') || undefined;
  }

  _clampDate(date) {
    const min = parseIsoDate(this.getAttribute('min'));
    const max = parseIsoDate(this.getAttribute('max'));
    if (min && date < min) return min;
    if (max && date > max) return max;
    return date;
  }

  _inRange(date) {
    const min = parseIsoDate(this.getAttribute('min'));
    const max = parseIsoDate(this.getAttribute('max'));
    return !(min && date < min) && !(max && date > max);
  }

  _render() {
    const locale = this._locale();
    const view = this._focus;
    this._title.textContent = view.toLocaleDateString(locale, { month: 'long', year: 'numeric' });

    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    this._weekStart = firstWeekday(locale);
    const start = addDays(first, -((first.getDay() - this._weekStart + 7) % 7));
    const min = parseIsoDate(this.getAttribute('min'));
    const max = parseIsoDate(this.getAttribute('max'));
    this._title.parentNode.querySelector('[data-step="-1"]').disabled = Boolean(min && first <= min);
    this._title.parentNode.querySelector('[data-step="1"]').disabled = Boolean(
      max && new Date(view.getFullYear(), view.getMonth() + 1, 0) >= max
    );
    const selected = this.getAttribute('value');
    const today = isoDate(new Date());
    const focusIso = isoDate(view);

    const weekdays = Array.from({ length: 7 }, (_, index) => addDays(start, index));
    let html = '<thead><tr>';
    weekdays.forEach((day) => {
      const full = day.toLocaleDateString(locale, { weekday: 'long' });
      const short = day.toLocaleDateString(locale, { weekday: 'short' });
      html += `<th scope="col" abbr="${escapeHtml(full)}">${escapeHtml(short)}</th>`;
    });
    html += '</tr></thead><tbody>';
    for (let week = 0; week < 6; week += 1) {
      html += '<tr>';
      for (let weekday = 0; weekday < 7; weekday += 1) {
        const day = addDays(start, week * 7 + weekday);
        const iso = isoDate(day);
        const classes = ['lw-calendar__day'];
        if (day.getMonth() !== view.getMonth()) classes.push('is-outside');
        if (iso === today) classes.push('is-today');
        const label = day.toLocaleDateString(locale, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        html += `<td><button type="button" class="${classes.join(' ')}" data-date="${iso}" tabindex="${iso === focusIso ? 0 : -1}" aria-pressed="${iso === selected}" aria-label="${escapeHtml(label)}"${iso === today ? ' aria-current="date"' : ''}${this._inRange(day) ? '' : ' disabled'}>${day.getDate()}</button></td>`;
      }
      html += '</tr>';
    }
    html += '</tbody>';
    this._table.innerHTML = html;
  }

  _moveFocus(date, focus = true) {
    this._focus = this._clampDate(date);
    this._render();
    if (focus) this._table.querySelector(`[data-date="${isoDate(this._focus)}"]`)?.focus();
  }

  _onKeydown(event) {
    const day = event.target.closest('.lw-calendar__day');
    if (!day) return;
    const current = parseIsoDate(day.dataset.date);
    const offset = (current.getDay() - this._weekStart + 7) % 7;
    const moves = {
      ArrowLeft: () => addDays(current, -1),
      ArrowRight: () => addDays(current, 1),
      ArrowUp: () => addDays(current, -7),
      ArrowDown: () => addDays(current, 7),
      Home: () => addDays(current, -offset),
      End: () => addDays(current, 6 - offset),
      PageUp: () => addMonths(current, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(current, event.shiftKey ? 12 : 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    this._moveFocus(move());
  }

  _select(date) {
    if (!date || !this._inRange(date)) return;
    const iso = isoDate(date);
    this._focus = date;
    this.setAttribute('value', iso);
    this._table.querySelector(`[data-date="${iso}"]`)?.focus();
    this.dispatchEvent(new CustomEvent('lw-change', { bubbles: true, detail: { value: iso, date } }));
  }
}

function sortKey(cell) {
  return (cell?.dataset.sortValue ?? cell?.textContent ?? '').trim();
}

function sortNumber(key) {
  if (!/^-?[$€£¥₹]?\s?-?[\d,]*\.?\d+\s?%?$/.test(key)) return NaN;
  const negative = key.includes('-');
  const value = Number(key.replace(/[^\d.]/g, ''));
  return negative ? -value : value;
}

function enhanceSortTables(root = document) {
  root.querySelectorAll('table[data-lw-sort] thead th').forEach((th) => {
    if (th.querySelector('.lw-table__sort') || th.dataset.sort === 'none') return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lw-table__sort';
    while (th.firstChild) button.appendChild(th.firstChild);
    th.appendChild(button);
    if (!th.hasAttribute('aria-sort')) th.setAttribute('aria-sort', 'none');
  });
}

function sortTable(th) {
  const table = th.closest('table');
  const body = table?.tBodies[0];
  if (!body) return;
  const direction = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
  table.querySelectorAll('thead th[aria-sort]').forEach((header) => {
    header.setAttribute('aria-sort', header === th ? direction : 'none');
  });
  const column = th.cellIndex;
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  const rows = Array.from(body.rows);
  rows.sort((a, b) => {
    const left = sortKey(a.cells[column]);
    const right = sortKey(b.cells[column]);
    const numeric = sortNumber(left) - sortNumber(right);
    const result = Number.isNaN(numeric) ? collator.compare(left, right) : numeric;
    return direction === 'ascending' ? result : -result;
  });
  rows.forEach((row) => body.appendChild(row));
  table.dispatchEvent(new CustomEvent('lw-sort', { bubbles: true, detail: { column, direction } }));
}

function dismiss(trigger) {
  const spec = trigger.getAttribute('data-lw-dismiss');
  const target = spec ? resolveElement(spec) : trigger.closest('.lw-chip, .lw-banner, .lw-file');
  if (!target) return;
  const proceed = target.dispatchEvent(new CustomEvent('lw-dismiss', { bubbles: true, cancelable: true }));
  if (!proceed) return;
  const hadFocus = target.contains(document.activeElement);
  const focusable = '[data-lw-dismiss], a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])';
  const neighbour = [target.nextElementSibling, target.previousElementSibling]
    .map((element) => (element?.matches(focusable) ? element : element?.querySelector(focusable)))
    .find(Boolean);
  const parent = target.parentElement;
  target.remove();
  if (!hadFocus) return;
  if (neighbour) {
    neighbour.focus();
  } else if (parent) {
    if (!parent.hasAttribute('tabindex')) parent.setAttribute('tabindex', '-1');
    parent.focus();
  }
}

function syncStepper(stepper) {
  const input = stepper.querySelector('input');
  if (!input) return;
  const value = Number(input.value);
  const min = input.min === '' ? -Infinity : Number(input.min);
  const max = input.max === '' ? Infinity : Number(input.max);
  stepper.querySelectorAll('[data-lw-step]').forEach((key) => {
    const up = Number(key.getAttribute('data-lw-step')) > 0;
    key.disabled = input.disabled || input.readOnly || (up ? value >= max : value <= min);
  });
}

function syncSteppers(root = document) {
  root.querySelectorAll('.lw-stepper').forEach(syncStepper);
}

function step(trigger) {
  const stepper = trigger.closest('.lw-stepper');
  const input = stepper?.querySelector('input');
  if (!input || input.disabled || input.readOnly) return;
  const direction = Number(trigger.getAttribute('data-lw-step')) > 0 ? 1 : -1;
  if (input.step === 'any') {
    const min = input.min === '' ? -Infinity : Number(input.min);
    const max = input.max === '' ? Infinity : Number(input.max);
    input.value = String(Math.min(max, Math.max(min, (Number(input.value) || 0) + direction)));
  } else if (direction > 0) {
    input.stepUp();
  } else {
    input.stepDown();
  }
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  syncStepper(stepper);
  let status = stepper.querySelector(':scope > [role="status"]');
  if (!status) {
    status = document.createElement('span');
    status.className = 'lw-vh';
    status.setAttribute('role', 'status');
    stepper.appendChild(status);
  }
  status.textContent = input.value;
  if (trigger.disabled) input.focus();
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
  if (['LW-DRAWER', 'LW-COMMAND'].includes(element.tagName) && typeof element.open === 'function') {
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
  if (['LW-DRAWER', 'LW-COMMAND'].includes(element.tagName) && typeof element.close === 'function') {
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
  enhanceSortTables(root);
  syncSteppers(root);
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

  const sorter = target.closest('.lw-table__sort');
  if (sorter) sortTable(sorter.closest('th'));

  const dismisser = target.closest('[data-lw-dismiss]');
  if (dismisser) dismiss(dismisser);

  const stepKey = target.closest('[data-lw-step]');
  if (stepKey && !stepKey.disabled) step(stepKey);

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
  const stepper = event.target.closest?.('.lw-stepper');
  if (stepper) syncStepper(stepper);
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
  if (!registry.get('lw-combobox')) registry.define('lw-combobox', LwCombobox);
  if (!registry.get('lw-command')) registry.define('lw-command', LwCommand);
  if (!registry.get('lw-calendar')) registry.define('lw-calendar', LwCalendar);
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
