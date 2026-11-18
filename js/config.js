/* App-wide settings. Edit here, push to GitHub, and every screen updates. */
window.APP_CONFIG = {
  version: "1.0.0",

  // Return to the home screen after this many seconds without a touch (kiosk mode). 0 = never.
  idleSeconds: 120,

  // Future online features (private messaging, accounts, live data).
  // Point this at a backend (e.g. Supabase / Firebase / your own API) when it is ready.
  apiBase: "",
  features: {
    messaging: false,
  },

  // The four home buttons. "route" is the page each button opens.
  tiles: [
    { id: "school",  color: "blue",   title: "ما هي ثانوية الموهوبين التقنية", sub: "تعرّف على مدرستنا", img: "assets/img/school.webp",  route: "school" },
    { id: "robot",   color: "orange", title: "دليل الروبوت",                 sub: "قريبًا",            img: "assets/img/robot.webp",   route: "robot" },
    { id: "leave",   color: "green",  title: "استئذان الطلاب",                sub: "الاستئذان الدراسي", img: "assets/img/teacher.webp", route: "leave" },
    { id: "visit",   color: "purple", title: "الزيارة للمدرسة",               sub: "سجّل زيارتك",            img: "assets/img/visit.webp",   route: "visit" },
  ],

  // Visitor check-in page (الزيارة للمدرسة).
  visit: {
    // The two welcome lines that animate in, word by word, when the page opens.
    welcome: "أهلًا بك في ثانوية الموهوبين التقنية",
    welcomeSub: "أنت الآن متصل بعقول ستغيّر العالم",
    // Step 1: who is visiting. These hang on ropes.
    types: [
      { id: "parent",   label: "ولي أمر",          icon: "family" },
      { id: "official", label: "زائر رسمي أو وفد",  icon: "badge" },
      { id: "vendor",   label: "مورّد أو صيانة",    icon: "box" },
      { id: "alumni",   label: "خرّيج",             icon: "cap" },
    ],
    // Step 2: why. "host: false" skips the "who are you visiting" step.
    purposes: [
      { id: "teacher",  label: "مقابلة معلّم" },
      { id: "admin",    label: "مقابلة الإدارة" },
      { id: "appt",     label: "موعد مسبق" },
      { id: "tour",     label: "جولة تعريفية",      host: false },
      { id: "delivery", label: "تسليم أو صيانة",    host: false },
      { id: "other",    label: "غرض آخر" },
    ],
    // Step 3: who they came to see. Edit to match the school's staff.
    hosts: [
      "مدير المدرسة", "وكيل شؤون الطلاب", "وكيل الشؤون التعليمية",
      "الموجّه الطلابي", "رائد النشاط", "معلّم",
    ],
    // Seconds the thank-you screen stays before going home.
    doneSeconds: 8,
  },
};
