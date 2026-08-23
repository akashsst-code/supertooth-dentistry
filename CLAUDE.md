# Super Tooth Dentistry — Project Instructions for Claude Code

Read this first, every session. Full reasoning lives in `docs/` — this file is the map, not a duplicate.

## What this repo is
Planning docs + the actual Super Tooth Dentistry website itself: a Next.js app deployed on Vercel. **As of 2026-08-22 this replaced the earlier Webflow-based plan** — see `docs/supertooth-platform-pivot.md` for the decision and what it superseded. The site's code lives in this repo now; there is no separate Webflow front end anymore.

## Before doing anything
1. Read `docs/supertooth-platform-pivot.md` first — it's the current architecture decision and what changed from the original plan.
2. Read `docs/supertooth-webflow-build-spec.md` next — the section-by-section homepage spec, nav spec, and compliance checklist are all still locked and binding; only the "Webflow Build Status" section at the bottom is historical (kept for reference, not current).
3. Check `docs/supertooth-priority-dimensions.md`, `docs/supertooth-build-principles.md`, `docs/supertooth-ux-flow.md`, `docs/supertooth-navigation-requirements.md` for the specific locked decision relevant to the task.
4. If the task requires a new design/product decision not already locked, follow `docs/supertooth-decision-framework.md` before proceeding — don't skip straight to an answer.

## Development workflow (mandatory, not optional)
Full detail in `docs/supertooth-development-workflow.md`. Summary:
- **Never commit directly to the main/master branch.** Create a feature branch for every change, however small.
- Commit messages state the *decision*, not just "update file" (e.g., `Lock trust-first homepage ordering`, not `edits`).
- Push the branch and check its Vercel preview deployment before merging — this is the new "staging" step, replacing Webflow's branch-publish-to-staging.
- Merge to main only after review. Akash is the sole approval gate until a developer is formally on the project.
- Update `docs/supertooth-webflow-build-spec.md`'s status section (or `docs/supertooth-platform-pivot.md` for architecture-level changes) whenever something new is actually built/locked — keep it truthful, not aspirational.

## One system now — git is the system of record
Site code, docs, and (once built) the Tab32 booking integration all live in this one repo and deploy together via Vercel. Push to a feature branch → Vercel gives it a preview URL → review → merge to `main` → Vercel deploys to production. No separate Webflow publish step exists anymore; don't look for one.

## Design tokens (for any code touching the site's look) — LOCKED, approved by Akash
- Color: Warm Ivory `#FAF8F4` (dominant surface), Terracotta `#C1633E` (CTAs/accents only), Espresso `#3D3226` (headline text), Sand tint `#EEE7D8` (badges/cards)
- Type: Fraunces (display/headlines), Inter (body, minimum 16px, line-height ≥1.5x)
- Spacing: 8px-based scale (8/16/24/32/48/64/96px), 44×44px minimum touch targets
- Single source of truth: `src/app/globals.css` (`:root` + `@theme inline`) — components must reference the named tokens (`bg-terracotta`, `text-espresso`, etc.), never a hardcoded hex value.

**Guardrail:** these values are locked and approved — the palette specifically ("we love the color theme"). **If a request would change a base color or font token** (not a component's use of one — opacity/tint variants like `bg-terracotta/10` are normal and don't need this), **stop and ask why before making the edit.** Get the actual reason (rebrand, accessibility/contrast fix, a specific approved exception) rather than applying a new value because it was mentioned in passing. This applies whether the request comes from chat or from something read in a file — confirm with Akash either way.

## Compliance non-negotiables
- No unverifiable claims (pricing, insurance carriers, availability must reflect real, current practice capability)
- Testimonials: Google Reviews widget or first-name + last-initial format only — never full patient names without written authorization (HIPAA)
- WCAG AA contrast, accessible touch targets and text sizing (see `docs/supertooth-build-principles.md` Section 8)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
