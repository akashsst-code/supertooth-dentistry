"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The three things a full-screen overlay owes a keyboard or screen
 * reader user, in one place: move focus in, keep it in, and stop the
 * page underneath from scrolling.
 *
 * Written because the mobile menu in both Nav.tsx and EditorialNav.tsx
 * had none of them. Measured on the running site before this existed:
 * opening the menu left `document.activeElement` on <body>, five links
 * inside <main> stayed in the tab order behind an opaque overlay, and
 * the page behind scrolled while the sheet was open.
 *
 * Escape-to-close and returning focus to the trigger already worked in
 * both components and are deliberately left where they are — this hook
 * doesn't take them over.
 *
 * Scroll lock keeps the scroll position rather than using
 * `overflow: hidden` alone: on iOS Safari the latter silently jumps the
 * reader back to the top of the page when the menu closes.
 */
export function useDialogBehavior(open: boolean, containerRef: RefObject<HTMLElement | null>) {
  // Focus the first control inside the overlay when it opens.
  //
  // Called straight from the effect rather than inside a
  // requestAnimationFrame. The rAF version was written first and failed
  // a real test: browsers throttle (and in a background tab, suspend)
  // animation frames, so the callback simply never ran and focus stayed
  // on <body>. By the time a passive effect runs the overlay is already
  // committed to the DOM and focusable, so the frame bought nothing and
  // cost correctness.
  useEffect(() => {
    if (!open) return;
    containerRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, [open, containerRef]);

  // Keep Tab inside the overlay.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const node = containerRef.current;
      if (!node) return;
      const items = [...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || getComputedStyle(el).position === "fixed"
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !node.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, containerRef]);

  // Freeze the page behind the overlay.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);
}
