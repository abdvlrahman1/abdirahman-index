/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Allow images from Supabase */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zoayaxippcxlutgldhsv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  /* Ignore strict errors during deployment */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;