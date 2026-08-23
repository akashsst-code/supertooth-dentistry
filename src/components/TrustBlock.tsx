import Image from "next/image";
import { Placeholder } from "./Placeholder";
import { differentiators, reviews, team } from "@/lib/content";

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
        {/* Differentiators */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {differentiators.map((d) => (
            <div key={d.title} className="rounded-2xl bg-warm-ivory p-6 border border-sand">
              <h3 className="font-display text-lg font-semibold text-espresso mb-2">{d.title}</h3>
              <p className="text-sm text-espresso/70">{d.detail}</p>
            </div>
          ))}
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
            <div className="flex items-center gap-2 text-terracotta font-semibold text-lg">
              <StarIcon /> <Placeholder>{reviews.rating}</Placeholder> on Google
            </div>
            <p className="mt-1 text-sm text-espresso/70">
              <Placeholder>{reviews.count} reviews</Placeholder> — verify against live Google
              Business Profile before launch
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

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
