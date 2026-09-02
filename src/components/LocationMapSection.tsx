import { CalendarIcon, ClockIcon, MapPinIcon, PhoneIcon, PinDotIcon } from "./icons";
import { contact, hours, practice, serviceAreas } from "@/lib/content";

/**
 * Map + "areas we serve" — positioned after Services per Akash's locked
 * homepage-flow order, modeled on smilemakersfortworth.com's
 * map-plus-neighborhood-list pattern near the bottom of their homepage.
 * Uses contact.mapEmbedSrc — Google's own lightweight "Embed a map"
 * output for the practice's actual Business Profile listing (no API
 * key/billing needed) — same embed as HeroAddressMap, see the comment
 * there for why (native place card on marker click, no "open in Maps
 * app" chip, lighter than the informal `?q=...&output=embed` trick this
 * replaced). The neighborhood list is: only `practice.neighborhood` is
 * confirmed, the rest are plausible-by-proximity placeholders pending
 * Akash's actual service-area confirmation (see content.ts serviceAreas
 * comment).
 *
 * Map stays first (left, `lg:col-span-3`) per Akash's call to keep the
 * map as the section's lead visual rather than the actions-first layout
 * tried in an earlier pass.
 *
 * The info tile (right, `lg:col-span-2`) is organized as three
 * plain-language groups, each divided by a hairline, top to bottom:
 * identity (address, parking note, hours), actions (Book Appointment +
 * Call, inline), areas (neighborhood chips) — a fixed scan order rather
 * than one long paragraph-and-list block. Tightened 2026-09-02 per
 * Akash's "compress, remove space" call: card padding matches the
 * spec's 20px (`p-5`, was `p-6`), and the hairline gaps/label margins
 * dropped one step on the 8px scale. The standalone "Directions" button
 * was dropped too (Book Appointment + Call now sit inline as the one
 * action row) — the map above is already real, on-page, and one tap
 * from a native maps app via its own "Open in Maps" control, so a
 * second, separate Directions control was redundant.
 *
 * Neighborhood chips: previously the unconfirmed ones (everything but
 * `practice.neighborhood`) rendered through <Placeholder> — bracket
 * notation + dashed underline — which read as broken/unstyled inside a
 * pill (Akash's exact "looks unappealing, like broken links" call on
 * InsuranceExpandCard.tsx's carrier grid, now repeated here). Same fix
 * applied: every chip renders with identical, uniform styling, and one
 * plain-text disclaimer line under the list carries the
 * no-unverifiable-claims disclosure instead of per-chip brackets — see
 * InsuranceExpandCard.tsx's "Don't see your plan? Call us and we'll
 * verify." for the precedent.
 */
export function LocationMapSection() {
  const openHours = hours.find((h) => h.time !== "Closed");

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
        Proudly serving {practice.neighborhood} &amp; nearby Seattle
      </h2>
      <p className="text-espresso/70 mb-10 max-w-2xl">
        Easy to reach whether you&apos;re coming from home, work, or school.
      </p>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-sand">
          <iframe
            src={contact.mapEmbedSrc}
            title={`Map showing ${practice.name}'s location`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin"
            allowFullScreen
            className="w-full h-72 sm:h-96 border-0"
          />
        </div>

        <div className="lg:col-span-2 rounded-2xl bg-sand/40 border border-sand p-5">
          <div className="flex items-start gap-3">
            <MapPinIcon className="shrink-0 mt-1 text-terracotta" />
            <div>
              <p className="font-medium text-espresso">{contact.address}</p>
              <p className="mt-1 text-sm text-espresso/60">{contact.parkingNote}</p>
            </div>
          </div>
          {openHours && (
            <div className="flex items-start gap-3 mt-2">
              <ClockIcon className="shrink-0 mt-1 text-terracotta" />
              <p className="text-sm text-espresso/70">
                {openHours.days} &middot; {openHours.time}
              </p>
            </div>
          )}

          <div className="my-4 border-t border-sand" />

          <div className="flex gap-2">
            <a
              href="/contact"
              className="tap-target flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-4 py-3 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
            >
              <CalendarIcon />
              Book Appointment
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target flex flex-1 items-center justify-center gap-1.5 rounded-full border border-espresso/15 px-4 py-3 text-sm font-semibold text-espresso hover:border-terracotta/50 hover:text-terracotta-dark transition-colors"
            >
              <PhoneIcon />
              Call
            </a>
          </div>

          <div className="my-4 border-t border-sand" />

          <p className="text-xs font-semibold uppercase tracking-wide text-espresso/50 mb-2">
            Also welcoming patients from
          </p>
          <ul className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1 rounded-full bg-warm-ivory border border-sand px-3 py-1.5 text-sm text-espresso"
              >
                <PinDotIcon className="shrink-0 text-terracotta" />
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-espresso/50">Don&apos;t see your area? Call us — we&apos;re happy to help.</p>
        </div>
      </div>
    </section>
  );
}
