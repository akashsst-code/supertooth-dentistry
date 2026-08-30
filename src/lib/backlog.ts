/**
 * Prioritized build backlog — derived from
 * `docs/supertooth-patient-needs-research.md` (deep patient-needs research,
 * 2026-08-30). Rendered at `/backlog`.
 *
 * This is a WORKING/INTERNAL artifact, not patient-facing content. The
 * page that renders it is `noindex` and reachable only from the mobile
 * menu's internal section — deliberately kept out of the primary `nav`
 * array in `content.ts`, which is the patient-facing wayfinding surface
 * locked in docs/supertooth-navigation-requirements.md.
 *
 * Why a typed module rather than a markdown table: the same items need to
 * be filtered, counted, and grouped on the page, and a table in a doc
 * can't do that without a parser. The prose reasoning behind every item
 * still lives in the research doc — this file is the actionable slice, not
 * a second source of truth for the *why*.
 *
 * `evidence` is deliberately labeled with the research doc's tiers
 * (clinical / standards / patient / practice / vendor / internal) rather
 * than stated as fact, per that doc's Section 2 limitations: most
 * quantitative dental-marketing figures are vendor-sourced and
 * uncorroborated, and are used as directional support for a qualitative
 * theme, never as a forecast.
 */

export type Priority = "P0" | "P1" | "P2";
export type Effort = "S" | "M" | "L";
export type Status = "not-started" | "partial" | "blocked" | "done";

