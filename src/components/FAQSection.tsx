"use client";

import { useState } from "react";
import { faqs, contact } from "@/lib/content";
import { Accent, Eyebrow, SectionHeading, shellWide } from "./editorial";

const EMERGENCY_QUESTION = "What should I do if I have a dental emergency?";

/**
 * Homepage FAQ — AEO/SEO-required per docs/supertooth-webflow-build-spec.md
 * Section 7 ("FAQ content structured as direct Q&A pairs", "Schema markup:
 * LocalBusiness / Dentist / FAQPage"). See content.ts `faqs` for sourcing
 * and the no-unverifiable-claims trims made to the practice's own live
 * FAQ content.
 *
 * Placed right after NewPatientOffersBlock and before BookingBlock —
 * resolves last-minute objections (insurance, cost, cancellation,
 * emergencies) right before the booking ask, without touching the
 * earlier trust/testimonials/services/map ordering Akash has already
 * locked through several rounds of feedback.
 *
 * Each item uses the same +/- accordion pattern Akash asked for on
 * InsuranceExpandCard.tsx (competitor-site reference), reimplemented
 * locally here rather than sharing a component — this is a plain list of
 * independent open/closed items, not the same insurance-card layout, so
 * copying just the interaction (button + rotating plus/minus + grid-rows
 * transition) keeps this file self-contained.
 *
 * FAQPage JSON-LD is emitted from the same `faqs` array so the visible
 * accordion and the structured data can never drift apart — one source
 * of truth, per docs/supertooth-build-principles.md Section 2.
 */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.question === EMERGENCY_QUESTION ? `Call us at ${contact.phone} — ${f.answer}` : f.answer,
      },
    })),
  };

  return (
    /* Sand, not Warm Ivory. Removing the offers block put Location
       (ivory) directly above this section, and two ivory sections back
       to back lose the colour boundary that carries every other
       transition down this page. */
    <section id="faq" className="bg-sand">
      <div className={shellWide}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Eyebrow>Good to know</Eyebrow>
      {/* Straight into the questions (Akash) — the standing line here
          ("Answers to what new and existing patients ask us most...")
          was preamble in front of a list that explains itself. Its one
          substantive half, the invitation to call, is already a real
          answer inside the emergency question and a Quick action in the
          section below. */}
      <SectionHeading className="mb-10">
        Frequently asked <Accent>questions</Accent>.
      </SectionHeading>

      {/* Reading measure, left-aligned against the page's spine rather
          than centred — see the shellWide comment in editorial.tsx. */}
      <div className="flex flex-col gap-3 md:max-w-3xl">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          const isEmergency = faq.question === EMERGENCY_QUESTION;
          return (
            /* Borderless: this section's ground moved to Sand, where a
               border-sand outline measures about 1.2:1 and is effectively
               invisible. Ivory on sand is its own boundary — the same
               call already made for the differentiator rows in
               EditorialTrustBlock. */
            <div key={faq.question} className="overflow-hidden rounded-2xl bg-warm-ivory">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="tap-target w-full flex items-start gap-4 p-5 text-left"
              >
                <span className="flex-1 font-editorial text-lg font-medium text-espresso leading-snug">
                  {faq.question}
                </span>
                <span
                  className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/10 text-terracotta mt-0.5"
                  aria-hidden="true"
                >
                  <PlusMinusIcon open={open} />
                </span>
              </button>

              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2 px-5 pb-5 pt-4 border-t border-sand">
                    {isEmergency && (
                      <a
                        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                        className="tap-target inline-flex w-fit items-center font-medium text-terracotta-dark underline underline-offset-2"
                      >
                        Call us at {contact.phone}
                      </a>
                    )}
                    <p className="text-sm text-espresso/70">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
}

/** Plus that morphs into a minus on open — same visual language as InsuranceExpandCard.tsx. */
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
