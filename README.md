# ثانوية الموهوبين التقنية — شاشة اللمس التفاعلية

Touch-screen web app (Arabic, RTL) in a liquid-glass / Frutiger Aero style.

## How updates work
- **Website:** every push to `main` deploys to GitHub Pages automatically (`.github/workflows/pages.yml`).
  Screens that are already open check for a new version every 5 minutes and reload by themselves.
- **Android APK:** `.github/workflows/apk.yml` builds a full-screen app that loads the live website,
  so it updates whenever the website does. Download it from the **Releases → Latest Android APK** page.
  It only needs rebuilding if you change files in `android/` (run it from the Actions tab → *Build Android APK* → *Run workflow*).
- You can also install it as an app straight from Chrome (menu → *Install app*), since it is a PWA.

## Where to edit
| What | File |
| --- | --- |
| Button titles, colors, pictures, idle timeout | `js/config.js` |
| Page content (school intro, under-construction pages) | `js/pages.js` |
| Visit page: welcome lines, visitor types, purposes, staff names | `js/config.js` → `visit` |
| Visitor check-in flow | `js/visit.js` |
| Student leave flow | `js/leave.js` |
| Staff log (visits + leave, CSV download) | `js/records.js` |
| Look and feel | `css/style.css` |
| Pictures | `assets/img/`, `assets/gallery/` |

To add a new page: write a function in `js/pages.js` (`PAGES.myPage = () => \`...\``) and set a tile's `route` to `"myPage"`.

## Staff log
Hold the title of the visit page or the leave page for 3 seconds to open the staff log (`#/staff-log`).
It has two tabs, visits and leave, each downloads as a CSV file for Excel, and visitors can be checked out from it.
Records are kept on the screen itself (localStorage), so each screen has its own log.

## Future internet features (messaging, accounts)
`js/config.js` has `apiBase` and `features.messaging` ready. GitHub Pages only hosts static files,
so private messaging will need a backend service (for example Supabase or Firebase) that the app talks to.
The service worker never caches `/api/` requests.

## Run locally
```
python3 -m http.server 8000
```
then open http://localhost:8000
