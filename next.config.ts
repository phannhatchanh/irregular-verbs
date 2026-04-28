import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
    deviceSizes: [390, 435, 768, 1024, 1280],
    formats: ['image/avif']
  }
};

export default nextConfig;
