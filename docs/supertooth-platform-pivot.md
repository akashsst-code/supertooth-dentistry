# Super Tooth Dentistry — Platform Pivot (2026-08-22)

## Decision (LOCKED): Replace Webflow with a custom-coded site (Next.js), deployed on Vercel via this git repo.

This supersedes the "Webflow is the system of record for the site" decision in `supertooth-build-principles.md` (Resolved Decisions) and the "Two separate tracks" split in `supertooth-development-workflow.md`. Both are updated to reflect this. The Tab32 service-layer plan is unaffected in spirit — it still needs to exist — but now lives in the same Next.js app (API routes) rather than as a separate service called by a Webflow front end.

## What prompted this

Akash decided to build the actual site as code instead of continuing in Webflow. Confirmed explicitly in chat on 2026-08-22, including a direct check against this repo's own prior documentation (which said the opposite) — this is a deliberate override, not an oversight.

## What's superseded vs. still valid

**Superseded:**
- Webflow as the live site / system of record (`supertooth-build-principles.md` Resolved Decisions, `supertooth-development-workflow.md` "Two separate tracks")
- The Webflow-branch-per-feature workflow — replaced by git-branch-per-feature + Vercel preview deployments (same underlying pattern: branch → preview → review → merge → publish, just on a different platform)
- The "Webflow Build Status" section in `supertooth-webflow-build-spec.md` — left in place as a historical record, not deleted, since real work (homepage copy/structure) was done there and may be worth porting into the new build

**Still valid, unchanged:**
- Every locked decision in `supertooth-priority-dimensions.md` (segments, business objectives, competitive findings)
- Every locked decision in `supertooth-ux-flow.md` (homepage section order, typography, color, spacing tokens)
- Every locked decision in `supertooth-navigation-requirements.md` (Pattern A nav)
- All compliance/accessibility requirements in `supertooth-build-principles.md` Sections 4, 7, 8
- The content blockers list (real practice content, team/office photography, Tab32 sub-questions) — still unresolved, still blocking full launch regardless of platform

## New architecture

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Hosting/deploy:** Vercel, connected to this GitHub repo. Push to a feature branch → Vercel preview URL (this is the new "staging" step, replacing Webflow branch-publish-to-staging). Merge to `main` → production deploy (this is the new "publish to live domain" step).
- **Design tokens:** implemented as Tailwind theme config (colors, fonts, spacing) rather than Webflow Variables — same token values, same reversibility principle.
- **Booking (Tab32):** still an open sub-question (hosting, auth, response shape — see `supertooth-ux-flow.md` and `supertooth-webflow-build-spec.md` Section 6). In the new architecture this most naturally becomes a Next.js API route in this same app rather than a separately-hosted service, but that's not re-locked here — flag if this needs its own decision-framework pass before the booking block is built for real.
- **CMS / content editability:** not yet decided. `supertooth-build-principles.md` Section 2 requires content be editable by non-developers (Archana's staff) without a developer in the loop — a static/hardcoded Next.js build does NOT satisfy this on its own. Needs a follow-up decision (headless CMS like Sanity/Contentful, or MDX + a lightweight admin) before this is genuinely launch-ready. Tracked as open, not resolved by this pivot.

## Workflow going forward

Single track now: git branch per feature/decision (docs or code), same atomic-change and commit-message-states-the-decision rules already in `supertooth-development-workflow.md`, just applied to the whole site now, not only docs/service-layer code. Per-feature checklist before merging a branch to main:

- [ ] Matches the locked design tokens (color, type, spacing) from `supertooth-ux-flow.md`
- [ ] Matches the locked section order/content from `supertooth-webflow-build-spec.md` / this pivot doc
- [ ] Touch targets ≥44×44px, text ≥16px, WCAG AA contrast
- [ ] No unverifiable claims; placeholder content clearly marked as placeholder, not passed off as real
- [ ] Vercel preview URL checked before merge
- [ ] Reviewed and approved by Akash (sole approval gate, unchanged)

## Open follow-ups this pivot creates

- [ ] CMS/content-editability decision (see above) — needed before non-dev staff can update content
- [ ] Re-confirm or re-scope the Tab32 service-layer hosting question now that it can live inside the same Next.js app
- [ ] Decide whether/how to port the built Webflow homepage copy or start fresh in the new build
- [ ] Custom domain + DNS pointed at Vercel instead of Webflow, once ready to go live
