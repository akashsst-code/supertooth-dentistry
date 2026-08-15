# Super Tooth Dentistry — Project Instructions for Claude Code

Read this first, every session. Full reasoning lives in `docs/` — this file is the map, not a duplicate.

## What this repo is
Planning docs + (eventually) Tab32 service-layer code for the Super Tooth Dentistry website rebuild. The Webflow site itself is NOT stored here — it's managed live in Webflow, referenced from these docs.

## Before doing anything
1. Read `docs/supertooth-webflow-build-spec.md` first — it's the consolidated status: what's locked, what's built, what's blocked.
2. Check `docs/supertooth-priority-dimensions.md`, `docs/supertooth-build-principles.md`, `docs/supertooth-ux-flow.md`, `docs/supertooth-navigation-requirements.md` for the specific locked decision relevant to the task.
3. If the task requires a new design/product decision not already locked, follow `docs/supertooth-decision-framework.md` before proceeding — don't skip straight to an answer.

## Development workflow (mandatory, not optional)
Full detail in `docs/supertooth-development-workflow.md`. Summary:
- **Never commit directly to the main/master branch.** Create a feature branch for every change, however small.
- Commit messages state the *decision*, not just "update file" (e.g., `Lock trust-first homepage ordering`, not `edits`).
- Merge to main only after review. Akash is the sole approval gate until a developer is formally on the project.
- Update `docs/supertooth-webflow-build-spec.md`'s status section whenever something new is actually built/locked — keep it truthful, not aspirational.

## Two separate systems — don't blur them
- **Webflow** = the live site (pages, sections, styles). Built via Webflow's own branch/publish/merge system, not git. If working in Claude Code with the Webflow MCP tools available, the SAME Webflow-branch-first rule applies — create a Webflow branch before building a section, publish to staging to review, merge only after approval.
- **Git repo (this one)** = docs + the Tab32 service-layer code once that work starts. The service layer is NOT hosted on Webflow — it needs its own hosting (serverless function or backend), which Webflow's front end calls via API. Don't conflate "pushing to git" with "publishing to Webflow" — they're two different deploys for two different things.

## Design tokens (for any code touching the site's look)
- Color: Warm Ivory `#FAF8F4` (dominant surface), Terracotta `#C1633E` (CTAs/accents only), Espresso `#3D3226` (headline text), Sand tint `#EEE7D8` (badges/cards)
- Type: Fraunces (display/headlines), Inter (body, minimum 16px, line-height ≥1.5x)
- Spacing: 8px-based scale (8/16/24/32/48/64/96px), 44×44px minimum touch targets

## Compliance non-negotiables
- No unverifiable claims (pricing, insurance carriers, availability must reflect real, current practice capability)
- Testimonials: Google Reviews widget or first-name + last-initial format only — never full patient names without written authorization (HIPAA)
- WCAG AA contrast, accessible touch targets and text sizing (see `docs/supertooth-build-principles.md` Section 8)
