import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Disable turbopack for better compatibility
  },
  typescript: {
    ignoreBuildErrors: true, // Skip type checking during build
  },
  output: 'export', // For Firebase hosting static deployment
  distDir: 'out',   // Changed to match firebase.json
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true
};

export default nextConfig;
