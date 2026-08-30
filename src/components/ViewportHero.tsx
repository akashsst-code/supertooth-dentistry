/** Nav's rendered height (h-16 in Nav.tsx) — Nav is `fixed`, so this
 * wrapper has to reserve that space itself rather than sharing flex
 * space with it directly. Keep in sync with Nav.tsx's header height. */
export const NAV_HEIGHT_PX = 64;

/**
 * Small safety margin beyond the viewport, so Hero's photo always fully
 * covers the visible screen at first paint even if `dvh` (below) is off
 * by a pixel or two on some device. Hero.tsx's scrim and text overlay
 * both offset by this same amount (`bottom: HERO_OVERSHOOT_PX` instead
 * of `bottom: 0`) so the CTA row still lands exactly at the true
 * viewport edge — only the photo extends the extra amount, invisible
 * until the reader scrolls.
 */
export const HERO_OVERSHOOT_PX = 16;

/**
 * Hero fills the visible screen's height on mobile, below the fixed
 * nav, via `100dvh` ("dynamic viewport height" — CSS's own live-
 * updating answer to "how tall is the screen right now," tracking a
 * mobile browser's address bar/toolbar as it shows or hides). This file
 * used to compute that height in JS instead (reading
 * `visualViewport.height` on mount and on resize), because `dvh` used
 * to have patchy support and because in-app browsers (WhatsApp,
 * Instagram) sometimes don't report viewport size the way regular
 * mobile Safari/Chrome do.
 *
 * Dropped that JS approach 2026-08-29 after it caused three separate
 * real-device bugs across two features (Nav's now-reverted floating
 * state, and this file's own height calc) — all timing/race issues
 * around exactly when the JS override lands relative to first paint,
 * none reproducible in this repo's testing tooling. `dvh` sidesteps the
 * whole category: it's the browser's own value, always current, no
 * JS/timing/race involved. Modern support (Safari 15.4+, Chrome 108+)
 * covers effectively all real traffic this site gets.
 *
 * `min-h-[calc(100vh-4rem)]` stays as the pure-CSS fallback floor for
 * the rare case `dvh` itself isn't supported — if that happens the
 * whole `h-[calc(100dvh...)]` declaration is dropped by the CSS spec
 * (invalid values don't partially apply), and this min-height is what
 * stops the wrapper from collapsing to near-zero height in that case.
 * Has to subtract NAV_HEIGHT_PX itself, same as the main height calc —
 * a bare `min-h-screen` (100vh, no subtraction) was tried first and was
 * a real bug, not just an odd-looking fallback: CSS `min-height` wins
 * whenever it's larger than the computed `height`, and 100vh is *always*
 * larger than `100dvh - 4rem`, so that version silently overrode the
 * correct nav-aware height on every normal render, not just the rare
 * dvh-unsupported case it was meant for — pushing Hero, and the CTA row
 * pinned to its bottom, exactly NAV_HEIGHT_PX too far down on every
 * single load. Caught by a real device report of the "Book Appointment"
 * button running off the bottom of the screen.
 *
 * Desktop (md:+) is untouched — `md:min-h-0 md:h-auto md:block` resets
 * all of this back to a plain content-sized block at that breakpoint.
 * mt-16 applies at every width though, since Nav is fixed/out of flow
 * at every width and this wrapper always needs to clear it.
 */
export function ViewportHero({ children }: { children: React.ReactNode }) {
  return (
    // The `+1rem` here is HERO_OVERSHOOT_PX (16px) — keep the two in
    // sync, same as `4rem` already has to match NAV_HEIGHT_PX.
    <div className="mt-16 flex flex-col min-h-[calc(100vh-4rem)] h-[calc(100dvh-4rem+1rem)] md:min-h-0 md:h-auto md:block">
      {children}
    </div>
  );
}
