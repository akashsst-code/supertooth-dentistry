"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Nav } from "./Nav";
import {
  backlog,
  counts,
  waves,
  waveNotes,
  PATIENT_READY_AFTER_ITEM,
  type BacklogItem,
  type Priority,
} from "@/lib/backlog";

/**
 * Renders the backlog from src/lib/backlog.ts.
 *
 * Interaction is deliberately minimal — a priority filter and per-item
 * expand/collapse, nothing else. Same over-engineering guardrail the
 * backlog itself argues for: this is a list someone reads and works
 * through, not an app. The expand/collapse reuses the same
 * grid-template-rows technique as FAQSection/InsuranceExpandCard rather
 * than introducing a third pattern.
 *
 * Items render open by default so the page is fully readable (and
 * Cmd-F-able) without any interaction — collapsing is an affordance for
 * scanning, not a gate on the content.
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

type Filter = "all" | Priority | "blocked";

export function BacklogView() {
  const [filter, setFilter] = useState<Filter>("all");
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

  const visible = useMemo(
    () =>
      backlog.filter((item) => {
        if (filter === "all") return true;
        if (filter === "blocked") return item.status === "blocked";
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
              Prioritized from first-principles research into what patients need from a family dental
              practice serving the Downtown&nbsp;Seattle catchment — reconciled against what this site
              has actually shipped.
            </p>
            <p className="text-sm text-espresso/60 max-w-2xl !mb-6">
              Full reasoning, evidence tiers and sources:{" "}
              <span className="font-medium text-espresso">
                docs/supertooth-patient-needs-research.md
              </span>
              . This page is a view of{" "}
              <span className="font-medium text-espresso">src/lib/backlog.ts</span>, not a separate
              source of truth.
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="P0 — patient-ready" value={counts.P0} accent />
              <Stat label="P1 — conversion" value={counts.P1} />
              <Stat label="P2 — later" value={counts.P2} />
              <Stat label="Blocked on Akash" value={counts.blocked} accent />
            </dl>
          </div>
        </header>

        {/* The one finding that should stop the reader */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8">
          <div className="rounded-2xl border border-terracotta/40 bg-terracotta/[0.07] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta !mb-2">
              Fix first
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

        {/* Filters */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter backlog items by priority"
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
                  <span className={active ? "text-warm-ivory/60" : "text-espresso/45"}>{f.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items, grouped by wave */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12">
          {groupedByWave.length === 0 && (
            <p className="text-espresso/60">No items match this filter.</p>
          )}

          {groupedByWave.map(([wave, items]) => (
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
          ))}
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
                ["Symptom checker", "Clinical risk, and no evidence patients want one from a single practice's site."],
                ["Cost calculator", "Can't be accurate without plan data. Inaccuracy is worse than silence."],
                ["Patient portal", "Operational maturity Tab32 should own, not this site."],
                ["Chatbot", "Adds a channel before the existing ones work."],
                ["Personalization", "Locked principle: not before basic content and navigation work."],
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
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${STATUS_STYLES[item.status]}`}
              >
                {STATUS_LABELS[item.status]}
              </span>
              <span className="text-xs text-espresso/50">{EFFORT_LABELS[item.effort]}</span>
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
            <Field label="User story">{item.story}</Field>
            <Field label="Problem">{item.problem}</Field>
            <Field label="Where">
              <span className="font-mono text-[0.92em]">{item.where}</span>
            </Field>

            <FieldList label="Scope" items={item.scope} />
            <FieldList label="Acceptance criteria" items={item.acceptance} check />

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
      <p className={`text-sm leading-relaxed !mb-0 ${accent ? "text-terracotta" : "text-espresso/80"}`}>
        {children}
      </p>
    </div>
  );
}

function FieldList({ label, items, check = false }: { label: string; items: string[]; check?: boolean }) {
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

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
