/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // No ESLint config in this repo yet; TypeScript errors still fail the build.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
