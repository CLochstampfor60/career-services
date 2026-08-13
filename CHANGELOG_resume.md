# Resume Changelog

All notable changes to Carl Lochstampfor's resume site are documented in this file.

---

## [2.7.0] - 2026-08-13

### Added — "Open to roles" availability statement
- **Muted line below the Executive Summary paragraph**, inside the same card and separated by a hairline top border: "Actively seeking a cybersecurity internship. Open to AI security, ML engineering, and applied research roles full-time May 2027."
- Styled `text-sm text-gray-600 dark:text-gray-400` so it reads as a footnote to the summary rather than a fifth headline claim

### Added — Contact section
- **New `📬 Contact` section** (`id="contact"`) at the bottom of `<main>`, between the three-column body grid and the footer
- Three channels in a `md:grid-cols-3` card, each with an inline SVG icon, a small uppercase label, the address itself as the link text, and a one-line descriptor:
  - **LinkedIn** — `www.linkedin.com/in/carl-lochstampfor-jr1` — "Professional inquiries"
  - **Research** — `contact@scamlingua.org` — "COVA datasets & ScamLingua"
  - **Academic** — `cloch001@odu.edu` — "Old Dominion University"
- Closes with the same availability line used under the Executive Summary, so the two read identically
- **"Contact" added to the primary nav**, after Experience. The existing smooth-scroll handler is generic (`.nav-link` → `getElementById`), so the new anchor needed no JS change
- **No contact form and no phone number** — deliberate: a static site can't process a form without third-party JS, which would mean loosening the CSP

### Changed — LinkedIn vanity URL
- Profile URL updated from `linkedin.com/in/carl-lochstampfor-jr-08b311223` to **`www.linkedin.com/in/carl-lochstampfor-jr1`** in all four places it appears in `index.html`: the JSON-LD `sameAs` array, the social links bar, the new contact card, and the footer
- `README.md` → "Professional Links" updated to match
- The archived snapshots under `internal_docs/` (`index_v2.10.html`, `index_v2.11.html`) were intentionally left on the old URL — rewriting an archive makes it a less accurate record of what shipped

### Changed — Research timeline planning dates
- **COVA-B Benign Dataset**: Summer 2026 → **Fall 2026** (still "In Progress")
- **Multi-Model Comparison Study**: Fall 2026 → **Winter 2026** (still "Planning")
- Dashed-border / gray-dot / muted-text planning styling from v2.5.0 unchanged

### Design notes
- Icons are **inline SVG paths**, not an icon font or CDN sprite — no new CSP origins, no extra requests, and they inherit `currentColor` so dark mode needs no second asset
- Icon colors follow the established hierarchy: navy for LinkedIn (structure), periwinkle for research, gold for academic
- Contact heading uses `border-blue-700` to bookend the blue Executive Summary heading at the top of the page
- Email addresses are plain `mailto:` links — CSP `default-src 'self'` does not restrict `mailto:` navigation, so no policy change was needed
- New print rule `.contact-link[href]:after { content: "" }` suppresses the global "print the href after every link" behavior for these three, since the visible text is already the address (avoids `cloch001@odu.edu (mailto:cloch001@odu.edu)` in the PDF)

### Deliberately not done
- **No `email` field added to the JSON-LD `Person` block.** The addresses are on the page for humans to read; putting them in structured data makes them trivially machine-scrapable. Same reasoning as the standing no-phone-number policy

### Preserved
- CSP, dark mode, print stylesheet, mobile responsiveness, GSAP reveal animations, and `prefers-reduced-motion` all unchanged
- **Version bumped to v2.7.0**

---

## [2.6.0] - 2026-07-30

### Added — Personal Projects subsection (LockBadges)
- **New "🔧 Personal Projects" subsection** inside the Featured Project section, placed after the Secure File Sharing System card and before Labs & Applied Coursework
- **LockBadges card**: movable, translucent on-screen indicators for Caps/Num/Scroll Lock and Mute on Windows — a shipped, fully documented AutoHotkey v2 utility
  - Two-sentence-per-paragraph summary covering what it does and the privacy posture (toggle-bit state reads instead of a keyboard hook; no network access, telemetry, or logging)
  - Tech tags: `AutoHotkey v2`, `Windows`, `Privacy-Focused`
  - GitHub link to `CLochstampfor60/LockBadges`
- **One thumbnail** added at `Images/lockbadges/lockbadges_settings.png` (settings window with three badges on the taskbar), capped at `sm:w-40 md:w-48` and stacked above the text on mobile

### Design notes
- Deliberately **subordinate to the research cards**: rendered as an `h3` subsection under the existing section heading rather than its own top-level section, with a smaller card, smaller type, and a compact button
- **Slate palette** — outside the established hierarchy (navy = structure, gold = achievement, periwinkle = AI/research, teal = labs), so a side project never reads as research or coursework
- No accordion, no carousel, single image — kept intentionally brief

### Preserved
- CSP unchanged (same-origin image satisfies `img-src 'self'`), dark mode, print stylesheet, mobile responsiveness, GSAP reveal animations, and `prefers-reduced-motion`
- **Version bumped to v2.6.0**

---

## [2.5.0] - 2026-07-27

### Added — Headshot in the header
- **Portrait added to the header nameplate**, left of the name: a `<picture>` element serving `Images/headshot.webp` with a `Images/headshot.png` fallback, sized `w-16 h-16` on mobile and `w-20 h-20` from `md:` up, circular with a gold border (`border-gold-400` / `dark:border-gold-300`)
- Loaded with `loading="eager"` and explicit `width`/`height` to avoid layout shift on a above-the-fold image
- Source images also committed: `Images/face_headshot_image.jpg` and `Images/face_headshot_image.png` (full-resolution originals; the served assets are the downscaled `headshot.png` / `headshot.webp`)
- Header layout adjusted to a `flex items-center gap-4` group so the portrait and nameplate align on one row

### Also included in this range
- **Timeline — future research items**: COVA-B Benign Dataset (Summer 2026, In Progress) and Multi-Model Comparison Study (Fall 2026, Planning), styled as a continued list with a dashed left border, gray dots, muted text, and gray status badges to separate in-progress work from completed items
- **Experience — AmeriCorps / Habitat for Humanity Construction Team Leader (2009–2011)** restored to the Professional Experience section
- ScamLingua Platform timeline date normalized to "Jul 2026" for consistent formatting

### Notes
- The headshot shipped from a second workstation in commits `301c70a`, `c5bd13b`, and `eced528`; the timeline and experience changes shipped earlier in `3bc01ea` and `10aced7`. `index.html` was bumped to v2.5.0 at the time but no changelog entry was written — documented retroactively here so the history has no gap

---

## [2.4.0] - 2026-07-22

### Added — Pipeline demo screenshots in the research accordions
- **COVA → "🖼️ Pipeline in Action"**: new 2-slide carousel below the Pipeline Architecture section — generation demo ("Generating 10 bank conversations via Qwen 2.5 14B (8m 50s)") and a sample dialogue ("skeptical victim resists social engineering")
- **COVA-X → "🖼️ Scaling to 10K+"**: new 2-slide carousel — quality scan ("94.1% clean rate, artifact taxonomy breakdown") and the final dataset status ("10,995 conversations across 8 fraud categories")
- **🏗️ Pipeline Architecture** remains a standalone image section (not folded into a carousel)
- Five screenshots added under `Images/cova_workflow/`: `cova_pipeline_architecture.png`, `cova_generation_demo.png`, `cova_sample_dialogue_bank.png`, `cova_quality_scan.png`, `cova_dataset_complete.png`

### Technical
- **New container-scoped carousel** (`moveCarousel(id, dir)` + `.cova-carousel-item`): each research carousel operates only on its own container's slides, so COVA and COVA-X carousels are independent of each other and of the File System project's global `.carousel-item` carousel
- Images constrained to `max-w-2xl`, `loading="lazy"`, dark-mode frames, reduced-motion disables the crossfade, nav buttons are `.no-print`, and the print stylesheet reveals all carousel slides stacked for a complete PDF export

### Notes
- The dataset screenshot shows **10,995** conversations (current live repo, +10 bank conversations generated 2026-07-22); the published benchmark figures elsewhere remain **10,985** (the paper snapshot) — intentionally distinct, so the caption reads "Final dataset" for the live scan
- Removed two unused alternate architecture renders (`cova_pipeline_arc_GROK.jpg`, `cova_pipeline_architecture_Gemini.png`)
- **Version bumped to v2.4.0**

### Preserved
- CSP header (same-origin images need no change), GoatCounter placement, dark mode, print stylesheet, mobile responsiveness, GSAP animations, and `prefers-reduced-motion`

---

## [2.3.0] - 2026-07-22

