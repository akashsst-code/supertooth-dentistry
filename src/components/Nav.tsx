"use client";

import { useState } from "react";
import Link from "next/link";
import { Placeholder } from "./Placeholder";
import { contact, hours, nav, practice } from "@/lib/content";

/**
 * Nav — Pattern A, locked in docs/supertooth-navigation-requirements.md:
 * desktop = logo, primary links, persistent Book Now CTA, sticky.
 * mobile = logo, call icon, Book Now, hamburger, all visible + sticky;
 * hamburger opens a full-screen menu with quick links, hours/location
 * shown inline (zero extra taps), and Book Now + phone repeated at the
 * bottom. "Open now" live status is deliberately not implemented — the
 * doc calls a static hours list an acceptable lower-cost v1.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-ivory/95 backdrop-blur border-b border-sand">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold text-espresso">
          {practice.name}
        </Link>

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
            Book Now
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
            className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-4 text-sm font-semibold text-warm-ivory"
          >
            Book
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

      {/* Mobile full-screen menu */}
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

          {/* Hours/location shown inline, zero extra taps — locked requirement */}
          <div className="px-6 py-6 border-t border-sand bg-sand/40">
            <p className="font-display text-base font-semibold text-espresso mb-2">Hours</p>
            <ul className="text-sm text-espresso/80 space-y-1 mb-4">
              {hours.map((h) => (
                <li key={h.days}>
                  {h.days} · <Placeholder>{h.time}</Placeholder>
                </li>
              ))}
            </ul>
            <p className="text-sm text-espresso/80">
              <Placeholder>{contact.address}</Placeholder>
            </p>
          </div>

          <div className="mt-auto px-6 py-6 border-t border-sand flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-warm-ivory"
            >
              Book Now
            </Link>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso"
            >
              <PhoneIcon /> <Placeholder>{contact.phone}</Placeholder>
            </a>
          </div>
        </div>
      )}
    </header>
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
