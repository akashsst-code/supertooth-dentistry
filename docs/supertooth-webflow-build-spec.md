# Super Tooth Dentistry — Webflow Build Spec

Consolidated, buildable spec synthesizing every locked decision from:
`supertooth-priority-dimensions.md` · `supertooth-build-principles.md` · `supertooth-ux-flow.md` · `supertooth-navigation-requirements.md` · `supertooth-decision-framework.md`

This is the handoff document for the Webflow/Cowork build itself. Treat every "LOCKED" item as buildable now; every "OPEN" item as a blocker to flag, not to guess past.

---

## 1. Project Goal (context for every build choice)

Grow new patients from ~10–15/month to ~52–69/month (~4–5x), primarily by fixing two conversion leaks:
1. Form submissions → email → manual callback (patients drop off waiting)
2. Missed calls → voicemail → patient calls a competitor

Primary persona: **routine/proactive + insurance-driven**, downtown Seattle, time-scarce professional, unified single-page-led homepage journey (not segmented).

---

## 2. Site Architecture

- **Homepage** — carries the full conversion journey (see Section 3). This is where most persuasion work happens.
- **Service pages** (one per service) — full-depth template (description, FAQ as direct Q&A pairs, insurance/pricing note), content filled in incrementally post-launch. AEO/SEO-structured per Build Constraints.
- **About / Meet the Team** — Dr. Archana + staff/hygienists, credentials, real photography (content pending — see Section 8 blockers)
- **Insurance & New Patients** — carriers accepted, new-patient offer detail, what-to-expect for a first visit
- **Contact** — hours, address, map, parking/transit info, phone

Clean, distinct URLs per service/location page (SEO-ready structure, per locked Build Constraints).

---

## 3. Homepage Section-by-Section Spec

1. **Hero** — practice name, "accepting new patients" eyebrow, insurance-acceptance signal (pulled forward, not buried), primary CTA (Book Now → Tab32 service layer), secondary CTA (Call)
2. **Trust block** — Dr. Archana credentials/photo, team/staff section (photo + name + role), office photo slideshow, Google reviews (4.9★, review count), differentiators (same-day, tech/same-day crowns, in-network)
3. **Insurance/offer block** — carriers listed, $149 new-patient offer (exam + cleaning + x-rays), $500 off Invisalign as secondary line. Positioned *after* trust, not before (locked ordering decision).
4. **Booking block** — Tab32-backed real-time booking widget/CTA
5. **Secondary path** — "Need to be seen today?" hours-aware widget (phone-first during office hours, self-serve/text fallback outside hours)
6. **Footer** — hours, location/parking/transit, phone, standard trust closers

**Ordering rationale:** trust-first, insurance-signal-early, offer-as-reinforcement — protects against reading as a discount clinic, matches the locked "blend, not urgency/discount-led" tone.

---

## 4. Navigation Spec

**Desktop:** logo left · Services / About / Insurance & New Patients / Contact · persistent Book Now CTA right-aligned · sticky header.