### Changed — Navy / Gold / Periwinkle color system
- **Site-wide palette overhaul** replacing the previous cyber-blue/purple/indigo scheme with a conservative, academic-research color system organized by a clear hierarchy:
  - **Navy `#1E3A5F`** — structure/authority: header nameplate, all section headings + underlines, structural borders, primary/project buttons, scrollbar, executive-summary left border, print links, and the mobile `theme-color`
  - **Gold `#A16207`** — highlights/achievements: GPA (Executive Summary + Education), and a gold top stripe on each research metric card as an achievement marker
  - **Periwinkle `#818CF8`** — AI/research-specific: research cards (gradient + border), AI/paper badges, arXiv + ScamLingua buttons, research section + timeline headings/dots, and the skills radar chart
- **Implementation**: Tailwind config remaps the built-in `blue`→navy and `purple`/`indigo`→periwinkle families (so existing utility classes recolor automatically) and adds a new `gold` token plus navy/periwinkle scales
- **Metric cards** rewritten to cohesive navy/periwinkle gradients (two cards previously used cyan/teal that fell outside the new system)
- **Radar chart** dataset colors updated to periwinkle

### Notes
- Teal (Labs section, ResearchGate link) and the multi-color tech-tag categories were intentionally left as-is; the recolor targets the core brand surfaces
- **Version bumped to v2.3.0**

### Preserved
- CSP header, GoatCounter placement, dark mode (light/dark variants tuned together), print stylesheet, mobile responsiveness, GSAP animations, and `prefers-reduced-motion` — all unchanged

---

## [2.2.1] - 2026-07-22

### Changed — Executive Summary rewrite (CCI research completed)
- **Executive Summary rewritten** to reflect that the CCI Undergraduate Research Program is now complete: repositioned as an **AI security researcher with two arXiv preprints on synthetic fraud detection** (COVA framework, **under review at IEEE DASC and IEEE BigData 2026**) and a **live dataset platform (ScamLingua.org)**
- Added specificity to the professional background: **high-risk, regulated financial environments (FNMA, FHLMC, FHA, VA)** and a **proven record of managing 3× standard workloads while sustaining 95%+ accuracy**
- **JSON-LD `description`** updated to mirror the new summary for SEO/structured-data consistency
- Research framing kept **internally consistent** with the "Under Review" research cards (arXiv preprints, not "peer-reviewed/published")
- **GPA remains 3.9** (unchanged); **version bumped to v2.2.1**

### Preserved
- CSP header, GoatCounter placement, dark mode, print stylesheet, mobile responsiveness, and `prefers-reduced-motion` — all unchanged (content-only edit)

---

## [2.2.0] - 2026-07-22

### Added — GSAP Animation Engine
- **GSAP 3.12.5 + ScrollTrigger** loaded from cdnjs (before GoatCounter, synchronous so the plugins are ready when the DOMContentLoaded handler runs)
- **CSP updated**: `https://cdnjs.cloudflare.com` added to `script-src`; `preconnect` hint added for cdnjs
- **Counters rewritten on GSAP** (`gsap.to` proxy tween, `power2.out` easing) replacing the manual `requestAnimationFrame` loop — smoother easing, plus a one-time guard (`data-counted`) so re-entering the metrics section no longer restarts the count
- **Scroll-reveal rewritten on ScrollTrigger** (`fromTo` per section, `start: 'top 88%'`, `once: true`) replacing the `IntersectionObserver` — more precise, professional reveal timing
- **Graceful fallback**: if GSAP fails to load or `prefers-reduced-motion` is set, JS reveals all sections immediately and snaps counters to final values — nothing breaks with or without the CDN

### Added — Typography (UI/UX design-system recommendation)
- **Crimson Pro** academic serif applied to the nameplate (`header h1`) and section headings (`main section > h2`) to reinforce the research-portfolio identity; Inter retained for all body/UI text. Applied via a single CSS selector (zero HTML changes) — remove the two CSS rules + the Crimson Pro font link to revert. No CSP change needed (same Google Fonts origins)

### Fixed
- **Demo Video placeholder was rendering on the live site.** The block was wrapped in an HTML comment, but its inner "Option 1/2/3" comments contain `-->`, and **HTML comments cannot nest** — so the wrapper closed early and the "Demo Video Coming Soon" box leaked onto the page. Re-wrapped the entire block in an inert `<template id="cova-demo-video">` so nothing renders while **all markup is preserved** for later use (re-enable by removing the two template tags)

### Changed
- **Version bumped to v2.2.0**; visible version string updated in the social links bar

### Preserved (per handoff requirements)
- CSP header maintained and correctly extended for the new cdnjs domain
- GoatCounter analytics kept as the last script before `</body>`
- Dark mode intact on all elements (typography change is font-family only)
- Print stylesheet still forces reveals visible and accordions open (`.reveal` print override beats GSAP inline styles via `!important`)
- Mobile responsiveness (~380px) and `prefers-reduced-motion` respected (dedicated GSAP fallback path)

