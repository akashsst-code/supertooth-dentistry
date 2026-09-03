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
/**
 * Deliberately short of a full screen. The remaining ~8% is where page
 * 2's Sand ground shows through at the bottom of screen 1 — the "peek"
 * that tells the reader there is a next section, and the reason the hero
 * no longer ends in an unexplained band of empty ivory.
 *
 * It also sets the photo's height indirectly: the copy block above it
 * has a fixed natural height and the photo takes the rest, so shrinking
 * the box shrinks the photo. At 92% it lands near half the screen, which
 * is where Akash asked for it. Keep this in sync with the `min-h-[92svh]`
 * class below, which is the pre-hydration fallback.
 */
const SCREEN_FRACTION = 0.92;

export function EditorialScreen({ children }: { children: React.ReactNode }) {
  const [mobileHeight, setMobileHeight] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => {
      if (window.innerWidth >= 768) {
        setMobileHeight(null);
        return;
      }
      const vh = window.visualViewport?.height ?? window.innerHeight;
      setMobileHeight(vh * SCREEN_FRACTION);
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
      className="flex min-h-[92svh] flex-col md:block md:min-h-0"
      style={mobileHeight ? { minHeight: mobileHeight } : undefined}
    >
      {children}
    </div>
  );
}
