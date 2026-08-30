"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Nav } from "./Nav";
import {
  backlog,
  counts,
  waves,
  waveNotes,
  scoreOf,
  viewportOf,
  WEIGHTS,
  MAX_SCORE,
  FACTOR_LABELS,
  FACTOR_HELP,
  BANDS,
  PATIENT_READY_AFTER_ITEM,
  type BacklogItem,
  type Priority,
  type Viewport,
} from "@/lib/backlog";
import { harnessById } from "@/lib/test-harness";

/**
 * Renders the backlog from src/lib/backlog.ts.
 *
 * Interaction stays deliberately minimal — a filter row, a sort toggle,
 * and per-item expand/collapse. Same over-engineering guardrail the
 * backlog itself argues for: this is a list someone reads and works
 * through, not an app. Expand/collapse reuses the grid-template-rows
 * technique already used by FAQSection/InsuranceExpandCard rather than
 * introducing a third pattern.
 *
 * Items render open by default so the page is fully readable and
 * Cmd-F-able without interaction — collapsing is a scanning affordance,
 * not a gate on the content.
 *
 * The score bar deliberately shows the per-factor breakdown rather than
 * just a total: a single number invites arguing with the conclusion, a
 * breakdown invites arguing with the input, which is the useful
 * conversation to have with Akash.
 */

const PRIORITY_STYLES: Record<Priority, string> = {
  P0: "bg-terracotta text-warm-ivory",
  P1: "bg-espresso text-warm-ivory",
  P2: "bg-sand text-espresso",
};

const STATUS_LABELS: Record<BacklogItem["status"], string> = {
  "not-started": "Not started",
  partial: "Partly done",
  blocked: "Blocked",
  done: "Done",
};

const STATUS_STYLES: Record<BacklogItem["status"], string> = {
  "not-started": "border-espresso/25 text-espresso/60",
  partial: "border-terracotta/50 text-terracotta",
  blocked: "border-terracotta bg-terracotta/10 text-terracotta font-semibold",
  done: "border-espresso/20 text-espresso/40 line-through",
};

const EFFORT_LABELS: Record<BacklogItem["effort"], string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
};

const TOOL_STYLES: Record<string, string> = {
  browser: "bg-espresso/10 text-espresso/70",
  shell: "bg-espresso/10 text-espresso/70",
  validator: "bg-terracotta/15 text-terracotta",
  manual: "bg-sand text-espresso/70",
};

/** Mobile is the default and is styled to stand out; desktop is the follow-up. */
const VIEWPORT_STYLES: Record<Viewport, string> = {
  "375": "bg-terracotta/15 text-terracotta",
  "768": "bg-espresso/10 text-espresso/60",
  "1280": "bg-espresso/10 text-espresso/50",
  any: "bg-espresso/[0.06] text-espresso/40",
};

const VIEWPORT_LABELS: Record<Viewport, string> = {
  "375": "375px",
  "768": "768px",
  "1280": "1280px",
  any: "any width",
};

type Filter = "all" | Priority | "blocked" | "moved" | "conflict" | "blueprint";
type Sort = "wave" | "score";

// Mobile-first coverage, computed from the data so the headline numbers
// can't drift from what the items actually say. Mirrors the same counts
// scripts/check-backlog.ts enforces.
const allRenderingSteps = backlog
  .flatMap((i) => i.test.steps)
  .filter((s) => s.tool === "browser" || s.tool === "manual");
const mobileStepCount = allRenderingSteps.filter((s) => viewportOf(s) === "375").length;
const desktopStepCount = allRenderingSteps.filter((s) => viewportOf(s) === "1280").length;
const mobileGateCount = backlog.reduce((n, i) => n + i.test.mobileFirst.length, 0);
const mobileRefCount = backlog.reduce((n, i) => n + i.references.length, 0);
const conflictCount = backlog.filter((i) => i.conflict).length;
const blueprintCount = backlog.filter((i) => i.source !== "original").length;

