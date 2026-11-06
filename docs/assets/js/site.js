(() => {
  const THEME_LABELS = { trace: 'Trace', blueprint: 'Blueprint', vellum: 'Vellum' };

  const logo = `
    <svg class="lw-brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M7 4v21h21" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M4 7h21v21" fill="none" stroke="currentColor" stroke-width="1" opacity=".28"/>
      <path d="M10.5 21.5 21.5 10.5" fill="none" stroke="var(--lw-redline)" stroke-width="2"/>
      <circle cx="21.5" cy="10.5" r="2" fill="var(--lw-redline)"/>
    </svg>`;

  const page = document.body.dataset.page || 'home';

  const navItems = [
    ['blocks', 'blocks.html', 'Blocks'],
    ['components', 'components.html', 'Components'],
    ['docs', 'docs.html', 'Docs'],
    ['showroom', 'console.html', 'Showroom'],
  ];

  const navMarkup = (className) => `
    <nav class="${className}" aria-label="Primary">
      ${navItems
        .map(
          ([key, href, label]) =>
            `<a href="${href}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`
        )
        .join('')}
    </nav>`;

  const header = document.getElementById('site-header');
  if (header) {
    header.innerHTML = `
      <div class="site-wrap site-header__inner">
        <a class="lw-brand" href="index.html" aria-label="Linework home">
          ${logo}
          <span class="lw-brand__name">linework</span>
        </a>
        ${navMarkup('site-nav')}
        <div class="site-header__actions">
          <span class="lw-stamp site-version">v1.0</span>
          <button type="button" class="lw-btn lw-btn--quiet lw-btn--sm site-theme" data-lw-theme="cycle" aria-label="Change paper theme">
            <svg class="lw-icon" aria-hidden="true"><use href="#lw-i-theme"></use></svg>
            <span class="site-theme__label" data-theme-label>Trace</span>
          </button>
          <a class="lw-btn lw-btn--primary lw-btn--sm" href="docs.html#install">
            Get started
            <svg class="lw-icon" aria-hidden="true"><use href="#lw-i-arrow-right"></use></svg>
          </a>
          <details class="site-mobile">
            <summary aria-label="Open menu">
              <svg class="lw-icon" aria-hidden="true"><use href="#lw-i-menu"></use></svg>
            </summary>
            <div class="site-mobile__panel">
              ${navItems
                .map(
                  ([key, href, label]) =>
                    `<a href="${href}"${page === key ? ' aria-current="page"' : ''}>${label}<span class="lw-mono">${key === 'showroom' ? 'APP' : 'SHEET'}</span></a>`
                )
                .join('')}
              <a href="docs.html#install">Install<span class="lw-mono">DOC</span></a>
            </div>
          </details>
        </div>
        <div class="site-progress" aria-hidden="true"><div class="site-progress__bar"></div></div>
      </div>`;
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="site-wrap">
        <div class="site-footer__top">
          <div class="site-footer__brand">
            <a class="lw-brand" href="index.html" aria-label="Linework home">
              ${logo}
              <span class="lw-brand__name">linework</span>
            </a>
            <p>A drafting-table UI kit for the web. Blocks, components and tokens for interfaces that are drawn rather than decorated.</p>
          </div>
          <div class="site-footer__cols">
            <div class="site-footer__col">
              <h3>Library</h3>
              <a href="blocks.html">Blocks</a>
              <a href="components.html">Components</a>
              <a href="docs.html">Documentation</a>
            </div>
            <div class="site-footer__col">
              <h3>Showroom</h3>
              <a href="console.html">Project console</a>
              <a href="components.html#pads">Pads &amp; meters</a>
              <a href="blocks.html">All blocks</a>
            </div>
            <div class="site-footer__col">
              <h3>Design</h3>
              <a href="docs.html#tokens">Tokens</a>
              <a href="docs.html#themes">Papers</a>
              <a href="docs.html#accessibility">Accessibility</a>
            </div>
          </div>
        </div>
        <div class="site-footer__word" aria-hidden="true">linework</div>
        <div class="lw-titleblock">
          <div class="lw-titleblock__cell">
            <span class="lw-titleblock__label">Project</span>
            <span class="lw-titleblock__value">Interface drawing</span>
          </div>
          <div class="lw-titleblock__cell">
            <span class="lw-titleblock__label">Sheet</span>
            <span class="lw-titleblock__value">LW-01 / ${String(new Date().getFullYear()).slice(-2)}</span>
          </div>
          <div class="lw-titleblock__cell">
            <span class="lw-titleblock__label">Drawn by</span>
            <span class="lw-titleblock__value">Linework</span>
          </div>
          <div class="lw-titleblock__cell">
            <span class="lw-titleblock__label">Scale</span>
            <span class="lw-titleblock__value">1:1</span>
          </div>
          <div class="lw-titleblock__cell">
            <span class="lw-titleblock__label">Licence</span>
            <span class="lw-titleblock__value">MIT · plain files</span>
          </div>
        </div>
        <div class="site-footer__legal">
          <span>© ${new Date().getFullYear()} Linework. Drawn in plain HTML, CSS and JavaScript.</span>
          <span>No dependencies · No build step · <a href="docs.html#accessibility">WCAG AA</a></span>
        </div>
      </div>`;
  }

  const themeLabel = () => {
    const label = THEME_LABELS[Linework.getTheme()] || 'Trace';
    document.querySelectorAll('[data-theme-label]').forEach((node) => {
      node.textContent = label;
    });
    document.querySelectorAll('[data-paper-label]').forEach((node) => {
      node.textContent = label;
    });
    document.querySelectorAll('[data-paper-label-lower]').forEach((node) => {
      node.textContent = label.toLowerCase();
    });
    document.querySelectorAll('[data-lw-theme="cycle"]').forEach((button) => {
      button.setAttribute(
        'aria-label',
        `Change paper theme. Current: ${label}`
      );
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--lw-paper').trim());
    }
  };

  const savedTheme = (() => {
    try {
      return localStorage.getItem('linework-theme');
    } catch {
      return null;
    }
  })();

  if (savedTheme && Linework.themes.includes(savedTheme)) {
    Linework.setTheme(savedTheme, { persist: false });
  }
  themeLabel();

  document.addEventListener('linework:theme', themeLabel);

  const progressBar = document.querySelector('.site-progress__bar');
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? Math.min(1, window.scrollY / height) : 0;
      if (progressBar) progressBar.style.setProperty('--site-progress', ratio.toFixed(4));
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-in'));
  }

  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const name = group.dataset.filterGroup;
    const target = document.querySelector(`[data-filter-target="${name}"]`);
    if (!target) return;
    const items = Array.from(target.querySelectorAll('[data-category]'));
    const buttons = Array.from(group.querySelectorAll('[data-filter]'));
    const status = document.querySelector(`[data-filter-status="${name}"]`);

    const apply = (filter) => {
      let visible = 0;
      items.forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.hidden = !show;
        if (show) visible += 1;
      });
      buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
      });
      if (status) {
        status.textContent = `${visible} block${visible === 1 ? '' : 's'}`;
      }

      if (name === 'blocks') {
        document.querySelectorAll('[data-index-category]').forEach((link) => {
          link.hidden = filter !== 'all' && link.dataset.indexCategory !== filter;
        });
        const jumpCount = document.querySelector('.docs-jump__count');
        if (jumpCount) {
          const shown = document.querySelectorAll('.docs-jump__panel a:not([hidden])').length;
          jumpCount.textContent = `${shown} sections`;
        }
        document.querySelectorAll('.blocks-index__group').forEach((group) => {
          group.hidden = ![...group.querySelectorAll('[data-index-category]')].some(
            (link) => !link.hidden
          );
        });
      }
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => apply(button.dataset.filter || 'all'));
    });
    apply('all');
  });

  document.querySelectorAll('[data-theme-demo]').forEach((demo) => {
    const preview = demo.querySelector('[data-theme-preview]');
    const buttons = Array.from(demo.querySelectorAll('[data-paper]'));
    const name = demo.querySelector('[data-paper-name]');
    if (!preview || buttons.length === 0) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const theme = button.dataset.paper;
        preview.setAttribute('data-theme', theme);
        buttons.forEach((item) => {
          item.setAttribute('aria-pressed', String(item === button));
        });
        if (name) name.textContent = THEME_LABELS[theme] || theme;
      });
    });
  });

  const docsNav = document.querySelector('.docs-nav');
  if (docsNav) {
    const links = Array.from(docsNav.querySelectorAll('a[href^="#"]'));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const setActive = () => {
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 160) current = section;
      }
      links.forEach((link) => {
        const match = current && link.getAttribute('href') === `#${current.id}`;
        link.classList.toggle('is-active', Boolean(match));
        if (match) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    let scheduled = false;
    window.addEventListener(
      'scroll',
      () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
          setActive();
          scheduled = false;
        });
      },
      { passive: true }
    );
    setActive();

    // Below the sidebar breakpoint, the index needs a compact replacement.
    const main =
      document.querySelector('.docs-main') || document.querySelector('.blocks-main');
    if (main && !main.querySelector('.docs-jump')) {
      const details = document.createElement('details');
      details.className = 'docs-jump';
      const summary = document.createElement('summary');
      summary.innerHTML = `<span>On this sheet</span><span class="docs-jump__count">${links.length} sections</span>`;
      const panel = document.createElement('div');
      panel.className = 'docs-jump__panel';
      links.forEach((link) => {
        const item = document.createElement('a');
        item.href = link.getAttribute('href');
        item.textContent = link.textContent.replace(/\s+/g, ' ').trim();
        if (link.dataset.indexCategory) item.dataset.indexCategory = link.dataset.indexCategory;
        item.addEventListener('click', () => details.removeAttribute('open'));
        panel.appendChild(item);
      });
      details.append(summary, panel);
      main.prepend(details);
    }
  }

  document.querySelectorAll('.site-mobile').forEach((details) => {
    details.addEventListener('click', (event) => {
      if (event.target.closest('a')) details.removeAttribute('open');
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') details.removeAttribute('open');
    });
    document.addEventListener('pointerdown', (event) => {
      if (details.open && !details.contains(event.target)) details.removeAttribute('open');
    });
    window.addEventListener(
      'scroll',
      () => {
        if (details.open) details.removeAttribute('open');
      },
      { passive: true }
    );
  });

  document.querySelectorAll('img[data-hide-on-error]').forEach((image) => {
    const hide = () => {
      image.style.display = 'none';
    };
    if (image.complete && image.naturalWidth === 0) hide();
    image.addEventListener('error', hide, { once: true });
  });

  document.querySelectorAll('[data-stop-pads]').forEach((button) => {
    button.addEventListener('click', () => {
      const scope =
        button.closest('.hero-board') ||
        button.closest('.paper-preview') ||
        button.closest('section') ||
        document;
      scope.querySelectorAll('lw-pad').forEach((pad) => pad.stop());
    });
  });

  document.querySelectorAll('[data-toast]').forEach((button) => {
    button.addEventListener('click', () => {
      Linework.toast({
        title: button.getAttribute('data-toast-title') || 'Saved',
        message:
          button.getAttribute('data-toast-message') ||
          'The drawing has been updated.',
        tone: button.getAttribute('data-toast-tone') || 'default',
      });
    });
  });

  const iconGallery = document.querySelector('[data-icon-list]');
  if (iconGallery && window.Linework) {
    iconGallery.innerHTML = Linework.icons.names
      .map(
        (name) => `
          <div class="icon-cell">
            <svg class="lw-icon" aria-hidden="true"><use href="#lw-i-${name}"></use></svg>
            <span>${name}</span>
          </div>`
      )
      .join('');
  }

  if (document.body.dataset.page === 'components') {
    let sequence = 0;
    document.querySelectorAll('.docs-main .demo-plate').forEach((plate) => {
      const body = plate.querySelector('.demo-plate__body');
      if (!body || plate.querySelector('.demo-code')) return;
      if (body.querySelector('lw-pad, lw-tabs, lw-meter, lw-drawer, lw-toast-stack')) return;
      const markup = body.innerHTML.trim();
      if (!markup) return;

      const id = `component-markup-${++sequence}`;
      const details = document.createElement('details');
      details.className = 'demo-code';

      const summary = document.createElement('summary');
      summary.textContent = 'View markup';

      const bar = document.createElement('div');
      bar.className = 'demo-code__bar';
      bar.innerHTML = '<span>HTML</span>';
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'lw-btn lw-btn--quiet lw-btn--sm';
      copy.setAttribute('data-lw-copy-target', `#${id}`);
      copy.innerHTML = '<svg class="lw-icon" aria-hidden="true"><use href="#lw-i-copy"></use></svg><span class="lw-copy-label">Copy</span>';
      bar.appendChild(copy);

      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.id = id;
      code.textContent = markup;
      pre.appendChild(code);
      details.append(summary, bar, pre);
      plate.appendChild(details);
    });
  }

  document.querySelectorAll('[data-lw-copy-target]').forEach((button) => {
    if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
      button.setAttribute('aria-label', 'Copy to clipboard');
    }
  });
})();
