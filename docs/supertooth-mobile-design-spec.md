# Supertooth Dentistry — Mobile Website Design Specification

**Reference:** Selected light, editorial mobile homepage concept  
**Primary viewport:** 390 × 844 CSS px  
**Design character:** Calm, contemporary, premium, warm, local, and uncomplicated

---

## 1. Design Intent

The experience should feel closer to a modern Seattle wellness studio or boutique hotel than a conventional dental website.

The first screen has one simple visual sequence:

1. Recognize the practice name.
2. Read one concise promise.
3. See the location context.
4. Take one primary action.
5. Absorb one warm, aspirational office image.

The design deliberately avoids visual competition. There are no ratings, insurance logos, feature chips, multiple calls to action, promotional banners, or text placed over photography in the opening view.

### Core principles

- **One focal point at a time.** Every screen section has one dominant message or object.
- **Use space as structure.** Separation comes primarily from whitespace, not borders or containers.
- **Keep copy short.** The page should be understood through scanning rather than reading.
- **Show the environment.** Photography should communicate calm, light, cleanliness, and quality.
- **Avoid clinical coldness.** Use warm neutrals, natural materials, and soft daylight.
- **Premium, not exclusive.** Sophisticated styling should remain approachable and readable.

---

## 2. Brand Tone

### Personality

- Calm
- Assured
- Thoughtful
- Modern
- Warm
- Precise
- Unhurried

### Writing style

Use plain, confident language. Prefer one short sentence over a paragraph. Avoid exaggerated claims, jargon, urgency, or language that makes dentistry sound frightening.

**Recommended:**

- “Dental visits, made better.”
- “Modern care in Queen Anne.”
- “A calmer kind of dental care.”
- “Thoughtful care, designed around you.”

**Avoid:**

- “World-class, state-of-the-art dental solutions”
- “Transform your smile today!”
- “Don’t delay—book now!”
- Long lists of services in the hero

### Voice rules

- Headline: 3–7 words preferred; 10 words maximum.
- Supporting copy: one line when possible; two lines maximum.
- Buttons: direct verb + outcome, ideally 2–4 words.
- Use sentence case for messaging.
- Use uppercase only for the wordmark, navigation labels, eyebrow text, and primary button labels.

---

## 3. Typography

The typography creates most of the design’s personality. It combines a light modern sans serif with a restrained editorial serif accent.

### Primary font family

**Manrope** — Google Fonts  
Use for the wordmark, navigation, headline base, body copy, labels, and buttons.

Fallback stack:

```css
font-family: "Manrope", "Helvetica Neue", Arial, sans-serif;
```

Recommended loaded weights:

- 300 — display headline and large body text
- 400 — body and navigation
- 500 — button labels and small emphasis

Do not use 600–800 in the main experience. Heavy typography will make the design feel denser and more conventional.

### Editorial accent font

**Cormorant Garamond Italic** — Google Fonts  
Use only for one emphasized word or short phrase inside a display headline.

Fallback stack:

```css
font-family: "Cormorant Garamond", Georgia, serif;
font-style: italic;
```

Recommended weight: 400.

Do not use the serif for paragraphs, navigation, buttons, service descriptions, or multiple words across every headline.

### Mobile type scale

| Role | Font | Size | Weight | Line height | Tracking |
|---|---|---:|---:|---:|---:|
| Wordmark | Manrope | 17px | 400 | 1 | 0.28em |
| Hero headline | Manrope | clamp(52px, 14vw, 68px) | 300 | 0.94 | -0.045em |
| Hero accent | Cormorant Garamond Italic | 1.08em relative to headline | 400 | inherit | -0.035em |
| Hero support | Manrope | 20px | 300 | 1.4 | -0.02em |
| Section heading | Manrope | 38px | 300 | 1.05 | -0.035em |
| Body large | Manrope | 18px | 300 | 1.55 | -0.015em |
| Body standard | Manrope | 16px | 400 | 1.6 | -0.01em |
| Eyebrow | Manrope | 12px | 500 | 1.2 | 0.16em |
| Button | Manrope | 16px | 500 | 1 | 0.1em |
| Small metadata | Manrope | 13px | 400 | 1.45 | 0 |

### Headline behavior

Preferred mobile line break:

```text
Dental visits,
made better.
```

Keep “made better.” together when the viewport permits. The word “better” receives the italic serif treatment and dark-green color.

Do not justify text or allow an orphaned one-word first line. Use manual line-break control at the component level if necessary.

---

## 4. Color System

The palette is light, warm, and low contrast except where contrast is required for reading and interaction.

