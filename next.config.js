/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Optional: enables faster builds
  env: {
    // Add any environment variables here, if needed
    // Example: NEXT_PUBLIC_API_URL: "http://localhost:5000"
  },
  images: {
    domains: ["localhost"], // Add any domains you need for Next.js Image component
  },
}

module.exports = nextConfig
