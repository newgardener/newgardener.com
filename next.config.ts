import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Force webpack instead of Turbopack for Cloudflare Workers compatibility
  // OpenNext Cloudflare adapter doesn't support Turbopack yet
  turbopack: {},
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
