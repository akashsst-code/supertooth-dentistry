# Super Tooth Dentistry — UX Flow & Design Pattern

Working doc for the homepage structure and site-level capabilities. Builds directly on the locked decisions in `supertooth-priority-dimensions.md` (unified journey, routine/proactive + insurance-driven persona) and `supertooth-build-principles.md` (architecture, analytics, Webflow platform).

Status: **Draft — iterating**

---

## High-Level Design Pattern

**Single-page-led funnel, not a multi-page maze.**

Because the journey is unified (not segmented by persona), the homepage should function like a landing page that answers the full funnel in one scroll — trust → insurance clarity → booking — rather than forcing patients to click through separate pages to get convinced.

Service/location pages exist for SEO/AEO structure (per Build Constraints), but the *conversion* work happens on the homepage.

---

## Proposed Homepage Flow (top to bottom)

1. **Hero (first screen, no scroll)**
   - Practice name, "accepting new patients" signal
   - Primary CTA: book now
   - Secondary CTA: call/text
   - Insurance-acceptance signal (e.g., "in-network with most plans") — pulled forward per locked ordering decision below, since coverage confirmation matters to the insurance-driven half of the persona more than the price offer does

2. **Trust block**
   - Dr. Archana credentials/photo
   - **Team/staff section** — hygienists and key staff, photo + first name + role (serves "long-term fit" for routine/proactive persona — patients mostly see hygienists at return visits, not just the doctor)
   - **Office photo slideshow** — real photos of the physical space (not stock), serves dual purpose: credibility signal ("real, modern practice") and anxiety reduction (patients can see the space before visiting, ties to Motivation Type — emotional/anxiety)
   - Google reviews (4.9 stars, review count)
   - Differentiators: same-day appointments, advanced tech/same-day crowns, in-network with most insurance
   - Does the Stage 3 (Evaluation) job fast
   - **Content dependency:** team and office photography do not exist yet — needs to be gathered (professional or high-quality phone photography) before this section can be built with real content. Tracked as a launch-blocking content item, not a design decision. Placeholder/stock imagery should not be used here since it undermines the "real, legitimate practice" trust signal this section exists to create.

3. **Insurance / offer block**
   - Insurance carriers listed
   - $149 new-patient offer (exam + cleaning + x-rays)
   - $500 off Invisalign (secondary line)
   - Closes the rational-motivation gap right after trust is established

4. **Booking block**
   - Real-time booking widget/CTA
   - Framed as the natural next step, not a separate destination

5. **Secondary path**
   - Small, visible "need to be seen today?" link for urgent patients
   - Does not compete with or interrupt the primary flow

6. **Footer**
   - Hours, location/parking/transit (downtown-specific)
   - Phone number
   - Standard trust closers

**Decision (LOCKED): Trust-first, offer as reinforcement.**

Rationale: Routine/proactive patients filter on "is this a legitimate, good practice" before price — leading with $149 risks reading as a discount/volume clinic, undercutting the long-term-fit trust this segment needs. The insurance-driven half of the persona is actually about coverage confirmation ("do you take my plan"), not price — so insurance/plan-acceptance signaling can move earlier (even a quick tag in the hero), while the $149 offer stays in Section 3 as the reinforcing detail once trust is established, not the opening hook. This matches the locked "blend, not urgency/discount-led" tone and protects against attracting one-time bargain patients when the objective is patients who stick (skewed toward routine/proactive, not just any volume).

- [x] **Trust-first (Section 2 before Section 3), insurance-acceptance signal pulled into hero**
- [ ] Offer-first

---

## Key High-Level Capabilities (Webflow build)

- **Real-time booking widget embed** — not a form-to-email hop (kills the Stage 4 email leak)
- **Click-to-call + text-us as first-class elements** — visible near the top, not buried in footer (kills the Stage 4 voicemail leak)
- **CMS collections for services** — so Archana's staff can edit content without touching layout or needing a developer (ties to "content separable from presentation" principle)
- **Reusable components matching the locked style guide** — buttons, cards, section templates — so new pages (service pages, location pages) stay visually consistent without rebuilding styles each time
- **Instrumentation baked in** — form submissions, booking-widget completions/drop-off, click-to-call taps, page traffic (per principles file, analytics is not an afterthought)
- **AEO/SEO-ready structure carried into every page**, not just homepage — FAQ blocks as direct Q&A, schema markup, clean URLs per service/location

