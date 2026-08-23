import Image from "next/image";
import { ClockIcon, CrownIcon, ShieldCheckIcon } from "./icons";
import { OfficeCarousel } from "./OfficeCarousel";
import { Placeholder } from "./Placeholder";
import { differentiators, officeBlurb } from "@/lib/content";

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
 * Internal order (differentiators -> Archana -> office photos -> office
 * blurb) trimmed per Akash's explicit call on the post-office-scroll
 * homepage flow: the flow through the office carousel stays as-is, but
 * the Google-reviews card and the "Meet the team" grid that used to sit
 * below it are gone from here — reviews moved into the new, more visual
 * TestimonialsSection (see page.tsx), and team is dropped entirely from
 * the homepage (still kept in content.ts for a future dedicated /about
 * page, not deleted). A one-line "about our office" blurb was added
 * right under the carousel per the same conversation.
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

        {/* Dr. Archana */}
        <div className="max-w-xl mx-auto rounded-2xl bg-warm-ivory p-8 border border-sand mb-16">
          <div className="flex gap-6 items-start">
            <Image
              src="/team/archana.webp"
              alt="Dr. Archana, DDS"
              width={96}
              height={96}
              className="shrink-0 h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h3 className="font-display text-xl font-semibold text-espresso">Meet Dr. Archana</h3>
              <p className="mt-2 text-sm text-espresso/70">
                <Placeholder>Credentials, years of experience, background story</Placeholder>
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <TrustBadge>Accepting new patients</TrustBadge>
            <TrustBadge>In-network with most insurance</TrustBadge>
          </div>
        </div>

        {/* Office photos — real photography, right after Archana */}
        <div>
          <OfficeCarousel />
        </div>

        {/* Brief "about our office" blurb, directly under the carousel */}
        <p className="mt-6 max-w-2xl mx-auto text-center text-espresso/70">{officeBlurb}</p>
      </div>
    </section>
  );
}
