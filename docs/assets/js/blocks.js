(() => {
  const blocks = window.LINEWORK_BLOCKS || [];
  const CATEGORY = { marketing: 'Marketing', application: 'Application' };

  const icon = (name) =>
    `<svg class="lw-icon" aria-hidden="true"><use href="#lw-i-${name}"></use></svg>`;

  const escapeHtml = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (character) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]
    );

  function wireDemo(root) {
    root.addEventListener('click', (event) => {
      const placeholder = event.target.closest('a[href="#"]');
      if (placeholder) {
        event.preventDefault();
        Linework.toast({
          title: 'Block preview',
          message: 'This link is illustrative. Point it at your own route when you copy the block.',
        });
      }
    });
    root.addEventListener('submit', (event) => {
      event.preventDefault();
      if (window.Linework) {
        Linework.toast({
          title: 'Demo only',
          message: 'This block is a preview. Wire the form to your own endpoint when you copy it.',
        });
      }
    });

    root.querySelectorAll('.blk-pricing').forEach((pricing) => {
      const buttons = Array.from(pricing.querySelectorAll('[data-billing]'));
      if (buttons.length === 0) return;
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const period = button.dataset.billing || 'monthly';
          pricing.querySelectorAll('[data-price]').forEach((price) => {
            const value =
              price.dataset[period === 'yearly' ? 'yearly' : 'monthly'];
            if (value) price.textContent = value;
          });
        });
      });
    });

    root.querySelectorAll('.lw-led').forEach((label) => {
      const input = label.querySelector('.lw-led__input');
      const state = label.querySelector('.lw-led__state');
      if (!input || !state) return;
      const sync = () => {
        state.textContent = input.checked ? 'On' : 'Off';
      };
      input.addEventListener('change', sync);
      sync();
    });
  }

  function renderIndex(index) {
    const groups = [
      ['marketing', 'Marketing'],
      ['application', 'Application'],
    ];
    index.innerHTML = groups
      .map(([key, label]) => {
        const items = blocks.filter((block) => block.category === key);
        if (items.length === 0) return '';
        return `
          <div class="blocks-index__group">
            <p class="lw-sidenav__label">${label}<span class="lw-sidenav__count">${String(items.length).padStart(2, '0')}</span></p>
            ${items
              .map(
                (block) => `
                  <a class="lw-sidenav__item blocks-index__link" href="#${block.id}" data-block-link="${block.id}" data-index-category="${key}">
                    <span class="blocks-index__num">${block.num}</span>
                    ${escapeHtml(block.title)}
                  </a>`
              )
              .join('')}
          </div>`;
      })
      .join('');
  }

  function renderGallery(mount) {
    const index = document.querySelector('[data-block-index]');
    if (index) renderIndex(index);

    blocks.forEach((block) => {
      const article = document.createElement('article');
      article.className = 'block-demo';
      article.id = block.id;
      article.dataset.category = block.category;
      article.innerHTML = `
        <header class="block-demo__head">
          <div class="block-demo__intro">
            <p class="block-demo__kicker"><span>${block.num}</span> — ${CATEGORY[block.category] || block.category}</p>
            <h2 class="block-demo__title">${escapeHtml(block.name)}</h2>
            <p class="block-demo__desc">${escapeHtml(block.desc)}</p>
          </div>
          <div class="block-demo__tools">
            <a class="lw-btn lw-btn--sm" href="preview.html?block=${block.id}" target="_blank" rel="noopener">
              ${icon('external')}
              Preview
            </a>
            <button type="button" class="lw-btn lw-btn--sm" data-copy-block>
              ${icon('copy')}
              <span class="lw-copy-label">Copy HTML</span>
            </button>
          </div>
        </header>
        <div class="block-demo__frame">
          <div class="block-demo__chrome">
            <span>Fig. ${block.num} — ${escapeHtml(block.title)}</span>
            <span>Responsive / 1120 max</span>
          </div>
          <div class="block-demo__preview"></div>
        </div>
        <details class="block-demo__code">
          <summary>
            <span>View markup</span>
            <span class="lw-smallprint">${block.html.split('\n').length} lines · HTML</span>
          </summary>
          <pre><code></code></pre>
        </details>`;

      article.querySelector('.block-demo__preview').innerHTML = block.html;
      // Galleries are one page with one h1; demote headings inside the preview.
      article.querySelectorAll('.block-demo__preview h1').forEach((heading) => {
        const demoted = document.createElement('h2');
        for (const attribute of heading.attributes) {
          demoted.setAttribute(attribute.name, attribute.value);
        }
        demoted.innerHTML = heading.innerHTML;
        heading.replaceWith(demoted);
      });
      article.querySelector('code').textContent = block.html;

      const copy = article.querySelector('[data-copy-block]');
      copy.addEventListener('click', async () => {
        const copied = await Linework.copy(block.html);
        if (!copied) {
          Linework.toast({
            title: 'Could not copy',
            message: 'Select the markup below and copy it by hand.',
            tone: 'warning',
          });
          return;
        }
        const label = copy.querySelector('.lw-copy-label');
        if (label) {
          const original = label.textContent;
          label.textContent = 'Copied';
          window.setTimeout(() => {
            label.textContent = original;
          }, 1600);
        }
        Linework.toast({
          title: 'Block copied',
          message: `${block.name} is on your clipboard.`,
          tone: 'success',
        });
      });

      wireDemo(article);
      mount.appendChild(article);
    });
  }

  function renderPreview() {
    const mount = document.querySelector('[data-block-preview]');
    if (!mount) return;
    const params = new URLSearchParams(window.location.search);
    const block =
      blocks.find((item) => item.id === params.get('block')) || blocks[0];
    if (!block) return;

    mount.innerHTML = block.html;
    document.title = `${block.name} — Linework block`;
    const name = document.getElementById('preview-name');
    if (name) name.textContent = `${block.num} / ${block.name}`;
    const theme = params.get('theme');
    if (theme && window.Linework) {
      Linework.setTheme(theme, { persist: false });
    }
    if (params.get('embed') === '1') {
      const bar = document.querySelector('.preview-bar');
      if (bar) bar.hidden = true;
      document.body.classList.add('is-embed');
    }
    wireDemo(mount);
  }

  const gallery = document.querySelector('[data-block-list]');
  if (gallery) {
    renderGallery(gallery);
    if (window.location.hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ block: 'start' });
      });
    }
  }
  if (document.querySelector('[data-block-preview]')) renderPreview();
})();
