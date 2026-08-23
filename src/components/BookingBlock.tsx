import Image from "next/image";
import { Placeholder } from "./Placeholder";
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
 * new stock image — trust matters more here than elsewhere). A single
 * emergency-line banner up top replaces the old vague "need to be seen
 * today?" sentence with the actual number.
 */
export function BookingBlock() {
  return (
    <section id="booking" className="bg-espresso text-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10 sm:mb-14 rounded-2xl border border-terracotta/40 bg-terracotta/10 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm sm:text-base">
            <span className="font-semibold text-terracotta">Dental emergency?</span>{" "}
            Current patients can reach {contact.emergencyContact} directly.
          </p>
          <a
            href={`tel:${contact.emergencyPhone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors whitespace-nowrap"
          >
            Call emergency line: <Placeholder tone="dark">{contact.emergencyPhone}</Placeholder>
          </a>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
              Ready to book your visit?
            </h2>
            <p className="text-warm-ivory/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Reach out and we&apos;ll find a time that works — same-day slots are often available.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
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
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center lg:items-start justify-center lg:justify-start gap-x-6 gap-y-1 text-sm text-warm-ivory/60">
              {hours.map((h) => (
                <span key={h.days}>
                  {h.days}: {h.time}
                </span>
              ))}
              <span>{contact.address}</span>
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
