import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [new URL("https://picsum.photos/seed/**")],
  },
};

export default nextConfig;
