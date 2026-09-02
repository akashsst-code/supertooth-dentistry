import Link from "next/link";
import { contact, mapDirectionsUrl, practice } from "@/lib/content";
import { CalendarIcon, ExternalLinkIcon } from "./icons";

/**
 * Legal/utility row — backlog items 7 and 12. Item 7 requires /emergency
 * linked in the footer; item 12 requires /privacy and /accessibility
 * linked in the footer, both routes ≥44×44px with ≥8px separation. Kept
 * as its own small row below the two primary CTAs so none of the three
 * compete with Book Appointment / Call for visual weight.
 */
function LegalLinks() {
  return (
    <nav aria-label="Legal and safety" className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
      <Link
        href="/emergency"
        className="tap-target inline-flex items-center px-2 text-xs font-semibold text-alert hover:underline"
      >
        Dental emergency
      </Link>
      <span className="text-espresso/20" aria-hidden="true">
        ·
      </span>
      <Link href="/privacy" className="tap-target inline-flex items-center px-2 text-xs text-espresso/60 hover:text-terracotta-dark transition-colors">
        Privacy
      </Link>
      <span className="text-espresso/20" aria-hidden="true">
        ·
      </span>
      <Link
        href="/accessibility"
        className="tap-target inline-flex items-center px-2 text-xs text-espresso/60 hover:text-terracotta-dark transition-colors"
      >
        Accessibility
      </Link>
    </nav>
  );
}

/**
 * This is a reference footer, not a second booking section: BookingBlock
 * immediately above already covers the hours/location grid, so this
 * footer doesn't repeat those. It does still carry both CTAs (Book
 * Appointment + phone) — per Akash's call, the very last thing on the
 * page should give a reader who scrolled all the way down something to
 * act on immediately, not just brand/legal info. Kept to exactly two
 * buttons + brand/address/copyright, spacing tightened (py-8 vs the
 * prior py-10, no extra gap under the CTAs) so re-adding the buttons
 * doesn't reopen the "too much space, no clear last action" problem.
 *
 * Mobile matches desktop's light (Warm Ivory) theme instead of
 * repeating BookingBlock's dark Espresso background directly below it —
 * two dark sections back-to-back with no visual break was part of why
 * the bottom of the page read as one long flat wall of text. A terracotta
 * accent rule under the practice name gives the brand mark a little
 * presence instead of being just another line of plain text.
 *
 * The address is now also a "Get Directions" handoff (item 59's already-
 * approved `mapDirectionsUrl` pattern, extended here) rather than plain
 * text with no action behind it — the last NAP mention on the page
 * shouldn't be a dead end.
 */
export function Footer() {
  return (
    <footer>
      <MobileFooter />
      <DesktopFooter />
    </footer>
  );
}

function MobileFooter() {
  return (
    <div className="md:hidden bg-warm-ivory text-espresso border-t border-sand">
      <div className="px-6 py-8 flex flex-col items-center gap-2 text-center">
        <p className="font-display text-xl font-semibold">{practice.name}</p>
        <span className="h-0.5 w-8 rounded-full bg-terracotta" />
        <p className="text-sm text-espresso/70">{contact.address}</p>
        <a
          href={mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex items-center gap-1 text-xs font-semibold text-terracotta-dark hover:text-terracotta transition-colors"
        >
          Get Directions
          <ExternalLinkIcon className="h-3 w-3" />
        </a>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <a
            href="/contact"
            className="tap-target inline-flex items-center justify-center gap-1 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-3 py-2.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
          >
            <CalendarIcon />
            Book Appointment
          </a>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center gap-1 rounded-full border border-espresso/15 px-3 py-2.5 text-sm font-semibold text-espresso hover:border-terracotta hover:text-terracotta transition-colors"
          >
            <PhoneIcon />
            {contact.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-sand px-6 py-4 flex flex-col items-center gap-3">
        <LegalLinks />
        <p className="text-center text-xs text-espresso/50">
          © {new Date().getFullYear()} {practice.name}
        </p>
      </div>
    </div>
  );
}

function DesktopFooter() {
  return (
    <div className="hidden md:block border-t border-sand bg-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex items-center justify-between gap-8">
        <div>
          <p className="font-display text-lg font-semibold text-espresso">{practice.name}</p>
          <span className="mt-2 mb-2 block h-0.5 w-8 rounded-full bg-terracotta" />
          <p className="text-sm text-espresso/70">
            {contact.address} · {contact.parkingNote}
          </p>
          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target mt-1 inline-flex items-center gap-1 text-xs font-semibold text-terracotta-dark hover:text-terracotta transition-colors"
          >
            Get Directions
            <ExternalLinkIcon className="h-3 w-3" />
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="tap-target inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
          >
            <CalendarIcon />
            Book Appointment
          </a>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-espresso/15 px-5 py-2.5 text-sm font-semibold text-espresso hover:border-terracotta hover:text-terracotta transition-colors"
          >
            <PhoneIcon />
            {contact.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-espresso/50">
            © {new Date().getFullYear()} {practice.name}. All rights reserved.
          </p>
          <LegalLinks />
        </div>
      </div>
    </div>
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
