const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { library } = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "link",
    projectName: "backoffice-header",
    webpackConfigEnv,
    argv,
  });

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
