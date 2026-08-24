"use client";

import { useState } from "react";
import { faqs, contact } from "@/lib/content";

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
    <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
        Frequently asked questions
      </h2>
      <p className="text-espresso/70 mb-10 max-w-2xl">
        Answers to what new and existing patients ask us most. Don&apos;t see yours? Call us and we&apos;ll help.
      </p>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          const isEmergency = faq.question === EMERGENCY_QUESTION;
          return (
            <div key={faq.question} className="rounded-2xl bg-warm-ivory border border-sand overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="tap-target w-full flex items-start gap-4 p-5 text-left"
              >
                <span className="flex-1 font-display text-lg font-semibold text-espresso leading-snug">
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
                  <p className="px-5 pb-5 pt-4 text-sm text-espresso/70 border-t border-sand">
                    {isEmergency ? (
                      <>
                        Call us at{" "}
                        <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="font-medium text-terracotta underline underline-offset-2">
                          {contact.phone}
                        </a>{" "}
                        — {faq.answer}
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
