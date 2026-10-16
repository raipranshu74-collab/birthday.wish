import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel's Next.js adapter expects the standard build directory.
  distDir: process.env.VERCEL === "1" ? ".next" : process.env.NODE_ENV === "production" ? ".next-production" : ".next",
  experimental: { cpus: 1 },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
