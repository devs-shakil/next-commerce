/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_IMAGE_BASE_URL: process.env.NEXT_IMAGE_BASE_URL,
  },
};

module.exports = nextConfig;
