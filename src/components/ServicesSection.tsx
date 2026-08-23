import { ClockIcon, CrownIcon, ImplantIcon, SparkleIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { services } from "@/lib/content";

const serviceIcons = [ClockIcon, CrownIcon, SparkleIcon, ImplantIcon];

/**
 * Services teaser — positioned after Testimonials. Rebuilt from the
 * first pass per this round of feedback ("bring exact similar pattern
 * like [smilemakersfortworth.com] which had 4 big items with large
 * images in rectangular boundaries and connected lines... no click
 * throughs"):
 *
 * - Exactly 4 items (trimmed in content.ts), stacked as one column with
 *   a big image tile above compact title+description text — not a
 *   multi-column card grid.
 * - No links anywhere (dropped the earlier "Learn more" — /services
 *   doesn't exist in this repo yet, and this round asked for no
 *   click-throughs regardless: "keep within the site for now").
 * - A vertical thread connects the 4 items down the page — a single
 *   line behind the stack with a node dot at each card, matching the
 *   same connected-card language introduced in TestimonialsSection.
 * - "Pictures take half screen or almost that much on mobile, then some
 *   words" (Akash's general guideline, modeled on the reference site) —
 *   each image tile is ~50% of the mobile viewport height. No real
 *   per-service photography exists yet (and the site's real-photography-
 *   only rule for trust content, build-spec Section 8, means stock
 *   photos shouldn't stand in for it either), so the "image" is a large
 *   tinted icon tile rather than a photo — swap in real photography
 *   later without changing the layout.
 */
export function ServicesSection() {
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
          What we treat
        </h2>
        <p className="text-espresso/70 mb-12 max-w-2xl">
          General, cosmetic, and restorative care — under one roof, close to home.
        </p>

        <div className="relative">
          <div
            className="absolute left-4 sm:left-6 top-4 bottom-4 w-px bg-terracotta/30"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-10 sm:gap-14">
            {services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <div key={s.title} className="relative pl-10 sm:pl-16">
                  <span
                    className="absolute left-4 sm:left-6 top-4 -translate-x-1/2 h-3 w-3 rounded-full bg-terracotta"
                    aria-hidden="true"
                  />
                  <div className="rounded-2xl overflow-hidden border border-sand bg-warm-ivory">
                    <div className="flex h-[50vh] max-h-[26rem] sm:h-64 items-center justify-center bg-terracotta/10">
                      <Icon className="h-16 w-16 sm:h-20 sm:w-20 text-terracotta" />
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-espresso mb-2">
                        {s.title}
                      </h3>
                      <p className="text-espresso/70">
                        {s.real ? s.detail : <Placeholder>{s.detail}</Placeholder>}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
