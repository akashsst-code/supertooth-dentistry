import type { Metadata } from "next";
import { BacklogView } from "@/components/BacklogView";

/**
 * /backlog — the prioritized build backlog from the deep patient-needs
 * research (docs/supertooth-patient-needs-research.md, 2026-08-30).
 *
 * This is an INTERNAL working artifact on a patient-facing site, which
 * drives two deliberate choices:
 *
 * 1. `robots: noindex, nofollow` — a prospective patient searching for a
 *    dentist must never land here, and it must not dilute the local-search
 *    signal the practice actually needs (see item 4 in the backlog).
 * 2. It is NOT added to the `nav` array in content.ts. That array is the
 *    patient-facing wayfinding surface locked in
 *    docs/supertooth-navigation-requirements.md; adding an internal link
 *    to it would put "Backlog" in the desktop patient nav too. Instead
 *    Nav.tsx renders it in a separate, visually distinct "internal" row
 *    at the bottom of the mobile menu — reachable in one tap for Akash,
 *    invisible in the primary journey.
 *
 * Data lives in src/lib/backlog.ts; the reasoning behind every item lives
 * in the research doc. This page is a view, not a third source of truth.
 */
export const metadata: Metadata = {
  title: "Build Backlog | Super Tooth Dentistry (internal)",
  description: "Internal prioritized build backlog derived from patient-needs research.",
  robots: { index: false, follow: false },
};

export default function BacklogPage() {
  return <BacklogView />;
}
