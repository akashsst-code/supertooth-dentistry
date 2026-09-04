/**
 * Display preferences — the site's own accessibility entry point.
 *
 * WHAT THIS DELIBERATELY IS NOT
 * -----------------------------
 * This is not an accessibility overlay widget (accessiBe, UserWay, and
 * the rest of that category). Those were researched before building
 * this and ruled out on the evidence:
 *
 *  - They sit on top of the page without changing the underlying HTML,
 *    so a screen reader still meets the same broken headings, the same
 *    unlabelled fields, the same missing alt text underneath them.
 *  - The W3C's own Web Accessibility Initiative does not endorse them,
 *    and the FTC settled an action against accessiBe in 2025 over the
 *    claim that a widget can make any site WCAG conformant.
 *  - Their own failure reports include exactly the thing this file is
 *    meant to help with: double-zoom effects, layouts breaking at high
 *    zoom, and the floating widget button covering content once the
 *    page is magnified.
 *
 * So there is no floating button, nothing is injected at runtime over
 * the page, and nothing here claims conformance. What this does instead
 * is the legitimate version of the same user need: a first-party
 * preference panel, reachable from the footer of every page, that sets
 * three real CSS-level preferences and remembers them.
 *
 *  - `textScale`  scales the root font size. Every type token in
 *                 globals.css is already authored in `rem`, so one root
 *                 change scales the whole locked type scale in
 *                 proportion rather than overriding individual sizes.
 *  - `contrast`   drops the decorative text-opacity variants back to
 *                 the full-strength palette token for people who need
 *                 more separation than the design's muted greys give.
 *  - `motion`     stops the auto-advancing carousels site-wide, for
 *                 people whose OS-level reduced-motion setting is off
 *                 (or who are on a device that doesn't expose one) but
 *                 who still don't want movement.
 *
 * The panel is additive: the OS/browser settings still win where they
 * are stronger (an OS `prefers-reduced-motion: reduce` still stops
 * motion even if this is set to "full"), browser pinch-zoom is never
 * disabled, and the page is built to work with none of this set.
 */

export type TextScale = "100" | "115" | "130";
export type ContrastPreference = "default" | "high";
export type MotionPreference = "full" | "reduced";

export type DisplayPreferences = {
  textScale: TextScale;
  contrast: ContrastPreference;
  motion: MotionPreference;
};

export const DEFAULT_PREFERENCES: DisplayPreferences = {
  textScale: "100",
  contrast: "default",
  motion: "full",
};

export const STORAGE_KEY = "supertooth:display-preferences";

/** Fired on `window` whenever preferences change, so the carousels can
 *  react to the motion setting without prop-drilling through the page. */
export const PREFERENCES_CHANGED_EVENT = "supertooth:display-preferences-changed";

export const TEXT_SCALE_OPTIONS: { value: TextScale; label: string; hint: string }[] = [
  { value: "100", label: "Standard", hint: "Default size" },
  { value: "115", label: "Large", hint: "15% larger" },
  { value: "130", label: "Larger", hint: "30% larger" },
];

function isTextScale(v: unknown): v is TextScale {
  return v === "100" || v === "115" || v === "130";
}

export function normalize(raw: unknown): DisplayPreferences {
  if (!raw || typeof raw !== "object") return DEFAULT_PREFERENCES;
  const o = raw as Partial<Record<keyof DisplayPreferences, unknown>>;
  return {
    textScale: isTextScale(o.textScale) ? o.textScale : DEFAULT_PREFERENCES.textScale,
    contrast: o.contrast === "high" ? "high" : DEFAULT_PREFERENCES.contrast,
    motion: o.motion === "reduced" ? "reduced" : DEFAULT_PREFERENCES.motion,
  };
}

export function readPreferences(): DisplayPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    return normalize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

/**
 * Writes the preferences onto <html> as data attributes plus one custom
 * property. Kept as plain attribute/property writes (rather than, say,
 * re-rendering a <style> tag) so the same three lines can run both here
 * and inside the pre-paint bootstrap script below without drifting.
 */
export function applyPreferences(prefs: DisplayPreferences) {
  const root = document.documentElement;
  root.style.setProperty("--user-text-scale", String(Number(prefs.textScale) / 100));
  root.dataset.contrast = prefs.contrast;
  root.dataset.motion = prefs.motion;
}

export function writePreferences(prefs: DisplayPreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Private browsing / storage disabled — the setting still applies
    // for this page view, it just won't survive a reload. Silently
    // degrading beats blocking the control.
  }
  applyPreferences(prefs);
  window.dispatchEvent(new CustomEvent(PREFERENCES_CHANGED_EVENT, { detail: prefs }));
}

/**
 * Runs before first paint (see layout.tsx). Without this, a reader who
 * has chosen 130% text would get one frame of 100% text and a visible
 * jump on every navigation — the "flash of unstyled preference" problem.
 * Deliberately tiny, dependency-free, and wrapped in try/catch: this
 * script blocks rendering, so it must never be able to throw.
 */
export const PREFERENCES_BOOTSTRAP_SCRIPT = `
try {
  var p = JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) || "null") || {};
  var s = p.textScale === "115" || p.textScale === "130" ? p.textScale : "100";
  var r = document.documentElement;
  r.style.setProperty("--user-text-scale", String(Number(s) / 100));
  r.dataset.contrast = p.contrast === "high" ? "high" : "default";
  r.dataset.motion = p.motion === "reduced" ? "reduced" : "full";
} catch (e) {}
`.trim();
