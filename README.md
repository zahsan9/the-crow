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

The original site was built on Wix. It functioned as a storage location for articles — but failed to communicate what The CROW actually is, who it's for, or why student work here matters. The redesign addressed that positioning problem from the ground up.

### Pain points

**It wasn't clear what the site was.**
No hero, no mission statement, no immediate signal that this is a student research journal. Visitors had no idea if they were in the right place.

**The visual design undercut the work.**
A generic Wix template communicated nothing distinctive about The CROW's identity. Student research that deserved recognition was presented with the same weight as placeholder content.

**No sense of community.**
Editors, contributors, and the people behind the journal were invisible. The site felt static and institutional rather than student-run and participatory.

**The submission process was buried and intimidating.**
Guidelines were hard to find, dense, and not broken out by submission type. First-time submitters had no clear path.

**Content was hard to browse.**
Articles were listed with no author context — no bios, no program, no reason to care who wrote them. There was no way to quickly understand the range of work published.

**Dead interactions.**
No hover states, no transitions, no microinteractions. Pages felt unfinished and unresponsive to the user.

**Inconsistent design across pages.**
Different pages felt disconnected — inconsistent banners, nav behavior, card styles, and typography with no shared system underneath.

### What changed

- **Positioning** — homepage now leads with identity: what The CROW is, who it's for, and how to get involved
- **Visual design** — custom design system with a cohesive color palette, type scale, and consistent spacing across all pages
- **Community** — editors section with names, programs, and role; author bios on Volumes 8–10
- **Submission clarity** — dedicated guidelines page with a dropdown by paper type (research paper, abstract, editorial, WIP, etc.) and a full FAQ
- **Content browsability** — publication cards with abstracts, hover affordance, full-card click area, and PDF availability clearly communicated
- **Interactions** — smooth transitions throughout: bio dropdowns animate open/close, guidelines content crossfades, nav responds on scroll
- **Design consistency** — unified banner treatment, shared CSS custom properties, single stylesheet for all pages

---

## Design

- **Fonts:** Henny Penny (display), DM Sans (body), Poppins (nav), Inter (UI)
- **Colors:** `--dark: #191331` · `--ink: #2d2357` · `--purple: #43396d` · `--cream: #f5f0e8` · `--white: #ffffff`
- **Figma:** `figma.com/design/IOhSblaiD7OLWv9tpUm0ey`
