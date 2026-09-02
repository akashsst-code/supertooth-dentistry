# Next Features Proposal — Four P0 Not-Started Backlog Items

**Status: proposal, not built.** This doc scopes an approach for each item below and flags the open questions each one needs Akash's steer on *before* any code is written — same pattern as the design-decision docs already in `docs/`. Full acceptance criteria, test steps and references for each item live in `src/lib/backlog.ts`; this doc doesn't repeat those, only the proposed approach and what's still open.

All four are `P0`, `not-started`, and none depend on each other — they can land as independent PRs in any order once approved.

---

## 1. Item #45 — Emergency reachability without a bottom bar

**Job:** reach `/emergency` in one tap from anywhere on the site, without a sticky bottom bar (ruled out 2026-08-30) and without an entry in the fixed top nav (tried 2026-09-01, reverted — Akash didn't want it there).

**What's left unreachable today:** the hamburger-menu link only — one extra tap on mobile, no desktop entry at all. Doesn't meet the item's one-tap acceptance criterion.

**Proposed approach — a persistent in-page affordance instead of chrome:** rather than adding a fourth control to an already-tight header (the thing that failed last time), place a small, undiluted-`--color-alert` "Dental Emergency" link inside content that's already on every route's first viewport — the natural home is `BookingBlock`'s existing "Quick actions" row, which already carries the same badge treatment on the homepage (per item 48). The gap is the five non-homepage routes (`/about`, `/services`, `/insurance-new-patients`, `/contact`, `/emergency` itself), which don't render `BookingBlock`. Two candidates to choose between:

- **(a)** A slim, non-sticky persistent strip under each of those pages' own header/hero area — same alert-color badge, same one-line style, no new component pattern.
- **(b)** Extend `PageShell` (item #5, also not-started) so every route gets a shared sub-header slot; emergency would be one tenant of that slot alongside anything else that needs sitewide placement later.

(a) ships independently today; (b) is cleaner long-term but is blocked on item #5 landing first. Recommend (a) for this pass and file it as a real, not-invented answer if item #5 lands later.

**Open question for Akash:** does this rowed-into-content placement read as "not in the nav" the way you wanted, or does it still feel too chrome-like? This is exactly the kind of call the item's own history says needs your steer before building, not after.

---

## 2. Item #16 — Dental anxiety and comfort content

**Job:** say, in one honest paragraph, that anxious or long-absent patients won't be made to feel bad — the best-evidenced patient need in the research and currently unaddressed anywhere on the site.

**Proposed approach — minimum viable version only** (the item's own acceptance criteria say the minimum ships without waiting on a fuller comfort-options list):

- One short, non-judgmental paragraph — permission, not pity — placed where an anxious mobile reader hits it in the first viewport, not after a scroll (mobile-first per the item's own mobile gate). Best-fit surface: a strip on the homepage near `FAQSection` or `TrustBlock`, content-only, no new component.
- Ties into the existing appointment form's optional "anything we should know?" field (already shipped per item #9) rather than duplicating it.
- **No sedation, comfort-option, or "gentle" claim beyond what's practice-confirmed** — the item's own `outOfScope` line and this repo's no-unverifiable-claims rule both block that until Akash confirms specifics.

**Open question for Akash:** confirm the wording is fine to draft directly (no specific clinical claims needed for the v1 paragraph), and whether homepage placement near `FAQSection`/`TrustBlock` is the right spot versus somewhere else.

---

## 3. Item #32 — Mobile input correctness and form state preservation

**Job:** `AppointmentForm.tsx` gets the right keyboard per field, doesn't trigger iOS zoom-on-focus, and doesn't lose entered values if a patient backgrounds the browser to go find their insurance card.

**Proposed approach — three independent, mechanical fixes, no design decision needed:**

- Add the full `type` + `inputmode` + `autocomplete` attribute triplet to every field in `AppointmentForm.tsx` (tel, email, name, postal-code) — per MDN/GOV.UK guidance already cited in the item's references.
- Audit every input's computed font-size and raise anything under 16px (root cause of iOS zoom-on-focus) — likely already covered by item #37's type-scale work, needs verification not assumption.
- Preserve in-progress form values across back-navigation/backgrounding. Per the item's explicit `outOfScope`, this must **not** persist to browser storage (PHI risk, flagged against item #24) — needs a same-session, in-memory approach (e.g., lifting state above the route so React state alone survives back-nav within the SPA session), not `localStorage`/`sessionStorage`.

**No open design question here** — this is a correctness fix, not a decision. Flagging it in this doc mainly for sequencing/sign-off, not because it needs Akash's judgment call the way #45/#16 do.

---

## 4. Item #33 — Loading and empty states for every async interaction

**Job:** every async action on the site (today, just `AppointmentForm` submission) shows a loading state within ~100ms, never shifts layout doing it, can't be double-submitted, and any empty result offers the phone number instead of a dead end.

**Proposed approach:**

- Add a loading state to `AppointmentForm.tsx`'s submit flow: disable/guard the submit control while in flight, reserve its layout space so no CLS, and announce via `aria-busy` or a live region.
- Site currently has no other async surface that returns an "empty" result (no search, no list view) — so the empty-state half of this item is presently a no-op beyond stating that explicitly, unless Akash has a specific surface in mind that isn't in the current codebase yet.

**Open question for Akash:** is there an async surface planned (search, availability lookup, etc.) that this item should anticipate, or is `AppointmentForm` submission genuinely the only async interaction in scope today?

---

## Sequencing note

None of these four block each other. #32 and #33 are the least ambiguous (mechanical/correctness) and could start as soon as this doc is reviewed. #45 and #16 each have one open placement/wording question above — recommend Akash's answer lands before those two branches start, same pattern as #45's own history (built once already on an unapproved placement, had to be fully reverted).
