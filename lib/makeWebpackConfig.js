const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const proplyPath = path.resolve(__dirname, '..');
const includePaths = [path.resolve(proplyPath, 'src')];

module.exports = (config, options) => {
  const devServerEntries = options.production
    ? []
    : [`webpack-dev-server/client?http://localhost:${config.port}`, 'webpack/hot/dev-server'];

  const proplyConfig = {
    mode: options.production ? 'production' : 'development',
    entry: [...devServerEntries, path.resolve(proplyPath, 'src/index.js')],
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(config.cwd, config.outputPath)
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        __PROPLY_CONFIG__: path.resolve(config.cwd, 'proply.config.js')
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
        title: config.title ? `Proply | ${config.title}` : 'Proply',
        chunksSortMode: 'none',
        chunks: ['main'],
        filename: 'index.html'
      }),
      ...(options.production
        ? []
        : [new webpack.HotModuleReplacementPlugin(), new FriendlyErrorsWebpackPlugin()])
    ]
  };

  return proplyConfig;
};
