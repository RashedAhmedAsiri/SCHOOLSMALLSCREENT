(() => {
  const view = document.getElementById("view");
  const homeBtn = document.getElementById("homeBtn");
  const homeHint = document.getElementById("homeHint");

  /* ---------- Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) everywhere on screen ---------- */
  const AR = "٠١٢٣٤٥٦٧٨٩";
  const arDigits = node => {
    const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    for (let t = node.nodeType === 3 ? node : walk.nextNode(); t; t = walk.nextNode()) {
      if (/[0-9%]/.test(t.data)) t.data = t.data.replace(/[0-9]/g, d => AR[d]).replace(/%/g, "٪");
      if (node.nodeType === 3) break;
    }
  };
  new MutationObserver(list => list.forEach(m => {
    if (m.type === "characterData") arDigits(m.target);
    else m.addedNodes.forEach(n => (n.nodeType === 1 || n.nodeType === 3) && arDigits(n));
  })).observe(document.body, { childList: true, subtree: true, characterData: true });
  arDigits(document.body);

  /* ---------- Router (hash based, works on GitHub Pages) ---------- */
  function render() {
    const route = (location.hash.replace("#/", "") || "home").split("?")[0];
    const page = PAGES[route] || PAGES.home;
    view.innerHTML = page();
    homeBtn.hidden = route === "home";
    homeHint.hidden = route !== "home";
    if (route === "home") setupTiles();
    if (page.init) page.init(view);
    const scroller = view.querySelector(".intro");
    if (scroller) scroller.scrollTop = 0;
  }
  function go(route) { location.hash = route === "home" ? "" : "#/" + route; }
  window.addEventListener("hashchange", render);
  homeBtn.addEventListener("click", () => go("home"));

  view.addEventListener("click", e => {
    const zoom = e.target.closest("[data-zoom]");
    if (zoom) return openLightbox(zoom.dataset.zoom);
    const el = e.target.closest("[data-route]");
    if (!el) return;
    if (el.classList.contains("tile")) {
      setTimeout(() => go(el.dataset.route), 160);
    } else go(el.dataset.route);
  });

  /* ---------- 3D tilt + specular highlight on tiles ---------- */
  function setupTiles() {
    view.querySelectorAll(".tile").forEach(tile => {
      const move = e => {
        const r = tile.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        tile.style.setProperty("--ry", ((x - .5) * 5).toFixed(2) + "deg");
        tile.style.setProperty("--rx", ((.5 - y) * 5).toFixed(2) + "deg");
        tile.style.setProperty("--gx", ((x - .5) * 120).toFixed(0) + "px");
      };
      const reset = () => { tile.style.setProperty("--rx", "0deg"); tile.style.setProperty("--ry", "0deg"); tile.classList.remove("pressed"); };
      tile.addEventListener("pointermove", move);
      tile.addEventListener("pointerdown", e => { move(e); tile.classList.add("pressed"); });
      tile.addEventListener("pointerup", reset);
      tile.addEventListener("pointerleave", reset);
      tile.addEventListener("pointercancel", reset);
    });
  }

  function ripple(el, e) {
    const r = el.getBoundingClientRect();
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.left = (e.clientX - r.left) + "px";
    s.style.top = (e.clientY - r.top) + "px";
    el.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }

  function openLightbox(src) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${src}" alt=""><button class="lb-close glass" aria-label="إغلاق">✕</button>`;
    lb.addEventListener("click", () => lb.remove());
    document.body.appendChild(lb);
  }

  /* ---------- Small tap ring for touch feedback ---------- */
  addEventListener("pointerdown", e => {
    const r = document.createElement("span");
    r.className = "tap-ring"; r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px";
    document.body.appendChild(r); setTimeout(() => r.remove(), 550);
  }, { passive: true });

  /* ---------- Clock ---------- */
  const clock = document.getElementById("clock");
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
  };
  tick(); setInterval(tick, 15000);

  /* ---------- Kiosk: back to home when idle ---------- */
  let idleTimer;
  const resetIdle = () => {
    clearTimeout(idleTimer);
    if (APP_CONFIG.idleSeconds > 0) {
      idleTimer = setTimeout(() => {
        document.querySelector(".lightbox")?.remove();
        go("home");
      }, APP_CONFIG.idleSeconds * 1000);
    }
  };
  ["pointerdown", "keydown", "wheel", "touchmove"].forEach(ev => addEventListener(ev, resetIdle, { passive: true }));
  resetIdle();
  addEventListener("contextmenu", e => e.preventDefault());

  /* ---------- Offline support + auto-update ---------- */
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(reg => {
      // check GitHub for a newer version every 5 minutes
      setInterval(() => reg.update(), 5 * 60 * 1000);
    });
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      location.reload();
    });
  }

  render();
})();