export function BacklogView() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("wave");
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

  const visible = useMemo(
    () =>
      backlog.filter((item) => {
        if (filter === "all") return true;
        if (filter === "blocked") return item.status === "blocked";
        if (filter === "moved") return item.priority !== item.originalPriority;
        if (filter === "conflict") return Boolean(item.conflict);
        if (filter === "blueprint") return item.source !== "original";
        return item.priority === filter;
      }),
    [filter],
  );

  const groupedByWave = useMemo(() => {
    const groups = new Map<number, BacklogItem[]>();
    for (const item of visible) {
      const existing = groups.get(item.wave);
      if (existing) existing.push(item);
      else groups.set(item.wave, [item]);
    }
    return [...groups.entries()].sort((a, b) => a[0] - b[0]);
  }, [visible]);

  const byScore = useMemo(
    () => [...visible].sort((a, b) => scoreOf(b.scores) - scoreOf(a.scores)),
    [visible],
  );

  function toggle(id: number) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: backlog.length },
    { key: "P0", label: "P0 — Foundation", count: counts.P0 },
    { key: "P1", label: "P1 — Conversion", count: counts.P1 },
    { key: "P2", label: "P2 — Later", count: counts.P2 },
    { key: "blocked", label: "Blocked on Akash", count: counts.blocked },
    { key: "moved", label: "Re-prioritised", count: counts.moved },
    { key: "blueprint", label: "From blueprint", count: blueprintCount },
    { key: "conflict", label: "Needs your call", count: conflictCount },
  ];

  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <header className="border-b border-sand bg-sand/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/"
                className="tap-target inline-flex items-center gap-1.5 text-sm font-medium text-espresso/70 hover:text-terracotta transition-colors -ml-2 px-2"
              >
                <BackArrowIcon />
                Back to site
              </Link>
              <span className="text-espresso/20" aria-hidden="true">
                /
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                Internal
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-espresso leading-tight mb-3">
              Build Backlog
            </h1>
            <p className="text-espresso/75 max-w-2xl !mb-4">
              Every item scored against this project&apos;s actual goals and patient base, then
              re-prioritised from that score — with what good looks like elsewhere, and a
              mobile-first test scenario an agent can run to prove it&apos;s done.
            </p>
            <p className="text-espresso/75 max-w-2xl !mb-4">
              Now merged with the Downtown Seattle family-dental blueprint:{" "}
              <span className="font-medium text-espresso">{blueprintCount} new or enriched items</span>,
              a {Object.keys(harnessById).length}-check global test harness, and{" "}
              <span className="font-medium text-terracotta">
                {conflictCount} conflicts with locked decisions
              </span>{" "}
              surfaced rather than silently applied.
            </p>
            <p className="text-sm text-espresso/60 max-w-2xl !mb-6">
              Reasoning and sources:{" "}
              <span className="font-medium text-espresso">
                docs/supertooth-patient-needs-research.md
              </span>
              . Data: <span className="font-medium text-espresso">src/lib/backlog.ts</span>. Verify
              with{" "}
              <span className="font-mono text-[0.9em] text-espresso">
                npx tsx scripts/check-backlog.ts
              </span>
              .
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="P0 — patient-ready" value={counts.P0} accent />
              <Stat label="P1 — conversion" value={counts.P1} />
              <Stat label="P2 — later" value={counts.P2} />
              <Stat label="Blocked on Akash" value={counts.blocked} accent />
            </dl>
          </div>
        </header>

        {/* How scoring works */}
        <section className="border-b border-sand">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
            <h2 className="font-display text-lg font-semibold text-espresso !mb-1">
              How these are scored
            </h2>
            <p className="text-sm text-espresso/70 !mb-4 max-w-2xl">
              Five factors, each 1–5, weighted and summed out of {MAX_SCORE}. Weights encode this
              project&apos;s situation, not a generic template. Band thresholds: P0 ≥ {BANDS.p0}, P1
              ≥ {BANDS.p1}.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {(Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]).map((f) => (
                <li key={f} className="text-sm">
                  <span className="font-medium text-espresso">{FACTOR_LABELS[f]}</span>{" "}
                  <span className="text-terracotta font-semibold tabular-nums">×{WEIGHTS[f]}</span>
                  <span className="block text-espresso/60 mt-0.5">{FACTOR_HELP[f]}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-espresso/70 !mb-0 mt-5 max-w-2xl">
              Score drives the band, with one exception:{" "}
              <PinBadge pin="legal" /> and <PinBadge pin="dependency" /> items are pinned to P0
              regardless. {counts.moved} items moved as a result; {counts.pinned} carry a pin.
            </p>
          </div>
        </section>

        {/* Mobile-first convention */}
        <section className="border-b border-sand bg-terracotta/[0.05]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
            <h2 className="font-display text-lg font-semibold text-espresso !mb-1">
              Every test is mobile-first
            </h2>
            <p className="text-sm text-espresso/75 !mb-3 max-w-2xl">
              Steps run at <strong>375×812 by default</strong> — a step with no width tag is a mobile
              step. Desktop is a confirmation pass that only runs after mobile passes, never the
              primary one. Each item carries a <strong>mobile gate</strong>: if those criteria fail
              at 375px, the item fails, and a desktop pass cannot rescue it.
            </p>
            <p className="text-sm text-espresso/70 !mb-3 max-w-2xl">
              Every one of the {mobileRefCount} references also carries an{" "}
              <span className="text-terracotta font-medium">On mobile</span> note — what the example
              does on a small screen, or where it falls down. Several are excellent on desktop and
              genuinely poor on a phone, and those are called out rather than quietly copied.
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="Steps at 375px" value={mobileStepCount} accent />
              <Stat label="Steps at 1280px" value={desktopStepCount} />
              <Stat label="Mobile gate criteria" value={mobileGateCount} accent />
              <Stat label="Items with a gate" value={backlog.length} />
            </dl>
          </div>
        </section>

        {/* The one finding that should stop the reader */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8">
          <div className="rounded-2xl border border-terracotta/40 bg-terracotta/[0.07] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta !mb-2">
              Fix first — highest score in the backlog (47.5/{MAX_SCORE})
            </p>
            <p className="text-espresso !mb-0 leading-relaxed">
              <strong>Three of four primary nav links 404 right now.</strong>{" "}
              <span className="font-mono text-[0.9em]">/services</span>,{" "}
              <span className="font-mono text-[0.9em]">/about</span> and{" "}
              <span className="font-mono text-[0.9em]">/insurance-new-patients</span> are all in the
              nav; none of those routes exist. Item&nbsp;1 — Small, needs nothing from the practice.
            </p>
          </div>
        </div>

        {/* Conflicts — the things only Akash can resolve */}
        {conflictCount > 0 && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-6">
            <div className="rounded-2xl border-2 border-terracotta bg-terracotta/[0.08] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta !mb-2">
                {conflictCount} decisions only you can make
              </p>
              <p className="text-espresso !mb-3 leading-relaxed">
                The blueprint contradicts a locked decision in {conflictCount} places. Nothing has
                been changed — each is logged with what&apos;s locked, what the blueprint argues, and
                the question you actually have to answer.
              </p>
              <ul className="flex flex-col gap-1.5">
                {backlog
                  .filter((i) => i.conflict)
                  .map((i) => (
                    <li key={i.id} className="text-sm text-espresso/85 leading-relaxed">
                      <span className="font-semibold">#{i.id}</span>{" "}
                      {i.title.replace(/^CONFLICT — /, "")}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter backlog items"
          >
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  className={`tap-target inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-espresso text-warm-ivory"
                      : "border border-espresso/20 text-espresso hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  {f.label}
                  <span className={active ? "text-warm-ivory/60" : "text-espresso/45"}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-espresso/55">Order:</span>
            {(["wave", "score"] as Sort[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                aria-pressed={sort === s}
                className={`tap-target inline-flex items-center rounded-full px-3 py-1.5 font-medium transition-colors ${
                  sort === s
                    ? "text-terracotta underline underline-offset-4"
                    : "text-espresso/50 hover:text-terracotta"
                }`}
              >
                {s === "wave" ? "Build sequence" : "Score, highest first"}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12">
          {visible.length === 0 && <p className="text-espresso/60">No items match this filter.</p>}

          {sort === "score" ? (
            <ol className="flex flex-col gap-4">
              {byScore.map((item) => (
                <li key={item.id}>
                  <ItemCard
                    item={item}
                    open={!collapsed.has(item.id)}
                    onToggle={() => toggle(item.id)}
                  />
                </li>
              ))}
            </ol>
          ) : (
            groupedByWave.map(([wave, items]) => (
              <section key={wave} className="mb-12 last:mb-0">
                <div className="mb-5">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso !mb-1">
                    {waves[wave]}
                  </h2>
                  <p className="text-sm text-espresso/60 !mb-0">{waveNotes[wave]}</p>
                </div>

                <ol className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.id}>
                      <ItemCard
                        item={item}
                        open={!collapsed.has(item.id)}
                        onToggle={() => toggle(item.id)}
                      />
                      {item.id === PATIENT_READY_AFTER_ITEM && filter === "all" && (
                        <div className="flex items-center gap-3 mt-6 mb-2">
                          <span className="h-px flex-1 bg-terracotta/40" />
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta whitespace-nowrap">
                            Patient-ready line
                          </span>
                          <span className="h-px flex-1 bg-terracotta/40" />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            ))
          )}
        </div>

        {/* Deferred, on purpose */}
        <div className="border-t border-sand bg-sand/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
            <h2 className="font-display text-xl font-semibold text-espresso !mb-2">
              Deliberately not building
            </h2>
            <p className="text-sm text-espresso/70 !mb-4 max-w-2xl">
              Deferred because they add complexity without enough patient value — recorded so the
              decision doesn&apos;t get re-litigated later.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-espresso/80">
              {[
                [
                  "Symptom checker",
                  "Clinical risk, and no evidence patients want one from a single practice's site.",
                ],
                [
                  "Cost calculator",
                  "Can't be accurate without plan data. Inaccuracy is worse than silence.",
                ],
                ["Patient portal", "Operational maturity Tab32 should own, not this site."],
                ["Chatbot", "Adds a channel before the existing ones work."],
                [
                  "Personalization",
                  "Locked principle: not before basic content and navigation work.",
                ],
                ["Live “open now” status", "A static hours list is the accepted lower-cost v1."],
              ].map(([name, why]) => (
                <li key={name}>
                  <span className="font-medium text-espresso">{name}</span> — {why}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl bg-warm-ivory border border-espresso/10 px-4 py-3">
      <dt className="text-xs text-espresso/60 leading-snug">{label}</dt>
      <dd
        className={`font-display text-2xl font-semibold ${accent ? "text-terracotta" : "text-espresso"}`}
      >
        {value}
      </dd>
    </div>
  );
}

function PinBadge({ pin }: { pin: "legal" | "dependency" }) {
  return (
    <span className="inline-flex items-center rounded-full border border-terracotta/50 bg-terracotta/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-terracotta">
      {pin === "legal" ? "Legal / safety pin" : "Dependency pin"}
    </span>
  );
}

function ScoreBar({ item }: { item: BacklogItem }) {
  const total = scoreOf(item.scores);
  const pct = (total / MAX_SCORE) * 100;

  return (
    <div className="mt-4 rounded-xl border border-espresso/10 bg-sand/30 p-4">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso/45 !mb-0">
          Score
        </p>
        <p className="!mb-0">
          <span className="font-display text-xl font-semibold text-terracotta tabular-nums">
            {total.toFixed(1)}
          </span>
          <span className="text-sm text-espresso/45 tabular-nums"> / {MAX_SCORE}</span>
        </p>
      </div>

      <div className="h-1.5 w-full rounded-full bg-espresso/10 overflow-hidden mb-4">
        <div className="h-full rounded-full bg-terracotta" style={{ width: `${pct}%` }} />
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {(Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]).map((f) => (
          <div key={f} className="rounded-lg bg-warm-ivory border border-espresso/10 px-2.5 py-2">
            <dt className="text-[0.6875rem] leading-tight text-espresso/55">{FACTOR_LABELS[f]}</dt>
            <dd className="mt-0.5 flex items-baseline gap-1">
              <span className="font-semibold text-espresso tabular-nums">{item.scores[f]}</span>
              <span className="text-[0.6875rem] text-espresso/40 tabular-nums">
                ×{WEIGHTS[f]}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ItemCard({
  item,
  open,
  onToggle,
}: {
  item: BacklogItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `backlog-item-${item.id}`;
  const moved = item.priority !== item.originalPriority;
  const total = scoreOf(item.scores);

  return (
    <article className="rounded-2xl border border-espresso/12 bg-warm-ivory overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full text-left px-5 sm:px-6 py-4 flex items-start gap-4 hover:bg-sand/30 transition-colors"
        >
          <span className="font-display text-lg font-semibold text-espresso/30 tabular-nums shrink-0 pt-0.5">
            {String(item.id).padStart(2, "0")}
          </span>

          <span className="flex-1 min-w-0">
            <span className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_STYLES[item.priority]}`}
              >
                {item.priority}
              </span>
              {moved && (
                <span className="inline-flex items-center gap-1 rounded-full border border-terracotta/50 bg-terracotta/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-terracotta">
                  {item.originalPriority} → {item.priority}
                </span>
              )}
              {item.pin && <PinBadge pin={item.pin} />}
              {item.conflict && (
                <span className="inline-flex items-center rounded-full bg-terracotta text-warm-ivory px-2 py-0.5 text-[0.6875rem] font-semibold">
                  Needs your call
                </span>
              )}
              {item.source !== "original" && (
                <span className="inline-flex items-center rounded-full border border-espresso/25 px-2 py-0.5 text-[0.6875rem] text-espresso/55">
                  {item.source === "blueprint" ? "New — blueprint" : "Enriched"}
                </span>
              )}
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${STATUS_STYLES[item.status]}`}
              >
                {STATUS_LABELS[item.status]}
              </span>
              <span className="text-xs text-espresso/50">{EFFORT_LABELS[item.effort]}</span>
              <span className="ml-auto font-display text-sm font-semibold text-terracotta tabular-nums">
                {total.toFixed(1)}
              </span>
            </span>
            <span className="block font-display text-base sm:text-lg font-semibold text-espresso leading-snug">
              {item.title}
            </span>
            <span className="block text-sm text-espresso/60 mt-1">{item.job}</span>
          </span>

          <span
            className={`shrink-0 text-espresso/40 transition-transform duration-200 pt-1 ${open ? "rotate-45" : ""}`}
            aria-hidden="true"
          >
            <PlusIcon />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-espresso/10 mt-1">
            {item.conflict && (
              <div className="mt-4 rounded-xl border-2 border-terracotta bg-terracotta/[0.08] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta !mb-2">
                  Conflicts with a locked decision — do not build until you rule
                </p>
                <p className="text-sm leading-relaxed text-espresso/85 !mb-2">
                  <span className="font-semibold text-espresso">Locked:</span> {item.conflict.locked}
                </p>
                <p className="text-sm leading-relaxed text-espresso/85 !mb-3">
                  <span className="font-semibold text-espresso">Blueprint says:</span>{" "}
                  {item.conflict.blueprint}
                </p>
                <p className="text-sm leading-relaxed text-espresso !mb-0">
                  <span className="font-semibold text-terracotta">Your call:</span>{" "}
                  {item.conflict.question}
                </p>
              </div>
            )}

            {item.repriorityNote && (
              <div className="mt-4 rounded-xl border border-terracotta/30 bg-terracotta/[0.06] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta !mb-1">
                  {moved ? "Why it moved" : "Why it's pinned"}
                </p>
                <p className="text-sm leading-relaxed text-espresso/85 !mb-0">
                  {item.repriorityNote}
                </p>
              </div>
            )}

            <ScoreBar item={item} />

            <Field label="User story">{item.story}</Field>
            <Field label="Problem">{item.problem}</Field>
            <Field label="Where">
              <span className="font-mono text-[0.92em]">{item.where}</span>
            </Field>

            <FieldList label="Scope" items={item.scope} />
            <FieldList label="Acceptance criteria" items={item.acceptance} check />

            {/* What good looks like */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso/45 !mb-2">
                What good looks like
              </p>
              <ul className="flex flex-col gap-3">
                {item.references.map((r) => (
                  <li
                    key={r.url}
                    className="rounded-xl border border-espresso/10 bg-sand/25 px-4 py-3"
                  >
                    {/* min-h + vertical padding rather than a bare inline link:
                        WCAG 2.5.8 would exempt these as inline text, but the
                        repo's locked rule is a flat 44px for every interactive
                        element, and this page has 60 of them. Cheaper to
                        comply than to argue the exemption. */}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target inline-flex items-center gap-1.5 py-2 font-medium text-terracotta hover:underline text-sm"
                    >
                      {r.name}
                      <ExternalIcon />
                    </a>
                    <p className="text-sm leading-relaxed text-espresso/80 mt-0.5 !mb-2">
                      {r.whatGood}
                    </p>
                    <p className="text-sm leading-relaxed text-espresso/65 !mb-2">
                      <span className="font-medium text-espresso/80">Take / avoid:</span>{" "}
                      {r.takeaway}
                    </p>
                    <p className="text-sm leading-relaxed text-terracotta/90 !mb-0">
                      <span className="font-medium">On mobile:</span> {r.mobile}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Test scenario */}
            <div className="mt-5 rounded-xl border border-espresso/12 bg-espresso/[0.03] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso/45 !mb-2">
                Test scenario
              </p>

              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-espresso/40 !mb-1">
                Preconditions
              </p>
              <ul className="flex flex-col gap-1 mb-4">
                {item.test.preconditions.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-espresso/75 leading-relaxed">
                    <span className="text-espresso/30 shrink-0" aria-hidden="true">
                      ·
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* The mobile gate comes before the steps on purpose: if these
                  don't hold at 375px, the item fails regardless of desktop. */}
              <div className="rounded-lg border border-terracotta/30 bg-terracotta/[0.06] px-3 py-3 mb-4">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-terracotta !mb-1.5">
                  Mobile gate — must hold at 375×812 before desktop counts
                </p>
                <ul className="flex flex-col gap-1.5">
                  {item.test.mobileFirst.map((m) => (
                    <li key={m} className="flex gap-2.5 text-sm text-espresso/85 leading-relaxed">
                      <span className="text-terracotta shrink-0 mt-0.5" aria-hidden="true">
                        <CheckIcon />
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-espresso/40 !mb-2">
                Steps
              </p>
              <ol className="flex flex-col gap-3 mb-4">
                {item.test.steps.map((s, i) => (
                  <li key={s.action} className="flex gap-3">
                    <span className="shrink-0 font-display text-sm font-semibold text-espresso/30 tabular-nums pt-0.5">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center rounded px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide ${TOOL_STYLES[s.tool]}`}
                        >
                          {s.tool}
                        </span>
                        <span
                          className={`inline-flex items-center rounded px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide ${VIEWPORT_STYLES[viewportOf(s)]}`}
                        >
                          {VIEWPORT_LABELS[viewportOf(s)]}
                        </span>
                      </span>
                      <span className="block text-sm text-espresso/85 leading-relaxed">
                        {s.action}
                      </span>
                      <span className="block text-sm text-espresso/60 leading-relaxed mt-1">
                        <span className="font-medium text-espresso/75">Expect:</span> {s.expect}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-espresso/40 !mb-1.5">
                Passes when
              </p>
              <ul className="flex flex-col gap-1.5">
                {item.test.pass.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-espresso/80 leading-relaxed">
                    <span className="text-terracotta shrink-0 mt-0.5" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {item.test.gotchas && item.test.gotchas.length > 0 && (
                <>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-terracotta !mb-1.5 mt-4">
                    Gotchas
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {item.test.gotchas.map((g) => (
                      <li
                        key={g}
                        className="flex gap-2.5 text-sm text-espresso/75 leading-relaxed"
                      >
                        <span className="text-terracotta shrink-0" aria-hidden="true">
                          !
                        </span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso/45 !mb-1.5">
                Harness checks ({item.harness.length})
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {item.harness.map((h) => (
                  <li
                    key={h}
                    title={harnessById[h]?.title ?? h}
                    className="inline-flex items-center rounded bg-espresso/[0.07] px-1.5 py-0.5 text-[0.625rem] font-semibold text-espresso/60"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {item.blueprintRef && (
              <Field label="Blueprint source">
                <span className="font-mono text-[0.92em]">{item.blueprintRef}</span>
              </Field>
            )}

            <Field label="Evidence">{item.evidence}</Field>
            <Field label="Out of scope">{item.outOfScope}</Field>
            {item.dependsOn && (
              <Field label="Depends on" accent>
                {item.dependsOn}
              </Field>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Field({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="mt-4 first:mt-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso/45 !mb-1">
        {label}
      </p>
      <p
        className={`text-sm leading-relaxed !mb-0 ${accent ? "text-terracotta" : "text-espresso/80"}`}
      >
        {children}
      </p>
    </div>
  );
}

function FieldList({
  label,
  items,
  check = false,
}: {
  label: string;
  items: string[];
  check?: boolean;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso/45 !mb-1.5">
        {label}
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((entry) => (
          <li key={entry} className="flex gap-2.5 text-sm leading-relaxed text-espresso/80">
            <span className="text-terracotta shrink-0 mt-0.5" aria-hidden="true">
              {check ? <CheckIcon /> : "·"}
            </span>
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
