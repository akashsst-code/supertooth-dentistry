"use client";

import { useEffect, useState } from "react";

/** Nav's rendered height (h-16 in Nav.tsx) — Nav is `fixed`, so this
 * wrapper has to reserve that space itself rather than sharing flex
 * space with it directly. Keep in sync with Nav.tsx's header height. */
export const NAV_HEIGHT_PX = 64;

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
      setMobileHeight(viewport - NAV_HEIGHT_PX);
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
    <div
      className="mt-16 flex flex-col h-[calc(100svh-4rem)] md:h-auto md:block"
      style={mobileHeight ? { height: mobileHeight } : undefined}
    >
      {children}
    </div>
  );
}
