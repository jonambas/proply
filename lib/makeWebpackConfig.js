const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const propspotPath = path.resolve(__dirname, '..');
const includePaths = [path.resolve(propspotPath, 'src')];

module.exports = (config, options) => {
  const devServerEntries = options.production
    ? []
    : [`webpack-dev-server/client?http://localhost:${config.port}`, 'webpack/hot/dev-server'];

  const propspotConfig = {
    mode: options.production ? 'production' : 'development',
    entry: [...devServerEntries, path.resolve(propspotPath, 'src/index.js')],
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(config.cwd, config.outputPath)
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        __PROPSPOT_CONFIG__: path.resolve(config.cwd, 'propspot.config.js')
      }
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: includePaths,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react')
              ],
              plugins: [require.resolve('@babel/plugin-proposal-class-properties')]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: config.title ? `Propspot | ${config.title}` : 'Propspot',
        chunksSortMode: 'none',
        chunks: ['main'],
        filename: 'index.html'
      }),
      ...(options.production
        ? []
        : [new webpack.HotModuleReplacementPlugin(), new FriendlyErrorsWebpackPlugin()])
    ]
  };

  return propspotConfig;
};
