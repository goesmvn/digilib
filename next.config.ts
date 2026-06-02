import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ppb.ac.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'library.ppb.ac.id',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
