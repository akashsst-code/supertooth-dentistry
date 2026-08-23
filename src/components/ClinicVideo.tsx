/**
 * Real, unscripted footage of the office/team in motion — inspired by
 * smilemakersfortworth.com's hero: an autoplaying, muted, looping video
 * reads as trust "beyond words" in a way a photo doesn't. No footage
 * exists yet (see docs/supertooth-priority-dimensions.md content
 * checklist), so this renders a clearly-marked placeholder per the
 * locked "no unverifiable claims / no stand-in passed off as real" rule
 * in docs/supertooth-build-principles.md Section 8.
 *
 * Once real footage lands, swap the placeholder div below for:
 *   <video autoPlay muted loop playsInline className="h-full w-full object-cover">
 *     <source src="/media/office-glimpse.mp4" type="video/mp4" />
 *   </video>
 */
export function ClinicVideo() {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-sand">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
        <span className="tap-target inline-flex items-center justify-center rounded-full bg-warm-ivory/90 h-16 w-16 shadow-sm">
          <PlayIcon />
        </span>
        <span className="border-b-2 border-dashed border-terracotta/60 text-sm text-espresso/70">
          [ Clinic video — a real look inside the office, replaces this placeholder ]
        </span>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-terracotta ml-1" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
