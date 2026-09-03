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

/** Section 8's "optional small eyebrow", at the spec's 12px/0.16em.
 *  Rendered at the 14px `text-xs` token instead — globals.css raised
 *  that specifically to hold a fine-print floor, and there was no reason
 *  for the editorial pass to undercut it. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-0! font-editorial text-xs font-medium uppercase tracking-[0.16em] text-terracotta-dark">
      {children}
    </p>
  );
}

/** Section heading — the spec's 38px/1.05/-0.035em, light weight, with
 *  its own larger desktop scale so it doesn't read undersized once the
 *  measure widens. */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-editorial text-[clamp(2rem,8.5vw,2.375rem)] font-light leading-[1.05] tracking-[-0.035em] text-espresso md:text-[clamp(2.375rem,3.4vw,3rem)]">
      {children}
    </h2>
  );
}

/** The single serif accent word, matching the hero's treatment exactly.
 *  Terracotta on ivory is 3.89:1 — AA for large text only, which is why
 *  this belongs in headings and must not be reused at body size. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <em className="font-editorial-serif text-[1.08em] font-normal italic tracking-[-0.035em] text-terracotta">
      {children}
    </em>
  );
}

/** Body copy at the spec's "body large" role. */
export function Body({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mb-0! font-editorial text-base font-light leading-[1.6] text-espresso/70 ${className}`}
    >
      {children}
    </p>
  );
}

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
        className={`mx-auto w-full max-w-[480px] px-6 pb-16 pt-11 md:max-w-[1320px] md:px-10 md:pb-24 md:pt-16 lg:px-16 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
