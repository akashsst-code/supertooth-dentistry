import Link from "next/link";
import { practice } from "@/lib/content";

/**
 * Legal/utility row — backlog item 12. Privacy and Accessibility must
 * stay linked in the footer (≥44×44px tap targets, ≥8px separation).
 */
function LegalLinks() {
  return (
    <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
      <Link
        href="/privacy"
        className="tap-target inline-flex items-center px-2 text-xs text-espresso/70 hover:text-terracotta-dark transition-colors"
      >
        Privacy
      </Link>
      <span className="text-espresso/20" aria-hidden="true">
        ·
      </span>
      <Link
        href="/accessibility"
        className="tap-target inline-flex items-center px-2 text-xs text-espresso/70 hover:text-terracotta-dark transition-colors"
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
 * The "Dental emergency" link was briefly restored (item 45, 2026-09-02)
 * to cover the 6 routes without BookingBlock's "Quick actions" pill —
 * see backlog.ts item 45 for that reasoning. Removed again the same day
 * per Akash's direct follow-up call ("remove dental emergency from near
 * privacy accessibility area, since its already covered"): confirmed
 * with Akash this means sitewide, accepting that those 6 routes fall
 * back to the hamburger menu (one extra tap) rather than a dedicated
 * footer link. Recorded as a deliberate ruling in backlog.ts item 45,
 * not a silent revert.
 */
export function Footer({
  // The homepage variation sets its own type; without this the footer
  // would be the one strip on that page still rendering in Inter. It
  // carries no display-font headings, so the whole switch is the body
  // face. Every other page renders the default and is unchanged.
  variant = "default",
}: {
  variant?: "default" | "editorial";
} = {}) {
  return (
    <footer
      className={`border-t border-sand bg-warm-ivory ${
        variant === "editorial" ? "font-editorial font-light" : ""
      }`}
    >
      <div className="px-6 py-4 flex flex-col items-center gap-2 text-center">
        <LegalLinks />
        <p className="text-xs text-espresso/70">
          © {new Date().getFullYear()} {practice.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
