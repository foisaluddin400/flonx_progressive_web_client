import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "d2dacdhzndo9w4.cloudfront.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "d1kgd37c1b2jmu.cloudfront.net",
        pathname: "**",
      },
    ],
  },

  turbopack: {}, // 👈 silence Next 16 warning
};

const pwa = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default pwa(nextConfig);