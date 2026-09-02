import Link from "next/link";
import { practice } from "@/lib/content";

/**
 * Legal/utility row — backlog item 12. Privacy and Accessibility must
 * stay linked in the footer (≥44×44px tap targets, ≥8px separation).
 * "Dental emergency" was here too (item 7) but removed per Akash's
 * direct feedback on the live preview — a redundant footer mention once
 * BookingBlock's "Quick actions" row (a real, undiluted-alert pill)
 * already sits one section above, and the hamburger menu covers it too.
 * Item 7's footer-link acceptance criterion no longer holds; noted in
 * backlog.ts/build-spec rather than silently left stale.
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
 * What's left is genuinely footer-only content: legal links plus the
 * copyright line, nothing BookingBlock already states.
 */
export function Footer() {
  return (
    <footer className="border-t border-sand bg-warm-ivory">
      <div className="px-6 py-4 flex flex-col items-center gap-2 text-center">
        <LegalLinks />
        <p className="text-xs text-espresso/50">
          © {new Date().getFullYear()} {practice.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
