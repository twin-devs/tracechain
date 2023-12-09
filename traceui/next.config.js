/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        stream: false,
        crypto: false,
        path: false,
        dgram: false,
      };
    }
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };

    return config;
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
 
};

module.exports = nextConfig;
