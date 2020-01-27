const path = require('path')

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
  }]
}
