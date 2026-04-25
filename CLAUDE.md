# Arateki Instagram — project guide

Browser-based Instagram post generator for Arateki, a minimalist-aesthetic company (open software/hardware, digital sovereignty). No build step, no bundler, no server.

---

## 1. Stack and execution

| Layer | Technology |
|---|---|
| UI | React 18 via CDN (UMD) |
| JSX | Babel Standalone (transpiled in-browser) |
| Export | `html-to-image` |
| Styles | Plain CSS (CSS custom properties) |
| State | Local `useState`, no external store |

**To view:** open `Instagram Posts.html` directly in a browser. There is no `npm install`, `pnpm`, `node`, or any build step.

---

## 2. File architecture

```
Instagram Posts.html      # entrypoint — loads all scripts and mounts the app
design-canvas.jsx         # Figma-like canvas (pan/zoom, artboards, sections, post-its)
tweaks-panel.jsx          # global tweaks sidebar (theme, weight, decor…)
ig-common.jsx             # shared primitives: IgCanvas, IgHeader, IgFooter, IgEdit, IgMono, IgRule…
ig-decor.jsx              # independent decoration effects; exports IgDecor
ig-data.jsx               # default data for all templates (IG_DEFAULTS)
ig-posts.css              # post base classes (.ig-canvas, .ig-chrome-top…)
colors_and_type.css       # Arateki brand color and typography tokens
ig-manifesto.jsx          # 6 manifesto / brand-statement templates
ig-announce.jsx           # 6 product launch / announcement templates
ig-educational.jsx        # 6 educational / explainer templates
ig-carousel.jsx           # 3 carousel components (cover + page + CTA)
ig-event.jsx              # 6 event / save-the-date templates
ig-job.jsx                # 6 job posting templates
ig-blog.jsx               # 6 blog / article templates
ig-transparency.jsx       # 6 transparency / metrics templates
ig-product.jsx            # 6 product feature templates
ig-testimonial.jsx        # 6 testimonial / quote-from-user templates
ig-usecase.jsx            # 6 use-case / persona templates
ig-tutorial.jsx           # 6 tutorial / how-to templates
ig-quote.jsx              # 6 external quote / citation templates
```

**Script load order** in `Instagram Posts.html` is critical. Required sequence:

1. `design-canvas.jsx` and `tweaks-panel.jsx` — UI shell
2. `ig-common.jsx` — shared primitives used by all templates
3. `ig-decor.jsx` — `IgDecor` used by `TplInner`
4. `ig-data.jsx` — `IG_DEFAULTS` used by `useTemplateData`
5. Template files in any order (they only reference `window` globals from 1–4)

---

## 3. How templates work

Each template (e.g. `IgManifesto01`) receives `{ data, onEdit, format }` and returns plain JSX. They are isolated functions — no class components, no props beyond those three.

**Rendering pipeline:**

1. `IG_DEFAULTS[key]` → initial data (in `ig-data.jsx`)
2. `useTemplateData(key)` (in `Instagram Posts.html`) → editable state
3. `TplInner` → applies theme/weight/color CSS variables and wraps with `IgDecor`
4. `TplFrame` → scales from native size (1080px) to the canvas artboard size
5. `DCArtboard` / `DCSection` → mounts on canvas with drag-reorder and focus overlay

**Adding a new template:**
1. Create function `IgXxx01` in the relevant category file
2. Add default data to `IG_DEFAULTS` in `ig-data.jsx`
3. Register on `window` at the bottom of the file (`Object.assign(window, { IgXxx01 })`)
4. Add `makeCard(...)` in the correct section inside `Instagram Posts.html`

---

## 4. Arateki visual identity

**Philosophy:** essentialism — black, white, and silence. Nothing decorative.

### Palette
| CSS token | Value | Use |
|---|---|---|
| `--ark-black` | `#000000` | primary |
| `--ark-white` | `#FFFFFF` | primary |
| `--ark-graphite` | `#1A1A1A` | soft black for large surfaces |
| `--ark-offwhite` | `#F5F2ED` | stationery white |
| `--ark-gray-medium` | `#666666` | secondary text |
| `--ark-gray-border` | `#E0E0E0` | hairlines, dividers |

Semantic theme variables: `--fg-1` (primary), `--fg-2` (secondary), `--fg-3` (tertiary), `--bg-1` / `--bg-2` / `--bg-3`.

### Typography
- **Font:** Montserrat (self-hosted in `fonts/`), weights 100–900 + italics
- **Display:** `letter-spacing: -0.02em`, `line-height: 1.05`
- **Labels/eyebrow:** ALL CAPS, `letter-spacing: 0.24em–0.34em`, weight 600
- **Logo:** `letter-spacing: 0.34em`, text rendered as `A R A T E K I` (manually spaced)
- Never use ornamental decoration; size and tracking do the visual work

