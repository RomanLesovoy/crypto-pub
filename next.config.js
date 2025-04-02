/** @type {import('next').NextConfig} */
const nextConfig = {

  pagesRequiresAuth: [],

  // Настройка редиректов
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/crypto-news',
        permanent: true,
      },
      {
        source: '/ru',
        destination: '/ru/crypto-news',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/crypto-news',
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['resources.cryptocompare.com', 'www.cryptocompare.com', 'images.cryptocompare.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'images.cryptocompare.com',
      },
    ],
  },
};

module.exports = nextConfig;
