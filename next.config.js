module.exports = {
  async rewrites() {
    return [
      {
        source: '/frete/melhorenvio',
        destination: 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
};
