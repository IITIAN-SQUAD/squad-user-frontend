import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      root: path.resolve(__dirname),
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://api.iitiansquad.com/:path*',
      },
    ];
  },
};

export default nextConfig;
