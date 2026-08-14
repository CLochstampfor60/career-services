# 🛡️ Interactive Cybersecurity & AI Security Research Portfolio

A single-file, hardened, interactive résumé site for a cybersecurity undergraduate and AI security researcher — published research, live project work, and a recruiter-ready PDF, all served as static HTML from GitHub Pages.

**Live site:** <https://clochstampfor60.github.io/resume/> · **Current release:** e-Resume v2.14.0

---

## 📌 What's on the site

| Section | Contents |
| --- | --- |
| **Executive Summary** | Positioning statement plus animated metric counters (dataset size, model accuracy, credential counts). |
| **Research** | The three-part research program — **COVA Framework**, **COVA-X Benchmark**, and the **ScamLingua Platform** — each with an arXiv preprint link, expandable technical-detail accordions, and image carousels of the pipeline in action. |
| **Research Timeline** | Chronological view of COVA → COVA-X → ScamLingua → COVA-B → multi-model comparison study. |
| **Technical Skills** | Categorized skill rows (security, AI/ML, tools, development, platforms), certifications, and a **Verify on Credly** button linking third-party proof of the CompTIA credentials. |
| **Skill Distribution** | Chart.js doughnut chart that re-themes with light/dark mode. |
| **Education · Featured Project · Personal Projects · Labs** | ODU coursework, the Secure File Sharing System walkthrough with screenshots, side projects, and applied lab work (NIST SP 800‑61 IR, OS hardening, pfSense, Snort/Wireshark). |
| **Professional Experience** | Over a decade in regulated financial services, framed against the security and risk work it maps to. |
| **Contact** | LinkedIn, research email, and academic email, plus the current availability badge. |

---

## 🚀 Technical Features

This repository is more than a static document; it is a hardened, search-optimized web page built to demonstrate the same rigor the résumé claims.

### 🛡️ Security & Integrity

* **Content Security Policy:** Explicit allowlists per directive (`script-src`, `style-src`, `font-src`, `img-src`, `connect-src`) — every third-party origin the page uses is named, and nothing else can load.
* **Referrer Policy:** `no-referrer-when-downgrade`, so outbound navigation never leaks the referrer to an insecure origin.
* **Outbound link hardening:** Every `target="_blank"` link carries `rel="noopener noreferrer"`.
* **Static by design:** No server, no backend, no forms, no cookies — a deliberately minimal attack surface.
* **Contact data:** Addresses appear as human-readable links only; nothing contactable is embedded in the structured data.

### ♿ Accessibility

Accessibility is treated as a measured requirement, not an assumption — contrast ratios are calculated against the actual rendered surface in **both** themes before a color ships.

* **Skip link:** Off-screen until focused, letting keyboard users jump past the sticky header and its nav on every load.
* **Visible keyboard focus:** A global `:focus-visible` outline (periwinkle in light, gold in dark) on every link, button, `<summary>`, and focusable region — with a near-white override on solid buttons, whose dark-mode fill *is* gold.
* **WCAG-verified contrast:** Body, link, hover, and button states are held to the 4.5:1 AA floor for text and 3:1 for UI component boundaries. Hover always **brightens** — an earlier pass where hover dimmed links was found and fixed.
* **Semantic structure:** Landmark elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`), a single `<h1>`, ordered headings, and native `<details>` accordions rather than scripted show/hide.
* **ARIA where it earns its place:** `aria-expanded` / `aria-controls` on the mobile menu, `aria-pressed` on the theme toggle announcing which mode is *currently* active, `aria-label` on icon-only controls, `aria-hidden` on decorative SVGs, and `sr-only` text warning when a link opens in a new tab.
* **Focus management:** Back-to-top returns focus to `#main-content` so keyboard and screen-reader users resume from the top rather than from where they left off; the button uses `visibility` (not opacity alone) so it leaves the tab order while hidden.
* **Reduced motion:** `prefers-reduced-motion: reduce` disables scroll reveals, counters, carousel fades, shimmer, and chevron rotation — content is revealed immediately rather than animated in.
* **No-JS / CDN-failure fallback:** If GSAP is blocked or fails to load, CSS reveals everything and the counters snap to their final values. The page is fully readable with scripts disabled.

### 📱 Mobile & Touch

* **Responsive layout:** Fluid Tailwind grids across phone, tablet, and desktop, with a collapsible nav drawer that reuses the same `<nav>` markup as the desktop bar — one set of links to maintain, no duplicate content.
* **44px minimum tap targets:** Enforced structurally via `min-height` on the shared button and link components, rather than depending on whichever padding and font-size utilities happen to be paired.
* **Touch-correct hover states:** All hover effects are gated behind `@media (hover: hover)` so iOS never leaves a tapped element visibly "held down"; `:active` rules give touch users equivalent press feedback instead.
* **Safe-area insets:** The back-to-top button uses `env(safe-area-inset-*)` to stay clear of the iOS Safari toolbar and home indicator.
* **Mobile drawer behavior:** Closes on Escape, on tapping outside the header, and resets to the desktop bar when the viewport grows past the breakpoint.
* **Mobile browser theming:** `theme-color` meta tag tints the browser chrome to match the site's navy.

