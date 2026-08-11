import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["192.168.100.22", "localhost"],
  },
};

export default nextConfig;
