const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "link",
    projectName: "backoffice-menu",
    webpackConfigEnv,
    argv,
  });

  // Extiende la regla de CSS existente para asegurar que postcss-loader esté presente
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
    module: {
      rules: [
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.svg$/i,
          type: "asset/resource",
          issuer: { not: [/\.[jt]sx?$/] },
        },
      ],
    },
  });
};
