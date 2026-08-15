# Super Tooth Dentistry — Development Workflow

Standing process for every feature/section built from here forward — Webflow site changes and git-tracked docs/code. Follow this for each rollout, not just as a one-time setup.

---

## Two separate tracks

| Track | Tool | What it covers |
|---|---|---|
| **Site build** | Webflow branches | Pages, sections, elements, styles — the visual site itself |
| **Docs & code** | Git (`supertooth-docs` repo) | Planning/reference markdown files, and future Tab32 service-layer code |

Don't mix them — Webflow is the system of record for the site, git is the system of record for specs and code. This was already locked in `supertooth-build-principles.md`.

---

## Webflow workflow — per feature/section

Follow these steps for every new section or meaningful change, not just large ones:

1. **Create a branch** before starting the unit of work (e.g., `urgent-path-widget`, `booking-block`, `services-page`). Main stays untouched while the branch exists.
2. **Build on the branch** — all element/style/content changes happen here first.
3. **Publish the branch** to its staging preview URL to actually see the rendered result before deciding anything.
4. **Review against the checklist below** before merging.
5. **Merge branch → main** only after review passes. If the branch conflicts with main, resolve conflicts explicitly (don't blind-merge).
6. **Publish main** to the live domain only when ready to go live — merging to main and publishing to the live domain are two separate, deliberate steps.

**Why this matters:** a disposable branch means a failed experiment costs nothing — main (and the live site, once published) is never at risk. This is the direct mechanism for "build incrementally, see it, don't lose what's already built."

### Per-feature checklist (before merging a branch to main)
- [ ] Matches the locked design tokens (color, type, spacing) from `supertooth-ux-flow.md`
- [ ] Matches the locked section order/content from `supertooth-webflow-build-spec.md`
- [ ] Touch targets ≥44×44px, text ≥16px, WCAG AA contrast (per `supertooth-build-principles.md` Section 4 UX Guidelines)
- [ ] No unverifiable claims / placeholder content clearly marked as placeholder, not passed off as real
- [ ] Reviewed and approved by Akash (sole approval gate, per locked principle)

---

## Git workflow — per doc/code change

1. Make the change to the relevant file locally (or via Claude, which edits the file directly).
2. Commit with a clear message describing the decision, not just "update file" — e.g., `Lock trust-first homepage ordering` not `edits`.
3. Push to the remote repo.
4. For Tab32 service-layer code specifically (once that work starts): use a feature branch in git too, same atomic-change principle, merge via pull request rather than pushing straight to main once a collaborator/dev is involved.

---

## When to use which

- **Building or changing anything visible on the live site** → Webflow branch workflow
- **Locking a new strategic/design decision, or writing/changing service-layer code** → git workflow
- **A feature that touches both** (e.g., booking block needs both a Webflow section AND the Tab32 service layer) → do the git-tracked spec/code piece first, then build the Webflow branch referencing the finished, working API contract — don't build the Webflow side against an unfinished backend.

---

## Quick reference — starting a new feature

1. Check `supertooth-webflow-build-spec.md` for what's already locked/built — don't relitigate or duplicate.
2. If it needs a design decision not yet made, use the `supertooth-decision-framework.md` process first.
3. Create a Webflow branch (or a git branch, if it's code) named for the feature.
4. Build, publish branch to staging, review against the checklist.
5. Merge to main. Publish live only when ready.
6. Update `supertooth-webflow-build-spec.md` status section to reflect what's now actually built.
