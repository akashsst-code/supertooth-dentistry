"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { CalendarIcon, PhoneIcon } from "./icons";
import { contact, insuranceCarriers } from "@/lib/content";

/**
 * Generic tap-to-expand differentiator-card row. Went through four
 * visual passes: a dark espresso-panel treatment (echoing Hero.tsx)
 * landed first, but Akash flagged it back as "the pills look like dark
 * design" with icons that "are not aesthetic" — reverted to a light
 * warm-ivory surface with a solid terracotta icon badge and a soft
 * ambient shadow/gradient wash. Akash liked that direction but asked for
 * "more clear design," so the soft/ambient cues were swapped for
 * crisper, more deliberate ones: a solid 3px terracotta top accent bar,
 * a stronger drop shadow, a bordered (not just tinted) +/- toggle, and a
 * clearer type scale. Akash then asked whether the generic clock/crown/
 * shield line icons were even needed, or if there's a more aesthetic
 * render — the badge (`image`, required) is now a small circular crop
 * of a real photo, not an abstract icon, consistent with "people trust
 * images more" (Akash's stated reason for the Archana bio card and
 * office-carousel treatments elsewhere on this page).
 *
 * `photo` (optional, separate from `image`) is the larger photo shown
 * in the expanded panel — Akash's next round asked to work backward
 * from what each card's expanded content is actually for, rather than
 * repeating the same photo+note+CTA shape 3 times: same-day
 * appointments and in-network don't need a big photo at all (see
 * `CallFirstCtaRow` and `InsuranceExpandCard` below), so only the
 * same-day-crowns card passes `photo` — and that one specifically
 * because a before/after clinical macro shot is exactly the kind of
 * proof patients want to see for that claim, framed with a border/
 * shadow and an authenticity caption so it reads as a curated result
 * photo rather than a raw clinical snapshot.
 *
 * Extracted 2026-08-29 from what used to be an insurance-only component
 * (see `InsuranceExpandCard` below) once "Same-day appointments" and
 * "Same-day crowns" needed the same tap-to-expand affordance — sharing
 * one shell keeps all 3 cards' interaction from drifting apart.
 */
