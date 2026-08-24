"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroPhotos } from "@/lib/content";

const SLIDE_DURATION_MS = 2200;

/**
 * Hero photo carousel — replaces the old single-photo ClinicVideo panel.
 * Real photos of the team/office crossfading in sequence, each with the
 * same slow Ken Burns zoom (globals.css .animate-slow-zoom) the old panel
 * used — reads as "more than just the dentist" without pretending to be
 * an actual video. Real office/team footage still hasn't been shot (see
 * docs/supertooth-priority-dimensions.md content checklist); once it has,
 * this can be swapped for a real <video> the same way ClinicVideo.tsx's
 * header comment described.
 *
 * Deliberately no interactive controls — no dots, no pause/play, no
 * click-to-jump (Akash's explicit call: "just have photos run... this is
 * just pure trust building," not a gallery for someone to operate). The
 * repo's actual locked accessibility checklist
 * (docs/supertooth-webflow-build-spec.md Section 7) doesn't require a
 * pause control here — that was OfficeCarousel.tsx's own added rigor for
 * a *draggable* reel the user can grab, not a rule this passive
 * background slideshow inherits. prefers-reduced-motion is still
 * respected (freezes on whichever photo is showing) since that's a
 * passive system preference, not a user-facing control being asked for.
 *
 * All 5 <Image>s are always mounted and stacked, crossfading via opacity
 * — not swapped in/out — so the Ken Burns zoom (applied to all of them
 * continuously) never restarts/pops mid-transition. Only index 0 gets
 * `priority` (it's whichever photo paints first, before the post-mount
 * randomization below runs — see that effect's comment).
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playing = !reducedMotion;

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Open on a different photo each visit (Akash's call) instead of
    // always archana.webp — done post-mount, not as the initial useState
    // value, so server-rendered/first-paint markup still matches (index
    // 0) and this doesn't trigger a hydration mismatch; it just swaps
    // within the same paint cycle right after.
    setIndex(Math.floor(Math.random() * heroPhotos.length));
  }, []);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, SLIDE_DURATION_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  return (
    <div
      className="relative h-full min-h-[160px] w-full overflow-hidden bg-espresso"
      role="img"
      aria-label="Photos of Super Tooth Dentistry's team and office"
    >
      {heroPhotos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          priority={i === 0}
          aria-hidden
          sizes="(min-width: 768px) 60vw, 100vw"
          className={`object-cover object-top animate-slow-zoom transition-opacity duration-[600ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/5 to-transparent" />
    </div>
  );
}
