/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig