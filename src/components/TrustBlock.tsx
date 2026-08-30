import Image from "next/image";
import { BadgeIcon } from "./icons";
import { BookingCtaRow, ExpandCard, InsuranceExpandCard } from "./InsuranceExpandCard";
import { OfficeCarousel } from "./OfficeCarousel";
import { Placeholder } from "./Placeholder";
import { archana, credentials, differentiators, officeBlurb } from "@/lib/content";

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 text-xs font-medium text-espresso">
      {children}
    </span>
  );
}

/**
 * Trust block — locked in docs/supertooth-ux-flow.md Section 2, ordered
 * before the insurance/offer block ("trust-first, offer as reinforcement"
 * — leading with the price offer risks reading as a discount clinic for
 * the routine/proactive primary persona).
 *
 * Internal order (differentiators -> office photos -> office blurb ->
 * Archana) — reversed from the earlier Archana-then-office order per
 * Akash's later explicit call ("move office scroll above bio"): office
 * photos now lead, right after the differentiators, with the "about our
 * office" blurb still directly under the carousel; Archana's bio card
 * comes after both. The Google-reviews card and the "Meet the team" grid
 * that used to sit below this section are gone from here — reviews moved
 * into the new, more visual TestimonialsSection (see page.tsx), and team
 * is dropped entirely from the homepage (still kept in content.ts for a
 * future dedicated /about page, not deleted).
 *
 * Dr. Archana's training/affiliation badges live inside her bio card
 * (below) rather than a separate section further down the page — "bring
 * archana's training affiliations along with her bio space" (Akash).
 */
export function TrustBlock() {
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        {/*
         * Differentiators — a single vertical fold-open list at every
         * breakpoint (Akash's explicit call, after comparing it against a
         * horizontal photo-card carousel): all 3 titles are visible with
         * zero interaction instead of 2 of them being a swipe away, which
         * matters more for the time-scarce/pain-driven visitors this
         * section exists for than the carousel's bigger up-front photo
         * did. Rows are collapsed icon+title+one-line-detail bars —
         * reusing the same accordion pattern already shipped for
         * FAQSection and the insurance card below — and only reveal their
         * real photo once expanded, alongside a longer note and the
         * shared "Book Appointment" CTA (see ExpandCard/BookingCtaRow in
         * InsuranceExpandCard.tsx).
         *
         * Card styling has gone through several rounds with Akash: a dark
         * espresso-panel pass (echoing Hero.tsx), back to a light
         * warm-ivory surface with a solid terracotta icon badge, then
         * crisper edges (a terracotta top bar, a stronger shadow, a
         * bordered +/- toggle). The icon badge itself is now a small
         * circular crop of each card's real photo instead of an abstract
         * clock/crown/shield glyph — Akash asked whether the generic
         * icons were even needed, and a real-photo badge fits "people
         * trust images more" better than a line icon (see the fuller
         * comment on ExpandCard).
         *
         * All 3 rows share the same tap-to-expand `ExpandCard` shell —
         * "Same-day appointments" and "Same-day crowns" used to be plain
         * non-interactive divs, which read as broken once they looked
         * identical to the (already tappable) insurance card next to
         * them. The "In-network" row still renders as InsuranceExpandCard
         * specifically for its carrier-grid expanded content.
         */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso text-center mb-4 sm:mb-5">
            Why Choose Us
          </h2>
          <div className="flex flex-col gap-2 sm:gap-3 max-w-2xl mx-auto">
            {differentiators.map((d) => {
              if (d.title === "In-network with most plans") {
                return <InsuranceExpandCard key={d.title} title={d.title} detail={d.detail} image={d.image} />;
              }
              return (
                <ExpandCard key={d.title} title={d.title} detail={d.detail} image={d.image}>
                  <p className="mb-0 text-sm text-espresso/70">{d.expandedNote}</p>
                  <BookingCtaRow />
                </ExpandCard>
              );
            })}
          </div>
        </div>

        {/* Office photos — real photography, now leads (moved above the
            bio per Akash's later "office scroll above bio" call) */}
        <div>
          <OfficeCarousel />
        </div>

        {/* Brief "about our office" blurb, directly under the carousel */}
        <p className="mt-6 max-w-2xl mx-auto text-center text-espresso/70">{officeBlurb}</p>

        {/*
         * Dr. Archana — real bio content landed 2026-08-23 (see content.ts).
         * Second pass, per Akash: the first version's small 96px circular
         * thumbnail undersold the trust this section exists to build —
         * "people trust images more" — so the photo now runs large (a real
         * candid shot, not a posed studio headshot), full-bleed edge-to-edge
         * on mobile at roughly half the section's height, echoing the
         * image-forward "Meet Dr. Archana Dubey" reference layout. Bio
         * copy also expanded from a single trimmed sentence back to the
         * fuller bio (passion/practicing-since story, full specialty list,
         * pull-quote, certifications line) — more text than the original
         * "mobile-minimal" pass, but still one scroll's worth on a phone,
         * and each line earns its place as a distinct trust signal rather
         * than padding.
         */}
        <div className="mt-16 max-w-3xl mx-auto rounded-3xl bg-warm-ivory border border-sand overflow-hidden sm:flex sm:items-stretch">
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
      </div>
    </section>
  );
}
