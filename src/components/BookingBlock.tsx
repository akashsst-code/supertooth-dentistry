import { contact, hoursByDay } from "@/lib/content";
import { Accent, Body, Eyebrow, SectionHeading, shellWide } from "./editorial";
import { CalendarIcon, MapPinIcon, MedicalCrossIcon, PhoneIcon } from "./icons";

/**
 * Booking block — docs/supertooth-ux-flow.md Section 4 / build-spec
 * Section 6. Locked architecture is Webflow(now Next.js) front end calling
 * a Tab32-backed service API for real-time slots — that service layer
 * does not exist yet (open sub-questions: hosting, auth, response shape).
 *
 * This is a functional stand-in, not a mock: the CTA works (routes to
 * Contact / tel:), but copy deliberately avoids claiming real-time
 * availability or instant confirmation, since that would be an
 * unverifiable claim until the Tab32 integration is actually built.
 * Swap this block's internals for the real widget once that lands —
 * the section position/order should not need to change.
 *
 * Reworked per Akash's "organize on alignment, remove clutter, bring a
 * picture for trust, fill in hours" call: the old single centered column
 * (CTAs + one vague "need to be seen today?" line, no address/hours) is
 * now a two-column layout — copy + CTAs + real hours/address on the
 * left, a real office photo on the right (existing photography, not a
 * new stock image — trust matters more here than elsewhere).
 *
 * Emergency line was removed entirely per Akash's call (no longer a
 * confirmed real number/contact) rather than left as a placeholder line.
 *
 * Everything here is left-aligned, never centered — Akash flagged that
 * centered text on mobile made the eye jump around instead of scanning
 * down a single edge. "Office hours" and "Location" are stacked (not
 * side-by-side); they now share one panel, see the comment on it below.
 *
 * Backlog item 34 ("prominent, honest, badged hours") — the 7:00 AM open
 * is stated inline in the "Visit us" eyebrow line rather than only living
 * inside the list below, and that list states every day, closed ones
 * included, instead of hiding them —
 * the earlier "closed isn't actionable" reasoning gave an incomplete
 * picture next to a booking CTA, which is exactly what item 34's job
 * story flags. A separate pill/badge for the open hour was tried first
 * and reverted per Akash's direct feedback ("floating") — plain text in
 * the same eyebrow reads as one line, not a bolted-on chip. Deliberately
 * still a static list, not a live "open now/closed" indicator — that's
 * explicitly out of scope for item 34 per the locked navigation
 * requirements (a static hours list is the accepted v1).
 *
 * Trust proof (Google rating + review count) USED TO sit right under the
 * reassurance line, so it was read in the same glance as the Book
 * button. Removed 2026-09-03 — Akash: "move google reviews out, or keep
 * it centered if appropriate, decide based on customer need." Moved out,
 * for two reasons that both come down to it not earning the row:
 *
 *  - It was the same figure, verbatim, as the badge in
 *    TestimonialsSection three sections above (4.9, 427). A reader
 *    reaches the Book button having already passed it; repeating it
 *    adds no information, and the identical duplicate is most of why
 *    the row read as odd rather than deliberate.
 *  - Centering it — the other option offered — is ruled out by this
 *    section's own locked rule: "Everything here is left-aligned, never
 *    centered", Akash's earlier call because centred text on mobile made
 *    the eye jump instead of scanning one edge. Left-aligned, it split
 *    the ask from its own actions.
 *
 * The trade-off, stated plainly: proof no longer sits adjacent to the
 * CTA, which is a real conversion pattern. If it should come back, the
 * place for it is tight under the body line (8px, not 28px) so it reads
 * as part of the same reassurance block — not as its own row.
 *
 * No "Get Directions" link here (tried, then removed per Akash's direct
 * feedback) — the address is plain text, same as before this pass.
 *
 * Phone button shows the number itself, not the word "Call" — same
 * "be explicit" call Akash made for the Hero CTA — and both CTAs share
 * an icon now (calendar / phone) instead of just the phone one, so the
 * pair reads as two parallel actions rather than one plain button and
 * one decorated one. Primary CTA is labeled "Book Appointment" (was
 * "Book Now") to match the renamed CTA everywhere else on the site.
 *
 * Padding/gap/text size on both CTAs (px-7→px-4, gap-2→gap-1.5,
 * text-base→text-sm, row gap-4→gap-2) were trimmed to keep them on
 * one line at mobile widths — same fix as Hero's CTA row, applied
 * here once "Book Appointment" (longer than the old "Book Now")
 * pushed this row past one line too.
 *
 * New Patient / Dental Emergency, 2026-08-31 (item 48 revision) —
 * went through several rounds of placement/treatment the same day
 * before landing here; full history in backlog.ts items 46/48. Short
 * version of what stuck:
 *
 * Dental Emergency is now the third item in "Quick actions", alongside
 * Book Appointment and Call — Akash's final call, after trying it
 * every other way (a full-width Hero button, a pill next to Book that
 * read as "the same color", plain de-emphasized text that then read as
 * "hidden"). As a compact `bg-alert` badge (undiluted hex, smaller
 * padding/font than the two primary pills, `items-center` on the row
 * so it lines up against their taller height) it reads as a real,
 * visible action without matching Book/Call's size or competing with
 * them for primacy — restraint through scale within the row, not
 * through hiding it in a different section.
 *
 * "New patient? Start here" line removed per Akash's direct feedback —
 * `/insurance-new-patients` stays reachable via the persistent nav.
 *
 * 2026-09-03, three changes from Akash's review of the v2 preview:
 *
 * 1. It now opens on the same eyebrow/heading/body the rest of the page
 *    uses, via the shared primitives with `onDark`. It had been hand-
 *    rolling a near-copy — its own eyebrow at 0.2em instead of 0.16em,
 *    a bare <h2>, no accent word — which is why this section read as
 *    outside the system even though its type was already Manrope.
 * 2. The office photo is gone. It was the right call when this block
 *    was the page's only trust visual; the page now carries the office
 *    carousel, the services photography and Dr. Archana's portrait
 *    above, so a fourth interior shot was repetition, and it was the
 *    thing forcing the two-column grid. Single column now, which also
 *    lets the copy hold a proper measure instead of a 3/5 slice.
 * 3. Privacy/Accessibility/copyright now read as part of this section
 *    rather than a separate strip pasted under it. They are NOT moved
 *    into this component, though: `<footer>` is only a contentinfo
 *    landmark as a direct child of <body>, and burying the row in a
 *    <div> here — inside <main>, no less — would have silently dropped
 *    that landmark from the homepage to win a visual. Footer gets a
 *    `merged` variant that continues this section's ground with no seam
 *    instead, so the two read as one block while the markup stays
 *    honest. This section's bottom padding is trimmed to suit.
 *
 * 4. THE GROUND IS NO LONGER ESPRESSO (Akash, on a second pass: "check
 *    style guide and see if its background is going with the theme").
 *    It isn't, on two counts. The spec's own Final CTA rule (Section 8)
 *    is "use a light surface with a single headline and one appointment
 *    button"; a dark full-width strip is permitted only "near the very
 *    bottom", which the merged legal row now is. And Section 4's usage
 *    ratio wants 75–85% warm canvas with dark reserved for "emphasis
 *    and action, not the page background" — a 660px dark panel holding
 *    hours, address, a rating line and a legal row is a background.
 *
 *    This panel is a holdover: it was built to echo the old dark hero,
 *    the same inversion EditorialTrustBlock's comment already records
 *    for the differentiator cards ("page 1 is now the light editorial
 *    hero, so the same instruction points the opposite way"). It was
 *    the last dark surface left from that design. Warm Ivory now, which
 *    also keeps the ivory/sand alternation intact against the FAQ's
 *    sand above it, and makes the terracotta Book pill the only strong
 *    colour in the section — which is the emphasis the spec wants dark
 *    green to carry.
 *
 *    Reverting is a one-word change: `bg-warm-ivory` -> `bg-espresso`
 *    here, `variant="merged"` still follows whatever this section uses,
 *    and the `onDark` props on the primitives are what flip the type.
 */
