import Image from "next/image";
import { CredentialBadges } from "./CredentialBadges";
import { OfficeCarousel } from "./OfficeCarousel";
import { archana, differentiators, officeBlurb } from "@/lib/content";

/**
 * EditorialTrustBlock — "page 2", carrying the screen-1 editorial system
 * down the page: same Manrope/Cormorant type, same warm-ivory canvas,
 * same terracotta-as-accent-only discipline, same reliance on whitespace
 * instead of containers. Used ONLY by the homepage in this variation;
 * TrustBlock.tsx is untouched and still serves /about, so this is
 * reversible by a one-line swap in page.tsx.
 *
 * The content is identical to TrustBlock's — same three differentiators,
 * same office carousel and blurb, same bio and credentials, all still
 * read from content.ts. Nothing factual was added, removed, or reworded.
 * What changed is presentation.
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
  return (
    <section className="mx-auto w-full max-w-[480px] px-6 py-20 md:max-w-[1320px] md:px-10 md:py-28 lg:px-16">
      <Eyebrow>Why choose us</Eyebrow>
      <SectionHeading>
        Care that respects
        <br />
        your <Accent>time</Accent>.
      </SectionHeading>

      {/* Stacked list with hairline rules — the spec's replacement for
          the dark card grid. No icons: Section 9 says to use them
          sparingly and never one beside every text row. */}
      <ul className="mt-10 md:mt-12 md:max-w-3xl">
        {differentiators.map((d) => (
          <li
            key={d.title}
            className="border-t border-sand py-5 last:border-b md:py-6"
          >
            <h3 className="font-editorial text-xl font-light leading-snug tracking-[-0.02em] text-espresso md:text-2xl">
              {d.title}
            </h3>
            <p className="mt-1 mb-0! font-editorial text-base font-light leading-[1.55] text-espresso/70">
              {d.detail}
            </p>
          </li>
        ))}
      </ul>

      {/* Office carousel is reused as-is rather than reskinned: it is
          shared with /about, and its own surface is already light
          (photos on the page canvas, sand borders). Only its heading
          needed the editorial treatment, so it is rendered here with
          the component's built-in heading suppressed. */}
      <div className="mt-20 md:mt-28">
        <Eyebrow>Our office</Eyebrow>
        <SectionHeading>
          A calm room,
          <br />
          not a <Accent>waiting</Accent> room.
        </SectionHeading>
        <div className="mt-8 md:mt-10">
          <OfficeCarousel hideHeading />
        </div>
        <p className="mt-6 mb-0! max-w-2xl font-editorial text-base font-light leading-[1.6] text-espresso/70">
          {officeBlurb}
        </p>
      </div>

      {/* Dr. Archana — the card shell (rounded surface, border) is gone
          in favour of the hero's own pairing: one photograph at the
          spec's 4:5 with an 18px radius, copy beside it, separated by
          whitespace rather than a container. */}
      <div className="mt-20 md:mt-28 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-[clamp(3rem,6vw,6rem)]">
        <figure className="relative mb-0 aspect-[4/5] overflow-hidden rounded-[18px] bg-sand">
          <Image
            src={archana.photo}
            alt="Dr. Archana Dubey, DDS, MDS, at an American Dental Association event"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </figure>

        <div className="mt-8 md:mt-0">
          <Eyebrow>Meet Dr. Archana Dubey</Eyebrow>
          <SectionHeading>{archana.tagline}</SectionHeading>

          {/* The one place a serif is allowed below the hero: her pull
              quote. Cormorant is loaded italic-only, and the spec permits
              it for a short emphasised phrase — a personal quote is
              exactly that, and it keeps the accent meaningful by staying
              rare rather than decorating every heading. */}
          <blockquote className="mt-6 font-editorial-serif text-2xl font-normal italic leading-[1.35] tracking-[-0.02em] text-espresso md:text-3xl">
            &ldquo;{archana.quote}&rdquo;
          </blockquote>

          <p className="mt-6 mb-0! font-editorial text-base font-light leading-[1.6] text-espresso/70">
            {archana.bio}
          </p>

          <div className="mt-8 border-t border-sand pt-6">
            <CredentialBadges editorial />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section 8's "optional small eyebrow", at the spec's 12px/0.16em. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-0! font-editorial text-xs font-medium uppercase tracking-[0.16em] text-terracotta-dark">
      {children}
    </p>
  );
}

/** Section heading — the spec's 38px/1.05/-0.035em, light weight. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-editorial text-[clamp(2rem,8.5vw,2.375rem)] font-light leading-[1.05] tracking-[-0.035em] text-espresso md:text-[clamp(2.375rem,3.4vw,3rem)]">
      {children}
    </h2>
  );
}

/** The serif accent word, matching the hero's treatment exactly. */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <em className="font-editorial-serif text-[1.08em] font-normal italic tracking-[-0.035em] text-terracotta">
      {children}
    </em>
  );
}
