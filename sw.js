/* Service worker: network-first so new GitHub pushes show up right away,
   with a cache fallback so the screen still works if the internet drops.
   __BUILD__ is replaced with the commit id on every deploy, which makes
   open screens pick up the new version and reload by themselves. */
const CACHE = "school-screen-__BUILD__";
const CORE = [
  "./", "index.html", "css/style.css", "js/config.js", "js/pages.js", "js/app.js",
  "manifest.webmanifest", "assets/img/school.webp", "assets/img/robot.webp",
  "assets/img/teacher.webp", "assets/img/visit.webp", "assets/icons/icon-192.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // never cache future API calls
  if (url.pathname.includes("/api/")) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok && (url.origin === location.origin || url.host.includes("fonts.g"))) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html")))
  );
});
