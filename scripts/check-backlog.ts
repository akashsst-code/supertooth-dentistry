/**
 * Consistency guard for src/lib/backlog.ts.
 *
 * The backlog's `priority` field is hand-written but is supposed to be
 * *derived* from `scores` via `bandFor()`. Nothing enforces that at the
 * type level, so it silently rots the moment someone edits a score
 * without re-deriving the band — which would quietly turn an
 * evidence-based ordering back into an asserted one.
 *
 * This script re-computes every band and fails loudly on any drift. It
 * also checks the structural invariants each item is supposed to hold
 * (unique ids, in-range scores, references and test steps present, moved
 * items carrying a rationale).
 *
 * Run:  npx tsx scripts/check-backlog.ts
 *
 * Deliberately not wired to a devDependency — `npx tsx` fetches on demand,
 * and adding a toolchain for one guard script would be the kind of
 * over-engineering this backlog argues against.
 */

import {
  backlog,
  scoreOf,
  bandFor,
  counts,
  viewportOf,
  MAX_SCORE,
  WEIGHTS,
  type BacklogItem,
} from "../src/lib/backlog";
import { harnessById, harness as harnessChecks } from "../src/lib/test-harness";

const problems: string[] = [];
const seen = new Set<number>();

function check(cond: boolean, msg: string) {
  if (!cond) problems.push(msg);
}

