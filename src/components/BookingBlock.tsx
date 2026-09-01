import Image from "next/image";
import { contact, hours } from "@/lib/content";
import { CalendarIcon, ClockIcon, MapPinIcon, MedicalCrossIcon, PhoneIcon, UserPlusIcon } from "./icons";

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
 * Everything here is left-aligned, never centered — Akash flagged that
 * centered text on mobile made the eye jump around instead of scanning
 * down a single edge. "Office hours" and "Location" sit in a genuine
 * two-column grid (not a wrapped row) so they read as a small scannable
 * spec sheet next to the CTAs, same pattern as the labeled "Quick
 * actions" group above them. Only open hours are shown here (the
 * "Closed" row still exists in `hours` for Nav's full listing) since a
 * closed day isn't actionable next to a booking CTA.
 *
 * Phone button shows the number itself, not the word "Call" — same
 * "be explicit" call Akash made for the Hero CTA — and both CTAs share
 * an icon now (calendar / phone) instead of just the phone one, so the
 * pair reads as two parallel actions rather than one plain button and
 * one decorated one. Primary CTA is labeled "Book Appointment" (was
 * "Book Now") to match the renamed CTA everywhere else on the site.
 *
 * Padding/gap/text size on both CTAs (px-7→px-4, gap-2→gap-1.5,
 * text-base→text-sm, row gap-4→gap-2) were trimmed to keep them on
 * one line at mobile widths — same fix as Hero's CTA row, applied
 * here once "Book Appointment" (longer than the old "Book Now")
 * pushed this row past one line too.
 *
 * New Patient / Dental Emergency, 2026-08-31 (item 48 revision) —
 * went through several rounds of placement/treatment the same day
 * before landing here; full history in backlog.ts items 46/48. Short
 * version of what stuck:
 *
 * Dental Emergency is now the third item in "Quick actions", alongside
 * Book Appointment and Call — Akash's final call, after trying it
 * every other way (a full-width Hero button, a pill next to Book that
 * read as "the same color", plain de-emphasized text that then read as
 * "hidden"). As a compact `bg-alert` badge (undiluted hex, smaller
 * padding/font than the two primary pills, `items-center` on the row
 * so it lines up against their taller height) it reads as a real,
 * visible action without matching Book/Call's size or competing with
 * them for primacy — restraint through scale within the row, not
 * through hiding it in a different section.
 *
 * New Patient stays separate — a small boutique practice whose
 * dominant job is winning new patients doesn't need it competing for
 * space in "Quick actions" alongside the more time-sensitive Book/Call/
 * Emergency trio, so it's still its own quiet line below Office hours/
 * Location.
 */
export function BookingBlock() {
  const openHours = hours.find((h) => h.time !== "Closed");

  return (
    <section id="booking" className="bg-espresso text-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-3 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Visit us
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
              Ready to book your visit?
            </h2>
            <p className="text-warm-ivory/80 max-w-xl mb-8">
              Reach out and we&apos;ll find a time that works — same-day slots are often available.
            </p>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-warm-ivory/50">
                Quick actions
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <a
                  href="/contact"
                  className="tap-target inline-flex items-center justify-center gap-1 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-3.5 py-3.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
                >
                  <CalendarIcon />
                  Book Appointment
                </a>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="tap-target inline-flex items-center justify-center gap-1 rounded-full border border-warm-ivory/30 px-3.5 py-3.5 text-sm font-semibold text-warm-ivory hover:border-warm-ivory/60 transition-colors"
                >
                  <PhoneIcon />
                  {contact.phone}
                </a>
                <a
                  href="/contact"
                  className="tap-target inline-flex items-center gap-1 rounded-full bg-alert px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-warm-ivory hover:brightness-110 transition"
                >
                  <MedicalCrossIcon className="h-3.5 w-3.5" />
                  Dental emergency
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-sm">
              {openHours && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-warm-ivory/50">
                    Office hours
                  </p>
                  <span className="flex items-start gap-2 text-sm text-warm-ivory/80">
                    <ClockIcon className="mt-0.5 shrink-0" />
                    {openHours.days} · {openHours.time}
                  </span>
                </div>
              )}
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-warm-ivory/50">
                  Location
                </p>
                <span className="flex items-start gap-2 text-sm text-warm-ivory/80">
                  <MapPinIcon className="mt-0.5 shrink-0" />
                  {contact.address}
                </span>
              </div>
            </div>

            <a
              href="/insurance-new-patients"
              className="tap-target mt-6 inline-flex items-center gap-1.5 text-xs text-warm-ivory/60 hover:text-warm-ivory transition-colors"
            >
              <UserPlusIcon className="h-3.5 w-3.5" />
              New patient? Start here
            </a>
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
