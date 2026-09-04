import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CalendarIcon, MedicalCrossIcon, PhoneIcon } from "@/components/icons";
import { contact, emergencyGuidance } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dental Emergency | Super Tooth Dentistry",
  description:
    "What to do for a dental emergency — when to call 911 or go to the ER, when to call us, and first aid while you wait.",
};

/**
 * /emergency — backlog item 7. Non-diagnostic, three-tier guidance
 * sourced from ADA MouthHealthy (see content.ts `emergencyGuidance`
 * comment for the full sourcing note). Tier 1 (911/ER) renders first in
 * both DOM and visual order and must be visible at 375×812 without
 * scrolling — the single most important layout constraint on this page,
 * per that item's own test harness. `afterHours` is Akash's confirmed
 * after-hours reality (2026-09-01): call, or book online now — no
 * invented response-time promise anywhere on this page.
 */
export default function EmergencyPage() {
  const [tier1, tier2, tier3] = emergencyGuidance.tiers;
  const tel = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <div className="border-b border-sand bg-warm-ivory">
          <div className="mx-auto max-w-2xl lg:max-w-4xl px-4 sm:px-6 py-3 flex items-center gap-3">
            <Link
              href="/"
              className="tap-target inline-flex items-center gap-1.5 text-sm font-medium text-espresso/70 hover:text-terracotta transition-colors -ml-2 px-2"
            >
              <BackArrowIcon />
              Back
            </Link>
            <span className="text-espresso/20" aria-hidden="true">
              /
            </span>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-espresso/70">
                <li>
                  <Link href="/" className="hover:text-terracotta transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-espresso font-medium">
                  Dental Emergency
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-2xl lg:max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-alert mb-2">Dental emergency</p>
          <h1 className="font-display text-2xl sm:text-4xl font-semibold text-espresso leading-tight mb-5">
            What to do right now
          </h1>

          {/* Tier 1 — first in DOM order, visually the most urgent. Kept
              compact (heading + three short bullets) specifically so it
              stays inside the first 375×812 viewport alongside the call
              button below it. */}
          <div className="rounded-2xl border-2 border-alert bg-alert/5 p-5 sm:p-6 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MedicalCrossIcon className="text-alert h-5 w-5 shrink-0" />
              <h2 className="font-display text-lg sm:text-xl font-semibold text-alert">{tier1.tier}</h2>
            </div>
            <p className="text-sm text-espresso/80 mb-3 lg:max-w-[68ch]">{tier1.when}</p>
            <ul className="flex flex-col gap-1.5">
              {tier1.symptoms.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-espresso">
                  <span className="text-alert" aria-hidden="true">
                    •
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* One-tap call control — thumb zone, ≥44px, dials the confirmed
              number from item 3. */}
          {/* Full-width stacked on a phone — where a thumb-width target
              is the point — and a row from sm up. A 100%-width pill is a
              mobile affordance; at 896px it renders an 848px-wide button,
              which reads as a banner rather than a control and puts the
              label a long way from where the eye lands. The wrapper's
              `gap-2`/`mb-6` reproduce the mb-2/mb-6 the two controls
              carried individually, so the phone layout is pixel-identical
              to what was reviewed. Call keeps the filled surface and
              stays first in DOM and visual order — this is the one page
              where the primary action is Call, not Book. */}
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={tel}
              className="tap-target w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-6 py-4 text-base font-semibold text-warm-ivory hover:brightness-110 transition"
            >
              <PhoneIcon />
              Call {contact.phone}
            </a>
            <Link
              href="/contact"
              className="tap-target w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso hover:border-terracotta-dark hover:text-terracotta-dark transition-colors"
            >
              <CalendarIcon />
              Schedule now
            </Link>
          </div>

          <p className="text-sm text-espresso/70 mb-8 lg:max-w-[68ch]">{emergencyGuidance.afterHours}</p>

          {/* Tiers 2 and 3 sit side by side from lg. Tier 1 deliberately
              does NOT join them: the 911/ER panel has to stay first in
              both DOM and visual order and visible without scrolling
              (backlog item 7's own acceptance criterion), and giving it
              the full measure while the two lower tiers share a row is
              what preserves that ranking on a wide screen. Below lg all
              three stay stacked in the reviewed order.

              `items-start` so the shorter of the two doesn't stretch and
              imply the lists are the same length. */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-4">
          <div className="rounded-2xl bg-sand/40 border border-sand p-5 sm:p-6 mb-4 lg:mb-0">
            <h2 className="font-display text-lg font-semibold text-espresso mb-3">{tier2.tier}</h2>
            <p className="text-sm text-espresso/80 mb-3">{tier2.when}</p>
            <ul className="flex flex-col gap-1.5">
              {tier2.symptoms.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-espresso/90">
                  <span className="text-terracotta-dark" aria-hidden="true">
                    •
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-warm-ivory border border-sand p-5 sm:p-6 mb-6 lg:mb-0">
            <h2 className="font-display text-lg font-semibold text-espresso mb-3">{tier3.tier}</h2>
            <p className="text-sm text-espresso/80 mb-3">{tier3.when}</p>
            <ul className="flex flex-col gap-1.5">
              {tier3.symptoms.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-espresso/90">
                  <span className="text-terracotta-dark" aria-hidden="true">
                    •
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          </div>

          <p className="text-sm text-espresso/70 italic lg:mt-6 lg:max-w-[68ch]">{emergencyGuidance.erNote}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
