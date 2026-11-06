(() => {
  const rowsBody = document.getElementById('sheet-rows');
  const search = document.getElementById('console-search');
  const filters = Array.from(document.querySelectorAll('[data-status-filter]'));
  const empty = document.getElementById('sheet-empty');
  const sheetCount = document.getElementById('sheet-count');
  const approvalsCount = document.getElementById('approval-count');
  const sidebarApprovals = document.getElementById('sidebar-approvals');
  const newSheetForm = document.getElementById('new-sheet-form');
  const openReviews = document.getElementById('open-reviews');
  const waitingCount = document.getElementById('waiting-count');
  const nameField = document.getElementById('ns-name');
  const nameError = document.getElementById('ns-name-error');

  const STATUS = {
    review: { label: 'In review', className: 'lw-stamp--red' },
    draft: { label: 'Draft', className: 'lw-stamp--quiet' },
    approved: { label: 'Approved', className: 'lw-stamp--ink' },
  };

  const themeLabels = { trace: 'Trace', blueprint: 'Blueprint', vellum: 'Vellum' };
  let activeRow = null;
  let pendingArchive = null;
  let nextCode = 116;

  const escapeHtml = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (character) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]
    );

  const rows = () => Array.from(rowsBody.querySelectorAll('tr[data-sheet-row]'));
  const pad = (value) => String(value).padStart(2, '0');

  const stampMarkup = (status) => {
    const entry = STATUS[status] || STATUS.draft;
    return `<span class="lw-stamp ${entry.className}">${entry.label}</span>`;
  };

  function updateCounts() {
    const all = rows();
    const counts = {
      all: all.length,
      review: all.filter((row) => row.dataset.status === 'review').length,
      approved: all.filter((row) => row.dataset.status === 'approved').length,
      draft: all.filter((row) => row.dataset.status === 'draft').length,
    };
    Object.entries(counts).forEach(([key, value]) => {
      const node = document.querySelector(`[data-count-for="${key}"]`);
      if (node) node.textContent = pad(value);
    });
    const stat = document.getElementById('stat-sheets');
    if (stat) {
      const initial = 28;
      stat.textContent = String(initial + (all.length - 5));
    }
  }

  function applyFilter() {
    if (!search) return;
    const term = search.value.trim().toLowerCase();
    const active = filters.find((button) => button.classList.contains('is-active'));
    const status = active?.dataset.statusFilter || 'all';
    const allRows = rows();
    let visible = 0;

    allRows.forEach((row) => {
      const haystack = `${row.dataset.name} ${row.dataset.code} ${row.dataset.owner}`.toLowerCase();
      const textMatch = !term || haystack.includes(term);
      const statusMatch = status === 'all' || row.dataset.status === status;
      const match = textMatch && statusMatch;
      row.hidden = !match;
      if (match) visible += 1;
    });

    if (empty) empty.hidden = visible > 0;
    if (sheetCount) {
      sheetCount.textContent =
        visible === allRows.length
          ? `${allRows.length} sheet${allRows.length === 1 ? '' : 's'}`
          : `${visible} of ${allRows.length} sheets`;
    }
  }

  function setStatusFilter(status) {
    filters.forEach((button) => {
      const active = button.dataset.statusFilter === status;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function resetView() {
    if (search) search.value = '';
    setStatusFilter('all');
  }

  function refresh() {
    updateCounts();
    applyFilter();
  }

  search?.addEventListener('input', applyFilter);

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      setStatusFilter(button.dataset.statusFilter || 'all');
      applyFilter();
    });
  });

  function openDetail(row) {
    if (!row) return;
    const drawer = document.getElementById('sheet-detail');
    document.getElementById('detail-title').textContent = row.dataset.name;
    document.getElementById('detail-code').textContent = row.dataset.code;
    document.getElementById('detail-plan-code').textContent = row.dataset.code;
    document.getElementById('detail-owner').textContent = row.dataset.owner;
    document.getElementById('detail-updated').textContent = row.dataset.updated;
    document.getElementById('detail-due').textContent = row.dataset.due || 'To be set';
    document.getElementById('detail-team').textContent = row.dataset.team || 'Unassigned';
    document.getElementById('detail-note').textContent =
      row.dataset.note || 'No open items from the latest review round.';
    document.getElementById('detail-status').innerHTML = stampMarkup(row.dataset.status);
    drawer.setAttribute('label', `${row.dataset.name} — sheet detail`);
    Linework.open(drawer);
  }

  function buildRow({
    name,
    code,
    status,
    owner,
    initials,
    updated,
    due = 'To be set',
    team = 'Unassigned',
    note = 'No open items from the latest review round.',
  }) {
    const row = document.createElement('tr');
    row.dataset.sheetRow = '';
    row.dataset.name = name;
    row.dataset.code = code;
    row.dataset.status = status;
    row.dataset.owner = owner;
    row.dataset.initials = initials;
    row.dataset.updated = updated;
    row.dataset.due = due;
    row.dataset.team = team;
    row.dataset.note = note;

    const firstName = owner.split(' ')[0];
    row.innerHTML = `
      <td>
        <button type="button" class="cn-sheet-name" data-open-sheet>
          <span>
            <span class="cn-sheet-name__title">${escapeHtml(name)}</span>
            <span class="cn-sheet-code">${escapeHtml(code)} · Rev 01</span>
          </span>
        </button>
      </td>
      <td><span class="cn-owner"><span class="lw-avatar">${escapeHtml(initials)}</span>${escapeHtml(firstName)}</span></td>
      <td class="lw-table__muted">${escapeHtml(updated)}</td>
      <td>${stampMarkup(status)}</td>
      <td class="lw-table__actions">
        <button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" data-lw-menu="#sheet-menu" data-row-menu aria-label="Actions for ${escapeHtml(name)}">
          <svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg>
        </button>
      </td>`;
    return row;
  }

  function duplicateRow(row) {
    if (!row) return;
    const code = `A-${nextCode++}`;
    const name = `${row.dataset.name} copy`;
    const clone = buildRow({
      name,
      code,
      status: 'draft',
      owner: row.dataset.owner,
      initials: row.dataset.initials,
      updated: 'Just now',
      due: 'To be set',
      team: row.dataset.team || 'Unassigned',
      note: 'Duplicated from the latest revision; awaiting the first review.',
    });
    resetView();
    rowsBody.prepend(clone);
    refresh();
    Linework.toast({
      title: 'Sheet duplicated',
      message: `${name} is now a draft on the schedule.`,
      tone: 'success',
    });
  }

  function askArchive(row) {
    if (!row) return;
    pendingArchive = row;
    document.getElementById('archive-name').textContent = row.dataset.name;
    Linework.open('archive-dialog');
  }

  document.getElementById('confirm-archive')?.addEventListener('click', () => {
    if (!pendingArchive) return;
    const row = pendingArchive;
    const name = row.dataset.name;
    const visible = rows().filter((entry) => !entry.hidden);
    const index = visible.indexOf(row);
    const neighbour = visible[index + 1] || visible[index - 1];
    if (row.dataset.status === 'review') decrementOpenReviews();
    row.remove();
    document.querySelectorAll('.cn-approval').forEach((card) => {
      if (card.dataset.approvalName === name) card.remove();
    });
    syncApprovals();
    pendingArchive = null;
    Linework.close('archive-dialog');
    refresh();
    (neighbour?.querySelector('[data-open-sheet]') || search)?.focus();
    Linework.toast({
      title: 'Sheet archived',
      message: `${name} moved to the archive.`,
    });
  });

  function syncApprovals() {
    const pending = document.querySelectorAll('.cn-approval:not(.is-approved)').length;
    if (approvalsCount) approvalsCount.textContent = `${pad(pending)} open`;
    if (sidebarApprovals) sidebarApprovals.textContent = pad(pending);
    document.querySelectorAll('#console-nav .lw-sidenav__count').forEach((node) => {
      node.textContent = pad(pending);
    });
    if (waitingCount) waitingCount.textContent = String(pending);
  }

  function decrementOpenReviews() {
    if (!openReviews) return;
    const open = Math.max(0, (parseInt(openReviews.textContent, 10) || 0) - 1);
    openReviews.textContent = pad(open);
  }

  function approveItem(item) {
    if (!item || item.classList.contains('is-approved')) return;
    const hadFocus = item.contains(document.activeElement);
    item.classList.add('is-approved');
    const actions = item.querySelector('.cn-approval__actions');
    if (actions) {
      actions.innerHTML = '<span class="lw-stamp lw-stamp--ink">Approved</span>';
    }

    const approvedName = item.dataset.approvalName;
    const row = rows().find((entry) => entry.dataset.name === approvedName);
    if (row) {
      if (row.dataset.status === 'review') decrementOpenReviews();
      row.dataset.status = 'approved';
      const cells = row.querySelectorAll('td');
      if (cells[3]) cells[3].innerHTML = stampMarkup('approved');
    }

    syncApprovals();
    refresh();
    if (hadFocus) {
      const next = document.querySelector('.cn-approval:not(.is-approved) [data-approve]');
      const title = document.getElementById('approvals-title');
      if (!next && title) title.setAttribute('tabindex', '-1');
      (next || title)?.focus();
    }
    Linework.toast({
      title: 'Approved',
      message: `${approvedName} is approved.`,
      tone: 'success',
    });
  }

  function syncThemeButtons() {
    const current = Linework.getTheme();
    document.querySelectorAll('[data-cn-theme]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.cnTheme === current));
    });
  }

  function setConsoleTheme(theme) {
    Linework.setTheme(theme);
    syncThemeButtons();
    Linework.toast({
      title: 'Paper changed',
      message: `${themeLabels[theme] || theme} is now the drawing paper.`,
    });
  }

  document.addEventListener('linework:theme', syncThemeButtons);

  document.addEventListener('click', (event) => {
    const menuButton = event.target.closest('[data-row-menu]');
    if (menuButton) activeRow = menuButton.closest('tr');

    const openButton = event.target.closest('[data-open-sheet]');
    if (openButton) openDetail(openButton.closest('tr'));

    const action = event.target.closest('[data-sheet-action]');
    if (action) {
      const kind = action.dataset.sheetAction;
      if (kind === 'open') openDetail(activeRow);
      if (kind === 'duplicate') duplicateRow(activeRow);
      if (kind === 'archive') askArchive(activeRow);
    }

    const approvalOpen = event.target.closest('[data-open-sheet-by-name]');
    if (approvalOpen) {
      const name = approvalOpen.dataset.openSheetByName;
      const row = rows().find((entry) => entry.dataset.name === name);
      if (row) openDetail(row);
    }

    const approve = event.target.closest('[data-approve]');
    if (approve) approveItem(approve.closest('.cn-approval'));

    const themeButton = event.target.closest('[data-cn-theme]');
    if (themeButton) setConsoleTheme(themeButton.dataset.cnTheme);

    const account = event.target.closest('[data-account-action]');
    if (account) {
      const actionName = account.dataset.accountAction;
      if (actionName === 'settings') Linework.open('console-settings');
      else if (actionName === 'profile') {
        Linework.toast({
          title: 'Mara Weiss',
          message: 'Design director · Atelier North.',
        });
      } else if (actionName === 'signout') {
        Linework.toast({
          title: 'Demo only',
          message: 'Sign-out is not wired in the showroom.',
        });
      }
    }

    if (event.target.closest('[data-editor]')) {
      Linework.toast({
        title: 'Editor',
        message: 'The drawing editor is not part of this showroom.',
      });
    }

    if (event.target.closest('[data-manage-plan]')) {
      Linework.toast({
        title: 'Studio plan',
        message: 'Billing lives outside this reference build.',
      });
    }

    if (event.target.closest('[data-console-settings]')) {
      Linework.close('console-nav');
      window.setTimeout(() => Linework.open('console-settings'), 180);
    }
  });

  document.querySelector('[data-export]')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    if (button.classList.contains('is-loading')) return;
    button.classList.add('is-loading');
    window.setTimeout(() => {
      button.classList.remove('is-loading');
      Linework.toast({
        title: 'Export prepared',
        message: 'A static PDF would be generated from the selected sheets.',
        tone: 'success',
      });
    }, 800);
  });

  document.getElementById('console-settings-save')?.addEventListener('click', () => {
    Linework.toast({
      title: 'Settings noted',
      message: 'The paper choice persists; everything else is demonstration only.',
    });
  });

  document.getElementById('new-sheet')?.addEventListener('lw-open', () => {
    nameField?.removeAttribute('aria-invalid');
    if (nameError) nameError.hidden = true;
  });

  nameField?.addEventListener('input', () => {
    nameField.removeAttribute('aria-invalid');
    if (nameError) nameError.hidden = true;
  });

  newSheetForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameField.value.trim();
    if (!name) {
      nameField.setAttribute('aria-invalid', 'true');
      if (nameError) nameError.hidden = false;
      nameField.focus();
      return;
    }
    nameField.removeAttribute('aria-invalid');
    if (nameError) nameError.hidden = true;

    const lead = document.getElementById('ns-lead');
    const project = document.getElementById('ns-project');
    const initials = lead.value;
    const owner = lead.options[lead.selectedIndex].text;
    const code = `A-${nextCode++}`;
    const row = buildRow({
      name,
      code,
      status: 'draft',
      owner,
      initials,
      updated: 'Just now',
      due: 'To be set',
      team: project.options[project.selectedIndex].text,
      note: 'New sheet; awaiting the first review round.',
    });
    resetView();
    rowsBody.prepend(row);
    refresh();
    Linework.close('new-sheet');
    newSheetForm.reset();
    Linework.toast({
      title: 'Sheet created',
      message: `${name} is on the schedule as a draft.`,
      tone: 'success',
    });
  });

  document.querySelectorAll('.cn-sidebar .lw-sidenav__item').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.cn-sidebar .lw-sidenav__item').forEach((item) => {
        if (item !== link) item.removeAttribute('aria-current');
      });
      link.setAttribute('aria-current', 'page');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const target = event.target;
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable]')) {
        return;
      }
      if (document.querySelector('dialog[open]')) return;
      event.preventDefault();
      document.querySelectorAll('.lw-menu:popover-open').forEach((menu) => menu.hidePopover());
      search?.focus();
    }
  });

  refresh();
  syncThemeButtons();
})();
