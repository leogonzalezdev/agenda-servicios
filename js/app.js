/**
 * Agenda de Servicios — Motor Interactivo Multitenant (App Cliente + Panel Emprendimiento)
 * - Iconografía 100% SVG (sin emojis)
 * - Panel Emprendimiento neutral SaaS de alta claridad operativa
 * - Link del Cliente personalizable mediante Plantillas de Estilo
 */

(function () {
  const STORAGE_KEY = 'agenda_servicios_mockup_v3';
  const ic = (name, size = 16, cls = '') => window.icon(name, size, cls);

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function formatARS(num) {
    const n = Number(num) || 0;
    return '$' + n.toLocaleString('es-AR');
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function hexToRgb(hex) {
    const clean = (hex || '#E91E8C').replace('#', '');
    const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
    const num = parseInt(full, 16);
    if (isNaN(num)) return { r: 233, g: 30, b: 140 };
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function darkenHex(hex, factor = 0.82) {
    const { r, g, b } = hexToRgb(hex);
    const toHex = v => Math.max(0, Math.min(255, Math.round(v * factor))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function mixWithWhite(hex, ratio = 0.88) {
    const { r, g, b } = hexToRgb(hex);
    const mix = v => Math.round(v + (255 - v) * ratio).toString(16).padStart(2, '0');
    return `#${mix(r)}${mix(g)}${mix(b)}`;
  }

  function isLightColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.62;
  }

  function getClientThemeVars(tenant) {
    const t = tenant.theme;
    const font = window.FONT_PRESETS[t.fontId] || window.FONT_PRESETS.glam;
    const rad = window.RADIUS_PRESETS[t.radiusId] || window.RADIUS_PRESETS.cute;
    const rgb = hexToRgb(t.primary);
    const onPrimary = isLightColor(t.primary) ? '#1B1410' : '#FFFFFF';
    const primaryDark = darkenHex(t.primary, 0.8);
    const primarySoft = t.isDark
      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`
      : mixWithWhite(t.primary, 0.88);
    const selectedBg = t.isDark
      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.14)`
      : mixWithWhite(t.primary, 0.94);
    const border = t.isDark
      ? 'rgba(255, 255, 255, 0.11)'
      : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.16)`;
    const shadow = t.isDark
      ? '0 4px 16px rgba(0, 0, 0, 0.35)'
      : `0 4px 14px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`;
    const heroBg = t.isDark
      ? `linear-gradient(160deg, ${t.surface} 0%, rgba(${rgb.r},${rgb.g},${rgb.b},0.16) 100%)`
      : `linear-gradient(165deg, #FFFFFF 0%, ${mixWithWhite(t.primary, 0.91)} 100%)`;

    return [
      `--brand-primary:${t.primary}`,
      `--brand-primary-dark:${primaryDark}`,
      `--brand-primary-soft:${primarySoft}`,
      `--brand-primary-glow:rgba(${rgb.r},${rgb.g},${rgb.b},0.28)`,
      `--brand-on-primary:${onPrimary}`,
      `--brand-bg:${t.bg}`,
      `--brand-surface:${t.surface}`,
      `--brand-accent:${t.accent}`,
      `--brand-text:${t.text}`,
      `--brand-muted:${t.muted}`,
      `--brand-border:${border}`,
      `--brand-shadow:${shadow}`,
      `--brand-selected-bg:${selectedBg}`,
      `--hero-bg:${heroBg}`,
      `--radius-card:${rad.card}`,
      `--radius-btn:${rad.btn}`,
      `--radius-chip:${rad.chip}`,
      `--radius-input:${rad.input}`,
      `--font-display:${font.display}`,
      `--font-body:${font.body}`
    ].join(';');
  }

  function loadTenants() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return deepClone(window.INITIAL_TENANTS);
  }

  function saveTenants() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tenants));
    } catch (_) {}
  }

  const todayISO = window.getRelativeDateISO(0);

  const state = {
    viewMode: window.innerWidth >= 920 ? 'split' : 'client',
    activeTenantId: 'brillo-de-luna',
    tenants: loadTenants(),
    client: {
      tab: 'home',
      activeCategory: 'servicios',
      portfolioFilter: 'all',
      cart: {
        mainServiceId: null,
        retiroId: null,
        extras: {},
        selectedWork: null
      },
      lightboxWorkId: null,
      wizard: {
        open: false,
        step: 1,
        date: todayISO,
        time: '',
        name: 'Camila Fernández',
        phone: '11 4589-2210',
        ig: '@cami.fer',
        notes: '',
        designRef: '',
        customDesignImg: '',
        acceptedPolicy: false,
        paymentMethod: 'transfer',
        receiptUploaded: false,
        createdBooking: null
      }
    },
    admin: {
      tab: 'agenda',
      selectedDate: todayISO,
      serviceCatFilter: 'all',
      modal: null
    }
  };

  function getTenant() {
    return state.tenants[state.activeTenantId];
  }

  function showToast(msg) {
    let el = document.getElementById('app-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'app-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('show'), 2500);
  }

  function formatDuration(mins) {
    if (!mins) return '0 min';
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }

  function formatDateLabel(iso) {
    const parts = iso.split('-').map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return {
      dayShort: days[d.getDay()],
      dayNum: d.getDate(),
      monthShort: months[d.getMonth()],
      dow: d.getDay(),
      full: `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
    };
  }

  function getNextDays(count = 10) {
    const out = [];
    for (let i = 0; i < count; i++) {
      const iso = window.getRelativeDateISO(i);
      out.push({ iso, ...formatDateLabel(iso), isToday: i === 0 });
    }
    return out;
  }

  function getCartSummary(tenant) {
    const items = [];
    let total = 0;
    let duration = 0;
    let hasDesde = false;

    const addSvc = (svc, qty = 1) => {
      if (!svc || qty <= 0) return;
      items.push({ id: svc.id, name: svc.name, price: svc.price, qty, categoryId: svc.categoryId });
      total += svc.price * qty;
      duration += (svc.duration || 0) * qty;
      if (svc.desde) hasDesde = true;
    };

    if (state.client.cart.mainServiceId) {
      addSvc(tenant.services.find(s => s.id === state.client.cart.mainServiceId), 1);
    }
    if (state.client.cart.retiroId) {
      addSvc(tenant.services.find(s => s.id === state.client.cart.retiroId), 1);
    }
    Object.entries(state.client.cart.extras).forEach(([id, qty]) => {
      if (qty > 0) addSvc(tenant.services.find(s => s.id === id), qty);
    });

    let deposit = 0;
    if (tenant.bookingRules.depositRequired && total > 0) {
      if (tenant.bookingRules.depositType === 'percent') {
        deposit = Math.round((total * tenant.bookingRules.depositValue) / 100 / 100) * 100;
      } else {
        deposit = Math.min(total, Number(tenant.bookingRules.depositValue) || 0);
      }
    }

    return { items, total, duration, deposit, balance: Math.max(0, total - deposit), hasDesde };
  }

  function generateSlotsForDate(tenant, iso) {
    const info = formatDateLabel(iso);
    const dayCfg = tenant.schedule.days.find(d => d.key === info.dow);
    if (!dayCfg || !dayCfg.enabled) return [];

    const toMin = str => {
      const [h, m] = str.split(':').map(Number);
      return h * 60 + m;
    };
    const toStr = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

    const startMin = toMin(dayCfg.start);
    const endMin = toMin(dayCfg.end);
    const step = tenant.schedule.slotInterval || 30;
    const appts = tenant.appointments.filter(a => a.date === iso && a.status !== 'cancelled');

    const slots = [];
    for (let t = startMin; t <= endMin - 60; t += step) {
      const timeStr = toStr(t);
      const conflict = appts.some(a => {
        const aStart = toMin(a.time);
        const aEnd = aStart + (a.duration || 60);
        return t >= aStart && t < aEnd;
      });
      slots.push({ time: timeStr, taken: conflict });
    }
    return slots;
  }

  function getFirstOpenDate(tenant) {
    const days = getNextDays(14);
    for (const d of days) {
      const cfg = tenant.schedule.days.find(x => x.key === d.dow);
      if (cfg && cfg.enabled) return d.iso;
    }
    return todayISO;
  }

  /* =========================================================================
     RENDER: STUDIO SHELL
     ========================================================================= */
  function render() {
    const scrollPositions = {};
    document.querySelectorAll('[data-scroll-id]').forEach(el => {
      scrollPositions[el.dataset.scrollId] = el.scrollTop;
    });

    const tenant = getTenant();
    const root = document.getElementById('app-root');

    const tenantOptions = Object.values(state.tenants)
      .map(t => `<option value="${t.id}" ${t.id === state.activeTenantId ? 'selected' : ''}>${escapeHtml(t.name)} (${escapeHtml(t.rubro.split('·')[0].trim())})</option>`)
      .join('');

    const showClient = state.viewMode === 'client' || state.viewMode === 'split';
    const showAdmin = state.viewMode === 'admin' || state.viewMode === 'split';

    root.innerHTML = `
      <header class="studio-bar">
        <div class="studio-brand">
          <span class="studio-badge">Multitenant SaaS</span>
          <span class="studio-title">Agenda de Servicios · Prototipo</span>
        </div>

        <div class="studio-controls">
          <div class="studio-select-wrap" title="Cambiar de emprendimiento para probar el modo multitenant">
            ${ic('store', 14)}
            <span>Marca:</span>
            <select id="tenant-switcher">${tenantOptions}</select>
          </div>

          <div class="segmented" role="tablist">
            <button data-action="set-view" data-view="client" class="${state.viewMode === 'client' ? 'active' : ''}">
              ${ic('smartphone', 14)}<span>Cliente</span>
            </button>
            <button data-action="set-view" data-view="admin" class="${state.viewMode === 'admin' ? 'active' : ''}">
              ${ic('store', 14)}<span>Panel Admin</span>
            </button>
            <button data-action="set-view" data-view="split" class="hide-on-mobile hide-split-narrow ${state.viewMode === 'split' ? 'active' : ''}">
              ${ic('columns', 14)}<span>Lado a Lado</span>
            </button>
          </div>

          <button class="studio-reset-btn ic-row" data-action="reset-demo" title="Restaurar datos originales">
            ${ic('rotateCcw', 13)}<span>Reset</span>
          </button>
        </div>
      </header>

      <main class="stage">
        ${showClient ? `
          <section class="phone-column">
            <div class="phone-column-label">
              <span class="live-dot"></span>
              <span>Link del Cliente · <strong>${escapeHtml(tenant.slug)}.turnos.app</strong></span>
            </div>
            ${renderClientPhone(tenant)}
          </section>
        ` : ''}

        ${showAdmin ? `
          <section class="phone-column">
            <div class="phone-column-label">
              <span class="live-dot" style="background:#6366f1;box-shadow:0 0 8px #6366f1;"></span>
              <span>Panel del Emprendimiento · <strong>${escapeHtml(tenant.ownerName)} (Admin)</strong></span>
            </div>
            ${renderAdminPhone(tenant)}
          </section>
        ` : ''}
      </main>
    `;

    document.querySelectorAll('[data-scroll-id]').forEach(el => {
      if (scrollPositions[el.dataset.scrollId] !== undefined) {
        el.scrollTop = scrollPositions[el.dataset.scrollId];
      }
    });
  }

  /* =========================================================================
     RENDER: CLIENT PHONE (Customizable per Tenant Template)
     ========================================================================= */
  function renderClientPhone(tenant) {
    const themeVars = getClientThemeVars(tenant);
    const darkClass = tenant.theme.isDark ? 'is-dark' : '';
    const cart = getCartSummary(tenant);
    const myBookingsCount = tenant.appointments.filter(a => a.isMine && a.status !== 'cancelled').length;

    let bodyHtml = '';
    if (state.client.tab === 'home') bodyHtml = renderClientHome(tenant, cart);
    else if (state.client.tab === 'portfolio') bodyHtml = renderClientPortfolio(tenant);
    else if (state.client.tab === 'bookings') bodyHtml = renderClientBookings(tenant);
    else if (state.client.tab === 'info') bodyHtml = renderClientInfo(tenant);

    const showFloatingCart = (state.client.tab === 'home' || state.client.tab === 'portfolio') && cart.items.length > 0 && !state.client.wizard.open;

    return `
      <div class="phone-frame">
        <div class="phone-screen ${darkClass}" style="${themeVars}">
          <div class="phone-statusbar">
            <span>14:56</span>
            <div class="phone-notch"></div>
            <span>5G · 91%</span>
          </div>

          <div class="phone-url-pill">
            <span class="ic-row">${ic('lock', 11)}<strong>${escapeHtml(tenant.slug)}.turnos.app</strong></span>
            <span>${escapeHtml(tenant.instagram)}</span>
          </div>

          <div class="phone-scroll" data-scroll-id="client-scroll">
            ${bodyHtml}
          </div>

          ${showFloatingCart ? `
            <div class="floating-cart">
              <div class="cart-summary">
                <span class="cart-top ic-row">${cart.items.length} ${cart.items.length === 1 ? 'ítem' : 'ítems'} · ${ic('clock', 11)} ${formatDuration(cart.duration)}${cart.deposit ? ` · Seña ${formatARS(cart.deposit)}` : ''}</span>
                <span class="cart-total">${cart.hasDesde ? 'Desde ' : ''}${formatARS(cart.total)}</span>
              </div>
              <button class="cart-cta ic-row" data-action="open-wizard"><span>Elegir turno</span>${ic('chevronRight', 14)}</button>
            </div>
          ` : ''}

          <nav class="bottom-nav">
            <button class="nav-item ${state.client.tab === 'home' ? 'active' : ''}" data-action="client-tab" data-tab="home">
              <span class="nav-icon">${ic('sparkles', 20)}</span>
              <span>Servicios</span>
            </button>
            <button class="nav-item ${state.client.tab === 'portfolio' ? 'active' : ''}" data-action="client-tab" data-tab="portfolio">
              <span class="nav-icon">${ic('camera', 20)}</span>
              <span>Trabajos</span>
            </button>
            <button class="nav-item ${state.client.tab === 'bookings' ? 'active' : ''}" data-action="client-tab" data-tab="bookings">
              <span class="nav-icon">${ic('calendar', 20)}</span>
              <span>Mis Turnos</span>
              ${myBookingsCount > 0 ? `<span class="nav-badge">${myBookingsCount}</span>` : ''}
            </button>
            <button class="nav-item ${state.client.tab === 'info' ? 'active' : ''}" data-action="client-tab" data-tab="info">
              <span class="nav-icon">${ic('fileText', 20)}</span>
              <span>Políticas</span>
            </button>
          </nav>

          ${state.client.lightboxWorkId ? renderWorkLightbox(tenant) : ''}
          ${state.client.wizard.open ? renderBookingWizard(tenant, cart) : ''}
        </div>
      </div>
    `;
  }

  function renderClientHome(tenant, cart) {
    const t = tenant.theme;
    const portfolio = (tenant.portfolio || []).filter(w => w.featured !== false);

    const activeCat = tenant.categories.find(c => c.id === state.client.activeCategory) || tenant.categories[0];
    const catServices = tenant.services.filter(s => s.categoryId === activeCat.id && s.active);

    let logoHtml = '';
    if (t.headerStyle === 'banner' && tenant.assets.logoBanner) {
      logoHtml = `<img class="hero-banner-logo" src="${tenant.assets.logoBanner}" alt="${escapeHtml(tenant.name)}">`;
    } else if (tenant.assets.logoCircular) {
      logoHtml = `<img class="hero-circular-logo" src="${tenant.assets.logoCircular}" alt="${escapeHtml(tenant.name)}">`;
    } else {
      logoHtml = `<div class="hero-monogram">${escapeHtml(tenant.assets.monogram || tenant.name.slice(0, 2).toUpperCase())}</div>`;
    }

    const showTitleText = !(t.headerStyle === 'banner' && tenant.assets.logoBanner);

    return `
      <div class="client-hero">
        ${logoHtml}
        ${showTitleText ? `
          <h1 class="hero-name">${escapeHtml(tenant.name)}</h1>
          <p class="hero-subtitle">${escapeHtml(tenant.subtitle)} · ${escapeHtml(tenant.rubro)}</p>
        ` : `<p class="hero-subtitle" style="margin-top:2px;">${escapeHtml(tenant.rubro)}</p>`}

        <div class="hero-meta-row">
          <span class="pill pill-gold">${ic('star', 12)} ${tenant.rating} (${tenant.reviewsCount})</span>
          <span class="pill pill-primary">${ic('mapPin', 12)} ${escapeHtml(tenant.address.split('(')[0].trim())}</span>
        </div>

        ${tenant.announcement ? `
          <div class="announcement-strip">${ic('bell', 13)}<span>${escapeHtml(tenant.announcement)}</span></div>
        ` : ''}
      </div>

      ${t.showMascot && tenant.assets.mascot ? `
        <div class="mascot-banner">
          <img src="${tenant.assets.mascot}" alt="${escapeHtml(tenant.ownerName)}">
          <div class="mascot-banner-text">
            <h4>Hola, soy ${escapeHtml(tenant.ownerName)}</h4>
            <p>Elegí tu servicio, sumá extras o retiro si necesitás, y reservá tu turno online en menos de un minuto.</p>
          </div>
        </div>
      ` : ''}

      ${portfolio.length > 0 ? `
        <div class="section-title">
          <span class="ic-row">${ic('camera', 16)}<span>Trabajos de referencia</span></span>
          <button class="btn btn-soft btn-sm" style="padding:4px 10px;font-size:11px;" data-action="client-tab" data-tab="portfolio">Ver todos (${portfolio.length})</button>
        </div>
        <div class="portfolio-strip">
          ${portfolio.map(w => `
            <button class="portfolio-card ${state.client.cart.selectedWork?.id === w.id ? 'selected-ref' : ''}" data-action="open-work" data-id="${w.id}">
              <div class="portfolio-thumb-wrap">
                ${w.src
                  ? `<img class="portfolio-thumb" src="${w.src}" alt="${escapeHtml(w.title)}">`
                  : `<div class="portfolio-placeholder" style="background:${w.gradient};color:#fff;">${ic('image', 28)}</div>`}
                <span class="portfolio-tag">${escapeHtml(w.serviceName)}</span>
              </div>
              <div class="portfolio-meta">
                <div class="portfolio-title">${escapeHtml(w.title)}</div>
                <div class="portfolio-sub">${escapeHtml(w.priceHint || 'Ver estilo')}</div>
              </div>
            </button>
          `).join('')}
        </div>
      ` : ''}

      ${state.client.cart.selectedWork ? `
        <div class="card" style="padding:9px 11px;display:flex;align-items:center;justify-content:space-between;gap:8px;border-color:var(--brand-primary);background:var(--brand-selected-bg);">
          <div style="display:flex;align-items:center;gap:8px;min-width:0;">
            ${state.client.cart.selectedWork.src
              ? `<img src="${state.client.cart.selectedWork.src}" style="width:36px;height:36px;border-radius:10px;object-fit:cover;">`
              : ic('image', 20)}
            <div style="min-width:0;">
              <div style="font-size:10px;color:var(--brand-primary);font-weight:800;letter-spacing:0.03em;">REFERENCIA SELECCIONADA</div>
              <div style="font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(state.client.cart.selectedWork.title)}</div>
            </div>
          </div>
          <button class="icon-close-btn" style="width:24px;height:24px;" data-action="clear-work-ref">${ic('x', 13)}</button>
        </div>
      ` : ''}

      <div class="section-title">
        <span class="ic-row">${ic('layers', 16)}<span>Lista de Precios</span></span>
        <span style="font-size:11px;font-weight:600;color:var(--brand-muted);">${escapeHtml(activeCat.hint)}</span>
      </div>

      <div class="cat-tabs">
        ${tenant.categories.map(cat => {
          let count = 0;
          if (cat.mode === 'single' && state.client.cart.mainServiceId) {
            const s = tenant.services.find(x => x.id === state.client.cart.mainServiceId);
            if (s && s.categoryId === cat.id) count = 1;
          } else if (cat.mode === 'single-optional' && state.client.cart.retiroId) {
            const s = tenant.services.find(x => x.id === state.client.cart.retiroId);
            if (s && s.categoryId === cat.id) count = 1;
          } else {
            Object.entries(state.client.cart.extras).forEach(([id, q]) => {
              const s = tenant.services.find(x => x.id === id);
              if (s && s.categoryId === cat.id && q > 0) count += q;
            });
          }
          return `
            <button class="cat-tab ${cat.id === activeCat.id ? 'active' : ''}" data-action="select-cat" data-cat="${cat.id}">
              ${ic(cat.icon, 14)}
              <span>${escapeHtml(cat.name)}</span>
              ${count > 0 ? `<span class="tab-count">${count}</span>` : ''}
            </button>
          `;
        }).join('')}
      </div>

      ${catServices.map(svc => {
        const isMain = state.client.cart.mainServiceId === svc.id;
        const isRetiro = state.client.cart.retiroId === svc.id;
        const extraQty = state.client.cart.extras[svc.id] || 0;
        const isSelected = isMain || isRetiro || extraQty > 0;

        let controlHtml = '';
        if (svc.countable && activeCat.mode === 'multi') {
          controlHtml = extraQty > 0
            ? `<div class="qty-control">
                 <button class="qty-btn" data-action="qty-extra" data-id="${svc.id}" data-delta="-1">${ic('minus', 13)}</button>
                 <span class="qty-val">${extraQty}</span>
                 <button class="qty-btn" data-action="qty-extra" data-id="${svc.id}" data-delta="1">${ic('plus', 13)}</button>
               </div>`
            : `<button class="select-toggle ic-row" data-action="qty-extra" data-id="${svc.id}" data-delta="1">${ic('plus', 13)}<span>Sumar</span></button>`;
        } else {
          controlHtml = `
            <button class="select-toggle ic-row ${isSelected ? 'selected' : ''}" data-action="toggle-service" data-id="${svc.id}" data-mode="${activeCat.mode}">
              ${isSelected ? ic('check', 13) : ic('plus', 13)}<span>${isSelected ? 'Elegido' : 'Elegir'}</span>
            </button>
          `;
        }

        return `
          <div class="service-card ${isSelected ? 'selected' : ''}">
            <div class="service-info">
              <div class="service-name-row">
                <span class="service-name">${escapeHtml(svc.name)}</span>
                ${svc.countable && svc.unit ? `<span class="pill pill-primary" style="font-size:10px;padding:2px 6px;">por ${escapeHtml(svc.unit)}</span>` : ''}
              </div>
              <p class="service-desc">${escapeHtml(svc.desc)}</p>
              <div class="service-meta">
                <span class="service-price">${svc.desde ? '<span class="service-desde">desde </span>' : ''}${formatARS(svc.price)}</span>
                <span class="service-dur ic-row">${ic('clock', 12)} ${formatDuration(svc.duration)}</span>
              </div>
            </div>
            ${controlHtml}
          </div>
        `;
      }).join('')}

      ${cart.items.length === 0 ? `
        <div class="card" style="text-align:center;padding:12px;margin-top:8px;">
          <span style="font-size:12px;color:var(--brand-muted);">Seleccioná un servicio para calcular el total, la duración y elegir tu horario.</span>
        </div>
      ` : ''}
    `;
  }

  function renderClientPortfolio(tenant) {
    const works = tenant.portfolio || [];
    const serviceNames = [...new Set(works.map(w => w.serviceName))];
    const filtered = state.client.portfolioFilter === 'all'
      ? works
      : works.filter(w => w.serviceName === state.client.portfolioFilter);

    return `
      <div class="section-title" style="margin-top:4px;">
        <span class="ic-row">${ic('camera', 17)}<span>Galería de Trabajos</span></span>
        <span class="pill pill-primary">${works.length} fotos</span>
      </div>
      <p class="section-sub">Inspirate en trabajos realizados por ${escapeHtml(tenant.name)}. Tocá uno para reservar ese estilo.</p>

      ${serviceNames.length > 1 ? `
        <div class="cat-tabs">
          <button class="cat-tab ${state.client.portfolioFilter === 'all' ? 'active' : ''}" data-action="portfolio-filter" data-val="all">Todos</button>
          ${serviceNames.map(sn => `
            <button class="cat-tab ${state.client.portfolioFilter === sn ? 'active' : ''}" data-action="portfolio-filter" data-val="${escapeHtml(sn)}">${escapeHtml(sn)}</button>
          `).join('')}
        </div>
      ` : ''}

      <div class="portfolio-grid-admin">
        ${filtered.map(w => `
          <button class="portfolio-card ${state.client.cart.selectedWork?.id === w.id ? 'selected-ref' : ''}" style="width:100%;" data-action="open-work" data-id="${w.id}">
            <div class="portfolio-thumb-wrap" style="height:152px;">
              ${w.src
                ? `<img class="portfolio-thumb" src="${w.src}" alt="${escapeHtml(w.title)}">`
                : `<div class="portfolio-placeholder" style="background:${w.gradient};color:#fff;">${ic('image', 28)}</div>`}
              <span class="portfolio-tag">${escapeHtml(w.serviceName)}</span>
            </div>
            <div class="portfolio-meta">
              <div class="portfolio-title">${escapeHtml(w.title)}</div>
              <div class="portfolio-sub">${escapeHtml(w.extraSummary || w.priceHint)}</div>
            </div>
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderWorkLightbox(tenant) {
    const work = (tenant.portfolio || []).find(w => w.id === state.client.lightboxWorkId);
    if (!work) return '';
    const svc = tenant.services.find(s => s.id === work.serviceId);

    return `
      <div class="sheet-backdrop" data-action="close-work">
        <div class="sheet-panel" onclick="event.stopPropagation()">
          <div class="sheet-header">
            <h3 class="ic-row">${ic('camera', 16)}<span>Referencia de trabajo</span></h3>
            <button class="icon-close-btn" data-action="close-work">${ic('x', 15)}</button>
          </div>
          <div class="sheet-body">
            ${work.src
              ? `<img class="portfolio-lightbox-img" src="${work.src}" alt="${escapeHtml(work.title)}">`
              : `<div class="portfolio-lightbox-img" style="background:${work.gradient};display:flex;align-items:center;justify-content:center;color:#fff;">${ic('image', 48)}</div>`}
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
              <h4 style="margin:0;font-size:16px;font-weight:800;">${escapeHtml(work.title)}</h4>
              <span class="pill pill-primary">${escapeHtml(work.serviceName)}</span>
            </div>
            <p style="margin:0 0 10px;font-size:12.5px;color:var(--brand-muted);">
              ${escapeHtml(work.extraSummary || '')} · <strong>${escapeHtml(work.priceHint || (svc ? formatARS(svc.price) : ''))}</strong>
            </p>
            <div class="card" style="padding:10px 12px;margin-bottom:0;">
              <div style="font-size:11.5px;color:var(--brand-muted);">
                Al seleccionar <strong>"Quiero este estilo"</strong>, preseleccionamos <strong>${escapeHtml(svc ? svc.name : work.serviceName)}</strong> y adjuntamos esta imagen como referencia para ${escapeHtml(tenant.ownerName)}.
              </div>
            </div>
          </div>
          <div class="sheet-footer">
            <button class="btn btn-outline" data-action="close-work">Cerrar</button>
            <button class="btn btn-primary" style="flex:1;" data-action="apply-work-style" data-id="${work.id}">${ic('sparkles', 15)}<span>Quiero este estilo</span></button>
          </div>
        </div>
      </div>
    `;
  }

  function renderClientBookings(tenant) {
    const mine = tenant.appointments.filter(a => a.isMine);

    const statusBadge = st => {
      if (st === 'pending_deposit') return `<span class="pill pill-warning">${ic('clock', 11)} Validando seña</span>`;
      if (st === 'confirmed') return `<span class="pill pill-success">${ic('checkCircle', 11)} Confirmado</span>`;
      if (st === 'completed') return `<span class="pill pill-primary">${ic('check', 11)} Realizado</span>`;
      return `<span class="pill pill-danger">${ic('xCircle', 11)} Cancelado</span>`;
    };

    return `
      <div class="section-title" style="margin-top:4px;">
        <span class="ic-row">${ic('calendar', 17)}<span>Mis Turnos</span></span>
        <span class="pill pill-primary">${mine.length}</span>
      </div>
      <p class="section-sub">Seguí el estado de tus reservas y la validación de tu seña.</p>

      ${mine.length === 0 ? `
        <div class="card" style="text-align:center;padding:24px 16px;">
          <div style="color:var(--brand-primary);margin-bottom:8px;">${ic('calendar', 34)}</div>
          <div style="font-weight:800;margin-bottom:4px;">Todavía no tenés turnos</div>
          <p style="font-size:12px;color:var(--brand-muted);margin:0 0 12px;">Elegí tus servicios y reservá tu horario disponible.</p>
          <button class="btn btn-primary btn-sm" data-action="client-tab" data-tab="home">Ver servicios</button>
        </div>
      ` : mine.map(a => {
        const dInfo = formatDateLabel(a.date);
        const balance = Math.max(0, a.total - a.depositAmount);
        return `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <strong style="font-size:12px;color:var(--brand-muted);">#${a.id}</strong>
              ${statusBadge(a.status)}
            </div>
            <div style="font-size:15px;font-weight:800;margin-bottom:3px;">${dInfo.full} · ${a.time} hs</div>
            <div style="font-size:12px;color:var(--brand-muted);margin-bottom:8px;">
              ${a.items.map(i => `${i.qty > 1 ? i.qty + 'x ' : ''}${escapeHtml(i.name)}`).join(' + ')}
            </div>
            ${a.designRef ? `<div class="ic-row" style="font-size:11.5px;margin-bottom:8px;color:var(--brand-muted);">${ic('image', 13)}<span>Referencia: <strong style="color:var(--brand-text);">${escapeHtml(a.designRef)}</strong></span></div>` : ''}
            <div style="background:var(--brand-bg);border-radius:12px;padding:9px 11px;font-size:12px;margin-bottom:10px;">
              <div class="summary-row"><span>Total estimado</span><strong>${formatARS(a.total)}</strong></div>
              <div class="summary-row"><span>Seña (${escapeHtml(a.paymentMethod)})</span><strong style="color:#16a34a;">− ${formatARS(a.depositAmount)}</strong></div>
              <div class="summary-row" style="font-weight:800;"><span>Resta abonar en el turno</span><span>${formatARS(balance)}</span></div>
            </div>
            ${a.status === 'pending_deposit' ? `
              <div style="font-size:11.5px;color:#b45309;margin-bottom:8px;">
                ${escapeHtml(tenant.ownerName)} está revisando tu comprobante. Aprobalo desde el Panel Admin para ver el cambio en vivo.
              </div>
            ` : ''}
            <div style="display:flex;gap:8px;">
              <button class="btn btn-soft btn-sm" style="flex:1;" data-action="toast" data-msg="Abriendo WhatsApp de ${escapeHtml(tenant.name)}...">${ic('messageCircle', 14)}<span>WhatsApp</span></button>
              ${tenant.bookingRules.allowReschedule
                ? `<button class="btn btn-outline btn-sm" data-action="toast" data-msg="Podés reprogramar hasta 24 hs antes.">Reprogramar</button>`
                : `<button class="btn btn-outline btn-sm" style="opacity:0.6;" data-action="toast" data-msg="Según la política vigente, los turnos no pueden ser movidos.">${ic('lock', 12)}<span>Sin cambios</span></button>`}
            </div>
          </div>
        `;
      }).join('')}
    `;
  }

  function renderClientInfo(tenant) {
    const r = tenant.bookingRules;

    return `
      <div class="section-title" style="margin-top:4px;">
        <span class="ic-row">${ic('shieldCheck', 17)}<span>Política de Turnos</span></span>
        <span class="pill pill-primary">Obligatoria</span>
      </div>

      ${r.importantNotice ? `<div class="important-box ic-row" style="justify-content:center;">${ic('alertTriangle', 15)}<span>${escapeHtml(r.importantNotice)}</span></div>` : ''}

      <div class="policy-card">
        ${r.policySections.map(sec => `
          <div class="policy-block">
            <h5>${escapeHtml(sec.title)}</h5>
            <ul>
              ${sec.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div class="section-title"><span class="ic-row">${ic('mapPin', 16)}<span>Estudio y Horarios</span></span></div>
      <div class="card">
        <div style="font-weight:800;font-size:14px;margin-bottom:4px;">${escapeHtml(tenant.name)} ${escapeHtml(tenant.subtitle)}</div>
        <div class="ic-row" style="font-size:12px;color:var(--brand-muted);margin-bottom:10px;">${ic('mapPin', 13)}<span>${escapeHtml(tenant.address)}</span></div>
        <div style="font-size:12px;margin-bottom:12px;">
          ${tenant.schedule.days.map(d => `
            <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dashed var(--brand-border);">
              <span style="font-weight:700;">${d.label}</span>
              <span style="color:${d.enabled ? 'var(--brand-text)' : 'var(--brand-muted)'};">${d.enabled ? `${d.start} a ${d.end} hs` : 'Cerrado'}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-primary btn-sm" style="flex:1;" data-action="toast" data-msg="WhatsApp: ${escapeHtml(tenant.whatsappDisplay)}">${ic('messageCircle', 14)}<span>WhatsApp</span></button>
          <button class="btn btn-soft btn-sm" style="flex:1;" data-action="toast" data-msg="Instagram: ${escapeHtml(tenant.instagram)}">${ic('instagram', 14)}<span>Instagram</span></button>
        </div>
      </div>
    `;
  }

  /* =========================================================================
     RENDER: CLIENT 5-STEP BOOKING WIZARD
     ========================================================================= */
  function renderBookingWizard(tenant, cart) {
    const w = state.client.wizard;
    const days = getNextDays(10);
    const slots = generateSlotsForDate(tenant, w.date);
    const r = tenant.bookingRules;

    let stepTitle = '';
    let stepBody = '';
    let footerHtml = '';

    if (w.step === 1) {
      stepTitle = '1. Elegí día y horario';
      stepBody = `
        <div class="ic-row" style="font-size:12px;color:var(--brand-muted);margin-bottom:10px;">
          ${ic('clock', 13)}<span>Duración estimada: <strong style="color:var(--brand-text);">${formatDuration(cart.duration)}</strong></span>
        </div>
        <div class="date-strip">
          ${days.map(d => {
            const cfg = tenant.schedule.days.find(x => x.key === d.dow);
            const open = cfg && cfg.enabled;
            return `
              <button class="date-chip ${w.date === d.iso ? 'active' : ''} ${!open ? 'closed' : ''}"
                ${open ? `data-action="wiz-date" data-date="${d.iso}"` : 'disabled'}>
                <span class="d-day">${d.dayShort}</span>
                <span class="d-num">${d.dayNum}</span>
                <span style="font-size:9.5px;opacity:0.8;">${open ? d.monthShort : 'Cerr.'}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div style="font-size:12px;font-weight:700;margin-bottom:8px;">Horarios disponibles</div>
        ${slots.length === 0
          ? `<div class="card" style="text-align:center;color:var(--brand-muted);font-size:12.5px;">Este día el estudio permanece cerrado. Elegí otra fecha arriba.</div>`
          : `<div class="slots-grid">
              ${slots.map(s => `
                <button class="slot-btn ${w.time === s.time ? 'active' : ''} ${s.taken ? 'taken' : ''}"
                  ${s.taken ? 'disabled' : `data-action="wiz-time" data-time="${s.time}"`}>
                  ${s.time}
                </button>
              `).join('')}
            </div>`}
      `;
      footerHtml = `
        <button class="btn btn-outline" data-action="close-wizard">Volver</button>
        <button class="btn btn-primary" style="flex:1;${!w.time ? 'opacity:0.5;' : ''}" ${!w.time ? 'disabled' : ''} data-action="wiz-next"><span>Continuar</span>${ic('chevronRight', 15)}</button>
      `;
    } else if (w.step === 2) {
      stepTitle = '2. Tus datos y diseño';
      const portfolioRefOptions = (tenant.portfolio || []).slice(0, 4);
      stepBody = `
        <div class="field">
          <label>Tu nombre y apellido *</label>
          <input type="text" data-bind="wiz-name" value="${escapeHtml(w.name)}" placeholder="Ej: Camila Fernández">
        </div>
        <div class="field">
          <label>WhatsApp (para recordatorios) *</label>
          <input type="tel" data-bind="wiz-phone" value="${escapeHtml(w.phone)}" placeholder="11 5555-1234">
        </div>
        <div class="field">
          <label>Instagram (opcional)</label>
          <input type="text" data-bind="wiz-ig" value="${escapeHtml(w.ig)}" placeholder="@tuusuario">
        </div>
        ${r.askReferencePhoto ? `
          <div class="field">
            <label>Diseño de referencia (opcional)</label>
            <div class="design-grid">
              ${portfolioRefOptions.map(p => `
                <button type="button" class="design-card ${w.designRef === p.title ? 'active' : ''}" style="background:var(--brand-surface);color:var(--brand-text);border:1.5px solid ${w.designRef === p.title ? 'var(--brand-primary)' : 'var(--brand-border)'};" data-action="wiz-design" data-val="${escapeHtml(p.title)}">
                  ${p.src ? `<img class="design-card-img" src="${p.src}" alt="">` : `<div class="design-card-img" style="background:${p.gradient};display:flex;align-items:center;justify-content:center;color:#fff;">${ic('image', 16)}</div>`}
                  <span style="line-height:1.25;">${escapeHtml(p.title)}</span>
                </button>
              `).join('')}
            </div>
            <div style="margin-top:8px;">
              <label class="btn btn-soft btn-sm btn-block" style="margin:0;cursor:pointer;">
                ${ic('upload', 14)}<span>${w.customDesignImg ? 'Cambiar foto de referencia' : 'Subir mi propia foto de referencia'}</span>
                <input type="file" accept="image/*" style="display:none;" data-action-change="upload-ref-photo">
              </label>
              ${w.customDesignImg ? `<img src="${w.customDesignImg}" style="width:100%;max-height:120px;object-fit:cover;border-radius:12px;margin-top:6px;">` : ''}
            </div>
          </div>
        ` : ''}
        <div class="field">
          <label>Notas adicionales (retiro o preferencias)</label>
          <textarea rows="2" data-bind="wiz-notes" placeholder="Ej: Quiero forma almendra corta...">${escapeHtml(w.notes)}</textarea>
        </div>
      `;
      footerHtml = `
        <button class="btn btn-outline" data-action="wiz-prev">${ic('chevronLeft', 15)}<span>Atrás</span></button>
        <button class="btn btn-primary" style="flex:1;" data-action="wiz-next"><span>Ver políticas</span>${ic('chevronRight', 15)}</button>
      `;
    } else if (w.step === 3) {
      stepTitle = '3. Política de Turnos';
      stepBody = `
        ${r.importantNotice ? `<div class="important-box ic-row" style="justify-content:center;">${ic('alertTriangle', 15)}<span>${escapeHtml(r.importantNotice)}</span></div>` : ''}
        <div class="policy-card">
          ${r.policySections.map(sec => `
            <div class="policy-block">
              <h5>${escapeHtml(sec.title)}</h5>
              <ul>${sec.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
            </div>
          `).join('')}
        </div>
        <label class="check-row">
          <input type="checkbox" ${w.acceptedPolicy ? 'checked' : ''} data-action-change="wiz-policy">
          <span>Leí y acepto la Política de Turnos de ${escapeHtml(tenant.name)} (seña no reembolsable y tolerancia de ${r.toleranceMinutes} min).</span>
        </label>
      `;
      footerHtml = `
        <button class="btn btn-outline" data-action="wiz-prev">${ic('chevronLeft', 15)}<span>Atrás</span></button>
        <button class="btn btn-primary" style="flex:1;${!w.acceptedPolicy ? 'opacity:0.45;' : ''}" ${!w.acceptedPolicy ? 'disabled' : ''} data-action="wiz-next"><span>Ir a la seña</span>${ic('chevronRight', 15)}</button>
      `;
    } else if (w.step === 4) {
      stepTitle = r.depositRequired ? '4. Abonar Seña' : '4. Confirmar Turno';
      const dInfo = formatDateLabel(w.date);
      stepBody = `
        <div class="card">
          <div class="ic-row" style="font-size:12px;font-weight:800;color:var(--brand-primary);margin-bottom:8px;">${ic('calendar', 14)}<span>${dInfo.full} · ${w.time} hs (${formatDuration(cart.duration)})</span></div>
          ${cart.items.map(i => `
            <div class="summary-row">
              <span>${i.qty > 1 ? i.qty + 'x ' : ''}${escapeHtml(i.name)}</span>
              <span>${formatARS(i.price * i.qty)}</span>
            </div>
          `).join('')}
          <div class="summary-row total">
            <span>Total estimado</span>
            <span>${formatARS(cart.total)}</span>
          </div>
          ${r.depositRequired ? `
            <div class="summary-row" style="color:var(--brand-primary);font-weight:800;font-size:14px;">
              <span>Seña para confirmar hoy</span>
              <span>${formatARS(cart.deposit)}</span>
            </div>
            <div class="summary-row" style="color:var(--brand-muted);font-size:11.5px;">
              <span>Saldo restante el día del turno</span>
              <span>${formatARS(cart.balance)}</span>
            </div>
          ` : ''}
        </div>

        ${r.depositRequired ? `
          <div style="display:flex;gap:8px;margin-bottom:10px;">
            <button class="btn ${w.paymentMethod === 'transfer' ? 'btn-primary' : 'btn-outline'} btn-sm" style="flex:1;" data-action="wiz-paymethod" data-val="transfer">${ic('landmark', 14)}<span>Transferencia</span></button>
            ${r.mercadoPagoEnabled ? `<button class="btn ${w.paymentMethod === 'mp' ? 'btn-primary' : 'btn-outline'} btn-sm" style="flex:1;" data-action="wiz-paymethod" data-val="mp">${ic('creditCard', 14)}<span>Mercado Pago</span></button>` : ''}
          </div>

          ${w.paymentMethod === 'transfer' ? `
            <div class="card">
              <div style="font-size:12px;font-weight:700;margin-bottom:4px;">Transferí <strong>${formatARS(cart.deposit)}</strong> a:</div>
              <div class="alias-box">
                <div>
                  <div style="font-size:10.5px;color:var(--brand-muted);">ALIAS (${escapeHtml(r.bank)})</div>
                  <div style="font-size:14px;font-weight:800;color:var(--brand-primary);">${escapeHtml(r.alias)}</div>
                  <div style="font-size:11px;color:var(--brand-muted);">Titular: ${escapeHtml(r.holder)}</div>
                </div>
                <button class="btn btn-primary btn-sm" data-action="copy-alias" data-alias="${escapeHtml(r.alias)}">${ic('copy', 13)}<span>Copiar</span></button>
              </div>
              <button class="btn ${w.receiptUploaded ? 'btn-success' : 'btn-soft'} btn-block btn-sm" data-action="wiz-receipt">
                ${w.receiptUploaded ? ic('checkCircle', 14) : ic('upload', 14)}
                <span>${w.receiptUploaded ? 'Comprobante adjuntado (Transferencia_' + cart.deposit + '.jpg)' : 'Adjuntar comprobante de transferencia'}</span>
              </button>
            </div>
          ` : `
            <div class="card" style="text-align:center;">
              <div style="color:var(--brand-primary);margin-bottom:6px;">${ic('creditCard', 28)}</div>
              <div style="font-weight:800;font-size:13.5px;margin-bottom:4px;">Pago instantáneo con Mercado Pago</div>
              <p style="font-size:11.5px;color:var(--brand-muted);margin:0;">Al confirmar, tu seña de <strong>${formatARS(cart.deposit)}</strong> se acredita en el acto y tu turno queda confirmado.</p>
            </div>
          `}
        ` : ''}
      `;
      const canSubmit = !r.depositRequired || w.paymentMethod === 'mp' || w.receiptUploaded;
      footerHtml = `
        <button class="btn btn-outline" data-action="wiz-prev">${ic('chevronLeft', 15)}<span>Atrás</span></button>
        <button class="btn btn-primary" style="flex:1;${!canSubmit ? 'opacity:0.45;' : ''}" ${!canSubmit ? 'disabled' : ''} data-action="wiz-confirm">
          ${ic('check', 15)}<span>${w.paymentMethod === 'mp' && r.depositRequired ? 'Pagar seña y confirmar' : 'Enviar reserva'}</span>
        </button>
      `;
    } else if (w.step === 5 && w.createdBooking) {
      const b = w.createdBooking;
      const dInfo = formatDateLabel(b.date);
      stepTitle = b.status === 'confirmed' ? 'Turno Confirmado' : 'Solicitud Enviada';
      stepBody = `
        <div style="text-align:center;padding:8px 4px;">
          <div style="width:58px;height:58px;border-radius:50%;margin:0 auto 10px;background:var(--brand-primary-soft);color:var(--brand-primary);display:flex;align-items:center;justify-content:center;">
            ${b.status === 'confirmed' ? ic('checkCircle', 30) : ic('clock', 30)}
          </div>
          <h3 style="margin:0 0 4px;font-family:var(--font-display);font-size:18px;">
            ${b.status === 'confirmed' ? 'Te esperamos' : 'Comprobante recibido'}
          </h3>
          <p style="font-size:12px;color:var(--brand-muted);margin:0 0 12px;">
            ${b.status === 'confirmed'
              ? `Tu turno en ${escapeHtml(tenant.name)} ya quedó agendado.`
              : `${escapeHtml(tenant.ownerName)} validará tu seña en breve y recibirás la confirmación.`}
          </p>

          <div class="card" style="text-align:left;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span class="pill pill-primary">#${b.id}</span>
              <span class="pill ${b.status === 'confirmed' ? 'pill-success' : 'pill-warning'}">${b.status === 'confirmed' ? 'Confirmado' : 'Validando seña'}</span>
            </div>
            <div class="ic-row" style="font-size:14.5px;font-weight:800;margin-bottom:4px;">${ic('calendar', 14)}<span>${dInfo.full} · ${b.time} hs</span></div>
            <div style="font-size:12px;color:var(--brand-muted);margin-bottom:8px;">
              ${b.items.map(i => `${i.qty > 1 ? i.qty + 'x ' : ''}${escapeHtml(i.name)}`).join(' + ')}
            </div>
            <div class="summary-row"><span>Seña abonada</span><strong style="color:#16a34a;">${formatARS(b.depositAmount)}</strong></div>
            <div class="summary-row"><span>Resta el día del turno</span><strong>${formatARS(Math.max(0, b.total - b.depositAmount))}</strong></div>
          </div>

          <button class="btn btn-soft btn-block btn-sm" style="margin-bottom:8px;" data-action="toast" data-msg="Resumen enviado por WhatsApp a ${escapeHtml(tenant.ownerName)}">${ic('messageCircle', 14)}<span>Enviar resumen por WhatsApp</span></button>
          <button class="btn btn-outline btn-block btn-sm" data-action="toast" data-msg="Evento guardado en tu calendario">${ic('calendar', 14)}<span>Agregar a Google Calendar</span></button>
        </div>
      `;
      footerHtml = `
        <button class="btn btn-primary btn-block" data-action="wiz-finish">Ver en Mis Turnos</button>
      `;
    }

    return `
      <div class="sheet-backdrop">
        <div class="sheet-panel">
          <div class="sheet-header">
            <h3>${stepTitle}</h3>
            <button class="icon-close-btn" data-action="close-wizard">${ic('x', 15)}</button>
          </div>
          ${w.step < 5 ? `
            <div class="stepper">
              ${[1, 2, 3, 4].map(n => `<div class="step-dot ${w.step >= n ? 'active' : ''}"></div>`).join('')}
            </div>
          ` : ''}
          <div class="sheet-body">${stepBody}</div>
          <div class="sheet-footer">${footerHtml}</div>
        </div>
      </div>
    `;
  }

  /* =========================================================================
     RENDER: ADMIN / BUSINESS PHONE (Neutral High-Clarity Multitenant SaaS)
     ========================================================================= */
  function renderAdminPhone(tenant) {
    const pendingCount = tenant.appointments.filter(a => a.status === 'pending_deposit').length;

    let bodyHtml = '';
    if (state.admin.tab === 'agenda') bodyHtml = renderAdminAgenda(tenant);
    else if (state.admin.tab === 'services') bodyHtml = renderAdminServices(tenant);
    else if (state.admin.tab === 'rules') bodyHtml = renderAdminRules(tenant);
    else if (state.admin.tab === 'brand') bodyHtml = renderAdminBrand(tenant);
    else if (state.admin.tab === 'caja') bodyHtml = renderAdminCaja(tenant);

    return `
      <div class="phone-frame">
        <div class="phone-screen admin-saas">
          <div class="phone-statusbar">
            <span>14:56</span>
            <div class="phone-notch"></div>
            <span>5G · 91%</span>
          </div>

          <div class="phone-url-pill">
            <span class="tenant-chip-badge">
              <span class="tenant-dot" style="background:${tenant.theme.primary};"></span>
              <span>${escapeHtml(tenant.name)}</span>
            </span>
            <button class="ic-row" style="border:none;background:transparent;color:#4f46e5;font-weight:700;font-size:11px;padding:0;" data-action="admin-open-modal" data-type="qr_share">
              <span>Compartir link</span>${ic('externalLink', 12)}
            </button>
          </div>

          <div class="phone-scroll" data-scroll-id="admin-scroll">
            ${bodyHtml}
          </div>

          <nav class="bottom-nav">
            <button class="nav-item ${state.admin.tab === 'agenda' ? 'active' : ''}" data-action="admin-tab" data-tab="agenda">
              <span class="nav-icon">${ic('calendar', 20)}</span>
              <span>Agenda</span>
              ${pendingCount > 0 ? `<span class="nav-badge">${pendingCount}</span>` : ''}
            </button>
            <button class="nav-item ${state.admin.tab === 'services' ? 'active' : ''}" data-action="admin-tab" data-tab="services">
              <span class="nav-icon">${ic('tag', 20)}</span>
              <span>Precios</span>
            </button>
            <button class="nav-item ${state.admin.tab === 'rules' ? 'active' : ''}" data-action="admin-tab" data-tab="rules">
              <span class="nav-icon">${ic('sliders', 20)}</span>
              <span>Reglas</span>
            </button>
            <button class="nav-item ${state.admin.tab === 'brand' ? 'active' : ''}" data-action="admin-tab" data-tab="brand">
              <span class="nav-icon">${ic('layout', 20)}</span>
              <span>Mi Link</span>
            </button>
            <button class="nav-item ${state.admin.tab === 'caja' ? 'active' : ''}" data-action="admin-tab" data-tab="caja">
              <span class="nav-icon">${ic('wallet', 20)}</span>
              <span>Caja</span>
            </button>
          </nav>

          ${state.admin.modal ? renderAdminModal(tenant) : ''}
        </div>
      </div>
    `;
  }

  function renderAdminAgenda(tenant) {
    const days = getNextDays(7);
    const pendingList = tenant.appointments.filter(a => a.status === 'pending_deposit');
    const dayAppts = tenant.appointments
      .filter(a => a.date === state.admin.selectedDate && a.status !== 'cancelled')
      .sort((a, b) => a.time.localeCompare(b.time));

    const realDayAppts = dayAppts.filter(a => a.status !== 'blocked');
    const dayBalanceToCollect = realDayAppts.reduce((acc, a) => acc + Math.max(0, (a.total || 0) - (a.depositAmount || 0)), 0);

    return `
      <div class="admin-header">
        <div>
          <div style="font-size:11.5px;color:var(--brand-muted);font-weight:600;">Panel de gestión · ${escapeHtml(tenant.ownerName)}</div>
          <div style="font-size:18px;font-weight:800;color:#0f172a;">Agenda del día</div>
        </div>
        <button class="btn btn-primary btn-sm" data-action="admin-open-modal" data-type="new_manual_appt">${ic('plus', 14)}<span>Turno</span></button>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-val">${realDayAppts.length}</div>
          <div class="kpi-lbl">Turnos del día</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:${pendingList.length ? '#d97706' : '#16a34a'};">${pendingList.length}</div>
          <div class="kpi-lbl">Señas a validar</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#0f172a;font-size:14px;">${formatARS(dayBalanceToCollect)}</div>
          <div class="kpi-lbl">Saldo a cobrar</div>
        </div>
      </div>

      ${pendingList.length > 0 ? `
        <div class="admin-pending-banner">
          <div class="admin-pending-head">
            <span class="ic-row">${ic('alertCircle', 15)}<span>Comprobantes pendientes (${pendingList.length})</span></span>
            <span style="font-size:10.5px;font-weight:700;">Requiere acción</span>
          </div>
          ${pendingList.map(p => `
            <div class="admin-pending-item">
              <div style="min-width:0;">
                <div style="font-size:12.5px;font-weight:800;color:#0f172a;">${escapeHtml(p.clientName)}</div>
                <div style="font-size:11px;color:#78350f;">${formatDateLabel(p.date).full} · ${p.time} hs · Seña ${formatARS(p.depositAmount)}</div>
              </div>
              <button class="btn btn-success btn-sm" style="padding:6px 10px;font-size:11px;" data-action="admin-open-modal" data-type="appt_detail" data-id="${p.id}">Revisar</button>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="date-strip">
        ${days.map(d => {
          const cnt = tenant.appointments.filter(a => a.date === d.iso && a.status !== 'cancelled' && a.status !== 'blocked').length;
          return `
            <button class="date-chip ${state.admin.selectedDate === d.iso ? 'active' : ''}" data-action="admin-date" data-date="${d.iso}">
              <span class="d-day">${d.dayShort}</span>
              <span class="d-num">${d.dayNum}</span>
              <span style="font-size:9.5px;opacity:0.85;">${cnt} ${cnt === 1 ? 'turno' : 'turnos'}</span>
            </button>
          `;
        }).join('')}
      </div>

      <div class="section-title" style="margin-top:4px;">
        <span>${formatDateLabel(state.admin.selectedDate).full}</span>
        <button class="btn btn-outline btn-sm" style="padding:5px 10px;font-size:11px;" data-action="admin-open-modal" data-type="block_slot">${ic('lock', 12)}<span>Bloquear hora</span></button>
      </div>

      ${dayAppts.length === 0 ? `
        <div class="card" style="text-align:center;padding:24px 14px;color:var(--brand-muted);font-size:12.5px;">
          Sin turnos programados para esta fecha.
        </div>
      ` : dayAppts.map(a => {
        const statusClass = a.status === 'pending_deposit' ? 'status-pending' : a.status === 'confirmed' ? 'status-confirmed' : a.status === 'completed' ? 'status-completed' : '';
        const badge = a.status === 'pending_deposit'
          ? `<span class="pill pill-warning">Validar seña</span>`
          : a.status === 'confirmed'
            ? `<span class="pill pill-success">Confirmado</span>`
            : a.status === 'completed'
              ? `<span class="pill pill-primary">Completado</span>`
              : `<span class="pill" style="background:#f1f5f9;color:#475569;">Bloqueado</span>`;

        const balance = Math.max(0, (a.total || 0) - (a.depositAmount || 0));

        return `
          <div class="appt-timeline-card ${statusClass}" data-action="admin-open-modal" data-type="appt_detail" data-id="${a.id}">
            <div class="appt-time-col">
              <span class="appt-time-main">${a.time}</span>
              <span class="appt-time-dur">${formatDuration(a.duration)}</span>
            </div>
            <div class="appt-info-col">
              <div class="appt-row-top">
                <span style="font-weight:800;font-size:13.5px;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(a.clientName)}</span>
                ${badge}
              </div>
              ${a.status !== 'blocked' ? `
                <div style="font-size:11.5px;color:#475569;line-height:1.35;">
                  ${a.items.map(i => `${i.qty > 1 ? i.qty + 'x ' : ''}${escapeHtml(i.name)}`).join(' · ')}
                </div>
                <div class="appt-money-row">
                  <span style="color:#64748b;">Seña: <strong style="color:#15803d;">${formatARS(a.depositAmount)}</strong></span>
                  <span style="color:#0f172a;font-weight:800;">Cobrar: ${formatARS(balance)}</span>
                </div>
              ` : `<div style="font-size:11.5px;color:#64748b;">${escapeHtml(a.notes || 'Horario bloqueado manualmente')}</div>`}
            </div>
          </div>
        `;
      }).join('')}
    `;
  }

  function renderAdminServices(tenant) {
    const filter = state.admin.serviceCatFilter;
    const filtered = filter === 'all'
      ? tenant.services
      : tenant.services.filter(s => s.categoryId === filter);

    return `
      <div class="section-title" style="margin-top:4px;">
        <span>Servicios y Precios</span>
        <button class="btn btn-primary btn-sm" data-action="admin-open-modal" data-type="new_service">${ic('plus', 14)}<span>Nuevo</span></button>
      </div>
      <p class="section-sub">Los cambios se publican al instante en el enlace de tus clientas.</p>

      <div class="cat-tabs">
        <button class="cat-tab ${filter === 'all' ? 'active' : ''}" data-action="admin-svc-cat" data-cat="all">Todos (${tenant.services.length})</button>
        ${tenant.categories.map(c => `
          <button class="cat-tab ${filter === c.id ? 'active' : ''}" data-action="admin-svc-cat" data-cat="${c.id}">${ic(c.icon, 13)}<span>${escapeHtml(c.name)}</span></button>
        `).join('')}
      </div>

      ${filtered.map(s => `
        <div class="service-card" style="${!s.active ? 'opacity:0.55;' : ''}">
          <div class="service-info">
            <div class="service-name-row">
              <span class="service-name">${escapeHtml(s.name)}</span>
              ${!s.active ? `<span class="pill pill-danger" style="font-size:10px;">Pausado</span>` : ''}
            </div>
            <div class="service-meta">
              <span class="service-price" style="color:#0f172a;">${s.desde ? '<span class="service-desde">desde </span>' : ''}${formatARS(s.price)}</span>
              <span class="service-dur ic-row">${ic('clock', 12)} ${formatDuration(s.duration)}</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button class="btn btn-outline btn-sm" style="padding:7px 9px;" data-action="admin-open-modal" data-type="edit_service" data-id="${s.id}" title="Editar">${ic('edit', 14)}</button>
            <button class="toggle-switch ${s.active ? 'on' : ''}" data-action="admin-toggle-service" data-id="${s.id}" title="Activar o pausar"></button>
          </div>
        </div>
      `).join('')}
    `;
  }

  function renderAdminRules(tenant) {
    const r = tenant.bookingRules;
    return `
      <div class="section-title" style="margin-top:4px;"><span>Reglas de Reserva y Seña</span></div>
      <p class="section-sub">Configurá condiciones de pago, cancelaciones y horarios disponibles.</p>

      <div class="card">
        <div class="toggle-row">
          <div>
            <div style="font-size:13px;font-weight:800;">Exigir seña obligatoria</div>
            <div style="font-size:11px;color:var(--brand-muted);">Bloquea el turno únicamente con seña</div>
          </div>
          <button class="toggle-switch ${r.depositRequired ? 'on' : ''}" data-action="rule-toggle" data-key="depositRequired"></button>
        </div>

        ${r.depositRequired ? `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">
            <div class="field" style="margin:0;">
              <label>Tipo de seña</label>
              <select data-action-change="rule-input" data-key="depositType">
                <option value="fixed" ${r.depositType === 'fixed' ? 'selected' : ''}>Monto fijo ($)</option>
                <option value="percent" ${r.depositType === 'percent' ? 'selected' : ''}>Porcentaje (%)</option>
              </select>
            </div>
            <div class="field" style="margin:0;">
              <label>${r.depositType === 'fixed' ? 'Monto ($ ARS)' : 'Porcentaje (%)'}</label>
              <input type="number" data-action-change="rule-input" data-key="depositValue" value="${r.depositValue}">
            </div>
          </div>
          <div class="field" style="margin-top:10px;">
            <label>Alias para transferencias</label>
            <input type="text" data-action-change="rule-input" data-key="alias" value="${escapeHtml(r.alias)}">
          </div>
        ` : ''}

        <div class="toggle-row">
          <div>
            <div style="font-size:13px;font-weight:800;">Permitir reprogramaciones</div>
            <div style="font-size:11px;color:var(--brand-muted);">Desactivalo en meses de alta demanda</div>
          </div>
          <button class="toggle-switch ${r.allowReschedule ? 'on' : ''}" data-action="rule-toggle" data-key="allowReschedule"></button>
        </div>

        <div class="toggle-row">
          <div>
            <div style="font-size:13px;font-weight:800;">Solicitar diseño de referencia</div>
            <div style="font-size:11px;color:var(--brand-muted);">Habilita galería o subida de foto al reservar</div>
          </div>
          <button class="toggle-switch ${r.askReferencePhoto ? 'on' : ''}" data-action="rule-toggle" data-key="askReferencePhoto"></button>
        </div>

        <div class="field" style="margin-top:10px;margin-bottom:0;">
          <label>Aviso destacado en Políticas</label>
          <textarea rows="2" data-action-change="rule-input" data-key="importantNotice">${escapeHtml(r.importantNotice)}</textarea>
        </div>
      </div>

      <div class="section-title"><span>Horarios de Atención</span></div>
      <div class="card">
        ${tenant.schedule.days.map(d => `
          <div class="toggle-row">
            <div style="min-width:86px;"><strong style="font-size:12.5px;">${d.label}</strong></div>
            <div style="font-size:12px;color:${d.enabled ? '#0f172a' : 'var(--brand-muted)'};flex:1;">
              ${d.enabled ? `${d.start} – ${d.end} hs` : 'Cerrado'}
            </div>
            <button class="toggle-switch ${d.enabled ? 'on' : ''}" data-action="schedule-toggle" data-day="${d.key}"></button>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderAdminBrand(tenant) {
    const t = tenant.theme;
    const works = tenant.portfolio || [];

    return `
      <div class="section-title" style="margin-top:4px;">
        <span>Diseño del Link Público</span>
        <span class="pill pill-primary">${escapeHtml(tenant.slug)}.turnos.app</span>
      </div>
      <p class="section-sub">Elegí una plantilla y personalizá cómo ven tus clientas tu página de reservas. Este panel mantiene siempre su diseño limpio.</p>

      <div class="card">
        <div style="font-size:12.5px;font-weight:800;margin-bottom:9px;color:#0f172a;">Plantillas de estilo para el cliente</div>
        <div class="template-grid">
          ${window.CLIENT_TEMPLATES.map(tpl => `
            <button class="template-card ${t.templateId === tpl.id ? 'active' : ''}" data-action="apply-template" data-tpl="${tpl.id}">
              <div class="template-preview" style="background:${tpl.bg};">
                <div class="template-preview-bar" style="background:${tpl.primary};"></div>
                <div class="template-preview-line" style="background:${tpl.text};"></div>
              </div>
              <div class="template-name">
                <span>${escapeHtml(tpl.name)}</span>
                ${t.templateId === tpl.id ? `<span style="color:#4f46e5;">${ic('checkCircle', 14)}</span>` : ''}
              </div>
              <div class="template-desc">${escapeHtml(tpl.desc)}</div>
            </button>
          `).join('')}
        </div>

        <div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:7px;">Ajuste fino de colores del link</div>
        <div class="color-pickers">
          <label class="color-chip-input">
            <input type="color" value="${t.primary}" data-action-input="brand-color" data-key="primary">
            <span>Acento</span>
          </label>
          <label class="color-chip-input">
            <input type="color" value="${t.bg}" data-action-input="brand-color" data-key="bg">
            <span>Fondo</span>
          </label>
          <label class="color-chip-input">
            <input type="color" value="${t.accent}" data-action-input="brand-color" data-key="accent">
            <span>Detalle</span>
          </label>
        </div>

        <div style="display:flex;gap:6px;margin-top:4px;">
          ${Object.values(window.FONT_PRESETS).map(f => `
            <button class="btn ${t.fontId === f.id ? 'btn-primary' : 'btn-outline'} btn-sm" style="flex:1;padding:6px;font-size:11px;" data-action="brand-font" data-val="${f.id}">${f.label.split(' ')[0]}</button>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="field">
          <label>Nombre visible de tu marca</label>
          <input type="text" data-action-input="tenant-text" data-key="name" value="${escapeHtml(tenant.name)}">
        </div>
        <div class="field">
          <label>Aviso superior en el link del cliente</label>
          <input type="text" data-action-input="tenant-text" data-key="announcement" value="${escapeHtml(tenant.announcement)}">
        </div>

        ${tenant.assets.logoBanner ? `
          <div class="toggle-row">
            <div>
              <div style="font-size:12.5px;font-weight:700;">Formato del logo en cabecera</div>
              <div style="font-size:11px;color:var(--brand-muted);">${t.headerStyle === 'banner' ? 'Logo horizontal' : 'Emblema circular'}</div>
            </div>
            <button class="btn btn-outline btn-sm" data-action="brand-header-toggle">Cambiar</button>
          </div>
        ` : ''}

        ${tenant.assets.mascot ? `
          <div class="toggle-row">
            <div>
              <div style="font-size:12.5px;font-weight:700;">Tarjeta de bienvenida ilustrada</div>
              <div style="font-size:11px;color:var(--brand-muted);">Mostrar saludo inicial en el link</div>
            </div>
            <button class="toggle-switch ${t.showMascot ? 'on' : ''}" data-action="brand-toggle" data-key="showMascot"></button>
          </div>
        ` : ''}
      </div>

      <div class="section-title">
        <span>Galería de Trabajos (${works.length})</span>
        <button class="btn btn-primary btn-sm" data-action="admin-open-modal" data-type="add_work">${ic('upload', 13)}<span>Subir foto</span></button>
      </div>
      <div class="portfolio-grid-admin">
        ${works.map(w => `
          <div class="portfolio-card" style="width:100%;">
            <div class="portfolio-thumb-wrap" style="height:104px;">
              ${w.src
                ? `<img class="portfolio-thumb" src="${w.src}" alt="${escapeHtml(w.title)}">`
                : `<div class="portfolio-placeholder" style="background:${w.gradient};color:#fff;">${ic('image', 24)}</div>`}
              <span class="portfolio-tag">${escapeHtml(w.serviceName)}</span>
            </div>
            <div class="portfolio-meta" style="display:flex;align-items:center;justify-content:space-between;gap:4px;">
              <div class="portfolio-title" style="flex:1;">${escapeHtml(w.title)}</div>
              <button style="border:none;background:transparent;color:#dc2626;padding:3px;" title="Eliminar" data-action="delete-work" data-id="${w.id}">${ic('trash', 14)}</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderAdminCaja(tenant) {
    const validAppts = tenant.appointments.filter(a => a.status !== 'cancelled' && a.status !== 'blocked');
    const depositsCollected = validAppts.filter(a => a.status === 'confirmed' || a.status === 'completed').reduce((s, a) => s + a.depositAmount, 0);
    const projectedTotal = validAppts.reduce((s, a) => s + a.total, 0);
    const balanceRemaining = Math.max(0, projectedTotal - depositsCollected);

    const counts = {};
    validAppts.forEach(a => a.items.forEach(i => {
      if (i.categoryId === tenant.categories[0].id) {
        counts[i.name] = (counts[i.name] || 0) + 1;
      }
    }));
    const topArr = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const maxCount = topArr[0]?.[1] || 1;

    return `
      <div class="section-title" style="margin-top:4px;"><span>Resumen de Caja</span></div>
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-val" style="color:#16a34a;font-size:13.5px;">${formatARS(depositsCollected)}</div>
          <div class="kpi-lbl">Señas cobradas</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#0f172a;font-size:13.5px;">${formatARS(balanceRemaining)}</div>
          <div class="kpi-lbl">Saldo a cobrar</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#4f46e5;font-size:13.5px;">${formatARS(projectedTotal)}</div>
          <div class="kpi-lbl">Total agendado</div>
        </div>
      </div>

      <div class="card">
        <div class="ic-row" style="font-size:13px;font-weight:800;margin-bottom:10px;color:#0f172a;">${ic('trendingUp', 15)}<span>Servicios más solicitados</span></div>
        ${topArr.length === 0 ? `<div style="font-size:12px;color:var(--brand-muted);">Sin datos todavía.</div>` : topArr.map(([name, qty]) => `
          <div class="bar-row">
            <div class="bar-head"><span>${escapeHtml(name)}</span><span>${qty} ${qty === 1 ? 'turno' : 'turnos'}</span></div>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.round((qty / maxCount) * 100)}%;"></div></div>
          </div>
        `).join('')}
      </div>

      <div class="section-title">
        <span class="ic-row">${ic('users', 16)}<span>Clientas (${tenant.clients.length})</span></span>
      </div>
      ${tenant.clients.map(c => `
        <div class="card" style="padding:11px 12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <strong style="font-size:13.5px;color:#0f172a;">${escapeHtml(c.name)}</strong>
            <span class="pill pill-primary">${escapeHtml(c.tag)}</span>
          </div>
          <div class="ic-row" style="font-size:11.5px;color:var(--brand-muted);margin-bottom:5px;">
            ${ic('phone', 12)}<span>${escapeHtml(c.phone)} · ${escapeHtml(c.ig)}</span>
          </div>
          <div style="font-size:11.5px;color:#334155;margin-bottom:7px;">${escapeHtml(c.note)}</div>
          <div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:700;border-top:1px solid #f1f5f9;padding-top:6px;">
            <span style="color:#64748b;">${c.visits} visitas</span>
            <span style="color:#0f172a;">Histórico: ${formatARS(c.spent)}</span>
          </div>
        </div>
      `).join('')}
    `;
  }

  /* =========================================================================
     RENDER: ADMIN MODALS
     ========================================================================= */
  function renderAdminModal(tenant) {
    const m = state.admin.modal;
    let title = '';
    let body = '';
    let footer = '';

    if (m.type === 'appt_detail') {
      const a = tenant.appointments.find(x => x.id === m.id);
      if (!a) return '';
      const dInfo = formatDateLabel(a.date);
      title = a.status === 'blocked' ? 'Horario Bloqueado' : `Detalle del Turno #${a.id}`;
      body = a.status === 'blocked' ? `
        <div class="card">
          <strong>${dInfo.full} · ${a.time} hs (${formatDuration(a.duration)})</strong>
          <p style="font-size:12.5px;color:var(--brand-muted);margin:6px 0 0;">${escapeHtml(a.notes || 'Bloqueo personal')}</p>
        </div>
      ` : `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <strong style="font-size:15px;">${escapeHtml(a.clientName)}</strong>
            <span class="pill ${a.status === 'confirmed' ? 'pill-success' : a.status === 'pending_deposit' ? 'pill-warning' : 'pill-primary'}">
              ${a.status === 'confirmed' ? 'Confirmado' : a.status === 'pending_deposit' ? 'Seña pendiente' : a.status === 'completed' ? 'Completado' : 'Cancelado'}
            </span>
          </div>
          <div style="font-size:12px;color:var(--brand-muted);margin-bottom:10px;display:flex;flex-direction:column;gap:4px;">
            <span class="ic-row">${ic('calendar', 13)} ${dInfo.full} · ${a.time} hs (${formatDuration(a.duration)})</span>
            <span class="ic-row">${ic('phone', 13)} ${escapeHtml(a.clientPhone)} ${a.clientIg ? '· ' + escapeHtml(a.clientIg) : ''}</span>
          </div>
          <div style="border-top:1px solid #f1f5f9;padding-top:8px;">
            ${a.items.map(i => `<div class="summary-row"><span>${i.qty > 1 ? i.qty + 'x ' : ''}${escapeHtml(i.name)}</span><strong>${formatARS(i.price * i.qty)}</strong></div>`).join('')}
            <div class="summary-row total"><span>Total</span><span>${formatARS(a.total)}</span></div>
            <div class="summary-row" style="color:#16a34a;"><span>Seña (${escapeHtml(a.paymentMethod)})</span><strong>− ${formatARS(a.depositAmount)}</strong></div>
            <div class="summary-row" style="color:#0f172a;font-weight:800;"><span>Saldo a cobrar</span><span>${formatARS(Math.max(0, a.total - a.depositAmount))}</span></div>
          </div>
        </div>

        ${a.designRef || a.notes ? `
          <div class="card">
            ${a.designRef ? `<div class="ic-row" style="font-size:12px;margin-bottom:4px;">${ic('image', 13)}<span><strong>Referencia:</strong> ${escapeHtml(a.designRef)}</span></div>` : ''}
            ${a.notes ? `<div style="font-size:12px;color:#475569;"><strong>Nota:</strong> ${escapeHtml(a.notes)}</div>` : ''}
          </div>
        ` : ''}

        <div class="card" style="background:#f8fafc;border-color:#cbd5e1;">
          <div class="ic-row" style="font-size:11.5px;font-weight:800;color:#334155;margin-bottom:3px;">${ic('receipt', 13)}<span>Comprobante de Seña</span></div>
          <div style="font-size:12px;color:#475569;">${escapeHtml(a.receiptNote || 'Sin comprobante adjunto')}</div>
        </div>

        <button class="btn btn-soft btn-block btn-sm" data-action="toast" data-msg="Recordatorio enviado por WhatsApp a ${escapeHtml(a.clientName)}">${ic('messageCircle', 14)}<span>Enviar recordatorio por WhatsApp</span></button>
      `;

      if (a.status === 'blocked') {
        footer = `<button class="btn btn-danger-soft btn-block" data-action="admin-appt-status" data-id="${a.id}" data-status="cancelled">Liberar horario</button>`;
      } else if (a.status === 'pending_deposit') {
        footer = `
          <button class="btn btn-danger-soft" data-action="admin-appt-status" data-id="${a.id}" data-status="cancelled">Rechazar</button>
          <button class="btn btn-success" style="flex:1;" data-action="admin-appt-status" data-id="${a.id}" data-status="confirmed">${ic('check', 14)}<span>Aprobar seña</span></button>
        `;
      } else if (a.status === 'confirmed') {
        footer = `
          <button class="btn btn-danger-soft" data-action="admin-appt-status" data-id="${a.id}" data-status="cancelled">Cancelar</button>
          <button class="btn btn-primary" style="flex:1;" data-action="admin-appt-status" data-id="${a.id}" data-status="completed">${ic('checkCircle', 14)}<span>Marcar completado</span></button>
        `;
      } else {
        footer = `<button class="btn btn-outline btn-block" data-action="admin-close-modal">Cerrar</button>`;
      }
    } else if (m.type === 'edit_service' || m.type === 'new_service') {
      const isNew = m.type === 'new_service';
      const s = isNew
        ? { id: '', categoryId: tenant.categories[0].id, name: '', price: 15000, desde: false, duration: 60, desc: '' }
        : tenant.services.find(x => x.id === m.id);
      title = isNew ? 'Nuevo Servicio' : 'Editar Servicio';
      body = `
        <form id="svc-form">
          <div class="field">
            <label>Categoría</label>
            <select name="categoryId">
              ${tenant.categories.map(c => `<option value="${c.id}" ${s.categoryId === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Nombre del servicio *</label>
            <input name="name" required value="${escapeHtml(s.name)}" placeholder="Ej: Esculpidas en acrílico">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="field">
              <label>Precio ($ ARS) *</label>
              <input name="price" type="number" required value="${s.price}">
            </div>
            <div class="field">
              <label>Duración (min) *</label>
              <input name="duration" type="number" required value="${s.duration}">
            </div>
          </div>
          <label class="check-row" style="margin-bottom:10px;">
            <input type="checkbox" name="desde" ${s.desde ? 'checked' : ''}>
            <span>Mostrar etiqueta "desde" antes del precio</span>
          </label>
          <div class="field">
            <label>Descripción corta</label>
            <textarea name="desc" rows="2">${escapeHtml(s.desc)}</textarea>
          </div>
        </form>
      `;
      footer = `
        <button class="btn btn-outline" data-action="admin-close-modal">Cancelar</button>
        <button class="btn btn-primary" style="flex:1;" data-action="save-service" data-id="${s.id}">Guardar cambios</button>
      `;
    } else if (m.type === 'new_manual_appt') {
      const mainServices = tenant.services.filter(s => s.categoryId === tenant.categories[0].id && s.active);
      title = 'Agendar Turno Manual';
      body = `
        <form id="manual-appt-form">
          <div class="field"><label>Clienta *</label><input name="clientName" required placeholder="Nombre y apellido"></div>
          <div class="field"><label>WhatsApp</label><input name="clientPhone" placeholder="11 5555-0000"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="field"><label>Fecha</label><input type="date" name="date" value="${state.admin.selectedDate}"></div>
            <div class="field"><label>Hora</label><input type="time" name="time" value="14:30"></div>
          </div>
          <div class="field">
            <label>Servicio</label>
            <select name="serviceId">
              ${mainServices.map(s => `<option value="${s.id}">${escapeHtml(s.name)} (${formatARS(s.price)})</option>`).join('')}
            </select>
          </div>
        </form>
      `;
      footer = `
        <button class="btn btn-outline" data-action="admin-close-modal">Cancelar</button>
        <button class="btn btn-primary" style="flex:1;" data-action="save-manual-appt">Agendar confirmado</button>
      `;
    } else if (m.type === 'block_slot') {
      title = 'Bloquear Horario';
      body = `
        <form id="block-form">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="field"><label>Fecha</label><input type="date" name="date" value="${state.admin.selectedDate}"></div>
            <div class="field"><label>Hora inicio</label><input type="time" name="time" value="12:00"></div>
          </div>
          <div class="field"><label>Duración (min)</label><input type="number" name="duration" value="60"></div>
          <div class="field"><label>Motivo</label><input name="notes" value="Almuerzo / trámite personal"></div>
        </form>
      `;
      footer = `
        <button class="btn btn-outline" data-action="admin-close-modal">Cancelar</button>
        <button class="btn btn-primary" style="flex:1;" data-action="save-block-slot">Bloquear horario</button>
      `;
    } else if (m.type === 'add_work') {
      const mainServices = tenant.services.filter(s => s.categoryId === tenant.categories[0].id);
      title = 'Agregar Trabajo a Galería';
      body = `
        <form id="work-form">
          <div class="field"><label>Título del diseño *</label><input name="title" required placeholder="Ej: Stiletto Nude + Brillos"></div>
          <div class="field">
            <label>Servicio principal asociado</label>
            <select name="serviceId">
              ${mainServices.map(s => `<option value="${s.id}">${escapeHtml(s.name)} (${formatARS(s.price)})</option>`).join('')}
            </select>
          </div>
          <div class="field"><label>Detalle de extras / precio aprox.</label><input name="extraSummary" placeholder="Ej: French + 6 strass · $25.600 aprox."></div>
          <div class="field">
            <label>Foto del trabajo</label>
            <input type="file" accept="image/*" id="new-work-file">
          </div>
        </form>
      `;
      footer = `
        <button class="btn btn-outline" data-action="admin-close-modal">Cancelar</button>
        <button class="btn btn-primary" style="flex:1;" data-action="save-work">Publicar en Link Cliente</button>
      `;
    } else if (m.type === 'qr_share') {
      const link = `https://${tenant.slug}.turnos.app`;
      title = 'Compartir Enlace de Reservas';
      body = `
        <div style="text-align:center;padding:8px 0;">
          <div style="width:140px;height:140px;margin:0 auto 12px;border-radius:16px;background:#fff;padding:12px;display:grid;grid-template-columns:repeat(5,1fr);gap:4px;border:1.5px solid #cbd5e1;">
            ${Array.from({ length: 25 }).map((_, i) => `<div style="border-radius:3px;background:${[0,1,2,4,5,9,10,12,14,15,18,20,21,22,24].includes(i) ? '#0f172a' : '#eef2ff'};"></div>`).join('')}
          </div>
          <div style="font-weight:800;font-size:15px;margin-bottom:4px;color:#0f172a;">${escapeHtml(link)}</div>
          <p style="font-size:12px;color:var(--brand-muted);margin:0 0 12px;">Colocalo en tu bio de Instagram o envialo por WhatsApp para que tus clientas reserven online.</p>
          <button class="btn btn-primary btn-block" data-action="copy-alias" data-alias="${escapeHtml(link)}">${ic('copy', 14)}<span>Copiar enlace</span></button>
        </div>
      `;
      footer = `<button class="btn btn-outline btn-block" data-action="admin-close-modal">Cerrar</button>`;
    }

    return `
      <div class="sheet-backdrop" data-action="admin-close-modal">
        <div class="sheet-panel" onclick="event.stopPropagation()">
          <div class="sheet-header">
            <h3>${title}</h3>
            <button class="icon-close-btn" data-action="admin-close-modal">${ic('x', 15)}</button>
          </div>
          <div class="sheet-body">${body}</div>
          <div class="sheet-footer">${footer}</div>
        </div>
      </div>
    `;
  }

  /* =========================================================================
     EVENT DELEGATION
     ========================================================================= */
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const tenant = getTenant();

    if (action === 'set-view') {
      state.viewMode = target.dataset.view;
      render();
    } else if (action === 'reset-demo') {
      localStorage.removeItem(STORAGE_KEY);
      state.tenants = deepClone(window.INITIAL_TENANTS);
      state.client.cart = { mainServiceId: null, retiroId: null, extras: {}, selectedWork: null };
      state.client.wizard.open = false;
      state.admin.modal = null;
      showToast('Demo restaurada a los valores iniciales');
      render();
    } else if (action === 'toast') {
      showToast(target.dataset.msg || 'Acción ejecutada');
    } else if (action === 'copy-alias') {
      const val = target.dataset.alias;
      if (navigator.clipboard) navigator.clipboard.writeText(val).catch(() => {});
      showToast(`Copiado: ${val}`);
    }

    // ---- Client Navigation & Services ----
    else if (action === 'client-tab') {
      state.client.tab = target.dataset.tab;
      render();
    } else if (action === 'select-cat') {
      state.client.activeCategory = target.dataset.cat;
      render();
    } else if (action === 'portfolio-filter') {
      state.client.portfolioFilter = target.dataset.val;
      render();
    } else if (action === 'open-work') {
      state.client.lightboxWorkId = target.dataset.id;
      render();
    } else if (action === 'close-work') {
      state.client.lightboxWorkId = null;
      render();
    } else if (action === 'apply-work-style') {
      const work = (tenant.portfolio || []).find(w => w.id === target.dataset.id);
      if (work) {
        if (work.serviceId) state.client.cart.mainServiceId = work.serviceId;
        state.client.cart.selectedWork = { id: work.id, title: work.title, src: work.src };
        state.client.wizard.designRef = work.title;
        state.client.lightboxWorkId = null;
        state.client.tab = 'home';
        showToast(`Estilo "${work.title}" agregado a tu reserva`);
        render();
      }
    } else if (action === 'clear-work-ref') {
      state.client.cart.selectedWork = null;
      state.client.wizard.designRef = '';
      render();
    } else if (action === 'toggle-service') {
      const id = target.dataset.id;
      const mode = target.dataset.mode;
      if (mode === 'single') {
        state.client.cart.mainServiceId = state.client.cart.mainServiceId === id ? null : id;
      } else if (mode === 'single-optional') {
        state.client.cart.retiroId = state.client.cart.retiroId === id ? null : id;
      } else {
        const cur = state.client.cart.extras[id] || 0;
        if (cur > 0) delete state.client.cart.extras[id];
        else state.client.cart.extras[id] = 1;
      }
      render();
    } else if (action === 'qty-extra') {
      const id = target.dataset.id;
      const delta = Number(target.dataset.delta);
      const next = Math.max(0, (state.client.cart.extras[id] || 0) + delta);
      if (next === 0) delete state.client.cart.extras[id];
      else state.client.cart.extras[id] = next;
      render();
    }

    // ---- Booking Wizard ----
    else if (action === 'open-wizard') {
      const firstOpen = getFirstOpenDate(tenant);
      state.client.wizard.open = true;
      state.client.wizard.step = 1;
      state.client.wizard.date = firstOpen;
      state.client.wizard.time = '';
      state.client.wizard.acceptedPolicy = false;
      state.client.wizard.receiptUploaded = false;
      state.client.wizard.createdBooking = null;
      render();
    } else if (action === 'close-wizard') {
      state.client.wizard.open = false;
      render();
    } else if (action === 'wiz-date') {
      state.client.wizard.date = target.dataset.date;
      state.client.wizard.time = '';
      render();
    } else if (action === 'wiz-time') {
      state.client.wizard.time = target.dataset.time;
      render();
    } else if (action === 'wiz-design') {
      const val = target.dataset.val;
      state.client.wizard.designRef = state.client.wizard.designRef === val ? '' : val;
      render();
    } else if (action === 'wiz-paymethod') {
      state.client.wizard.paymentMethod = target.dataset.val;
      render();
    } else if (action === 'wiz-receipt') {
      state.client.wizard.receiptUploaded = true;
      showToast('Comprobante adjuntado correctamente');
      render();
    } else if (action === 'wiz-prev') {
      state.client.wizard.step = Math.max(1, state.client.wizard.step - 1);
      render();
    } else if (action === 'wiz-next') {
      if (state.client.wizard.step === 2 && (!state.client.wizard.name.trim() || !state.client.wizard.phone.trim())) {
        showToast('Completá tu nombre y WhatsApp para continuar');
        return;
      }
      state.client.wizard.step = Math.min(4, state.client.wizard.step + 1);
      render();
    } else if (action === 'wiz-confirm') {
      const cart = getCartSummary(tenant);
      const w = state.client.wizard;
      const isInstant = !tenant.bookingRules.depositRequired || w.paymentMethod === 'mp';
      const newAppt = {
        id: tenant.slug.slice(0, 2).toUpperCase() + '-' + Math.floor(1100 + Math.random() * 8800),
        date: w.date,
        time: w.time,
        duration: cart.duration || 60,
        clientName: w.name.trim(),
        clientPhone: w.phone.trim(),
        clientIg: w.ig.trim(),
        items: cart.items,
        total: cart.total,
        depositAmount: cart.deposit,
        status: isInstant ? 'confirmed' : 'pending_deposit',
        paymentMethod: w.paymentMethod === 'mp' ? 'Mercado Pago' : 'Transferencia',
        receiptNote: w.paymentMethod === 'mp'
          ? 'Aprobado automático vía Mercado Pago'
          : `Comprobante adjunto (Transferencia ${formatARS(cart.deposit)} · recién)`,
        designRef: w.designRef || (w.customDesignImg ? 'Foto subida por clienta' : ''),
        notes: w.notes.trim(),
        isMine: true
      };
      tenant.appointments.unshift(newAppt);
      state.admin.selectedDate = w.date;
      w.createdBooking = newAppt;
      w.step = 5;
      state.client.cart = { mainServiceId: null, retiroId: null, extras: {}, selectedWork: null };
      saveTenants();
      showToast(isInstant ? 'Turno confirmado en la agenda' : 'Turno enviado al Panel Admin');
      render();
    } else if (action === 'wiz-finish') {
      state.client.wizard.open = false;
      state.client.tab = 'bookings';
      render();
    }

    // ---- Admin Navigation & Actions ----
    else if (action === 'admin-tab') {
      state.admin.tab = target.dataset.tab;
      render();
    } else if (action === 'admin-date') {
      state.admin.selectedDate = target.dataset.date;
      render();
    } else if (action === 'admin-svc-cat') {
      state.admin.serviceCatFilter = target.dataset.cat;
      render();
    } else if (action === 'admin-toggle-service') {
      const svc = tenant.services.find(s => s.id === target.dataset.id);
      if (svc) {
        svc.active = !svc.active;
        saveTenants();
        showToast(svc.active ? `"${svc.name}" visible para clientas` : `"${svc.name}" pausado`);
        render();
      }
    } else if (action === 'admin-open-modal') {
      state.admin.modal = { type: target.dataset.type, id: target.dataset.id || null };
      render();
    } else if (action === 'admin-close-modal') {
      state.admin.modal = null;
      render();
    } else if (action === 'admin-appt-status') {
      const a = tenant.appointments.find(x => x.id === target.dataset.id);
      if (a) {
        a.status = target.dataset.status;
        saveTenants();
        state.admin.modal = null;
        const msgs = {
          confirmed: 'Seña aprobada · Turno confirmado en vivo',
          completed: 'Turno marcado como completado',
          cancelled: 'Turno cancelado y horario liberado'
        };
        showToast(msgs[a.status] || 'Estado actualizado');
        render();
      }
    } else if (action === 'save-service') {
      const form = document.getElementById('svc-form');
      if (!form) return;
      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const price = Number(fd.get('price')) || 0;
      const duration = Number(fd.get('duration')) || 30;
      if (!name) { showToast('Ingresá un nombre'); return; }
      const id = target.dataset.id;
      if (id) {
        const s = tenant.services.find(x => x.id === id);
        if (s) {
          s.categoryId = fd.get('categoryId');
          s.name = name;
          s.price = price;
          s.duration = duration;
          s.desde = fd.get('desde') === 'on';
          s.desc = (fd.get('desc') || '').toString().trim();
        }
      } else {
        tenant.services.push({
          id: 'svc_' + Date.now(),
          categoryId: fd.get('categoryId'),
          name,
          price,
          duration,
          desde: fd.get('desde') === 'on',
          active: true,
          countable: false,
          desc: (fd.get('desc') || '').toString().trim()
        });
      }
      saveTenants();
      state.admin.modal = null;
      showToast('Precio actualizado en el link del cliente');
      render();
    } else if (action === 'save-manual-appt') {
      const form = document.getElementById('manual-appt-form');
      if (!form) return;
      const fd = new FormData(form);
      const clientName = (fd.get('clientName') || '').toString().trim();
      if (!clientName) { showToast('Ingresá el nombre de la clienta'); return; }
      const svc = tenant.services.find(s => s.id === fd.get('serviceId')) || tenant.services[0];
      const date = fd.get('date') || state.admin.selectedDate;
      tenant.appointments.push({
        id: 'MN-' + Math.floor(100 + Math.random() * 899),
        date,
        time: fd.get('time') || '14:30',
        duration: svc.duration || 60,
        clientName,
        clientPhone: (fd.get('clientPhone') || '').toString().trim(),
        clientIg: '',
        items: [{ name: svc.name, price: svc.price, qty: 1, categoryId: svc.categoryId }],
        total: svc.price,
        depositAmount: tenant.bookingRules.depositRequired ? Number(tenant.bookingRules.depositValue) || 0 : 0,
        status: 'confirmed',
        paymentMethod: 'Carga manual',
        receiptNote: 'Agendado manualmente desde el panel',
        designRef: '',
        notes: '',
        isMine: false
      });
      state.admin.selectedDate = date;
      saveTenants();
      state.admin.modal = null;
      showToast('Turno agendado en la agenda');
      render();
    } else if (action === 'save-block-slot') {
      const form = document.getElementById('block-form');
      if (!form) return;
      const fd = new FormData(form);
      const date = fd.get('date') || state.admin.selectedDate;
      tenant.appointments.push({
        id: 'BLK-' + Math.floor(100 + Math.random() * 899),
        date,
        time: fd.get('time') || '12:00',
        duration: Number(fd.get('duration')) || 60,
        clientName: 'Horario bloqueado',
        clientPhone: '',
        clientIg: '',
        items: [],
        total: 0,
        depositAmount: 0,
        status: 'blocked',
        paymentMethod: '',
        receiptNote: '',
        designRef: '',
        notes: (fd.get('notes') || '').toString().trim(),
        isMine: false
      });
      state.admin.selectedDate = date;
      saveTenants();
      state.admin.modal = null;
      showToast('Horario bloqueado');
      render();
    } else if (action === 'save-work') {
      const form = document.getElementById('work-form');
      if (!form) return;
      const fd = new FormData(form);
      const title = (fd.get('title') || '').toString().trim();
      if (!title) { showToast('Ingresá un título'); return; }
      const svc = tenant.services.find(s => s.id === fd.get('serviceId')) || tenant.services[0];
      const fileInput = document.getElementById('new-work-file');
      const finishSave = (imgDataUrl) => {
        tenant.portfolio = tenant.portfolio || [];
        tenant.portfolio.unshift({
          id: 'w_' + Date.now(),
          title,
          serviceId: svc.id,
          serviceName: svc.name,
          extraSummary: (fd.get('extraSummary') || '').toString().trim() || `${formatARS(svc.price)}`,
          priceHint: formatARS(svc.price),
          src: imgDataUrl || '',
          gradient: `linear-gradient(135deg, ${tenant.theme.primarySoft}, ${tenant.theme.primary})`,
          featured: true
        });
        saveTenants();
        state.admin.modal = null;
        showToast('Trabajo publicado en la galería del cliente');
        render();
      };

      if (fileInput && fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = ev => finishSave(ev.target.result);
        reader.readAsDataURL(fileInput.files[0]);
      } else {
        finishSave('');
      }
    } else if (action === 'delete-work') {
      tenant.portfolio = (tenant.portfolio || []).filter(w => w.id !== target.dataset.id);
      saveTenants();
      showToast('Trabajo eliminado de la galería');
      render();
    }

    // ---- Rules & Schedule ----
    else if (action === 'rule-toggle') {
      const k = target.dataset.key;
      tenant.bookingRules[k] = !tenant.bookingRules[k];
      saveTenants();
      showToast('Regla actualizada en el link del cliente');
      render();
    } else if (action === 'schedule-toggle') {
      const dayKey = Number(target.dataset.day);
      const d = tenant.schedule.days.find(x => x.key === dayKey);
      if (d) {
        d.enabled = !d.enabled;
        saveTenants();
        render();
      }
    }

    // ---- Client Link Templates & Brand Customization ----
    else if (action === 'apply-template') {
      const tpl = window.CLIENT_TEMPLATES.find(x => x.id === target.dataset.tpl);
      if (tpl) {
        Object.assign(tenant.theme, {
          templateId: tpl.id,
          primary: tpl.primary,
          primaryDark: tpl.primaryDark,
          primarySoft: tpl.primarySoft,
          bg: tpl.bg,
          surface: tpl.surface,
          accent: tpl.accent,
          text: tpl.text,
          muted: tpl.muted,
          isDark: tpl.isDark,
          fontId: tpl.fontId,
          radiusId: tpl.radiusId
        });
        saveTenants();
        showToast(`Plantilla "${tpl.name}" aplicada al link del cliente`);
        render();
      }
    } else if (action === 'brand-font') {
      tenant.theme.fontId = target.dataset.val;
      saveTenants();
      render();
    } else if (action === 'brand-header-toggle') {
      tenant.theme.headerStyle = tenant.theme.headerStyle === 'banner' ? 'circular' : 'banner';
      saveTenants();
      render();
    } else if (action === 'brand-toggle') {
      const k = target.dataset.key;
      tenant.theme[k] = !tenant.theme[k];
      saveTenants();
      render();
    }
  });

  document.addEventListener('change', (e) => {
    const el = e.target;
    const tenant = getTenant();

    if (el.id === 'tenant-switcher') {
      state.activeTenantId = el.value;
      const nextTenant = getTenant();
      state.client.activeCategory = nextTenant.categories[0].id;
      state.client.portfolioFilter = 'all';
      state.client.cart = { mainServiceId: null, retiroId: null, extras: {}, selectedWork: null };
      state.client.wizard.open = false;
      state.client.lightboxWorkId = null;
      state.admin.modal = null;
      state.admin.serviceCatFilter = 'all';
      showToast(`Cambiado a ${nextTenant.name}`);
      render();
      return;
    }

    if (el.dataset.actionChange === 'wiz-policy') {
      state.client.wizard.acceptedPolicy = el.checked;
      render();
    } else if (el.dataset.actionChange === 'upload-ref-photo' && el.files && el.files[0]) {
      const reader = new FileReader();
      reader.onload = ev => {
        state.client.wizard.customDesignImg = ev.target.result;
        state.client.wizard.designRef = 'Foto propia adjunta';
        showToast('Foto de referencia cargada');
        render();
      };
      reader.readAsDataURL(el.files[0]);
    } else if (el.dataset.actionChange === 'rule-input') {
      const k = el.dataset.key;
      tenant.bookingRules[k] = el.type === 'number' ? Number(el.value) : el.value;
      saveTenants();
      render();
    }
  });

  document.addEventListener('input', (e) => {
    const el = e.target;
    const tenant = getTenant();

    if (el.dataset.bind === 'wiz-name') state.client.wizard.name = el.value;
    else if (el.dataset.bind === 'wiz-phone') state.client.wizard.phone = el.value;
    else if (el.dataset.bind === 'wiz-ig') state.client.wizard.ig = el.value;
    else if (el.dataset.bind === 'wiz-notes') state.client.wizard.notes = el.value;
    else if (el.dataset.actionInput === 'brand-color') {
      const k = el.dataset.key;
      tenant.theme[k] = el.value;
      tenant.theme.templateId = 'custom';
      if (k === 'bg') {
        tenant.theme.isDark = !isLightColor(el.value);
        tenant.theme.surface = tenant.theme.isDark ? '#1D1922' : '#FFFFFF';
        tenant.theme.text = tenant.theme.isDark ? '#FAF5EE' : '#26141F';
        tenant.theme.muted = tenant.theme.isDark ? '#ACA2B5' : '#7B5E6F';
      }
      saveTenants();
      // Only update the Client phone screen — Admin stays neutral SaaS!
      const vars = getClientThemeVars(tenant);
      document.querySelectorAll('.phone-screen:not(.admin-saas)').forEach(scr => {
        scr.setAttribute('style', vars);
        scr.classList.toggle('is-dark', !!tenant.theme.isDark);
      });
    } else if (el.dataset.actionInput === 'tenant-text') {
      tenant[el.dataset.key] = el.value;
      saveTenants();
      if (state.viewMode === 'split') {
        const clientScr = document.querySelector('[data-scroll-id="client-scroll"]');
        if (clientScr) {
          const cart = getCartSummary(tenant);
          if (state.client.tab === 'home') clientScr.innerHTML = renderClientHome(tenant, cart);
        }
      }
    }
  });

  render();
})();