### Monogram
`IgMono` — inline SVG, two triangles converging to center, inherits `currentColor`.

### Rules
- Horizontal rules (`ig-rule`) are a core brand motif
- Maximum `border-radius`: `2px` — do not use generous rounded corners
- Shadows used with extreme restraint (subtle `box-shadow` on artboards only)

---

## 5. Global tweaks system

The `TweaksPanel` (bottom-right corner) controls CSS variables applied to all posts simultaneously:

| Tweak key | Type | Effect |
|---|---|---|
| `theme` | `light / dark / color` | selects white, black, or custom post background |
| `bgColor` | hex | custom background color used when `theme` is `color` |
| `bgColor2` | hex | secondary color for gradient and patterned fills |
| `bgFill` | `solid / linear / radial / split / bands / wash` | custom background fill mode |
| `bgAngle` | 0–360 | angle for directional custom background fills |
| `weight` | 300/400/500/700 | `--ig-weight` (display text weight) |
| `weightSmall` | 300/400/500/600/700 | `--ig-weight-small` (labels/logo) |
| `sizeScale` | float 0.7–1.4 | `--ig-size-scale` (display type scale) |
| `smallScale` | float 0.7–1.4 | `--ig-small-scale` (label scale) |
| `chromePad` | 40–140px | `--ig-chrome-pad` (top/bottom chrome padding) |
| `textColor` | hex | text color; monochrome background controls set it to the inverse color |
| `secondaryTextColor` | hex / empty | optional override for `--fg-2`; empty keeps automatic secondary color |
| `decorGrid` | bool | dashed SVG grid |
| `decorDots` | bool | dot pattern grid |
| `decorDiagonals` | bool | 45° hatch lines |
| `decorScanlines` | bool | horizontal scan lines |
| `decorGrain` | bool | subtle micrograin texture |
| `decorTopography` | bool | abstract contour lines |
| `decorAxes` | bool | technical ruler ticks and center axes |
| `decorDataBars` | bool | sparse analytical data bars |
| `decorIsoMesh` | bool | subtle isometric wire mesh |
| `decorOrbits` | bool | editorial orbital arcs |
| `decorSignal` | bool | waveform/signal traces |
| `decorCircuit` | bool | linear circuit paths |
| `decorModules` | bool | modular editorial blocks |
| `decorBarcode` | bool | marginal barcode system |
| `decorCropMarks` | bool | editorial crop/safe-area marks |
| `decorColumns` | bool | reading-column composition guides |
| `decorFocusWindow` | bool | framed focus window |
| `decorMarginNotes` | bool | marginal annotation marks |
| `decorGhostBand` | bool | large ghosted typographic band |
| `decorSoftBlob` | bool | soft organic abstract shapes |
| `decorPaperFold` | bool | folded-paper corner planes |
| `decorInkSpread` | bool | diffuse ink-like marks |
| `decorRibbon` | bool | diagonal campaign ribbon |
| `decorBurst` | bool | radial burst accent |
| `decorThread` | bool | social proof / connection thread |
| `decorCalendar` | bool | event calendar marker |
| `decorStack` | bool | stacked product/content cards |
| `decorQuoteMarks` | bool | oversized quote marks |
| `decorSteps` | bool | numbered process path |
| `decorFineFrame` | bool | luxury double hairline frame |
| `decorHairline` | bool | editorial ornamental hairlines |
| `decorMedallion` | bool | centered seal/medallion rings |
| `decorGuilloche` | bool | fine security-print wave pattern |
| `decorLinen` | bool | subtle woven linen texture |
| `decorMatte` | bool | passe-partout border mask |
| `decorPriceSeal` | bool | commerce seal/star mark |
| `decorShelf` | bool | product shelf/vitrine |
| `decorHangTag` | bool | hanging retail tag |
| `decorCatalog` | bool | product catalog grid |
| `decorPlinth` | bool | product display base |
| `decorMindMap` | bool | learning mind-map nodes |
| `decorChalk` | bool | chalkboard-style notes |
| `decorMarker` | bool | translucent highlight strokes |
| `decorDecision` | bool | decision-flow diagram |
| `decorLayers` | bool | didactic stacked layers |
| `decorTicket` | bool | event ticket stub |
| `decorSeatMap` | bool | venue seat map |
| `decorWristband` | bool | event wristband/credential |
| `decorAgenda` | bool | event agenda timeline |
| `decorConstellation` | bool | participant constellation |
| `decorCertSeal` | bool | institutional certification seal |
| `decorSignature` | bool | signature/rubric stroke |
| `decorStamp` | bool | stamped document mark |
| `decorArchive` | bool | archive/folder stack |
| `decorAudit` | bool | audit/check trail |
| `decorReactions` | bool | social reaction marks |
| `decorBubbles` | bool | abstract chat bubbles |
| `decorStoryFrame` | bool | story-style frame |
| `decorComments` | bool | stacked comment rows |
| `decorSocialStats` | bool | social metrics lines |
| `decorCorners` | bool | L-bracket corner marks |
| `decorVignette` | bool | radial vignette |
| `decorWatermark` | bool | diagonal ARATEKI watermark |
| `decorParticles` | bool | neural-net dot network |
| `decorGlow` | bool | radial glow (also animates particles when active) |

