/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            canvas: false,
          };
        }
        return config;
      }, 
      turbopack: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            
        ],
      },
};

module.exports = nextConfig;
