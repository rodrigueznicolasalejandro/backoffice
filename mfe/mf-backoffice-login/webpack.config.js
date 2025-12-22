const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const isStandalone = webpackConfigEnv.standalone === true;
  // console.log(`Building in ${isStandalone ? "standalone" : "single-spa"} mode`);

  const defaultConfig = singleSpaDefaults({
    orgName: 'link',
    projectName: 'backoffice-login',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    resolve: {
      alias: {
        //domain folder
        '@domain': path.resolve(__dirname, 'src/domain'),
        //infraestructure folder
        '@infraestructure': path.resolve(__dirname, 'src/infraestructure'),
        //application folder
        '@application': path.resolve(__dirname, 'src/application'),
        //ui folder
        '@ui': path.resolve(__dirname, 'src/ui'),
      },
    },
    devServer: {
      port: 3003,
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