Every `decorXxx` boolean has a paired `decorXxxIntensity` float (0.1–2) that appears inline below the toggle when active. Transformable effects also expose `decorXxxSize` (50–200%), `decorXxxX` (-50–50%), and `decorXxxY` (-50–50%).

Defaults live in `TWEAK_DEFAULTS` at the top of the inline `<script>` in `Instagram Posts.html`.

---

## 6. Decoration layers (`ig-decor.jsx`)

Independent effects, each with its own component and `intensity` multiplier:

| Effect | Component | Default opacity | Notes |
|---|---|---|---|
| `grid` | `DecorGrid` | `0.18 × intensity` | Dashed SVG grid 135×135px |
| `dots` | `DecorDots` | `0.22 × intensity` | Dot grid 54×54px, r=1.8 |
| `diagonals` | `DecorDiagonals` | `0.09 × intensity` | 45° hatch, 24px repeat |
| `scanlines` | `DecorScanlines` | `0.07 × intensity` | 5px horizontal bands |
| `grain` | `DecorGrain` | `0.18 × intensity` (max 0.42) | layered micro-dot texture |
| `topography` | `DecorTopography` | `0.28 × intensity` | abstract contour/isoline paths |
| `axes` | `DecorAxes` | `0.48 × intensity` (max 0.90) | technical ticks, axes, micro labels |
| `dataBars` | `DecorDataBars` | `0.42 × intensity` (max 0.75) | sparse edge charts/data bars |
| `isoMesh` | `DecorIsoMesh` | `0.18 × intensity` | isometric wire pattern |
| `orbits` | `DecorOrbits` | `0.36 × intensity` (max 0.68) | editorial orbital arcs |
| `signal` | `DecorSignal` | `0.38 × intensity` (max 0.72) | waveform/signal trace |
| `circuit` | `DecorCircuit` | `0.34 × intensity` (max 0.70) | linear schematic paths |
| `modules` | `DecorModules` | `0.42 × intensity` (max 0.78) | modular edge blocks |
| `barcode` | `DecorBarcode` | `0.46 × intensity` (max 0.86) | marginal barcode marks |
| `cropMarks` | `DecorCropMarks` | `0.42 × intensity` (max 0.80) | editorial crop/safe-area marks |
| `columns` | `DecorColumns` | `0.23 × intensity` (max 0.45) | reading-column guides |
| `focusWindow` | `DecorFocusWindow` | `0.38 × intensity` (max 0.72) | framed focus window |
| `marginNotes` | `DecorMarginNotes` | `0.40 × intensity` (max 0.76) | marginal annotation marks |
| `ghostBand` | `DecorGhostBand` | `0.26 × intensity` (max 0.50) | ghosted typographic band |
| `softBlob` | `DecorSoftBlob` | `0.24 × intensity` (max 0.50) | soft organic abstract shapes |
| `paperFold` | `DecorPaperFold` | `0.32 × intensity` (max 0.62) | folded-paper corner planes |
| `inkSpread` | `DecorInkSpread` | `0.30 × intensity` (max 0.58) | diffuse ink-like marks |
| `ribbon` | `DecorRibbon` | `0.30 × intensity` (max 0.60) | diagonal campaign ribbon |
| `burst` | `DecorBurst` | `0.38 × intensity` (max 0.74) | radial burst accent |
| `thread` | `DecorThread` | `0.38 × intensity` (max 0.72) | social proof / connection thread |
| `calendar` | `DecorCalendar` | `0.42 × intensity` (max 0.78) | event calendar marker |
| `stack` | `DecorStack` | `0.34 × intensity` (max 0.68) | stacked product/content cards |
| `quoteMarks` | `DecorQuoteMarks` | `0.24 × intensity` (max 0.48) | oversized quote marks |
| `steps` | `DecorSteps` | `0.40 × intensity` (max 0.76) | numbered process path |
| `fineFrame` | `DecorFineFrame` | `0.42 × intensity` (max 0.82) | luxury double hairline frame |
| `hairline` | `DecorHairline` | `0.36 × intensity` (max 0.72) | editorial ornamental hairlines |
| `medallion` | `DecorMedallion` | `0.36 × intensity` (max 0.70) | centered seal/medallion rings |
| `guilloche` | `DecorGuilloche` | `0.24 × intensity` (max 0.48) | fine security-print wave pattern |
| `linen` | `DecorLinen` | `0.18 × intensity` (max 0.34) | subtle woven linen texture |
| `matte` | `DecorMatte` | `0.30 × intensity` (max 0.58) | passe-partout border mask |
| `priceSeal` | `DecorPriceSeal` | `0.40 × intensity` (max 0.78) | commerce seal/star mark |
| `shelf` | `DecorShelf` | `0.36 × intensity` (max 0.70) | product shelf/vitrine |
| `hangTag` | `DecorHangTag` | `0.40 × intensity` (max 0.76) | hanging retail tag |
| `catalog` | `DecorCatalog` | `0.28 × intensity` (max 0.54) | product catalog grid |
| `plinth` | `DecorPlinth` | `0.30 × intensity` (max 0.56) | product display base |
| `mindMap` | `DecorMindMap` | `0.38 × intensity` (max 0.72) | learning mind-map nodes |
| `chalk` | `DecorChalk` | `0.30 × intensity` (max 0.58) | chalkboard-style notes |
| `marker` | `DecorMarker` | `0.32 × intensity` (max 0.62) | translucent highlight strokes |
| `decision` | `DecorDecision` | `0.38 × intensity` (max 0.72) | decision-flow diagram |
| `layers` | `DecorLayers` | `0.34 × intensity` (max 0.64) | didactic stacked layers |
| `ticket` | `DecorTicket` | `0.42 × intensity` (max 0.78) | event ticket stub |
| `seatMap` | `DecorSeatMap` | `0.36 × intensity` (max 0.70) | venue seat map |
| `wristband` | `DecorWristband` | `0.34 × intensity` (max 0.68) | event wristband/credential |
| `agenda` | `DecorAgenda` | `0.38 × intensity` (max 0.74) | event agenda timeline |
| `constellation` | `DecorConstellation` | `0.38 × intensity` (max 0.72) | participant constellation |
| `certSeal` | `DecorCertSeal` | `0.40 × intensity` (max 0.76) | institutional certification seal |
| `signature` | `DecorSignature` | `0.34 × intensity` (max 0.68) | signature/rubric stroke |
| `stamp` | `DecorStamp` | `0.42 × intensity` (max 0.78) | stamped document mark |
| `archive` | `DecorArchive` | `0.34 × intensity` (max 0.66) | archive/folder stack |
| `audit` | `DecorAudit` | `0.38 × intensity` (max 0.72) | audit/check trail |
| `reactions` | `DecorReactions` | `0.38 × intensity` (max 0.72) | social reaction marks |
| `bubbles` | `DecorBubbles` | `0.34 × intensity` (max 0.68) | abstract chat bubbles |
| `storyFrame` | `DecorStoryFrame` | `0.40 × intensity` (max 0.76) | story-style frame |
| `comments` | `DecorComments` | `0.34 × intensity` (max 0.68) | stacked comment rows |
| `socialStats` | `DecorSocialStats` | `0.38 × intensity` (max 0.72) | social metrics lines |
| `corners` | `DecorCorners` | `0.40 × intensity` | L-brackets at 4 corners |
| `vignette` | `DecorVignette` | `0.55 × intensity` (max 1) | Radial fade, theme-aware |
| `watermark` | `DecorWatermark` | `0.045 × intensity` | Diagonal ARATEKI text, −22° |
| `particles` | `DecorParticles` | `0.75 × intensity` | Canvas neural-net; animated when `glow` is also active |
| `glow` | `DecorGlow` | `0.10/0.06 × intensity` | Two radial gradients; triggers particle animation |

