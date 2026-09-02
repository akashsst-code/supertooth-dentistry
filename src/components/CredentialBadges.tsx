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

function CredentialRow({ badge }: { badge: CredentialBadge }) {
  const Icon = iconMap[badge.icon];
  return (
    <li className="flex items-start gap-3 py-3.5">
      <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-dark" />
      <div className="min-w-0">
        <p className="font-display text-[15.5px] leading-tight text-espresso">{badge.title}</p>
        <p className="mt-0.5 text-xs leading-snug text-espresso/60">{badge.detail}</p>
      </div>
    </li>
  );
}

/**
 * Dr. Archana's credential/training-and-affiliation list — real data
 * supplied by Akash 2026-09-01 (see `credentialBadges` in content.ts).
 * Shared between TrustBlock (homepage bio card) and /about so both
 * surfaces show the same treatment instead of two divergent layouts.
 *
 * Third redesign of this section — a tiled emblem grid cramped on
 * mobile, a medallion list that read as too tall, then compact pills
 * that fixed both but still looked "disorganized" enough to warrant one
 * more pass. This pass follows the "Institutional Wordmark List"
 * pattern from the attached training-affiliation-spec.md (Option 02,
 * the spec's own explicit recommendation as "the safest premium
 * implementation... resolves every diagnosed problem while sidestepping
 * trademark exposure"): plain text rows instead of pills or cards —
 * name in serif (`font-display`, i.e. Fraunces, already this site's
 * locked display font), one muted detail line beneath, a hairline
 * divider *between* rows via `divide-y` rather than a border *around*
 * each one. The spec's own color tokens (navy/teal/cream) are NOT used
 * here — Akash's explicit call was to keep this site's locked palette
 * (Warm Ivory/Terracotta/Espresso/Sand) and only take the structural
 * idea, not the new brand colors (CLAUDE.md's base-color-token
 * guardrail). The existing custom icons (not real org logos — see the
 * PR #60 trademark discussion) carry over as the spec's optional
 * "decorative leading monogram," `aria-hidden` since the row's visible
 * text already states the same information.
 */
export function CredentialBadges() {
  const groups = groupOrder
    .map((group) => ({ group, items: credentialBadges.filter((b) => b.group === group) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-5">
      {groups.map(({ group, items }) => (
        <div key={group}>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-dark">
            {group}
          </p>
          <ul className="mt-1 divide-y divide-espresso/12">
            {items.map((badge) => (
              <CredentialRow key={badge.title} badge={badge} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
