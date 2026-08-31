/**
 * Global Test Harness (GTH) — checks that run on EVERY build item.
 *
 * Adopted from `docs/research/downtown-seattle-family-dental-website-blueprint.md`
 * Section 25(c), adapted to this repo's stack (Next.js 16 on Vercel) and to
 * its already-locked stricter rules where they differ.
 *
 * Why this exists: before this, every backlog item restated its own
 * accessibility, overflow and tap-target assertions. That is ~27 copies of
 * the same checks, which drift. Items now reference harness ids
 * (`harness: ["GTH-1", "GTH-13", ...]`) and only spell out what is unique
 * to them.
 *
 * ── Two deliberate divergences from the source blueprint ──────────────
 * 1. **Tap targets stay at 44px, not WCAG 2.2's 24px floor.** The
 *    blueprint and WCAG 2.5.8 both permit 24×24; this repo's locked
 *    accessibility rule is a flat 44×44 with ≥8px separation. Stricter
 *    rule wins.
 * 2. **The viewport matrix adds 320 and 430 to our existing 375.** The
 *    blueprint's matrix is 320/360/390/430 + landscape. We had been
 *    testing 375 only, which is neither the smallest supported width nor
 *    a real common device — 320 (reflow floor) and 390 (common iPhone)
 *    both matter more.
 *
 * Nothing here is a dependency: every check runs with `npx` on demand or
 * with tools already present. Adding a test runner is deliberately not
 * part of adopting the harness — see GTH_ADOPTION_NOTE.
 */

export type HarnessGroup = "baseline" | "mobile";

export type HarnessCheck = {
  id: string;
  group: HarnessGroup;
  title: string;
  /** What it actually verifies, in one line. */
  what: string;
  /** How to run it against a route. `$URL` = the route under test. */
  how: string;
  /** The threshold that decides pass/fail. */
  pass: string;
  /** What a failure typically looks like, so a failing run is diagnosable. */
  failSignature: string;
  /** Where this repo deliberately differs from the source blueprint. */
  divergence?: string;
};

/** The phone sizes every rendering check runs at. 375 kept for continuity. */
export const VIEWPORT_MATRIX = [
  { name: "small-320", width: 320, height: 568, why: "Smallest supported; WCAG 1.4.10 reflow floor" },
  { name: "android-360", width: 360, height: 640, why: "Common Android" },
  { name: "iphone-375", width: 375, height: 812, why: "This repo's existing baseline" },
  { name: "iphone-390", width: 390, height: 844, why: "Common current iPhone" },
  { name: "large-430", width: 430, height: 932, why: "Large phone" },
  { name: "landscape", width: 844, height: 390, why: "WCAG 1.3.4 orientation independence" },
] as const;

export const GTH_ADOPTION_NOTE =
  "The harness is a checklist, not a framework. Every check runs via npx on demand or through the browser tools already in use. Adding Playwright or a CI runner is a separate decision with its own cost — do not treat 'adopt the harness' as 'add a test runner'.";

