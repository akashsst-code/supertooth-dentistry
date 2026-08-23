import Image from "next/image";
import { BadgeIcon, ClockIcon, CrownIcon, ShieldCheckIcon } from "./icons";
import { OfficeCarousel } from "./OfficeCarousel";
import { Placeholder } from "./Placeholder";
import { archana, credentials, differentiators, officeBlurb } from "@/lib/content";

/**
 * Icon per differentiator, keyed by array position rather than added to
 * content.ts — icon choice is a presentation concern, not practice
 * content (docs/supertooth-build-principles.md Section 2, "content is
 * separable from presentation"). Order matches the locked
 * differentiators order in content.ts: same-day appointments, same-day
 * crowns, in-network.
 */
const differentiatorIcons = [ClockIcon, CrownIcon, ShieldCheckIcon];

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 text-xs font-medium text-espresso">
      {children}
    </span>
  );
}

/**
 * Differentiators row — icon-left row cards (icon beside title/detail,
 * not stacked above it) rather than a denser multi-column grid. Akash
 * preferred keeping the roomy full-width stacked cards over a compact
 * 2-up grid, so the row layout does the space-saving work instead: same
 * padding-driven roominess, but the icon no longer adds its own line of
 * height.
 *
 * Extracted as its own component (2026-08-23) so it can be composed in
 * different homepage orderings — e.g. src/app/home-alt-order — without
 * duplicating markup. Default export order below is unchanged/locked.
 */
export function Differentiators() {
  return (
    <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
      {differentiators.map((d, i) => {
        const Icon = differentiatorIcons[i];
        return (
          <div
            key={d.title}
            className="rounded-2xl bg-warm-ivory p-5 border border-sand flex items-start gap-4"
          >
            <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Icon />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-espresso mb-1">{d.title}</h3>
              <p className="text-sm text-espresso/70">{d.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Compact variant of the differentiators row — single-line icon+label
 * strip instead of the full bordered/padded cards above. Built for
 * src/app/home-alt-order, where Akash asked for "a compressed visually
 * appealing section for the 3 things" directly under the hero rather
 * than the roomier card treatment `Differentiators` uses in the locked
 * homepage. Not used by the locked `TrustBlock` — that keeps the
 * original full-card `Differentiators` unchanged.
 */
export function CompactDifferentiators() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-warm-ivory border border-sand px-4 sm:px-2 py-4 sm:py-3 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sand">
      {differentiators.map((d, i) => {
        const Icon = differentiatorIcons[i];
        return (
          <div
            key={d.title}
            className="flex items-center gap-3 py-3 sm:py-0 sm:px-4 first:pt-0 last:pb-0"
          >
            <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Icon />
            </span>
            <span className="font-display text-sm font-semibold text-espresso leading-tight">
              {d.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Dr. Archana — real bio content landed 2026-08-23 (see content.ts).
 * Second pass, per Akash: the first version's small 96px circular
 * thumbnail undersold the trust this section exists to build — "people
 * trust images more" — so the photo now runs large (a real candid shot,
 * not a posed studio headshot), full-bleed edge-to-edge on mobile at
 * roughly half the section's height, echoing the image-forward "Meet Dr.
 * Archana Dubey" reference layout. Bio copy also expanded from a single
 * trimmed sentence back to the fuller bio (passion/practicing-since
 * story, full specialty list, pull-quote, certifications line) — more
 * text than the original "mobile-minimal" pass, but still one scroll's
 * worth on a phone, and each line earns its place as a distinct trust
 * signal rather than padding.
 *
 * Training/affiliation badges live inside this bio card rather than a
 * separate section further down the page — "bring archana's training
 * affiliations along with her bio space" (Akash). Extracted as its own
 * component (2026-08-23) for reuse in alternate homepage orderings.
 */
export function ArchanaBio() {
  return (
    <div className="max-w-3xl mx-auto rounded-3xl bg-warm-ivory border border-sand overflow-hidden sm:flex sm:items-stretch">
      <div className="relative aspect-[4/5] sm:aspect-auto sm:w-2/5 sm:shrink-0">
        <Image
          src={archana.photo}
          alt="Dr. Archana Dubey, DDS, MDS, at an American Dental Association event"
          fill
          sizes="(min-width: 640px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-6 sm:p-8 text-center sm:text-left">
        <p className="text-xs font-semibold tracking-wide uppercase text-terracotta">
          Meet Dr. Archana Dubey
        </p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-espresso leading-tight">
          {archana.tagline}
        </h3>
        <p className="mt-4 text-sm italic text-espresso/80">&ldquo;{archana.quote}&rdquo;</p>
        <p className="mt-4 text-sm text-espresso/70">{archana.bio}</p>
        <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
          {archana.badges.map((badge) => (
            <TrustBadge key={badge}>{badge}</TrustBadge>
          ))}
        </div>
        <p className="mt-4 text-xs text-espresso/50">{archana.certifications}</p>

        {/* Training & affiliations — kept with the bio, not a separate
            section (see the top-of-file comment). Real org names not
            yet confirmed, so every entry renders through <Placeholder>. */}
        <div className="mt-5 pt-5 border-t border-sand">
          <p className="text-xs font-semibold uppercase tracking-wide text-espresso/60 mb-3">
            Training &amp; affiliations
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {credentials.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-espresso"
              >
                <BadgeIcon className="shrink-0 text-terracotta" />
                <Placeholder>{c}</Placeholder>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Office photos + one-line "about our office" blurb. Extracted as its
 * own component (2026-08-23) for reuse in alternate homepage orderings.
 */
export function OfficeShowcase() {
  return (
    <div>
      <OfficeCarousel />
      <p className="mt-6 max-w-2xl mx-auto text-center text-espresso/70">{officeBlurb}</p>
    </div>
  );
}

/**
 * Trust block — locked in docs/supertooth-ux-flow.md Section 2, ordered
 * before the insurance/offer block ("trust-first, offer as reinforcement"
 * — leading with the price offer risks reading as a discount clinic for
 * the routine/proactive primary persona).
 *
 * Internal order (differentiators -> Archana -> office photos -> office
 * blurb) trimmed per Akash's explicit call on the post-office-scroll
 * homepage flow: the flow through the office carousel stays as-is, but
 * the Google-reviews card and the "Meet the team" grid that used to sit
 * below it are gone from here — reviews moved into the new, more visual
 * TestimonialsSection (see page.tsx), and team is dropped entirely from
 * the homepage (still kept in content.ts for a future dedicated /about
 * page, not deleted).
 *
 * This is the LOCKED default order. See src/app/home-alt-order/page.tsx
 * for an alternative ordering (office -> Archana, instead of Archana ->
 * office) built from the same three sub-components above, for review
 * before any change to this locked order.
 */
export function TrustBlock() {
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-8 sm:mb-16">
          <Differentiators />
        </div>
        <div className="mb-16">
          <ArchanaBio />
        </div>
        <OfficeShowcase />
      </div>
    </section>
  );
}
