# The CROW Journal — UW Bothell

Website for **The CROW** (Campus Research & Observational Writings), the undergraduate and graduate student research journal at the University of Washington Bothell. The journal publishes research from students across all disciplines — science, health, arts, humanities, and everything in between.

No build step. No dependencies. Vanilla HTML, CSS, and JavaScript.

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

---

## Local Development

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Direct `file://` access also works for most features.

---

## Background

The original site was built on Wix/WordPress. The redesign addressed several pain points:

| Pain point | What changed |
|---|---|
| No author context — papers were listed with no information about who wrote them | Added collapsible bio dropdowns on Volumes 8–10 for authors and editorial board members |
| Broken links — Volume 8 PDFs pointed to a decommissioned UWB server | Dead URLs replaced; affected cards correctly marked as PDF-only |
| Jarring UI — dropdowns and content switches snapped with no transitions | Smooth height animation on bio dropdowns (Web Animations API); crossfade on guidelines content swap |
| Inconsistent visual design across pages | Unified page banner color and spacing; consistent nav scroll behavior |
| Publication cards gave no affordance for interaction | Full-card click area, hover labels, and 5-line abstract clamp |
| Cluttered footer with a large faded watermark | Watermark pseudo-element removed |
| Broken email links, no print styles, missing Instagram handle | Fixed across all pages; print styles added |

---

## Design

- **Fonts:** Henny Penny (display), DM Sans (body), Poppins (nav), Inter (UI)
- **Colors:** `--dark: #191331` · `--ink: #2d2357` · `--purple: #43396d` · `--cream: #f5f0e8` · `--white: #ffffff`
- **Figma:** `figma.com/design/IOhSblaiD7OLWv9tpUm0ey`
