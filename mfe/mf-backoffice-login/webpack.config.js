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

  // Extiende la regla de CSS existente para asegurar que postcss-loader esté presente
  // y evitar duplicados que causan errores de build.
  const cssRule = defaultConfig.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes('css')
  );
  if (cssRule) {
    // Asegura que postcss-loader esté presente después de css-loader
    const cssLoaderIdx = cssRule.use.findIndex((u) =>
      typeof u === 'string' ? u.includes('css-loader') : u.loader && u.loader.includes('css-loader')
    );
    if (cssLoaderIdx !== -1) {
      // Evita duplicados
      cssRule.use = cssRule.use.filter(
        (u) => !(typeof u === 'string' && u.includes('postcss-loader'))
      );
      cssRule.use.splice(cssLoaderIdx + 1, 0, 'postcss-loader');
    }
  }

  return merge(defaultConfig, {
    resolve: {
      alias: {
        //domain folder
        '@domain': path.resolve(__dirname, 'src/domain'),
        //infraestructure folder
        '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
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
