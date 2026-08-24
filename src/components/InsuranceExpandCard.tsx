"use client";

import { useState } from "react";
import { CheckIcon, ShieldCheckIcon } from "./icons";
import { Placeholder } from "./Placeholder";
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
 * Carrier names reuse `insuranceCarriers` (same source as
 * InsuranceBlock) and stay wrapped in <Placeholder> — that list is
 * still unconfirmed against the practice's real network status per
 * content.ts, so it can't be shown as verified fact here either.
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
          className="shrink-0 text-lg font-semibold leading-none text-terracotta mt-1.5 w-5 text-center"
          aria-hidden="true"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pl-[4.75rem] flex flex-col gap-2 border-t border-sand pt-4 -mt-px">
          <p className="text-xs font-semibold uppercase tracking-wide text-espresso/60 mb-1">
            We take most major insurances, including:
          </p>
          {insuranceCarriers.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 text-sm text-espresso/80">
              <CheckIcon className="shrink-0 text-terracotta" />
              <Placeholder>{c}</Placeholder>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
