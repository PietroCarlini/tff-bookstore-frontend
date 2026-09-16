import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.penguin.co.uk",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
      },
    ],
  },
};

export default nextConfig;
