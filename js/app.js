(() => {
  const view = document.getElementById("view");
  const homeBtn = document.getElementById("homeBtn");

  /* ---------- Router (hash based, works on GitHub Pages) ---------- */
  function render() {
    const route = (location.hash.replace("#/", "") || "home").split("?")[0];
    const page = PAGES[route] || PAGES.home;
    view.innerHTML = page();
    homeBtn.hidden = route === "home";
    if (route === "home") setupTiles();
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
      ripple(el, e);
      setTimeout(() => go(el.dataset.route), 220);
    } else go(el.dataset.route);
  });

  /* ---------- 3D tilt + specular highlight on tiles ---------- */
  function setupTiles() {
    view.querySelectorAll(".tile").forEach(tile => {
      const move = e => {
        const r = tile.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        tile.style.setProperty("--ry", ((x - .5) * 10).toFixed(2) + "deg");
        tile.style.setProperty("--rx", ((.5 - y) * 10).toFixed(2) + "deg");
        tile.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        tile.style.setProperty("--my", (y * 100).toFixed(1) + "%");
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
    lb.innerHTML = `<img src="${src}" alt="">`;
    lb.addEventListener("click", () => lb.remove());
    document.body.appendChild(lb);
  }

  /* ---------- Floating Aero bubbles ---------- */
  const bubbles = document.querySelector(".bubbles");
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("span");
    const size = 30 + Math.random() * 110;
    b.className = "bubble";
    b.style.width = b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "%";
    b.style.animationDuration = 14 + Math.random() * 18 + "s";
    b.style.animationDelay = -Math.random() * 30 + "s";
    b.style.opacity = .35 + Math.random() * .5;
    bubbles.appendChild(b);
  }

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