### Core tokens

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#F7F6F1` | Main page background |
| `--surface` | `#FCFBF7` | Optional elevated/light section |
| `--ink` | `#172219` | Primary text and menu icon |
| `--ink-muted` | `#65645F` | Supporting copy |
| `--forest` | `#173E28` | Primary button and editorial accent |
| `--forest-hover` | `#102E1D` | Pressed/hover state |
| `--sage-soft` | `#DCE4D9` | Optional subtle highlight |
| `--line` | `#DDDCD5` | Rare dividers and form outlines |
| `--focus` | `#2D6A48` | Accessible focus ring |
| `--error` | `#A43D32` | Form errors only |

### Usage ratio

- 75–85% warm canvas
- 10–20% photography and natural material color
- 5% or less forest green

Avoid large dark sections in the first two mobile viewports. Dark green should indicate emphasis and action, not become the page background.

### Accessibility

- Primary text on canvas must meet WCAG AA.
- Button text must be white on forest green.
- Muted text should not be used below 16px unless contrast is verified.
- Never communicate state through color alone.

---

## 5. Mobile Layout System

### Breakpoints

```css
--bp-small: 360px;
--bp-mobile: 480px;
--bp-tablet: 768px;
--bp-desktop: 1024px;
--bp-wide: 1440px;
```

Design mobile-first. The reference composition should remain intact from 360px through 767px.

### Page container

```css
.mobile-shell {
  width: 100%;
  max-width: 480px;
  margin-inline: auto;
  padding-inline: clamp(24px, 6.4vw, 32px);
}
```

At 390px width, use approximately 26px horizontal page margins. Do not push key content against the screen edge.

### Spacing scale

Use an 8px base with selected 4px intermediates:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 40px;
--space-8: 48px;
--space-9: 64px;
--space-10: 80px;
--space-11: 96px;
```

Whitespace should be visibly generous. Do not reduce spacing merely to place more content above the fold.

### Safe areas

```css
padding-top: max(24px, env(safe-area-inset-top));
padding-bottom: max(24px, env(safe-area-inset-bottom));
```

### Recommended first-screen measurements at 390px

- Header top: 28–32px
- Header height: 36–40px
- Header to headline: 58–72px
- Headline to support line: 22–28px
- Support line to button: 28–34px
- Button to image: 22–28px
- Image bottom margin: 48–64px

---

## 6. Header Specification

### Structure

- Left: typographic wordmark, `SUPERTOOTH`
- Right: three-line menu control
- No visible phone icon, schedule button, announcement strip, or secondary navigation on mobile

### Wordmark

- Manrope 400
- 17px
- Uppercase
- Letter spacing: `0.28em`
- Color: `--ink`
- Keep on one line
- No additional “Dentistry” subline in the compact mobile header

### Menu button

- Visual icon: three horizontal lines
- Icon size: 24 × 18px
- Tap target: minimum 44 × 44px
- Stroke: 1.5–2px
- Color: `--ink`
- Background: transparent
- No circle or border in resting state

### Header behavior

Recommended: static at page top. If made sticky, use a translucent canvas with backdrop blur only after scrolling.

```css
background: color-mix(in srgb, var(--canvas) 92%, transparent);
backdrop-filter: blur(14px);
```

Do not add a drop shadow. A 1px subtle bottom divider may appear only while sticky.

---

## 7. Hero Specification

### Content order

```html
<header />
<main>
  <section class="hero">
    <h1>Dental visits, made <em>better</em>.</h1>
    <p>Modern care in Queen Anne.</p>
    <a class="primary-cta">Book a visit</a>
    <figure class="hero-image">...</figure>
  </section>
</main>
```

### Hero headline

- Maximum width: 330–350px at a 390px viewport
- Left aligned
- Dark ink base
- “better” in italic serif and forest green
- Avoid animation that delays readability

### Supporting line

- Exactly one concise sentence
- Muted neutral color
- Maximum width: 330px
- Do not add ratings, location pin icons, insurance details, or operating hours here

### Primary CTA

At 390px:

- Width: approximately 198–220px, not necessarily full width
- Height: 56–60px
- Border radius: 7–10px
- Background: `--forest`
- Label: uppercase
- White text
- Horizontal padding: 30–36px
- No icon required

States:

```css
.primary-cta:hover { background: var(--forest-hover); }
.primary-cta:active { transform: translateY(1px); }
.primary-cta:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--focus) 35%, transparent);
  outline-offset: 3px;
}
```

Respect `prefers-reduced-motion`. Motion should never be required to understand state.

### Hero photograph

- One image only
- Separate from text; never place copy over the image
- Full available content width
- Portrait-to-square mobile crop, approximately `4 / 5`
- Border radius: 16–20px
- `object-fit: cover`
- Suggested `object-position: center center`
- No heavy shadow

```css
.hero-image {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 18px;
  background: #E8E4DA;
}

