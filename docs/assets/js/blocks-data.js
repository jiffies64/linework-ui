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
    {
      id: 'header',
      num: '11',
      name: 'Site header',
      title: 'Header',
      category: 'marketing',
      desc: 'A product header with primary links, a sign-in key and a menu that folds into a details panel on phones.',
      html: dedent(`
        <header class="blk blk--flush blk-header">
          <div class="blk-wrap blk-header__bar">
            <a class="blk-logo" href="#" aria-label="Fold home">fold</a>
            <nav class="blk-header__nav" aria-label="Fold">
              <a href="#" aria-current="page">Product</a>
              <a href="#">Templates</a>
              <a href="#">Pricing</a>
              <a href="#">Journal</a>
            </nav>
            <div class="blk-header__actions">
              <a class="lw-btn lw-btn--quiet" href="#">Sign in</a>
              <a class="lw-btn lw-btn--primary" href="#">Start a sheet</a>
            </div>
            <details class="blk-header__menu">
              <summary class="lw-btn lw-btn--icon" aria-label="Open menu"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-menu"></use></svg></summary>
              <nav class="blk-header__panel" aria-label="Fold, mobile">
                <a href="#" aria-current="page">Product</a>
                <a href="#">Templates</a>
                <a href="#">Pricing</a>
                <a href="#">Journal</a>
                <a href="#">Sign in</a>
              </nav>
            </details>
          </div>
        </header>
      `),
    },
    {
      id: 'logos',
      num: '12',
      name: 'Logo strip',
      title: 'Logos',
      category: 'marketing',
      desc: 'A row of client wordmarks set in a title-block grid, with one line of proof above it.',
      html: dedent(`
        <section class="blk blk-logos" aria-labelledby="fold-logos-title">
          <div class="blk-wrap">
            <p class="blk-kicker blk-kicker--center" id="fold-logos-title">Drawn on by 12,400 studios</p>
            <ul class="blk-logos__grid">
              <li><span class="blk-logos__mark">Atelier North</span></li>
              <li><span class="blk-logos__mark blk-logos__mark--caps">Kessel</span></li>
              <li><span class="blk-logos__mark">Haddad &amp; Ross</span></li>
              <li><span class="blk-logos__mark blk-logos__mark--caps">Plan Nine</span></li>
              <li><span class="blk-logos__mark">Studio Mira</span></li>
              <li><span class="blk-logos__mark blk-logos__mark--caps">Okto</span></li>
            </ul>
          </div>
        </section>
      `),
    },
    {
      id: 'stats',
      num: '13',
      name: 'Measured band',
      title: 'Stats',
      category: 'marketing',
      desc: 'Four figures, each with a label and the rule it was measured against.',
      html: dedent(`
        <section class="blk blk-stats" aria-labelledby="fold-stats-title">
          <div class="blk-wrap">
            <div class="blk-head">
              <div>
                <p class="blk-kicker">Measured / 2026</p>
                <h2 class="blk-title" id="fold-stats-title">Less time in review.</h2>
              </div>
              <p class="blk-head__aside">Median figures across 2,100 teams that moved their reviews to Fold this year.</p>
            </div>
            <dl class="blk-stats__grid">
              <div class="blk-stats__item"><dt>Review time</dt><dd><span class="blk-stats__value">2.4</span> days</dd><p class="blk-stats__note">down from 6.1</p></div>
              <div class="blk-stats__item"><dt>Sheets per week</dt><dd><span class="blk-stats__value">38</span></dd><p class="blk-stats__note">per team of ten</p></div>
              <div class="blk-stats__item"><dt>Meetings dropped</dt><dd><span class="blk-stats__value">1</span> / week</dd><p class="blk-stats__note">the Monday walkthrough</p></div>
              <div class="blk-stats__item"><dt>Uptime</dt><dd><span class="blk-stats__value">99.98</span> %</dd><p class="blk-stats__note">trailing twelve months</p></div>
            </dl>
          </div>
        </section>
      `),
    },
    {
      id: 'process',
      num: '14',
      name: 'Three steps',
      title: 'Process',
      category: 'marketing',
      desc: 'How it works in three numbered steps joined by a dimension rule.',
      html: dedent(`
        <section class="blk blk-process" aria-labelledby="fold-process-title">
          <div class="blk-wrap">
            <p class="blk-kicker">How it works</p>
            <h2 class="blk-title" id="fold-process-title">From sketch to sign-off.</h2>
            <ol class="blk-process__steps">
              <li class="blk-process__step">
                <span class="blk-process__num">01</span>
                <h3>Pin the drawing</h3>
                <p>Drop a PDF, an image or a model export onto a sheet. Fold keeps every revision.</p>
              </li>
              <li class="blk-process__step">
                <span class="blk-process__num">02</span>
                <h3>Mark it up</h3>
                <p>Reviewers leave redlines where the problem is, not in a thread three tabs away.</p>
              </li>
              <li class="blk-process__step">
                <span class="blk-process__num">03</span>
                <h3>Sign it off</h3>
                <p>Approvals carry a name, a time and the revision they cover. Export the record in one key.</p>
              </li>
            </ol>
          </div>
        </section>
      `),
    },
    {
      id: 'comparison',
      num: '15',
      name: 'Plan comparison',
      title: 'Comparison',
      category: 'marketing',
      desc: 'A feature table across three plans, with the recommended column marked in redline.',
      html: dedent(`
        <section class="blk blk-compare" aria-labelledby="fold-compare-title">
          <div class="blk-wrap">
            <p class="blk-kicker">Compare plans</p>
            <h2 class="blk-title" id="fold-compare-title">Every line, side by side.</h2>
            <div class="lw-table-wrap blk-compare__wrap">
              <table class="lw-table blk-compare__table" aria-labelledby="fold-compare-title">
                <thead>
                  <tr><th scope="col"><span class="lw-vh">Feature</span></th><th scope="col">Draft</th><th scope="col" class="is-picked"><span class="blk-compare__plan">Studio <span class="lw-stamp lw-stamp--red">Most picked</span></span></th><th scope="col">Atelier</th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Active sheets</th><td>1</td><td class="is-picked">Unlimited</td><td>Unlimited</td></tr>
                  <tr><th scope="row">Guests</th><td>3</td><td class="is-picked">Unlimited</td><td>Unlimited</td></tr>
                  <tr><th scope="row">Revision history</th><td>30 days</td><td class="is-picked">Full</td><td>Full</td></tr>
                  <tr><th scope="row">Approval records</th><td><span class="lw-vh">Not included</span><span aria-hidden="true">—</span></td><td class="is-picked"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg><span class="lw-vh">Included</span></td><td><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg><span class="lw-vh">Included</span></td></tr>
                  <tr><th scope="row">SSO and audit log</th><td><span class="lw-vh">Not included</span><span aria-hidden="true">—</span></td><td class="is-picked"><span class="lw-vh">Not included</span><span aria-hidden="true">—</span></td><td><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg><span class="lw-vh">Included</span></td></tr>
                  <tr><th scope="row">Support</th><td>Community</td><td class="is-picked">Email, 1 day</td><td>Named contact</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'team',
      num: '16',
      name: 'Studio team',
      title: 'Team',
      category: 'marketing',
      desc: 'People as title blocks: initials, name, role and where they work from.',
      html: dedent(`
        <section class="blk blk-team" aria-labelledby="fold-team-title">
          <div class="blk-wrap">
            <div class="blk-head">
              <div>
                <p class="blk-kicker">The studio</p>
                <h2 class="blk-title" id="fold-team-title">Six people, one sheet.</h2>
              </div>
              <p class="blk-head__aside">Fold is made by a small studio split between Vienna and Lisbon. We answer support ourselves.</p>
            </div>
            <ul class="blk-team__grid">
              <li class="blk-team__card"><span class="lw-avatar lw-avatar--lg">MW</span><div><p class="blk-team__name">Mara Weiss</p><p class="blk-team__role">Product, Vienna</p></div></li>
              <li class="blk-team__card"><span class="lw-avatar lw-avatar--lg">JK</span><div><p class="blk-team__name">Jonas Keller</p><p class="blk-team__role">Engineering, Vienna</p></div></li>
              <li class="blk-team__card"><span class="lw-avatar lw-avatar--lg">AS</span><div><p class="blk-team__name">Ada Sorensen</p><p class="blk-team__role">Design, Lisbon</p></div></li>
              <li class="blk-team__card"><span class="lw-avatar lw-avatar--lg">OH</span><div><p class="blk-team__name">Omar Haddad</p><p class="blk-team__role">Engineering, Lisbon</p></div></li>
              <li class="blk-team__card"><span class="lw-avatar lw-avatar--lg">LP</span><div><p class="blk-team__name">Lea Petrov</p><p class="blk-team__role">Support, Vienna</p></div></li>
              <li class="blk-team__card"><span class="lw-avatar lw-avatar--lg">TR</span><div><p class="blk-team__name">Tomas Rey</p><p class="blk-team__role">Operations, Lisbon</p></div></li>
            </ul>
          </div>
        </section>
      `),
    },
    {
      id: 'blog',
      num: '17',
      name: 'Journal',
      title: 'Blog',
      category: 'marketing',
      desc: 'Three articles as sheets in a set: number, title, a short abstract and the date drawn.',
      html: dedent(`
        <section class="blk blk-blog" aria-labelledby="fold-blog-title">
          <div class="blk-wrap">
            <div class="blk-blog__head">
              <div>
                <p class="blk-kicker">Journal</p>
                <h2 class="blk-title" id="fold-blog-title">Notes from the drawing table.</h2>
              </div>
              <a class="lw-btn" href="#">All articles<svg class="lw-icon" aria-hidden="true"><use href="#lw-i-arrow-right"></use></svg></a>
            </div>
            <div class="blk-blog__grid">
              <article class="blk-blog__post">
                <p class="blk-meta"><span>J-31</span><span>Process</span></p>
                <h3><a href="#">Why we stopped using comment threads</a></h3>
                <p>Feedback that lives next to the line it is about gets fixed twice as fast. Here is what we measured.</p>
                <p class="blk-blog__date"><time datetime="2026-10-14">14 October 2026</time> · 6 min</p>
              </article>
              <article class="blk-blog__post">
                <p class="blk-meta"><span>J-30</span><span>Studios</span></p>
                <h3><a href="#">Atelier North and the one-sheet review</a></h3>
                <p>A facade team of nine replaced their Monday walkthrough with a single shared sheet.</p>
                <p class="blk-blog__date"><time datetime="2026-09-29">29 September 2026</time> · 8 min</p>
              </article>
              <article class="blk-blog__post">
                <p class="blk-meta"><span>J-29</span><span>Product</span></p>
                <h3><a href="#">Approvals that carry their revision</a></h3>
                <p>An approval now records exactly which revision it covers, so nobody signs a drawing that has moved.</p>
                <p class="blk-blog__date"><time datetime="2026-09-08">8 September 2026</time> · 4 min</p>
              </article>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'changelog',
      num: '18',
      name: 'Revision log',
      title: 'Changelog',
      category: 'marketing',
      desc: 'Releases as dated revisions, each tagged with what kind of change it carries.',
      html: dedent(`
        <section class="blk blk-changelog" aria-labelledby="fold-changelog-title">
          <div class="blk-wrap blk-changelog__wrap">
            <div>
              <p class="blk-kicker">Changelog</p>
              <h2 class="blk-title" id="fold-changelog-title">Revision log.</h2>
              <p class="blk-lede blk-lede--sm">Every release Fold ships, newest first.</p>
            </div>
            <ol class="blk-changelog__list">
              <li class="blk-changelog__entry">
                <p class="blk-changelog__date"><time datetime="2026-10-20">20 Oct 2026</time><span>Rev 4.2</span></p>
                <div><h3>Revision-bound approvals</h3><p>Approvals record the revision they cover and turn stale when the drawing moves.</p><span class="lw-stamp lw-stamp--red">New</span></div>
              </li>
              <li class="blk-changelog__entry">
                <p class="blk-changelog__date"><time datetime="2026-10-02">2 Oct 2026</time><span>Rev 4.1</span></p>
                <div><h3>Faster sheet loading</h3><p>Large PDFs open in under a second on a typical studio connection.</p><span class="lw-stamp">Improved</span></div>
              </li>
              <li class="blk-changelog__entry">
                <p class="blk-changelog__date"><time datetime="2026-09-15">15 Sep 2026</time><span>Rev 4.0</span></p>
                <div><h3>Guest reviewers</h3><p>Invite a client to one sheet without giving them the whole workspace.</p><span class="lw-stamp lw-stamp--red">New</span></div>
              </li>
              <li class="blk-changelog__entry">
                <p class="blk-changelog__date"><time datetime="2026-08-28">28 Aug 2026</time><span>Rev 3.9</span></p>
                <div><h3>Export fix for A0 sheets</h3><p>Exports at A0 keep their scale bar and title block.</p><span class="lw-stamp lw-stamp--quiet">Fixed</span></div>
              </li>
            </ol>
          </div>
        </section>
      `),
    },
    {
      id: 'contact',
      num: '19',
      name: 'Contact sheet',
      title: 'Contact',
      category: 'marketing',
      desc: 'A contact form with real field states next to office details in a specification list.',
      html: dedent(`
        <section class="blk blk-contact" aria-labelledby="fold-contact-title">
          <div class="blk-wrap blk-contact__grid">
            <div>
              <p class="blk-kicker">Contact</p>
              <h2 class="blk-title" id="fold-contact-title">Ask a person.</h2>
              <p class="blk-lede blk-lede--sm">Questions about a plan, a migration or a security review. A member of the studio answers within one working day.</p>
              <dl class="lw-spec blk-contact__spec">
                <dt>Email</dt><dd>studio@fold.example</dd>
                <dt>Vienna</dt><dd>Mon to Fri, 9:00 to 17:00 CET</dd>
                <dt>Lisbon</dt><dd>Mon to Fri, 9:00 to 17:00 WET</dd>
              </dl>
            </div>
            <form class="blk-contact__form">
              <div class="lw-field-grid">
                <div class="lw-field"><label class="lw-field__label" for="fold-contact-name">Name</label><input class="lw-input" id="fold-contact-name" autocomplete="name" required></div>
                <div class="lw-field"><label class="lw-field__label" for="fold-contact-email">Work email</label><input class="lw-input" id="fold-contact-email" type="email" autocomplete="email" required></div>
              </div>
              <div class="lw-field">
                <label class="lw-field__label" for="fold-contact-topic">Topic</label>
                <div class="lw-select-wrap"><select class="lw-select" id="fold-contact-topic"><option>Plans and billing</option><option>Migration</option><option>Security review</option><option>Something else</option></select></div>
              </div>
              <div class="lw-field"><label class="lw-field__label" for="fold-contact-message">Message</label><textarea class="lw-textarea" id="fold-contact-message" rows="4" required></textarea></div>
              <div class="blk-actions"><button type="submit" class="lw-btn lw-btn--primary">Send message</button><span class="lw-smallprint">We reply from a real inbox.</span></div>
            </form>
          </div>
        </section>
      `),
    },
    {
      id: 'newsletter',
      num: '20',
      name: 'Monthly sheet',
      title: 'Newsletter',
      category: 'marketing',
      desc: 'A newsletter band with one field, one key and a plain promise about frequency.',
      html: dedent(`
        <section class="blk blk-newsletter" aria-labelledby="fold-newsletter-title">
          <div class="blk-wrap blk-newsletter__grid">
            <div>
              <h2 class="blk-newsletter__title" id="fold-newsletter-title">The monthly sheet.</h2>
              <p>One letter a month: what we shipped, one studio story and a drawing worth stealing.</p>
            </div>
            <form class="blk-newsletter__form">
              <label class="lw-vh" for="fold-newsletter-email">Email address</label>
              <input class="lw-input" id="fold-newsletter-email" type="email" placeholder="you@studio.com" autocomplete="email" required>
              <button type="submit" class="lw-btn lw-btn--primary lw-btn--lg">Subscribe</button>
            </form>
          </div>
        </section>
      `),
    },
    {
      id: 'onboarding',
      num: '21',
      name: 'First sheet setup',
      title: 'Onboarding',
      category: 'application',
      desc: 'A setup checklist with progress, the current step open and the rest waiting their turn.',
      html: dedent(`
        <section class="blk blk-onboard" aria-labelledby="fold-onboard-title">
          <div class="blk-wrap blk-onboard__sheet">
            <div class="blk-onboard__head">
              <div>
                <p class="blk-kicker">Setup / Atelier North</p>
                <h2 class="blk-onboard__title" id="fold-onboard-title">Set up your first sheet.</h2>
              </div>
              <div class="blk-onboard__progress">
                <span class="lw-label">2 of 4 done</span>
                <div class="lw-progress" role="progressbar" aria-label="Setup progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"><div class="lw-progress__bar" style="width:50%"></div></div>
              </div>
            </div>
            <ol class="blk-onboard__list">
              <li class="blk-onboard__item is-done"><span class="blk-onboard__mark"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg></span><div><h3>Name the workspace <span class="lw-vh">(done)</span></h3><p>Atelier North</p></div></li>
              <li class="blk-onboard__item is-done"><span class="blk-onboard__mark"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-check"></use></svg></span><div><h3>Invite the team <span class="lw-vh">(done)</span></h3><p>6 people joined</p></div></li>
              <li class="blk-onboard__item is-current" aria-current="step"><span class="blk-onboard__mark">03</span><div><h3>Pin a drawing</h3><p>Drop a PDF or an image onto the sheet. You can replace it with a new revision later.</p><div class="blk-actions"><button type="button" class="lw-btn lw-btn--primary">Choose a file</button><button type="button" class="lw-btn lw-btn--quiet">Use a sample</button></div></div></li>
              <li class="blk-onboard__item"><span class="blk-onboard__mark">04</span><div><h3>Ask for a review</h3><p>Pick reviewers and a due date.</p></div></li>
            </ol>
          </div>
        </section>
      `),
    },
    {
      id: 'billing',
      num: '22',
      name: 'Billing',
      title: 'Billing',
      category: 'application',
      desc: 'Plan summary, seat usage, payment method and an invoice schedule on one sheet.',
      html: dedent(`
        <section class="blk blk-billing" aria-labelledby="fold-billing-title">
          <div class="blk-wrap">
            <div class="lw-page-head blk-billing__head">
              <div>
                <p class="blk-kicker">Workspace / Billing</p>
                <h2 class="blk-billing__title" id="fold-billing-title">Billing.</h2>
              </div>
              <button type="button" class="lw-btn">Download all invoices</button>
            </div>
            <div class="blk-billing__grid">
              <div class="blk-billing__panel">
                <p class="lw-label">Plan</p>
                <p class="blk-billing__plan">Studio <span class="lw-stamp lw-stamp--ink">Yearly</span></p>
                <p class="lw-smallprint">€19 per seat per month, billed on 1 January.</p>
                <p class="lw-label blk-billing__gap">Seats</p>
                <p><strong>18</strong> of 25 in use</p>
                <div class="lw-progress" role="progressbar" aria-label="Seats in use" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"><div class="lw-progress__bar" style="width:72%"></div></div>
                <div class="blk-actions"><button type="button" class="lw-btn lw-btn--primary">Change plan</button><button type="button" class="lw-btn lw-btn--quiet">Add seats</button></div>
              </div>
              <div class="blk-billing__panel">
                <p class="lw-label">Payment method</p>
                <p class="blk-billing__card">Card ending 4242</p>
                <p class="lw-smallprint">Expires 08 / 2028 · billing@ateliernorth.example</p>
                <div class="blk-actions"><button type="button" class="lw-btn">Update card</button></div>
              </div>
            </div>
            <div class="lw-table-wrap blk-billing__table">
              <table class="lw-table" data-lw-sort>
                <caption>Invoices</caption>
                <thead><tr><th scope="col">Invoice</th><th scope="col">Date</th><th scope="col">Amount</th><th scope="col" data-sort="none">Status</th><th scope="col" data-sort="none"><span class="lw-vh">Download</span></th></tr></thead>
                <tbody>
                  <tr><td class="lw-table__strong">F-2026-011</td><td data-sort-value="2026-10-01">1 Oct 2026</td><td data-sort-value="342">€342.00</td><td><span class="lw-stamp lw-stamp--quiet">Paid</span></td><td class="lw-table__actions"><a class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" href="#" aria-label="Download F-2026-011"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-download"></use></svg></a></td></tr>
                  <tr><td class="lw-table__strong">F-2026-010</td><td data-sort-value="2026-09-01">1 Sep 2026</td><td data-sort-value="304">€304.00</td><td><span class="lw-stamp lw-stamp--quiet">Paid</span></td><td class="lw-table__actions"><a class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" href="#" aria-label="Download F-2026-010"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-download"></use></svg></a></td></tr>
                  <tr><td class="lw-table__strong">F-2026-009</td><td data-sort-value="2026-08-01">1 Aug 2026</td><td data-sort-value="304">€304.00</td><td><span class="lw-stamp lw-stamp--red">Retrying</span></td><td class="lw-table__actions"><a class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" href="#" aria-label="Download F-2026-009"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-download"></use></svg></a></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'members',
      num: '23',
      name: 'Members',
      title: 'Members',
      category: 'application',
      desc: 'A members list with search, role filter, a sortable table and pagination.',
      html: dedent(`
        <section class="blk blk-members" aria-labelledby="fold-members-title">
          <div class="blk-wrap">
            <div class="lw-page-head blk-members__head">
              <div>
                <p class="blk-kicker">Workspace / Members</p>
                <h2 class="blk-members__title" id="fold-members-title">Members.</h2>
              </div>
              <button type="button" class="lw-btn lw-btn--primary"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-plus"></use></svg>Invite</button>
            </div>
            <div class="blk-members__tools">
              <label class="lw-search"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-search"></use></svg><span class="lw-vh">Search members</span><input class="lw-input" type="search" placeholder="Search members"></label>
              <div class="lw-segments" role="group" aria-label="Role">
                <button type="button" class="lw-segments__item" aria-pressed="true">All</button>
                <button type="button" class="lw-segments__item" aria-pressed="false">Admins</button>
                <button type="button" class="lw-segments__item" aria-pressed="false">Guests</button>
              </div>
            </div>
            <div class="lw-table-wrap">
              <table class="lw-table" data-lw-sort aria-labelledby="fold-members-title">
                <thead><tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Last active</th><th scope="col" data-sort="none"><span class="lw-vh">Actions</span></th></tr></thead>
                <tbody>
                  <tr><td data-sort-value="Mara Weiss"><span class="blk-members__person"><span class="lw-avatar lw-avatar--sm">MW</span><span><strong>Mara Weiss</strong><span class="blk-members__email">mara@ateliernorth.example</span></span></span></td><td>Admin</td><td data-sort-value="1">Today</td><td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options for Mara Weiss"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td></tr>
                  <tr><td data-sort-value="Jonas Keller"><span class="blk-members__person"><span class="lw-avatar lw-avatar--sm">JK</span><span><strong>Jonas Keller</strong><span class="blk-members__email">jonas@ateliernorth.example</span></span></span></td><td>Member</td><td data-sort-value="2">Yesterday</td><td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options for Jonas Keller"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td></tr>
                  <tr><td data-sort-value="Ada Sorensen"><span class="blk-members__person"><span class="lw-avatar lw-avatar--sm">AS</span><span><strong>Ada Sorensen</strong><span class="blk-members__email">ada@ateliernorth.example</span></span></span></td><td>Member</td><td data-sort-value="5">5 days ago</td><td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options for Ada Sorensen"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td></tr>
                  <tr><td data-sort-value="Clara Lind"><span class="blk-members__person"><span class="lw-avatar lw-avatar--sm">CL</span><span><strong>Clara Lind</strong><span class="blk-members__email">clara@client.example</span></span></span></td><td>Guest</td><td data-sort-value="12">12 days ago</td><td class="lw-table__actions"><button type="button" class="lw-btn lw-btn--quiet lw-btn--icon lw-btn--sm" aria-label="More options for Clara Lind"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-more"></use></svg></button></td></tr>
                </tbody>
              </table>
            </div>
            <div class="blk-members__foot">
              <span class="lw-smallprint">4 of 18 members</span>
              <nav class="lw-pagination" aria-label="Members pages">
                <button type="button" aria-label="Previous page" disabled><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-chevron-left"></use></svg></button>
                <button type="button" aria-current="page">1</button>
                <button type="button">2</button>
                <button type="button">3</button>
                <button type="button" aria-label="Next page"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-chevron-right"></use></svg></button>
              </nav>
            </div>
          </div>
        </section>
      `),
    },
    {
      id: 'inbox',
      num: '24',
      name: 'Review inbox',
      title: 'Inbox',
      category: 'application',
      desc: 'A list of review requests beside the open request, with approve and redline actions.',
      html: dedent(`
        <section class="blk blk--flush blk-inbox" aria-labelledby="fold-inbox-title">
          <div class="blk-inbox__frame">
            <div class="blk-inbox__list">
              <div class="blk-inbox__list-head"><h2 id="fold-inbox-title">Reviews</h2><span class="lw-stamp lw-stamp--red">3 open</span></div>
              <ul>
                <li><a class="blk-inbox__item" href="#" aria-current="true"><span class="blk-inbox__from">Jonas Keller</span><span class="blk-inbox__subject">North facade / Rev 04</span><span class="blk-inbox__time">18 min</span></a></li>
                <li><a class="blk-inbox__item" href="#"><span class="blk-inbox__from">Mara Weiss</span><span class="blk-inbox__subject">Terrace / lighting</span><span class="blk-inbox__time">2 h</span></a></li>
                <li><a class="blk-inbox__item" href="#"><span class="blk-inbox__from">Ada Sorensen</span><span class="blk-inbox__subject">Atrium / concept 2</span><span class="blk-inbox__time">Yesterday</span></a></li>
                <li><a class="blk-inbox__item is-read" href="#"><span class="blk-inbox__from">Omar Haddad</span><span class="blk-inbox__subject">East wing / tender</span><span class="blk-inbox__time">12 Oct</span></a></li>
              </ul>
            </div>
            <article class="blk-inbox__detail" aria-labelledby="fold-inbox-subject">
              <p class="blk-meta"><span>A-104</span><span>Rev 04</span><span>Due today</span></p>
              <h3 class="blk-inbox__detail-title" id="fold-inbox-subject">North facade, revision 04</h3>
              <p class="blk-inbox__note"><strong>Jonas Keller:</strong> Handrail junction moved 40 mm east to clear the downpipe. Everything else matches revision 03.</p>
              <dl class="lw-spec">
                <dt>Changed</dt><dd>Handrail junction, level 3</dd>
                <dt>Reviewers</dt><dd>Mara Weiss, you</dd>
                <dt>Signatures</dt><dd>1 of 2</dd>
              </dl>
              <div class="blk-actions"><button type="button" class="lw-btn lw-btn--primary">Approve revision 04</button><button type="button" class="lw-btn">Leave a redline</button></div>
            </article>
          </div>
        </section>
      `),
    },
    {
      id: 'error',
      num: '25',
      name: 'Not found',
      title: '404',
      category: 'application',
      desc: 'A not-found page drawn as a missing sheet, with a search and two ways back.',
      html: dedent(`
        <section class="blk blk-error" aria-labelledby="fold-error-title">
          <div class="blk-wrap blk-error__grid">
            <div class="blk-error__figure" aria-hidden="true">
              <span class="blk-error__code">404</span>
              <span class="lw-dimension"><span class="lw-dimension__cap"></span><span class="lw-dimension__rule"></span><span class="lw-dimension__label">sheet missing</span><span class="lw-dimension__rule"></span><span class="lw-dimension__cap lw-dimension__cap--end"></span></span>
            </div>
            <div>
              <p class="blk-kicker">Error 404</p>
              <h1 class="blk-title" id="fold-error-title">This sheet is not in the set.</h1>
              <p class="blk-lede blk-lede--sm">It may have been archived, renamed or never drawn. Search the workspace or go back to where you were.</p>
              <form class="blk-error__search" role="search">
                <label class="lw-search"><svg class="lw-icon" aria-hidden="true"><use href="#lw-i-search"></use></svg><span class="lw-vh">Search sheets</span><input class="lw-input" type="search" placeholder="Search sheets"></label>
              </form>
              <div class="blk-actions"><a class="lw-btn lw-btn--primary" href="#">Go to the overview</a><a class="lw-btn lw-btn--quiet" href="#">Report a broken link</a></div>
            </div>
          </div>
        </section>
      `),
    },
  ];

  window.LINEWORK_BLOCKS = blocks;
})();
