import Image from "next/image";
import { CredentialBadges } from "./CredentialBadges";
import { OfficeCarousel } from "./OfficeCarousel";
import { archana, differentiators, officeBlurb } from "@/lib/content";
import { Accent, Eyebrow, SectionHeading, shellWide } from "./editorial";

/**
 * EditorialTrustBlock — "page 2", carrying the screen-1 editorial system
 * down the page: same Manrope/Cormorant type, same terracotta-as-accent-
 * only discipline, same reliance on whitespace instead of containers.
 * The one deliberate difference is the ground — Sand rather than page
 * 1's Warm Ivory; see the section comment below for why that is the
 * transition. Used ONLY by the homepage in this variation;
 * TrustBlock.tsx is untouched and still serves /about, so this is
 * reversible by a one-line swap in page.tsx.
 *
 * The content is identical to TrustBlock's — same three differentiators,
 * same office carousel and blurb, same bio and credentials, all still
 * read from content.ts. Nothing factual was added, removed, or reworded.
 * What changed is presentation.
 *
 * Order inside the section, as of 2026-09-03: differentiators -> Dr.
 * Archana's bio -> office carousel. The bio moved ahead of the office
 * block on Akash's call, reversing the earlier "office above bio"
 * ordering. Nothing else about either block changed — same markup, same
 * spacing rhythm (`mt-14 md:mt-20` opens each), just swapped.
 *
 * The dark cards are the substantive change. TrustBlock renders the
 * three differentiators as espresso-surfaced tap-to-expand rows, which
 * deliberately echoed the old Hero's dark panel — a comment in that file
 * records Akash asking for "a nicer feel like page 1" back when page 1
 * WAS that dark panel. Page 1 is now the light editorial hero, so the
 * same instruction points the opposite way, and the spec's own
 * below-the-fold rule (Section 8) says it directly: "Limit to three
 * benefits. Use a simple stacked list with subtle dividers rather than
 * large dark cards." Hence hairline-separated rows on the page's own
 * canvas.
 *
 * That also drops the tap-to-expand affordance, and with it
 * `expandedNote` and the per-row photos. Deliberate: three rows that
 * each hide a photo, a paragraph and a duplicate booking CTA is the
 * "dense grid" the spec warns against, and the section already ends in
 * a real booking path further down the page. The content stays in
 * content.ts, unused here rather than deleted, so restoring the
 * accordion is not a content-recovery job.
 *
 * Type weights map to what Manrope is actually loaded at — 300/400/500,
 * per the spec's instruction not to use 600–800. Every `font-semibold`
 * in the original becomes `font-medium` or lighter; nothing here asks
 * the browser to synthesise a bold it doesn't have.
 */
