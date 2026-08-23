"use client";

import { useEffect, useState } from "react";

/**
 * Nav + Hero share exactly one screen's height on mobile (see the
 * previous comment in page.tsx, now here) via the h-[100svh] class
 * below. That CSS unit alone isn't enough in practice: in-app browsers
 * (WhatsApp, Instagram, Messenger — a common way a shared link like
 * this actually gets opened) often don't support svh/dvh at all. When
 * that happens the height rule is silently dropped rather than falling
 * back to something reasonable, so Hero shrinks to its own natural
 * content height instead of the real screen — visible as a strip of
 * the next section peeking in below the CTA row.
 *
 * window.innerHeight (or visualViewport.height where available) is old
 * enough to be reliably supported everywhere, including those in-app
 * WebViews, so it's used here as the authoritative source once
 * mounted. The h-[100svh] class stays as the pre-hydration/no-JS
 * fallback for capable browsers, so there's no flash of wrong height
 * before this effect runs.
 *
 * Desktop (md:+) is untouched — the inline height is only ever set
 * below the md breakpoint; at md and up this renders exactly as if
 * the wrapper were a plain div with the original classes.
 */
export function ViewportHero({ children }: { children: React.ReactNode }) {
  const [mobileHeight, setMobileHeight] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => {
      if (window.innerWidth >= 768) {
        setMobileHeight(null);
        return;
      }
      setMobileHeight(window.visualViewport?.height ?? window.innerHeight);
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
      className="flex flex-col h-[100svh] md:h-auto md:block"
      style={mobileHeight ? { height: mobileHeight } : undefined}
    >
      {children}
    </div>
  );
}
