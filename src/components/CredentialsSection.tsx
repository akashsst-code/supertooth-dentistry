import { BadgeIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { credentials } from "@/lib/content";

/**
 * Dr. Archana's professional affiliations/certifications — new section,
 * positioned after Services per Akash's locked homepage-flow order.
 * Inspired by smilemakersfortworth.com's "professional organizations"
 * logo row on their dentist's bio ("doctors' credential pictures"), but
 * built as typographic badges rather than real association logos: real
 * trademarked org marks (ADA, AGD, state dental society, etc.) aren't
 * available/licensed here, and which orgs Dr. Archana actually holds
 * membership in still needs Akash to confirm — every entry renders
 * through <Placeholder> until then.
 */
export function CredentialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
        Training &amp; affiliations
      </h2>
      <p className="text-espresso/70 mb-10 max-w-2xl">
        Dr. Archana stays active in continuing education and professional dental associations.
      </p>

      <div className="flex flex-wrap gap-3">
        {credentials.map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2.5 text-sm font-medium text-espresso"
          >
            <BadgeIcon className="shrink-0 text-terracotta" />
            <Placeholder>{c}</Placeholder>
          </span>
        ))}
      </div>
    </section>
  );
}