.hero-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
```

### Image subject and art direction

Show the physical environment rather than a posed smiling patient.

Preferred characteristics:

- Real practice interior where available
- Natural Pacific Northwest daylight
- Warm pale wood
- Warm white walls
- Green plants
- Clean but lived-in styling
- One visible dental chair or recognizable clinical detail
- Depth and a clear view through the room
- Soft highlights and realistic material texture

Avoid:

- Blue-tinted clinical stock imagery
- Artificially white teeth close-ups
- Posed team lineups in the hero
- Overexposure or HDR processing
- Visible patient information
- Cluttered equipment
- Text baked into photographs

Image delivery:

- AVIF primary, WebP fallback
- Mobile source around 900–1200px wide
- Aim for 150–300KB where visual quality allows
- Provide meaningful alt text, for example: “Sunlit treatment room at Supertooth Dentistry in Queen Anne.”

---

## 8. Below-the-Fold System

The simplicity of the hero should continue through the site. Do not switch immediately into a dense grid of dark cards.

### Recommended section sequence

1. Short practice philosophy
2. Three key care benefits
3. Selected services
4. Team introduction
5. Office/gallery
6. Patient confidence or reviews
7. Insurance and payment information
8. Location and appointment CTA

### Section pattern

Each section should generally contain:

- Optional small eyebrow
- One short heading
- One concise paragraph
- One image, list, or action

Use 80–96px vertical spacing between major sections on mobile.

### Benefits

Limit to three benefits. Use a simple stacked list with subtle dividers rather than large dark cards.

Example structure:

- Appointments designed around your day
- Clear recommendations without pressure
- Modern technology with a human touch

Keep each description below 18 words.

### Services

Do not show every service on the homepage. Feature 4–6 high-priority categories and link to the full services page.

Use text rows or light cards with:

- Service name
- One-line description
- Simple arrow

### Reviews

Reviews should appear after the practice and service story—not in the opening hero. Use one review at a time or a quiet vertical stack. Avoid a logo-heavy ratings block.

### Final CTA

Use a light surface with a single headline and one appointment button. A dark-green full-width footer is acceptable near the very bottom, but not required.

---

## 9. Component Styling

### Buttons

Primary:

- Forest fill
- White label
- 56px minimum height
- 8px radius
- No shadow

Secondary:

- Transparent background
- 1px `--line` border or plain underlined text
- Ink text

Avoid pill buttons unless the wider brand system explicitly calls for them.

### Cards

Cards should be uncommon. When needed:

- Surface: `--surface`
- Border: 1px `--line`
- Radius: 14–18px
- Shadow: none or extremely subtle
- Padding: 24px

### Forms

- Single-column mobile layout
- Labels above fields
- Field height: 52–56px
- Border: 1px solid `--line`
- Radius: 8px
- 16px input text to prevent iOS zoom
- Clear inline error message
- Never use placeholder text as the only label

### Icons

- Thin, consistent 1.5–2px stroke
- 20–24px visual size
- Use sparingly
- Do not place an icon beside every text row

### Dividers

Use only where semantic grouping needs clarification. Prefer whitespace.

---

## 10. Navigation and Interaction

### Menu overlay

On activation, open a full-height canvas-colored sheet.

Recommended items:

- About
- Services
- New patients
- Insurance
- Visit us
- Book a visit

Menu styling:

- Large light-weight text, 32–38px
- 18–24px gap between items
- Close control in the header position
- Appointment action visually emphasized in forest green

### Motion

Motion should be nearly invisible:

- 160–220ms for controls
- 240–320ms for menu sheet
- Ease: `cubic-bezier(0.22, 1, 0.36, 1)`
- Optional gentle image reveal on load, maximum 12px movement

Do not animate each word, add parallax to the hero, or use looping decorative motion.

### Touch and keyboard

- Minimum touch target: 44 × 44px
- Maintain logical tab order
- Visible keyboard focus on every interactive element
- Escape closes the menu
- Trap focus within an open modal/menu
- Restore focus to the menu button after closing

---

## 11. Responsive Behavior

### 360–479px

- Single-column layout
- 24–28px side margins
- Hero headline scales with `clamp()`
- Button may remain content-width
- Image uses 4:5 ratio
- Preserve generous vertical rhythm

### 480–767px

- Maximum mobile shell of 480–560px
- Slightly larger margins and image
- Hero headline may increase to 68–74px
- Do not introduce extra columns solely because space is available

### 768–1023px

- Hero may become a two-column composition
- Text: approximately 42%
- Image: approximately 50%
- 8% gap/negative space
- Vertically center text against the photograph
- Maintain no-overlap rule

### 1024px and above

Recommended desktop hero:

```css
grid-template-columns: minmax(360px, 0.85fr) minmax(520px, 1.15fr);
gap: clamp(64px, 8vw, 140px);
align-items: center;
```

- Maximum page width: 1320–1440px
- Side padding: 48–80px
- Hero image landscape or near-square
- Headline maximum: 4–5 lines only if intentionally art-directed
- Keep the header equally restrained

---

## 12. Suggested Design Tokens

```css
:root {
  --font-sans: "Manrope", "Helvetica Neue", Arial, sans-serif;
  --font-serif: "Cormorant Garamond", Georgia, serif;

  --canvas: #F7F6F1;
  --surface: #FCFBF7;
  --ink: #172219;
  --ink-muted: #65645F;
  --forest: #173E28;
  --forest-hover: #102E1D;
  --sage-soft: #DCE4D9;
  --line: #DDDCD5;
  --focus: #2D6A48;
  --error: #A43D32;

  --radius-control: 8px;
  --radius-card: 16px;
  --radius-image: 18px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 40px;
  --space-8: 48px;
  --space-9: 64px;
  --space-10: 80px;
  --space-11: 96px;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 180ms;
  --duration-standard: 280ms;
}
```

---

## 13. Reference Hero CSS

```css
body {
  margin: 0;
  background: var(--canvas);
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.site-header,
.hero {
  width: min(100%, 480px);
  margin-inline: auto;
  padding-inline: clamp(24px, 6.4vw, 32px);
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: max(28px, env(safe-area-inset-top));
}

.wordmark {
  font-size: 17px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.hero {
  padding-top: clamp(58px, 15vw, 76px);
  padding-bottom: 64px;
}

.hero h1 {
  max-width: 350px;
  margin: 0;
  font-size: clamp(52px, 14vw, 68px);
  font-weight: 300;
  line-height: 0.94;
  letter-spacing: -0.045em;
}

.hero h1 em {
  color: var(--forest);
  font-family: var(--font-serif);
  font-size: 1.08em;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.035em;
}

.hero-copy {
  margin: 24px 0 0;
  color: var(--ink-muted);
  font-size: 20px;
  font-weight: 300;
  line-height: 1.4;
  letter-spacing: -0.02em;
}

.primary-cta {
  display: inline-flex;
  min-height: 58px;
  margin-top: 30px;
  padding-inline: 34px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-control);
  background: var(--forest);
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.hero-image {
  aspect-ratio: 4 / 5;
  margin: 26px 0 0;
  overflow: hidden;
  border-radius: var(--radius-image);
}

.hero-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

@media (min-width: 768px) {
  .site-header,
  .hero {
    width: min(100% - 80px, 1320px);
    max-width: none;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(320px, 0.85fr) minmax(440px, 1.15fr);
    gap: clamp(64px, 8vw, 140px);
    align-items: center;
  }

  .hero-image {
    margin-top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## 14. Performance and Technical Requirements

- Target Lighthouse mobile performance score: 90+.
- Target Largest Contentful Paint: below 2.5 seconds on a typical mobile connection.
- Reserve image dimensions to prevent layout shift.
- Preload only the hero image and essential font files.
- Self-host fonts where practical.
- Use `font-display: swap`.
- Load only required font weights.
- Lazy-load all images below the first viewport.
- Avoid autoplay video in the hero.
- Avoid third-party widgets above the fold.
- Use semantic HTML landmarks and one page-level `h1`.
- Appointment links should have descriptive accessible names.
- Analytics must not delay initial rendering.

---

## 15. Quality Checklist

Before implementation approval, verify:

- [ ] The hero contains one headline, one supporting line, one action, and one photograph.
- [ ] No text overlaps the hero photograph.
- [ ] The word “better” is the only serif accent in the hero.
- [ ] The page background is a warm off-white, not pure white.
- [ ] Typography feels light but remains readable.
- [ ] The menu and button touch targets are at least 44px.
- [ ] The button and text pass WCAG AA contrast checks.
- [ ] The 360px layout does not clip or create horizontal scrolling.
- [ ] The hero photograph has a reserved aspect ratio and optimized sources.
- [ ] There are no competing hero actions, badges, chips, or ratings.
- [ ] Below-the-fold sections preserve the same spacing and tone.
- [ ] Reduced-motion preferences are respected.
- [ ] The page remains usable with keyboard navigation and 200% text zoom.

---

## 16. Implementation Summary

The defining quality of this design is restraint. Its identity does not come from decorative effects; it comes from light typography, warm negative space, disciplined content, a single forest-green action, and one exceptional photograph. If the implementation begins to feel empty, the solution should be better photography or more intentional spacing—not additional cards, copy, icons, or promotional elements.