---

## Typography — Locked

**Decision (LOCKED): Fraunces (display/headlines) + Inter (body text).**

Rationale: consistent with every visual decision already locked (palette and nav mockups), avoiding rework that would violate the simplicity/atomic-change principle. Inter is specifically research-recommended for healthcare body text — readable at small sizes, accessible, without reading cold — and one healthcare org saw a 38% improvement in appointment booking completion through accessibility-focused typography optimization, directly relevant to the Stage 4 conversion goal. Fraunces rides a genuine 2026 branding trend (serif revival for warmth/trust) rather than being an arbitrary choice, though the "generic AI-boutique look" risk this shares with many current designs is real — mitigated by restraint in execution (muted palette, real photography, not over-using the serif for body copy).

**Accessibility requirements carried into build:**
- Body text minimum 16px, line-height ≥1.5x
- Sans-serif (Inter) for all body/paragraph text — serif reserved for headlines only
- WCAG AA contrast maintained against the locked palette (already a principle)

**Decision (LOCKED, low-stakes/reversible): Option 1 — Terracotta accent on warm-ivory neutral surface.**
- Warm Ivory `#FAF8F4` — dominant surface (~90%)
- Terracotta `#C1633E` — CTAs, star ratings, accents only (not background blocks)
- Espresso `#3D3226` — headline/structural text
- Sand tint `#EEE7D8` — badges/card backgrounds

Rationale: strongest fit against dental-anxiety color research (muted, not high-saturation) and avoids the gendering risk flagged on the rose option. Matches the neutral-surface-dominant pattern observed on Zen Dental Studio, The Dental Boutique, and Grind Dentistry — warmth comes primarily from real photography, not paint.

