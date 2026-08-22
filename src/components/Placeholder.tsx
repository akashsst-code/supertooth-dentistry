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
 */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-b-2 border-dashed border-terracotta/60 text-espresso/70">
      [ {children} ]
    </span>
  );
}
