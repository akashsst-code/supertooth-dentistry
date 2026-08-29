"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { CalendarIcon, PhoneIcon, ShieldCheckIcon } from "./icons";
import { contact, insuranceCarriers } from "@/lib/content";

/**
 * Generic tap-to-expand differentiator-card shell — icon+text row on
 * desktop, photo card (image + gradient + overlaid title/detail) on
 * mobile when `image` is passed. Extracted 2026-08-29 from what used to
 * be an insurance-only component (see `InsuranceExpandCard` below) once
 * "Same-day appointments" and "Same-day crowns" needed the exact same
 * tap-to-expand affordance: on mobile all 3 differentiator cards render
 * as identical-looking photo cards (TrustBlock's carousel), so leaving
 * two of them as plain non-interactive divs meant they looked tappable
 * but did nothing — a scroll-vs-tap mismatch Akash flagged. Sharing one
 * shell keeps all 3 cards' interaction and photo-card styling from
 * drifting apart.
 */
export function ExpandCard({
  title,
  detail,
  icon,
  image,
  className = "",
  children,
}: {
  title: string;
  detail: string;
  icon: ReactNode;
  image?: { src: string; alt: string };
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl bg-warm-ivory border border-sand overflow-hidden ${className}`}>
      {image ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="tap-target relative block w-full aspect-[4/3] text-left"
        >
          <Image src={image.src} alt={image.alt} fill sizes="82vw" className="object-cover" />
          <span
            className="absolute inset-0 bg-gradient-to-t from-espresso/90 from-15% via-espresso/25 via-50% to-transparent"
            aria-hidden="true"
          />
          <span className="absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-warm-ivory/90 text-terracotta">
            {icon}
          </span>
          <span className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-warm-ivory/90 text-terracotta">
            <PlusMinusIcon open={open} />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4">
            <span className="block font-display text-lg font-semibold text-warm-ivory mb-1">{title}</span>
            <span className="block text-sm text-warm-ivory/85">{detail}</span>
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="tap-target w-full flex items-start gap-4 p-5 text-left"
        >
          <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            {icon}
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
      )}

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className={`px-5 pb-5 pt-1 ${image ? "" : "border-t border-sand"}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * "Book Appointment" + phone row shown at the bottom of every expanded
 * differentiator card — the answer to "what should tapping this
 * actually do." Real booking (Tab32) isn't built yet (see BookingBlock),
 * so this doesn't fake a live-availability widget; it routes to the one
 * real, working appointment path already used site-wide (Nav, Hero,
 * BookingBlock, Footer) rather than inventing a second, competing CTA
 * destination.
 */
export function BookingCtaRow() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <a
        href="/contact"
        className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full bg-terracotta px-4 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
      >
        <CalendarIcon />
        Book Appointment
      </a>
      <a
        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
        className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full border border-sand px-4 py-2.5 text-sm font-semibold text-espresso hover:border-terracotta/40 transition-colors"
      >
        <PhoneIcon />
        {contact.phone}
      </a>
    </div>
  );
}

/**
 * The "In-network with most plans" differentiator card in TrustBlock,
 * made expandable — Akash asked for a +/- accordion here (referencing
 * a competitor site's INSURANCE FAQ pattern) so the full carrier list
 * is one tap away instead of only living further down in
 * InsuranceBlock (which isn't currently mounted on any page).
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
 *
 * Now a thin wrapper around the generic `ExpandCard` shell above (see
 * that comment for why) — this component only owns the insurance-
 * specific expanded content (carrier grid + disclaimer + the shared
 * booking CTA row every expanded differentiator card ends with).
 */
export function InsuranceExpandCard({
  title,
  detail,
  image,
  className,
}: {
  title: string;
  detail: string;
  image?: { src: string; alt: string };
  className?: string;
}) {
  return (
    <ExpandCard title={title} detail={detail} icon={<ShieldCheckIcon />} image={image} className={className}>
      <p className="mt-4 mb-3 text-[11px] font-semibold uppercase tracking-wide text-espresso/50">
        Accepted plans include
      </p>
      <div className="grid grid-cols-2 gap-2">
        {insuranceCarriers.map((c) => (
          <div key={c} className="group relative overflow-hidden rounded-xl bg-sand/40 px-3 py-3">
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
      <p className="mt-4 text-xs text-espresso/60">Don&apos;t see your plan? Call us and we&apos;ll verify.</p>
      <BookingCtaRow />
    </ExpandCard>
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
