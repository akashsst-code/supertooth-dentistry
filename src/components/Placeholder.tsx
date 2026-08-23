/**
 * Wraps content that is NOT real practice data yet — per the locked
 * compliance rule in docs/supertooth-build-principles.md Section 8:
 * "No unverifiable claims" and the per-feature checklist in
 * docs/supertooth-development-workflow.md: "placeholder content clearly
 * marked as placeholder, not passed off as real."
 *
 * Renders visibly bracketed with a dashed underline so it can never be
 * mistaken for real content in a screenshot or preview, and is easy to
 * find/replace once real content lands (see the content checklist in
 * docs/supertooth-priority-dimensions.md).
 *
 * `tone="dark"` swaps to warm-ivory text for use on dark surfaces (e.g.
 * the espresso hero panel) — the default espresso text is unreadable
 * there, which would itself violate the WCAG AA contrast requirement in
 * docs/supertooth-build-principles.md Section 4/8.
 */
export function Placeholder({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const toneClasses =
    tone === "dark" ? "border-terracotta/70 text-warm-ivory/80" : "border-terracotta/60 text-espresso/70";
  return <span className={`border-b-2 border-dashed ${toneClasses}`}>[ {children} ]</span>;
}
