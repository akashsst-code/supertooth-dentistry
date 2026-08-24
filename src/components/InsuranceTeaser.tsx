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
          className="underline decoration-warm-ivory/40 underline-offset-2 hover:decoration-warm-ivory"
        >
          {" "}
          + more
        </button>
      )}
    </>
  );
}
