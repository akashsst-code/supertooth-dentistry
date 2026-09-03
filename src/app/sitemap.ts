import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

// /backlog is deliberately excluded — internal noindex working artifact,
// see its own robots meta in src/app/backlog/page.tsx and item 4's
// acceptance criteria.
const PUBLIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/offers",
  "/insurance-new-patients",
  "/contact",
  "/emergency",
  "/privacy",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