export function ExpandCard({
  title,
  detail,
  image,
  photo,
  className = "",
  children,
}: {
  title: string;
  detail: string;
  image: { src: string; alt: string };
  photo?: { src: string; alt: string };
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl bg-warm-ivory border border-sand shadow-[0_1px_2px_rgba(61,50,38,0.05),0_14px_28px_-16px_rgba(61,50,38,0.45)] overflow-hidden ${className}`}
    >
      <div className="h-[3px] bg-terracotta" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="tap-target w-full flex items-center gap-3.5 p-4 text-left"
      >
        <span className="shrink-0 relative inline-flex h-11 w-11 rounded-full overflow-hidden ring-4 ring-warm-ivory shadow-[0_3px_8px_rgba(61,50,38,0.3)]">
          <Image src={image.src} alt="" fill sizes="44px" className="object-cover" />
        </span>
        <span className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-espresso leading-tight">{title}</h3>
          <span className="block text-sm text-espresso/50 leading-snug">{detail}</span>
        </span>
        <span
          className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-terracotta/25 bg-terracotta/10 text-terracotta"
          aria-hidden="true"
        >
          <PlusMinusIcon open={open} />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 border-t border-sand">
            {photo && (
              <div className="relative mt-3 mb-3 aspect-[16/10] rounded-xl overflow-hidden border border-sand shadow-sm">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 40rem, 90vw"
                  className="object-cover"
                />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * "Book Appointment" + phone row shown at the bottom of every expanded
 * differentiator card — the answer to "what should tapping this
 * actually do." Real booking (Tab32) isn't built yet (see BookingBlock),
 * so this doesn't fake a live-availability widget; it routes to the one
 * real, working appointment path already used site-wide (Nav, Hero,
 * BookingBlock, Footer) rather than inventing a second, competing CTA
 * destination.
 */
export function BookingCtaRow() {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <a
        href="/contact"
        className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full bg-terracotta px-4 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
      >
        <CalendarIcon />
        Book Appointment
      </a>
      <a
        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
        className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full border border-sand px-4 py-2.5 text-sm font-semibold text-espresso hover:border-terracotta/40 transition-colors"
      >
        <PhoneIcon />
        {contact.phone}
      </a>
    </div>
  );
}

/**
 * Practice hours the same-day slot preview below treats as "open" days
 * — mirrors `hours` in content.ts ("Tuesday – Friday" open,
 * "Saturday – Monday" closed). Kept as a small local day-of-week set
 * rather than parsing the display string in `hours`, but update this
 * alongside `hours` if the real schedule ever changes.
 */
const CLOSED_WEEKDAYS = [0, 1, 6]; // Sun, Mon, Sat (JS Date#getDay())

function buildOpenDays() {
  const days: { key: string; label: string; sublabel: string }[] = [];
  const today = new Date();
  for (let offset = 0; offset < 10 && days.length < 4; offset++) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    if (CLOSED_WEEKDAYS.includes(d.getDay())) continue;
    days.push({
      key: d.toDateString(),
      label: offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" }),
      sublabel: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    });
  }
  return days;
}

/**
 * Preview of what an online same-day scheduler will feel like once the
 * real Tab32 integration exists — Akash asked to show "the experience"
 * (a scrollable day picker + a few open-looking time slots) rather than
 * just a phone number. The day tabs are real (computed from today's
 * date, skipping the actual days the practice is closed — see
 * CLOSED_WEEKDAYS above), but the time slots themselves are NOT live
 * data — there's no booking backend yet (see BookingBlock.tsx), so
 * presenting specific times as real, tappable-and-it-books slots would
 * be exactly the unverifiable-availability claim
 * docs/supertooth-build-principles.md Section 8 rules out. Labeled
 * "example openings" and deliberately not clickable/bookable — the
 * actual action is `CallFirstCtaRow` directly below this, same as
 * before. Swap the static `exampleTimes` for real Tab32 data once that
 * integration exists, and this becomes the real thing rather than a
 * preview.
 */
export function SameDaySlotPreview() {
  const [days, setDays] = useState<ReturnType<typeof buildOpenDays>>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setDays(buildOpenDays());
  }, []);

  if (days.length === 0) return null;

  const exampleTimes = ["9:00 AM", "11:30 AM", "2:15 PM"];

  return (
    <div className="mb-3 rounded-xl border border-sand bg-sand/30 p-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-espresso/50">
        A look at typical same-day openings
      </p>
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {days.map((d, i) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setSelected(i)}
            aria-current={selected === i ? "true" : undefined}
            className={`tap-target shrink-0 snap-start rounded-lg px-3 py-1.5 text-center transition-colors ${
              selected === i ? "bg-terracotta text-warm-ivory" : "bg-warm-ivory text-espresso/70 border border-sand"
            }`}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-wide">{d.label}</span>
            <span className="block text-xs">{d.sublabel}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {exampleTimes.map((t) => (
          <span
            key={t}
            className="rounded-full border border-sand bg-warm-ivory px-3 py-1.5 text-sm font-medium text-espresso/70"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-2 mb-0 text-[11px] leading-snug text-espresso/45 italic">
        Example openings, not live availability — call or request below and we&apos;ll confirm today&apos;s actual
        times.
      </p>
    </div>
  );
}

/**
 * Phone-first CTA for the "Same-day appointments" card specifically —
 * docs/supertooth-ux-flow.md locks phone as the primary same-day path
 * ("phone-first, live triage for same-day slotting" during office
 * hours, booking form as fallback). There's no real-time availability
 * data to show (the Tab32 integration this would need isn't built —
 * see BookingBlock.tsx — and inventing open slots would violate the
 * no-unverifiable-claims rule), so the honest version of "give the user
 * a 1-click same-day path" is flipping the usual Book/Call pairing:
 * calling gets a real same-day answer immediately from a real person;
 * the web form is a fallback, not the fast path, for this one card.
 */
export function CallFirstCtaRow() {
  return (
    <div className="mt-3">
      <a
        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
        className="tap-target w-full flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3.5 text-base font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
      >
        <PhoneIcon />
        Call {contact.phone}
      </a>
      <a
        href="/contact"
        className="tap-target mt-2 flex items-center justify-center text-sm font-medium text-espresso/60 underline underline-offset-2 hover:text-terracotta transition-colors"
      >
        Or request an appointment online
      </a>
    </div>
  );
}

/**
 * The "In-network with most plans" differentiator card in TrustBlock,
 * made expandable — Akash asked for a +/- accordion here (referencing
 * a competitor site's INSURANCE FAQ pattern) so the full carrier list
 * is one tap away instead of only living further down in
 * InsuranceBlock (which isn't currently mounted on any page).
 *
 * First pass wrapped each name in <Placeholder> (dashed underline) —
 * Akash flagged that as visually unappealing and reading like broken
 * links. Swapped for the same typographic "wordmark badge" language
 * already established in InsuranceBlock.tsx (display-italic name +
 * soft accent circle, no underline) at a more compact scale, plus one
 * plain-text disclaimer line instead of per-name brackets. Compliance
 * intent is unchanged — insuranceCarriers is still unconfirmed against
 * the practice's real network status (see content.ts) — the
 * disclaimer line carries that instead of the dashed-underline
 * treatment, same tradeoff Akash already made for the Hero teaser.
 *
 * A thin wrapper around the generic `ExpandCard` shell above (see that
 * comment for why) — this component only owns the insurance-specific
 * expanded content. No `photo` here (Akash's call — this card should
 * "focus on the insurance list and the key tagline," not a picture):
 * the `detail` line ("We handle the insurance paperwork") is repeated
 * as a bolder standalone callout right at the top of the expanded
 * panel instead of only living in the small collapsed-row subtitle,
 * then the carrier grid + disclaimer + the shared booking CTA row every
 * expanded differentiator card ends with.
 */
export function InsuranceExpandCard({
  title,
  detail,
  image,
  className,
}: {
  title: string;
  detail: string;
  image: { src: string; alt: string };
  className?: string;
}) {
  return (
    <ExpandCard title={title} detail={detail} image={image} className={className}>
      <p className="mb-3 rounded-xl bg-terracotta/10 px-3.5 py-3 text-sm font-semibold text-espresso">{detail}</p>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-espresso/50">
        Accepted plans include
      </p>
      <div className="grid grid-cols-2 gap-2">
        {insuranceCarriers.map((c) => (
          <div key={c} className="group relative overflow-hidden rounded-xl bg-sand/40 px-3 py-3">
            <span
              className="absolute -right-3 -top-3 h-9 w-9 rounded-full bg-terracotta/10 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="relative block font-display text-sm font-semibold italic text-espresso leading-tight">
              {c}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 mb-0 text-xs text-espresso/60">Don&apos;t see your plan? Call us and we&apos;ll verify.</p>
      <BookingCtaRow />
    </ExpandCard>
  );
}

/** Plus that morphs into a minus on open — vertical stroke rotates/fades away. */
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={`origin-center transition-all duration-300 ${open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}`}
      />
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
