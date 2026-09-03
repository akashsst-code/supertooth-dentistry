import Link from "next/link";
import { practice } from "@/lib/content";

/**
 * Legal/utility row — backlog item 12. Privacy and Accessibility must
 * stay linked in the footer (≥44×44px tap targets, ≥8px separation).
 */
function LegalLinks({ merged }: { merged: boolean }) {
  const link = merged
    ? "text-espresso/80 hover:text-terracotta-dark"
    : "text-espresso/70 hover:text-terracotta-dark";
  return (
    <nav
      aria-label="Legal"
      className={`flex flex-wrap items-center gap-x-1 gap-y-1 ${
        merged ? "-ml-2" : "justify-center"
      }`}
    >
      <Link
        href="/privacy"
        className={`tap-target inline-flex items-center px-2 text-xs transition-colors ${link}`}
      >
        Privacy
      </Link>
      <span className="text-espresso/20" aria-hidden="true">
        ·
      </span>
      <Link
        href="/accessibility"
        className={`tap-target inline-flex items-center px-2 text-xs transition-colors ${link}`}
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
  //
  // `merged` (homepage, 2026-09-03) continues BookingBlock's ground
  // with no border, no colour change and the same container measure, so
  // the legal row reads as the closing line of that section rather than
  // a separate strip below it — which is what Akash asked for. It stays
  // a real <footer> element rendered as a direct child of <body>, so
  // the homepage keeps its contentinfo landmark; moving these links
  // into BookingBlock's markup would have looked identical and quietly
  // lost it. Follows that section onto Warm Ivory now that it is no
  // longer espresso; the divider is espresso/12 rather than border-sand
  // because sand on ivory measures ~1.2:1 and would not be visible.
  // Spacing compressed 2026-09-03 (Akash): the row is two 12px lines and
  // was carrying 20px above and 24px below plus BookingBlock's own 48px
  // section padding over the rule. The rule is the separator; the
  // whitespace does not need to repeat it.
  variant = "default",
}: {
  variant?: "default" | "editorial" | "merged";
} = {}) {
  const merged = variant === "merged";

  if (merged) {
    return (
      <footer className="bg-warm-ivory font-editorial font-light text-espresso">
        <div className="mx-auto w-full max-w-[480px] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:max-w-[1320px] md:px-10 md:pb-8 lg:px-16">
          <div className="flex flex-col gap-0.5 border-t border-espresso/12 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
            <LegalLinks merged />
            <p className="mb-0! px-2 text-xs text-espresso/80 sm:px-0">
              © {new Date().getFullYear()} {practice.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={`border-t border-sand bg-warm-ivory ${
        variant === "editorial" ? "font-editorial font-light" : ""
      }`}
    >
      <div className="px-6 py-4 flex flex-col items-center gap-2 text-center">
        <LegalLinks merged={false} />
        <p className="text-xs text-espresso/70">
          © {new Date().getFullYear()} {practice.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
