import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid Next.js "workspace root" mis-detection when parent directories contain lockfiles.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
