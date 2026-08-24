"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroPhotos } from "@/lib/content";
import { PauseIcon, PlayIcon } from "./icons";

const SLIDE_DURATION_MS = 5000;

/**
 * Hero photo carousel — replaces the old single-photo ClinicVideo panel.
 * Real photos of the team/office crossfading in sequence, each with the
 * same slow Ken Burns zoom (globals.css .animate-slow-zoom) the old panel
 * used — reads as "more than just the dentist" (docs Slack request from
 * Akash, 2026-08-23) without pretending to be an actual video. Real
 * office/team footage still hasn't been shot (see
 * docs/supertooth-priority-dimensions.md content checklist); once it has,
 * this can be swapped for a real <video> the same way ClinicVideo.tsx's
 * header comment described.
 *
 * All 5 <Image>s are always mounted and stacked, crossfading via opacity
 * — not swapped in/out — so the Ken Burns zoom (applied to all of them
 * continuously) never restarts/pops mid-transition. Only index 0 gets
 * `priority` (it's the same photo the old hero already loaded first).
 *
 * Auto-advance is a plain setInterval tied to `playing`, not audiences of
 * OfficeCarousel's requestAnimationFrame reel — this is discrete slides,
 * not a continuous scroll, so there's no per-frame position to compute.
 * `playing` follows the same rule as OfficeCarousel: WCAG 2.2.2 (Pause,
 * Stop, Hide) requires a way to stop auto-advancing content, and it never
 * starts at all under prefers-reduced-motion.
 *
 * Dots double as direct-jump buttons (aria-labelled with each slide's
 * caption) rather than pure indicators — the site is mobile-first with no
 * reliable hover (see Hero.tsx's CTA-row comment), so hover-reveal arrows
 * aren't a real option here; tapping a dot is the manual control.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playing = !userPaused && !reducedMotion;

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

  const active = heroPhotos[index];

  return (
    <div
      className="relative h-full min-h-[160px] w-full overflow-hidden bg-espresso"
      role="group"
      aria-label="Photos of Super Tooth Dentistry's team and office"
    >
      {heroPhotos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          priority={i === 0}
          aria-hidden={i !== index}
          sizes="(min-width: 768px) 60vw, 100vw"
          className={`object-cover object-top animate-slow-zoom transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/5 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2">
          {heroPhotos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo: ${photo.caption}`}
              aria-current={i === index}
              className="tap-target flex items-center justify-center"
            >
              <span
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-warm-ivory" : "w-1.5 bg-warm-ivory/50"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between gap-3">
          <span className="rounded-full bg-warm-ivory/95 px-4 py-2 text-sm font-medium text-espresso shadow-sm whitespace-nowrap">
            {active.caption}
          </span>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Resume photo carousel" : "Pause photo carousel"}
            aria-pressed={userPaused}
            className="tap-target inline-flex shrink-0 items-center justify-center rounded-full bg-warm-ivory/95 h-11 w-11 shadow-sm text-terracotta"
          >
            {userPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
