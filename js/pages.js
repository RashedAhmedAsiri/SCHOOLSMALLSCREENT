/* Page templates. Each page is a function that returns HTML.
   A page can also have an .init(root) function that wires up its interactive parts.
   To add a new page: add PAGES.myPage here and point a tile's "route" at "myPage". */
window.PAGES = {};

const ICON = (d, cls = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  code: '<path d="M8 6 2 12l6 6M16 6l6 6-6 6M14 4l-4 16"/>',
  ai: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z"/>',
  robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13v1M15 13v1M9 17h6M2 13v3M22 13v3"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  sprout: '<path d="M12 22V12M12 12C12 7 8 4 3 4c0 5 4 8 9 8zM12 12c0-4 3-7 8-7 0 4-3 7-8 7z"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
};

/* ---------------- Home ---------------- */
PAGES.home = () => {
  const tiles = APP_CONFIG.tiles.map(t => `
    <button class="tile ${t.color}" data-route="${t.route}" aria-label="${t.title}">
      <img class="pic" src="${t.img}" alt="" loading="eager">
      <span class="wash"></span><span class="gloss"></span><span class="spec"></span><span class="shine"></span>
      <span class="label"><span class="title">${t.title}</span><span class="sub">${t.sub}</span></span>
    </button>`).join("");
  return `<section class="page home-grid">${tiles}</section>`;
};

/* ---------------- School intro ---------------- */
const SCHOOL = {
  goals: [
    { c: "c-blue", i: "sprout", t: "الاستثمار في المواهب", d: "الاستثمار في المواهب التقنية الناشئة ورعايتها منذ البداية." },
    { c: "c-orange", i: "bulb", t: "الابتكار والإبداع", d: "التركيز على الابتكار والإبداع التقني في كل ما نتعلمه ونصنعه." },
    { c: "c-green", i: "cap", t: "التمكين والتأهيل", d: "تمكين الطلاب وتأهيلهم للتخصصات التقنية في الجامعة وسوق العمل." },
    { c: "c-purple", i: "trophy", t: "المنافسة العالمية", d: "إعداد الطلاب لتمثيل المملكة في المنافسات العلمية العالمية." },
  ],
  fields: [
    { c: "c-blue", i: "code", t: "البرمجة", d: "بناء التطبيقات والمواقع والألعاب بلغات مثل Python، وتنمية مهارات التفكير الحاسوبي وحل المشكلات." },
    { c: "c-purple", i: "ai", t: "الذكاء الاصطناعي", d: "تعلّم الآلة وتحليل البيانات وبناء نماذج ذكية، وتوظيف أدوات الذكاء الاصطناعي في التعلم وإنتاج المشاريع." },
    { c: "c-orange", i: "robot", t: "الميكاترونيكس", d: "دمج الميكانيكا والإلكترونيات والبرمجة لتصميم الروبوتات والأنظمة الذكية، مثل سيارة الروبوت التي صنعها طلابنا." },
    { c: "c-green", i: "shield", t: "الأمن السيبراني", d: "فهم مفاهيم أمن المعلومات والحماية الرقمية، وكيف نحمي الأنظمة والبيانات من الاختراق." },
  ],
  programs: {
    tuwaiq: [
      { t: "البرمجة بلغة Python", d: "تنمية مهارات البرمجة والتفكير الحاسوبي لدى الطلاب." },
      { t: "الأمن السيبراني", d: "تعزيز وعي الطلاب بمفاهيم أمن المعلومات والحماية الرقمية." },
      { t: "تنمية القدرات (قياس)", d: "تطوير مهارات التحليل والتفكير المنطقي والاستعداد لاختبارات القدرات." },
    ],
    school: [
      { t: "استراتيجيات التدريس العليا", d: "تنمية التفكير النقدي والتحليلي وتعزيز التعلم العميق." },
      { t: "دعم القدرات والتحصيلي", d: "رفع مستوى أداء الطلاب في اختبارات القدرات والتحصيل العلمي." },
      { t: "الذكاء الاصطناعي في التعليم", d: "استخدام أدواته لدعم التعلم التفاعلي وتحليل المحتوى وإنتاج عروض وتطبيقات مبتكرة." },
    ],
  },
  stats: [
    { c: "c-blue", n: 26, cap: "مشروعًا تقنيًا طلابيًا", p: 100 },
    { c: "c-purple", n: 60, suf: "%", cap: "من الطلاب مشاركون في مشاريع ابتكارية", p: 60 },
    { c: "c-green", n: 20, cap: "مشروعًا تقنيًا ضمن برنامج طويق", p: 77 },
    { c: "c-orange", n: 6, cap: "مشاريع رُشّحت لمعرض الشرق الأوسط", p: 40 },
    { c: "c-blue", n: 6, cap: "مشاريع نوعية جديدة في معرض إبداع", p: 40 },
    { c: "c-purple", n: 30, cap: "طالبًا ترشّحوا لأولمبياد نسمو للعلوم والرياضيات", p: 85 },
  ],
  features: ["شراكات وتوقيع اتفاقيات", "برامج مكثفة لدعم القدرات المعرفية", "برامج تخصصية متنوعة", "أنشطة واستراتيجيات تدريس خاصة",
    "بيئة تعلّم مستمرة", "تكريم وجوائز للطلاب والكوادر", "مواهب متنوعة لدى الطلاب", "المدرسة محطّ زيارات وتصدير خبرات"],
  quiz: [
    { q: "المدرسة شراكة بين وزارة التعليم و…", a: ["موهبة", "أكاديمية طويق", "جامعة الملك عبدالعزيز"], r: 1 },
    { q: "عام 2026 في المملكة هو عام…", a: ["الذكاء الاصطناعي", "الفضاء", "الرياضة"], r: 0 },
    { q: "كم أصبح عدد المشاريع الطلابية بعد التطوير؟", a: ["13", "60", "26"], r: 2 },
    { q: "أي من هذه من مجالات المدرسة؟", a: ["الطب", "الميكاترونيكس", "الهندسة المعمارية"], r: 1 },
    { q: "كم طالبًا ترشّح لأولمبياد نسمو؟", a: ["30", "6", "20"], r: 0 },
  ],
};

