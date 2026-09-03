import Image from "next/image";
import Link from "next/link";
import { editorialHero, reviews } from "@/lib/content";
import { GoogleGIcon, StarIcon } from "./icons";

/**
 * EditorialHero — homepage screen 1, built to
 * docs/supertooth-mobile-design-spec.md. Offered as a variation
 * alongside the existing photo-overlay Hero.tsx (which is untouched);
 * only src/app/page.tsx picks between them.
 *
 * The spec's structural rules, and where each is enforced below:
 *   - One headline, one support line, one action, one photograph.
 *   - Text NEVER sits on the photograph. This is the sharpest break
 *     from Hero.tsx, whose whole composition is copy over a scrim.
 *   - Separation comes from whitespace, not borders or cards.
 *   - Exactly one serif accent word in the headline.
 *
 * Palette is ours, not the spec's. The spec's own tokens (--canvas
 * #F7F6F1, --ink #172219, --forest #173E28) are deliberately NOT
 * imported — Akash's instruction was to keep the locked color theme and
 * borrow everything else, so each spec role maps onto an existing token:
 * canvas -> warm-ivory, ink -> espresso, ink-muted -> espresso/70,
 * forest (action + accent) -> terracotta-dark / terracotta.
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
 *
 * Not wrapped in ViewportHero: that pins the hero to exactly one screen
 * height, which would force the photograph to shrink to fit. Here the
 * photo is meant to run past the fold — the visible top of it is the
 * scroll affordance.
 */
export function EditorialHero() {
  return (
    <section className="mx-auto w-full max-w-[480px] px-6 pt-[clamp(3.5rem,15vw,4.75rem)] pb-16 md:max-w-[1320px] md:px-10 md:pt-20 md:pb-24 lg:px-16">
      <div className="md:grid md:grid-cols-[minmax(320px,0.85fr)_minmax(440px,1.15fr)] md:items-center md:gap-[clamp(4rem,8vw,8.75rem)]">
        <div>
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

          {/* Reviews — see the deviation note in the file header. */}
          <p className="mt-5 mb-0! flex flex-wrap items-center gap-x-2 gap-y-1 font-editorial text-xs text-espresso/70">
            <GoogleGIcon />
            <span className="flex gap-px text-terracotta" aria-hidden="true">
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
            </span>
            <span>
              <span className="font-medium text-espresso">{reviews.rating}</span> from{" "}
              {reviews.count} Google reviews
            </span>
          </p>
        </div>

        {/* aspect-ratio is set on the frame, not the img, so the space is
            reserved before the photo loads — the spec's no-layout-shift
            requirement. `priority` because this is the LCP element.
            Portrait 4:5 on phones per Section 7; the spec asks for
            landscape-or-near-square once the hero goes two-column, so it
            widens rather than growing into a full-height slab. */}
        <figure className="mt-7 aspect-[4/5] overflow-hidden rounded-[18px] bg-sand md:mt-0 md:aspect-[5/4]">
          <Image
            src={editorialHero.image.src}
            alt={editorialHero.image.alt}
            width={900}
            height={1125}
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
