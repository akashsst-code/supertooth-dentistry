import Link from "next/link";
import { practice } from "@/lib/content";
import { MedicalCrossIcon } from "./icons";

/**
 * Legal/utility row — backlog item 12. Privacy and Accessibility must
 * stay linked in the footer (≥44×44px tap targets, ≥8px separation).
 */
function LegalLinks() {
  return (
    <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
      <Link
        href="/privacy"
        className="tap-target inline-flex items-center px-2 text-xs text-espresso/60 hover:text-terracotta-dark transition-colors"
      >
        Privacy
      </Link>
      <span className="text-espresso/20" aria-hidden="true">
        ·
      </span>
      <Link
        href="/accessibility"
        className="tap-target inline-flex items-center px-2 text-xs text-espresso/60 hover:text-terracotta-dark transition-colors"
      >
        Accessibility
      </Link>
    </nav>
  );
}

/**
 * Cut down to just Privacy/Accessibility + copyright per Akash's direct
 * feedback on the live preview (screenshot, red circle around the old
 * brand name / address / Book+Call buttons / "Dental emergency" block):
 * all of that duplicated content BookingBlock's photo sits directly
 * above already carries — practice name and hours/location in its text
 * column, Book/Call/Emergency in "Quick actions". Repeating it again
 * right below the photo read as clutter, not a second chance to convert.
 *
 * The "Dental emergency" link is back (item 45, 2026-09-02) — its
 * removal above left every route except `/` and `/contact` (the only
 * two that render BookingBlock's "Quick actions" pill) with no one-tap
 * emergency path except the hamburger menu, which item 45's own
 * acceptance criteria don't count as one tap. Footer renders on every
 * other route (about/services/insurance/emergency/privacy/accessibility),
 * so restoring it here — not reintroducing the rest of the trimmed
 * block — closes that gap everywhere at once. Same `bg-alert` +
 * `MedicalCrossIcon` treatment as BookingBlock's pill (item 46) rather
 * than a new style, since that exact look is what Akash already
 * accepted after trying several other treatments (see BookingBlock.tsx).
 */
export function Footer() {
  return (
    <footer className="border-t border-sand bg-warm-ivory">
      <div className="px-6 py-4 flex flex-col items-center gap-3 text-center">
        <a
          href="/emergency"
          className="tap-target inline-flex items-center gap-1 rounded-full bg-alert px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-warm-ivory hover:brightness-110 transition"
        >
          <MedicalCrossIcon className="h-3.5 w-3.5" />
          Dental emergency
        </a>
        <LegalLinks />
        <p className="text-xs text-espresso/50">
          © {new Date().getFullYear()} {practice.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
