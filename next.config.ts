
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ignoreBuildErrors: true, // Allow TypeScript errors to be reported
  },
  eslint: {
    // ignoreDuringBuilds: true, // Allow ESLint errors to be reported during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
