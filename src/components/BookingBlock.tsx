import { Placeholder } from "./Placeholder";
import { contact } from "@/lib/content";

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
 */
export function BookingBlock() {
  return (
    <section id="booking" className="bg-espresso text-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
          Ready to book your visit?
        </h2>
        <p className="text-warm-ivory/80 max-w-xl mx-auto mb-8">
          Reach out and we&apos;ll find a time that works — same-day slots are often available.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
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
            Call <Placeholder>{contact.phone}</Placeholder>
          </a>
        </div>
        <p className="text-sm text-warm-ivory/60">
          Need to be seen today? Call us — same-day requests are handled by phone.
        </p>
      </div>
    </section>
  );
}
