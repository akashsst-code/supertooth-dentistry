import { benefitsGlossary } from "@/lib/content";

/**
 * Backlog item 51 — five plain-language terms, each paired with what it
 * means for the patient's bill. Deliberately short reflowing blocks, not
 * a table: a comparison table is a guaranteed 320px overflow (item 51's
 * own HealthCare.gov reference), and this renders inline next to the
 * coverage content rather than on a separate glossary page.
 */
export function BenefitsGlossary() {
  return (
    <div className="rounded-2xl border border-sand bg-warm-ivory p-6 sm:p-8">
      <h2 className="font-display text-lg font-semibold text-espresso mb-1">What the terms mean</h2>
      <p className="text-sm text-espresso/60 leading-relaxed !mb-5">
        The five words that show up most on an insurance statement, in plain English.
      </p>
      <dl className="space-y-4">
        {benefitsGlossary.map(({ term, definition, meaning }) => (
          <div key={term} className="border-t border-sand pt-4 first:border-t-0 first:pt-0">
            <dt className="font-display text-base font-semibold text-espresso">{term}</dt>
            <dd className="mt-1 text-espresso/80 leading-relaxed">{definition}</dd>
            <dd className="mt-1 text-sm text-espresso/60 leading-relaxed">{meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
