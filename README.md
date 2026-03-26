# The CROW Journal — UW Bothell

Website for **The CROW** (Campus Research & Observational Writings), the undergraduate and graduate student research journal at the University of Washington Bothell.

No build step. No dependencies. Open any `.html` file in a browser or serve the folder with any static file server.

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
│
└── assets/                 # Images and icons
```

---

## Adding a New Volume

1. Duplicate an existing `volumes-html/volume-N.html` and update:
   - Page `<title>`
   - Masthead heading and year
   - Author bio dropdowns
   - Editorial board bio dropdowns
   - Publication cards (title, author, abstract, PDF link)

2. Add the cover image to `assets/cover-vN.jpg`

3. In `js/app.js`, prepend a new entry to the `VOLUMES` array:
   ```js
   { title: 'Volume Twelve', year: '2027', comingSoon: false, img: 'assets/cover-v12.jpg', archivePage: 'volumes-html/volume-12.html' },
   ```
   The carousel, dots, and archive grid update automatically.

4. Mark the previous "Coming Soon" entry as published by setting `comingSoon: false` and adding its `img` and `archivePage`.

---

## Publication Cards

Cards are defined as `<article class="pub-card">` elements in each volume HTML file. `archive.js` reads them on page load and:

- Counts publications and displays the total
- Cards with a real `href` on `.pub-card__title` get a stretched link (click anywhere on the card)
- Cards with `href="#"` are marked `pub-card--pdf-only` and show "Full text available in PDF download." on hover

To add a linked card, set the anchor's `href` to the article URL. To add an unlinked card, use `href="#"`.

---

## Bio Dropdowns

Each volume page has `<details class="bio-dropdown">` elements for authors and editorial board members. The open/close animation is handled by `transitions.js` using the Web Animations API.

Structure:
```html
<details class="bio-dropdown">
  <summary>Name (pronouns) · Program</summary>
  <p>Bio text here.</p>
</details>
```

For people without a bio, omit the `<p>` tag and remove the `class="bio-dropdown"` so the element renders as a plain non-interactive row.

---

## Updating the Editors Section

The editors grid on the homepage is rendered from the `EDITORS` and `ADVISORS` arrays in `js/app.js`. Update those arrays directly — no HTML changes needed.

---

## Local Development

Any static file server works:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Direct `file://` access also works for most features, but some browsers restrict local asset loading over `file://`.

---

## Design

- **Fonts:** Henny Penny (display), DM Sans (body), Poppins (nav), Inter (UI)
- **Colors:** `--dark: #191331` · `--ink: #2d2357` · `--purple: #43396d` · `--cream: #f5f0e8` · `--white: #ffffff`
- **Figma:** `figma.com/design/IOhSblaiD7OLWv9tpUm0ey`
