import Image from "next/image";
import Link from "next/link";
import { AlignerIcon, CrownIcon, MedicalCrossIcon, SparkleIcon, SyringeIcon, ToothIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { services, servicesEmergencyShortcut } from "@/lib/content";
import { Accent, Body, Eyebrow, SectionHeading, shellWide } from "./editorial";

// One per category, in the order content.ts declares them: a checkup, a
// repair, a cosmetic change, straightening, jaw pain. The last one also
// does double duty as that card's image fallback — it is the only
// category with no photograph yet.
const cardIcons = [ToothIcon, CrownIcon, SparkleIcon, AlignerIcon, SyringeIcon];

// Horizontal offset (px from center) of the connector segment in each
// gap between cards — one entry per gap, so services.length - 1 values.
// Deliberately not all 0: a single straight line down the center is the
// thing Akash asked off of. Small enough that it never comes close to
// a card's own edge at the narrowest (375px) viewport.
const connectorOffsets = [-22, 18, -14, 20];

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
 * line-through-the-image treatment. Each gap gets its own short line
 * segment (no end dots — plain lines only) instead of one continuous
 * line, offset by a different `connectorOffsets` value per gap so the
 * path zigzags down the page rather than reading as one straight line.
 *
 * Four categories, rebuilt 2026-09-03 for backlog items 65 and 66: each
 * card now carries the patient-language title, the clinical term as a
 * subtitle, the sub-services it covers, and its own Schedule action —
 * plus an emergency shortcut below the stack rather than a fifth card.
 * See content.ts for the taxonomy decision and its sourcing.
 */
export function ServicesSection({
  // "editorial" adapts this to the homepage variation's type system and
  // section rhythm. /services renders the default and is unchanged.
  variant = "default",
}: {
  variant?: "default" | "editorial";
} = {}) {
  const editorial = variant === "editorial";
  return (
    <section className={editorial ? "bg-sand" : "bg-sand/40"}>
      <div
        className={
          editorial
            ? shellWide
            : "mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24"
        }
      >
        {/* Editorial variant uses the shared section opening — eyebrow,
            heading with one serif accent word, body — rather than a bare
            <h2>. Sections 2 and 3 already opened this way and the ones
            below them didn't, which is the inconsistency Akash flagged.
            /services keeps the default heading untouched. */}
        {editorial ? (
          <>
            <Eyebrow>Our services</Eyebrow>
            <SectionHeading>
              What we <Accent>treat</Accent>.
            </SectionHeading>
            <Body className="mt-4 mb-10! max-w-2xl">
              Four doors in: a checkup, a repair, a change to how your smile looks, or
              straightening. Not sure which is yours? Start with a checkup.
            </Body>
          </>
        ) : (
          <>
            <h2 className="mb-2 font-display text-2xl font-semibold text-espresso sm:text-3xl">
              What we treat
            </h2>
            <p className="text-espresso/70 mb-10 sm:mb-12 max-w-2xl">
              Four doors in: a checkup, a repair, a change to how your smile looks, or
              straightening. Not sure which is yours? Start with a checkup.
            </p>
          </>
        )}

        {/* Same reading measure as the FAQ list, left-aligned. The
            editorial variant's container is now full width so its
            heading shares the page's left spine; the card stack keeps
            its own narrower measure. /services is unaffected — its own
            container is already max-w-3xl. */}
        <div className={`flex flex-col ${editorial ? "md:max-w-3xl" : ""}`}>
          {services.map((s, i) => {
            const Icon = cardIcons[i] ?? ToothIcon;
            return (
              <div key={s.title}>
                {i > 0 && (
                  <div className="relative h-7 sm:h-14" aria-hidden="true">
                    <span
                      className="absolute top-0 bottom-0 w-px bg-espresso/15"
                      style={{ left: `calc(50% + ${connectorOffsets[i - 1]}px)` }}
                    />
                  </div>
                )}
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-warm-ivory shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  {/* 16:10 on a phone, 4:3 from sm up. The uniform-tile
                      rule from Akash's 2026-09-01 round is about every
                      card being the SAME size, and it still holds — but
                      each card now carries a clinical subtitle, its
                      sub-services and its own action, and at 375px four
                      4:3 photos plus that content ran the section to
                      3.97 screens. The shorter mobile crop buys a
                      quarter-screen back without touching the ratio the
                      cards were reviewed at on desktop. */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-terracotta/10 sm:aspect-[4/3]">
                    {s.image ? (
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes="(min-width: 640px) 40rem, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Falls back to the card's OWN icon rather than a
                         hardcoded clock — with a real category using this
                         path now, a stock clock on the jaw-pain card
                         would read as a mistake rather than a placeholder. */
                      <div className="flex h-full items-center justify-center">
                        <Icon className="h-16 w-16 text-terracotta" />
                      </div>
                    )}
                    {/* The badge exists to sit ON a photograph. On the
                        one card with no photo the tile already renders
                        the same icon at 64px, so the badge would just be
                        the same mark twice in one box. */}
                    {s.image && (
                      <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-warm-ivory/90 text-terracotta-dark shadow-sm backdrop-blur-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className={`mb-1 text-espresso ${editorial ? "font-editorial text-xl font-medium tracking-[-0.02em]" : "font-display text-lg sm:text-xl font-semibold"}`}>
                      {s.title}
                    </h3>
                    {/* The clinical term as a subtitle rather than the
                        heading — blueprint v2 §6's rule, and backlog item
                        66's "no internal terminology left unexplained".
                        The patient word is what gets found; the clinical
                        one is what makes it credible and searchable. */}
                    {/* Not the uppercase/tracked eyebrow treatment: that
                        is the section-label signal in this type system,
                        and reusing it per card both duplicates the signal
                        and wraps to two heavy lines at 375px. Plain case,
                        smaller, muted — a subtitle, not a second label. */}
                    {/* mb-0! everywhere below, not mb-2/mb-3: globals.css
                        sets an unlayered `p { margin-bottom: 2em }` that
                        outranks Tailwind's layered utilities, and with
                        four stacked paragraphs in one card it opened
                        ~32px of dead space between every line. Spacing is
                        controlled with mt-* only. Same trap EditorialHero
                        documents. */}
                    <p className="mt-1 mb-0! text-[13px] font-medium text-espresso/45">{s.clinical}</p>
                    <p className="mt-3 mb-0! text-[15px] leading-relaxed text-espresso/70">
                      {s.real ? s.detail : <Placeholder>{s.detail}</Placeholder>}
                    </p>
                    {/* Sub-services as one wrapped line, not chips or a
                        bulleted list: at 375px a chip row for four items
                        is three rows of boxes, and this is a scanning
                        aid under a paragraph, not a navigation surface. */}
                    <p className="mt-3 mb-0! text-[13px] leading-relaxed text-espresso/55">
                      {s.includes.join(" · ")}
                    </p>
                    {/* Item 66: a scheduling path from the thing that
                        convinced you, rather than a scroll back to the
                        header. Deliberately a quiet text action, not a
                        filled button — four terracotta buttons in one
                        column would compete with the page's single
                        primary booking ask. min-h-44px and -ml-1/px-1
                        keep the real tap target at the locked floor
                        without visually indenting the label. */}
                    <Link
                      href="/contact"
                      aria-label={`Schedule a visit for ${s.title.toLowerCase()}`}
                      className="mt-3 -ml-1 inline-flex min-h-[44px] w-fit items-center gap-1.5 px-1 text-sm font-medium text-terracotta-dark underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso/40"
                    >
                      Schedule
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The emergency shortcut, deliberately BELOW the categories and
            not among them: /emergency is the single source for urgent
            guidance (item 7), and a fifth card would duplicate
            safety-critical content in a second place that then drifts.
            Blueprint v2's services-overview spec asks for exactly this —
            a shortcut on this surface, not a category. */}
        <p
          className={`mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-espresso/70 ${editorial ? "md:max-w-3xl" : ""}`}
        >
          <MedicalCrossIcon className="h-4 w-4 shrink-0 text-terracotta-dark" />
          {servicesEmergencyShortcut.text}{" "}
          <Link
            href={servicesEmergencyShortcut.href}
            className="inline-flex min-h-[44px] items-center font-medium text-terracotta-dark underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso/40"
          >
            {servicesEmergencyShortcut.linkLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
