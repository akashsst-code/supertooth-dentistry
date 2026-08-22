# Super Tooth Dentistry

The Super Tooth Dentistry website (Next.js, deployed on Vercel) plus the planning docs that specify it. This repo is the source of truth for locked decisions — chat history is not.

**As of 2026-08-22, this repo hosts the site itself**, not just docs — see `docs/supertooth-platform-pivot.md` for how that changed from the original Webflow plan.

## Structure

```
docs/
├── supertooth-platform-pivot.md         Current architecture decision (Next.js on Vercel) and what it superseded
├── supertooth-priority-dimensions.md    Segments, business objectives, motivation type, backlog
├── supertooth-build-principles.md       Architecture, workflow, UX, testing, approval principles
├── supertooth-ux-flow.md                Homepage structure, booking architecture, color/type/spacing
├── supertooth-navigation-requirements.md Navigation patterns (desktop + mobile)
├── supertooth-decision-framework.md     Standing framework for how build decisions get made
└── supertooth-webflow-build-spec.md     Section-by-section homepage/nav/compliance spec (still binding) + historical Webflow build status
app/, components/, etc.                  The Next.js site itself
```

## Suggested future structure

As the Tab32 booking integration gets built, it most naturally lands as Next.js API routes in this same app (see `supertooth-platform-pivot.md`) rather than a separately-hosted service — keeping the spec and the code that implements it in one deploy avoids drift between the two.

## How to use this repo

Every locked decision lives in these files with its reasoning, not just the choice. Before starting new work, check whether it's already been decided here. When a new decision is made, update the relevant file — don't let chat be the only record.