**Architecture requirement:** implement all colors as design tokens/variables (Webflow's native Variables feature), not hardcoded per component. This makes the palette itself a reversible, low-cost decision — consistent with the "reversible over perfect" principle in `supertooth-build-principles.md`. If this palette doesn't land once real photography and content are in place, swapping it later should be a variable update, not a rebuild.

**Status:** working default — not precious. Revisit only if it visibly fails once real content/photos are in place, don't relitigate from hex codes alone.

## Spacing & Touch-Target System — Locked

**Decision (LOCKED): Standard 8px-based token scale, 44×44px minimum touch targets.**
- Scale: 8 / 16 / 24 / 32 / 48 / 64 / 96px, implemented as Webflow variables (same reversible-token pattern as color)
- Text spacing: line-height ≥1.5x, paragraph spacing ≥2x font size (WCAG 2.2 SC 1.4.12)
- All interactive elements: minimum 44×44px tap area (NN/g and mobile-standard baseline, above the 24×24px WCAG legal floor), minimum 8px spacing between adjacent targets

Rationale: matches the padding/gap values already used across every mockup built so far (no rework needed), has a direct compliance backstop (dental sites are an active ADA web-lawsuit target), and avoids the "illusion of completion" risk that more generous spacing would create on the single-page-led funnel — extra breathing room risks burying the booking CTA further down the scroll on the one page doing all the conversion work.

**Build fix flagged:** the call icon and hamburger icon in the locked nav mockup (`supertooth-nav-option-a.html`) were sized ~34×34px — below the 44×44px standard. Icon can stay visually small, but its tappable hit area needs to expand to 44×44px minimum before build.

## Photo Overlay Pattern ("Color Bleed") — Locked

**Decision (LOCKED): full-bleed photo doubling as a section's background, text sitting directly on top via a gradient scrim — the site's shared pattern for any section where a real photo should read as clean/minimalist (photo IS the surface) rather than "photo block next to/above a solid-color text panel."**

First used in Hero.tsx's mobile layout (2026-08-29), replacing a stacked photo-block + solid-Espresso-panel layout that read as cluttered/two-screens-stacked on review. Desktop's side-by-side split is a separate, already-working pattern and isn't affected by this one.

- **Recipe:** `.photo-text-scrim` in `globals.css` — solid Espresso at the text-anchored edge fading to fully transparent, built from the locked `--color-espresso` token (not a new color). Apply this class to a positioned div behind the text rather than hand-deriving a gradient per section, so every use gets an identical scrim.
- **Contrast requirement:** the scrim must be sized/weighted so overlaid text stays WCAG AA-legible against the *worst-case* photo it could be shown over — if the photo rotates (carousel) or could be swapped later (CMS-editable), don't tune the scrim against just one photo you happened to be looking at.
- **Focal-point requirement:** every photo used this way needs its own object-position ("focal point" in code — see `heroPhotos` in `content.ts`), not one blanket crop rule. Where the subject's face sits varies per photo — a generic "shift toward the corner opposite the text" rule can crop a face out of frame entirely if that photo's subject wasn't centered to begin with (see the `team-itero-scan.jpg` exception documented in `content.ts` — she's in profile on the left third of her own frame, so hers stays left instead of following the others' bias). Set focal points by looking at the actual photo, not by applying a formula blind.
- **When to use it vs. the solid-panel pattern:** use the overlay when the photo itself is the trust signal being led with (a hero, a section whose whole point is "here's the real space/person"). Keep the solid-panel pattern (TrustBlock's Archana bio card, BookingBlock's photo, etc.) where the photo is supporting evidence next to independently-important text/data — those sections aren't cluttered in the same way the old hero was, and don't need converting just for consistency's sake.

## Not Yet Decided

- [ ] **Team/office photography** — not yet scheduled or shot. Needs a plan: who's coordinating (Akash vs. Archana's staff), professional photographer vs. high-quality phone photos, and timeline relative to launch (blocks the Trust block section from being finished, though the rest of the site can proceed in parallel).

- [x] **Booking integration (LOCKED): Tab32 via a custom service API layer.** The UX (Webflow front end) calls a service layer Akash builds, which in turn calls the Tab32 API for calendar/schedule data — not a direct Tab32 embed widget. This decouples the UX from Tab32's native widget UI and data model, and is the mechanism fixing the Stage 4 form→email leak.
  - Open sub-questions: hosting for the service layer (serverless function vs. dedicated backend), auth/API key handling for Tab32, what the service layer returns to Webflow (available slots, confirmation, booking status), and how this integrates with the instrumentation plan (booking-widget completions/drop-off tracking needs to hook into this layer, not just Webflow-native analytics).
- [x] **Urgent-path behavior (LOCKED): hours-aware custom widget, scoped to "need to be seen today?" only.**
  - During office hours: phone-first (live triage for same-day slotting), with schedule/booking option visible as fallback.
  - Outside office hours: phone number hidden/de-emphasized (prevents the voicemail-leak pattern this was built to avoid); replaced with self-serve booking (next available slot) or a "text us — we'll respond by [time]" option that doesn't dead-end.
  - Mechanism: small custom widget doing a real-time clock check against practice hours, dynamically swapping the CTA. Scoped narrowly — low code footprint, consistent with simplicity principle.
  - **Scope note:** this hours-aware logic applies only to the urgent "need to be seen today?" element, not the site's primary phone CTAs (hero, footer, floating bar) — those remain as currently designed. Worth revisiting later if the same voicemail leak shows up on the primary CTAs too, but out of scope for this decision.
- [x] **Service page template structure (LOCKED): template supports full depth, content filled in over time.** Each service page template is built to support the full structure — description, FAQ block as direct Q&A pairs, insurance/pricing note — so AEO/SEO architecture is launch-ready per Build Constraints. Content for each of the 9 services doesn't need to be fully written before launch; pages can go live with partial content and be filled in incrementally without requiring a template rebuild later.
