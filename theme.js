/* Theme persistence - restore only. Must stay render-blocking in <head>:
   a synchronous external script is fetched and executed before first
   paint, so a returning dark-mode reader never sees a flash of the light
   page. Adding defer/async here would reintroduce that flash. */

// ============================================================
//  Theme persistence — restore only.
//
//  Runs here, in <head> before <body> paints, so a returning dark-mode
//  reader never sees a flash of the light page. Moving this to the
//  DOMContentLoaded block below would reintroduce that flash.
//
//  Light is the deliberate default: only an explicit toggle is ever
//  remembered. prefers-color-scheme is intentionally NOT consulted, so
//  what a first-time visitor sees does not depend on their OS settings.
//
//  localStorage access throws outright in some privacy configurations
//  (Safari private mode, third-party/site-data blocking), so it is
//  wrapped — a storage failure must leave the page light, not broken.
// ============================================================
try {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
} catch (e) { /* storage unavailable — stay on the light default */ }
