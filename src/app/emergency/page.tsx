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
          <div className="mx-auto max-w-2xl px-4 sm:px-6 py-3 flex items-center gap-3">
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

        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10">
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
            <p className="text-sm text-espresso/80 mb-3">{tier1.when}</p>
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
          <a
            href={tel}
            className="tap-target w-full inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-6 py-4 text-base font-semibold text-warm-ivory hover:brightness-110 transition mb-2"
          >
            <PhoneIcon />
            Call {contact.phone}
          </a>
          <Link
            href="/contact"
            className="tap-target w-full inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso hover:border-terracotta-dark hover:text-terracotta-dark transition-colors mb-6"
          >
            <CalendarIcon />
            Schedule now
          </Link>

          <p className="text-sm text-espresso/70 mb-8">{emergencyGuidance.afterHours}</p>

          <div className="rounded-2xl bg-sand/40 border border-sand p-5 sm:p-6 mb-4">
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

          <div className="rounded-2xl bg-warm-ivory border border-sand p-5 sm:p-6 mb-6">
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

          <p className="text-sm text-espresso/70 italic">{emergencyGuidance.erNote}</p>
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
