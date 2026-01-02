import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://serve.iitiansquad.com/:path*',
      },
    ];
  },
};

export default nextConfig;
