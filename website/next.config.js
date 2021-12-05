module.exports = {
  experimental: {esmExternals: true},
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },

      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            remarkPlugins: [require('./remark-shiki')],
          },
        },
      ],
    });

    return config;
  },
};
