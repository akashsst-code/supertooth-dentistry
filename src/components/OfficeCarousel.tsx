"use client";

import Image from "next/image";
import { useState } from "react";
import { officePhotos } from "@/lib/content";
import { PauseIcon, PlayIcon } from "./icons";

/**
 * Auto-scrolling office-photo carousel, right-to-left, continuous loop.
 * The track renders the photo list twice back-to-back and CSS-animates
 * translateX to exactly -50% (see .animate-marquee in globals.css), so
 * the loop point is seamless regardless of photo count. Real photography
 * (content.ts officePhotos) — replaces the placeholder tiles this section
 * used to render, closing the Section 8 content blocker in
 * docs/supertooth-webflow-build-spec.md for office (not yet team).
 *
 * The pause/play control isn't decorative: WCAG 2.2.2 (Pause, Stop, Hide)
 * requires a way to stop auto-moving content that runs longer than 5
 * seconds, and this site's compliance checklist (build-spec Section 7)
 * treats WCAG AA as build-blocking, not optional.
 */
export function OfficeCarousel() {
  const [playing, setPlaying] = useState(true);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl font-semibold text-espresso">Our office</h3>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause office photo scroll" : "Resume office photo scroll"}
          aria-pressed={!playing}
          className="tap-target inline-flex items-center justify-center rounded-full border border-sand text-espresso/70 hover:text-espresso hover:border-terracotta/50 transition-colors"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      <div className="overflow-hidden">
        <div className={`flex w-max gap-4 ${playing ? "animate-marquee" : ""}`}>
          {[...officePhotos, ...officePhotos].map((photo, i) => (
            <Image
              key={`${photo.src}-${i}`}
              src={photo.src}
              alt={photo.alt}
              width={320}
              height={240}
              aria-hidden={i >= officePhotos.length}
              className="h-48 sm:h-60 w-64 sm:w-80 shrink-0 rounded-2xl object-cover border border-sand"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
