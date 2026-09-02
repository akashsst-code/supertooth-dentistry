import Image from "next/image";
import { ClockIcon, CrownIcon, SparkleIcon, ToothIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { services } from "@/lib/content";

const cardIcons = [ClockIcon, CrownIcon, SparkleIcon, ToothIcon];

/**
 * Services teaser — positioned after Testimonials. Cards kept from the
 * uniform-tile round (every photo shares one `aspect-[4/3]` box with
 * `object-cover`, so sizing is uniform regardless of the source image's
 * own proportions — see content.ts for the photo swap and the `real`
 * flag rationale for cosmetic/restorative).
 *
 * The connecting thread moved from a left-side gutter to straight down
 * the horizontal center (Akash: tiles should sit centered on screen,
 * not shifted right to make room for a side gutter — the line can run
 * over the photo instead). It's one continuous line behind the stack,
 * `z-10` so it paints over each photo rather than being clipped by that
 * photo's own `overflow-hidden` card, with a node dot straddling the
 * top edge of every card.
 *
 * Still exactly 4 items, no links (no click-throughs for now).
 */
export function ServicesSection() {
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
          What we treat
        </h2>
        <p className="text-espresso/70 mb-10 sm:mb-12 max-w-2xl">
          General, cosmetic, and restorative care — under one roof, close to home.
        </p>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 z-10 w-px -translate-x-1/2 bg-warm-ivory shadow-[0_0_5px_1px_rgba(61,50,38,0.25)]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-10 sm:gap-14">
            {services.map((s, i) => {
              const Icon = cardIcons[i] ?? ClockIcon;
              return (
                <div key={s.title} className="relative">
                  <span
                    className="absolute left-1/2 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-terracotta bg-warm-ivory"
                    aria-hidden="true"
                  />
                  <div className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-warm-ivory shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-terracotta/10">
                      {s.image ? (
                        <Image
                          src={s.image.src}
                          alt={s.image.alt}
                          fill
                          sizes="(min-width: 640px) 40rem, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ClockIcon className="h-16 w-16 text-terracotta" />
                        </div>
                      )}
                      <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-warm-ivory/90 text-terracotta-dark shadow-sm backdrop-blur-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-espresso mb-1.5">
                        {s.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-espresso/70">
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
