import Image from "next/image";
import { ClockIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { services } from "@/lib/content";

/**
 * Services teaser — positioned after Testimonials. Rebuilt again per
 * this round of feedback: real marketing photography (before/after
 * shots Akash supplied — see content.ts) now stands in for the earlier
 * icon-tile placeholders on 3 of the 4 cards, full-width photo above
 * compact text below. No photo exists yet for "General & preventive
 * care" (a temporary Unsplash stand-in fills that gap — see content.ts),
 * so that one still gets a fixed `aspect-[4/5]` `object-cover` treatment,
 * same as the icon-tile fallback below it — both are plain photos/icons
 * with no fixed aspect of their own, so cropping to a set ratio is safe.
 *
 * The 3 real photos are different: they carry their own `width`/`height`
 * (see content.ts) because they're pre-cropped to a specific before/after
 * framing — forcing those into the same `aspect-[4/5]` box either cut
 * the photos off or squeezed a whole poster into a small tile ("elongated
 * / doesn't look natural" — Akash). Rendering `image.width`/`image.height`
 * lets each of those 3 keep its own natural aspect ratio instead.
 *
 * Still: exactly 4 items, no links (no click-throughs for now), and the
 * vertical connecting thread + node dot down the stack from the prior
 * pass.
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
            {services.map((s) => (
              <div key={s.title} className="relative pl-10 sm:pl-16">
                <span
                  className="absolute left-4 sm:left-6 top-4 -translate-x-1/2 h-3 w-3 rounded-full bg-terracotta"
                  aria-hidden="true"
                />
                <div className="rounded-2xl overflow-hidden border border-sand bg-warm-ivory">
                  {s.image && s.image.width && s.image.height ? (
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      width={s.image.width}
                      height={s.image.height}
                      sizes="(min-width: 640px) 40rem, 100vw"
                      className="w-full h-auto"
                    />
                  ) : s.image ? (
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes="(min-width: 640px) 40rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center bg-terracotta/10">
                      <ClockIcon className="h-16 w-16 sm:h-20 sm:w-20 text-terracotta" />
                    </div>
                  )}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
