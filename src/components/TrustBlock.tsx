import Image from "next/image";
import { ClockIcon, CrownIcon, GoogleGIcon, ShieldCheckIcon, StarIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { differentiators, reviews, team } from "@/lib/content";

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
 * Team/office photography does not exist yet (tracked as a launch-blocking
 * content item, not a design decision, per the same doc) — photo slots are
 * placeholder tiles, not stock imagery, since stock would undermine the
 * "real, legitimate practice" trust signal this section exists to create.
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

        {/* Dr. Archana + reviews */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="rounded-2xl bg-warm-ivory p-8 border border-sand">
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

          <div className="rounded-2xl bg-warm-ivory p-8 border border-sand">
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
        </div>

        {/* Team grid */}
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

        {/* Office photos */}
        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold text-espresso mb-6">Our office</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-4/3 rounded-2xl bg-sand flex items-center justify-center text-xs text-espresso/60"
              >
                <Placeholder>office photo {i}</Placeholder>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
