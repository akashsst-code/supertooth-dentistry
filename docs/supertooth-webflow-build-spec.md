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
- [ ] Real practice content: exact practice name/address/hours, Dr. Archana bio, services list, insurance plans accepted, testimonials/reviews source, logo file.
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

Deployed on Vercel, connected to `github.com/akashsst-code/supertooth-dentistry`. Production: https://supertooth-dentistry.vercel.app (default Vercel subdomain — no custom domain pointed yet).

**Real office photography + trust-block reorder — PR open, not yet merged:** first real office photos landed (`public/office/`, 5 images supplied by Akash), replacing the placeholder office-photo tiles — the first Section 8 content blocker fully resolved for office (team photography is still pending). Because this content is now real, Trust block order changed from the doc's originally-proposed Archana → team → office → reviews to **Archana → office → reviews → team** (Akash's explicit call): office moves up since it's real now, team stays deferred lower since it's still placeholder-only.

Office photos render in `OfficeCarousel.tsx` as a real native horizontal scroll-snap carousel (touch swipe, trackpad, and scrollbar-drag all work natively) rather than a CSS-transform marquee, specifically so it responds to user input instead of fighting it: any pointerdown (a swipe starting) pauses autoplay immediately, and an IntersectionObserver tracks which tile the user actually scrolled to, so resuming autoplay continues from there rather than jumping back. Tapping/clicking a tile opens it full-size in a lightbox (close button, Escape key, backdrop click, prev/next, focus moved to the close button on open) — serves the anxiety-reduction job office photos exist for (`supertooth-ux-flow.md` Section 2) by letting patients actually look closely at the space. Autoplay still ships a pause/play control (WCAG 2.2.2, Section 7 checklist) and fully skips itself for `prefers-reduced-motion`, matching `ClinicVideo.tsx`.

Verification note: this session's browser-automation click/scroll tools were unreliable (consistent timeouts), so interaction logic was verified by direct DOM/JS inspection in the live preview instead of click-driven screenshots — confirmed: container genuinely scrolls (`scrollLeft` moves on `scrollBy`), tile click opens the correct dialog with focus on its close button, the lightbox photo decodes with real (non-blank) pixel data, Escape closes the dialog, and a `pointerdown` on the track flips autoplay to paused. Worth a manual finger-swipe test on a real phone before merge.

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
