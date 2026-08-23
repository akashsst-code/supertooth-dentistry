import { GoogleGIcon, QuoteIcon, StarIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { reviews, testimonials } from "@/lib/content";

/**
 * "What patients are saying" — new section, positioned right after the
 * office blurb per Akash's locked homepage-flow order. Replaces the old
 * bare Google-reviews card that used to live in TrustBlock: the rating/
 * count strip moved here as the section header, backed by a row of
 * quote cards for a livelier, less clinical feel — modeled on
 * smilemakersfortworth.com's dark testimonial-card treatment (Akash: "a
 * little more fun"), built with the locked espresso/terracotta palette
 * rather than a new color.
 *
 * Quote text/names are structural placeholders, not invented — real
 * patient testimonials require an actual source (Google Business
 * Profile) per the HIPAA / no-unverifiable-claims rule in
 * docs/supertooth-webflow-build-spec.md Section 7. Swap content.ts's
 * `testimonials` for real first-name + last-initial reviews once
 * Akash supplies them; layout doesn't need to change.
 */
export function TestimonialsSection() {
  return (
    <section className="bg-espresso text-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">What patients are saying</h2>
          <div className="flex items-center gap-2 text-warm-ivory/70 text-sm font-medium">
            <GoogleGIcon />
            <span className="flex gap-0.5 text-terracotta">
              <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
            </span>
            <span className="font-display text-base font-semibold text-warm-ivory">
              <Placeholder tone="dark">{reviews.rating}</Placeholder>
            </span>
            <span>
              (<Placeholder tone="dark">{reviews.count} reviews</Placeholder>)
            </span>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85%] sm:w-auto rounded-2xl bg-warm-ivory/10 border border-warm-ivory/15 p-6 flex flex-col"
            >
              <QuoteIcon className="text-terracotta mb-3" />
              <p className="text-warm-ivory/90 text-sm flex-1">
                <Placeholder tone="dark">{t.quote}</Placeholder>
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium text-warm-ivory">
                  <Placeholder tone="dark">{t.name}</Placeholder>
                </span>
                <span className="flex gap-0.5 text-terracotta">
                  <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm font-medium text-terracotta">
          <Placeholder tone="dark">Read our reviews on Google →</Placeholder>
        </p>
      </div>
    </section>
  );
}
