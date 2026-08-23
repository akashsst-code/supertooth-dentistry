"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { officePhotos } from "@/lib/content";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ExpandIcon,
  PauseIcon,
  PlayIcon,
} from "./icons";

const AUTOPLAY_MS = 3500;

/**
 * Office-photo carousel — real native horizontal scroll-snap (touch swipe,
 * trackpad, and the scrollbar all work for free) instead of a CSS-transform
 * marquee, so it responds to user input rather than fighting it: any
 * pointerdown pauses autoplay immediately, and an IntersectionObserver
 * tracks which tile the user actually scrolled to, so resuming autoplay
 * continues from there instead of jumping back to a fixed position.
 *
 * Clicking/tapping a tile opens it full-size in a lightbox — patients get
 * a closer look at the real space, serving the anxiety-reduction job this
 * section exists for (docs/supertooth-ux-flow.md Section 2).
 *
 * Pause/play control is not decorative: WCAG 2.2.2 (Pause, Stop, Hide)
 * requires a way to stop auto-moving content that runs longer than 5
 * seconds, and this site's compliance checklist (build-spec Section 7)
 * treats WCAG AA as build-blocking. Autoplay also skips itself entirely
 * for prefers-reduced-motion, matching the ClinicVideo.tsx pattern.
 */
export function OfficeCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [playing, setPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce(
          (best, entry) => (entry.intersectionRatio > (best?.intersectionRatio ?? 0) ? entry : best),
          entries[0]
        );
        if (mostVisible?.isIntersecting) {
          const index = tileRefs.current.findIndex((el) => el === mostVisible.target);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: container, threshold: [0.6] }
    );
    tileRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const nextIndex = (activeIndex + 1) % officePhotos.length;
      tileRefs.current[nextIndex]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, activeIndex]);

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

      <div
        ref={containerRef}
        onPointerDown={() => setPlaying(false)}
        className="office-scroll flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {officePhotos.map((photo, i) => (
          <button
            key={photo.src}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            type="button"
            onClick={() => {
              setPlaying(false);
              setLightboxIndex(i);
            }}
            className="group relative shrink-0 snap-start"
            aria-label={`View larger: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={320}
              height={240}
              className="h-48 sm:h-60 w-64 sm:w-80 rounded-2xl object-cover border border-sand"
            />
            <span className="tap-target absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-espresso/60 text-warm-ivory">
              <ExpandIcon />
            </span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
      )}
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const photo = officePhotos[index];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % officePhotos.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + officePhotos.length) % officePhotos.length);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.alt} — enlarged`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/90 p-4"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close enlarged photo"
        className="tap-target absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-warm-ivory/10 text-warm-ivory hover:bg-warm-ivory/20 transition-colors"
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + officePhotos.length) % officePhotos.length);
        }}
        aria-label="Previous photo"
        className="tap-target absolute left-2 sm:left-6 inline-flex items-center justify-center rounded-full bg-warm-ivory/10 text-warm-ivory hover:bg-warm-ivory/20 transition-colors"
      >
        <ChevronLeftIcon />
      </button>

      <Image
        src={photo.src}
        alt={photo.alt}
        width={1200}
        height={900}
        priority
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full w-auto h-auto rounded-lg object-contain"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % officePhotos.length);
        }}
        aria-label="Next photo"
        className="tap-target absolute right-2 sm:right-6 inline-flex items-center justify-center rounded-full bg-warm-ivory/10 text-warm-ivory hover:bg-warm-ivory/20 transition-colors"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
