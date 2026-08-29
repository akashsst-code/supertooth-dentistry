"use client";

import { useEffect, useState } from "react";
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
 * `floating` (added 2026-08-29, single-bleed pass): while the page is
 * still scrolled to the very top (still over Hero's full-bleed photo),
 * the header goes fully transparent (plus its own top scrim + mono
 * Logo, both below) instead of a solid white bar sitting on top of the
 * photo — Akash's "make it one clean bleed, not white/photo/white
 * stacked bands" call. Driven by a plain `window.scrollY` check, not an
 * IntersectionObserver against a sentinel at Hero's exact bottom edge —
 * that was tried first and was flaky: Hero is deliberately sized to
 * exactly one screen height, so a sentinel marking "Hero has ended"
 * necessarily sits right at the fold, and sub-pixel rounding in that
 * height (mobile browser chrome resizing the viewport, the JS/CSS
 * height reconciliation in ViewportHero.tsx) made it flicker between
 * both states. A scroll-position check sidesteps that entirely: since
 * Hero fills exactly one screen, ANY scroll at all already means
 * TrustBlock is starting to show beneath it, so solidifying on the
 * first few pixels of scroll is correct, not premature. Structure/
 * links/hamburger/CTA are all unchanged from the locked Pattern A spec
 * (docs/supertooth-navigation-requirements.md) — this is a visual-only
 * treatment, nothing here is hidden or removed while floating.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(true);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = floating
    ? "text-warm-ivory hover:text-warm-ivory/70"
    : "text-espresso hover:text-terracotta";
  const iconButtonColor = floating
    ? "border-warm-ivory/40 text-warm-ivory"
    : "border-espresso/20 text-espresso";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          floating ? "bg-transparent" : "bg-warm-ivory/95 backdrop-blur border-b border-sand"
        }`}
      >
        {/* Nav's own top scrim — only needed (rendered) while floating over
            the photo; once solid, the header's own opaque background
            covers this same space, so leaving it mounted would just be a
            lingering dark band under later sections as the page scrolls. */}
        {floating && (
          <div className="photo-text-scrim-top absolute inset-x-0 top-0 h-32" aria-hidden="true" />
        )}

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo mono={floating} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${linkColor}`}
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
              className={`tap-target inline-flex items-center justify-center rounded-full border transition-colors ${iconButtonColor}`}
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
              className={`tap-target inline-flex items-center justify-center rounded-full border transition-colors ${iconButtonColor}`}
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
