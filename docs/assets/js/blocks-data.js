/* Block markup, exposed as window.LINEWORK_BLOCKS for the gallery, previews and copy buttons. */
(function () {
  const dedent = (value) => {
    const lines = String(value).replace(/\t/g, '  ').split('\n');
    while (lines.length && lines[0].trim() === '') lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
    const indents = lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^ */)[0].length);
    const common = indents.length ? Math.min(...indents) : 0;
    return lines.map((line) => line.slice(common)).join('\n');
  };

  const blocks = [
    {
      id: 'hero',
      num: '01',
      name: 'Hero, with proof',
      title: 'Hero',
      category: 'marketing',
      desc: 'A full sheet headline, actions, social proof and a figure that carries real content.',
      html: dedent(`
        <section class="blk blk-hero" aria-labelledby="fold-hero-title">
          <div class="blk-wrap">
            <div class="blk-hero__grid">
              <div>
                <p class="blk-kicker">Fold / Workspace</p>
                <h1 class="blk-hero__title" id="fold-hero-title">Work, drawn out in the open.</h1>
                <p class="blk-hero__lede">Fold is a shared sheet for teams who think with their hands. Plans, reviews and decisions kept on one surface instead of six tabs.</p>
                <div class="blk-actions">
                  <a class="lw-btn lw-btn--primary lw-btn--lg" href="#">Start a sheet</a>
                  <a class="lw-btn lw-btn--lg" href="#">See a walkthrough</a>
                </div>
                <div class="blk-hero__proof">
                  <span class="lw-avatars">
                    <span class="lw-avatar lw-avatar--sm">MW</span>
                    <span class="lw-avatar lw-avatar--sm">JK</span>
                    <span class="lw-avatar lw-avatar--sm">AS</span>
                  </span>
                  <span><strong>12,400</strong> teams drawing</span>
                  <span class="lw-stamp lw-stamp--quiet">SOC 2</span>
                </div>
              </div>
              <figure class="blk-hero__figure">
                <div class="blk-hero__sheet">
                  <div class="blk-hero__sheet-bar">
                    <span>Approval sheet / A-104</span>
                    <span>Rev 04</span>
                  </div>
                  <div class="blk-hero__sheet-body">
                    <div class="blk-approval">
                      <div class="blk-approval__top">
                        <div>
                          <span class="blk-approval__label">Release 4.0</span>
                          <h3>North facade</h3>
                        </div>
                        <span class="lw-stamp lw-stamp--red">In review</span>
                      </div>
                      <div class="blk-approval__rows">
                        <div class="blk-approval__row"><span>Owner</span><span>Mara Weiss</span></div>
                        <div class="blk-approval__row"><span>Due</span><span>18 Oct 2026</span></div>
                        <div class="blk-approval__row"><span>Reviewers</span><span>4 people</span></div>
                        <div class="blk-approval__row"><span>Scope</span><span>Facade, lighting</span></div>
                      </div>
                      <div class="blk-approval__progress">
                        <div class="blk-approval__progress-head"><span>Approval</span><span>3 of 4</span></div>
                        <div class="lw-progress"><div class="lw-progress__bar" style="width:75%"></div></div>
                      </div>
                      <div class="blk-approval__signoff">
                        <span class="lw-avatars">
                          <span class="lw-avatar lw-avatar--sm">MW</span>
                          <span class="lw-avatar lw-avatar--sm">JK</span>
                          <span class="lw-avatar lw-avatar--sm">AS</span>
                          <span class="lw-avatar lw-avatar--sm">+1</span>
                        </span>
                        <span class="lw-smallprint">One signature to go</span>
                      </div>
                      <p class="blk-approval__note"><strong>Redline note:</strong> handrail detail still to be resolved before sign-off.</p>
                    </div>
                  </div>
                  <div class="blk-hero__sheet-bar blk-hero__sheet-bar--foot">
                    <span>Scale 1:50</span>
                    <span>Fold / 2026</span>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'features',
      num: '02',
      name: 'Feature grid',
      title: 'Features',
      category: 'marketing',
      desc: 'Six numbered features in a measured grid. Enough room for a real sentence, no card shadows.',
      html: dedent(`
        <section class="blk blk-features" aria-labelledby="fold-features-title">
          <div class="blk-wrap">
            <div class="blk-head">
              <div>
                <p class="blk-kicker">Features</p>
                <h2 class="blk-title" id="fold-features-title">Everything in plain view.</h2>
                <p class="blk-lede">Six parts of the workspace that replace six other tools. All of them share one surface, one history and one obvious place to look.</p>
              </div>
              <p class="blk-head__aside">Designed for teams of four to four hundred. No hidden panels, no nested menus, no “where did that comment go?”</p>
            </div>
            <div class="blk-features__grid">
              <article class="blk-feature">
                <div class="blk-feature__top"><span class="blk-feature__num">01</span><span class="blk-feature__icon"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-sheet"></use></svg></span></div>
                <h3>Canvas plans</h3>
                <p>Arrange the work spatially. Move a decision and everything it touches moves with it.</p>
              </article>
              <article class="blk-feature">
                <div class="blk-feature__top"><span class="blk-feature__num">02</span><span class="blk-feature__icon"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-file"></use></svg></span></div>
                <h3>Living documents</h3>
                <p>Specs, notes and approvals live beside the drawing instead of inside a folder nobody opens.</p>
              </article>
              <article class="blk-feature">
                <div class="blk-feature__top"><span class="blk-feature__num">03</span><span class="blk-feature__icon"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg></span></div>
                <h3>Review in place</h3>
                <p>Mark up a sheet, not a screenshot. Comments carry the version and the exact point they refer to.</p>
              </article>
              <article class="blk-feature">
                <div class="blk-feature__top"><span class="blk-feature__num">04</span><span class="blk-feature__icon"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-clock"></use></svg></span></div>
                <h3>Version marks</h3>
                <p>Every save on the record. Diff two revisions without leaving the sheet you are reading.</p>
              </article>
              <article class="blk-feature">
                <div class="blk-feature__top"><span class="blk-feature__num">05</span><span class="blk-feature__icon"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-keyboard"></use></svg></span></div>
                <h3>Quiet shortcuts</h3>
                <p>The keyboard works the way you expect. Letter keys for comments, brackets for revisions.</p>
              </article>
              <article class="blk-feature">
                <div class="blk-feature__top"><span class="blk-feature__num">06</span><span class="blk-feature__icon"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-download"></use></svg></span></div>
                <h3>Export to scale</h3>
                <p>Print at scale, export a static PDF, or hand the whole sheet to someone without an account.</p>
              </article>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'pricing',
      num: '03',
      name: 'Pricing',
      title: 'Pricing',
      category: 'marketing',
      desc: 'Three plans as measured columns. One redline recommendation, no floating cards.',
      html: dedent(`
        <section class="blk blk-pricing" aria-labelledby="fold-pricing-title">
          <div class="blk-wrap">
            <div class="blk-pricing__head">
              <div>
                <p class="blk-kicker">Pricing</p>
                <h2 class="blk-title" id="fold-pricing-title">Measured in seats, not surprises.</h2>
                <p class="blk-lede blk-lede--sm">Every plan includes the full canvas, unlimited guests and the complete revision history. Upgrade when the team does.</p>
              </div>
              <div class="lw-segments" role="group" aria-label="Billing period">
                <button type="button" class="lw-segments__item" data-billing="monthly" aria-pressed="true">Monthly</button>
                <button type="button" class="lw-segments__item" data-billing="yearly" aria-pressed="false">Yearly −20%</button>
              </div>
            </div>
            <div class="blk-plans">
              <article class="blk-plan">
                <div class="blk-plan__head"><span class="blk-plan__name">Draft</span></div>
                <p class="blk-plan__desc">For a first drawing, or a team of one.</p>
                <div class="blk-plan__price">$0 <small>/ forever</small></div>
                <ul class="blk-plan__features">
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>One active sheet</li>
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Three guests</li>
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>PDF export</li>
                </ul>
                <button type="button" class="lw-btn lw-btn--block">Start drawing</button>
              </article>
              <article class="blk-plan blk-plan--featured">
                <div class="blk-plan__head"><span class="blk-plan__name">Studio</span><span class="lw-stamp lw-stamp--ink">Most specified</span></div>
                <p class="blk-plan__desc">For teams who review together, every week.</p>
                <div class="blk-plan__price"><span>$<span data-price data-monthly="24" data-yearly="19">24</span></span> <small>/ seat / month</small></div>
                <ul class="blk-plan__features">
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Unlimited sheets and guests</li>
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Review rooms and approvals</li>
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Version comparison</li>
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Custom papers and stamps</li>
                </ul>
                <button type="button" class="lw-btn lw-btn--primary lw-btn--block">Start free for 14 days</button>
              </article>
              <article class="blk-plan">
                <div class="blk-plan__head"><span class="blk-plan__name">Atelier</span></div>
                <p class="blk-plan__desc">For practices with their own rules and records.</p>
                <div class="blk-plan__price">Custom</div>
                <ul class="blk-plan__features">
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Everything in Studio</li>
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>SSO, SCIM and audit log</li>
                  <li><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Dedicated success support</li>
                </ul>
                <button type="button" class="lw-btn lw-btn--block">Talk to us</button>
              </article>
            </div>
            <p class="blk-pricing__note">Prices in USD, billed to the whole workspace. Cancel or change plan at any time.</p>
          </div>
        </section>
      `),
    },
    {
      id: 'faq',
      num: '04',
      name: 'Questions',
      title: 'FAQ',
      category: 'marketing',
      desc: 'Questions answered as a drawing schedule, with a human escape hatch on the left.',
      html: dedent(`
        <section class="blk blk-faq" aria-labelledby="fold-faq-title">
          <div class="blk-wrap">
            <div class="blk-faq__grid">
              <div class="blk-faq__aside">
                <p class="blk-kicker">Questions</p>
                <h2 class="blk-title" id="fold-faq-title">Before you start drawing.</h2>
                <p class="blk-lede blk-lede--sm">If it is not covered here, a person will answer — usually within a working day.</p>
                <div class="blk-faq__contact">
                  <span class="lw-avatar lw-avatar--sm">JK</span>
                  <span><a href="#">Talk to a human</a><br><span class="lw-smallprint">Jonas, support</span></span>
                </div>
              </div>
              <div class="lw-accordion">
                <details class="lw-accordion__item" open>
                  <summary class="lw-accordion__summary">Can I invite people who do not have an account?</summary>
                  <div class="lw-accordion__body"><p>Yes. Guests can view any sheet you share, leave comments and approve reviews. They only need an account when they want to create sheets of their own.</p></div>
                </details>
                <details class="lw-accordion__item">
                  <summary class="lw-accordion__summary">What happens to a sheet after a project closes?</summary>
                  <div class="lw-accordion__body"><p>It moves to the archive with its full revision history, and every link keeps working. You can pin an archived sheet back into an active workspace at any time.</p></div>
                </details>
                <details class="lw-accordion__item">
                  <summary class="lw-accordion__summary">Do you train models on our drawings?</summary>
                  <div class="lw-accordion__body"><p>No. Workspace content is never used to train anything. We store it, sync it and return it when asked; nothing else.</p></div>
                </details>
                <details class="lw-accordion__item">
                  <summary class="lw-accordion__summary">Can we use our own type and paper?</summary>
                  <div class="lw-accordion__body"><p>Studio and Atelier workspaces can apply a custom paper, ink and redline colour. Every theme is a small set of variables — no rebuild, no plugin.</p></div>
                </details>
                <details class="lw-accordion__item">
                  <summary class="lw-accordion__summary">Is there an offline mode?</summary>
                  <div class="lw-accordion__body"><p>Sheets you have opened stay readable offline, and your own notes queue until the connection returns. Review approvals always need a connection so the record stays accurate.</p></div>
                </details>
              </div>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'testimonial',
      num: '05',
      name: 'Client note',
      title: 'Testimonial',
      category: 'marketing',
      desc: 'A quote set like a title block, with provenance and a measured result beside it.',
      html: dedent(`
        <section class="blk blk-testimonial" aria-labelledby="fold-quote-title">
          <div class="blk-wrap">
            <div class="blk-testimonial__grid">
              <div>
                <p class="blk-kicker">Client note / 01</p>
                <blockquote class="blk-quote" id="fold-quote-title">“Fold replaced <em>three tools</em> and one Monday meeting. The drawing is the discussion now.”</blockquote>
                <div class="blk-author">
                  <span class="lw-avatar lw-avatar--lg">MW</span>
                  <span>
                    <span class="blk-author__name">Mara Weiss</span><br>
                    <span class="blk-author__role">Design director, Atelier North</span>
                  </span>
                  <span class="blk-author__spacer"></span>
                  <span class="lw-stamp lw-stamp--quiet">Verified / 2026</span>
                </div>
              </div>
              <aside class="blk-aside" aria-label="Results at Atelier North">
                <div class="blk-aside__cap"><span>Field note / results</span><span>12 weeks</span></div>
                <div class="blk-aside__body">
                  <div class="blk-aside__brand"><span class="blk-logo">atelier north</span></div>
                  <div class="blk-aside__stat"><strong>−38%</strong><span>Review cycle<br>time</span></div>
                  <div class="blk-aside__stat"><strong>1,204</strong><span>Sheets<br>shipped</span></div>
                  <div class="blk-aside__stat"><strong>86</strong><span>People on<br>one surface</span></div>
                  <div class="lw-sparkbars" style="margin-top:16px" aria-hidden="true">
                    <span style="--v:36%"></span><span style="--v:48%"></span><span style="--v:42%"></span><span style="--v:58%"></span><span style="--v:66%"></span><span style="--v:61%"></span><span style="--v:78%"></span><span style="--v:88%" class="is-red"></span>
                  </div>
                  <div class="lw-sparkbars__label"><span>W01</span><span>W12</span></div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'cta',
      num: '06',
      name: 'Closing call',
      title: 'Call to action',
      category: 'marketing',
      desc: 'A dark blueprint sheet for the final ask. One line, two keys, a measured rule.',
      html: dedent(`
        <section class="blk blk-cta" data-theme="blueprint" aria-labelledby="fold-cta-title">
          <span class="lw-reg lw-reg--tl" aria-hidden="true"></span>
          <span class="lw-reg lw-reg--tr" aria-hidden="true"></span>
          <span class="lw-reg lw-reg--bl" aria-hidden="true"></span>
          <span class="lw-reg lw-reg--br" aria-hidden="true"></span>
          <div class="blk-cta__inner">
            <p class="blk-kicker blk-kicker--center">Sheet 06 / The ask</p>
            <h2 class="blk-cta__title" id="fold-cta-title">Put it on paper.</h2>
            <p class="blk-cta__lede">Start with one sheet, invite the people who argue about it, and keep the argument where the work is.</p>
            <div class="blk-actions">
              <a class="lw-btn lw-btn--primary lw-btn--lg" href="#">Start a sheet</a>
              <a class="lw-btn lw-btn--lg" href="#">Book a walkthrough</a>
            </div>
            <div class="blk-cta__rule"></div>
            <div class="blk-cta__meta"><span>Free for one sheet</span><span>No card</span><span>Cancel whenever</span></div>
          </div>
        </section>
      `),
    },
    {
      id: 'dashboard',
      num: '07',
      name: 'Project dashboard',
      title: 'Dashboard',
      category: 'application',
      desc: 'A working app shell: navigation, stats, a schedule table and an activity ledger.',
      html: dedent(`
        <section class="blk blk-dash" aria-labelledby="fold-dash-title">
          <div class="blk-wrap">
            <div class="blk-dash__app">
              <div class="blk-dash__topbar">
                <a class="blk-logo" href="#" aria-label="Fold home">fold</a>
                <nav class="blk-dash__nav" aria-label="Workspace">
                  <a href="#" aria-current="page">Overview</a>
                  <a href="#">Sheets</a>
                  <a href="#">Reviews</a>
                </nav>
                <div class="blk-dash__topbar-right">
                  <button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="Search">
                    <svg class="lw-icon" aria-hidden="true"><use href="#lw-i-search"></use></svg>
                  </button>
                  <button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" data-lw-menu="#blocks-user-menu" aria-label="Account menu">
                    <span class="lw-avatar lw-avatar--sm">MW</span>
                  </button>
                  <div class="lw-popover lw-menu" id="blocks-user-menu" popover>
                    <button type="button" class="lw-menu__item">Profile</button>
                    <button type="button" class="lw-menu__item">Workspace settings</button>
                    <hr class="lw-menu__sep">
                    <button type="button" class="lw-menu__item lw-menu__item--danger">Sign out</button>
                  </div>
                </div>
              </div>
              <div class="blk-dash__body">
                <aside class="blk-dash__side">
                  <div class="blk-dash__side-block">
                    <p class="lw-sidenav__label">Workspace</p>
                    <nav class="lw-sidenav" aria-label="Workspace sections">
                      <a class="lw-sidenav__item" href="#" aria-current="page"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-grid"></use></svg>Overview</a>
                      <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-sheet"></use></svg>Sheets<span class="lw-sidenav__count">284</span></a>
                      <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg>Reviews<span class="lw-sidenav__count">04</span></a>
                      <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-clock"></use></svg>History</a>
                    </nav>
                  </div>
                  <div class="blk-dash__side-block">
                    <p class="lw-sidenav__label">Team</p>
                    <nav class="lw-sidenav" aria-label="Team spaces">
                      <a class="lw-sidenav__item" href="#">Atelier North</a>
                      <a class="lw-sidenav__item" href="#">Competitions</a>
                      <a class="lw-sidenav__item" href="#">Archive</a>
                    </nav>
                  </div>
                  <div class="blk-dash__plan">
                    <p class="blk-dash__plan-label">Studio plan</p>
                    <p class="blk-dash__plan-value">18 of 25 seats</p>
                    <div class="lw-progress" style="margin:8px 0 10px"><div class="lw-progress__bar" style="width:72%"></div></div>
                    <button type="button" class="lw-btn lw-btn--sm lw-btn--block">Manage plan</button>
                  </div>
                </aside>
                <div class="blk-dash__main">
                  <nav class="lw-breadcrumb" aria-label="Breadcrumb">
                    <ol><li><a href="#">Atelier North</a></li><li aria-current="page">Overview</li></ol>
                  </nav>
                  <div class="blk-dash__head">
                    <div>
                      <h2 class="blk-dash__title" id="fold-dash-title">Good morning, Mara.</h2>
                      <p class="blk-dash__sub">Four reviews are waiting. Two are yours.</p>
                    </div>
                    <div class="lw-cluster">
                      <button type="button" class="lw-btn lw-btn--sm"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-download"></use></svg>Export</button>
                      <button type="button" class="lw-btn lw-btn--primary lw-btn--sm"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-plus"></use></svg>New sheet</button>
                    </div>
                  </div>
                  <div class="lw-stats blk-dash__stats">
                    <div class="lw-stat">
                      <span class="lw-stat__label">Open reviews <span class="lw-stamp lw-stamp--red">Live</span></span>
                      <span class="lw-stat__value">04</span>
                      <span class="lw-stat__foot"><span class="lw-delta">↑ 2</span> this week</span>
                    </div>
                    <div class="lw-stat">
                      <span class="lw-stat__label">Sheets this month</span>
                      <span class="lw-stat__value">28</span>
                      <span class="lw-stat__foot"><span class="lw-delta">↑ 12%</span> on September</span>
                    </div>
                    <div class="lw-stat">
                      <span class="lw-stat__label">Approval time</span>
                      <span class="lw-stat__value">2.4 <small class="lw-smallprint">days</small></span>
                      <span class="lw-stat__foot"><span class="lw-delta">↓ 0.6</span> faster</span>
                    </div>
                  </div>
                  <div class="blk-dash__content">
                    <div>
                      <div class="blk-dash__section-head"><h3>Recent sheets</h3><a class="lw-smallprint" href="#">View all 284</a></div>
                      <table class="lw-table lw-table--compact">
                        <thead>
                          <tr><th>Sheet</th><th>Owner</th><th>Updated</th><th>Status</th><th></th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span class="blk-dash__sheet-name"><span class="blk-dash__sheet-mark"></span>North facade</span></td>
                            <td><span class="blk-dash__owner"><span class="lw-avatar lw-avatar--sm">MW</span>Mara</span></td>
                            <td class="lw-table__muted">2 hours ago</td>
                            <td><span class="lw-stamp lw-stamp--red">In review</span></td>
                            <td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td>
                          </tr>
                          <tr>
                            <td><span class="blk-dash__sheet-name"><span class="blk-dash__sheet-mark"></span>Atrium / concept 2</span></td>
                            <td><span class="blk-dash__owner"><span class="lw-avatar lw-avatar--sm">JK</span>Jonas</span></td>
                            <td class="lw-table__muted">Yesterday</td>
                            <td><span class="lw-stamp lw-stamp--quiet">Draft</span></td>
                            <td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td>
                          </tr>
                          <tr>
                            <td><span class="blk-dash__sheet-name"><span class="blk-dash__sheet-mark"></span>East wing / tender</span></td>
                            <td><span class="blk-dash__owner"><span class="lw-avatar lw-avatar--sm">AS</span>Ada</span></td>
                            <td class="lw-table__muted">12 Oct</td>
                            <td><span class="lw-stamp lw-stamp--ink">Approved</span></td>
                            <td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td>
                          </tr>
                          <tr>
                            <td><span class="blk-dash__sheet-name"><span class="blk-dash__sheet-mark"></span>Roof study / draft</span></td>
                            <td><span class="blk-dash__owner"><span class="lw-avatar lw-avatar--sm">MW</span>Mara</span></td>
                            <td class="lw-table__muted">9 Oct</td>
                            <td><span class="lw-stamp lw-stamp--blue">Shared</span></td>
                            <td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <aside class="blk-dash__rail">
                      <div class="blk-dash__section-head"><h3>Activity</h3><span class="lw-mono">Today</span></div>
                      <div class="blk-dash__activity">
                        <ul class="lw-activity">
                          <li class="lw-activity__item lw-activity__item--live"><div><p class="lw-activity__title"><strong>Jonas</strong> left a redline on North facade.</p><p class="lw-activity__meta">18 min ago</p></div></li>
                          <li class="lw-activity__item"><div><p class="lw-activity__title"><strong>Ada</strong> approved East wing / tender.</p><p class="lw-activity__meta">1 hr ago</p></div></li>
                          <li class="lw-activity__item"><div><p class="lw-activity__title"><strong>Mara</strong> created Roof study / draft.</p><p class="lw-activity__meta">3 hrs ago</p></div></li>
                          <li class="lw-activity__item"><div><p class="lw-activity__title">Version 04 archived.</p><p class="lw-activity__meta">Yesterday</p></div></li>
                        </ul>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'auth',
      num: '08',
      name: 'Sign in',
      title: 'Sign in',
      category: 'application',
      desc: 'A split sign-in sheet: real fields, real states, and a review-room vignette on the right.',
      html: dedent(`
        <section class="blk blk-auth" aria-labelledby="fold-auth-title">
          <div class="blk-auth__grid">
            <div class="blk-auth__form">
              <div class="blk-auth__panel">
                <a class="blk-logo" href="#" aria-label="Fold home">fold</a>
                <h2 class="blk-auth__title" id="fold-auth-title">Welcome back.</h2>
                <p class="blk-auth__lede">Sign in to pick up the review where you left it.</p>
                <form>
                  <div class="lw-field">
                    <label class="lw-field__label" for="fold-email">Work email</label>
                    <input class="lw-input" id="fold-email" type="email" placeholder="you@studio.com" autocomplete="email">
                  </div>
                  <div class="lw-field">
                    <div class="blk-auth__row">
                      <label class="lw-field__label" for="fold-password">Password</label>
                      <a href="#">Forgot?</a>
                    </div>
                    <input class="lw-input" id="fold-password" type="password" placeholder="At least 8 characters" autocomplete="current-password">
                  </div>
                  <label class="lw-check"><input class="lw-check__input" type="checkbox" checked><span class="lw-check__box"></span><span>Keep me signed in</span></label>
                  <button type="submit" class="lw-btn lw-btn--primary lw-btn--block">Sign in</button>
                </form>
                <div class="blk-auth__divider">or</div>
                <button type="button" class="lw-btn lw-btn--block"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-keyboard"></use></svg>Continue with SSO</button>
                <p class="blk-auth__foot">New to Fold? <a href="#">Start a sheet</a></p>
              </div>
            </div>
            <div class="blk-auth__side">
              <div>
                <p class="blk-kicker">Fig. 08 / The review room</p>
                <p class="blk-auth__side-quote">“A good drawing gives everyone <em>the same thing to point at.</em>”</p>
              </div>
              <div class="blk-auth__card">
                <div class="blk-auth__card-head"><span>Today / 14:20</span><span>Review 04</span></div>
                <div class="blk-auth__card-body">
                  <div class="blk-approval__row"><span>Sheet</span><span>North facade / Rev 04</span></div>
                  <div class="blk-approval__row"><span>Reviewers</span><span>Mara, Jonas, Ada</span></div>
                  <div class="blk-approval__row"><span>Status</span><span class="lw-stamp lw-stamp--red">In review</span></div>
                  <p class="blk-approval__note" style="margin-bottom:0"><strong>Jonas:</strong> the handrail junction wants another look before we sign.</p>
                </div>
              </div>
              <div class="blk-auth__side-foot"><span>Atelier North</span><span>Est. 2019</span></div>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'settings',
      num: '09',
      name: 'Settings',
      title: 'Settings',
      category: 'application',
      desc: 'A settings sheet with a side index, field groups, toggles and a proper save bar.',
      html: dedent(`
        <section class="blk blk-settings" aria-labelledby="fold-settings-title">
          <div class="blk-wrap">
            <div class="blk-settings__app">
              <aside class="blk-settings__side">
                <div class="blk-settings__side-brand"><a class="blk-logo" href="#" aria-label="Fold home">fold</a></div>
                <nav class="lw-sidenav" aria-label="Settings sections">
                  <p class="lw-sidenav__label">Workspace</p>
                  <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-grid"></use></svg>Overview</a>
                  <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-menu"></use></svg>Members</a>
                  <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-sheet"></use></svg>Projects</a>
                  <a class="lw-sidenav__item" href="#" aria-current="page"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-volume"></use></svg>Notifications</a>
                  <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-file"></use></svg>Billing</a>
                  <a class="lw-sidenav__item" href="#"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-settings"></use></svg>Security</a>
                </nav>
              </aside>
              <div class="blk-settings__main">
                <div class="blk-settings__head">
                  <nav class="lw-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="#">Settings</a></li><li aria-current="page">Notifications</li></ol></nav>
                  <h2 class="blk-settings__title" id="fold-settings-title" style="margin-top:10px">Notifications</h2>
                  <p class="blk-settings__sub">Choose what reaches you, and when it is allowed to.</p>
                </div>
                <div class="blk-settings__body">
                  <fieldset class="lw-fieldset">
                    <legend class="lw-fieldset__legend">In the review room</legend>
                    <p class="lw-fieldset__note">Everything here happens while you are already looking at the sheet.</p>
                    <div class="lw-setting-row">
                      <div class="lw-setting-row__text"><p class="lw-setting-row__title">New comments</p><p class="lw-setting-row__note">A quiet ping when someone marks up a sheet you own.</p></div>
                      <div class="lw-setting-row__control"><label class="lw-led lw-led--redline"><input class="lw-led__input" type="checkbox" checked aria-label="New comments"><span class="lw-led__box"><span class="lw-led__fill"></span></span><span class="lw-led__state">On</span></label></div>
                    </div>
                    <div class="lw-setting-row">
                      <div class="lw-setting-row__text"><p class="lw-setting-row__title">Approval requests</p><p class="lw-setting-row__note">When a review lands on your desk, send it to email as well.</p></div>
                      <div class="lw-setting-row__control"><label class="lw-led"><input class="lw-led__input" type="checkbox" checked aria-label="Approval requests"><span class="lw-led__box"><span class="lw-led__fill"></span></span><span class="lw-led__state">On</span></label></div>
                    </div>
                    <div class="lw-setting-row">
                      <div class="lw-setting-row__text"><p class="lw-setting-row__title">Version updates</p><p class="lw-setting-row__note">Every new revision, or only the ones that changed the geometry.</p></div>
                      <div class="lw-setting-row__control">
                        <div class="lw-select-wrap" style="min-width:170px"><select class="lw-select" aria-label="Version updates"><option>Only geometry changes</option><option>Every revision</option><option>Nothing</option></select></div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset class="lw-fieldset">
                    <legend class="lw-fieldset__legend">Digest</legend>
                    <p class="lw-fieldset__note">One short sheet on Monday morning, if there is anything to report.</p>
                    <div class="lw-setting-row">
                      <div class="lw-setting-row__text"><p class="lw-setting-row__title">Weekly digest</p><p class="lw-setting-row__note">Sent at 08:00 in your workspace timezone.</p></div>
                      <div class="lw-setting-row__control"><label class="lw-led"><input class="lw-led__input" type="checkbox" aria-label="Weekly digest"><span class="lw-led__box"><span class="lw-led__fill"></span></span><span class="lw-led__state">Off</span></label></div>
                    </div>
                    <div class="lw-setting-row">
                      <div class="lw-setting-row__text"><p class="lw-setting-row__title">Workspace timezone</p><p class="lw-setting-row__note">Used for digests and deadline reminders.</p></div>
                      <div class="lw-setting-row__control">
                        <div class="lw-select-wrap" style="min-width:170px"><select class="lw-select" aria-label="Workspace timezone"><option>Europe / Berlin</option><option>Europe / London</option><option>America / New York</option></select></div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset class="lw-fieldset">
                    <legend class="lw-fieldset__legend">Leave quietly</legend>
                    <p class="lw-fieldset__note">You will lose access to all 284 sheets in this workspace. This cannot be undone.</p>
                    <div class="lw-setting-row">
                      <div class="lw-setting-row__text"><p class="lw-setting-row__title">Leave Atelier North</p><p class="lw-setting-row__note">An owner will need to invite you back.</p></div>
                      <div class="lw-setting-row__control"><button type="button" class="lw-btn lw-btn--danger-quiet lw-btn--sm">Leave workspace</button></div>
                    </div>
                  </fieldset>
                </div>
                <div class="blk-settings__foot">
                  <span class="blk-settings__foot-note">Last saved 2 minutes ago</span>
                  <div class="lw-cluster">
                    <button type="button" class="lw-btn lw-btn--sm">Cancel</button>
                    <button type="button" class="lw-btn lw-btn--primary lw-btn--sm">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'footer',
      num: '10',
      name: 'Footer',
      title: 'Footer',
      category: 'marketing',
      desc: 'A footer with a closing ask, a newsletter, four link columns and a calm bottom rule.',
      html: dedent(`
        <footer class="blk blk-footer" aria-labelledby="fold-footer-cta">
          <div class="blk-wrap">
            <div class="blk-footer__cta">
              <h2 class="blk-footer__cta-title" id="fold-footer-cta">Have a drawing <em>in mind?</em></h2>
              <a class="lw-btn lw-btn--primary lw-btn--lg" href="#">Start a sheet<svg class="lw-icon" aria-hidden="true"><use href="#lw-i-arrow-right"></use></svg></a>
            </div>
            <div class="blk-footer__main">
              <div class="blk-footer__brand">
                <a class="blk-logo" href="#" aria-label="Fold home">fold</a>
                <p>A shared sheet for teams who think with their hands. Made quietly, kept plainly.</p>
                <form class="blk-footer__news">
                  <label class="lw-vh" for="fold-news-email">Email for the monthly sheet</label>
                  <input class="lw-input" id="fold-news-email" type="email" placeholder="Email for the monthly sheet" autocomplete="email">
                  <button type="submit" class="lw-btn lw-btn--primary">Join</button>
                </form>
                <p class="lw-smallprint" style="margin-top:8px">One letter a month. No tracking pixels.</p>
              </div>
              <div class="blk-footer__cols">
                <div class="blk-footer__col"><h3>Product</h3><a href="#">Canvas</a><a href="#">Reviews</a><a href="#">Revisions</a><a href="#">Export</a></div>
                <div class="blk-footer__col"><h3>Company</h3><a href="#">About</a><a href="#">Journal</a><a href="#">Careers</a><a href="#">Contact</a></div>
                <div class="blk-footer__col"><h3>Resources</h3><a href="#">Docs</a><a href="#">Templates</a><a href="#">Status</a><a href="#">Support</a></div>
                <div class="blk-footer__col"><h3>Legal</h3><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">DPA</a></div>
              </div>
            </div>
            <div class="blk-footer__bottom">
              <span>© 2026 Fold Studio</span>
              <span><a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Cookies</a></span>
              <span class="blk-footer__status">All systems drawn</span>
            </div>
          </div>
        </footer>
      `),
    },
  ];

  window.LINEWORK_BLOCKS = blocks;
})();
