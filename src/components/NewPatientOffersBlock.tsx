"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Placeholder } from "./Placeholder";
import { offers } from "@/lib/content";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

const cards = [offers.newPatient, offers.invisalign];

/**
 * New-patient offers — split out of the old InsuranceOfferBlock and
 * moved to the end of the homepage flow, right before the booking CTA,
 * per Akash's explicit call: offers stay last regardless of what else
 * gets added above (testimonials/services/credentials/map) —
 * reinforcement right before the ask, not competing with trust-building
 * earlier in the page.
 *
 * Rebuilt as a swipeable card carousel (Akash's reference: a specials
 * section with one big rounded card in view and the next peeking at the
 * edge). Native `overflow-x-auto` + `snap-x` drives the swipe itself —
 * touch/trackpad scrolling works for free, no hand-rolled pointer-drag
 * logic needed (unlike OfficeCarousel.tsx, which needs that because it's
 * a continuously-animating reel; this is a plain user-driven scroller,
 * so there's nothing to fight over). Chevron buttons + dots are there
 * for mouse-only desktop users and to show position — `scrollIntoView`
 * on the target card, not manual scrollLeft math. Active card is tracked
 * via IntersectionObserver against the scroll container so the dots/
 * chevrons stay in sync however the user got there (swipe, drag, or
 * button). No autoplay, so none of the WCAG 2.2.2 pause-control
 * machinery OfficeCarousel.tsx needs applies here.
 *
 * Cards keep the "half page picture and 1 line text offer" content call
 * (offer copy stays a single line, no separate headline/subhead
 * invented) but restyled as a standalone rounded card — sand surface,
 * eyebrow label, and the photo as a circular portrait rather than a
 * half-card rectangle, closer to the reference look. Images are a
 * temporary internet stand-in — see content.ts `offers` comment.
 */
export function NewPatientOffersBlock() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const index = cardRefs.current.findIndex((el) => el === mostVisible.target);
        if (index !== -1) setActive(index);
      },
      { root: track, threshold: [0.6] },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToIndex(index: number) {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">New-patient offers</h2>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            aria-label="Previous offer"
            className="tap-target inline-flex items-center justify-center rounded-full border border-espresso/15 text-espresso/70 hover:text-espresso hover:border-terracotta/50 disabled:opacity-30 disabled:hover:border-espresso/15 transition-colors"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === cards.length - 1}
            aria-label="Next offer"
            className="tap-target inline-flex items-center justify-center rounded-full border border-espresso/15 text-espresso/70 hover:text-espresso hover:border-terracotta/50 disabled:opacity-30 disabled:hover:border-espresso/15 transition-colors"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((offer, i) => (
          <div
            key={offer.text}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative shrink-0 snap-center w-[85%] sm:w-[62%] md:w-[46%] rounded-3xl bg-sand p-8 sm:p-10 flex flex-col"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark mb-4">{offer.label}</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-espresso leading-snug mb-6">
              <Placeholder>{offer.text}</Placeholder>
            </p>
            <a
              href="/contact"
              className="inline-flex w-fit items-center font-semibold text-terracotta-dark hover:text-terracotta underline underline-offset-4 decoration-2 mb-8"
            >
              Schedule this offer
            </a>
            <div className="relative mt-auto mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-warm-ivory shadow-md">
              <Image
                src={offer.image.src}
                alt={offer.image.alt}
                fill
                sizes="(min-width: 640px) 12rem, 10rem"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {cards.map((offer, i) => (
          <button
            key={offer.text}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to offer ${i + 1}: ${offer.label}`}
            aria-current={active === i ? "true" : undefined}
            className="tap-target flex items-center justify-center"
          >
            <span className={`h-2 rounded-full transition-all ${active === i ? "w-6 bg-terracotta" : "w-2 bg-terracotta/30"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
