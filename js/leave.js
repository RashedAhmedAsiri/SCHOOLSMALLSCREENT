/* Student leave requests (استئذان الطلاب).
   Who is asking: a student, a parent, or a driver. Each request is saved on this
   screen only (localStorage, key "leaveRequests") with the date and time.
   Staff can see the saved list by holding the page title for 3 seconds
   (the staff log in records.js, #/staff-log?tab=leave). */
(() => {
  const KEY = "leaveRequests";
  const DONE_SECONDS = 5;
  let doneTimer = null;

  const { esc, clean, dateText, timeText } = REC;
  const save = rec => REC.save(KEY, rec);

  const ROLES = {
    student: { label: "أنا طالب", who: "الطالب" },
    parent: { label: "أنا ولي أمر", who: "ولي الأمر" },
    driver: { label: "أنا سائق", who: "السائق" },
  };

  /* ---------- page shell ---------- */
  PAGES.leave = () => `
  <section class="page leave">
    <img class="pic" src="assets/img/teacher.webp" alt="">
    <span class="tint"></span><span class="grain"></span><span class="glare"></span>
    <div class="sheet" id="sheet"></div>
  </section>`;

  PAGES.leave.init = root => {
    clearTimeout(doneTimer);
    const sheet = root.querySelector("#sheet");
    const show = html => { sheet.innerHTML = html; sheet.classList.remove("swap-in"); void sheet.offsetWidth; sheet.classList.add("swap-in"); };
    const head = (step, title) => `<div class="kicker" id="lvTitle">استئذان الطلاب<span>${step}</span></div><h1>${title}</h1>`;
    const backBtn = to => `<button class="lv-back" data-act="${to}">رجوع</button>`;

    /* step 1: who are you */
    const choose = () => show(`
      ${head("", "من أنت؟")}
      <div class="lv-choices">
        ${Object.entries(ROLES).map(([k, r], i) =>
          `<button class="lv-choice" data-role="${k}"><span class="n">0${i + 1}</span><span>${r.label}</span></button>`).join("")}
      </div>`);

    /* student: did the deputy approve? */
    const askDeputy = () => show(`
      ${head("طالب", "هل أخذت الإذن من وكيل شؤون الطلاب؟")}
      <div class="lv-yesno">
        <button class="lv-choice yes" data-act="yes">نعم</button>
        <button class="lv-choice" data-act="no">لا</button>
      </div>
      ${backBtn("choose")}`);

    const goToDeputy = (role) => show(`
      ${head(role === "driver" ? "سائق" : "طالب", "توجّه أولًا إلى وكيل شؤون الطلاب")}
      <p class="lv-note">لا يمكن تسجيل الاستئذان قبل أخذ الإذن من وكيل شؤون الطلاب. بعد أخذ الإذن ارجع إلى هذه الشاشة وسجّل الاستئذان.</p>
      <div class="lv-actions"><button class="lv-primary" data-act="home">العودة للرئيسية</button>${backBtn(role === "driver" ? "driver" : "student")}</div>`);

    /* name entry */
    let role = null;
    const askName = r => {
      role = r;
      const student = r === "student";
      show(`
      ${head(r === "student" ? "طالب" : r === "parent" ? "ولي أمر" : "سائق", student ? "سجّل اسمك الثلاثي" : "سجّل اسم الطالب")}
      ${r === "driver" ? `<p class="lv-note warn">تنبيه: يجب على السائق التوجّه إلى وكيل شؤون الطلاب لأخذ الإذن قبل خروج الطالب.</p>` : ""}
      <form class="lv-form" id="lvForm" autocomplete="off">
        <input id="lvName" type="text" inputmode="text" enterkeyhint="done" maxlength="80"
          placeholder="${student ? "الاسم الأول واسم الأب واسم العائلة" : "اسم الطالب"}" aria-label="${student ? "اسمك الثلاثي" : "اسم الطالب"}">
        <div class="lv-err" id="lvErr" hidden></div>
        <div class="lv-actions"><button class="lv-primary" type="submit">تسجيل الاستئذان</button>${backBtn(student ? "student" : "choose")}</div>
      </form>`);
      const input = sheet.querySelector("#lvName");
      setTimeout(() => input.focus(), 350);
      sheet.querySelector("#lvForm").addEventListener("submit", e => {
        e.preventDefault();
        const name = clean(input.value), err = sheet.querySelector("#lvErr");
        const fail = msg => { err.textContent = msg; err.hidden = false; input.classList.add("bad"); input.focus(); };
        if (name.length < 2) return fail(student ? "اكتب اسمك الثلاثي." : "اكتب اسم الطالب.");
        if (student && name.split(" ").length < 3) return fail("اكتب الاسم الثلاثي كاملًا: اسمك واسم والدك واسم العائلة.");
        input.blur();
        const now = new Date();
        save({ role: r, roleLabel: ROLES[r].who, name, deputyApproved: student ? true : null, at: now.toISOString() });
        done(r, name, now);
      });
    };

    /* end screen, then home after 5 seconds */
    const done = (r, name, now) => {
      show(`
      <div class="lv-done">
        <div class="lv-check"><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/><path d="m15 27 7 7 15-16"/></svg></div>
        <p class="lv-saved">${r === "student" ? "سُجّل استئذانك" : `سُجّل استئذان الطالب ${esc(name)}`}<br><small>${dateText(now)} · ${timeText(now)}</small></p>
        ${r === "driver" ? `<p class="lv-note warn">لا تنسَ التوجّه إلى وكيل شؤون الطلاب لأخذ الإذن.</p>` : ""}
        <h1 class="lv-thanks">شكرًا لك،<br>نلقاكم في صباحٍ دراسيٍّ جديد</h1>
        <div class="lv-count"><i style="animation-duration:${DONE_SECONDS}s"></i></div>
        <button class="lv-back" data-act="home">العودة للرئيسية الآن</button>
      </div>`);
      doneTimer = setTimeout(() => { if (location.hash.startsWith("#/leave")) location.hash = ""; }, DONE_SECONDS * 1000);
    };

    sheet.addEventListener("click", e => {
      const roleBtn = e.target.closest("[data-role]");
      if (roleBtn) {
        const r = roleBtn.dataset.role;
        return r === "student" ? askDeputy() : askName(r);
      }
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (!act) return;
      if (act === "choose") choose();
      else if (act === "student") askDeputy();
      else if (act === "driver") askName("driver");
      else if (act === "yes") askName("student");
      else if (act === "no") goToDeputy("student");
      else if (act === "home") { clearTimeout(doneTimer); location.hash = ""; }
    });

    /* staff: hold the title for 3 seconds to open the staff log */
    REC.staffHold(sheet, "#lvTitle", "leave");

    choose();
  };

})();
