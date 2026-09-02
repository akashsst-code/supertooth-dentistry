import { credentialBadges, type CredentialBadge } from "@/lib/content";
import { AlignerIcon, BadgeIcon, GraduationCapIcon, ImplantIcon, LaurelIcon, ShieldCheckIcon, StarIcon, SyringeIcon } from "./icons";

const iconMap: Record<CredentialBadge["icon"], typeof StarIcon> = {
  star: StarIcon,
  graduationCap: GraduationCapIcon,
  aligner: AlignerIcon,
  syringe: SyringeIcon,
  badge: BadgeIcon,
  implant: ImplantIcon,
  shieldCheck: ShieldCheckIcon,
};

function CredentialTile({ badge }: { badge: CredentialBadge }) {
  const Icon = iconMap[badge.icon];
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-shadow sm:flex-col sm:gap-2 sm:text-center ${
        badge.featured
          ? "border-terracotta/25 bg-terracotta/[0.06] shadow-sm"
          : "border-sand bg-warm-ivory"
      }`}
    >
      <div
        className={`relative flex shrink-0 items-center justify-center rounded-full ${
          badge.featured ? "h-14 w-14 bg-terracotta/10 text-terracotta-dark" : "h-11 w-11 bg-sand text-espresso/70"
        }`}
      >
        {badge.featured && <LaurelIcon className="absolute -inset-2.5 text-terracotta/30" />}
        <Icon className="relative" />
      </div>
      <div>
        <p className="text-xs font-semibold leading-snug text-espresso">{badge.title}</p>
        <p className="text-[11px] leading-snug text-espresso/55">{badge.detail}</p>
      </div>
    </div>
  );
}

/**
 * Dr. Archana's credential/training-and-affiliation badges — real data
 * supplied by Akash 2026-09-01 (see `credentialBadges` in content.ts).
 * Shared between TrustBlock (homepage bio card) and /about so both
 * surfaces show the same emblem-badge treatment instead of two divergent
 * layouts. Featured items (experience, degree, Invisalign — Akash's "top
 * items") render first, larger, with a terracotta ring and a decorative
 * laurel behind the icon; the remaining professional-association/training
 * credentials render underneath as a smaller, denser grid.
 */
export function CredentialBadges() {
  const featured = credentialBadges.filter((b) => b.featured);
  const rest = credentialBadges.filter((b) => !b.featured);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {featured.map((badge) => (
          <CredentialTile key={badge.title} badge={badge} />
        ))}
      </div>

      <p className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wide text-espresso/60">
        Training &amp; Affiliations
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {rest.map((badge) => (
          <CredentialTile key={badge.title} badge={badge} />
        ))}
      </div>
    </div>
  );
}