export function EditorialTrustBlock() {
  // "Experienced care. Personalized smiles." ->
  // "Experienced care." / "Personalized" + <Accent>smiles</Accent> + "."
  const [taglineFirst, taglineSecond] = archana.tagline.split(/\.\s+/, 2);
  const taglineHead = `${taglineFirst}.`;
  const secondWords = taglineSecond.replace(/\.$/, "").split(" ");
  const taglineAccent = secondWords.pop() ?? "";
  const taglineTail = secondWords.join(" ");

  return (
    /* Sand ground, not the page's Warm Ivory. Page 1 and page 2 were
       the same colour edge to edge with no rule, shadow or shift
       anywhere, so there was no boundary for the eye to catch and the
       section read as "the page just stopped". The colour change is the
       transition. It also earns its keep twice: every hairline inside
       this section sits on a darker ground and finally has contrast —
       Sand-on-Ivory rules measured about 1.2:1, effectively invisible,
       which is the other half of why the rows blended together.
       Precedent, not a new idea: TrustBlock already used bg-sand/40 for
       this section; this makes it deliberate and full-strength.
       Top padding is 44px rather than the 80px used elsewhere — with a
       real colour boundary doing the separating, the whitespace no
       longer has to, and 80px on top of the hero's own trailing space
       was most of the gap complaint. */
    <section className="bg-sand">
      <div className={shellWide}>
        <Eyebrow>Why choose us</Eyebrow>
        <SectionHeading>
          Care that respects
          <br />
          your <Accent>time</Accent>.
        </SectionHeading>

        {/* Akash's pick (option B of three shown): each row gets its own
            Warm Ivory surface on the Sand ground, rather than hairline
            dividers. The previous version failed because everything was
            identical — both lines Manrope 300, and Sand-on-Ivory rules
            at roughly 1.2:1, which is effectively invisible. A surface
            change can't be missed, and it needs no rule at all: ivory on
            sand is its own boundary, so these are borderless.
            The title also moves to weight 500 while the detail stays
            300, so the two lines stop reading as one block.

            Worth being honest that this is nearer the card treatment the
            spec's Section 8 steers away from ("subtle dividers rather
            than large dark cards") — chosen with that trade-off shown.
            It is the light, flat, borderless end of that idea, and it
            leaves an obvious surface to hang the tap-to-expand behaviour
            back on if that ever returns. No icons: Section 9 says never
            one beside every text row. */}
        <ul className="mt-10 flex flex-col gap-3 md:mt-12 md:max-w-3xl">
          {differentiators.map((d) => (
            <li key={d.title} className="rounded-2xl bg-warm-ivory p-6 md:p-7">
              <h3 className="font-editorial text-xl font-medium leading-snug tracking-[-0.02em] text-espresso md:text-2xl">
                {d.title}
              </h3>
              <p className="mt-1.5 mb-0! font-editorial text-base font-light leading-[1.55] text-espresso/70">
                {d.detail}
              </p>
            </li>
          ))}
        </ul>

        {/* Dr. Archana — now the second block on the page, ahead of the
          office carousel (Akash's call, 2026-09-03). This reverses the
          earlier "office above bio" ordering recorded in this file's
          header; both calls are his. The differentiators still open the
          section, so the run is: why choose us -> who you'll see -> the
          room she works in.

          The eyebrow and heading OPEN the section above the photograph
          rather than sitting beside it in the right-hand column (also
          Akash's call). Three reasons it belongs there: the spec's own
          section pattern is eyebrow -> heading -> copy -> "one image,
          list, or action" in that order (Section 8), the hero's content
          order in Section 7 is likewise headline before figure, and the
          block above this one ("Why choose us") already opens on a
          full-width heading — this was the only one that didn't, so the
          page had one section announcing itself differently from the
          rest.

          The card shell (rounded surface, border) is still gone in
          favour of the hero's own pairing: one photograph at the spec's
          4:5 with an 18px radius, copy beside it, separated by
          whitespace rather than a container. */}
        <div className="mt-14 md:mt-20">
          <Eyebrow>Meet Dr. Archana Dubey</Eyebrow>
          {/* The one heading on the page that was still rendering
              plain — no serif accent, no deliberate break — which is the
              styling Akash spotted as missed here. Derived from
              `archana.tagline` rather than retyped, so content.ts stays
              the single source and this can't drift: the tagline is two
              sentences, so it breaks between them, and the last word of
              the second carries the accent with its full stop left
              outside, matching "your *time*." above and "not a
              *waiting* room." below. */}
          <SectionHeading>
            {taglineHead}
            <br />
            {taglineTail} <Accent>{taglineAccent}</Accent>.
          </SectionHeading>

          <div className="mt-8 md:mt-12 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-[clamp(3rem,6vw,6rem)]">
            {/* Placeholder tint is espresso/10, not bg-sand — the frame
                now sits on a sand ground and would be invisible while
                loading. */}
            <figure className="relative mb-0 aspect-[4/5] overflow-hidden rounded-[18px] bg-espresso/10">
              <Image
                src={archana.photo}
                alt="Dr. Archana Dubey, DDS, MDS, at an American Dental Association event"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </figure>

            <div className="mt-8 md:mt-0">
              {/* The one place a serif is allowed below the hero: her
                pull quote. Cormorant is loaded italic-only, and the spec
                permits it for a short emphasised phrase — a personal
                quote is exactly that, and it keeps the accent meaningful
                by staying rare rather than decorating every heading. */}
              <blockquote className="font-editorial-serif text-2xl font-normal italic leading-[1.35] tracking-[-0.02em] text-espresso md:text-3xl">
                &ldquo;{archana.quote}&rdquo;
              </blockquote>

              <p className="mt-6 mb-0! font-editorial text-base font-light leading-[1.6] text-espresso/80">
                {archana.bio}
              </p>
            </div>
          </div>

          {/* Credentials move out of the bio's right-hand column and run
            the full width instead. That is the whole density fix: in a
            single ~600px column the three groups could only stack, ~11
            lines tall; full width they sit as three side-by-side columns
            on desktop — same rows, roughly a third of the height, and
            more horizontal room per row rather than less, so nothing is
            crowded to buy the space back.
            border-sand would be invisible against the sand ground. */}
          <div className="mt-10 border-t border-espresso/20 pt-6 md:mt-14 md:pt-8">
            <CredentialBadges editorial columns />
          </div>
        </div>

        {/* Office carousel is reused as-is rather than reskinned: it is
          shared with /about, and its own surface is already light
          (photos on the page canvas, sand borders). Only its heading
          needed the editorial treatment, so it is rendered here with
          the component's built-in heading suppressed. */}
        {/* `relative` is load-bearing: OfficeCarousel's editorial pause
            control positions against this wrapper so it lands at the
            top-right of the heading block rather than on top of the
            half-visible next photo. */}
        <div className="relative mt-14 md:mt-20">
          <Eyebrow>Our office</Eyebrow>
          <SectionHeading>
            A calm room,
            <br />
            not a <Accent>waiting</Accent> room.
          </SectionHeading>
          <div className="mt-8 md:mt-10">
            <OfficeCarousel variant="editorial" />
          </div>
          <p className="mt-6 mb-0! max-w-2xl font-editorial text-base font-light leading-[1.6] text-espresso/80">
            {officeBlurb}
          </p>
        </div>
      </div>
    </section>
  );
}