PAGES.school = () => {
  const words = "ثانوية الموهوبين التقنية".split(" ")
    .map((w, i) => `<span class="w" style="animation-delay:${0.1 + i * 0.15}s">${w}</span>`).join(" ");
  const goals = SCHOOL.goals.map((g, i) => `
    <button class="flip ${g.c}" aria-label="${g.t}">
      <div class="face front"><div class="gnum">0${i + 1}</div><h3>${g.t}</h3><small>المس للقلب</small></div>
      <div class="face back glass">${g.d}</div>
    </button>`).join("");
  const fieldBtns = SCHOOL.fields.map((f, i) =>
    `<button class="field-btn glass ${f.c} ${i === 0 ? "on" : ""}" data-field="${i}"><span>${f.t}</span></button>`).join("");
  const stats = SCHOOL.stats.map(s => `
    <div class="stat glass ${s.c}"><div class="big" data-count="${s.n}" data-suf="${s.suf || ""}">0</div>
    <div class="cap">${s.cap}</div><div class="meter"><i data-w="${s.p}"></i></div></div>`).join("");
  const feats = [...SCHOOL.features, ...SCHOOL.features].map(f => `<span class="glass">${f}</span>`).join("");
  const gallery = Array.from({ length: 9 }, (_, i) =>
    `<button class="item" data-zoom="assets/gallery/g${i + 1}.webp"><img src="assets/gallery/g${i + 1}.webp" alt="من أنشطة المدرسة" loading="lazy"></button>`).join("");

  return `
  <section class="page intro-wrap">
    <nav class="snav glass" id="snav">
      <button data-go="s-hero" class="on">الرئيسية</button>
      <button data-go="s-about">من نحن</button>
      <button data-go="s-vision">الرؤية والرسالة</button>
      <button data-go="s-goals">أهدافنا</button>
      <button data-go="s-fields">مجالاتنا</button>
      <button data-go="s-programs">برامجنا</button>
      <button data-go="s-numbers">إنجازاتنا</button>
      <button data-go="s-gallery">صور</button>
      <button data-go="s-quiz">اختبر نفسك</button>
    </nav>
    <div class="intro" id="intro">

    <div class="hero" id="s-hero">
      <img class="pic" src="assets/img/school.webp" alt="">
      <div class="hero-card glass">
        <h1>${words}</h1>
        <p>(بنين - بنات) · الإدارة العامة للتعليم بمحافظة جدة</p>
        <div class="chips"><span class="chip">وزارة التعليم</span><span class="chip">أكاديمية طويق</span><span class="chip">رؤية السعودية 2030</span></div>
      </div>
      <div class="scroll-hint">اسحب للأعلى لتكتشف المزيد</div>
    </div>

    <div class="sec reveal" id="s-about">
      <div class="sec-title"><h2>شراكة لصناعة المستقبل</h2><span>من نحن</span></div>
      <div class="split">
        <div class="panel glass"><p>تأسست ثانوية الموهوبين التقنية لرعاية الموهوبين في المجال التقني، بالشراكة بين
          <b>وزارة التعليم</b> و<b>أكاديمية طويق</b>، إيمانًا بدور التقنية والذكاء الاصطناعي في النهضة والتقدم.
          وتنبثق من <b>رؤية السعودية 2030</b> لتكون دولتنا ضمن أعلى الدول عالميًا في تطبيق الذكاء الاصطناعي والإبداع الرقمي.
          ونبني شراكات استراتيجية مع مؤسسات المجتمع لدعم الابتكار وتبادل الخبرات وتنمية رأس المال البشري.</p></div>
        <div class="media"><img src="assets/img/future.webp" alt=""></div>
      </div>
    </div>

    <div class="sec reveal" id="s-vision">
      <div class="panel glass">
        <div class="seg glass" id="vmSeg"><button class="on" data-vm="0">الرؤية</button><button data-vm="1">الرسالة</button></div>
        <div class="swap">
          <p class="big-quote">“الريادة في إعداد جيلٍ موهوبٍ تقنيًا قادرٍ على الابتكار والمنافسة عالميًا، والإسهام في بناء اقتصادٍ معرفيٍ متقدم يدعم تطلعات رؤية المملكة 2030.”</p>
          <p class="big-quote off">“توفير بيئة تعليمية تقنية متقدمة ترعى الموهوبين، وتنمّي مهاراتهم في الذكاء الاصطناعي والأمن السيبراني والبرمجة، لإعداد طلاب قادرين على الابتكار وتمثيل المملكة عالميًا.”</p>
        </div>
      </div>
    </div>

    <div class="sec reveal" id="s-goals">
      <div class="sec-title"><h2>أهدافنا</h2><span>المس أي بطاقة لتقلبها</span></div>
      <div class="flips">${goals}</div>
    </div>

    <div class="sec reveal" id="s-fields">
      <div class="sec-title"><h2>مجالاتنا</h2><span>اختر مجالًا</span></div>
      <div class="fields">
        <div class="field-list">${fieldBtns}</div>
        <div class="field-view glass" id="fieldView"></div>
      </div>
    </div>

    <div class="sec reveal" id="s-programs">
      <div class="sec-title"><h2>برامجنا</h2></div>
      <div class="seg glass" id="progSeg"><button class="on" data-prog="tuwaiq">برامج أكاديمية طويق</button><button data-prog="school">مبادرات المدرسة</button></div>
      <div class="progs" id="progs"></div>
    </div>

    <div class="sec reveal" id="s-numbers">
      <div class="sec-title"><h2>إنجازاتنا بالأرقام</h2></div>
      <div class="growth panel glass">
        <div class="bars">
          <div class="bar"><b data-count="13">0</b><div class="fill" data-h="45"></div><span>بداية البرنامج</span></div>
          <div class="bar"><b data-count="26">0</b><div class="fill" data-h="90"></div><span>بعد التطوير</span></div>
        </div>
        <p>بدأ برنامج دعم المشاريع الطلابية بـ <b>13</b> مشروعًا، ثم تضاعف العدد إلى <b>26</b> مشروعًا تقنيًا،
          وأصبح <b>60٪</b> من الطلاب مشاركين فاعلين في مشاريع ابتكارية. ولا تزال المشاركات مستمرة!</p>
      </div>
      <div class="stats">${stats}</div>
    </div>

    <div class="sec reveal">
      <div class="ai">
        <img src="assets/img/ai2026.webp" alt="">
        <div class="ai-body">
          <div class="yr">2026</div>
          <div><h3>عام الذكاء الاصطناعي</h3>
            <p>وافق مجلس الوزراء على تسمية عام 2026 بعام الذكاء الاصطناعي، لتسريع التحول التقني ودعم الابتكار وتنمية الكفاءات الوطنية، بما يتوافق مع مستهدفات رؤية السعودية 2030.</p></div>
        </div>
      </div>
    </div>

    <div class="sec reveal">
      <div class="sec-title"><h2>ما يميّزنا</h2></div>
      <div class="marquee"><div class="track">${feats}</div></div>
    </div>

    <div class="sec reveal" id="s-gallery">
      <div class="sec-title"><h2>من أنشطتنا</h2><span>اسحب يمينًا ويسارًا، والمس الصورة لتكبيرها</span></div>
      <div class="flow" id="flow">${gallery}</div>
    </div>

    <div class="sec reveal" id="s-quiz">
      <div class="sec-title"><h2>اختبر نفسك</h2><span>هل كنت منتبهًا؟</span></div>
      <div class="quiz glass" id="quiz"></div>
    </div>

    <div class="end">ولا تزال المشاركات مستمرة<br>
      <button class="glass pill-btn" data-go="s-hero" style="margin-top:18px">العودة للأعلى ↑</button></div>
    </div>
  </section>`;
};

