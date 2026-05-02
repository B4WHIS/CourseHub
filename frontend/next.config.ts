import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Tắt strict mode để tránh re-render 2 lần trong dev
  reactStrictMode: false,
  // Cấu hình hình ảnh cho phép Unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Chỉ định root cho Turbopack để tránh cảnh báo nhiều lockfile
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
