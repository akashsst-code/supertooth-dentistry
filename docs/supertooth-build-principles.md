# Super Tooth Dentistry — Build Principles

Governing document for how this product gets designed, built, reviewed, and shipped. Every decision in the actual build (site spec, Cowork prompts, code changes) should be checkable against this file. If a proposed change violates a principle here, that's a signal to stop and reconcile — not to quietly override it.

---

## 1. Core Philosophy

- **Simplicity is a feature, not a shortcut.** The simplest solution that meets the locked goal wins, even if a more sophisticated one is available. Complexity must justify itself against a real, named requirement — not "it might be useful later."
- **Optimize for the locked goal, not for completeness.** Reference `supertooth-priority-dimensions.md` before adding scope. If it's not in Goals, it's Backlog — not a reason to expand the current build.
- **Reversible over perfect.** Prefer changes that are easy to undo (feature flags, small diffs, staged rollouts) over big-bang changes that are hard to walk back.
- **Boring technology by default.** Use well-understood, stable tools unless there's a specific, named reason a novel one is required. This is a dental practice site, not an R&D project — reliability beats novelty.

---

## 2. Architecture Principles

- **Content is separable from presentation.** Practice content (services, hours, pricing, testimonials) should live somewhere editable by non-developers (CMS/WordPress fields), not hardcoded into templates — Archana's staff will need to update this without you or Claude in the loop.
- **Structure decisions are expensive to reverse; content decisions are cheap.** Get page architecture, URL structure, and schema markup right early (see Build Constraints in the priorities file) — these are the things a "just add a page later" fix can't cleanly patch.
- **No architecture decision without a documented reason.** Every structural choice (routing, CMS vs. static, widget vs. custom form) should trace back to a goal in the priorities file, not personal preference or what's fastest to prototype.
- **Design for the unified journey, not for imagined future segments.** Don't build routing/branching logic for segments (urgent, referral) that were deliberately deprioritized — that's speculative complexity.

---

## 3. Development Workflow

- **Atomic changes only.** Each change does one thing: one page section, one component, one fix. No bundling "add booking widget" with "redesign color palette" in the same change — each should be independently reviewable and revertible.
- **Every change traces to a written requirement.** Before building, the "why" should already exist in a goals/spec doc. If it doesn't, write it down first — don't build from a verbal aside.
- **Small diffs, frequent checkpoints.** Prefer many small reviewable steps over one large build-then-review pass. This applies to Cowork sessions too — check in after each meaningful unit of work, not after the whole site is built.
- **No silent scope creep.** If a build step reveals a better idea outside current scope, log it to Backlog — don't fold it in unannounced.

---

## 4. UX Guidelines

- **Above-the-fold answers the top question first.** Per the locked segment (routine/proactive + insurance-driven): trust signal first, insurance clarity second — within the first screen, no scrolling required.
- **Every CTA has one obvious next action.** No competing CTAs on the same screen pulling attention in different directions.
- **Mobile-first.** Downtown patients are searching and booking from their phone, often on a break — design and test mobile before desktop.
- **Friction is the enemy at the moment of conversion.** Stage 4 (booking) should never require more steps than a restaurant reservation. Every added field or click needs to justify itself.
- **Accessibility is not optional.** WCAG AA baseline — color contrast (check against the locked palette), alt text, keyboard navigation, readable font sizes. This is a healthcare site; patients skew older and more diverse in ability than average.
- **Consistent with the locked style guide.** Any new component or page must be checked against the v2 developer style guide (colors, typography, spacing) already produced — no ad hoc styling decisions mid-build.

---

## 5. Code Review

- **No unreviewed change ships**, including changes made inside Cowork/Codex sessions — treat AI-generated output with the same scrutiny as human-written code.
- **Review checklist per change:**
  - Does it do one atomic thing?
  - Does it trace to a documented goal?
  - Does it break the locked style guide or architecture?
  - Is there a rollback path if it's wrong?
- **You (Akash) are the final reviewer** until a dev is formally brought in for handoff — Claude/Cowork output is a draft for your review, not an auto-approved deliverable.

---

## 6. Testing

- **Test before calling something done**, not after a problem is reported by a patient trying to book.
- **Minimum bar per feature:**
  - Booking widget: test the full flow end-to-end, including failure states (no slots available, invalid info)
  - Forms: test submission, confirmation, and what happens if it fails silently
  - Click-to-call/text: test on actual mobile devices, not just simulated
  - Cross-browser/cross-device: at minimum, latest Chrome + Safari, iOS + Android
- **No feature is "done" until it survives someone other than the builder trying to break it.**

---

## 7. Approval Gates

- **Nothing goes live without explicit sign-off from Akash** (and Archana where it touches patient-facing claims, pricing, or compliance).
- **Sign-off checkpoints, not one final review:**
  1. Goals/spec locked (done — this stage)
  2. Design/wireframe approved before full build
  3. Content/copy approved before publishing
  4. Functional review (booking, forms, calls) before go-live
  5. Final go-live approval
- **Compliance-sensitive content gets a dedicated check** — testimonials/PHI handling, insurance claims, medical claims — flagged explicitly, not bundled into general design review.

---

## 8. Compliance & Trust (Healthcare-Specific)

- **HIPAA awareness on every patient-data-adjacent decision** — testimonial format, form data handling, any analytics/tracking that touches patient info. Reference prior decision: reviews widget or first-name+last-initial format, not full patient names, without written authorization.
- **No unverifiable claims.** "Same-day appointments," insurance carriers listed, pricing — all must reflect actual, current practice capability, not aspirational marketing copy.
- **Privacy policy and required disclosures** are a launch-blocking checklist item, not an afterthought.

---

## 9. Documentation

- **Every locked decision lives in a file, not just in chat.** (This is why we're building these docs now — chat history isn't a source of truth for the team.)
- **Style guide and goals file are the two canonical references** — new work should link back to specific sections of these rather than restating assumptions.
- **Decisions get dated and reasoned**, not just recorded as a checkbox — so future-you can tell *why*, not just *what*.

---

## 10. Deployment & Release

- **Staged rollout over big-bang launch** — use Webflow's staging/preview environment to verify booking widget, forms, and tracking work correctly before publishing to the live domain.
- **Rollback plan exists before go-live** — Webflow's version history gives a revert path; confirm before launch that you know how to restore a prior published version if something breaks on day one.
- **Monitor immediately post-launch** — first week, watch the instrumented data (form submissions, booking completions, call taps) closely since this is exactly the leak we're trying to fix; don't assume it's working, confirm it with the numbers.

---

## Resolved Decisions

- **Approval authority:** Akash only. No additional reviewer tier for now (front-desk/staff feedback can inform content, but doesn't gate sign-off).
- **Analytics/instrumentation:** Build tracking in from the start, not post-launch. Form submissions, booking-widget completions/drop-off, click-to-call taps, and page-level traffic should all be instrumented as part of the initial build — this is how we get the baseline data Section 6 (Testing) and the goals file both depend on.
- **SEO/AEO architecture:** Treat as an architecture-level concern now, not a pure backlog item. Per Build Constraints in the priorities file — clean per-service URLs, schema markup (LocalBusiness/Dentist/FAQPage), FAQ content as direct Q&A pairs — these get built into the initial structure so backlog SEO/AEO content work later doesn't require a rebuild.
- **Version control / repo:** Webflow is the system of record. Version control means Webflow's native backup/version-history features, not a separate git repo — treat published/staged versions in Webflow as the change log, and use Webflow's staging environment for the pre-launch review gate (Section 10).
