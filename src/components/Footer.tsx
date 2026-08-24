import { contact, practice } from "@/lib/content";
import { CalendarIcon } from "./icons";

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
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <a
            href="/contact"
            className="tap-target inline-flex items-center justify-center gap-1 rounded-full bg-terracotta px-3 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
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

      <div className="border-t border-sand px-6 py-4 text-center text-xs text-espresso/50">
        © {new Date().getFullYear()} {practice.name}
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
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="tap-target inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 text-xs text-espresso/50">
          © {new Date().getFullYear()} {practice.name}. All rights reserved.
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