export type BacklogItem = {
  id: number;
  title: string;
  priority: Priority;
  effort: Effort;
  status: Status;
  wave: number;
  /** Patient job this serves, phrased as patient progress. */
  job: string;
  /** User story — who, what, why. */
  story: string;
  /** The problem being solved, stated concretely. */
  problem: string;
  /** Page or flow it lands in. */
  where: string;
  /** What's in scope — kept small and independently shippable. */
  scope: string[];
  /** How we know it's done. */
  acceptance: string[];
  /** Evidence tier + the specific finding supporting it. */
  evidence: string;
  /** What must land first. `null` = nothing. */
  dependsOn: string | null;
  /** Explicitly NOT in scope — the over-engineering guardrail. */
  outOfScope: string;
};

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
      "Verified at desktop and mobile on the Vercel preview",
    ],
    evidence:
      "Internal — verified directly against the repo: only src/app/page.tsx and src/app/contact/page.tsx exist. Highest severity-to-effort ratio in the backlog.",
    dependsOn: null,
    outOfScope: "Redesigning navigation. Adding new nav items. The four locked labels stay.",
  },
  {
    id: 2,
    title: "Verify-or-remove every unverifiable claim",
    priority: "P0",
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
    ],
    evidence:
      "Internal locked rule (CLAUDE.md: no unverifiable claims) + ADA guidance on out-of-network confusion: a documented case exists of a practice site listing carriers the insurer's directory didn't corroborate, ending in a balance bill.",
    dependsOn: "Akash / Dr. Dubey sign-off on the Section 22 table",
    outOfScope: "Writing new marketing copy. This item only removes or confirms what already exists.",
  },
  {
    id: 3,
    title: "Resolve the phone-number conflict and make NAP consistent",
    priority: "P0",
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
    ],
    evidence:
      "Internal (documented conflict) + vendor SEO sources treating NAP consistency as a local-ranking factor — directional, but the dead-number risk stands on its own.",
    dependsOn: "Akash confirming which number is correct",
    outOfScope: "A directory-citation cleanup campaign. Site and GBP parity only.",
  },
  {
    id: 4,
    title: "Add LocalBusiness schema, robots.ts, sitemap.ts and per-page metadata",
    priority: "P0",
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
      "Schema validates in Google's Rich Results Test",
      "Schema values match content.ts exactly",
      "/backlog is absent from the sitemap and returns noindex",
    ],
    evidence:
      "Internal — build spec Section 7 checklist item, still open. Vendor SEO sources corroborate GBP/schema weight, directionally.",
    dependsOn: "Item 3 (correct NAP to encode)",
    outOfScope: "A full SEO campaign. Structural correctness only.",
  },

  // ─────────────────────────── WAVE 2 ───────────────────────────
  {
    id: 5,
    title: "Extract a PageShell component",
    priority: "P0",
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
    acceptance: ["Two routes render through PageShell with no visual regression on /contact"],
    evidence:
      "Internal build principle — reusable components over page-specific inventions. Justified by six upcoming consumers, not built speculatively.",
    dependsOn: null,
    outOfScope: "A layout/theming system. One shell, one job.",
  },
  {
    id: 6,
    title: "Build /insurance-new-patients — the highest-risk content on the site",
    priority: "P0",
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
    ],
    evidence:
      "ADA guidance (clinical/professional tier) on out-of-network confusion and the documented site-vs-directory balance-bill case. Corroborated by patient-generated billing-surprise themes.",
    dependsOn: "Item 2 (verified carriers)",
    outOfScope: "A cost calculator or coverage-lookup tool. Can't be accurate without plan data, and inaccuracy is worse than silence.",
  },
  {
    id: 7,
    title: "Build /emergency — safe, non-diagnostic urgent guidance",
    priority: "P0",
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
    ],
    evidence:
      "Clinical tier — ADA MouthHealthy and JADA. Peer-reviewed: dental-anxiety prevalence among emergency patients approaches 49%, so this page must read calm, not alarming.",
    dependsOn: "Akash confirming the after-hours reality (voicemail / service / nothing)",
    outOfScope: "A symptom checker or triage tool. Clinical risk, no supporting evidence, explicitly ruled out.",
  },
  {
    id: 8,
    title: "Expand arrival: transit, parking, entrance and Suite A",
    priority: "P0",
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
    ],
    evidence:
      "Local sources (Monorail ~2 min to Westlake; RapidRide D and routes 1/2/3/4/13). Cross-domain: hospitality treats arrival instructions as part of the booking product.",
    dependsOn: "Akash confirming entrance, floor and step-free access",
    outOfScope: "Live transit times or a route planner. Link to Google Maps and stop there.",
  },
  {
    id: 9,
    title: "Add form confirmation and error states",
    priority: "P0",
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
    ],
    evidence:
      "Cross-domain (airline/hotel confirmation patterns). The optional field also serves the anxiety job — peer-reviewed tier — at near-zero cost: it lets an anxious patient say so without saying it out loud at the desk.",
    dependsOn: "Akash confirming the real callback window",
    outOfScope: "Real-time slot availability. That's item 15.",
  },

  // ─────────────────────────── WAVE 3 ───────────────────────────
  {
    id: 10,
    title: "Build /about from Dr. Dubey's existing real bio",
    priority: "P0",
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
    ],
    evidence:
      "Usability tier — provider bios with training, focus and a photo matching the real person are the highest-trust element on a medical site. Vague trust language ('compassionate care') registers as noise.",
    dependsOn: "Item 5 · team names for the team section (bio section unblocked today)",
    outOfScope: "Individual pages per team member.",
  },
  {
    id: 11,
    title: "Build /services — minimum version",
    priority: "P0",
    effort: "M",
    status: "not-started",
    wave: 3,
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
    acceptance: ["Nav link no longer 404s", "No unverified service claims", "No invented pricing"],
    evidence: "Internal — build spec Section 2. Service-page depth is deferred to item 18.",
    dependsOn: "Item 5 · confirmed service list",
    outOfScope: "Per-service pages and per-service FAQ schema. That's item 18.",
  },
  {
    id: 12,
    title: "Add /privacy and /accessibility",
    priority: "P0",
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
    acceptance: ["Both routes live and linked in the footer", "Privacy text is practice-approved, not drafted by us"],
    evidence:
      "Internal build-blocking checklist item + standards tier. Note: HHS Section 504 WCAG 2.1 AA rulemaking applies to federally-funded health orgs — applicability to a private practice needs legal confirmation, so this is framed as good practice, not asserted obligation.",
    dependsOn: "Practice-supplied privacy policy",
    outOfScope: "Writing legal text ourselves.",
  },
  {
    id: 13,
    title: "Replace the three placeholder testimonials with real reviews",
    priority: "P0",
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
  },
  {
    id: 14,
    title: "WCAG 2.2 AA and mobile QA pass — the patient-ready line",
    priority: "P0",
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
    ],
    evidence: "Standards tier (WCAG 2.2 AA) + locked internal checklist. Serves older adults and LEP readers directly.",
    dependsOn: "Items 1–13 (audit the finished surface, not a moving one)",
    outOfScope: "An accessibility overlay widget. Overlays don't fix underlying markup.",
  },

  // ─────────────────────────── WAVE 4 ───────────────────────────
  {
    id: 15,
    title: "Online booking via the Tab32 service layer",
    priority: "P1",
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
    ],
    evidence:
      "Internal goal (build spec Section 1). Vendor sources put booking preference at 68–77% against 26–40% practice availability, with roughly a third of online bookings placed outside office hours — directional, but it corroborates the leak the practice already identified independently.",
    dependsOn: "Tab32 service-layer decisions — open since the original build spec",
    outOfScope: "A patient portal, account creation, or online payment.",
  },
  {
    id: 16,
    title: "Dental anxiety and comfort content",
    priority: "P1",
    effort: "S",
    status: "not-started",
    wave: 4,
    job: "Return to care after avoiding it",
    story: "As someone who hasn't been to a dentist in years, I see that you won't make me feel bad about it.",
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
    ],
    evidence:
      "Peer-reviewed tier — the strongest evidence in the report. Multiple independent studies on prevalence, avoidance and the anxiety/emergency overlap.",
    dependsOn: "Confirmed comfort and sedation options",
    outOfScope: "Claiming sedation dentistry unless the practice actually offers it.",
  },
  {
    id: 17,
    title: "Concern-led service entry",
    priority: "P1",
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
    ],
    evidence:
      "Vendor/marketing tier — labeled an emerging theme, not a repeated one. Deliberately the cheapest possible implementation given that evidence strength.",
    dependsOn: "Item 11",
    outOfScope: "A symptom checker, quiz or triage wizard. Explicitly ruled out — clinical risk, and no evidence patients want one from a single practice's site.",
  },
  {
    id: 18,
    title: "Per-service pages with FAQ pairs and schema",
    priority: "P1",
    effort: "L",
    status: "not-started",
    wave: 4,
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
  },
  {
    id: 19,
    title: "Family and life-stage clarity",
    priority: "P1",
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
  },
  {
    id: 20,
    title: "Cost and financing explainer",
    priority: "P1",
    effort: "M",
    status: "blocked",
    wave: 4,
    job: "Estimate what I'll actually pay",
    story: "As a cost-sensitive patient, I understand how cost is determined and when I'll know my number.",
    problem:
      "Cost uncertainty causes patients to delay care. Prices can't be published without verification — but the process and the timing can be, and saying when someone will know is nearly as valuable as the number.",
    where: "/insurance-new-patients",
    scope: [
      "Explain the process: exam → written plan → estimate → treatment",
      "Verified financing terms only",
      "A path for patients without insurance",
      "Ranges only if the practice will stand behind them",
    ],
    acceptance: ["No unverified price appears", "A patient knows exactly when they'll get a number"],
    evidence:
      "Vendor tier on cost-driven delay (directional) + patient-generated billing-surprise themes (repeated theme, stronger).",
    dependsOn: "Item 6 · verified financing terms",
    outOfScope: "A cost calculator. Can't be accurate; inaccuracy is worse than silence.",
  },
  {
    id: 21,
    title: "Reviews fed by real Google Business Profile data",
    priority: "P1",
    effort: "M",
    status: "not-started",
    wave: 4,
    job: "Judge reputation quickly",
    story: "As a patient, I see current reviews without leaving the site.",
    problem:
      "Rating and count are hardcoded and unconfirmed, so they drift from reality the moment a review lands.",
    where: "src/components/TestimonialsSection.tsx",
    scope: ["Google Reviews widget or an API-fed module", "Keep the HIPAA-compliant attribution format", "Handle the empty and failed states"],
    acceptance: ["Displayed rating always matches the live GBP", "Failure degrades gracefully to static verified content"],
    evidence: "Reviews are consistently among the most-checked pre-booking signals; recency is weighted.",
    dependsOn: "Item 13",
    outOfScope: "A review-solicitation system. That's an operational process, not a website feature.",
  },
  {
    id: 22,
    title: "Aftercare and records requests",
    priority: "P1",
    effort: "M",
    status: "not-started",
    wave: 4,
    job: "Manage care after a visit",
    story: "As an existing patient, I get aftercare guidance and request records without phoning.",
    problem: "Every post-visit need currently becomes a phone call — into the same channel that's already leaking.",
    where: "New route or an existing-patients section",
    scope: ["Aftercare instructions per common procedure", "When to call after treatment", "Records-request path", "Insurance/contact update path"],
    acceptance: ["An existing patient completes each task without phoning", "Aftercare content is clinically reviewed by Dr. Dubey"],
    evidence: "Repeated theme in the ongoing-care job family; reduces load on the leakiest channel.",
    dependsOn: "Clinical review of all aftercare content",
    outOfScope: "A patient portal or any login.",
  },

  // ─────────────────────────── WAVE 5 ───────────────────────────
  {
    id: 23,
    title: "Language support signal and key-page translation",
    priority: "P2",
    effort: "M",
    status: "blocked",
    wave: 5,
    job: "Be understood",
    story: "As a patient whose first language isn't English, I know whether someone here can speak with me.",
    problem:
      "King County has substantial LEP populations — Spanish, Chinese, Vietnamese, Somali, Amharic, Russian, Ukrainian among the most common. The site says nothing about languages.",
    where: "Sitewide + /about",
    scope: ["State languages actually spoken by the team", "Translate the highest-value pages if a real need is confirmed", "Plain language throughout helps every reader"],
    acceptance: ["No language capability is claimed without confirmation"],
    evidence: "Local tier — Seattle OIRA and King County language-access programs.",
    dependsOn: "Confirmed team language capabilities",
    outOfScope: "Machine translation of the whole site. Wrong medical translation is worse than English.",
  },
  {
    id: 24,
    title: "Pre-visit digital forms",
    priority: "P2",
    effort: "L",
    status: "not-started",
    wave: 5,
    job: "Arrive prepared",
    story: "As a new patient, I complete paperwork before arriving instead of on a clipboard.",
    problem: "New-patient paperwork on arrival adds friction for the time-scarce segment.",
    where: "New route or Tab32 integration",
    scope: ["Accessible digital intake forms", "Secure handling of health information", "Likely belongs to Tab32 rather than this site"],
    acceptance: ["Forms are accessible and secure", "PHI handling is reviewed before launch"],
    evidence: "Vendor tier — directional only. Deferred because it involves PHI and needs operational maturity.",
    dependsOn: "Item 15",
    outOfScope: "Building PHI handling ourselves if Tab32 already provides it.",
  },
  {
    id: 25,
    title: "Neighborhood and local content",
    priority: "P2",
    effort: "M",
    status: "blocked",
    wave: 5,
    job: "Find a dentist near me",
    story: "As someone searching by neighborhood, I find the practice.",
    problem: "serviceAreas lists Queen Anne (real) plus five proximity guesses. Padding an unverified list buys nothing and risks contradicting the GBP.",
    where: "src/lib/content.ts + optional local pages",
    scope: ["Confirm the real service area", "Genuine local content only where there's something true to say"],
    acceptance: ["No unverified neighborhood claim is published"],
    evidence: "Local search rewards genuine relevance and punishes inconsistency — vendor tier, directional.",
    dependsOn: "Item 2 · confirmed service areas",
    outOfScope: "Doorway pages for neighborhoods the practice doesn't genuinely serve.",
  },
  {
    id: 26,
    title: "Conversion instrumentation and analytics",
    priority: "P2",
    effort: "M",
    status: "not-started",
    wave: 5,
    job: "(Practice-facing — how we learn what's working)",
    story: "As the practice, I can see which paths produce booked patients.",
    problem:
      "Build spec Section 9 requires instrumentation from the start. Baseline tracking ships with item 15; this is the analysis layer on top.",
    where: "Sitewide",
    scope: ["Form submissions, booking completions and drop-off, click-to-call taps, page traffic", "Privacy-respecting analytics", "A view Akash can actually read"],
    acceptance: ["Every conversion path is measured", "Analytics choice is privacy-respecting and disclosed in the privacy policy"],
    evidence: "Internal — build spec Section 9, locked principle.",
    dependsOn: "Item 15 for booking events",
    outOfScope: "Third-party trackers that would complicate the privacy policy.",
  },
];

export const counts = {
  P0: backlog.filter((i) => i.priority === "P0").length,
  P1: backlog.filter((i) => i.priority === "P1").length,
  P2: backlog.filter((i) => i.priority === "P2").length,
  blocked: backlog.filter((i) => i.status === "blocked").length,
};
