"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contact, nav, practice } from "@/lib/content";

/** Past this many pixels of scroll the bar takes on a surface and the
 *  call/book controls appear. Small on purpose — the reveal should feel
 *  like a response to the first flick, not a separate scroll milestone. */
const SCROLL_THRESHOLD_PX = 24;

/**
 * EditorialNav — the header half of the screen-1 variation spec'd in
 * docs/supertooth-mobile-design-spec.md Sections 6 and 10. Used ONLY by
 * the homepage; Nav.tsx is untouched and still serves the other eight
 * pages, so this variation can be judged (or dropped) without a
 * site-wide nav rewrite.
 *
 * RESOLVES the conflict the first pass could only flag. The spec's
 * header is a wordmark and a menu control, explicitly "no visible phone
 * icon, schedule button." docs/supertooth-navigation-requirements.md
 * Pattern A locks the opposite: logo, call, booking CTA and hamburger
 * all present in the mobile header. Those look mutually exclusive only
 * while the header is treated as one fixed state.
 *
 * Scroll position decides instead. At the top of the homepage — the one
 * view the spec actually governs — the bar is transparent and carries
 * just the wordmark and menu control, so the opening composition stays
 * as clean as the reference. The moment the reader scrolls, the bar
 * gains a surface and the call + book controls fade in, and from then
 * on it behaves like Pattern A: pinned, persistent, booking always one
 * tap away. Each requirement gets the state it was actually written
 * about.
 *
 * `fixed` rather than `sticky`, for the reason Nav.tsx documents: a
 * sticky element only sticks within its own containing block, so once
 * the reader passed the hero wrapper it would scroll away and never
 * come back.
 */
/** Matches the `lg:` variants used for the desktop header below. Kept as
 *  one constant so the JS mirror of the breakpoint can't drift from the
 *  Tailwind classes it exists to describe. */
const DESKTOP_MIN_WIDTH_PX = 1024;

