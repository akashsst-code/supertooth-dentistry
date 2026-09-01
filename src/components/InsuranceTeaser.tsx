"use client";

import { useState } from "react";
import { insuranceCarriers, insuranceCarriersHeroTeaser } from "@/lib/content";

/**
 * Hero trust-strip "In-network: Delta, Premera, Aetna + more" line, made
 * tappable — Akash asked for "+ more" to complete the sentence in place
 * with the rest of the carrier list, rather than staying static text.
 * Split into its own client component so Hero.tsx itself doesn't need
 * "use client" for one line of the trust strip.
 *
 * `remaining` derives the non-teaser carriers by matching the short
 * teaser names (e.g. "Delta") against the full names in
 * insuranceCarriers (e.g. "Delta Dental") — avoids hardcoding a second,
 * separately-maintained list that could drift from insuranceCarriers.
 *
 * Deliberately still not wrapped in <Placeholder> here, same as the
 * rest of this trust strip — see the comment above it in Hero.tsx.
 *
 * Tap target: an earlier pass gave this button a real 44px min-height,
 * which stretched the whole three-line trust strip apart (Akash: "too
 * far off, make it visually closer"). Reverted to the button's natural
 * small size and widened only the invisible ::after hit area instead —
 * a 375×812 sweep confirms the real tappable region is still ≥44×44px,
 * it's just no longer the visible box.
 */
export function InsuranceTeaser() {
  const [expanded, setExpanded] = useState(false);
  const remaining = insuranceCarriers.filter(
    (c) => !insuranceCarriersHeroTeaser.some((t) => c.startsWith(t)),
  );

  return (
    <>
      In-network: {insuranceCarriersHeroTeaser.join(", ")}
      {expanded ? (
        remaining.length > 0 && <>, {remaining.join(", ")}</>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="relative underline decoration-warm-ivory/40 underline-offset-2 hover:decoration-warm-ivory after:absolute after:-inset-3.5 after:content-['']"
        >
          {" "}
          + more
        </button>
      )}
    </>
  );
}