for (const item of backlog) {
  const tag = `#${item.id} "${item.title.slice(0, 44)}"`;

  check(!seen.has(item.id), `${tag}: duplicate id`);
  seen.add(item.id);

  // The core invariant: declared priority must equal the derived band.
  const computed = bandFor(item);
  check(
    item.priority === computed,
    `${tag}: priority is ${item.priority} but scores/pin derive ${computed} (score ${scoreOf(item.scores).toFixed(1)})`,
  );

  // Scores must be 1–5 integers on every factor.
  for (const factor of Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]) {
    const v = item.scores[factor];
    check(
      Number.isInteger(v) && v >= 1 && v <= 5,
      `${tag}: scores.${factor} = ${v} (must be an integer 1–5)`,
    );
  }

  const score = scoreOf(item.scores);
  check(score > 0 && score <= MAX_SCORE, `${tag}: score ${score} outside 0–${MAX_SCORE}`);

  // Effort must agree with the cheapness score — they encode the same fact,
  // and a contradiction means one of them is a typo.
  const expectedEffortFromScore: Record<number, BacklogItem["effort"] | null> = {
    5: "S",
    3: "M",
    1: "L",
  };
  const expected = expectedEffortFromScore[item.scores.effort];
  if (expected) {
    check(
      item.effort === expected,
      `${tag}: effort "${item.effort}" contradicts scores.effort ${item.scores.effort} (expected "${expected}")`,
    );
  }

  // Anything that moved band, or that a pin overrode, must explain itself.
  const moved = item.priority !== item.originalPriority;
  check(
    !moved || Boolean(item.repriorityNote),
    `${tag}: moved ${item.originalPriority} → ${item.priority} without a repriorityNote`,
  );
  check(
    !item.pin || Boolean(item.repriorityNote),
    `${tag}: pinned "${item.pin}" without a repriorityNote explaining the override`,
  );

  // Content completeness.
  check(item.references.length >= 2, `${tag}: only ${item.references.length} reference(s), expected ≥2`);
  for (const r of item.references) {
    check(/^https?:\/\//.test(r.url), `${tag}: reference "${r.name}" has a non-http url`);
    check(r.whatGood.length > 40, `${tag}: reference "${r.name}" whatGood is too thin to be useful`);
    check(r.takeaway.length > 20, `${tag}: reference "${r.name}" takeaway is too thin to be useful`);
    // MOBILE-FIRST: every reference must have been considered on a small
    // screen. A reference we only ever looked at on a 1280px window is not
    // evidence for a mobile-first build.
    check(
      r.mobile != null && r.mobile.length > 40,
      `${tag}: reference "${r.name}" has no substantive mobile assessment`,
    );
  }

  check(item.test.steps.length >= 2, `${tag}: test has ${item.test.steps.length} step(s), expected ≥2`);
  check(item.test.pass.length >= 2, `${tag}: test has ${item.test.pass.length} pass criteria, expected ≥2`);
  check(item.test.preconditions.length >= 1, `${tag}: test has no preconditions`);
  for (const s of item.test.steps) {
    check(s.expect.length > 15, `${tag}: a test step has no meaningful expected result`);
  }

  // ── MOBILE-FIRST ENFORCEMENT ───────────────────────────────────────
  // The project is mobile-first, so the backlog has to be too. An audit
  // on 2026-08-30 found only 9 of 129 test steps mentioned mobile at all
  // and 13 of 26 items had zero mobile-aware steps — desktop-first work
  // with mobile bolted on. These checks make the regression impossible.

  check(
    Array.isArray(item.test.mobileFirst) && item.test.mobileFirst.length >= 1,
    `${tag}: test has no mobileFirst gate — every item needs mobile acceptance that must hold before desktop counts`,
  );

  // Only steps that actually render at a width count here. `any` marks
  // steps with no rendered surface (schema parsing, provenance sign-off,
  // documentation review) — they're viewport-independent by definition
  // and must not be read as desktop-first.
  const viewportSteps = item.test.steps.filter(
    (s) => (s.tool === "browser" || s.tool === "manual") && viewportOf(s) !== "any",
  );
  const mobileSteps = viewportSteps.filter((s) => viewportOf(s) === "375");
  const desktopSteps = viewportSteps.filter((s) => viewportOf(s) === "1280");

  // Every item with any rendered surface must exercise it at 375 first.
  check(
    viewportSteps.length === 0 || mobileSteps.length >= 1,
    `${tag}: has ${viewportSteps.length} viewport-bound step(s) but none at 375px`,
  );

  // Desktop must never outnumber mobile — that is the definition of
  // desktop-first, whatever the prose claims.
  check(
    desktopSteps.length <= mobileSteps.length,
    `${tag}: ${desktopSteps.length} desktop step(s) vs ${mobileSteps.length} mobile — desktop must not outnumber mobile`,
  );

  // Ordering: the first viewport-bound step must be a mobile one. A
  // desktop check that runs first is a desktop-first test no matter what
  // the later steps say.
  if (viewportSteps.length > 0) {
    check(
      viewportOf(viewportSteps[0]) === "375",
      `${tag}: first viewport-bound step is at ${viewportOf(viewportSteps[0])}px — mobile must come first`,
    );
  }

  check(item.acceptance.length >= 2, `${tag}: fewer than 2 acceptance criteria`);
  check(item.scope.length >= 1, `${tag}: empty scope`);

  // ── BLUEPRINT INTAKE INVARIANTS ────────────────────────────────────
  // Every item declares where it came from and which harness checks apply,
  // so provenance and coverage can't quietly drift.
  check(
    ["original", "blueprint", "merged"].includes(item.source),
    `${tag}: invalid source "${item.source}"`,
  );
  check(item.harness.length >= 1, `${tag}: no harness checks referenced`);
  for (const h of item.harness) {
    check(h in harnessById, `${tag}: references unknown harness check "${h}"`);
  }
  // Anything drawn from the blueprint must say which section, so a claim
  // can be traced back rather than taken on trust.
  check(
    item.source === "original" || Boolean(item.blueprintRef),
    `${tag}: source is "${item.source}" but no blueprintRef given`,
  );
  // A decision must record what was said and what changes as a result —
  // otherwise "it was decided" becomes unauditable.
  if (item.decision) {
    check(
      ["approved", "approved-with-constraint", "declined", "deferred"].includes(item.decision.ruling),
      `${tag}: invalid decision.ruling "${item.decision.ruling}"`,
    );
    check(item.decision.said.length > 10, `${tag}: decision.said is empty`);
    check(
      item.decision.consequence.length > 60,
      `${tag}: decision.consequence must say what actually changes, including what survives the ruling`,
    );
    check(
      !item.conflict,
      `${tag}: has both an open conflict and a decision — resolve the conflict field once ruled`,
    );
  }

  // A conflict must state all three parts, or it isn't a decision Akash
  // can actually make.
  if (item.conflict) {
    check(item.conflict.locked.length > 30, `${tag}: conflict.locked is too vague to act on`);
    check(item.conflict.blueprint.length > 30, `${tag}: conflict.blueprint is too vague to act on`);
    check(
      item.conflict.question.length > 40 && item.conflict.question.includes("?"),
      `${tag}: conflict.question must be an actual question Akash can answer`,
    );
    check(
      item.status === "blocked" || item.status === "not-started",
      `${tag}: has an unresolved conflict but status is "${item.status}" — it must not be in progress`,
    );
  }
}

