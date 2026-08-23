import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Temporary stock photos for NewPatientOffersBlock (see content.ts
    // `offers` comment) — swap for real photography under public/ later,
    // at which point this can be removed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
