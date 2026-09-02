"use client";

import { useId, useState, type ReactNode } from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  ExternalLinkIcon,
  MapPinIcon,
  PhoneIcon,
  PinDotIcon,
} from "./icons";
import { Placeholder } from "./Placeholder";
import { contact, hours, mapDirectionsUrl, practice, serviceAreas } from "@/lib/content";

/**
 * Map + "areas we serve" — rebuilt 2026-09-01 per the attached mobile
 * location/service-area design spec (recommended hybrid of that doc's
 * Option 1 "action-first card" + Option 9 "contextual accordion").
 *
 * What changed from the prior version and why (see the spec's "What
 * should change" section):
 * - Address, hours, Book Appointment, Directions and Call now render
 *   before the map in source order, so mobile visitors get the useful
 *   actions first instead of scrolling past a full-width map to reach
 *   them (previously the map was the first thing in the grid).
 * - The map is now a fixed, compact preview (~208-224px, within the
 *   spec's 180-240px / <35vh guidance) rather than a large 288-384px
 *   block — it's a supporting visual now, not the section's focal
 *   point. Still the same real Google "Embed a map" src as
 *   HeroAddressMap (see that file's comment for why: no API key/
 *   billing, resolves to the real Business Profile listing, native
 *   place card on marker click), still `loading="lazy"` so it doesn't
 *   fetch until it nears the viewport, still sandboxed against
 *   navigating away (Akash's locked "keep visitors on-page" call) with
 *   the real "Get Directions" anchor (item 59) rendered outside it.
 * - Parking and neighborhoods served move into accordion rows so the
 *   section stays compact on mobile while keeping every fact one tap
 *   away, not hidden entirely or dumped in one long block. No Transit
 *   or Accessibility rows — the spec calls for those too, but there's
 *   no verified transit/accessibility content in content.ts yet, and
 *   inventing either would violate the no-unverifiable-claims rule
 *   (docs/supertooth-build-principles.md Section 8). Add rows here
 *   once Akash confirms that content, rather than guessing at it.
 * - Neighborhood chips are unchanged in substance (only
 *   `practice.neighborhood` is confirmed real; the rest render through
 *   <Placeholder> pending Akash's actual service-area confirmation —
 *   see the `serviceAreas` comment in content.ts) — they're just
 *   inside the accordion now instead of always-visible.
 *
 * Desktop: two-column layout, content/actions on the left
 * (`lg:col-span-3`) and the map + accordion on the right
 * (`lg:col-span-2`), per the spec's shared build rule to graduate to a
 * content-left/map-right layout at the tablet/desktop breakpoint. On
 * mobile these are the same two stacked `<div>`s in source order, so
 * the sequence is exactly the spec's recommended one: heading -> address
 * & hours -> actions -> map -> accordion.
 */
export function LocationMapSection() {
  const openHours = hours.find((h) => h.time !== "Closed");

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
        Visit our {practice.neighborhood} office
      </p>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
        Proudly serving {practice.neighborhood} &amp; nearby Seattle
      </h2>
      <p className="text-espresso/70 mb-10 max-w-2xl">
        Easy to reach whether you&apos;re coming from home, work, or school.
      </p>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-3">
          <div className="rounded-2xl bg-sand/40 border border-sand p-6">
            <div className="flex items-start gap-3">
              <MapPinIcon className="shrink-0 mt-1 text-terracotta" />
              <p className="font-medium text-espresso">{contact.address}</p>
            </div>
            {openHours && (
              <div className="flex items-start gap-3 mt-3">
                <ClockIcon className="shrink-0 mt-1 text-terracotta" />
                <p className="text-sm text-espresso/70">
                  {openHours.days} &middot; {openHours.time}
                </p>
              </div>
            )}

            <a
              href="/contact"
              className="tap-target mt-5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-4 py-3.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
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
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border border-sand">
            <iframe
              src={contact.mapEmbedSrc}
              title={`Map showing ${practice.name}'s location`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
              className="w-full h-52 sm:h-56 border-0"
            />
          </div>

          <div className="rounded-2xl border border-sand divide-y divide-sand overflow-hidden">
            <AccordionRow title="Parking & entrance">
              <p className="text-sm text-espresso/70">{contact.parkingNote}</p>
            </AccordionRow>
            <AccordionRow title="Neighborhoods served">
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
            </AccordionRow>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Local accordion row shell for the two arrival-detail rows above —
 * plain-language title stays visible, detail expands independently
 * (Option 9's "accordions open independently" rule, so opening one
 * doesn't collapse the other). Not extracted to its own file since it's
 * only used here; ExpandCard.tsx exists but is styled dark for the
 * TrustBlock differentiator cards, which doesn't fit this section's
 * light warm-ivory/sand surface.
 */
function AccordionRow({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="bg-warm-ivory">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="tap-target flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="font-medium text-espresso">{title}</span>
        <ChevronDownIcon
          className={`shrink-0 text-espresso/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
