"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contact, nav, practice } from "@/lib/content";

/**
 * EditorialNav — the header half of the screen-1 variation spec'd in
 * docs/supertooth-mobile-design-spec.md Sections 6 and 10. Used ONLY by
 * the homepage; Nav.tsx is untouched and still serves the other eight
 * pages, so this variation can be judged (or dropped) without a
 * site-wide nav rewrite.
 *
 * KNOWN CONFLICT, flagged rather than quietly resolved: the spec's
 * mobile header is a wordmark and a menu control, with "no visible phone
 * icon, schedule button, announcement strip, or secondary navigation."
 * docs/supertooth-navigation-requirements.md locks the opposite — Pattern
 * A puts logo, call icon, booking CTA and hamburger all in the mobile
 * header at once. Akash asked to borrow the spec's concepts, so the
 * stripped header is what's built here, but that locked requirement is
 * the thing this variation trades away and it needs an explicit call
 * before this could merge.
 *
 * The trade is mitigated, not ignored: the requirement's actual intent is
 * reachability, so calling and booking are both still one tap away inside
 * the menu sheet, with the phone number rendered as a real tel: link
 * rather than buried under a submenu.
 *
 * Static, not sticky — the spec's stated recommendation, and it also
 * keeps the first screen's whitespace budget intact.
 */
export function EditorialNav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
      <header className="mx-auto flex w-full max-w-[480px] items-center justify-between px-6 pt-7 md:max-w-[1320px] md:px-10 lg:px-16">
        {/* Typographic wordmark, not the tooth-mark lockup — the spec's
            compact header drops the "Dentistry" subline entirely. */}
        <Link
          href="/"
          className="font-editorial text-[17px] font-normal uppercase leading-none tracking-[0.28em] text-espresso"
          aria-label={`${practice.name}, home`}
        >
          Supertooth
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => (open ? closeMenu() : setOpen(true))}
          className="tap-target -mr-2 inline-flex items-center justify-center text-espresso"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* Full-height canvas sheet, per Section 10. */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-warm-ivory">
          <div className="mx-auto flex w-full max-w-[480px] items-center justify-between px-6 pt-7 md:max-w-[1320px] md:px-10 lg:px-16">
            <span className="font-editorial text-[17px] font-normal uppercase leading-none tracking-[0.28em] text-espresso">
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
            className="mx-auto flex w-full max-w-[480px] flex-col gap-5 px-6 pt-14 md:max-w-[1320px] md:px-10 lg:px-16"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-editorial text-[32px] font-light leading-tight tracking-[-0.03em] text-espresso"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="font-editorial text-[32px] font-light leading-tight tracking-[-0.03em] text-terracotta-dark"
            >
              Book a visit
            </Link>
          </nav>

          {/* Reachability floor for the header conflict described above. */}
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
