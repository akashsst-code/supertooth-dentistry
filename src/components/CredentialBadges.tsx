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

/** Ordered so "Experience & Education" leads (Akash's "top items") — content.ts doesn't guarantee array order across groups. */
const groupOrder: CredentialBadge["group"][] = ["Experience & Education", "Certifications & Training", "Professional Memberships"];

function CredentialPill({ badge }: { badge: CredentialBadge }) {
  const Icon = iconMap[badge.icon];
  return (
    <span
      title={badge.detail}
      className="flex items-center gap-1.5 rounded-full border border-espresso/12 bg-sand px-3 py-1.5 text-xs font-medium text-espresso"
    >
      <Icon className="shrink-0 text-terracotta-dark" />
      {badge.title}
    </span>
  );
}

/**
 * Dr. Archana's credential/training-and-affiliation badges — real data
 * supplied by Akash 2026-09-01 (see `credentialBadges` in content.ts).
 * Shared between TrustBlock (homepage bio card) and /about so both
 * surfaces show the same treatment instead of two divergent layouts.
 *
 * Compact pill groups, not a card grid or a one-per-row list — this is
 * the second redesign of this section: a tiled emblem grid cramped on
 * mobile, a medallion list fixed that but read as too tall for what's
 * fundamentally a scan-and-move-on trust signal ("compress ... near 1/2
 * page, almost like pills or pill grouped with few items logically
 * together" — Akash). Grouped into 3 labeled rows (Experience &
 * Education, Certifications & Training, Professional Memberships)
 * instead of 8 flat items, each item a pill with an icon; the fuller
 * org name still exists as a native title-attribute tooltip rather than
 * a second visible line, since that's what was taking up the vertical
 * space.
 *
 * Pills render in a `grid-cols-1 sm:grid-cols-2` per group, not a
 * `flex-wrap` row — a follow-up fix after the first pill pass read as
 * "disorganized" (Akash): flex-wrap let a short pill ("Member, AGD")
 * sit next to a long one, producing a ragged, uneven-width row. A grid
 * makes every pill in a row the same width instead. Single-column below
 * `sm:` specifically — forcing 2 columns at phone width squeezed pills
 * enough that their text wrapped to 2-3 lines, ballooning the "small
 * pill" into a tall oval, which is the opposite of what compressing
 * this section was for.
 */
export function CredentialBadges() {
  const groups = groupOrder
    .map((group) => ({ group, items: credentialBadges.filter((b) => b.group === group) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-3">
      {groups.map(({ group, items }) => (
        <div key={group}>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-espresso/50">{group}</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {items.map((badge) => (
              <CredentialPill key={badge.title} badge={badge} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
