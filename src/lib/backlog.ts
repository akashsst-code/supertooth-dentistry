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
};

export type TestStep = {
  action: string;
  /** Which tool an agent should use: browser, shell, manual, validator. */
  tool: "browser" | "shell" | "validator" | "manual";
  expect: string;
};

export type TestScenario = {
  /** What must be true before the test can run. */
  preconditions: string[];
  steps: TestStep[];
  /** Every one must hold for the item to be considered done. */
  pass: string[];
  /** Known traps that produce false passes or false failures. */
  gotchas?: string[];
};

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
      },
      {
        name: "Dentistry on Queen Anne — patient-information section",
        url: "https://www.dentistryonqueenanne.com/patient-information/new-patients/",
        whatGood:
          "A direct local comparator: every nav item resolves to a real, populated page. Nav promises nothing the site doesn't deliver.",
        takeaway:
          "Copy the discipline of nav-matches-reality. Don't copy their IA depth — they carry more nav items than our locked four-item spec allows.",
      },
    ],
    test: {
      preconditions: [
        "Branch deployed to a Vercel preview URL, or dev server running locally",
        "The preview base URL is known — call it $BASE",
      ],
      steps: [
        {
          action:
            "Extract every href in the `nav` array from src/lib/content.ts (grep for `href:` within the nav export).",
          tool: "shell",
          expect: "A list of route paths. Record it — this is the set under test.",
        },
        {
          action:
            "For each href, request $BASE{href} and record the HTTP status: `curl -s -o /dev/null -w \"%{http_code}\" $BASE{href}`",
          tool: "shell",
          expect: "Every route returns 200. Any 404 is a failure and names the offending route.",
        },
        {
          action:
            "Load $BASE at 1280px and read the desktop nav's anchor hrefs via the accessibility tree or DOM query on `nav[aria-label=\"Primary\"] a`.",
          tool: "browser",
          expect: "The rendered hrefs match the content.ts nav set exactly — no extra, no missing.",
        },
        {
          action:
            "Resize to 375px, open the hamburger, and read the hrefs inside `nav[aria-label=\"Mobile primary\"]`.",
          tool: "browser",
          expect: "Same link set as desktop. Mobile and desktop must not diverge.",
        },
        {
          action: "Click each nav link in turn and record the resulting pathname and h1.",
          tool: "browser",
          expect:
            "Each click lands on the intended route with a non-empty h1. No client-side 404 boundary is rendered.",
        },
      ],
      pass: [
        "Zero nav hrefs return a non-200 status",
        "Desktop and mobile nav expose an identical link set",
        "Every nav link click lands on a page with a real h1",
      ],
      gotchas: [
        "Next.js returns 200 for the not-found boundary in some dev configurations — assert on rendered content (h1 / 'not found' text), not on status alone, when testing locally.",
        "Test the deployed preview, not just localhost: a route can build locally and still fail on Vercel if a file is untracked by git.",
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
      },
      {
        name: "Delta Dental of Washington — what is a dental network",
        url: "https://www.deltadentalwa.com/dental-insurance-101/what-is-a-dental-network",
        whatGood:
          "A carrier operating in our actual market explaining network mechanics in plain language, without practice-side spin. Useful as the source of truth to check our carrier claims against.",
        takeaway:
          "Use as the verification reference for WA-specific carrier claims. Do not copy carrier-side framing into our copy — patients need the practice's own position, not a reprint.",
      },
    ],
    test: {
      preconditions: [
        "Akash has returned the completed Section 22 verification table",
        "Preview deployed at $BASE",
      ],
      steps: [
        {
          action:
            "Grep the codebase for Placeholder render sites: `grep -rn '<Placeholder' src/ --include=*.tsx`",
          tool: "shell",
          expect:
            "Zero matches in components reachable from production routes. Matches inside /backlog or dev-only code are acceptable and must be listed explicitly.",
        },
        {
          action:
            "Fetch each production route and search the rendered HTML for the placeholder signature (a '[ ' bracket adjacent to a dashed-underline span, or the literal word 'pending').",
          tool: "shell",
          expect: "No bracketed placeholder markup in any production route's HTML.",
        },
        {
          action:
            "Cross-check each remaining factual claim in content.ts (carriers, offers, review count, service areas, credentials, hours) against the signed-off Section 22 table.",
          tool: "manual",
          expect: "Every claim is either present-and-confirmed, or absent. Nothing present-and-unconfirmed.",
        },
        {
          action: "Load the homepage and visually scan for bracketed text at 375px and 1280px.",
          tool: "browser",
          expect: "No visible '[ ... ]' placeholder styling anywhere on the page.",
        },
      ],
      pass: [
        "Zero <Placeholder> render sites on production routes",
        "Zero bracketed placeholder strings in fetched production HTML",
        "Every surviving claim maps to a signed-off row in the Section 22 table",
      ],
      gotchas: [
        "A claim can be un-bracketed but still unverified if someone removed the Placeholder wrapper without confirming the fact — the table cross-check is the real test, not the grep.",
        "content.ts comments referencing 'placeholder' will match a naive grep; scope the grep to JSX render sites.",
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
      },
      {
        name: "Seattle Dental Co. — Queen Anne",
        url: "https://www.seattledentalco.com/",
        whatGood:
          "A direct local comparator carrying one phone number consistently across header, footer and contact page, with click-to-call wired on mobile.",
        takeaway:
          "Copy the single-number discipline. Don't copy the practice of listing a separate 'emergency' number unless it's genuinely staffed — that's exactly the ambiguity we removed.",
      },
    ],
    test: {
      preconditions: ["Akash has confirmed the single correct number", "Preview deployed at $BASE"],
      steps: [
        {
          action:
            "Grep for any phone-shaped string in src/: `grep -rnE '\\(?[0-9]{3}\\)?[ .-]?[0-9]{3}[ .-]?[0-9]{4}' src/`",
          tool: "shell",
          expect: "Only the confirmed number appears. Any second distinct number is a failure.",
        },
        {
          action:
            "Fetch every production route and extract all `tel:` hrefs from the HTML.",
          tool: "shell",
          expect: "Every tel: href normalises to the same digits as the confirmed number.",
        },
        {
          action:
            "Load the site at 375px and confirm the header call button and hamburger phone row both use that number.",
          tool: "browser",
          expect: "Both render the confirmed number; tapping either would dial it.",
        },
        {
          action:
            "Compare the site's rendered name, address and hours against the live Google Business Profile.",
          tool: "manual",
          expect: "Character-for-character match, including 'Suite A' formatting and hour ranges.",
        },
      ],
      pass: [
        "Exactly one distinct phone number exists in the codebase",
        "All tel: hrefs resolve to that number",
        "Site NAP matches the GBP exactly",
      ],
      gotchas: [
        "tel: hrefs strip formatting, so a display/href mismatch won't show in a visual check — compare normalised digits.",
        "The GBP comparison is the one step an agent cannot fully automate; it needs a human to open the listing.",
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
      },
      {
        name: "Google Search Central — local business structured data",
        url: "https://developers.google.com/search/docs/appearance/structured-data/local-business",
        whatGood:
          "States which properties Google actually consumes and how openingHoursSpecification must be formatted, plus the Rich Results Test as the validation gate.",
        takeaway:
          "Copy the required/recommended split and the hours format. Avoid stuffing aggregateRating from our unverified review count — that's item 13's job first.",
      },
    ],
    test: {
      preconditions: ["Item 3 complete (single confirmed NAP)", "Preview deployed at $BASE"],
      steps: [
        {
          action: "Fetch $BASE and extract every application/ld+json block from the HTML.",
          tool: "shell",
          expect: "At least two blocks: one FAQPage, one LocalBusiness or Dentist.",
        },
        {
          action:
            "Parse the LocalBusiness/Dentist JSON and compare name, telephone, address and openingHoursSpecification against the values in content.ts.",
          tool: "shell",
          expect: "Every field matches content.ts exactly — no drift, no hardcoded duplicates.",
        },
        {
          action: "Submit the page URL to Google's Rich Results Test.",
          tool: "validator",
          expect: "Zero errors. Warnings are acceptable if recorded and justified.",
        },
        {
          action: "Fetch $BASE/robots.txt and $BASE/sitemap.xml.",
          tool: "shell",
          expect:
            "Both return 200. sitemap.xml lists every public route and does NOT list /backlog.",
        },
        {
          action: "Fetch $BASE/backlog and inspect its robots meta tag.",
          tool: "shell",
          expect: "Contains noindex (and nofollow).",
        },
        {
          action:
            "Fetch each public route and collect <title> and meta[name=description].",
          tool: "shell",
          expect: "Each is present, non-empty, and unique across routes.",
        },
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
      },
      {
        name: "Next.js App Router — layouts and templates",
        url: "https://nextjs.org/docs/app/api-reference/file-conventions/layout",
        whatGood:
          "Explains when a route-group layout.tsx is the right tool versus a shared component — relevant because we may not need a component at all.",
        takeaway:
          "Consider a route-group layout before writing PageShell.tsx; it may be free. Avoid nesting a layout that re-renders Nav twice.",
      },
    ],
    test: {
      preconditions: ["PageShell built and /contact refactored onto it"],
      steps: [
        {
          action: "Capture /contact rendered HTML before and after the refactor and diff them.",
          tool: "shell",
          expect: "No meaningful structural diff — same landmarks, same heading order, same nav.",
        },
        {
          action: "Load /contact and read the accessibility tree.",
          tool: "browser",
          expect:
            "Exactly one banner, one main, one contentinfo (if footer included). Breadcrumb nav has an accessible name and aria-current='page' on the last crumb.",
        },
        {
          action: "Confirm Nav renders exactly once in the DOM.",
          tool: "browser",
          expect: "One header element. A duplicate means the layout and the component both mounted it.",
        },
        {
          action: "Screenshot /contact at 375px and 1280px and compare with pre-refactor captures.",
          tool: "browser",
          expect: "No visual regression.",
        },
      ],
      pass: [
        "No structural or visual regression on /contact",
        "Exactly one banner/main landmark per page",
        "Breadcrumb matches the WAI-ARIA pattern",
      ],
      gotchas: [
        "Nav is `fixed`, so the shell must reserve its height (pt-16). Forgetting that hides the first heading behind the header — check the h1's bounding box top, not just that it exists.",
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
      },
      {
        name: "Humana — plain-language dental policy",
        url: "https://www.humana.com/member/dental-plain-language-policy",
        whatGood:
          "A regulated insurer deliberately restating plan rules in plain language. Demonstrates that the plain-language version can be authoritative rather than dumbed-down.",
        takeaway:
          "Copy the principle that the simple version is the real version, not a summary of a 'real' legal version elsewhere. Avoid their length — we need one screen, not a policy document.",
      },
      {
        name: "Zocdoc — insurance-first search",
        url: "https://www.zocdoc.com/resources/blog/article/patient-self-scheduling/",
        whatGood:
          "Treats insurance verification as the first question in the booking flow rather than a footnote, because that is where patient friction concentrates.",
        takeaway:
          "Copy the sequencing instinct — surface network status before asking for commitment. Do NOT copy the plan-picker UI; we have no eligibility API and a fake picker would imply certainty we can't deliver.",
      },
    ],
    test: {
      preconditions: [
        "Item 2 complete — carrier list verified by Akash",
        "Page deployed at $BASE/insurance-new-patients",
      ],
      steps: [
        {
          action: "Request $BASE/insurance-new-patients.",
          tool: "shell",
          expect: "200, with a non-empty h1.",
        },
        {
          action:
            "Search the rendered text for an explicit contrast between 'accepted' and 'in-network' (both terms present within the same section).",
          tool: "shell",
          expect: "Both terms present and explicitly distinguished, not used interchangeably.",
        },
        {
          action:
            "Check that every carrier named on the page also appears in the verified list from item 2, and that a 'confirm your specific plan' caveat is present.",
          tool: "shell",
          expect: "No carrier appears that isn't verified. The caveat is present and adjacent to the list.",
        },
        {
          action:
            "Search for any currency amount or percentage on the page and cross-check each against the item-2 verification table.",
          tool: "shell",
          expect: "Zero unverified figures.",
        },
        {
          action:
            "Load at 375px and measure the vertical position of the accepted-vs-in-network explanation.",
          tool: "browser",
          expect: "Its top edge is within the first viewport height (above the fold) on a 375×812 screen.",
        },
        {
          action: "Confirm a no-insurance path exists and is linked or explained on the page.",
          tool: "browser",
          expect: "A patient without insurance has a named next step.",
        },
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
      },
      {
        name: "Bedford Dentistry — three-level tooth-pain triage guide",
        url: "https://www.bedforddentistry.com/is-your-tooth-pain-actually-a-dental-emergency-a-simple-triage-guide",
        whatGood:
          "A practice-side worked example of the exact three-tier structure we want: call-now / same-day / within-a-week, each with concrete symptoms rather than vague severity language.",
        takeaway:
          "Copy the tiering and the concreteness. Do NOT copy their specific time commitments ('same day', 'within a week') — those are availability promises we cannot verify for this practice.",
      },
      {
        name: "ABC 123 Family Dental — what an ER can and can't do",
        url: "https://abc123dental.com/is-your-tooth-pain-a-dental-emergency-a-quick-triage-guide",
        whatGood:
          "States plainly that an ER can manage pain and infection temporarily but only a dentist fixes the underlying problem — correcting a genuinely common patient misconception.",
        takeaway:
          "Copy this clarification; it's a real service and it routes patients toward professional care rather than away. Keep it short — one sentence, not a section.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed the after-hours reality",
        "Page deployed at $BASE/emergency",
      ],
      steps: [
        { action: "Request $BASE/emergency.", tool: "shell", expect: "200 with a non-empty h1." },
        {
          action:
            "Verify all three ADA red flags are present in the Tier 1 block: spreading swelling, fever with facial swelling, difficulty breathing or swallowing.",
          tool: "shell",
          expect: "All three present. A missing red flag is an automatic fail — this is the safety-critical assertion.",
        },
        {
          action:
            "Verify the first-aid block contains the warm-water rinse, the cold compress, and an explicit warning against placing aspirin on the tooth or gum.",
          tool: "shell",
          expect: "All three present and consistent with ADA MouthHealthy wording.",
        },
        {
          action:
            "Scan the full page text for response-time promises using a pattern like /(within|in) (an? )?(hour|day|minutes?)|same[- ]day guarantee|immediately seen/i.",
          tool: "shell",
          expect:
            "Zero unverified time promises. Any match must trace to a claim Akash signed off in item 2.",
        },
        {
          action:
            "Confirm Tier 1 appears before Tier 2 and Tier 3 in DOM order, and measure its position at 375px.",
          tool: "browser",
          expect: "Tier 1 is first in DOM order and visible without scrolling on a 375×812 viewport.",
        },
        {
          action: "Confirm a tel: link is present and is a ≥44px tap target at 375px.",
          tool: "browser",
          expect: "Present, correctly sized, and dialling the confirmed number from item 3.",
        },
        {
          action: "From the homepage at 375px, open the hamburger and count taps to reach /emergency.",
          tool: "browser",
          expect: "One tap from the open menu. Also linked in the footer.",
        },
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
      },
      {
        name: "Hennepin Healthcare — directions & parking",
        url: "https://hennepinhealthcare.org/patient-resources/directions-parking",
        whatGood:
          "Presents transit, parking and entrance as equal first-class options rather than burying transit beneath driving directions — appropriate for an urban, transit-served catchment like ours.",
        takeaway:
          "Copy the parity of transit and driving. Avoid their volume of parking detail — our honest answer is short, and padding it would mean inventing claims.",
      },
      {
        name: "Stanford Health Care — locations and parking",
        url: "https://stanfordhealthcare.org/for-patients-visitors/locations-and-parking.html",
        whatGood:
          "States parking cost and validation reality plainly, including where parking is free — no euphemism, so patients aren't surprised on arrival.",
        takeaway:
          "Copy the honesty about cost and availability. We must NOT copy a 'plenty of parking' style claim — Lower Queen Anne parking pressure around Seattle Center events is real and locally known.",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed entrance, floor and step-free access",
        "Deployed at $BASE",
      ],
      steps: [
        {
          action:
            "Verify the arrival content names: the street address, the building/entrance, the floor or how to find Suite A.",
          tool: "shell",
          expect: "All three present. 'Suite A' alone, unexplained, is a fail.",
        },
        {
          action:
            "Verify transit content names RapidRide D, at least one numbered Metro route, and the Monorail-from-Westlake connection.",
          tool: "shell",
          expect: "All present and factually consistent with the cited local sources.",
        },
        {
          action:
            "Scan for parking claims and compare against contact.parkingNote in content.ts.",
          tool: "shell",
          expect:
            "No claim beyond the confirmed statement. Any mention of a garage, validation, or 'ample/plenty of parking' is a fail.",
        },
        {
          action:
            "At 375px, locate the directions link and the call link; measure both tap targets and confirm the directions href opens Google Maps for the confirmed address.",
          tool: "browser",
          expect: "Both ≥44×44px, ≥8px apart, and the maps href encodes the confirmed address.",
        },
        {
          action:
            "Confirm any step-free/accessibility statement present is one Akash confirmed.",
          tool: "manual",
          expect: "Present only if confirmed. An unconfirmed accessibility claim is a fail.",
        },
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
      },
      {
        name: "NN/g — confirmation and acknowledgement",
        url: "https://www.nngroup.com/articles/confirmation-dialog/",
        whatGood:
          "Explains why acknowledgement must restate what happened rather than just saying 'success' — the user needs to verify the system understood them correctly.",
        takeaway:
          "Copy the restate-the-input principle. Our success state should echo the request and the callback window, not just a green tick.",
      },
      {
        name: "Zocdoc — booking confirmation flow",
        url: "https://www.zocdoc.com/resources/blog/article/patient-self-scheduling/",
        whatGood:
          "Confirms with a summary plus calendar integration and reminders, so the patient leaves with something concrete rather than a promise.",
        takeaway:
          "Copy the 'leave them with something concrete' goal — for us, that's an explicit callback window. Don't copy calendar integration yet; that belongs with real booking (item 15).",
      },
    ],
    test: {
      preconditions: [
        "Akash has confirmed the callback window",
        "/contact deployed at $BASE/contact",
      ],
      steps: [
        {
          action: "Load $BASE/contact and read the form's accessibility tree.",
          tool: "browser",
          expect:
            "Every input has an associated visible label (not placeholder-as-label). The optional field is not marked required.",
        },
        {
          action: "Submit the form with all fields empty.",
          tool: "browser",
          expect:
            "Submission is blocked; each invalid field shows an error naming the fix; errors are programmatically associated (aria-describedby) and announced via a live region or error summary.",
        },
        {
          action: "Enter a malformed email and blur the field.",
          tool: "browser",
          expect: "Inline error appears on blur, and its text says how to fix it, not merely 'invalid'.",
        },
        {
          action: "Fill all required fields, leave the optional field empty, and submit.",
          tool: "browser",
          expect: "Submission succeeds — the optional field never blocks it.",
        },
        {
          action: "Inspect the success state.",
          tool: "browser",
          expect:
            "It restates what was submitted, states what happens next, states the confirmed callback window, and offers a phone fallback.",
        },
        {
          action: "Repeat the empty-submit and success paths using keyboard only.",
          tool: "browser",
          expect: "Focus moves to the first error (or the summary) on failure, and to the success message on success. No focus is lost to the body.",
        },
        {
          action: "Measure every interactive target in the form at 375px.",
          tool: "browser",
          expect: "All ≥44×44px with ≥8px separation.",
        },
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
      },
      {
        name: "Penn Dental Medicine — dental anxiety",
        url: "https://penndentalmedicine.org/blog/how-to-get-over-dental-anxiety/",
        whatGood:
          "Institutional voice that explicitly ties comfort to better outcomes and repeat attendance, which reframes accommodation as clinical practice rather than a perk.",
        takeaway:
          "Copy the outcome framing — it earns credibility with the adult professional segment. Avoid the blog-listicle structure; we need a short strip, not '7 ways to…'.",
      },
      {
        name: "DC Pearls Dental — anxiety and phobia",
        url: "https://www.dcpearlsdental.com/getting-started/patient-care-comfort/dental-anxiety-and-phobia/",
        whatGood:
          "Practice-side example that leads with listening — 'we listen when patients express concerns' — rather than leading with sedation upsell.",
        takeaway:
          "Copy the listen-first order. Do NOT copy their sedation claims; we may offer none, and per the locked rule we publish only what's confirmed.",
      },
    ],
    test: {
      preconditions: ["Anxiety content deployed at $BASE"],
      steps: [
        {
          action:
            "Locate the anxiety content and confirm it explicitly acknowledges a gap in care (e.g. time since last visit) without judgemental framing.",
          tool: "browser",
          expect: "Present, and phrased as permission rather than reassurance-about-shame.",
        },
        {
          action:
            "Scan for sedation, nitrous, IV sedation, or named comfort amenities, and cross-check each against Akash's confirmed list.",
          tool: "shell",
          expect: "Zero unconfirmed comfort or sedation claims.",
        },
        {
          action:
            "Confirm the anxiety content and the optional form field from item 9 reference each other, or at minimum that the form field exists.",
          tool: "browser",
          expect:
            "An anxious patient has a route to disclose it before arriving without phoning.",
        },
        {
          action:
            "Read the copy aloud (or have an LLM assess tone) against three failure modes: clinical/cold, saccharine/pitying, sales-driven.",
          tool: "manual",
          expect: "None of the three. Register matches the ADA/Penn references.",
        },
      ],
      pass: [
        "Non-judgmental acknowledgement present",
        "Zero unconfirmed sedation or comfort claims",
        "A pre-arrival disclosure route exists",
        "Tone passes the three failure-mode check",
      ],
      gotchas: [
        "Tone is the actual deliverable here and cannot be asserted by regex. The automated steps only catch unverified claims; a human or LLM tone read is mandatory.",
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
      },
      {
        name: "Rivet — patient cost estimates",
        url: "https://www.rivethealth.com/blog/how-important-are-patient-cost-estimates",
        whatGood:
          "Articulates why the *timing* of an estimate matters as much as the number, which is the exact insight that makes this item shippable without verified prices.",
        takeaway:
          "Copy the timing framing. Treat its percentages as vendor-sourced and directional — do not quote them to Akash as fact.",
      },
    ],
    test: {
      preconditions: ["Item 6 shipped", "Financing terms confirmed or explicitly omitted"],
      steps: [
        {
          action:
            "Confirm the page describes a sequence from exam to written estimate to treatment.",
          tool: "browser",
          expect: "The sequence is explicit and ordered, not implied.",
        },
        {
          action:
            "Extract every currency amount, percentage and financing term, and cross-check each against Akash's confirmed list.",
          tool: "shell",
          expect: "Zero unverified figures or terms. 'Interest-free financing' counts as a term needing verification.",
        },
        {
          action:
            "Confirm the copy states when a patient will receive a specific number.",
          tool: "browser",
          expect: "An explicit answer (e.g. after the comprehensive exam), not a vague 'we'll discuss it'.",
        },
        {
          action: "Read the page as an uninsured patient and check the path still works.",
          tool: "manual",
          expect: "Nothing assumes an insurance card; a no-insurance route is named.",
        },
      ],
      pass: [
        "Estimate sequence explicit and ordered",
        "Zero unverified figures or financing terms",
        "The 'when will I know' question is answered explicitly",
        "The page works for an uninsured reader",
      ],
      gotchas: [
        "'Interest-free financing' is a financial-terms claim, not marketing copy — it needs the same verification as a price.",
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
      },
      {
        name: "One Medical — provider directory",
        url: "https://www.onemedical.com/providers/",
        whatGood:
          "Consumer-grade warmth without losing clinical credibility — photos that look like the actual person you'll meet, plus languages spoken and focus areas.",
        takeaway:
          "Copy the 'languages spoken' field as a future addition (ties to item 23). Don't copy the directory pattern; we have one dentist, not a roster.",
      },
    ],
    test: {
      preconditions: ["Item 5 complete", "/about deployed at $BASE/about"],
      steps: [
        { action: "Request $BASE/about.", tool: "shell", expect: "200 with a non-empty h1." },
        {
          action:
            "Cross-check every credential, date and qualification on the page against the `archana` object in content.ts.",
          tool: "shell",
          expect: "Exact match. No credential appears that isn't in the verified bio.",
        },
        {
          action:
            "Check for any team member name and confirm it against Akash's confirmed roster.",
          tool: "shell",
          expect:
            "Only confirmed names appear. Unconfirmed people are described by role, never named or invented.",
        },
        {
          action: "Confirm every image has meaningful alt text and resolves (no 404s).",
          tool: "browser",
          expect: "All images load; alt text describes the person or moment accurately.",
        },
        {
          action: "Confirm the nav link to /about resolves and is no longer removed/404.",
          tool: "browser",
          expect: "Nav link present and landing on this page.",
        },
      ],
      pass: [
        "Route 200 with real content",
        "Every credential traces to the verified bio in content.ts",
        "Zero unconfirmed team names",
        "All images load with accurate alt text",
      ],
      gotchas: [
        "Only Dr. Dubey's identity is confirmed among existing photos. Two other people appear in team photography without confirmed names — describing them by role is correct, naming them is a fabrication.",
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
      },
      {
        name: "W3C WAI — accessibility statement generator",
        url: "https://www.w3.org/WAI/planning/statements/generator/",
        whatGood:
          "Produces a standards-correct statement from a short questionnaire, so we don't hand-roll legal-adjacent text.",
        takeaway: "Use it to generate the first draft. Have Akash review before publishing.",
      },
      {
        name: "HHS — HIPAA notice of privacy practices",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/model-notices-privacy-practices/index.html",
        whatGood:
          "Official model notices for healthcare providers — the correct starting point for a dental practice's privacy content, rather than a generic website privacy policy.",
        takeaway:
          "Point Akash at these models. We must not draft this ourselves; our job is the page, not the policy.",
      },
    ],
    test: {
      preconditions: ["Akash has supplied the privacy policy text"],
      steps: [
        {
          action: "Request $BASE/privacy and $BASE/accessibility.",
          tool: "shell",
          expect: "Both 200 with non-empty content.",
        },
        {
          action: "Confirm the footer links to both routes on every page.",
          tool: "browser",
          expect: "Both links present in the footer sitewide.",
        },
        {
          action:
            "Check the accessibility statement names the conformance target (WCAG 2.2 AA), lists known limitations, and gives a working contact route.",
          tool: "browser",
          expect: "All three present. A statement claiming full conformance before item 14 has run is a fail.",
        },
        {
          action:
            "Confirm the privacy text is the practice-supplied version, not text we authored.",
          tool: "manual",
          expect: "Provenance confirmed with Akash.",
        },
        {
          action:
            "If the practice texts patients, confirm an SMS/messaging disclosure is present.",
          tool: "manual",
          expect: "Present if applicable; explicitly marked not-applicable if not.",
        },
      ],
      pass: [
        "Both routes serve and are linked sitewide in the footer",
        "Accessibility statement names standard, limitations and contact route",
        "Privacy text provenance confirmed as practice-supplied",
      ],
      gotchas: [
        "Do not let an accessibility statement claim conformance we haven't verified — that converts a good-faith page into a false claim.",
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
      },
      {
        name: "Google — review display and attribution policies",
        url: "https://support.google.com/business/answer/7091",
        whatGood:
          "States the rules for republishing Google reviews, including not editing review substance — which constrains how we excerpt.",
        takeaway:
          "Copy the don't-alter-substance rule. Trimming for length is acceptable; rewriting a review into marketing copy is not.",
      },
    ],
    test: {
      preconditions: ["Akash has supplied three real reviews and confirmed rating/count"],
      steps: [
        {
          action:
            "Grep content.ts for 'pending' or placeholder testimonial strings.",
          tool: "shell",
          expect: "Zero matches in the testimonials array.",
        },
        {
          action:
            "Check each testimonial's attribution matches the pattern 'Firstname L.' — a first name plus a single last initial.",
          tool: "shell",
          expect: "All three match. Any full surname is a HIPAA fail.",
        },
        {
          action:
            "Compare the displayed rating and review count against the live Google Business Profile.",
          tool: "manual",
          expect: "Exact match at time of publication.",
        },
        {
          action:
            "Confirm each published quote is substantively the patient's own words, trimmed at most for length.",
          tool: "manual",
          expect: "No rewriting into marketing copy.",
        },
        {
          action: "Load the homepage and confirm no bracketed placeholder renders in the testimonials section.",
          tool: "browser",
          expect: "Three real quotes render.",
        },
      ],
      pass: [
        "Zero placeholder quotes in code or rendered output",
        "All attributions are first-name-plus-initial",
        "Rating and count match the live GBP",
        "Quotes are the patients' own words",
      ],
      gotchas: [
        "A full name in a review is a HIPAA exposure even though the patient posted it publicly themselves — our republication is the disclosure. Never merge on a partial pass here.",
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
      },
      {
        name: "Deque — axe DevTools",
        url: "https://www.deque.com/axe/devtools/",
        whatGood:
          "The de-facto automated engine, deliberately tuned for near-zero false positives, and scriptable so it can run per route in a loop.",
        takeaway:
          "Use for the automatable ~30–40%. Do not treat a clean axe run as a pass — keyboard, screen-reader and reflow checks are manual and carry most of the real risk.",
      },
      {
        name: "GOV.UK — how we test for accessibility",
        url: "https://accessibility.blog.gov.uk/2018/05/16/what-we-mean-when-we-talk-about-accessibility/",
        whatGood:
          "A public-sector account of combining automated, manual and assistive-technology testing, and of being honest about residual issues rather than claiming perfection.",
        takeaway:
          "Copy the three-layer method and the honesty — it feeds directly into the known-limitations section of item 12's accessibility statement.",
      },
    ],
    test: {
      preconditions: ["Items 1–13 shipped and stable", "Deployed at $BASE"],
      steps: [
        {
          action: "Run axe against every public route.",
          tool: "validator",
          expect: "Zero critical and zero serious violations. Moderate issues logged with an owner.",
        },
        {
          action:
            "Compute contrast ratios for every locked token pairing actually used (espresso on ivory, ivory on terracotta, muted greys on ivory/sand, and the /backlog muted nav link).",
          tool: "browser",
          expect:
            "≥4.5:1 for body text, ≥3:1 for large text and UI component boundaries. Record every measured pair.",
        },
        {
          action:
            "Tab through every page start to finish without a mouse.",
          tool: "browser",
          expect:
            "Focus order is logical, focus is always visible, no keyboard trap, and the mobile menu returns focus to its trigger on close.",
        },
        {
          action:
            "Measure every interactive target and the spacing between adjacent targets at 375px.",
          tool: "browser",
          expect: "All ≥44×44px with ≥8px separation.",
        },
        {
          action: "Set the viewport to 320px wide and check for reflow.",
          tool: "browser",
          expect: "No horizontal scrolling; no content clipped or overlapped.",
        },
        {
          action:
            "Enable prefers-reduced-motion and load pages containing HeroCarousel and OfficeCarousel.",
          tool: "browser",
          expect: "Both freeze; no auto-advance and no Ken Burns zoom.",
        },
        {
          action:
            "Run a screen reader over nav, mobile menu, the appointment form, the FAQ accordion and the /backlog accordion.",
          tool: "manual",
          expect:
            "Every control announces its name, role and state. Accordion expanded/collapsed state is announced. Form errors are announced.",
        },
        {
          action: "Repeat the core booking path on a real phone.",
          tool: "manual",
          expect: "Completable by touch, including a real finger-swipe on both carousels.",
        },
      ],
      pass: [
        "Zero critical/serious axe violations on every public route",
        "All measured contrast pairs meet AA",
        "Full keyboard operability with visible focus and no traps",
        "All targets ≥44px with ≥8px separation at 375px",
        "No horizontal scroll at 320px",
        "Reduced-motion honoured on both carousels",
        "Screen-reader pass on all five interactive surfaces",
        "Real-device pass on the booking path",
      ],
      gotchas: [
        "Automated tools catch roughly a third of real issues. A clean axe run with an untested keyboard path is a false pass.",
        "Backgrounded browser tabs suspend CSS transitions and pointer input — verified in this repo already. Run motion and interaction checks in a foregrounded tab or assert on class/ARIA state instead of measured animation values.",
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
      },
      {
        name: "NHS — book, check or cancel an appointment",
        url: "https://www.nhs.uk/nhs-services/gps/book-check-or-cancel-appointments/",
        whatGood:
          "Public-sector booking designed for the widest possible ability range: plain language, no account required for the simplest paths, and an explicit non-digital alternative always visible.",
        takeaway:
          "Copy the always-visible fallback and the no-account principle. This matters more for us than slickness — our audience spans every age and ability.",
      },
      {
        name: "GOV.UK Design System — question pages / one thing per page",
        url: "https://design-system.service.gov.uk/patterns/question-pages/",
        whatGood:
          "Evidence-based guidance that splitting a flow into one decision per screen reduces errors and drop-off, especially on mobile and for users under stress.",
        takeaway:
          "Copy the one-thing-per-page structure for the booking steps. Avoid a single dense form; our anxious and urgent users are exactly the stressed cohort this pattern protects.",
      },
    ],
    test: {
      preconditions: [
        "Tab32 service-layer decisions resolved",
        "A test/sandbox Tab32 environment available",
      ],
      steps: [
        {
          action: "Complete a booking end-to-end on a 375px viewport.",
          tool: "browser",
          expect: "Booking confirmed without any phone call; confirmation restates date, time and what happens next.",
        },
        {
          action:
            "Verify the booked slot actually exists in the Tab32 sandbox after confirmation.",
          tool: "manual",
          expect: "The appointment is present. A confirmation without a real booking is the worst failure mode here.",
        },
        {
          action:
            "Simulate the API being unreachable (block the route or point at a dead endpoint) and attempt to book.",
          tool: "browser",
          expect:
            "A clear message plus a working fallback to the request form and the phone. No spinner-forever, no dead end, no raw error.",
        },
        {
          action: "Simulate a zero-slots response.",
          tool: "browser",
          expect: "An honest empty state with the phone fallback, not a blank calendar.",
        },
        {
          action:
            "Attempt to book a slot that was taken between page load and submission.",
          tool: "browser",
          expect: "Graceful conflict handling: the user is told and offered alternatives, never double-booked silently.",
        },
        {
          action:
            "Inspect all client-side network requests and the JS bundle for credentials.",
          tool: "browser",
          expect: "No Tab32 API key, token or secret is reachable from the client.",
        },
        {
          action: "Complete a booking with keyboard only, then with a screen reader.",
          tool: "manual",
          expect: "Fully operable; each step's state is announced.",
        },
        {
          action: "Confirm booking start, completion and drop-off events fire.",
          tool: "browser",
          expect: "Events present per build-spec Section 9.",
        },
      ],
      pass: [
        "End-to-end booking succeeds and is real in Tab32",
        "API-down, no-slots and conflict states all degrade to a working fallback",
        "No secret exposed client-side",
        "Keyboard and screen-reader operable",
        "Instrumentation events fire",
      ],
      gotchas: [
        "The highest-severity bug class here is a confirmation shown for a booking that didn't persist. Always assert against the Tab32 record, never against the UI alone.",
        "Never remove the phone path as part of 'simplifying' the flow — it is the fallback of last resort for the urgent and the anxious.",
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
      },
      {
        name: "Dentistry on Queen Anne — patient information",
        url: "https://www.dentistryonqueenanne.com/patient-information/new-patients/",
        whatGood:
          "Local comparator whose new-patient content addresses adults and minors distinctly (including a guardian-accompaniment policy) rather than assuming one audience.",
        takeaway:
          "Copy the explicit minors policy as a concrete inclusion signal. Don't copy the assumption that family means children.",
      },
    ],
    test: {
      preconditions: ["Family/life-stage content deployed at $BASE"],
      steps: [
        {
          action:
            "Confirm the copy names each life stage: children, teens, adults, older adults, and caregivers.",
          tool: "shell",
          expect: "All five represented, explicitly or unambiguously.",
        },
        {
          action: "Confirm an explicit statement that households can be seen together.",
          tool: "browser",
          expect: "Present and unambiguous.",
        },
        {
          action:
            "Read the section as a childless adult and as an older adult and judge whether it excludes either.",
          tool: "manual",
          expect: "Neither reader is excluded; 'family' is not used as a synonym for 'children'.",
        },
        {
          action:
            "Check the visual treatment against the locked palette and confirm no juvenile styling (cartoons, primary colours, novelty type).",
          tool: "browser",
          expect: "Only locked tokens used; nothing reads as a pediatric practice.",
        },
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
      },
      {
        name: "ADA MouthHealthy — A–Z topics",
        url: "https://www.mouthhealthy.org/all-topics-a-z",
        whatGood:
          "Dental-specific, patient-language topic entry maintained by the profession, so the vocabulary mapping (what patients call it vs what it's called clinically) is already validated.",
        takeaway:
          "Copy their patient-facing vocabulary for our six labels. Link out to it where we lack depth rather than writing thin clinical content ourselves.",
      },
    ],
    test: {
      preconditions: ["Item 11 shipped", "Concern list deployed at $BASE"],
      steps: [
        {
          action: "Count the concern entries and extract their hrefs.",
          tool: "browser",
          expect: "Exactly six entries, each with a real href.",
        },
        {
          action: "Follow every href.",
          tool: "shell",
          expect: "All resolve to 200 and land on relevant, existing content — no empty anchors.",
        },
        {
          action:
            "Inspect the DOM and JS for any conditional logic, scoring, branching or form state in this component.",
          tool: "browser",
          expect:
            "None. These are static links. Any branching logic means a symptom checker has crept in — automatic fail.",
        },
        {
          action: "Read each label and confirm none asserts a diagnosis or a cause.",
          tool: "manual",
          expect: "Labels describe experience ('a tooth hurts'), never conclusions ('you have pulpitis').",
        },
        {
          action: "Confirm keyboard operability and ≥44px targets at 375px.",
          tool: "browser",
          expect: "All six reachable by keyboard with visible focus and correctly sized.",
        },
      ],
      pass: [
        "Exactly six static links, all resolving to real content",
        "Zero branching or scoring logic",
        "No label implies a diagnosis",
        "Keyboard operable at ≥44px",
      ],
      gotchas: [
        "Scope creep here is a clinical-risk event, not a design debate. If a reviewer asks for 'just a couple of follow-up questions', that is a symptom checker and it is out of scope.",
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
      },
      {
        name: "Belltown Modern Dentistry — services",
        url: "https://www.belltownmoderndentistry.com/",
        whatGood:
          "Nearby comparator showing the expected service-page conventions for this market — a scannable list with a consistent booking CTA.",
        takeaway:
          "Copy the scannability. Avoid the DSO house style of many thin pages; our four should each say something real.",
      },
    ],
    test: {
      preconditions: ["Item 5 shipped", "Confirmed service list", "/services deployed"],
      steps: [
        { action: "Request $BASE/services.", tool: "shell", expect: "200 with a non-empty h1." },
        {
          action:
            "Confirm each service listed appears in Akash's confirmed service list.",
          tool: "shell",
          expect: "No service appears that the practice doesn't verifiably offer.",
        },
        {
          action: "Scan for currency amounts.",
          tool: "shell",
          expect: "Zero prices unless verified in item 2.",
        },
        {
          action: "Confirm each service says what it is, when it's needed, and what a visit involves.",
          tool: "browser",
          expect: "All three present per service — not a bare title and a photo.",
        },
        {
          action: "Confirm a Book CTA is present and all images load.",
          tool: "browser",
          expect: "CTA present and working; no broken images.",
        },
      ],
      pass: [
        "Route 200 with real content",
        "Every service confirmed by the practice",
        "Zero invented pricing",
        "Each service answers what/when/what-happens",
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
      },
      {
        name: "ADA — managing dental practice online reviews",
        url: "https://www.ada.org/resources/practice/legal-and-regulatory/managing-dental-practice-online-reviews",
        whatGood:
          "Reiterates that republishing patient reviews carries privacy obligations — which don't disappear because the data now arrives via an API.",
        takeaway:
          "Automation does not relax the HIPAA attribution rule. Filter or format names on ingest.",
      },
    ],
    test: {
      preconditions: ["Item 13 shipped", "API integration deployed"],
      steps: [
        {
          action: "Load the reviews section and compare the displayed rating and count against the live GBP.",
          tool: "manual",
          expect:
            "Rating and review count match the live Google Business Profile exactly at time of check, with no rounding drift.",
        },
        {
          action: "Block the reviews API and reload.",
          tool: "browser",
          expect:
            "Graceful degradation to verified static content. No error text, no empty box, no layout collapse.",
        },
        {
          action: "Simulate a zero-reviews response.",
          tool: "browser",
          expect: "Sensible empty state rather than a broken component.",
        },
        {
          action: "Inspect client network traffic and the JS bundle for the API key.",
          tool: "browser",
          expect: "No key reachable client-side.",
        },
        {
          action: "Confirm every displayed reviewer name is first-name-plus-initial.",
          tool: "browser",
          expect: "No full surnames render, even if the API returns them.",
        },
      ],
      pass: [
        "Live rating matches GBP",
        "API failure and empty states both degrade gracefully",
        "No client-side key exposure",
        "All names conform to the HIPAA attribution format",
      ],
      gotchas: [
        "The API returns full display names. Formatting on ingest is mandatory — rendering the raw name is a HIPAA fail even though the integration 'works'.",
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
      },
      {
        name: "W3C — language declarations and localisation",
        url: "https://www.w3.org/International/questions/qa-html-language-declarations",
        whatGood:
          "The technical correctness layer: declaring lang attributes properly so screen readers pronounce content in the right language.",
        takeaway:
          "Copy the lang-attribute discipline — mandatory if any translated content ships, and cheap to get right.",
      },
    ],
    test: {
      preconditions: ["Akash has confirmed team language capabilities"],
      steps: [
        {
          action: "Confirm every named language matches Akash's confirmed list.",
          tool: "shell",
          expect: "Zero unconfirmed language claims.",
        },
        {
          action: "If translated content ships, verify lang attributes on those elements.",
          tool: "browser",
          expect: "Correct BCP-47 lang on every translated block; screen reader switches pronunciation.",
        },
        {
          action: "Confirm no machine-translated medical content was published.",
          tool: "manual",
          expect: "Any translation is human-reviewed.",
        },
      ],
      pass: [
        "Zero unconfirmed language claims",
        "Correct lang attributes on translated content",
        "No unreviewed machine translation of medical content",
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
      },
      {
        name: "ADA MouthHealthy — per-procedure topics",
        url: "https://www.mouthhealthy.org/all-topics-a-z",
        whatGood:
          "Per-procedure patient explanations that stay clinically safe and avoid implying guaranteed outcomes — exactly the register per-service pages need.",
        takeaway: "Copy the structure and caution. Don't reproduce their text; write our own and cite theirs.",
      },
    ],
    test: {
      preconditions: ["Item 11 shipped", "Per-service pages deployed"],
      steps: [
        {
          action: "Request each service slug URL.",
          tool: "shell",
          expect: "All 200 with unique titles and descriptions.",
        },
        {
          action: "Confirm each page carries 2–3 Q&A pairs and matching FAQPage JSON-LD.",
          tool: "shell",
          expect: "Visible content and structured data match exactly — no drift.",
        },
        {
          action: "Validate each page's structured data in the Rich Results Test.",
          tool: "validator",
          expect: "Zero errors on every service page. Warnings recorded and justified if present.",
        },
        {
          action: "Confirm the accordion is a shared component, not a third copy of the pattern.",
          tool: "shell",
          expect:
            "FAQSection's accordion is extracted and imported by both consumers — no duplicated open/close implementation.",
        },
        {
          action: "Check tone: explanatory, not promotional; no outcome guarantees.",
          tool: "manual",
          expect:
            "Copy explains what a treatment involves without promising a result, and reads as information rather than a sales page.",
        },
      ],
      pass: [
        "All service pages 200 with unique metadata",
        "Visible FAQ and JSON-LD identical",
        "Structured data validates",
        "Accordion is shared, not duplicated",
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
      },
      {
        name: "GOV.UK Design System — question pages",
        url: "https://design-system.service.gov.uk/patterns/question-pages/",
        whatGood:
          "Long-form data capture split into small accessible steps, tested with users who find forms hard — the correct model for medical-history intake.",
        takeaway: "Copy the structure if we build it. Don't put a full medical history on one screen.",
      },
    ],
    test: {
      preconditions: ["Item 15 shipped", "PHI handling approach decided and reviewed"],
      steps: [
        {
          action: "Confirm where PHI is stored and who processes it.",
          tool: "manual",
          expect: "Documented and reviewed. If we store PHI ourselves without review, stop.",
        },
        {
          action: "Verify transport security and that no PHI appears in URLs, query strings or logs.",
          tool: "browser",
          expect: "HTTPS throughout; zero PHI in URLs or client logs.",
        },
        {
          action: "Run the full accessibility test from item 14 against the forms.",
          tool: "validator",
          expect: "Zero critical/serious violations; keyboard and screen-reader operable.",
        },
        {
          action: "Confirm partial progress is preserved or the loss is clearly warned about.",
          tool: "browser",
          expect: "No silent data loss on a long form.",
        },
      ],
      pass: [
        "PHI handling documented and reviewed",
        "No PHI in URLs or logs",
        "Accessibility pass equivalent to item 14",
        "No silent data loss",
      ],
      gotchas: [
        "Never place PHI in a URL or query string — it lands in server logs, browser history and analytics referrers.",
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
      },
      {
        name: "HHS — individuals' right to access health information",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/access/index.html",
        whatGood:
          "Defines patients' legal right of access and the response timeframes a records-request path must respect.",
        takeaway: "Copy the timeframes into the published process so we don't promise faster than the law assumes.",
      },
    ],
    test: {
      preconditions: ["Dr. Dubey has clinically reviewed all aftercare content"],
      steps: [
        {
          action: "Confirm every aftercare instruction is signed off by Dr. Dubey.",
          tool: "manual",
          expect: "Documented clinical sign-off. Unreviewed clinical guidance must not ship.",
        },
        {
          action: "Confirm each aftercare topic includes explicit 'contact us if…' criteria.",
          tool: "browser",
          expect: "Present for every procedure covered.",
        },
        {
          action: "Complete a records request end-to-end without phoning.",
          tool: "browser",
          expect: "Completable; the stated timeframe matches HIPAA access expectations.",
        },
        {
          action: "Confirm no PHI is collected via an insecure path.",
          tool: "browser",
          expect: "Secure transport; no PHI in URLs.",
        },
      ],
      pass: [
        "All aftercare content clinically signed off",
        "Every topic has contact-us criteria",
        "Records request completable without phoning, with a lawful timeframe",
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
      },
      {
        name: "Google Business Profile — service area guidelines",
        url: "https://support.google.com/business/answer/9157481",
        whatGood: "Defines how service areas should be represented so the site and the GBP don't contradict each other.",
        takeaway: "Keep serviceAreas in content.ts aligned to whatever the GBP declares.",
      },
    ],
    test: {
      preconditions: ["Akash has confirmed the real service area"],
      steps: [
        {
          action: "Compare serviceAreas in content.ts against the confirmed list and the GBP.",
          tool: "shell",
          expect: "Exact match. Unconfirmed neighbourhoods removed.",
        },
        {
          action: "If local pages exist, compare their content for near-duplication.",
          tool: "shell",
          expect: "Each page says something substantively different. Templated duplicates are a fail.",
        },
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
      },
      {
        name: "ICO — cookies and similar technologies guidance",
        url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/",
        whatGood:
          "Clear regulator guidance on when analytics require consent — the test that determines whether we need a banner at all.",
        takeaway:
          "Use to justify the analytics choice. Avoid anything requiring a consent banner unless there's a compelling reason.",
      },
    ],
    test: {
      preconditions: ["Analytics chosen and deployed", "Item 12 privacy policy live"],
      steps: [
        {
          action: "Trigger each conversion path and confirm its event fires.",
          tool: "browser",
          expect: "Form submit, booking start/complete/drop-off, and click-to-call all emit events.",
        },
        {
          action: "Inspect network requests and cookies for personal data or cross-site trackers.",
          tool: "browser",
          expect: "No PII transmitted; no third-party tracking cookies unless consented.",
        },
        {
          action: "Confirm the analytics tool is named in the privacy policy.",
          tool: "browser",
          expect:
            "The privacy policy names the specific analytics provider and what it collects — a generic 'we use analytics' line does not count.",
        },
        {
          action: "Confirm click-to-call is tracked on mobile specifically.",
          tool: "browser",
          expect: "Event fires on tel: activation at 375px.",
        },
      ],
      pass: [
        "All four conversion paths emit events",
        "No PII or unconsented third-party tracking",
        "Analytics disclosed in the privacy policy",
        "Click-to-call tracked on mobile",
      ],
      gotchas: [
        "tel: activation navigates away from the page, so a naive event can be lost before it sends — use a beacon/keepalive request.",
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
