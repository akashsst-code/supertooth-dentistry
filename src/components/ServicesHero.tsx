import Link from "next/link";
import { contact, practice } from "@/lib/content";

/**
 * Compact page header for /services — not a repeat of the homepage Hero
 * (no video needed here), but keeps the same espresso-panel + Book/Call
 * CTA pattern for visual consistency with the rest of the site. Top CTA
 * per the /services JTBD priority list: booking shouldn't require a
 * scroll to the bottom of the page.
 */
export function ServicesHero() {
  return (
    <section className="bg-espresso text-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <span className="inline-flex items-center rounded-full bg-warm-ivory/10 px-3 py-1 text-xs font-medium text-warm-ivory/70">
          Services
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.1] sm:text-5xl">
          Same-day crowns, real same-day availability, in-network billing
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-warm-ivory/60 sm:text-base">
          The three things patients ask us about most before they book with {practice.name} — how
          it actually works, not just the badge.
        </p>
        <div className="mt-6 flex flex-row flex-wrap gap-3">
          <Link
            href="#booking"
            className="tap-target min-w-[140px] flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-terracotta px-6 py-3.5 text-base font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
          >
            Book your visit
          </Link>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-warm-ivory/40 px-5 py-3.5 text-base font-semibold text-warm-ivory hover:border-warm-ivory/70 transition-colors"
          >
            <PhoneIcon />
            Call
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.8c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
