/* Records saved on this screen (localStorage) and the staff log that shows them.
   Two lists: student leave requests ("leaveRequests") and visitor check-ins ("visitLog").
   Staff open the log by holding the title of the leave or visit page for 3 seconds
   (or opening #/staff-log). Each list downloads as a CSV file for Excel. */
window.REC = (() => {
  const load = key => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
  const store = (key, list) => { try { localStorage.setItem(key, JSON.stringify(list)); } catch {} };
  const save = (key, rec) => { const list = load(key); list.push(rec); store(key, list); };
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clean = s => s.replace(/\s+/g, " ").trim();
  const dateText = d => d.toLocaleDateString("ar-SA-u-ca-islamic-umalqura", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const greg = d => d.toLocaleDateString("ar-SA-u-ca-gregory", { day: "numeric", month: "long", year: "numeric" });
  const timeText = d => d.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
  const sameDay = (a, b) => a.toDateString() === b.toDateString();

  /* hold an element for 3 seconds to open the staff log */
  const staffHold = (root, selector, tab) => {
    let hold;
    root.addEventListener("pointerdown", e => {
      if (!e.target.closest(selector)) return;
      hold = setTimeout(() => { location.hash = "#/staff-log?tab=" + tab; }, 3000);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(ev => root.addEventListener(ev, () => clearTimeout(hold)));
  };

  const csv = (name, header, rows) => {
    const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [header, ...rows].map(r => r.map(q).join(","));
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  return { load, store, save, esc, clean, dateText, greg, timeText, sameDay, staffHold, csv };
})();

(() => {
  const { load, store, esc, dateText, greg, timeText, sameDay, csv } = REC;
  const LEAVE = "leaveRequests", VISIT = "visitLog";
  const tabOf = () => (new URLSearchParams(location.hash.split("?")[1] || "").get("tab") === "leave" ? "leave" : "visit");
  const when = d => `${dateText(d)}<small>${greg(d)}</small>`;

  const visitTable = list => {
    const today = new Date();
    const rows = list.map(r => {
      const d = new Date(r.at), out = r.out ? new Date(r.out) : null;
      return `<tr class="${sameDay(d, today) && !out ? "in" : ""}">
        <td><b>${esc(r.name)}</b><small class="ltr">${esc(r.phone)}</small>${r.student ? `<small>الطالب: ${esc(r.student)}</small>` : ""}</td>
        <td>${esc(r.typeLabel)}</td><td>${esc(r.purposeLabel)}</td><td>${esc(r.host || "—")}</td>
        <td>${when(d)}</td><td class="t">${timeText(d)}</td>
        <td class="t">${out ? timeText(out) : `<button class="sl-out" data-out="${r._i}">تسجيل خروج</button>`}</td></tr>`;
    }).join("");
    return `<table><thead><tr><th>الزائر</th><th>الصفة</th><th>الغرض</th><th>المقصود</th><th>التاريخ</th><th>الدخول</th><th>الخروج</th></tr></thead><tbody>${rows}</tbody></table>`;
  };
  const leaveTable = list => `<table><thead><tr><th>اسم الطالب</th><th>المستأذن</th><th>التاريخ</th><th>الوقت</th></tr></thead><tbody>${
    list.map(r => { const d = new Date(r.at); return `<tr><td>${esc(r.name)}</td><td>${esc(r.roleLabel)}</td><td>${when(d)}</td><td class="t">${timeText(d)}</td></tr>`; }).join("")
  }</tbody></table>`;

  PAGES["staff-log"] = () => {
    const tab = tabOf();
    const visits = load(VISIT), leaves = load(LEAVE);
    const today = new Date();
    const inside = visits.filter(r => !r.out && sameDay(new Date(r.at), today)).length;
    const list = (tab === "visit" ? visits : leaves).map((r, i) => ({ ...r, _i: i })).reverse();
    const body = !list.length ? `<p class="lv-empty">لا توجد سجلات محفوظة بعد.</p>`
      : `<div class="lv-table">${tab === "visit" ? visitTable(list) : leaveTable(list)}</div>`;
    return `
    <section class="page staff-log">
      <div class="panel glass">
        <div class="sec-title"><h2>سجل الموظفين</h2>
          <span class="hint">${tab === "visit" ? `${visits.length} زيارة محفوظة · ${inside} زائر داخل المدرسة الآن` : `${leaves.length} طلب استئذان محفوظ`}</span></div>
        <div class="lv-tools">
          <div class="sl-tabs">
            <button class="${tab === "visit" ? "on" : ""}" data-tab="visit">الزيارات <i>${visits.length}</i></button>
            <button class="${tab === "leave" ? "on" : ""}" data-tab="leave">الاستئذان <i>${leaves.length}</i></button>
          </div>
          <button class="glass pill-btn" id="slCsv">تنزيل ملف Excel (CSV)</button>
          <button class="glass pill-btn" data-route="${tab}">رجوع</button>
        </div>
        ${body}
      </div>
    </section>`;
  };

  PAGES["staff-log"].init = root => {
    const tab = tabOf();
    root.addEventListener("click", e => {
      const t = e.target.closest("[data-tab]");
      if (t) return void (location.hash = "#/staff-log?tab=" + t.dataset.tab);
      const o = e.target.closest("[data-out]");
      if (o) {
        const list = load(VISIT), r = list[+o.dataset.out];
        if (r && !r.out) { r.out = new Date().toISOString(); store(VISIT, list); }
        const td = o.parentElement;
        td.textContent = timeText(new Date(r.out));
        td.closest("tr").classList.remove("in");
      }
    });
    root.querySelector("#slCsv").addEventListener("click", () => {
      if (tab === "visit") csv("زيارات", ["الزائر", "الجوال", "الصفة", "الغرض", "المقصود", "اسم الطالب", "التاريخ الهجري", "التاريخ الميلادي", "الدخول", "الخروج"],
        load(VISIT).map(r => { const d = new Date(r.at); return [r.name, r.phone, r.typeLabel, r.purposeLabel, r.host, r.student, dateText(d), greg(d), timeText(d), r.out ? timeText(new Date(r.out)) : ""]; }));
      else csv("استئذان", ["اسم الطالب", "المستأذن", "التاريخ الهجري", "التاريخ الميلادي", "الوقت"],
        load(LEAVE).map(r => { const d = new Date(r.at); return [r.name, r.roleLabel, dateText(d), greg(d), timeText(d)]; }));
    });
  };

  /* the old leave-log address still works */
  PAGES["leave-log"] = () => { setTimeout(() => location.replace("#/staff-log?tab=leave")); return ""; };
})();
