/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 960, 1080, 1200],
    minimumCacheTTL: 604800, // 7 days
  },

  turbopack: {},

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize FontAwesome imports
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@fortawesome/fontawesome-svg-core/styles.css': false,
      }
    }
    return config
  },
}

module.exports = nextConfig
