const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = (webpackConfigEnv, argv) => {
  const orgName = "link";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });
  return merge(defaultConfig, {
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.wasm$/,
          type: "webassembly/async",
        },
      ],
    },
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
    devServer: {
      port: 9000,
      // Send API requests on localhost to API server get around CORS.
      proxy: [
        {
          context: ["/api"],
          // target: "https://bff-link.d.adq.redlink-aws",
          target: "http://localhost:3500/backoffice-bff",
          changeOrigin: true,
          secure: false,
        },
      ],
      static: [
        {
          directory: path.join(__dirname, "public"),
          publicPath: "/public",
        },

        {
          directory: path.join(__dirname, "config"),
          publicPath: "/config",
          staticOptions: {
            setHeaders: (res, path) => {
              if (path.endsWith("importmap.json")) {
                res.setHeader("Content-Type", "application/importmap+json");
              }
            },
          },
        },
      ],
    },
  });
};
