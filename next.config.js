export default {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      tls: false,
      net: false,
      dns: false,
      fs: false,
    };
    return config;
  },
};
