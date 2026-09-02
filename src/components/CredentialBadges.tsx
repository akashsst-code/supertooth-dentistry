import { credentialBadges, type CredentialBadge } from "@/lib/content";
import { AlignerIcon, BadgeIcon, GraduationCapIcon, ImplantIcon, ShieldCheckIcon, StarIcon, SyringeIcon } from "./icons";

const iconMap: Record<CredentialBadge["icon"], typeof StarIcon> = {
  star: StarIcon,
  graduationCap: GraduationCapIcon,
  aligner: AlignerIcon,
  syringe: SyringeIcon,
  badge: BadgeIcon,
  implant: ImplantIcon,
  shieldCheck: ShieldCheckIcon,
};

/** Small solid check-mark accent overlapping a featured medallion's edge. */
function VerifiedDot() {
  return (
    <span className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta-dark ring-2 ring-warm-ivory">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7" stroke="var(--color-warm-ivory)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * Medallion badge mark — a double-ring "seal" (outer hairline ring, offset
 * gap, inner gradient-filled ring holding the icon) rather than a plain
 * flat circle. Cross-domain reference point: this is the same visual
 * language professional-credential displays reach for outside dentistry
 * too — LinkedIn's licenses/certifications badges, quality/artisan seals,
 * medical-board credential marks — a "seal," not a social-media avatar
 * bubble. Featured items get the full seal treatment plus a small
 * verified-check accent; standard items get a single, quieter ring.
 */
function BadgeMedallion({ badge }: { badge: CredentialBadge }) {
  const Icon = iconMap[badge.icon];

  if (badge.featured) {
    return (
      <div className="relative h-14 w-14 shrink-0 rounded-full border border-terracotta/25 p-[3px]">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-terracotta/40 bg-gradient-to-br from-terracotta/20 via-terracotta/10 to-terracotta/5 text-terracotta-dark shadow-sm">
          <Icon />
        </div>
        <VerifiedDot />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-espresso/12 bg-gradient-to-br from-sand to-sand/40 text-espresso/70">
      <Icon />
    </div>
  );
}

function CredentialRow({ badge }: { badge: CredentialBadge }) {
  return (
    <div
      className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left ${
        badge.featured ? "border-terracotta/20 bg-terracotta/[0.05] shadow-sm" : "border-sand bg-warm-ivory"
      }`}
    >
      <BadgeMedallion badge={badge} />
      <div className="min-w-0 pt-1">
        <p className="text-sm font-semibold leading-snug text-espresso">{badge.title}</p>
        <p className="mt-0.5 text-xs leading-snug text-espresso/55">{badge.detail}</p>
      </div>
    </div>
  );
}

/**
 * Dr. Archana's credential/training-and-affiliation badges — real data
 * supplied by Akash 2026-09-01 (see `credentialBadges` in content.ts).
 * Shared between TrustBlock (homepage bio card) and /about so both
 * surfaces show the same treatment instead of two divergent layouts.
 *
 * Both tiers render as a single-column list of full-width rows rather
 * than a multi-column grid — deliberate, after the first grid version
 * ("beautifully tiled") cramped 2-up cells on an actual phone width
 * (Akash: "spacing inside the badge is weird ... training and
 * affiliations mobile looks weird"). A grid cell's width depends on the
 * surrounding card (TrustBlock's bio card is split ~40/60 with a photo;
 * `/about`'s card is full-width), so a fixed column count that looks
 * fine in one context cramps text in the other. A list has no such
 * failure mode at any container width. Featured items (experience,
 * degree, Invisalign — Akash's "top items") render first, in a larger
 * seal-style medallion with a verified-check accent and a faint
 * terracotta card tint; the remaining professional-association/training
 * credentials render underneath as quieter, smaller rows.
 */
export function CredentialBadges() {
  const featured = credentialBadges.filter((b) => b.featured);
  const rest = credentialBadges.filter((b) => !b.featured);

  return (
    <div>
      <div className="flex flex-col gap-3">
        {featured.map((badge) => (
          <CredentialRow key={badge.title} badge={badge} />
        ))}
      </div>

      <p className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wide text-espresso/60">
        Training &amp; Affiliations
      </p>
      <div className="flex flex-col gap-2.5">
        {rest.map((badge) => (
          <CredentialRow key={badge.title} badge={badge} />
        ))}
      </div>
    </div>
  );
}