### 🔍 SEO & Knowledge Graph

* **JSON-LD structured data:** Full Schema.org `Person` implementation with `hasCredential`, `knowsAbout`, `affiliation`, and a `sameAs` array tying LinkedIn, GitHub, ResearchGate, Credly, ScamLingua, and the ODU portfolio to one verified identity.
* **Crawl control:** Custom `robots.txt` and `sitemap.xml`, plus a canonical URL.
* **Social metadata:** Open Graph and Twitter Card tags for clean link previews on LinkedIn and elsewhere.

### ⚡ Performance

* **No build step:** One `index.html`. Nothing to compile, bundle, or deploy beyond a `git push`.
* **Resource hints:** `preconnect` to every external origin used.
* **Image strategy:** `<picture>` with WebP and PNG fallback, explicit `width`/`height` to prevent layout shift, `lazy-loading` below the fold and `eager` for the header.
* **Scroll animation:** GSAP + ScrollTrigger when available, CSS-only fallback otherwise, with the CSS transition disabled while GSAP owns the animation so nothing double-animates.

### 🎨 Theming & Design System

* **Navy / Gold / Periwinkle palette** with defined semantic roles — navy for structure and authority, gold for achievements and highlights, periwinkle for AI and research content. Implemented by remapping Tailwind's built-in families, so utility classes recolor automatically.
* **Light and dark modes** via a header toggle, with a Chart.js theme sync so the chart re-renders in the active palette. Every color decision on the page is validated in both themes.
* **Named CSS components** (`.social-link`, `.btn-solid`, `.nav-link`, `.contact-link`) instead of repeated utility strings — every contrast bug found so far came from the same element being styled in five places, so one rule per component removes the class of bug, not just the instance.

### 🖨️ Print & PDF

* **Print stylesheet** that hides interactive chrome, expands every research accordion, reveals all carousel frames rather than just the active one, forces the availability badge to keep its fill, and appends URLs after links — so a browser print (Ctrl+P) produces a complete, readable document.

---

## 🗂️ Repository Layout

| Path | Purpose |
| --- | --- |
| `index.html` | The entire site — markup, styles, and scripts in one file. |
| `docs/Carl_Lochstampfor_Resume.pdf` | **The published résumé.** Served by the site's download button. |
| `_source/` | Internal source assets (Word résumé, original images). Excluded from the Pages build. |
| `Images/` | Headshots and project/lab screenshots used by the site. |
| `internal_docs/` | Working notes, changelog, and archived résumé versions. Not part of the published site. |
| `robots.txt`, `sitemap.xml` | Crawl directives. |

---

## 📄 Résumé Files

**Looking for the résumé?** → **[Read it online](https://clochstampfor60.github.io/resume/)** or **[download the PDF](docs/Carl_Lochstampfor_Resume.pdf)**.

| Path | Purpose |
| --- | --- |
| `docs/Carl_Lochstampfor_Resume.pdf` | **The published résumé.** Served by the site's download button — this is the file to share. |
| `_source/Carl_Lochstampfor_Resume.docx` | Internal Word source the PDF is exported from. Tracked so résumé edits carry history; not part of the published site. |

Both use stable, unversioned filenames so links never break, and version history lives in git rather than in the filename.

`_source/` is kept out of the GitHub Pages build by Jekyll's default rule of skipping underscore-prefixed paths, so the site itself only ever offers the PDF. It is still visible in this public repo, which is intentional: the point is that the site and the PDF are what people find first, not that the source is hidden. (Adding a `.nojekyll` file would start serving `_source/` from the website too.)

**When updating résumé content:** edit `_source/`, export a fresh PDF over `docs/`, and commit both together.

---

## 🔗 Professional Links

- **LinkedIn:** [Carl Lochstampfor, Jr.](https://www.linkedin.com/in/carl-lochstampfor-jr1)
- **GitHub:** [CLochstampfor60](https://github.com/CLochstampfor60)
- **ResearchGate:** [Carl Lochstampfor](https://www.researchgate.net/profile/Carl-Lochstampfor)
- **Credly (credential verification):** [carl-lochstampfor-jr](https://www.credly.com/users/carl-lochstampfor-jr)
- **ScamLingua:** [scamlingua.org](https://scamlingua.org)
- **ODU ePortfolio:** [University Academic Portfolio](https://sites.wp.odu.edu/locky/)
- **Live Resume:** [GitHub Pages Deployment](https://clochstampfor60.github.io/resume/)
- **Résumé (PDF):** [Download Current Version](docs/Carl_Lochstampfor_Resume.pdf)

---

## 📈 Analytics & Privacy

This site uses [GoatCounter](https://www.goatcounter.com) — a privacy-first, open-source,
cookieless analytics service. No cookies are set, no personal data is collected, and no
consent banner is required. Aggregate visit counts only.

---

## ⚖️ License

- This project is licensed under the terms of the **MIT license**.
- Designed and maintained by Carl Lochstampfor, Jr.

<!-- ## 📜 Changelog

See [CHANGELOG_resume.md](internal_docs/CHANGELOG_resume.md) for notable changes to the site.

(Section hidden for now — uncomment to publish the changelog link again.) -->
