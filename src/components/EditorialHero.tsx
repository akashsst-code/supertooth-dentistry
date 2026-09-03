import Link from "next/link";
import { editorialHero, reviews } from "@/lib/content";
import { HeroCarousel } from "./HeroCarousel";
import { GoogleGIcon, StarIcon } from "./icons";

/**
 * EditorialHero — homepage screen 1, built to
 * docs/supertooth-mobile-design-spec.md and to the reference composition
 * Akash supplied. Offered as a variation alongside the existing
 * photo-overlay Hero.tsx (which is untouched); only src/app/page.tsx
 * picks between them.
 *
 * The spec's structural rules, and where each is enforced below:
 *   - One headline, one support line, one action, one photograph.
 *   - Text NEVER sits on the photograph. This is the sharpest break
 *     from Hero.tsx, whose whole composition is copy over a scrim.
 *   - Separation comes from whitespace, not borders or cards.
 *   - Exactly one serif accent word in the headline.
 *
 * WHOLE COMPOSITION FITS ONE MOBILE SCREEN, photo included — Akash's
 * explicit call, and the thing the reference gets right. That is a
 * layout constraint, not a set of magic numbers: EditorialScreen sizes
 * the box to the real viewport, every copy element keeps its natural
 * height, and the photo frame below takes the remainder via `flex-1`.
 * So the gaps here stay fixed and readable while the photo absorbs the
 * difference between a 667px SE and a 932px Pro Max. Deliberately no
 * fixed aspect-ratio on mobile — that was what pushed the photo past
 * the fold before.
 *
 * Palette is ours, not the spec's or the reference's — both use a
 * forest green, and Akash's instruction was to keep the locked color
 * theme and borrow everything else. Each role maps onto an existing
 * token: canvas -> warm-ivory, ink -> espresso, ink-muted ->
 * espresso/70, forest (action + accent) -> terracotta-dark / terracotta.
 *
 * Contrast, computed against the real token values rather than assumed:
 * white on terracotta-dark is 5.62:1 (AA at any size) — note plain
 * terracotta would be 4.12:1 and fail for a 16px label, which is why the
 * button is flat terracotta-dark and not the terracotta gradient used
 * elsewhere on the site. The accent word is terracotta at 3.89:1, which
 * is AA for large text only and safe here solely because it renders at
 * 52px+; do not reuse that pairing at body size. Muted copy resolves to
 * #756E64 on ivory, 4.77:1.
 *
 * The Google rating line is an intentional, Akash-approved deviation:
 * the spec bans ratings from the opening view entirely (Sections 1 and
 * 8), but he asked for reviews to stay on screen 1. Kept to the spec's
 * "small metadata" role — one quiet line below the CTA, not a badge or
 * a logo block — so it reads as a footnote to the action rather than a
 * second focal point.
 */
export function EditorialHero() {
  return (
    <section className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-6 pt-14 md:max-w-[1320px] md:flex-none md:px-10 md:pb-24 md:pt-20 lg:px-16">
      <div className="md:grid md:flex-none md:grid-cols-[minmax(320px,0.85fr)_minmax(440px,1.15fr)] md:items-center md:gap-[clamp(4rem,8vw,8.75rem)] flex flex-1 flex-col">
        <div className="shrink-0">
          {/* clamp() per the spec's mobile type scale; leading/tracking
              are the spec's 0.94 / -0.045em. max-w keeps the line break
              falling after "made" at a 390px viewport without a <br>. */}
          <h1 className="max-w-[350px] font-editorial text-[clamp(3.25rem,14vw,4.25rem)] font-light leading-[0.94] tracking-[-0.045em] text-espresso">
            {editorialHero.headlineLead}{" "}
            <em className="font-editorial-serif text-[1.08em] font-normal italic tracking-[-0.035em] text-terracotta">
              {editorialHero.headlineAccent}
            </em>
            .
          </h1>

          {/* mb-0! (not mb-0): globals.css sets `p { margin-bottom: 2em }`
              unlayered, which outranks Tailwind's layered utilities and
              otherwise injects ~42px of dead space into this hero's
              carefully budgeted vertical rhythm. */}
          <p className="mt-6 mb-0! max-w-[330px] font-editorial text-xl font-light leading-[1.4] tracking-[-0.02em] text-espresso/70">
            {editorialHero.support}
          </p>

          <Link
            href="/contact"
            /* Deliberately not `.tap-target`: that helper sets a flat
               min-height:44px from unlayered CSS, which outranks a
               Tailwind min-h utility and was shrinking this button below
               the spec's 56–60px. 58px clears the 44px accessibility
               floor on its own, so the helper has nothing to add here. */
            className="mt-7 inline-flex min-h-[58px] items-center justify-center rounded-lg bg-terracotta-dark px-10 font-editorial text-base font-medium uppercase tracking-[0.1em] text-warm-ivory transition-[background-color,transform] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-espresso active:translate-y-px"
          >
            {editorialHero.cta}
          </Link>

          {/* Reviews — see the deviation note in the file header. Akash
              asked for the bare count in parentheses rather than a
              "from 427 Google reviews" sentence, which at this size read
              as a second line of copy competing with the support line.
              The visual row is aria-hidden and paired with an sr-only
              sentence: "4.9 (427)" is only meaningful next to the stars,
              so read aloud on its own it would be nonsense. */}
          <p className="mt-4 mb-0! flex items-center gap-2 font-editorial text-xs text-espresso/70">
            <span className="sr-only">
              Rated {reviews.rating} out of 5 from {reviews.count} Google reviews.
            </span>
            <span className="flex items-center gap-2" aria-hidden="true">
              <GoogleGIcon />
              <span className="flex gap-px text-terracotta">
                <StarIcon className="h-3 w-3" />
                <StarIcon className="h-3 w-3" />
                <StarIcon className="h-3 w-3" />
                <StarIcon className="h-3 w-3" />
                <StarIcon className="h-3 w-3" />
              </span>
              <span>
                <span className="font-medium text-espresso">{reviews.rating}</span> ({reviews.count}
                )
              </span>
            </span>
          </p>
        </div>

        {/* Mobile: `flex-1` + `min-h-0` is what keeps the photo on screen
            1 — it fills the leftover height rather than imposing an
            aspect-ratio the viewport may not have room for. min-h-[180px]
            stops it collapsing to nothing in landscape. Desktop restores
            a real ratio, near-square per the spec once the hero goes
            two-column, since height is no longer the scarce axis. */}
        <figure className="relative mt-6 mb-0 min-h-[180px] flex-1 overflow-hidden rounded-[18px] bg-sand md:mt-0 md:aspect-[5/4] md:flex-none">
          {/* Absolutely positioned rather than a plain child: HeroCarousel
              renders `fill` images, which need a positioned ancestor with
              a resolved height. As a flex item the figure's height comes
              from `flex-1`, and a percentage height inside that doesn't
              reliably resolve — the carousel collapsed to the photo's own
              height and left the rest of the frame empty. inset-0 pins it
              to whatever height flex actually computed. */}
          <div className="absolute inset-0">
            <HeroCarousel surfaceClass="bg-sand" />
          </div>
        </figure>
      </div>
    </section>
  );
}