export function EditorialNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Only used to keep `aria-hidden` honest on the call/book pair, which
  // CSS reveals unconditionally at lg but only on scroll below it.
  // Starts false so the server render and the hydrating render agree;
  // the effect below corrects it on the first client frame.
  const [isDesktop, setIsDesktop] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-b border-sand bg-warm-ivory/92 backdrop-blur-[14px]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[480px] items-center justify-between px-6 md:max-w-[1320px] md:px-10 lg:px-16">
          {/* Typographic wordmark, not the tooth-mark lockup — the spec's
              compact header drops the "Dentistry" subline entirely. */}
          <Link
            href="/"
            className="font-editorial text-[15px] font-normal uppercase leading-none tracking-[0.28em] text-espresso"
            aria-label={`${practice.name}, home`}
          >
            Supertooth
          </Link>

          <div className="flex items-center gap-1 lg:gap-8">
            {/* DESKTOP NAVIGATION (lg+ only). Everything below 1024px is
                byte-for-byte what it was: wordmark + hamburger, with the
                call/book pair revealing on scroll.

                Why this exists. On a 1440px screen this header rendered a
                wordmark and a hamburger and nothing else — the four
                primary destinations were behind a control that had to be
                found, opened and read before a single section name was
                visible. NN/g's quantitative work on hidden navigation
                puts the cost at roughly half the discoverability of
                visible navigation, and it reports the penalty is *worse*
                on desktop than on phones, because the space saved buys
                nothing there.

                It is also what docs/supertooth-navigation-requirements.md
                Pattern A already locks: "desktop = logo, primary links,
                persistent Book Appointment CTA, sticky." That decision
                was made and approved; the editorial homepage simply never
                implemented its desktop half. Nav.tsx (every other page)
                has had it all along, which is why the homepage was the
                one route where the site's own nav model didn't apply.

                The conflict with docs/supertooth-mobile-design-spec.md's
                clean opening resolves on the axis the spec is actually
                about. That spec governs the phone composition, where
                horizontal room is the scarce resource; at lg there is
                ~1200px of header and five short labels cost none of the
                calm. The scroll-reveal stays exactly as designed below
                lg, so the view the spec was written for is unchanged. */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
              {nav
                .filter((item) => item.href !== "/contact")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-editorial text-sm font-normal tracking-[-0.01em] text-espresso/80 transition-colors hover:text-terracotta-dark"
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>

            {/* Toggled with visibility, not unmounted: `invisible` takes
                these out of the tab order while hidden (so there are no
                focusable phantom controls over the hero) but still lets
                opacity/transform animate, which a mount/unmount can't.

                From lg the reveal is switched off and these are simply
                always on — that is the "persistent Book Appointment CTA"
                half of Pattern A. `aria-hidden` has to follow the same
                rule or the desktop CTA would be visible but hidden from
                assistive tech, so it is gated on `isDesktop` too rather
                than on `scrolled` alone. */}
            <div
              className={`flex items-center gap-1 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:visible lg:translate-y-0 lg:opacity-100 ${
                scrolled ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
              }`}
              aria-hidden={!scrolled && !isDesktop}
            >
              {/* Icon-only below lg, where the header is competing with a
                  hamburger for ~120px. From lg the number itself shows:
                  a visible phone number is trust content for a local
                  practice, not just a control, and it is the one piece of
                  contact information a desktop reader can act on without
                  clicking anything at all. `aria-label` still leads with
                  "Call" in both states so voice control matches. */}
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                aria-label={`Call ${contact.phone}`}
                className="tap-target inline-flex items-center justify-center gap-2 rounded-full text-espresso transition-colors lg:px-3 lg:font-editorial lg:text-sm lg:text-espresso/80 lg:hover:text-terracotta-dark"
              >
                <PhoneIcon />
                <span className="hidden lg:inline">{contact.phone}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-terracotta-dark px-4 font-editorial text-xs font-medium uppercase tracking-[0.1em] text-warm-ivory transition-colors hover:bg-espresso lg:min-h-[42px] lg:px-6 lg:text-sm"
              >
                Book
              </Link>
            </div>

            {/* Hidden from lg: with all four destinations, the number and
                the Book pill on the bar, the hamburger would open a sheet
                that duplicates what is already visible — the "two ways to
                reach the same five links" pattern NN/g's menu guidance
                calls out. Below lg it is unchanged and still the only
                route to the nav. */}
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => (open ? closeMenu() : setOpen(true))}
              className="tap-target -mr-2 inline-flex items-center justify-center text-espresso lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-height canvas sheet, per Section 10. Deliberately rendered
          outside <header>: that element has backdrop-blur once scrolled,
          and backdrop-filter establishes a containing block for fixed
          descendants, which would collapse this sheet to the header's
          own height instead of the viewport (the same trap documented in
          Nav.tsx). */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-warm-ivory">
          <div className="mx-auto flex h-16 w-full max-w-[480px] items-center justify-between px-6 md:max-w-[1320px] md:px-10 lg:px-16">
            <span className="font-editorial text-[15px] font-normal uppercase leading-none tracking-[0.28em] text-espresso">
              Supertooth
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="tap-target -mr-2 inline-flex items-center justify-center text-espresso"
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            className="mx-auto flex w-full max-w-[480px] flex-col gap-5 px-6 pt-12 md:max-w-[1320px] md:px-10 lg:px-16"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-editorial text-[30px] font-light leading-tight tracking-[-0.03em] text-espresso"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="font-editorial text-[30px] font-light leading-tight tracking-[-0.03em] text-terracotta-dark"
            >
              Book a visit
            </Link>
          </nav>

          <div className="mx-auto mt-auto w-full max-w-[480px] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 md:max-w-[1320px] md:px-10 lg:px-16">
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target inline-flex items-center font-editorial text-base text-espresso/70"
            >
              {contact.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
      <path d="M0 1h24M0 9h24M0 17h24" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" />
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
