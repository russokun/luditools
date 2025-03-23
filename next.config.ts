import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'strapi.luditools.com'], // Add your Strapi image domain
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  }
};

export default nextConfig;
