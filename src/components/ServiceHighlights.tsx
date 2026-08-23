import { Placeholder } from "./Placeholder";
import { insuranceCarriers, serviceHighlights } from "@/lib/content";

/**
 * Expanded version of the three homepage differentiator badges — see the
 * JTBD rationale in content.ts. Ordered same-day-crowns first per the
 * /services priority list: it's the highest-leverage proof point for the
 * primary routine/proactive segment (Stage 3 evaluation), not just the
 * most urgent-sounding one.
 */
export function ServiceHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex flex-col gap-10">
        {serviceHighlights.map((service) => (
          <div key={service.title} className="rounded-2xl bg-sand/40 border border-sand p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-espresso sm:text-2xl">
              {service.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-terracotta">{service.summary}</p>
            <p className="mt-4 max-w-2xl text-sm text-espresso/70 sm:text-base">{service.explainer}</p>

            {service.points.length > 0 && (
              <ul className="mt-5 flex flex-col gap-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-espresso/80">
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {service.title === "In-network with most plans" && (
              <div className="mt-5 flex flex-wrap gap-2">
                {insuranceCarriers.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-full bg-warm-ivory px-3 py-1 text-xs font-medium text-espresso border border-sand"
                  >
                    <Placeholder>{c}</Placeholder>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0 text-terracotta"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
