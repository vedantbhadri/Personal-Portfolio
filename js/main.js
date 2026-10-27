(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Header + mobile menu ---------- */
  const header = $("[data-header]");
  const syncHeader = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  const menuBtn = $("[data-menu-btn]");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menuBtn?.setAttribute("aria-expanded", String(open));
  };
  menuBtn?.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $("[data-mobile-menu]")?.addEventListener("click", (e) => e.target.matches("a") && setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ---------- Active nav link while scrolling ---------- */
  const navLinks = $$("[data-nav] a[href^='#']");
  if (navLinks.length && "IntersectionObserver" in window) {
    const byId = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = byId.get(entry.target.id);
        if (link && entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- Generative card illustrations ---------- */
  const ppg = (p) => {
    // One cardiac cycle: systolic peak + dicrotic wave, phase p in [0, 1)
    const g = (x, mu, s) => Math.exp(-((x - mu) ** 2) / (2 * s * s));
    return g(p, 0.16, 0.055) + 0.38 * g(p, 0.43, 0.07) - 0.06 * g(p, 0.33, 0.025);
  };

  const visuals = {
    signal() {
      const pts = [];
      for (let x = 0; x <= 400; x += 2) {
        const y = 128 - ppg((x / 92) % 1) * 70 - Math.sin(x / 70) * 6;
        pts.push(`${x},${y.toFixed(1)}`);
      }
      const line = pts.join(" ");
      return `
        <defs><linearGradient id="sg" x1="0" x2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".15"/><stop offset=".6" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient>
        <linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".16"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
        ${[50, 90, 130, 170].map((y) => `<line x1="0" x2="400" y1="${y}" y2="${y}" class="v-grid"/>`).join("")}
        <polygon points="0,200 ${line} 400,200" fill="url(#sf)"/>
        <polyline points="${line}" fill="none" stroke="url(#sg)" stroke-width="2.5" stroke-linejoin="round" class="v-draw"/>
        <circle cx="336" cy="${(128 - ppg((336 / 92) % 1) * 70 - Math.sin(336 / 70) * 6).toFixed(1)}" r="5" class="v-dot"/>`;
    },
    network() {
      const layers = [[40, 80, 120, 160], [60, 100, 140], [50, 90, 130, 170], [100]];
      const xs = [70, 165, 260, 345];
      let edges = "", nodes = "";
      layers.forEach((ys, li) => {
        ys.forEach((y, ni) => {
          if (li < layers.length - 1) {
            layers[li + 1].forEach((y2, nj) => {
              const hot = (ni + nj + li) % 3 === 0;
              edges += `<line x1="${xs[li]}" y1="${y}" x2="${xs[li + 1]}" y2="${y2}" class="${hot ? "v-edge-hot" : "v-edge"}"/>`;
            });
          }
          nodes += `<circle cx="${xs[li]}" cy="${y}" r="${li === 3 ? 9 : 6}" class="${li === 3 || (ni + li) % 2 ? "v-node-hot" : "v-node"}"/>`;
        });
      });
      return edges + nodes;
    },
    route() {
      const stops = [[60, 150], [105, 70], [170, 120], [215, 45], [280, 95], [330, 40], [350, 150], [250, 165], [150, 175]];
      const path = stops.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ") + " Z";
      return `
        ${[...Array(9)].map((_, i) => `<line x1="${i * 50}" x2="${i * 50}" y1="0" y2="200" class="v-grid"/>`).join("")}
        ${[...Array(5)].map((_, i) => `<line x1="0" x2="400" y1="${i * 50}" y2="${i * 50}" class="v-grid"/>`).join("")}
        <path d="${path}" fill="none" class="v-route v-draw"/>
        ${stops.map(([x, y], i) => i === 0
          ? `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" rx="5" class="v-node-hot"/>`
          : `<circle cx="${x}" cy="${y}" r="6" class="v-node"/>`).join("")}`;
    },
    grid() {
      let out = "";
      const hot = new Set([2, 9, 13, 16]);
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 6; c++) {
          const i = r * 6 + c;
          out += `<rect x="${44 + c * 54}" y="${28 + r * 50}" width="44" height="40" rx="8" class="${i === 0 ? "v-query" : hot.has(i) ? "v-node-hot" : "v-tile"}"/>`;
        }
      }
      return out + `<text x="66" y="54" class="v-label" text-anchor="middle">q</text>`;
    },
    terminal() {
      const rows = [[0, 120, "v-kw"], [1, 180, "v-line"], [1, 140, "v-line"], [2, 90, "v-kw"], [2, 160, "v-line"], [1, 110, "v-line"], [0, 70, "v-kw"]];
      return `
        <rect x="40" y="22" width="320" height="160" rx="12" class="v-window"/>
        <circle cx="60" cy="40" r="4" class="v-chrome"/><circle cx="74" cy="40" r="4" class="v-chrome"/><circle cx="88" cy="40" r="4" class="v-chrome"/>
        ${rows.map(([ind, w, cls], i) => `<rect x="${64 + ind * 18}" y="${60 + i * 16}" width="${w}" height="7" rx="3.5" class="${cls}"/>`).join("")}
        <rect x="${64 + 70 + 6}" y="${60 + 6 * 16 - 1}" width="8" height="10" class="v-caret"/>`;
    },
    menu() {
      return `
        <rect x="70" y="20" width="160" height="165" rx="12" class="v-window"/>
        ${[0, 1, 2, 3].map((i) => `
          <rect x="88" y="${42 + i * 34}" width="${90 - i * 8}" height="7" rx="3.5" class="v-kw"/>
          <rect x="88" y="${54 + i * 34}" width="${120 - (i % 2) * 22}" height="5" rx="2.5" class="v-line"/>`).join("")}
        <g class="v-pills">
          <rect x="250" y="40" width="86" height="26" rx="13" class="v-node-hot"/><text x="293" y="57" text-anchor="middle" class="v-pill-text">GLUTEN</text>
          <rect x="250" y="76" width="70" height="26" rx="13" class="v-tile"/><text x="285" y="93" text-anchor="middle" class="v-pill-text dark">DAIRY</text>
          <rect x="250" y="112" width="78" height="26" rx="13" class="v-tile"/><text x="289" y="129" text-anchor="middle" class="v-pill-text dark">NUTS</text>
          <rect x="250" y="148" width="58" height="26" rx="13" class="v-query"/><text x="279" y="165" text-anchor="middle" class="v-pill-text">中文</text>
        </g>`;
    },
    kanban() {
      // Four columns of cards, one card mid-drag, plus an AI chat bubble
      const cols = [[3, 0], [2, 1], [3, 0], [1, 0]];
      let out = "";
      cols.forEach(([n], c) => {
        const x = 34 + c * 82;
        out += `<rect x="${x}" y="26" width="72" height="150" rx="10" class="v-col"/>`;
        out += `<rect x="${x + 10}" y="36" width="${28 + (c % 2) * 12}" height="5" rx="2.5" class="v-line"/>`;
        for (let i = 0; i < n; i++) {
          out += `<rect x="${x + 7}" y="${50 + i * 34}" width="58" height="28" rx="6" class="v-tile"/>`;
          out += `<rect x="${x + 14}" y="${58 + i * 34}" width="${30 + ((i + c) % 3) * 6}" height="4" rx="2" class="v-kw"/>`;
          out += `<rect x="${x + 14}" y="${66 + i * 34}" width="36" height="3" rx="1.5" class="v-line"/>`;
        }
      });
      return out + `
        <g transform="rotate(-6 150 128)">
          <rect x="122" y="110" width="62" height="30" rx="6" class="v-drag"/>
          <rect x="130" y="119" width="34" height="4" rx="2" class="v-drag-ink"/>
          <rect x="130" y="127" width="40" height="3" rx="1.5" class="v-drag-ink" opacity=".6"/>
        </g>
        <rect x="300" y="132" width="78" height="40" rx="12" class="v-bubble"/>
        <path d="M312 172l-6 10 16-10z" class="v-bubble"/>
        <text x="339" y="157" text-anchor="middle" class="v-pill-text">AI ✦</text>`;
    },
    caption() {
      // A photo frame with an attention heat patch, and the generated caption below it
      return `
        <rect x="70" y="20" width="170" height="118" rx="10" class="v-photo"/>
        <path d="M70 118l46-38 34 26 28-20 62 32v10a10 10 0 0 1-10 10H80a10 10 0 0 1-10-10z" class="v-hill"/>
        <circle cx="206" cy="46" r="11" class="v-sun"/>
        <circle cx="138" cy="86" r="30" class="v-heat"/>
        <circle cx="138" cy="86" r="14" class="v-heat-core"/>
        <rect x="70" y="150" width="210" height="32" rx="16" class="v-bubble-cap"/>
        <text x="86" y="171" class="v-cap-text">"a dog running on grass"</text>
        <g class="v-scores">
          <rect x="262" y="26" width="76" height="22" rx="11" class="v-tile"/><text x="300" y="41" text-anchor="middle" class="v-pill-text dark">CIDEr .84</text>
          <rect x="262" y="56" width="76" height="22" rx="11" class="v-tile"/><text x="300" y="71" text-anchor="middle" class="v-pill-text dark">BLEU-4 .29</text>
          <rect x="262" y="86" width="76" height="22" rx="11" class="v-node-hot"/><text x="300" y="101" text-anchor="middle" class="v-pill-text">5,000 imgs</text>
        </g>`;
    },
    signs() {
      // Six sign classes on the left, mapped to a navigation pad on the right
      const labels = ["B", "F", "L", "R", "S", "∅"];
      let tiles = "";
      labels.forEach((l, i) => {
        const x = 40 + (i % 3) * 50, y = 44 + Math.floor(i / 3) * 58;
        const hot = l === "L";
        tiles += `<rect x="${x}" y="${y}" width="42" height="48" rx="9" class="${hot ? "v-node-hot" : "v-tile"}"/>`;
        tiles += `<text x="${x + 21}" y="${y + 31}" text-anchor="middle" class="v-sign${hot ? " is-hot" : ""}">${l}</text>`;
      });
      const pad = [[300, 52, "M300 44l9 12h-18z"], [300, 148, "M300 156l9-12h-18z"], [252, 100, "M244 100l12-9v18z"], [348, 100, "M356 100l-12-9v18z"]];
      return `
        ${tiles}
        <path d="M200 100h30" class="v-arrow"/><path d="M226 94l8 6-8 6" class="v-arrow"/>
        <circle cx="300" cy="100" r="62" class="v-col"/>
        ${pad.map(([cx, cy, d], i) => `<circle cx="${cx}" cy="${cy}" r="17" class="${i === 2 ? "v-node-hot" : "v-tile"}"/><path d="${d}" class="${i === 2 ? "v-pad-ink is-hot" : "v-pad-ink"}"/>`).join("")}
        <rect x="286" y="86" width="28" height="28" rx="7" class="v-stop"/>
        <text x="300" y="186" text-anchor="middle" class="v-pill-text">TURN LEFT</text>`;
    },
    arena() {
      // First-person view: perspective floor, obstacles, a drone and the crosshair
      let floor = "";
      for (let i = -6; i <= 6; i++) floor += `<line x1="200" y1="96" x2="${200 + i * 70}" y2="200" class="v-floor"/>`;
      [112, 130, 156, 196].forEach((y) => { floor += `<line x1="0" y1="${y}" x2="400" y2="${y}" class="v-floor"/>`; });
      return `
        <rect x="0" y="0" width="400" height="96" class="v-sky"/>
        ${floor}
        <rect x="46" y="70" width="58" height="62" class="v-block"/>
        <rect x="296" y="78" width="70" height="50" class="v-block"/>
        <rect x="150" y="86" width="26" height="22" class="v-block"/>
        <circle cx="330" cy="150" r="7" class="v-heal"/><path d="M330 146v8M326 150h8" class="v-heal-x"/>
        <g class="v-drone">
          <path d="M240 52l14 12-14 12-14-12z" class="v-node-hot"/>
          <line x1="214" y1="64" x2="266" y2="64" class="v-edge-hot"/>
        </g>
        <circle cx="200" cy="100" r="14" class="v-cross"/>
        <path d="M200 80v10M200 110v10M180 100h10M210 100h10" class="v-cross"/>
        <rect x="16" y="14" width="80" height="6" rx="3" class="v-line"/><rect x="16" y="14" width="56" height="6" rx="3" class="v-kw"/>`;
    }
  };

  const icon = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2.25c-5.38 0-9.75 4.37-9.75 9.75 0 4.31 2.8 7.96 6.68 9.25.49.09.67-.21.67-.47v-1.69c-2.72.59-3.3-1.16-3.3-1.16-.44-1.13-1.08-1.43-1.08-1.43-.88-.6.07-.59.07-.59.98.07 1.49 1 1.49 1 .86 1.48 2.27 1.05 2.82.8.09-.62.34-1.05.61-1.29-2.17-.25-4.45-1.09-4.45-4.83 0-1.07.38-1.94 1-2.62-.1-.25-.44-1.25.1-2.59 0 0 .82-.26 2.68 1a9.18 9.18 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .54 1.34.2 2.34.1 2.59.62.68 1 1.55 1 2.62 0 3.75-2.29 4.58-4.46 4.82.35.3.66.89.66 1.8v2.67c0 .26.18.56.68.47A9.76 9.76 0 0 0 21.75 12c0-5.38-4.37-9.75-9.75-9.75Z"/></svg>',
    report: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.75h5l3 3v9.5H4z"/><path d="M9 1.75v3h3M6 8.5h4M6 11h4"/></svg>',
    demo: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5"/></svg>'
  };

  const linkLabels = { github: "Code", report: "Report", demo: "Live demo" };

  const renderCard = (p) => {
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([k, url]) => `<a class="card-link" href="${url}" target="_blank" rel="noopener">${icon[k] || icon.demo}${linkLabels[k] || k}</a>`)
      .join("");
    return `
      <article class="card ${p.highlight ? "card-hero" : ""} reveal" data-tags="${[p.category, ...(p.tags || [])].join("|")}">
        <div class="card-visual vis-${p.visual}">
          <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${(visuals[p.visual] || visuals.grid)()}</svg>
          <span class="card-cat${p.category === "Vibe Coding" ? " card-cat-vibe" : ""}">${p.category === "Vibe Coding" ? "✦ " : ""}${p.category}</span>
        </div>
        <div class="card-body">
          <p class="card-meta mono"><span>${p.status}</span><span>${p.date}</span></p>
          <h3>${p.title}</h3>
          <p class="card-desc">${p.description}</p>
          <p class="tags">${p.stack.map((s) => `<span>${s}</span>`).join("")}</p>
          ${links ? `<div class="card-links">${links}</div>` : ""}
        </div>
      </article>`;
  };

  const wireSpotlight = (root) => {
    $$(".card, .tile", root).forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  };

  /* ---------- Scroll reveal ---------- */
  let revealObserver = null;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("has-motion");
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  }
  const observeReveals = (root = document) => {
    $$(".reveal:not(.is-in)", root).forEach((el, i) => {
      el.style.setProperty("--d", `${Math.min(i, 6) * 70}ms`);
      revealObserver ? revealObserver.observe(el) : el.classList.add("is-in");
    });
  };

  /* ---------- Project grids ---------- */
  const grid = $("[data-projects]");
  if (grid && window.PROJECTS) {
    const mode = grid.dataset.projects;
    const all = window.PROJECTS;
    const countEl = $("[data-count]");
    const emptyEl = $("[data-empty]");
    const state = { filter: "All", q: "" };

    const draw = () => {
      // Home: "All" shows the curated featured set; a specific filter searches every project (max 6)
      const curated = mode === "featured" && state.filter === "All";
      let list = curated ? all.filter((p) => p.featured) : all;
      if (state.filter !== "All") list = list.filter((p) => p.category === state.filter || (p.tags || []).includes(state.filter));
      if (mode === "featured" && !curated) list = list.slice(0, 6);
      if (state.q) {
        const q = state.q.toLowerCase();
        list = list.filter((p) => [p.title, p.description, p.status, ...p.stack].join(" ").toLowerCase().includes(q));
      }
      // On the archive, every card gets equal weight
      grid.innerHTML = list.map((p) => renderCard(curated ? p : { ...p, highlight: false })).join("");
      if (countEl) countEl.textContent = `${list.length} of ${all.length} projects`;
      if (emptyEl) emptyEl.hidden = list.length > 0;
      wireSpotlight(grid);
      observeReveals(grid);
    };

    $$("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("[data-filter]").forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        state.filter = btn.dataset.filter;
        draw();
      });
    });
    $$("[data-total]").forEach((el) => { el.textContent = String(all.length).padStart(2, "0"); });
    $("[data-search]")?.addEventListener("input", (e) => { state.q = e.target.value.trim(); draw(); });
    draw();
  }

  wireSpotlight(document);
  observeReveals();

  /* ---------- Hero live waveform ---------- */
  const canvas = $("[data-wave]");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const css = getComputedStyle(document.documentElement);
    const c1 = css.getPropertyValue("--accent").trim() || "#3b4cff";
    const c2 = css.getPropertyValue("--accent-2").trim() || "#ff6b4a";
    let w = 0, h = 0, t = 0, raf = 0, visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const yAt = (x, time) => {
      const period = Math.max(w / 3.2, 80);
      const phase = ((x + time) / period) % 1;
      const resp = Math.sin((x + time) / (period * 2.7)) * 0.08;
      return h * 0.78 - (ppg(phase) + resp) * h * 0.55;
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const head = w * 0.82;

      const grad = ctx.createLinearGradient(0, 0, head, 0);
      grad.addColorStop(0, "rgba(59,76,255,0)");
      grad.addColorStop(0.55, c1);
      grad.addColorStop(1, c2);

      // area fill
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= head; x += 2) ctx.lineTo(x, yAt(x, t));
      ctx.lineTo(head, h);
      ctx.closePath();
      const fill = ctx.createLinearGradient(0, 0, 0, h);
      fill.addColorStop(0, "rgba(59,76,255,0.14)");
      fill.addColorStop(1, "rgba(59,76,255,0)");
      ctx.fillStyle = fill;
      ctx.fill();

      // trace
      ctx.beginPath();
      for (let x = 0; x <= head; x += 2) x ? ctx.lineTo(x, yAt(x, t)) : ctx.moveTo(x, yAt(x, t));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.25;
      ctx.lineJoin = "round";
      ctx.stroke();

      // leading dot
      const hy = yAt(head, t);
      ctx.beginPath(); ctx.arc(head, hy, 9, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,107,74,0.18)"; ctx.fill();
      ctx.beginPath(); ctx.arc(head, hy, 4, 0, Math.PI * 2);
      ctx.fillStyle = c2; ctx.fill();

      t += 1.4;
      if (!reduceMotion && visible) raf = requestAnimationFrame(frame);
    };

    resize();
    new ResizeObserver(() => { resize(); if (reduceMotion) frame(); }).observe(canvas);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible || reduceMotion) frame();
      }).observe(canvas);
    } else frame();
  }

  /* ---------- Marquee: duplicate for seamless loop ---------- */
  const track = $("[data-marquee]");
  if (track) {
    const copy = track.innerHTML;
    track.innerHTML = copy + copy.replace(/<span>/g, '<span aria-hidden="true">');
  }

  /* ---------- Copy email ---------- */
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const label = $("[data-copy-label]", btn);
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = "Copied!";
      } catch {
        label.textContent = btn.dataset.copy;
      }
      btn.classList.add("is-done");
      setTimeout(() => { label.textContent = "Copy email"; btn.classList.remove("is-done"); }, 2000);
    });
  });

  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