**Mobile (Pattern A, locked):**
- Header: logo, call icon (44×44px tap target), Book Now button, hamburger (44×44px tap target) — sticky
- Hamburger opens full-screen menu: quick links (Services / About / Insurance / Contact), **hours/location shown inline** (today's hours + optional live "open now" status + address — reuses the same hours-aware logic pattern as the urgent-path widget), Book Now + phone number repeated at the bottom of the menu

**Explicitly ruled out:** persistent bottom bar (Option B) — app-like feel outweighed benefit.

---

## 5. Design System (implement as Webflow Variables/tokens — not hardcoded)

**Color** (reversible default, terracotta-on-ivory):
- Warm Ivory `#FAF8F4` — dominant surface (~90%)
- Terracotta `#C1633E` — CTAs, star ratings, accents only
- Espresso `#3D3226` — headline/structural text
- Sand tint `#EEE7D8` — badges/card backgrounds

**Typography:**
- Display/headlines: Fraunces
- Body: Inter (sans-serif, healthcare-accessibility standard)
- Body text minimum 16px, line-height ≥1.5x

**Spacing:**
- 8px-based token scale: 8 / 16 / 24 / 32 / 48 / 64 / 96px
- All interactive elements minimum 44×44px tap area, minimum 8px between adjacent targets
- Text spacing: line-height ≥1.5x, paragraph spacing ≥2x font size (WCAG 2.2 SC 1.4.12)

---

## 6. Booking Integration — Technical Spec

**Architecture (locked):** Webflow front end → custom service API layer (built by Akash) → Tab32 API for calendar/schedule data. Not a direct Tab32 embed widget.

**Still open (sub-questions, not yet resolved):**
- Hosting for the service layer (serverless function vs. dedicated backend)
- Auth/API key handling for Tab32
- What the service layer returns to Webflow (available slots, confirmation, booking status)
- How instrumentation (booking-widget completions/drop-off tracking) hooks into this layer

---

## 7. Compliance & Accessibility Checklist (build-blocking, not optional)

- [ ] WCAG AA color contrast verified against locked palette
- [ ] All interactive elements ≥44×44px tap target
- [ ] Body text ≥16px, line-height ≥1.5x
- [ ] Testimonials use Google Reviews widget or first-name + last-initial format (not full patient names without written authorization) — HIPAA
- [ ] No unverifiable claims (same-day availability, insurance carriers, pricing must reflect actual current capability)
- [ ] Privacy policy and required disclosures present before go-live
- [ ] Schema markup: LocalBusiness / Dentist / FAQPage
- [ ] FAQ content structured as direct Q&A pairs (AEO-ready)

---

## 8. Content Blockers (must be resolved before full launch, though build can proceed in parallel)

- [ ] **Team/office photography** — not yet shot. Needs: coordinator (Akash vs. Archana's staff), professional vs. high-quality phone photos, timeline. Blocks Trust block completion specifically — stock imagery should NOT be substituted (undermines the trust signal this section exists to create).
- [ ] Real practice content: exact practice name/address/hours, services list, insurance plans accepted, testimonials/reviews source, logo file. (Dr. Archana bio landed — see Status below.)
- [ ] Tab32 service-layer sub-questions (Section 6) need resolution before booking flow can be built end-to-end.

---

## 9. Instrumentation (build in from the start, per locked principle)

- Form submissions (if any fallback form remains)
- Booking-widget completions and drop-off (via the Tab32 service layer)
- Click-to-call taps
- Page-level traffic

---

## 10. Testing & Approval Gates (per build principles)

1. Goals/spec locked ✅ (this document)
2. Design/wireframe approved before full build
3. Content/copy approved before publishing
4. Functional review (booking end-to-end including failure states, forms, click-to-call on real mobile devices) before go-live
5. Final go-live approval — **Akash only**

Staged rollout via Webflow staging/preview before publishing live. Webflow version history as rollback path.

---

## Status: Next.js build (current — see `supertooth-platform-pivot.md`)

**Hero redesigned photo-first, full-bleed — PR open, not yet merged:** replaces the split video/text layout (Hero v2, locked 2026-08-22) per Akash's ask, referencing 2thstudio.com's clean full-bleed pattern: "make the photo occupy most the screen, and bleed the bottom part in." `HeroCarousel.tsx` now fills the entire hero section edge-to-edge (was a 60%-wide side panel next to a solid espresso text panel) at every breakpoint; eyebrow/headline/body/trust-strip/CTAs are overlaid directly on the photo, bottom-anchored, over a bottom-up scrim (`from-espresso/95`) for text contrast. A second, shorter gradient below the content fades the photo into the page's warm-ivory background so TrustBlock reads as a continuation of the hero rather than a hard-edged next section (the "bleed"). The carousel's own internal scrim was removed since Hero.tsx now owns legibility contrast for the whole section (it was the only place HeroCarousel is used). Section 1's locked requirement — insurance signal + both CTAs visible on load, not buried — still holds; they're just overlaid on the photo now instead of living in a separate side panel. `Hero.tsx`, `HeroCarousel.tsx`.

**Hero carousel slowed and rebalanced toward Dr. Archana — PR open, not yet merged:** two rounds of feedback on the hero reel (merged earlier via [PR #20](https://github.com/akashsst-code/supertooth-dentistry/pull/20)): it was cycling too fast to register, and the doctor wasn't reading as prominent even though her photo led. `HeroCarousel.tsx`'s pace slows from 2.2s hold / 600ms crossfade to 4.5s hold / 1.2s crossfade, and the random opening-photo behavior is removed — it now always opens on `archana.webp` (her studio headshot, the most polished/trustworthy of her photos) and plays a fixed order instead.

`heroPhotos` in `content.ts` grows from 5 to 7 and is reordered so Dr. Archana leads and closes the sequence (opening headshot, then a second candid of her, then the new outdoor candid below) with the team/staff photos grouped in the middle rather than scattered — "keep the doc in focus" while the middle stretch still shows it isn't a one-person practice. `archana-profile.jpg` (previously used only in TrustBlock's bio card — the real candid from an ADA event) is now also in the hero rotation, plus one new photo Akash supplied 2026-08-29 (`archana-candid-outdoor.jpg`, a candid portrait, resized/compressed via `sips`).

Akash also supplied two more photos for consideration (a Yellowstone/hiking photo and an evening-event photo) with a request to show "nurses and patients" in the mid-carousel photos. Neither of those two went in — both are personal/vacation-style photos rather than practice photos, confirmed with Akash before building. No real patient photos exist yet either, and none were staged or mislabeled to fill that gap (HIPAA / no-unverifiable-claims, Section 7 below) — the "mid" slots are filled with the existing real staff photos (`team-group.jpg`, `front-desk.jpg`, `team-itero-scan.jpg`) instead. Real patient photography (with consent) and any additional practice-context photos of Dr. Archana remain open follow-ups.

**Homepage FAQ section added — PR open, not yet merged:** resolves the Section 7 compliance-checklist item "Schema markup: LocalBusiness / Dentist / FAQPage" and "FAQ content structured as direct Q&A pairs (AEO-ready)" for the first time in this build. New `FAQSection.tsx` — a 9-item +/- accordion, right after `NewPatientOffersBlock` and before `BookingBlock` (resolves last-minute objections just before the booking ask, without reordering anything else already locked above it) — plus a matching `FAQPage` JSON-LD block emitted from the same `faqs` array in `content.ts`, so the visible accordion and the structured data can't drift apart. Accordion interaction (button + rotating plus/minus icon + `grid-template-rows` open/close transition) reuses the same pattern Akash asked for on `InsuranceExpandCard.tsx` (a competitor-site reference), reimplemented locally rather than shared since this is a plain list of independent items, not that component's single insurance-card layout.

Section 2's original spec put FAQ on a per-service-page template; those pages (`/services`, `/about`, etc.) aren't built yet, so this ships as one general-practice FAQ on the homepage instead — same AEO goal, no template dependency. Can split into per-service FAQ blocks once those pages exist.

Content sourced from the practice's own live site, www.supertoothdentistry.com — its "frequently asked questions" section, verified against the same address/hours already confirmed real elsewhere in this file (exact match) — same trust tier as `contact`/`archana` in `content.ts`, which already cite "the practice's existing site" as their source; this is that site's current domain. Rewritten into concise direct-answer form for AEO rather than copied verbatim. Per the no-unverifiable-claims rule (Section 8 below), three things from the source site were deliberately left out rather than reused:
- The source's stated 10% senior discount didn't reappear on a second fetch of the page, so it's dropped rather than risk stating a discount that isn't current.
- Its SMS Privacy Policy blurb is a legal-disclosure item, not an FAQ answer — belongs with this section's own "Privacy policy and required disclosures present before go-live" checklist item, not something to improvise here.
- Specific new-patient/Invisalign offer amounts and named insurance carriers aren't repeated in the FAQ text — both already live in `offers`/`insuranceCarriers` in `content.ts`, each flagged unconfirmed and rendered through `<Placeholder>` at their one real display site; the FAQ points to those sections instead of restating the numbers a second time.

The emergency-visit answer also deliberately has no phone number baked into `content.ts` — the source site shows **two different** main-line numbers depending on the page section fetched ((206) 593-3131 on one pass, matching the top-banner CTA number already flagged as a discrepancy when `contact.emergencyPhone` was removed in the "Drop emergency line" commit), which conflicts with the (206) 687-7571 already confirmed real elsewhere in this file. Rather than guess or reintroduce a second unconfirmed number, `FAQSection.tsx` interpolates the one already-confirmed `contact.phone` value directly — single source of truth, and worth Akash confirming which number is actually correct before launch, same open flag as before.

**New-patient offers rebuilt as a swipeable card carousel — PR open, not yet merged:** `NewPatientOffersBlock.tsx`'s two-up static grid is replaced with a swipeable carousel (Akash's reference: a specials section showing one large rounded card with the next peeking at the edge). Swipe itself is native `overflow-x-auto` + `snap-x`/`snap-mandatory` — no hand-rolled pointer-drag logic needed, unlike `OfficeCarousel.tsx`'s continuously-animating reel, since this is a plain user-driven scroller. Chevron buttons (desktop) and dot indicators (both breakpoints) give non-touch/positional control via `scrollIntoView`, kept in sync with whatever got the user there (swipe, drag, or button click) via an `IntersectionObserver` on the scroll track. No autoplay, so none of `OfficeCarousel.tsx`'s WCAG 2.2.2 pause-control machinery applies. Cards keep the locked "half page picture and 1 line text offer" content call (offer copy stays one line, still through `<Placeholder>` pending confirmed pricing) but are restyled as standalone rounded Sand-surface cards with an eyebrow label (`offers.*.label`, new field in `content.ts`) and a circular photo, closer to the reference look than the old half-card rectangle split.

**Hero photo carousel — merged to `main` via [PR #20](https://github.com/akashsst-code/supertooth-dentistry/pull/20):** the Hero's single "video-styled" photo (`ClinicVideo.tsx`, Dr. Archana's studio headshot with a Ken Burns zoom and a "real video coming soon" play badge) is replaced by `HeroCarousel.tsx`, a 5-photo auto-advancing crossfade of real team/office photos Akash supplied directly in chat — the ask was to make the hero read as "more than just the dentist," showing other real people in the clinic, without pretending to be an actual video. `archana.webp` (the original hero photo) is one of the 5 slides; four new photos were added to `public/team/`: a group shot of the team together (`team-group.jpg`), a front-desk team member at her desk (`front-desk.jpg`), a second candid of Dr. Archana Dubey in the office (`archana-candid.jpg`), and a team member reviewing an iTero digital scan (`team-itero-scan.jpg`). Same Ken Burns zoom (`globals.css` `.animate-slow-zoom`) as before, applied continuously to all 5 stacked images so crossfades never pop.

Shipped with dots, a caption badge, and a pause/play control initially, then simplified per Akash's direct follow-up call ("just have photos run... this is just pure trust building, no user can pause or click"): no visible caption, no dots, no pause control — a purely passive background reel with zero interactive surface. Auto-advances every 2.2s via `setInterval` (down from an initial 5s), crossfade shortened to 600ms to match the faster pace, and the opening photo is now randomized per page load (chosen post-mount so server/first-paint markup still matches, avoiding a hydration mismatch) instead of always starting on `archana.webp`. `prefers-reduced-motion` still freezes the reel on whichever photo is showing — that's a passive system preference, not a user-facing control, so it's unaffected by the no-controls call. The repo's own locked accessibility checklist (Section 7 below) doesn't actually require a pause control for this kind of passive slideshow — that was `OfficeCarousel.tsx`'s own added rigor for a *draggable* reel, not a rule this component inherits.

Only Dr. Archana Dubey's identity is confirmed among the new photos — cross-checked against her two already-real, name-tagged photos in `content.ts` (`archana.webp` / `archana-profile.jpg`, both showing "Archana Dubey" embroidered on her coat) to confirm which person in the supplied group photo is her, since two other people also appear across the new photos without confirmed names. Rather than guess, those two are described by role/moment in their `alt` text ("A team member at the front desk", "Reviewing a digital scan on-screen") instead of a name — same gap as the `team` array's existing "Hygienist name"/"Staff name" placeholders, and avoids the no-unverifiable-claims rule (`supertooth-build-principles.md` Section 8). Swap in real names/roles once confirmed.

One of the four supplied source photos (the Dr. Dubey solo portrait, now `archana-candid.jpg`) had its actual pixel data stored sideways with no usable EXIF orientation tag `sips` would act on consistently — every `sips` resize attempt (in-place or `--out`, chained or separate) re-introduced a 90° rotation even after a manual fix looked correct pre-resize. Reprocessed with Python/Pillow (`ImageOps.exif_transpose` + `resize`) instead, which handled it correctly in one pass. Worth remembering for any future photo-processing pass in this repo: don't chain `sips -r` with `sips -Z`/`--resampleWidth` on files with any embedded orientation metadata — prefer Pillow.

**Emergency line dropped entirely, hours updated, booking/footer reorganized — merged to `main` via PR #20:** briefly landed on `main` as a confirmed real number (`(206) 593-3131`, PR #19) but reversed shortly after by Akash's own direct follow-up on this same branch — `contact.emergencyPhone`/`emergencyContact` are removed from `content.ts` again, this time with no placeholder standing in for them, since there's no confirmed number Akash wants published. `BookingBlock.tsx`'s emergency banner and both `Footer.tsx` variants' emergency-line note are removed to match — if a real, confirmed emergency contact method is decided later, it goes back in as `real: true` content, not a placeholder. `hours` also updated to `Tuesday – Friday, 7:00 AM – 4:30 PM` (was Mon–Fri 8–5). `BookingBlock.tsx`'s info row was reorganized into labeled "Quick actions" / "Office hours" / "Location" groups instead of a flat row (only the open-hours line is shown next to the booking CTA — the "Closed" row still exists in `hours` for Nav's full listing). `Footer.tsx` was trimmed to avoid duplicating `BookingBlock.tsx` immediately above it (brand, address, parking, phone, copyright only — no repeated hours/CTAs), and its mobile variant now matches desktop's light Warm Ivory theme instead of repeating the dark Espresso background, so the bottom of the page reads as two distinct sections instead of one long dark block.

**Services photos cropped to fix "elongated"/unnatural cards — merged to `main` via PR #16:** the 3 real service photos Akash supplied (same-day onlay, implant x-ray, in-office whitening) are full Instagram-post-style graphics — a big title, our own logo, and (for whitening) a Philips Zoom brand badge, all sitting above the actual before/after photos. Force-cropping those into the section's `aspect-[4/5]` `object-cover` tile either cut photos off mid-frame or crushed a whole poster into a thumbnail — read as "elongated"/unnatural (Akash, with a screenshot). Cropped each down to just the labeled before/after photos (`*-crop.jpg` in `public/services/`, same source photography — title/logo/badge removed, not new images) and gave `ServicesSection.tsx` a natural-aspect-ratio render path (using `image.width`/`image.height` from content.ts) for images that carry their own dimensions, instead of forcing every photo into the same fixed box. Originals kept in `public/services/` (unused by the site now) in case Akash wants them elsewhere (e.g. actual Instagram posts).

**Trust-block reorder, insurance section removed, services images filled — merged to `main` via PR #16:** `TrustBlock.tsx` internal order flipped per Akash's follow-up call ("move office scroll above bio") — the office-photo carousel + "about our office" blurb now come right after the differentiators, with Dr. Archana's bio card after both (previously bio led, office followed). `InsuranceBlock` removed from the homepage entirely per Akash's explicit call (`page.tsx`) — the component and `insuranceCarriers` content are kept, not deleted, as the natural fit for the dedicated `/insurance-new-patients` page once that's built. `ServicesSection`'s one card without a photo ("General & preventive care") now has a temporary Unsplash stand-in per Akash's "bring images where we don't have" call, same convention as the offer-card images below — swap for real photography later.

**Real contact info, offer-card redesign, and booking-block rework — merged to `main` via [PR #16](https://github.com/akashsst-code/supertooth-dentistry/pull/16), reviewed and approved by Akash:** first real phone/address/hours landed for `contact`/`hours` in `content.ts`, sourced from the practice's existing site (gray-rail-265889.hostingersite.com), the same source already trusted for Dr. Archana's bio — resolves another piece of the Section 8 content-blocker list. `contact.emergencyPhone` — that source showed **two different** numbers for the emergency line (a top-banner CTA and a footer-box "current patients call Dr. Dubey directly" line); shipped behind `<Placeholder>` pending confirmation, and Akash has since confirmed the top-banner number, `(206) 593-3131`, is correct — the footer-box number was wrong. No longer behind `<Placeholder>`. `contact.parkingNote` is real (Akash's own chat wording: "bus stop on the same block, parking available on nearby streets"), replacing the old placeholder in the "Proudly serving Queen Anne" card (`LocationMapSection.tsx`).

`NewPatientOffersBlock.tsx` rebuilt per Akash's "half page picture and 1 line text offer" call — each card is now a photo (half the card, full-bleed on mobile / ~50-50 split from `sm:` up, same split pattern as Dr. Archana's bio card) plus one line of offer text, still no links. Images are a temporary Unsplash stand-in (`next.config.ts` now allowlists `images.unsplash.com`) — swap for real photography later, same as `services` images.

`BookingBlock.tsx` reorganized per Akash's "clean up alignment/clutter, bring a picture for trust, fill in hours" call: added a proper emergency-line banner (replacing the old vague "need to be seen today?" line) and a two-column layout — copy/CTAs/real hours/address on the left, a real office photo (not new stock) on the right. `Footer.tsx` and `Nav.tsx` also unwrapped now-real phone/hours from `<Placeholder>`, and `Footer.tsx` gained a small one-line emergency note in both variants — deliberately compact so it doesn't duplicate the larger BookingBlock banner. No link-list columns were added to the footer (e.g. "New patient forms" / "Insurance & Payment" as seen on the reference site) — kept consistent with this homepage's existing no-stub-links convention.

**Homepage flow below the office scroll reworked — PR open, not yet merged, revised over two rounds of feedback:** Akash reviewed smilemakersfortworth.com's homepage flow and asked for a set of homepage changes below the Trust block's office-photo carousel, keeping everything through that carousel unchanged.

**Current order:** TrustBlock (unchanged through the carousel; Dr. Archana's bio card now also carries her training/affiliation badges; closes with a brief "about our office" line) → TestimonialsSection (right after the office blurb) → InsuranceBlock (redesigned, kept in its existing earlier slot) → ServicesSection (4 items) → LocationMapSection → NewPatientOffersBlock (moved to last on purpose) → BookingBlock → Footer.

- **Meet the team** removed from the homepage entirely (Akash's call) — `team` stays in `content.ts` for a future dedicated `/about` page, not deleted.
- **Insurance** split off from the old combined `InsuranceOfferBlock` into its own `InsuranceBlock` — redesigned from plain check+text pills into typographic "wordmark badge" cards. Real trademarked carrier logo files aren't available/licensed for use here, so this is a deliberate styled-lettering design choice standing in for real logos, not scraped images.
- **New-patient offers** split into its own `NewPatientOffersBlock`, at the very end of the flow per Akash's explicit "keep it last" call.
- **Testimonials (`TestimonialsSection`)** — moved to sit directly after the office blurb per round-2 feedback ("right after 'our office'"). Rebuilt as a continuous auto-scroll loop (same doubled-track/`requestAnimationFrame`/modulo-wrap technique as `OfficeCarousel.tsx`, without drag — nothing to interact with here), with every link removed, including the earlier "Read our reviews on Google →" line (the Google rating/count stays as plain informational text, not a link). Cards hang from a shared connecting rail via a stem + node dot, all moving together as part of the same scrolling track. Quote text is a structural placeholder — real testimonials can't be invented (HIPAA / no-unverifiable-claims, Section 7) — pending real reviews from Akash.
- **Dr. Archana's credentials** moved from a standalone section into her existing bio card in `TrustBlock` ("bring archana's training affiliations along with her bio space" — Akash) — the old `CredentialsSection.tsx` was deleted. Real org names still unconfirmed, rendered through `<Placeholder>`.
- **Services (`ServicesSection`)** — rebuilt per round-2 feedback to match smilemakersfortworth.com's pattern: trimmed from 6 to exactly 4 items (`content.ts`), single-column stack (not a grid) with a big image tile above compact title/description text, no links of any kind, and a vertical connecting thread + node dot running through the 4 stacked cards, same visual language as the testimonials rail.
  - **Round 3:** real marketing photography Akash supplied (same-day onlay, dental implant, in-office Zoom whitening before/afters — saved to `public/services/`) now backs 3 of the 4 cards, sized with the same `aspect-[4/5]` large-image treatment PR #13 introduced on Dr. Archana's bio card ("bring this as element across our items"). Matched by content: same-day onlay → same-day crowns, implant x-ray → restorative care, whitening → cosmetic dentistry. No photo was supplied for general/preventive care, so that card keeps an icon-tile fallback at the same aspect ratio rather than inventing one. Two other supplied images (Invisalign Gold Provider badge, Masseter Botox before/after) don't map to any of the 4 categories and aren't used yet — flagged in `content.ts` as a follow-up (Botox could pair with Dr. Archana's existing "Certified Botox Provider" credential line; Invisalign could pair with the existing $500-off offer).
- **Map** — unchanged from round 1: real, already-confirmed practice address (standard Google Maps iframe, no API key needed); the "areas we serve" list only confirms Queen Anne as real, the rest are proximity-based placeholders pending Akash's confirmation.
- **Two other open PRs touch overlapping files and are stale relative to current `main`:** `feature/services-page` (PR #5) and `feature/insurance-offer-jtbd-faq` (PR #6) both forked before the office-carousel/ViewportHero/icons work merged, and would delete real content (office photos, `OfficeCarousel.tsx`, `ViewportHero.tsx`) if merged as-is. Flagging here rather than touching them — worth a rebase-or-close decision before they're reviewed.

Deployed on Vercel, connected to `github.com/akashsst-code/supertooth-dentistry`. Production: https://supertooth-dentistry.vercel.app (default Vercel subdomain — no custom domain pointed yet).

**Dr. Archana bio content — PR open, not yet merged:** the Trust block's Dr. Archana card had been carrying a placeholder ("Credentials, years of experience, background story") since Hero v2 landed her headshot. Replaced with her real bio (`content.ts`'s new `archana` export), sourced from the practice's existing site (gray-rail-265889.hostingersite.com and its `/about-us/` page, per Akash): passion for dentistry discovered in 2007, practicing since 2012, DDS from the University of Colorado, Master's in Prosthodontics from India, specializing in implants/crowns/veneers/smile design/implant-supported dentures, philosophy pull-quote, and a certifications line (Invisalign, Botox, research recognition). That site has no personal-life/hobby content beyond her professional passion and philosophy, so none was invented — would violate the no-unverifiable-claims rule (`supertooth-build-principles.md` Section 8).

First pass condensed this down to one trimmed sentence behind a small 96px circular thumbnail; second pass (per Akash: "people trust images more," bring more trust into the card) reversed that — photo now runs large (a real candid shot from an ADA event, not a posed studio headshot: `public/team/archana-profile.jpg`, distinct from the studio headshot `archana.webp` still used in the Hero video panel and team grid), full-bleed edge-to-edge on mobile at roughly half the section's height, side-by-side at ~40%/60% split from `sm:` up. Bio expanded back out to the fuller version above. The two generic badges ("Accepting new patients", "In-network with most insurance") were swapped for her actual credential badges (15+ years experience, University of Colorado, Invisalign certified); the "in-network" claim already lives in the insurance/offer section right below, so keeping it here was redundant.

**Real office photography + trust-block reorder — PR open, not yet merged:** first real office photos landed (`public/office/`, 5 images supplied by Akash), replacing the placeholder office-photo tiles — the first Section 8 content blocker fully resolved for office (team photography is still pending). Because this content is now real, Trust block order changed from the doc's originally-proposed Archana → team → office → reviews to **Archana → office → reviews → team** (Akash's explicit call): office moves up since it's real now, team stays deferred lower since it's still placeholder-only.

Motion (Akash's spec): a genuinely continuous "reel," not a jump-to-next-tile tick — position is driven frame-by-frame via `requestAnimationFrame` and a single CSS transform, not periodic `scrollIntoView` calls (an earlier pass used that; it reads as jerky, not running). The photo list renders twice back-to-back and the offset wraps by one copy's width once it passes that point, so the loop is seamless. A continuously-animating transform can't share an element with native browser scrolling (the two fight over position), so dragging is hand-rolled via pointer events instead of `overflow-x-auto`: pointerdown freezes the reel and starts tracking, pointermove adds the drag delta on top of wherever the reel had gotten to, pointerup either resumes the idle countdown (a drag) or opens the lightbox (a tap — movement stayed under a small px threshold). `touch-action: pan-y` keeps vertical page scroll working through the carousel; only horizontal motion is claimed for the drag.

Tapping/clicking a tile opens it full-size in a lightbox (close button, Escape key, backdrop click, prev/next, focus moved to the close button on open) — serves the anxiety-reduction job office photos exist for (`supertooth-ux-flow.md` Section 2) by letting patients actually look closely at the space. Deliberately no pinch/scroll-to-zoom inside the lightbox — considered and dropped as unneeded complexity; full-size is the actual job to be done here.

Autoplay behavior (Akash's spec): keep a slow, quiet scroll running by default for passive engagement, stop the instant the user touches it, and bring it back on its own once they're done — *unless* they explicitly paused it, which should stick. Modeled as two independent flags rather than one boolean: `userPaused` (sticky, only the pause button sets/clears it) and `interacting` (transient — any pointerdown/wheel/tap sets it and restarts a 4s idle timer that clears it). Autoplay only runs when neither is set (and the lightbox isn't open), so an explicit pause always wins regardless of idle time, and an unpaused carousel always comes back after a few quiet seconds. The pause/play button reflects `userPaused` specifically (the user's stated intent), not the momentary animation state, so its icon doesn't flicker during normal interaction. Autoplay still fully skips itself for `prefers-reduced-motion`, matching `ClinicVideo.tsx` — WCAG 2.2.2 / Section 7 checklist.

**Bug caught during this pass, worth recording:** the rAF loop computed `dt` as raw wall-clock time since the previous frame with no cap. That's fine at a steady 60fps, but the moment a real gap occurs between two frames — the browser tab gets backgrounded and `requestAnimationFrame` gets suspended, then resumes later — the very next callback receives a timestamp reflecting the *entire* gap, and multiplying that by the px/second speed jumps the reel forward by however long it was away (reproduced directly in this session's automation: a background tab suspended rAF almost entirely, and letting it resume produced a ~1300px jump). Fixed by clamping `dt` to a small max (0.1s) per frame — a resumed animation just continues smoothly instead of catching up. This would have hit real users too, any time someone switched tabs/apps mid-visit and came back, so it's a correctness fix, not just a workaround for this session's testing conditions.

Verification note: this session's browser-automation click/scroll/wait tools were unreliable on this hidden/backgrounded tab (Chromium suspends `scrollIntoView({behavior:"smooth"})` and pointer input on hidden tabs — confirmed via `document.visibilityState === "hidden"` — while plain JS timers keep firing). Instant scrollIntoView, the click→lightbox→pixel-level render path, and Escape-to-close were all confirmed working via direct DOM/JS inspection in an earlier pass. This session's idle/resume/sticky-pause state machine was verified the same way: temporarily logged the autoplay effect's inputs, then drove it with dispatched `pointerdown`/`click` events and real wall-clock waits, confirming (a) zero ticks fire while `interacting` or `userPaused`, (b) it auto-resumes ~4s after activity stops, and (c) it stays paused indefinitely through that same idle window when `userPaused` is true. Debug logging was removed before commit. Worth a manual finger-swipe test on a real phone before merge, since that's the one input this session's tooling couldn't simulate directly.

**Trust signals (reviews + insurance) — merged to `main` 2026-08-23 via [PR #4](https://github.com/akashsst-code/supertooth-dentistry/pull/4), reviewed and approved by Akash:** Google reviews now shown as a proper card/strip (Google's G mark, 5-star row, bold rating, review count) instead of a bare number, in both TrustBlock and a compact version in the Hero. Insurance carriers upgraded from generic "Carrier 1-4" pills to named majors (Delta Dental, Premera Blue Cross, Cigna, Aetna — named by Akash as examples of majors to feature, still unconfirmed/`<Placeholder>` pending real network verification) with a "We're in-network with" section, plus the same short list surfaced in the Hero. Hero layout also restructured so Nav+Hero self-fill exactly one mobile screen height (flex-based, no per-device size tuning) after several rounds of real-device feedback exposed that fixed vh/svh budgets don't reliably sum to the actual viewport.

**Logo — merged to `main` 2026-08-23 via [PR #2](https://github.com/akashsst-code/supertooth-dentistry/pull/2), reviewed and approved by Akash:** converged direction from a six-concept board (calligraphic line art, script monogram, gem-cut facets, a cape-and-arms mascot, an academy seal, and this one) — a plain tooth silhouette (`Logo.tsx`, no badge/frame/face) paired with "Supertooth" in heavy italic Fraunces and "Dentistry" in plain tracked caps beneath. No location line in the header (still available in the mobile hamburger menu). Supersedes the two-line name+location lockup mentioned in the Hero v2 entry below. `practice.name` ("Super Tooth Dentistry") is unchanged everywhere else — this stylized wordmark is specific to the nav logo, with the canonical name carried in `aria-label` for screen readers.

**Hero v2 — merged to `main` 2026-08-22, reviewed and approved by Akash:** redesigned around a real trust visual, adapted from smilemakersfortworth.com's video-hero pattern — video-first on mobile, text-left/visual-right split on desktop, eyebrow badges and body copy de-emphasized (lower contrast, smaller) so the visual and the two CTAs (Book your visit / Call) carry the weight instead of competing with them. No office video exists yet, so the interim visual is Dr. Archana's real headshot with a cinematic treatment (slow Ken Burns zoom, gradient vignette, lower-third name caption, small play badge signaling real video is still coming — see `ClinicVideo.tsx`). Swap-in point for real footage is a single component. Nav logo updated to a two-line lockup (name + neighborhood/city), same placement pattern as the reference site.

**Homepage v1 — merged to `main` 2026-08-22, reviewed and approved by Akash:**
- [x] Hero — eyebrow badges, headline, body, Book your visit + Call CTAs
- [x] Trust block — differentiators, Dr. Archana bio card (real photo + trust badges), team grid, office photo grid, Google reviews badge
- [x] Insurance/offer block — carrier chips (placeholder), $149 new-patient offer card, Invisalign $500-off line
- [ ] Booking block — **blocked** on Tab32 service-layer sub-decisions (Section 6)
- [ ] Secondary urgent-path widget ("need to be seen today?")
- [x] Footer — hours/address/parking (placeholder), phone, Book CTA

**Real content landed:** Dr. Archana's headshot (`public/team/archana.webp`) replaces her bio-card and team-grid placeholders — first real content item off the blocker list in Section 8. Everything else in that section (rest of team/office photography, practice details, Tab32 sub-questions) is still open.

**Mobile fix:** the team and office-photo grids used `sm:grid-cols-3` with no mobile column count set, so both collapsed to a single column below 640px — roughly 4 screens of near-empty scroll before the booking CTA on an actual phone. Fixed to `grid-cols-2 sm:grid-cols-3`.

**Remaining before this is launch-ready:** urgent-path widget, booking block (needs Tab32 decisions resolved), CMS/content-editability decision (see platform-pivot doc), replacing remaining placeholders (rest of team/office photos, carrier names, address, hours, credentials copy) with real content, custom domain, and the compliance/accessibility checklist pass (Section 7).

**Hero CTA fix — merged to `main` 2026-08-23, reviewed and approved by Akash ([PR #1](https://github.com/akashsst-code/supertooth-dentistry/pull/1)):** the hero's Call button was landing below the fold on mobile (only Book your visit was visible without scrolling) and its `href` pointed at `/contact` instead of actually dialing. Fixed by putting Book and Call side by side at every width — Book stays the wide primary pill, Call is now a compact icon + "Call" pill (matching the nav's mobile call button) — and wiring Call to a real `tel:` link. Verified at iPhone SE (375px), the md: layout-split boundary (768px, where an interim version briefly broke), iPhone 17 Pro Max (~430px), and 1280px desktop. No other hero spacing/sizing changed.

---

## Status: Webflow build (historical — superseded by the Next.js build above)

Site: "Akash's Fantastic Site" (Webflow site ID `690d3dd0ad47f133f942dcb4`)

**Publish status (checked 2026-08-15):** The homepage sections below were built and published directly on the site's `main` — no Webflow branch was created for this work, so it skipped the branch → staging review → merge sequence this doc's workflow calls for. Akash has reviewed and accepted this as-is (no rollback), so treat it as approved. **All work from this point forward must follow the branch-first workflow** (`docs/supertooth-development-workflow.md`): create a Webflow branch before building a section, publish that branch to staging for review, merge to main only after approval. Site is not yet attached to a custom domain — currently live only on the default Webflow subdomain.

**Pages created:** Home (`/`), Services (`/services`), About & Meet the Team (`/about`), Insurance & New Patients (`/insurance-new-patients`), Contact (`/contact`) — all with SEO title/description set.

**Homepage sections built (in locked order):**
- [x] Hero — eyebrow, insurance signal, headline, body, Book Now + Call CTAs
- [x] Trust block — differentiators, Dr. Archana card, team grid (3 placeholder slots), office photo grid (3 placeholder tiles), Google reviews badge
- [x] Insurance/offer block — carrier chips (placeholder), $149 new-patient offer card, Invisalign $500-off line
- [ ] Booking block — **blocked** on Tab32 service-layer sub-decisions (Section 6)
- [ ] Secondary urgent-path widget ("need to be seen today?")
- [x] Footer — hours/address/parking (placeholder), phone, Book CTA

**Known open item:** Inter and Fraunces are not yet installed on the site — every section currently renders with a fallback font. One-time manual fix: Site Settings → Fonts → add "Inter" and "Fraunces" from Google Fonts in the Webflow Designer. All built CSS already references these font names, so they'll apply automatically once installed.

**Remaining before this is launch-ready:** urgent-path widget, booking block (needs Tab32 decisions resolved), replacing every placeholder (photos, carrier names, address, hours) with real content, and the compliance/accessibility checklist pass (Section 7).
