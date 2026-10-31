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
    { id: "school",  color: "blue",   title: "ماهي ثانوية الموهوبين التقنية", sub: "تعرّف على مدرستنا", img: "assets/img/school.webp",  route: "school" },
    { id: "robot",   color: "orange", title: "دليل الروبوت",                 sub: "قريبًا",            img: "assets/img/robot.webp",   route: "robot" },
    { id: "teacher", color: "green",  title: "الأستاذان للطالب",              sub: "قريبًا",            img: "assets/img/teacher.webp", route: "teacher" },
    { id: "visit",   color: "purple", title: "الزيارة للمدرسة",               sub: "قريبًا",            img: "assets/img/visit.webp",   route: "visit" },
  ],
};
