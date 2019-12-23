const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const propspotterPath = path.resolve(__dirname, "..");
const includePaths = [path.resolve(propspotterPath, "src")];

module.exports = (config, options) => {

  const devServerEntries = options.production
    ? []
    : [
        `webpack-dev-server/client?http://localhost:${config.port}`,
        "webpack/hot/dev-server"
      ];

  const propspotterConfig = {
    mode: options.production ? "production" : "development",
    entry: [...devServerEntries, path.resolve(propspotterPath, "src/index.js")],
    output: {
      filename: "[name].[hash].js",
      path: path.resolve(propspotterPath, "dist/propspotter")
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: includePaths,
          exclude: /node_modules/,
          use: {
            loader: require.resolve("babel-loader"),
            options: {
              presets: [
                require.resolve("@babel/preset-env"),
                require.resolve("@babel/preset-react")
              ],
              plugins: [
                require.resolve("@babel/plugin-proposal-class-properties")
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: config.title ? `Propspotter | ${config.title}` : "Propspotter",
        chunksSortMode: "none",
        chunks: ["main"],
        filename: "index.html"
      }),
      ...(options.production
        ? []
        : [
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsWebpackPlugin()
          ])
    ]
  };

  return propspotterConfig;
}