// Report.
const width = 74;
console.log("=".repeat(width));
console.log("Backlog consistency check");
console.log("=".repeat(width));

const sorted = [...backlog].sort((a, b) => scoreOf(b.scores) - scoreOf(a.scores));
for (const i of sorted) {
  const moved = i.priority !== i.originalPriority ? `  ${i.originalPriority}→${i.priority}` : "";
  const pin = i.pin ? `  [${i.pin}]` : "";
  console.log(
    `  ${scoreOf(i.scores).toFixed(1).padStart(5)}  ${i.priority}  #${String(i.id).padStart(2)}  ${i.title.slice(0, 40).padEnd(40)}${pin}${moved}`,
  );
}

console.log("-".repeat(width));
console.log(
  `  ${backlog.length} items · P0 ${counts.P0} / P1 ${counts.P1} / P2 ${counts.P2} · ` +
    `${counts.moved} moved · ${counts.pinned} pinned · ${counts.blocked} blocked`,
);

// Mobile-first coverage, reported so it can't quietly slide.
const allSteps = backlog.flatMap((i) => i.test.steps);
const allRendering = allSteps.filter((s) => s.tool === "browser" || s.tool === "manual");
const mobile = allRendering.filter((s) => viewportOf(s) === "375").length;
const desktop = allRendering.filter((s) => viewportOf(s) === "1280").length;
const gates = backlog.reduce((n, i) => n + i.test.mobileFirst.length, 0);
console.log(
  `  mobile-first: ${mobile}/${allRendering.length} rendering steps at 375px · ` +
    `${desktop} at 1280px · ${gates} mobile gate criteria · ` +
    `${backlog.length}/${backlog.length} items with a mobile gate`,
);
const bySource = (s: string) => backlog.filter((i) => i.source === s).length;
console.log(
  `  provenance: ${bySource("original")} original · ${bySource("blueprint")} from blueprint · ` +
    `${bySource("merged")} enriched · ${harnessChecks.length} harness checks defined`,
);

const decided = backlog.filter((i) => i.decision);
if (decided.length) {
  console.log("-".repeat(width));
  console.log(`  ${decided.length} decision(s) recorded:`);
  for (const d of decided) {
    console.log(`    #${d.id}  ${d.decision!.ruling.padEnd(24)} ${d.title.slice(0, 42)}`);
  }
}

const conflicts = backlog.filter((i) => i.conflict);
if (conflicts.length) {
  console.log("-".repeat(width));
  console.log(`  ${conflicts.length} CONFLICT(S) awaiting Akash's decision — not to be built:`);
  for (const c of conflicts) {
    console.log(`    #${c.id}  ${c.title.replace(/^CONFLICT — /, "")}`);
  }
}
console.log("-".repeat(width));

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log("\n✓ All checks passed.\n");
