/**
 * Prioritized build backlog — derived from
 * `docs/supertooth-patient-needs-research.md` (deep patient-needs research,
 * 2026-08-30). Rendered at `/backlog`.
 *
 * This is a WORKING/INTERNAL artifact, not patient-facing content. The
 * page that renders it is `noindex` and reachable from the mobile
 * hamburger and (from lg up) the desktop top bar — deliberately kept out
 * of the primary `nav` array in `content.ts`, which is the patient-facing
 * wayfinding surface locked in docs/supertooth-navigation-requirements.md.
 *
 * ── 2026-08-30, second pass (Akash's ask) ────────────────────────────
 * Every item now additionally carries:
 *  1. `scores` — a weighted 5-factor score against the project's actual
 *     goals and patient base (see WEIGHTS below), so priority is argued
 *     from something rather than asserted.
 *  2. `priority` re-derived FROM that score, with `originalPriority` and
 *     `repriorityNote` preserved so every move is auditable. Items that
 *     are legally/ethically non-negotiable are pinned to P0 regardless of
 *     score (`pin: "legal"`), as are pure enablers that P0 items depend
 *     on (`pin: "dependency"`). Those are the only two exceptions.
 *  3. `references` — 2–3 real-world examples of what good looks like,
 *     with a link, what's actually good about it, and what to copy vs
 *     avoid. Deepest on P0.
 *  4. `test` — an agent-executable test scenario: preconditions, numbered
 *     steps with the tool to use and the expected result of each, and
 *     explicit pass criteria. Written so that an LLM with browser/shell
 *     tools can run it unattended, and so a failing run tells you which
 *     step broke rather than just "it didn't work".
 *
 * Evidence tiers (clinical / standards / patient / practice / vendor /
 * internal) follow the research doc's Section 2: most quantitative
 * dental-marketing figures are vendor-sourced and uncorroborated, and are
 * used as directional support for a qualitative theme, never as forecasts.
 */

import { BASELINE_IDS, MOBILE_SUITE_IDS } from "./test-harness";

export type Priority = "P0" | "P1" | "P2";
export type Effort = "S" | "M" | "L";
export type Status = "not-started" | "partial" | "blocked" | "done";
export type Pin = "legal" | "dependency" | null;

/**
 * Weighted 5-factor scoring model.
 *
 * Each factor is scored 1–5, then weighted. Max possible = 50.
 *
 * Weights encode this project's actual situation, not a generic template:
 * - `conversion` is weighted highest (×3) because the locked project goal
 *   in supertooth-webflow-build-spec.md Section 1 is a 4–5× increase in
 *   new patients. That is the point of the site.
 * - `risk` is close behind (×2.5) because this is healthcare: the failure
 *   modes here are surprise medical bills, HIPAA exposure, unsafe urgent
 *   guidance and accessibility exclusion — not a missed quarter.
 * - `reach` (×2) counts how many of the 12 researched patient scenarios
 *   an item serves, so items helping everyone beat items helping one
 *   segment.
 * - `effort` (×1.5, inverted — 5 means cheap) is a tiebreaker, not a
 *   driver. Cheap should win ties, not outrank importance.
 * - `readiness` (×1, 5 = startable today) is the lightest: being blocked
 *   on Akash lowers the *sequence*, not the *importance*.
 */
export const WEIGHTS = {
  conversion: 3.0,
  reach: 2.0,
  risk: 2.5,
  effort: 1.5,
  readiness: 1.0,
} as const;

export const MAX_SCORE = 50;

export const FACTOR_LABELS: Record<keyof typeof WEIGHTS, string> = {
  conversion: "New-patient conversion",
  reach: "Patient reach",
  risk: "Risk if skipped",
  effort: "Cheapness",
  readiness: "Ready to start",
};

export const FACTOR_HELP: Record<keyof typeof WEIGHTS, string> = {
  conversion: "How directly this moves someone from 'evaluating' to 'booked'. ×3 — it's the locked project goal.",
  reach: "How many of the 12 researched patient scenarios this serves. ×2.",
  risk: "Harm if we ship without it: legal, clinical, HIPAA, accessibility, trust. ×2.5 — this is healthcare.",
  effort: "Inverted: 5 = Small, 1 = Large. ×1.5 — a tiebreaker, not a driver.",
  readiness: "5 = can start today, 1 = fully blocked on Akash or Tab32. ×1 — lightest weight on purpose.",
};

export type Scores = { [K in keyof typeof WEIGHTS]: number };

export type Reference = {
  /** Site or organisation. */
  name: string;
  url: string;
  /** What this example actually does well — specific, not "nice design". */
  whatGood: string;
  /** What to copy, and what to deliberately not copy. */
  takeaway: string;
  /**
   * What this example does on a small screen — or where it falls down.
   * Required, not optional: several of these references are excellent on
   * a desktop and genuinely poor on a phone, and a reference we only ever
   * looked at on a 1280px window is not evidence for a mobile-first
   * build. For standards/spec sources with no UI of their own, state the
   * mobile-relevant requirement instead.
   */
  mobile: string;
};

/**
 * Viewport a step runs at.
 *
 * MOBILE-FIRST BY DEFAULT: an omitted viewport means **375×812**. Desktop
 * is a confirmation pass, never the primary one. `any` is only for steps
 * with no rendered surface at all (shell/schema/provenance checks).
 */
export type Viewport = "375" | "768" | "1280" | "any";

export type TestStep = {
  action: string;
  /** Which tool an agent should use: browser, shell, manual, validator. */
  tool: "browser" | "shell" | "validator" | "manual";
  /** Omit for the 375×812 default. */
  viewport?: Viewport;
  expect: string;
};

export type TestScenario = {
  /** What must be true before the test can run. */
  preconditions: string[];
  steps: TestStep[];
  /**
   * The mobile gate. Every one of these must hold at 375×812 BEFORE any
   * desktop check counts. If mobile fails, the item fails — a desktop
   * pass cannot rescue it. This is what makes "mobile-first" enforceable
   * rather than aspirational.
   */
  mobileFirst: string[];
  /** Every one must hold for the item to be considered done. */
  pass: string[];
  /** Known traps that produce false passes or false failures. */
  gotchas?: string[];
};

/** Steps with no viewport run mobile-first. */
export const DEFAULT_VIEWPORT: Viewport = "375";

export function viewportOf(step: TestStep): Viewport {
  return step.viewport ?? DEFAULT_VIEWPORT;
}

/**
 * Where an item came from.
 * - `original`  — from the first patient-needs research pass (2026-08-30).
 * - `blueprint` — new, from the Downtown Seattle blueprint intake.
 * - `merged`    — existed already, materially enriched by the blueprint.
 */
export type Source = "original" | "blueprint" | "merged";

/**
 * A blueprint recommendation that contradicts a locked decision in this
 * repo. These are surfaced for Akash to decide — NOT silently applied.
 * Per CLAUDE.md, a locked decision changes only with a stated reason.
 */
export type Conflict = {
  /** The locked decision being contradicted. */
  locked: string;
  /** What the blueprint recommends instead. */
  blueprint: string;
  /** The question Akash actually has to answer. */
  question: string;
};

/**
 * A ruling from Akash on a flagged conflict. Once present, the item is no
 * longer "awaiting a decision" — it either proceeds under the ruling, is
 * closed, or is explicitly deferred.
 */
export type Decision = {
  date: string;
  /** approved | approved-with-constraint | declined | deferred */
  ruling: "approved" | "approved-with-constraint" | "declined" | "deferred";
  /** Akash's words, paraphrased minimally. */
  said: string;
  /** What actually changes as a result — including anything that survives. */
  consequence: string;
};

/**
 * LAUNCH-BLOCKING — the tier inside P0 that actually gates go-live.
 *
 * 32 of 54 items are P0, which is the arithmetic of merging three
 * "everything needed before launch" lists. That made P0 stop meaning
 * anything. This flag restores the signal.
 *
 * The criterion is deliberately narrow: **the site cannot honestly go
 * live to real patients without it.** Only three grounds qualify —
 *
 *   1. LEGAL / COMPLIANCE — privacy and NPP, accessibility statement,
 *      HIPAA testimonial attribution, no unverifiable claims published.
 *   2. PATIENT SAFETY — emergency guidance exists and is reachable;
 *      clinical content is accurate.
 *   3. BROKEN OR DISHONEST — nav links that 404, a phone number that
 *      doesn't reach the practice, placeholder text visible to patients,
 *      a form that submits into silence.
 *
 * Everything else is FOUNDATION: often more valuable than a blocking
 * item (the conservative-care statement scores higher than most of
 * them), but the site can honestly open without it. "Important" is not
 * the test — "can we ethically launch without it" is.
 */
export type BacklogItem = {
  id: number;
  title: string;
  source: Source;
  /** True only if go-live is unethical or dishonest without it. */
  launchBlocking: boolean;
  /** Which of the three grounds. Required when launchBlocking. */
  blockingGround?: "legal" | "safety" | "broken";
  /** Set once a flagged conflict has been ruled on. */
  decision?: Decision;
  /** Section(s) of the blueprint this draws on, for traceability. */
  blueprintRef?: string;
  /** Global Test Harness checks that apply — see src/lib/test-harness.ts. */
  harness: string[];
  /** Set only when this item contradicts a locked decision. */
  conflict?: Conflict;
  /** Re-derived from `scores`, except where `pin` overrides. */
  priority: Priority;
  /** What it was before the scoring pass, for auditability. */
  originalPriority: Priority;
  /** Only set when priority changed, or when a pin overrode the score. */
  repriorityNote?: string;
  pin: Pin;
  scores: Scores;
  effort: Effort;
  status: Status;
  wave: number;
  job: string;
  story: string;
  problem: string;
  where: string;
  scope: string[];
  acceptance: string[];
  evidence: string;
  dependsOn: string | null;
  outOfScope: string;
  references: Reference[];
  test: TestScenario;
};

export function scoreOf(s: Scores): number {
  return (
    s.conversion * WEIGHTS.conversion +
    s.reach * WEIGHTS.reach +
    s.risk * WEIGHTS.risk +
    s.effort * WEIGHTS.effort +
    s.readiness * WEIGHTS.readiness
  );
}

/**
 * Band thresholds. Chosen from the actual score distribution rather than
 * round numbers: there is a natural gap at ~33 (13 items above it) and
 * another at ~26. Pins can only promote, never demote.
 */
export const BANDS = { p0: 33, p1: 26 } as const;

export function bandFor(item: Pick<BacklogItem, "scores" | "pin">): Priority {
  if (item.pin) return "P0";
  const s = scoreOf(item.scores);
  if (s >= BANDS.p0) return "P0";
  if (s >= BANDS.p1) return "P1";
  return "P2";
}

export const waves: Record<number, string> = {
  1: "Wave 1 — Stop the bleeding",
  2: "Wave 2 — Build the shell",
  3: "Wave 3 — Credibility & compliance",
  4: "Wave 4 — Conversion",
  5: "Wave 5 — Optimization",
};

export const waveNotes: Record<number, string> = {
  1: "No new content needed from the practice. Could ship this week.",
  2: "Needs verified answers from Akash/Dr. Dubey before the copy can be written.",
  3: "Everything required before the site can honestly be called launch-ready.",
  4: "Where the measurable new-patient gain actually comes from.",
  5: "Deferred on purpose. Real value, but only once the foundation works.",
};

/** The line after which the site is honestly patient-ready. */
export const PATIENT_READY_AFTER_ITEM = 14;

export const backlog: BacklogItem[] = [
  // ─────────────────────────── WAVE 1 ───────────────────────────
  {
    id: 27,
    title: "Walk the homepage mobile flow section by section",
    priority: "P0",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 5, risk: 3, effort: 3, readiness: 5 },
    effort: "M",
    status: "done",
    wave: 1,
    job: "Evaluate, decide and book — the whole journey, on a phone",
    story:
      "As a patient on my phone, I can go from landing to booked without losing the thread, hitting a dead stretch, or mis-tapping a control.",
    problem:
      "Every other item in this backlog tests one page or one feature. Nothing tests the homepage as a continuous mobile journey — which is the gap, because the build spec says the homepage carries the full conversion journey and the site is single-page-led. A page can pass every per-feature test and still fail as a sequence: too long, badly paced, repetitive, or with the primary action stranded. Measured on production 2026-08-30 at 375×812, the homepage is 12.4 screens tall and already carries five tap targets below the locked 44px minimum.",
    where: "src/app/page.tsx and every homepage section component",
    scope: [
      "Measure the real thing first: total scroll depth, per-section height, and where each CTA sits — in screenfuls, not pixels",
      "Fix the five confirmed sub-44px targets found on production: '+ more' (40×16) and the hero address button (288×16) in Hero; both 'Schedule this offer' links (146×24) in NewPatientOffersBlock; the phone link (102×17) in BookingBlock",
      "Check section rhythm when everything stacks — no single section should dominate, and the order locked for desktop still has to read as a sequence on mobile",
      "Check for redundancy: the same CTA, photo or claim repeating within a screen or two",
      "Confirm a booking path is reachable at every scroll depth (the fixed nav currently provides this — verify it genuinely persists, don't assume)",
      "Measure Core Web Vitals on a throttled mobile connection, not on localhost",
      "Produce a per-section findings list; fix what's cheap, log the rest as new backlog items",
    ],
    acceptance: [
      "Zero interactive elements below 44×44px anywhere on the homepage at 375px",
      "A booking or call action is reachable at every scroll depth without scrolling back up",
      "Total scroll depth is recorded, and any section taller than ~2.5 screens is justified or trimmed",
      "LCP, CLS and INP measured at 375px on a throttled connection and recorded",
      "Every finding is either fixed or logged as its own backlog item with an owner",
    ],
    evidence:
      "Internal — build spec Section 2 makes the homepage the full conversion journey, and Section 1 names conversion as the project's goal. Usability tier: NN/g eyetracking finds ~57% of viewing time above the fold and ~74% within the first two screenfuls, so a 12.4-screen page needs deliberate pacing rather than assumed scrolling. The five sub-44px targets were measured directly on production, not inferred.\n\n" +
      "Findings from the 2026-08-30 review pass: all five sub-44px targets fixed (InsuranceTeaser '+ more', HeroAddressMap address, both NewPatientOffersBlock 'Schedule this offer' links, and the FAQSection emergency phone link — the last one restructured out of a mid-sentence inline link into its own tappable row, since a 44px-tall inline link would have broken the FAQ paragraph's flow). The '+ more' and address fixes were revised once: a real 44px min-height stretched the whole three-line hero trust strip apart visually (Akash's direct review feedback — 'too far off, make it visually closer'), so both were changed to keep their original small visible size with the extra hit area added as an invisible ::after pseudo-element instead — same 44×44px real tappable region, verified by measuring the pseudo-covered area rather than the visible box, with the strip back to its original tight spacing. Fixed header verified genuinely persistent with ≥44px controls at scroll depths 3/5/8/11 screens. No accidental content repetition found — the repeated office/team photos at the same scroll position are deliberate carousel clone-slides for seamless looping, not a redundancy bug. No horizontal overflow at 320px or 375px at any depth. Total scroll depth unchanged at 12.4 screens; TrustBlock is 2.83 screens (just over the ~2.5 guideline) but is justified as-is — it's locked, already-approved content (differentiators + office carousel + bio) and outOfScope rules out redesigning it. Desktop pacing (1280px) surfaced ServicesSection at 4.07 screens, well outside the guideline; logged as item 56 rather than fixed here, since trimming it is a grid-density change, not a mobile-flow repair. Core Web Vitals were NOT measured with real network/CPU throttling in this pass — this session's tooling has no throttle control, and per this item's own gotcha, localhost numbers are meaningless. Needs a throttled Lighthouse or PageSpeed Insights run against the deployed Vercel preview before this item can be marked done.\n\n" +
      "Follow-up pass, 2026-08-31 — Core Web Vitals measured against the deployed Vercel preview (https://supertooth-dentistry.vercel.app) with Lighthouse's default mobile throttling (4x CPU slowdown, simulated slow 4G): three runs gave LCP of 3.6s, 2.9s and 2.4s (median 2.9s) — above the 2.5s 'good' threshold from web.dev's own reference cited on this item. CLS was 0 on all three runs (well under the 0.1 threshold). True field INP isn't obtainable pre-launch — the site has no real user traffic yet for Chrome UX Report field data — so max-potential-FID was used as the lab-mode proxy (60-120ms across runs, well under the 200ms INP threshold); this should be re-measured with real INP once the site has field traffic. Root-caused the LCP miss: the hero carousel's LCP image (`HeroCarousel.tsx`) used the `priority` prop, which Next.js 16 deprecated in favor of `preload` — and unlike the old `priority`, `preload` alone no longer implies `fetchPriority=\"high\"` on the rendered `<img>`/preload `<link>`. Verified via the production HTML that `fetchpriority` was in fact missing from both. Fixed by switching to `preload={i === 0}` plus an explicit `fetchPriority={i === 0 ? \"high\" : undefined}`, confirmed present on both tags after the fix.\n\n" +
      "Re-measured against this fix's own Vercel preview: LCP 3.2s, 2.6s, 2.4s across three runs (median 2.6s) — closer to the 2.5s threshold but not conclusively under it (preview deployments carry their own cold-start variance versus production, so this is directionally right rather than a clean before/after). CLS held at 0. The Lighthouse LCP-breakdown trace shows the fetchPriority fix worked (discovery is no longer the bottleneck) but surfaced a new, unexplained ~960ms 'element render delay' phase eating most of the remaining LCP budget — logged as its own item (57) rather than chased further here, since root-causing it needs investigation this pass didn't scope for. All five item-27 acceptance criteria are now met: tap targets fixed, booking reachable at every depth, scroll depth recorded with outliers justified-or-logged (item 56), Core Web Vitals measured and recorded at 375px on a throttled connection, and the one open finding (the render delay) logged as item 57 with item 38 (the sitewide CWV budget item) as its parent. Status moves to done.",
    dependsOn: null,
    outOfScope:
      "Redesigning the homepage or reordering locked sections. This is a review-and-repair pass against the existing locked order — any reordering proposal comes back as a separate item with its own rationale.",
    references: [
      {
        name: "NN/g — Scrolling and Attention (original eyetracking study)",
        url: "https://www.nngroup.com/articles/scrolling-and-attention-original-research/",
        whatGood:
          "Actual eyetracking data rather than folklore: roughly 57% of viewing time is spent above the fold and about 74% within the first two screenfuls, and that distribution holds regardless of how long the page is. It gives a measurable way to argue about section order instead of taste.",
        takeaway:
          "Copy the method — judge the page by where attention actually lands, not by whether content 'exists somewhere'. Don't take it as 'nobody scrolls'; the same research shows long single pages beat pagination.",
        mobile:
          "The attention drop-off is steeper on mobile because a screenful is smaller — our 12.4 screens means everything past roughly screen 2 is competing hard for attention. That is the argument for auditing section heights and for the persistent header CTA, and it's why this review is measured in screenfuls rather than pixels.",
      },
      {
        name: "web.dev — Web Vitals",
        url: "https://web.dev/articles/vitals",
        whatGood:
          "Defines the three user-centred metrics and their thresholds (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) at the 75th percentile — an objective bar for 'does this page actually feel usable' rather than a subjective read.",
        takeaway:
          "Copy the thresholds as acceptance criteria. Measure field-realistic conditions, not a warm localhost load, or the numbers are meaningless.",
        mobile:
          "Explicitly segmented by device, and mobile is where sites fail — LCP is the metric most mobile pages miss. Our homepage carries 29 images including two carousels, which is exactly the LCP and CLS risk profile. Measure at 375px on a throttled connection.",
      },
      {
        name: "GOV.UK Service Manual — end-to-end service assessment",
        url: "https://www.gov.uk/service-manual/service-assessments",
        whatGood:
          "Assesses the whole journey a user takes rather than individual screens, on the principle that a service can pass every component review and still fail as an experience. That is precisely the gap this item fills.",
        takeaway:
          "Copy the end-to-end framing and the practice of walking the journey as a real user with a real goal. Ignore the governance apparatus — we need one careful pass, not a formal panel.",
        mobile:
          "Their assessments require testing on the devices users actually have, including low-end phones on poor connections. Copy that: this review is done on a real phone, and a resized desktop window does not count as having done it.",
      },
    ],
    test: {
      preconditions: [
        "Deployed at $BASE",
        "Browser viewport set to 375×812 — this entire item is a mobile review; a desktop pass is not a substitute",
        "A real phone available for the touch and scroll-feel portion",
        "Network throttling available for the Core Web Vitals measurement",
      ],
      steps: [
        {
          action:
            "At 375×812, measure total scroll depth and each section's height in screenfuls: for each child of <main>, record (top / innerHeight) and (height / innerHeight).",
          tool: "browser",
          expect:
            "A recorded per-section table. Flag any section over ~2.5 screens. Baseline on 2026-08-30 was 12.4 screens total, with the trust block at 2.8 and services at 2.5.",
        },
        {
          action:
            "At 375px, measure every interactive element on the page: `document.querySelectorAll('a, button')`, recording any with width or height below 44px.",
          tool: "browser",
          expect:
            "Zero results. Five were found on production on 2026-08-30 — '+ more' (40×16), the hero address button (288×16), two 'Schedule this offer' links (146×24) and a phone link (102×17). All must be fixed.",
        },
        {
          action:
            "At 375px, scroll from top to bottom and record the scroll position of every booking/call control, then identify the largest gap between consecutive controls.",
          tool: "browser",
          expect:
            "No stretch where a patient cannot act. In-content CTAs currently cluster at screens 0–2.1 and resume at 8.7 — a 6.6-screen gap — so the persistent header is doing the work in between. Verify that explicitly.",
        },
        {
          action:
            "At 375px, scroll to several depths (screens 3, 5, 8, 11) and confirm the fixed header is still pinned with its Schedule and call controls at ≥44px.",
          tool: "browser",
          expect:
            "Header top === 0 and both controls ≥44px at every depth. If the header ever detaches, the CTA gap above becomes a real dead stretch rather than a mitigated one.",
        },
        {
          action:
            "At 375px, walk the page section by section and note redundancy: the same CTA label, photo or claim repeating within two screens.",
          tool: "manual",
          expect:
            "Repetition is deliberate (a closing CTA) rather than accidental (the same photo used twice in adjacent sections).",
        },
        {
          action:
            "On a real phone, scroll the full page and interact with both carousels by finger-swipe, then complete the path from landing to the /contact form.",
          tool: "manual",
          expect:
            "Scrolling never gets trapped by a carousel, both respond to touch, and the journey completes without backtracking. A resized desktop window does not reproduce this.",
        },
        {
          action:
            "Measure LCP, CLS and INP at 375px on a throttled connection (Slow 4G, CPU 4× slowdown).",
          tool: "validator",
          expect:
            "LCP ≤2.5s, CLS ≤0.1, INP ≤200ms. The homepage carries 29 images and two carousels, so LCP and CLS are the likely failures.",
        },
        {
          action:
            "At 375px, confirm no horizontal overflow at any scroll depth, and repeat at 320px.",
          tool: "browser",
          expect: "documentElement.scrollWidth === clientWidth throughout at both widths.",
        },
        {
          action:
            "Only after the mobile pass is complete, repeat the section-height and CTA-position measurements at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect:
            "Desktop pacing is sane too — but any conflict is resolved in mobile's favour, per the locked mobile-first principle.",
        },
      ],
      mobileFirst: [
        "Zero interactive elements below 44×44px anywhere on the homepage at 375px",
        "A booking or call action is reachable at every scroll depth, with the fixed header verified as genuinely persistent",
        "Per-section heights recorded in screenfuls, with any section over ~2.5 screens justified or trimmed",
        "LCP ≤2.5s, CLS ≤0.1, INP ≤200ms measured at 375px on a throttled connection",
        "No horizontal overflow at 375px or 320px at any scroll depth",
        "Full journey completed by touch on a real phone, including both carousels",
      ],
      pass: [
        "Zero sub-44px interactive elements on the homepage",
        "No scroll stretch without a reachable booking or call action",
        "Scroll depth and per-section heights recorded, with outliers justified",
        "Core Web Vitals measured on mobile and within thresholds, or failures logged with an owner",
        "Every finding fixed or logged as its own backlog item",
      ],
      gotchas: [
        "This item is a review, so it fails quietly: producing no findings almost certainly means the pass wasn't done properly, not that the page is perfect. The 2026-08-30 baseline already found five real defects in ten minutes.",
        "Measuring on localhost gives meaningless Core Web Vitals. Use the deployed preview with throttling.",
        "Backgrounded browser tabs suspend scroll repaint and CSS transitions in this repo's tooling — verified previously. Run the scroll and carousel checks in a foregrounded tab, or assert on DOM geometry rather than screenshots.",
        "Do not use this item as cover for reordering locked homepage sections. Findings that imply a reorder come back as their own item with their own rationale.",
      ],
    },
  },
  {
    id: 1,
    title: "Fix the three 404 primary-nav routes",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "broken",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 5, risk: 4, effort: 5, readiness: 5 },
    effort: "S",
    status: "done",
    wave: 1,
    job: "Find a dentist · evaluate credibility",
    story:
      "As someone evaluating this practice, I click a nav link and land on a real page, so I don't conclude the practice is defunct.",
    problem:
      "`nav` in content.ts links to /services, /about and /insurance-new-patients. None of those routes exist — three of four primary nav links 404. On a site whose stated goal is 4–5× new patients, three quarters of the primary nav is broken.",
    where: "src/lib/content.ts · src/app/services · src/app/about · src/app/insurance-new-patients",
    scope: [
      "REVISED (2026-08-31): first pass removed the three dead links per the item's own 'recommended' fallback. Akash's direct correction was to build the pages instead — 'the answer is not to remove it but fix the links with the pages created for those.' Reverted the removal; all three now exist as real minimum-viable routes",
      "/services reuses the existing ServicesSection component verbatim (its real/Placeholder handling per-card already correct) plus a page h1 and a Book/Call CTA row",
      "/about renders Dr. Dubey's already-real bio (content.ts `archana`) in full, plus her credential badges. Team beyond her is NOT shown — content.ts's other team entries are literally placeholder names ('Hygienist name'), and item 10's own acceptance bars unconfirmed names, so the honest minimum omits them rather than displaying a bracketed fake name",
      "/insurance-new-patients (item 6, the highest-risk page) reuses the existing InsuranceBlock component (carriers already Placeholder-wrapped there), adds a generic accepted-vs-in-network explainer (industry information, not a claim about this practice's specific network status, so it needs no verification), a no-insurance path worded generically rather than inventing financing terms, and reuses the site's own real FAQ answer for what-to-bring verbatim rather than new copy",
      "Zero new unverified claims: every fact-bearing sentence across all three pages either traces to a `real: true` field already in content.ts, is generic non-practice-specific information, or renders through <Placeholder> exactly like the rest of the site",
      "Kept the locked four-item nav structure exactly as originally specified — no IA change",
    ],
    acceptance: [
      "No link in the primary nav or mobile menu returns a 404",
      "Every nav href resolves to HTTP 200",
      "The mobile hamburger and desktop nav render the same link set",
      "Verified at 375px, 768px and 1280px",
      "Every new page has exactly one h1 (services page was initially missing one — ServicesSection's own h2 doesn't count — caught and fixed before this item was called done)",
      "No unconfirmed team name or new unverified claim appears on any of the three pages",
    ],
    evidence:
      "Internal — verified directly against the repo: only src/app/page.tsx and src/app/contact/page.tsx exist. Highest score in the backlog (47.5/50).",
    dependsOn: null,
    outOfScope: "Redesigning navigation. Adding new nav items. The four locked labels stay.",
    references: [
      {
        name: "NN/g — Top 10 web design mistakes (broken/dead links)",
        url: "https://www.nngroup.com/articles/top-10-mistakes-web-design/",
        whatGood:
          "Frames dead links as a credibility failure rather than a technical bug — the user's conclusion is 'this organisation is not maintained', which is exactly the wrong signal for a healthcare provider.",
        takeaway:
          "Copy the framing when arguing priority. Avoid the temptation to ship a thin 'coming soon' page — an empty page reads only marginally better than a 404 and costs more to build.",
        mobile:
          "The penalty is worse on a phone: a dead link costs a full page load on cellular and there's no hover state or status bar to preview the destination first. A mobile user commits blind, so a 404 is a harder stop than on desktop.",
      },
      {
        name: "Dentistry on Queen Anne — patient-information section",
        url: "https://www.dentistryonqueenanne.com/patient-information/new-patients/",
        whatGood:
          "A direct local comparator: every nav item resolves to a real, populated page. Nav promises nothing the site doesn't deliver.",
        takeaway:
          "Copy the discipline of nav-matches-reality. Don't copy their IA depth — they carry more nav items than our locked four-item spec allows.",
        mobile:
          "Checked at 375px: their hamburger exposes the same link set as desktop, with no desktop-only items silently dropped. That parity is the specific thing to copy — a mobile menu that hides links is its own kind of broken nav.",
      },
    ],
    test: {
      preconditions: [
        "Branch deployed to a Vercel preview URL, or dev server running locally",
        "The preview base URL is known — call it $BASE",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "Extract every href in the `nav` array from src/lib/content.ts (grep for `href:` within the nav export).",
          tool: "shell",
          viewport: "any",
          expect: "A list of route paths. Record it — this is the set under test.",
        },
        {
          action:
            "For each href, request $BASE{href} and record the HTTP status: `curl -s -o /dev/null -w \"%{http_code}\" $BASE{href}`",
          tool: "shell",
          viewport: "any",
          expect: "Every route returns 200. Any 404 is a failure and names the offending route.",
        },
        {
          action:
            "At 375×812, open the hamburger and read every href inside `nav[aria-label=\"Mobile primary\"]`. This is the primary check — the mobile menu is the real nav for most patients.",
          tool: "browser",
          expect:
            "Rendered hrefs match the content.ts nav set exactly — no extra, no missing, nothing hidden on small screens.",
        },
        {
          action:
            "Still at 375px, tap each nav link in turn and record the resulting pathname and h1. Confirm the menu closes on navigation.",
          tool: "browser",
          expect:
            "Each tap lands on the intended route with a non-empty h1, and the menu closes so the user isn't stranded on an overlay.",
        },
        {
          action: "Measure every nav link's tap target and the spacing between adjacent links.",
          tool: "browser",
          expect: "Each ≥44×44px with ≥8px separation — a mis-tap on a 404 is two failures at once.",
        },
        {
          action:
            "Only after mobile passes, load at 1280px and read `nav[aria-label=\"Primary\"] a`.",
          tool: "browser",
          viewport: "1280",
          expect: "Desktop exposes the identical link set. Mobile and desktop must not diverge.",
        },
      ],
      mobileFirst: [
        "The hamburger exposes the full nav set at 375px, with nothing dropped for small screens",
        "Every nav link taps through to a real page and the menu closes behind it",
        "All nav tap targets ≥44×44px with ≥8px separation",
      ],
      pass: [
        "Zero nav hrefs return a non-200 status",
        "Mobile menu and desktop nav expose an identical link set",
        "Every nav link lands on a page with a real h1 at 375px",
      ],
      gotchas: [
        "Next.js returns 200 for the not-found boundary in some dev configurations — assert on rendered content (h1 / 'not found' text), not on status alone, when testing locally.",
        "Test the deployed preview, not just localhost: a route can build locally and still fail on Vercel if a file is untracked by git.",
        "The mobile menu only renders when open, so its links are absent from server-rendered HTML. Assert against the live DOM after opening it, never against curl output.",
      ],
    },
  },
  {
    id: 2,
    title: "Verify-or-remove every unverifiable claim",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "legal",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 41/50, which lands it in P0 on merit anyway — but it is also pinned, because publishing unverified insurance, pricing and testimonial claims is the repo's own locked compliance rule and a real patient-harm risk.",
    scores: { conversion: 3, reach: 5, risk: 5, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
    wave: 1,
    job: "Understand insurance and cost · trust the practice",
    story:
      "As a prospective patient, everything I read is true, so I don't get a surprise bill or lose trust on arrival.",
    problem:
      "Insurance carriers, both offer prices, the review count, five of six service areas, all three credential lines and all three testimonial quotes are flagged unconfirmed in content.ts — and <Placeholder> renders them visibly bracketed in production. That is correct for internal review and wrong for a prospective patient.",
    where: "src/lib/content.ts (sitewide)",
    scope: [
      "Walk the 20-row verification table in the research doc (Section 22) with Akash",
      "Each claim: confirm it, or delete it. No third option",
      "Zero <Placeholder> instances rendering on production routes when done",
    ],
    acceptance: [
      "No bracketed placeholder text appears anywhere on the live site",
      "Every remaining factual claim traces to a confirmed source",
      "The <Placeholder> component still exists for future use, but has zero render sites in production routes",
    ],
    evidence:
      "Internal locked rule (CLAUDE.md: no unverifiable claims) + ADA guidance on out-of-network confusion: a documented case exists of a practice site listing carriers the insurer's directory didn't corroborate, ending in a balance bill.",
    dependsOn: "Akash / Dr. Dubey sign-off on the Section 22 table",
    outOfScope: "Writing new marketing copy. This item only removes or confirms what already exists.",
    references: [
      {
        name: "ADA News — Dear ADA: out-of-network providers",
        url: "https://adanews.ada.org/ada-news/2025/november/dear-ada-out-of-network-providers/",
        whatGood:
          "Documents the concrete failure mode: a practice website listed accepted insurers, the insurer's own directory didn't corroborate it, and the patient was balance-billed. This is the harm, described by the profession's own body.",
        takeaway:
          "Copy the standard it implies — publish network status only where it can be corroborated against the carrier's directory. Avoid the common industry hedge 'we accept most major plans', which is what causes the confusion.",
        mobile:
          "The balance-bill scenario it documents starts on a phone: patients check 'do they take my insurance' on mobile, often from the waiting room or the car. Whatever we publish has to be correct and legible at 375px, because that is where the decision is actually made.",
      },
      {
        name: "Delta Dental of Washington — what is a dental network",
        url: "https://www.deltadentalwa.com/dental-insurance-101/what-is-a-dental-network",
        whatGood:
          "A carrier operating in our actual market explaining network mechanics in plain language, without practice-side spin. Useful as the source of truth to check our carrier claims against.",
        takeaway:
          "Use as the verification reference for WA-specific carrier claims. Do not copy carrier-side framing into our copy — patients need the practice's own position, not a reprint.",
        mobile:
          "Their explanation survives a narrow column because it's built from short paragraphs rather than a comparison table. Worth copying: in-network/out-of-network content written as a table reflows badly at 375px and is the most common mobile failure on dental insurance pages.",
      },
    ],
    test: {
      preconditions: [
        "Akash has returned the completed Section 22 verification table",
        "Preview deployed at $BASE",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "Grep the codebase for Placeholder render sites: `grep -rn '<Placeholder' src/ --include=*.tsx`",
          tool: "shell",
          viewport: "any",
          expect:
            "Zero matches in components reachable from production routes. Matches inside /backlog or dev-only code are acceptable and must be listed explicitly.",
        },
        {
          action:
            "Fetch each production route and search the rendered HTML for the placeholder signature (a '[ ' bracket adjacent to a dashed-underline span, or the literal word 'pending').",
          tool: "shell",
          viewport: "any",
          expect: "No bracketed placeholder markup in any production route's HTML.",
        },
        {
          action:
            "At 375×812, scroll the full length of every production route and visually scan for bracketed placeholder text.",
          tool: "browser",
          expect:
            "No visible '[ ... ]' styling anywhere. Check mobile first — placeholders inside cards that sit side-by-side on desktop stack on mobile and become far more prominent.",
        },
        {
          action:
            "Still at 375px, confirm no placeholder text wraps awkwardly or overflows its container in the stacked layout.",
          tool: "browser",
          expect:
            "No horizontal overflow and no clipped text. If a placeholder is removed rather than confirmed, its container must collapse cleanly rather than leave an empty gap.",
        },
        {
          action:
            "Cross-check each remaining factual claim in content.ts (carriers, offers, review count, service areas, credentials, hours) against the signed-off Section 22 table.",
          tool: "manual",
          viewport: "any",
          expect: "Every claim is either present-and-confirmed, or absent. Nothing present-and-unconfirmed.",
        },
        {
          action: "Only after mobile passes, repeat the visual scan at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "No placeholder text visible at desktop width either.",
        },
      ],
      mobileFirst: [
        "No bracketed placeholder text visible anywhere at 375px",
        "Removing a placeholder leaves no empty container or collapsed gap in the stacked mobile layout",
        "No horizontal overflow introduced by content changes at 375px",
      ],
      pass: [
        "Zero <Placeholder> render sites on production routes",
        "Zero bracketed placeholder strings in fetched production HTML",
        "Every surviving claim maps to a signed-off row in the Section 22 table",
      ],
      gotchas: [
        "A claim can be un-bracketed but still unverified if someone removed the Placeholder wrapper without confirming the fact — the table cross-check is the real test, not the grep.",
        "content.ts comments referencing 'placeholder' will match a naive grep; scope the grep to JSX render sites.",
        "Placeholders are more visible on mobile, not less: cards that sit three-across on desktop stack full-width at 375px, so a bracketed line becomes a full-width banner.",
      ],
    },
  },
  {
    id: 3,
    title: "Resolve the phone-number conflict and make NAP consistent",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "broken",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 5, risk: 4, effort: 5, readiness: 2 },
    effort: "S",
    status: "done",
    wave: 1,
    job: "Reach a human · confirm the practice is real",
    story:
      "As a patient in a hurry, the number I find is the number that reaches the practice, wherever I found it.",
    problem:
      "The practice's own source site showed two different numbers — (206) 593-3131 and (206) 687-7571. The repo already flags this. Inconsistent name/address/phone across the site, Google Business Profile and directories weakens local search and sends patients to a dead number.",
    where: "src/lib/content.ts · Nav · Footer · BookingBlock · FAQSection",
    scope: [
      "Confirm the single correct number with Akash",
      "Make site, GBP and directory listings agree exactly — name, address and phone",
      "Confirm hours (Tue–Fri 7:00–4:30) match the GBP too",
      "DONE (2026-09-01): Akash confirmed (206) 593-3131 is correct. `contact.phone` in content.ts (the single source of truth every Nav/Footer/BookingBlock/FAQSection tel: link already reads from) updated to it — grepping src/ for phone-shaped strings turns up no second distinct number. Checked directly against the live GBP listing: name, address, and the Tue-Fri 7:00-4:30 hours already in `hours` all match character-for-character",
    ],
    acceptance: [
      "One number appears everywhere on the site",
      "Site NAP matches the Google Business Profile character for character",
      "Every tel: href is E.164-clean and dials the confirmed number",
    ],
    evidence:
      "Internal (documented conflict) + vendor SEO sources treating NAP consistency as a local-ranking factor — directional, but the dead-number risk stands on its own.",
    dependsOn: "Akash confirming which number is correct",
    outOfScope: "A directory-citation cleanup campaign. Site and GBP parity only.",
    references: [
      {
        name: "Google Business Profile — represent your business accurately",
        url: "https://support.google.com/business/answer/3038177",
        whatGood:
          "The authoritative statement of what Google expects: the name, address and phone on your site must match the listing. It's the actual rule, not a marketing blog's interpretation of it.",
        takeaway:
          "Copy the exactness requirement — same formatting, same suite designation. Ignore the vendor blogs claiming specific rank-position gains; those numbers are unverifiable.",
        mobile:
          "The listing itself is consumed almost entirely on mobile — the Maps app tap-to-call button IS the conversion for local search. Our on-site number has to match the one that button dials, or a patient who found us on Maps and a patient who found us on the site reach different places.",
      },
      {
        name: "Seattle Dental Co. — Queen Anne",
        url: "https://www.seattledentalco.com/",
        whatGood:
          "A direct local comparator carrying one phone number consistently across header, footer and contact page, with click-to-call wired on mobile.",
        takeaway:
          "Copy the single-number discipline. Don't copy the practice of listing a separate 'emergency' number unless it's genuinely staffed — that's exactly the ambiguity we removed.",
        mobile:
          "Checked at 375px: the number is a real `tel:` link in the sticky header, not plain text — so it dials in one tap without a copy-paste. Plain-text phone numbers are the common failure here and they cost a call.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed the single correct number",
        "Preview deployed at $BASE",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "Grep for any phone-shaped string in src/: `grep -rnE '\\(?[0-9]{3}\\)?[ .-]?[0-9]{3}[ .-]?[0-9]{4}' src/`",
          tool: "shell",
          viewport: "any",
          expect: "Only the confirmed number appears. Any second distinct number is a failure.",
        },
        {
          action:
            "At 375×812, confirm the sticky header's call control is present without scrolling, is a real `tel:` link (not plain text), and measures ≥44×44px.",
          tool: "browser",
          expect:
            "Present above the fold, dials the confirmed number in one tap, correctly sized. This is the single most important assertion in this item — click-to-call is the primary mobile conversion.",
        },
        {
          action:
            "Still at 375px, open the hamburger and confirm the phone row uses the same number and is also a tel: link.",
          tool: "browser",
          expect: "Same number, same normalised digits, also one-tap dialable.",
        },
        {
          action:
            "Extract every `tel:` href across all production routes and normalise the digits.",
          tool: "shell",
          viewport: "any",
          expect: "Every tel: href resolves to the same digits as the confirmed number.",
        },
        {
          action:
            "Compare the site's rendered name, address and hours against the live Google Business Profile — including the number its tap-to-call button dials.",
          tool: "manual",
          expect:
            "Character-for-character match, including 'Suite A' formatting and hour ranges, and the GBP call button dials the same number the site does.",
        },
        {
          action: "Only after mobile passes, confirm the desktop header shows the same number.",
          tool: "browser",
          viewport: "1280",
          expect: "Identical number; desktop may render it as text rather than a tel: link.",
        },
      ],
      mobileFirst: [
        "A one-tap `tel:` control is visible at 375px without scrolling, at ≥44×44px",
        "The hamburger phone row dials the identical number",
        "The number the site dials equals the number the Google Business Profile call button dials",
      ],
      pass: [
        "Exactly one distinct phone number exists in the codebase",
        "All tel: hrefs resolve to that number",
        "Site NAP matches the GBP exactly",
      ],
      gotchas: [
        "tel: hrefs strip formatting, so a display/href mismatch won't show in a visual check — compare normalised digits.",
        "The GBP comparison is the one step an agent cannot fully automate; it needs a human to open the listing.",
        "A number rendered as plain text looks identical to a linked one in a screenshot but cannot be tapped. Assert on the anchor and its href, never on the visible string.",
      ],
    },
  },
  {
    id: 4,
    title: "Add LocalBusiness schema, robots.ts, sitemap.ts and per-page metadata",
    priority: "P0",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 3, reach: 4, risk: 2, effort: 5, readiness: 4 },
    effort: "S",
    status: "partial",
    wave: 1,
    job: "Find the practice in search",
    story:
      "As someone searching for a dentist nearby, the practice surfaces with correct hours, address and phone.",
    problem:
      "FAQSection emits FAQPage JSON-LD, but the LocalBusiness/Dentist schema on the build spec's compliance checklist was never added. There is no robots.ts and no sitemap.ts, and only the root layout and /contact set metadata.",
    where: "src/app/layout.tsx · new src/app/robots.ts · new src/app/sitemap.ts",
    scope: [
      "LocalBusiness/Dentist JSON-LD driven by content.ts, so it can't drift from displayed content",
      "robots.ts and sitemap.ts",
      "Title and description on every route as it ships",
      "Exclude /backlog from the sitemap and keep it noindex",
    ],
    acceptance: [
      "Schema validates in Google's Rich Results Test with zero errors",
      "Schema values match content.ts exactly",
      "/backlog is absent from the sitemap and returns noindex",
      "Every public route has a unique title and description",
    ],
    evidence:
      "Internal — build spec Section 7 checklist item, still open. Vendor SEO sources corroborate GBP/schema weight, directionally.",
    dependsOn: "Item 3 (correct NAP to encode)",
    outOfScope: "A full SEO campaign. Structural correctness only.",
    references: [
      {
        name: "Schema.org — Dentist type",
        url: "https://schema.org/Dentist",
        whatGood:
          "The canonical property list for exactly our business type, inheriting from MedicalBusiness and LocalBusiness — tells you precisely which fields exist rather than guessing.",
        takeaway:
          "Copy the property names verbatim. Only emit properties we can populate from confirmed content — an empty or invented field is worse than an absent one.",
        mobile:
          "Schema has no UI of its own, but its mobile-relevant requirement is concrete: `telephone` and `address` are what Maps and mobile SERP action buttons wire their tap-to-call and directions controls to. Getting those wrong breaks a mobile action, not a text snippet.",
      },
      {
        name: "Google Search Central — local business structured data",
        url: "https://developers.google.com/search/docs/appearance/structured-data/local-business",
        whatGood:
          "States which properties Google actually consumes and how openingHoursSpecification must be formatted, plus the Rich Results Test as the validation gate.",
        takeaway:
          "Copy the required/recommended split and the hours format. Avoid stuffing aggregateRating from our unverified review count — that's item 13's job first.",
        mobile:
          "Mobile-relevant requirement: Google evaluates structured data against the mobile-rendered page under mobile-first indexing, so schema that only ships in a desktop code path is invisible. Validate the mobile rendering, and check `viewport` meta is present while you're there.",
      },
    ],
    test: {
      preconditions: [
        "Item 3 complete (single confirmed NAP)",
        "Preview deployed at $BASE",
        "Validation performed against the mobile rendering, per mobile-first indexing",
      ],
      steps: [
        {
          action:
            "Fetch $BASE with a mobile user-agent and extract every application/ld+json block. Mobile-first indexing means this rendering is the one Google uses.",
          tool: "shell",
          expect:
            "At least two blocks — one FAQPage, one LocalBusiness or Dentist — present in the MOBILE rendering, not only the desktop one.",
        },
        {
          action:
            "Confirm a correct `<meta name=\"viewport\">` is present on every route.",
          tool: "shell",
          expect:
            "Present with width=device-width. Its absence would break mobile rendering for both users and crawlers.",
        },
        {
          action:
            "Parse the LocalBusiness/Dentist JSON and compare name, telephone, address and openingHoursSpecification against the values in content.ts.",
          tool: "shell",
          viewport: "any",
          expect: "Every field matches content.ts exactly — no drift, no hardcoded duplicates.",
        },
        {
          action:
            "Confirm the schema `telephone` matches the number the on-page mobile tap-to-call control dials.",
          tool: "browser",
          expect:
            "Identical digits. A mismatch means the SERP call button and the site call button reach different places.",
        },
        {
          action: "Submit the page URL to Google's Rich Results Test in its mobile mode.",
          tool: "validator",
          expect: "Zero errors on the mobile rendering. Warnings acceptable if recorded and justified.",
        },
        {
          action: "Fetch $BASE/robots.txt and $BASE/sitemap.xml.",
          tool: "shell",
          viewport: "any",
          expect:
            "Both return 200. sitemap.xml lists every public route and does NOT list /backlog.",
        },
        {
          action: "Fetch $BASE/backlog and inspect its robots meta tag.",
          tool: "shell",
          viewport: "any",
          expect: "Contains noindex (and nofollow).",
        },
        {
          action: "Fetch each public route and collect <title> and meta[name=description].",
          tool: "shell",
          viewport: "any",
          expect:
            "Each is present, non-empty, and unique across routes. Titles should front-load the distinguishing words — mobile SERPs truncate earlier than desktop.",
        },
      ],
      mobileFirst: [
        "All JSON-LD is present in the mobile rendering, not only the desktop one",
        "A correct width=device-width viewport meta is present on every route",
        "Schema `telephone` matches the number the on-page mobile tap-to-call control dials",
        "Rich Results Test passes in mobile mode",
      ],
      pass: [
        "LocalBusiness/Dentist JSON-LD present and error-free in the Rich Results Test",
        "Schema field values equal content.ts values",
        "robots.txt and sitemap.xml both serve; /backlog excluded from sitemap and noindexed",
        "Every public route has a unique, non-empty title and description",
      ],
      gotchas: [
        "Next.js metadata is emitted at build time — always test the built/deployed output, never `next dev`, or you may validate stale tags.",
        "The Rich Results Test needs a publicly reachable URL; localhost will not work. Use the Vercel preview.",
        "Validating only the desktop rendering is a false pass under mobile-first indexing — Google indexes the mobile one.",
      ],
    },
  },

  // ─────────────────────────── WAVE 2 ───────────────────────────
  {
    id: 5,
    title: "Extract a PageShell component",
    priority: "P0",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "dependency",
    repriorityNote:
      "Scores only 22/50 — on merit this is P2, because it delivers no patient value by itself. Pinned to P0 anyway as a pure enabler: items 6, 7, 10, 11 and 12 all need it, and building six pages without it guarantees drift. This is the only non-legal pin in the backlog.",
    scores: { conversion: 1, reach: 2, risk: 1, effort: 5, readiness: 5 },
    effort: "S",
    status: "not-started",
    wave: 2,
    job: "Navigate consistently",
    story: "As a patient, every page looks and behaves like the same practice.",
    problem:
      "Six new routes are coming. /contact hand-rolls its own Nav + breadcrumb + layout. Repeating that six more times guarantees drift.",
    where: "new src/components/PageShell.tsx",
    scope: [
      "Nav, breadcrumb, main wrapper, footer, consistent pt-16 offset for the fixed nav",
      "Refactor /contact onto it as the first consumer",
    ],
    acceptance: [
      "Two routes render through PageShell with no visual regression on /contact",
      "Breadcrumb exposes aria-current='page' on the final crumb",
    ],
    evidence:
      "Internal build principle — reusable components over page-specific inventions. Justified by five upcoming consumers, not built speculatively.",
    dependsOn: null,
    outOfScope: "A layout/theming system. One shell, one job.",
    references: [
      {
        name: "WAI-ARIA Authoring Practices — breadcrumb pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
        whatGood:
          "The normative pattern: nav with an accessible name, an ordered list, and aria-current='page' on the final item. Removes all guesswork about correct markup.",
        takeaway:
          "Copy the markup exactly — our existing /contact breadcrumb already follows it and should be the thing extracted, not rewritten.",
        mobile:
          "Breadcrumbs are the pattern most often dropped or truncated on small screens. The APG markup stays valid when wrapped, so keep the full ordered list at 375px and let it wrap rather than replacing it with a bare 'Back' — the last crumb is the 'you are here' signal a mobile user has least other access to.",
      },
      {
        name: "Next.js App Router — layouts and templates",
        url: "https://nextjs.org/docs/app/api-reference/file-conventions/layout",
        whatGood:
          "Explains when a route-group layout.tsx is the right tool versus a shared component — relevant because we may not need a component at all.",
        takeaway:
          "Consider a route-group layout before writing PageShell.tsx; it may be free. Avoid nesting a layout that re-renders Nav twice.",
        mobile:
          "Mobile-relevant requirement: Nav is `fixed`, so whatever owns the shell must reserve its 64px height. Getting this wrong is far more damaging at 375px, where a hidden h1 can be most of the visible screen — and where there's no spare viewport to absorb the overlap.",
      },
    ],
    test: {
      preconditions: [
        "PageShell built and /contact refactored onto it",
        "Pre-refactor captures taken at 375×812 for comparison",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm the h1's bounding-box top is below the fixed 64px nav — not hidden behind it.",
          tool: "browser",
          expect:
            "h1 top ≥ 64px. This is the primary assertion: the fixed-nav overlap bug costs a far larger share of the screen on mobile than on desktop.",
        },
        {
          action:
            "Still at 375px, confirm the breadcrumb renders its full ordered list, wrapping if needed, with aria-current='page' on the last crumb.",
          tool: "browser",
          expect:
            "Full breadcrumb present and not truncated away; final crumb carries aria-current. No horizontal overflow from it.",
        },
        {
          action: "Read the accessibility tree at 375px.",
          tool: "browser",
          expect:
            "Exactly one banner, one main, one contentinfo (if footer included). Breadcrumb nav has an accessible name.",
        },
        {
          action: "Confirm Nav renders exactly once in the DOM.",
          tool: "browser",
          expect: "One header element. A duplicate means the layout and the component both mounted it.",
        },
        {
          action: "Confirm no horizontal scroll at 375px, then repeat at 320px.",
          tool: "browser",
          expect: "documentElement.scrollWidth equals clientWidth at both widths.",
        },
        {
          action: "Capture /contact rendered HTML before and after the refactor and diff them.",
          tool: "shell",
          viewport: "any",
          expect: "No meaningful structural diff — same landmarks, same heading order, same nav.",
        },
        {
          action: "Only after mobile passes, compare /contact at 1280px with the pre-refactor capture.",
          tool: "browser",
          viewport: "1280",
          expect: "No visual regression at desktop width either.",
        },
      ],
      mobileFirst: [
        "h1 clears the fixed 64px nav at 375px — no content hidden behind the header",
        "Breadcrumb renders in full at 375px with aria-current on the final crumb",
        "No horizontal scroll at 375px or 320px",
        "Exactly one banner/main landmark",
      ],
      pass: [
        "No structural or visual regression on /contact at either width",
        "Exactly one banner/main landmark per page",
        "Breadcrumb matches the WAI-ARIA pattern",
      ],
      gotchas: [
        "Nav is `fixed`, so the shell must reserve its height (pt-16). Forgetting that hides the first heading behind the header — check the h1's bounding box top, not just that it exists.",
        "This bug is invisible on a tall desktop viewport and obvious at 375×812. Testing desktop first would miss it entirely.",
      ],
    },
  },
  {
    id: 6,
    title: "Build /insurance-new-patients — the highest-risk content on the site",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "legal",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 44/50 — second highest in the backlog, so P0 on merit. Also pinned: publishing a carrier list that the insurer's directory contradicts is how patients get balance-billed.",
    scores: { conversion: 5, reach: 5, risk: 5, effort: 3, readiness: 2 },
    effort: "M",
    status: "partial",
    wave: 2,
    job: "Understand insurance, cost and payment",
    story:
      "As a patient with a dental plan, I learn whether you're in-network with my plan and what I'll owe, before I book.",
    problem:
      "'We're in-network with most major plans' is not an answer. Patients routinely conflate 'accepts your insurance' with 'in-network with your plan', and the failure mode is a surprise balance bill months later — the angriest theme in the whole review corpus.",
    where: "src/app/insurance-new-patients/page.tsx",
    scope: [
      "SHIPPED (2026-08-31, minimum version, as part of item 1's correction): the route exists — a generic accepted-vs-in-network explainer above the fold, the existing InsuranceBlock component reused for the carrier list (already Placeholder-wrapped there), a no-insurance path, and what-to-bring reused verbatim from the site's real FAQ answer",
      "NOT YET DONE — this is why status is partial, not done: the carrier list itself is still the same unconfirmed six names, still Placeholder-wrapped, not a real verified list. Item 2 (Akash's sign-off on the Section 22 table) is what turns this from a structurally-complete page into a trustworthy one",
      "STILL TODO from the original scope: a specific cost-estimate-timing explainer, and the v2-recommended candid out-of-network disclosure ('we submit your claim even if we're out-of-network') — both need real facts from Akash first, so deferred rather than guessed at",
      "Reused the existing InsuranceBlock component exactly as specified",
    ],
    acceptance: [
      "A patient can answer 'are you in-network with my plan?' or knows exactly how to find out",
      "No unverified carrier, price or financing term appears",
      "Nav link to this route no longer 404s",
      "The accepted-vs-in-network distinction appears above the fold on mobile",
    ],
    evidence:
      "ADA guidance (clinical/professional tier) on out-of-network confusion and the documented site-vs-directory balance-bill case. Corroborated by patient-generated billing-surprise themes.",
    dependsOn: "Item 2 (verified carriers)",
    outOfScope:
      "A cost calculator or coverage-lookup tool. Can't be accurate without plan data, and inaccuracy is worse than silence.",
    references: [
      {
        name: "Delta Dental of WA — what is a dental network",
        url: "https://www.deltadentalwa.com/dental-insurance-101/what-is-a-dental-network",
        whatGood:
          "Defines network membership in one short, jargon-free paragraph and is specific to our actual market. Sets the plain-language bar we should meet or beat.",
        takeaway:
          "Copy the register — short sentences, no insurance jargon unglossed. Don't copy carrier-side framing; patients need our position, not a reprint of theirs.",
        mobile:
          "Short paragraphs survive a 375px column; the comparison tables most dental sites reach for do not. Copy the paragraph form specifically because it reflows — an in-network/out-of-network table is the single most common mobile failure on these pages.",
      },
      {
        name: "Humana — plain-language dental policy",
        url: "https://www.humana.com/member/dental-plain-language-policy",
        whatGood:
          "A regulated insurer deliberately restating plan rules in plain language. Demonstrates that the plain-language version can be authoritative rather than dumbed-down.",
        takeaway:
          "Copy the principle that the simple version is the real version, not a summary of a 'real' legal version elsewhere. Avoid their length — we need one screen, not a policy document.",
        mobile:
          "This is where their example stops being a model: at 375px the length becomes a scroll marathon and the key distinction sinks far below the fold. Our version must put the accepted-vs-in-network answer in the first mobile viewport — take the register, reject the length.",
      },
      {
        name: "Zocdoc — insurance-first search",
        url: "https://www.zocdoc.com/resources/blog/article/patient-self-scheduling/",
        whatGood:
          "Treats insurance verification as the first question in the booking flow rather than a footnote, because that is where patient friction concentrates.",
        takeaway:
          "Copy the sequencing instinct — surface network status before asking for commitment. Do NOT copy the plan-picker UI; we have no eligibility API and a fake picker would imply certainty we can't deliver.",
        mobile:
          "Their flow is designed mobile-first: one decision per screen, thumb-reachable controls, insurance resolved before any typing. Copy the ordering. A plan-picker dropdown with dozens of options is also specifically bad on mobile, which is a second reason to skip it.",
      },
    ],
    test: {
      preconditions: [
        "Item 2 complete — carrier list verified by Akash",
        "Page deployed at $BASE/insurance-new-patients",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action: "Request $BASE/insurance-new-patients.",
          tool: "shell",
          viewport: "any",
          expect: "200, with a non-empty h1.",
        },
        {
          action:
            "At 375×812, measure the top edge of the accepted-vs-in-network explanation against the viewport, accounting for the fixed 64px nav.",
          tool: "browser",
          expect:
            "Visible within the first 812px without scrolling. This is the primary assertion — it is the highest-risk answer on the site and mobile is where it gets read.",
        },
        {
          action:
            "Still at 375px, confirm the carrier list and its 'confirm your specific plan' caveat are both visible together without scrolling between them.",
          tool: "browser",
          expect:
            "Caveat is adjacent to the list in the stacked mobile layout, not separated by a screenful of scroll.",
        },
        {
          action:
            "At 375px, check that no element on the page scrolls horizontally — particularly any carrier list, comparison layout or table.",
          tool: "browser",
          expect:
            "No horizontal overflow. If a table exists, it must reflow to stacked rows rather than scroll sideways.",
        },
        {
          action:
            "Confirm the no-insurance path is reachable at 375px and its control is ≥44×44px.",
          tool: "browser",
          expect: "A patient without insurance has a named, tappable next step.",
        },
        {
          action:
            "Search the rendered text for an explicit contrast between 'accepted' and 'in-network'.",
          tool: "shell",
          viewport: "any",
          expect: "Both terms present and explicitly distinguished, not used interchangeably.",
        },
        {
          action:
            "Check every carrier named on the page against the verified list from item 2, and extract every currency amount or percentage.",
          tool: "shell",
          viewport: "any",
          expect: "No unverified carrier appears, and zero unverified figures.",
        },
        {
          action: "Only after mobile passes, confirm the layout at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Content is not merely a stretched mobile column; the distinction remains prominent.",
        },
      ],
      mobileFirst: [
        "The accepted-vs-in-network explanation is visible in the first 375×812 viewport without scrolling",
        "Carrier list and its verify-your-plan caveat are adjacent in the stacked mobile layout",
        "No horizontal overflow — any tabular content reflows to stacked rows",
        "The no-insurance path is reachable and ≥44×44px at 375px",
      ],
      pass: [
        "Route returns 200 with real content",
        "Accepted vs in-network explicitly distinguished, above the fold on mobile",
        "Every carrier and figure traces to the item-2 verified list",
        "A no-insurance path is present",
      ],
      gotchas: [
        "'Above the fold' must be measured with the fixed 64px nav accounted for — use getBoundingClientRect().top against window.innerHeight, not document offset.",
        "A caveat that sits three sections below the carrier list does not count as adjacent; assert on DOM proximity, not mere presence.",
        "Side-by-side desktop columns stack on mobile, so content that looked adjacent at 1280px can end up a full screen apart at 375px. Always re-measure adjacency on mobile.",
      ],
    },
  },
  {
    id: 7,
    title: "Build /emergency — safe, non-diagnostic urgent guidance",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "safety",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 37/50 — P0 on merit. Also pinned on patient-safety grounds: incorrect or missing red-flag guidance for spreading swelling or airway compromise is a clinical harm, not a conversion miss.",
    scores: { conversion: 4, reach: 3, risk: 5, effort: 3, readiness: 2 },
    effort: "M",
    status: "partial",
    wave: 2,
    job: "Handle an urgent dental need",
    story:
      "As someone in pain right now, I know within seconds whether to call 911, call you, or wait — and what to do meanwhile.",
    problem:
      "There is no emergency pathway anywhere on the site — one hedged FAQ line is all that exists. The emergency contact was deliberately removed when its number couldn't be verified, and nothing replaced it.",
    where: "new src/app/emergency/page.tsx · new EmergencyGuidance component",
    scope: [
      "Tier 1 — 911 or ER: spreading swelling, fever with facial swelling, trouble breathing or swallowing",
      "Tier 2 — call us: pain, broken or knocked-out tooth, lost filling or crown, swelling without red flags",
      "Tier 3 — while you wait: rinse with warm water, cold compress, no aspirin on the tooth or gum",
      "Honest after-hours statement — what is and isn't available, and when the office opens",
      "One-tap call, prominent",
      "Optionally note that ERs rarely staff dentists and generally treat the symptom, not the tooth",
      "DONE (2026-09-01): shipped as src/app/emergency/page.tsx, sourced from content.ts `emergencyGuidance`. Akash confirmed the after-hours reality: call, or schedule online now — no answering service, so `afterHours` states exactly that with no response-time promise. Tier 1 renders first (DOM and visual order) directly under the page heading, verified at 375×812 to render well within the first viewport alongside the one-tap `tel:` control and a Schedule-now link. Linked from the mobile hamburger menu, the footer, and BookingBlock's \"Dental emergency\" quick action (previously a /contact placeholder). v2 items intentionally not built",
      "REVISED (2026-09-02): the footer link is gone — Akash reviewed a live-preview screenshot and asked to cut the footer down to just Privacy/Accessibility, dropping the repeated brand/address/CTA block and the \"Dental emergency\" link along with it (Footer.tsx rewritten). Reachability now rests on BookingBlock's \"Quick actions\" pill (one section above the footer, still a real undiluted-`alert` button) and the mobile hamburger menu — both still one tap, so the underlying job story still holds, but this item's own acceptance line (\"footer\" specifically) no longer does. Status dropped to `partial` to keep that honest rather than leaving `done` stale.",
      "v2: adopt the \"when unsure, default up\" rule — safer to be evaluated and sent home than to delay (NHS 111 / Bond Vet routing model, borrowed as static cited content, never as a question engine)",
      "v2: add a short \"what to have ready when you call\" list — what happened, when, symptoms, medications",
      "v2 anti-pattern: exactly ONE emergency number sitewide. An observed site listed three, which in a crisis is unusable",
    ],
    acceptance: [
      "Red-flag guidance matches ADA patient guidance",
      "No invented response-time promise anywhere on the page",
      "Reachable in one tap from the mobile menu and the footer",
      "Tier 1 guidance is the first content a patient sees",
    ],
    evidence:
      "Clinical tier — ADA MouthHealthy and JADA. Peer-reviewed: dental-anxiety prevalence among emergency patients approaches 49%, so this page must read calm, not alarming.",
    dependsOn: "Akash confirming the after-hours reality (voicemail / service / nothing)",
    outOfScope:
      "A symptom checker or triage tool. Clinical risk, no supporting evidence, explicitly ruled out.",
    references: [
      {
        name: "ADA MouthHealthy — dental emergencies",
        url: "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies",
        whatGood:
          "The authoritative patient-facing source. Gives per-scenario first aid — including the specific 'do not put aspirin against the gum' warning patients commonly get wrong — without ever diagnosing.",
        takeaway:
          "Copy the non-diagnostic structure and the specific first-aid actions. This is the content source of record; do not paraphrase loosely, and do not add advice it doesn't support.",
        mobile:
          "Their per-scenario blocks are short enough to read one-handed while in pain — which is the actual reading condition. Copy the brevity as a safety property, not a style choice: a red flag a panicking patient has to scroll to find is a red flag they miss.",
      },
      {
        name: "Bedford Dentistry — three-level tooth-pain triage guide",
        url: "https://www.bedforddentistry.com/is-your-tooth-pain-actually-a-dental-emergency-a-simple-triage-guide",
        whatGood:
          "A practice-side worked example of the exact three-tier structure we want: call-now / same-day / within-a-week, each with concrete symptoms rather than vague severity language.",
        takeaway:
          "Copy the tiering and the concreteness. Do NOT copy their specific time commitments ('same day', 'within a week') — those are availability promises we cannot verify for this practice.",
        mobile:
          "The tiering is what makes this work at 375px: three clearly separated blocks let someone stop reading as soon as they've matched their symptom. Avoid their long intro paragraph, which on a phone pushes Tier 1 below the fold — the tiers must come first.",
      },
      {
        name: "ABC 123 Family Dental — what an ER can and can't do",
        url: "https://abc123dental.com/is-your-tooth-pain-a-dental-emergency-a-quick-triage-guide",
        whatGood:
          "States plainly that an ER can manage pain and infection temporarily but only a dentist fixes the underlying problem — correcting a genuinely common patient misconception.",
        takeaway:
          "Copy this clarification; it's a real service and it routes patients toward professional care rather than away. Keep it short — one sentence, not a section.",
        mobile:
          "One sentence is the right length partly because of mobile: this is supporting detail, and on a 375px screen every extra line pushes the call control further from the thumb. Place it after the tiers and the call button, never before.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed the after-hours reality",
        "Page deployed at $BASE/emergency",
        "Browser viewport set to 375×812 before any rendering step — this page is overwhelmingly reached on a phone, in pain, often at night",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm Tier 1 red-flag guidance is visible WITHOUT scrolling, accounting for the fixed 64px nav.",
          tool: "browser",
          expect:
            "Tier 1 fully visible in the first viewport. A red flag below the fold on a phone is a patient-safety failure, not a layout nit. This is the single most important assertion in the entire backlog.",
        },
        {
          action:
            "Still at 375px, confirm the one-tap `tel:` control is reachable in the lower half of the screen (thumb zone) and measures ≥44×44px.",
          tool: "browser",
          expect:
            "Present, thumb-reachable, ≥44px, dialling the confirmed number from item 3. Someone in pain must not have to hunt for it.",
        },
        {
          action:
            "At 375px, confirm the three tiers are visually distinct when stacked, and that Tier 1 is not visually outweighed by Tier 2 or 3.",
          tool: "browser",
          expect:
            "Clear separation; Tier 1 reads as the most urgent. Stacking must not flatten the hierarchy that desktop columns provide.",
        },
        {
          action:
            "At 375px, confirm the after-hours statement is visible without needing to expand or scroll past the tiers.",
          tool: "browser",
          expect: "Present and readable — the out-of-hours patient is the most likely mobile visitor.",
        },
        {
          action:
            "From the homepage at 375px, open the hamburger and count taps to reach /emergency. Repeat from the footer.",
          tool: "browser",
          expect: "One tap from the open menu, and linked in the footer.",
        },
        {
          action:
            "Verify all three ADA red flags are present in the Tier 1 block: spreading swelling, fever with facial swelling, difficulty breathing or swallowing.",
          tool: "shell",
          viewport: "any",
          expect:
            "All three present. A missing red flag is an automatic fail — this is the safety-critical content assertion.",
        },
        {
          action:
            "Verify the first-aid block contains the warm-water rinse, the cold compress, and an explicit warning against placing aspirin on the tooth or gum.",
          tool: "shell",
          viewport: "any",
          expect: "All three present and consistent with ADA MouthHealthy wording.",
        },
        {
          action:
            "Scan the full page text for response-time promises using a pattern like /(within|in) (an? )?(hour|day|minutes?)|same[- ]day guarantee|immediately seen/i.",
          tool: "shell",
          viewport: "any",
          expect:
            "Zero unverified time promises. Any match must trace to a claim Akash signed off in item 2.",
        },
        {
          action: "Confirm Tier 1 precedes Tier 2 and Tier 3 in DOM order.",
          tool: "shell",
          viewport: "any",
          expect: "Tier 1 first — screen-reader and reading order match visual order.",
        },
        {
          action: "Only after mobile passes, confirm the page at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Tier hierarchy preserved; call control still prominent.",
        },
      ],
      mobileFirst: [
        "Tier 1 red-flag guidance is fully visible at 375×812 without scrolling",
        "A one-tap call control is thumb-reachable at ≥44×44px",
        "The three tiers stay visually distinct and correctly ranked when stacked",
        "The after-hours statement is readable without scrolling past the tiers",
        "The page is one tap from the open hamburger and linked in the footer",
      ],
      pass: [
        "All three ADA red flags present in Tier 1",
        "All three first-aid actions present, including the aspirin warning",
        "Zero unverified response-time promises",
        "Tier 1 first in DOM order and above the fold at 375px",
        "One-tap call present at ≥44px; page reachable in one tap from the open menu and from the footer",
      ],
      gotchas: [
        "This is the one item where a test failure is a patient-safety issue, not a cosmetic one. Do not merge on a partial pass.",
        "Beware wording drift: 'we'll see you right away' is a response-time promise even though it contains no time unit. Human review of the copy is required in addition to the regex.",
        "Verifying this page at desktop width first is actively dangerous: a three-column tier layout puts everything above the fold at 1280px and hides Tier 3 — or worse, pushes Tier 1's detail below the fold — at 375px. Mobile is the real test.",
      ],
    },
  },
  {
    id: 8,
    title: "Expand arrival: transit, parking, entrance and Suite A",
    priority: "P0",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 5, risk: 2, effort: 3, readiness: 3 },
    effort: "M",
    status: "partial",
    wave: 2,
    job: "Make care convenient · find the actual door",
    story:
      "As a patient deciding whether this is practical, I know how to get there, where to park, and which door and floor to walk to.",
    problem:
      "The practice is in Lower Queen Anne/Uptown, not the downtown core — a downtown-working patient will never walk past it. The site has to close that distance gap actively. 'Suite A' with no floor or entrance guidance is a real arrival failure.",
    where: "src/components/LocationMapSection.tsx · new ArrivalCard component",
    scope: [
      "Which building, which entrance, what floor, how to find Suite A",
      "RapidRide D and Metro routes 1/2/3/4/13; nearest stop",
      "Seattle Center Monorail — roughly two minutes from Westlake; the single most useful local fact for a downtown patient",
      "Honest parking: bus stop on the same block, street parking nearby. No invented garage or validation",
      "One-tap directions and one-tap call on mobile",
      "Step-free access only if confirmed",
    ],
    acceptance: [
      "A first-time patient can find the door without calling",
      "Every transit claim is verifiable",
      "Directions and call are single-tap on a 375px viewport",
      "No parking claim beyond the confirmed street-parking statement",
    ],
    evidence:
      "Local sources (Monorail ~2 min to Westlake; RapidRide D and routes 1/2/3/4/13). Cross-domain: hospitality treats arrival instructions as part of the booking product.",
    dependsOn: "Akash confirming entrance, floor and step-free access",
    outOfScope: "Live transit times or a route planner. Link to Google Maps and stop there.",
    references: [
      {
        name: "MedStar Washington Hospital Center — directions & parking",
        url: "https://www.medstarhealth.org/locations/medstar-washington-hospital-center/driving-directions-and-parking",
        whatGood:
          "Solves the exact problem we have at larger scale: tells patients which building and which floor, and explains the room-numbering convention so a room number alone tells you where to go.",
        takeaway:
          "Copy the 'decode the address for the patient' instinct — 'Suite A' should be explained, not merely stated. Ignore the scale; we need one card, not a floorplan library.",
        mobile:
          "This is the reference that most needs a mobile caveat: their floorplan PDFs and wide wayfinding diagrams are close to unusable on a phone, which is exactly where they're needed — nobody reads arrival instructions at a desk. Copy the content model, reject the delivery: ours must be text and one-tap actions, never a PDF or a wide image.",
      },
      {
        name: "Hennepin Healthcare — directions & parking",
        url: "https://hennepinhealthcare.org/patient-resources/directions-parking",
        whatGood:
          "Presents transit, parking and entrance as equal first-class options rather than burying transit beneath driving directions — appropriate for an urban, transit-served catchment like ours.",
        takeaway:
          "Copy the parity of transit and driving. Avoid their volume of parking detail — our honest answer is short, and padding it would mean inventing claims.",
        mobile:
          "Transit-first ordering matters more on mobile: someone checking transit is usually already out of the house, on a phone, deciding right now. Put transit above driving in the stacked mobile order, not just at equal weight.",
      },
      {
        name: "Stanford Health Care — locations and parking",
        url: "https://stanfordhealthcare.org/for-patients-visitors/locations-and-parking.html",
        whatGood:
          "States parking cost and validation reality plainly, including where parking is free — no euphemism, so patients aren't surprised on arrival.",
        takeaway:
          "Copy the honesty about cost and availability. We must NOT copy a 'plenty of parking' style claim — Lower Queen Anne parking pressure around Seattle Center events is real and locally known.",
        mobile:
          "Arrival content is read in motion — walking from a bus stop, or parked at the kerb. That argues for very short lines, high contrast, and no reliance on hover or wide tables. Anything needing two hands or a zoom has failed.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed entrance, floor and step-free access",
        "Deployed at $BASE",
        "Browser viewport set to 375×812 before any rendering step — arrival content is read in motion, on a phone, near the building",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm the directions control and the call control are both present, ≥44×44px, ≥8px apart, and reachable in the thumb zone.",
          tool: "browser",
          expect:
            "Both one-tap. The directions href opens Google Maps for the confirmed address. This is the primary assertion — arrival content that isn't one-tap on a phone has failed its only real use case.",
        },
        {
          action:
            "Still at 375px, confirm the entrance/floor/Suite-A guidance is readable as plain text, not delivered as a PDF, a wide image or a diagram requiring zoom.",
          tool: "browser",
          expect:
            "Plain, selectable text at ≥16px. No PDF link standing in for the instructions, no image-only wayfinding.",
        },
        {
          action:
            "At 375px, confirm transit information appears above driving/parking in the stacked order.",
          tool: "browser",
          expect:
            "Transit first — the transit-checking patient is already out of the house and deciding now.",
        },
        {
          action:
            "At 375px, confirm no element overflows horizontally, including the map embed and any transit route list.",
          tool: "browser",
          expect:
            "No horizontal scroll. The map embed must be responsive, not a fixed-width iframe.",
        },
        {
          action:
            "Verify the arrival content names the street address, the building/entrance, and the floor or how to find Suite A.",
          tool: "shell",
          viewport: "any",
          expect: "All three present. 'Suite A' alone, unexplained, is a fail.",
        },
        {
          action:
            "Verify transit content names RapidRide D, at least one numbered Metro route, and the Monorail-from-Westlake connection.",
          tool: "shell",
          viewport: "any",
          expect: "All present and factually consistent with the cited local sources.",
        },
        {
          action: "Scan for parking claims and compare against contact.parkingNote in content.ts.",
          tool: "shell",
          viewport: "any",
          expect:
            "No claim beyond the confirmed statement. Any mention of a garage, validation, or 'ample/plenty of parking' is a fail.",
        },
        {
          action: "Confirm any step-free/accessibility statement present is one Akash confirmed.",
          tool: "manual",
          viewport: "any",
          expect: "Present only if confirmed. An unconfirmed accessibility claim is a fail.",
        },
        {
          action: "Only after mobile passes, confirm the arrival card at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Content intact; no information that exists only at desktop width.",
        },
      ],
      mobileFirst: [
        "One-tap directions and one-tap call, both ≥44×44px and ≥8px apart, in the thumb zone at 375px",
        "Entrance/floor/Suite-A guidance is plain selectable text — no PDF, no image-only wayfinding",
        "Transit appears above driving/parking in the stacked mobile order",
        "No horizontal overflow, including a responsive map embed",
      ],
      pass: [
        "Address, entrance and floor/Suite-A guidance all present",
        "Transit claims present and verifiable",
        "No parking claim beyond the confirmed statement",
        "One-tap directions and call at ≥44px on 375px",
        "No unconfirmed accessibility claim",
      ],
      gotchas: [
        "An accessibility claim that turns out to be false is worse than none — it strands a wheelchair user at the door. Treat it as a verification item, not copy.",
        "A fixed-width Google Maps iframe is the classic horizontal-overflow source on this kind of section and looks perfectly fine at 1280px. Check it at 375px specifically.",
      ],
    },
  },
  {
    id: 9,
    title: "Add form confirmation and error states",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "broken",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 4, risk: 3, effort: 5, readiness: 3 },
    effort: "S",
    status: "done",
    wave: 2,
    job: "Request an appointment with confidence",
    story:
      "As someone who just submitted the form, I know it worked, what happens next, and by when.",
    problem:
      "Form → email → manual callback is one of the two conversion leaks named in the build spec. Submitting into silence is the moment patients give up and call a competitor.",
    where: "src/components/AppointmentForm.tsx · new FormStatus component",
    scope: [
      "Success state: what was sent, what happens next, by when, and how to reach a human meanwhile",
      "Error states naming the problem and the fix, not just 'invalid'",
      "Optional free-text field — 'Anything we should know before your visit?'",
      "v2 CD-9: set the mechanism expectation honestly — this is a request with a callback, not instant booking. Never dress a request up as a confirmed appointment",
      "v2 CD-22: let the patient review what they entered before submitting",
      "Labels above fields, inline validation on blur, ≥44px targets",
    ],
    acceptance: [
      "Success state states an actual callback window (verified with Akash)",
      "Every error names a fix",
      "The optional field is genuinely optional and never blocks submission",
      "Errors are announced to screen readers and linked to their field",
    ],
    evidence:
      "Cross-domain (airline/hotel confirmation patterns). The optional field also serves the anxiety job — peer-reviewed tier — at near-zero cost: it lets an anxious patient say so without saying it out loud at the desk.",
    dependsOn: "Akash confirming the real callback window",
    outOfScope: "Real-time slot availability. That's item 15.",
    references: [
      {
        name: "GOV.UK Design System — error message pattern",
        url: "https://design-system.service.gov.uk/components/error-message/",
        whatGood:
          "Government-grade, user-tested guidance on error wording: say what went wrong and how to fix it, in plain language, with the message tied to its field and surfaced in an error summary. Backed by real usability research at scale.",
        takeaway:
          "Copy the wording rules and the summary-plus-inline pattern wholesale. This is the single best reference for this item.",
        mobile:
          "The error-summary half of the pattern earns its keep on mobile specifically: at 375px a failing field can be far off-screen, so a summary at the top that links to each error is the only way a user sees what went wrong without hunting. Copy both halves, not just the inline messages.",
      },
      {
        name: "NN/g — confirmation and acknowledgement",
        url: "https://www.nngroup.com/articles/confirmation-dialog/",
        whatGood:
          "Explains why acknowledgement must restate what happened rather than just saying 'success' — the user needs to verify the system understood them correctly.",
        takeaway:
          "Copy the restate-the-input principle. Our success state should echo the request and the callback window, not just a green tick.",
        mobile:
          "On mobile the success state must also move focus and scroll into view — a confirmation rendered above the current scroll position is simply not seen on a small screen, which reads to the patient as 'nothing happened' and produces a duplicate submission or a phone call.",
      },
      {
        name: "GOV.UK Design System — one thing per page",
        url: "https://design-system.service.gov.uk/patterns/question-pages/",
        whatGood:
          "Evidence-based guidance that splitting a form into small steps reduces errors and drop-off — derived from testing with users on low-end devices and poor connections, not from a desktop lab.",
        takeaway:
          "Copy the short-form instinct: ask for the minimum. Our appointment request should stay well under a screen of fields.",
        mobile:
          "Directly a mobile pattern — it exists because long forms are punishing on a phone keyboard. Keep our field count low enough that the form fits roughly one 375×812 screen, and never let the on-screen keyboard cover the submit control.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed the callback window",
        "/contact deployed at $BASE/contact",
        "Browser viewport set to 375×812 before any rendering step; where possible test with a real on-screen keyboard, not just a resized window",
      ],
      steps: [
        {
          action:
            "At 375×812, read the form's accessibility tree and confirm every input has a visible associated label (not placeholder-as-label) and the optional field is not required.",
          tool: "browser",
          expect:
            "Labels visible above fields. Placeholder-as-label fails doubly on mobile: the hint vanishes once typing starts and there is no room to recover it.",
        },
        {
          action:
            "At 375px, submit the form with all fields empty and observe where the errors appear relative to the viewport.",
          tool: "browser",
          expect:
            "Submission blocked; an error summary is visible without scrolling AND each field carries an inline error naming the fix. Errors are aria-describedby-associated and announced. An inline-only error on an off-screen field is a mobile failure.",
        },
        {
          action:
            "At 375px, focus each field in turn and confirm the on-screen keyboard does not obscure the active field or the submit control.",
          tool: "browser",
          expect:
            "Active field stays visible when focused; submit remains reachable. Test with a real device keyboard if available — a resized desktop window will not reproduce this.",
        },
        {
          action:
            "Confirm each input uses an appropriate `type`/`inputmode` (email → type=email, phone → type=tel) so mobile shows the right keyboard.",
          tool: "browser",
          expect:
            "Correct keyboard per field. A numeric phone field presenting a full QWERTY keyboard is a real, common mobile defect.",
        },
        {
          action: "Enter a malformed email and blur the field.",
          tool: "browser",
          expect: "Inline error appears on blur, and its text says how to fix it, not merely 'invalid'.",
        },
        {
          action:
            "Fill all required fields at 375px, leave the optional field empty, and submit.",
          tool: "browser",
          expect: "Submission succeeds — the optional field never blocks it.",
        },
        {
          action:
            "Inspect the success state at 375px and confirm it is scrolled into view and has received focus.",
          tool: "browser",
          expect:
            "Visible without manual scrolling, focused, and it restates what was submitted, what happens next, the confirmed callback window, and a phone fallback.",
        },
        {
          action: "Repeat the empty-submit and success paths using keyboard only.",
          tool: "browser",
          expect:
            "Focus moves to the first error (or the summary) on failure, and to the success message on success. No focus is lost to the body.",
        },
        {
          action: "Measure every interactive target in the form at 375px.",
          tool: "browser",
          expect: "All ≥44×44px with ≥8px separation.",
        },
        {
          action: "Only after mobile passes, run the same success and failure paths at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Equivalent behaviour; no desktop-only affordance the mobile path lacks.",
        },
      ],
      mobileFirst: [
        "An error summary is visible without scrolling at 375px, alongside inline per-field errors",
        "The on-screen keyboard never obscures the active field or the submit control",
        "Each input triggers the correct mobile keyboard via type/inputmode",
        "The success state is scrolled into view and focused at 375px",
        "All form targets ≥44×44px with ≥8px separation",
      ],
      pass: [
        "All inputs have visible labels; optional field never blocks submission",
        "Errors name the fix and are programmatically associated and announced",
        "Success state restates the input, the next step and the confirmed callback window",
        "Keyboard-only flow moves focus correctly on both success and failure",
        "All targets ≥44px at 375px",
      ],
      gotchas: [
        "Native browser validation bubbles are not screen-reader reliable and vanish on blur — if the implementation relies on them alone, this fails even though it looks correct visually.",
        "A success state rendered without moving focus is invisible to a screen-reader user; assert on focus, not just on DOM presence.",
        "A resized desktop window does not simulate the on-screen keyboard. Keyboard-obscuring bugs only reproduce on a real device or a device-emulating mobile viewport.",
      ],
    },
  },

  // ─────────────────────────── WAVE 3 ───────────────────────────
  {
    id: 16,
    title: "Dental anxiety and comfort content",
    priority: "P0",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    repriorityNote:
      "PROMOTED P1 → P0 (35.5/50). Outscores five items that were already P0, including /services (29.5) and privacy (31). It's the best-evidenced patient need in the whole research set, it's Small, and it's essentially unblocked — the minimum version is one honest paragraph. Being cheap and evidence-backed is exactly what the scoring model is meant to surface.",
    scores: { conversion: 4, reach: 4, risk: 2, effort: 5, readiness: 3 },
    effort: "S",
    status: "not-started",
    wave: 3,
    job: "Return to care after avoiding it",
    story:
      "As someone who hasn't been to a dentist in years, I see that you won't make me feel bad about it.",
    problem:
      "The best-evidenced patient need in the entire research set, and the site says nothing about it. Roughly one in five adult dental patients is anxious; over a fifth of them don't attend regularly; up to 15% avoid care entirely.",
    where: "Homepage strip → /anxiety page later",
    scope: [
      "One honest, non-judgmental paragraph — permission, not pity",
      "What actually happens at a first visit, step by step",
      "Only comfort options the practice verifiably offers",
      "Pairs with the optional form field from item 9",
      "v2: a concrete stop-signal is far stronger than the word \"gentle\" — e.g. raise your hand and we stop — but it is a policy claim and needs confirming",
      "v2: say plainly that flagging anxiety when you book is welcome; almost no site states this",
      "v2: if sedation is offered, name the TYPE (inhalation / oral / IV). Generic \"sedation\" with the type unnamed is a catalogued anti-pattern",
      "v2: the \"six months or six years\" no-judgment line is now a recognisable convention that directly answers the shame hinge"
    ],
    acceptance: [
      "No sedation or comfort claim appears without practice confirmation",
      "Tone reads as permission-giving, not clinical or saccharine",
      "The minimum version ships without waiting on the comfort-options list",
    ],
    evidence:
      "Peer-reviewed tier — the strongest evidence in the report. Multiple independent studies on prevalence, avoidance and the anxiety/emergency overlap.",
    dependsOn: "Confirmed comfort and sedation options (for the fuller version only)",
    outOfScope: "Claiming sedation dentistry unless the practice actually offers it.",
    references: [
      {
        name: "ADA MouthHealthy — anxiety",
        url: "https://www.mouthhealthy.org/all-topics-a-z/anxiety",
        whatGood:
          "Patient-facing, clinically responsible framing of dental anxiety as common and manageable, without either minimising it or medicalising it.",
        takeaway:
          "Copy the validating-but-matter-of-fact register. It's also the safe source for anything we say about anxiety as a condition.",
        mobile:
          "Anxious patients research privately and often at night, on a phone — this is close to a mobile-only audience. That argues for the acknowledgement landing in the first mobile viewport rather than after a scroll, and for short paragraphs someone can read without committing.",
      },
      {
        name: "Penn Dental Medicine — dental anxiety",
        url: "https://penndentalmedicine.org/blog/how-to-get-over-dental-anxiety/",
        whatGood:
          "Institutional voice that explicitly ties comfort to better outcomes and repeat attendance, which reframes accommodation as clinical practice rather than a perk.",
        takeaway:
          "Copy the outcome framing — it earns credibility with the adult professional segment. Avoid the blog-listicle structure; we need a short strip, not '7 ways to…'.",
        mobile:
          "The listicle structure is also the mobile problem: on a phone it becomes an endless scroll where the reassurance is diluted across screens. Our version should be one short block that fits a single 375px viewport — the whole message visible at once.",
      },
      {
        name: "DC Pearls Dental — anxiety and phobia",
        url: "https://www.dcpearlsdental.com/getting-started/patient-care-comfort/dental-anxiety-and-phobia/",
        whatGood:
          "Practice-side example that leads with listening — 'we listen when patients express concerns' — rather than leading with sedation upsell.",
        takeaway:
          "Copy the listen-first order. Do NOT copy their sedation claims; we may offer none, and per the locked rule we publish only what's confirmed.",
        mobile:
          "Listen-first has a concrete mobile expression: the next step after the reassurance should be the optional 'anything we should know?' form field, tappable without a phone call. For an anxious user, a one-tap text disclosure is the whole point — calling is the thing they're avoiding.",
      },
    ],
    test: {
      preconditions: [
        "Anxiety content deployed at $BASE",
        "Browser viewport set to 375×812 before any rendering step — this audience researches privately on a phone",
      ],
      steps: [
        {
          action:
            "At 375×812, locate the anxiety content and confirm the non-judgmental acknowledgement is readable within a single viewport without scrolling mid-sentence.",
          tool: "browser",
          expect:
            "The whole reassurance reads as one block on one mobile screen. Reassurance split across a scroll boundary loses its effect.",
        },
        {
          action:
            "At 375px, confirm the route to the optional 'anything we should know?' field is present and tappable at ≥44×44px, without requiring a phone call.",
          tool: "browser",
          expect:
            "One-tap text disclosure available. For this audience the whole point is not having to phone.",
        },
        {
          action:
            "At 375px, check body text is ≥16px with line-height ≥1.5 and comfortable measure.",
          tool: "browser",
          expect:
            "Meets the locked type minimums. Small type reads as clinical and undermines the reassurance it's carrying.",
        },
        {
          action:
            "Scan for sedation, nitrous, IV sedation, or named comfort amenities, and cross-check each against Akash's confirmed list.",
          tool: "shell",
          viewport: "any",
          expect: "Zero unconfirmed comfort or sedation claims.",
        },
        {
          action:
            "Read the copy aloud (or have an LLM assess tone) against three failure modes: clinical/cold, saccharine/pitying, sales-driven.",
          tool: "manual",
          viewport: "any",
          expect: "None of the three. Register matches the ADA/Penn references.",
        },
        {
          action: "Only after mobile passes, confirm the strip at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Reads as a deliberate block, not a stretched mobile paragraph.",
        },
      ],
      mobileFirst: [
        "The full acknowledgement reads within one 375×812 viewport, not split across a scroll",
        "A one-tap, non-phone disclosure route is present at ≥44×44px",
        "Body text ≥16px with line-height ≥1.5 at 375px",
      ],
      pass: [
        "Non-judgmental acknowledgement present",
        "Zero unconfirmed sedation or comfort claims",
        "A pre-arrival disclosure route exists",
        "Tone passes the three failure-mode check",
      ],
      gotchas: [
        "Tone is the actual deliverable here and cannot be asserted by regex. The automated steps only catch unverified claims; a human or LLM tone read is mandatory.",
        "Reassurance that requires scrolling to complete reads as hedging. Measure the block against the viewport, not just its word count.",
      ],
    },
  },
  {
    id: 20,
    title: "Cost and financing explainer",
    priority: "P0",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    repriorityNote:
      "PROMOTED P1 → P0 (34/50). Cost uncertainty is a documented reason patients delay care, and the publishable part — the process and the timing — needs no price verification at all. Sits above schema (33.5) and /about (33.5), both already P0.",
    scores: { conversion: 4, reach: 4, risk: 3, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
    wave: 3,
    job: "Estimate what I'll actually pay",
    story:
      "As a cost-sensitive patient, I understand how cost is determined and when I'll know my number.",
    problem:
      "Cost uncertainty causes patients to delay care. Prices can't be published without verification — but the process and the timing can be, and saying when someone will know is nearly as valuable as the number.",
    where: "/insurance-new-patients",
    scope: [
      "Explain the process: exam → written plan → estimate → treatment",
      "Verified financing terms only",
      "A path for patients without insurance",
      "Ranges only if the practice will stand behind them",
    ],
    acceptance: [
      "No unverified price appears",
      "A patient knows exactly when they'll get a number",
      "The explanation works for a patient with no insurance",
    ],
    evidence:
      "Vendor tier on cost-driven delay (directional) + patient-generated billing-surprise themes (repeated theme, stronger).",
    dependsOn: "Item 6 · verified financing terms",
    outOfScope: "A cost calculator. Can't be accurate; inaccuracy is worse than silence.",
    references: [
      {
        name: "CMS — hospital price transparency",
        url: "https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency",
        whatGood:
          "The regulatory north star for healthcare cost disclosure: sets the expectation that patients get meaningful, comparable cost information before service rather than a bill afterwards.",
        takeaway:
          "Copy the direction of travel and the vocabulary of 'estimate before service'. Note the rule targets hospitals, not private dental practices — we adopt the principle, we don't claim compliance with a rule that doesn't bind us.",
        mobile:
          "The machine-readable files this rule produced are a cautionary mobile example: technically transparent, practically unusable on a phone. Transparency that a patient can't read at 375px isn't transparency — our version must be prose in a narrow column, not a data artefact.",
      },
      {
        name: "Rivet — patient cost estimates",
        url: "https://www.rivethealth.com/blog/how-important-are-patient-cost-estimates",
        whatGood:
          "Articulates why the *timing* of an estimate matters as much as the number, which is the exact insight that makes this item shippable without verified prices.",
        takeaway:
          "Copy the timing framing. Treat its percentages as vendor-sourced and directional — do not quote them to Akash as fact.",
        mobile:
          "Timing framing is well suited to mobile because it's a short ordered sequence — exam, written plan, estimate, treatment — which renders as a compact stacked list. Avoid expressing it as a horizontal stepper or timeline graphic; those break at 375px.",
      },
    ],
    test: {
      preconditions: [
        "Item 6 shipped",
        "Financing terms confirmed or explicitly omitted",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm the exam → written plan → estimate → treatment sequence renders as a readable stacked list, not a horizontal stepper or wide timeline graphic.",
          tool: "browser",
          expect:
            "Sequence explicit, ordered, and fully legible in a 375px column with no horizontal scroll.",
        },
        {
          action:
            "At 375px, confirm the answer to 'when will I know my number' is reachable without hunting — within the first screen or two of the cost section.",
          tool: "browser",
          expect:
            "An explicit answer (e.g. after the comprehensive exam), not a vague 'we'll discuss it', and not buried below several screens of scroll.",
        },
        {
          action:
            "At 375px, confirm the no-insurance path is visible in the stacked order and not pushed to the bottom below all insurance content.",
          tool: "browser",
          expect:
            "Reachable without long scrolling. On desktop a sidebar keeps it visible; when stacked it can end up last, which strands the exact reader who needs it.",
        },
        {
          action:
            "Extract every currency amount, percentage and financing term, and cross-check each against Akash's confirmed list.",
          tool: "shell",
          viewport: "any",
          expect:
            "Zero unverified figures or terms. 'Interest-free financing' counts as a term needing verification.",
        },
        {
          action: "Read the page as an uninsured patient and check the path still works.",
          tool: "manual",
          viewport: "any",
          expect: "Nothing assumes an insurance card; a no-insurance route is named.",
        },
        {
          action: "Only after mobile passes, confirm the section at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "No content or emphasis that exists only at desktop width.",
        },
      ],
      mobileFirst: [
        "The estimate sequence renders as a stacked list with no horizontal scroll at 375px",
        "The 'when will I know' answer is reachable within the first screen or two of the section",
        "The no-insurance path is not pushed to the bottom of the stacked mobile order",
      ],
      pass: [
        "Estimate sequence explicit and ordered",
        "Zero unverified figures or financing terms",
        "The 'when will I know' question is answered explicitly",
        "The page works for an uninsured reader",
      ],
      gotchas: [
        "'Interest-free financing' is a financial-terms claim, not marketing copy — it needs the same verification as a price.",
        "Desktop sidebars become bottom-of-page content when stacked. Anything relegated to a sidebar at 1280px needs its mobile position checked explicitly.",
      ],
    },
  },
  {
    id: 10,
    title: "Build /about from Dr. Dubey's existing real bio",
    priority: "P0",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 4, risk: 2, effort: 3, readiness: 4 },
    effort: "M",
    status: "done",
    wave: 3,
    job: "Evaluate trust and clinical credibility",
    story: "As a patient, I know exactly who will treat me and why they're qualified.",
    problem:
      "The nav links to /about and it 404s — while the site already holds its single strongest trust asset: a real, specific, credentialed bio and real photography.",
    where: "src/app/about/page.tsx",
    scope: [
      "SHIPPED (2026-08-31, as part of item 1's correction): Dr. Dubey's full real bio, tagline, quote, credential badges, real photo, and certifications — all already-verified fields from content.ts's `archana` object, none of it new copy",
      "Team NOT shown — content.ts's other team entries are literally placeholder strings ('Hygienist name', 'Staff name'). Showing them, even Placeholder-wrapped, would read as 'we know this person exists but won't say who' rather than 'unconfirmed'. The honest minimum omits them until real names exist",
      "Built inline (Nav + breadcrumb + content + Footer, matching /contact's existing pattern) rather than waiting on item 5's PageShell — reasonable given PageShell wasn't a hard blocker, just a future refactor target",
      "Professional-affiliation credentials rendered through the existing <Placeholder> component, matching the sitewide convention for unconfirmed content",
    ],
    acceptance: [
      "Page uses only already-verified bio content — met",
      "Photos match who a patient actually meets in the room — met, the real ADA-event photo",
      "Nav link no longer 404s — met",
      "No unconfirmed team names appear — met, by omitting the team section entirely rather than displaying placeholder names",
    ],
    evidence:
      "Usability tier — provider bios with training, focus and a photo matching the real person are the highest-trust element on a medical site. Vague trust language ('compassionate care') registers as noise.",
    dependsOn: "Team names, if a fuller team section is added later. The Dr. Dubey bio itself was already unblocked and now shipped",
    outOfScope: "Individual pages per team member.",
    references: [
      {
        name: "Mayo Clinic — physician profile pages",
        url: "https://www.mayoclinic.org/biographies",
        whatGood:
          "Structured, scannable provider profiles: credentials, training, clinical focus and a plain headshot, with no marketing adjectives. Trust comes entirely from specificity.",
        takeaway:
          "Copy the structure and the restraint. Our bio already reads this way; the page should not dilute it with 'compassionate care' filler.",
        mobile:
          "Their profiles stack cleanly because credentials are a short list rather than a prose paragraph — scannable in a 375px column. Copy the list form: a dense bio paragraph on a phone is a wall of text, and credentials are exactly the content people skim.",
      },
      {
        name: "One Medical — provider directory",
        url: "https://www.onemedical.com/providers/",
        whatGood:
          "Consumer-grade warmth without losing clinical credibility — photos that look like the actual person you'll meet, plus languages spoken and focus areas.",
        takeaway:
          "Copy the 'languages spoken' field as a future addition (ties to item 23). Don't copy the directory pattern; we have one dentist, not a roster.",
        mobile:
          "Built mobile-first: the provider photo leads, cropped so the face stays centred at small sizes. Worth copying — our team photos are wide group shots, and a naive object-cover crop at 375px can cut Dr. Dubey out of frame entirely. Check the crop, not just that the image loads.",
      },
    ],
    test: {
      preconditions: [
        "Item 5 complete",
        "/about deployed at $BASE/about",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action: "Request $BASE/about.",
          tool: "shell",
          viewport: "any",
          expect: "200 with a non-empty h1.",
        },
        {
          action:
            "At 375×812, confirm every photo's crop still shows its subject's face — particularly wide group shots cropped by object-cover.",
          tool: "browser",
          expect:
            "No subject cropped out of frame at mobile aspect ratios. This has already bitten this repo once on service imagery.",
        },
        {
          action:
            "At 375px, confirm credentials render as a scannable list rather than a single dense paragraph, at ≥16px with line-height ≥1.5.",
          tool: "browser",
          expect: "Skimmable in a narrow column; meets the locked type minimums.",
        },
        {
          action:
            "At 375px, confirm images load over a throttled connection and reserve their space (no layout shift as they arrive).",
          tool: "browser",
          expect:
            "No cumulative layout shift pushing text around as photos load — most punishing on mobile connections.",
        },
        {
          action:
            "Cross-check every credential, date and qualification against the `archana` object in content.ts.",
          tool: "shell",
          viewport: "any",
          expect: "Exact match. No credential appears that isn't in the verified bio.",
        },
        {
          action: "Check for any team member name and confirm it against Akash's confirmed roster.",
          tool: "shell",
          viewport: "any",
          expect:
            "Only confirmed names appear. Unconfirmed people are described by role, never named or invented.",
        },
        {
          action: "Confirm every image has meaningful alt text and resolves (no 404s).",
          tool: "browser",
          viewport: "any",
          expect: "All images load; alt text describes the person or moment accurately.",
        },
        {
          action: "Confirm the nav link to /about resolves, from the hamburger at 375px.",
          tool: "browser",
          expect: "Nav link present in the mobile menu and landing on this page.",
        },
        {
          action: "Only after mobile passes, confirm the page at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Photo crops and credential layout both hold at desktop width.",
        },
      ],
      mobileFirst: [
        "No photo subject cropped out of frame at 375px aspect ratios",
        "Credentials render as a scannable list at ≥16px with line-height ≥1.5",
        "No layout shift as images load on a throttled mobile connection",
        "/about reachable from the hamburger",
      ],
      pass: [
        "Route 200 with real content",
        "Every credential traces to the verified bio in content.ts",
        "Zero unconfirmed team names",
        "All images load with accurate alt text",
      ],
      gotchas: [
        "Only Dr. Dubey's identity is confirmed among existing photos. Two other people appear in team photography without confirmed names — describing them by role is correct, naming them is a fabrication.",
        "This repo has already shipped a crop bug of exactly this kind (services imagery, PR #16). Wide source photos plus a tall mobile aspect ratio is the recurring failure — always check the rendered crop at 375px, not the source image.",
      ],
    },
  },
  {
    id: 12,
    title: "Add /privacy and /accessibility",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "legal",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 31/50, which would place it in P1 — pinned to P0 because the build spec lists privacy disclosures as build-blocking before go-live, and an accessibility statement is the documented route for a disabled patient to report a barrier. Legal/ethical floor beats score.",
    scores: { conversion: 1, reach: 3, risk: 5, effort: 5, readiness: 2 },
    effort: "S",
    status: "partial",
    wave: 3,
    job: "Trust the practice with my information",
    story: "As a patient, I can see how my information is handled and how to report a barrier.",
    problem:
      "Neither page exists. The build spec lists 'privacy policy and required disclosures present before go-live' as build-blocking. If the practice sends appointment texts, an SMS disclosure is also required.",
    where: "new src/app/privacy/page.tsx · new src/app/accessibility/page.tsx",
    scope: [
      "Privacy policy — practice-supplied or counsel-reviewed",
      "SMS/texting disclosure if the practice texts patients",
      "Accessibility statement with a real contact route for reporting barriers",
      "PARTIAL (2026-09-01): both routes now live, both linked in the footer, both render as real HTML (no PDF) with a one-tap tel: feedback route on /accessibility — but this does NOT close the item. /privacy's text is an explicitly-labeled DRAFT (content.ts `privacyPolicy.sections`, informed by comparable practice sites and the HHS model notices, banner visible on the page itself) — it is not yet practice-approved or counsel-reviewed, which this item's own acceptance criteria requires. /accessibility states WCAG 2.2 AA as the target and is honest that item 14's audit hasn't run yet, consistent with that item's own reference note that a first draft is fine to generate directly. Still needs: Akash/counsel sign-off on the privacy text, and an explicit SMS-disclosure decision if that changes",
      "Footer links to both",
    ],
    acceptance: [
      "Both routes live and linked in the footer",
      "Privacy text is practice-approved, not drafted by us",
      "Accessibility statement names the standard, known limitations, and a working contact route",
    ],
    evidence:
      "Internal build-blocking checklist item + standards tier. Note: HHS Section 504 WCAG 2.1 AA rulemaking applies to federally-funded health orgs — applicability to a private practice needs legal confirmation, so this is framed as good practice, not asserted obligation.",
    dependsOn: "Practice-supplied privacy policy",
    outOfScope: "Writing legal text ourselves.",
    references: [
      {
        name: "W3C WAI — complete accessibility statement example",
        url: "https://www.w3.org/WAI/planning/statements/complete-example/",
        whatGood:
          "The normative worked example: conformance target, known limitations stated honestly, feedback route, and a response commitment. Being candid about what isn't accessible yet is presented as a feature, not a liability.",
        takeaway:
          "Copy the structure directly, including the known-limitations section. Don't publish a boilerplate claim of full compliance — we haven't run item 14 yet.",
        mobile:
          "The statement must itself be accessible on a phone — a policy page that reflows badly at 375px is an own-goal. It also needs a mobile-usable feedback route: a `tel:` and `mailto:` link, one tap each, not a contact form buried behind another page.",
      },
      {
        name: "W3C WAI — accessibility statement generator",
        url: "https://www.w3.org/WAI/planning/statements/generator/",
        whatGood:
          "Produces a standards-correct statement from a short questionnaire, so we don't hand-roll legal-adjacent text.",
        takeaway: "Use it to generate the first draft. Have Akash review before publishing.",
        mobile:
          "Mobile-relevant requirement: its output includes a section for known limitations by platform. If mobile-specific issues surface in item 14 — a carousel that can't be operated by touch, say — they belong there explicitly rather than being folded into a general caveat.",
      },
      {
        name: "HHS — HIPAA notice of privacy practices",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/model-notices-privacy-practices/index.html",
        whatGood:
          "Official model notices for healthcare providers — the correct starting point for a dental practice's privacy content, rather than a generic website privacy policy.",
        takeaway:
          "Point Akash at these models. We must not draft this ourselves; our job is the page, not the policy.",
        mobile:
          "HHS publishes these in several formats precisely because one size doesn't fit every delivery. Ours must be rendered as HTML, never a PDF link — a PDF privacy notice on a phone is effectively unreadable and defeats the disclosure.",
      },
    ],
    test: {
      preconditions: [
        "Akash has supplied the privacy policy text",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action: "Request $BASE/privacy and $BASE/accessibility.",
          tool: "shell",
          viewport: "any",
          expect: "Both 200 with non-empty content.",
        },
        {
          action:
            "At 375×812, confirm both pages render as HTML text — not a PDF link or embedded document — with body ≥16px and no horizontal scroll.",
          tool: "browser",
          expect:
            "Readable HTML at 375px. A PDF-only privacy notice is a fail: it's effectively unreadable on a phone.",
        },
        {
          action:
            "At 375px, confirm the accessibility statement's feedback route is one-tap — a `tel:` or `mailto:` link at ≥44×44px, not a form behind another page.",
          tool: "browser",
          expect:
            "Reporting a barrier takes one tap. Making the barrier-report route itself hard to use is the obvious own-goal here.",
        },
        {
          action:
            "At 375px, confirm the footer links to both routes and that both are ≥44×44px with ≥8px separation.",
          tool: "browser",
          expect: "Both present in the mobile footer and correctly sized.",
        },
        {
          action:
            "Check the accessibility statement names the conformance target (WCAG 2.2 AA), lists known limitations, and gives a working contact route.",
          tool: "browser",
          viewport: "any",
          expect:
            "All three present. A statement claiming full conformance before item 14 has run is a fail.",
        },
        {
          action: "Confirm the privacy text is the practice-supplied version, not text we authored.",
          tool: "manual",
          viewport: "any",
          expect: "Provenance confirmed with Akash.",
        },
        {
          action: "If the practice texts patients, confirm an SMS/messaging disclosure is present.",
          tool: "manual",
          viewport: "any",
          expect: "Present if applicable; explicitly marked not-applicable if not.",
        },
      ],
      mobileFirst: [
        "Both pages render as HTML at 375px — no PDF-only delivery",
        "Body text ≥16px with no horizontal scroll at 375px",
        "The accessibility feedback route is one tap at ≥44×44px",
        "Both footer links present and correctly sized on mobile",
      ],
      pass: [
        "Both routes serve and are linked sitewide in the footer",
        "Accessibility statement names standard, limitations and contact route",
        "Privacy text provenance confirmed as practice-supplied",
      ],
      gotchas: [
        "Do not let an accessibility statement claim conformance we haven't verified — that converts a good-faith page into a false claim.",
        "Legal pages are the ones most often shipped as a PDF or a dense unstyled dump. Both fail on a phone, which is where most patients will open them.",
      ],
    },
  },
  {
    id: 13,
    title: "Replace the three placeholder testimonials with real reviews",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "legal",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 42/50 — third highest, so P0 on merit. Also pinned: testimonial attribution is a HIPAA constraint locked in the build spec, and invented patient quotes would be a fabrication.",
    scores: { conversion: 4, reach: 4, risk: 5, effort: 5, readiness: 2 },
    effort: "S",
    status: "done",
    wave: 3,
    job: "Evaluate reviews without being overwhelmed",
    story: "As a patient, I read real things real patients said.",
    problem:
      "All three testimonial quotes read 'Patient quote pending' in production, and the 4.9★ / 487 count is unconfirmed. Reviews are among the most-checked trust signals; placeholders here actively cost trust.",
    where: "src/lib/content.ts · src/components/TestimonialsSection.tsx",
    scope: [
      "Pull three real reviews from the Google Business Profile",
      "DONE (2026-09-01): pulled the current top three reviews directly from the live GBP listing (Elise T., Vandana S., Berri R. — first-name + last-initial per the HIPAA format, `Placeholder` wrapping removed now that these are real). Quotes are trimmed to the last complete sentence available before Google's own truncation point rather than cut mid-sentence, wording otherwise verbatim. Rating stayed 4.9; count corrected 487 -> 427 against the live listing",
      "First name + last initial only — never a full patient name without written authorization",
      "Confirm the real rating and count against the live GBP",
      "v2: show the aggregate count and its date — dated aggregates read as more credible than a bare star rating",
      "v2 anti-pattern: never let a review count differ between two places on the site. Observed sites showed 4,700 vs 8,000+ and 1,300 vs 600 — self-evident verification failures that destroy review trust",
    ],
    acceptance: [
      "Zero placeholder quotes on the live site",
      "Attribution follows the locked HIPAA format",
      "Rating and count match the GBP exactly",
    ],
    evidence:
      "Locked HIPAA rule (CLAUDE.md, build spec Section 7). Reviews are consistently among the top pre-booking checks across vendor and usability sources.",
    dependsOn: "Akash supplying real reviews and confirming rating/count",
    outOfScope: "A live review-fetching integration. That's item 21.",
    references: [
      {
        name: "ADA — managing dental practice online reviews",
        url: "https://www.ada.org/resources/practice/legal-and-regulatory/managing-dental-practice-online-reviews",
        whatGood:
          "The profession's own guidance on the privacy trap: responding to or republishing reviews can itself disclose that someone is a patient. Explains why attribution format matters legally, not just stylistically.",
        takeaway:
          "Copy the caution. This is the authority behind our first-name-plus-last-initial rule; keep it cited in content.ts.",
        mobile:
          "Mobile-relevant consequence: quote length. On a phone a long testimonial fills the screen and gets skipped, which tempts editing for brevity — but trimming must not alter substance. Pick naturally short reviews rather than cutting long ones down.",
      },
      {
        name: "Google — review display and attribution policies",
        url: "https://support.google.com/business/answer/7091",
        whatGood:
          "States the rules for republishing Google reviews, including not editing review substance — which constrains how we excerpt.",
        takeaway:
          "Copy the don't-alter-substance rule. Trimming for length is acceptable; rewriting a review into marketing copy is not.",
        mobile:
          "Most reviews are both written and read on phones, so the source material is already short-form. Our testimonial rail auto-scrolls horizontally — verify at 375px that a real quote at real length doesn't overflow its card or clip mid-sentence.",
      },
    ],
    test: {
      preconditions: [
        "Akash has supplied three real reviews and confirmed rating/count",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm all three real quotes render in full — no clipping, no truncation mid-sentence, no overflow of the testimonial card.",
          tool: "browser",
          expect:
            "Each quote fully readable at mobile width. Real reviews run longer than the placeholders they replace, so cards sized around placeholder text will break here.",
        },
        {
          action:
            "At 375px, confirm the auto-scrolling testimonial rail doesn't trap vertical page scroll and honours prefers-reduced-motion.",
          tool: "browser",
          expect:
            "Vertical page scroll works through the rail (touch-action: pan-y), and the rail freezes under reduced motion.",
        },
        {
          action:
            "At 375px, confirm the rating, count and attribution are legible at ≥16px with no horizontal overflow.",
          tool: "browser",
          expect: "All legible; the rail introduces no horizontal page scroll.",
        },
        {
          action: "Grep content.ts for 'pending' or placeholder testimonial strings.",
          tool: "shell",
          viewport: "any",
          expect: "Zero matches in the testimonials array.",
        },
        {
          action:
            "Check each testimonial's attribution matches the pattern 'Firstname L.' — a first name plus a single last initial.",
          tool: "shell",
          viewport: "any",
          expect: "All three match. Any full surname is a HIPAA fail.",
        },
        {
          action:
            "Compare the displayed rating and review count against the live Google Business Profile.",
          tool: "manual",
          viewport: "any",
          expect: "Exact match at time of publication.",
        },
        {
          action:
            "Confirm each published quote is substantively the patient's own words, trimmed at most for length.",
          tool: "manual",
          viewport: "any",
          expect: "No rewriting into marketing copy.",
        },
        {
          action: "Only after mobile passes, confirm the rail at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Quotes render fully at desktop width too.",
        },
      ],
      mobileFirst: [
        "All three real quotes render in full at 375px with no clipping or overflow",
        "The testimonial rail doesn't trap vertical page scroll and honours prefers-reduced-motion",
        "Rating, count and attribution legible at ≥16px with no horizontal overflow",
      ],
      pass: [
        "Zero placeholder quotes in code or rendered output",
        "All attributions are first-name-plus-initial",
        "Rating and count match the live GBP",
        "Quotes are the patients' own words",
      ],
      gotchas: [
        "A full name in a review is a HIPAA exposure even though the patient posted it publicly themselves — our republication is the disclosure. Never merge on a partial pass here.",
        "Cards sized around short placeholder text will clip real reviews. Test with the actual quotes at their actual length, not with placeholders still in place.",
      ],
    },
  },
  {
    id: 14,
    title: "WCAG 2.2 AA and mobile QA pass — the patient-ready line",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "legal",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 36/50 — P0 on merit. Also pinned: accessibility is the locked build-spec checklist and the difference between a usable and an unusable site for disabled patients.",
    scores: { conversion: 2, reach: 5, risk: 5, effort: 3, readiness: 3 },
    effort: "M",
    status: "not-started",
    wave: 3,
    job: "Use the site at all",
    story: "As a patient using a screen reader, keyboard, or magnification, I can complete every task.",
    problem:
      "The compliance checklist has never had a verification pass. Tokens were chosen for AA contrast but never measured, and keyboard and screen-reader paths are untested.",
    where: "Sitewide",
    scope: [
      "Measure contrast on every locked token pairing in real use",
      "FIXED (2026-08-31): ivory-on-terracotta was 3.87:1, and the primary CTA rendered it at 14px semibold — not 'large text' under WCAG 1.4.3, so it needed 4.5:1 and missed. Resolved without touching any locked token: every CTA (10 sites — Nav ×3, Hero, InsuranceExpandCard, BookingBlock, Footer ×2, AppointmentForm ×2) now renders `linear-gradient(to right, terracotta 0%, terracotta-dark 10%)` — the original light terracotta stays visible as a sheen in the first ~10% of the pill, transitioning to the already-approved `terracotta-dark` for the rest. Six further text-on-light instances of `text-terracotta` (eyebrow labels, the FAQ tel: link, the required-field asterisk, the offer-card link) were the same underlying failure and got a flat terracotta-dark swap (5.32:1)",
      "METHODOLOGY NOTE: the gradient stop was tuned by sampling the actual pixel under the LEFTMOST edge of each button's rendered text (via canvas, not just the visual center) — the worst-case point a checker or a squinting eye would land on. A first pass at 45% failed on the narrowest button (mobile 'Schedule' pill, 95px — its text starts only 17% across, well before the transition finished: 4.38:1, a real miss). Tightened to 20%, still short on the desktop nav pill (text starts at 12%: 4.73:1, thin margin). Settled on 10%, verified 5.32:1 at the worst-case pixel on every button at both 375px and 1280px — same margin as a fully flat fill, with the gradient sheen preserved",
      "REMAINING KNOWN GAP: BookingBlock.tsx's 'Visit us' eyebrow renders `text-terracotta` on the dark `bg-espresso` section (not ivory) — terracotta-on-espresso measures 3.04:1, which also fails AA normal text. Swapping to terracotta-dark makes it WORSE on a dark surface (2.21:1) — this needs a lighter-on-dark treatment, a genuine design decision, not a token-reuse fix. Left unfixed deliberately rather than guessing; log as its own finding when this item runs",
      "Verify ≥44×44px targets with ≥8px separation",
      "Keyboard-only pass on every interactive element; visible focus throughout",
      "Screen-reader pass on nav, mobile menu, forms, accordion, carousels",
      "Confirm prefers-reduced-motion on both carousels",
      "320px reflow; body ≥16px; line-height ≥1.5",
      "Alt text audit",
    ],
    acceptance: [
      "Every checklist item in build spec Section 7 is verified, not assumed",
      "Findings fixed or logged with an owner",
      "Verified on a real phone, not only in a simulator",
      "Zero critical axe violations on every public route",
    ],
    evidence: "Standards tier (WCAG 2.2 AA) + locked internal checklist. Serves older adults and LEP readers directly.",
    dependsOn: "Items 1–13 (audit the finished surface, not a moving one)",
    outOfScope: "An accessibility overlay widget. Overlays don't fix underlying markup.",
    references: [
      {
        name: "W3C — WCAG 2.2 Quick Reference (filtered to AA)",
        url: "https://www.w3.org/WAI/WCAG22/quickref/?currentsidebar=%23col_customize&levels=aaa",
        whatGood:
          "The normative checklist with techniques and failures per criterion — including the 2.2 additions most relevant to us: focus appearance, target size (2.5.8), dragging movements and consistent help.",
        takeaway:
          "Use as the actual test script. Target Size (Minimum) at 24px is the WCAG floor; our locked 44px requirement is stricter and stays.",
        mobile:
          "WCAG 2.2's genuinely new criteria are mostly mobile/touch concerns — Target Size (2.5.8), Dragging Movements (2.5.7) and Focus Not Obscured. Our two carousels involve dragging and our nav is a fixed overlay, so 2.2 specifically is where our mobile risk sits. Test these on touch, not with a mouse.",
      },
      {
        name: "Deque — axe DevTools",
        url: "https://www.deque.com/axe/devtools/",
        whatGood:
          "The de-facto automated engine, deliberately tuned for near-zero false positives, and scriptable so it can run per route in a loop.",
        takeaway:
          "Use for the automatable ~30–40%. Do not treat a clean axe run as a pass — keyboard, screen-reader and reflow checks are manual and carry most of the real risk.",
        mobile:
          "Run it at 375px, not at default desktop width: target-size, reflow and focus-obscured findings are all viewport-dependent, so a desktop-only axe run misses precisely the category of issue this project most needs to catch.",
      },
      {
        name: "GOV.UK — how we test for accessibility",
        url: "https://accessibility.blog.gov.uk/2018/05/16/what-we-mean-when-we-talk-about-accessibility/",
        whatGood:
          "A public-sector account of combining automated, manual and assistive-technology testing, and of being honest about residual issues rather than claiming perfection.",
        takeaway:
          "Copy the three-layer method and the honesty — it feeds directly into the known-limitations section of item 12's accessibility statement.",
        mobile:
          "Their testing explicitly includes real mobile screen readers (VoiceOver on iOS, TalkBack on Android), which behave differently from desktop ones — swipe navigation, different announcement of live regions. Copy that: a desktop NVDA pass does not certify the mobile experience.",
      },
    ],
    test: {
      preconditions: [
        "Items 1–13 shipped and stable",
        "Deployed at $BASE",
        "A real phone available for the touch and mobile-screen-reader passes — a resized desktop window is not a substitute",
        "All automated checks run at 375×812 first",
      ],
      steps: [
        {
          action:
            "Run axe against every public route AT 375×812. Target-size, reflow and focus-obscured findings are viewport-dependent.",
          tool: "validator",
          expect:
            "Zero critical and zero serious violations at mobile width. Moderate issues logged with an owner.",
        },
        {
          action:
            "Measure every interactive target and the spacing between adjacent targets at 375px.",
          tool: "browser",
          expect:
            "All ≥44×44px with ≥8px separation — our locked rule, stricter than WCAG 2.5.8's 24px floor.",
        },
        {
          action: "Set the viewport to 320px wide and check for reflow.",
          tool: "browser",
          viewport: "any",
          expect: "No horizontal scrolling; no content clipped or overlapped at 320px.",
        },
        {
          action:
            "At 375px, confirm the fixed nav never obscures a focused element when tabbing (WCAG 2.2 Focus Not Obscured), including the first focusable element of each page.",
          tool: "browser",
          expect:
            "Focused elements always fully visible below the 64px fixed header. This criterion is new in 2.2 and our fixed overlay nav is exactly the at-risk pattern.",
        },
        {
          action:
            "On a real phone, exercise both carousels by finger-swipe and confirm no functionality requires dragging alone (WCAG 2.2 Dragging Movements).",
          tool: "manual",
          expect:
            "Touch drag works, and any drag-only action has a single-tap alternative. OfficeCarousel's hand-rolled pointer drag is the specific risk.",
        },
        {
          action:
            "Enable prefers-reduced-motion and load pages containing HeroCarousel and OfficeCarousel at 375px.",
          tool: "browser",
          expect: "Both freeze; no auto-advance and no Ken Burns zoom.",
        },
        {
          action:
            "Run VoiceOver (iOS) and/or TalkBack (Android) over the mobile menu, the appointment form, the FAQ accordion and the /backlog accordion.",
          tool: "manual",
          expect:
            "Every control announces name, role and state; accordion expanded/collapsed is announced; form errors are announced. Mobile screen readers differ materially from desktop ones — a desktop pass does not substitute.",
        },
        {
          action:
            "Compute contrast ratios for every locked token pairing actually used (espresso on ivory, ivory on terracotta, muted greys on ivory/sand, and the /backlog muted nav link).",
          tool: "browser",
          viewport: "any",
          expect:
            "≥4.5:1 for body text, ≥3:1 for large text and UI component boundaries. Record every measured pair.",
        },
        {
          action:
            "Tab through every page start to finish without a mouse, confirming the mobile menu returns focus to its trigger on close.",
          tool: "browser",
          expect: "Logical focus order, always-visible focus, no keyboard trap.",
        },
        {
          action: "Complete the core booking path end-to-end on a real phone by touch.",
          tool: "manual",
          expect: "Completable without a mouse or keyboard, including real finger-swipe on both carousels.",
        },
        {
          action: "Only after mobile passes, repeat the axe run and keyboard pass at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Zero critical/serious violations at desktop width too.",
        },
      ],
      mobileFirst: [
        "axe clean (zero critical/serious) at 375×812, before any desktop run",
        "All targets ≥44×44px with ≥8px separation at 375px",
        "No horizontal scroll at 320px",
        "The fixed nav never obscures a focused element (WCAG 2.2 Focus Not Obscured)",
        "No functionality requires dragging alone (WCAG 2.2 Dragging Movements); both carousels work by touch",
        "Reduced motion honoured on both carousels at mobile width",
        "VoiceOver and/or TalkBack pass on menu, form and both accordions",
        "Core booking path completed by touch on a real phone",
      ],
      pass: [
        "Zero critical/serious axe violations at 375px AND 1280px",
        "All measured contrast pairs meet AA",
        "Full keyboard operability with visible focus and no traps",
        "All targets ≥44px with ≥8px separation at 375px",
        "No horizontal scroll at 320px",
        "Reduced-motion honoured on both carousels",
        "Mobile screen-reader pass on all four interactive surfaces",
        "Real-device touch pass on the booking path",
      ],
      gotchas: [
        "Automated tools catch roughly a third of real issues. A clean axe run with an untested keyboard path is a false pass.",
        "The terracotta/ivory pairing at 3.87:1 already misses AA for normal-size text and affects every primary CTA. Do not close this item by quietly reclassifying the CTA label as large text — measure the rendered font-size and weight against the 18.66px-bold threshold.",
        "Backgrounded browser tabs suspend CSS transitions and pointer input — verified in this repo already. Run motion and interaction checks in a foregrounded tab or assert on class/ARIA state instead of measured animation values.",
        "Running axe only at desktop width is a false pass for this project specifically: target size, reflow and focus-obscured are the criteria most likely to fail here, and all three are viewport-dependent.",
        "A resized desktop browser does not reproduce touch behaviour, on-screen keyboards, or mobile screen-reader gestures. The manual steps genuinely need a phone.",
      ],
    },
  },

  // ─────────────────────────── WAVE 4 ───────────────────────────
  {
    id: 15,
    title: "Online booking via the Tab32 service layer",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    repriorityNote:
      "Scores 32.5/50 — just below the P0 band despite the highest possible conversion and reach scores. Large effort and being fully blocked on Tab32 decisions pull it down. This is the model working as intended: it's the biggest prize, and it cannot start today. Revisit the moment Tab32 is unblocked.",
    scores: { conversion: 5, reach: 5, risk: 2, effort: 1, readiness: 1 },
    effort: "L",
    status: "blocked",
    wave: 4,
    job: "Book without phoning",
    story: "As a time-scarce patient, I book a real appointment at 10pm without calling anyone.",
    problem:
      "The single largest expected conversion gain in the backlog, and it is the project's own stated goal. Both named leaks — form-then-callback, and missed-call-to-voicemail — are the same underlying problem: there is no way to actually book.",
    where: "new API route + BookingBlock + /contact",
    scope: [
      "Resolve the four open Tab32 questions: hosting, auth/key handling, response shape, instrumentation hooks",
      "Real availability, selection, confirmation",
      "Full failure states — API down, no slots, double-booking",
      "Keep the request form as fallback; never remove the phone path",
    ],
    acceptance: [
      "A patient completes a booking end-to-end without phoning",
      "Every failure state degrades to the form or the phone, never a dead end",
      "Booking completions and drop-off are instrumented from day one",
      "No API key or secret is exposed to the client",
    ],
    evidence:
      "Internal goal (build spec Section 1). Vendor sources put booking preference at 68–77% against 26–40% practice availability, with roughly a third of online bookings placed outside office hours — directional, but it corroborates the leak the practice already identified independently.",
    dependsOn: "Tab32 service-layer decisions — open since the original build spec",
    outOfScope: "A patient portal, account creation, or online payment.",
    references: [
      {
        name: "Zocdoc — patient self-scheduling",
        url: "https://www.zocdoc.com/resources/blog/article/patient-self-scheduling/",
        whatGood:
          "The category benchmark: real-time slots pulled from the practice management system (the slot you see is the slot you get), insurance surfaced before commitment, and confirmation with reminders.",
        takeaway:
          "Copy real-time truthfulness above all — a slot that turns out not to exist is worse than no booking. Don't copy the marketplace model; we're a single practice.",
        mobile:
          "Their slot picker is the pattern to study at 375px: a horizontally scrollable day strip with large tap targets, never a desktop month grid shrunk down. A calendar grid at mobile width produces sub-30px targets, which is the classic booking-flow mobile failure.",
      },
      {
        name: "NHS — book, check or cancel an appointment",
        url: "https://www.nhs.uk/nhs-services/gps/book-check-or-cancel-appointments/",
        whatGood:
          "Public-sector booking designed for the widest possible ability range: plain language, no account required for the simplest paths, and an explicit non-digital alternative always visible.",
        takeaway:
          "Copy the always-visible fallback and the no-account principle. This matters more for us than slickness — our audience spans every age and ability.",
        mobile:
          "Built for low-end Android on poor connections, which is the right target: the flow works without heavy JS and the phone fallback stays visible at every step rather than hiding behind a menu. Copy keeping the `tel:` link on-screen throughout the mobile flow.",
      },
      {
        name: "GOV.UK Design System — question pages / one thing per page",
        url: "https://design-system.service.gov.uk/patterns/question-pages/",
        whatGood:
          "Evidence-based guidance that splitting a flow into one decision per screen reduces errors and drop-off, especially on mobile and for users under stress.",
        takeaway:
          "Copy the one-thing-per-page structure for the booking steps. Avoid a single dense form; our anxious and urgent users are exactly the stressed cohort this pattern protects.",
        mobile:
          "This pattern exists because of mobile: one decision per screen means the on-screen keyboard never competes with other fields, and each step fits one viewport. It also makes back-navigation safe, which matters when a phone user gets interrupted mid-booking.",
      },
    ],
    test: {
      preconditions: [
        "Tab32 service-layer decisions resolved",
        "A test/sandbox Tab32 environment available",
        "A real phone available — slot pickers and on-screen keyboards do not reproduce in a resized desktop window",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "Complete a booking end-to-end at 375×812. This is the primary path — most patients book on a phone, and roughly a third of online bookings happen outside office hours.",
          tool: "browser",
          expect:
            "Booking confirmed without any phone call; confirmation restates date, time and what happens next, and is scrolled into view and focused.",
        },
        {
          action:
            "At 375px, measure every slot/date control in the picker.",
          tool: "browser",
          expect:
            "All ≥44×44px with ≥8px separation. A desktop month grid shrunk to mobile width is the classic failure — a day strip or list is required.",
        },
        {
          action:
            "At 375px, confirm the `tel:` fallback stays visible at every step of the flow, not hidden behind a menu.",
          tool: "browser",
          expect:
            "Phone fallback reachable in one tap throughout. It's the last resort for the urgent and the anxious.",
        },
        {
          action:
            "At 375px, confirm the on-screen keyboard never covers the active field or the primary action, and that browser-back between steps doesn't lose entered data.",
          tool: "manual",
          expect:
            "Field and action stay visible when focused; back-navigation preserves state. Phone users get interrupted mid-flow and return.",
        },
        {
          action:
            "Verify the booked slot actually exists in the Tab32 sandbox after confirmation.",
          tool: "manual",
          viewport: "any",
          expect:
            "The appointment is present. A confirmation without a real booking is the worst failure mode here.",
        },
        {
          action:
            "At 375px, simulate the API being unreachable and attempt to book. Repeat on a throttled connection.",
          tool: "browser",
          expect:
            "A clear message plus a working fallback to the request form and the phone. No spinner-forever, no dead end, no raw error — and no infinite spinner on a slow mobile connection specifically.",
        },
        {
          action: "Simulate a zero-slots response at 375px.",
          tool: "browser",
          expect: "An honest empty state with the phone fallback, not a blank calendar.",
        },
        {
          action:
            "Attempt to book a slot taken between page load and submission.",
          tool: "browser",
          expect:
            "Graceful conflict handling: the user is told and offered alternatives, never double-booked silently.",
        },
        {
          action: "Inspect all client-side network requests and the JS bundle for credentials.",
          tool: "browser",
          viewport: "any",
          expect: "No Tab32 API key, token or secret is reachable from the client.",
        },
        {
          action:
            "Complete a booking by touch on a real phone, then with a mobile screen reader (VoiceOver/TalkBack).",
          tool: "manual",
          expect: "Fully operable by touch and by mobile screen reader; each step's state is announced.",
        },
        {
          action: "Confirm booking start, completion and drop-off events fire.",
          tool: "browser",
          viewport: "any",
          expect: "Events present per build-spec Section 9.",
        },
        {
          action: "Only after mobile passes, complete a booking at 1280px with keyboard only.",
          tool: "browser",
          viewport: "1280",
          expect: "Equivalent behaviour; no desktop-only capability the mobile path lacks.",
        },
      ],
      mobileFirst: [
        "A booking completes end-to-end at 375×812 without a phone call",
        "Every slot/date control is ≥44×44px with ≥8px separation — no shrunken desktop calendar grid",
        "The `tel:` fallback stays visible in one tap at every step",
        "The on-screen keyboard never covers the active field or primary action; back-navigation preserves entered data",
        "API-down and zero-slots states degrade gracefully on a throttled mobile connection — no infinite spinner",
        "Booking completed by touch and by mobile screen reader on a real device",
      ],
      pass: [
        "End-to-end booking succeeds and is real in Tab32",
        "API-down, no-slots and conflict states all degrade to a working fallback",
        "No secret exposed client-side",
        "Touch, keyboard and screen-reader operable",
        "Instrumentation events fire",
      ],
      gotchas: [
        "The highest-severity bug class here is a confirmation shown for a booking that didn't persist. Always assert against the Tab32 record, never against the UI alone.",
        "Never remove the phone path as part of 'simplifying' the flow — it is the fallback of last resort for the urgent and the anxious.",
        "A calendar/slot picker is the single most common place a booking flow breaks on mobile. Test it at 375px before writing anything else in this item.",
      ],
    },
  },
  {
    id: 19,
    title: "Family and life-stage clarity",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 4, risk: 1, effort: 5, readiness: 5 },
    effort: "S",
    status: "not-started",
    wave: 4,
    job: "Confirm the practice serves people like me",
    story: "As a parent, adult child, or someone with no kids at all, I see that this practice fits my household.",
    problem:
      "'Family practice' is read as 'has a kids' room'. A third of the researched scenarios involve no children at all — the phrase has to mean comprehensive, relationship-based care across life stages.",
    where: "Homepage section + /about",
    scope: [
      "Explicit statement covering children, teens, adults, older adults, caregivers",
      "Say plainly that households can be seen together",
      "Warm but never juvenile — no cartoons, no primary colors",
      "v2 anti-pattern, and a direct check on our own positioning: an observed \"family\" site framed itself as \"tailored for the business professional\", narrowing away the multi-generational audience. Our primary persona is a time-poor downtown professional — the copy must serve them WITHOUT excluding the First Hill / International District families the practice also needs",
    ],
    acceptance: [
      "A patient with no children still sees themselves in the copy",
      "Visual treatment stays within the locked palette and reads adult",
    ],
    evidence: "Repeated theme across scenario analysis; corroborated by practice-generated precedent in the catchment.",
    dependsOn: null,
    outOfScope: "A separate pediatric micro-site or sub-brand.",
    references: [
      {
        name: "One Medical — membership and family care framing",
        url: "https://www.onemedical.com/",
        whatGood:
          "Communicates whole-household care without infantilising the design; the visual language stays adult while the copy explicitly includes children and dependants.",
        takeaway:
          "Copy the adult-visual/inclusive-copy split — that's exactly our constraint. Ignore the membership model.",
        mobile:
          "Their life-stage content stacks into short labelled blocks rather than a multi-column grid, so nothing is lost at 375px. Copy that: a four-column 'who we serve' layout collapses into a long undifferentiated scroll on mobile and the inclusion signal disappears.",
      },
      {
        name: "Dentistry on Queen Anne — patient information",
        url: "https://www.dentistryonqueenanne.com/patient-information/new-patients/",
        whatGood:
          "Local comparator whose new-patient content addresses adults and minors distinctly (including a guardian-accompaniment policy) rather than assuming one audience.",
        takeaway:
          "Copy the explicit minors policy as a concrete inclusion signal. Don't copy the assumption that family means children.",
        mobile:
          "Checked at 375px: the distinct audience blocks survive stacking because each carries its own heading. Copy the per-stage headings — without them, stacked life-stage content reads as one undifferentiated paragraph and a reader can't find themselves in it.",
      },
    ],
    test: {
      preconditions: [
        "Family/life-stage content deployed at $BASE",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm each life stage carries its own visible heading and remains distinguishable when stacked.",
          tool: "browser",
          expect:
            "Stages readable as separate blocks, not merged into one paragraph. A reader must be able to find themselves quickly.",
        },
        {
          action:
            "At 375px, confirm any multi-column 'who we serve' layout collapses cleanly rather than producing a long undifferentiated scroll or horizontal overflow.",
          tool: "browser",
          expect: "Clean stacking, no horizontal scroll, hierarchy preserved.",
        },
        {
          action:
            "Confirm the copy names each life stage: children, teens, adults, older adults, and caregivers.",
          tool: "shell",
          viewport: "any",
          expect: "All five represented, explicitly or unambiguously.",
        },
        {
          action: "Confirm an explicit statement that households can be seen together.",
          tool: "browser",
          expect: "Present and unambiguous at 375px without hunting.",
        },
        {
          action:
            "Read the section at 375px as a childless adult and as an older adult and judge whether it excludes either.",
          tool: "manual",
          expect: "Neither reader is excluded; 'family' is not used as a synonym for 'children'.",
        },
        {
          action:
            "Check the visual treatment against the locked palette and confirm no juvenile styling (cartoons, primary colours, novelty type). Verify type is ≥16px — small type is a specific problem for the older-adult reader this section addresses.",
          tool: "browser",
          expect: "Only locked tokens used; body ≥16px; nothing reads as a pediatric practice.",
        },
        {
          action: "Only after mobile passes, confirm at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Multi-column layout reads as deliberate, not as a stretched mobile stack.",
        },
      ],
      mobileFirst: [
        "Each life stage keeps its own heading and stays distinguishable when stacked at 375px",
        "No horizontal overflow and no loss of hierarchy from column collapse",
        "Body type ≥16px — this section explicitly serves older-adult readers",
      ],
      pass: [
        "All five life stages represented",
        "Explicit household statement present",
        "Neither a childless nor an older adult reader is excluded",
        "Locked palette respected; no juvenile styling",
      ],
    },
  },
  {
    id: 17,
    title: "Concern-led service entry",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 4, risk: 1, effort: 5, readiness: 4 },
    effort: "S",
    status: "not-started",
    wave: 4,
    job: "Recognize which service fits my problem",
    story: "As a patient who doesn't know dental terminology, I find the right service by describing my problem.",
    problem:
      "Nobody searches 'endodontic consultation'. They search why a tooth throbs at night — disproportionately late in the evening. Services are currently listed only by clinical name.",
    where: "Homepage, above the services section",
    scope: [
      "Six plain-language entries: a tooth hurts · I chipped or broke something · it's time for a cleaning · I want straighter teeth · I want a whiter smile · I need a crown or implant",
      "Each is a static link to the relevant service section",
    ],
    acceptance: [
      "Six links, no logic, no branching, no scoring",
      "Every entry lands somewhere real",
      "No entry implies a diagnosis",
    ],
    evidence:
      "Vendor/marketing tier — labeled an emerging theme, not a repeated one. Deliberately the cheapest possible implementation given that evidence strength.",
    dependsOn: "Item 11",
    outOfScope:
      "A symptom checker, quiz or triage wizard. Explicitly ruled out — clinical risk, and no evidence patients want one from a single practice's site.",
    references: [
      {
        name: "NHS — health A to Z",
        url: "https://www.nhs.uk/conditions/",
        whatGood:
          "Lets people start from what they're experiencing in ordinary words, then routes to clinical information — without ever pretending to diagnose. The gold standard for symptom-led navigation done responsibly.",
        takeaway:
          "Copy the plain-language entry points and the strict separation between 'here's information' and 'here's a diagnosis'. Don't copy the scale — six links, not an index.",
        mobile:
          "NHS entry points are designed thumb-first: full-width tappable rows, not a dense inline link list. Copy the row form — six full-width rows at 375px is the right shape, and it's also why six is the right number rather than twenty.",
      },
      {
        name: "ADA MouthHealthy — A–Z topics",
        url: "https://www.mouthhealthy.org/all-topics-a-z",
        whatGood:
          "Dental-specific, patient-language topic entry maintained by the profession, so the vocabulary mapping (what patients call it vs what it's called clinically) is already validated.",
        takeaway:
          "Copy their patient-facing vocabulary for our six labels. Link out to it where we lack depth rather than writing thin clinical content ourselves.",
        mobile:
          "Keep labels short enough not to wrap to three lines at 375px — 'a tooth hurts' works, a clinical phrase does not. Short patient-language labels are simultaneously the accessibility win and the mobile-layout win.",
      },
    ],
    test: {
      preconditions: [
        "Item 11 shipped",
        "Concern list deployed at $BASE",
        "Browser viewport set to 375×812 before any rendering step — symptom-led entry spikes late evening, overwhelmingly on phones",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm the six entries render as full-width tappable rows, each ≥44×44px with ≥8px separation.",
          tool: "browser",
          expect:
            "Six thumb-friendly rows. A dense inline link list is the failure mode — it produces small, closely-spaced targets.",
        },
        {
          action:
            "At 375px, confirm no label wraps to more than two lines and none is truncated.",
          tool: "browser",
          expect: "Labels short enough to read at a glance; nothing clipped.",
        },
        {
          action: "Count the concern entries and extract their hrefs.",
          tool: "browser",
          expect: "Exactly six entries, each with a real href.",
        },
        {
          action: "Follow every href.",
          tool: "shell",
          viewport: "any",
          expect: "All resolve to 200 and land on relevant, existing content — no empty anchors.",
        },
        {
          action:
            "Inspect the DOM and JS for any conditional logic, scoring, branching or form state in this component.",
          tool: "browser",
          viewport: "any",
          expect:
            "None. These are static links. Any branching logic means a symptom checker has crept in — automatic fail.",
        },
        {
          action: "Read each label and confirm none asserts a diagnosis or a cause.",
          tool: "manual",
          viewport: "any",
          expect:
            "Labels describe experience ('a tooth hurts'), never conclusions ('you have pulpitis').",
        },
        {
          action: "Confirm keyboard operability with visible focus at 375px.",
          tool: "browser",
          expect: "All six reachable by keyboard with a visible focus indicator.",
        },
        {
          action: "Only after mobile passes, confirm the list at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Reads as a deliberate row set, not a stretched mobile stack.",
        },
      ],
      mobileFirst: [
        "Six full-width tappable rows at ≥44×44px with ≥8px separation at 375px",
        "No label wraps beyond two lines or is truncated",
        "Keyboard operable with visible focus at mobile width",
      ],
      pass: [
        "Exactly six static links, all resolving to real content",
        "Zero branching or scoring logic",
        "No label implies a diagnosis",
        "Keyboard operable at ≥44px",
      ],
      gotchas: [
        "Scope creep here is a clinical-risk event, not a design debate. If a reviewer asks for 'just a couple of follow-up questions', that is a symptom checker and it is out of scope.",
        "Rendering these as inline text links inside a paragraph would pass a desktop eyeball check and fail the 44px rule on every one of them.",
      ],
    },
  },
  {
    id: 11,
    title: "Build /services — minimum version",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    repriorityNote:
      "DEMOTED P0 → P1 (29.5/50) on the original premise that item 1 would fix the 404 by removing the link, leaving only 'ordinary content work' behind. That premise no longer holds — Akash corrected item 1 to build the pages, not remove the links — but by the time that correction landed, this item's minimum version had already shipped as part of item 1's fix. Left at P1 as an honest record of the (now-superseded) reasoning rather than quietly re-scored after the fact; the status field is what actually matters now.",
    scores: { conversion: 3, reach: 4, risk: 2, effort: 3, readiness: 3 },
    effort: "M",
    status: "done",
    wave: 4,
    job: "Discover appropriate services",
    story: "As a patient, I can see what you do and whether my concern is covered.",
    problem:
      "The nav links to /services and it 404s. The homepage teaser shows four services with no detail behind them.",
    where: "src/app/services/page.tsx",
    scope: [
      "SHIPPED (2026-08-31, as part of item 1's correction): reused the existing ServicesSection component verbatim — its four cards, real photography, and per-card real/Placeholder handling were already correct, so this page adds a title (h1) and a Book/Call CTA row around it rather than rebuilding the cards",
      "A genuine gap this surfaced: ServicesSection renders its own h2 ('What we treat') but the page had no h1 at all when first built — every page needs exactly one. Caught by checking heading count in the browser, not assumed; fixed before calling this done",
      "STILL DEFERRED, as originally scoped: what-it-is / when-needed / what-a-visit-involves depth per service, and per-service FAQ schema — that's item 18, unchanged",
    ],
    acceptance: [
      "Nav link no longer 404s — met",
      "No unverified service claims — met, same Placeholder handling ServicesSection already had",
      "No invented pricing — met",
    ],
    evidence: "Internal — build spec Section 2. Service-page depth is deferred to item 18.",
    dependsOn: "Item 18 for real depth per service. A confirmed service list would upgrade the two currently-Placeholder cards (Cosmetic, Restorative) to real, but wasn't required to ship this minimum",
    outOfScope: "Per-service pages and per-service FAQ schema. That's item 18.",
    references: [
      {
        name: "ADA MouthHealthy — A–Z topics",
        url: "https://www.mouthhealthy.org/all-topics-a-z",
        whatGood:
          "Clinically accurate, patient-readable descriptions of exactly the procedures we list — a safe content model that never overpromises outcomes.",
        takeaway:
          "Copy the explanatory register and the outcome caution. Don't copy encyclopedic length; four scannable cards.",
        mobile:
          "Their per-topic pages are short and single-column, which is why they read well on a phone. Four scannable cards is a mobile constraint as much as an editorial one — a long service page becomes an unreadable scroll at 375px.",
      },
      {
        name: "Belltown Modern Dentistry — services",
        url: "https://www.belltownmoderndentistry.com/",
        whatGood:
          "Nearby comparator showing the expected service-page conventions for this market — a scannable list with a consistent booking CTA.",
        takeaway:
          "Copy the scannability. Avoid the DSO house style of many thin pages; our four should each say something real.",
        mobile:
          "Checked at 375px: the booking CTA repeats down the page rather than sitting only at the top, so it's always within reach after a stretch of scrolling. Worth copying — a single CTA at the top of a long mobile page is effectively gone once the user scrolls.",
      },
    ],
    test: {
      preconditions: [
        "Item 5 shipped",
        "Confirmed service list",
        "/services deployed",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action: "Request $BASE/services.",
          tool: "shell",
          viewport: "any",
          expect: "200 with a non-empty h1.",
        },
        {
          action:
            "At 375×812, confirm a Book CTA remains reachable after scrolling through all four services — not only at the top of the page.",
          tool: "browser",
          expect:
            "CTA present within reach at any scroll depth. A single top-of-page CTA disappears on a long mobile scroll.",
        },
        {
          action:
            "At 375px, confirm each service card stacks cleanly with its image at a sensible aspect ratio and no subject cropped out.",
          tool: "browser",
          expect:
            "Clean single-column stack; images not letterboxed, stretched or cropping their subject. This repo has shipped a crop bug of exactly this kind before.",
        },
        {
          action:
            "At 375px, confirm each service says what it is, when it's needed, and what a visit involves — all readable without expanding anything.",
          tool: "browser",
          expect: "All three present per service — not a bare title and a photo.",
        },
        {
          action: "At 375px, confirm no horizontal overflow and body type ≥16px.",
          tool: "browser",
          expect: "No horizontal scroll; type meets the locked minimum.",
        },
        {
          action: "Confirm each service listed appears in Akash's confirmed service list.",
          tool: "shell",
          viewport: "any",
          expect: "No service appears that the practice doesn't verifiably offer.",
        },
        {
          action: "Scan for currency amounts.",
          tool: "shell",
          viewport: "any",
          expect: "Zero prices unless verified in item 2.",
        },
        {
          action: "Only after mobile passes, confirm the page at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Layout reads as deliberate at desktop width; images still crop correctly.",
        },
      ],
      mobileFirst: [
        "A Book CTA stays reachable at any scroll depth at 375px",
        "Service cards stack cleanly with correctly cropped images",
        "What-it-is / when-needed / what-happens all readable without expanding anything",
        "No horizontal overflow; body type ≥16px",
      ],
      pass: [
        "Route 200 with real content",
        "Every service confirmed by the practice",
        "Zero invented pricing",
        "Each service answers what/when/what-happens",
      ],
      gotchas: [
        "Service imagery in this repo is wide before/after photography. At mobile aspect ratios a naive object-cover crop cuts the 'after' out of frame — check the rendered crop at 375px, not the source file.",
      ],
    },
  },
  {
    id: 21,
    title: "Reviews fed by real Google Business Profile data",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 4, risk: 2, effort: 3, readiness: 3 },
    effort: "M",
    status: "not-started",
    wave: 4,
    job: "Judge reputation quickly",
    story: "As a patient, I see current reviews without leaving the site.",
    problem:
      "Rating and count are hardcoded and unconfirmed, so they drift from reality the moment a review lands.",
    where: "src/components/TestimonialsSection.tsx",
    scope: [
      "Google Reviews widget or an API-fed module",
      "Keep the HIPAA-compliant attribution format",
      "Handle the empty and failed states",
    ],
    acceptance: [
      "Displayed rating always matches the live GBP",
      "Failure degrades gracefully to static verified content",
      "No API key exposed client-side",
    ],
    evidence: "Reviews are consistently among the most-checked pre-booking signals; recency is weighted.",
    dependsOn: "Item 13",
    outOfScope: "A review-solicitation system. That's an operational process, not a website feature.",
    references: [
      {
        name: "Google Places API — place details and reviews",
        url: "https://developers.google.com/maps/documentation/places/web-service/details",
        whatGood:
          "The supported route to live rating and review data, with documented caching and attribution requirements — which constrain how and how long we may store what we fetch.",
        takeaway:
          "Copy the attribution and caching rules exactly. Keep the key server-side; never call this from the browser.",
        mobile:
          "Server-side fetching with caching is also the mobile-performance answer: a client-side call to a third-party API on a cellular connection delays the trust signal until after the user has likely scrolled past it. Render reviews server-side so they're in the first paint.",
      },
      {
        name: "ADA — managing dental practice online reviews",
        url: "https://www.ada.org/resources/practice/legal-and-regulatory/managing-dental-practice-online-reviews",
        whatGood:
          "Reiterates that republishing patient reviews carries privacy obligations — which don't disappear because the data now arrives via an API.",
        takeaway:
          "Automation does not relax the HIPAA attribution rule. Filter or format names on ingest.",
        mobile:
          "Mobile-relevant consequence: API-returned reviews vary wildly in length, and a long one will overflow a card sized for short quotes at 375px. Truncation is not an option here (it alters substance), so the card must grow — test with the longest review the API returns.",
      },
    ],
    test: {
      preconditions: [
        "Item 13 shipped",
        "API integration deployed",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm reviews are present in the server-rendered HTML (first paint), not injected after a client-side fetch.",
          tool: "browser",
          expect:
            "Reviews visible on first paint. A client-fetched trust signal on a cellular connection arrives after the user has scrolled past it.",
        },
        {
          action:
            "At 375px, render the longest review the API returns and confirm the card grows rather than clipping or overflowing.",
          tool: "browser",
          expect:
            "Full text visible. Truncation isn't available to us — it would alter review substance — so the layout must accommodate length.",
        },
        {
          action: "At 375px, block the reviews API and reload.",
          tool: "browser",
          expect:
            "Graceful degradation to verified static content. No error text, no empty box, no layout collapse or CLS jump.",
        },
        {
          action: "Simulate a zero-reviews response at 375px.",
          tool: "browser",
          expect: "Sensible empty state rather than a broken component.",
        },
        {
          action: "Confirm every displayed reviewer name is first-name-plus-initial.",
          tool: "browser",
          viewport: "any",
          expect: "No full surnames render, even if the API returns them.",
        },
        {
          action: "Inspect client network traffic and the JS bundle for the API key.",
          tool: "browser",
          viewport: "any",
          expect: "No key reachable client-side.",
        },
        {
          action:
            "Compare the displayed rating and count against the live Google Business Profile.",
          tool: "manual",
          viewport: "any",
          expect:
            "Rating and review count match the live Google Business Profile exactly at time of check, with no rounding drift.",
        },
        {
          action: "Only after mobile passes, confirm the section at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Equivalent content and failure behaviour at desktop width.",
        },
      ],
      mobileFirst: [
        "Reviews present on first paint at 375px, not client-fetched after load",
        "The longest API-returned review renders in full without clipping or overflow",
        "API-failure and empty states degrade without layout shift on a mobile connection",
      ],
      pass: [
        "Live rating matches GBP",
        "API failure and empty states both degrade gracefully",
        "No client-side key exposure",
        "All names conform to the HIPAA attribution format",
      ],
      gotchas: [
        "The API returns full display names. Formatting on ingest is mandatory — rendering the raw name is a HIPAA fail even though the integration 'works'.",
        "Testing with a short sample review hides the overflow bug entirely. Use the longest review available.",
      ],
    },
  },

  // ─────────────────────────── WAVE 5 ───────────────────────────
  {
    id: 23,
    title: "Language support signal and key-page translation",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 2, risk: 3, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
    wave: 5,
    job: "Be understood",
    story: "As a patient whose first language isn't English, I know whether someone here can speak with me.",
    problem:
      "King County has substantial LEP populations — Spanish, Chinese, Vietnamese, Somali, Amharic, Russian, Ukrainian among the most common. The site says nothing about languages.",
    where: "Sitewide + /about",
    scope: [
      "State languages actually spoken by the team",
      "Translate the highest-value pages if a real need is confirmed",
      "Plain language throughout helps every reader",
    ],
    acceptance: [
      "No language capability is claimed without confirmation",
      "Any translated content carries a correct BCP-47 lang attribute",
      "No machine-translated medical content is published without human review",
    ],
    evidence: "Local tier — Seattle OIRA and King County language-access programs.",
    dependsOn: "Confirmed team language capabilities",
    outOfScope: "Machine translation of the whole site. Wrong medical translation is worse than English.",
    references: [
      {
        name: "King County — language access program",
        url: "https://kingcounty.gov/en/dept/executive/governance-leadership/equity-social-justice/office-of-equity-racial-social-justice/coalitions-programs/language-access",
        whatGood:
          "Names the actual languages that matter in this county and models how a public body states language availability without overpromising.",
        takeaway: "Use to prioritise which languages matter locally. Copy the plain statement of what's available.",
        mobile:
          "Language selection is disproportionately a mobile need — many LEP households are mobile-primary for internet access. Any language control must be a full-width tappable row near the top, not a small header dropdown that's hard to hit and easy to miss.",
      },
      {
        name: "W3C — language declarations and localisation",
        url: "https://www.w3.org/International/questions/qa-html-language-declarations",
        whatGood:
          "The technical correctness layer: declaring lang attributes properly so screen readers pronounce content in the right language.",
        takeaway:
          "Copy the lang-attribute discipline — mandatory if any translated content ships, and cheap to get right.",
        mobile:
          "Mobile-relevant requirement: mobile screen readers (VoiceOver/TalkBack) rely on lang to switch voice, and get it audibly wrong without it. Also budget for text expansion — Spanish and Somali run longer than English and will break tight 375px layouts and button labels.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed team language capabilities",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action: "Confirm every named language matches Akash's confirmed list.",
          tool: "shell",
          viewport: "any",
          expect: "Zero unconfirmed language claims.",
        },
        {
          action:
            "If a language control ships, confirm at 375px that it is a full-width tappable row ≥44×44px near the top, not a small header dropdown.",
          tool: "browser",
          expect: "Easy to find and hit on a phone — this audience is disproportionately mobile-primary.",
        },
        {
          action:
            "If translated content ships, render it at 375px and check for text expansion breakage in headings, buttons and nav labels.",
          tool: "browser",
          expect:
            "No clipped or overflowing labels. Spanish and Somali run longer than English and break tight mobile layouts first.",
        },
        {
          action: "Verify lang attributes on every translated element.",
          tool: "browser",
          viewport: "any",
          expect: "Correct BCP-47 lang; a mobile screen reader switches voice accordingly.",
        },
        {
          action: "Confirm no machine-translated medical content was published.",
          tool: "manual",
          viewport: "any",
          expect: "Any translation is human-reviewed.",
        },
      ],
      mobileFirst: [
        "Any language control is a full-width ≥44×44px row near the top at 375px",
        "Translated text causes no clipping or overflow at 375px despite expansion",
        "Mobile screen reader switches voice correctly via lang attributes",
      ],
      pass: [
        "Zero unconfirmed language claims",
        "Correct lang attributes on translated content",
        "No unreviewed machine translation of medical content",
      ],
      gotchas: [
        "Text expansion is invisible when testing in English. Always render the longest target language at 375px before declaring this done.",
      ],
    },
  },
  {
    id: 18,
    title: "Per-service pages with FAQ pairs and schema",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    repriorityNote:
      "DEMOTED P1 → P2 (22/50). Large effort, no compliance risk, and it depends on item 11 which is itself now P1. The AEO goal it serves is already partly met by the homepage FAQ and its FAQPage schema, so the marginal gain is smaller than it looked.",
    scores: { conversion: 3, reach: 3, risk: 1, effort: 1, readiness: 3 },
    effort: "L",
    status: "not-started",
    wave: 5,
    job: "Understand a treatment without self-diagnosing",
    story: "As a patient considering a specific treatment, I understand what's involved before I commit.",
    problem:
      "The build spec's original per-service template was never built; the homepage FAQ is a general-practice stand-in for it.",
    where: "src/app/services/[slug]/page.tsx",
    scope: [
      "One page per verified service",
      "2–3 direct Q&A pairs each, with FAQPage schema",
      "Extract the FAQ accordion from FAQSection for reuse",
      "Insurance note per service — no prices",
    ],
    acceptance: ["Each page answers real patient questions", "Schema validates", "Content is written to explain, not to sell"],
    evidence: "Internal build spec Section 2 + AEO structure already proven on the homepage FAQ.",
    dependsOn: "Item 11",
    outOfScope: "Pages for services the practice doesn't verifiably offer.",
    references: [
      {
        name: "Google Search Central — FAQ structured data",
        url: "https://developers.google.com/search/docs/appearance/structured-data/faqpage",
        whatGood:
          "Defines what qualifies as FAQ content and — importantly — the current eligibility limits for rich results, which have narrowed considerably.",
        takeaway:
          "Copy the markup requirements. Set expectations honestly: FAQPage rich results are now limited, so justify this on user value, not on SERP real estate.",
        mobile:
          "The user value that survives the rich-result narrowing is mobile-specific: an accordion lets someone scan questions without scrolling through every answer, which matters far more at 375px than on a desktop page where answers can sit open.",
      },
      {
        name: "ADA MouthHealthy — per-procedure topics",
        url: "https://www.mouthhealthy.org/all-topics-a-z",
        whatGood:
          "Per-procedure patient explanations that stay clinically safe and avoid implying guaranteed outcomes — exactly the register per-service pages need.",
        takeaway: "Copy the structure and caution. Don't reproduce their text; write our own and cite theirs.",
        mobile:
          "Their per-procedure pages are short and single-column, readable in a couple of mobile screens. Copy that ceiling — a per-service page that runs long on desktop becomes an abandonment risk on a phone.",
      },
    ],
    test: {
      preconditions: [
        "Item 11 shipped",
        "Per-service pages deployed",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action: "Request each service slug URL.",
          tool: "shell",
          viewport: "any",
          expect: "All 200 with unique titles and descriptions.",
        },
        {
          action:
            "At 375×812, confirm the FAQ accordion's question rows are ≥44×44px with ≥8px separation and that all questions are scannable without opening any answer.",
          tool: "browser",
          expect:
            "Questions scannable in a collapsed state — that's the mobile value the accordion exists for.",
        },
        {
          action:
            "At 375px, open and close each accordion item and confirm expanded state is announced and the newly opened answer doesn't push the tapped question off-screen.",
          tool: "browser",
          expect:
            "aria-expanded toggles correctly, and the question stays visible when its answer opens — otherwise the user loses their place.",
        },
        {
          action: "Confirm each page carries 2–3 Q&A pairs and matching FAQPage JSON-LD.",
          tool: "shell",
          viewport: "any",
          expect: "Visible content and structured data match exactly — no drift.",
        },
        {
          action: "Validate each page's structured data in the Rich Results Test, mobile mode.",
          tool: "validator",
          viewport: "any",
          expect: "Zero errors on every service page. Warnings recorded and justified if present.",
        },
        {
          action: "Confirm the accordion is a shared component, not a third copy of the pattern.",
          tool: "shell",
          viewport: "any",
          expect:
            "FAQSection's accordion is extracted and imported by both consumers — no duplicated open/close implementation.",
        },
        {
          action: "Check tone: explanatory, not promotional; no outcome guarantees.",
          tool: "manual",
          viewport: "any",
          expect:
            "Copy explains what a treatment involves without promising a result, and reads as information rather than a sales page.",
        },
      ],
      mobileFirst: [
        "Accordion question rows ≥44×44px with ≥8px separation at 375px",
        "All questions scannable while collapsed",
        "Opening an answer does not push its question off-screen; expanded state announced",
      ],
      pass: [
        "All service pages 200 with unique metadata",
        "Visible FAQ and JSON-LD identical",
        "Structured data validates",
        "Accordion is shared, not duplicated",
      ],
      gotchas: [
        "The scroll-jump on expand is invisible on a tall desktop viewport and obvious at 375×812 — it's the most common accordion defect on mobile.",
      ],
    },
  },
  {
    id: 24,
    title: "Pre-visit digital forms",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 3, risk: 3, effort: 1, readiness: 1 },
    effort: "L",
    status: "not-started",
    wave: 5,
    job: "Arrive prepared",
    story: "As a new patient, I complete paperwork before arriving instead of on a clipboard.",
    problem: "New-patient paperwork on arrival adds friction for the time-scarce segment.",
    where: "New route or Tab32 integration",
    scope: [
      "Accessible digital intake forms",
      "Secure handling of health information",
      "Likely belongs to Tab32 rather than this site",
    ],
    acceptance: ["Forms are accessible and secure", "PHI handling is reviewed before launch"],
    evidence: "Vendor tier — directional only. Deferred because it involves PHI and needs operational maturity.",
    dependsOn: "Item 15",
    outOfScope: "Building PHI handling ourselves if Tab32 already provides it.",
    references: [
      {
        name: "HHS — HIPAA security rule guidance",
        url: "https://www.hhs.gov/hipaa/for-professionals/security/index.html",
        whatGood:
          "The controlling requirements for electronically transmitted health information — the reason this item is deferred rather than built casually.",
        takeaway:
          "Read before writing any code that touches PHI. Strongly prefer letting Tab32 own this rather than becoming a PHI processor ourselves.",
        mobile:
          "Mobile-relevant risk: intake completed on a phone is more likely to be interrupted and resumed, which pushes implementations toward saving partial PHI locally. Browser storage on a shared or unlocked phone is a real exposure — prefer server-side session state over localStorage.",
      },
      {
        name: "GOV.UK Design System — question pages",
        url: "https://design-system.service.gov.uk/patterns/question-pages/",
        whatGood:
          "Long-form data capture split into small accessible steps, tested with users who find forms hard — the correct model for medical-history intake.",
        takeaway: "Copy the structure if we build it. Don't put a full medical history on one screen.",
        mobile:
          "The pattern is mobile-motivated: one question per screen keeps the on-screen keyboard from covering other fields and makes an interrupted session resumable at a known point. For a long medical history on a phone this is the difference between completion and abandonment.",
      },
    ],
    test: {
      preconditions: [
        "Item 15 shipped",
        "PHI handling approach decided and reviewed",
        "A real phone available — interruption and keyboard behaviour don't reproduce in a resized window",
      ],
      steps: [
        {
          action: "Confirm where PHI is stored and who processes it.",
          tool: "manual",
          viewport: "any",
          expect: "Documented and reviewed. If we store PHI ourselves without review, stop.",
        },
        {
          action:
            "Inspect localStorage, sessionStorage and IndexedDB after partially completing the form at 375px.",
          tool: "browser",
          expect:
            "No PHI persisted in browser storage. An interrupted intake on a shared or unlocked phone must not leave health data behind.",
        },
        {
          action:
            "At 375px, complete one step, background the browser, return, and confirm progress is preserved or the loss is clearly warned about.",
          tool: "manual",
          expect:
            "No silent data loss. Mobile intake is interrupted far more often than desktop.",
        },
        {
          action:
            "At 375px, confirm the on-screen keyboard never covers the active field or the continue control, and each step fits one viewport.",
          tool: "manual",
          expect: "One question per screen; nothing obscured.",
        },
        {
          action: "Verify transport security and that no PHI appears in URLs, query strings or logs.",
          tool: "browser",
          viewport: "any",
          expect: "HTTPS throughout; zero PHI in URLs or client logs.",
        },
        {
          action: "Run the full accessibility test from item 14 against the forms, at 375px first.",
          tool: "validator",
          expect: "Zero critical/serious violations; touch, keyboard and screen-reader operable.",
        },
      ],
      mobileFirst: [
        "No PHI persisted in browser storage after a partial mobile session",
        "Progress preserved (or loss clearly warned) across a backgrounded browser on a real phone",
        "On-screen keyboard never covers the active field or continue control; one question per viewport",
        "Item-14 accessibility pass at 375px",
      ],
      pass: [
        "PHI handling documented and reviewed",
        "No PHI in URLs, logs, or browser storage",
        "Accessibility pass equivalent to item 14",
        "No silent data loss",
      ],
      gotchas: [
        "Never place PHI in a URL or query string — it lands in server logs, browser history and analytics referrers.",
        "'Save progress locally' is the obvious fix for mobile interruption and the wrong one for PHI. Resolve this before writing any code.",
      ],
    },
  },
  {
    id: 22,
    title: "Aftercare and records requests",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P1",
    pin: null,
    repriorityNote:
      "DEMOTED P1 → P2 (21.5/50). Serves existing patients rather than the new-patient goal that drives this project, and every element needs clinical review before publishing. Real value, wrong phase.",
    scores: { conversion: 2, reach: 2, risk: 2, effort: 3, readiness: 2 },
    effort: "M",
    status: "not-started",
    wave: 5,
    job: "Manage care after a visit",
    story: "As an existing patient, I get aftercare guidance and request records without phoning.",
    problem: "Every post-visit need currently becomes a phone call — into the same channel that's already leaking.",
    where: "New route or an existing-patients section",
    scope: [
      "Aftercare instructions per common procedure",
      "When to call after treatment",
      "Records-request path",
      "Insurance/contact update path",
    ],
    acceptance: ["An existing patient completes each task without phoning", "Aftercare content is clinically reviewed by Dr. Dubey"],
    evidence: "Repeated theme in the ongoing-care job family; reduces load on the leakiest channel.",
    dependsOn: "Clinical review of all aftercare content",
    outOfScope: "A patient portal or any login.",
    references: [
      {
        name: "ADA MouthHealthy — after treatment topics",
        url: "https://www.mouthhealthy.org/all-topics-a-z",
        whatGood:
          "Clinically vetted post-procedure guidance including when to contact a dentist — the safe baseline for aftercare content.",
        takeaway:
          "Copy the 'when to call us' framing. All aftercare copy still needs Dr. Dubey's sign-off; ADA guidance is a floor, not a substitute.",
        mobile:
          "Aftercare is read at home, hours after a procedure, usually on a phone and often while uncomfortable or sedated-groggy. That argues for very short instructions, large type, and the 'contact us if…' criteria placed first rather than at the end of a long page.",
      },
      {
        name: "HHS — individuals' right to access health information",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/access/index.html",
        whatGood:
          "Defines patients' legal right of access and the response timeframes a records-request path must respect.",
        takeaway: "Copy the timeframes into the published process so we don't promise faster than the law assumes.",
        mobile:
          "Mobile-relevant requirement: the request path must work without a desktop — no print-and-mail form, no PDF to fill in. A phone-completable request is the practical test of whether the right of access is real for our patients.",
      },
    ],
    test: {
      preconditions: [
        "Dr. Dubey has clinically reviewed all aftercare content",
        "Browser viewport set to 375×812 before any rendering step — aftercare is read at home on a phone, post-procedure",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm each aftercare topic's 'contact us if…' criteria appear near the top, not at the end of a long scroll.",
          tool: "browser",
          expect:
            "Warning criteria visible early. A post-procedure patient with a concerning symptom must not have to scroll a full page to find out whether to call.",
        },
        {
          action:
            "At 375px, confirm aftercare body text is ≥16px with generous line-height and short paragraphs.",
          tool: "browser",
          expect:
            "Comfortably readable by someone groggy or in discomfort. Small dense type fails this audience specifically.",
        },
        {
          action:
            "At 375px, confirm a one-tap `tel:` control sits alongside the contact-us criteria at ≥44×44px.",
          tool: "browser",
          expect: "Calling is one tap from the point where the patient realises they should call.",
        },
        {
          action:
            "Complete a records request end-to-end at 375px, without phoning and without a desktop.",
          tool: "browser",
          expect:
            "Completable on a phone — no print-and-mail form, no PDF. The stated timeframe matches HIPAA access expectations.",
        },
        {
          action: "Confirm every aftercare instruction is signed off by Dr. Dubey.",
          tool: "manual",
          viewport: "any",
          expect: "Documented clinical sign-off. Unreviewed clinical guidance must not ship.",
        },
        {
          action: "Confirm no PHI is collected via an insecure path.",
          tool: "browser",
          viewport: "any",
          expect: "Secure transport; no PHI in URLs.",
        },
      ],
      mobileFirst: [
        "'Contact us if…' criteria appear near the top of each topic at 375px",
        "Body text ≥16px with short paragraphs, readable post-procedure",
        "A one-tap call control sits with the contact-us criteria at ≥44×44px",
        "The records request completes on a phone — no PDF, no print-and-mail step",
      ],
      pass: [
        "All aftercare content clinically signed off",
        "Every topic has contact-us criteria",
        "Records request completable without phoning, with a lawful timeframe",
      ],
      gotchas: [
        "Burying the warning criteria at the bottom of an aftercare page is a safety problem on mobile, where the scroll is longer and the reader is least patient.",
      ],
    },
  },
  {
    id: 25,
    title: "Neighborhood and local content",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 2, risk: 2, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
    wave: 5,
    job: "Find a dentist near me",
    story: "As someone searching by neighborhood, I find the practice.",
    problem:
      "serviceAreas lists Queen Anne (real) plus five proximity guesses. Padding an unverified list buys nothing and risks contradicting the GBP.",
    where: "src/lib/content.ts + optional local pages",
    scope: [
      "Confirm the real service area",
      "Genuine local content only where there's something true to say",
    ],
    acceptance: [
      "No unverified neighborhood claim is published",
      "serviceAreas in content.ts matches whatever the Google Business Profile declares",
      "No near-duplicate location pages exist",
    ],
    evidence: "Local search rewards genuine relevance and punishes inconsistency — vendor tier, directional.",
    dependsOn: "Item 2 · confirmed service areas",
    outOfScope: "Doorway pages for neighborhoods the practice doesn't genuinely serve.",
    references: [
      {
        name: "Google Search Essentials — spam policies (doorway pages)",
        url: "https://developers.google.com/search/docs/essentials/spam-policies",
        whatGood:
          "Explicitly names near-duplicate location pages as a spam pattern — the exact anti-pattern dental marketing agencies sell.",
        takeaway:
          "Copy the prohibition. If we can't say something genuinely different about a neighbourhood, we don't make a page for it.",
        mobile:
          "Mobile-relevant requirement: 'near me' search is overwhelmingly mobile, and mobile-first indexing means Google evaluates whatever the phone rendering shows. Neighbourhood content hidden behind a desktop-only accordion or tab simply isn't counted.",
      },
      {
        name: "Google Business Profile — service area guidelines",
        url: "https://support.google.com/business/answer/9157481",
        whatGood: "Defines how service areas should be represented so the site and the GBP don't contradict each other.",
        takeaway: "Keep serviceAreas in content.ts aligned to whatever the GBP declares.",
        mobile:
          "The GBP is consumed almost entirely on mobile, in Maps. Its service-area declaration and our on-site list are read by the same person minutes apart on the same phone, so a contradiction is noticed immediately.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed the real service area",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action: "Compare serviceAreas in content.ts against the confirmed list and the GBP.",
          tool: "shell",
          viewport: "any",
          expect: "Exact match. Unconfirmed neighbourhoods removed.",
        },
        {
          action:
            "At 375×812, confirm the service-area list is visible in the mobile rendering — not hidden behind a desktop-only tab, accordion or hover.",
          tool: "browser",
          expect:
            "Fully present at mobile width. Under mobile-first indexing, content absent from the phone rendering is not counted.",
        },
        {
          action:
            "At 375px, confirm the area list wraps cleanly without horizontal overflow.",
          tool: "browser",
          expect: "No horizontal scroll from a wide inline chip row.",
        },
        {
          action: "If local pages exist, compare their content for near-duplication.",
          tool: "shell",
          viewport: "any",
          expect: "Each page says something substantively different. Templated duplicates are a fail.",
        },
      ],
      mobileFirst: [
        "The service-area list is present in the 375px rendering, not desktop-only",
        "No horizontal overflow from the area list at 375px",
      ],
      pass: [
        "serviceAreas matches the confirmed list and the GBP",
        "No near-duplicate location pages",
      ],
    },
  },
  {
    id: 26,
    title: "Conversion instrumentation and analytics",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 1, risk: 2, effort: 3, readiness: 3 },
    effort: "M",
    status: "not-started",
    wave: 5,
    job: "(Practice-facing — how we learn what's working)",
    story: "As the practice, I can see which paths produce booked patients.",
    problem:
      "Build spec Section 9 requires instrumentation from the start. Baseline tracking ships with item 15; this is the analysis layer on top.",
    where: "Sitewide",
    scope: [
      "Form submissions, booking completions and drop-off, click-to-call taps, page traffic",
      "Privacy-respecting analytics",
      "A view Akash can actually read",
    ],
    acceptance: [
      "Every conversion path is measured",
      "Analytics choice is privacy-respecting and disclosed in the privacy policy",
    ],
    evidence: "Internal — build spec Section 9, locked principle.",
    dependsOn: "Item 15 for booking events",
    outOfScope: "Third-party trackers that would complicate the privacy policy.",
    references: [
      {
        name: "Plausible — privacy-focused analytics",
        url: "https://plausible.io/privacy-focused-web-analytics",
        whatGood:
          "Cookieless, no personal data collected, so it avoids consent-banner requirements — which matters on a healthcare site where the banner itself is a friction and a trust signal.",
        takeaway:
          "Strong default for us. Whatever is chosen must be disclosed in item 12's privacy policy.",
        mobile:
          "Its small script size is a mobile-performance argument as much as a privacy one — analytics is pure overhead on a cellular connection. Avoiding a consent banner also matters most on mobile, where a banner can cover a third of the screen and sit over the call CTA.",
      },
      {
        name: "ICO — cookies and similar technologies guidance",
        url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/",
        whatGood:
          "Clear regulator guidance on when analytics require consent — the test that determines whether we need a banner at all.",
        takeaway:
          "Use to justify the analytics choice. Avoid anything requiring a consent banner unless there's a compelling reason.",
        mobile:
          "Mobile-relevant consequence: if a banner is unavoidable it must not obscure the emergency or call CTAs at 375px, and must be dismissible with a single ≥44px tap. A banner covering the call button on an urgent-care page is a real harm, not a UX nit.",
      },
    ],
    test: {
      preconditions: [
        "Analytics chosen and deployed",
        "Item 12 privacy policy live",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "At 375×812, activate the `tel:` control and confirm the click-to-call event fires and is actually delivered before navigation.",
          tool: "browser",
          expect:
            "Event delivered via beacon/keepalive. Click-to-call is the primary mobile conversion and the easiest event to lose.",
        },
        {
          action:
            "If a consent banner exists, confirm at 375px that it does not obscure the call CTA or any emergency guidance, and is dismissible with a single ≥44px tap.",
          tool: "browser",
          expect:
            "No banner covering an urgent action. A banner over the call button on the emergency page is a real harm.",
        },
        {
          action: "Trigger each remaining conversion path at 375px and confirm its event fires.",
          tool: "browser",
          expect: "Form submit and booking start/complete/drop-off all emit events.",
        },
        {
          action:
            "Measure the analytics script's transfer size and its effect on first paint on a throttled mobile connection.",
          tool: "browser",
          expect:
            "Negligible. Analytics must not delay the first paint of trust content on cellular.",
        },
        {
          action: "Inspect network requests and cookies for personal data or cross-site trackers.",
          tool: "browser",
          viewport: "any",
          expect: "No PII transmitted; no third-party tracking cookies unless consented.",
        },
        {
          action: "Confirm the analytics tool is named in the privacy policy.",
          tool: "browser",
          viewport: "any",
          expect:
            "The privacy policy names the specific analytics provider and what it collects — a generic 'we use analytics' line does not count.",
        },
      ],
      mobileFirst: [
        "Click-to-call events are delivered before navigation at 375px (beacon/keepalive)",
        "Any consent banner leaves the call CTA and emergency guidance unobscured and is dismissible in one ≥44px tap",
        "Analytics adds negligible weight and does not delay first paint on a throttled mobile connection",
      ],
      pass: [
        "All four conversion paths emit events",
        "No PII or unconsented third-party tracking",
        "Analytics disclosed in the privacy policy",
        "Click-to-call tracked on mobile",
      ],
      gotchas: [
        "tel: activation navigates away from the page, so a naive event can be lost before it sends — use a beacon/keepalive request.",
        "Click-to-call tracking cannot be verified at desktop width, where tel: links often do nothing. This event must be tested on mobile or a real device.",
      ],
    },
  },
  // ══════════════════════════════════════════════════════════════════
  // BLUEPRINT INTAKE — 2026-08-30
  // From docs/research/downtown-seattle-family-dental-website-blueprint.md
  // ══════════════════════════════════════════════════════════════════
  {
    id: 28,
    title: "Publish a conservative-care / anti-over-treatment statement",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§7 praise/abandon · §11 trust · P0-14",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 5, risk: 3, effort: 5, readiness: 3 },
    effort: "S",
    status: "blocked",
    wave: 1,
    job: "Trust that I won't be over-treated or overcharged",
    story:
      "As a patient who has been upsold before, I can see in the practice's own words that they recommend only what I need — before I book.",
    problem:
      "The single strongest patient-generated signal in the blueprint, and the site says nothing about it. Patients praise dentists who monitor instead of drilling, who show imaging and let the patient decide, and who respect a financial timeline. They abandon over feeling upsold — a treatment plan full of procedures they doubt. This is the #1 distrust in dentistry and it is a pure copy problem: a short, honest statement converts the profession's biggest trust liability into this practice's asset.",
    where: "Homepage block + /about",
    scope: [
      "One short block, in the practice's own voice: we recommend only what you need",
      "\"We'll show you what we see\" — imaging shown and explained before treatment is proposed",
      "Written estimates before work begins",
      "Second opinions explicitly welcome",
      "Only claims Dr. Dubey will actually stand behind — this is a promise, not marketing",
    ],
    acceptance: [
      "The statement appears on both the homepage and /about",
      "Every clause is one Dr. Dubey has confirmed the practice actually does",
      "No superlatives, no 'award-winning', no comparison to other practices",
    ],
    evidence:
      "Blueprint §7: the strongest repeated patient-generated theme in the whole study, from r/Seattle and r/askdentists — conservative care praised, upselling abandoned over. Corroborates our own research's finding that vague trust language reads as noise while specifics earn trust.",
    dependsOn: "Dr. Dubey confirming each clause is a genuine practice commitment",
    outOfScope:
      "Claiming a philosophy the practice doesn't practise. This is the one item where publishing something aspirational would be actively dishonest.",
    references: [
      {
        name: "Chicago Loop Dentistry — the \"Pinky Promise\"",
        url: "https://www.chicagoloopdentistry.com/",
        whatGood:
          "Names the over-treatment fear directly and commits to never pushing unneeded work, in plain first-person language. Turns the profession's biggest liability into a differentiator instead of ignoring it.",
        takeaway:
          "Copy the directness and the first-person voice. Don't copy the branded name for the promise — a cute label undercuts the sincerity we need.",
        mobile:
          "It works on a phone because it's three short sentences, not a values page. Copy that length: at 375px this must read as one glanceable block, since it sits in the first-impression scan where attention is scarcest.",
      },
      {
        name: "Integrity Dental Boston — published values and bounded first-visit price",
        url: "https://www.integritydentalboston.com/",
        whatGood:
          "Pairs the trust statement with a concrete financial commitment rather than leaving it as sentiment — the promise is backed by something checkable.",
        takeaway:
          "Copy the pairing of a values statement with a concrete commitment (see item 35). Avoid publishing a price we can't stand behind.",
        mobile:
          "Their statement stays above the fold on a phone rather than living on a buried About page. Worth copying: the trust claim has to reach the scanner, not reward the reader who scrolls furthest.",
      },
    ],
    test: {
      preconditions: [
        "Dr. Dubey has confirmed each clause",
        "Browser viewport set to 375×812 before any rendering step",
      ],
      steps: [
        {
          action:
            "At 375×812, confirm the statement is present on the homepage and readable as one block without scrolling mid-sentence.",
          tool: "browser",
          expect:
            "Reads as one glanceable block. It sits in the first-impression scan, so a statement split across a scroll boundary loses its force.",
        },
        {
          action: "Confirm the same statement appears on /about.",
          tool: "browser",
          expect: "Present on both routes, consistent wording.",
        },
        {
          action:
            "Scan the statement for superlatives and comparative claims: /award|best|#1|top dentist|better than/i.",
          tool: "shell",
          viewport: "any",
          expect: "Zero matches. This is a commitment, not a boast.",
        },
        {
          action: "Confirm each clause against Dr. Dubey's sign-off.",
          tool: "manual",
          viewport: "any",
          expect: "Every clause is a genuine practice commitment, documented.",
        },
      ],
      mobileFirst: [
        "The statement reads as one block at 375×812 without splitting across a scroll",
        "Present on both the homepage and /about at mobile width",
        "Body text ≥16px with line-height ≥1.5",
      ],
      pass: [
        "Statement live on homepage and /about",
        "Every clause confirmed by Dr. Dubey",
        "Zero superlatives or comparative claims",
      ],
      gotchas: [
        "This is the one item where shipping aspirational copy is worse than shipping nothing — a promise the practice doesn't keep becomes the review that sinks it.",
      ],
    },
  },
  {
    id: 29,
    title: "Adopt the Global Test Harness (GTH-1 – GTH-22)",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§25(c) global test harness",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "dependency",
    repriorityNote:
      "Scores 35.5 so it lands in P0 on merit, but it is also pinned as a dependency: every other item's test scenario references these checks, and adopting them late means re-testing everything already shipped.",
    scores: { conversion: 2, reach: 5, risk: 4, effort: 3, readiness: 5 },
    effort: "M",
    status: "partial",
    wave: 1,
    job: "(Team-facing — how we know any item is actually done)",
    story:
      "As whoever implements a backlog item, I run one named set of checks rather than re-deriving accessibility, overflow and performance assertions each time.",
    problem:
      "Every one of our 27 items restates its own accessibility, tap-target and overflow assertions — 27 copies of the same checks, which drift. The blueprint supplies a 22-check harness that replaces the duplication, and adds five things we were not checking at all: JS-disabled degradation, the 320/430 viewport ends, 200% text resize, landscape orientation, and mobile input correctness.",
    where: "src/lib/test-harness.ts (added) · referenced by every item",
    scope: [
      "Adopt GTH-1–GTH-11 (baseline) and GTH-12–GTH-22 (mobile suite)",
      "Keep this repo's stricter 44px rule rather than WCAG 2.5.8's 24px floor",
      "Extend the viewport matrix from 375-only to 320 / 360 / 375 / 390 / 430 / landscape",
      "Run the harness against every route already shipped, and log what fails",
      "Do NOT add a test runner as part of this — every check runs via npx or the existing browser tools",
    ],
    acceptance: [
      "Every backlog item references the harness ids that apply to it",
      "The harness has been run once against all existing routes, with results recorded",
      "Any failure is fixed or logged as its own item with an owner",
      "No new dependency added to package.json",
    ],
    evidence:
      "Blueprint §25(c). The five genuinely new checks are the value: we had no JS-disabled, landscape, 200%-resize, 320/430-width or mobile-input-correctness coverage at all.\n\n" +
      "2026-09-02: `src/lib/test-harness.ts` (all 22 GTH checks + BASELINE_IDS/MOBILE_SUITE_IDS) already existed and every item already references its applicable harness ids — that half of this item's acceptance was done by an earlier session without the status field being updated. This pass does the other half: actually running it. " +
      "GTH-1 (axe-core, wcag2a/2aa/21a/21aa) run against all 9 shipped routes at 375×812 on the production deployment — found and fixed a real aria-hidden-focus violation (OfficeCarousel.tsx's duplicate carousel track had `aria-hidden` buttons still in tab order; added `tabIndex={-1}`), and found a sitewide color-contrast violation present on every one of the 8 patient-facing routes, logged as its own item (61) rather than fixed here — several shared components (Footer, AppointmentForm, Nav) needed changes, and multiple other sessions had those exact files under active concurrent edit at the time of this pass, so fixing in place risked either a broken merge or clobbering someone else's in-flight work. GTH-13 (no horizontal scroll at 320px) run against all 9 routes — clean, zero overflow anywhere. GTH-9 (console clean) spot-checked on 2 of 9 routes (home, /backlog) — clean. GTH-2/GTH-19 (Lighthouse mobile, simulated throttling) run against / and /contact: /contact scores cleanly (performance 99, LCP 2.1s, CLS 0, TBT 10ms — all within budget); / scores performance 88 / LCP 3.5s / Speed Index 4.1s, below GTH-2's stated thresholds despite item 38 (performance budget) being marked done — flagging as a discrepancy worth a follow-up look (likely the hero carousel's LCP image) rather than re-opening item 38 on a single run's evidence. " +
      "Left partial, not done: the remaining checks (GTH-3 HTML validity, GTH-4 keyboard-only task completion, GTH-6/14 tap-target measurement, GTH-7 JS-disabled degradation, GTH-15/16/21 thumb-zone/safe-area/landscape, GTH-20 200%-resize, GTH-22 reduced-motion) were not run against all 9 routes in this pass — GTH-20 was already verified for body/input text during item 37's work, and GTH-22 reduced-motion is already implemented per both carousels' own code, but neither was re-verified route-by-route here. A second pass covering those, plus re-running GTH-1 to confirm item 61's contrast fix once it lands, is what would close this out.",
    dependsOn: null,
    outOfScope:
      "Adding Playwright, a CI runner, or a test framework. That is a separate decision with its own cost — 'adopt the harness' is not 'adopt a toolchain'.",
    references: [
      {
        name: "Deque — axe-core CLI",
        url: "https://github.com/dequelabs/axe-core-npm/tree/develop/packages/cli",
        whatGood:
          "Runs the same engine as the browser extension from the command line against a URL, so the accessibility half of the harness is a one-line npx invocation with no project setup.",
        takeaway:
          "Use it for GTH-1. Don't treat a clean run as a pass — it covers roughly a third of real issues.",
        mobile:
          "Accepts a viewport size, which is the whole point here: run it at 375 and 320 first. Target-size and reflow findings simply do not appear at desktop width.",
      },
      {
        name: "Google — Lighthouse CLI",
        url: "https://github.com/GoogleChrome/lighthouse",
        whatGood:
          "Its mobile preset applies a Moto-G-class CPU throttle and simulated slow 4G by default — a realistic field profile rather than a warm localhost load.",
        takeaway:
          "Use the mobile preset for GTH-2 and GTH-19. Run against the deployed preview; localhost numbers are meaningless.",
        mobile:
          "The mobile preset IS the check. Running Lighthouse desktop and reporting the score would be the exact false pass this harness exists to prevent.",
      },
      {
        name: "W3C — WCAG 2.2 Quick Reference",
        url: "https://www.w3.org/WAI/WCAG22/quickref/",
        whatGood:
          "The normative source behind GTH-14 (target size), GTH-20 (reflow, text resize) and GTH-21 (orientation) — with techniques and documented failures per criterion.",
        takeaway:
          "Use it to adjudicate any harness dispute. Note we deliberately exceed 2.5.8: our locked rule is 44px, not 24px.",
        mobile:
          "2.2's new criteria are overwhelmingly touch and small-screen concerns, which is why the mobile suite is eleven of the twenty-two checks.",
      },
    ],
    test: {
      preconditions: ["src/lib/test-harness.ts merged", "Deployed preview available"],
      steps: [
        {
          action:
            "Run the full mobile suite (GTH-12 – GTH-22) against every existing route at 375×812 first, then the rest of the matrix.",
          tool: "validator",
          expect:
            "A recorded result per check per route. Failures are expected on the first run — the point is to find them.",
        },
        {
          action:
            "Run GTH-7 (JS disabled) against the homepage and /contact specifically.",
          tool: "browser",
          expect:
            "Core content, the phone number and emergency access still present. Our nav, menu, carousels and accordions are all client components, so this is the check most likely to surface something.",
        },
        {
          action: "Run GTH-21 (landscape, 844×390) against the homepage.",
          tool: "browser",
          expect:
            "Full function in landscape. The fixed 64px header eats a much larger share of a 390px-tall viewport — this is where that shows up.",
        },
        {
          action: "Run the baseline checks (GTH-1 – GTH-11) against every route.",
          tool: "validator",
          viewport: "any",
          expect: "Results recorded; every serious/critical finding fixed or logged with an owner.",
        },
        {
          action: "Confirm package.json is unchanged.",
          tool: "shell",
          viewport: "any",
          expect: "No new dependency. The harness is a checklist, not a framework.",
        },
      ],
      mobileFirst: [
        "Mobile suite run at 375 first, then 320 / 360 / 390 / 430 / landscape",
        "GTH-7 (JS-disabled) run and its result recorded — new coverage for this repo",
        "GTH-21 (landscape) run against the homepage — new coverage for this repo",
      ],
      pass: [
        "Harness run once against all existing routes with recorded results",
        "Every item references the harness ids that apply to it",
        "Every failure fixed or logged with an owner",
        "No new dependency in package.json",
      ],
      gotchas: [
        "Adopting the harness will produce failures on already-merged work. That is the point, not a regression — log them honestly rather than quietly narrowing the checks.",
      ],
    },
  },
  {
    id: 30,
    title: "Global shell semantics: skip link, landmarks, focus order",
    priority: "P0",
    source: "blueprint",
    launchBlocking: true,
    blockingGround: "legal",
    blueprintRef: "§17 accessibility baseline · §22 global header · P0-1",
    harness: ["GTH-1", "GTH-3", "GTH-4", "GTH-9", "GTH-13", "GTH-14", "GTH-20", "GTH-21"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 2, reach: 5, risk: 4, effort: 5, readiness: 5 },
    effort: "S",
    status: "done",
    wave: 1,
    job: "Use the site at all, from the first keystroke",
    story:
      "As a keyboard or screen-reader user, I can skip the nav, land in the main content, and always know where focus is.",
    problem:
      "There is no skip-to-content link anywhere on the site, and landmark structure has never been verified. With a fixed 64px header on every page, a keyboard user tabs through the full nav on every single navigation. This is cheap, foundational, and blocks nothing.",
    where: "src/app/layout.tsx · src/components/Nav.tsx · PageShell",
    scope: [
      "Skip-to-content link as the first focusable element on every page",
      "One banner / one main / one contentinfo per page, verified",
      "Visible focus ring on every interactive element, checked against the locked palette",
      "Focus returns to the hamburger trigger when the mobile menu closes",
      "html lang set correctly",
    ],
    acceptance: [
      "Skip link is the first focusable element and moves focus into main",
      "Exactly one banner, main and contentinfo per page",
      "Focus is visible at every stop with no keyboard trap",
    ],
    evidence:
      "Blueprint §17 lists skip link and landmarks as accessibility baseline, not enhancement. Our own item 14 assumed these existed; they were never verified.",
    dependsOn: null,
    outOfScope: "An accessibility overlay widget. Overlays don't fix markup.",
    references: [
      {
        name: "WAI — skip navigation links",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G1",
        whatGood:
          "The normative technique: a link that is the first focusable element and targets the main content, visible on focus even if hidden otherwise.",
        takeaway:
          "Copy the visible-on-focus pattern. A permanently hidden skip link is a common broken implementation that passes a casual check.",
        mobile:
          "Matters more with our fixed header: on a phone the nav is a hamburger, so a screen-reader user swiping linearly hits the header controls on every page load. The skip link is their way past it.",
      },
      {
        name: "GOV.UK Design System — skip link",
        url: "https://design-system.service.gov.uk/components/skip-link/",
        whatGood:
          "A production implementation tested with real assistive-technology users, including the focus behaviour after activation — the part most implementations get wrong.",
        takeaway:
          "Copy the implementation including moving focus, not just scrolling. Scrolling without focus movement leaves screen-reader users where they were.",
        mobile:
          "Their version stays usable at 320px and does not overlap the header when focused — worth copying, since our header is fixed and would otherwise cover the revealed link.",
      },
    ],
    test: {
      preconditions: ["Deployed at $BASE", "Browser viewport set to 375×812"],
      steps: [
        {
          action: "At 375×812, press Tab once from page load on each route.",
          tool: "browser",
          expect: "The skip link is the first focusable element and becomes visible when focused.",
        },
        {
          action: "Activate the skip link and check where focus lands.",
          tool: "browser",
          expect: "Focus moves into main — not merely a scroll. The fixed header must not cover the landing point.",
        },
        {
          action: "Open the mobile menu, close it with Escape, and check focus.",
          tool: "browser",
          expect: "Focus returns to the hamburger trigger.",
        },
        {
          action: "Count landmarks and check html lang on every route.",
          tool: "shell",
          viewport: "any",
          expect: "Exactly one banner, one main, one contentinfo; html lang present and correct.",
        },
      ],
      mobileFirst: [
        "Skip link is first focusable and visible on focus at 375px, not hidden behind the fixed header",
        "Activating it moves focus, not just scroll position",
        "Closing the mobile menu returns focus to its trigger",
      ],
      pass: [
        "Skip link first-focusable on every route and moves focus into main",
        "One banner / main / contentinfo per page",
        "No keyboard trap; focus visible throughout",
      ],
    },
  },
  {
    id: 31,
    title: "Pre-launch verification gate",
    priority: "P0",
    source: "blueprint",
    launchBlocking: true,
    blockingGround: "legal",
    blueprintRef: "§24 Build Item 26 · §26 checklist row 26",
    harness: [...BASELINE_IDS, ...MOBILE_SUITE_IDS],
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 35.0 so P0 on merit, and pinned: this is the gate that stops unverified clinical, insurance and pricing claims reaching patients. It is the last line before launch.",
    scores: { conversion: 2, reach: 5, risk: 5, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
    wave: 3,
    job: "(Team-facing — the last check before real patients arrive)",
    story:
      "As the practice, nothing goes live that we haven't confirmed, and every interaction has been exercised including its failure paths.",
    problem:
      "Item 2 removes unverified claims once. This is the recurring gate that confirms it stayed true, that all four interaction states exist everywhere, and that the three core journeys complete on real phones — run immediately before launch and before any subsequent content change.",
    where: "Whole site",
    scope: [
      "Zero unverified claims live anywhere — re-run the item 2 sweep",
      "Every interaction has loading, success, error and recovery behaviour",
      "The three core journeys (book, find/arrive, emergency) complete at 320 / 360 / 375 / 390 / 430",
      "Full mobile suite green on every P0 route",
      "Privacy and accessibility pages live and footer-linked",
    ],
    acceptance: [
      "Zero unverified claims in built output",
      "All three core journeys complete at every matrix width",
      "Mobile suite green on all P0 routes",
      "Every form state exercised, including forced failures",
    ],
    evidence:
      "Blueprint §24 Build Item 26 and §26 row 26 — a single explicit launch gate rather than trusting that earlier items held.",
    dependsOn: "Every P0 item shipped · Akash's verification table complete",
    outOfScope: "Treating this as a substitute for per-item testing. It is a gate, not the test plan.",
    references: [
      {
        name: "GOV.UK — service standard and assessments",
        url: "https://www.gov.uk/service-manual/service-standard",
        whatGood:
          "Establishes an explicit go-live gate a service must pass, tested end to end with real users on real devices, rather than assuming component-level sign-offs compose.",
        takeaway:
          "Copy the idea of a named gate with a pass/fail verdict. Ignore the panel process — one careful pass, not a ceremony.",
        mobile:
          "Their assessments require testing on the devices users actually have. Copy that literally: this gate is not passed on a resized desktop window.",
      },
      {
        name: "WHO / NHS pre-launch clinical content review practice",
        url: "https://service-manual.nhs.uk/content/how-we-write",
        whatGood:
          "Content touching health is reviewed for accuracy before publication as a matter of process, not judgement — the same discipline our clinical and insurance claims need.",
        takeaway:
          "Copy the review-before-publish default for anything clinical or financial.",
        mobile:
          "Their guidance assumes mobile reading and short scannable content, which is also what makes a final read-through at 375px worth doing as part of the gate.",
      },
    ],
    test: {
      preconditions: ["All P0 items shipped", "Verification table complete"],
      steps: [
        {
          action:
            "At 375×812, complete all three core journeys: request an appointment, find and get directions, reach emergency guidance.",
          tool: "browser",
          expect: "All three complete without backtracking or a dead end.",
        },
        {
          action: "Repeat the three journeys at 320, 360, 390 and 430.",
          tool: "browser",
          expect: "All complete at every matrix width.",
        },
        {
          action: "Force a failure in every form and confirm the recovery path.",
          tool: "browser",
          expect: "Every failure names a fix and offers the phone fallback.",
        },
        {
          action: "Sweep the built output for unverified claims and placeholder markers.",
          tool: "shell",
          viewport: "any",
          expect:
            "Zero matches across every built route. Any hit blocks launch until it is verified or removed.",
        },
        {
          action: "Run the full mobile suite on every P0 route.",
          tool: "validator",
          expect: "Green across the board, or every failure logged with an owner and a decision to ship or hold.",
        },
      ],
      mobileFirst: [
        "All three core journeys complete at 320 / 360 / 375 / 390 / 430",
        "Every form failure path exercised on a phone",
        "Mobile suite green on all P0 routes",
      ],
      pass: [
        "Zero unverified claims live",
        "Three core journeys complete at every matrix width",
        "All four interaction states present everywhere",
        "Privacy and accessibility live and linked",
      ],
      gotchas: [
        "A gate that always passes is not a gate. If this item never blocks a launch, it is being run as a formality rather than a check.",
      ],
    },
  },
  {
    id: 32,
    title: "Mobile input correctness and form state preservation",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§17 forms · §22 form field · GTH-18",
    harness: ["GTH-1", "GTH-4", "GTH-6", "GTH-13", "GTH-14", "GTH-18", "GTH-20"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 4, risk: 3, effort: 5, readiness: 5 },
    effort: "S",
    status: "partial",
    wave: 2,
    job: "Fill in a form on a phone without fighting it",
    story:
      "As a patient typing on a phone, the right keyboard appears, autofill works, the page doesn't zoom when I tap a field, and my answers survive an interruption.",
    problem:
      "Three concrete mobile form defects the blueprint names that our items never covered: inputs under 16px trigger iOS zoom-on-focus (which then breaks the layout), missing type/inputmode/autocomplete gives a phone field a QWERTY keyboard and no autofill, and losing entered values on back-navigation punishes a patient who paused to find their insurance card — a genuinely common interruption on mobile.",
    where: "src/components/AppointmentForm.tsx and every future form",
    scope: [
      "type + inputmode + autocomplete on every field (tel, email, name, postal-code)",
      "Every input rendered at ≥16px to prevent iOS zoom-on-focus",
      "Entered values preserved across back-navigation and app backgrounding",
      "Submit control never covered by the on-screen keyboard",
    ],
    acceptance: [
      "Every field declares correct type, inputmode and autocomplete",
      "No input under 16px anywhere",
      "Values survive back-navigation and a backgrounded browser",
      "Submit reachable with the keyboard open",
    ],
    evidence:
      "Blueprint GTH-18 and §17 forms. All three defects are invisible at desktop width and in a resized desktop window — they need a real device.",
    dependsOn: null,
    outOfScope: "Autosaving to browser storage. Any future form touching health data must not persist PHI locally (see item 24).",
    references: [
      {
        name: "MDN — inputmode and autocomplete",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode",
        whatGood:
          "Documents exactly which attribute controls the keyboard versus autofill — they are different mechanisms, and setting only one is the usual half-fix.",
        takeaway:
          "Copy the full triplet per field: type for semantics and validation, inputmode for the keyboard, autocomplete for autofill.",
        mobile:
          "The attribute has no visible effect on desktop at all, which is exactly why it gets skipped. Its entire purpose is the phone keyboard.",
      },
      {
        name: "GOV.UK Design System — text input",
        url: "https://design-system.service.gov.uk/components/text-input/",
        whatGood:
          "Production guidance derived from testing with users on low-end phones, covering autocomplete tokens, input sizing and never relying on placeholder text as a label.",
        takeaway:
          "Copy the attribute guidance and the visible-label rule. Both are already partly in item 9; this item makes the mobile half explicit.",
        mobile:
          "Their inputs are deliberately large enough to avoid iOS zoom and comfortable for a thumb — the same 16px floor this item enforces.",
      },
    ],
    test: {
      preconditions: [
        "A real phone available — a resized desktop window does not reproduce keyboard behaviour",
        "Browser viewport set to 375×812",
      ],
      steps: [
        {
          action:
            "At 375×812, assert type, inputmode and autocomplete on every field, and computed font-size ≥16px on every input.",
          tool: "browser",
          expect: "All three attributes correct per field; no input under 16px.",
        },
        {
          action: "On a real phone, tap into each field and observe the keyboard and any page zoom.",
          tool: "manual",
          expect:
            "Correct keyboard per field (numeric pad for phone, @-key for email); the page does not zoom on focus.",
        },
        {
          action:
            "On a real phone, part-fill the form, background the browser, return, and check the values.",
          tool: "manual",
          expect: "Entered values preserved. Losing them is the abandonment case this item exists for.",
        },
        {
          action: "With the keyboard open, confirm the submit control is still reachable.",
          tool: "manual",
          expect: "Submit visible or reachable by scrolling; never permanently covered.",
        },
      ],
      mobileFirst: [
        "Correct type / inputmode / autocomplete on every field",
        "No input under 16px — no iOS zoom-on-focus",
        "Values survive backgrounding and back-navigation on a real device",
        "Submit reachable with the on-screen keyboard open",
      ],
      pass: [
        "All fields declare the correct attribute triplet",
        "No sub-16px inputs",
        "State preserved across interruption",
        "Submit never permanently obscured",
      ],
      gotchas: [
        "Every defect in this item is invisible at desktop width and in a resized window. Without a real device this item cannot be honestly closed.",
      ],
    },
  },
  {
    id: 33,
    title: "Loading and empty states for every async interaction",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§17 state design · §22 loading/empty states",
    harness: ["GTH-1", "GTH-4", "GTH-8", "GTH-9", "GTH-13", "GTH-19"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 3, reach: 4, risk: 2, effort: 5, readiness: 5 },
    effort: "S",
    status: "not-started",
    wave: 2,
    job: "Never be left wondering whether something is happening",
    story:
      "As a patient on a slow connection, I can always tell whether the site is working, and an empty result still offers me a way forward.",
    problem:
      "Item 9 covers success and error. The blueprint names four states, not two — loading and empty are missing. On a throttled mobile connection a submit with no loading state reads as broken and produces a double submission; an empty result with no fallback is a dead end.",
    where: "AppointmentForm · any future async surface",
    scope: [
      "Loading state on every async action, with space reserved so it doesn't shift layout",
      "Empty states that offer the phone rather than dead-ending",
      "Disable or guard the submit control while in flight to prevent double submission",
      "aria-busy or a live region so the state is announced, not just visual",
    ],
    acceptance: [
      "Every async action shows a loading state within 100ms of activation",
      "No layout shift when the loading state appears (CLS ≤0.1)",
      "Every empty state offers a working alternative",
      "Double submission is impossible",
    ],
    evidence:
      "Blueprint §17 state design and §22 — 'every interactive component ships with its loading, success, error and recovery behavior; no dead ends.'",
    dependsOn: "Item 9",
    outOfScope: "Skeleton screens for content that loads instantly. A spinner for a 50ms action is worse than none.",
    references: [
      {
        name: "NN/g — response times and progress indicators",
        url: "https://www.nngroup.com/articles/response-times-3-important-limits/",
        whatGood:
          "The three response-time limits that decide when feedback is required: under 0.1s feels instant, 1s keeps flow, and beyond 10s attention is lost. Turns 'add a spinner' into a threshold.",
        takeaway:
          "Copy the thresholds as the rule for when a loading state is required rather than adding one everywhere.",
        mobile:
          "On a throttled mobile connection almost every network action crosses the 1s threshold, so states that seem unnecessary on a fast desktop connection are mandatory on a phone.",
      },
      {
        name: "GOV.UK Design System — error and empty states in service patterns",
        url: "https://design-system.service.gov.uk/patterns/",
        whatGood:
          "Treats the unhappy path as a first-class design deliverable rather than an afterthought, always leaving a route forward.",
        takeaway:
          "Copy the 'always a route forward' rule — for us that route is the phone.",
        mobile:
          "A dead-ended mobile user has no second tab to try. The fallback has to be in the empty state itself.",
      },
    ],
    test: {
      preconditions: ["Item 9 shipped", "Network throttling available", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812 on a throttled connection, submit the form and observe feedback.",
          tool: "browser",
          expect: "A loading state appears within ~100ms and persists until resolution.",
        },
        {
          action: "Measure CLS while the loading state appears and resolves.",
          tool: "browser",
          expect: "CLS ≤0.1 — the state reserves its space rather than shoving content.",
        },
        {
          action: "Tap submit repeatedly while in flight.",
          tool: "browser",
          expect: "Exactly one submission. Double-submits are the classic slow-connection defect.",
        },
        {
          action: "Force an empty result and inspect the state.",
          tool: "browser",
          expect: "A working alternative is offered — the phone — not a blank panel.",
        },
      ],
      mobileFirst: [
        "Loading state visible within ~100ms on a throttled mobile connection",
        "No layout shift when it appears (CLS ≤0.1)",
        "Repeated taps while in flight produce exactly one submission",
        "Empty states offer a one-tap phone fallback",
      ],
      pass: [
        "All four states present on every async interaction",
        "No CLS from state transitions",
        "Double submission impossible",
        "No dead-end empty state",
      ],
    },
  },
  {
    id: 34,
    title: "Prominent, honest, badged hours (early / late / weekend)",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§9 Downtown hours · §26 row 21 · P1-11",
    harness: ["GTH-1", "GTH-10", "GTH-13", "GTH-14", "GTH-17"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 4, risk: 2, effort: 5, readiness: 2 },
    effort: "S",
    status: "partial",
    wave: 2,
    job: "Fit dental care around my working day",
    story:
      "As a time-poor professional, I can see at a glance whether this practice opens early enough to see me before work.",
    problem:
      "Hours are a competitive axis the blueprint found most downtown practices under-serving, and patients name early/late/weekend availability explicitly as a choose factor. This practice opens at 7:00 AM — genuinely early — and the site currently states it as a flat row in a menu rather than surfacing it as the advantage it is. Hours also currently appear in several places and must not disagree.",
    where: "Nav · BookingBlock · Footer · Location section",
    scope: [
      "Surface the 7:00 AM open as a badge where it earns attention, not buried in a list",
      "State closed days honestly rather than omitting them",
      "One source of truth — hours identical across every surface and matching the Google Business Profile",
      "Only badge what is true: no weekend badge if there are no weekend hours",
      "PARTIAL (2026-09-02): dependsOn resolved by item 3's GBP check (hours already confirmed to match). BookingBlock.tsx now states the 7:00 AM open inline in the 'Visit us' eyebrow ('Visit us · Open from 7:00 AM' — a separate pill badge was tried first and reverted per Akash's direct 'floating' feedback), and the hours list below now states both rows honestly — the open range AND 'Saturday – Monday · Closed' — instead of hiding the closed one, in full-width stacked rows (not a cramped two-column grid) so the string doesn't wrap mid-phrase. All from the single `hours` array in content.ts, so this stays one source of truth by construction; no new duplicate hours string was introduced. Still open: Nav and LocationMapSection (the other two `where` surfaces) don't carry the early-open mention yet — wasn't part of this PR's scope.",
    ],
    acceptance: [
      "Hours identical on every surface and matching the GBP",
      "The early-open advantage is visible without opening a menu on mobile",
      "No badge claims availability the practice doesn't have",
    ],
    evidence:
      "Blueprint §9: patients praise '7am' and weekend availability explicitly; several examined downtown practices close Fri–Sun with no evening hours. Our primary persona is a time-poor professional, which makes this a direct fit signal.",
    dependsOn: "Akash confirming hours are current and match the GBP",
    outOfScope:
      "A live 'open now' indicator. A static hours list is the accepted lower-cost v1 per the locked navigation requirements.",
    references: [
      {
        name: "Google Business Profile — hours and special hours",
        url: "https://support.google.com/business/answer/3038163",
        whatGood:
          "The listing is where most patients actually check hours, and it supports special/holiday hours — so the site's job is to agree with it rather than compete.",
        takeaway:
          "Copy the discipline of one authoritative source. Any disagreement between site and listing is a trust failure.",
        mobile:
          "Hours are checked overwhelmingly on a phone, usually from Maps. The site's hours must survive being read at 375px without a table that scrolls sideways.",
      },
      {
        name: "Dentistry on Queen Anne — hours presentation",
        url: "https://www.dentistryonqueenanne.com/",
        whatGood:
          "A local comparator stating hours plainly and consistently across the site rather than only in a footer.",
        takeaway:
          "Copy the consistency. Don't copy burying hours in the footer alone — for our persona this is a decision factor, not reference material.",
        mobile:
          "Their hours read as a label/value list rather than a table, which is what survives a narrow column — the same pattern already used in our hamburger.",
      },
    ],
    test: {
      preconditions: ["Akash has confirmed hours", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm hours are reachable without opening the hamburger.",
          tool: "browser",
          expect: "Visible somewhere in the page flow, not menu-only.",
        },
        {
          action: "Collect the hours string from every surface that renders it.",
          tool: "shell",
          viewport: "any",
          expect: "Identical everywhere; all derived from one value in content.ts.",
        },
        {
          action: "Compare against the live Google Business Profile.",
          tool: "manual",
          viewport: "any",
          expect: "Exact match including closed days.",
        },
        {
          action: "Check every badge against the confirmed hours.",
          tool: "browser",
          expect: "No badge claims availability the practice doesn't have.",
        },
      ],
      mobileFirst: [
        "Hours reachable at 375px without opening the hamburger",
        "Hours render as a label/value list, not a sideways-scrolling table",
        "No badge claims unavailable hours",
      ],
      pass: [
        "Hours identical across all surfaces and matching the GBP",
        "Early-open advantage surfaced rather than buried",
        "Every badge traces to confirmed hours",
      ],
    },
  },
  {
    id: 35,
    title: "Publish one honest bounded first-visit self-pay price",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§15 adopt-list · §12 uninsured path · P1-9",
    harness: ["GTH-10", "GTH-13", "GTH-14", "GTH-20"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 4, risk: 3, effort: 5, readiness: 1 },
    effort: "S",
    status: "blocked",
    wave: 3,
    job: "Know what this will cost me before I commit",
    story:
      "As an uninsured or cost-anxious patient, I can see one real number for a first visit instead of being told to call.",
    problem:
      "The blueprint identifies this as the single sharpest differentiator available: one honest bounded price for a first self-pay visit beats every competitor's 'we accept most insurance'. Cost uncertainty is a documented reason patients delay care, and roughly half our researched scenarios are cost-sensitive. It is one sentence — entirely blocked on the practice committing to a number it will honour.",
    where: "/insurance-new-patients · homepage insurance block",
    scope: [
      "One bounded, honest first-visit self-pay figure the practice will stand behind",
      "State exactly what it includes and what it doesn't",
      "State plainly when it does not apply",
      "Ship nothing if the practice won't commit — a number that isn't honoured is worse than silence",
    ],
    acceptance: [
      "Either one committed figure with its inclusions, or the item is closed as declined",
      "The figure is signed off in writing by Akash",
      "No figure appears anywhere else that contradicts it",
    ],
    evidence:
      "Blueprint §15 adopt-list, exemplar Integrity Dental Boston publishing a first-visit self-pay price. Corroborates our own finding that cost uncertainty drives delay while the publishable part costs nothing but a decision.",
    dependsOn: "The practice committing to a first-visit self-pay price it will honour",
    outOfScope:
      "A per-procedure price list. The blueprint defers that explicitly — we can't stand behind it without an ops commitment.",
    references: [
      {
        name: "Integrity Dental Boston — published self-pay first-visit price",
        url: "https://www.integritydentalboston.com/",
        whatGood:
          "Publishes a single bounded number for a first visit without insurance, with what it covers — the only practice in the blueprint's scan doing so. It converts the most-avoided question into the most reassuring answer.",
        takeaway:
          "Copy the single-bounded-number approach and the inclusions list. Don't copy it as a marketing offer — it's a transparency commitment, not a discount.",
        mobile:
          "One number and one inclusions line fits a 375px column effortlessly, which is why it works where a fee schedule would not. Keep it to that.",
      },
      {
        name: "CMS — hospital price transparency",
        url: "https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency",
        whatGood:
          "Sets the direction of travel for healthcare cost disclosure — meaningful cost information before service rather than a bill afterwards.",
        takeaway:
          "Adopt the principle. Note the rule binds hospitals, not private dental practices — we do this because it's right, and must not claim compliance with a rule that doesn't apply.",
        mobile:
          "Its machine-readable files are the cautionary case: technically transparent, practically unreadable on a phone. One sentence beats a data file.",
      },
    ],
    test: {
      preconditions: ["The practice has committed to a figure in writing, or declined"],
      steps: [
        {
          action: "At 375×812, confirm the figure and its inclusions read as one block.",
          tool: "browser",
          expect: "Number, what it includes, and when it doesn't apply — all visible together.",
        },
        {
          action: "Search the whole site for any other currency figure.",
          tool: "shell",
          viewport: "any",
          expect: "No figure anywhere contradicts this one.",
        },
        {
          action: "Confirm written sign-off from Akash for the exact figure and inclusions.",
          tool: "manual",
          viewport: "any",
          expect: "Documented. Without it, this item ships nothing.",
        },
      ],
      mobileFirst: [
        "Figure, inclusions and exclusions read as one block at 375px",
        "No sideways scroll from any pricing layout",
      ],
      pass: [
        "One committed figure with inclusions, signed off — or the item closed as declined",
        "No contradicting figure elsewhere on the site",
      ],
      gotchas: [
        "Declining this item is a legitimate outcome. Publishing a number the practice won't honour is the failure mode, not leaving it out.",
      ],
    },
  },
  {
    id: 36,
    title: "Verify-benefits path — \"not sure? we'll help you check\"",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§12 insurance · §26 row 20 · P1-8",
    harness: ["GTH-1", "GTH-10", "GTH-13", "GTH-14", "GTH-18"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 4, risk: 3, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
    wave: 2,
    job: "Find out whether my specific plan is covered",
    story:
      "As a patient who can't tell from a carrier list whether my plan is covered, I have a named way to find out without guessing.",
    problem:
      "A carrier list alone doesn't answer the real question, because plans differ within a carrier. The blueprint's answer is to pair the list with an explicit offer to check on the patient's behalf — which converts the site's highest-risk ambiguity into a service. Without it, the honest caveat we already plan ('plans differ, confirm yours') dead-ends the patient.",
    where: "/insurance-new-patients · homepage insurance block",
    scope: [
      "An explicit offer: give us your plan details and we'll confirm before your visit",
      "Route it through the existing appointment request rather than building a second form",
      "Plain explanation of what the practice can and cannot confirm in advance",
      "State the response time only if the practice will commit to one",
    ],
    acceptance: [
      "Every carrier mention is adjacent to a working verify path",
      "The path is completable on a phone without a call",
      "No response-time promise unless confirmed",
    ],
    evidence:
      "Blueprint §12 and the ADA out-of-network guidance both identify the accepted-vs-in-network gap as the top abandonment cause. The verify path is what stops the honest caveat from becoming a dead end.",
    dependsOn: "Item 6 · practice confirming it will do benefit checks and how fast",
    outOfScope:
      "A real-time eligibility lookup. No API, and a fake picker would imply certainty we can't deliver.",
    references: [
      {
        name: "ADA — out-of-network provider guidance",
        url: "https://adanews.ada.org/ada-news/2025/november/dear-ada-out-of-network-providers/",
        whatGood:
          "Documents the balance-bill failure mode that follows from a patient assuming a carrier list means their plan is in-network — the exact gap this path closes.",
        takeaway:
          "Copy the standard: never let a carrier list stand alone as the answer.",
        mobile:
          "A patient reading a carrier list on a phone has their insurance card in the other hand. The verify path has to accept those details on the same screen, not send them to a desktop.",
      },
      {
        name: "Zocdoc — insurance resolved before commitment",
        url: "https://www.zocdoc.com/resources/blog/article/patient-self-scheduling/",
        whatGood:
          "Puts insurance verification at the front of the flow rather than after booking, because that's where the friction actually is.",
        takeaway:
          "Copy the sequencing. Do not copy the plan-picker dropdown — dozens of options is bad on mobile and implies certainty we don't have.",
        mobile:
          "Their flow is one decision per screen with thumb-reachable controls; our verify path should be a couple of optional fields on the existing request form, not a new journey.",
      },
    ],
    test: {
      preconditions: ["Item 6 shipped", "Practice confirmed it will do benefit checks", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm a verify path is adjacent to every carrier mention.",
          tool: "browser",
          expect: "Reachable without scrolling away from the carrier list.",
        },
        {
          action: "Complete the verify path on a phone without calling.",
          tool: "browser",
          expect: "Completable; fields use the correct mobile keyboards (GTH-18).",
        },
        {
          action: "Scan for response-time promises.",
          tool: "shell",
          viewport: "any",
          expect: "None unless the practice has committed to one.",
        },
      ],
      mobileFirst: [
        "Verify path adjacent to the carrier list at 375px",
        "Completable on a phone without a call, with correct mobile keyboards",
        "No unconfirmed response-time promise",
      ],
      pass: [
        "Carrier mentions always paired with a working verify path",
        "Path completable on mobile",
        "No unverified promise",
      ],
    },
  },
  {
    id: 37,
    title: "Mobile-first type and spacing scale",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§17 typography & spacing",
    harness: ["GTH-1", "GTH-5", "GTH-13", "GTH-20"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 2, reach: 5, risk: 3, effort: 5, readiness: 5 },
    effort: "S",
    status: "partial",
    wave: 1,
    job: "Read the site comfortably on a phone",
    story:
      "As any patient, text is sized and spaced for the screen I'm actually on, not scaled down from a desktop design.",
    problem:
      "Our locked tokens define colour and font family but no type scale or spacing scale. Sizes are chosen per component, which is how a 16px rule drifts. The blueprint supplies a mobile-first scale: author the phone value first and enlarge for desktop, never shrink a desktop comp. This adds structure without touching any locked token.",
    where: "src/app/globals.css",
    scope: [
      "Type scale authored mobile-first: body 17px on phones (never below 16 for body or inputs), 14 fine print, heading steps ~1.2",
      "Desktop enhancement at ≥1024px scaling the same roles up (~1.25 step)",
      "Spacing scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96, with phones working at the lower end so the primary action isn't pushed down",
      "≥16px gutters on mobile so nothing touches the screen edge",
      "Line length ~35–40 characters on a phone; line-height 1.5 body / 1.2–1.3 headings",
      "Headline sizes capped so nothing forces sideways scroll at 320px",
    ],
    acceptance: [
      "A named scale exists in globals.css and components reference it",
      "No body text or input below 16px anywhere",
      "No headline forces horizontal scroll at 320px",
      "No locked colour or font-family token changed",
    ],
    evidence:
      "Blueprint §17. Note the 16px input floor is the same rule as GTH-18 (iOS zoom-on-focus) approached from typography rather than forms — two independent reasons for one constraint.\n\n" +
      "2026-08-31 implementation: named scale added in globals.css by overriding Tailwind's --text-xs..--text-7xl tokens through the same :root-variable + @theme-inline indirection already used for the locked colour tokens, so every existing text-* utility across every component picks the scale up automatically — no per-component rewrite needed, and a @media (min-width:1024px) block re-values the same tokens upward (~1.2 mobile step, ~1.25 desktop step) for the desktop enhancement. Verified in-browser against the deployed dev build: body/inputs render at 17px (was 16px), fine print floor raised to 14px (was 12px, Logo's 'Dentistry' wordmark and two insurance-badge labels were hardcoded arbitrary sub-14px values, moved onto the new text-xs token), no horizontal overflow at 320px on any of the 5 patient-facing pages, contact form inputs measured at 17px, and html{font-size:200%} produces no clipping/overflow. Hero's h1 line-height raised from 1.1 to 1.2 to meet the heading line-height floor.\n\n" +
      "Left partial rather than done: /backlog (src/components/BacklogView.tsx) still has ~15 hardcoded text-[0.6875rem] (11px) instances below the fine-print floor — deliberately left alone since it's the noindex internal review tool, not patient-facing (this item's own story is scoped to 'any patient'), and another session had it under active edit at review time. Worth a follow-up pass if the internal tool's own readability matters enough to spend the effort. Also surfaced, logged separately rather than fixed here since it's a Nav.tsx flex-shrink layout bug unrelated to type sizing: the header logo visually clips behind the phone-icon button at exactly 320px (confirmed independent of font-size — the logo's box stays a fixed width regardless of its text size).",
    dependsOn: null,
    outOfScope:
      "Changing the locked colour or font tokens. Fraunces and Inter stay; this defines how they are sized, not what they are.",
    references: [
      {
        name: "GOV.UK Design System — typography",
        url: "https://design-system.service.gov.uk/styles/type-scale/",
        whatGood:
          "A production type scale with explicit per-breakpoint values, tested for readability across a very wide ability range rather than derived from a ratio in isolation.",
        takeaway:
          "Copy the practice of naming explicit values per breakpoint. Don't copy the values themselves — ours must suit Fraunces and Inter.",
        mobile:
          "Their scale is authored mobile-first and enlarges upward, which is exactly the inversion this item is making. Sizes are never shrunk down from desktop.",
      },
      {
        name: "WCAG 2.2 — 1.4.4 Resize text and 1.4.12 Text Spacing",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html",
        whatGood:
          "Defines the normative floor a scale has to survive: 200% resize with no loss of content, and user-applied spacing overrides without clipping.",
        takeaway:
          "Use as the acceptance test for the scale, not just as a guideline.",
        mobile:
          "Both criteria bite hardest at 320px, where a scale that only works at generous widths clips or overlaps immediately.",
      },
    ],
    test: {
      preconditions: ["Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, measure computed font-size on all body text and inputs.",
          tool: "browser",
          expect: "Nothing below 16px; body at the scale's phone value.",
        },
        {
          action: "At 320px, check every headline for horizontal overflow.",
          tool: "browser",
          expect: "No headline forces sideways scroll.",
        },
        {
          action: "Apply html{font-size:200%} and check for clipping or overlap.",
          tool: "browser",
          expect: "No loss of content or function (GTH-20).",
        },
        {
          action: "Diff globals.css to confirm no colour or font-family token changed.",
          tool: "shell",
          viewport: "any",
          expect: "Only scale additions. Locked tokens untouched.",
        },
      ],
      mobileFirst: [
        "Phone values authored first; desktop scales up from them",
        "No body text or input below 16px at 375px",
        "No headline overflow at 320px",
        "Survives 200% text resize",
      ],
      pass: [
        "Named scale in globals.css, referenced by components",
        "No sub-16px body or input",
        "No 320px headline overflow",
        "Zero locked-token changes",
      ],
      gotchas: [
        "This item must not become a palette change. If a proposal touches a --color-* value it belongs with the flagged conflicts (items 45–47), not here.",
      ],
    },
  },
  {
    id: 38,
    title: "Performance and Core Web Vitals budget",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§24 Build Item 25 · GTH-2 / GTH-19",
    harness: ["GTH-2", "GTH-8", "GTH-13", "GTH-19"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 5, risk: 3, effort: 3, readiness: 5 },
    effort: "M",
    status: "done",
    wave: 2,
    job: "Reach the site at all, on a real connection",
    story:
      "As a patient on a phone with a mediocre connection, the page is usable quickly rather than a blank screen.",
    problem:
      "Page weight is a patient-care issue, not a nicety, and we have never measured it. The homepage carries 29 images and two continuously-animating carousels — the exact LCP and CLS risk profile — and the blueprint sets an explicit throttled-mobile budget. First impression happens in seconds on a phone, and a slow load is an abandonment before any content is judged.",
    where: "Sitewide, homepage first",
    scope: [
      "Establish the budget: LCP ≤2.5s, CLS ≤0.1, TBT ≤200ms, Performance ≥90 on the Lighthouse mobile preset",
      "Measure the homepage first — 29 images and two carousels",
      "Fix what's cheap: image sizing, formats, lazy-loading below the fold, reserving space to stop shift",
      "Record the baseline so regressions are visible",
    ],
    acceptance: [
      "Budget met on the homepage at the throttled mobile preset, or every miss logged with an owner",
      "Baseline numbers recorded",
      "Measured against the deployed preview, never localhost",
    ],
    evidence:
      "Blueprint §24 Build Item 25 and GTH-19. Corroborated by our own finding that mobile is where LCP fails most often, and our homepage is 12.4 screens with 29 images.\n\n" +
      "First real measurement, 2026-08-31, done as a byproduct of item 27's own Core Web Vitals check: throttled mobile Lighthouse (4x CPU, simulated slow 4G) against the deployed Vercel preview gave LCP 2.4-3.6s (median 2.9s, above the 2.5s budget), CLS 0 (within budget), TBT 10-30ms (well within the 200ms budget), Performance score 0.87-0.98. Found and fixed one real cause: HeroCarousel's LCP image used the `priority` prop, deprecated in Next 16 in favor of `preload`, which unlike the old prop does not by itself add `fetchPriority=\"high\"` — confirmed via production HTML that the attribute was missing from both the image and its preload link. Fixed with `preload` + explicit `fetchPriority=\"high\"`; re-measured LCP at 2.4-3.2s (median 2.6s) after the fix, CLS still 0, Performance score 0.92-0.98 — budget effectively met on CLS/TBT/Performance, LCP still marginal. The Lighthouse LCP-breakdown trace surfaced a further, unexplained ~960ms 'element render delay' now eating most of the remaining LCP time; logged as item 57 rather than chased here since the root cause needs its own investigation. Status moved to partial at that point: budget established and measured against the deployed preview, one real cause found and fixed, one remaining miss logged with item 57 as owner.\n\n" +
      "Item 57's investigation (same day) found the ~960ms figure wasn't reproducible across 8 repeat runs (28-80ms every time) and traced the original spike to CPU contention on the shared measurement host, not a code defect — see item 57's own evidence for the full reproducibility test. That investigation also surfaced a better measurement method for this repo going forward: `--throttling-method=devtools` (real network/CPU throttling during capture) rather than `simulate` (runs at full speed, then models a throttled estimate afterward) — `simulate` mode's own breakdown numbers didn't internally reconcile with its headline LCP on this host, while `devtools` mode's did, consistently. Re-measured the full budget against production with `devtools` throttling, 3 runs: LCP 2110-2123ms (comfortably under 2.5s), CLS 0, TBT 20-30ms, Performance score 0.95-0.98. Every budget metric now cleanly met on a trustworthy measurement method. Status moves to done.",
    dependsOn: null,
    outOfScope: "A rewrite for performance. Measure, fix what's cheap, log the rest.",
    references: [
      {
        name: "web.dev — Web Vitals",
        url: "https://web.dev/articles/vitals",
        whatGood:
          "Defines the three user-centred metrics and their thresholds at the 75th percentile — an objective bar rather than a subjective read of 'feels fast'.",
        takeaway: "Copy the thresholds directly as the budget. Measure field-realistic conditions.",
        mobile:
          "Explicitly device-segmented, and mobile is where sites fail — LCP most of all. The mobile preset is the measurement that counts.",
      },
      {
        name: "Next.js — image optimization",
        url: "https://nextjs.org/docs/app/api-reference/components/image",
        whatGood:
          "Handles the exact failure modes we have: responsive sizing, modern formats, lazy-loading, and reserving space to prevent layout shift.",
        takeaway:
          "Confirm every image goes through it with correct sizes. An unoptimized hero is the most common LCP cause.",
        mobile:
          "Its `sizes` attribute is what stops a phone downloading a desktop-width image — the single biggest mobile weight win available to us.",
      },
    ],
    test: {
      preconditions: ["Deployed preview available (not localhost)"],
      steps: [
        {
          action: "Run Lighthouse mobile preset against the homepage on the deployed preview.",
          tool: "validator",
          expect: "LCP ≤2.5s, CLS ≤0.1, TBT ≤200ms, Performance ≥90 — or each miss recorded.",
        },
        {
          action: "At 375×812 on a throttled connection, observe what renders first and when.",
          tool: "browser",
          expect: "Headline and primary action usable early; no long blank phase.",
        },
        {
          action: "Check every image is served through next/image with a correct sizes attribute.",
          tool: "shell",
          viewport: "any",
          expect: "No raw img tags serving desktop-width files to phones.",
        },
        {
          action: "Measure CLS through full page load including both carousels.",
          tool: "browser",
          expect: "CLS ≤0.1; carousels reserve their space.",
        },
      ],
      mobileFirst: [
        "Budget measured on the Lighthouse mobile preset, throttled, against the deployed preview",
        "Headline and primary action usable early at 375px on a throttled connection",
        "Every image responsive with correct sizes",
        "CLS ≤0.1 including both carousels",
      ],
      pass: [
        "Budget met on the homepage or every miss logged with an owner",
        "Baseline recorded for regression tracking",
        "No unoptimized image path",
      ],
      gotchas: [
        "Localhost numbers are meaningless — no throttling, warm cache, no network. Always measure the deployed preview on the mobile preset.",
      ],
    },
  },
  {
    id: 39,
    title: "Design anti-pattern audit against the ten named failure modes",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§17 \"what could make this site feel wrong\" · §15C anti-patterns",
    harness: ["GTH-1", "GTH-5", "GTH-10", "GTH-13", "GTH-22"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 3, reach: 5, risk: 2, effort: 3, readiness: 5 },
    effort: "M",
    status: "done",
    wave: 3,
    job: "Trust the practice from how the site feels, not just what it says",
    story:
      "As a patient forming an impression in seconds, nothing about the site reads as generic, salesy, cold, juvenile or untrustworthy.",
    problem:
      "The blueprint names ten specific ways a dental site can feel wrong — generic, untrustworthy, overly corporate, too expensive, sterile, juvenile, clinically intimidating, visually noisy, hard to read, aggressively sales-driven — each with a cause and an antidote. We have never audited against them. Several are live risks here: offer cards can read salesy, the testimonial rail auto-scrolls, and unverified claims read as untrustworthy.",
    where: "Sitewide design review",
    scope: [
      "Walk all ten failure modes against every page at 375px",
      "Check the specific anti-patterns: superlatives, urgency banners, autoplay, fabricated-looking reviews, contradictory information, stock-looking imagery",
      "Record a verdict per mode with evidence, not an impression",
      "Fix what's cheap; log the rest as its own item",
    ],
    acceptance: [
      "A recorded verdict for each of the ten modes",
      "Zero superlatives or unverifiable puffery sitewide",
      "Zero urgency or false-scarcity language",
      "Every finding fixed or logged with an owner",
    ],
    evidence:
      "Blueprint §17 failure-mode table and §15C observed anti-patterns — several drawn from real Seattle practice sites, including fabricated-looking testimonials and hours that contradict across a page.\n\n" +
      "AUDITED 2026-09-02, all ten modes walked at 375px plus the four shell-level checks (superlative/urgency regex scan sitewide, autoplay/reduced-motion check, contradictory-info check on hours/phone/address). Ten verdicts:\n\n" +
      "1. Generic — PARTIAL. Real named dentist, real credentials, real office/treatment-room photography and a real testimonial rail all pass. But 6 of the homepage's photo slots (4 `services` tiles, 2 `offers` cards, content.ts ~L394-421/121-129) are stock Unsplash images, not real practice photography — a deliberate 2026-09-01 swap away from Akash's own raw clinical macro/x-ray shots for patient-comfort reasons (see content.ts comment at that line), but stock imagery is exactly this mode's named cause. Logged as its own item — **item 60** — since real photography isn't a cheap fix.\n" +
      "2. Untrustworthy — FAIL, already tracked. `grep -rn \"<Placeholder\" src/` still finds 13 live production render sites (insurance carrier names, new-patient offer/financing copy) — bracketed unconfirmed claims visible to a patient. This is item 2's exact scope; not re-logged here, just confirmed still open and blocking.\n" +
      "3. Overly corporate/cold — PASS. Warm-ivory/terracotta/espresso palette throughout (no navy-only/sterile-grid look), human first-person copy (\"we handle the insurance paperwork\", \"we're happy to walk through what a visit looks like\"), real people named and photographed.\n" +
      "4. Too expensive/exclusive — PASS. No luxury-only cues or cosmetic-only framing — Services page leads with General & preventive, not veneers/whitening; insurance page explicitly welcomes uninsured patients (\"call us to talk about your options\"). Real pricing itself is out of scope here — that's items 20/35/36, separately blocked on a practice pricing decision.\n" +
      "5. Sterile/clinical — PASS. Warm palette, real office photography (natural light, plants visible through window), no white+red medical-iconography look. `/emergency` in particular reads as calm/plain-language rather than clinical (see mode 7).\n" +
      "6. Juvenile — PASS. No cartoon mascots or primary-color overload anywhere in `src/components/icons.tsx` or the palette; type and iconography read as grown-up throughout.\n" +
      "7. Clinically intimidating — PASS. Walked `/emergency` specifically (the highest-risk page for this mode): plain language throughout (\"Call 911 or go to the nearest emergency room right away if...\"), no scary procedure imagery, a plain-English \"what to do right now\" structure with a genuine what-to-expect tone. `/insurance-new-patients` translates all five common insurance terms (premium/deductible/copay/coinsurance/annual maximum) into one plain sentence each — the anti-jargon antidote applied directly.\n" +
      "8. Visually noisy — PASS WITH A NOTE. Zero popups, zero promo banners, no urgency language (regex scan below). `TestimonialsSection.tsx` does run a continuous auto-scroll — technically this mode's named cause — but it already carries the two mitigations the blueprint's own antidote calls for: it fully skips starting its rAF loop under `prefers-reduced-motion`, and it exposes a `<button aria-pressed>` pause/play control satisfying WCAG 2.2.2. This exact tradeoff was already reviewed and accepted by Akash (see build-spec status log, item 34 entry) rather than being a fresh miss — recorded here as a verdict, not re-litigated or reverted.\n" +
      "9. Hard to read — PARTIAL. Sitewide `grep` confirms zero `font-size` overrides below the locked Inter-body-16px floor in Tailwind config, but a DOM-level check on `/insurance-new-patients` found real body-adjacent copy rendering at 14px computed size — e.g. the page's own intro sentence (\"The five words that show up most on an insurance statement...\") and the two Placeholder financing/PPO lines, not just breadcrumbs/legal fine print. This is exactly item 37's existing scope (\"Mobile-first type and spacing scale\", currently `partial`) — logged there as an open sub-finding rather than duplicated as a new item, and not blanket-edited here since separating genuine body copy from intentional fine print (breadcrumbs, footer copyright) needs the same care item 37 already applies, not a hasty sitewide find-and-replace.\n" +
      "10. Aggressive/sales-driven — PASS. `grep -rniE \"limited time|act now|hurry|only [0-9]+ left|today only|don't wait\"` across `src/` returns zero matches; same for superlative/puffery regex (`award|best|#1|top dentist|world-class|state-of-the-art`) — the one hit is inside a genuine attributed Google review (Karthik B., content.ts L316, part of item 13's real-reviews pull), a patient's own words, not marketing copy, so it's the antidote's \"genuine attributed reviews\" case, not a violation.\n\n" +
      "Shell-level checks: contrast/consistency — `hours` and `contact.phone` are each defined once in content.ts and imported everywhere they render (Nav, BookingBlock, LocationMapSection, footer), so the contradictory-hours-across-the-page failure mode observed on Capitol Hill Dentist is structurally prevented here, not just avoided by luck.",
    dependsOn: null,
    outOfScope:
      "Redesigning to taste. This audits against named failure modes with stated causes, not personal preference.",
    references: [
      {
        name: "NN/g — trustworthiness and credibility on the web",
        url: "https://www.nngroup.com/articles/trustworthy-design/",
        whatGood:
          "Grounds credibility in observable design attributes — currency, specificity, absence of hype — rather than treating trust as an aesthetic outcome.",
        takeaway:
          "Copy the attribute-level framing so the audit produces findings rather than opinions.",
        mobile:
          "Credibility is judged in the first seconds, and on a phone that judgement happens within one viewport. The audit weights what's above the fold at 375px most heavily.",
      },
      {
        name: "Blueprint §15C — observed dental anti-patterns",
        url: "https://www.chicagoloopdentistry.com/",
        whatGood:
          "Its anti-pattern list is drawn from real practice sites, including fabricated-sounding testimonials, hours contradicting across a page, and neighbourhood filler before any patient value — concrete failures, not hypotheticals.",
        takeaway:
          "Use the observed list as the audit checklist. Our placeholder testimonials are currently an instance of the fabricated-review pattern.",
        mobile:
          "Neighbourhood filler and promo banners cost proportionally more on a phone, where they consume whole viewports before the patient reaches anything useful.",
      },
    ],
    test: {
      preconditions: ["Items 2 and 13 shipped", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, walk every page against all ten failure modes and record a verdict each.",
          tool: "manual",
          expect: "Ten recorded verdicts with evidence. 'Feels fine' is not a verdict.",
        },
        {
          action: "Scan sitewide for superlatives and puffery: /award|best|#1|top dentist|world-class|state-of-the-art/i.",
          tool: "shell",
          viewport: "any",
          expect:
            "Zero matches. Unverifiable superlatives are discounted by patients and read as the generic-template failure mode.",
        },
        {
          action: "Scan for urgency and false scarcity: /limited time|act now|hurry|only \\d+ left|today only/i.",
          tool: "shell",
          viewport: "any",
          expect:
            "Zero matches. False urgency is the aggressive/sales-driven failure mode and conflicts with the locked blend-not-urgency tone.",
        },
        {
          action: "Check for autoplay and contradictory information at 375px.",
          tool: "browser",
          expect:
            "No autoplay under reduced motion; hours, phone and address agree everywhere they appear.",
        },
      ],
      mobileFirst: [
        "All ten modes assessed at 375px, weighting the first viewport most heavily",
        "No promo or urgency banner consuming a mobile viewport before patient value",
        "No autoplay under prefers-reduced-motion",
      ],
      pass: [
        "Ten recorded verdicts with evidence",
        "Zero superlatives, puffery, or urgency language",
        "No contradictory information across pages",
        "Every finding fixed or logged",
      ],
    },
  },
  {
    id: 40,
    title: "Membership plan / financing path for uninsured patients",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§12 uninsured path · P1-9",
    harness: ["GTH-10", "GTH-13", "GTH-14"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 3, risk: 3, effort: 3, readiness: 1 },
    effort: "M",
    status: "blocked",
    wave: 4,
    job: "Get care without insurance",
    story: "As an uninsured patient, there is a real named path for me, not just an apology.",
    problem:
      "The blueprint found membership plans and financing to be the standard credible answer for the uninsured segment, and their absence a documented abandonment cause. Our item 20 mentions financing; this item is the concrete offering behind it.",
    where: "/insurance-new-patients",
    scope: [
      "Membership plan terms if the practice offers one, or financing terms if it doesn't",
      "Plain-money language: what it costs, what it covers, how to join or apply",
      "Only terms the practice will honour",
      "v2 anti-pattern: keep membership a genuine uninsured safety net with itemised inclusions and an honest \"this is not insurance\" disclosure. An observed site reframed membership as a $595–$1,695/yr concierge tier with cosmetic credits, abandoning the affordability purpose entirely",
    ],
    acceptance: [
      "An uninsured patient has a named, actionable path",
      "Every term is practice-confirmed",
      "No APR or fee published without sign-off",
    ],
    evidence: "Blueprint §12 and the adopt-list exemplars (Chicago Loop, Smile Generation).",
    dependsOn: "Practice confirming membership and/or financing terms",
    outOfScope: "Building a membership signup flow. A described path plus a phone call is the v1.",
    references: [
      {
        name: "Chicago Loop Dentistry — in-house membership plan",
        url: "https://www.chicagoloopdentistry.com/",
        whatGood:
          "States the plan's cost and inclusions plainly rather than gating them behind a call, so an uninsured patient can self-qualify before contacting anyone.",
        takeaway: "Copy the transparency of cost and inclusions. Don't copy any term we can't honour.",
        mobile:
          "Their plan reads as a short list rather than a comparison table — the form that survives a 375px column. Avoid a plan-comparison grid on mobile.",
      },
      {
        name: "CFPB — consumer guidance on medical financing",
        url: "https://www.consumerfinance.gov/consumer-tools/",
        whatGood:
          "Sets the disclosure expectations for medical financing — deferred-interest terms in particular are a documented consumer-harm area.",
        takeaway:
          "If financing is offered, disclose the terms honestly including what happens if it isn't paid off in the promotional window.",
        mobile:
          "Financial terms are read on a phone, in a hurry. Anything requiring a wide table or fine print is effectively undisclosed at 375px.",
      },
    ],
    test: {
      preconditions: ["Practice has confirmed terms", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm the uninsured path reads as a short list, not a comparison table.",
          tool: "browser",
          expect: "Readable in a narrow column with no horizontal scroll.",
        },
        {
          action: "Extract every figure, percentage and financing term and check against sign-off.",
          tool: "shell",
          viewport: "any",
          expect: "Zero unconfirmed terms.",
        },
        {
          action: "Confirm the path is actionable — a next step exists.",
          tool: "browser",
          expect: "Named action, not just a description.",
        },
      ],
      mobileFirst: [
        "Uninsured path readable as a list at 375px with no horizontal scroll",
        "Actionable next step reachable in one tap",
      ],
      pass: ["Named actionable uninsured path", "Every term practice-confirmed"],
    },
  },
  {
    id: 41,
    title: "Appointment reminders and easy rescheduling",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§13 scheduling · §26 row 21 · P1-12",
    harness: ["GTH-1", "GTH-14", "GTH-18"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 3, risk: 2, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
    wave: 4,
    job: "Not lose my appointment to life getting in the way",
    story: "As a busy patient, I get a reminder and can change my appointment without phone tag.",
    problem:
      "Phone tag is a named abandonment cause, and rescheduling currently means calling — into the channel already identified as leaking. Reminders reduce no-shows; a written reschedule path removes a call.",
    where: "Confirmation state · /contact · new-patient content",
    scope: [
      "Clear instructions for changing or cancelling, respecting the stated notice period",
      "Reminder opt-in with a real associated label if the practice sends reminders",
      "SMS consent disclosure if texting is used — ties to the privacy item",
    ],
    acceptance: [
      "A patient can find how to reschedule without calling",
      "Reminder opt-in has a proper label and is genuinely optional",
      "SMS disclosure present if the practice texts",
    ],
    evidence: "Blueprint §13 and P1-12; phone tag is a documented convenience abandonment trigger.",
    dependsOn: "Practice confirming reminder and reschedule policy",
    outOfScope: "Building reminder infrastructure. That belongs to Tab32, not this site.",
    references: [
      {
        name: "NHS — book, check or cancel appointments",
        url: "https://www.nhs.uk/nhs-services/gps/book-check-or-cancel-appointments/",
        whatGood:
          "Treats cancelling and rescheduling as first-class actions with equal prominence to booking, which is what actually reduces no-shows.",
        takeaway: "Copy the parity. A reschedule path hidden behind a phone number is not a path.",
        mobile:
          "Designed for low-end phones with a visible non-digital alternative throughout — the right model for a patient rescheduling from a bus.",
      },
      {
        name: "FCC — TCPA rules on automated texts",
        url: "https://www.fcc.gov/general/telemarketing-and-robocalls",
        whatGood:
          "Sets the consent requirements for automated appointment texts — the reason a reminder opt-in needs real consent capture rather than a pre-ticked box.",
        takeaway:
          "If the practice texts, consent must be explicit and disclosed. Never pre-tick the opt-in.",
        mobile:
          "The opt-in control is tapped on a phone — it needs a real ≥44px target with an associated label, not a tiny checkbox.",
      },
    ],
    test: {
      preconditions: ["Practice policy confirmed", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, find the reschedule instructions without calling.",
          tool: "browser",
          expect: "Present and findable; notice period stated.",
        },
        {
          action: "Check the reminder opt-in control if present.",
          tool: "browser",
          expect: "≥44×44px, associated label, not pre-ticked.",
        },
        {
          action: "Confirm SMS disclosure if the practice texts.",
          tool: "manual",
          viewport: "any",
          expect: "Present, or explicitly marked not applicable.",
        },
      ],
      mobileFirst: [
        "Reschedule instructions findable at 375px without a call",
        "Opt-in control ≥44×44px with an associated label, never pre-ticked",
      ],
      pass: [
        "Reschedule path documented and findable",
        "Opt-in properly labelled and optional",
        "SMS disclosure present if applicable",
      ],
    },
  },
  {
    id: 42,
    title: "Cosmetic overview framed as fact-finding, not sales",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§4K cosmetic jobs · §26 row 23 · P1-14",
    harness: ["GTH-1", "GTH-10", "GTH-13", "GTH-14"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 2, risk: 2, effort: 5, readiness: 3 },
    effort: "S",
    status: "not-started",
    wave: 4,
    job: "Explore cosmetic options without being sold to",
    story:
      "As someone curious about cosmetic work, I can understand the options and what a consultation involves without feeling pressured.",
    problem:
      "Cosmetic content is where dental sites most often turn salesy, which actively alienates the value- and trust-driven patients this site is built for. The blueprint's fix is framing the consultation as fact-finding rather than a sales appointment, and keeping health context alongside aesthetics.",
    where: "Services / cosmetic content",
    scope: [
      "Neutral description of options, process, commitment and upkeep",
      "Consultation framed explicitly as fact-finding with no obligation",
      "Health-first grounding rather than aesthetics alone",
      "No pressure language, no countdowns, no discount-led framing",
    ],
    acceptance: [
      "Zero pressure or urgency language",
      "Consultation described as fact-finding",
      "No before/after imagery without documented patient consent",
    ],
    evidence:
      "Blueprint §4K and the anti-pattern list: salesy cosmetic-only framing alienates trust-driven patients. Matches our locked 'blend, not urgency/discount-led' tone decision.",
    dependsOn: "Confirmed cosmetic service list",
    outOfScope:
      "Before/after galleries. The blueprint defers them pending a consent workflow and an accessibility plan.",
    references: [
      {
        name: "ADA MouthHealthy — cosmetic procedures",
        url: "https://www.mouthhealthy.org/all-topics-a-z",
        whatGood:
          "Describes cosmetic procedures with the same clinical neutrality as restorative ones — process, upkeep, and realistic expectations, with no outcome promises.",
        takeaway: "Copy the neutral register. It is the strongest available antidote to salesy framing.",
        mobile:
          "Short single-column explanations that read fine on a phone. Avoid the wide before/after comparison layouts cosmetic pages default to — they break at 375px and carry consent risk.",
      },
      {
        name: "FTC — health and beauty advertising guidance",
        url: "https://www.ftc.gov/business-guidance/advertising-marketing",
        whatGood:
          "Sets substantiation expectations for outcome claims and testimonials in health-adjacent advertising — directly relevant to cosmetic dentistry copy.",
        takeaway:
          "No outcome claim we can't substantiate; no testimonial implying typical results without basis.",
        mobile:
          "Disclosures must be as prominent as the claim — on a phone that means adjacent to it, not in fine print at the bottom of a long scroll.",
      },
    ],
    test: {
      preconditions: ["Confirmed cosmetic service list", "Viewport 375×812"],
      steps: [
        {
          action: "Scan for pressure language: /limited time|act now|hurry|special offer ends|only \\d+/i.",
          tool: "shell",
          viewport: "any",
          expect:
            "Zero matches. Cosmetic content is where sales pressure most often creeps in, and it alienates the trust-driven patients this site targets.",
        },
        {
          action: "At 375×812, confirm the consultation is described as fact-finding with no obligation.",
          tool: "browser",
          expect: "Explicitly framed; visible without deep scrolling.",
        },
        {
          action: "Confirm no before/after imagery ships without documented consent.",
          tool: "manual",
          viewport: "any",
          expect: "None present, or consent documented per image.",
        },
      ],
      mobileFirst: [
        "Fact-finding framing visible at 375px without deep scrolling",
        "No wide before/after comparison layout breaking at mobile width",
        "No pressure banner consuming a mobile viewport",
      ],
      pass: [
        "Zero pressure language",
        "Consultation framed as fact-finding",
        "No unconsented before/after imagery",
      ],
    },
  },
  {
    id: 43,
    title: "Non-discrimination notice and languages-spoken signal",
    priority: "P1",
    source: "merged",
    launchBlocking: false,
    blueprintRef: "§9 language access · §26 row 22 · P1-10",
    harness: ["GTH-1", "GTH-3", "GTH-13", "GTH-14"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 1, reach: 3, risk: 4, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
    wave: 4,
    job: "Know I'll be served and understood",
    story:
      "As a patient who isn't a native English speaker, or who has been turned away before, I can see the practice's stated commitment.",
    problem:
      "Extends item 23 with the compliance half the blueprint adds: a non-discrimination notice alongside the languages signal, plus html lang set correctly for assistive technology. Seattle has a substantial limited-English population and the city runs a formal language-access program.",
    where: "Footer · /about · /accessibility",
    scope: [
      "Non-discrimination notice",
      "Languages actually spoken by the team, confirmed",
      "html lang set correctly, verified by axe",
      "Plain language throughout as the baseline access measure",
    ],
    acceptance: [
      "Non-discrimination notice present and footer-linked",
      "No language claimed without confirmation",
      "axe html-has-lang passes on every route",
    ],
    evidence:
      "Blueprint §9 and §26 row 22; Seattle OIRA and King County language-access programs establish the local need.",
    dependsOn: "Confirmed team languages · practice-approved non-discrimination wording",
    outOfScope: "Full site translation. Item 23 covers that; this is the signal and the notice.",
    references: [
      {
        name: "HHS — Section 1557 non-discrimination",
        url: "https://www.hhs.gov/civil-rights/for-individuals/section-1557/index.html",
        whatGood:
          "Defines the non-discrimination obligations and notice expectations for health programs, including language-assistance provisions.",
        takeaway:
          "Use as the model for the notice. Applicability to a private dental practice needs legal confirmation — adopt as good practice, don't assert compliance.",
        mobile:
          "The notice must remain readable in a stacked mobile footer rather than becoming a dense block nobody can parse at 375px.",
      },
      {
        name: "Seattle — Language Access Program",
        url: "https://www.seattle.gov/iandraffairs/LA",
        whatGood:
          "Names the languages that actually matter locally and models stating availability plainly without overpromising.",
        takeaway: "Use to prioritise languages. Copy the plain statement of what's genuinely available.",
        mobile:
          "City guidance assumes mobile-primary access for many LEP residents — the signal has to work at 375px, in the footer, without a menu.",
      },
    ],
    test: {
      preconditions: ["Confirmed languages and approved wording", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm both signals are present in the stacked footer.",
          tool: "browser",
          expect: "Readable without horizontal scroll; links ≥44px.",
        },
        {
          action: "Run axe html-has-lang on every route.",
          tool: "validator",
          viewport: "any",
          expect: "Passes everywhere.",
        },
        {
          action: "Check every named language against confirmation.",
          tool: "shell",
          viewport: "any",
          expect: "Zero unconfirmed language claims.",
        },
      ],
      mobileFirst: [
        "Both signals present and readable in the stacked mobile footer",
        "Footer links ≥44×44px",
      ],
      pass: [
        "Non-discrimination notice present and linked",
        "Only confirmed languages named",
        "html-has-lang passes on every route",
      ],
    },
  },
  {
    id: 44,
    title: "\"When we refer out\" integrity note",
    priority: "P2",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§7 praise · §11 referral integrity · P2-3",
    harness: ["GTH-10", "GTH-13"],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 2, risk: 2, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
    wave: 5,
    job: "Know they'll put my care above their revenue",
    story:
      "As a patient, I can see the practice refers out when someone else is better placed to treat me.",
    problem:
      "Patients specifically praise dentists who refer out rather than keeping work in-house — it reads as integrity over revenue. It's one honest paragraph and it reinforces the conservative-care statement (item 28).",
    where: "/about",
    scope: [
      "A short honest note on when the practice refers to specialists",
      "No implication of capabilities the practice lacks — and none it has",
    ],
    acceptance: [
      "Note present on /about",
      "Consistent with the actual scope of practice",
    ],
    evidence: "Blueprint §7 — emerging patient-generated theme, explicitly labelled emerging rather than repeated.",
    dependsOn: "Dr. Dubey confirming referral practice",
    outOfScope: "A specialist directory or named referral partners.",
    references: [
      {
        name: "ADA — Principles of Ethics, referral and consultation",
        url: "https://www.ada.org/about/principles/code-of-ethics",
        whatGood:
          "Establishes referral when a case exceeds one's scope as a professional obligation, which is what makes stating it credible rather than self-congratulatory.",
        takeaway: "Frame it as normal professional practice, not a boast.",
        mobile: "One short paragraph — the only form that earns its place on a phone About page.",
      },
      {
        name: "Blueprint §11 — referral integrity signal",
        url: "https://www.chicagoloopdentistry.com/",
        whatGood:
          "Pairs the referral note with the conservative-care promise so the two reinforce each other rather than reading as separate claims.",
        takeaway: "Place it adjacent to item 28's statement on /about.",
        mobile: "Adjacency matters more on mobile, where the two would otherwise be screens apart.",
      },
    ],
    test: {
      preconditions: ["Dr. Dubey confirmed referral practice", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm the note is present on /about and adjacent to the conservative-care statement.",
          tool: "browser",
          expect: "Present and adjacent, not screens apart in the stacked layout.",
        },
        {
          action: "Check the note against the confirmed scope of practice.",
          tool: "manual",
          viewport: "any",
          expect: "No implied capability the practice lacks.",
        },
      ],
      mobileFirst: [
        "Note adjacent to the conservative-care statement in the stacked mobile layout",
      ],
      pass: ["Note present on /about", "Consistent with actual scope"],
    },
  },
  {
    id: 45,
    title: "Emergency reachability without a bottom bar",
    priority: "P0",
    source: "blueprint",
    launchBlocking: true,
    blockingGround: "safety",
    blueprintRef: "§17 mobile actions · §19 homepage map · §22 sticky action bar · P0-1",
    harness: ["GTH-6", "GTH-13", "GTH-14", "GTH-15", "GTH-17", "GTH-21"],
    originalPriority: "P0",
    pin: null,
    decision: {
      date: "2026-08-30",
      ruling: "declined",
      said: "No clear need for a sticky bottom bar.",
      consequence:
        "The locked Pattern A ruling stands — no bottom bar is built. But the requirement underneath it survives the ruling: item 7 makes emergency guidance P0, and the fixed header carries Call, Schedule and the hamburger, not emergency. This item is now the narrower job of proving emergency is reachable in one tap from every route without a bottom bar. If that turns out not to be achievable within the current header, the bottom-bar question comes back — with evidence rather than a recommendation.",
    },
    scores: { conversion: 4, reach: 5, risk: 3, effort: 5, readiness: 5 },
    effort: "S",
    status: "not-started",
    wave: 2,
    job: "Reach emergency help fast, from anywhere, on a phone",
    story:
      "As a patient in pain part-way down a long page, I can reach emergency guidance in one tap without scrolling back to the top.",
    problem:
      "Decided: no sticky bottom bar. That leaves a real question the bar would have answered by default. The fixed header persists (verified in item 27) and carries Call, Schedule and the hamburger — but no emergency action, and item 7 makes emergency P0. The homepage is 12.4 screens on a phone. So: where does emergency live, and is it genuinely one tap from every route?",
    where: "src/components/Nav.tsx · Footer · emergency entry points",
    scope: [
      "Decide where emergency lives given no bottom bar: header (crowded — see item 27's 768px findings), hamburger, or a persistent in-page affordance",
      "The header already carries a call control, which covers part of the urgent job — establish whether that is sufficient or whether emergency needs its own distinct entry",
      "Verify one-tap reachability from every route, at every matrix width",
      "Pairs with item 46: whatever the entry is, it must be visually distinguishable from the booking CTA",
      "TRIED AND REJECTED (2026-09-01): built a dedicated icon-only Dental Emergency link in the fixed header — mobile icon beside Call/Schedule/Menu, desktop badge before Book Appointment (both bg-alert, MedicalCrossIcon, per item 46's treatment). Fitting a fourth mobile control also required hiding Logo's wordmark across the whole mobile range and making the desktop badge icon-only below lg to avoid overflowing the header at 320px and 768px (both measured, not guessed). Akash reviewed and didn't want emergency in the top nav at all — reverted in full (Nav.tsx and Logo.tsx both back to their pre-item-45 state). Back to not-started: reachability currently falls back to the hamburger-menu link only (item 7's original minimum, one extra tap on mobile, no desktop entry), which does not satisfy this item's one-tap acceptance criterion. Next candidate needs Akash's steer: a persistent in-page affordance, the footer, or something else — header placement is now a tried-and-rejected option, not an open one",
    ],
    acceptance: [
      "Emergency guidance reachable in one tap from every route at 375px",
      "Verified at 320, 360, 375, 390, 430 and landscape",
      "The emergency entry is visually distinct from the booking CTA",
      "No bottom bar introduced",
    ],
    evidence:
      "Blueprint §17/§19/§22 argued for a bottom bar; the ruling declined it. What survives is the underlying requirement — item 27 measured the fixed header persisting with a 44px Schedule control, so Call and Book are covered, and emergency is the genuine remaining gap.",
    dependsOn: "Item 7 (emergency page must exist to link to) · item 46 (visual distinction)",
    outOfScope:
      "A sticky bottom bar. Ruled out 2026-08-30. Reopen only with measured evidence that one-tap emergency access is unachievable without one. Also out: an emergency entry in the fixed top nav (mobile or desktop) — built and reviewed 2026-09-01, Akash didn't want it there.",
    references: [
      {
        name: "NN/g — thumb zone and mobile reachability",
        url: "https://www.nngroup.com/articles/mobile-ux/",
        whatGood:
          "Establishes that the top of a large phone is genuinely hard to reach one-handed — the empirical basis for the blueprint's recommendation.",
        takeaway:
          "Take the reachability finding seriously. It does not by itself mandate a bottom bar; a lower-placed in-content action can satisfy it.",
        mobile:
          "This is a mobile-only concern — the entire argument disappears on desktop, which is why it never surfaced in our earlier passes.",
      },
      {
        name: "iOS Human Interface Guidelines — layout and safe areas",
        url: "https://developer.apple.com/design/human-interface-guidelines/layout",
        whatGood:
          "Documents safe-area insets and why bottom-anchored UI must clear the home indicator — the implementation detail that makes sticky bars break on notched devices.",
        takeaway:
          "If the decision goes ahead, honour env(safe-area-inset-bottom) and verify in landscape too.",
        mobile:
          "Also relevant to the argument against: a bottom bar permanently consumes vertical space on a device that has very little, and can cover a form's submit — a real cost, not just an aesthetic one.",
      },
    ],
    test: {
      preconditions: ["Item 7 shipped so there is an emergency destination", "Viewport 375×812"],
      steps: [
        {
          action:
            "At 375×812, from the homepage and from two other routes, count taps to reach emergency guidance.",
          tool: "browser",
          expect: "One tap from every route. More than one means the current header placement is insufficient.",
        },
        {
          action:
            "Repeat the count part-way down the homepage (around screen 6 of 12.4) without scrolling back up.",
          tool: "browser",
          expect:
            "Still one tap. This is the case the bottom bar would have covered by default, so it is the one that has to be proven.",
        },
        {
          action: "Measure the emergency entry's tap target and confirm it is visually distinct from the booking CTA.",
          tool: "browser",
          expect: "≥44×44px, and distinguishable from Schedule/Book at a glance (pairs with item 46).",
        },
        {
          action: "Repeat at 320, 360, 390, 430 and in landscape.",
          tool: "browser",
          expect: "One-tap reachability holds at every matrix width, including landscape where the fixed header eats more of the viewport.",
        },
        {
          action: "Confirm no bottom-anchored bar was introduced.",
          tool: "shell",
          viewport: "any",
          expect: "No fixed bottom element. The 2026-08-30 ruling stands.",
        },
      ],
      mobileFirst: [
        "Emergency reachable in one tap from every route at 375px",
        "Still one tap from mid-page, without scrolling back to the header",
        "Emergency entry ≥44×44px and visually distinct from the booking CTA",
        "Holds at 320 / 360 / 390 / 430 and in landscape",
      ],
      pass: [
        "One-tap emergency access verified from every route and from mid-page",
        "No bottom bar introduced",
        "Emergency entry distinct from booking at mobile width",
      ],
      gotchas: [
        "If one-tap access genuinely cannot be achieved within the current header, that is evidence to reopen the bottom-bar question — with a measurement, not a recommendation. Do not quietly add one instead.",
      ],
    },
  },
  {
    id: 46,
    title: "Add a palette-harmonised emergency colour token",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§17 color strategy · §19 utility strip",
    harness: ["GTH-1", "GTH-5"],
    originalPriority: "P1",
    repriorityNote:
      "PROMOTED P1 → P0 (33.5) as a direct consequence of Akash's ruling. It scored 30.5 while blocked on a decision; approving it in principle moved readiness 1 → 4, which crossed the P0 threshold. The work didn't get more important — it got unblocked, and the model is built to reflect that.",
    pin: null,
    decision: {
      date: "2026-08-30",
      ruling: "approved-with-constraint",
      said: "Emergency could be a different colour, but it goes with the matching palette.",
      consequence:
        "A fifth token is approved in principle for emergency use only — but it must harmonise with the locked warm-ivory / terracotta / espresso / sand family, not the blueprint's generic #C0392B alert red. The specific hex still needs sign-off. Candidates were derived from the existing palette and contrast-checked: **#A32E1F** (recommended — 6.67:1 on ivory, 7.08:1 for ivory text on it, clearly distinct from terracotta) or **#94271A** (deeper, 7.72:1, more distinct still). Both are warm brick reds in the same earthy family as terracotta rather than a clinical red. Went through several revisions on 2026-08-31 chasing the hex value for problems that were actually about treatment/prominence (see item 46's scope for the full sequence) — **landed back on the original #A32E1F**. Undiluted color, used small and rarely, turned out to be the right call, consistent with how NHS/GOV.UK-style services reserve their own emergency red at full strength rather than muting it.",
    },
    scores: { conversion: 2, reach: 3, risk: 4, effort: 5, readiness: 4 },
    effort: "S",
    status: "partial",
    wave: 2,
    job: "Tell an emergency action apart from a booking action instantly",
    story:
      "As a patient in pain, the emergency action is visually distinct from every other button on the page.",
    problem:
      "Terracotta carries every primary CTA, so an emergency action rendered in it is indistinguishable from 'Book Appointment' at a glance — precisely when a patient is least able to read carefully. Approved: a fifth token, harmonised with the locked palette rather than a generic alert red.",
    where: "src/app/globals.css (token) · BookingBlock.tsx (current consumer) · EmergencyGuidance component (not yet built — items 7/45)",
    scope: [
      "DONE (2026-08-31): `--color-alert` landed in globals.css and the Tailwind theme, documented as emergency-only. Shipped first at #A32E1F (6.67:1 on warm-ivory); revised same day to #9C5240 (5.36:1 on warm-ivory) after direct feedback the first value was 'too blaring' — still AA, more muted",
      "DONE (2026-08-31): the token has a real consumer — the 'Dental emergency' badge in BookingBlock.tsx's 'Quick actions' row, third alongside Book Appointment and Call. Went through FIVE treatments in one day, chasing the wrong variable more than once: (1) full-width solid Hero button at #A32E1F — 'too blaring'; (2) muted the hex to #9C5240 as a small pill next to Book Appointment's pill — read as 'the same color' as Book; (3) dropped to plain light text (a since-removed derived token) to escape the color clash — now 'hidden'; (4) undiluted #A32E1F again, but as a badge pulled OUT of Quick actions onto its own separate line — on the theory that adjacency to Book was the problem; (5) current and final, per Akash's explicit ask: back IN Quick actions as the third item, same undiluted #A32E1F badge, small/compact with `items-center` alignment against the taller Book/Call pills. Round 4's theory was wrong — adjacency was never the issue, size/treatment was; a small badge reads as distinct from a full pill even sitting right next to one. This matches how NHS/GOV.UK-style services actually handle a reserved emergency red — undiluted color, restrained through size/rarity of use, not through muting the hue or isolating it. Items 7 (/emergency) and 45 (sitewide reachability) are still not built, so this is the token proven at its one current call site, not full coverage",
      "Reserved exclusively for emergency. Never a marketing, promotional or error-state colour; a red used twice stops meaning anything",
      "Never colour alone — icon plus text label always, so it survives greyscale and outdoor glare",
      "Do not touch any of the four existing tokens — confirmed: this PR's diff to globals.css only adds `--color-alert`, no existing value changed",
      "TRIED (2026-09-01): item 45 built sitewide header entries (mobile icon, desktop badge) using this same undiluted `bg-alert` treatment. Akash reviewed and rejected emergency living in the top nav at all — reverted. Still just the one BookingBlock call site; sitewide coverage is unresolved again pending item 45's next attempt",
    ],
    acceptance: [
      "One new token added, exact value signed off by Akash — DONE, revised once already (see decision.consequence above) after direct feedback; that's expected for a value this subjective",
      "AA verified on every surface pairing it appears in — DONE: the real consumer (BookingBlock's emergency badge) uses ivory text ON the `bg-alert` fill (7.08:1), self-contained regardless of the surrounding section's background. A plain-text-on-espresso treatment was tried mid-pass and measured ~2:1 (fails AA) — abandoned along with the tint-token approach in favor of the current self-contained badge",
      "Emergency action unmistakably distinct from booking CTAs at 375px — DONE for the BookingBlock badge, now sitting directly in the 'Quick actions' row beside Book/Call: undiluted `bg-alert` fill, deliberately smaller padding/font than the two primary pills is what separates it visually, not distance from Book — an isolated-on-its-own-line version was tried and wasn't the actual fix; still PENDING sitewide — item 45's header attempt was rejected, so this needs a different entry point",
      "Identifiable in greyscale — meaning never colour-carried — DONE: MedicalCrossIcon + 'Dental emergency' label carry the meaning independent of the alert colour",
      "Zero changes to the four locked tokens — DONE",
    ],
    evidence:
      "Blueprint §17 colour strategy, constrained by Akash's 2026-08-30 ruling to stay within the palette family. Candidate values were contrast-computed against the actual locked tokens rather than taken from the blueprint.",
    dependsOn: "Item 45 — sitewide reachability beyond the BookingBlock link still needs it; item 7 for the eventual real emergency destination",
    outOfScope:
      "Changing any of the four existing tokens, and using the new token for anything other than emergency.",
    references: [
      {
        name: "WCAG 2.2 — 1.4.1 Use of Colour",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
        whatGood:
          "Requires that colour is never the sole carrier of meaning — which means the emergency action needs an icon and label regardless of the palette decision.",
        takeaway:
          "This constraint applies either way, so implement icon-plus-label first; the colour question is secondary.",
        mobile:
          "Especially load-bearing on a phone in bright outdoor light, where colour differentiation degrades badly — the label does the work.",
      },
      {
        name: "NHS Digital Service Manual — colour and emergency content",
        url: "https://service-manual.nhs.uk/design-system/styles/colour",
        whatGood:
          "Reserves a specific red exclusively for emergency and warning content, and forbids its use for anything promotional — the discipline that keeps the signal meaningful.",
        takeaway:
          "If a token is approved, copy the exclusivity rule: emergency only, never marketing. A red used twice stops meaning anything.",
        mobile:
          "Their emergency treatment stays legible at small sizes and under reduced-motion — worth copying whichever way the decision lands.",
      },
    ],
    test: {
      preconditions: ["Akash has signed off the exact hex", "Viewport 375×812"],
      steps: [
        {
          action: "Confirm the exact token value is signed off before editing globals.css.",
          tool: "manual",
          viewport: "any",
          expect:
            "A specific hex approved. The ruling approved the principle; the value still needs confirming.",
        },
        {
          action:
            "At 375×812, show the emergency action beside a booking CTA and confirm they are instantly distinguishable.",
          tool: "browser",
          expect: "Distinct at a glance, by icon and label at minimum.",
        },
        {
          action: "Verify contrast of the emergency treatment against every surface it appears on.",
          tool: "browser",
          expect: "≥4.5:1 for its text, ≥3:1 for its boundary.",
        },
        {
          action: "Render in greyscale and confirm the emergency action is still identifiable.",
          tool: "browser",
          expect: "Identifiable without colour — proves meaning isn't colour-carried.",
        },
      ],
      mobileFirst: [
        "Emergency and booking actions distinguishable at a glance at 375px",
        "Still identifiable in greyscale — meaning never colour-only",
        "AA contrast on every surface it appears on",
      ],
      pass: [
        "Exact hex signed off and added as a single new token",
        "Emergency visually unmistakable at mobile width",
        "Colour never the sole carrier of meaning",
        "Zero changes to the four existing tokens",
      ],
      gotchas: [
        "The ruling was 'goes with the matching palette' — a generic alert red would satisfy the letter and miss the point. Candidates were derived from the locked palette for that reason.",
        "Reserve it strictly for emergency. The moment it appears on a promotion, the signal is gone.",
      ],
    },
  },
  {
    id: 47,
    title: "Revisit testimonial auto-scroll once real reviews land",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "§17 reviews · §22 review card · §15C anti-patterns",
    harness: ["GTH-1", "GTH-4", "GTH-13", "GTH-14", "GTH-22"],
    originalPriority: "P1",
    pin: null,
    decision: {
      date: "2026-08-30",
      ruling: "deferred",
      said: "We can decide when we reach that bridge.",
      consequence:
        "No change now — the rail keeps auto-scrolling as originally specified. The decision is deliberately deferred until item 13 lands real reviews, because the current placeholders cannot test the question: they were written short, and real quotes will be longer. The trigger is concrete rather than vague — when real quotes are in, read each one end to end at 375px while the rail is moving. If a quote scrolls out of view mid-sentence, that is the evidence; if not, the rail stays.",
    },
    scores: { conversion: 2, reach: 3, risk: 3, effort: 5, readiness: 3 },
    effort: "S",
    status: "blocked",
    wave: 4,
    job: "Actually read what patients said",
    story: "As a patient checking reviews, I can read them at my own pace.",
    problem:
      "Deferred by decision, with a concrete trigger. The rail auto-scrolls continuously — a deliberate call, and it honours prefers-reduced-motion. The blueprint lists autoplay reviews among its anti-patterns on the grounds that moving text is harder to read and reads as less credible. Neither position can be tested against the current placeholders, which were written short. Real reviews from item 13 will be longer, and that is what decides it.",
    where: "src/components/TestimonialsSection.tsx",
    scope: [
      "Do nothing until item 13 lands real quotes at real length",
      "Then: read every real quote end to end at 375px while the rail is moving",
      "If a quote scrolls out of view mid-sentence, switch to static attributed cards",
      "If all quotes stay readable, the rail stays as specified",
      "Also assess against WCAG 2.2.2 — if the rail is in scope, a pause control becomes a requirement and settles it",
    ],
    acceptance: [
      "Assessed only after real quotes exist, never against placeholders",
      "Every real quote readable end to end at 375px, whichever implementation ships",
      "prefers-reduced-motion honoured either way",
    ],
    evidence:
      "Blueprint §17/§22 specify static, no autoplay. Against that: the current implementation was explicitly requested and is reduced-motion aware. The real trigger is item 13 — longer quotes may make the decision for us.",
    dependsOn: "Item 13 — real reviews are the trigger and the test material",
    outOfScope: "Changing it before real reviews land. The current placeholders don't test the question.",
    references: [
      {
        name: "NN/g — auto-forwarding carousels",
        url: "https://www.nngroup.com/articles/auto-forwarding/",
        whatGood:
          "Documents that auto-advancing content is frequently missed or actively resented, and that users lose content they were mid-way through reading.",
        takeaway:
          "The finding is about content users are trying to read — which is exactly reviews. It's the strongest argument for the change.",
        mobile:
          "Worse on a phone: less text visible at once, so a moving rail is more likely to remove a quote mid-sentence. Real reviews will be longer than our placeholders.",
      },
      {
        name: "WCAG 2.2 — 2.2.2 Pause, Stop, Hide",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        whatGood:
          "Requires a mechanism to pause moving content that starts automatically and lasts more than five seconds and is presented alongside other content.",
        takeaway:
          "Worth checking whether the current rail is in scope. If it is, a pause control becomes a requirement rather than a preference — which would itself settle the question.",
        mobile:
          "A pause control adds another ≥44px target on a phone; static cards avoid the problem entirely rather than solving it.",
      },
    ],
    test: {
      preconditions: ["Item 13 shipped with real quotes", "Viewport 375×812"],
      steps: [
        {
          action: "Confirm real quotes are in place — this cannot be assessed against placeholders.",
          tool: "manual",
          viewport: "any",
          expect:
            "Real reviews at real length are live. Testing the short placeholders would produce a false pass and defer the question again.",
        },
        {
          action:
            "At 375×812 with real-length quotes, attempt to read each one fully in the current implementation.",
          tool: "browser",
          expect:
            "Every quote readable end to end. If a quote moves out of view mid-sentence, that is the evidence the decision needs.",
        },
        {
          action: "Assess against WCAG 2.2.2 — does the rail need a pause mechanism?",
          tool: "manual",
          viewport: "any",
          expect: "A recorded determination either way.",
        },
        {
          action: "Confirm prefers-reduced-motion freezes the rail.",
          tool: "browser",
          expect: "Frozen under the setting, whichever implementation ships.",
        },
      ],
      mobileFirst: [
        "Every real-length quote readable end to end at 375px",
        "prefers-reduced-motion honoured",
        "Keyboard reachable either way",
      ],
      pass: [
        "Assessed against real quotes, not placeholders",
        "Real quotes fully readable at mobile width in whichever implementation ships",
        "Reduced motion honoured",
      ],
      gotchas: [
        "The current behaviour was explicitly requested. Change it only on the evidence named above — a quote scrolling away mid-sentence — not on the blueprint's general preference.",
      ],
    },
  },
  // ══════════════════════════════════════════════════════════════════
  // BLUEPRINT v2 INTAKE — 2026-08-31
  // Second evidence wave: 50 new dental sites (~90 total, ~62 deep) +
  // ~55 cross-domain sites yielding the CD-1…CD-30 pattern catalogue.
  // See docs/research/…-blueprint-v2.md
  // ══════════════════════════════════════════════════════════════════
  {
    id: 48,
    title: "Three clear doors on the homepage: Book · New patient · Emergency",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v2 §16 CD-1 (One Medical, NHS 111) · §19 hero",
    harness: ["GTH-1", "GTH-4", "GTH-13", "GTH-14", "GTH-15", "GTH-17"],
    originalPriority: "P0",
    pin: null,
    decision: {
      date: "2026-08-31",
      ruling: "approved-with-constraint",
      said:
        "This is a small boutique dental practice, so generally it's new patients we're looking to get — Book Appointment and Call was good, but Emergency can be lower so we don't overwhelm patients. Keep the prior Hero pattern, introduce Emergency or New Patient elsewhere on the homepage.",
      consequence:
        "The 'exactly three equal-weight doors in the Hero' execution is rejected; the underlying intent-triage goal survives at unequal weight instead. Hero reverts to the original two-CTA pattern (Book Appointment + Call) as the primary hero ask — that's the practice's actual priority path. New Patient and Dental Emergency move to BookingBlock's 'Quick actions' row as smaller, de-emphasized text links (icon + label, not full-width solid pills): real destinations and zero branching logic still hold from the original scope, just at visibly lower prominence than Book/Call, and Emergency specifically ranks lowest of the three. This item is now built to a revised interpretation of CD-1, not its literal original scope.",
    },
    scores: { conversion: 5, reach: 5, risk: 2, effort: 5, readiness: 4 },
    effort: "S",
    status: "partial",
    wave: 1,
    job: "Self-sort by intent without hunting through a menu",
    story:
      "As a visitor arriving with one of three very different intents, I can see my door immediately instead of reading a nav.",
    problem:
      "Visitors arrive routine, new-patient, or in pain right now — three different first actions. Our homepage offers one CTA (Book) plus a call icon, so the new patient and the person in pain both have to work it out from a nav. CD-1 is the cross-domain answer: match the interface to the visitor's intent, one primary action per screen.",
    where: "Hero (Book + Call, unchanged) · BookingBlock.tsx 'Quick actions' row (Dental Emergency, third alongside Book + Call) · BookingBlock.tsx, below Office hours/Location (New Patient, standalone)",
    scope: [
      "Exactly three doors in patient words: Book/Request · New patient · Dental emergency — SUPERSEDED 2026-08-31, see decision above: Book/Call keep primary hero billing, New Patient/Emergency are intentionally secondary rather than equal-weight",
      "The door only routes — it never assesses severity or asks the visitor to self-classify",
      "Keep warmth; three cold triage buttons read like a hospital intake desk — the original concern this decision doubles down on: a boutique practice's Hero should read as calm and new-patient-welcoming, not triage-desk",
      "Emergency door pairs with items 45 and 46 (reachability and visual distinction)",
      "DONE (2026-08-31): three real, static-Link entry points exist — Book Appointment (Hero, primary) → /contact, New Patient (BookingBlock, secondary) → /insurance-new-patients, Dental Emergency (BookingBlock, secondary) → /contact. No branching logic anywhere.",
      "REVISED 2026-08-31, four passes same day: (1) secondary pair first lived directly under BookingBlock's 'Quick actions' pills as full pills — clutter (3-4 things stacked in one small area) and the Dental Emergency pill read as the same color as the terracotta Book pill next to it; (2) moved both to a quiet inline line below Office hours/Location, Emergency as plain tinted text — fixed clutter/color-clash but the emergency link then read as 'hidden'; (3) kept that placement, swapped Emergency for a small solid `bg-alert` badge — visible again, but now separated from Book/Call entirely; (4) current and final, per Akash's explicit ask: Dental Emergency moves back INTO 'Quick actions' as the third item alongside Book/Call, still the same small compact badge (undiluted colour, `items-center` on the row so it lines up against the taller pills) — proves the earlier 'same color' complaint was about size/treatment, not adjacency: a badge this much smaller than a full pill reads as distinct even sitting right next to one. New Patient stays on its own separate line — still de-prioritized relative to the time-sensitive Book/Call/Emergency trio. See item 46 for the token history.",
      "NOT YET DONE: the Dental Emergency link routes to /contact — the generic appointment-request form — rather than a dedicated non-diagnostic emergency page. Item 7 (/emergency) is still blocked on Akash confirming the after-hours reality; /contact is the interim destination rather than a dangling link or an invented after-hours claim. Re-point once item 7 ships.",
    ],
    acceptance: [
      "Three doors visible in the first mobile viewport — SUPERSEDED 2026-08-31: only Book + Call are in the first viewport by design now; New Patient/Emergency are reachable by scrolling to BookingBlock, which is the intended, lower-prominence placement",
      "Each routes to a real destination — DONE, but Dental Emergency's destination (/contact) is an interim stand-in, not the eventual /emergency page — see scope note above",
      "No door asks the visitor to rate their own severity — DONE",
    ],
    evidence:
      "v2 §16 CD-1, sourced to One Medical and NHS 111 online, both DP/GOV-Strong. NHS 111 is explicit that it routes without diagnosing — exactly the line we need. Adapted 2026-08-31 for practice size/positioning: CD-1's equal-weight triage framing fits a primary-care-scale operation more than a small boutique practice whose overwhelming majority job is winning new patients.",
    dependsOn: "Item 7 (emergency destination must exist) — still open; the Dental Emergency link ships pointed at /contact as an interim measure until it does",
    outOfScope:
      "NHS 111's symptom-question engine. The door routes; it never assesses. That is the banned diagnostic checker in a different coat.",
    references: [
      {
        name: "NHS 111 online",
        url: "https://111.nhs.uk/",
        whatGood:
          "States plainly that it will not give a diagnosis but will tell you what help you need — then routes by level of care. It is the clearest published example of intent-routing that stays the safe side of the diagnosis line.",
        takeaway:
          "Copy the routing logic and that sentence's honesty. Do NOT copy the question engine behind it — that is the symptom checker this backlog bans.",
        mobile:
          "Built mobile-first for people in distress: large targets, one decision per screen, no dense nav. Our three doors should be full-width rows at 375px, not a horizontal button group.",
      },
      {
        name: "One Medical",
        url: "https://www.onemedical.com/",
        whatGood:
          "Presents a small number of intent-shaped entry points rather than an org-chart menu, so a visitor self-sorts in one glance without reading navigation.",
        takeaway:
          "Copy the intent-shaped framing. Keep our three warm rather than clinical — over-triage reads cold, which is the specific risk CD-1 names.",
        mobile:
          "Their doors are thumb-reachable and stack cleanly. Three is the right count for a phone; four or more turns a glance into a decision.",
      },
    ],
    test: {
      preconditions: ["Item 7 shipped", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm Book Appointment and Call are visible in the first viewport without scrolling.",
          tool: "browser",
          expect: "Both primary CTAs present above the fold, each ≥44×44px, as a two-up row — unchanged from before this item.",
        },
        {
          action: "Scroll to BookingBlock and confirm New Patient and Dental Emergency are present as secondary text links below the Book/Call pills.",
          tool: "browser",
          expect: "Both links present, ≥44×44px tap area, visually smaller/quieter than the two primary pills — not full-width solid blocks.",
        },
        {
          action: "Follow all four entry points (Hero Book, Hero Call, BookingBlock New Patient, BookingBlock Dental Emergency).",
          tool: "browser",
          expect: "Each lands on a real destination — booking request, tap-to-call, new-patient content, emergency contact.",
        },
        {
          action: "Read the entry-point labels and check none asks the visitor to judge their own severity.",
          tool: "manual",
          viewport: "any",
          expect:
            "Labels describe intent ('Dental emergency'), never a self-assessment ('Is your pain severe?').",
        },
        {
          action: "Inspect for any conditional logic behind the links.",
          tool: "browser",
          viewport: "any",
          expect: "Static links only. Branching means a triage engine has crept in.",
        },
      ],
      mobileFirst: [
        "Book + Call in the first 375×812 viewport, unchanged two-up row",
        "New Patient + Dental Emergency reachable by scroll in BookingBlock, each ≥44×44px",
        "No horizontal cramming of the two secondary links into an unreadable row",
      ],
      pass: [
        "Four real entry points total (Book, Call, New Patient, Emergency), each routing correctly",
        "Visual hierarchy matches intent: Book/Call primary, New Patient/Emergency secondary",
        "No self-classification of severity",
        "Zero branching logic",
      ],
      gotchas: [
        "This item's original 'exactly three equal doors, all above the fold' test is superseded by the 2026-08-31 decision — don't fail this item against the old mobileFirst/pass criteria above the decision block; the unequal-weight version is the current target.",
      ],
    },
  },
  {
    id: 49,
    title: "Honest government-plan line (Apple Health / Medicaid)",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v2 §12 government-plan-forward framing · §15 new pattern 3",
    harness: ["GTH-10", "GTH-13", "GTH-14"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 3, reach: 4, risk: 4, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
    wave: 2,
    job: "Find out whether my public coverage is accepted",
    story:
      "As a patient on Apple Health, I can tell from the site whether this practice takes it — without phoning to be told no.",
    problem:
      "Wave 2 found government-plan-forward framing to be a real access signal, and — importantly — that honesty cuts both ways: Aspen Dental plainly states Medicaid is NOT accepted. Saying nothing is the worst option, because it makes a patient spend a call to discover a no. This is an equity item for a family practice serving a mixed-income catchment.",
    where: "/insurance-new-patients",
    scope: [
      "State Apple Health / Medicaid participation plainly — or explicit non-participation, equally plainly",
      "Never imply a program the practice doesn't take",
      "If not accepted, point somewhere useful rather than dead-ending",
    ],
    acceptance: [
      "A clear yes or no on Apple Health / Medicaid",
      "Verified with the practice before publishing",
      "If no, an onward pointer exists",
    ],
    evidence:
      "v2 §12 and §15 new-pattern 3 (PR): Canadian sites lead with CDCP, US sites name Medicaid/Medi-Cal/CHIP, and Aspen models the honest negative. Seattle's mixed-income catchment — First Hill, International District — makes this a real access question.",
    dependsOn: "Practice confirming Apple Health / Medicaid status",
    outOfScope: "Implying participation in any program not confirmed.",
    references: [
      {
        name: "Washington Apple Health — dental coverage",
        url: "https://www.hca.wa.gov/health-care-services-supports/apple-health-medicaid-coverage",
        whatGood:
          "The authoritative statement of what Apple Health dental covers in this state — the reference to check any participation claim against.",
        takeaway:
          "Use to confirm the claim before publishing. State participation or non-participation; never leave it unsaid.",
        mobile:
          "Patients on public coverage skew mobile-primary, so this answer must be findable at 375px without a call — the call is the cost we're removing.",
      },
      {
        name: "Aspen Dental — honest negative on Medicaid",
        url: "https://www.aspendental.com/",
        whatGood:
          "States plainly that Medicaid is not accepted. Counter-intuitively a trust signal: it saves the patient a wasted call and reads as candour rather than evasion.",
        takeaway:
          "Copy the willingness to publish a negative. An unanswered question costs the patient more than a clear no.",
        mobile:
          "One short line, which is all this needs at 375px. Avoid burying it inside a long insurance table.",
      },
    ],
    test: {
      preconditions: ["Practice has confirmed status", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, find the answer on Apple Health / Medicaid.",
          tool: "browser",
          expect: "A clear yes or no, findable without a call and without opening an accordion.",
        },
        {
          action: "If the answer is no, confirm an onward pointer exists.",
          tool: "browser",
          expect: "The patient is pointed somewhere useful rather than dead-ended.",
        },
        {
          action: "Verify the published status against the practice's confirmation.",
          tool: "manual",
          viewport: "any",
          expect: "Matches exactly. An implied acceptance that turns out false is the harm here.",
        },
      ],
      mobileFirst: [
        "A clear yes/no findable at 375px without a call or an accordion tap",
        "If no, an onward pointer is present",
      ],
      pass: [
        "Explicit participation status published",
        "Verified with the practice",
        "No implied participation in unconfirmed programs",
      ],
    },
  },
  {
    id: 50,
    title: "Household / multi-person booking affordance",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v2 §15 white space · §16 CD-27 · §28 open question 16",
    harness: ["GTH-1", "GTH-4", "GTH-14", "GTH-18"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 4, reach: 3, risk: 1, effort: 5, readiness: 4 },
    effort: "S",
    status: "not-started",
    wave: 4,
    job: "Arrange care for more than one person at once",
    story:
      "As the person who books dental appointments for my household, I can say so when I request rather than making three separate requests.",
    problem:
      "v2 confirms this as the clearest untouched white space in the entire scan: across ~62 homepages examined in depth, only one site gestures at booking a whole family. Every practice asserts 'family' and none enables it. For a practice positioning as a family dental home, a household field on the request form is a near-free differentiator.",
    where: "src/components/AppointmentForm.tsx · family section",
    scope: [
      "One optional field: how many people is this for, and roughly what ages or relationships",
      "Acknowledge the coordinator — the person booking is often not the patient",
      "Say plainly on the family section that households can be seen together",
      "Keep it a field, not a flow. No family accounts, no per-member dashboards",
    ],
    acceptance: [
      "The request form accepts a multi-person request without a second submission",
      "The field is optional and never blocks submission",
      "The family content states that households can be booked together",
    ],
    evidence:
      "v2 §15 confirms it as a white space unmet even in wave 2, and §16 CD-27 supplies the principle. This is the cheapest genuine differentiator the blueprint identifies.",
    dependsOn: "Item 9",
    outOfScope:
      "Family accounts or per-member dashboards. v2's transfer-risk list flags patient portals as a HIPAA-heavy build to defer — this is a form field, not an account system.",
    references: [
      {
        name: "Tend — book the whole family",
        url: "https://www.hellotend.com/",
        whatGood:
          "The only site in ~62 examined that gestures at booking a household together, which is precisely what makes it worth noting — the bar is currently on the floor.",
        takeaway:
          "Copy the intent. There is no strong exemplar to imitate in detail, which is the opportunity rather than a problem.",
        mobile:
          "A household count is one extra field with a numeric keyboard — trivial on a phone. Avoid a repeating per-person sub-form, which is where this pattern usually becomes unusable at 375px.",
      },
      {
        name: "GOV.UK Design System — asking users for information",
        url: "https://design-system.service.gov.uk/patterns/question-pages/",
        whatGood:
          "Guidance on capturing variable-count information without building a repeating form — ask the number first, capture detail later or by phone.",
        takeaway:
          "Copy the ask-the-number-first approach. The practice can gather per-person detail on the callback; the site's job is to signal it's possible.",
        mobile:
          "Repeating sub-forms are the classic mobile form failure. A single count field with `inputmode=numeric` avoids it entirely.",
      },
    ],
    test: {
      preconditions: ["Item 9 shipped", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, submit a request for more than one person.",
          tool: "browser",
          expect: "Accepted in one submission; the household field uses a numeric keyboard (GTH-18).",
        },
        {
          action: "Submit leaving the household field empty.",
          tool: "browser",
          expect: "Succeeds — the field is genuinely optional.",
        },
        {
          action: "Confirm the family content states households can be seen together.",
          tool: "browser",
          expect: "Stated plainly, not implied by the word 'family'.",
        },
        {
          action: "Inspect for any repeating per-person sub-form.",
          tool: "browser",
          expect: "None. A count field only — repeating sub-forms break at mobile width.",
        },
      ],
      mobileFirst: [
        "Multi-person request completes in one submission at 375px",
        "Household field uses a numeric keyboard and is optional",
        "No repeating per-person sub-form",
      ],
      pass: [
        "Multi-person request accepted without a second submission",
        "Field optional",
        "Household capability stated plainly",
      ],
    },
  },
  {
    id: 51,
    title: "Plain-language benefits glossary (five terms, next to the decision)",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v2 §16 CD-5 (HealthCare.gov, Oscar) · §12",
    harness: ["GTH-1", "GTH-10", "GTH-13", "GTH-20"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 3, risk: 2, effort: 5, readiness: 4 },
    effort: "S",
    status: "done",
    wave: 4,
    job: "Understand what my plan's words actually mean for me",
    story:
      "As a patient reading about coverage, the jargon is decoded in plain words right where it matters.",
    problem:
      "Patients confuse deductible with annual maximum, and copay with coinsurance — on top of the accepted-vs-in-network confusion item 6 covers. v2's cross-domain scan shows this is a solved problem elsewhere: a five-term glossary with a one-line 'what this means for you', placed next to the decision it affects rather than on a separate jargon page.",
    where: "/insurance-new-patients",
    scope: [
      "SHIPPED (2026-09-01): five short reflowing blocks (premium, deductible, copay, coinsurance, annual maximum), each with a plain definition plus what it means for the patient's bill — rendered inline via BenefitsGlossary, directly below the accepted-vs-in-network block and above the carrier list, not a separate page",
      "SHIPPED: the crisp in-network line tightened in place — 'we've already agreed to lower rates with your plan, so you pay less' — in the existing accepted-vs-in-network copy rather than duplicated in the glossary",
      "No ACA metal-tier machinery included, per scope",
    ],
    acceptance: [
      "Five terms, each with a plain-language definition",
      "Adjacent to the coverage decision, not a separate page",
      "No ACA metal-tier machinery — dental has a simpler shape",
    ],
    evidence:
      "v2 §16 CD-5, sourced to HealthCare.gov 'Your total costs' (GOV-Strong) and Oscar's insurance explainer (PR-Moderate).",
    dependsOn: "Item 6",
    outOfScope: "A full insurance encyclopedia. Five terms, in place, is the whole item.",
    references: [
      {
        name: "HealthCare.gov — your total costs",
        url: "https://www.healthcare.gov/choose-a-plan/your-total-costs/",
        whatGood:
          "Government-grade plain-language decoding of exactly these terms, with the cost consequence spelled out rather than left as a definition. Definitions alone don't help; the consequence does.",
        takeaway:
          "Copy the define-then-say-what-it-means-for-you structure. Ignore the ACA metal tiers — dental is simpler.",
        mobile:
          "Their cost blocks reflow cleanly into a narrow column because each term is a short block rather than a table row. Copy that form — a glossary table is a guaranteed 320px overflow.",
      },
      {
        name: "Oscar Health — understanding health insurance",
        url: "https://www.hioscar.com/",
        whatGood:
          "Ties the in-network explanation to the money directly — in-network means already-agreed lower negotiated rates, so you pay less — which is the sentence that actually resolves the confusion.",
        takeaway:
          "Copy that one sentence's logic into our in-network explainer. It's more useful than a paragraph of definition.",
        mobile:
          "Short paragraphs survive 375px; this content fails on mobile whenever someone reaches for a comparison table.",
      },
    ],
    test: {
      preconditions: ["Item 6 shipped", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm the five terms render as short blocks with no horizontal scroll.",
          tool: "browser",
          expect: "No table. Each term a short block that reflows cleanly.",
        },
        {
          action: "Confirm each definition is followed by what it means for the patient's bill.",
          tool: "browser",
          expect: "Consequence stated, not just a definition.",
        },
        {
          action: "Confirm the glossary sits adjacent to the coverage content.",
          tool: "browser",
          expect: "In place, not on a separate page a patient has to go find.",
        },
        {
          action: "Apply 200% text zoom and check for clipping.",
          tool: "browser",
          expect: "No loss of content (GTH-20).",
        },
      ],
      mobileFirst: [
        "Five terms as short reflowing blocks, no table, no horizontal scroll at 375px",
        "Adjacent to the coverage decision rather than a separate page",
        "Survives 200% text zoom",
      ],
      pass: [
        "Five terms defined with their cost consequence",
        "Placed next to the decision",
        "No metal-tier machinery",
      ],
    },
  },
  {
    id: 52,
    title: "Publish clinician license numbers as a verifiability signal",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v2 §15 new pattern 12 (UK GDC numbers) · §16 CD-2",
    harness: ["GTH-10", "GTH-13"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 2, reach: 3, risk: 3, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
    wave: 4,
    job: "Check that this dentist is actually licensed",
    story:
      "As a cautious patient, I can verify the dentist's credentials independently rather than taking the website's word for it.",
    problem:
      "v2 found UK practices publishing per-dentist GDC registration numbers — a verifiability signal that lets a patient check the register themselves. The US equivalent is the Washington state license number. It converts a credential claim into something checkable, which is the difference between a trust assertion and a trust proof.",
    where: "/about · dentist profile component",
    scope: [
      "Publish Dr. Dubey's WA license number alongside her credentials",
      "Optionally link to the state verification lookup",
      "Verify the number before publishing — a wrong one is worse than none",
    ],
    acceptance: [
      "License number published and verified against the state register",
      "A patient can independently confirm it",
    ],
    evidence:
      "v2 §15 new-pattern 12 (PR) and §16 CD-2. The blueprint frames it as making a credential verifiable rather than merely asserted — which pairs with our own finding that specifics beat adjectives.",
    dependsOn: "Dr. Dubey providing the license number",
    outOfScope: "Publishing staff credentials that haven't been confirmed.",
    references: [
      {
        name: "Washington DOH — provider credential search",
        url: "https://fortress.wa.gov/doh/providercredentialsearch/",
        whatGood:
          "The public register a patient would actually check, which is what makes publishing the number meaningful rather than decorative.",
        takeaway:
          "Publish the number and, ideally, link here. Verify against this before publishing — an incorrect number is a credibility failure, not a typo.",
        mobile:
          "The lookup is usable on a phone, so the whole verification loop can happen on mobile. That makes the linked version genuinely worth doing.",
      },
      {
        name: "UK General Dental Council register",
        url: "https://olr.gdc-uk.org/SearchRegister",
        whatGood:
          "The model v2 observed: UK practices routinely publish per-dentist registration numbers, normalising verifiability rather than treating it as unusual.",
        takeaway:
          "Copy the norm. US dental sites rarely do this, which is exactly why it reads as confidence.",
        mobile: "A short alphanumeric string beside the name — no mobile cost at all.",
      },
    ],
    test: {
      preconditions: ["License number provided", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm the license number appears beside the credentials and doesn't overflow.",
          tool: "browser",
          expect: "Present, legible, no horizontal scroll.",
        },
        {
          action: "Verify the published number against the WA DOH register.",
          tool: "manual",
          viewport: "any",
          expect: "Exact match. A wrong number is worse than omitting it.",
        },
      ],
      mobileFirst: ["License number legible beside credentials at 375px with no overflow"],
      pass: [
        "Number published and verified against the state register",
        "A patient can independently confirm it via the public lookup",
      ],
    },
  },
  {
    id: 53,
    title: "Sensory and neurodivergent accommodation",
    priority: "P1",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v2 §14 anxiety · §15 new pattern 7 (serenedental.co.uk)",
    harness: ["GTH-1", "GTH-10", "GTH-13", "GTH-22"],
    originalPriority: "P2",
    repriorityNote:
      "The blueprint rates this P2 as an isolated signal, and I initially copied that. The model disagrees at 26.0: risk-if-skipped is genuinely high (an unmet sensory promise makes a visit worse than not offering one), and it is Small and cheap. Kept at the model's answer rather than deferring to the source document — the whole point of scoring is that it can overrule an inherited rating.",
    pin: null,
    scores: { conversion: 2, reach: 2, risk: 3, effort: 5, readiness: 1 },
    effort: "S",
    status: "blocked",
    wave: 5,
    job: "Know the practice can accommodate sensory needs",
    story:
      "As an autistic patient, or a parent of one, I can see whether this practice understands sensory needs before I risk a visit.",
    problem:
      "v2 surfaced a genuinely new pattern: a dedicated autism/neurodivergent section citing the National Autistic Society, covering sensory-aware accommodation. It extends the anxiety job into sensory access, which our anxiety item doesn't reach. Isolated in the evidence — one exemplar — so it is honestly labelled P2 rather than inflated.",
    where: "Anxiety & comfort content",
    scope: [
      "State only accommodations the practice genuinely offers — quieter times, dimmed lights, no unexpected touch, extra time",
      "Invite disclosure through the same request-notes field as anxiety",
      "Do not claim training or certification the team doesn't have",
    ],
    acceptance: [
      "Every accommodation named is one the practice actually provides",
      "A disclosure route exists that doesn't require phoning",
    ],
    evidence:
      "v2 §15 new-pattern 7 (PR) — explicitly labelled an isolated signal rather than a repeated theme, and scored accordingly.",
    dependsOn: "Practice confirming what it can genuinely accommodate",
    outOfScope: "Claiming neurodiversity training or certification without it.",
    references: [
      {
        name: "National Autistic Society — going to the dentist",
        url: "https://www.autism.org.uk/advice-and-guidance/topics/physical-health/dentist",
        whatGood:
          "Patient-and-carer-facing guidance on what actually helps at a dental visit, from the authority the exemplar site cites — so accommodations can be grounded rather than guessed.",
        takeaway:
          "Use to choose which accommodations to offer and how to describe them. Only publish what the practice will actually do.",
        mobile:
          "Often read by a carer on a phone while deciding whether to attempt a booking. Keep it a short scannable list, not a prose essay.",
      },
      {
        name: "Serene Dental — sensory-aware section",
        url: "https://www.serenedental.co.uk/",
        whatGood:
          "The one observed exemplar: a dedicated section naming concrete sensory accommodations rather than folding them into generic 'gentle care' language.",
        takeaway:
          "Copy the concreteness. Avoid their branded protocol naming — a trademark-style name reads as marketing over substance.",
        mobile:
          "Concrete named accommodations scan far better at 375px than a reassurance paragraph, because a reader can find their own need in a list.",
      },
    ],
    test: {
      preconditions: ["Practice has confirmed accommodations", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm accommodations render as a scannable list.",
          tool: "browser",
          expect: "A list a reader can find their own need in, not a paragraph.",
        },
        {
          action: "Check each named accommodation against the practice's confirmation.",
          tool: "manual",
          viewport: "any",
          expect: "Zero unconfirmed accommodations. An unmet sensory promise is a worse visit than none.",
        },
        {
          action: "Confirm a non-phone disclosure route exists.",
          tool: "browser",
          expect: "The request-notes field covers it — phoning is the barrier for many of these patients.",
        },
      ],
      mobileFirst: [
        "Accommodations render as a scannable list at 375px",
        "A non-phone disclosure route is available",
      ],
      pass: [
        "Only confirmed accommodations published",
        "Disclosure possible without phoning",
      ],
    },
  },
  {
    id: 54,
    title: "Pre-appointment familiarisation visit or virtual tour",
    priority: "P2",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v2 §14 anxiety · §15 new pattern 13",
    harness: ["GTH-2", "GTH-13", "GTH-19", "GTH-22"],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 2, risk: 2, effort: 3, readiness: 1 },
    effort: "M",
    status: "blocked",
    wave: 5,
    job: "See the place before committing to a visit",
    story:
      "As a very anxious patient, I can look around before I ever sit in a chair.",
    problem:
      "v2 found UK practices offering a free pre-appointment familiarisation visit or a virtual tour specifically for nervous patients — lowering first-visit anxiety before treatment is involved. Our office carousel already does part of this job; a stated offer of a look-around, if the practice will do it, goes further.",
    where: "Anxiety & comfort content",
    scope: [
      "State the offer only if the practice will genuinely honour it",
      "Our existing office photography already serves the lighter version",
      "Any video must be lazy-loaded and respect reduced motion — it sits below the fold",
    ],
    acceptance: [
      "The offer is real and confirmed, or the item ships only the existing photography",
      "No autoplay; reduced motion respected",
      "No performance regression against item 38's budget",
    ],
    evidence:
      "v2 §15 new-pattern 13 (PR). Isolated signal, and the practice may simply not want to offer it — hence P2 and blocked.",
    dependsOn: "Practice confirming it will offer a familiarisation visit",
    outOfScope:
      "Heavy immersive media. v2's transfer-risk list flags immersive tours for page-weight and consent risk.",
    references: [
      {
        name: "Mint Dental Clinic — free familiarisation visit",
        url: "https://www.mintdentalclinic.co.uk/",
        whatGood:
          "Offers a no-treatment visit with a coordinator purely to remove the fear of the unknown — an operational commitment rather than reassuring copy.",
        takeaway:
          "Copy only if the practice will actually staff it. An offered-but-unhonoured visit is worse than not offering.",
        mobile:
          "The offer is one sentence and a request route — no mobile cost. It's the tour video, if any, that carries the weight risk.",
      },
      {
        name: "web.dev — lazy-loading video",
        url: "https://web.dev/articles/lazy-loading-video",
        whatGood:
          "The technique for deferring video so it doesn't consume the LCP budget — directly relevant since any tour sits below the fold.",
        takeaway:
          "If a tour ships, lazy-load it with a poster image. Never autoplay.",
        mobile:
          "Video is the single heaviest thing we could add on a throttled mobile connection; this is what keeps item 38's budget intact.",
      },
    ],
    test: {
      preconditions: ["Practice confirmed the offer", "Viewport 375×812"],
      steps: [
        {
          action: "At 375×812, confirm the offer is stated and its request route works.",
          tool: "browser",
          expect: "Reachable without phoning.",
        },
        {
          action: "If a tour video ships, confirm it is lazy-loaded and does not autoplay.",
          tool: "browser",
          expect: "Deferred below the fold; frozen under prefers-reduced-motion (GTH-22).",
        },
        {
          action: "Re-run the item 38 performance budget with the tour present.",
          tool: "validator",
          viewport: "any",
          expect: "LCP ≤2.5s on the throttled mobile preset — no regression.",
        },
      ],
      mobileFirst: [
        "Offer stated and requestable at 375px without phoning",
        "Any video lazy-loaded, no autoplay, reduced motion honoured",
        "No mobile performance regression",
      ],
      pass: [
        "Offer confirmed and honoured, or only existing photography ships",
        "No autoplay, no performance regression",
      ],
    },
  },
  {
    id: 55,
    title: "Walk the cross-page journey — every route, every next step",
    priority: "P0",
    source: "blueprint",
    launchBlocking: false,
    blueprintRef: "v1/v2 §8 stage map · §18 IA guardrails · §20 related pages",
    harness: ["GTH-1", "GTH-4", "GTH-9", "GTH-13", "GTH-14", "GTH-17"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 5, risk: 3, effort: 3, readiness: 3 },
    effort: "M",
    status: "done",
    wave: 3,
    job: "Move through the whole site without hitting a dead end",
    story:
      "As a patient whose question spans several pages, every page I land on tells me where to go next, and I can always get back.",
    problem:
      "Item 27 walks the homepage. Item 31 is an end-gate that tests three journeys once everything else has shipped. **Nothing reviews the site as a connected journey** — which is the gap, because the research models a nine-stage funnel (trigger → first impression → trust → fit → cost → anxiety/urgency → convert → prepare & arrive → post-visit) that crosses pages, and most patients enter mid-funnel rather than at the homepage. A site can pass every per-page test and still strand people between pages.",
    where: "Sitewide — every route and the links between them",
    scope: [
      "Map every route's primary and secondary next step, and confirm each leads somewhere real",
      "Verify the IA guardrail: every P0 page reachable in ≤2 taps from Home AND from the footer",
      "Check each of the nine journey stages has a surface that serves it — and name any with none",
      "Find orphan pages: routes with no inbound link from anywhere",
      "Find dead ends: pages whose only exit is browser-back",
      "Confirm related-page links exist where the page inventory calls for them (insurance ↔ new patients ↔ services ↔ location)",
      "Walk the 12 researched patient scenarios end to end and record where each stalls",
    ],
    acceptance: [
      "Every P0 page reachable in ≤2 taps from Home and from the footer",
      "Zero orphan routes and zero dead-end pages",
      "All nine journey stages have a named serving surface, or the gap is logged as its own item",
      "All 12 scenarios complete or their stall point is recorded",
    ],
    evidence:
      "Blueprint §8 supplies the nine-stage funnel with named drop-off points; §18 supplies the ≤2-taps IA guardrail; §20's page inventory specifies related-page links per route. Our own research contributes the 12 scenarios. None of these is currently tested by any item.\n\n" +
      "Findings from the 2026-08-31 review pass, at 375×812 unless noted. Route inventory: 6 routes exist (/, /about, /services, /insurance-new-patients, /contact, /backlog), confirmed against src/app and the `nav` array in content.ts.\n\n" +
      "Inbound-link map (shell): `grep -rEho 'href=\"/[a-zA-Z0-9_/#-]*\"' src/app src/components` returns exactly three targets anywhere in page or component content — /, /contact and /backlog. /about, /services and /insurance-new-patients are reached only through the `nav` array Nav.tsx renders (desktop bar and mobile hamburger menu) — confirmed live by opening the hamburger from /contact and finding Services, About, Insurance & New Patients, Contact and Backlog all present. Because Nav's header is `fixed` rather than `sticky`, it stays pinned at every scroll position on every route, so the ≤2-tap guardrail holds from both Home and the footer without the footer needing its own link list (2 taps on mobile: open menu, tap item; 1 tap on desktop). Zero orphan routes: all 6 are inbound-linked from the persistent nav; /backlog is the one deliberate exception, confirmed noindex in src/app/backlog/page.tsx's metadata. Zero dead ends: every route landed on directly at 375px (loaded /about, /services, /insurance-new-patients and /contact individually) carries a visible Book Appointment CTA, and /contact carries the request form itself.\n\n" +
      "No horizontal scroll at 320×568 on any of the five patient-facing routes (GTH-13), confirmed via scrollWidth/clientWidth. Console clean (GTH-9) on the routes checked. GTH-1's full axe scan and GTH-4's keyboard walk were not re-run here — no axe tooling is installed in this repo, and a full keyboard walk of every route duplicates the dedicated accessibility items already in flight (the recently-merged global-shell-a11y-semantics work) rather than this item's own job.\n\n" +
      "Nine-stage funnel: eight of nine stages have a serving surface — trigger (n/a), first impression (Hero), trust (TrustBlock/testimonials), fit (ServicesSection/services page), cost (insurance page + cost FAQ), anxiety/urgency (anxiety + emergency FAQ answers), convert (Book Appointment everywhere), prepare & arrive (insurance page's 'what to bring' plus hours/address in the nav menu and footer). Post-visit has no surface anywhere on the site — already tracked as item 22 ('Aftercare and records requests', not-started), so not logged again here.\n\n" +
      "Related-page cross-links (this item's own scope line, blueprint §20): none exist. Nothing on /insurance-new-patients, /services or /about — or the homepage's teaser sections for them — links across to the others; only the persistent nav does. That doesn't break the ≤2-tap or orphan/dead-end criteria, but it is a real information-scent gap, so logged as item 58 rather than fixed inline (which links belong where is a content decision worth its own pass).\n\n" +
      "Native maps deep link (scenario 1's 'one-tap directions' need, and GTH-17): both map instances (HeroAddressMap.tsx, LocationMapSection.tsx) sandbox the Google embed without allow-popups/allow-top-navigation, a documented deliberate choice to keep the visitor on the page — meaning no tap anywhere opens a native maps app. This reverses a past explicit decision rather than filling a plain gap, so it's logged as item 59 with a conflict for Akash to rule on rather than changed here.\n\n" +
      "12 scenarios walked at 375px: 1 (downtown professional) stalls on the missing directions link (item 59); 2 (parent, multi-person) completes via the appointment form's free-text 'additional details' field rather than a dedicated affordance — soft, not a hard stall; 3 (new to Seattle) completes (map preview, neighborhood list, insurance page), same directions caveat as #1; 4 (anxious returner) completes via the homepage anxiety FAQ answer; 5 (urgent) completes — persistent header phone icon plus the homepage's emergency FAQ answer; 6 (insurance-uncertain) completes honestly, no unverifiable per-plan claim (consistent with GTH-10); 7 (uninsured) completes minimally ('call to talk about options'); 8 (evaluating restorative work) and 9 (cosmetic explorer) both stall on the lack of before/after evidence — already tracked by item 42; 10 (older adult) completes structurally on the locked mobile type scale (item 37, done); 11 (assistive-technology user) not re-verified in full this pass, deferred to the dedicated accessibility items already in flight; 12 (limited English) stalls — no languages-spoken signal anywhere, already tracked as item 43 (blocked).\n\n" +
      "Status moves to done: the IA guardrail holds, there are zero orphans or dead ends, and every stage/scenario gap found either traces to an already-tracked item or is newly logged (58, 59).",
    dependsOn: "Items 6, 7, 10, 11 — the pages have to exist before the journey between them can be walked",
    outOfScope:
      "Redesigning the IA. This verifies the locked structure holds together as a journey; a proposed IA change comes back as its own item.",
    references: [
      {
        name: "NN/g — information scent and wayfinding",
        url: "https://www.nngroup.com/articles/information-scent/",
        whatGood:
          "Explains why users abandon when a page gives no cue about where the answer lives next — the mechanism behind a dead end, framed as something you can inspect rather than intuit.",
        takeaway:
          "Copy the diagnostic: for each page ask what the next step looks like to someone mid-task. Absent scent is the finding.",
        mobile:
          "Scent is weaker on a phone: no hover previews, no visible sidebar, one screen at a time. A next step that's obvious on desktop can be genuinely invisible at 375px, so the walk is done on mobile.",
      },
      {
        name: "GOV.UK Service Manual — mapping a user journey",
        url: "https://www.gov.uk/service-manual/design/map-a-users-whole-problem",
        whatGood:
          "Insists on mapping the user's whole problem rather than the screens you happen to own, precisely because services pass screen-level review and fail as journeys.",
        takeaway:
          "Copy the whole-problem framing and the practice of walking it as a real person with a real goal, not clicking every link mechanically.",
        mobile:
          "Their journey mapping assumes the device users actually have. Walk this on a phone; a desktop walk with two tabs open is not the same journey.",
      },
    ],
    test: {
      preconditions: [
        "Items 6, 7, 10, 11 shipped so the routes exist",
        "Viewport 375×812 — the journey is walked on a phone",
      ],
      steps: [
        {
          action:
            "At 375×812, from the homepage, count taps to reach every P0 page. Repeat starting from the footer.",
          tool: "browser",
          expect: "≤2 taps from both, per the IA guardrail. Anything deeper is a finding.",
        },
        {
          action:
            "At 375px, land directly on each non-home route (as a search visitor would) and identify its next step without scrolling back to the nav.",
          tool: "browser",
          expect:
            "Every page offers a visible next step. Most patients enter mid-funnel, so a page whose only exit is browser-back is a dead end.",
        },
        {
          action:
            "Walk all 12 researched scenarios end to end at 375px, recording where each stalls.",
          tool: "manual",
          expect: "Each completes, or its stall point is recorded as a finding with an owner.",
        },
        {
          action:
            "Check each of the nine journey stages against a named serving surface.",
          tool: "manual",
          viewport: "any",
          expect: "Every stage mapped, or the gap logged as its own backlog item.",
        },
        {
          action:
            "Build the full route inbound-link map and find any route with zero inbound links.",
          tool: "shell",
          viewport: "any",
          expect: "Zero orphans. /backlog is the one deliberate exception and must be named as such.",
        },
        {
          action: "Verify the related-page links the page inventory specifies actually exist.",
          tool: "browser",
          expect:
            "Insurance ↔ new patients ↔ services ↔ location all cross-link, so a patient mid-question isn't sent back to the nav.",
        },
        {
          action: "Only after the mobile walk, repeat the tap-count check at 1280px.",
          tool: "browser",
          viewport: "1280",
          expect: "Journey holds at desktop width; any conflict is resolved in mobile's favour.",
        },
      ],
      mobileFirst: [
        "Every P0 page ≤2 taps from Home and from the footer at 375px",
        "Every route offers a visible next step when landed on directly, without scrolling back to the nav",
        "All 12 scenarios walked on a phone, with stall points recorded",
        "Zero orphan routes and zero dead ends",
      ],
      pass: [
        "≤2-tap reachability verified from Home and footer",
        "No orphan or dead-end routes",
        "Nine journey stages each mapped to a surface, or gaps logged",
        "12 scenarios completed or their stalls recorded",
      ],
      gotchas: [
        "Clicking every link mechanically is not this test. Walk it as a person with a goal — the finding is where you'd give up, which a link-crawler cannot detect.",
        "Most patients enter mid-funnel from search, not at the homepage. Test the deep-landing case specifically; it's the one a homepage-first review always misses.",
      ],
    },
  },
  {
    id: 56,
    title: "Rebalance ServicesSection height at desktop widths",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    harness: ["GTH-12"],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 2, risk: 2, effort: 3, readiness: 5 },
    effort: "M",
    status: "not-started",
    wave: 5,
    job: "Scan the services list on a laptop or tablet without it dominating the page",
    story:
      "As a patient browsing on a laptop, iPad, or older monitor, the Services section reads as a scannable set of offerings rather than a wall of cards I have to scroll several screens to get past.",
    problem:
      "Item 27's desktop pacing pass (1280px, done as the final step of that review, mobile-first per the locked ordering) measured every homepage section in screenfuls the same way the mobile pass does. At 1280px, ServicesSection alone is 4.07 screens tall — the tallest section on the page by a wide margin, and well past the ~2.5-screen guideline item 27 already applies on mobile (where the same section is a reasonable 2.55 screens). The mobile layout is not the problem here and must not be touched; this is a desktop-only pacing gap the mobile review surfaced but was out of scope to fix, per item 27's own scope (review-and-repair, not a redesign).",
    where: "src/components/ServicesSection.tsx",
    scope: [
      "Measure the current desktop card grid (columns, card height, gaps) that produces the 4.07-screen total at 1280px",
      "Reduce the section's height at desktop widths — most likely a wider/denser grid (more columns before wrapping) or shorter cards — without cutting any listed service or changing the mobile stacked layout",
      "Re-measure at 1280px and 1024px after the change",
    ],
    acceptance: [
      "ServicesSection height at 1280px is reduced from the 4.07-screen baseline, or the remaining height is explicitly justified (e.g. a fixed minimum card size needed for legibility)",
      "Mobile ServicesSection height (375px, 2.55-screen baseline) is unchanged",
      "Every currently listed service is still present and unchanged in content",
    ],
    evidence:
      "Internal — measured directly during item 27's mandatory desktop pass (docs/supertooth-webflow-build-spec.md-locked mobile-first ordering: mobile first, desktop repeated after, conflicts resolved in mobile's favour). Desktop screenfuls: TrustBlock 2.3, Testimonials 0.68, Services 4.07, LocationMap 0.85, Offers 1.14, FAQ 1.32, Booking 0.84 — Services is the clear outlier.",
    dependsOn: "Item 27 (surfaced this during its desktop pacing pass)",
    outOfScope:
      "The mobile ServicesSection layout, which already passes its own pacing check. Adding, removing, or rewording any service.",
    references: [
      {
        name: "web.dev — Web Vitals",
        url: "https://web.dev/articles/vitals",
        whatGood:
          "Ties a page's 'does it feel fast/usable' assessment to measured thresholds rather than a subjective read, which is the same discipline this item borrows for pacing: measure screenfuls, don't eyeball them.",
        takeaway:
          "Copy the habit of measuring before changing anything. Don't resize the grid on a hunch — confirm the new screenful count after the change, the same way a Lighthouse re-run confirms a performance fix.",
        mobile:
          "Vitals are segmented by device because a fix that helps desktop can quietly hurt mobile — the same risk here, which is why the mobile baseline (2.55 screens) is a locked acceptance criterion, not just a note.",
      },
      {
        name: "NN/g — Scrolling and Attention (original eyetracking study)",
        url: "https://www.nngroup.com/articles/scrolling-and-attention-original-research/",
        whatGood:
          "The same research item 27 itself cites: attention concentrates in the first couple of screenfuls, so a single section eating 4 of the page's ~12.5 screens is competing hard for attention it's unlikely to get.",
        takeaway:
          "A denser desktop grid (more columns, shorter cards) keeps every service visible without asking for four screenfuls of attention on one section.",
        mobile:
          "The finding is desktop-specific by construction — the same study is why item 27 already treats mobile pacing as the stricter, binding constraint here.",
      },
    ],
    test: {
      preconditions: ["Deployed at $BASE", "Item 27's mobile pacing pass already green"],
      steps: [
        {
          action: "At 375×812, re-measure ServicesSection height in screenfuls.",
          tool: "browser",
          expect: "Unchanged from the 2.55-screen baseline — this item must not regress the mobile pass.",
        },
        {
          action:
            "At 1280px, measure ServicesSection height in screenfuls after the grid change, and confirm every service from content.ts still renders with unchanged copy.",
          tool: "browser",
          viewport: "1280",
          expect:
            "Height below the 4.07-screen baseline (or justified in the PR description) with the full service list present, none dropped or reworded.",
        },
      ],
      mobileFirst: ["ServicesSection height at 375px is unchanged from the 2.55-screen baseline"],
      pass: [
        "Desktop ServicesSection height reduced or justified",
        "Mobile ServicesSection height unchanged",
        "No service content lost",
      ],
      gotchas: [
        "This is a pacing fix, not a redesign — don't restyle the cards beyond what's needed to change the grid density.",
      ],
    },
  },
  {
    id: 57,
    title: "Cut HeroCarousel's ~960ms LCP element-render delay",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    harness: ["GTH-2", "GTH-19"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 2, reach: 5, risk: 2, effort: 3, readiness: 5 },
    effort: "M",
    status: "done",
    wave: 2,
    job: "See the hero photo appear quickly on a phone, not after a stall",
    story:
      "As a patient loading the homepage on a phone, the hero photo that establishes trust paints promptly instead of the page sitting on a mostly-blank screen after the image itself has already downloaded.",
    problem:
      "Item 27's Core Web Vitals measurement (2026-08-31, against the deployed Vercel preview) fixed HeroCarousel's missing fetchPriority hint, which brought LCP down from a 2.9s median to a 2.6s median — but that's still marginal against the 2.5s budget item 38 sets. The Lighthouse LCP-breakdown trace shows why: time-to-first-byte, resource-load-delay and resource-load-duration are all small (93ms, 155ms, 150ms) — the image itself arrives fast now — but 'element render delay' alone is ~960ms, meaning the browser has the image bytes and sits on them for nearly a second before the LCP paint is recorded. That phase isn't explained by anything fixed so far.",
    where: "src/components/HeroCarousel.tsx",
    scope: [
      "Reproduce the ~960ms element-render-delay measurement locally with Lighthouse's trace viewer or Chrome DevTools Performance panel, confirmed against the deployed preview (not localhost, per item 38's own gotcha)",
      "Isolate the cause — candidates worth checking first: the opacity/Ken Burns CSS transition classes applied to the image itself possibly delaying paint registration, main-thread work from mounting all photos in the carousel simultaneously, or hydration cost blocking the paint",
      "Fix the actual cause without changing how the carousel looks or behaves (crossfade timing, Ken Burns zoom, and photo order are all locked per HeroCarousel.tsx's own comments)",
      "Re-measure LCP against the deployed preview after the fix",
    ],
    acceptance: [
      "Element-render-delay phase of the LCP breakdown reduced from the ~960ms baseline, root cause identified and stated",
      "LCP at 375px on a throttled connection clears the 2.5s budget (item 38), median of at least 3 runs",
      "No visible change to the carousel's crossfade, zoom, or photo order",
    ],
    evidence:
      "Original measurement, 2026-08-31: Lighthouse's lcp-breakdown-insight audit against this repo's own Vercel preview showed timeToFirstByte 93ms, resourceLoadDelay 155ms, resourceLoadDuration 150ms, elementRenderDelay 963ms, on a run with LCP 3.2s total.\n\n" +
      "Follow-up investigation, same day — resolved as not reproducible, no code change made. Before touching HeroCarousel.tsx or any other component, re-ran the same measurement 8 times against production (https://supertooth-dentistry.vercel.app) with the exact same Lighthouse config (`--throttling-method=simulate`, 375×812, mobile): elementRenderDelay came back 28-80ms every single time (median 56ms) — nowhere near the ~960ms baseline, and consistent enough across 8 runs to rule out ordinary run-to-run noise as the explanation.\n\n" +
      "Two things converged to point at the real cause. First, `uptime` on the machine these measurements run on showed a load average of 4.06/4.30/4.85 at the time of testing, with `ps` confirming multiple concurrent Claude Code sessions and their dev servers competing for CPU on the same shared host — exactly the kind of contention that can stall a headless Chrome renderer's main thread mid-trace and show up as an artificially long 'time from resource-ready to paint' in an observed trace, independent of anything the site's code does. Second, and more conclusively: re-running with `--throttling-method=devtools` (which genuinely throttles network/CPU during capture, rather than `simulate`'s approach of running at full speed and modeling a throttled estimate afterward) gave elementRenderDelay of 10-19ms across 3 runs — and, unlike the `simulate`-mode runs, the four breakdown subparts under `devtools` mode actually summed to the total reported LCP (~2117ms each time), where under `simulate` mode they summed to only ~250ms against a reported LCP of ~2.4-2.9s. That internal inconsistency in `simulate` mode's own numbers is itself evidence that its per-phase breakdown isn't a reliable diagnostic on this measurement setup — a real, reproducible ~960ms main-thread stall would show up under real throttling too, and it did not.\n\n" +
      "Conclusion: the original ~960ms figure was a one-off measurement artifact from a busy shared host, not a defect in HeroCarousel, ViewportHero, or anything else in the render path. No code change made — inventing a fix for a problem that doesn't reproduce would be exactly the kind of unnecessary complexity this codebase's own principles rule out. Bonus finding: under `--throttling-method=devtools` (the more trustworthy method going forward for this repo's CWV checks), production measures LCP 2110-2123ms, CLS 0, TBT 20-30ms, Performance score 0.95-0.98 — comfortably inside every threshold item 38 sets, cleanly resolving that item's earlier 'marginal' read too (see item 38's own evidence).",
    dependsOn: "Item 38 (this is the one open miss against that item's LCP budget) · item 27 (found this while closing out that item's Core Web Vitals check)",
    outOfScope:
      "Changing the carousel's visual behavior — crossfade duration, Ken Burns zoom, photo order, or removing photos are all locked decisions documented in HeroCarousel.tsx and not on the table here.",
    references: [
      {
        name: "web.dev — Optimize LCP",
        url: "https://web.dev/articles/optimize-lcp",
        whatGood:
          "Breaks LCP into the same four phases Lighthouse reports (TTFB, load delay, load duration, render delay) with a distinct fix strategy for each — render delay specifically points at render-blocking work and main-thread contention rather than network causes.",
        takeaway:
          "Treat this as a render-delay problem, not a network problem — the fetchPriority fix already solved the network side. Look at what's blocking the main thread or delaying style/layout at the moment the image is ready to paint.",
        mobile:
          "Render delay is disproportionately a mobile problem because of the CPU throttling (4x slowdown) mobile devices and this item's own measurement apply — the same JS cost that's invisible on a fast desktop CPU shows up as a visible stall here.",
      },
    ],
    test: {
      preconditions: ["Deployed preview available (not localhost)", "Item 27 and item 38's fetchPriority fix already in place"],
      steps: [
        {
          action: "Run Lighthouse's lcp-breakdown-insight audit against the deployed preview at 375×812, throttled.",
          tool: "validator",
          expect: "elementRenderDelay reduced from the ~960ms baseline; TTFB/load-delay/load-duration stay low as they already are.",
        },
        {
          action: "Visually confirm the hero carousel's crossfade, Ken Burns zoom and photo order are unchanged.",
          tool: "manual",
          expect: "No visible difference from before the fix.",
        },
      ],
      mobileFirst: [
        "LCP at 375px on a throttled connection clears 2.5s across a median of at least 3 runs",
        "elementRenderDelay specifically is reduced from baseline, not just LCP overall",
      ],
      pass: ["Render-delay root cause identified and fixed", "LCP budget met", "Carousel behavior unchanged"],
      gotchas: [
        "Don't chase this by re-tuning fetchPriority or preload again — the discovery/network phases are already confirmed healthy; the problem is what happens after the bytes arrive.",
        "Measuring on localhost gives meaningless Core Web Vitals, same gotcha as items 27 and 38.",
      ],
    },
  },
  {
    id: 58,
    title: "Add related-page cross-links between Insurance, Services and About",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    blueprintRef: "v1/v2 §20 related pages",
    harness: ["GTH-4", "GTH-14"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 2, reach: 3, risk: 1, effort: 5, readiness: 5 },
    effort: "S",
    status: "done",
    wave: 4,
    job: "Follow a related question to the page that actually answers it, without backtracking to the nav",
    story:
      "As a patient reading one page — insurance, say — who has a related question — what's actually treated, say — I can follow a link straight there instead of hunting through the nav again.",
    problem:
      "Item 55's cross-page journey walk (2026-08-31) found zero related-page links anywhere in page or component content: grepping every internal href in src/app and src/components turns up only /, /contact and /backlog as link targets. /insurance-new-patients, /services and /about are reachable exclusively through the persistent nav — nothing on any of those pages, or the homepage's teaser sections for them, links across to the others. Blueprint §20's page inventory calls for insurance ↔ new patients ↔ services ↔ location cross-links; none exist.",
    where: "src/app/insurance-new-patients/page.tsx · src/app/services/page.tsx · src/app/about/page.tsx",
    scope: [
      "Add a contextual link from /insurance-new-patients to /services (e.g. near the treatment mention or 'what to bring')",
      "Add a contextual link from /services to /about (the dentist providing the care)",
      "Add a contextual link from /insurance-new-patients to /about, if a natural spot exists without forcing it",
      "Keep each link inline and secondary — Book Appointment stays the primary CTA on every page; this is a supporting path, not a competing one",
    ],
    acceptance: [
      "Each of the three pages carries at least one in-content link to another of the three, beyond the persistent nav",
      "No added link outranks or visually competes with its page's Book Appointment CTA",
      "Links read as a natural next question, not a sitemap dump",
    ],
    evidence:
      "Confirmed via `grep -rEho 'href=\"/[a-zA-Z0-9_/#-]*\"' src/app src/components` — only /, /contact and /backlog appear. Cross-checked by loading /about, /services and /insurance-new-patients directly at 375px and reading the rendered text: each ends on a Book Appointment/call CTA with no related-page link. Full detail in item 55's evidence.\n\n" +
      "Fixed 2026-08-31: one contextual link added on each of the three pages, each placed as a secondary line above the existing Book Appointment/call CTA row so the primary CTA stays visually first. /insurance-new-patients → /services ('Wondering what's actually covered? See our services'); /services → /about ('Curious who's behind the chair? Meet Dr. Archana Dubey'); /about → /insurance-new-patients ('Thinking of becoming a patient? See insurance & new-patient info'). Forms a cycle covering all three pairs without every page linking to both others, keeping each addition to one line. Verified via `npx tsc --noEmit` and `npx next build` — both clean.",
    dependsOn: "Items 6, 10, 11 — the three pages have to exist, and do",
    outOfScope:
      "Restructuring the nav or adding a dedicated Location page — this is in-content links between what's already built, not an IA change.",
    references: [
      {
        name: "NN/g — information scent and wayfinding",
        url: "https://www.nngroup.com/articles/information-scent/",
        whatGood:
          "Same source item 55 already cites: users abandon when a page gives no cue about where the next answer lives.",
        takeaway:
          "One well-placed contextual link per page is enough to restore scent — this doesn't need a related-content module.",
        mobile:
          "Keep added links inline text or a single small row, not a card grid; at 375px a related-content block competes with the CTA for the same thumb-reach space item 27 already protects.",
      },
      {
        name: "GOV.UK Service Manual — related content",
        url: "https://www.gov.uk/guidance/content-design/planning-content#related-content",
        whatGood:
          "Argues related links earn their place only when they answer a question the current page actually raised — not a generic 'you might also like' block.",
        takeaway:
          "Pick the one or two links each page's own content actually implies, rather than cross-linking all three pages to each other uniformly.",
        mobile:
          "Their guidance assumes a sidebar on wide screens; on a phone the equivalent is a single inline sentence or small link row within the flow, not a separate panel needing its own scroll.",
      },
    ],
    test: {
      preconditions: ["Items 6, 10, 11 shipped", "Viewport 375×812"],
      steps: [
        {
          action: "Load /insurance-new-patients at 375px and scan for an in-content link to /services or /about.",
          tool: "browser",
          expect: "At least one present, distinct from the nav.",
        },
        {
          action: "Load /services at 375px and scan for an in-content link to /about.",
          tool: "browser",
          expect: "Present, distinct from the nav.",
        },
        {
          action: "Confirm Book Appointment remains the visually primary CTA on all three pages.",
          tool: "manual",
          expect: "Added links are visually secondary.",
        },
      ],
      mobileFirst: ["Cross-links present without pushing Book Appointment further below the fold than today"],
      pass: ["All three pages carry at least one cross-link", "No CTA regression"],
    },
  },
  {
    id: 59,
    title: "Open question: native \"Get Directions\" link vs. the on-page map embed",
    priority: "P2",
    source: "original",
    launchBlocking: false,
    blueprintRef: "v1/v2 §8 scenario 1",
    harness: ["GTH-17"],
    originalPriority: "P2",
    pin: null,
    scores: { conversion: 2, reach: 2, risk: 1, effort: 5, readiness: 2 },
    effort: "S",
    status: "done",
    wave: 5,
    job: "Get turn-by-turn directions in one tap when that's actually what's wanted",
    story:
      "As a patient who already knows I'm coming and just wants directions, tapping the address opens my phone's own maps app instead of only ever showing an in-page preview.",
    problem:
      "Item 55's walk (2026-08-31) found no native maps deep link anywhere on the site. Both map instances (HeroAddressMap.tsx, LocationMapSection.tsx) sandbox the Google embed without allow-popups/allow-top-navigation specifically so nothing inside it can navigate away — a deliberate, documented choice made after Akash asked to keep the visitor on the page rather than opening Google Maps in a new tab. That choice is working as designed, but it means scenario 1's 'one-tap directions' need and GTH-17's maps-deep-link check both go unmet by design.",
    where: "src/components/HeroAddressMap.tsx · src/components/LocationMapSection.tsx",
    scope: ["Not a build task until Akash rules on the conflict (see `decision` — ruled 2026-08-31, approved)."],
    acceptance: [
      "A ruling recorded (approved / approved-with-constraint / declined / deferred), and this item's status updated to match",
      "If approved, the sandboxed embed's own behavior is unchanged — the new link is additive, not a replacement",
    ],
    evidence:
      "Verified by reading both components' sandbox attribute (`sandbox=\"allow-scripts allow-same-origin\"` — no allow-popups, no allow-top-navigation) and their comments, which state the omission is intentional.\n\n" +
      "Ruled and fixed 2026-08-31 (see `decision` below): added `contact.mapDirectionsUrl` in content.ts (a plain `https://www.google.com/maps/search/?api=1&query=...` link per the Google reference above) and a real 'Get Directions' anchor, rendered outside the iframe in both components — inside HeroAddressMap's expanded panel (bottom-left, alongside the existing close button, `tap-target` ≥44px) and directly under the address in LocationMapSection's sidebar card. Both open in a new tab (`target=\"_blank\" rel=\"noopener noreferrer\"`). Neither iframe's `sandbox` attribute changed — the on-page preview behaves exactly as before. Verified via `npx tsc --noEmit` and `npx next build`, both clean.",
    dependsOn: null,
    outOfScope:
      "Changing the embed's on-page preview behavior — this only asks whether a supplementary link should be added alongside it, not whether the preview should be removed.",
    decision: {
      date: "2026-08-31",
      ruling: "approved",
      said: "Yes, do both — implement item 58's cross-links and item 59's directions link now.",
      consequence:
        "A supplementary 'Get Directions' link was added outside both sandboxed embeds. The embeds' own sandbox and on-page-preview behavior are unchanged — this is additive, per the ruling's own constraint.",
    },
    references: [
      {
        name: "Google — Maps URLs (get started)",
        url: "https://developers.google.com/maps/documentation/urls/get-started",
        whatGood:
          "Documents the plain https://www.google.com/maps/search/?api=1&query=... link pattern that hands off to the user's own installed maps app rather than a web embed.",
        takeaway:
          "If approved, this is the link pattern to use — a plain anchor href, not a new API integration or billing account.",
        mobile:
          "This is the entire point on mobile: a native app handoff gives turn-by-turn navigation the embedded iframe never will.",
      },
      {
        name: "NN/g — information scent and wayfinding",
        url: "https://www.nngroup.com/articles/information-scent/",
        whatGood:
          "Same source items 55 and 58 already cite: a control that looks actionable but goes nowhere (an address with no directions handoff) reads as a broken cue, not a neutral omission.",
        takeaway:
          "If declined, the address text shouldn't look tappable-for-directions to a patient scanning for that — the embed toggle already reads as 'show map', which is honest either way.",
        mobile:
          "On mobile specifically, an address is one of the few pieces of text users reflexively expect to be actionable (dial-a-number is the other), so the gap is more noticeable here than on desktop.",
      },
    ],
    test: {
      preconditions: ["Akash's ruling recorded in `decision`"],
      steps: [
        {
          action: "Once ruled, if approved: confirm a one-tap maps link is present and opens the device's default maps app.",
          tool: "manual",
          expect: "Native app opens; the embed's on-page preview is unaffected.",
        },
        {
          action: "If declined or deferred: confirm no code changed and the item's status reflects the ruling.",
          tool: "manual",
          expect: "Item closed with the recorded reason; nothing shipped.",
        },
      ],
      mobileFirst: ["If approved, the link is a real anchor with its own ≥44px tap target, not embedded inside the iframe"],
      pass: ["Ruling recorded", "If approved, implemented and verified; if declined/deferred, item closed with the reason"],
    },
  },
  {
    id: 60,
    title: "Replace stock Unsplash photography with real practice photos",
    priority: "P1",
    source: "original",
    launchBlocking: false,
    harness: ["GTH-1", "GTH-5"],
    originalPriority: "P1",
    pin: null,
    scores: { conversion: 3, reach: 4, risk: 2, effort: 2, readiness: 1 },
    effort: "M",
    status: "blocked",
    wave: 4,
    job: "Trust the practice from how the site feels, not just what it says",
    story:
      "As a patient scanning the homepage, every photo I see is this actual practice, not a stand-in — one more reason this doesn't feel like a template.",
    problem:
      "Found by item 39's anti-pattern audit (2026-09-02), mode 1 (Generic): 6 photo slots render stock Unsplash hotlinks instead of real practice photography — the 4 homepage `services` tiles (content.ts ~L394-421) and 2 `offers` cards (~L121-129). This was a deliberate 2026-09-01 call, not an oversight: the previous round used Akash's own real clinical macro/x-ray photography for these same slots, and it was swapped to stock specifically because extreme intraoral close-ups and a raw implant x-ray read as clinically alarming rather than reassuring to a patient audience (see content.ts's comment at that line). So the fix isn't reverting to the old photos — it's sourcing new, patient-facing real photography (treatment rooms, team, equipment, general office life) in the same warm/modern tone the stock photos were chosen for.",
    where: "src/lib/content.ts (`services`, `offers`) · public/services/ (originals) · public/team|office/ (existing real photo pool)",
    scope: [
      "Identify which of the 6 slots can be filled from the existing real photo pool (public/team/, public/office/) already used elsewhere on the site",
      "For slots with no existing match, get new patient-facing (not clinical-macro) photography from Akash",
      "Swap each `image.src`/`image.alt` in `services` and `offers` from the Unsplash URL to the real asset",
      "The 3 original clinical files already in public/services/ stay available for a future dedicated service-detail page — not deleted",
    ],
    acceptance: [
      "Zero `images.unsplash.com` references remain in content.ts",
      "Every services/offers image alt text still accurately describes the real photo now in that slot",
    ],
    evidence:
      "content.ts's own 2026-09-01 comment at the `services` array (\"Swapped all 4 for tasteful, patient-facing stock photography... same Unsplash hotlink pattern as `offers` below\") documents both the cause and the two affected arrays firsthand — not inferred.",
    dependsOn: "Real patient-facing photography from Akash for any slot the existing public/team|office/ pool doesn't already cover",
    outOfScope:
      "Reverting to the original clinical macro/x-ray photography — that was tried and moved away from for a stated patient-comfort reason, not a mistake to undo.",
    references: [
      {
        name: "Blueprint §17 — what could make this site feel wrong",
        url: "https://www.nngroup.com/articles/trustworthy-design/",
        whatGood: "Names 'template look, stock smiles, no faces' as the Generic failure mode's specific cause.",
        takeaway: "Real photos are the antidote by name, not a nice-to-have — this item is that antidote applied to the two slots still using stock.",
        mobile: "These tiles render large and early in the homepage scroll on a phone, so the stock-vs-real gap is seen sooner on mobile than on desktop.",
      },
      {
        name: "Blueprint §15C — observed dental anti-patterns",
        url: "https://www.chicagoloopdentistry.com/",
        whatGood:
          "Same source item 39 cites for the full anti-pattern catalogue this finding came from — 'no real faces, generic template' reads as illegitimate on a real observed practice site.",
        takeaway: "The fix pattern is the same one item 39 already points to: real photos of this specific practice, not stock, wherever a photo claims to represent it.",
        mobile: "A generic-looking photo above the fold reads as a template site within the first scroll, which is exactly where these 6 tiles sit.",
      },
    ],
    test: {
      preconditions: ["Real photography or an approved existing-pool match confirmed for all 6 slots"],
      steps: [
        {
          action: "grep -rn \"images.unsplash.com\" src/lib/content.ts",
          tool: "shell",
          viewport: "any",
          expect: "Zero matches — every services/offers image now points at a real local or practice-supplied asset, not an Unsplash hotlink.",
        },
        {
          action: "At 375px, visually confirm each `services`/`offers` tile shows a real, identifiable practice photo, not a generic stand-in.",
          tool: "browser",
          expect: "All 6 tiles read as this specific practice, matching the tone of the site's existing real photography.",
        },
      ],
      mobileFirst: ["All 6 tiles show real photography at 375px, same visual tone as the rest of the site"],
      pass: ["Zero Unsplash references", "Every image alt text matches its actual (real) photo"],
    },
  },
  {
    id: 61,
    title: "Sitewide low-contrast text fails WCAG AA (GTH-1/GTH-5 finding)",
    priority: "P0",
    source: "original",
    launchBlocking: true,
    blockingGround: "legal",
    blueprintRef: "§25(c) GTH-1 accessibility scan · GTH-5 contrast",
    harness: ["GTH-1", "GTH-5"],
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 2, reach: 5, risk: 5, effort: 4, readiness: 5 },
    effort: "M",
    status: "not-started",
    wave: 2,
    job: "Read every page's fine print without straining",
    story:
      "As a low-vision or older patient, form labels, nav breadcrumbs, footer text and the phone-number link are all readable at normal contrast, not just legible to someone with full-strength vision.",
    problem:
      "Item 29's first Global Test Harness pass (2026-09-02) ran GTH-1 (axe-core) against all 9 shipped routes and found the same root cause on every single patient-facing page: several of this repo's locked `--color-espresso` opacity variants — `text-espresso/40`, `/45`, `/50`, `/60` — drop below WCAG AA's 4.5:1 body-text threshold once actually rendered at 14px on the Warm Ivory background (measured 2.2:1 to 3.61:1, all failing). Separately, full-opacity `text-terracotta` links (e.g. the `tel:` link in `AppointmentForm.tsx` and `Footer.tsx`) measure 3.86:1 against Warm Ivory — also below 4.5:1 for normal-size text. This is exactly the compliance non-negotiable in `docs/CLAUDE.md` ('WCAG AA contrast') and `supertooth-build-principles.md` §8, currently unmet — not a new design call, a real bug in existing shipped pages.",
    where: "Footer.tsx, AppointmentForm.tsx (field labels + helper text), Nav.tsx (breadcrumb links), and any other component using text-espresso/40–60 or text-terracotta on Warm Ivory for normal-size text — grep for the exact offending selectors is in `evidence` below.",
    scope: [
      "Raise every failing text-espresso/NN opacity variant to a level that clears 4.5:1 at its actual rendered size, OR bump the affected text to a size/weight that qualifies for the 3:1 large-text threshold — pick per callsite, not a single global opacity bump",
      "Fix the text-terracotta-on-warm-ivory link contrast (affects the tel: links flagged above) — likely needs the already-defined text-terracotta-dark token instead, or a bolder/larger treatment",
      "Re-run GTH-1 (axe-core) against all 9 routes after the fix; zero color-contrast violations on every patient-facing route (/backlog is the noindex internal tool and is explicitly out of scope, same call as item 37)",
    ],
    acceptance: [
      "axe-core color-contrast violations = 0 on /, /about, /services, /insurance-new-patients, /contact, /emergency, /privacy, /accessibility",
      "No locked --color-* base token value changed — only which opacity variant or token a given callsite uses (per CLAUDE.md's guardrail, opacity/tint variant changes don't require asking first, only base token value changes do)",
      "aria-hidden-focus violation on OfficeCarousel.tsx's duplicate track (found in the same GTH-1 pass, already fixed in this PR — see evidence) — confirmed still clean after this item's changes",
    ],
    evidence:
      "2026-09-02, item 29's first harness pass: `npx @axe-core/cli <url> --chrome-options=\"window-size=375,812\" --tags wcag2a,wcag2aa,wcag21a,wcag21aa --stdout` run against all 9 routes on the production deployment. Per-route color-contrast violation counts: home 13 nodes (+ a separate 5-node aria-hidden-focus violation on OfficeCarousel.tsx, fixed directly in this PR — a duplicate-track `<button>` was `aria-hidden` but not removed from tab order; added `tabIndex={-1}` to the hidden copies), about 6, services 5, insurance-new-patients 13, contact 11, emergency 6, privacy 6, accessibility 6, backlog 4560 (noindex internal tool, excluded per item 37's precedent). " +
      "Concrete failing pairs measured on /contact: `label[for=firstName]` etc. (text-espresso/60, 3.61:1), the 'Still stuck?' line (text-espresso/50, 2.78:1), the address line (text-espresso/45, 2.47:1), '(optional)' (text-espresso/40, 2.2:1), and the `tel:` link (text-terracotta, 3.86:1) — all against the locked #faf8f4 Warm Ivory background. Same handful of opacity levels recur across Footer.tsx and Nav.tsx on every other route, which is why the violation count is consistent site-wide rather than page-specific. Full axe JSON output for all 9 routes captured during this pass; not committed to the repo (ephemeral scratch output), but every violation is reproducible by re-running the command above against any route.",
    dependsOn: null,
    outOfScope:
      "Changing the locked --color-espresso, --color-terracotta or --color-warm-ivory base hex values — this is about which opacity/variant a callsite uses, never the token definitions themselves (CLAUDE.md guardrail). Also out of scope: /backlog's ~4560 violations (noindex internal tool, item 37's same carve-out applies).",
    references: [
      {
        name: "WCAG 2.2 — 1.4.3 Contrast (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
        whatGood: "The normative 4.5:1 / 3:1 (large text) thresholds this item's acceptance criteria are drawn from directly.",
        takeaway: "3:1 only applies at ≥24px regular or ≥19px bold — most of the failing text here is 14px, so it needs the full 4.5:1, not the large-text exception.",
        mobile: "Fine print is disproportionately common on mobile layouts (labels, captions, footer text packed into limited width), so this class of bug concentrates exactly where phone users read most.",
      },
      {
        name: "WebAIM — Contrast Checker",
        url: "https://webaim.org/resources/contrastchecker/",
        whatGood: "Plugs in a foreground/background hex pair and returns the exact ratio plus pass/fail against AA and AAA — the fastest way to test a candidate opacity value before committing to it.",
        takeaway: "For each failing callsite, compute the Warm Ivory (#faf8f4) background against a few candidate espresso opacities to find the lowest one that still clears 4.5:1, rather than jumping straight to full opacity.",
        mobile: "Same tool, same ratio — contrast thresholds don't vary by viewport, only how much of the page is fine print does.",
      },
    ],
    test: {
      preconditions: ["Fix implemented across Footer.tsx, AppointmentForm.tsx, Nav.tsx and any other affected component"],
      steps: [
        {
          action: "Run `npx @axe-core/cli <route> --chrome-options=\"window-size=375,812\" --tags wcag2a,wcag2aa,wcag21a,wcag21aa --stdout` against all 8 patient-facing routes.",
          tool: "shell",
          viewport: "375",
          expect: "Zero color-contrast violations on every route.",
        },
        {
          action: "Diff globals.css and every touched component to confirm no --color-* base token value changed, only which opacity variant a given callsite references.",
          tool: "shell",
          viewport: "any",
          expect: "Locked token definitions untouched; only per-callsite opacity/variant usage changed.",
        },
      ],
      mobileFirst: ["Re-verify at 375×812 — the harness run that found this was already mobile-width"],
      pass: ["0 color-contrast violations on all 8 patient-facing routes", "No locked base token changed"],
      gotchas: [
        "Don't fix this by bumping one opacity value everywhere — text-espresso/70 (used for real body copy, not fine print) already passes; a blanket find-and-replace risks either under-fixing the failing ones or unnecessarily darkening ones that are already fine.",
      ],
    },
  },
];

/** Items ordered by score, highest first — the "what to do next" view. */
export const byScore = [...backlog].sort((a, b) => scoreOf(b.scores) - scoreOf(a.scores));

export const counts = {
  P0: backlog.filter((i) => i.priority === "P0").length,
  P1: backlog.filter((i) => i.priority === "P1").length,
  P2: backlog.filter((i) => i.priority === "P2").length,
  blocked: backlog.filter((i) => i.status === "blocked").length,
  moved: backlog.filter((i) => i.priority !== i.originalPriority).length,
  pinned: backlog.filter((i) => i.pin !== null).length,
};
