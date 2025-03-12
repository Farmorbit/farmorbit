import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Or 'https', or both if needed
        hostname: "*", // Allow all hostnames
      },
      {
        protocol: "https", // Or 'http', or both if needed
        hostname: "*", // Allow all hostnames
      },
    ],
  },
};

export default nextConfig;
