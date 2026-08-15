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

## Status: Webflow build in progress

Site: "Akash's Fantastic Site" (Webflow site ID `690d3dd0ad47f133f942dcb4`)

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
