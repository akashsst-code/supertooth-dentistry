import { CalendarIcon, ClockIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon, PinDotIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { contact, hours, mapDirectionsUrl, practice, serviceAreas } from "@/lib/content";

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
 * tried in an earlier pass — that pass also moved Get Directions/Call
 * into an always-visible CTA row and parking/neighborhoods behind
 * accordions; kept the CTA row here (it's a real improvement over the
 * old text-link-only "Get Directions"), dropped the accordions so
 * parking and neighborhoods stay scannable at a glance instead of a tap
 * away.
 *
 * The info tile (right, `lg:col-span-2`) is organized as three
 * plain-language groups, each divided by a hairline, top to bottom:
 * identity (address, parking note, hours), actions (Book/Directions/
 * Call), areas (neighborhood chips) — a fixed scan order rather than
 * one long paragraph-and-list block.
 *
 * Item 59 — the CTA row's "Directions" button is the real, working
 * successor to the old standalone "Get Directions" text link: same
 * `mapDirectionsUrl` (content.ts, a plain Google Maps search URL per
 * that item's own reference), same rationale as HeroAddressMap.tsx —
 * the embed itself stays sandboxed against navigating away, this is a
 * purely additive one-tap handoff to a native maps app.
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

        <div className="lg:col-span-2 rounded-2xl bg-sand/40 border border-sand p-6">
          <div className="flex items-start gap-3">
            <MapPinIcon className="shrink-0 mt-1 text-terracotta" />
            <div>
              <p className="font-medium text-espresso">{contact.address}</p>
              <p className="mt-1 text-sm text-espresso/60">{contact.parkingNote}</p>
            </div>
          </div>
          {openHours && (
            <div className="flex items-start gap-3 mt-3">
              <ClockIcon className="shrink-0 mt-1 text-terracotta" />
              <p className="text-sm text-espresso/70">
                {openHours.days} &middot; {openHours.time}
              </p>
            </div>
          )}

          <div className="my-5 border-t border-sand" />

          <a
            href="/contact"
            className="tap-target flex w-full items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-4 py-3.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
          >
            <CalendarIcon />
            Book Appointment
          </a>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target flex items-center justify-center gap-1.5 rounded-full border border-espresso/15 px-4 py-3 text-sm font-semibold text-espresso hover:border-terracotta/50 hover:text-terracotta-dark transition-colors"
            >
              <ExternalLinkIcon />
              Directions
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target flex items-center justify-center gap-1.5 rounded-full border border-espresso/15 px-4 py-3 text-sm font-semibold text-espresso hover:border-terracotta/50 hover:text-terracotta-dark transition-colors"
            >
              <PhoneIcon />
              Call
            </a>
          </div>

          <div className="my-5 border-t border-sand" />

          <p className="text-xs font-semibold uppercase tracking-wide text-espresso/50 mb-3">
            Also welcoming patients from
          </p>
          <ul className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1 rounded-full bg-warm-ivory border border-sand px-3 py-1.5 text-sm text-espresso"
              >
                <PinDotIcon className="shrink-0 text-terracotta" />
                {area === practice.neighborhood ? area : <Placeholder>{area}</Placeholder>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
