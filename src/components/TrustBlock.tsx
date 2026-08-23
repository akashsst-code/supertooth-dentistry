import Image from "next/image";
import { ClockIcon, CrownIcon, GoogleGIcon, ShieldCheckIcon, StarIcon } from "./icons";
import { OfficeCarousel } from "./OfficeCarousel";
import { Placeholder } from "./Placeholder";
import { archana, differentiators, reviews, team } from "@/lib/content";

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
 * Trust block — locked in docs/supertooth-ux-flow.md Section 2, ordered
 * before the insurance/offer block ("trust-first, offer as reinforcement"
 * — leading with the price offer risks reading as a discount clinic for
 * the routine/proactive primary persona).
 *
 * Internal order (Archana -> office photos -> reviews -> team) is Akash's
 * explicit call, not the doc's originally proposed Archana -> team ->
 * office -> reviews sequence: office photography is real content now (see
 * OfficeCarousel.tsx / content.ts officePhotos), so it moves up to sit
 * right after Archana; team is still placeholder-only and deferred lower
 * until real staff photos exist, rather than blocking on the doc's exact
 * proposed order.
 */
export function TrustBlock() {
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        {/*
         * Differentiators — icon-left row cards (icon beside title/detail,
         * not stacked above it) rather than a denser multi-column grid.
         * Akash preferred keeping the roomy full-width stacked cards over
         * a compact 2-up grid, so the row layout does the space-saving
         * work instead: same padding-driven roominess, but the icon no
         * longer adds its own line of height. Combined with tightening
         * the gap before the next section on mobile, Dr. Archana's card
         * now starts to show on the same screen instead of requiring a
         * full extra scroll.
         */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-16">
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
        <div className="max-w-3xl mx-auto rounded-3xl bg-warm-ivory border border-sand overflow-hidden mb-16 sm:flex sm:items-stretch">
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
          </div>
        </div>

        {/* Office photos — real photography, right after Archana */}
        <div className="mb-16">
          <OfficeCarousel />
        </div>

        {/* Reviews */}
        <div className="max-w-xl mx-auto rounded-2xl bg-warm-ivory p-8 border border-sand mb-16">
          <div className="flex items-center gap-2 text-espresso/60 text-sm font-medium">
            <GoogleGIcon /> Google Reviews
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex gap-0.5 text-terracotta">
              <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
            </div>
            <span className="font-display text-xl font-semibold text-espresso">
              <Placeholder>{reviews.rating}</Placeholder>
            </span>
          </div>
          <p className="mt-2 text-sm text-espresso/70">
            <Placeholder>{reviews.count} reviews</Placeholder> — verify against live Google
            Business Profile before launch
          </p>
          <p className="mt-3 text-sm font-medium text-terracotta">
            <Placeholder>Read our reviews on Google →</Placeholder>
          </p>
        </div>

        {/* Team grid — still placeholder photography, deferred to last */}
        <div>
          <h3 className="font-display text-xl font-semibold text-espresso mb-6">Meet the team</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className="rounded-2xl bg-warm-ivory p-6 border border-sand text-center">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="mx-auto h-20 w-20 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="mx-auto h-20 w-20 rounded-full bg-sand mb-4 flex items-center justify-center text-xs text-espresso/60">
                    {member.real ? "Photo" : <Placeholder>photo</Placeholder>}
                  </div>
                )}
                <p className="font-medium text-espresso">
                  {member.real ? member.name : <Placeholder>{member.name}</Placeholder>}
                </p>
                <p className="text-sm text-espresso/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
