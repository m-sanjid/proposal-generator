/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // react-day-picker v10 ESM is incompatible with Turbopack chunk generation (Next 16)
  transpilePackages: ["react-day-picker"],
}

export default nextConfig
