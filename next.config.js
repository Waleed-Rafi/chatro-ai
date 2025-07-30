/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google profile pictures
      'graph.facebook.com', // Facebook profile pictures
      'platform-lookaside.fbsbx.com', // Facebook profile pictures (alternative)
      'scontent.xx.fbcdn.net', // Facebook profile pictures (alternative)
      'scontent-lax3-1.xx.fbcdn.net', // Facebook profile pictures (alternative)
      'scontent-lax3-2.xx.fbcdn.net', // Facebook profile pictures (alternative)
      'scontent-lax3-3.xx.fbcdn.net', // Facebook profile pictures (alternative)
      'scontent-lax3-4.xx.fbcdn.net', // Facebook profile pictures (alternative)
    ],
  },
  eslint: {
    // Disable ESLint during builds to avoid conflicts
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
