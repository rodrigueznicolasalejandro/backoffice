const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const isStandalone = webpackConfigEnv.standalone === true;

  const defaultConfig = singleSpaDefaults({
    orgName: 'link',
    projectName: 'backoffice-prices',
    webpackConfigEnv,
    argv,
  });

  // Extiende la regla de CSS existente para asegurar que postcss-loader esté presente
  const cssRule = defaultConfig.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes('css')
  );
  if (cssRule) {
    const cssLoaderIdx = cssRule.use.findIndex((u) =>
      typeof u === 'string' ? u.includes('css-loader') : u.loader && u.loader.includes('css-loader')
    );
    if (cssLoaderIdx !== -1) {
      cssRule.use = cssRule.use.filter(
        (u) => !(typeof u === 'string' && u.includes('postcss-loader'))
      );
      cssRule.use.splice(cssLoaderIdx + 1, 0, 'postcss-loader');
    }
  }

  return merge(defaultConfig, {
    resolve: {
      alias: {
        '@domain': path.resolve(__dirname, 'src/domain'),
        '@infraestructure': path.resolve(__dirname, 'src/infraestructure'),
        '@application': path.resolve(__dirname, 'src/application'),
        '@ui': path.resolve(__dirname, 'src/ui'),
      },
    },
    devServer: {
      port: 3007,
    },
    module: {
      rules: [
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          issuer: { not: [/\.[jt]sx?$/] },
        },
      ],
    },
  });
};
