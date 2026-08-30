"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroPhotos } from "@/lib/content";

const SLIDE_DURATION_MS = 4500;
const CROSSFADE_MS = 1200;

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
 * Timing slowed 2026-08-29 (2200ms/600ms -> 4500ms/1200ms hold/crossfade)
 * per Akash's feedback that the original pace read as "too fast" and
 * didn't let Dr. Archana's photos register before moving on.
 *
 * Always opens on heroPhotos[0] (Dr. Archana's studio headshot) and
 * plays the fixed order in content.ts, rather than the previous
 * random-start behavior — also part of that same feedback ("start the
 * first photo with [the] most trustworthy doc photo"). See the
 * heroPhotos comment in content.ts for how the rest of the sequence is
 * ordered.
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
 * All <Image>s are always mounted and stacked, crossfading via opacity
 * — not swapped in/out — so the Ken Burns zoom (applied to all of them
 * continuously) never restarts/pops mid-transition. Only index 0 gets
 * `priority` (it's the photo that paints first, and now also the one
 * always shown first).
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playing = !reducedMotion;

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
          sizes="100vw"
          style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
          className={`object-cover object-top animate-slow-zoom transition-opacity ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
