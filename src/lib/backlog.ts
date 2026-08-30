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

export type BacklogItem = {
  id: number;
  title: string;
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
  1: "No new content needed from the practice. All Small. Could ship this week.",
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
    id: 1,
    title: "Fix the three 404 primary-nav routes",
    priority: "P0",
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 5, risk: 4, effort: 5, readiness: 5 },
    effort: "S",
    status: "not-started",
    wave: 1,
    job: "Find a dentist · evaluate credibility",
    story:
      "As someone evaluating this practice, I click a nav link and land on a real page, so I don't conclude the practice is defunct.",
    problem:
      "`nav` in content.ts links to /services, /about and /insurance-new-patients. None of those routes exist — three of four primary nav links 404. On a site whose stated goal is 4–5× new patients, three quarters of the primary nav is broken.",
    where: "src/lib/content.ts · src/app/*",
    scope: [
      "Decide per route: ship a minimum page now, or remove the link until the page exists",
      "Recommended: remove from nav immediately (Small), then restore each link as items 6, 10 and 11 land",
      "Keep the locked four-item nav structure — this is a sequencing fix, not an IA change",
    ],
    acceptance: [
      "No link in the primary nav or mobile menu returns a 404",
      "Every remaining nav href resolves to HTTP 200 on the deployed preview",
      "The mobile hamburger and desktop nav render the same link set",
      "Verified at 375px, 768px and 1280px",
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
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 5, risk: 4, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
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
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 44/50 — second highest in the backlog, so P0 on merit. Also pinned: publishing a carrier list that the insurer's directory contradicts is how patients get balance-billed.",
    scores: { conversion: 5, reach: 5, risk: 5, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
    wave: 2,
    job: "Understand insurance, cost and payment",
    story:
      "As a patient with a dental plan, I learn whether you're in-network with my plan and what I'll owe, before I book.",
    problem:
      "'We're in-network with most major plans' is not an answer. Patients routinely conflate 'accepts your insurance' with 'in-network with your plan', and the failure mode is a surprise balance bill months later — the angriest theme in the whole review corpus.",
    where: "new src/app/insurance-new-patients/page.tsx",
    scope: [
      "One plain paragraph explaining accepted vs in-network",
      "Verified carrier list plus an explicit 'plans differ — confirm yours with us' caveat",
      "When a specific estimate is possible (after the exam) and why not before",
      "A path for patients without insurance",
      "What to bring: card, ID, medication list, prior x-rays",
      "Reuse the existing InsuranceBlock / InsuranceExpandCard components",
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
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 37/50 — P0 on merit. Also pinned on patient-safety grounds: incorrect or missing red-flag guidance for spreading swelling or airway compromise is a clinical harm, not a conversion miss.",
    scores: { conversion: 4, reach: 3, risk: 5, effort: 3, readiness: 2 },
    effort: "M",
    status: "blocked",
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
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 5, reach: 4, risk: 3, effort: 5, readiness: 3 },
    effort: "S",
    status: "not-started",
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
    originalPriority: "P0",
    pin: null,
    scores: { conversion: 4, reach: 4, risk: 2, effort: 3, readiness: 4 },
    effort: "M",
    status: "not-started",
    wave: 3,
    job: "Evaluate trust and clinical credibility",
    story: "As a patient, I know exactly who will treat me and why they're qualified.",
    problem:
      "The nav links to /about and it 404s — while the site already holds its single strongest trust asset: a real, specific, credentialed bio and real photography.",
    where: "new src/app/about/page.tsx",
    scope: [
      "Dr. Dubey: bio, credentials, philosophy quote, real photo — all already in content.ts",
      "Team, once real names and roles are confirmed",
      "Extract the bio card from TrustBlock for reuse",
      "Verified credentials only",
    ],
    acceptance: [
      "Page uses only already-verified bio content",
      "Photos match who a patient actually meets in the room",
      "Nav link no longer 404s",
      "No unconfirmed team names appear",
    ],
    evidence:
      "Usability tier — provider bios with training, focus and a photo matching the real person are the highest-trust element on a medical site. Vague trust language ('compassionate care') registers as noise.",
    dependsOn: "Item 5 · team names for the team section (bio section unblocked today)",
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
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 31/50, which would place it in P1 — pinned to P0 because the build spec lists privacy disclosures as build-blocking before go-live, and an accessibility statement is the documented route for a disabled patient to report a barrier. Legal/ethical floor beats score.",
    scores: { conversion: 1, reach: 3, risk: 5, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
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
    originalPriority: "P0",
    pin: "legal",
    repriorityNote:
      "Scores 42/50 — third highest, so P0 on merit. Also pinned: testimonial attribution is a HIPAA constraint locked in the build spec, and invented patient quotes would be a fabrication.",
    scores: { conversion: 4, reach: 4, risk: 5, effort: 5, readiness: 2 },
    effort: "S",
    status: "blocked",
    wave: 3,
    job: "Evaluate reviews without being overwhelmed",
    story: "As a patient, I read real things real patients said.",
    problem:
      "All three testimonial quotes read 'Patient quote pending' in production, and the 4.9★ / 487 count is unconfirmed. Reviews are among the most-checked trust signals; placeholders here actively cost trust.",
    where: "src/lib/content.ts · src/components/TestimonialsSection.tsx",
    scope: [
      "Pull three real reviews from the Google Business Profile",
      "First name + last initial only — never a full patient name without written authorization",
      "Confirm the real rating and count against the live GBP",
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
    originalPriority: "P0",
    pin: null,
    repriorityNote:
      "DEMOTED P0 → P1 (29.5/50). The urgent part of this — a nav link that 404s — is fully handled by item 1, which removes the link. Once nothing is broken, a services page is ordinary content work: moderate conversion value, no compliance risk, and blocked on a confirmed service list. Lower than anxiety (35.5) and cost clarity (34), both of which were P1.",
    scores: { conversion: 3, reach: 4, risk: 2, effort: 3, readiness: 3 },
    effort: "M",
    status: "not-started",
    wave: 4,
    job: "Discover appropriate services",
    story: "As a patient, I can see what you do and whether my concern is covered.",
    problem:
      "The nav links to /services and it 404s. The homepage teaser shows four services with no detail behind them.",
    where: "new src/app/services/page.tsx",
    scope: [
      "The four existing services, each with what it is, when it's needed, what a visit involves",
      "Reuse existing real service photography",
      "Book CTA",
    ],
    acceptance: [
      "Nav link no longer 404s",
      "No unverified service claims",
      "No invented pricing",
    ],
    evidence: "Internal — build spec Section 2. Service-page depth is deferred to item 18.",
    dependsOn: "Item 5 · confirmed service list",
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
