# Super Tooth Dentistry — Prioritization Dimensions

## 1. Patient Segments

Not all "new downtown patients" are the same. Treating them as one persona produces generic goals.

| Segment | Cares about | Entry point implication |
|---|---|---|
| **Urgent / pain-driven** | Speed, same-day availability — nothing else | Big, obvious "same-day" CTA |
| **Insurance-driven** | "Do you take my plan," fast admin, use-it-or-lose-it timing | Insurance checker/logos up top |
| **Routine / proactive** | Reviews, long-term fit, hygienist quality — not urgency | "Meet Dr. Archana" story, credentials |
| **Referral-driven** | Already trusts the practice — just needs frictionless booking | Skip persuasion, straight to booking |

Each wants a different homepage message and possibly a different path. One generic journey optimizes for the average patient and underserves all four.

**Priority (LOCKED):**
- [ ] Urgent / pain-driven
- [x] **1. Routine / proactive** — primary segment
- [x] **2. Insurance-driven** — secondary/overlapping segment
- [ ] Referral-driven

**Rationale:** Most new downtown patients fit this combined profile — establishing a long-term dentist (routine/proactive) while being motivated by insurance timing/coverage (insurance-driven). Homepage and Stage 3 (evaluation) trust signals should lead with credentials, reviews, and long-term-fit messaging, paired with clear insurance-accepted/plan-check visibility. Urgent and referral segments still get a path (e.g., a visible "same-day" link), just not the primary design target.

---

## 2. Motivation Type — Rational vs. Emotional

- **Rational:** insurance coverage, price transparency, location/hours convenience
- **Emotional:** dental anxiety, embarrassment about neglected care, wanting a "gentle"/judgment-free provider
- **Downtown-specific:** time scarcity — "I can't afford 2 hours out of my workday" — favors direct efficiency messaging over generic "gentle care" copy

This isn't a separate priority tier — it's the *tone* applied to whichever segment(s) you prioritize above.

**Priority (LOCKED):**
- [ ] Rational / efficiency-led
- [ ] Emotional / reassurance-led
- [x] **Blend, led by top-priority segment** — routine/proactive patients respond to trust + long-term fit (emotional: "gentle, judgment-free"), while insurance-driven patients respond to clear rational signals (plan accepted, no surprise costs). Copy should pair both, not lead with pure urgency/efficiency messaging.

---

## 3. Business Objectives

These are separate from patient goals and can conflict with pure conversion optimization.

| Objective | Tension |
|---|---|
| **Insurance mix** — grow in-network volume vs. shift to cash/cosmetic | Changes which CTA gets priority placement |
| **Chair capacity** — fill slots generally vs. fill specific off-peak/midday hours | If off-peak, site should nudge specific times, not just "book anytime" |
| **Staffing reality** — front-desk bandwidth | Self-serve booking widget reduces load vs. "call us" push |
| **Retention vs. acquisition** — new patients vs. reducing no-shows on existing base | Determines if this build is acquisition-only or also fixes retention |

**Priority (LOCKED):**
- [x] **1. Chair capacity — grow volume** — Current: 10–15 new patients/month. Target: 3–4/day × 4 workdays/week ≈ **52–69 new patients/month (~4–5x current volume)**. Capacity confirmed available — this is a demand-generation goal, not a staffing constraint.
- [x] **2. Insurance mix** — secondary lever; growth should skew toward routine/proactive + insurance-driven patients (per locked segment above), not just any volume.
- [ ] Staffing / front-desk load reduction
- [ ] Retention (no-show reduction)

**Implication for build priority:** At a 4–5x volume target, Stage 4 fixes (killing the form/email and call/voicemail leaks) alone won't close the gap — they only convert demand that already exists. Stage 2 (Discovery — local SEO, Google Business Profile, downtown search visibility) becomes equally or more critical, since it's what expands the top of funnel to begin with. Recommend treating Discovery + Booking-conversion as a paired v1 priority, not sequential.

**Note:** Hitting the 4–5x volume target will require multiple channels (SEO, AEO, paid, GBP, referral programs, etc.), not the website alone. This file scopes the **website's role** specifically. Other channels are tracked in the Backlog section below so goals here stay focused and buildable.

---

## 4. Competitive / Market Factor

What do other downtown Seattle dental practices offer that Super Tooth doesn't — same-day booking, extended hours, transparent pricing? Patients compare tabs, not just evaluate in isolation. This feeds directly into which trust signals matter in the evaluation stage.

**Status:** moved to Backlog below — informs messaging but isn't a build task itself.

---

## Build Constraints (v1 — architecture only, not full execution)

Full SEO/AEO/competitive strategy work stays in Backlog. But the site's underlying structure should not block that work later, since retrofitting architecture is a rebuild, not an addition.

- **AEO-ready structure:** FAQ blocks written as direct Q&A pairs (not buried in prose), schema markup for LocalBusiness/Dentist/FAQPage, clean per-service page structure — so answer engines can extract content without a later restructure.
- **SEO-ready structure:** clean, distinct URLs per service/location page, page structure that supports future "dentist near [downtown landmark]" targeting.
- **Competitive baseline:** a light pass (not full scan) on 2–3 nearby downtown practices' sites, specifically to confirm Stage 3 trust signals (same-day booking, pricing transparency, hours) aren't missing something patients will notice by comparison.

---

## Backlog — Other Acquisition Avenues (Out of Scope for This Build)

Tracked here so they aren't lost, but not part of the website goals/spec above.

- [ ] **SEO** — organic search optimization (content, local landing pages, backlinks)
- [ ] **AEO** (answer engine optimization) — visibility in AI-assisted search/chat answers
- [ ] **Google Business Profile** — deeper optimization beyond basic completeness (posts, Q&A, photo cadence)
- [ ] **Paid acquisition** — Google/Meta ads, budget and targeting TBD
- [ ] **Referral program** — formalizing word-of-mouth/colleague referrals into a trackable channel
- [ ] **Competitive scan** — moved here from Section 4; informs Discovery/Evaluation messaging but isn't a build task itself
- [ ] **Retention/no-show reduction** — deferred; revisit once acquisition volume is closer to target
- [ ] **Front-desk staffing/workflow** — deferred; revisit if volume growth strains current staffing despite confirmed chair capacity


What do other downtown Seattle dental practices offer that Super Tooth doesn't — same-day booking, extended hours, transparent pricing? Patients compare tabs, not just evaluate in isolation. This feeds directly into which trust signals matter in the evaluation stage — needs a quick competitive scan before finalizing.

**Status:**
- [ ] Competitive scan completed
- [ ] Competitive scan still needed

---

## Open Decision — RESOLVED

**Decision (LOCKED): Unified journey for v1.**

Rationale: The primary segment was already collapsed into one combined persona (routine/proactive + insurance-driven) rather than 4 competing ones. These aren't opposing motivations — they're sequential: trust convinces first, insurance-acceptance removes friction second. One page, ordered accordingly, serves both without dilution. Differentiated CTAs would mean solving a segment conflict that no longer exists after locking the primary segment.

Secondary segments (urgent/pain-driven, referral-driven) are still served via a visible but non-primary path — e.g., a "need to be seen today?" link — not a separate homepage or routing logic.

- [x] **Unified journey, one primary persona (routine/proactive + insurance-driven)**
- [ ] Differentiated CTAs in v1
