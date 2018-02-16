
const path = require('path')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/google-spreadsheets-db.js',
  output: {
    filename: 'google-spreadsheets-db.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'GoogleSpreadsheetsDb',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}
