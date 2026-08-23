import Link from "next/link";
import { Placeholder } from "./Placeholder";
import { contact, hours, practice } from "@/lib/content";

/**
 * Desktop keeps the existing 3-column footer unchanged (`hidden md:block`
 * below). Mobile gets a separate, deliberately trimmed footer instead of
 * just letting that grid stack: full sentence-per-line contact info plus
 * a Hours list reads as a wall of text at the very end of a long mobile
 * scroll. This version keeps only what's required to act — address,
 * phone, hours, Book — dropping the parking note, and puts both a Book
 * CTA and a direct Call button at the bottom since that's the action a
 * reader at the end of the page actually wants.
 *
 * Dark background uses the locked Espresso token, not a new color —
 * per Akash's call, no new base token gets introduced for this.
 *
 * Phone/address/hours are now real (see content.ts) — pulled from the
 * practice's existing site. A compact emergency-line note was added to
 * both variants to match that same source, kept deliberately small (one
 * line, no separate box/section) so it doesn't compete with the larger
 * emergency banner already at the top of BookingBlock right above this.
 * No link lists were added here (New patient forms / Insurance & Payment
 * / etc., as seen on that reference site) — consistent with this
 * homepage's existing no-stub-links convention (Testimonials, Services).
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
    <div className="md:hidden bg-espresso text-warm-ivory">
      <div className="px-6 py-10 flex flex-col items-center gap-6 text-center">
        <div>
          <p className="font-display text-lg font-semibold">{practice.name}</p>
          <p className="mt-1 text-sm text-warm-ivory/70">{contact.address}</p>
        </div>

        <ul className="text-sm text-warm-ivory/70 space-y-1">
          {hours.map((h) => (
            <li key={h.days}>
              {h.days} · {h.time}
            </li>
          ))}
        </ul>

        <p className="text-xs text-warm-ivory/60">
          <span className="font-semibold text-terracotta">Dental emergency?</span> Current patients call{" "}
          <a href={`tel:${contact.emergencyPhone.replace(/[^\d+]/g, "")}`} className="underline underline-offset-2">
            <Placeholder tone="dark">{contact.emergencyPhone}</Placeholder>
          </a>
        </p>

        <div className="w-full flex flex-col gap-3">
          <Link
            href="/contact"
            className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-warm-ivory"
          >
            Book a visit
          </Link>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-warm-ivory/30 px-6 py-3 text-sm font-semibold text-warm-ivory"
          >
            <PhoneIcon />
            {contact.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-warm-ivory/10 px-6 py-4 text-center text-xs text-warm-ivory/50">
        © {new Date().getFullYear()} {practice.name}
      </div>
    </div>
  );
}

function DesktopFooter() {
  return (
    <div className="hidden md:block border-t border-sand">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-lg font-semibold text-espresso">{practice.name}</p>
          <p className="mt-2 text-sm text-espresso/70">{contact.address}</p>
          <p className="text-sm text-espresso/70">{contact.parkingNote}</p>
        </div>

        <div>
          <p className="font-medium text-espresso mb-2">Hours</p>
          <ul className="text-sm text-espresso/70 space-y-1">
            {hours.map((h) => (
              <li key={h.days}>
                {h.days} · {h.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-medium text-espresso mb-2">Contact</p>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="text-sm text-espresso/70 hover:text-terracotta"
          >
            {contact.phone}
          </a>
          <p className="mt-3 text-xs text-espresso/60">
            <span className="font-semibold text-terracotta">Dental emergency?</span> Current patients call{" "}
            <a
              href={`tel:${contact.emergencyPhone.replace(/[^\d+]/g, "")}`}
              className="underline underline-offset-2 hover:text-terracotta"
            >
              <Placeholder>{contact.emergencyPhone}</Placeholder>
            </a>
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-warm-ivory"
            >
              Book a visit
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-xs text-espresso/50">
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
