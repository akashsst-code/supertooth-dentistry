/**
 * Backlog item 30 — first focusable element on every page. Hidden until
 * focused (GOV.UK's skip-link pattern, referenced in that item): a
 * keyboard/screen-reader user tabbing from page load can jump straight
 * into `#main-content` instead of tabbing through the fixed header's nav
 * links on every single route.
 *
 * Targets `#main-content`, which every page's `<main>` carries along
 * with `tabIndex={-1}` so activating this actually moves focus there,
 * not just scroll position.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:tap-target focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:inline-flex focus:items-center focus:rounded-full focus:bg-terracotta-dark focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-warm-ivory"
    >
      Skip to main content
    </a>
  );
}
