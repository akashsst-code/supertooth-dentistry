# Super Tooth Dentistry — Navigation Requirements

Builds on `supertooth-ux-flow.md` (unified single-page-led funnel, mobile-first, boutique look-and-feel) and `supertooth-build-principles.md` (simplicity, atomic changes).

Status: **Draft — evaluating mobile nav patterns**

---

## Desktop Nav (settled direction, low risk)

Modeled on the real pattern observed at Zen Dental Studio (SF):
- Logo left
- Short primary links: **Services · About/Meet the Team · Insurance & New Patients · Contact**
  - **Amended 2026-09-03 (Akash):** a fifth link, **Offers** (`/offers`), was added between About and Insurance & New Patients when the new-patient offers moved off the homepage — they need a route into them, and Akash asked for it in the menu specifically. Labelled "Offers" rather than "New-Patient Offers" for a measured reason: the desktop row already crowds at 768–790px (see the comment in `Nav.tsx`), and the long label made a second link wrap to two lines at 790px while the short one does not. The page's own title and H1 still read "New-Patient Offers". Recorded here rather than left as code drift, since this line was previously the locked list.
- Persistent **Book Now** CTA, always visible, right-aligned
- **Sticky header** — stays visible on scroll, so booking CTA is never more than one click away (serves Stage 4 conversion directly)

---

## Mobile Nav — Three Candidate Patterns

### Pattern A — Hamburger + persistent Book Now
- Header: logo, Book Now button, hamburger icon
- Everything else (Services, About, Contact) behind the hamburger
- **Pro:** familiar, minimal clutter, the one action that matters most (booking) stays reachable
- **Con:** click-to-call isn't equally prominent unless separately surfaced — risks under-serving the call/voicemail leak specifically

### Pattern B — Persistent bottom bar (Book / Call)
- Fixed bar at the bottom of the screen: Book + Call buttons, visible at all scroll positions
- Top nav: just logo + hamburger
- **Pro:** serves both Stage 4 leaks (form/booking AND call) equally
- **Con:** costs permanent screen real estate; more "app-like" than boutique sites typically use (not seen on Zen's own site)

### Pattern C — Minimal sticky header, no hamburger
- Header: logo, Book Now, call icon only — no nav links on mobile
- Patient scrolls the single page to find everything else
- **Pro:** maximum simplicity, matches the unified single-page-funnel decision directly
- **Con:** harder to jump to a specific service page from mobile nav

---

## Decision Criteria

1. **Equal service of both Stage 4 leaks** — booking AND call, not just one
2. **Fit with the unified single-page-funnel architecture** already locked
3. **Boutique feel, not app-like** — consistent with the warm/boutique look-and-feel decision
4. **Build simplicity** — standard Webflow components vs. custom interactions

| Pattern | Criterion 1 | Criterion 2 | Criterion 3 | Criterion 4 |
|---|---|---|---|---|
| A — Hamburger + Book Now | Weak (call not equally prominent) | Strong | Strong | Strong |
| B — Bottom bar | Strong | Moderate | Weak/Moderate risk | Moderate |
| C — Minimal sticky, no hamburger | Weak (booking only, no call icon by default) | Strong | Strong | Strongest |

**Working recommendation:** Pattern A, modified to add a small click-to-call icon next to Book Now in the header — covers both leaks without the app-like cost of Pattern B. **Not yet locked** — pending visual review.

---

## Decision (LOCKED): Pattern A — Hamburger + persistent Book Now + call icon

Header: logo, call icon, Book Now button, hamburger — all visible at once, sticky on scroll. Hamburger opens full-screen menu with Services / About / Insurance / Contact links, plus Book Now and phone number repeated at the bottom of the menu so they're never lost even while browsing links.

**Ruled out:** Pattern B (persistent bottom bar) — rejected. Permanent screen-height cost and app-like feel outweighed the equal-weighting benefit for booking vs. call.

**Still to confirm:** Pattern C (no hamburger, page-as-navigation) was reviewed but not chosen over A — A's inclusion of quick links (Services/About/Insurance/Contact) was preferred for findability, even though C was simpler to build.

## Decision (LOCKED): Hours/location shown inline in hamburger menu

Format: today's hours (optionally with live "open now/closes at" status, reusing the same hours-aware logic pattern as the urgent-path widget), full week's hours, and address — all visible the moment the menu opens, zero extra taps. Book Now + call number still repeated at the bottom.

Rationale: your own competitive scan found hours are table stakes, always prominently shown by competitors — and this follows the same "don't make a time-scarce patient dig for a fast practical answer" logic already applied when insurance-acceptance was pulled into the hero.

**Build note:** live "open now" status reuses the hours-aware logic already scoped for the urgent-path widget — if that's too much for v1, a static hours list (no live status) still delivers the core zero-tap win at lower cost.
