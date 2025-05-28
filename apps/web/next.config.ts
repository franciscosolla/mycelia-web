import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.alchemyapi.io", "raw.githubusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.experiments.asyncWebAssembly = true;
    }

    return config;
  },
};

export default nextConfig;
