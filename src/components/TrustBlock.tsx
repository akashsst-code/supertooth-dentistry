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

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleGIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.5 12.23c0-.82-.07-1.42-.22-2.04H12v3.7h6.02c-.12 1-.78 2.5-2.24 3.52l-.02.14 3.25 2.5.23.02c2.06-1.9 3.26-4.7 3.26-7.84z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.94 0 5.4-.96 7.2-2.6l-3.43-2.65c-.92.63-2.15 1.07-3.77 1.07-2.88 0-5.32-1.9-6.19-4.53l-.13.01-3.38 2.6-.04.12C4.24 20.5 7.84 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.81 14.29a6.9 6.9 0 010-4.58l-.01-.14-3.42-2.65-.11.05a11 11 0 000 10.06l3.54-2.74z"
      />
      <path
        fill="#EA4335"
        d="M12 5.18c2.05 0 3.43.88 4.22 1.62l3.08-3a10.6 10.6 0 00-7.3-2.8c-4.16 0-7.76 2.5-9.43 6.14l3.54 2.74C6.68 7.08 9.12 5.18 12 5.18z"
      />
    </svg>
  );
}