**`IgDecor` signature:**
```js
IgDecor({ decor, theme, seed })
```

`decor` is an object with shape:
```js
{
  grid, gridI,
  dots, dotsI,
  diagonals, diagonalsI,
  scanlines, scanlinesI,
  grain, grainI,
  topography, topographyI,
  axes, axesI,
  dataBars, dataBarsI,
  isoMesh, isoMeshI,
  orbits, orbitsI,
  signal, signalI,
  circuit, circuitI,
  modules, modulesI,
  barcode, barcodeI,
  cropMarks, cropMarksI,
  columns, columnsI,
  focusWindow, focusWindowI,
  marginNotes, marginNotesI,
  ghostBand, ghostBandI,
  softBlob, softBlobI,
  paperFold, paperFoldI,
  inkSpread, inkSpreadI,
  ribbon, ribbonI,
  burst, burstI,
  thread, threadI,
  calendar, calendarI,
  stack, stackI,
  quoteMarks, quoteMarksI,
  steps, stepsI,
  fineFrame, fineFrameI,
  hairline, hairlineI,
  medallion, medallionI,
  guilloche, guillocheI,
  linen, linenI,
  matte, matteI,
  priceSeal, priceSealI,
  shelf, shelfI,
  hangTag, hangTagI,
  catalog, catalogI,
  plinth, plinthI,
  mindMap, mindMapI,
  chalk, chalkI,
  marker, markerI,
  decision, decisionI,
  layers, layersI,
  ticket, ticketI,
  seatMap, seatMapI,
  wristband, wristbandI,
  agenda, agendaI,
  constellation, constellationI,
  certSeal, certSealI,
  signature, signatureI,
  stamp, stampI,
  archive, archiveI,
  audit, auditI,
  reactions, reactionsI,
  bubbles, bubblesI,
  storyFrame, storyFrameI,
  comments, commentsI,
  socialStats, socialStatsI,
  corners, cornersI,
  vignette, vignetteI,
  watermark, watermarkI,
  particles, particlesI,
  glow, glowI,
}
```

