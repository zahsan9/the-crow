# The CROW Journal — UW Bothell

Website for **The CROW** (Campus Research & Observational Writings), the undergraduate and graduate student research journal at the University of Washington Bothell. The journal publishes research from students across all disciplines — science, health, arts, humanities, and everything in between.

No build step. No dependencies. Vanilla HTML, CSS, and JavaScript.

---

## Background

The original site was built on Wix/WordPress and had a number of pain points:

- **No author context** — publication pages listed papers with no information about who wrote them or their background
- **Broken links** — several Volume 8 PDFs pointed to a decommissioned UWB server and returned 404s
- **Abrupt UI interactions** — dropdowns and content switches snapped instantly with no transitions
- **Inconsistent visual design** — page banners, nav behavior, and card styles varied across pages
- **Bloated footer** — contained a large faded watermark text that cluttered the layout
- **No accessibility basics** — missing keyboard navigation, no print styles, broken email links

---

## What Was Improved

- **Author and editorial board bios** — added collapsible bio dropdowns on Volumes 8, 9, and 10 with smooth height animation (Web Animations API)
- **Publication cards** — full-card click area via stretched link, hover labels ("View PDF →" / "Full text available in PDF download."), 5-line abstract clamp, no underlines on titles
- **Broken Vol 8 links** — all 14 dead external URLs replaced; cards correctly marked as PDF-only
- **Guidelines dropdown** — content switches with a crossfade; only the text swaps, the decorative paper stack stays static
- **FAQ accordion** — smooth open/close, accessible `aria-expanded` states
- **Consistent banners** — all page mastheads unified to the same color and spacing
- **Footer** — removed the faded "The CROW" watermark pseudo-element
- **Nav scroll behavior** — consolidated into one place; fixed a bug where the FAQ nav link broke due to duplicate variable declarations across scripts
- **Editor icons** — saved as local SVG assets instead of Figma API URLs
- **Print styles** — added `@media print` so published papers print cleanly
- **Coming Soon indicator** — carousel card for the upcoming volume is clearly marked and non-clickable

---

## Design

- **Fonts:** Henny Penny (display), DM Sans (body), Poppins (nav), Inter (UI)
- **Colors:** `--dark: #191331` · `--ink: #2d2357` · `--purple: #43396d` · `--cream: #f5f0e8` · `--white: #ffffff`
- **Figma:** `figma.com/design/IOhSblaiD7OLWv9tpUm0ey`

---

## Local Development

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Direct `file://` access also works for most features.

---

## Structure

```
the-crow/
├── index.html              # Homepage — hero, carousel, about, editors
├── guidelines.html         # Submission guidelines with type dropdown
├── faq.html                # FAQ accordion + AI policy
├── styles.css              # All styles for all pages
│
├── js/
│   ├── app.js              # Carousel logic + editors grid (homepage only)
│   ├── archive.js          # Publication cards (volume pages only)
│   ├── guidelines.js       # Guidelines dropdown (guidelines page only)
│   ├── faq.js              # FAQ accordion (faq page only)
│   ├── submit-modal.js     # Submit button modal (all pages)
│   └── transitions.js      # Nav scroll behavior + bio dropdown animation (all pages)
│
├── volumes-html/
│   ├── volume-1.html       # 2016
│   ├── volume-2.html       # 2017
│   ├── ...
│   └── volume-10.html      # 2025
│
├── volumes-pdfs/           # PDF downloads
└── assets/                 # Images and icons
```
