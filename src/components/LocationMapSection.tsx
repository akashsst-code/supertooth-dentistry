import { CalendarIcon, ClockIcon, MapPinIcon, PhoneIcon, PinDotIcon } from "./icons";
import { contact, hours, practice, serviceAreas } from "@/lib/content";
import { Accent, Body, Eyebrow, SectionHeading } from "./editorial";

/**
 * Map + "areas we serve" — positioned after Services per Akash's locked
 * homepage-flow order, modeled on smilemakersfortworth.com's
 * map-plus-neighborhood-list pattern near the bottom of their homepage.
 * Uses contact.mapEmbedSrc — Google's own lightweight "Embed a map"
 * output for the practice's actual Business Profile listing (no API
 * key/billing needed) — same embed as HeroAddressMap, see the comment
 * there for why (native place card on marker click, no "open in Maps
 * app" chip, lighter than the informal `?q=...&output=embed` trick this
 * replaced). The full neighborhood list — `practice.neighborhood` plus
 * Magnolia/Belltown/South Lake Union/Fremont/Ballard — is confirmed
 * accurate by Akash (2026-09-02, see content.ts serviceAreas comment).
 *
 * Map stays first (left, `lg:col-span-3`) per Akash's call to keep the
 * map as the section's lead visual rather than the actions-first layout
 * tried in an earlier pass.
 *
 * The info tile (right, `lg:col-span-2`) is organized as three
 * plain-language groups, each divided by a hairline, top to bottom:
 * identity (address, parking note, hours), actions (Book Appointment +
 * Call, inline), areas (neighborhood chips) — a fixed scan order rather
 * than one long paragraph-and-list block. Tightened three times on
 * 2026-09-02 per Akash's "compress, remove space" calls: card padding
 * down to `p-4` (16px), hairline/label margins and icon-row gaps down
 * another step each pass, button height trimmed to `py-2.5` (still
 * ≥44px via the `tap-target` class's own `min-height`, so touch-target
 * compliance doesn't depend on the padding). The real culprit behind
 * the persistent extra space wasn't any of those Tailwind margins
 * though — it was globals.css's `p { margin-bottom: 2em }` (WCAG 2.2
 * SC 1.4.12 paragraph spacing), which sits outside any `@layer` and so
 * beats every Tailwind margin utility on a `<p>` regardless of value.
 * Every address/hours/label line here was a `<p>`, so each one was
 * silently getting a ~34px bottom margin no matter what `mb-*`/`my-*`
 * said. Fixed by switching these one-line data/label rows to `<span
 * className="block">`, same as BookingBlock.tsx already does for its
 * own address/hours rows — they're short UI labels, not prose
 * paragraphs, so the WCAG rule (still fully intact for genuine
 * body-copy `<p>`s elsewhere) was never meant to apply to them. The
 * standalone "Directions" button
 * was dropped too (Book Appointment + Call now sit inline as the one
 * action row) — the map above is already real, on-page, and one tap
 * from a native maps app via its own "Open in Maps" control, so a
 * second, separate Directions control was redundant.
 *
 * Neighborhood chips: previously the unconfirmed ones (everything but
 * `practice.neighborhood`) rendered through <Placeholder> — bracket
 * notation + dashed underline — which read as broken/unstyled inside a
 * pill (Akash's exact "looks unappealing, like broken links" call on
 * InsuranceExpandCard.tsx's carrier grid, now repeated here). Every chip
 * already rendered with identical, uniform styling before confirmation
 * landed, and now that the full list is confirmed (2026-09-02) that
 * styling is simply correct rather than a workaround. The plain-text
 * line under the list ("don't see your area? call us") stays regardless
 * — it's a genuine invitation for areas outside the confirmed six, not
 * a leftover unconfirmed-claims disclaimer.
 */
export function LocationMapSection() {
  const openHours = hours.find((h) => h.time !== "Closed");

  return (
    <section className="bg-warm-ivory">
      <div className="mx-auto w-full max-w-[480px] px-6 pb-16 pt-11 md:max-w-[1320px] md:px-10 md:pb-24 md:pt-16 lg:px-16">
      <Eyebrow>Find us</Eyebrow>
      <SectionHeading>
        Proudly serving {practice.neighborhood} &amp; nearby <Accent>Seattle</Accent>.
      </SectionHeading>
      <Body className="mt-4 mb-10! max-w-2xl">
        Easy to reach whether you&apos;re coming from home, work, or school.
      </Body>

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

        <div className="lg:col-span-2 rounded-2xl bg-sand/40 border border-sand p-4">
          <div className="flex items-start gap-2">
            <MapPinIcon className="shrink-0 mt-0.5 text-terracotta" />
            <div>
              <span className="block font-medium text-espresso">{contact.address}</span>
              <span className="block mt-0.5 text-sm text-espresso/70">{contact.parkingNote}</span>
            </div>
          </div>
          {openHours && (
            <div className="flex items-start gap-2 mt-1.5">
              <ClockIcon className="shrink-0 mt-0.5 text-terracotta" />
              <span className="block text-sm text-espresso/70">
                {openHours.days} &middot; {openHours.time}
              </span>
            </div>
          )}

          <div className="my-3 border-t border-sand" />

          <div className="flex gap-2">
            <a
              href="/contact"
              className="tap-target grow shrink-0 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-4 py-2.5 text-sm font-medium text-warm-ivory hover:brightness-110 transition"
            >
              <CalendarIcon />
              Book Appointment
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target shrink-0 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-espresso/15 px-4 py-2.5 text-sm font-medium text-espresso hover:border-terracotta/50 hover:text-terracotta-dark transition-colors"
            >
              <PhoneIcon />
              Call
            </a>
          </div>

          <div className="my-3 border-t border-sand" />

          <span className="block text-xs font-medium uppercase tracking-wide text-espresso/70 mb-1.5">
            Also welcoming patients from
          </span>
          <ul className="flex flex-wrap gap-1.5">
            {serviceAreas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1 rounded-full bg-warm-ivory border border-sand px-2.5 py-1 text-sm text-espresso"
              >
                <PinDotIcon className="shrink-0 text-terracotta" />
                {area}
              </li>
            ))}
          </ul>
          <span className="block mt-1.5 text-xs text-espresso/70">
            Don&apos;t see your area? Call us — we&apos;re happy to help.
          </span>
        </div>
      </div>
    </div>
    </section>
  );
}