`seed` is a deterministic integer per slotId (computed from `charCodeAt` hash in `TplInner`) — prevents identical particle layouts across posts.

`IgDecor` renders `null` if no effect is active.

---

## 7. Design canvas (`design-canvas.jsx`)

- **`DC`** — canvas token object: `bg` (`#f0eee9`), `grid` (`rgba(0,0,0,0.18)`), label/title/subtitle colors
- Canvas grid: inline SVG 120×120px via `backgroundImage`, current opacity `0.18`
- `DCSection` → grouping container with inline-editable title
- `DCArtboard` → marker component (rendered by `DCArtboardFrame`)
- Drag-reorder via grip handle; state persists to `.design-canvas.state.json`
- Focus overlay (fullscreen) via expand button or label click; ←/→/Esc navigate between artboards

---

## 8. PNG export

The `↓ PNG` button appears on artboard hover. Uses `html-to-image.toPng` on the `[data-ig-real]` element (the native 1080px `div`, before scaling). `pixelRatio: 1` — export is already at native resolution.

---

## 9. Template inventory

**14 sections, 81 distinct template functions, 96 artboard slots.**

| Section | File | SlotId prefix | Template prefix | Count |
|---|---|---|---|---|
| Frase / Manifesto | `ig-manifesto.jsx` | `m01–m07` | `IgManifesto` | 7 |
| Anúncio de produto | `ig-announce.jsx` | `a01–a07` | `IgAnnounce` | 7 |
| Dica técnica / Educativo | `ig-educational.jsx` | `e01–e07` | `IgEducational` | 7 |
| Carrossel | `ig-carousel.jsx` | `c01–c05` | `IgCarouselA_*` | 3 fn / 5 slots |
| Evento | `ig-event.jsx` | `v01–v07` | `IgEvent` | 7 |
| Vaga | `ig-job.jsx` | `j01–j07` | `IgJob` | 7 |
| Blog | `ig-blog.jsx` | `b01–b07` | `IgBlog` | 7 |
| Transparência | `ig-transparency.jsx` | `tr01–tr07` | `IgTransp` | 7 |
| Produto | `ig-product.jsx` | `prd01–prd07` | `IgProduct` | 7 |
| Depoimento | `ig-testimonial.jsx` | `d01–d07` | `IgTestimonial` | 7 |
| Caso de uso | `ig-usecase.jsx` | `u01–u07` | `IgUseCase` | 7 |
| Tutorial | `ig-tutorial.jsx` | `t01–t07` | `IgTutorial` | 7 |
| Citação externa | `ig-quote.jsx` | `q01–q07` | `IgQuote` | 7 |
| Formatos alternativos | *(reuse existing)* | `p01–p03`, `s01–s04` | — | 7 slots |

**SlotId collision rules:**
- `p01–p03` → reserved for portrait format previews in "Formatos alternativos"
- `s01–s04` → reserved for story format previews
- `prd` prefix was chosen for Produto specifically to avoid collision with `p` portrait slots
- Always check the "Formatos alternativos" section before assigning single-letter prefixes

**IG_DEFAULTS keys:** `manifesto01`–`07`, `announce01`–`07`, `educational01`–`07`, `carouselCover`, `carouselPage1`–`3`, `carouselCTA`, `event01`–`07`, `job01`–`07`, `blog01`–`07`, `transp01`–`07`, `product01`–`07`, `testimonial01`–`07`, `usecase01`–`07`, `tutorial01`–`07`, `quote01`–`07`.

