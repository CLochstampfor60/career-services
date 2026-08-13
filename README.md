# 🛡️ Interactive Cybersecurity Resume

A high-fidelity, interactive professional portfolio showcasing technical expertise in cybersecurity, incident response, and secure systems architecture.

**Live Demo:** <https://clochstampfor60.github.io/resume/>

## 🚀 Technical Features

This repository is more than a static document; it is a hardened, search-optimized web application designed to demonstrate cybersecurity proficiency and technical maturity in a production-grade environment.

### 🛡️ Security & Integrity

* **Enhanced Content Security Policy (CSP):** Strict script and resource governing to mitigate XSS and data injection vulnerabilities.

* **Referrer Policy:** Configured to `no-referrer-when-downgrade` to ensure privacy and data integrity during outbound navigation.

* **Static Security:** Hosted on GitHub Pages to maintain a serverless, minimal attack surface.

### 🔍 SEO & Knowledge Graph Integration

* **JSON-LD Structured Data:** Full **Schema.org** implementation (Person, Credential, EducationalOccupationalCredential) for direct Google Knowledge Graph integration.

* **Crawl Optimization:** Custom `robots.txt` and `sitemap.xml` architecture for efficient search engine indexing.

* **Social Metadata:** Robust Open Graph and Twitter Card support for professional link previews on LinkedIn and other platforms.

### ⚡ Performance & Accessibility

* **Performance Optimization:** Implemented `preconnect` resource hints and `lazy-loading` for high-speed content delivery and improved Core Web Vitals.

* **WCAG Compliance:** Semantic HTML5 and ARIA-labeled navigation for maximum screen-reader accessibility and mobile-first indexing.

* **Responsive Design:** Fluid layouts engineered with **Tailwind CSS** for seamless viewing across mobile, tablet, and desktop devices.

### 🖨️ Recruiter-Centric Utility

* **Print Optimization:** Custom CSS media queries optimized for PDF generation, automatically reformatting the interactive site into a clean, professional paper resume (Ctrl+P).

* **Data Visualization:** Skill-set distribution mapped via **Chart.js** with synchronized light/dark mode logic.

---

## 🔗 Professional Links

- **LinkedIn:** [Carl Lochstampfor, Jr.](https://www.linkedin.com/in/carl-lochstampfor-jr1)
- **ODU ePortfolio:** [University Academic Portfolio](https://sites.wp.odu.edu/locky/)
- **Live Resume:** [GitHub Pages Deployment](https://clochstampfor60.github.io/resume/)
- **Résumé (PDF):** [Download Current Version](docs/Carl_Lochstampfor_Resume.pdf)

---

## 📄 Résumé Files

| Path | Purpose |
| --- | --- |
| `docs/Carl_Lochstampfor_Resume.pdf` | The published PDF — what the header download button serves. Publicly reachable. |
| `_source/Carl_Lochstampfor_Resume.docx` | The Word source the PDF is exported from. Tracked, but **not** published. |

Both use a stable, unversioned filename so links never break; the changelog records which version is current.

> **⚠️ Do not add a `.nojekyll` file to this repo.** GitHub Pages serves it through Jekyll, which ignores any path beginning with an underscore — that is the only thing keeping `_source/` (the editable résumé, with its document metadata) from being publicly downloadable. Adding `.nojekyll` would silently publish it.

When updating résumé content: edit `_source/`, export a fresh PDF over `docs/`, and commit both together.

---

## ⚖️ License

- This project is licensed under the terms of the **MIT license**.
- Designed and maintained by Carl Lochstampfor, Jr.

## 📈 Analytics & Privacy

This site uses [GoatCounter](https://www.goatcounter.com) — a privacy-first, open-source,
cookieless analytics service. No cookies are set, no personal data is collected, and no
consent banner is required. Aggregate visit counts only.

## 📜 Changelog

See [CHANGELOG_resume.md](CHANGELOG_resume.md) for notable changes to the site.