export const harness: HarnessCheck[] = [
  // ── Baseline: runs on every item, every route it touches ────────────
  {
    id: "GTH-1",
    group: "baseline",
    title: "Accessibility scan (axe)",
    what: "Automated accessibility violations on the changed route.",
    how: "npx @axe-core/cli $URL --exit — run at 375×812 first, then the rest of the matrix.",
    pass: "Zero violations of impact serious or critical.",
    failSignature: "Repeated name/role, label, or contrast violations.",
    divergence:
      "Run at mobile width first. Target size, reflow and focus-obscured findings are viewport-dependent, so a desktop-only axe run is a false pass.",
  },
  {
    id: "GTH-2",
    group: "baseline",
    title: "Performance budget (Lighthouse)",
    what: "Core Web Vitals and overall performance on the changed route.",
    how: "npx lighthouse $URL --form-factor=mobile --throttling-method=simulate --quiet",
    pass: "Performance ≥90, LCP ≤2.5s, CLS ≤0.1, TBT ≤200ms, Accessibility ≥100.",
    failSignature: "An unoptimized image or blocking script over budget.",
  },
  {
    id: "GTH-3",
    group: "baseline",
    title: "HTML validity",
    what: "Malformed markup, duplicate ids, invalid ARIA references.",
    how: "npx html-validate on the built output, or the Nu Html Checker against the deployed URL.",
    pass: "Zero errors.",
    failSignature: "Duplicate id, unclosed tag, or an aria-* pointing at nothing.",
  },
  {
    id: "GTH-4",
    group: "baseline",
    title: "Keyboard-only primary task",
    what: "The route's primary task completes with no mouse.",
    how: "Tab / Shift-Tab / Enter / Space through the primary task end to end.",
    pass: "Task completes and focus is visible at every stop.",
    failSignature: "A keyboard trap, an unreachable control, or invisible focus.",
  },
  {
    id: "GTH-5",
    group: "baseline",
    title: "Contrast",
    what: "Every text/background and UI token pair used on the route.",
    how: "Compute ratios from computed styles, or use the axe contrast rule.",
    pass: "≥4.5:1 body text; ≥3:1 large text (≥24px / 19px bold) and UI boundaries.",
    failSignature: "A locked token pair below threshold in real use.",
  },
  {
    id: "GTH-6",
    group: "baseline",
    title: "Tap-target size",
    what: "Every interactive target is thumb-sized.",
    how: "Measure all a, button, [role=button], input, select, summary, label[for].",
    pass: "Every target ≥44×44px with ≥8px separation.",
    failSignature: "Icon-only buttons, inline text links treated as controls, close-set links.",
    divergence:
      "44px, not WCAG 2.5.8's 24px floor. This repo's locked rule is stricter and stays. Already caught 5 live violations on the homepage (item 27).",
  },
  {
    id: "GTH-7",
    group: "baseline",
    title: "JavaScript-disabled degradation",
    what: "Core content and the human fallbacks survive without JS.",
    how: "Load the route with JS disabled.",
    pass: "Core content, the phone number, and emergency access are all still present and usable.",
    failSignature: "A blank page, or call/booking that only exists as a JS handler.",
    divergence:
      "New to this repo. Our nav, mobile menu, carousels and accordions are all client components — this check is how we find out what a patient on a failed-JS load actually gets.",
  },
  {
    id: "GTH-8",
    group: "baseline",
    title: "Cumulative layout shift",
    what: "Content shifting as images and fonts arrive.",
    how: "PerformanceObserver on layout-shift entries, or Lighthouse.",
    pass: "CLS ≤0.1.",
    failSignature: "Late images or webfonts shoving text.",
  },
  {
    id: "GTH-9",
    group: "baseline",
    title: "Console clean",
    what: "Runtime errors and framework warnings.",
    how: "Capture console output on load and through the primary interaction.",
    pass: "Zero errors and zero warnings on the changed route.",
    failSignature: "A hydration mismatch or a React key warning.",
  },
  {
    id: "GTH-10",
    group: "baseline",
    title: "No unverified facts published",
    what: "Fact-bearing claims that the practice hasn't confirmed.",
    how: "grep the changed files for: in-network, accepts, $ amounts, same-day, hours, DDS/DMD, license, carrier names, parking, validation, transit, 'min walk'.",
    pass: "Every fact-bearing match traces to a confirmed row in the verification table, or is absent.",
    failSignature: "An asserted carrier, price, hour, credential or logistic nobody signed off.",
    divergence:
      "The blueprint wraps unverified facts in a visible [verify] marker. This repo already does that via <Placeholder> — but the rule here is stronger: nothing unverified reaches production at all (backlog item 2).",
  },
  {
    id: "GTH-11",
    group: "baseline",
    title: "Prior items still pass",
    what: "Regression against the items this one builds on.",
    how: "Re-run the mobile gate of each item named in `dependsOn`.",
    pass: "Every named prior item still passes.",
    failSignature: "A previously green item now failing.",
  },

  // ── Mobile Suite: the phone is the primary target ───────────────────
  {
    id: "GTH-12",
    group: "mobile",
    title: "Viewport matrix",
    what: "The route composes at every supported phone size, not just one.",
    how: "Render at 320×568, 360×640, 375×812, 390×844, 430×932, and 844×390 landscape.",
    pass: "Complete mobile experience at every size — nothing clipped, no lost function, one primary action visible.",
    failSignature: "A layout that only composes at one width, or content that disappears below 360px.",
    divergence:
      "Adds 320 and 430 to this repo's existing 375-only testing. 320 is the reflow floor and 390 is the common current iPhone; testing 375 alone missed both.",
  },
  {
    id: "GTH-13",
    group: "mobile",
    title: "No horizontal scroll at 320px",
    what: "Sideways scrolling at the narrowest supported width.",
    how: "document.documentElement.scrollWidth - clientWidth at 320×568.",
    pass: "scrollWidth ≤ clientWidth at 320px and every matrix width.",
    failSignature: "A fixed-width element, an unwrapped table, or an oversized map iframe.",
  },
  {
    id: "GTH-14",
    group: "mobile",
    title: "Tap-target size and spacing across the matrix",
    what: "Extends GTH-6 to every phone size, and adds spacing.",
    how: "Measure min(width, height) of every visible interactive element at each matrix width.",
    pass: "≥44×44px with ≥8px separation, at every matrix width.",
    failSignature: "Targets that only meet 44px at one width.",
  },
  {
    id: "GTH-15",
    group: "mobile",
    title: "Thumb-zone primary action",
    what: "The primary action is reachable one-handed.",
    how: "Assert the primary control's vertical centre sits below the viewport midpoint, or that a bottom-anchored bar exists.",
    pass: "Primary action reachable without regripping.",
    failSignature: "The sole primary CTA pinned to the top of a tall phone with no lower affordance.",
    divergence:
      "Adopted as a measurement, NOT as a mandate for a sticky bottom bar — that pattern was explicitly ruled out for this site and is flagged as an open question, not applied.",
  },
  {
    id: "GTH-16",
    group: "mobile",
    title: "Safe-area insets",
    what: "Bottom/top-anchored elements clear the home indicator and notch.",
    how: "Check computed padding against env(safe-area-inset-*) with viewport-fit=cover.",
    pass: "Inset honoured; nothing hidden under the home indicator.",
    failSignature: "A fixed element flush to the physical edge.",
    divergence:
      "Only applies if a bottom-anchored element ships. Currently the fixed header is top-anchored, so this is a notch check rather than a home-indicator one.",
  },
  {
    id: "GTH-17",
    group: "mobile",
    title: "Native one-tap handoffs",
    what: "Phone numbers dial; addresses open maps.",
    how: "Assert a[href^='tel:'] exists and is visible; assert a maps deep link where an address is shown.",
    pass: "Tapping the number opens the dialer; tapping directions opens a maps app.",
    failSignature: "A plain-text phone number or address that cannot be actioned.",
  },
  {
    id: "GTH-18",
    group: "mobile",
    title: "Mobile keyboard and input correctness",
    what: "The right keyboard appears, autofill works, and iOS doesn't zoom on focus.",
    how: "Assert type / inputmode / autocomplete per field, and computed font-size ≥16px on every input.",
    pass: "Correct keyboard per field; no field under 16px.",
    failSignature: "A type=text phone field, a missing autocomplete, or sub-16px inputs causing iOS zoom-on-focus.",
    divergence:
      "Entirely new to this repo. The sub-16px-input iOS zoom rule in particular was not previously captured anywhere.",
  },
  {
    id: "GTH-19",
    group: "mobile",
    title: "Throttled mobile performance",
    what: "The explicit throttled profile behind GTH-2.",
    how: "Lighthouse mobile preset — Moto-G-class device, 4× CPU slowdown, simulated slow 4G.",
    pass: "Performance ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1, Speed Index ≤3.4s.",
    failSignature: "An unoptimized hero image or blocking script blowing LCP on a throttled connection.",
  },
  {
    id: "GTH-20",
    group: "mobile",
    title: "Reflow and text resize",
    what: "WCAG 1.4.10 reflow and 1.4.4 text resize.",
    how: "Render at 320px, then apply html{font-size:200%}.",
    pass: "No loss of content or function; no clipping or overlap at 200%.",
    failSignature: "Content cut off, text overlapping, or a control pushed off-screen.",
    divergence: "The 200% text-resize half is new to this repo; we had only been checking 320px reflow.",
  },
  {
    id: "GTH-21",
    group: "mobile",
    title: "Orientation independence",
    what: "WCAG 1.3.4 — the route works in landscape too.",
    how: "Render at 844×390 and complete the primary task.",
    pass: "Full function in landscape; no orientation lock, no 'please rotate' wall.",
    failSignature: "Portrait-only content, or a sticky element that eats the landscape viewport.",
    divergence:
      "New to this repo. Relevant here because the fixed 64px header consumes a much larger share of a 390px-tall landscape viewport.",
  },
  {
    id: "GTH-22",
    group: "mobile",
    title: "Reduced motion",
    what: "Non-essential motion is suppressed under the user's setting.",
    how: "Emulate prefers-reduced-motion: reduce and load the route.",
    pass: "No autoplay, no auto-advance, no looping animation.",
    failSignature: "A carousel that still advances, or a Ken Burns zoom that still runs.",
    divergence:
      "This repo already implements reduced-motion on both carousels; the harness makes verifying it non-optional rather than assumed.",
  },
];

export const harnessById = Object.fromEntries(harness.map((h) => [h.id, h]));

export const BASELINE_IDS = harness.filter((h) => h.group === "baseline").map((h) => h.id);
export const MOBILE_SUITE_IDS = harness.filter((h) => h.group === "mobile").map((h) => h.id);
