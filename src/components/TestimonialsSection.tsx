"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleGIcon, PauseIcon, PlayIcon, StarIcon } from "./icons";
import { reviews, testimonials } from "@/lib/content";

const PIXELS_PER_SECOND = 22; // slower than the office reel — text needs more read time than a photo

// Avatar-roundel fill for the Google-widget-style card preview — locked
// palette tokens only (opacity/tint variants), no new hex values.
const AVATAR_COLORS = ["bg-terracotta", "bg-espresso", "bg-terracotta-dark", "bg-espresso/70", "bg-terracotta/70"];

/**
 * "What patients are saying" — positioned right after the office blurb,
 * directly per Akash's call ("right after 'our office' i'd like patient
 * testimonials"). Rebuilt from the first pass per this round of feedback:
 *
 * - No links of any kind (no "read on Google" CTA, no href anywhere) —
 *   this is a pure trust display, not a click-through to an external
 *   site. The Google rating strip stays as plain informational text
 *   (rating/count), not a link.
 * - Continuous auto-scroll loop, not a manual/snap carousel — same
 *   doubled-track + requestAnimationFrame + modulo-wrap technique as
 *   OfficeCarousel.tsx, simplified (no drag, no lightbox — there's
 *   nothing to click through to here). `dt` is clamped per frame for the
 *   same backgrounded-tab jump reason documented in OfficeCarousel.tsx.
 * - A pause control is kept (not requested, but WCAG 2.2.2 requires a way
 *   to stop auto-moving content running longer than 5s — same rule
 *   OfficeCarousel already follows, build-spec Section 7). It's a
 *   <button>, not a link.
 * - "Beautify... with some line connection from one card to another" —
 *   each card hangs from a shared horizontal rail by a short stem + dot,
 *   like cards clipped to a wire. The rail lives inside the scrolling
 *   track itself (not the outer viewport), so it travels with the cards
 *   and the connection reads as continuous through the loop.
 */
export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);

  const [userPaused, setUserPaused] = useState(false);
  // Lazy initializer (not an effect+setState) — reducedMotion never
  // drives JSX output, only whether the rAF loop below starts, so there's
  // no SSR/client render mismatch to worry about here.
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const playing = !userPaused && !reducedMotion;

  useEffect(() => {
    function measure() {
      const first = cardRefs.current[0];
      const firstOfSecondCopy = cardRefs.current[testimonials.length];
      if (first && firstOfSecondCopy) {
        loopWidthRef.current = firstOfSecondCopy.offsetLeft - first.offsetLeft;
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!playing) {
      lastFrameTimeRef.current = null;
      return;
    }
    function frame(t: number) {
      if (lastFrameTimeRef.current != null) {
        const dt = Math.min((t - lastFrameTimeRef.current) / 1000, 0.1);
        const w = loopWidthRef.current;
        let next = offsetRef.current + PIXELS_PER_SECOND * dt;
        if (w > 0) next = next % w;
        offsetRef.current = next;
        if (trackRef.current) trackRef.current.style.transform = `translateX(-${next}px)`;
      }
      lastFrameTimeRef.current = t;
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastFrameTimeRef.current = null;
    };
  }, [playing]);

  return (
    <section className="bg-espresso text-warm-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="relative flex flex-wrap items-end justify-between gap-4 mb-12 pr-14">
          {/* Pause/play — WCAG 2.2.2 requires a way to stop auto-moving
              content, but it doesn't need to sit inside the rating badge's
              row competing for space with it. Anchored to this row's own
              corner instead, clear of both the heading and the badge. */}
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Resume testimonial scroll" : "Pause testimonial scroll"}
            aria-pressed={userPaused}
            className="tap-target absolute top-0 right-0 inline-flex items-center justify-center rounded-full border border-warm-ivory/20 text-warm-ivory/70 hover:text-warm-ivory hover:border-warm-ivory/40 transition-colors"
          >
            {userPaused ? <PlayIcon /> : <PauseIcon />}
          </button>

          <h2 className="font-display text-2xl sm:text-3xl font-semibold">What patients are saying</h2>
          {/* Rating badge — was a bare 16px icon sitting directly on the
              dark section with no container of its own, easy to miss and
              too small for the Google "G"'s four brand colors to read
              clearly. Sized up and given a proper white roundel + bordered
              pill so both the badge and the logo's color read at a glance. */}
          <div className="flex items-center gap-2.5 rounded-full bg-warm-ivory/10 border border-warm-ivory/25 pl-2 pr-4 py-2 text-warm-ivory/90 text-sm font-medium">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warm-ivory">
              <GoogleGIcon className="h-5 w-5" />
            </span>
            <span className="flex gap-0.5 text-terracotta">
              <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
            </span>
            <span className="font-display text-base font-semibold text-warm-ivory">{reviews.rating}</span>
            <span>({reviews.count})</span>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="relative flex items-start gap-10 w-max pt-9"
            style={{ willChange: "transform" }}
          >
            {/* The connecting rail — a child of the scrolling track itself,
                so it moves with the cards and the "chain" stays unbroken
                through the loop. */}
            <div className="absolute inset-x-0 top-4 h-px bg-terracotta/40" aria-hidden="true" />

            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                aria-hidden={i >= testimonials.length}
                className="relative shrink-0 w-72 sm:w-80"
              >
                {/* Stem + node connecting this card up to the rail */}
                <span
                  className="absolute left-8 -top-9 h-9 w-px bg-terracotta/40"
                  aria-hidden="true"
                />
                <span
                  className="absolute left-8 -top-9 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-terracotta"
                  aria-hidden="true"
                />

                {/* PREVIEW: Google-widget-style card, swapped in to compare
                    against the custom quote-card look above. White/light
                    surface (real Google review cards are light, even
                    embedded on a dark page), an avatar-initial roundel
                    (real widgets fall back to exactly this when a
                    reviewer has no profile photo), the real "Local Guide ·
                    N reviews" meta line and real relative timestamp
                    pulled at the same time as the quotes, and a small "G"
                    mark reading as "posted on Google" rather than this
                    site's own custom quote-mark branding. Name stays
                    first-name + last-initial — an actual live widget
                    would show Google's full public display name (that's
                    Google's own platform content, not this site curating
                    a named patient into its own marketing copy, which is
                    the more defensible case for full names per the HIPAA
                    discussion) but this is a static restyle of already-
                    curated quotes, not a live embed, so the redacted
                    format stays until/unless a real widget is built. */}
                <div className="rounded-2xl bg-warm-ivory text-espresso p-5 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-semibold text-warm-ivory ${
                        AVATAR_COLORS[i % AVATAR_COLORS.length]
                      }`}
                      aria-hidden="true"
                    >
                      {t.initial}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-espresso truncate">{t.name}</span>
                      <span className="block text-xs text-espresso/50 truncate">{t.meta}</span>
                    </div>
                    <GoogleGIcon className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="flex gap-0.5 text-terracotta">
                      <StarIcon className="h-3.5 w-3.5" /> <StarIcon className="h-3.5 w-3.5" />{" "}
                      <StarIcon className="h-3.5 w-3.5" /> <StarIcon className="h-3.5 w-3.5" />{" "}
                      <StarIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs text-espresso/45">{t.postedAt}</span>
                  </div>
                  <p className="text-sm text-espresso/80 leading-relaxed mb-0">{t.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
