# Desktop design audit — scaling the mobile-first build up

**Date:** 2026-09-03
**Scope:** everything at `md` (768px) and above. **No mobile change.** Every
edit in the accompanying PR is an `lg:` / `xl:` / `sm:` addition or an
`md:`→`lg:` move; base classes are untouched, and the two places where a
container was restructured reproduce the phone spacing exactly.
**Status:** applied on `feature/desktop-design-audit`. Numbers below are
measured on the running site, before and after, not estimated.

---

## 0. Why this document exists

The site was built mobile-first and it shows in a good way on a phone. What
had never been designed was the *other* end: what these compositions become
when the same markup is handed 1,440 or 1,920 CSS pixels. Nothing was broken
enough to look broken, which is exactly why it survived — a one-column stack
does not error on a desktop, it just quietly stops using two thirds of the
screen and turns a 4-screen page into a 14-screen one.

This is the audit of that gap, the research it was checked against, and what
was changed.

### How things were measured

Not by eye. The running site was driven at 320 / 768 / 820 / 1024 / 1280 /
1440 / 1920px and queried directly in the page for section heights, document
scroll width, content width against container width, and reading measure.

One correction worth recording, because the first pass got it wrong: reading
measure was initially estimated as `width ÷ (font-size × 0.5)`, which
overstates character counts by roughly 25%. Every figure in this document is
the real `ch` unit — the rendered width of the font's own `0` glyph — so
"77 characters" means 77 characters. The first-pass numbers (96, 110) were
too high and are not used anywhere here or in the code comments.

---

## 1. What the research says

Sources are listed with an honest note on quality — some of this is solid
empirical work and some is marketing-blog statistics, and they should not
carry the same weight.

### Strong — used as the basis for changes

