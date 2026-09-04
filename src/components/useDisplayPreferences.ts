"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_PREFERENCES,
  PREFERENCES_CHANGED_EVENT,
  applyPreferences,
  readPreferences,
  writePreferences,
  type DisplayPreferences,
} from "@/lib/display-preferences";

/**
 * Preferences live in localStorage, which is an external store React
 * doesn't own — so these are `useSyncExternalStore` subscriptions
 * rather than the read-in-an-effect-and-setState shape. That isn't
 * style: reading storage in an effect means the first client render is
 * always the default, which React's own `set-state-in-effect` rule
 * flags, and which would also tear if two components read at different
 * times. The store below is the single reader; every consumer gets the
 * same snapshot.
 *
 * The visual result is already correct before any of this runs.
 * PREFERENCES_BOOTSTRAP_SCRIPT applies the saved values to <html>
 * before first paint, so these hooks are only catching React up to what
 * the DOM already shows — never the thing that makes it show.
 */

// getSnapshot must be referentially stable between changes or
// useSyncExternalStore re-renders forever. Parsed preferences are
// cached and the cache is dropped only when something actually writes.
let cachedPreferences: DisplayPreferences | null = null;

function invalidate() {
  cachedPreferences = null;
}

function subscribe(onStoreChange: () => void) {
  function handle() {
    invalidate();
    onStoreChange();
  }
  // The custom event covers this tab; `storage` covers the same site
  // open in another one, where applyPreferences also has to re-run
  // because that tab's <html> hasn't been touched.
  function handleStorage() {
    invalidate();
    applyPreferences(readPreferences());
    onStoreChange();
  }
  window.addEventListener(PREFERENCES_CHANGED_EVENT, handle);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(PREFERENCES_CHANGED_EVENT, handle);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): DisplayPreferences {
  if (cachedPreferences === null) cachedPreferences = readPreferences();
  return cachedPreferences;
}

function getServerSnapshot(): DisplayPreferences {
  return DEFAULT_PREFERENCES;
}

export function useDisplayPreferences() {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback(
    (patch: Partial<DisplayPreferences>) => {
      // writePreferences persists, applies to <html>, and dispatches —
      // the dispatch is what re-renders every subscriber, so there is
      // no local setState to keep in sync.
      writePreferences({ ...readPreferences(), ...patch });
    },
    []
  );

  return { prefs, update };
}

/**
 * True when motion should be suppressed — either because the operating
 * system says so, or because the reader chose it in this site's own
 * display settings.
 *
 * The OS setting is the stronger signal and can only ever turn motion
 * off, never back on: someone who has set `prefers-reduced-motion:
 * reduce` system-wide does not get animation back by leaving this
 * site's control on "full".
 *
 * Replaces three separate one-shot matchMedia reads that lived in
 * HeroCarousel, OfficeCarousel and TestimonialsSection, none of which
 * listened for the media query changing after mount.
 */
function subscribeMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const unsubscribePrefs = subscribe(onStoreChange);
  mq.addEventListener("change", onStoreChange);
  return () => {
    mq.removeEventListener("change", onStoreChange);
    unsubscribePrefs();
  };
}

function getMotionSnapshot(): boolean {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    getSnapshot().motion === "reduced"
  );
}

export function useReducedMotion(): boolean {
  // Server snapshot is `false`: the server can't know either signal, and
  // a carousel that starts still and then begins moving is a better
  // first frame than one that starts moving and stops.
  return useSyncExternalStore(subscribeMotion, getMotionSnapshot, () => false);
}

/**
 * False during SSR and the hydrating render, true afterwards. Used by
 * DisplaySettings to hold back a trigger that only does anything once
 * React is live — a dead button in the footer of a server-rendered page
 * is worse than no button.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
