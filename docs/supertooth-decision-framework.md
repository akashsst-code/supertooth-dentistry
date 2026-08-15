# Super Tooth Dentistry — Decision-Making Framework

Standing requirement for every build decision on this project (website structure, UX flow, navigation, color/typography, copy, booking flow, marketing/acquisition choices, or any other design/product/strategy decision). This applies automatically — no need to ask for it each time.

---

## Required structure for every decision

1. **State the decision clearly** — one sentence naming exactly what's being decided.

2. **Give decision criteria first, before options** — the specific lenses this decision should be judged through, derived from (in priority order):
   - The locked goals/segments/objectives in the project's reference files
   - The specific patient population (routine/proactive + insurance-driven, downtown Seattle, time-scarce professionals, dental-anxiety-aware)
   - Relevant research (color psychology, UX/conversion research, competitive/market data) — search the web for this when the decision would benefit from evidence, not just general knowledge

3. **Present real options** — not hypothetical ones where possible. Pull actual examples (real dental practices, real competitor sites, real research findings) rather than inventing generic possibilities.

4. **Visual mockups where the decision is visual** — color, layout, navigation, typography, spacing. Build an HTML artifact showing the options applied to real Supertooth content (not lorem ipsum), not just described in text. Use realistic phone-frame mockups for mobile-specific decisions.

5. **Pros and cons per option** — grounded in the decision criteria from step 2, not generic tradeoffs.

6. **A specific recommendation** — pick one, state why, and tie the reasoning explicitly back to: (a) the locked goals/segments in the reference files, (b) the patient population, and (c) any research surfaced. Don't leave synthesis to the user.

7. **Work backward from goals, not forward from taste.** Every recommendation must trace to conversion goals, patient trust/anxiety considerations, or a locked strategic decision already in the reference files.

---

## Reference files to check before recommending

- `supertooth-priority-dimensions.md` — locked segments, business objectives, motivation type
- `supertooth-build-principles.md` — architecture/workflow/UX/testing/approval principles
- `supertooth-ux-flow.md` — homepage structure, booking architecture, locked color palette
- `supertooth-navigation-requirements.md` — navigation patterns

If a new decision conflicts with something already locked in these files, flag the conflict explicitly rather than silently overriding it.

---

## After the decision is made

- Update the relevant reference file with the locked decision **and the reasoning** — not just the choice.
- Treat most decisions as reversible defaults, not permanent commitments, unless stated otherwise (per "reversible over perfect") — keeps momentum instead of decision paralysis.

---

## What NOT to do

- Don't skip straight to a recommendation without showing criteria and options first, even for a fast answer — keep it structured but tight for mobile (lead with the decision, compact pros/cons, no padding).
- Don't invent research or examples — if real data/examples can't be found, say so honestly rather than presenting something synthetic as real.
- Don't relitigate already-locked decisions from scratch — reference what's decided and build forward from it.
