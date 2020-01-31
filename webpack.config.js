const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development'
  return [{
    mode: IS_DEVELOPMENT ? 'development' : 'production',
    entry: {
      app: [
        './public/static/js/app.js'
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    output: {
      path: path.resolve() + '/public/static/build/',
      publicPath: '/static/build/',
      filename: '[name].js'
    },
    devtool: 'source-map'
  }, {
    mode: IS_DEVELOPMENT ? 'development' : 'production',
    // CSS
    entry: {
      style: [
        './public/static/scss/style.scss',
      ],
    },
    output: {
      path: path.resolve() + '/public/static/css/'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    devtool: 'source-map'
  }]
}
