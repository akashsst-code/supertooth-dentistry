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

function CredentialRow({ badge, editorial }: { badge: CredentialBadge; editorial: boolean }) {
  const Icon = iconMap[badge.icon];
  return (
    /* py-1.5 rather than py-2: the rows are single-line and the divider
       already separates them, so 12px of padding was buying air the
       section didn't need. items-start (with the icon nudged onto the
       first line) so a title that wraps in a narrow column keeps its
       glyph beside the first line instead of centring it against two. */
    <li title={badge.detail} className="flex items-start gap-2.5 py-1.5">
      <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-dark" />
      <span
        className={`text-sm leading-snug text-espresso ${
          editorial ? "font-editorial font-light" : "font-display"
        }`}
      >
        {badge.title}
      </span>
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
 * locked display font), a hairline divider *between* rows via
 * `divide-y` rather than a border *around* each one. The spec's own
 * color tokens (navy/teal/cream) are NOT used here — Akash's explicit
 * call was to keep this site's locked palette (Warm Ivory/Terracotta/
 * Espresso/Sand) and only take the structural idea, not the new brand
 * colors (CLAUDE.md's base-color-token guardrail). The existing custom
 * icons (not real org logos — see the PR #60 trademark discussion)
 * carry over as the spec's optional "decorative leading monogram,"
 * `aria-hidden` since the row's visible text already states the same
 * information.
 *
 * Rows are single-line, not the two-line title/detail stack the first
 * version of this pass shipped — that read as too tall on review
 * ("compress and design for 1/2 page scan, why so much space"). The
 * detail/context line still exists, as a native `title` tooltip on the
 * row rather than a second visible line — same density trick the pill
 * version used, now applied to this layout. This is also explicitly
 * covered by the spec's own Option 05 ("vertical space is the scarcest
 * resource... a single line delivers essentially all the credibility
 * of the logo block in roughly a tenth of the height"), not a
 * departure from it.
 *
 * 2026-09-03 density pass (Akash: "is there a way to organize them with
 * lesser space, but without crowding"). The wordmark-list treatment
 * above is unchanged — same rows, same order, same 14px type, nothing
 * dropped. The height comes out of spacing and layout instead:
 *
 * - `p { margin-bottom: 2em }` in globals.css was landing on all three
 *   group labels — 84px of dead space, the single biggest thing making
 *   the list tall. Killed, and replaced by 8px on the list, which also
 *   puts a label nearer its own rows than the next group.
 * - Rows drop from py-2 to py-1.5; they are single-line and already
 *   divided, so the extra 4px was buying nothing.
 * - With `columns`, the three groups sit side by side from md up.
 *
 * Two things had to be true for the columns not to be a trade: the
 * homepage caller moved this block out of the bio's right-hand column
 * and gave it the full section width, so a desktop column is wider than
 * the old single stack rather than narrower; and mobile keeps one
 * column, because at the 480px mobile container two columns would wrap
 * the longer titles to three lines apiece. Net height in the homepage's
 * editorial variation: ~440px -> 162px on desktop, ~443px -> 371px on
 * mobile, with nothing removed and no type made smaller.
 */
export function CredentialBadges({
  // `editorial` swaps Fraunces/semibold for Manrope at the weights it is
  // actually loaded at (300–500), for the homepage's editorial variation.
  // Default is the original treatment, so /about is unaffected. The
  // group label also moves off 11px onto the 14px `text-xs` token —
  // globals.css raised that token specifically to hold a fine-print
  // floor, and the editorial pass had no reason to keep undercutting it.
  editorial = false,
  // Opt-in, not automatic: the three groups only sit side by side where
  // the caller actually has the width for it. The homepage gives this
  // block the full section (~1150px, so ~350px a column and every row
  // still one line); TrustBlock and /about hand it a ~600px bio card,
  // where three columns measure 181px and wrap most rows onto two lines
  // — denser on paper, crowded in practice, which is the thing Akash
  // ruled out. Those two callers keep the stack (and still get the
  // margin/padding tightening below).
  columns = false,
  // Akash's 2×2 request. Supersedes `columns` when both are passed.
  // See QuadrantCredentials below for why the data suits it.
  quadrant = false,
}: {
  editorial?: boolean;
  columns?: boolean;
  quadrant?: boolean;
} = {}) {
  const groups = groupOrder
    .map((group) => ({ group, items: credentialBadges.filter((b) => b.group === group) }))
    .filter((g) => g.items.length > 0);

  if (quadrant) return <QuadrantCredentials editorial={editorial} />;

  return (
    /* The density pass Akash asked for ("lesser space, but without
       crowding"). Nothing is removed and no type gets smaller — with
       `columns` the three groups simply stop stacking once the caller
       has width for them to sit side by side. On the homepage this now
       spans the full section rather than the bio's right-hand column
       (see EditorialTrustBlock), so a desktop column measures 347px —
       wider per row than the single stacked column was, not narrower,
       and every row still fits on one line (verified in the browser at
       1280px, including the longest title).
       Below md it stays one column everywhere: the mobile container
       tops out at 480px, and two columns there would wrap the longer
       titles onto three lines each, which is exactly the crowding to
       avoid. Mobile's saving comes from the label margin and the row
       padding instead — see the two comments below. */
    <div
      className={`grid grid-cols-1 gap-y-4 ${
        columns ? "md:grid-cols-3 md:gap-x-10 md:gap-y-0 lg:gap-x-14" : ""
      }`}
    >
      {groups.map(({ group, items }) => (
        <div key={group}>
          {/* mb-0! matters more than it looks: globals.css sets
              `p { margin-bottom: 2em }`, so each group label was
              carrying ~28px of trailing margin — 84px of dead space
              across the three, and the single largest thing making this
              list tall. The ul's own mt-2 replaces it with 8px, which
              also fixes the proximity that margin got backwards: a
              label now sits nearer its own rows (8px) than to the next
              group (16px). */}
          <p
            className={`mb-0! uppercase text-terracotta-dark ${
              editorial
                ? "font-editorial text-xs font-medium tracking-[0.16em]"
                : "font-display text-xs font-semibold tracking-[0.14em]"
            }`}
          >
            {group}
          </p>
          <ul className="mt-2 divide-y divide-espresso/12">
            {items.map((badge) => (
              <CredentialRow key={badge.title} badge={badge} editorial={editorial} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * Quadrant layout — Akash's request: "top left experience and education,
 * top right professional memberships, bottom left and right
 * certifications and training split in two."
 *
 * The data happens to suit it exactly, which is why it works rather than
 * merely fits: Experience & Education and Professional Memberships hold
 * two items each, and Certifications & Training holds four, so splitting
 * that group across the bottom two cells gives every quadrant the same
 * two rows. No cell is padded out and none overflows. Worth noting the
 * balance is a property of today's content — if a fifth certification or
 * a third membership is ever added, the bottom row absorbs it (the
 * split is computed, not hardcoded) but the top row would go uneven.
 *
 * Certifications keeps ONE label spanning both bottom cells rather than
 * being relabelled twice. Two identical headings would read as two
 * different groups, which is a factual claim about her credentials that
 * isn't true.
 *
 * The cross rules are what make it read as quadrants without adding
 * cards — the spec keeps cards uncommon (Section 9), and this section
 * already sits inside a bordered block on the homepage.
 *
 * Mobile stacks. Two columns at the 480px mobile container leave ~137px
 * of text width per cell, which wraps "AACE Trained and Certified Botox
 * Provider" to three lines and most others to two — measured, and it is
 * the precise crowding Akash ruled out in the density pass ("lesser
 * space, but without crowding"). The quadrant grid engages at md, where
 * a cell measures ~350px and every row stays on one line.
 */
function QuadrantCredentials({ editorial }: { editorial: boolean }) {
  const pick = (group: CredentialBadge["group"]) =>
    credentialBadges.filter((b) => b.group === group);

  const experience = pick("Experience & Education");
  const memberships = pick("Professional Memberships");
  const certs = pick("Certifications & Training");
  // Split rather than sliced at a fixed index, so an added certification
  // lands in the second cell instead of silently disappearing.
  const half = Math.ceil(certs.length / 2);
  const certsLeft = certs.slice(0, half);
  const certsRight = certs.slice(half);

  const label = editorial
    ? "font-editorial text-xs font-medium tracking-[0.16em]"
    : "font-display text-xs font-semibold tracking-[0.14em]";

  return (
    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:gap-x-14">
      {/* Top left */}
      <div className="md:border-b md:border-espresso/12 md:pb-7">
        <p className={`mb-0! uppercase text-terracotta-dark ${label}`}>Experience &amp; Education</p>
        <CredentialList items={experience} editorial={editorial} />
      </div>

      {/* Top right — the vertical half of the cross. */}
      <div className="md:border-b md:border-l md:border-espresso/12 md:pb-7 md:pl-10 lg:pl-14">
        <p className={`mb-0! uppercase text-terracotta-dark ${label}`}>Professional Memberships</p>
        <CredentialList items={memberships} editorial={editorial} />
      </div>

      {/* Bottom row — one label across both cells, then the items split.
          `md:col-span-2` for the label with the list re-gridded beneath
          it, rather than two sibling cells, so the heading genuinely
          spans the pair instead of sitting over the left one. */}
      <div className="md:col-span-2 md:pt-7">
        <p className={`mb-0! uppercase text-terracotta-dark ${label}`}>
          Certifications &amp; Training
        </p>
        <div className="md:grid md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
          <CredentialList items={certsLeft} editorial={editorial} />
          <div className="md:border-l md:border-espresso/12 md:pl-10 lg:pl-14">
            <CredentialList items={certsRight} editorial={editorial} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CredentialList({ items, editorial }: { items: CredentialBadge[]; editorial: boolean }) {
  return (
    <ul className="mt-2 divide-y divide-espresso/12">
      {items.map((badge) => (
        <CredentialRow key={badge.title} badge={badge} editorial={editorial} />
      ))}
    </ul>
  );
}
