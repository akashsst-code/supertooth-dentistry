import Link from "next/link";
/**
 * Shared type primitives for the editorial homepage variation
 * (docs/supertooth-mobile-design-spec.md). Extracted from
 * EditorialTrustBlock once the system had to carry past page 2 — every
 * section below the hero now uses these rather than re-deriving the same
 * clamp/tracking/weight triplet, so the scale can be tuned in one place.
 *
 * Weights stay inside what Manrope is actually loaded at (300/400/500,
 * see layout.tsx). The spec rules out 600–800 outright, and asking for a
 * weight that isn't loaded gets a synthesised bold rather than a real
 * one.
 */

/**
 * `onDark` inverts each primitive for the one section that sits on the
 * espresso ground (BookingBlock). It is a colour swap only — size,
 * weight, tracking and leading are identical, which is the whole point:
 * that section should read as the same system, just on a dark surface.
 *
 * The swaps are forced by contrast, not taste. Terracotta on espresso
 * measures about 2.3:1, so it fails even the 3:1 large-text bar — which
 * is why the eyebrow goes to Warm Ivory rather than staying terracotta,
 * and why the accent word goes to Sand (about 9.9:1). The accent is
 * still an accent on that ground; it is just carried by the serif italic
 * rather than by hue. No new colour token was added for this — Sand and
 * Warm Ivory are both already locked.
 */
type Tone = { onDark?: boolean };

/** Section 8's "optional small eyebrow", at the spec's 12px/0.16em.
 *  Rendered at the 14px `text-xs` token instead — globals.css raised
 *  that specifically to hold a fine-print floor, and there was no reason
 *  for the editorial pass to undercut it. */
export function Eyebrow({ children, onDark = false }: { children: React.ReactNode } & Tone) {
  return (
    <p
      className={`mb-0! font-editorial text-xs font-medium uppercase tracking-[0.16em] ${
        onDark ? "text-warm-ivory/70" : "text-terracotta-dark"
      }`}
    >
      {children}
    </p>
  );
}

/** Section heading — the spec's 38px/1.05/-0.035em, light weight, with
 *  its own larger desktop scale so it doesn't read undersized once the
 *  measure widens.
 *
 *  The clamp floor is 1.875rem (30px), not 2rem. Below a ~353px
 *  viewport the 8.5vw term is already pinned at the floor, so a 32px
 *  floor meant no headline ever got smaller no matter how narrow the
 *  phone — and at 325px the measure is 272px while "Serving Queen Anne"
 *  needs 274px at 32px, which is how that heading broke to three lines
 *  on the smallest phones. 30px clears it with room and changes nothing
 *  at 375px and up, where 8.5vw is above the floor anyway. */
export function SectionHeading({
  children,
  onDark = false,
  // Sections with no standing line under the heading (Location, FAQ)
  // pass the 40px bottom step here, so heading-to-content stays the
  // same distance whether or not a paragraph sits in between.
  className = "",
}: { children: React.ReactNode; className?: string } & Tone) {
  return (
    <h2
      className={`mt-4 font-editorial text-[clamp(1.875rem,8.5vw,2.375rem)] font-light leading-[1.05] tracking-[-0.035em] md:text-[clamp(2.375rem,3.4vw,3rem)] ${
        onDark ? "text-warm-ivory" : "text-espresso"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/** The single serif accent word, matching the hero's treatment exactly.
 *  Terracotta on ivory is 3.89:1 — AA for large text only, which is why
 *  this belongs in headings and must not be reused at body size. */
export function Accent({ children, onDark = false }: { children: React.ReactNode } & Tone) {
  return (
    <em
      className={`font-editorial-serif text-[1.08em] font-normal italic tracking-[-0.035em] ${
        onDark ? "text-sand" : "text-terracotta"
      }`}
    >
      {children}
    </em>
  );
}

/**
 * Body copy at the spec's "body large" role.
 *
 * espresso/80, not /70. At /70 this measures 4.12:1 against the Sand
 * ground and fails AA — axe-core flagged every instance of it on the
 * homepage, four of which predate this pass. /80 measures 5.63:1 on
 * Sand and more on Warm Ivory, and is visually indistinguishable as
 * secondary copy. Item 61 in the build spec claims sitewide AA, so this
 * is restoring a stated guarantee, not tightening a new one.
 */
export function Body({
  children,
  className = "",
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
} & Tone) {
  return (
    <p
      className={`mb-0! font-editorial text-base font-light leading-[1.6] ${
        onDark ? "text-warm-ivory/80" : "text-espresso/80"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The one section container. Every editorial section below the hero was
 * carrying its own copy of this string, and they had drifted — five
 * sections at `pb-16`, EditorialTrustBlock at `pb-20`/`md:pb-28`. That
 * outlier is what made the gap above "In their words" read as larger
 * than every other boundary (Akash flagged it), because it was: 124px
 * against 108px everywhere else.
 *
 * Bottom padding is now 48px mobile / 80px desktop, so a boundary
 * measures 92px on mobile (44 top + 48 bottom). The spec asks for
 * 80–96px between major sections (Section 8), which the old 108px
 * exceeded everywhere — and that was before counting the colour change
 * at each boundary, which is doing separation work the whitespace no
 * longer has to duplicate.
 *
 * One width, not two. Services and FAQ used to take a centred
 * `md:max-w-3xl` container, which put their headings at x=296 on a
 * 1280px screen while every other section's heading started at x=64 —
 * a 232px jog in the page's left spine, visible while scrolling. Where
 * a section genuinely needs a reading measure it constrains its own
 * content with a LEFT-ALIGNED `md:max-w-3xl` instead, which is the
 * pattern EditorialTrustBlock's differentiator list already used.
 */
export const shellWide =
  "mx-auto w-full max-w-[480px] px-6 pb-12 pt-11 md:max-w-[1320px] md:px-10 md:pb-20 md:pt-16 lg:px-16";

/**
 * Section shell. `ground` alternates ivory and sand down the page —
 * that alternation is the transition device Akash picked for page 2
 * (a colour change at each boundary, rather than whitespace alone), now
 * applied consistently so no two adjacent sections share a ground.
 */
export function EditorialSection({
  ground = "ivory",
  children,
  className = "",
}: {
  ground?: "ivory" | "sand";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={ground === "sand" ? "bg-sand" : "bg-warm-ivory"}>
      <div
        className={`${shellWide} ${className}`}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * A quiet inline link out of a homepage section into the page that
 * carries that subject in full.
 *
 * Added 2026-09-03 to close a real gap: before this, the homepage
 * linked to none of /services, /about, /offers or /insurance-new-patients
 * outside the hamburger — every service card pointed at /contact, so a
 * reader who wanted to read more rather than book had nowhere to go, and
 * those four pages received no internal links at all.
 *
 * Deliberately a text action, not a button. The page has exactly one
 * primary ask (book) and one secondary (call); a row of filled pills
 * pointing at reading material would compete with both. Same treatment
 * as the Schedule action already used inside the service cards —
 * terracotta-dark, underlined, min-h-44px with a -1px/px-1 pull so the
 * tap target meets the floor without visually indenting the label.
 */
export function SectionLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`-ml-1 inline-flex min-h-[44px] w-fit items-center gap-1.5 px-1 font-editorial text-base font-medium text-terracotta-dark underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso/40 ${className}`}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