**Theme arrays in `App`:** `mfThemes`, `anThemes`, `edThemes`, `evThemes`, `joThemes`, `blThemes`, `xpThemes` (transparency), `prThemes` (product), `dpThemes` (testimonial), `ucThemes`, `tuThemes`, `qzThemes` — todos com 7 entradas. Carousel uses its own `cThemes` (5 items, stricter alternation).

---

## 10. Layout primitives

All currently used structural patterns — **consult before creating new templates to avoid repeating the same layout across sections.**

| # | Name | Core technique | First used in |
|---|---|---|---|
| 1 | Centered column | `flexDirection: 'column', alignItems: 'center', textAlign: 'center'` | Manifesto |
| 2 | Three-zone chrome | `IgHeader` + flex body + `IgFooter` | Announce |
| 3 | Equal two-column | `display: 'flex'`, two `flex: 1` children | Tutorial T02 (Antes/Depois) |
| 4 | Numbered list | `{ n: '01', text: '...' }` array, `n` as label | Tutorial T01 |
| 5 | Definition rows | label `minWidth` + value, each row `borderTop` | Announce ficha, UseCase ficha |
| 6 | Terminal block | `fontFamily: '"Courier New"'` + `pre`/`code`-style wrapper | Tutorial T03 |
| 7 | Hero stat | Very large `stat` number + smaller `unit` + caption | Product P02 |
| 8 | Checklist | Square `18×18` boxes, `border: '1px solid currentColor'` | Tutorial T05 |
| 9 | Horizontal flow | `flexDirection: 'row'`, `isStory ? 'column' : 'row'` adaptive | Tutorial T06, Educational |
| 10 | Vertical timeline | `React.Fragment`, diamond `◆` + dashed `repeating-linear-gradient` connector | Transparency TR03 |
| 11 | CSS Grid 2×N | `gridTemplateColumns: '1fr 1fr'`, border-collapse trick (outer no right/bottom, cells have right+bottom) | Product P01 |
| 12 | Mosaic grid | CSS Grid + `gridColumn: '1 / 3'` hero cell + 4 regular cells | Transparency TR02 |
| 13 | Horizontal timeline | `position: relative`, markers at `(i/(n-1))*100%` absolute left | Product P03 |
| 14 | Vertical text column | `writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)'` | Product P04 |
| 15 | Progress bars | Two sibling `position: absolute` divs — track at `opacity: 0.14`, fill at full opacity, `width: pct + '%'` | Transparency TR01 |
| 16 | Row inversion | `background: inv ? 'currentColor' : 'transparent'`; IgEdit inside: `color: inv ? 'var(--bg-1)' : ...` | Transparency TR06 |
| 17 | Diagonal band | `position: absolute`, `transform: 'translateY(-50%) rotate(-2.5deg)'`, escapes padding bounds | Transparency TR04 |
| 18 | Vertical rule split | `width: '29%'`, `borderRight: '1px solid currentColor'`; `flex: 1` right side | Testimonial D03 |
| 19 | Epistolary / carta | `salutation` → `quote` body → `IgRule opacity 0.35` → `author/role` | Testimonial D04 |
| 20 | Large initial letter | First letter `260–320px`, `lineHeight: 0.82`, text below | Testimonial D01 |
| 21 | Pull-quote highlight | `IgHeader` + large `highlight` field + `IgRule` + small `quote` | Testimonial D02 |
| 22 | Horizontal split + absolute | Two `position: absolute` sections — top `height: splitH`, bottom `top: splitH` | Testimonial D06 |
| 23 | Year / sector hero | Very large (120px+) light-weight word/number as sole display element | Quote Q02, UseCase UC03 |
| 24 | Dual-author columns | Two equal flex columns each with own author line + quote | Quote Q05 |
| 25 | Three equal sectors | Three `flex: 1` children, `borderRight` between them | UseCase UC06 |
| 26 | Changelog rows | `minWidth: 130` version label column + `flex: 1` title/description | Product P05 |
| 27 | Drop cap + multi-column flow | Inicial gigante (320–440px) à esquerda + texto justificado em `columnCount` 2–3 | Manifesto M07, Blog B07 |
| 28 | Postal label / shipping form | Moldura externa fechada (`1.5px` solid) com subdivisões internas em zonas rotuladas (DE / PARA / CONTEÚDO / SELO) | Announce A07 |
| 29 | Mapping / equivalence pairs | Duas colunas conectadas por linhas tracejadas horizontais com glifo conector centralizado (`→`) sobre fundo do canvas | Educational E07 |
| 30 | Ticket / boarding pass | Bloco horizontal com perfuração tracejada vertical separando corpo e stub destacável; stub usa `writingMode: 'vertical-rl'` | Event V07 |
| 31 | Symbol-card grid | Grade 2×2 com glifo unicode em escala display (72–96px) funcionando como ícone tipográfico | Job J07 |
| 32 | SVG donut chart | `<circle>` com `strokeDasharray` proporcional, três opacidades para segmentos, valor total tipográfico no centro | Transparency TR07 |
| 33 | Comparison matrix / diff table | Grid 3 colunas (atributo + 2 itens) com indicadores simbólicos `✓ / — / ×` centralizados, legenda no rodapé | Product P07 |
| 34 | ID card / member badge | Moldura `1.5px` com cabeçalho institucional, quadro quadrado para inicial, identificação numérica monoespaçada | Testimonial D07 |
| 35 | KPI dashboard / multi-stat | Grade 2×2 onde cada célula tem rótulo + número heroico (130–180px) + unidade — múltiplos heróis coexistindo | UseCase UC07 |
| 36 | Decision tree / branching flowchart | Pergunta-raiz em moldura + ramos indentados à direita com `borderLeft` contínuo e conectores horizontais curtos | Tutorial T07 |
| 37 | Marginal annotations / scholarly note | Coluna lateral estreita com notas em itálico marcadas por superscript (`¹`, `²`), separada por régua vertical de baixa opacidade | Quote Q07 |

