/* Visitor check-in (الزيارة للمدرسة).
   Opens with an animated welcome line, then the "who are you" signs drop down on ropes.
   Steps: who → purpose → who you came to see → name and phone → thank-you with a visit number.
   Each visit is saved on this screen (localStorage, key "visitLog"); staff see it in the
   staff log (hold the welcome line for 3 seconds). Text and choices live in config.js → visit. */
(() => {
  const KEY = "visitLog";
  const { esc, clean, dateText, timeText, sameDay } = REC;
  const V = () => APP_CONFIG.visit;
  let doneTimer = null;

  const VICONS = {
    family: '<circle cx="8" cy="6" r="2.6"/><circle cx="16.5" cy="8.5" r="2"/><path d="M3.5 20v-4a4.5 4.5 0 0 1 9 0v4M13 20v-3a3.5 3.5 0 0 1 7 0v3"/>',
    badge: '<rect x="4" y="3" width="16" height="18" rx="2.5"/><circle cx="12" cy="10" r="3"/><path d="M8 17c.8-1.8 2.2-2.6 4-2.6s3.2.8 4 2.6M10 3v2h4V3"/>',
    box: '<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9M7.5 5.2l9 4.6"/>',
    cap: ICONS.cap,
  };
  const pad = n => String(n).padStart(3, "0");

  /* a rope pair + rings, shared by the signs and the hanging sheet */
  const ropes = `<svg class="ropes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path class="base" d="M50 0 14 100M50 0 86 100"/><path class="twist" d="M50 0 14 100M50 0 86 100"/></svg><span class="hook"></span>`;

  PAGES.visit = () => {
    // both lines play the same word-by-word animation; the second starts after a short pause
    const split = (text, from) => text.split(" ").map((w, i) => `<span class="w" style="--w:${from + i}">${esc(w)}</span>`).join(" ");
    const n1 = V().welcome.split(" ").length;
    const words = split(V().welcome, 0), words2 = split(V().welcomeSub, n1 + 2);
    const settleAt = .15 + (n1 + 2 + V().welcomeSub.split(" ").length) * .13 + .5;
    return `
    <section class="page visit intro" style="--settle:${settleAt.toFixed(2)}s">
      <img class="pic" src="assets/img/visit.webp" alt="">
      <span class="tint"></span><span class="shade"></span><span class="grain"></span>
      <span class="motes" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<i style="--m:${i}"></i>`).join("")}</span>
      <header class="vs-hello">
        <h1 id="vsTitle">${words}</h1>
        <p class="vs-sub">${words2}</p>
      </header>
      <div class="vs-rail" aria-hidden="true"><i></i><i></i></div>
      <div class="vs-stage" id="vsStage"></div>
    </section>`;
  };

  PAGES.visit.init = root => {
    clearTimeout(doneTimer);
    const page = root.querySelector(".visit");
    const stage = root.querySelector("#vsStage");
    const rec = {};
    let first = true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* lift whatever hangs now, then drop the next thing */
    const lift = () => {
      const items = [...stage.querySelectorAll(".hang")];
      if (!items.length || reduced) return Promise.resolve();
      return Promise.all(items.map((el, i) => el.animate(
        [{ translate: "0 0" }, { translate: "0 18px", offset: .25 }, { translate: "0 -120vh" }],
        { duration: 650, delay: i * 50, easing: "cubic-bezier(.55,0,.7,.2)", fill: "forwards" }).finished));
    };
    const hang = async (html, compact = true) => {
      stage.dataset.busy = 1;
      await lift();
      delete stage.dataset.busy;
      page.classList.toggle("compact", compact);
      stage.innerHTML = html;
      if (first) { first = false; stage.classList.add("first"); }
      else stage.classList.remove("first");
    };

    /* step 1: who are you, as signs on ropes */
    const who = () => hang(`
      <div class="vs-signs">
        ${V().types.map((t, i) => `
        <button class="hang sign" data-type="${t.id}" style="--i:${i};--rope0:${[10, 7, 12, 8][i % 4]}vh">
          ${ropes}<span class="card"><span class="n">0${i + 1}</span>${ICON(VICONS[t.icon] || ICONS.cap, "ic")}<span class="t">${esc(t.label)}</span></span>
        </button>`).join("")}
      </div>
      <p class="vs-tip">اختر صفتك للبدء</p>`, false);

    /* steps 2-5 sit on one paper sheet hanging from the rail */
    const sheet = (step, title, body) => hang(`
      <div class="hang board" style="--i:0;--rope:clamp(40px, 6vh, 64px)">${ropes}
        <div class="sheet swap-in">
          <div class="kicker">تسجيل زيارة<span>${step}</span></div>
          <h1>${title}</h1>${body}
        </div>
      </div>`);
    const back = to => `<button class="lv-back" data-go="${to}">رجوع</button>`;

    const purpose = () => sheet(rec.typeLabel, "ما سبب زيارتك؟", `
      <div class="vs-grid">${V().purposes.map((p, i) =>
        `<button class="vs-opt" data-purpose="${p.id}" style="--k:${i}"><span>${esc(p.label)}</span></button>`).join("")}</div>
      <div class="lv-actions">${back("who")}</div>`);

    const host = () => sheet(rec.purposeLabel, "من تودّ مقابلته؟", `
      <div class="vs-grid">${V().hosts.map((h, i) =>
        `<button class="vs-opt" data-host="${esc(h)}" style="--k:${i}"><span>${esc(h)}</span></button>`).join("")}</div>
      <div class="lv-actions">${back("purpose")}</div>`);

    const details = async () => {
      const parent = rec.type === "parent";
      await sheet(rec.host || rec.purposeLabel, "عرّفنا بك", `
      <form class="lv-form vs-form" id="vsForm" autocomplete="off">
        <label>الاسم<input id="vsName" type="text" maxlength="80" enterkeyhint="next" placeholder="اسمك الكامل"></label>
        <label>رقم الجوال<input id="vsPhone" class="ltr" type="tel" inputmode="numeric" maxlength="14" enterkeyhint="${parent ? "next" : "done"}" placeholder="05xxxxxxxx"></label>
        ${parent ? `<label><span>اسم الطالب <small>(اختياري)</small></span><input id="vsStudent" type="text" maxlength="80" enterkeyhint="done" placeholder="اسم ابنك في المدرسة"></label>` : ""}
        <div class="lv-err" id="vsErr" hidden></div>
        <div class="lv-actions"><button class="lv-primary" type="submit">تسجيل الزيارة</button>${back(rec.hostStep ? "host" : "purpose")}</div>
      </form>`);
      const f = stage.querySelector("#vsForm");
      const name = f.querySelector("#vsName"), phone = f.querySelector("#vsPhone"), student = f.querySelector("#vsStudent");
      setTimeout(() => name.focus(), 500);
      f.addEventListener("submit", e => {
        e.preventDefault();
        const err = f.querySelector("#vsErr");
        f.querySelectorAll(".bad").forEach(x => x.classList.remove("bad"));
        const fail = (el, msg) => { err.textContent = msg; err.hidden = false; el.classList.add("bad"); el.focus(); };
        const n = clean(name.value);
        const p = phone.value.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[^\d+]/g, "");
        if (n.split(" ").length < 2) return fail(name, "اكتب اسمك الأول واسم العائلة على الأقل.");
        if (!/^(05\d{8}|\+?9665\d{8})$/.test(p)) return fail(phone, "اكتب رقم جوال صحيحًا يبدأ بـ ٠٥ ويتكوّن من ١٠ أرقام.");
        document.activeElement?.blur();
        const now = new Date();
        const num = REC.load(KEY).filter(r => sameDay(new Date(r.at), now)).length + 1;
        const data = { type: rec.type, typeLabel: rec.typeLabel, purpose: rec.purpose, purposeLabel: rec.purposeLabel,
          host: rec.host || "", name: n, phone: p, student: student ? clean(student.value) : "", num, at: now.toISOString(), out: null };
        REC.save(KEY, data);
        done(data, now);
      });
    };

    const done = async (r, now) => {
      const secs = V().doneSeconds || 8;
      await sheet("تمّ", `أهلًا بك، ${esc(r.name.split(" ")[0])}`, `
      <div class="vs-done">
        <div class="vs-ticket"><small>رقم زيارتك</small><b>${pad(r.num)}</b></div>
        <div class="vs-info">
          <div class="lv-check"><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/><path d="m15 27 7 7 15-16"/></svg></div>
          <p class="lv-saved">سُجّلت زيارتك${r.host ? ` لمقابلة ${esc(r.host)}` : ""}<br><small>${dateText(now)} · ${timeText(now)}</small></p>
          <p class="lv-note">تفضّل إلى الاستقبال وأخبرهم برقم زيارتك.</p>
        </div>
      </div>
      <div class="vs-end"><div class="lv-count"><i style="animation-duration:${secs}s"></i></div>
        <button class="lv-back" data-go="home">العودة للرئيسية الآن</button></div>
      </div>`);
      doneTimer = setTimeout(() => { if (location.hash.startsWith("#/visit")) location.hash = ""; }, secs * 1000);
    };

    stage.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b || stage.dataset.busy) return;
      const { type, purpose: pid, host: h, go } = b.dataset;
      if (type) {
        const t = V().types.find(x => x.id === type);
        Object.assign(rec, { type, typeLabel: t.label });
        b.classList.add("picked");
        purpose();
      } else if (pid) {
        const p = V().purposes.find(x => x.id === pid);
        Object.assign(rec, { purpose: pid, purposeLabel: p.label, hostStep: p.host !== false, host: "" });
        rec.hostStep ? host() : details();
      } else if (h) { rec.host = h; details(); }
      else if (go === "home") { clearTimeout(doneTimer); location.hash = ""; }
      else if (go === "who") who();
      else if (go === "purpose") purpose();
      else if (go === "host") host();
    });

    /* a touch on a sign or the sheet makes it swing a little */
    stage.addEventListener("pointerdown", e => {
      const el = e.target.closest(".hang");
      if (!el || reduced || e.target.closest("input")) return;
      const r = el.getBoundingClientRect();
      const dir = e.clientX < r.left + r.width / 2 ? 1 : -1;
      const amp = el.classList.contains("board") ? 1.2 : 5;
      el.animate([0, 1, -.7, .4, -.2, 0].map(k => ({ rotate: `${k * amp * dir}deg` })), { duration: 1200, easing: "ease-out", composite: "add" });
    });

    REC.staffHold(page, "#vsTitle", "visit");
    setTimeout(() => page.classList.remove("intro"), (parseFloat(page.style.getPropertyValue("--settle")) + 1.1) * 1000);
    who();
  };
})();
