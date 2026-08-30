"use client";

import { useEffect, useState } from "react";

/** Nav's rendered height (h-16 in Nav.tsx) — Nav is `fixed`, so this
 * wrapper has to reserve that space itself rather than sharing flex
 * space with it directly. Keep in sync with Nav.tsx's header height. */
export const NAV_HEIGHT_PX = 64;

/**
 * Extra height beyond the true viewport, added 2026-08-29 (single-bleed
 * pass) so Hero always fully covers the visible screen at first paint —
 * even a few pixels of the height math below coming in short (viewport-
 * height quirks are the whole reason this file exists, see the next
 * comment) used to show as a sliver of TrustBlock's white/Sand
 * background peeking in beneath the CTA row, breaking the "full photo
 * bleed" first impression Akash asked for. Hero.tsx's scrim and text
 * overlay both offset by this same amount (`bottom: HERO_OVERSHOOT_PX`
 * instead of `bottom: 0`) so the CTA row still lands exactly at the true
 * viewport edge, same as before — only the photo extends the extra
 * amount, invisible until the reader scrolls.
 */
export const HERO_OVERSHOOT_PX = 32;

/**
 * Hero fills exactly one screen's height on mobile, below the fixed
 * nav (see the previous comment in page.tsx, now here) via the
 * h-[calc(100svh-4rem)] class below. That CSS unit alone isn't enough
 * in practice: in-app browsers (WhatsApp, Instagram, Messenger — a
 * common way a shared link like this actually gets opened) often don't
 * support svh/dvh at all. When that happens the height rule is
 * silently dropped rather than falling back to something reasonable,
 * so Hero shrinks to its own natural content height instead of the
 * real screen — visible as a strip of the next section peeking in
 * below the CTA row.
 *
 * window.innerHeight (or visualViewport.height where available) is old
 * enough to be reliably supported everywhere, including those in-app
 * WebViews, so it's used here as the authoritative source once
 * mounted. The h-[calc(100svh-4rem)] class stays as the
 * pre-hydration/no-JS fallback for capable browsers, so there's no
 * flash of wrong height before this effect runs.
 *
 * Desktop (md:+) is untouched — the inline height is only ever set
 * below the md breakpoint; at md and up this renders exactly as if
 * the wrapper were a plain div with the original classes. mt-16
 * applies at every width though, since Nav is fixed/out of flow at
 * every width and this wrapper always needs to clear it.
 *
 * min-h-screen (found 2026-08-29): if `100svh` is unsupported, the
 * *entire* `h-[calc(...)]` declaration is dropped by the CSS spec
 * (invalid values don't partially apply), not just the svh portion —
 * so before this was added, an unsupported-svh browser had genuinely
 * no fallback at all for the brief window between first paint and this
 * file's own useEffect correcting it with a real pixel height. On a
 * slow connection that window is long enough to see: the wrapper
 * collapses toward its content's natural (near-zero at first paint)
 * height, so HeroCarousel's own Espresso background has nothing to
 * fill yet, showing plain page background behind Hero until the photo
 * *and* the JS override both land. `min-h-screen` (100vh) is a
 * universally-supported CSS-only floor that doesn't need JS or svh
 * support to do its job — doesn't account for dynamic mobile toolbars
 * as precisely as svh does, but "slightly imprecise" beats "silently
 * zero."
 */
export function ViewportHero({ children }: { children: React.ReactNode }) {
  const [mobileHeight, setMobileHeight] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => {
      if (window.innerWidth >= 768) {
        setMobileHeight(null);
        return;
      }
      const viewport = window.visualViewport?.height ?? window.innerHeight;
      setMobileHeight(viewport - NAV_HEIGHT_PX + HERO_OVERSHOOT_PX);
    };
    sync();
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
    };
  }, []);

  return (
    // The `+2rem` in this fallback calc is HERO_OVERSHOOT_PX (32px) —
    // keep the two in sync, same as `4rem` above already has to match
    // NAV_HEIGHT_PX.
    <div
      className="mt-16 flex flex-col min-h-screen h-[calc(100svh-4rem+2rem)] md:min-h-0 md:h-auto md:block"
      style={mobileHeight ? { height: mobileHeight } : undefined}
    >
      {children}
    </div>
  );
}
