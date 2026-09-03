"use client";

import { useEffect, useState } from "react";

/**
 * EditorialScreen — makes the editorial header + hero occupy exactly one
 * mobile screen, so the photograph finishes on screen 1 instead of
 * running past the fold. Everything inside is sized against this box:
 * the copy block keeps its natural height and the photo frame takes
 * whatever is left over (see EditorialHero's `flex-1` figure), which is
 * why the composition holds on a 667px SE and an 932px Pro Max alike
 * without per-device tuning.
 *
 * `minHeight`, not `height`: on a very short viewport (landscape, or a
 * large accessibility text size pushing the headline to three lines) a
 * hard height would either clip the CTA or let it overlap TrustBlock.
 * min-height still gives `flex-1` a definite box to fill in the normal
 * case, and simply grows in the rare case content genuinely needs more.
 *
 * The measured `window.innerHeight` is authoritative rather than the
 * h-[100svh] class, for the same reason ViewportHero.tsx does it (see
 * that file): in-app browsers — WhatsApp, Instagram, Messenger, a common
 * way a link like this actually gets opened — frequently don't support
 * svh at all and silently drop the rule. The class stays as the
 * pre-hydration fallback for capable browsers so there's no flash of
 * wrong height.
 *
 * Desktop (md+) opts out entirely — the hero is a two-column composition
 * there and sizes itself naturally.
 */
export function EditorialScreen({ children }: { children: React.ReactNode }) {
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
      className="flex min-h-[100svh] flex-col md:block md:min-h-0"
      style={mobileHeight ? { minHeight: mobileHeight } : undefined}
    >
      {children}
    </div>
  );
}
