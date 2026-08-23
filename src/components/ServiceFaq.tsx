import { serviceFaqs } from "@/lib/content";

/**
 * Static (not accordion/JS-collapsed) Q&A list — per the locked AEO
 * Build Constraint in docs/supertooth-priority-dimensions.md, answers
 * need to be readable by answer engines without interaction, so this
 * stays server-rendered plain text rather than client-side collapsed.
 * FAQPage schema included for the same reason.
 */
export function ServiceFaq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">
          Common questions
        </h2>
        <div className="mt-8 flex flex-col gap-6">
          {serviceFaqs.map((item) => (
            <div key={item.q}>
              <h3 className="font-display text-base font-semibold text-espresso sm:text-lg">{item.q}</h3>
              <p className="mt-2 text-sm text-espresso/70 sm:text-base">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
