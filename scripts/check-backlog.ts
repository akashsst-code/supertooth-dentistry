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
  MAX_SCORE,
  WEIGHTS,
  type BacklogItem,
} from "../src/lib/backlog";

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
  }

  check(item.test.steps.length >= 2, `${tag}: test has ${item.test.steps.length} step(s), expected ≥2`);
  check(item.test.pass.length >= 2, `${tag}: test has ${item.test.pass.length} pass criteria, expected ≥2`);
  check(item.test.preconditions.length >= 1, `${tag}: test has no preconditions`);
  for (const s of item.test.steps) {
    check(s.expect.length > 15, `${tag}: a test step has no meaningful expected result`);
  }

  check(item.acceptance.length >= 2, `${tag}: fewer than 2 acceptance criteria`);
  check(item.scope.length >= 1, `${tag}: empty scope`);
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
console.log("-".repeat(width));

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log("\n✓ All checks passed.\n");