When creating a new template section, **pick layouts not yet used in that section's neighbors**, and ideally introduce at least one structural novelty not in this table.

---

## 11. Special CSS techniques

Patterns that are non-obvious or first-of-kind in this codebase:

### Diagonal band escaping padding
Templates with an edge-to-edge element inside the padded content wrapper must use `position: absolute; inset: 0` on the outer div, then apply `padding: 'var(--ig-chrome-pad, 80px)'` explicitly to each content section. `padding: 'inherit'` does **not** work on absolutely positioned elements.

```jsx
// Correct pattern (TR04, Q04, D06):
<div style={{ position: 'absolute', inset: 0 }}>
  <div style={{ padding: 'var(--ig-chrome-pad, 80px)' }}>top content</div>
  <div style={{ position: 'absolute', top: '43%', left: 0, right: 0,
                transform: 'translateY(-50%) rotate(-2.5deg)',
                padding: '0 var(--ig-chrome-pad, 80px)' }}>band</div>
  <div style={{ padding: 'var(--ig-chrome-pad, 80px)' }}>bottom content</div>
</div>
```

### Progress bar with independent opacity on track vs fill
`opacity` on a parent affects all children — you cannot nest fill inside track and override. Use sibling `position: absolute` divs:

```jsx
<div style={{ height: 2, position: 'relative' }}>
  <div style={{ position: 'absolute', inset: 0, background: 'currentColor', opacity: 0.14 }} />
  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0,
                width: pct + '%', background: 'currentColor' }} />
</div>
```

### Row inversion (alternating inverse rows)
```jsx
const inv = i % 2 === 1;
<div style={{ background: inv ? 'currentColor' : 'transparent',
              color: inv ? 'var(--bg-1)' : 'var(--fg-1)' }}>
```

### Vertical text
```jsx
<span style={{
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  transform: 'rotate(180deg)',
}} />
```

### Multi-column text flow (editorial)
Para corpo de texto contínuo dividido automaticamente em N colunas justificadas, use `columnCount` no contêiner imediato do `IgEdit`. Os números das colunas adaptam por formato (1 em story, 2–3 em square/portrait). `IgEdit` continua editável e o navegador faz o flow.

```jsx
<div style={{ columnCount: isStory ? 2 : 3, columnGap: 22 }}>
  <IgEdit as="p" multiline value={data.body} onChange={onEdit('body')} style={{
    fontSize: 'calc(13px * var(--ig-size-scale, 1))',
    textAlign: 'justify', hyphens: 'auto', lineHeight: 1.55,
  }} />
</div>
```

### SVG donut com strokeDasharray
Gráfico circular minimalista usando um único `<circle>` por segmento com `strokeDasharray="<dash> <gap>"` calculado a partir do `circumference = 2πr`. `strokeDashoffset` acumula percentuais entre segmentos; `transform: rotate(-90 cx cy)` move o início para o topo.

```jsx
const c = 2 * Math.PI * r;
let cumulative = 0;
segments.map((s, i) => {
  const frac = (parseFloat(data[s.vKey]) || 0) / total;
  const dash = c * frac;
  const offset = -cumulative * c;
  cumulative += frac;
  return <circle r={r} stroke="currentColor" strokeWidth={sw}
    fill="none"
    strokeDasharray={`${dash} ${c}`}
    strokeDashoffset={offset}
    transform={`rotate(-90 ${cx} ${cy})`}
    style={{ opacity: opacities[i] }} />;
});
```