PAGES.school.init = root => {
  const intro = root.querySelector("#intro");

  /* section nav: tap to jump, highlight while scrolling */
  const nav = root.querySelector("#snav");
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-go]");
    if (b) intro.querySelector("#" + b.dataset.go).scrollIntoView({ behavior: "smooth", block: "start" });
  });
  const navObs = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    nav.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.go === en.target.id));
    nav.querySelector(".on")?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }), { root: intro, rootMargin: "-40% 0px -55% 0px" });
  intro.querySelectorAll("[id^='s-']").forEach(s => navObs.observe(s));

  /* hero parallax follows the finger */
  const hero = root.querySelector(".hero");
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - .5).toFixed(3));
    hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - .5).toFixed(3));
  });

  /* reveal on scroll + count-ups + bars */
  const countUp = el => {
    const end = +el.dataset.count, suf = el.dataset.suf || "", t0 = performance.now();
    const step = t => {
      const k = Math.min(1, (t - t0) / 1400), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
      el.textContent = v + suf; if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const revObs = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const s = en.target; s.classList.add("in"); revObs.unobserve(s);
    s.querySelectorAll("[data-count]").forEach(countUp);
    s.querySelectorAll("[data-h]").forEach(f => f.style.height = f.dataset.h + "%");
    s.querySelectorAll("[data-w]").forEach(m => setTimeout(() => m.style.width = m.dataset.w + "%", 150));
  }), { root: intro, threshold: .15 });
  intro.querySelectorAll(".reveal").forEach(s => revObs.observe(s));

  /* vision / mission toggle */
  const vm = root.querySelector("#vmSeg"), quotes = root.querySelectorAll(".swap > p");
  vm.addEventListener("click", e => {
    const b = e.target.closest("[data-vm]"); if (!b) return;
    vm.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    quotes.forEach((q, i) => q.classList.toggle("off", i !== +b.dataset.vm));
  });

  /* flip cards */
  root.querySelectorAll(".flip").forEach(f => f.addEventListener("click", () => f.classList.toggle("on")));

  /* fields explorer */
  const view = root.querySelector("#fieldView");
  const showField = i => {
    const f = SCHOOL.fields[i];
    view.className = "field-view glass " + f.c;
    view.innerHTML = `<span class="halo"></span><span class="big">0${i + 1}</span><h3>${f.t}</h3><p>${f.d}</p>`;
    root.querySelectorAll(".field-btn").forEach(b => b.classList.toggle("on", +b.dataset.field === i));
  };
  root.querySelectorAll(".field-btn").forEach(b => b.addEventListener("click", () => showField(+b.dataset.field)));
  showField(0);

  /* programs switcher */
  const seg = root.querySelector("#progSeg"), progs = root.querySelector("#progs");
  const colors = ["c-blue", "c-purple", "c-green"];
  const showProgs = key => {
    progs.innerHTML = SCHOOL.programs[key].map((p, i) =>
      `<div class="prog glass ${colors[i]}"><div class="n">0${i + 1}</div><h3>${p.t}</h3><p>${p.d}</p></div>`).join("");
    seg.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.prog === key));
  };
  seg.addEventListener("click", e => { const b = e.target.closest("[data-prog]"); if (b) showProgs(b.dataset.prog); });
  showProgs("tuwaiq");

  /* coverflow gallery */
  const flow = root.querySelector("#flow");
  const items = [...flow.children];
  const paint = () => {
    const mid = flow.getBoundingClientRect().left + flow.clientWidth / 2;
    items.forEach(it => {
      const r = it.getBoundingClientRect();
      const d = Math.max(-1.5, Math.min(1.5, (r.left + r.width / 2 - mid) / r.width));
      it.style.transform = `rotateY(${-d * 38}deg) scale(${1 - Math.abs(d) * .18}) translateZ(${-Math.abs(d) * 80}px)`;
      it.style.zIndex = 10 - Math.round(Math.abs(d) * 4);
      it.style.filter = `brightness(${1 - Math.abs(d) * .15})`;
    });
  };
  flow.addEventListener("scroll", () => requestAnimationFrame(paint), { passive: true });
  requestAnimationFrame(() => { flow.scrollLeft = (flow.scrollWidth - flow.clientWidth) / 2 * (document.dir === "rtl" ? -1 : 1); paint(); });

  /* quiz */
  const quiz = root.querySelector("#quiz");
  let qi = 0, score = 0;
  const showQ = () => {
    if (qi >= SCHOOL.quiz.length) {
      quiz.innerHTML = `<div class="q-count">نتيجتك</div><div class="score">${score} / ${SCHOOL.quiz.length}</div>
        <h3>${score === SCHOOL.quiz.length ? "ممتاز! أنت خبير بمدرستنا" : score >= 3 ? "رائع! أداء جميل" : "حاول مرة أخرى"}</h3>
        <button class="glass pill-btn" id="again">أعد الاختبار</button>`;
      if (score === SCHOOL.quiz.length) confetti(innerWidth / 2, innerHeight / 2, 90);
      quiz.querySelector("#again").onclick = () => { qi = 0; score = 0; showQ(); };
      return;
    }
    const q = SCHOOL.quiz[qi];
    quiz.innerHTML = `<div class="q-count">سؤال ${qi + 1} من ${SCHOOL.quiz.length}</div>
      <div class="q-bar"><i style="width:${(qi / SCHOOL.quiz.length) * 100}%"></i></div>
      <h3>${q.q}</h3><div class="answers">${q.a.map((a, i) => `<button class="glass" data-a="${i}">${a}</button>`).join("")}</div>`;
    quiz.querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", e => {
      if (quiz.dataset.lock) return;
      quiz.dataset.lock = 1;
      const ok = +b.dataset.a === q.r;
      b.classList.add(ok ? "right" : "wrong");
      if (ok) { score++; confetti(e.clientX, e.clientY, 40); }
      else quiz.querySelector(`[data-a="${q.r}"]`).classList.add("right");
      setTimeout(() => { delete quiz.dataset.lock; qi++; showQ(); }, 1300);
    }));
  };
  showQ();
};

