/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd2dacdhzndo9w4.cloudfront.net',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd1kgd37c1b2jmu.cloudfront.net',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;