export function BookingBlock() {
  const openHours = hoursByDay.find((h) => h.time !== "Closed");

  return (
    /* Container mirrors every other editorial section's measure and
       padding (max-w-[480px] / md:max-w-[1320px], px-6 / md:px-10 /
       lg:px-16) rather than the max-w-6xl px-4 it used to use — that
       mismatch put this section's left edge a few pixels off from the
       one above it, visible as a jog when scrolling past the boundary. */
    <section id="booking" className="bg-warm-ivory text-espresso">
      <div className={`${shellWide} pb-8! md:pb-12!`}>
        <div className="md:max-w-2xl">
          <div className="text-left">
            <Eyebrow>
              Visit us{openHours && ` · Open from ${openHours.time.split(" – ")[0]}`}
            </Eyebrow>
            <SectionHeading>
              Ready to book your <Accent>visit</Accent>?
            </SectionHeading>
            <Body className="mt-4 mb-6! max-w-xl">
              Reach out and we&apos;ll find a time that works — same-day slots are often available.
            </Body>

            {/* Quick actions, rebuilt after Akash flagged the spacing:
                the three were in one `flex-wrap` row, so Book and Call
                filled row 1 to within 12px of the container's right edge
                (a dead sliver, not a margin), sat at two different
                heights because their padding differed by 2px, and the
                emergency badge dropped to row 2 ending 151px short — a
                ragged tail under a nearly-flush row.

                Then all three went full width, which Akash flagged in
                turn — three equal slabs stacked read as three primaries.
                Now there are two, and the emergency link goes back to
                the compact badge the earlier rounds actually settled on
                (backlog items 46/48): restraint through scale, not
                through hiding it. Two full-width pills with a small tag
                beneath reads as a hierarchy; three slabs read as a list.

                Why the pair is full width rather than side by side, and
                why the badge is not beside the Call button — both
                measured at this group's width (342px at 390px, 327px at
                375px): "Book Appointment" with its icon needs 170px
                against 167px in a two-column row, so pairing wrapped its
                label and made both pills 68px tall; and "Dental
                emergency" needs 197px, so it cannot share a row with
                Call (148px) inside 342px either. Full width holds one
                line down to 320px.

                The group is capped at the same max-w-md as the
                hours/location block below so the two share a left AND a
                right edge. */}
            <div className="mb-7 max-w-md">
              <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-espresso/80">
                Quick actions
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="/contact"
                  className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-3 py-3 text-sm font-medium text-warm-ivory hover:brightness-110 transition"
                >
                  <CalendarIcon />
                  Book Appointment
                </a>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full border border-espresso/20 px-3 py-3 text-sm font-medium text-espresso hover:border-terracotta-dark transition-colors"
                >
                  <PhoneIcon />
                  {contact.phone}
                </a>
              </div>
              <a
                href="/emergency"
                className="tap-target mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-alert px-3 py-2 text-xs font-medium uppercase tracking-wide text-warm-ivory hover:brightness-110 transition"
              >
                <MedicalCrossIcon className="h-3.5 w-3.5" />
                Dental emergency
              </a>
            </div>

            {/* Same max-w-md as the Quick actions group, so the two
                stack as one aligned column rather than two blocks of
                different width.

                Compressed per Akash: the two blocks were separate 16px-
                gapped groups each with a label, an icon column and
                loose 4px row gaps. They are now one panel with a
                hairline between the day rows and the address, which is
                what lets the spacing come down without the rows running
                together — the rule does the separating that the gaps
                used to.

                Days are listed individually (`hoursByDay`, derived from
                the same `hours` ranges in content.ts, so nothing new is
                claimed and the schema.org OpeningHoursSpecification
                still reads the same source). Day left, time right, which
                is the lookup pattern the nav's own hours panel already
                uses — seven "days · time" sentences would be a wall.
                The per-row clock icon is gone: it was one glyph beside
                every text row, which Section 9 of the spec rules out,
                and seven of them would have been noise rather than
                information. Closed days are dimmer than open ones so
                the four bookable days are what the eye lands on (at a
                contrast-safe step — see the comment on the rows). */}
            <div className="max-w-md rounded-2xl bg-sand/60 px-4 py-3.5">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-espresso/80">
                Office hours
              </p>
              <ul className="mb-0! flex flex-col">
                {hoursByDay.map((h) => {
                  const closed = h.time === "Closed";
                  return (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 py-[3px] text-sm leading-snug"
                    >
                      {/* /80, not /60, for the closed rows. On this
                          sand tint over ivory, espresso/60 measures
                          3.46:1 and fails AA for 14px text; /80 is
                          5.97:1. Open days stay full-strength espresso,
                          so the four bookable days are still the
                          stronger of the two — the dimming is one step
                          instead of two, and the word "Closed" carries
                          the rest. */}
                      <span className={closed ? "text-espresso/80" : "text-espresso"}>{h.day}</span>
                      <span className="text-espresso/80">{h.time}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 border-t border-espresso/12 pt-3">
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-espresso/80">
                  Location
                </p>
                <p className="mb-0! grid grid-cols-[1rem_1fr] gap-2 text-sm leading-snug text-espresso/80">
                  <MapPinIcon className="mt-0.5 shrink-0" />
                  <span>{contact.address}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
