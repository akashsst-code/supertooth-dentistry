import Image from "next/image";
import { contact, hours } from "@/lib/content";

/**
 * Booking block — docs/supertooth-ux-flow.md Section 4 / build-spec
 * Section 6. Locked architecture is Webflow(now Next.js) front end calling
 * a Tab32-backed service API for real-time slots — that service layer
 * does not exist yet (open sub-questions: hosting, auth, response shape).
 *
 * This is a functional stand-in, not a mock: the CTA works (routes to
 * Contact / tel:), but copy deliberately avoids claiming real-time
 * availability or instant confirmation, since that would be an
 * unverifiable claim until the Tab32 integration is actually built.
 * Swap this block's internals for the real widget once that lands —
 * the section position/order should not need to change.
 *
 * Reworked per Akash's "organize on alignment, remove clutter, bring a
 * picture for trust, fill in hours" call: the old single centered column
 * (CTAs + one vague "need to be seen today?" line, no address/hours) is
 * now a two-column layout — copy + CTAs + real hours/address on the
 * left, a real office photo on the right (existing photography, not a
 * new stock image — trust matters more here than elsewhere).
 *
 * Emergency line was removed entirely per Akash's call (no longer a
 * confirmed real number/contact) rather than left as a placeholder line.
 *
 * Info below the CTAs is organized into named groups by what a reader
 * does with it, not just laid out as a row of icon pills: "Quick
 * actions" (book/call — something to do right now), "Office hours"
 * and "Location" (reference info — something to check). A flat row
 * blurred those together; a small uppercase label over each group
 * makes the distinction visible at a glance. Only open hours are
 * shown here (the "Closed" row still exists in `hours` for Nav's full
 * listing) since a closed day isn't actionable next to a booking CTA.
 */
export function BookingBlock() {
  const openHours = hours.find((h) => h.time !== "Closed");

  return (
    <section id="booking" className="bg-espresso text-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Visit us
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
              Ready to book your visit?
            </h2>
            <p className="text-warm-ivory/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Reach out and we&apos;ll find a time that works — same-day slots are often available.
            </p>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-warm-ivory/50">
                Quick actions
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="/contact"
                  className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
                >
                  Book Now
                </a>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="tap-target inline-flex items-center justify-center rounded-full border border-warm-ivory/30 px-7 py-3.5 text-base font-semibold text-warm-ivory hover:border-warm-ivory/60 transition-colors"
                >
                  Call {contact.phone}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-x-10 gap-y-5">
              {openHours && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-warm-ivory/50">
                    Office hours
                  </p>
                  <span className="flex items-center justify-center lg:justify-start gap-2 text-sm text-warm-ivory/80">
                    <ClockIcon />
                    {openHours.days} · {openHours.time}
                  </span>
                </div>
              )}
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-warm-ivory/50">
                  Location
                </p>
                <span className="flex items-start justify-center lg:justify-start gap-2 text-sm text-warm-ivory/80 max-w-[16rem] mx-auto lg:mx-0">
                  <PinIcon className="mt-0.5 shrink-0" />
                  {contact.address}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-warm-ivory/10">
              <Image
                src="/office/office-2.webp"
                alt="Treatment room inside Super Tooth Dentistry's Queen Anne office"
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
