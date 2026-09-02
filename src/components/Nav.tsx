"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { MedicalCrossIcon } from "./icons";
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
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Backlog item 30 — Escape closes the mobile menu, and focus returns
  // to its trigger either way (Escape or the header button toggling it
  // closed) rather than being dropped onto <body>.
  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-warm-ivory/95 backdrop-blur border-b border-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-espresso hover:text-terracotta transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Internal working link — Akash asked for it in the desktop top
                bar too (it was mobile-menu-only). Still deliberately NOT in
                the `nav` array in content.ts: that array is the patient-facing
                wayfinding surface locked in
                docs/supertooth-navigation-requirements.md, and mapping over it
                would make this look like a fifth patient nav item. Rendered
                separately and de-emphasized instead — hairline divider, muted
                weight/color, "internal" marker — so it reads as a utility
                link, not part of the patient journey. The page itself stays
                noindex (see src/app/backlog/page.tsx).

                Shown from lg only, and this is measured rather than guessed.
                The desktop nav switches on at md (768px), but it's already
                tight there on `main` today: around 768–790px the link *text*
                wraps to two lines ("Insurance & New Patients" and the Book
                Appointment pill both go to 40–60px tall inside a 64px header).
                The flex row itself does not break — every item stays on one
                row, centered — so this is cosmetic crowding, not a layout bug,
                but adding a sixth item at md would make it worse. Gated to lg
                instead, where the whole row sits on one line at 20px tall with
                64px of clearance from the logo (measured at 1024 and 1280).

                Trade-off: no Backlog link between 768–1023px, where the
                hamburger is also hidden. Acceptable — review happens on a
                laptop, and the hamburger covers phones.

                `gap-6 lg:gap-8` keeps lg+ pixel-identical to before and buys
                back a little room in that md band. */}
            <span className="hidden lg:block h-5 w-px bg-espresso/15" aria-hidden="true" />
            <Link
              href="/backlog"
              className="group hidden lg:inline-flex items-baseline gap-1.5 text-sm text-espresso/45 hover:text-terracotta transition-colors -ml-4"
            >
              Backlog
              <span className="text-xs text-espresso/30 group-hover:text-terracotta/60 transition-colors">
                internal
              </span>
            </Link>

            {/* Backlog item 45 — one-tap emergency reachability from every
                route, without a bottom bar (Akash declined one, 2026-08-30).
                Small and undiluted per item 46's landed treatment: a compact
                bg-alert badge, not a full pill, so it reads as distinct from
                Book Appointment rather than a second competing CTA.
                Icon-only at md: this row already overflowed at 768px with
                a labeled badge added (measured — "Book Appointment" and the
                badge itself both clipped past the viewport edge, on top of
                the pre-existing 768–790px crowding this file already
                documents). Label returns at lg, same as the Backlog link
                above. aria-label carries the name at every width. */}
            <Link
              href="/emergency"
              aria-label="Dental emergency guidance"
              className="tap-target inline-flex items-center gap-1.5 rounded-full bg-alert px-2.5 lg:px-3 py-2 text-xs font-semibold uppercase tracking-wide text-warm-ivory hover:brightness-110 transition"
            >
              <MedicalCrossIcon className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Emergency</span>
            </Link>

            <Link
              href="/contact"
              className="tap-target inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
            >
              Book Appointment
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1 min-[375px]:gap-2">
            {/* Backlog item 45 — the fixed header is the one persistent
                surface on every route and every scroll depth (verified by
                item 27), so this is where sitewide one-tap emergency
                reachability has to live now that a bottom bar is ruled out.
                Icon-only to fit beside Call/Schedule/Menu in a 320px header;
                meaning carries through the cross icon + aria-label, not
                colour alone (WCAG 1.4.1, per item 46). */}
            <Link
              href="/emergency"
              aria-label="Dental emergency guidance"
              className="tap-target inline-flex items-center justify-center rounded-full bg-alert text-warm-ivory"
            >
              <MedicalCrossIcon className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              aria-label="Call the practice"
              className="tap-target inline-flex items-center justify-center rounded-full border border-espresso/20 text-espresso"
            >
              <PhoneIcon />
            </a>
            <Link
              href="/contact"
              className="tap-target inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-2.5 min-[375px]:px-4 text-sm font-semibold text-warm-ivory whitespace-nowrap"
            >
              Schedule
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => (open ? closeMenu() : setOpen(true))}
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
              className="tap-target inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-6 py-3 text-sm font-semibold text-warm-ivory"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso"
            >
              <PhoneIcon /> {contact.phone}
            </a>

            {/* Backlog item 7 — one tap from the mobile menu, per that
                item's own reachability acceptance criteria. Deliberately
                NOT in the `nav` array (same reasoning as /backlog below):
                that array is the locked four-item patient nav shared with
                desktop, and a fifth item there would also need a desktop
                slot this item never asked for. Item 45 (emergency
                reachability, visual-distinction pass) is where this gets
                a more deliberate treatment — this is the minimum needed
                to satisfy item 7 today. */}
            <Link
              href="/emergency"
              onClick={() => setOpen(false)}
              className="tap-target inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-alert"
            >
              Dental emergency?
            </Link>

            {/* Internal working links — deliberately NOT in the `nav` array
                in content.ts. That array is the patient-facing wayfinding
                surface locked in docs/supertooth-navigation-requirements.md,
                and it also feeds the desktop nav; putting /backlog there
                would surface an internal artifact in the patient journey.
                Kept here instead: one tap from the hamburger for Akash,
                visually separated and de-emphasized, below the two patient
                CTAs so it never competes with them. The page itself is
                noindex (see src/app/backlog/page.tsx). */}
            <Link
              href="/backlog"
              onClick={() => setOpen(false)}
              className="tap-target inline-flex items-center justify-center gap-1.5 text-xs font-medium text-espresso/45 hover:text-terracotta transition-colors"
            >
              Backlog
              <span className="text-espresso/30">· internal</span>
            </Link>
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
