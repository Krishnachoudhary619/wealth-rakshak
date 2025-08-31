import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // allow all https domains
      },
      {
        protocol: "http",
        hostname: "**",   // (optional) allow http domains too
      },
    ],
  },
};

export default nextConfig;
