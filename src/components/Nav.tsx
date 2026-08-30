"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { contact, hours, nav } from "@/lib/content";

/**
 * Nav — Pattern A, locked in docs/supertooth-navigation-requirements.md:
 * desktop = logo, primary links, persistent Book Appointment CTA, sticky.
 * mobile = logo, call icon, booking CTA, hamburger, all visible + sticky;
 * hamburger opens a full-screen menu with quick links, hours/location
 * shown inline (zero extra taps), and Book Appointment + phone repeated
 * at the bottom. "Open now" live status is deliberately not implemented
 * — the doc calls a static hours list an acceptable lower-cost v1.
 *
 * Mobile header's CTA reads "Schedule" rather than the full "Book
 * Appointment" — that pill sits between a phone-icon circle and the
 * hamburger circle in a ~375px header alongside the full logo lockup;
 * there isn't room for the full label there. "Schedule" was chosen
 * over an abbreviation like "Appt" per a competitor-site scan
 * (southlakeuniondentistoffice.com uses the same single-word pattern
 * in its own tight header nav) — a real word reads better than a
 * truncation. Desktop nav and the full-screen mobile menu (both far
 * less cramped) use the full "Book Appointment" label.
 *
 * `fixed` rather than `sticky`: this used to render nested inside
 * ViewportHero's one-screen-tall wrapper alongside Hero. A sticky
 * element only sticks within its own containing block — once a reader
 * scrolled past that wrapper (i.e. past Hero, into TrustBlock and
 * everything below), the wrapper itself had fully scrolled offscreen,
 * so the "stuck" nav scrolled away with it and never came back. `fixed`
 * pins it to the viewport for the entire page instead. NAV_HEIGHT_PX in
 * ViewportHero.tsx must stay in sync with this header's rendered height
 * (h-16 below) since Nav is now out of normal flow and everything after
 * it has to reserve that space itself.
 *
 * Single-bleed pass (2026-08-29): tried a transparent-while-over-Hero
 * floating state here (mono Logo, drop-shadowed icons/links, several
 * different contrast/scrim approaches, several different fixes for the
 * mechanism that decides when to switch). Reverted — three real rounds
 * of device-only bugs (a stark scrim panel, a solid-until-scroll flash,
 * a load-timing race) that never reproduced in this repo's Chromium-
 * based testing tooling, and Akash's explicit call after that was to
 * stop chasing it and just use the one reliable solid header everywhere
 * — same treatment this already had on every other section, now used
 * for Hero too instead of a second, fancier state. If a transparent-
 * over-photo header gets revisited later, budget real device testing
 * time for it up front; it wasn't reproducible any other way.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-warm-ivory/95 backdrop-blur border-b border-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-espresso hover:text-terracotta transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
            >
              Book Appointment
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              aria-label="Call the practice"
              className="tap-target inline-flex items-center justify-center rounded-full border border-espresso/20 text-espresso"
            >
              <PhoneIcon />
            </a>
            <Link
              href="/contact"
              className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-4 text-sm font-semibold text-warm-ivory whitespace-nowrap"
            >
              Schedule
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="tap-target inline-flex items-center justify-center rounded-full border border-espresso/20 text-espresso"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu — deliberately rendered outside <header>:
          that element has backdrop-blur, and backdrop-filter establishes
          a new containing block for fixed-position descendants, which
          collapsed this menu's fixed inset-0 box to the header's own
          65px height instead of the viewport. */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-warm-ivory z-40 flex flex-col overflow-y-auto">
          <nav className="flex flex-col px-6 py-8 gap-6" aria-label="Mobile primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-espresso"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hours/location shown inline, zero extra taps — locked requirement.
              Rows (bold day label left, time right, hairline between) instead
              of one run-on "days · time" line per Akash's competitor scan
              (southlakeuniondentistoffice.com's "Business Hours" panel) —
              a label/value row reads as a quick lookup, a sentence doesn't. */}
          <div className="px-6 py-6 border-t border-sand bg-sand/40">
            <p className="font-display text-base font-semibold text-espresso mb-2">Hours</p>
            <ul className="text-sm mb-4">
              {hours.map((h) => (
                <li
                  key={h.days}
                  className="flex items-baseline justify-between gap-4 py-1.5 border-b border-espresso/10 last:border-0"
                >
                  <span className="font-medium text-espresso">{h.days}</span>
                  <span className={h.time === "Closed" ? "text-espresso/45" : "text-espresso/80"}>{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-espresso/80">{contact.address}</p>
          </div>

          <div className="mt-auto px-6 py-6 border-t border-sand flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-warm-ivory"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso"
            >
              <PhoneIcon /> {contact.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.8c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
