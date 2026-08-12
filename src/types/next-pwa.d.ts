declare module "next-pwa" {
  import type { NextConfig } from "next";

  export default function withPWA(
    options?: any
  ): (nextConfig?: NextConfig) => NextConfig;
}
