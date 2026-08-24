"use client";

import { useState } from "react";
import { ShieldCheckIcon } from "./icons";
import { insuranceCarriers } from "@/lib/content";

/**
 * The "In-network with most plans" differentiator card in TrustBlock,
 * made expandable — Akash asked for a +/- accordion here (referencing
 * a competitor site's INSURANCE FAQ pattern) so the full carrier list
 * is one tap away instead of only living further down in
 * InsuranceBlock (which isn't currently mounted on any page). Split
 * into its own client component rather than making all of TrustBlock
 * client-side, since it's the only one of the three differentiator
 * cards that needs interactivity.
 *
 * First pass wrapped each name in <Placeholder> (dashed underline) —
 * Akash flagged that as visually unappealing and reading like broken
 * links. Swapped for the same typographic "wordmark badge" language
 * already established in InsuranceBlock.tsx (display-italic name +
 * soft accent circle, no underline) at a more compact scale, plus one
 * plain-text disclaimer line instead of per-name brackets. Compliance
 * intent is unchanged — insuranceCarriers is still unconfirmed against
 * the practice's real network status (see content.ts) — the
 * disclaimer line carries that instead of the dashed-underline
 * treatment, same tradeoff Akash already made for the Hero teaser.
 */
export function InsuranceExpandCard({ title, detail }: { title: string; detail: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-warm-ivory border border-sand overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="tap-target w-full flex items-start gap-4 p-5 text-left"
      >
        <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
          <ShieldCheckIcon />
        </span>
        <span className="flex-1">
          <h3 className="font-display text-lg font-semibold text-espresso mb-1">{title}</h3>
          <p className="text-sm text-espresso/70">{detail}</p>
        </span>
        <span
          className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/10 text-terracotta mt-0.5"
          aria-hidden="true"
        >
          <PlusMinusIcon open={open} />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 border-t border-sand">
            <p className="mt-4 mb-3 text-[11px] font-semibold uppercase tracking-wide text-espresso/50">
              Accepted plans include
            </p>
            <div className="grid grid-cols-2 gap-2">
              {insuranceCarriers.map((c) => (
                <div
                  key={c}
                  className="group relative overflow-hidden rounded-xl bg-sand/40 px-3 py-3"
                >
                  <span
                    className="absolute -right-3 -top-3 h-9 w-9 rounded-full bg-terracotta/10 transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="relative block font-display text-sm font-semibold italic text-espresso leading-tight">
                    {c}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-espresso/60">
              Don&apos;t see your plan? Call us and we&apos;ll verify.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Plus that morphs into a minus on open — vertical stroke rotates/fades away. */
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={`origin-center transition-all duration-300 ${open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}`}
      />
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
