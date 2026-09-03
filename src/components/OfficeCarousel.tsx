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

const PIXELS_PER_SECOND = 30; // slow, ambient reel speed — not a distraction
const IDLE_RESUME_MS = 4000;
const DRAG_CLICK_THRESHOLD_PX = 6; // movement past this = a drag, not a tap

/**
 * Office-photo carousel — a genuinely continuous "reel": position is
 * driven frame-by-frame via requestAnimationFrame and a single transform,
 * not periodic jumps to the next tile (that reads as jerky, not running).
 * The photo list renders twice back-to-back; once the offset passes one
 * copy's width it wraps by that same width, so the loop is seamless.
 *
 * A continuously-animating transform can't share an element with native
 * browser scrolling (the two fight over position), so dragging is
 * hand-rolled via pointer events instead of relying on overflow-x-auto:
 * pointerdown captures the pointer and freezes the reel, pointermove
 * adds the drag delta on top of wherever the reel had gotten to,
 * pointerup either resumes the idle countdown (drag) or opens the
 * lightbox (a tap — movement stayed under DRAG_CLICK_THRESHOLD_PX).
 * touch-pan-y keeps vertical page scroll working through the carousel;
 * only horizontal motion is claimed for the drag.
 *
 * Two independent reasons the reel can be stopped, kept as separate
 * state on purpose: `userPaused` is sticky (only the pause button
 * touches it) and `interacting` is transient (any pointerdown/wheel/tap
 * sets it, auto-clears after IDLE_RESUME_MS of no further activity).
 * Playing only when neither is set: quiet passive engagement by default,
 * out of the way the instant someone touches it, back on its own once
 * they're done — never overriding an explicit pause. Goal is building
 * trust ahead of the booking CTA further down the page, not an
 * animation that fights the person looking at it.
 *
 * Clicking/tapping a tile opens it full-size in a lightbox — patients
 * get a closer look at the real space, serving the anxiety-reduction
 * job this section exists for (docs/supertooth-ux-flow.md Section 2).
 * Deliberately no pinch/zoom inside the lightbox — considered and
 * dropped as complexity the actual job (seeing the space clearly)
 * doesn't need.
 *
 * Pause/play control is not decorative: WCAG 2.2.2 (Pause, Stop, Hide)
 * requires a way to stop auto-moving content that runs longer than 5
 * seconds, and this site's compliance checklist (build-spec Section 7)
 * treats WCAG AA as build-blocking. The reel also never starts at all
 * for prefers-reduced-motion, matching the HeroCarousel.tsx pattern.
 */
export function OfficeCarousel({
  // "editorial" adapts this to EditorialTrustBlock, which supplies its
  // own "Our office" heading in the editorial type scale (so this one
  // would be a duplicate) and renders on a Sand ground (where the
  // default border-sand outlines are invisible). The pause control
  // still renders in both variants — it is a real accessibility
  // affordance for this draggable reel, not decoration. Default keeps
  // /about exactly as it was.
  variant = "default",
}: {
  variant?: "default" | "editorial";
} = {}) {
  const editorial = variant === "editorial";
  const borderClass = editorial ? "border-espresso/20" : "border-sand";
  const trackRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const offsetRef = useRef(0);
  const trackLoopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<{ startX: number; startOffset: number; moved: boolean; pointerId: number } | null>(null);

  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const playing = !userPaused && !interacting && !reducedMotion && lightboxIndex === null;

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // One copy's rendered width (photos + gaps), so the doubled track can
  // wrap seamlessly. Re-measured on resize since tile size changes at
  // the sm: breakpoint.
  useEffect(() => {
    function measure() {
      const first = tileRefs.current[0];
      const firstOfSecondCopy = tileRefs.current[officePhotos.length];
      if (first && firstOfSecondCopy) {
        trackLoopWidthRef.current = firstOfSecondCopy.offsetLeft - first.offsetLeft;
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function applyTransform() {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    }
  }

  useEffect(() => {
    if (!playing) {
      lastFrameTimeRef.current = null;
      return;
    }
    function frame(t: number) {
      if (lastFrameTimeRef.current != null) {
        // Clamped: if the tab was backgrounded (or the debugger paused
        // execution) between frames, the browser delivers the next rAF
        // callback with a timestamp reflecting the full real-world gap.
        // Uncapped, that one frame would jump the reel forward by
        // however long it was away instead of resuming smoothly.
        const dt = Math.min((t - lastFrameTimeRef.current) / 1000, 0.1);
        const w = trackLoopWidthRef.current;
        let next = offsetRef.current + PIXELS_PER_SECOND * dt;
        if (w > 0) next = next % w;
        offsetRef.current = next;
        applyTransform();
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

  function markInteracting() {
    setInteracting(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setInteracting(false), IDLE_RESUME_MS);
  }

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    // Pointer capture keeps drag tracking correct if the finger moves
    // outside the tile's bounds mid-drag — a nice-to-have, not required
    // for the drag itself to work (pointermove/pointerup still bubble
    // without it as long as the finger stays roughly over the track).
    // Some browsers throw NotFoundError for edge-case pointer ids, so
    // this must not be allowed to abort the handler before dragRef gets
    // set below.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // no-op — see comment above
    }
    dragRef.current = { startX: e.clientX, startOffset: offsetRef.current, moved: false, pointerId: e.pointerId };
    markInteracting();
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > DRAG_CLICK_THRESHOLD_PX) drag.moved = true;
    const w = trackLoopWidthRef.current;
    let next = drag.startOffset - dx;
    if (w > 0) next = ((next % w) + w) % w;
    offsetRef.current = next;
    applyTransform();
  }

  function onPointerUp(e: React.PointerEvent<HTMLButtonElement>, tileIndex: number) {
    const drag = dragRef.current;
    dragRef.current = null;
    markInteracting();
    if (drag && drag.pointerId === e.pointerId && !drag.moved) {
      setLightboxIndex(tileIndex % officePhotos.length);
    }
  }

  return (
    <div>
      <div className={`flex items-center mb-6 ${editorial ? "justify-end" : "justify-between"}`}>
        {!editorial && (
          <h3 className="font-display text-xl font-semibold text-espresso">Our office</h3>
        )}
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Resume office photo scroll" : "Pause office photo scroll"}
          aria-pressed={userPaused}
          className={`tap-target inline-flex items-center justify-center rounded-full border ${borderClass} text-espresso/70 hover:text-espresso hover:border-terracotta/50 transition-colors`}
        >
          {userPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>

      <div className="overflow-hidden" onWheel={markInteracting}>
        <div ref={trackRef} className="flex gap-4 w-max" style={{ willChange: "transform" }}>
          {[...officePhotos, ...officePhotos].map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={(e) => onPointerUp(e, i)}
              onPointerCancel={() => {
                dragRef.current = null;
              }}
              aria-hidden={i >= officePhotos.length}
              tabIndex={i >= officePhotos.length ? -1 : 0}
              aria-label={`View larger: ${photo.alt}`}
              className="group relative shrink-0 touch-pan-y cursor-grab select-none active:cursor-grabbing"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={320}
                height={240}
                draggable={false}
                className={`h-48 sm:h-60 w-64 sm:w-80 rounded-2xl object-cover border ${borderClass} pointer-events-none`}
              />
              <span className="tap-target absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-espresso/60 text-warm-ivory">
                <ExpandIcon />
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => {
            setLightboxIndex(null);
            markInteracting();
          }}
          onNavigate={setLightboxIndex}
        />
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
