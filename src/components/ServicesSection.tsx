import Link from "next/link";
import {
  AlertIcon,
  AlignIcon,
  ClockIcon,
  CrownIcon,
  ImplantIcon,
  SparkleIcon,
} from "./icons";
import { Placeholder } from "./Placeholder";
import { services } from "@/lib/content";

const serviceIcons = [ClockIcon, CrownIcon, SparkleIcon, AlignIcon, ImplantIcon, AlertIcon];

/**
 * Services teaser — new section, positioned after testimonials per
 * Akash's locked homepage-flow order. Inspired by
 * smilemakersfortworth.com's card-per-service layout ("look at services,
 * how beautifully crafted"), adapted to icon cards rather than stock
 * treatment photos — the site's real-photography-only rule (build-spec
 * Section 8) exists specifically to protect the trust signal team/office
 * photos carry, and generic service imagery would undercut that same
 * signal here.
 *
 * Each card links to /services — that page doesn't exist in this repo
 * yet (tracked separately, see the stale open feature/services-page
 * PR flagged in this PR's description), but /services is already what
 * Nav.tsx points to, so this keeps the same not-yet-built destination
 * rather than inventing a different one.
 */
export function ServicesSection() {
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
          What we treat
        </h2>
        <p className="text-espresso/70 mb-10 max-w-2xl">
          General, cosmetic, and restorative care — under one roof, close to home.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <div
                key={s.title}
                className="rounded-2xl bg-warm-ivory border border-sand p-6 flex flex-col gap-3"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <Icon />
                </span>
                <h3 className="font-display text-lg font-semibold text-espresso">{s.title}</h3>
                <p className="text-sm text-espresso/70 flex-1">
                  {s.real ? s.detail : <Placeholder>{s.detail}</Placeholder>}
                </p>
                <Link
                  href="/services"
                  className="tap-target -mx-1 inline-flex items-center px-1 text-sm font-medium text-terracotta hover:text-terracotta-dark self-start"
                >
                  Learn more →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
