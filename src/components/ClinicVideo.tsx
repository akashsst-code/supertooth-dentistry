import Image from "next/image";

/**
 * Real, unscripted footage of the office/team in motion — inspired by
 * smilemakersfortworth.com's hero: an autoplaying, muted, looping video
 * reads as trust "beyond words" in a way a static photo doesn't. No
 * footage has been shot yet (see docs/supertooth-priority-dimensions.md
 * content checklist), so as an interim step this panel uses Dr.
 * Archana's real headshot with a cinematic treatment (slow zoom,
 * gradient vignette, lower-third caption) to read as "videographic"
 * rather than a flat placeholder tile — while the small play badge
 * honestly signals that real video is still coming, not implying this
 * static image already is one.
 *
 * Once real footage lands, swap the <Image> below for:
 *   <video autoPlay muted loop playsInline className="h-full w-full object-cover">
 *     <source src="/media/office-glimpse.mp4" type="video/mp4" />
 *   </video>
 */
export function ClinicVideo() {
  return (
    <div className="relative h-full min-h-[120px] w-full overflow-hidden bg-espresso">
      <Image
        src="/team/archana.webp"
        alt="Dr. Archana at Super Tooth Dentistry"
        fill
        priority
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover object-top animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/5 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
        <span className="rounded-full bg-warm-ivory/95 px-4 py-2 text-sm font-medium text-espresso shadow-sm whitespace-nowrap">
          Dr. Archana, DDS
        </span>
        <span
          className="tap-target inline-flex shrink-0 items-center justify-center rounded-full bg-warm-ivory/95 h-11 w-11 shadow-sm"
          aria-label="Real office video coming soon"
          title="Real office video coming soon"
        >
          <PlayIcon />
        </span>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-terracotta ml-0.5" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
