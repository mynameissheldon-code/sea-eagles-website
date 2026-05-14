# Sea Eagles Group — Website Build

## Mission
Build a complete, production-ready static website for Sea Eagles Group (SES) — a 40-year-old UAE-based marine vessel owner-operator. This is a full rebuild replacing a broken WordPress/Elementor template site. Deliver a clean, authoritative, premium maritime website that reflects the company's scale and credibility.

---

## Project Structure

Build this exact folder structure before writing any code:

```
sea-eagles-website/
├── CLAUDE.md
├── index.html           (Homepage)
├── about.html           (About / Two Legacies)
├── services.html        (All Services)
├── fleet.html           (Fleet listing with specs)
├── projects.html        (Flagship Projects)
├── careers.html         (Careers)
├── contact.html         (Contact + Quote Form)
├── css/
│   ├── tokens.css       (CSS variables — design system)
│   ├── base.css         (reset, typography, shared layout)
│   ├── components.css   (nav, cards, buttons, forms, footer)
│   └── animations.css   (scroll reveals, hover transitions)
├── js/
│   ├── main.js          (nav scroll, mobile menu, reveal observer)
│   └── fleet.js         (fleet type filtering)
├── images/              (← paste all DJI_XXXX.JPG client drone shots here)
└── vessels/             (← paste all vessel PDF spec sheets here)
```

---

## Design System

### Palette (CSS tokens in `tokens.css`)

```css
:root {
  /* Backgrounds */
  --color-ivory:     #FAFBFD;   /* Page background */
  --color-pearl:     #F2F4F8;   /* Input backgrounds, subtle surfaces */
  --color-white:     #FFFFFF;   /* Cards, nav, footer sections */

  /* Borders & Dividers */
  --color-mist:      #E8ECF2;
  --color-silver:    #C8CED8;

  /* Text */
  --color-slate:     #8892A0;   /* Captions, labels */
  --color-graphite:  #5A6270;   /* Body text */
  --color-charcoal:  #3A4150;   /* Sub-headings */
  --color-navy:      #0F1D32;   /* Primary text, headings */
  --color-deep-navy: #081525;   /* Darkest — hover states, footer bg */

  /* Brand Accent */
  --color-teal:      #0BA5AC;   /* Primary accent */
  --color-teal-light:#0DC5CD;   /* Hover state for teal */
  --color-teal-wash: rgba(11, 165, 172, 0.06);
  --color-teal-wash-strong: rgba(11, 165, 172, 0.10);
  --color-teal-border: rgba(11, 165, 172, 0.20);

  /* Shadows */
  --shadow-sm:   0 1px 3px rgba(15,29,50,0.04), 0 1px 2px rgba(15,29,50,0.02);
  --shadow-md:   0 4px 16px rgba(15,29,50,0.06), 0 1px 4px rgba(15,29,50,0.04);
  --shadow-lg:   0 12px 40px rgba(15,29,50,0.08), 0 4px 12px rgba(15,29,50,0.04);
  --shadow-hover:0 16px 48px rgba(15,29,50,0.10), 0 6px 16px rgba(15,29,50,0.05);

  /* Spacing scale */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px; --space-20: 80px; --space-28: 112px;

  /* Radii */
  --radius-sm:  4px;
  --radius-md:  10px;
  --radius-lg:  16px;
  --radius-xl:  20px;
  --radius-pill:32px;
}
```

### Typography

Load via Google Fonts (add to every HTML `<head>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
```

| Role              | Font               | Size         | Weight | Notes                        |
|-------------------|--------------------|--------------|--------|------------------------------|
| Display / H1      | Playfair Display   | clamp(48px, 6.5vw, 88px) | 500 | letter-spacing: -1px |
| Section H2        | Playfair Display   | clamp(36px, 4vw, 56px)   | 500 | letter-spacing: -0.5px |
| H3 / Card title   | Playfair Display   | 22–26px      | 600    |                              |
| Body              | Outfit             | 16px         | 300–400| line-height: 1.75            |
| Nav / Labels      | Outfit             | 12–13px      | 500    | letter-spacing: 0.3px        |
| Captions / Tags   | Outfit             | 11px         | 500    | text-transform: uppercase; letter-spacing: 2px |

### Component Rules

**Navigation** — fixed, 72px tall, ivory background at 85% opacity with `backdrop-filter: blur(20px)`, 1px bottom border using `--color-mist`. Logo: `nav-logo-mark` (38px square, navy bg, rounded-10px, teal anchor emoji) + wordmark in Playfair Display. Links in Outfit 13px/500 with animated underline on hover. CTA button: navy bg, white text, 8px radius, transitions to deep-navy on hover.

**Hero** — always dark/photographic regardless of light theme. Full viewport (100vh), real client drone photo as `background-image: cover`. Gradient overlay: `linear-gradient(180deg, rgba(6,16,31,0.2) 0%, rgba(6,16,31,0.05) 40%, rgba(6,16,31,0.45) 75%, var(--color-ivory) 100%)`. Hero heading in Playfair Display, white, with one italic teal word. Stats bar: absolute bottom-right, white card panels with navy numbers in Playfair Display.

**Buttons:**
- Primary: `background: var(--color-teal)`, white text, 10px radius, `box-shadow: 0 4px 16px rgba(11,165,172,0.3)` — hover brightens teal and lifts 2px
- Dark: `background: var(--color-navy)`, white text, 10px radius — hover goes deep-navy, lifts 2px
- Teal Outline: transparent bg, `1.5px solid var(--color-teal-border)`, teal text — hover fills with `var(--color-teal-wash)`
- All buttons: Outfit 13–14px / 500 / letter-spacing 0.2px

**Cards** — white bg, `var(--shadow-sm)` at rest, `var(--shadow-hover)` + `translateY(-6px)` on hover, 16px radius, `1px solid var(--color-mist)` border that shifts to `var(--color-teal-border)` on hover.

**Section Labels** — `<div class="section-label">` pattern: teal dot + uppercase Outfit 12px/600/letter-spacing 2px in teal.

**Footer** — `background: var(--color-navy)`, `border-top-left-radius: 32px; border-top-right-radius: 32px`, 4-column grid (brand description + 3 nav columns), bottom bar with copyright. Footer links in Outfit 14px/300, rgba(255,255,255,0.4), hover to teal-light.

**Forms** — inputs use `var(--color-pearl)` background, transparent border at rest, `1.5px solid var(--color-teal)` + `box-shadow: 0 0 0 3px var(--color-teal-wash)` on focus. Outfit 14px. Labels: Outfit 13px/500/var(--color-charcoal).

---

## SEO — Fix These on Every Page

Every HTML file MUST include:
```html
<meta name="robots" content="index, follow">
<meta property="og:title" content="[Page Title] — Sea Eagles Group">
<meta property="og:description" content="[Accurate description]">
<meta property="og:url" content="https://seaeaglesgroup.com/[page]">
<meta property="og:type" content="website">
<link rel="canonical" href="https://seaeaglesgroup.com/[page]">
```
**Do NOT set `noindex, nofollow` anywhere.** This was the critical bug on the old site.

---

## Vessel Specs

Extract specs from the PDF files in the `vessels/` folder using `@vessels/filename.pdf`. Build a fleet data object in `js/fleet.js` with each vessel's name, type, LOA (length overall), beam, draft, GT (gross tonnage), speed (knots), capacity/bollard pull, flag, and class. Use these in the fleet cards on `fleet.html`.

The PDFs are named as follows — extract real specs from each:
- `Sea_Eagle_Vessel_Form20.pdf` → **SES Sea Eagle**
- `SE_Hunter_Vessel_Form20.pdf` → **SES Hunter**
- `Shooter_Vessel_Form20.pdf` → **SES Shooter** (20m variant)
- `Blue_Star_Vessel_Form20.pdf` → **SES Blue Star**
- `Seaeageles_DOLPHIN_Vessel_Form.pdf` → **SES Dolphin**
- `SE_Tiger_Vessel_Form_2026.pdf` → **SES Tiger**
- `SES__SKIPPER_VESSEL_FORM.pdf` → **SES Skipper**
- `Sea_Falcon_Vessel_Form20_1.pdf` → **SES Sea Falcon**
- `Shooter_Vessel_Form30.pdf` → **SES Shooter** (30m variant)
- `Zaki_Dream_Vessel_Form20.pdf` → **Zaki Dream**

---

## Image Assets

All client drone photos are in `images/`. DJI photos are aerial drone shots of vessels and operations. Use them as follows:

- **Hero backgrounds**: DJI_0033, DJI_0070, DJI_0010 (pick the sharpest vessel-on-water shots)
- **About section**: DJI_0046, DJI_0020 (twin vessel or side-by-side shots)
- **Fleet cards**: DJI_0053, DJI_0035, DJI_0019, DJI_0024, DJI_0023 (individual vessel close-ups)
- **Projects/banner**: DJI_0118, DJI_0132, DJI_0101 (overhead port/operation shots)
- **Services section**: DJI_0115, DJI_0126, DJI_0077 (operational context shots)
- **Contact / misc**: DJI_0152, DJI_0155, DJI_0156, DJI_0157, DJI_0133, DJI_0138

All images are `.JPG`. Use `loading="lazy"` on everything below the fold.

---

## Company Content (Use Verbatim — Fix Typos From Old Site)

### About / Identity
- **Full legal name:** Sea Eagles Group of Companies (SES)
- **Established:** 1984, UAE
- **Sister company:** Zaki Alzayer Marine Services — founded 2011, Saudi Arabia
- **Headquarters:** Plot HD 09 A, Hamriyah Free Zone, Sharjah, UAE — P.O. Box 41900
- **Regional hubs:** Saudi Arabia · Bahrain · Singapore
- **Operations span:** Middle East · Africa · Asia · Europe
- **Key stats:** 1,200+ completed projects · 30+ owned/managed vessels · 5,000+ team members · 3+ strategic divisions

### Tagline options (use contextually):
- "Trusted Partner In Marine Industry"
- "Two Legacies, One Vision" (for About page)
- "Excellence In Marine Fleet Services"

### Services (all six — full descriptions)

1. **Vessel Chartering** — Charter solutions for crew boats, towing tugs, ASD tugs, and supply vessels tailored to project requirements across the Arabian Gulf and beyond.
2. **Marine Management & Consultancy** — Full vessel management including crew coordination, maintenance planning, operational oversight, classification and flag state compliance.
3. **Marine Agency Services** — Port clearance, crew changes, ship chandlery, customs documentation, and port agent representation across UAE, Saudi Arabia, and Bahrain.
4. **Marine Engineering & Maintenance** — Ship repair, steel fabrication, mechanical and electrical maintenance, and drydocking coordination from our in-house Hamriyah Free Zone workshop.
5. **Marine Logistics & Supply** — Sea and land logistics for offshore operations, equipment transportation, warehouse space rental, and supply chain management.
6. **Offshore Construction Support** — Platform supply, mooring and docking operations, pilotage services, and offshore construction consultancy.

*(Subsidiary)* **Well Secret Energy Services LLC** — Oilfield services including downhole equipment, completion packers, liner hanger systems, production tools, wellhead artificial lift systems, flow control equipment, and primary cementing solutions.

### Projects / Operations Areas
- Jebel Ali Island, Dubai
- The World Islands, Dubai
- Khalifa Port, Abu Dhabi
- Palm Jumeirah, Dubai

### Contact
- **Phone:** (+971) 6 5260896
- **Email:** info@seaeaglesgroup.com
- **Address:** Plot HD 09 A, Hamriyah Free Zone, Sharjah, UAE — P.O. Box 41900

---

## Pages — What to Build

### `index.html` — Homepage
Sections in order:
1. **Nav** (fixed, transparent → ivory on scroll)
2. **Hero** (full-viewport, dark photo, heading + subline + 2 CTAs + stats bar bottom-right)
3. **About teaser** (2-col: left = image with 1985 badge, right = headline + 4 feature pills + CTA)
4. **Services grid** (3×2 cards with icon, number, title, description, "Learn More" link)
5. **Fleet preview** (3 fleet cards pulled from fleet data; "View All Fleet" CTA)
6. **Projects banner** (dark rounded-corner inset with photo bg, headline, CTA, 4 landmark names)
7. **Contact teaser** (2-col: left = contact details, right = quote request form)
8. **Footer**

### `fleet.html` — Fleet
- Filter tabs at top: All · Crew Boats · Tugs · Supply Vessels · Pilot Boats · Other
- Grid of vessel cards. Each card: vessel photo (or silhouette placeholder if no photo), vessel name, type badge, spec table (LOA, GT, speed, capacity/bollard pull), "Request Charter" CTA
- Real specs pulled from the PDF forms in `vessels/`
- Fleet intro section above grid: headline + the full vessel type list

### `services.html` — Services
- Hero section (dark photo, "Marine Services Built on Trust")
- Each service as a full-width alternating section (image left/right, title, description, bullet list of sub-services)
- Process strip: 01 Request Vessel → 02 Fleet Deployment → 03 Service Completion
- Well Secret Energy subsidiary callout section at bottom

### `about.html` — About
- Hero (dark photo, "Two Legacies, One Vision")
- Company history timeline: 1984 SES founded UAE → 2011 Zaki Alzayer founded Saudi Arabia → Today: 30+ vessels, 4 continents
- Leadership section (placeholder cards for now, with "Photo Coming Soon" state)
- Stats row: 1,200+ Projects · 30+ Vessels · 5,000+ Team · 40 Years
- Locations section: UAE · Saudi Arabia · Bahrain · Singapore with descriptions
- Footer

### `projects.html` — Projects
- Hero (dark aerial photo of port)
- Projects grid with landmark photos and descriptions
- Map section (static SVG world map with markers on UAE, Saudi Arabia, Bahrain, Singapore, Africa, Europe, Asia)

### `contact.html` — Contact
- Full-page contact layout
- Left col: address card, phone, email, Google Maps embed (Hamriyah Free Zone, Sharjah)
- Right col: full quote request form (Name, Company, Email, Phone, Service interest dropdown, Message, Submit)
- No third-party form embeds — pure HTML form with `action="mailto:info@seaeaglesgroup.com"` as fallback

### `careers.html` — Careers
- Hero (dark photo of vessel crew)
- "Why Sea Eagles" section (4 benefit cards: Competitive Pay, Global Operations, Career Growth, Safety First)
- Open roles section (placeholder cards with "Apply Now" mailto links)
- Footer

---

## Animations & Interactions

- **Scroll reveal**: All section content fades up (`opacity: 0 → 1`, `translateY(32px → 0)`) via `IntersectionObserver` with 0.7s cubic-bezier(0.16, 1, 0.3, 1) transition. Stagger siblings with `transition-delay`.
- **Nav scroll**: On scroll past 100px, nav background transitions from `rgba(250,251,253,0.85)` to `rgba(250,251,253,0.98)` with stronger shadow.
- **Fleet filter**: Clicking a filter tab shows/hides cards with a 0.3s opacity + transform transition. No page reload.
- **Card hover**: `translateY(-6px)` + shadow escalation + border teal tint.
- **Button hover**: 2px lift + teal brightens or background deepens depending on variant.
- **Hero stats**: fade-in with 0.7s delay after hero loads.

---

## Quality Checklist

Before considering the build complete, verify:

- [ ] All 8 HTML pages created and interlinked in nav
- [ ] `robots` meta tag says `index, follow` on every page
- [ ] OG tags present on every page with accurate titles and descriptions
- [ ] No references to `themexriver.com` anywhere in the code
- [ ] No "Made with Fillout" or third-party branding visible
- [ ] All images use `loading="lazy"` (except hero, which uses `loading="eager"`)
- [ ] Fleet cards populated with real specs from PDF files
- [ ] Mobile navigation (hamburger menu) works on all pages
- [ ] Contact form has real email and company name in all fields
- [ ] Footer copyright says "Sea Eagles Group (SES)" not any template default
- [ ] No spelling errors: "Headquarters" not "Headquater", "Worldwide" not "Wordwide"
- [ ] Nav active state highlights current page
- [ ] All internal links work (no 404s)
- [ ] `<title>` tags are unique per page

---

## Tech Constraints

- **Pure HTML/CSS/JS** — no framework, no build step, no npm. Must open directly in browser via file:// or any static host.
- **No external JS libraries** — no jQuery, no Bootstrap. Only Google Fonts (CSS import).
- **No WordPress, no Elementor, no WooCommerce.**
- **No inline styles** — all styling via the CSS files in `css/`.
- **CSS custom properties** — all colors, spacing, and shadows via `tokens.css` variables. Never hardcode hex values in component CSS.
- **Semantic HTML** — use `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<header>` correctly.
- Images should use the real client drone shots from `images/`. Do not use placeholder services like picsum.photos.

---

## Start Here

1. Read each PDF in `vessels/` using `@vessels/filename.pdf` — extract real vessel specs into a structured JS object in `fleet.js`
2. Build `css/tokens.css` first — the full variable system
3. Build `css/base.css` — reset, typography scale, shared utilities
4. Build `css/components.css` — nav, buttons, cards, forms, footer, section-label pattern
5. Build `css/animations.css` — reveal keyframes, hover transitions
6. Build `js/main.js` — scroll nav, mobile menu toggle, IntersectionObserver reveal
7. Build `js/fleet.js` — vessel data object + filter logic
8. Build `index.html` — homepage first (most complex, sets the pattern)
9. Build remaining pages: `fleet.html`, `services.html`, `about.html`, `projects.html`, `contact.html`, `careers.html`
10. Final pass: verify every item in the Quality Checklist above
