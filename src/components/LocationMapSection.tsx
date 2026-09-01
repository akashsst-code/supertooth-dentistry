import { ExternalLinkIcon, MapPinIcon, PinDotIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { contact, mapDirectionsUrl, practice, serviceAreas } from "@/lib/content";

/**
 * Map + "areas we serve" — new section, positioned after Services per
 * Akash's locked homepage-flow order, modeled on
 * smilemakersfortworth.com's map-plus-neighborhood-list pattern near the
 * bottom of their homepage. Uses contact.mapEmbedSrc — Google's own
 * lightweight "Embed a map" output for the practice's actual Business
 * Profile listing (no API key/billing needed) — same embed as
 * HeroAddressMap, see the comment there for why (native place card on
 * marker click, no "open in Maps app" chip, lighter than the informal
 * `?q=...&output=embed` trick this replaced). The neighborhood list is:
 * only `practice.neighborhood` is confirmed, the rest are
 * plausible-by-proximity placeholders pending Akash's actual
 * service-area confirmation (see content.ts serviceAreas comment).
 *
 * Item 59 — "Get Directions" link added below the address, real anchor
 * outside the iframe (`mapDirectionsUrl`, content.ts). Same rationale as
 * HeroAddressMap.tsx: the embed itself stays sandboxed against navigating
 * away, this is a purely additive one-tap handoff to a native maps app.
 */
export function LocationMapSection() {
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
          <div className="flex items-start gap-3 mb-5">
            <MapPinIcon className="shrink-0 mt-1 text-terracotta" />
            <div>
              <p className="font-medium text-espresso">{contact.address}</p>
              <p className="text-sm text-espresso/70">{contact.parkingNote}</p>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-dark hover:text-terracotta transition-colors"
              >
                Get Directions
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-wide text-espresso/60 mb-3">
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
