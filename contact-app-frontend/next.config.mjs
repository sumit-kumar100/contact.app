/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['i.dummyjson.com'],
  },
  // eslint: {
  //   ignoreDuringBuilds: ['/src/**/*']
  // }
}

export default nextConfig