### Perfuração vertical destacável (ticket)
Linha pontilhada vertical entre dois blocos `flex` para sugerir uma costura de bilhete:

```jsx
<div style={{
  width: 1, flexShrink: 0,
  backgroundImage: 'repeating-linear-gradient(to bottom, currentColor 0, currentColor 6px, transparent 6px, transparent 12px)',
  opacity: 0.55,
}} />
```

### Conector horizontal com glifo central sobre fundo
Para mapear pares com seta no meio de uma linha tracejada, use uma seta posicionada absolutamente sobre a linha com `background: var(--bg-1)` e padding lateral para "abrir" a tracejada visualmente:

```jsx
<div style={{ position: 'relative', height: 1, width: 52 }}>
  <div style={{ position: 'absolute', inset: 0,
    backgroundImage: 'repeating-linear-gradient(to right, currentColor 0, currentColor 4px, transparent 4px, transparent 9px)',
    opacity: 0.5 }} />
  <span style={{
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'var(--bg-1)', padding: '0 8px',
  }}>→</span>
</div>
```

### Dashed vertical connector (timeline)
```jsx
<div style={{
  width: 1,
  flex: 1,
  backgroundImage: 'repeating-linear-gradient(to bottom, currentColor 0, currentColor 4px, transparent 4px, transparent 9px)',
}} />
```

### CSS Grid border-collapse
To make a 2-column grid where borders merge cleanly (no double lines):
- Outer container: `border: '1px solid currentColor'`, `borderRight: 'none'`, `borderBottom: 'none'`
- Each cell: `borderRight: '1px solid currentColor'`, `borderBottom: '1px solid currentColor'`

### `var(--ig-chrome-pad, 80px)` in inline styles
React passes strings directly to DOM style — CSS variable references work fine as string values:
```jsx
style={{ padding: 'var(--ig-chrome-pad, 80px)' }}
```

---

## 12. Conventions and rules

- **No `console.log`** — there's no backend; export errors go to `console.error`
- **CSS via variables** — do not hardcode colors in JSX; use `--fg-1`, `--bg-1`, etc.
- **Inline editing** — use `IgEdit` (a `contentEditable` wrapper) for editable text in posts
- **Data in `ig-data.jsx`** — all template default text lives in `IG_DEFAULTS`; do not embed strings directly in JSX
- **`Object.assign(window, {...})`** at the bottom of every `.jsx` — this is the cross-script export mechanism for Babel
- **No new dependencies** — everything loads via CDN with integrity hashes; do not add libraries without discussion
- **Post formats:** `square` (1080×1080), `portrait` (1080×1350), `story` (1080×1920)
- **Brand tracking text:** `A R A T E K I`, `V A U L T`, `L A N Ç A M E N T O` — the spaces between letters are intentional brand identity, not a typo

---

## 13. For Claude Code (you, reading this)

1. **Do not introduce a build step** — the project runs as static HTML; keep it that way.
2. **Respect the visual identity** — minimalism is not lack of care; it is discipline. Every pixel has a reason.
3. **When creating new templates**, follow the `IgXxxNN({ data, onEdit, format })` pattern and register in both `IG_DEFAULTS` and `window`.
4. **Global tweaks override everything** — when setting inline styles in templates, use CSS variables (`--ig-weight`, `--fg-1`, etc.) so tweaks keep working.
5. **Do not modify `colors_and_type.css` without discussion** — it is the brand design system, not convenience CSS.
6. **Canvas grid** (`DC.grid` in `design-canvas.jsx`) and **post internal grid** (`.ig-grid-bg` in `ig-posts.css`) are distinct things — do not confuse them.
7. **`IgDecor`** is the correct way to add texture/decoration to posts; do not create backgrounds directly inside individual templates.
8. **SlotId collision:** `p01–p03` and `s01–s04` are reserved for portrait/story format previews in "Formatos alternativos". For new product or concept sections, use multi-character prefixes (`prd`, `tr`, `uc`, etc.). Never assign a single-letter prefix without checking existing slots first.
9. **Layout novelty mandate:** Before designing templates for a new section, read Section 10 (Layout primitives). Each new section should use layouts not yet dominant in adjacent sections, and ideally introduce at least one structural pattern not in the table. Document any new pattern in Section 10.
10. **`decor` is an object, not a number.** `IgDecor` receives `{ grid, gridI, dots, dotsI, … }` — not a `0–3` integer. `TplInner` builds this object from the individual `tw.decorXxx` tweak values and passes it down.
11. **Script load order matters.** When adding a new `.jsx` file, insert it after `ig-blog.jsx` (or the last existing template file) and before the closing `</body>`. `ig-common.jsx` and `ig-data.jsx` must load before any template file.
