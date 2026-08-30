"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { CalendarIcon, PhoneIcon, ShieldCheckIcon } from "./icons";
import { contact, insuranceCarriers } from "@/lib/content";

/**
 * Generic tap-to-expand differentiator-card row. Went through two visual
 * passes: a dark espresso-panel treatment (echoing Hero.tsx) landed
 * first, but Akash flagged it back as "the pills look like dark design"
 * with icons that "are not aesthetic" and asked for a lighter option —
 * reverted to a light warm-ivory surface, but not just back to the
 * original flat sand card: the icon badge is now a solid terracotta
 * circle (bolder, more finished than the earlier faint terracotta/10
 * tint that prompted the complaint) and the card itself carries a soft
 * shadow + a barely-there sand-tinted corner wash instead of a hard flat
 * border, so it reads as a raised card rather than a plain box. Collapsed
 * rows stay compact (icon + title + one-line detail + a +/- toggle, all
 * 3 visible at once, no swiping needed); the real photo only appears
 * once a row is expanded, alongside a longer note and the shared
 * booking CTA.
 *
 * Extracted 2026-08-29 from what used to be an insurance-only component
 * (see `InsuranceExpandCard` below) once "Same-day appointments" and
 * "Same-day crowns" needed the same tap-to-expand affordance — sharing
 * one shell keeps all 3 cards' interaction from drifting apart.
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
    <div
      className={`rounded-2xl bg-warm-ivory bg-[radial-gradient(130%_140%_at_12%_0%,rgba(238,231,216,0.7),transparent_55%)] border border-sand shadow-[0_1px_2px_rgba(61,50,38,0.04),0_10px_24px_-16px_rgba(61,50,38,0.35)] overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="tap-target w-full flex items-center gap-3 p-4 text-left"
      >
        <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-warm-ivory shadow-[0_3px_8px_rgba(193,99,62,0.35)]">
          {icon}
        </span>
        <span className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-espresso leading-tight">{title}</h3>
          <span className="block text-sm text-espresso/55 leading-snug">{detail}</span>
        </span>
        <span
          className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/10 text-terracotta"
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
          <div className="px-4 pb-4 pt-1 border-t border-sand">
            {image && (
              <div className="relative mt-3 mb-3 aspect-[16/10] rounded-xl overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 40rem, 90vw"
                  className="object-cover"
                />
              </div>
            )}
            {children}
          </div>
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
    <div className="mt-3 flex flex-wrap gap-2">
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
 * A thin wrapper around the generic `ExpandCard` shell above (see that
 * comment for why) — this component only owns the insurance-specific
 * expanded content (carrier grid + disclaimer + the shared booking CTA
 * row every expanded differentiator card ends with).
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
      <p className="mt-3 mb-2 text-[11px] font-semibold uppercase tracking-wide text-espresso/50">
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
      <p className="mt-3 mb-0 text-xs text-espresso/60">Don&apos;t see your plan? Call us and we&apos;ll verify.</p>
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