---

## [2.1.0] - 2026-07-22

### Added — Research Content Expansion (extracted from COVA & COVA-X preprints)
- **"Technical Details" accordion** on the COVA and COVA-X research cards (native `<details>`/`<summary>`, no JS), each covering Tools & Frameworks, Methodology Highlights, Notable Results, and a **"My Contributions"** statement written for interview readiness
- **Research Timeline** section visualizing the COVA → COVA-X → ScamLingua progression (Apr 2026, Jun 2026, 2026)
- **Expanded tech tags** on research cards reflecting the actual stack: Qwen 2.5 14B, Ollama, scikit-learn, Hugging Face Transformers, PyTorch, DistilBERT, Longformer, dual-GPU training
- **New "ML Frameworks" skills line**: Hugging Face Transformers, PyTorch, scikit-learn, XGBoost, Longformer/DistilBERT, TF-IDF
- **COVA-X methodology detail**: three-role virtual-kidnapping architecture (67.1% → 46.5% artifact rate), quality-lifecycle pipeline (contamination scan, stage-direction stripping, automated relabeling), 12.7× label-consistency improvement, documented Qwen 2.5 14B capability limits

### Changed
- **JSON-LD `knowsAbout`** expanded with specific technologies discovered in the papers (Multi-Agent LLM Systems, Prompt Engineering, Longformer, DistilBERT, Hugging Face Transformers, PyTorch, XGBoost, scikit-learn, TF-IDF Text Classification, Conversational AI Classification, Smishing Detection, Social Engineering Defense)
- **AI/ML Research skills line** expanded with concrete framework names and Prompt Engineering
- **Certifications:** `Linux+ (In-Progress)` commented out (study paused) — kept in source as an HTML comment for possible later resumption
- **Version bumped to v2.1.0**; visible version string updated

### Preserved (per handoff requirements)
- Content Security Policy (CSP) — no new external resources required; unchanged
- GoatCounter analytics script placement
- Dark mode across all new elements
- Print stylesheet — accordions force-open and chevrons hidden when printing
- Mobile responsiveness (verified at ~380px) and reduced-motion support
- Scroll-reveal (`reveal` class) on the new Research Timeline section

---

## [2.0.0] - 2026-07-22

### Added — Phase 1: COVA/COVA-X Research Content
- **Featured Research section** with COVA and COVA-X papers (arXiv:2604.11752, arXiv:2606.06879)
- **ScamLingua platform showcase** with links to live site and source repository
- **Mentorship attribution**: Dr. Ayan Roy (CNU), CCI Undergraduate Research Program
- **Research metrics cards** displaying: 10,985 synthetic conversations, 79.71% accuracy, 8 fraud categories, 2 papers under review
- **Updated skills section** with AI/ML research capabilities: LLMs, Synthetic Data Generation, Transformer Fine-Tuning, Dataset Engineering, Ollama/Qwen Local Inference, Trust-Focused Web Engineering
- **Tech tags** for projects showing technology stack at a glance
- **ResearchGate profile link** in social links bar

### Added — Phase 2: UI/UX Upgrades
- **Animated metric counters** with easing animation (counters animate when scrolled into view)
- **Scroll-reveal animations** for all major sections (respects `prefers-reduced-motion`)
- **Interactive research cards** with gradient borders and hover states
- **Metric card shimmer effect** for visual polish
- **Navigation link for Research** section in header

### Changed
- **Executive Summary** updated to reflect AI security research focus and CCI program involvement
- **JSON-LD structured data** expanded with research-related `knowsAbout` entries and updated `jobTitle`
- **SEO meta tags** updated with AI security and research keywords
- **Radar chart** updated to include "AI/ML Research" as a skill category (replacing "Data Ana")
- **Chart color scheme** changed to purple to align with research theme
- **Version bumped to v2.0.0** (major update with new content sections)

### Preserved (per handoff requirements)
- Content Security Policy (CSP) — no new external domains needed
- GoatCounter analytics script placement
- Dark mode toggle functionality
- Mobile responsiveness
- Print stylesheet for PDF export
- Reduced motion support

### Technical Notes
- CSP updated to allow `scamlingua.org` in `img-src` for potential future OG images
- All animations use CSS transitions (no new JS libraries required)
- Counter animations use `requestAnimationFrame` for smooth 60fps rendering
- IntersectionObserver used for scroll-reveal (native browser API, no polyfill needed)

---
