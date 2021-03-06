var path = require('path');
var webpack = require('webpack');

module.exports = {
  target: 'web',
  stats: {
    assets: true
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './browser/index.js'
  ],
  devServer: {
    proxy: {
      '**': {
        target: 'http://localhost:3001',
        secure: false
      }
    },
    port: 3000,
    inline: true,
    historyApiFallback: false,
    hot: true,
    stats: { colors: true }
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: { loader: 'babel-loader' },
        resolve: {
          extensions: ['.js', '.jsx']
        }
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    })
  ]
};