**Hidden navigation on desktop.** Nielsen Norman Group's quantitative testing
found discoverability is cut roughly in half when navigation is hidden behind
a menu control, and — the part that matters here — that the penalty is *worse*
on desktop than on mobile, because the space a hamburger saves buys nothing on
a wide screen. ([NN/g, Hamburger Menus and Hidden Navigation Hurt UX
Metrics](https://www.nngroup.com/articles/hamburger-menus/);
[Beyond the Hamburger: Desktop](https://www.nngroup.com/articles/find-navigation-desktop-not-hamburger/))

**Reflow — WCAG 2.2 SC 1.4.10 (Level AA).** Content must reflow to a 320px
viewport without two-dimensional scrolling. The number that makes this a
*desktop* criterion rather than a mobile one: 320 CSS px is exactly a 1,280px
desktop window at 400% zoom. Intermediate zoom levels land in the tablet band
— 1,536px at 200% is 768px, 1,280px at 150% is 853px — which is the band this
site was failing in. ([W3C, Understanding SC
1.4.10](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html))

**Line length.** 50–75 characters is the consistent recommendation, ~66 the
usual target, with WCAG 2.2 SC 1.4.8 setting 80 as a ceiling. The mechanism is
the eye's return sweep: under ~45 characters the rhythm breaks, over ~80 the
sweep loses accuracy and readers lose their place. ([Baymard, Readability: The
Optimal Line Length](https://baymard.com/blog/line-length-readability))

**Accessibility overlays.** Overlay widgets do not repair underlying markup,
are not endorsed by the W3C's Web Accessibility Initiative, and carry real
legal exposure — the FTC settled with accessiBe in January 2025 over
compliance claims, and industry reporting puts a quarter of digital
accessibility lawsuits at sites that had an overlay installed. The reported
failure modes are directly relevant to a zoom feature: double-zoom effects,
layouts breaking at high magnification, and the floating widget button
covering the content a reader just magnified. This ruled out one whole class
of answer to "add an accessibility entry point". ([Overlay Fact
Sheet](https://overlayfactsheet.com/); [University of Iowa, Guidance on Web
Accessibility Overlays](https://itaccessibility.uiowa.edu/overlays))

**Content-driven breakpoints.** Current practice is to set breakpoints where
the content actually breaks rather than at device widths — add a column when
there is room for one without clutter, not when a spec sheet says "tablet".
([Tailwind, Responsive design](https://tailwindcss.com/docs/responsive-design))

**Browser and OS controls beat site-specific toggles.** UK government design
guidance is consistent that the right answer is to build with relative units
so the browser's own zoom and text-size settings work, and to tell people
those exist — not to reimplement them. ([Home Office UCD Manual, Layout and
typography](https://design.homeoffice.gov.uk/accessibility/page-structure/layout-typography))

### Weaker — directional only, not used to justify a change

Widely-quoted CTA statistics ("single-CTA pages convert at 13.5%, two at
11.9%, three or more at 10.5%") come from marketing blogs recycling each other
rather than from published methodology, and are treated here as folklore.
([Call to Action Statistics](https://wisernotify.com/blog/call-to-action-stats/))

What *is* sound in that space and is used below: **Hick's Law** (decision time
rises with the number of choices), the distinction between *competing* CTAs
and the same CTA repeated at different scroll depths — repetition of one goal
is not a second choice — and the convention that a secondary action should be
a ghost/outline button against a filled primary. The site already follows the
last two.

Baymard's [10 Desktop Web UX Best Practices](https://baymard.com/blog/desktop-ux-ecommerce)
was consulted and turned out to be almost entirely e-commerce-specific
(product thumbnails, unit pricing, filter labels). The two transferable items
— adaptive error messages, and marking both required and optional fields —
are noted in §4 as backlog candidates, not applied here.

Dental-vertical guidance was read and largely discarded as content-marketing;
the one specific claim worth keeping is that a desktop primary CTA should be
substantial rather than incidental, which is relevant to §3.5.

---

## 2. Findings, ranked

Measured at 1,440 × 900 unless stated.

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 1 | **Reflow failure, 768–866px.** The homepage scrolled horizontally. `scrollWidth` 864 at a 768px viewport. | Hero grid asked for `minmax(320px,…) + minmax(440px,…)` plus a `clamp(4rem,8vw,…)` gap = 824px of hard minimums in a container with `100vw − 80px`. Grid minimums can't shrink, so the photo overflowed. | **WCAG 2.2 AA failure** — SC 1.4.10. Hits iPad portrait, 1,536px at 200% zoom, 1,280px at 150%. |
| 2 | **No desktop navigation on the homepage.** At 1,440px the header rendered a wordmark and a hamburger. Book/Call did not appear until 24px of scroll. | Contradicts the site's own locked `docs/supertooth-navigation-requirements.md` Pattern A ("desktop = logo, primary links, persistent Book Appointment CTA, sticky"), which `Nav.tsx` implements and `EditorialNav.tsx` never did. Against NN/g's finding above. | High |
| 3 | **The page is a phone page on a desktop screen.** Homepage 12,312px = **13.7 desktop screens**. `/services` 5,262px = 5.8 screens. | The services card stack alone was 4,849px — 5.4 screens for five cards. | High |
| 4 | **A dead right column for ~7,000px of scroll.** Content sat at 768px inside a 1,192px section; at 1,920px, 1,088px of the viewport (57%) carried nothing. | Differentiators 768px, services 768px, FAQ 768px, booking 672px — all left-aligned in a 1,320px shell. | High |
| 5 | **Reading measure over the ceiling.** Worst 88 characters (13px sub-service run), FAQ answers 77, service card body 76. | The same one-column stack that is ~45 characters on a phone becomes 76–88 on a laptop. SC 1.4.8 ceiling is 80; the comfortable band is 50–75. | Medium |
| 6 | **Mobile affordances leaking onto desktop.** `w-full` pills on `/emergency` and `/offers` rendered as ~800px-wide buttons; `/contact`'s email and phone inputs were 558px each. | A 100%-width control is a thumb-target decision. At desktop width it reads as a banner, and an input far wider than its expected content is a misleading size cue. | Medium |
| 7 | **Two different "desktop" breakpoints.** `Nav.tsx` switched to its desktop row at `md` (768); `EditorialNav` never did. | `Nav.tsx`'s own code comment already documented the consequence: at 768–790px the link labels wrap to two lines inside a 64px header. It had been patched item-by-item (the Backlog link was gated to `lg`) rather than at the row level. | Medium |
| 8 | **No desktop accessibility entry point.** The only route to accessibility information was a 12px footer link — on the homepage, ~13 screens of scrolling away. | See §5: this is being solved on a parallel branch and is deliberately *not* duplicated here. | Medium |
| 9 | Header measure differs between the homepage (1,320px shell) and every other page (1,152px), so the logo and Book pill jump position when you navigate. | Cosmetic but visible on every internal navigation. | Low |

---

## 3. Page-by-page: what changed

### 3.1 Homepage — `/`

**12,312px → 8,484px. 13.7 → 9.4 desktop screens (−31%).**

- **Hero** (`EditorialHero.tsx`) — two-column split moved from `md` to `lg`,
  and both grid tracks changed to `minmax(0, …)` so they can shrink. This is
  finding #1. 768–1023px now gets the stacked composition, which is the right
  answer independently: at 688px of usable width, a 52px headline and a 440px
  photo side by side was never going to read. The figure keeps a 16:10 crop
  while stacked and takes the spec's 5:4 once it sits beside the copy.
- **Header** (`EditorialNav.tsx`) — a real desktop nav from `lg`: the four
  primary destinations, the phone number spelled out, and a persistent Book
  pill. The hamburger is hidden at `lg` so there aren't two routes to the same
  five links. Everything below 1024px is unchanged, including the scroll-reveal
  the mobile spec asks for.
  *Resolving the spec conflict:* `docs/supertooth-mobile-design-spec.md` wants
  a clean opening; `docs/supertooth-navigation-requirements.md` Pattern A locks
  a desktop nav bar. These only look mutually exclusive if the header is one
  state. The mobile spec governs the phone composition, where horizontal room
  is scarce; at `lg` there is ~1,200px of header and five short labels cost
  none of the calm.
  *Judgement call to review:* `Contact` is filtered out of the desktop link row
  because the Book pill next to it already points at `/contact`, and at 1024px
  the row does not fit with both.
- **Why choose us** (`EditorialTrustBlock.tsx`) — the five differentiator rows
  become two columns at `lg`. Measure 71 → ~45 characters; ~350px of scroll
  recovered.
- **What we treat** (`ServicesSection.tsx`) — **the single biggest change.**
  The stack becomes 2 columns at `lg`, 3 at `xl`. **4,849px → 1,771px (−63%).**
  Measure drops from 76/88 characters to 45–60. The hand-drawn connector
  segments are dropped at `lg`: they exist to carry the eye from one card down
  to the next, and in a grid there is no "next card below" to point at. Cards
  stretch to their row height so the Schedule actions land on a common
  baseline.
- **FAQ** (`FAQSection.tsx`) — the heading moves into a sticky left column and
  the questions take the right. Deliberately *not* a two-column accordion:
  opening a panel in one column would reflow every panel in the other, so the
  answer you just asked for jumps out from under the cursor. Answers capped at
  `65ch`.
- **Booking** (`BookingBlock.tsx`) — **863px → 479px (−44%).** Split by the job
  each half does rather than by length: everything that asks for a decision
  (heading, invitation, the three Quick actions) stays in the reading column;
  everything that answers "can I actually come, and where" (hours, address)
  becomes a reference panel beside it. The three actions keep one uninterrupted
  vertical run and their filled/outline/alert weight order, so the
  single-primary-CTA hierarchy is unchanged.

**Actions per page, after:** 46 interactive elements, of which 14 are
booking-related. Under the *competing*-CTA test that is one goal (Book),
repeated at depth, with Call as a consistently-outlined secondary and
Emergency as a distinct third path — not fourteen choices. No change made.

### 3.2 `/services`

**5,262px → 2,302px. 5.8 → 2.6 screens (−56%).** Container widened to
`lg:max-w-5xl` and the shared `ServicesSection` grid applies here too.
Worst measure 63 characters, nothing over 75.

### 3.3 `/about`

**1,808px → 1,676px.** Container widened to `lg:max-w-5xl`, which mainly buys
Dr. Dubey's portrait a real size (390 × 540 rather than a thumbnail beside a
long text column). Worst measure 55 characters.

*Not done:* switching `CredentialBadges` to its three-column mode here. At
this container the columns compute to ~277px, and that component's own notes
record 350px as the width below which rows start wrapping to two lines. Left
stacked rather than shipped crowded.

### 3.4 `/insurance-new-patients`

**2,867px → 2,809px.** The smallest change on purpose, and the one place an
earlier version of this pass was **reverted**: the container had been widened
to 1,024px along with the others, which stretched every paragraph on a page
that is almost entirely prose — from ~65 characters to ~91. That is the
opposite of the fix. Widening a container only helps content that uses the
horizontal axis.

What stayed: the two short answer cards ("No insurance?", "What to bring")
now sit side by side at `lg` inside the existing 768px measure, which is ~370px
each — enough for six lines of text that previously cost ~500px of scroll.

One paragraph still measures 76 characters. It is the original intro card,
inside the ceiling, and left alone.

### 3.5 `/emergency`

**1,535px → 1,221px (−20%).**

- The two full-width pills become a row from `sm` up. Call keeps the filled
  surface and stays first in DOM and visual order — this is the one page where
  the primary action is Call, not Book.
- Tiers 2 and 3 sit side by side at `lg`. **Tier 1 deliberately does not join
  them:** backlog item 7's own acceptance criterion is that the 911/ER panel is
  first in DOM and visual order and visible without scrolling, and giving it
  the full measure while the two lower tiers share a row is what preserves that
  ranking on a wide screen. Verified: tier 1's heading still sits at y=359.
- Prose inside the widened container capped at `68ch`.

### 3.6 `/offers`

**1,279px → 1,182px.** Buttons become a row from `sm` (224px and 216px wide
now, rather than ~800px). Container `lg:max-w-4xl`; trailing prose capped.

### 3.7 `/contact`

**1,262px → 1,169px.** Email and phone are paired from `sm` up, matching the
first/last-name row above them. Field width is a size cue — a 558px input for
a 10-digit phone number invites hesitation — and pairing removes two rows from
a form whose whole design goal is to read as one screen. Fields are now 269px.

### 3.8 `/privacy`, `/accessibility`

**Deliberately unchanged.** Both are single columns of legal prose at ~73
characters, already inside the band. Widening them would make them worse. The
only thing that reaches them is the shared `Nav.tsx` change.

### 3.9 Shared header — `Nav.tsx`

The desktop row moved from `md` to `lg`, which is finding #7: the crowding its
own comment described at 768–790px was a property of the whole row, so it is
now gated where it fits instead of patched item by item. The hamburger covers
768–1023px, where it previously showed nothing at all. Container matches the
homepage shell from `xl`; the internal Backlog link returns to `xl` so the
patient-facing row is not competing with it at 1024px.

---

## 4. Deliberately not done

- **A sticky "Book / Call / Hours" rail on the content pages.** The obvious
  next desktop move, and the one with the best conversion case. Held back
  because it is net-new UI rather than a responsive treatment of what exists,
  and that is a product call.
- **The duplicated breadcrumb/back row.** Seven pages carry a near-identical
  copy, including seven local `BackArrowIcon` definitions (two of which draw
  *different* arrows). A real cleanup, but a refactor, not a desktop fix.
- **Adaptive per-error form messages, and marking optional fields explicitly**
  — the two transferable items from Baymard's desktop list. Backlog
  candidates.
- **`Contact` in `Nav.tsx`'s desktop row**, which sits next to a Book
  Appointment pill pointing at the same route. Removing it would edit the
  locked nav content, not the layout.
- **Anything in `globals.css`.** Left alone entirely to avoid colliding with
  the parallel branch described below.

---

## 5. The accessibility entry point

The ask was for "an entry point for people who click and things are zoomed."

**The answer is not an overlay widget.** See §1 — they do not fix the
underlying markup, the W3C's WAI does not endorse them, the FTC settled
against accessiBe in January 2025, and their documented failure modes are
precisely this feature's failure modes: double-zoom, layouts breaking at high
magnification, and a floating button parked on top of the content someone
magnified in order to read.

**It is already being built, on another branch.** A parallel session is
finishing a first-party `DisplaySettings` panel — text size at 100/115/130%
driven off the `rem`-based type scale, a high-contrast mode, a motion toggle,
persisted to `localStorage` and applied before first paint — reachable from the
footer of every page and rendered inline on `/accessibility`. That is the right
shape, and this branch deliberately does not duplicate or touch it.

**What this branch contributes to it** is the half that no panel can provide:

- **The reflow failure is fixed.** A text-size control is worth nothing if the
  layout breaks when someone uses it. The 768–866px band this site was
  overflowing in is exactly where a 1,536px desktop lands at 200% browser zoom.
  Verified clean at 320, 768, 820, 1024, 1280, 1440 and 1920px.
- **Reading measures are capped in `ch`, not pixels**, so they hold their
  character count at any text size — including under that panel's 130% setting
  and under browser zoom, which a pixel value would not.
- **`lg` grids degrade to the reviewed stacks** as the effective viewport
  narrows under zoom, rather than compressing into unreadable columns.

**Still open, and worth doing wherever that panel lands:** the site's fixed
64px header means a keyboard user tabbing to an in-page anchor can land
underneath it. `scroll-margin-top` on anchor targets is the fix. It is not in
this PR because it belongs in `globals.css`, which the other branch is
actively editing.

---

## 6. Verification

| Viewport | Horizontal overflow | Notes |
|---|---|---|
| 320px (= 1,280px @ 400% zoom) | none | Mobile layout, unchanged. Hamburger present, no desktop nav. |
| 768px | none (was **+96px**) | Finding #1 fixed. |
| 820px | none (was **+27px**) | |
| 1,024px | none | Desktop nav fits; all labels single-line, Book pill unwrapped. |
| 1,440px | none | |
| 1,920px | none | Worst reading measure 67 characters; **zero** paragraphs over 75. |

`tsc --noEmit` passes. `eslint src` reports 5 errors, all pre-existing in
files this branch does not touch (`layout.tsx` `prefer-const` ×3,
`HeroCarousel`/`OfficeCarousel` `set-state-in-effect`); the parallel branch
fixes the latter two.

**Mobile safety.** Every changed `className` was reviewed: each is an `lg:`/
`xl:` addition, an `md:`→`lg:` move, or an `sm:` addition whose sub-640px
rendering is identical. The four places where markup was restructured
(`/emergency` and `/offers` button rows, the `/insurance-new-patients` card
pair, `BookingBlock`'s column split) reproduce the previous phone spacing
exactly — `gap-2` + `mb-6` in place of `mb-2` + `mb-6`, and so on. Homepage
height at 325px is 12,035px, i.e. the phone page is untouched.

---

## 7. The rule going forward

The useful generalisation from all of this, for whoever picks up the next
component:

> Widen a **container** only for content that uses the horizontal axis — grids,
> card rows, side-by-side panels. For a run of prose, cap the **measure** in
> `ch` instead. Applying the first to the second is what turns a 65-character
> paragraph into a 91-character one, and it is the mistake this pass made once
> on `/insurance-new-patients` before catching it.

And the corollary, which is finding #1's real lesson: set the breakpoint where
the *content* stops fitting, not at the device name. The hero broke at 768px
because that number was picked for "tablet" rather than measured against the
824px its own columns demanded.
