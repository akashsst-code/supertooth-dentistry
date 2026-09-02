import Image from "next/image";
import { ClockIcon, CrownIcon, SparkleIcon, ToothIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { services } from "@/lib/content";

const cardIcons = [ClockIcon, CrownIcon, SparkleIcon, ToothIcon];

// Horizontal offset (px from center) of the connector segment in each
// gap between cards — one entry per gap, so services.length - 1 values.
// Deliberately not all 0: a single straight line down the center is the
// thing Akash asked off of. Small enough that it never comes close to
// a card's own edge at the narrowest (375px) viewport.
const connectorOffsets = [-22, 18, -14];

/**
 * Services teaser — positioned after Testimonials. Cards kept from the
 * uniform-tile round (every photo shares one `aspect-[4/3]` box with
 * `object-cover`, so sizing is uniform regardless of the source image's
 * own proportions — see content.ts for the photo swap and the `real`
 * flag rationale for cosmetic/restorative), tiles centered on screen
 * (no side gutter).
 *
 * The connecting thread lives only in the gap *between* cards now —
 * Akash: nothing should sit on the photo itself, the previous round's
 * line-through-the-image treatment. Each gap gets its own short
 * connector (line + a dot at each end) instead of one continuous line,
 * offset by a different `connectorOffsets` value per gap so the path
 * zigzags down the page rather than reading as one straight line.
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

        <div className="flex flex-col">
          {services.map((s, i) => {
            const Icon = cardIcons[i] ?? ClockIcon;
            return (
              <div key={s.title}>
                {i > 0 && (
                  <div className="relative h-10 sm:h-14" aria-hidden="true">
                    <span
                      className="absolute top-0 bottom-0 w-px bg-espresso/15"
                      style={{ left: `calc(50% + ${connectorOffsets[i - 1]}px)` }}
                    />
                    <span
                      className="absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-terracotta bg-warm-ivory"
                      style={{ left: `calc(50% + ${connectorOffsets[i - 1]}px)` }}
                    />
                    <span
                      className="absolute bottom-0 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full border-[1.5px] border-terracotta bg-warm-ivory"
                      style={{ left: `calc(50% + ${connectorOffsets[i - 1]}px)` }}
                    />
                  </div>
                )}
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
    </section>
  );
}