function confetti(x, y, n) {
  const colors = ["#4db5ff", "#7134d6", "#7ee86a", "#ffbe5c", "#f0620f", "#c99bff"];
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.style.left = x + "px"; c.style.top = y + "px";
    c.style.background = colors[i % colors.length];
    const a = Math.random() * Math.PI * 2, v = 120 + Math.random() * 320;
    c.style.setProperty("--dx", Math.cos(a) * v + "px");
    c.style.setProperty("--dy", Math.sin(a) * v + 200 + "px");
    c.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1700);
  }
}

/* ---------------- Under construction (orange, green, purple) ---------------- */
function underConstruction(tileId) {
  const t = APP_CONFIG.tiles.find(x => x.id === tileId);
  const gear = cls => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><path fill="currentColor"
      d="M43 4h14l2 11 7 3 9-6 10 10-6 9 3 7 11 2v14l-11 2-3 7 6 9-10 10-9-6-7 3-2 11H43l-2-11-7-3-9 6-10-10 6-9-3-7-11-2V43l11-2 3-7-6-9 10-10 9 6 7-3zM50 34a16 16 0 1 0 0 32 16 16 0 1 0 0-32z"/></svg>`;
  return `
  <section class="page wip">
    <div class="wip-card glass ${t.color}">
      <span class="halo"></span>
      <img class="pic" src="${t.img}" alt="">
      <div class="wip-inner">
        <h1>${t.title}</h1>
        <p>هذه الصفحة قيد الإنشاء، ترقّبوها قريبًا</p>
        <div class="progress glass"><span></span></div>
        <button class="glass pill-btn big-back" data-route="home">العودة للرئيسية</button>
      </div>
    </div>
  </section>`;
}
PAGES.robot = () => underConstruction("robot");
PAGES.teacher = () => underConstruction("teacher");
PAGES.visit = () => underConstruction("visit");
