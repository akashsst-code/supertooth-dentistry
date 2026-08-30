/** Nav's rendered height (h-16 in Nav.tsx) — Nav is `fixed`, so this
 * wrapper has to reserve that space itself rather than sharing flex
 * space with it directly. Keep in sync with Nav.tsx's header height. */
export const NAV_HEIGHT_PX = 64;

/**
 * Historically this wrapper forced Hero to exactly one viewport-height
 * tall on mobile (first via a JS `visualViewport.height` read, later via
 * CSS `100dvh`), so the photo would read as a genuine full-bleed first
 * screen. Removed entirely 2026-08-29 after that approach caused four
 * separate real-device bugs in a row — a load-timing race, a WebKit
 * text-rendering quirk, a `min-height` fallback silently overriding the
 * real height on every render, and Safari vs. Chrome on the same phone
 * measuring the viewport differently enough to hide the CTA row on one
 * but not the other. None of these ever reproduced in this repo's
 * testing tooling, which is exactly what made them unfixable with any
 * confidence — every fix was a best guess pending a real device
 * confirming it, and one already broke on the very next report.
 *
 * Hero.tsx no longer needs an exact-viewport-height container to look
 * right or to keep its CTA reachable: mobile now sizes the photo with a
 * plain `vh` unit (approximate is fine, it doesn't need pixel
 * precision) and lets the text block that follows it sit in normal
 * document flow instead of being pinned to this wrapper's computed
 * height. That's what actually guarantees the nav bar and the CTA row
 * are always on the page and always reachable — not a height
 * calculation someone has to get exactly right on every browser, but
 * how browsers lay out real content by default. See Hero.tsx.
 *
 * All this wrapper does now is clear Nav's fixed height, which every
 * width needs since Nav is out of normal flow.
 */
export function ViewportHero({ children }: { children: React.ReactNode }) {
  return <div className="mt-16">{children}</div>;
}
